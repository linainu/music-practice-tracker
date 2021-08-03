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
      <div class="pl-3 mb-3">
        <h1>Songs</h1>
      </div>
      <songs-table></songs-table>
      <div class="text-center">
        <v-btn
          class="mx-2"
          fab
          dark
          color="teal darken-2"
        >
        <v-icon dark>
          mdi-plus
        </v-icon>
        </v-btn>
      </div>
    
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