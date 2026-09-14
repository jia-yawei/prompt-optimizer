import { onMounted, ref, shallowRef, type Ref } from 'vue'

import {
  DEFAULT_CONTEXT_MODE,
  STARTUP_REPAIR_REPORT_PREFERENCE_KEY,
  FavoriteManager,
  StorageFactory,
  createCompareService,
  createContextRepo,
  createDataManager,
  createEvaluationService,
  createHistoryManager,
  createImageAdapterRegistry,
  createImageModelManager,
  createImageService,
  createImageStorageService,
  createImageUnderstandingService,
  createLLMService,
  createModelManager,
  createPreferenceService,
  createPromptService,
  createTemplateLanguageService,
  createTemplateManager,
  createTextAdapterRegistry,
  createVariableExtractionService,
  createVariableValueGenerationService,
  runStorageStartupSafetyCheck,
  writeStartupRepairReport,
  type ContextMode,
  type IPreferenceService,
  type StartupRepairReport,
} from '@prompt-optimizer/core'
import type { AppServices } from '../../types/services'
import { scheduleImageStorageGc } from '../../stores/session/imageStorageMaintenance'
import { attachFavoriteAssetGc, runFavoriteAssetGc } from '../../utils/favorite-asset-maintenance'
import { autoEnableChromeBuiltInModelIfReady } from '../../utils/chrome-built-in-auto-enable'

const appendStartupRepairReport = (
  currentReport: StartupRepairReport | null,
  nextAction: StartupRepairReport['actions'][number],
): StartupRepairReport => ({
  checkedAt: currentReport?.checkedAt ?? Date.now(),
  actions: [...(currentReport?.actions || []), nextAction],
})

const consumeStartupRepairReport = async (
  preferenceService: IPreferenceService,
): Promise<StartupRepairReport | null> => {
  const report = await preferenceService.get<StartupRepairReport | null>(
    STARTUP_REPAIR_REPORT_PREFERENCE_KEY,
    null,
  )

  if (report) await preferenceService.delete(STARTUP_REPAIR_REPORT_PREFERENCE_KEY)
  return report
}

/** Initializes the browser-only service graph backed by IndexedDB. */
export function useAppInitializer(): {
  services: Ref<AppServices | null>
  isInitializing: Ref<boolean>
  error: Ref<Error | null>
  startupRepairReport: Ref<StartupRepairReport | null>
} {
  const services = shallowRef<AppServices | null>(null)
  const isInitializing = ref(true)
  const error = ref<Error | null>(null)
  const startupRepairReport = ref<StartupRepairReport | null>(null)

  onMounted(async () => {
    try {
      const storageProvider = StorageFactory.create('dexie')
      const repairReport = await runStorageStartupSafetyCheck(storageProvider)
      await writeStartupRepairReport(storageProvider, repairReport)

      const preferenceService = createPreferenceService(storageProvider)
      startupRepairReport.value = await consumeStartupRepairReport(preferenceService)

      const textAdapterRegistry = createTextAdapterRegistry()
      const languageService = createTemplateLanguageService(preferenceService)
      await languageService.initialize()

      const modelManager = createModelManager(storageProvider)
      const templateManager = createTemplateManager(storageProvider, languageService)
      const historyManager = createHistoryManager(storageProvider, modelManager)
      await modelManager.ensureInitialized()

      try {
        await autoEnableChromeBuiltInModelIfReady(modelManager)
      } catch (err) {
        console.warn('[AppInitializer] Browser built-in AI check failed:', err)
      }

      const imageAdapterRegistry = createImageAdapterRegistry()
      const imageModelManager = createImageModelManager(storageProvider, imageAdapterRegistry)
      await imageModelManager.ensureInitialized()
      const imageService = createImageService(imageModelManager, imageAdapterRegistry)
      const imageUnderstandingService = createImageUnderstandingService({
        registry: textAdapterRegistry,
      })

      const imageStorageService = createImageStorageService({
        maxCacheSize: 50 * 1024 * 1024,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        maxCount: 100,
        autoCleanupThreshold: 0.8,
        dbName: 'PromptOptimizerImageDB',
      })
      const favoriteImageStorageService = createImageStorageService({
        maxCacheSize: 200 * 1024 * 1024,
        maxAge: undefined,
        maxCount: 1000,
        quotaStrategy: 'reject',
        dbName: 'PromptOptimizerFavoriteImageDB',
      })

      const llmService = createLLMService(modelManager)
      const promptService = createPromptService(
        modelManager,
        llmService,
        templateManager,
        historyManager,
        imageUnderstandingService,
      )
      const contextRepo = createContextRepo(storageProvider)
      const dataManager = createDataManager(
        modelManager,
        templateManager,
        historyManager,
        preferenceService,
        contextRepo,
        imageModelManager,
      )

      const favoriteManager = attachFavoriteAssetGc(
        new FavoriteManager(storageProvider),
        favoriteImageStorageService,
      )
      const favoriteAssetGcResult = await runFavoriteAssetGc(
        favoriteManager,
        favoriteImageStorageService,
      )
      if (favoriteAssetGcResult.deletedIds.length > 0) {
        startupRepairReport.value = appendStartupRepairReport(startupRepairReport.value, {
          key: 'PromptOptimizerFavoriteImageDB',
          action: 'removed',
          reason: 'orphan_assets_removed',
          deletedCount: favoriteAssetGcResult.deletedIds.length,
        })
      }

      const evaluationService = createEvaluationService(
        llmService,
        modelManager,
        templateManager,
        { imageStorageService, imageUnderstandingService },
      )
      const variableExtractionService = createVariableExtractionService(
        llmService,
        modelManager,
        templateManager,
      )
      const variableValueGenerationService = createVariableValueGenerationService(
        llmService,
        modelManager,
        templateManager,
      )

      const contextMode = ref<ContextMode>(DEFAULT_CONTEXT_MODE)
      try {
        const currentId = await contextRepo.getCurrentId()
        const currentContext = await contextRepo.get(currentId)
        contextMode.value = currentContext.mode || DEFAULT_CONTEXT_MODE
      } catch (err) {
        console.warn('[AppInitializer] Failed to read context mode:', err)
      }

      services.value = {
        modelManager,
        templateManager,
        historyManager,
        dataManager,
        llmService,
        promptService,
        templateLanguageService: languageService,
        preferenceService,
        compareService: createCompareService(),
        contextRepo,
        favoriteManager,
        contextMode,
        textAdapterRegistry,
        imageModelManager,
        imageService,
        imageAdapterRegistry,
        imageStorageService,
        favoriteImageStorageService,
        evaluationService,
        variableExtractionService,
        variableValueGenerationService,
      }

      scheduleImageStorageGc(preferenceService, imageStorageService, {
        getFavoritesPayload: () => favoriteManager.getFavorites(),
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('[AppInitializer] Service initialization failed:', err)
      error.value = err instanceof Error ? err : new Error(message)
    } finally {
      isInitializing.value = false
    }
  })

  return { services, isInitializing, error, startupRepairReport }
}
