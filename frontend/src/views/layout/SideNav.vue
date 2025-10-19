<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
  menuItems: {
    type: Array,
    default: () => [],
  },
})

const router = useRouter()
const route = useRoute()

const activePath = computed(() => route.meta?.activePath || route.path)

const handleSelect = (path) => {
  if (path === route.path) {
    return
  }
  router.push(path)
}
</script>

<template>
  <aside class="layout-sidenav" :class="{ 'is-collapsed': collapsed }">
    <div class="layout-sidenav__brand">
      <span class="layout-sidenav__dot" />
      <span v-if="!collapsed" class="layout-sidenav__title">ProjectFlow</span>
    </div>
    <el-menu
      class="layout-sidenav__menu"
      :default-active="activePath"
      :collapse="collapsed"
      background-color="transparent"
      :unique-opened="true"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
        <el-icon class="layout-sidenav__icon">
          <component :is="item.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.label }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<style lang="less" scoped>
.layout-sidenav {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 240px;
  height: 100vh;
  background-color: var(--pf-aside);
  border-right: 1px solid var(--pf-border);
  transition: width 0.24s ease, background-color 0.2s ease, border-color 0.2s ease;
  padding: 24px 16px;
  gap: 16px;
  overflow: hidden;

  &.is-collapsed {
    width: 76px;
    padding: 24px 12px;
  }

  &__brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-weight: 700;
    font-size: 18px;
    color: var(--pf-text);
    min-height: 32px;
    padding: 0 8px;
    transition: color 0.2s ease, opacity 0.2s ease, transform 0.2s ease;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--pf-success), var(--pf-info));
    box-shadow: 0 0 6px rgba(45, 92, 156, 0.4);
  }

  &__title {
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  &__menu {
    flex: 1;
    border-right: none;
    background-color: transparent;

    :deep(.el-menu-item) {
      height: 44px;
      margin-bottom: 8px;
      border-radius: 12px;
      color: var(--pf-text-2);
      transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;

      &.is-active {
        background: var(--pf-active);
        color: var(--pf-text);
        font-weight: 600;
      }

      &:hover {
        background-color: var(--pf-hover);
        color: var(--pf-text);
        transform: translateX(4px);
      }

      .el-icon {
        color: inherit;
      }
    }
  }

  &__icon {
    font-size: 18px;
  }
}
</style>
