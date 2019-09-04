module.exports = {
    entry:"./src/jsx/app.jsx",
    output:{
        path:__dirname+"/dist/js/",
        filename:"bundle.js"
    },
    devtool:"#sourcemap",
    mode:"production",
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: [ /node_modules/, /pdfmake.js$/ ], 
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}