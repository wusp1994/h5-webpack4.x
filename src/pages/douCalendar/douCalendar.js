require("expose-loader?$!jquery");
if (process.env.NODE_ENV !== 'production') require('./douCalendar.html');
import "./douCalendar.scss";
import "@/assets/js/flexible.min.js";
import {data} from "./data"
import Html2canvas from "html2canvas";

$(function () {
	const Url = window.location.href.split("?")[0]
	const availWidth = window.screen.availWidth
	const availHeight = window.screen.availHeight
	const bottomHeight = document.querySelector('.bottom').clientHeight
	var now = new Date()
	let index = 0 	//输入日期，判断这个日期是这一年的第几天?
	if (getQueryString("y")) { //url包含参数
		let y = getQueryString("y")
		let m = getQueryString("m")
		let d = getQueryString("d")
		index = getDays(y, m, d) - 1;
		console.log(index)
		loadData(index)
	} else {  //url 没有参数，取当日
		index = getDays(now.getFullYear(), now.getMonth() + 1, now.getDate()) - 1;
		loadData(index)
	}
	
	$(".middle .btn.last,#last-btn").on("click", function () {
		let days = index
		var date = getDate(2021, days)
		var u = addParams(Url, {
			y: date.getFullYear(),
			m: "" + (date.getMonth() + 1),
			d: "" + date.getDate()
		})
		window.location.href = u
	})
	$(".middle .btn.next").on("click", function () {
		let days = index + 2
		var date = new Date(getDate(2021, days))
		var u = addParams(Url, {
			y: date.getFullYear(),
			m: "" + (date.getMonth() + 1),
			d: "" + date.getDate()
		})
		window.location.href = u
	})
	//下载按钮
	document.querySelector("#down-btn").innerHTML = `（第${index + 1}天）下载`
	document.querySelector("#down-btn").addEventListener('click', function () {
		let dataItem = data[index]
		printScreen(dataItem.movie_name_ch+'.png')
	})
	
	//截图并下载
	function printScreen(downName='0011.png') {
		const screenshot = document.getElementById("screenshot");
		let shareContent = screenshot,//需要截图的包裹的（原生的）DOM 对象
			width = shareContent.clientWidth,//shareContent.offsetWidth; //获取dom 宽度
			height = shareContent.clientHeight,//shareContent.offsetHeight; //获取dom 高度
			canvas = document.createElement("canvas"), //创建一个canvas节点
			scale = 2; //定义任意放大倍数 支持小数
		canvas.width = width * scale; //定义canvas 宽度 * 缩放
		canvas.height = height * scale; //定义canvas高度 *缩放
		canvas.style.width = shareContent.clientWidth * scale + "px";
		canvas.style.height = shareContent.clientHeight * scale + "px";
		// canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
		// allowTaint: true, // 不能与useCORS共用
		const opts = {
			logging: false,//日志开关，便于查看html2canvas的内部执行流程
			canvas: canvas, //自定义 canvas
			scale: scale,
			width: width, //dom 原始宽度
			height: height,
			useCORS: true,  // 【重要】开启跨域配置
		};
		Html2canvas(shareContent, opts).then(res => {
			const {width, height} = res;
			console.log(res)
			const base64 = res.toDataURL("image/png", 1);
			Render(base64, width, height, img => {
				// document.body.appendChild(img);
				Download(base64, downName);
			});
		}, err => alert("截图失败，请重新尝试"));
	}
	
	//加载数据
	function loadData(index) {
		let dataItem = data[index]
		console.log(dataItem)
		// let coverImage = dataItem.coverImage_OSS === ""?`../../../static/doubanImage/${dataItem.coverImage_local}`:dataItem.coverImage_OSS;
		let coverImage = dataItem.coverImage_OSS === "" ? `./static/doubanImage/${dataItem.coverImage_local}` : dataItem.coverImage_OSS;
		$(".calendar-bg img").attr("src", coverImage)
		imgReady(`./static/doubanImage/${dataItem.coverImage_local}`, function (res) {
			console.log(this.width,this.height)
			var boxHei = this.height*(375/this.width);
			if(boxHei > availHeight){
				boxHei = availHeight - bottomHeight
			}
			$(".calendar-box")[0].style.height = boxHei + 'px';
		});
		$(".calendar-txt .day").text(dataItem.day)
		$(".calendar-txt .date-en").text(dataItem.calendar_date)
		$(".calendar-txt .date-ch").text(dataItem.calendar_date_ch)
		$(".movie-info .title").html(` <a href="${dataItem.a_link}">《${dataItem.movie_name_ch}》</a>`)
		$(".movie-info .star").text(`豆瓣评分 ${dataItem.star}`)
		$(".movie-info .tag").text(`${dataItem.show_year} | ${dataItem.country} | ${dataItem.tag.split('/').join(" | ")}`)
		$(".movie-info .director").text(`${dataItem.director} 导演`)
	}
	
});

//获取图片原始宽高
var imgReady = (function () {
	var list = [], intervalId = null,
		// 用来执行队列
		tick = function () {
			var i = 0;
			for (; i < list.length; i++) {
				list[i].end ? list.splice(i--, 1) : list[i]();
			};
			!list.length && stop();
		},
		// 停止所有定时器队列
		stop = function () {
			clearInterval(intervalId);
			intervalId = null;
		};
	return function (url, ready, load, error) {
		var onready, width, height, newWidth, newHeight,
			img = new Image();
		img.src = url;
		// 如果图片被缓存，则直接返回缓存数据
		if (img.complete) {
			console.log("图片被缓存")
			ready.call(img);
			load && load.call(img);
			return;
		};
		width = img.width;
		height = img.height;
		// 加载错误后的事件
		img.onerror = function () {
			error && error.call(img);
			onready.end = true;
			img = img.onload = img.onerror = null;
		};
		// 图片尺寸就绪
		onready = function () {
			newWidth = img.width;
			newHeight = img.height;
			if (newWidth !== width || newHeight !== height ||newWidth * newHeight > 1024) {
				// 如果图片已经在其他地方加载可使用面积检测
				ready.call(img);
				onready.end = true;
			};
		};
		onready();
		// 完全加载完毕的事件
		img.onload = function () {
			// onload在定时器时间差范围内可能比onready快
			// 这里进行检查并保证onready优先执行
			!onready.end && onready();
			load && load.call(img);
			// IE gif动画会循环执行onload，置空onload即可
			img = img.onload = img.onerror = null;
		};
		// 加入队列中定期执行
		if (!onready.end) {
			list.push(onready);
			// 无论何时只允许出现一个定时器，减少浏览器性能损耗
			if (intervalId === null) intervalId = setInterval(tick, 40);
		};
	};
})();
// let nImageSize = getImgNaturalDimensions($(".calendar-bg img")[0])
// console.log(nImageSize)
// 渲染图片
function Render(src, width, height, cb) {
	const img = new Image();
	img.src = src;
	img.width = width;
	img.height = height;
	img.crossOrigin = ""; // 图像跨域时配置
	cb && cb(img);
}

// 下载图片
function Download(url, name) {
	const target = document.createElement("a");
	target.href = url;
	target.download = name;
	const event = document.createEvent("MouseEvents");
	event.initEvent("click", true, true);
	target.dispatchEvent(event);
}

//根据年月日获取一年中的天数
function getDays(year, month, day) {
	//先将每个月份的天数存入数组中
	var arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	//将输入月份之前月份的天数累加
	for (var i = 0; i < month - 1; i++) {
		day += arr[i];
	}
	//判断是否是闰年且看是否大于2月(小于2月没必要考虑闰年问题)
	if (month > 2 && isLeap(year)) {
		day++;
	}
	return day;
}

//输入年和天数，输出这个日期
function getDate(y, d) {
	let date = new Date();
	date.setYear(y);
	date.setDate(d);
	console.log(date)
	return date
}

// getDate(2021, 1)

//先判断是否是闰年
function isLeap(year) {
	if (year % 400 == 0 || year % 4 === 0 && year % 100 !== 0) {
		return true;
	} else {
		return false;
	}
}

function getQueryString(name) {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	let r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return decodeURIComponent(r[2]);
	}
	;
	return null;
}

/**
 * @description 在url后追加多个参数
 */
function addParams(url, keyValue = {}) {
	let newUrl = url;
	if (Object.keys(keyValue).length === 0) {
		return newUrl
	} else {
		Object.keys(keyValue).forEach(key => {
			newUrl = UrlUpdateParams(newUrl, key, keyValue[key])
		})
		return newUrl
	}
}

function UrlUpdateParams(url, name, value) {
	var r = url;
	if (r != null && r != 'undefined' && r != "") {
		value = encodeURIComponent(value);
		var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
		var tmp = name + "=" + value;
		if (url.match(reg) != null) {
			r = url.replace(eval(reg), tmp);
		} else {
			if (url.match("[\?]")) {
				r = url + "&" + tmp;
			} else {
				r = url + "?" + tmp;
			}
		}
	}
	return r;
}

// UrlUpdateParams(window.location.href, "mid", 11111)


//验证是否是中文

var regStr_en = new RegExp("[\u4E00-\u9FA5]+");

// var str = "中文字符"
//
// if(pattern.test(str)){
//
// 	alert('该字符串是中文');
//
// }

//验证是否是英文

var regStr_ch = new RegExp("[A-Za-z]+");

// var str2 = "abcdefsgaaweg"
//
// if(pattern2.test(str2)){
//
// 	alert('该字符串是英文');
//
// }

//验证是否是数字

var regStr_nu = new RegExp("[0-9]+");

// var str3 = "234234"
//
// if(pattern3.test(str3)) {
//
// 	alert('该字符串是数字');
//
// }
