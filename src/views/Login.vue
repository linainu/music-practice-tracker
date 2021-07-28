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
        label="Password"
        :rules="passwordRules"
        required
        ></v-text-field>

        <v-btn
        :disabled="!valid"
        color="teal darken-2 white--text"
        @click="validate"
        >
        Sign In
        </v-btn>
      </v-form>
  </v-card-text>
</v-card>
</template>

<script>
export default {
    data: () => ({
      valid: true,
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
      validate () {
        this.$refs.form.validate()
      },
    },
  }
</script>