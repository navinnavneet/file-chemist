// next.config.js
const withTM = require('next-transpile-modules')(['@vieolo/vieolo-ui', '@vieolo/validation-js', '@vieolo/file-management']); // pass the modules you would like to see transpiled

module.exports = withTM();