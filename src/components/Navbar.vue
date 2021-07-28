<template>
    <v-app-bar app color="pink darken-4" dark>
      <v-app-bar-nav-icon @click="$emit('open:sidebar')"></v-app-bar-nav-icon>
      <v-app-bar-title>Music Practice Tracker</v-app-bar-title>
    </v-app-bar>
</template>

<script>

export default {
  name: 'Navbar',

  data: () => ({
    
  }),
};
</script>
