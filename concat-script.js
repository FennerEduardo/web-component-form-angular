// Añadir en el package.json
// "build:component": "ng build --prod --output-hashing none && node build-web-cp.js"
const fs = require('fs-extra');
const concat = require('concat');

const build = async () =>{
    const files = [
        './dist/form-files/runtime.js',
        './dist/form-files/polyfills.js',
        './dist/form-files/main.js'
      ];

      await fs.ensureDir('./dist');
      await concat(files, './dist/form-files/app.js');
}
build();
