//NOTE: from https://github.com/testprocess/dft-js/blob/main/src/components/FourierTransform.tsx

const dft = (data: number[]) => {
  let t = 1;
  let arr = [];

  for (let k = 0; k < data.length; k++) {
    let total = 0;

    for (let index = 0; index < data.length - 1; index++) {
      const element = data[index];
      const x = element;
      const N = data.length - 1;
      const a = x * Math.cos(-1 * Math.PI * (k / N) * index); //, x * Math.sin(-1 * Math.PI * (k/N) * index))

      total += a;
    }

    arr.push((total / data.length) * 100);

    t += 10;
    total = 0;
  }

  return arr;
};

export { dft };
