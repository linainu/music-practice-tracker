<template>
    <v-app>
        <v-main>
            <v-snackbar
              v-model="snackbar"
              :timeout="timeout"
            >
            {{ errorText }}
            </v-snackbar>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: 'EmptyLayout',
    data: () => ({
      timeout: 2000,
      snackbar: false,
    }),
    computed: {
      error() {
        return this.$store.getters.error
      },

      errorText() {
          if (this.error != undefined) {
              return this.error.message
          }
      }
    },

    watch: {
      error() {
        this.snackbar = true
      }
  },
}
</script>