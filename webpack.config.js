const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('html-webpack-template');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
    styles: path.join(__dirname, 'app', 'css', 'styles.less'),
};

const common = merge(
    {
        entry: {
            app: PATHS.app,
            styles: PATHS.styles,
        },
        output: {
            path: PATHS.build,
            filename: '[name].[hash].js',
            // publicPath: 'http://0.0.0.0:8080/',
        },
        resolve: {
            alias: {
                appRoot: path.join(__dirname, 'app'),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({ // auto generate an index.html that autoloads all the assests, like js and css
                template: HtmlWebpackTemplate, // list of extra attrs: https://github.com/jaketrent/html-webpack-template
                title: 'React app',
                appMountId: 'app', // Generate #app where to mount
                mobile: true, // Scale page on mobile
                inject: false, // html-webpack-template requires this to work
            }),

            /* TODO: this is including styles in the vendor js bundle
             */
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'scripts/vendor.[hash].js',
                minChunks: (module, count) => { // add used packages to vendor bundle
                    const userRequest = module.userRequest;

                    // You can perform other similar checks here too.
                    // Now we check just node_modules.
                    return userRequest && userRequest.indexOf('node_modules') >= 0;
                },
            }),
        ],
    },
    parts.loadImageFiles(),
    parts.lintCSS(PATHS.styles),
    parts.loadJavaScript(PATHS.app),
    parts.lintJavaScript(PATHS.app)
);

module.exports = function(env) {
    process.env.BABEL_ENV = env;

    if (env === 'production' || env === 'staging') {
        return merge(
            common,
            {
                output: {
                    chunkFilename: 'scripts/[chunkhash].js',
                    filename: 'scripts/[name].[chunkhash].js',

                    // Tweak this to match your GitHub project name
                    // publicPath: '/webpack-demo/',
                },
                plugins: [
                    new webpack.HashedModuleIdsPlugin(),
                ],
            },
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                env
            ),

            parts.minifyJavaScript('source-map'),
            parts.extractBundles([
                // {
                //     name: 'vendor',
                //     entries: [
                //         'react',
                //         'react-dom',
                //     ],
                // },
                {
                    name: 'manifest',
                },
            ]),
            parts.clean(PATHS.build),
            parts.generateSourcemaps('source-map'),
            parts.extractCSS(),
            parts.purifyCSS(PATHS.styles)
        );
    }

    return merge(
        common,
        {
            // Disable performance hints during development
            performance: {
                hints: false,
            },
            plugins: [
                new webpack.NamedModulesPlugin(),
            ],
        },
        parts.generateSourcemaps('eval-source-map'),
        parts.loadCSS(PATHS.styles),
        parts.devServer({
            // Customize host/port here if needed
            host: process.env.HOST,
            port: process.env.PORT,
        })
    );
};
