module.exports = {
  plugins: {
    _tailwindcss: {},
    get tailwindcss() {
      return this._tailwindcss;
    },
    set tailwindcss(value) {
      this._tailwindcss = value;
    },
    autoprefixer: {},
  },
}
