function timer() {
  setInterval(() => {
    const now = new Date();
    console.log(now.valueOf());
    // check(now);
  }, 60000);
}

module.exports = {
  timer,
};
