require("./second.js")
require("style-loader!css-loader!./style.css")
//require("./style.css")
//命令行打包 webpack index.js -o index.bundle.js --module-bind "css=css-loader!style-loader"

function hello(){
    alert("hello");
}
hello();
