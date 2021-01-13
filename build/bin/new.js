'use strict'

// process.on('exit', function() {

// });

// if(!process.argv[2]) {
// 	console.error('请输入文件名称 如home或者user/login');
// 	process.exit(1)
// }

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const pageList = require('../config/pages.js');

function pageResove(dir) {
	return path.join(__dirname, '../../', './src/pages', dir);
}

const Files = {
	html: function (pageItem) {
		return  `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	 <meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
	 <title>${pageItem.title}</title>
</head>
<body>

</body>
</html>`
	},
	
	js: function (name) {
		return `
require("expose-loader?$!jquery");
if (process.env.NODE_ENV !== 'production') require('./${name}.html');
import "./${name}.scss";
import "@/assets/js/flexible.min.js";
`
	},
	css: function () {
		return `
@import "../../assets/css/reset.css";
`
	},
};

function buildFile() {
	var len = pageList.length,
		i = 0;
	while (i < len) {
		let item = pageList[i];
		i++;
		fs.access(pageResove(item.template), function (err) {
			
			if (!err) {
				return;
			}
			
			console.log('新建文件: ' + item.template)
			
			//新建html
			fileSave(pageResove(item.template))
			.write(Files.html(item), 'utf8')
			.end('\n');
			
			//新建js
			fileSave(pageResove(item.entry))
			.write(Files.js(item.name), 'utf8')
			.end('\n');
			
			//新建scss
			fileSave(pageResove(item.template.replace('.html', '.scss')))
			.write(Files.css(), 'utf8')
			.end('\n');
			
			
		})
	}
}

buildFile();
