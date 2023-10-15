import Jimp from 'jimp';
// import fs from 'fs';
import { arrayFromLength } from '@worksheets/util/arrays';

const path = __dirname + '/assets';
// fs.readdirSync(path).forEach((file) => {
//   console.log(file);
// });

const file = 'balloon.png';

Jimp.read(`${path}/${file}`)
  .then((image) => {
    const arr = arrayFromLength(image.bitmap.width).map(() =>
      arrayFromLength(image.bitmap.height).map(() => false)
    );

    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (col, row, idx) {
        const red = this.bitmap.data[idx + 0];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];
        const alpha = this.bitmap.data[idx + 3];

        // if we have a color
        if (red > 0 && green > 0 && blue > 0 && alpha > 0) {
          // and if that color isn't black.
          // if (red !== 0 && green !== 0 && blue !== 0) {
          arr[row][col] = true;
          // }
        }
      }
    );
    console.log(arr);
  })
  .catch((err) => {
    // Handle an exception.
    console.error('error', err);
  });
