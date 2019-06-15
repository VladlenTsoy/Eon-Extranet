const {override, fixBabelImports, addLessLoader, addBundleVisualizer} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@font-family': "'Museo Cyrl', sans-serif",
            // '@primary-color': '#b13038',
            // '@sub-color': '#489dbc',

            '@primary-color': '#4099ff',
            '@danger-color': '#FF5370',
            '@warning-color': '#FFB64D',
            '@success-color': '#2ed8b6',
            '@info-color': '#00bcd4',
            '@dark-color': '#37474f',
            '@secondary-color': 'rgba(0, 0, 0, 0.4)',

            '@bg-color': '#F2F7FB',
            // '@sidebar-color': '#263544',
            // '@sidebar-active-color': '#222D3B',

            '@bsc-box-shadow': '0 5px 10px 0 rgba(0, 0, 0, 0.1)'
        },
    }),
    addBundleVisualizer({}, true)
);
