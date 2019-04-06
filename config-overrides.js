const {override, fixBabelImports, addLessLoader, addBundleVisualizer} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#b13038'},
    }),
    addBundleVisualizer({}, true)
);
