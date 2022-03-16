<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <login-form v-if="!$store.getters.isAuthenticate" />
      <base-component v-else />
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
