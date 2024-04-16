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

export { Complex };
