<template>
  <v-card>
    <v-form @submit.prevent="login">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field v-model="email" label="E-mail"></v-text-field>
        <v-text-field v-model="password" type="password" label="Password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn type="submit">Login</v-btn>
      </v-card-actions>
      <v-card-text>
        {{ message }}
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .catch(err => (this.message = err.message))
    }
  }
}
</script>

<style>

</style>
