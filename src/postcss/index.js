const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssNested = require('postcss-nested');
const postcssInlineSVG = require('postcss-inline-svg');
const postcssSVGO = require('postcss-svgo');
const cssnano = require('cssnano');

const postcssSimpleVars = require('./variables');

const SVGOOptions = {
  plugins: [
    { removeTitle: true },
    { convertColors: { shorthex: false } },
    { convertPathData: false },
  ],
};

function minifier() {
  const options = {
    safe: true,
    autoprefixer: false,
    svgo: false,
  };

  return cssnano(options);
}

function postcss(compiler) {
  const importPlugin = postcssImport({ addDependencyTo: compiler });

  const defaults = [
    importPlugin,

    postcssSimpleVars,
    postcssNested,
    postcssInlineSVG,
    postcssSVGO(SVGOOptions),

    autoprefixer,
  ];

  const vendor = [
    importPlugin, autoprefixer,
  ];

  if (process.env.NODE_ENV === 'production') {
    defaults.push(minifier());
    vendor.push(minifier());
  }

  return { defaults, vendor };
}

module.exports = postcss;
