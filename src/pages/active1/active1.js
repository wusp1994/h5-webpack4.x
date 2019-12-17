require("expose-loader?$!jquery");
if (process.env.NODE_ENV !== 'production') require('./active1.html');
import "./active1.scss";
import "@/assets/js/flexible.min.js";


$(() => {
  //todo 如果登录，userName 增加className:active
  
  //todo 活动轮播，js插入dom
  let activeImgNum = 10;
  for (let i = 1; i < activeImgNum; i++) {
    //已激活
    let activeHtmlStr = `
      <div class="item active">
          <img src="./static/img/activeItem.png" alt="">
          <div class="content">
              <p class="txt1">
                  好友已激活
              </p>
              <p class="txt2">
                  <b>￥</b>0.5
              </p>
              <p class="userInfo">
                  <img src="./static/img/userHeader.jpg" alt="">
                  <b>wusp1994</b>
              </p>
          </div>
      </div>
    `;
    //未激活
    let notActiveHtmlStr = `
      <div class="item not-active">
          <img src="./static/img/activeItem_putong.png" alt="">
          <div class="content">
              <p class="txt1">
                  领红包
              </p>
              <p class="txt2">
                  <b>￥</b>0.5
              </p>
              <p class="userInfo">
                  邀请好友
              </p>
          </div>
      </div>
    `;
    //模拟已激活为一
    if (i === 1) {
      $("#activeBox").append(activeHtmlStr);
    } else {
      $("#activeBox").append(notActiveHtmlStr);
    }
  }
  
  
})

function test() {
  let wu = [11,22,"wushaopeng"];
  wu.map((item)=>{
    console.log(item)
  })
}
test()







