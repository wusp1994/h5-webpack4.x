const path = require('path');

module.exports = {
	dev: {
		port: 4563,
		autoOpenBrower: false,//自动打开浏览器
		host: "0.0.0.0",
		overlay: {warnings: false, errors: true},
		openPage: 'douCalendar.html',
		publicPath: '/'
	},
	build: {
		//表示输出到dist目录
		path: path.resolve(__dirname, '../../', './dist'),
		//如果是目录大于二级,必须设置'/'
		publicPath: './'
	}
}
