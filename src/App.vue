<template>
  <component :is="layout">
      <router-view />
  </component>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  data: () => ({
    timeout: 5000,
    snackbar: false,
  }),
  computed: {
    layout() {
      return (this.$route.meta.layout || 'Empty') + 'Layout'
    },
  },

  components: {
    EmptyLayout, MainLayout
  },
}
</script>

<style>
@import './assets/index.scss';
</style>