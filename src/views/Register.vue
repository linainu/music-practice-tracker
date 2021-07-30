<template>
<v-card 
 class="pa-6 mx-auto mt-16"
 max-width="600px">
  <v-card-title class="pink--text text--darken-4">Music Practice Tracker</v-card-title>
  <v-card-text>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
        ></v-text-field>

        <v-text-field
        v-model="password"
        :counter="8"
        :rules="passwordRules"
        label="Password"
        required
        ></v-text-field>

        <v-btn
        :disabled="!valid"
        color="teal darken-2 white--text"
        @click="validate"
        >
        REGISTER
        </v-btn>
      </v-form>
  </v-card-text>
</v-card>
</template>

<script>
export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password must be at least 8 characters',
      ]
    }),

    methods: {
      async validate () {
          if(this.$refs.form.validate()) {
            const formData = {
                email: this.email,
                password: this.password,
                name: this.name
            }

            try {
                await this.$store.dispatch('register', formData)
                this.$router.push('/')
            } catch (e) {
                // console.log(e)
            }
          }
        
      },
    },
  }
</script>