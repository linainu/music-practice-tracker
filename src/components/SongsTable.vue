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
          <!-- <th class="text-left">
            Status
          </th>
          <th class="text-left">
            Last Practiced
          </th>
          <th class="text-left">
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
          <td>{{ song.title }}</td>
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
      loading: true
    }),

    async mounted() {
      this.songs = await this.$store.dispatch('fetchSongs')
      this.loading = false
    }
  }
</script>