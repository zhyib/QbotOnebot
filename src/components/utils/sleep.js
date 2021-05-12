async function sleep(t) {
  await new Promise((resolve) => {
    setTimeout(resolve, t);
  }).then(() => {});
}

module.exports = sleep;
