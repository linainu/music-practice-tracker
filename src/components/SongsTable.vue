<template>
  <v-container>
    <Loader v-if="loading">Loading...</Loader>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-btn
            text
            icon
            color="teal darken-2"
            class="float-left"
            @click="
              searchOpen = !searchOpen
              search = ''
            "
          >
            <v-icon>{{ searchIcon }}</v-icon>
          </v-btn>
          <v-text-field
            v-if="searchOpen"
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            color="teal darken-2"
            class="search-input"
          >
          </v-text-field>
        </v-col>
        <v-col>
          <div class="text-end mb-2">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="teal darken-2" text v-on="on">
                  <v-icon dark left>
                    mdi-arrow-up-down
                  </v-icon>
                  Sort
                </v-btn>
              </template>
              <v-list dense>
                <v-list-item-group v-model="selectedSort" color="teal darken-2">
                  <v-list-item
                    v-for="(item, index) in sortOptions"
                    :key="index"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-row>
        <v-col>
          <div :class="{ hide: !isSorted }" class="text-end">
            <v-btn text icon color="teal darken-2" @click="changeOrder">
              <v-icon>{{ arrow }}</v-icon>
            </v-btn>
            <v-chip
              class="ma-2"
              close
              outlined
              color="teal darken-2"
              @click:close="close"
            >
              {{ sortTitle }}
            </v-chip>
          </div>
        </v-col>
      </v-row>

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
            </tr>
          </thead>
          <tbody>
            <tr v-for="song in filteredList" :key="song.id">
              <td>
                <v-btn
                  icon
                  class="text--lighten-1"
                  :class="{
                    'red--text': song.favorite,
                    'grey--text': !song.favorite
                  }"
                  @click="favorite(song.id)"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </td>
              <td>{{ song.artist }}</td>
              <td>
                <a href="#" @click.prevent="$emit('openSong', song)">{{
                  song.title
                }}</a>
              </td>
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
    newSongId: String,
    deletedSongId: String,
    editedSongData: Object
  },
  data: () => ({
    songs: [],
    select: null,
    loading: true,
    sortOptions: [
      {
        title: 'Sort by artist',
        icon: 'mdi-account-music-outline',
        field: 'artist'
      },
      { title: 'Sort by song title', icon: 'mdi-music-note', field: 'title' },
      {
        title: 'Sort by last practiced date',
        icon: 'mdi-calendar',
        field: 'last_practiced'
      },
      {
        title: 'Sort by stage of learning',
        icon: 'mdi-chart-line',
        field: 'status'
      }
    ],
    selectedSort: null,
    isSorted: false,
    ascOrder: true,
    sortTitle: '',
    sortField: '',
    search: '',
    searchOpen: false
  }),
  computed: {
    arrow() {
      return this.ascOrder ? 'mdi-arrow-up' : 'mdi-arrow-down'
    },
    filteredList() {
      return this.songs.filter(item => {
        return (
          item.title.toLowerCase().includes(this.search.toLowerCase()) ||
          item.artist.toLowerCase().includes(this.search.toLowerCase())
        )
      })
    },
    searchIcon() {
      return this.searchOpen ? 'mdi-close' : 'mdi-magnify'
    }
  },

  async mounted() {
    this.songs = await this.$store.dispatch('fetchSongs')
    this.loading = false
  },

  methods: {
    async changeStatus(status, id) {
      await this.$store.dispatch('changeStatus', { id, status })
    },
    async updateLastPracticedDate(id) {
      const date = new Date()
      const idx = this.songs.findIndex(el => el.id == id)
      this.songs[idx].last_practiced = date
      await this.$store.dispatch('updateLastPracticedDate', { id, date })
    },
    async favorite(id) {
      const idx = this.songs.findIndex(el => el.id == id)
      this.songs[idx].favorite = !this.songs[idx].favorite
      const favorite = this.songs[idx].favorite
      await this.$store.dispatch('updateFavorite', { id, favorite })
    },
    close() {
      this.sortItems(this.songs, 'creation_date', false)
      this.isSorted = false
      this.selectedSort = null
    },
    sortItems(arr, field, order = true) {
      arr.sort((a, b) => {
        if (a[field] > b[field]) {
          return order ? 1 : -1
        }
        if (a[field] < b[field]) {
          return order ? -1 : 1
        }
        return 0
      })
    },
    changeOrder() {
      this.ascOrder = !this.ascOrder
      this.sortItems(this.songs, this.sortField, this.ascOrder)
    }
  },

  watch: {
    async newSongId(id) {
      const song = await this.$store.dispatch('fetchSongById', id)
      this.songs.unshift(song)
    },
    selectedSort(idx) {
      if (idx !== null) {
        const sortOpt = this.sortOptions[idx]
        this.sortTitle = sortOpt.title
        this.sortField = sortOpt.field
        this.sortItems(this.songs, this.sortField, this.ascOrder)
        this.isSorted = true
      }
    },
    deletedSongId(id) {
      const idx = this.songs.findIndex(el => el.id == id)
      this.songs.splice(idx, 1)
    },

    'editedSongData.title'(val) {
      const idx = this.songs.findIndex(el => el.id == this.editedSongData.id)

      this.songs[idx].title = val
    }
  }
}
</script>

<style>
.select-status {
  width: 180px;
}

td {
  padding: 8px 16px !important;
}

table .v-input__control {
  flex-direction: row !important;
  flex-wrap: nowrap !important;
}

.hide {
  visibility: hidden;
}

table .v-input {
  font-size: 14px;
}

.search-input {
  padding-top: 0px !important;
}
</style>
