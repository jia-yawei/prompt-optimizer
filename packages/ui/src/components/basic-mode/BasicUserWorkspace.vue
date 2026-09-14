<template>
  <div class="basic-user-workspace" data-testid="workspace" data-mode="basic-user">
    <div class="workspace-page-tools">
      <WorkspaceUtilityMenu
        :disabled="isBusy"
        :source="resolveSourceAssetRef(session.origin, session.assetBinding)"
        test-id="basic-user-workspace-utility-menu"
        @clear="logic.clearContent"
      />
    </div>

    <NFlex vertical size="medium" class="workspace-content">
      <NCard size="small" :bordered="true" class="input-card">
        <InputPanelUI
          v-model="promptModel"
          test-id-prefix="basic-user"
          :selected-model="selectedOptimizeModelKeyModel"
          :label="t('promptOptimizer.originalPrompt')"
          :placeholder="t('promptOptimizer.placeholder')"
          :model-label="t('promptOptimizer.optimizeModel')"
          :template-label="t('promptOptimizer.templateLabel')"
          :button-text="t('promptOptimizer.optimize')"
          :loading-text="t('common.loading')"
          :loading="logic.isOptimizing.value"
          :disabled="isBusy"
          :show-preview="false"
          :show-analyze-button="false"
          @submit="logic.handleOptimize"
          @config-model="handleOpenModelManager"
        >
          <template #model-label-extra>
            <TextModelQuickSwitch
              :model-key="selectedOptimizeModelKeyModel"
              :options="modelSelection.textModelOptions.value"
              :refresh-models="modelSelection.refreshTextModels"
              :disabled="isBusy"
            />
          </template>

          <template #model-select>
            <SelectWithConfig
              v-model="selectedOptimizeModelKeyModel"
              :options="modelSelection.textModelOptions"
              :get-primary="OptionAccessors.getPrimary"
              :get-secondary="OptionAccessors.getSecondary"
              :get-value="OptionAccessors.getValue"
              :placeholder="t('model.select.placeholder')"
              :disabled="isBusy"
              filterable
              :show-config-action="true"
              :show-empty-config-c-t-a="true"
              @focus="modelSelection.refreshTextModels"
              @config="handleOpenModelManager"
            />
          </template>

          <template #template-select>
            <SelectWithConfig
              v-model="selectedTemplateIdModel"
              :options="templateSelection.templateOptions"
              :get-primary="OptionAccessors.getPrimary"
              :get-secondary="OptionAccessors.getSecondary"
              :get-value="OptionAccessors.getValue"
              :placeholder="t('template.select')"
              :disabled="isBusy"
              filterable
              :show-config-action="true"
              :show-empty-config-c-t-a="true"
              @focus="templateSelection.refreshOptimizeTemplates"
              @config="() => handleOpenTemplateManager('userOptimize')"
            />
          </template>
        </InputPanelUI>
      </NCard>

      <NCard size="small" :bordered="true" class="result-card" content-style="height: 100%; overflow: hidden;">
        <PromptPanelUI
          test-id="basic-user"
          v-model:optimized-prompt="optimizedPromptModel"
          :reasoning="logic.optimizedReasoning.value"
          :original-prompt="promptModel"
          :is-optimizing="logic.isOptimizing.value"
          :is-iterating="logic.isIterating.value"
          v-model:selected-iterate-template="selectedIterateTemplate"
          :versions="logic.currentVersions.value"
          :current-version-id="logic.currentVersionId.value"
          optimization-mode="user"
          :advanced-mode-enabled="false"
          :show-preview="false"
          @iterate="logic.handleIterate"
          @open-template-manager="handleOpenTemplateManager"
          @switch-version="logic.handleSwitchVersion"
          @switch-to-v0="logic.handleSwitchToV0"
          @save-local-edit="handleSaveLocalEdit"
        />
      </NCard>
    </NFlex>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NFlex } from 'naive-ui'
import { type Template } from '@prompt-optimizer/core'
import { useBasicUserSession } from '../../stores/session/useBasicUserSession'
import { useBasicWorkspaceLogic } from '../../composables/workspaces/useBasicWorkspaceLogic'
import { useWorkspaceModelSelection } from '../../composables/workspaces/useWorkspaceModelSelection'
import { useWorkspaceTemplateSelection } from '../../composables/workspaces/useWorkspaceTemplateSelection'
import type { AppServices } from '../../types/services'
import { resolveSourceAssetRef } from '../../utils/source-asset'
import { OptionAccessors } from '../../utils/data-transformer'
import InputPanelUI from '../InputPanel.vue'
import PromptPanelUI from '../PromptPanel.vue'
import SelectWithConfig from '../SelectWithConfig.vue'
import TextModelQuickSwitch from '../TextModelQuickSwitch.vue'
import WorkspaceUtilityMenu from '../common/WorkspaceUtilityMenu.vue'

const { t } = useI18n()
const services = inject<Ref<AppServices | null>>('services', ref<AppServices | null>(null))
const appOpenModelManager = inject<((tab?: 'text') => void) | null>('openModelManager', null)
const appOpenTemplateManager = inject<((type?: string) => void) | null>('openTemplateManager', null)
const session = useBasicUserSession()

const logic = useBasicWorkspaceLogic({
  services,
  sessionStore: session,
  optimizationMode: 'user',
  promptRecordType: 'userOptimize',
  onOptimizeComplete: () => window.dispatchEvent(new CustomEvent('prompt-optimizer:history-refresh')),
  onIterateComplete: () => window.dispatchEvent(new CustomEvent('prompt-optimizer:history-refresh')),
  onLocalEditComplete: () => window.dispatchEvent(new CustomEvent('prompt-optimizer:history-refresh')),
})

const modelSelection = useWorkspaceModelSelection(services, session)
const templateSelection = useWorkspaceTemplateSelection(services, session, 'userOptimize', 'iterate')
const isBusy = computed(() => logic.isOptimizing.value || logic.isIterating.value)

const promptModel = computed({
  get: () => logic.prompt.value,
  set: (value: string) => { logic.prompt.value = value },
})
const optimizedPromptModel = computed({
  get: () => logic.optimizedPrompt.value,
  set: (value: string) => { logic.optimizedPrompt.value = value },
})
const selectedOptimizeModelKeyModel = computed({
  get: () => logic.selectedOptimizeModelKey.value,
  set: (value: string) => { logic.selectedOptimizeModelKey.value = value },
})
const selectedTemplateIdModel = computed({
  get: () => logic.selectedTemplateId.value,
  set: (value: string | null) => { logic.selectedTemplateId.value = value },
})
const selectedIterateTemplate = computed<Template | null>({
  get: () => templateSelection.selectedIterateTemplate.value,
  set: (value) => {
    templateSelection.selectedIterateTemplateId.value = value?.id ?? ''
    templateSelection.selectedIterateTemplate.value = value ?? null
  },
})

const handleOpenModelManager = () => appOpenModelManager?.('text')
const handleOpenTemplateManager = (type?: string) => appOpenTemplateManager?.(type || 'userOptimize')
const handleSaveLocalEdit = (payload: { note?: string }) => logic.handleSaveLocalEdit({
  optimizedPrompt: logic.optimizedPrompt.value || '',
  note: payload.note,
  source: 'manual',
})
const refreshTextModels = () => modelSelection.refreshTextModels()
const refreshTemplates = async () => {
  await templateSelection.refreshOptimizeTemplates()
  await templateSelection.refreshIterateTemplates()
}

onMounted(async () => {
  await logic.loadVersions()
  await Promise.all([refreshTextModels(), refreshTemplates()])
  window.addEventListener('basic-workspace-refresh-text-models', refreshTextModels)
  window.addEventListener('basic-workspace-refresh-templates', refreshTemplates)
})

onUnmounted(() => {
  window.removeEventListener('basic-workspace-refresh-text-models', refreshTextModels)
  window.removeEventListener('basic-workspace-refresh-templates', refreshTemplates)
})
</script>

<style scoped>
.basic-user-workspace {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.workspace-page-tools {
  display: contents;
}

.workspace-content {
  height: 100%;
  min-height: 0;
}

.input-card {
  flex: 0 0 auto;
}

.result-card {
  flex: 1 1 auto;
  min-height: 280px;
  overflow: hidden;
}
</style>
