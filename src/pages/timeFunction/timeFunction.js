
require("expose-loader?$!jquery");
if (process.env.NODE_ENV !== 'production') require('./timeFunction.html');
import "./timeFunction.scss";
import "@/assets/js/flexible.min.js";

$(function () {
	$(".list .item").each((index,element)=>{
		console.log(index,element)
		$(element).find(".order").text(`${index+1},`)
	})
	$("#btn_getDays").on("click",function () {
		console.time("渲染1")
		let inputDate = $("#input_getDays").val().split("-")
		console.log(inputDate)
		let n = getDays(
			Number(inputDate[0]),
			Number(inputDate[1]),
			Number(inputDate[2]))
		$(".outPut-getDays").text(`当前日期是这一年的第${n}天`)
		console.timeEnd("渲染1")
	})
	
	$("#do2").on("click",function () {
		let inputDate = $(".d2-input").val().split("-")
		let n = getDays(
			Number(inputDate[0]),
			Number(inputDate[1]),
			Number(inputDate[2])
		)
		console.log(n)
		$(".do2-outPut-getDays").text(`当前日期在这一年还剩余${365-Number(n)}天`)
	})
})


//获取天数
function  getDays(year,month,day){
	console.log(year,month,day)
	//先将每个月份的天数存入数组中
	var arr = [31,28,31,30,31,30,31,31,30,31,30,31];
	//将输入月份之前月份的天数累加
	for(var i = 0; i< month -1;i++){
		day += arr[i];
	}
	//判断是否是闰年且看是否大于2月(小于2月没必要考虑闰年问题)
	if(month > 2 && isLeap(year)){
		day ++;
	}
	return day;
}


//先判断是否是闰年
function isLeap(year){
	if (year % 400 == 0 || year % 4 === 0 && year % 100 !== 0){
		return true;
	}else{
		return false;
	}
}


