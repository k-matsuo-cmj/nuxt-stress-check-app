<template>
  <v-card>
    <v-window v-model="index">
      <v-window-item v-for="n in length" :key="n">
        <div>{{ `${n} / ${length} ` }}</div>
        <question-form
          :question="$store.getters['question/getById'](ids[n - 1])"
        />
      </v-window-item>
    </v-window>
    <v-card-actions class="justify-space-between">
      <v-btn text :disabled="!index" @click="prev">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn text :disabled="index === length - 1" @click="next">
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
      length: 57,
      ids: [],
    }
  },
  mounted() {
    this.ids = this.$store.getters['question/ids']
  },
  methods: {
    prev() {
      if (this.index > 0) this.index--
    },
    next() {
      if (this.index < this.length - 1) this.index++
    },
  },
}
</script>

<style>
</style>
