<template>
  <v-container>
    <v-row no-gutters>
      <v-col
       xl="6"
       offset-xl="3"
       lg="6"
       offset-lg="3"
       md="8"
       offset-md="2"
      >
        <h1>Songs</h1>
        <songs-table></songs-table>
      </v-col>
    </v-row> 
  </v-container>
</template>

<script>
import SongsTable from '@/components/SongsTable.vue';

  export default {
    name: 'Songs',
    components: {SongsTable}
  }
</script>
