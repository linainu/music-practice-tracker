<template>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-1"
          text
          v-bind="attrs"
          v-on="on"
        >
          Delete
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Delete Song
        </v-card-title>
        <v-card-text>Are you sure you want to delete <strong>{{ artist }} {{ dash }} {{ title }}</strong>?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-2"
            text
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red lighten-1"
            text
            @click="deleteSong(id)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
    name: 'DeleteDialog',
    props: {
        id: String,
        title: String,
        artist: String
    },
    data: () => ({
        dialog: false
    }),
    methods: {
    async deleteSong(id) {
        try {
          await this.$store.dispatch('deleteSong', id)
        } catch(e) {}
        
        this.dialog = false
        this.$emit('deleteSong', id)
    }
    },
    computed: {
        dash() {
            return this.artist ? '—' : ''
        }
    }
}
</script>