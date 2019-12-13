
require("expose-loader?$!jquery");
if (process.env.NODE_ENV !== 'production') require('./detail.html');
import "./detail.scss";
import "@/assets/js/flexible.min.js";

$(()=>{
  //nav切换
  $("#nav .item").on('click', function () {
    let $this = $(this);
    let itemIndex = $this.index();
    $this.addClass('active').siblings('#nav .item').removeClass('active');
    $('.tabCardBox .tabCard').eq(itemIndex).show().siblings('.tabCard').hide();
  });
})
