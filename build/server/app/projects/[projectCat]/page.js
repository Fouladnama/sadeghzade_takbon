(()=>{var e={};e.id=823,e.ids=[823],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},5602:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>w});var i=r(60687),n=r(43210),s=r(16189),a=r(51060),o=r(85814),p=r.n(o),d=r(51827),c=r(23965),A=r(91913),l=r(88863),u=r(14159);let h=u.Ay.div.withConfig({componentId:"sc-8dfc025b-0"})(['font-family:"IRANSansWeb",sans-serif;pre,p,h3{font-family:"IRANSansWeb",sans-serif;}']),g=u.Ay.div.withConfig({componentId:"sc-8dfc025b-1"})(["width:100%;height:fit-content;background-image:url(",");background-size:cover;background-repeat:no-repeat;background-position:center;transition:all .2s ease;display:flex;direction:",";align-items:center;@media screen and (min-height:900px){height:100vh;}"],e=>e.image.src,e=>e.direction),x=u.Ay.div.withConfig({componentId:"sc-8dfc025b-2"})(["width:100%;position:absolute;"]),m=(0,u.Ay)(p()).withConfig({componentId:"sc-8dfc025b-3"})(["width:120px;height:120px;background-image:url(",");background-size:cover;background-repeat:no-repeat;background-position:center;transition:all ease-in-out .2s;margin:10px 15px;z-index:2;position:relative;float:left;@media screen and (max-width:850px){width:100px;height:100px;}"],e=>e.hover.src),f=u.Ay.div.withConfig({componentId:"sc-8dfc025b-4"})(["width:90%;height:max-content;display:flex;flex-direction:row;flex-wrap:wrap;align-items:stretch;justify-content:space-evenly;margin:0 auto;padding:15rem 0 15rem;transition:all ease .2s;@media screen and (max-width:1000px){padding:10rem 0 7rem;}"]),b=u.Ay.div.withConfig({componentId:"sc-8dfc025b-5"})(["width:300px;box-shadow:10px 10px 25px -5px #000,0 0px 10px -6px #000;background-color:#2A2E2F;display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;margin:10px 15px;padding:30px;border-radius:10px;position:relative;transition:all ease-in-out .2s;"]);u.Ay.img.withConfig({componentId:"sc-8dfc025b-6"})(["width:90px;height:90px;margin:10px 0;transition:all ease-in-out .2s;"]);let j=u.Ay.h3.withConfig({componentId:"sc-8dfc025b-7"})(["width:250px;font-size:1.3rem;display:flex;align-items:center;justify-content:center;color:#fff;margin-top:15px;transition:all ease-in-out .2s;text-align:center;font-family:"," !important;@media screen and (max-width:400px){width:unset;}"],e=>e.font?'"IRANSansWeb", sans-serif':'"WhyteInktrap", sans-serif'),v=(0,u.Ay)(p()).withConfig({componentId:"sc-8dfc025b-8"})(["width:fit-content;background-color:transparent;color:#fff;border:1px solid #fff;border-radius:10px;padding:5px 10px;margin-top:20px;background-size:200% 100%;background-image:linear-gradient(to right,transparent 50%,white 50%);-webkit-transition:background-position 0.2s ease;-moz-transition:background-position 0.2s ease;transition:background-position 0.2s ease;&:hover{background-position:-100% 0;color:#000;}"]);var k=r(30474);let w=()=>{let e=(0,s.usePathname)(),t=(0,s.useSearchParams)(),{projectCat:r}=(0,s.useParams)(),[o,u]=(0,n.useState)(null),[w,y]=(0,n.useState)([]),[C,I]=(0,n.useState)(!0),[D,P]=(0,n.useState)(null);return((0,n.useEffect)(()=>{let e=t.get("lang");("fa"===e||"en"===e)&&u(e)},[t,e]),(0,n.useEffect)(()=>{o&&r&&(async()=>{try{let e=await a.A.get(`https://takbon.biz:3402/get_projects_name/?id=${r}`),t=Array.isArray(e.data)?e.data:e.data?.value||[];y(t)}catch(e){console.error("Error fetching project details:",e),P("خطا در دریافت اطلاعات پروژه. لطفاً دوباره تلاش کنید.")}finally{I(!1)}})()},[o,r]),o&&r)?C?(0,i.jsx)("div",{style:{textAlign:"center",padding:"2rem"},children:"در حال بارگذاری..."}):D?(0,i.jsx)("div",{style:{textAlign:"center",padding:"2rem"},children:D}):(0,i.jsxs)(h,{children:[(0,i.jsx)(d.A,{}),(0,i.jsx)(x,{children:(0,i.jsx)(m,{href:`/landing?lang=${o}`,hover:A.A})}),(0,i.jsx)(g,{image:l.A,direction:"fa"===o?"rtl":"ltr",children:(0,i.jsx)(f,{children:0===w.length?(0,i.jsx)("p",{style:{textAlign:"center"},children:"اطلاعاتی برای نمایش وجود ندارد"}):w.map(e=>{if(!e||!e._id)return console.warn("Project item missing _id, skipping:",e),null;let t=e.image?e.image.startsWith("http")?e.image:`https://takbon.biz/images/${e.image}`:"/fallback-image.jpg",n="en"===o?e.tilte_en:e.tilte,s=`/projects/${r}/${e._id}?lang=${o}`;return(0,i.jsxs)(b,{children:[(0,i.jsx)(k.default,{src:t,alt:n||"project image",width:90,height:90,style:{width:"90px",height:"90px",objectFit:"cover",borderRadius:"8px"}}),(0,i.jsx)(j,{$font:"fa"===o,children:n||"بدون عنوان"}),r&&e._id&&o?(0,i.jsx)(p(),{href:s,children:(0,i.jsx)(v,{as:"div",children:"en"===o?"More details":"توضیحات بیشتر"})}):(0,i.jsx)(v,{as:"div",style:{cursor:"not-allowed",opacity:.5},children:"en"===o?"More details":"توضیحات بیشتر"})]},e._id)})})}),(0,i.jsx)(c.A,{})]}):null}},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},12412:e=>{"use strict";e.exports=require("assert")},14682:(e,t,r)=>{Promise.resolve().then(r.bind(r,34393))},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34393:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});let i=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\zahra\\\\OneDrive\\\\Desktop\\\\takbon\\\\takbon-main\\\\src\\\\app\\\\projects\\\\[projectCat]\\\\page.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\zahra\\OneDrive\\Desktop\\takbon\\takbon-main\\src\\app\\projects\\[projectCat]\\page.js","default")},54850:(e,t,r)=>{Promise.resolve().then(r.bind(r,5602))},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},74075:e=>{"use strict";e.exports=require("zlib")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},88863:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});let i={src:"/_next/static/media/project.b9e72ac1.jpg",height:3631,width:5446,blurDataURL:"data:image/jpeg;base64,/9j/2wBDAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/v/2wBDAQoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/v/wgARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUAQEAAAAAAAAAAAAAAAAAAAAB/9oADAMBAAIQAxAAAAC4C//EABoQAAEFAQAAAAAAAAAAAAAAAAMAAQIEEiH/2gAIAQEAAT8ABitYDVDDA3HKb9X/xAAYEQACAwAAAAAAAAAAAAAAAAAAAQIxcf/aAAgBAgEBPwCnLT//xAAXEQADAQAAAAAAAAAAAAAAAAAAAkFx/9oACAEDAQE/AIuH/9k=",blurWidth:8,blurHeight:5}},94735:e=>{"use strict";e.exports=require("events")},95115:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>A,pages:()=>c,routeModule:()=>l,tree:()=>d});var i=r(65239),n=r(48088),s=r(88170),a=r.n(s),o=r(30893),p={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(p[e]=()=>o[e]);r.d(t,p);let d={children:["",{children:["projects",{children:["[projectCat]",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,34393)),"C:\\Users\\zahra\\OneDrive\\Desktop\\takbon\\takbon-main\\src\\app\\projects\\[projectCat]\\page.js"]}]},{}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,75535)),"C:\\Users\\zahra\\OneDrive\\Desktop\\takbon\\takbon-main\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(r.bind(r,28069)),"C:\\Users\\zahra\\OneDrive\\Desktop\\takbon\\takbon-main\\src\\app\\not-found.js"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,70440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["C:\\Users\\zahra\\OneDrive\\Desktop\\takbon\\takbon-main\\src\\app\\projects\\[projectCat]\\page.js"],A={require:r,loadChunk:()=>Promise.resolve()},l=new i.AppPageRouteModule({definition:{kind:n.RouteKind.APP_PAGE,page:"/projects/[projectCat]/page",pathname:"/projects/[projectCat]",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[447,405,60,474,66,965],()=>r(95115));module.exports=i})();