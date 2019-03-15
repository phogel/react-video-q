export default function split(str) {
  if (typeof str === 'string') {
    return str
      ? str
          .split(',')
          .map(item => item.trim())
          .filter(item => item.length)
      : []
  } else if (typeof str === 'object') {
    return str
      ? str
          .join()
          .split(',')
          .map(item => item.trim())
          .filter(item => item.length)
      : []
  } else {
    return str
  }
}
