const orderArray = (a, b, order, param) => {
  if (order === "desc") return b[`${param}`] - a[`${param}`];
  if (order === "asc") return a[`${param}`] - b[`${param}`];
}

module.exports = {orderArray}
