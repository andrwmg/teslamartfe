// const fse = require('fs-extra');
// const glob = require('glob');
// const path = require('path');

// async function generateIndex(options) {
//     const files = await globAsync(path.join(options.outputDir, '*.js'));
//     const index = files
//       .map((file) => {
//         const typename = path.basename(file).replace('.js', '');
//         return `export { default as ${typename} } from './${typename}';\n`;
//       })
//       .join('');
  
//     await fse.writeFile(path.join(options.outputDir, 'index.js'), index);
//   }

// module.exports = {generateIndex};