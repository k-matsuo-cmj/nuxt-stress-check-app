<template>
  <v-card v-if="question">
    <v-card-text>
      {{ question.category.id }}. {{ question.category.text }}
    </v-card-text>
    <v-card-title class="text text-body-1 text-sm-h6">{{
      question.text
    }}</v-card-title>
    <v-chip-group
      v-model="selected"
      active-class="primary--text"
      column
      class="buttons"
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
  mounted() {},
}
</script>

<style scoped>
.text {
  min-height: 120px;
  white-space: pre-wrap;
}
.buttons {
  max-width: 200px;
  padding-left: 10px;
}
.button {
  min-width: 100%;
}
</style>
