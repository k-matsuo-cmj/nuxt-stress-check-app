<template>
  <v-dialog v-model="show" :max-width="'480px'" @keydown.esc="close">
    <v-card class="px-4 py-6">
      <v-card-text>
        チェック日時: {{ finshedDatetime }}
      </v-card-text>
      <v-card-text>
        判定結果: <span :class="highStress ? 'red--text' : 'primary--text' ">{{ checkResult }}</span>
      </v-card-text>
      <v-card-text class="px-8">
        <div>
          A: {{ totalPoint('A') }}
        </div>
        <div>
          B: {{ totalPoint('B') }}
        </div>
        <div>
          C: {{ totalPoint('C') }}
        </div>
        <div>
          D: {{ totalPoint('D') }}
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import judgement from '~/plugins/judgement'
export default {
  name: 'ResultDialog',
  data() {
    return {
      result: null,
      show: false,
    }
  },
  computed: {
    startedDatetime () {
      return this.result ? this.$dateFns.format(this.result.started_at.toDate(), 'yyyy-MM-dd HH:mm') : ''
    },
    finshedDatetime () {
      return this.result ? this.$dateFns.format(this.result.finished_at.toDate(), 'yyyy-MM-dd HH:mm') : ''
    },
    highStress () {
      return this.result ? judgement.isHighStress(this.result.answers) : false
    },
    checkResult () {
      return this.highStress ? '高ストレス' : '異常なし'
    },
    totalPoint () {
      const vm = this
      return category => this.result ? judgement.getTotalByCategory(vm.result.answers, category) : 0
    }
  },
  methods: {
    open (result) {
      this.result = result
      this.show = true
    },
    close () {
      this.show = false
    }
  },
}
</script>

<style>

</style>
