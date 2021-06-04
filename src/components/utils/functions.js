function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function sleep(t) {
  await new Promise((resolve) => {
    setTimeout(resolve, t);
  }).then(() => {});
}

module.exports = { rand, sleep };
