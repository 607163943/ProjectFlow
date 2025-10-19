<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { Collection, TrendCharts, View, User, DataLine, Setting } from '@element-plus/icons-vue'
import SideNav from './SideNav.vue'
import HeaderBar from './HeaderBar.vue'
import Breadcrumb from './Breadcrumb.vue'
import { useThemeStore } from '@/stores/theme'

const isCollapsed = ref(false)
useThemeStore()

const menuItems = [
  { label: 'Projects', path: '/projects', icon: Collection },
  { label: 'Initiatives', path: '/initiatives', icon: TrendCharts },
  { label: 'Views', path: '/views', icon: View },
  { label: 'Teams', path: '/teams', icon: User },
  { label: 'Pulse', path: '/pulse', icon: DataLine },
  { label: 'Settings', path: '/settings', icon: Setting },
]

const handleToggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <div class="layout-shell">
    <SideNav :collapsed="isCollapsed" :menu-items="menuItems" />
    <div class="layout-shell__main">
      <HeaderBar :collapsed="isCollapsed" @toggle-collapse="handleToggleCollapse" />
      <main class="layout-shell__content">
        <Breadcrumb />
        <section class="layout-shell__viewport pf-scroll-area">
          <RouterView />
        </section>
      </main>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-shell {
  display: flex;
  min-height: 100vh;
  background-color: var(--pf-bg);
  transition: background-color 0.2s ease;

  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background-color: var(--pf-bg);
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
  }

  &__viewport {
    flex: 1;
    padding: 0 24px;
    min-height: 0;
  }
}
</style>
