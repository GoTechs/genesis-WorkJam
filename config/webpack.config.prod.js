const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const paths = require("./paths");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const getClientEnvironment = require("./env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var ProgressBarPlugin = require("progress-bar-webpack-plugin");

// Webpack uses `publicPath` to determine where the app is being served from.
// In development, we always serve from the root. This makes config easier.
const publicPath = "/";
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = "";
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

module.exports = {
  mode: "production",
  entry: [
    // We ship a few polyfills by default:
    require.resolve("./polyfills"),
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve("react-dev-utils/webpackHotDevClient"),
    // Finally, this is your app's code:
    paths.appIndexJs
    // We include the app code last so that if there is a runtime error during
    // initialization, it doesn't blow up the WebpackDevServer client, and
    // changing JS code would still trigger a refresh.
  ],
  output: {
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: true,
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    path: path.join(__dirname, "../build"),
    filename: "static/js/bundle.js",
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: "static/js/[name].chunk.js",
    // This is the URL that app is served from. We use "/" in development.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")
  },
  resolve: {
    // This allows you to set a fallback for where Webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebookincubator/create-react-app/issues/253
    modules: ["node_modules", paths.appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebookincubator/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: [".web.js", ".mjs", ".js", ".json", ".web.jsx", ".jsx"],
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader", "eslint-loader"],
        include: paths.appSrc
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "static/fonts/"
            }
          }
        ]
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "static/img/"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: [/\.sass$/, /\.scss$/],
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.scss$/,
          /\.sass$/
        ],
        loader: require.resolve("file-loader"),
        options: {
          name: "static/media/[name].[hash:8].[ext]"
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      favicon: "src/assets/images/workjam.jpeg"
    }),
    // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    new webpack.DefinePlugin(env.stringified),
    // This is necessary to emit hot updates (currently CSS only):
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin({
      fileName: "asset-manifest.json"
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),
    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for Webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    // See https://github.com/facebookincubator/create-react-app/issues/186
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].[hash:8].css"
    }),
    new ExtractTextPlugin({
      filename: "styles.[hash:8].css",
      allChunks: true,
      disable: process.env.NODE_ENV !== "production"
    })
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty"
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
};
