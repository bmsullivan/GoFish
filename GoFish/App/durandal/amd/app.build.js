{
  "name": "durandal/amd/almond-custom",
  "inlineText": true,
  "stubModules": [
    "durandal/amd/text"
  ],
  "paths": {
    "text": "durandal/amd/text"
  },
  "baseUrl": "C:\\Users\\Brian\\Documents\\GitHub\\GoFish\\GoFish\\App",
  "mainConfigFile": "C:\\Users\\Brian\\Documents\\GitHub\\GoFish\\GoFish\\App\\main.js",
  "include": [
    "main-built",
    "main",
    "durandal/app",
    "durandal/composition",
    "durandal/events",
    "durandal/http",
    "text!durandal/messageBox.html",
    "durandal/messageBox",
    "durandal/modalDialog",
    "durandal/system",
    "durandal/viewEngine",
    "durandal/viewLocator",
    "durandal/viewModel",
    "durandal/viewModelBinder",
    "durandal/widget",
    "durandal/plugins/router",
    "durandal/transitions/entrance",
    "viewmodels/board",
    "viewmodels/card",
    "viewmodels/shell",
    "text!views/board.html",
    "text!views/card.html",
    "text!views/handCard.html",
    "text!views/shell.html"
  ],
  "exclude": [],
  "keepBuildDir": true,
  "optimize": "uglify2",
  "out": "C:\\Users\\Brian\\Documents\\GitHub\\GoFish\\GoFish\\App\\main-built.js",
  "pragmas": {
    "build": true
  },
  "wrap": true,
  "insertRequire": [
    "main"
  ]
}