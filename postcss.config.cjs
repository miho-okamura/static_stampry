module.exports = {
  plugins: {
    //呼び出すプラグインを記述していく
    autoprefixer: {},
    'postcss-sort-media-queries': {sort: 'mobile-first'},
    'css-declaration-sorter':{order:'smacss'},
  },
}
