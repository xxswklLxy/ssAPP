(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-link/uni-link"],{"1ec7":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"uniLink",props:{href:{type:String,default:""},text:{type:String,default:""},showUnderLine:{type:[Boolean,String],default:!0},copyTips:{type:String,default:"已自动复制网址，请在手机浏览器里粘贴该网址"},color:{type:String,default:"#999999"},fontSize:{type:[Number,String],default:14}},methods:{openURL:function(){t.setClipboardData({data:this.href}),t.showModal({content:this.copyTips,showCancel:!1})}}};n.default=e}).call(this,e("543d")["default"])},"51ad":function(t,n,e){"use strict";e.r(n);var u=e("cf7c"),i=e("ffd5");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("84dc");var c,r=e("f0c5"),f=Object(r["a"])(i["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);n["default"]=f.exports},"84dc":function(t,n,e){"use strict";var u=e("b5e7"),i=e.n(u);i.a},b5e7:function(t,n,e){},cf7c:function(t,n,e){"use strict";var u,i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return u}))},ffd5:function(t,n,e){"use strict";e.r(n);var u=e("1ec7"),i=e.n(u);for(var a in u)"default"!==a&&function(t){e.d(n,t,(function(){return u[t]}))}(a);n["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-link/uni-link-create-component',
    {
        'components/uni-link/uni-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("51ad"))
        })
    },
    [['components/uni-link/uni-link-create-component']]
]);
