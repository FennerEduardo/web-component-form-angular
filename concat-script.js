// Añadir en el package.json
// "build:component": "ng build --prod --output-hashing none && node build-web-cp.js"
const fs = require('fs-extra');
const concat = require('concat');

const build = async () =>{
    const files = [
        './dist/ventanilla/runtime.js',
        './dist/ventanilla/polyfills.js',
        './dist/ventanilla/main.js'
      ];

      await fs.ensureDir('./dist');
      await concat(files, './dist/ventanilla/app.js');

      files.forEach(file => {
        fs.unlinkSync(file);
      })
}
build();
