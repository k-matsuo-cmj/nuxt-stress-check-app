<template>
  <v-card v-if="question" class="form" flat>
    <v-card-text>
      {{ question.category.id }}. {{ question.category.text }}
    </v-card-text>
    <v-card-title class="text text-body-1 text-sm-h6">{{
      question.text
    }}</v-card-title>
    <v-chip-group
      v-model="selected"
      active-class="primary white--text"
      column
      class="buttons"
      @change.once="goNext"
    >
      <v-chip
        v-for="(point, i) in question.answerPoint"
        :key="i"
        pill
        large
        :value="point"
        class="button"
      >
        {{ question.category.answerText[i] }}
      </v-chip>
    </v-chip-group>
  </v-card>
</template>

<script>
let timeoutId

export default {
  name: 'QuestionForm',
  props: {
    question: { type: Object, default: null },
  },
  data() {
    return {
      selected: null,
    }
  },
  watch: {
    selected(value) {
      this.$emit('changeValue', {
        id: this.question.id,
        point: value,
      })
    },
  },
  mounted() {},
  methods: {
    goNext() {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        this.$emit('goNext')
      }, 200)
    },
  },
}
</script>

<style scoped>
.form {
  height: 70vh;
}
.text {
  min-height: 120px;
  height: 30%;
  white-space: pre-wrap;
}
.buttons {
  max-width: 80%;
  padding-left: 10px;
}
.button {
  min-width: 100%;
}
</style>
