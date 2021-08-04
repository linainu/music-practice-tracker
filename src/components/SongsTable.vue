<template>
<v-container>
   <div v-if="loading">Loading...</div>
   <div v-else>
    <div class="text-end mb-5">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="teal darken-2"
          text
          v-bind="attrs"
          v-on="on"
        >
        <v-icon
          dark
          left
        >
          mdi-arrow-up-down
        </v-icon>
        Sort
        
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th></th>
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
          <td>
            <v-btn
              icon
              class="text--lighten-1"
              :class="{'red--text': song.favorite, 'grey--text': !song.favorite}"
              @click="favorite(song.id)"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </td>
          <td>{{ song.artist }}</td>
          <td><a href="#" @click.prevent="$emit('openSong', song)">{{ song.title }}</a></td>
          <td>
            <v-select
              v-model="song.status"
              :items="statuses"
              item-text="text"
              item-value="value"
              label="Status"
              solo
              dense
              class="select-status"
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
  </div>
</v-container>
</template>

<script>

  export default {
    props: {
      statuses: Array,
      newSongId: String
    },
    data: () => ({
      songs: [],
      select: null,
      loading: true,
      items: [
        { title: 'Sort alphabetically', icon: ''},
        { title: 'Sort by last practiced date' },
        { title: 'Sort by' },
        { title: 'Click Me 2' },
      ],
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
      },
      async favorite(id) {
        const idx = this.songs.findIndex(el => el.id == id)
        this.songs[idx].favorite = !this.songs[idx].favorite
        const favorite = this.songs[idx].favorite
        await this.$store.dispatch('updateFavorite', {id, favorite})

      }
    },

    watch: {
      async newSongId(id) {
        const song = await this.$store.dispatch('fetchSongById', id)
        this.songs.unshift(song)
      }
    },
  }
</script>

<style>
.select-status {
  width: 200px;
  font-size: 0.875rem;
}

td {
  padding: 8px 12px !important;
}

.v-input__control {
  flex-direction: row !important;
  flex-wrap: nowrap !important;
}


</style>