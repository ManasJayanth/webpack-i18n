module.exports = function render(locals) {
  const language = locals.path.split('/')[1]
  console.log(
    '>>>>', path.join(__dirnam, `../i18n-build/index.${language}.js`)
  )
  return Promise.resolve(
    locals.ejsCompile(
      require(`../i18n-build/index.${language}.js`)
    )
  )
  // return '<html> <a href="/foo">Foo</a>'  + locals.greet + ' from ' + locals.path + '</html>';
};
