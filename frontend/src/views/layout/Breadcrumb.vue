<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const crumbs = computed(() =>
  route.matched
    .filter((item) => item.meta?.title && item.path !== '/')
    .map((item) => ({
      path: item.path,
      title: item.meta.title,
      disabled: item.path === route.path
    }))
)

const handleNavigate = (path, disabled) => {
  if (disabled) {
    return
  }
  router.push(path)
}
</script>

<template>
  <div class="layout-breadcrumb">
    <div class="layout-breadcrumb__inner">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item to="/" @click.prevent="handleNavigate('/', false)">
          主页
        </el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="item in crumbs"
          :key="item.path"
          :class="{ 'is-current': item.disabled }"
        >
          <a
            v-if="!item.disabled"
            href="#"
            @click.prevent="handleNavigate(item.path, item.disabled)"
          >
            {{ item.title }}
          </a>
          <span v-else>{{ item.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<style lang="less" scoped>
.layout-breadcrumb {
  padding: 0 32px;
  color: var(--pf-text-2);
  display: flex;
  align-items: center;
  min-height: 32px;
  border-bottom: 1px solid var(--pf-border);
  background-color: color-mix(in srgb, var(--pf-header) 55%, var(--pf-bg));

  &__inner {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  :deep(.el-breadcrumb__item) {
    font-size: 14px;

    a {
      color: inherit;
      transition: color 0.2s ease;

      &:hover {
        color: var(--pf-text);
      }
    }

    &.is-current span {
      color: var(--pf-text);
      font-weight: 600;
    }
  }
}
</style>
