<template>
  <v-app>
    <navbar @open:sidebar="drawer = true"></navbar>
    <sidebar @close:sidebar="drawer = $event" :drawer="drawer"></sidebar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';


export default {
  components: { Navbar, Sidebar },
  name: 'MainLayout',

  data: () => ({
    drawer: false,
  }),
};
</script>