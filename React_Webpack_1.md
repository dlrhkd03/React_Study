# 웹팩

```terminal

//npm 첫 설정으로 package.json 생성
npm init

//react, react-dom 설치
npm i react react-dom

//typescript 설치
npm i typescript
npm i @types/react @types/react-dom

//eslint 설치
npm i -D eslint
//prettier 설치
npm i -D prettier eslint-plugin-prettier eslint-config-prettier

//개발용에서만 쓰일 webpack 설치
//webpack은 실제 운영에서 필요없기 때문에 개발에서만 쓰일 dependency로 설치
npm i -D webpack webpack-cli

npm i -D webpack @babel/core babel-loader @babel/preset-env @babel/preset-react

npm i -D @types/webpack @types/node @babel/preset-typescript

npm i style-loader css-loader
```

## eslint

`.eslintrc` 속성 파일 생성 후

```
{
  "extends": ["plugin:prettier/recommended"]
}

```

## prettier

`.prettierrc` 속성 파일 생성 후

```
{
  "printWidth": 120,
  "tabWidth": 2,
  "singleQuote": true,
  "tranilingComma": "all",
  "semi": true
}
```

## typescript

`tsconfig.json` 속성 파일 만들고

```
{
  "compilerOptions": {
    "esModuleInterop": true,
    "sourceMap": true,
    "lib": ["ES2020", "DOM"],
    "jsx": "react",
    "module": "esnext",
    "moduleResolution": "Node",
    "target": "es5",
    "strict": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@hooks/*": ["hooks/*"],
      "@components/*": ["components/*"],
      "@layouts/*": ["layouts/*"],
      "@pages/*": ["pages/*"],
      "@utils/*": ["utils/*"],
      "@typings/*": ["typings/*"]
    }
  },
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs",
      "moduleResolution": "Node",
      "target": "es5",
      "esModuleInterop": true
    }
  }
}
```

## 웹팩 사용이유

모듈 시스템을 이용해서 코드를 나누고 다시 하나로 합치기 위해 사용

## Hot Reloading

```terminal
npm i -D @pmmmwh/react-refresh-webpack-plugin
npm i -D react-refresh

//위 디펜던시 깔고 webpack.config.ts 에서 설정함
```

## Webpack

```
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config: webpack.Configuration = {
  name: 'sleact',
  mode: isDevelopment ? 'development' : 'production',
  devtool: !isDevelopment ? 'hidden-source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@hooks': path.resolve(__dirname, 'hooks'),
      '@components': path.resolve(__dirname, 'components'),
      '@layouts': path.resolve(__dirname, 'layouts'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@utils': path.resolve(__dirname, 'utils'),
      '@typings': path.resolve(__dirname, 'typings'),
    },
  },
  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: { browsers: ['last 2 chorme versions', 'IE 10'] },
                debug: isDevelopment,
              },
            ],
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        },
        exclude: path.join(__dirname, 'node_modules'),
      },
      {
        test: /\.css?$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      // eslint: {
      //   files: "./src/**/*",
      // },
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true, // react router
    port: 3090,
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) },
    proxy: {
      '/api/': {
        target: 'http://localhost:3095',
        changeOrigin: true,
      },
    },
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new ReactRefreshWebpackPlugin());
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server', openAnalyzer: true }));
}
if (!isDevelopment && config.plugins) {
  config.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  config.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }));
}

export default config;


```

## 최신 디펜던시 보려면...

```
npm outdated //디펜던시 최신 버전 보여주고

npm i @types/react@18 //18버전 다운 받을 것이라고 쓰면 된다.
```

## loadable/component

코드 스플리팅은 미리 다른 js를 안가져오도록 설정하는 것이다. 컴포넌트를 분리한다고 생각하면된다.

가장 단순한 상황은 페이지 단위로 분리하면 된다.

```
import loadable from '@loadable/component';

const Login = loadable(() => import('@pages/Login/index'));
const SignUp = loadable(() => import('@pages/SignUp'));
```
