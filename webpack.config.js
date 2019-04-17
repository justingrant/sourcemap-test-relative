const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  module: {
    rules: [
      // If you comment out these two rules, then the bundle's sourcemap will be correct.
      // However, with these rules included, the sourcemap includes bogus relative paths to 
      // the `libphonenumber-js` library. Other libraries' paths are correct, including
      // the `immer` library which, like `libphonenumber-js`, publishes a sourcemap to npm. 
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      }
    ]
  },
};
/*
    strictExportPresence: true,
    rules: [
      // Disable require.ensure as it's not a standard language feature.
      { parser: { requireEnsure: false } },
      {
        // "oneOf" will traverse all following loaders until one will
        // match the requirements. When no loader matches it will fall
        // back to the "file" loader at the end of the loader list.
        oneOf: [
          // Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript, and some ESnext features.
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              // @remove-on-eject-begin
              babelrc: false,
              configFile: false,
              presets: // JG replaced: [require.resolve('babel-preset-react-app')],
              [(()=>{
                let appcode = require('babel-preset-react-app')();
                appcode.presets[0][1].targets = {browsers: 'last 2 Chrome versions'};
                return appcode;
              })()],
              // Make sure we have a unique cache identifier, erring on the
              // side of caution.
              // We remove this when the user ejects because the default
              // is sane and uses Babel options. Instead of options, we use
              // the react-scripts and babel-preset-react-app versions.
              cacheIdentifier: getCacheIdentifier(
                isEnvProduction
                  ? 'production'
                  : isEnvDevelopment && 'development',
                [
                  'babel-plugin-named-asset-import',
                  'babel-preset-react-app',
                  'react-dev-utils',
                  'react-scripts',
                ]
              ),
              // @remove-on-eject-end
              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
                      },
                    },
                  },
                ],
              ],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              compact: isEnvProduction,
            },
          },
          // JG try to fix sourcemaps
          {
            enforce: "pre",
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            test: /\.(js|mjs)$/,
            use: "source-map-loader"
          },
          // Process any JS outside of the app with Babel.
          // Unlike the application JS, we only compile the standard ES features.
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false, // JG replaced: false,
              configFile: false, // JG replaced: false,
              compact: false,
              presets: [
                [
                  (()=> {
                      // prevent regenerator runtime from making debugging hellish!
                      let deps = require('babel-preset-react-app/dependencies')();
//                        deps.sourceType = 'module';
                      deps.presets[0][1].targets = {browsers: 'last 2 Chrome versions'};
//                        deps.presets[0][1].useBuiltIns = 'entry';
//                        deps.presets[0][1].modules = true;
                      deps.plugins[0][1].regenerator = false;
//                        {"corejs":false,"helpers":false,"regenerator":false,"useESModules":true,"absoluteRuntime":"/Users/justingrant/Documents/hdev/h3/web/node_modules/babel-preset-react-app/node_modules/@babel/runtime"}

                      console.log(JSON.stringify(deps.presets[0][1]));
                      console.log(JSON.stringify(deps.presets));
//                        console.log(JSON.stringify(deps.plugins));
//                        process.exit();
                      return deps;
                  })(),// JG replaced: require.resolve('babel-preset-react-app/dependencies'),
                  { helpers: true } //, regenerator:false, 
                  // ignoreBrowserslistConfig: false, 
                  // debug: true }, // JG replaced: { helpers: true },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              // @remove-on-eject-begin
              cacheIdentifier: getCacheIdentifier(
                isEnvProduction
                  ? 'production'
                  : isEnvDevelopment && 'development',
                [
                  'babel-plugin-named-asset-import',
                  'babel-preset-react-app',
                  'react-dev-utils',
                  'react-scripts',
                ]
              ),
              // @remove-on-eject-end
              // If an error happens in a package, it's possible to be
              // because it was compiled. Thus, we don't want the browser
              // debugger to show the original code. Instead, the code
              // being evaluated would be much more helpful.
              sourceMaps: true, // JG replaced: false,
              inputSourceMap: true, // JG added
            },
          },
          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use MiniCSSExtractPlugin to extract that CSS
          // to a file, but in development "style" loader enables hot editing
          // of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvProduction && shouldUseSourceMap,
            }),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: isEnvProduction && shouldUseSourceMap,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          // Opt-in support for SASS (using .scss or .sass extensions).
          // By default we support SASS Modules with the
          // extensions .module.scss or .module.sass
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              },
              'sass-loader'
            ),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
          // Adds support for CSS Modules, but using SASS
          // using the extension .module.scss or .module.sass
          {
            test: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap,
                modules: true,
                getLocalIdent: getCSSModuleLocalIdent,
              },
              'sass-loader'
            ),
          },
          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve('file-loader'),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    */
