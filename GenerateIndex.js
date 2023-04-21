const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = './src/components';
const SERVICES_DIR = './src/services';
const CONTEXTS_DIR = './src/contexts'

const components = fs.readdirSync(COMPONENTS_DIR)
  .filter(file => file.endsWith('.js'))
  .map(file => path.parse(file).name);

const componentsIndexFileContent = components.map(component => `export { default as ${component} } from './${component}';`).join('\n');

fs.writeFileSync(path.join(COMPONENTS_DIR, 'index.js'), componentsIndexFileContent);

const services = fs.readdirSync(SERVICES_DIR)
  .filter(file => file.endsWith('.js'))
  .map(file => path.parse(file).name);

const servicesIndexFileContent = services.map(service => `export { default as ${service} } from './${service}';`).join('\n');

fs.writeFileSync(path.join(SERVICES_DIR, 'index.js'), servicesIndexFileContent);

const contexts = fs.readdirSync(CONTEXTS_DIR)
  .filter(file => file.endsWith('.js'))
  .map(file => path.parse(file).name);

const contextsIndexFileContent = contexts.map(context => `export { default as ${context} } from './${context}';`).join('\n');

fs.writeFileSync(path.join(CONTEXTS_DIR, 'index.js'), contextsIndexFileContent);