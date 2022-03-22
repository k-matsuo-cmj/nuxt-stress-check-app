<template>
  <v-card class="resultList">
    <v-list dense>
      <v-subheader> 過去のストレスチェック結果 </v-subheader>
      <v-list-item v-for="result in list" :key="result.id" @click="openDialog(result)">
        <v-list-item-content>
          {{ result.finished_at ? $dateFns.format(result.finished_at.toDate(), 'yyyy-MM-dd HH:mm') : '' }}    
        </v-list-item-content>
        <v-list-item-content :class="isHighStress(result.answers) ? 'red--text' : 'primary--text' ">
          {{ isHighStress(result.answers) ? '高ストレス' : '異常なし' }}    
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <result-dialog ref="resultDialog" />
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
import judgement from '~/plugins/judgement'
export default {
  name: 'ResultList',
  data() {
    return {
      list: [],
    }
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

    if (this.$store.state.finished) {
      setTimeout(() => {
        this.openDialog(this.list[0])
      }, 500)
    }
  },
  methods: {
    ...judgement,
    openDialog(result) {
      this.$refs.resultDialog.open(result)
    }
  },
}
</script>

<style>
  .resultList {
    max-height: 48vh;
    overflow: scroll;
  }
</style>
