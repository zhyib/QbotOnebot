const Canvas = require('canvas');
const fs = require('fs');

const paint = {
  paintRect(color) {
    const canvas = Canvas.createCanvas(150, 150);
    const ctx = canvas.getContext('2d');

    const out = fs.createWriteStream(`${__dirname}/image.png`);
    const stream = canvas.createPNGStream();

    stream.on('data', (chunk) => {
      out.write(chunk);
    });

    // 在左边画正方形
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 150, 150);
    ctx.save();

    // // 在右边画正方形
    // ctx.fillStyle = '#aaa';
    // ctx.fillRect(50, 30, 50, 50);

    // // 画文字
    // ctx.fillStyle = '#000';
    // ctx.font = '20px Arial';
    // ctx.fillText('Hello World', 0, 20);

    // // 画一个圆
    // ctx.beginPath();
    // ctx.arc(30, 110, 20, 0, 2 * Math.PI);
    // ctx.stroke();
    // ctx.fillStyle = 'green';
    // ctx.fill();
  },
};

module.exports = paint;
