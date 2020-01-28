# Test App 123
Test App 123


## Installation

``` bash
# clone the repo
$ git clone https://github.com/TaganiPhilippines/TaganiPlus

# go into app's directory
$ cd TaganiPlus/TaganiPlus

# install app's dependencies
$ npm i
```


## Basic usage

``` bash
# dev server  with hot reload at http://localhost
$ npm start
```

Navigate to [http://localhost](http://localhost). The app will automatically reload if you change any of the source files.

## Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

## Folder structure

```
TaganiPlus
├── public
│   ├── assets
│   └── index.html
│
├── src
│   ├── actions
│       └── actionGroupName
│           └── index.js
│   ├── assets
│           └── img
│   ├── components
│       └── MyComponent
│           ├── index.js
│           └── MyComponent.js
│   ├── constants
│       └── constantGroupName.js
│   ├── deafault-layout
│       └── DefaultLayout
│           └── index.js
│   ├── nav
│       └── _nav.js             #sidebar config
│       └── routes.js           #sidebar routes config
│   ├── polyfills
│       └── index.js 
│   ├── reducers
│       └── reducerName.js
│   ├── scss
│   ├── services
│       └── api.js
│       └── privateRoute.js
│       └── routes.js
│       └── serviceWorker.js
│   ├── store
│       └── createStore.js
│   ├── utils      
│       └── utilName.js
│   ├── views
│       └── MyPage
│           └── MyPage.js
│   ├── index.js
│
└── package.json
```



