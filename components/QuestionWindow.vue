<template>
  <v-card>
    <v-window v-model="index">
      <v-window-item v-for="n in length + 1" :key="n">
        <template v-if="n <= length">
          <div>{{ `${n} / ${length} ` }}</div>
          <question-form
            :question="$store.getters['question/getById'](ids[n - 1])"
            @goNext="next"
            @changeValue="setAnswer"
          />
        </template>
        <template v-else>
          <submit-form :ids="ids" :answers="answers" />
        </template>
      </v-window-item>
    </v-window>
    <v-card-actions class="justify-space-between">
      <v-btn text :disabled="!index" @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn text :disabled="index === length" @click="next">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'QuestionWindow',
  data() {
    return {
      index: 0,
      ids: [],
      answers: {},
    }
  },
  computed: {
    length() {
      return this.ids.length
    },
  },
  mounted() {
    this.ids = this.$store.getters['question/ids']
    this.answers = {}
  },
  methods: {
    prev() {
      if (this.index > 0) this.index--
    },
    next() {
      if (this.index < this.length) this.index++
    },
    setAnswer(answer) {
      if (answer.point) {
        this.answers[answer.id] = answer.point
      } else {
        delete this.answers[answer.id]
      }
    },
  },
}
</script>

<style>
</style>
