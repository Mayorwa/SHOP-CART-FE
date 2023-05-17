const numeral = require('numeral')
const formatNumber = (num, isCurrency) => {
  if (!isCurrency) return numeral(num).format('0,0')
  if (isCurrency) return '$' + numeral(num).format('0,0.00')
  return numeral(num).format('0,0')
}

export { formatNumber }
