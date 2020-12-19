function parseDate(date) {
  return {
    dateTimeString() {
      return `${date.toLocaleString().split(' ')[0]} ${date.toString().split(' ')[4]}`;
    },
  };
}

module.exports = parseDate;
