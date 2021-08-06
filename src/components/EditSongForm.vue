<template>
<div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ songTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="artist"
                  label="Artist"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Title*"
                  required
                  :rules="titleRules"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="status"
                  :items="statuses"
                  item-text="text"
                  item-value="value"
                  label="Status*"
                  required
                  :rules="statusRules"
                ></v-select>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <delete-dialog @deleteSong="onDeleteSong" :id="id" :title="title" :artist="artist"></delete-dialog>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-2"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="teal darken-2"
            text
            :disabled="!valid"
            @click="validate"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import DeleteDialog from '@/components/DeleteDialog.vue'

  export default {
    name: 'EditSongForm',
    components: {DeleteDialog},
    props: {
      statuses: Array,
      song: Object,
    	countOpen: Number
    },
    data: () => ({
      valid: true,
      dialog: false,
      title: '',
      artist: '',
      id: '',
      status: null,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      statusRules: [
        v => !!v || 'Status is required',
      ],
      
    }),
    computed: {
      songTitle() {
        if (this.song !== null) {
          return this.song.title
        }
      }
    },
    methods: {
      async validate() {
        if(this.$refs.form.validate()) {
          let updated = false
          const updatedData = {id: this.song.id}
          try {
            if (this.artist !== this.song.artist) {
              const data = {id: this.song.id, artist: this.artist}
              await this.$store.dispatch('updateSongArtist', data)
              updated = true
              updatedData.artist = this.artist
              
            }

            if (this.title !== this.song.title) {
              const data = {id: this.song.id, title: this.title}
              await this.$store.dispatch('updateSongTitle', data)
              updated = true
              updatedData.title = this.title
            }

            if (this.status !== this.song.status) {
              const data = {id: this.song.id, status: this.status}
              await this.$store.dispatch('updateSongStatus', data)
              updated = true
              updatedData.status = this.status
            }

            this.dialog = false
            if (updated) this.$emit('editSong', updatedData)
            
            
            
          } catch(e) {

          }
        }
      },
      onDeleteSong(id) {
        this.dialog = false
        this.$emit('deleteSong', id)
      }

    },
    watch: {
      async song(val) {
        // const song = await this.$store.dispatch('fetchSongById', id.id)
        const {id, artist, title, status} = val
        this.id = id
        this.artist = artist
        this.title = title
        this.status = status

      },
      countOpen() {
        this.dialog = true
      },
    },

    
  }
</script>