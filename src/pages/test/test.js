
require("expose-loader?$!jquery");
if (process.env.NODE_ENV !== 'production') require('./test.html');
import "./test.scss";
import "@/assets/js/flexible.min.js";

