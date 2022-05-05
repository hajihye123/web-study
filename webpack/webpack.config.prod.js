// npx webpack --config webpack.config.prod.js

const path = require('path');

module.exports = {
    mode:"production",
    entry:"./source/index.js",
    output:{
        path:path.resolve(__dirname, "public"),    // __dirname은 config.js가 위치한 경로, public에 최종 결과물을 넣는다
        filename:'index_bundle.js'
    }
}