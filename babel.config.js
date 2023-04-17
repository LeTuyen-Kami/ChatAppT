// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     ['@babel/plugin-proposal-decorators', {legacy: true}],
//     'react-native-reanimated/plugin',
//   ],
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            src: './src',
            components: './src/components',
            screens: './src/screens',
            assets: './src/assets',
            utils: './src/utils',
            services: './src/services',
            database: './src/database',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
