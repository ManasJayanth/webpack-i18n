
module.exports = function render(locals) {
const path = require('path');
const fs = require('fs');
  const language = locals.path.split('/')[1]
  console.log(
    '>>>>', path.resolve(locals.pwd, `../i18n-build/index.${language}.js`),
    fs.readFileSync(
      path.resolve(locals.pwd, `../i18n-build/index.${language}.js`)
    ).toString()
  )
  return Promise.resolve(
    locals.ejsCompile(
      require(`../i18n-build/index.${language}.js`)
    )
  )
  // return '<html> <a href="/foo">Foo</a>'  + locals.greet + ' from ' + locals.path + '</html>';
};
