require("expose-loader?$!jquery");
if (process.env.NODE_ENV !== 'production') require('./active2.html');
import "./active2.scss";
import "@/assets/js/flexible.min.js";

$(() => {
  
  let imgNum = 9;
  for (let i = 1; i <= imgNum; i++) {
    let heiPace = 10 * (i + 1);//百分比
    let htmlTem = `
    <div class="item">
                    <div class="type">
                        <img src="./static/img/activity${i}.png" alt="">
                    </div>
                    <!--进度-->
                    <div class="paceBox">
                        <div class="paceS">
                        <!--控制高度百分比实现效果-->
                            <div class="pace wave" style="height:${heiPace}%"></div>
                        </div>
                        <div class="paceBox-main">
                        </div>
                        <div class="paceBox-right">
                            <img src="./static/img/paceRight.png" alt="">
                        </div>
                        <div class="paceBox-mid mid1">
                            <img src="./static/img/mid1.png" alt="">
                        </div>
                        <div class="paceBox-mid mid2">
                            <img src="./static/img/mid2.png" alt="">
                        </div>

                    </div>
                    <div class="text">
                        <p class="paceNum"> ${heiPace}%</p>
                        <p class="txt">12%能量=1.6元</p>
                        <p class="txt2">103698人参与</p>
                    </div>
                    <div class="btn">
                        去观看
                    </div>
                </div>
    `
    $("#activity-content").append(htmlTem)
  }
  
  $('#activity-content .item .btn').on('click',function () {
    console.log("22222")
  })
  
})


