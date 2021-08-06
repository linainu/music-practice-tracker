<template>
  <v-container>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        top
        right
      >
        {{ msgText }}
      </v-snackbar>
    <v-row no-gutters justify="center">
      <v-col
       lg="8"
       md="10"
      >
      <div class="pl-3 mb-3">
        <h1>Account</h1>
      </div>
      
      <Loader v-if="loading"></Loader>
      <div class="" v-else>
         <v-col
          cols="12"
          sm="6"
          md="4"
        >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation>
          <v-subheader class="float-left">Name</v-subheader>
            <v-text-field
                solo
                :counter="10"
                v-model="name"
                label="Name"
                :rules="nameRules"
                required
            ></v-text-field>
            <v-btn
            color="blue darken-2"
            text
            @click="cancelChanges()"
            v-if="edited"
            >
            Cancel
          </v-btn>
          <v-btn
            color="teal darken-2"
            text
            
            :disabled="!valid"
            @click="validate"
            v-if="edited"
          >
            Save
          </v-btn>

          </v-form>
          
         </v-col>
      </div>
      
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'Account',
    data: () => ({
      snackbar: false,
      timeout: 2000,
      msgText: '',
      user: {},
      name: '',
      loading: true,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
    }),

    async mounted() {
        this.user = await this.$store.dispatch('fetchUserInfo')
        this.name = this.user.name
        this.loading = false
    },
    methods: {
        validate() {
            if(this.$refs.form.validate()) {
                try {
                    this.$store.dispatch('updateUserName', this.name)
                    this.user.name = this.name
                    this.msgText = 'The name has been updated'
                    this.snackbar = true
                } catch(e) {

                }
            }
        },
        cancelChanges() {
            this.name = this.user.name
        }

    },

    computed: {
        edited: {
            get() {
                return this.name == this.user.name ? false : true
            }
            
        }
    }
}
</script>