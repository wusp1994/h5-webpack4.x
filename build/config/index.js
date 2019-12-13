const path = require('path');

module.exports = {
	dev: {
		port: 9566,
		autoOpenBrower: true,//自动打开浏览器
		host: 'localhost',
		overlay: { warnings: false, errors: true },
		openPage: 'active1.html',
		publicPath: '/'
	},
	build: {
		//表示输出到dist目录
		path: path.resolve(__dirname, '../../','./dist'),
		//如果是目录大于二级,必须设置'/'
		publicPath: './'
    }
}