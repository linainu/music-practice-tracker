<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
            <v-fab-transition>
              <v-btn
                color="teal darken-2"
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-fab-transition>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Song</span>
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
                  v-model="select"
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
          <v-spacer></v-spacer>
          <v-btn
            color="red lighten-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="teal darken-2"
            text
            :disabled="!valid"
            @click="validate"
          >
            ADD
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: 'CreateSongForm',
    props: {
      statuses: Array
    },
    data: () => ({
      valid: true,
      dialog: false,
      title: '',
      artist: '',
      select: null,
      titleRules: [
        v => !!v || 'Title is required',
      ],
      statusRules: [
        v => !!v || 'Status is required',
      ],
    }),
    methods: {
      async validate() {
        if(this.$refs.form.validate()) {
          // console.log('val')

          const formData = {
            title: this.title,
            artist: this.artist,
            status: this.select
          }

          try {
            const id = await this.$store.dispatch('createSong', formData)
            this.dialog = false
            this.$emit('addSong', id)
          } catch(e) {

          }
        }
      }
    }
  }
</script>
