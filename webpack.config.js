const path = require("path");
const glob = require("glob");
const I18nPlugin = require("i18n-webpack-plugin");

const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const ejs = require('ejs');
const fs = require('fs');
const ejsTemplate = fs.readFileSync('./template.ejs').toString()

const ejsCompile = ejs.compile(ejsTemplate, {filename: './template.ejs', name: 'abc'})

console.log(';;;;;;;;;;', process.cwd());

const TRANSLATIONS = [{ language: "en" }].concat(
  glob.sync("./languages/*.js").map(file => ({
    language: path.basename(file, path.extname(file)),
    translation: require(file),
  }))
);

module.exports = TRANSLATIONS.map(({ language, translation }) => ({
  mode: 'development',
  entry: {
    index: path.join(__dirname, "i18n", "locales.js"),
  },
  output: {
    path: path.join(__dirname, "i18n-build"),
    filename: `[name].${language}.js`,
    libraryTarget: 'commonjs'
  },
  plugins: [new I18nPlugin(translation)],
})).concat([

  {

    mode: 'development',
    // entry: {
    //   server: './src/server.js',
    //   barServer: './src/bar-server.js',
    // },

    entry: './src/server.js',

    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
      /* IMPORTANT!
       * You must compile to UMD or CommonJS
       * so it can be required in a Node context: */
      libraryTarget: 'umd'
    },

    plugins: [
      new StaticSiteGeneratorPlugin({
        // entry: 'barServer.js',
        globals: {
          window: {}
        },
        paths: [
          '/en/foo',
          '/es/foo',
        ],
        locals: {
          // Properties here are merged into `locals`
          // passed to the exported render function
          pwd: process.cwd(),
          ejsCompile
        }
      }),
      new StaticSiteGeneratorPlugin({
        // entry: 'server.js',
        globals: {
          window: {}
        },
        paths: [
          '/en/foo',
          '/es/foo',
        ],
        locals: {
          // Properties here are merged into `locals`
          // passed to the exported render function
          pwd: process.cwd(),
          ejsCompile
        }
      })
    ]

  }
]);
