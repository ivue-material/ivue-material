<p align="center">
  <a href="https://lovevuerk.com/" target="_blank">
    <img width="100"src="https://github.com/qq282126990/ivue-ui/blob/master/logo.png">
  </a>
</p>

## IVue     

**<a href="https://lovevuerk.com/" target="_blank">https://lovevuerk.com/</a>**

IVue is a semantic component framework for Vue. It aims to provide clean, semantic and reusable components.
iVue Created according to Google's **<a href="https://material.io/" target="_blank">Material Design Spec</a>**

## Browser Support

IVue supports all **modern browsers**, including IE11 and Safari 9+ (using polyfills).        
           
IVue utilizes features of ES2015/2017 that require the need to use polyfills for Internet Explorer 11 and Safari 9/10. If you are using vue-cli-3, this is done automatically for you. Otherwise, in your project directory, you can install babel-polyfill:       

```javascript
// my-project/
$ yarn add babel-polyfill
// OR
$ npm install babel-polyfill --save
```

It is important to include the plugin as early as possible within your main index.js file.

```javascript
// my-project/src/index.js
import 'babel-polyfill'
...
new Vue()
```

It is recommended that you use ```babel-preset-env``` with the corresponding polyfill to ensure only the necessary polyfills are added to your application. For more information on ```babel-present-env```, visit the documentation

```javascript
$ yarn add @babel/preset-env -d
// OR
$ npm install @babel/preset-env --save-dev
```

Once installed, add the preset to your ```.babelrc``` or ```babel.config.js```

```javascript
// .babelrc
{
  "presets": ["@babel/preset-env"]
}

// babel.config.js
module.exports = {
  presets: ['@babel/preset-env']
}
```       
  
Unfortunately ```vue-cli-3``` doesn't automatically bring IE11 compatibility in which you may encounter various errors (such as Symbol is not defined). To assist in resolving these errors you may need to manually add ```transpileDependencies``` parameter in ```vue.config.js```

```
module.exports = {
  transpileDependencies:[/node_modules[/\\\\]ivue-material[/\\\\]/]
}
```

## Installation

Using npm:      

```javascript
 npm install ivue-material --save
```

Using a script tag for global use:

```javascript
<link rel="stylesheet" href="//unpkg.com/ivue-material/dist/styles/ivue.css">
<script src="//unpkg.com/ivue-material/dist/ivue.min.js"></script>
```

You can see the latest version resources at <a href="https://unpkg.com/ivue-material/" target="_blank">unpkg.com/ivue-material</a>           

## Usage

```javascript
import Vue from 'vue';
import IvueMaterial from 'ivue-material';

Vue.use(IvueMaterial);
```

Using css via import:

```javascript
import 'ivue-material/dist/styles/ivue.css';
```

## Community

Contribute: Contact us WeChat or via mail to jianzhongmin@foxmail.com. PRs welcome!


## License

**<a href="https://opensource.org/licenses/MIT">MIT</a>**

Copyright (c) 2019-present, IVue
