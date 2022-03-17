<template>
  <v-card>
    <v-card-title> 過去のストレスチェック結果 </v-card-title>
    <v-card-text v-for="result in list" :key="result.id">
      {{ result.finished_at }}
      {{ isHighStress(result.answers) ? '高ストレス' : '異常なし' }}
    </v-card-text>
  </v-card>
</template>

<script>
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@firebase/firestore'
export default {
  name: 'ResultList',
  data() {
    return {
      list: [],
    }
  },
  computed: {
    /**
     * 高ストレス者（合計点数）
     * 領域Bの合計点数が77点以上
     * 領域AとCの合算の合計点数が76点以上であり、かつ領域Bの合計点数が63点以上
     */
    isHighStress: () => (answers) => {
      const totalB = Object.keys(answers)
        .filter((key) => key.startsWith('B'))
        .reduce((sum, key) => sum + answers[key], 0)
      const totalAC = Object.keys(answers)
        .filter((key) => key.startsWith('A') || key.startsWith('C'))
        .reduce((sum, key) => sum + answers[key], 0)

      // eslint-disable-next-line no-console
      console.log('B:', totalB, 'A+C:', totalAC)
      return totalB >= 77 || (totalB >= 63 && totalAC >= 76)
    },
  },
  mounted() {
    const resultsQuery = query(
      collection(this.$db, 'results'),
      where('user_id', '==', this.$store.state.user.uid),
      orderBy('finished_at', 'desc')
    )
    onSnapshot(resultsQuery, (querySnapshot) => {
      this.list = querySnapshot.docs.map((d) => ({ ...d.data(), id: d.id }))
    })
  },
}
</script>

<style>
</style>
