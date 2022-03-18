/**
 * カテゴリごとの合計ポイントを取得する
 */
const getTotalByCategory = (answers, category) => {
  return Object.keys(answers)
    .filter((key) => key.startsWith(category))
    .reduce((sum, key) => sum + answers[key], 0)
}

/**
 * 高ストレス者（合計点数）かどうかを判定する
 */
const isHighStress = (answers) => {
  const totalB = getTotalByCategory(answers, 'B')
  const totalAC =
    getTotalByCategory(answers, 'A') + getTotalByCategory(answers, 'C')
  // 高ストレス者（合計点数）
  // 領域Bの合計点数が77点以上
  // 領域AとCの合算の合計点数が76点以上であり、かつ領域Bの合計点数が63点以上
  return totalB >= 77 || (totalB >= 63 && totalAC >= 76)
}

export default { getTotalByCategory, isHighStress }
