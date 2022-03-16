<template>
  <v-card>
    <v-card-title v-if="isComplete">
      <p>アンケートは以上です。</p>
      <p>送信してよろしいですか？</p>
    </v-card-title>
    <v-card-title v-else>
      <p>未回答のアンケートがあります。</p>
      <p>入力しなおしてください。</p>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-btn large :disabled="!isComplete">送信</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SubmitForm',
  props: {
    ids: { type: Array, default: null },
    answers: { type: Array, default: null },
  },
  computed: {
    isComplete() {
      return !this.unansweredIds.length
    },
    unansweredIds() {
      return this.ids
        .filter((id) => this.answers.findIndex((ans) => ans.id === id) === -1)
        .sort()
    },
  },
}
</script>

<style>
</style>
