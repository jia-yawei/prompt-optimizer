<template>
  <NSpace :size="12" align="center" data-testid="core-nav">
    <NText depth="2">{{ t('promptOptimizer.userPrompt') }}</NText>
  </NSpace>
</template>

<script setup lang="ts">
import { NSpace, NText } from 'naive-ui'
import { useI18n } from 'vue-i18n'

defineProps<{
  workspacePath?: string
  allowWorkspaceReselect?: boolean
}>()

const { t } = useI18n()
</script>
