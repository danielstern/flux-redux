const path = require('path');
// function MyPlugin() {
//     // Configure your plugin with options...
// }
//
// MyPlugin.prototype.apply = function(compiler) {
//     compiler.plugin("compile", function(params) {
//         require('./src/server');
//     });
// };
//
// module.exports = MyPlugin;
// require('./src/server');
module.exports = {
    module: {
        loaders: [
            {
                loader: "babel-loader",

                include: [
                    path.resolve(__dirname, "src"),
                ],

                test: /\.js?$/,

                // Options to configure babel with
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-object-rest-spread']
                }
            },
        ]
    },
    entry: {
        cpanel: ["./src/control-panel.js"],
        "message-board": ["./src/message-board.js"],
        tasks: ["./src/tasks.js"]
    },
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/assets/",
        filename: "[name].bundle.js"
    },
    devServer: { inline: true },
    devtool: 'source-map',
    // plugins: [
    //     new MyPlugin()
    // ]

}