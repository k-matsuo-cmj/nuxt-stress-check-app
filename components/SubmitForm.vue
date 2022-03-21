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
    <div class="pa-4">
      <v-chip-group v-model="unansweredId" active-class="primary--text" column>
        <v-chip v-for="id in unansweredIds" :key="id" :value="id">
          {{ id }}
        </v-chip>
      </v-chip-group>
    </div>
    <v-card-actions class="justify-center">
      <v-btn large :disabled="!isComplete" @click="submit">送信</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SubmitForm',
  props: {
    ids: { type: Array, default: null },
    answers: { type: Object, default: null },
  },
  data() {
    return {
      unansweredId: null,
    }
  },
  computed: {
    isComplete() {
      return !this.unansweredIds.length
    },
    unansweredIds() {
      return this.ids.filter((id) => !this.answers[id]).sort()
    },
  },
  watch: {
    unansweredId() {
      if (this.unansweredId) {
        const index = this.ids.indexOf(this.unansweredId)
        this.$emit('jumpPage', index)
      }
    },
  },
  methods: {
    submit() {
      this.$store.dispatch('finishCheck', { answers: this.answers })
    },
  },
}
</script>

<style></style>
