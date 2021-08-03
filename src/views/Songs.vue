<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col
       lg="6"
       md="8"
      >
      <div class="pl-3 mb-3">
        <h1>Songs</h1>
      </div>
      <songs-table :statuses=statuses :newSongId = newSongId></songs-table>
      <div class="text-center">
        <add-song-form :statuses=statuses @addSong="onAddSong"></add-song-form>
      </div>
    
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SongsTable from '@/components/SongsTable.vue';
import AddSongForm from '@/components/AddSongForm.vue';


  export default {
    name: 'Songs',
    components: {SongsTable, AddSongForm},
    data: () => ({
      statuses: [
        {text: 'Want to Learn', value: 'WL', color: "red lighten-1"}, 
        {text: 'In Progress', value: 'IP', color: "yellow lighten-1"},
        {text: 'Kind of Know', value: 'KK', color: "yellow lighten-1"},
        {text: 'Learned', value: 'L', color: "green lighten-1"}
      ],
      newSongId: null
    }),
    methods: {
      onAddSong(songId) {
        this.newSongId = songId
      }
    }
  }
</script>