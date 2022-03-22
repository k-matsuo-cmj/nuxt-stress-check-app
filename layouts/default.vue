<template>
  <v-app>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu v-if="$store.getters.isAuthenticate" :close-on-content-click="false">
        <template #activator="{ on, attr }">
          <v-btn icon v-bind="attr" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>    
        </template>
        <v-list>
          <v-list-item>
            <v-switch v-model="$vuetify.theme.dark" label="ダークテーマ" />
          </v-list-item>
          <v-list-item @click="$store.dispatch('logout')">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>ログアウト</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid class="main">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      title: 'Stress Check',
    }
  },
}
</script>

<style scoped>
  .main {
    height: 90vh;
  }
</style>