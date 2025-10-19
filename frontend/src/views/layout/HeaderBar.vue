<script setup>
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { Fold, Expand, Sunny, Moon } from '@element-plus/icons-vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleCollapse'])

const themeStore = useThemeStore()

const collapseIcon = computed(() => (props.collapsed ? Expand : Fold))
const themeIcon = computed(() => (themeStore.isDark ? Sunny : Moon))
const themeButtonText = computed(() => (themeStore.isDark ? '切换到亮色' : '切换到暗色'))

const handleCollapse = () => {
  emit('toggleCollapse')
}

const handleThemeToggle = () => {
  themeStore.toggleTheme()
}
</script>

<template>
  <header class="layout-header">
    <div class="layout-header__left">
      <el-button
        class="layout-header__collapse-btn"
        :icon="collapseIcon"
        circle
        plain
        @click="handleCollapse"
      />
    </div>
    <div class="layout-header__right">
      <el-button class="layout-header__theme-btn" @click="handleThemeToggle">
        <el-icon>
          <component :is="themeIcon" />
        </el-icon>
        <span>{{ themeButtonText }}</span>
      </el-button>
    </div>
  </header>
</template>

<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 24px;
  background-color: var(--pf-header);
  border-bottom: 1px solid var(--pf-border);
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
  gap: 24px;

  &__left {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__collapse-btn {
    border-color: var(--pf-border);
    color: var(--pf-text);

    &:hover {
      background-color: var(--pf-hover);
      border-color: var(--pf-stroke);
    }
  }

  &__right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__theme-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: 1px solid var(--pf-btn-ghost-border);
    background-color: var(--pf-btn-ghost-bg);
    color: var(--pf-text);
    transition:
      background-color 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      background-color: var(--pf-btn-ghost-hover);
    }

    &:active {
      background-color: var(--pf-active);
    }
  }
}
</style>
