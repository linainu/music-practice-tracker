<template>
  <v-container>
    <v-row no-gutters justify="center">
      <v-col
       lg="8"
       md="10"
      >
      <div class="pl-3 mb-3">
        <h1>Songs</h1>
      </div>
      <songs-table :statuses=statuses :newSongId=newSongId @openSong="onOpenSong"></songs-table>
      <add-song-form :statuses=statuses @addSong="onAddSong"></add-song-form>
    </v-col>
    </v-row>

    <edit-song-form :countOpen=countOpen :statuses=statuses :song=openedSong></edit-song-form>
  </v-container>
</template>

<script>
import SongsTable from '@/components/SongsTable.vue';
import AddSongForm from '@/components/AddSongForm.vue';
import EditSongForm from '@/components/EditSongForm.vue';

  export default {
    name: 'Songs',
    components: {SongsTable, AddSongForm, EditSongForm},
    data: () => ({
      statuses: [
        {text: 'Want to Learn', value: 'WL', color: "red lighten-1"}, 
        {text: 'In Progress', value: 'IP', color: "yellow lighten-1"},
        {text: 'Kind of Know', value: 'KK', color: "yellow lighten-1"},
        {text: 'Learned', value: 'L', color: "green lighten-1"}
      ],
      newSongId: null,
      openedSong: null,
      countOpen: 0
    }),
    methods: {
      onAddSong(songId) {
        this.newSongId = songId
      },
      onOpenSong(song) {
        this.openedSong = song
        this.countOpen += 1
      }
    }
  }
</script>