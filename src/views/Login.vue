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
        v-model="email"
        label="E-mail"
        :rules="emailRules"
        required
        ></v-text-field>

        <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        :rules="passwordRules"
        @click:append="showPassword = !showPassword"
        required
        ></v-text-field>

        <v-btn
        :disabled="!valid"
        color="teal darken-2 white--text"
        @click="validate"
        >
        Log In
        </v-btn>

        <div class="text-center">
          Don't have an account?
          <router-link to="/register">Create</router-link>
        </div>
      </v-form>
  </v-card-text>
</v-card>
</template>

<script>
export default {
    data: () => ({
      valid: true,
      showPassword: false,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ]
    }),

    methods: {
      async validate () {
        if (this.$refs.form.validate()) {

          const formData = {
            email: this.email,
            password: this.password
          }
          try {
            await this.$store.dispatch('login', formData)
            this.$router.push('/')
          } catch (e) {
            
          }
        }
      },
    },
  }
</script>