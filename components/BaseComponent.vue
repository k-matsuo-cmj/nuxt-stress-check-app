<template>
  <div>
    <v-row>
      <v-col offset-md="6">
        <span> ようこそ {{ $store.state.user.displayName }} さん</span>
        <v-btn @click="$store.dispatch('logout')">Logout</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'BaseComponent'
}
</script>

<style>

</style>
