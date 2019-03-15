export default function split(str) {
  return str
    ? str
        .join()
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length)
    : []
}

// export default function split(str) {
//   if (typeof str === String) {
//     return str
//       ? str
//           .split(',')
//           .map(item => item.trim())
//           .filter(item => item.length)
//       : []
//   } else if (typeof str === Array) {
//     return str
//       ? str
//           .join()
//           .split(',')
//           .map(item => item.trim())
//           .filter(item => item.length)
//       : []
//   } else {
//     return str
//   }
// }
