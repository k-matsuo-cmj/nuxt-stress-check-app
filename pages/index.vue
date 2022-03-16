<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      Index Page
      <login-form v-if="!$store.getters.isAuthenticate" />
      <v-btn v-else @click="$store.dispatch('logout')">Logout</v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
