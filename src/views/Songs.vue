<template>
  <v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout" top right>
      {{ msgText }}
    </v-snackbar>
    <v-row no-gutters justify="center">
      <v-col lg="8" md="10">
        <div class="pl-3 mb-3">
          <h1>Songs</h1>
        </div>
        <songs-table
          :statuses="statuses"
          :newSong="newSong"
          :deletedSongId="deletedSongId"
          :editedSongData="editedSongData"
          @openSong="onOpenSong"
        ></songs-table>
        <add-song-form
          :statuses="statuses"
          @addSong="onAddSong"
        ></add-song-form>
      </v-col>
    </v-row>

    <edit-song-form
      :countOpen="countOpen"
      :statuses="statuses"
      :song="openedSong"
      @deleteSong="onDeleteSong"
      @editSong="onEditSong"
    ></edit-song-form>
  </v-container>
</template>

<script>
import SongsTable from '@/components/SongsTable.vue'
import AddSongForm from '@/components/AddSongForm.vue'
import EditSongForm from '@/components/EditSongForm.vue'

export default {
  name: 'Songs',
  components: { SongsTable, AddSongForm, EditSongForm },
  data: () => ({
    statuses: [
      { text: 'Want to Learn', value: 1, color: 'red lighten-1' },
      { text: 'In Progress', value: 2, color: 'yellow lighten-1' },
      { text: 'Kind of Know', value: 3, color: 'yellow lighten-1' },
      { text: 'Learned', value: 4, color: 'green lighten-1' }
    ],
    newSong: null,
    openedSong: null,
    deletedSongId: null,
    editedSongData: {
      id: '',
      artist: '',
      title: '',
      status: ''
    },
    countOpen: 0,
    timeout: 2000,
    snackbar: false,
    msgText: ''
  }),
  methods: {
    onAddSong(song) {
      this.newSong = song
      this.msgText = 'The song has been added'
      this.snackbar = true
    },
    onOpenSong(song) {
      this.openedSong = song
      this.countOpen += 1
    },
    onDeleteSong(songId) {
      this.deletedSongId = songId
      this.msgText = 'The song has been deleted'
      this.snackbar = true
    },
    onEditSong(data) {
      this.editedSongData.id = data.id
      if (data.artist !== undefined) {
        this.editedSongData.artist = data.artist
      }

      if (data.title !== undefined) {
        this.editedSongData.title = data.title
      }

      this.msgText = 'The song has been updated'
      this.snackbar = true
    }
  }
}
</script>
