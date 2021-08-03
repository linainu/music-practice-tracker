<template>
<v-container>
   <div v-if="loading">Loading...</div>
    <v-simple-table v-else>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Artist
          </th>
          <th class="text-left">
            Song
          </th>
          <th class="text-left">
            Status
          </th>
          <th class="text-left">
            Last Practiced
          </th>
          <th></th>
          <!-- <th class="text-left">
            Link
          </th> -->
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="song in songs"
          :key="song.id"
        >
          <td>{{ song.artist }}</td>
          <td><a href="#">{{ song.title }}</a></td>
          <td>
            <v-select
              v-model="song.status"
              :items="statuses"
              item-text="text"
              item-value="value"
              label="Status"
              solo
              dense
              class="select-status pt-7"
              @change="changeStatus($event, song.id)"
            ></v-select>
          </td>
          <td>{{ song.last_practiced | date }}</td>
          <td>
            <v-btn
            text
            icon
            large
            color="teal darken-2"
            @click="updateLastPracticedDate(song.id)"
            >
            <v-icon>mdi-update</v-icon>
              </v-btn> 
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      songs: [],
      select: null,
      statuses: [
        {text: 'Want to Learn', value: 'WL', color: "red lighten-1"}, 
        {text: 'In Progress', value: 'IP', color: "yellow lighten-1"},
        {text: 'Kind of Know', value: 'KK', color: "yellow lighten-1"},
        {text: 'Learned', value: 'L', color: "green lighten-1"}
      ],
      loading: true
    }),

    async mounted() {
      this.songs = await this.$store.dispatch('fetchSongs')
      this.loading = false
    },

    methods: {
      async changeStatus(status, id) {
        await this.$store.dispatch('changeStatus', {id, status})
      },
      async updateLastPracticedDate(id) {
        const date = new Date()
        const idx = this.songs.findIndex(el => el.id == id)
        this.songs[idx].last_practiced = date
        await this.$store.dispatch('updateLastPracticedDate', {id, date})
      }
    }
  }
</script>

<style scoped>
.select-status {
  width: 150px;
  font-size: 0.875rem;
}


</style>