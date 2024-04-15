const fft = (data: number[]) => {
  const result = fftCalc(data).map((item: any) => item.re);
  return result.slice(0, result.length / 2);
};

const ifft = (data: number[]) => {
  try {
    const transformedData = data.map((item) => {
      return new Complex(item, 0);
    });

    return ifftCalc(transformedData).map((item: any) => item.re);
  } catch (error) {
    return [0];
  }
};

function ifftCalc(data: Complex[]) {
  let N = data.length;
  let iN = 1 / N;

  for (let i = 0; i < N; ++i) {
    if (data[i]) {
      data[i].im = -data[i].im;
    }
  }

  const realData = data.map((item) => {
    return item.re;
  });

  data = fftCalc(realData);

  for (let i = 0; i < N; ++i) {
    data[i].im = -data[i].im;
    data[i].re *= iN;
    data[i].im *= iN;
  }
  return data;
}

const fftCalc = (data: number[]) => {
  let N = data.length;

  if (N === 1) {
    return data;
  }

  const halfN = N / 2;
  let even: number[] = [];
  let odd: number[] = [];

  data.map((item: any, index: any) => {
    if (index % 2 == 0) {
      even.push(item);
    } else {
      odd.push(item);
    }
  });

  const evenOutput = fftCalc(even);
  const oddOutput = fftCalc(odd);

  const output = new Array(N);

  const a = -2 * Math.PI;

  for (var k = 0; k < halfN; ++k) {
    if (!(evenOutput[k] instanceof Complex))
      evenOutput[k] = new Complex(evenOutput[k], 0);
    if (!(oddOutput[k] instanceof Complex))
      oddOutput[k] = new Complex(oddOutput[k], 0);
    const p = k / N;
    const t = new Complex(0, a * p);
    t.cexp(t).mul(oddOutput[k], t);

    output[k] = evenOutput[k].add(t, oddOutput[k]);
    output[k + halfN] = evenOutput[k].sub(t, evenOutput[k]);
  }

  return output;
};

class Complex {
  re: number;
  im: number;
  constructor(re: number, im: number) {
    this.re = re;
    this.im = im || 0.0;
  }

  add = (other: Complex, dst: Complex) => {
    dst.re = this.re + other.re;
    dst.im = this.im + other.im;
    return dst;
  };

  sub = (other: Complex, dst: Complex) => {
    dst.re = this.re - other.re;
    dst.im = this.im - other.im;
    return dst;
  };

  mul = (other: Complex, dst: Complex) => {
    var r = this.re * other.re - this.im * other.im;
    dst.im = this.re * other.im + this.im * other.re;
    dst.re = r;
    return dst;
  };
  cexp = (dst: Complex) => {
    var er = Math.exp(this.re);
    dst.re = er * Math.cos(this.im);
    dst.im = er * Math.sin(this.im);
    return dst;
  };
}

export { fft, ifft };
