# 웹팩

### 환경 구축하기

나의 프로젝트가 npm 프로젝트라는 것을 알려줘야 한다. 그리고 웹팩을 설치한다.

```
npm init
npm install webpack webpack-cli
```



### 사용법

npx webpack --entry 메인 --output-path 저장될 곳

```
npx webpack --entry ./source/index.js --output-path ./public/index_bundle.js
```

이렇게 생성된 `index_bundle.js`를 `index.html`에서 불러온다.

```
<script src='./public/index_bundle.js></script>
```

그 후에, localhost 환경에서 접속해서 `F12`를 눌러 `Network`를 확인해보면 다운로드 받는 파일의 수가 줄어든 것을 확인할 수 있다.

### config 파일 생성

위와 같이 웹팩을 사용하면 명령어를 입력할 때 귀찮으므로 config 파일을 생성해보자.

```
// webpack.config.js
// 해당 파일의 이름이 webpack.config.js라면 npx webpack 명령어로 바로 실행

const path = require('path');

module.exports = {
    mode:"development",
    entry:"./source/index.js",
    output:{
        path:path.resolve(__dirname, "public"),    // public에 최종 결과물을 넣는다
        filename:'index_bundle.js'
    }
}
```

`__dirname`은 `webpack.config.js`가 위치한 경로를 나타낸다. 이렇게 생성한 후, `npx webpack`을 실행하면 된다.

### mode 설정

```
// webpack.config.prod.js

const path = require('path');

module.exports = {
    mode:"production",
    entry:"./source/index.js",
    output:{
        path:path.resolve(__dirname, "public"),
        filename:'index_bundle.js'
    }
}
```

다른 모드로 설정할 수도 있다. `production`모드로 설정하게 되면 `index_bundle.js`파일의 가독성이 좋아진다. 하지만 실행 할 때에는 `npx webpack --config webpack.config.prod.js`를 입력해야 한다.

### 로더

위와 같이 설정한 후, `index.html`에서 `style.css` 파일을 가져오면 css 파일은 따로 다운받는다는 것을 알 수 있다. 뭔가 아쉽다. `loader`를 설치한다.

```
npm install --save-dev style-loader css-loader
```

다음은 확장자가 css인 파일을 처리하는 방법을 알려주는 설정이다. css를 만나면 어떤 loader를 쓰는지 알려준다.

```
test:/\.css$/
use:[
    	'style-loader',
    	'css-loader',
    ]
```

`css-loader`는 css파일을 웹팩으로 가져온다. `style-loader`는 가져온 css 코드를 웹페이지 안에 `style`태그로 주입시켜 준다.

뒤쪽의 `loader`를 먼저 실행한다. 이것을 `chaining`이라고 한다.

### output 설정

이때까지는 `index.html`만 번들링했다. 하지만 `index.html`에서 `about.html`로 이동하는 `<a href=...>` 태그를 사용한다고 가정해보자. `about.html`이라는 파일도 번들링하고 싶다면 어떻게 해야할까?

```
// webpack.config.js

const path = require('path');

module.exports = {
    mode:"development",
    entry:{
        index:"./source/index.js",
        about:"./source/about.js"
    },
    output:{
        path:path.resolve(__dirname, "public"),
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
    }
}
```

`entry`에 내가 번들링하고자 하는 파일의 `name`을 지정해서 적어준다. 그리고 `output`에서 `filename`을 `[name]_bundle.js`라고 설정하면 `[name]`안에 `entry`에서 지정한 `index`, `about`을 자동으로 넣어서 번들링해준다. 즉, output 파일이 2개가 생성되는 것이다.

# 플러그인

웹팩에는 2가지의 확장 기능이 있다.

1. 로더는 우리가 가진 모듈을 최종적인 output으로 만드는 과정에서 사용된다.
2. 플러그인은 그렇게 해서 만들어진 결과물을 변형한다.

로더는 사용법이 규정화되어 있다. 하지만 플러그인은 훨씬 자유롭고 플러그인마다 사용방법이 제각각이다. 우리는 `html` 파일을 자동으로 생성하거나, `html` 파일을 `template`으로 하여 최종적인 결과물을 만들고 싶을 수도 있다. 이를 위해 `html-webpack-plugin`을 다뤄보도록 하자.

### 환경 구축하기

```
npm install --save-dev html-webpack-plugin
```

설치 후 `webpack.config.js`파일을 다음과 같이 수정한다.

```
// webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:"development",
    entry:{
        index:"./source/index.js",
        about:"./source/about.js"
    },
    output:{
        path:path.resolve(__dirname, "public"),
        filename:'[name]_bundle.js'
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
```

`plugins`에 `template`, `filename`, `chunks`를 작성한다.

html에서 script를 삭제해도 된다.

### 추가 기능

수정 후 일일이 `npx webpack`을 입력하기 귀찮다면 다음과 같이 입력한다.

```
npx webpack --watch
```

이렇게 하면 파일을 수정할 때마다 자동으로 감지해준다.

### npm 패키지 사용

```
npm install lodash
```

설치한 `lodash` 패키지를 어떻게 우리의 프로젝트로 삽입할 수 있을까?

```
// index.js

import hello from "./hello.js";
import world from "./world.js";
import _ from "lodash";

document.querySelector('#root').innerHTML = _.join([hello, world], ' ');
```

`lodash`를 `import`한 후, `_.join([hello, world], ' ');`를 삽입해주면 이전과 똑같은 결과를 볼 수 있다.



DevServer: live reload 가능

Code splitting: 사용하지 않는 기능을 쪼갠다.

Lazy loading: 쪼개진 것을 필요할 때마다 로딩하는 것