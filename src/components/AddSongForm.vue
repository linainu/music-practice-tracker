<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn
        color="teal darken-2 fixed-button"
        dark
        fab
        large
        :style="{ left: '50%', transform: 'translateX(-50%)' }"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Add Song</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="artist" label="Artist"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="title"
                  label="Title*"
                  required
                  :rules="titleRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
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
        <v-spacer></v-spacer>
        <v-btn color="blue darken-2" text @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="teal darken-2" text :disabled="!valid" @click="validate">
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
    status: null,
    titleRules: [v => !!v || 'Title is required'],
    statusRules: [v => !!v || 'Status is required']
  }),
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const song = {
          title: this.title,
          artist: this.artist,
          status: this.status
        }

        try {
          const id = await this.$store.dispatch('createSong', song)
          this.$refs.form.reset()
          song.id = id
          song.last_practiced = null
          this.$emit('addSong', song)
          this.dialog = false
        } catch (e) {}
      }
    }
  }
}
</script>

<style scoped>
.fixed-button {
  position: fixed;
  bottom: 20px;
  right: 0;
}
</style>
