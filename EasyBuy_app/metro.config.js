const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs', 'js', 'jsx', 'ts', 'tsx'); 

module.exports = config;
