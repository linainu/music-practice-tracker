<template>
  <v-navigation-drawer v-model="localDrawer" absolute temporary>
    <v-list nav dense>
      <v-list-item-group v-model="group">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.link"
          active-class="teal--text text--darken-2"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>

        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Log Out</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  props: {
    drawer: Boolean
  },
  data: () => ({
    group: 0,
    items: [
      { text: 'Songs', icon: 'mdi-music', link: '/' },
      { text: 'Account', icon: 'mdi-account-outline', link: '/account' }
    ]
  }),
  computed: {
    localDrawer: {
      get: function() {
        return this.drawer
      },

      set: function(newValue) {
        this.$emit('close:sidebar', newValue)
      }
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  }
}
</script>
