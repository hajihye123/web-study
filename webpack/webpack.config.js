// 해당 파일의 이름이 webpack.config.js라면 npx webpack 명령어로 바로 실행

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:"development",
    entry:{
        index:"./source/index.js",
        about:"./source/about.js"
    },
    output:{
        path:path.resolve(__dirname, "public"),    // __dirname은 config.js가 위치한 경로, public에 최종 결과물을 넣는다
        filename:'[name]_bundle.js'      // [name]은 entry의 이름을 []안에 넣어준다
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./source/index.html',     // 템플릿을 사용해서
            filename:'./index.html',            // 출력 결과 파일명
            chunks:['index']                    // 삽입하고 싶은 entry의 이름(.js) 적기
        }),
        new HtmlWebpackPlugin({
            template:'./source/about.html',     // 템플릿을 사용해서
            filename:'./about.html',            // 출력 결과 파일명
            chunks:['about']                    // 삽입하고 싶은 entry의 이름(.js) 적기
        })
    ]
}