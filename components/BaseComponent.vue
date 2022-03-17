<template>
  <div>
    <v-row>
      <v-col offset-md="6">
        <span> ようこそ {{ $store.state.user.displayName }} さん</span>
        <v-btn @click="$store.dispatch('logout')">Logout</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <question-window v-if="$store.getters.isChecking" />
        <div v-else>
          <p>
            あなたの職場におけるストレスレベルを測定します。質問は全部で57問です。
          </p>
          <p>この検査は、労働安全衛生法に基づくものです。</p>
          <br />
          <strong>それではストレスチェックを始めましょう！</strong>
          <br />
          <v-btn large color="primary" @click="$store.dispatch('startCheck')">
            開始
          </v-btn>
          <br />
          <result-list />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'BaseComponent',
}
</script>

<style>
</style>
