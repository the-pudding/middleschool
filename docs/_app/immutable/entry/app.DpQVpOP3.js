const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.CRsj61kc.js","../chunks/disclose-version.Bg9kRutz.js","../chunks/runtime.Kq_vOjen.js","../chunks/template.BzHAocyG.js","../chunks/snippet.CuzseIHe.js","../assets/0.bx5VTKoT.css","../nodes/1.K0Kk2Ise.js","../chunks/store.DMz45Qqq.js","../chunks/entry.4UYX1S-q.js","../chunks/paths.CJ8lAJ05.js","../nodes/2.giLQRjG9.js","../chunks/attributes.B53R-gSn.js","../chunks/props.C3atQusg.js","../chunks/this.CYyNAQd_.js","../chunks/copy.rv8Mi8zP.js","../chunks/index-client.VFK0ftWY.js","../chunks/transform.BXP9HJX6.js","../assets/2.D7HRDzMU.css","../nodes/3.BHlBWuTF.js","../chunks/svelte-component.BB5KgLxk.js","../assets/3.CO4jlTh2.css","../nodes/4.D1ZMLmBG.js","../assets/4.BosP74pi.css","../nodes/5.BIAXfyRB.js","../assets/5.B-mGqUsL.css","../nodes/6.RBcn971s.js"])))=>i.map(i=>d[i]);
var B=o=>{throw TypeError(o)};var U=(o,t,r)=>t.has(o)||B("Cannot "+r);var i=(o,t,r)=>(U(o,t,"read from private field"),r?r.call(o):t.get(o)),A=(o,t,r)=>t.has(o)?B("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(o):t.set(o,r),S=(o,t,r,a)=>(U(o,t,"write to private field"),a?a.call(o,r):t.set(o,r),r);import{a4 as v,ag as H,a1 as L,ap as J,aq as K,R as Q,j as X,ar as Z,u as M,as as N,at as k,au as $,k as tt,av as T,m as et,t as rt,r as st,ah as C}from"../chunks/runtime.Kq_vOjen.js";import{j as ot,m as nt,u as at,a as it}from"../chunks/store.DMz45Qqq.js";import"../chunks/disclose-version.Bg9kRutz.js";import{i as D,b as I}from"../chunks/this.CYyNAQd_.js";import{d as V,a as b,t as W,e as ct}from"../chunks/template.BzHAocyG.js";import{c as p}from"../chunks/svelte-component.BB5KgLxk.js";import{p as j,a as lt}from"../chunks/props.C3atQusg.js";import{o as ut}from"../chunks/index-client.VFK0ftWY.js";function mt(o){return class extends dt{constructor(t){super({component:o,...t})}}}var g,u;class dt{constructor(t){A(this,g);A(this,u);var h;var r=new Map,a=(s,e)=>{var m=Q(e);return r.set(s,m),m};const c=new Proxy({...t.props||{},$$events:{}},{get(s,e){return v(r.get(e)??a(e,Reflect.get(s,e)))},has(s,e){return e===H?!0:(v(r.get(e)??a(e,Reflect.get(s,e))),Reflect.has(s,e))},set(s,e,m){return L(r.get(e)??a(e,m),m),Reflect.set(s,e,m)}});S(this,u,(t.hydrate?ot:nt)(t.component,{target:t.target,anchor:t.anchor,props:c,context:t.context,intro:t.intro??!1,recover:t.recover})),(!((h=t==null?void 0:t.props)!=null&&h.$$host)||t.sync===!1)&&J(),S(this,g,c.$$events);for(const s of Object.keys(i(this,u)))s==="$set"||s==="$destroy"||s==="$on"||K(this,s,{get(){return i(this,u)[s]},set(e){i(this,u)[s]=e},enumerable:!0});i(this,u).$set=s=>{Object.assign(c,s)},i(this,u).$destroy=()=>{at(i(this,u))}}$set(t){i(this,u).$set(t)}$on(t,r){i(this,g)[t]=i(this,g)[t]||[];const a=(...c)=>r.call(this,...c);return i(this,g)[t].push(a),()=>{i(this,g)[t]=i(this,g)[t].filter(c=>c!==a)}}$destroy(){i(this,u).$destroy()}}g=new WeakMap,u=new WeakMap;const ft="modulepreload",_t=function(o,t){return new URL(o,t).href},G={},P=function(t,r,a){let c=Promise.resolve();if(r&&r.length>0){const s=document.getElementsByTagName("link"),e=document.querySelector("meta[property=csp-nonce]"),m=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));c=Promise.allSettled(r.map(l=>{if(l=_t(l,a),l in G)return;G[l]=!0;const y=l.endsWith(".css"),x=y?'[rel="stylesheet"]':"";if(!!a)for(let d=s.length-1;d>=0;d--){const _=s[d];if(_.href===l&&(!y||_.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${x}`))return;const n=document.createElement("link");if(n.rel=y?"stylesheet":ft,y||(n.as="script"),n.crossOrigin="",n.href=l,m&&n.setAttribute("nonce",m),document.head.appendChild(n),y)return new Promise((d,_)=>{n.addEventListener("load",d),n.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${l}`)))})}))}function h(s){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=s,window.dispatchEvent(e),!e.defaultPrevented)throw s}return c.then(s=>{for(const e of s||[])e.status==="rejected"&&h(e.reason);return t().catch(h)})},At={};var ht=W('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),vt=W("<!> <!>",1);function gt(o,t){X(t,!0);let r=j(t,"components",23,()=>[]),a=j(t,"data_0",3,null),c=j(t,"data_1",3,null);Z(()=>t.stores.page.set(t.page)),M(()=>{t.stores,t.page,t.constructors,r(),t.form,a(),c(),t.stores.page.notify()});let h=T(!1),s=T(!1),e=T(null);ut(()=>{const E=t.stores.page.subscribe(()=>{v(h)&&(L(s,!0),N().then(()=>{L(e,lt(document.title||"untitled page"))}))});return L(h,!0),E});const m=C(()=>t.constructors[1]);var l=vt(),y=k(l);D(y,()=>t.constructors[1],E=>{var n=V();const d=C(()=>t.constructors[0]);var _=k(n);p(_,()=>v(d),(R,O)=>{I(O(R,{get data(){return a()},get form(){return t.form},children:(f,yt)=>{var q=V(),Y=k(q);p(Y,()=>v(m),(z,F)=>{I(F(z,{get data(){return c()},get form(){return t.form}}),w=>r()[1]=w,()=>{var w;return(w=r())==null?void 0:w[1]})}),b(f,q)},$$slots:{default:!0}}),f=>r()[0]=f,()=>{var f;return(f=r())==null?void 0:f[0]})}),b(E,n)},E=>{var n=V();const d=C(()=>t.constructors[0]);var _=k(n);p(_,()=>v(d),(R,O)=>{I(O(R,{get data(){return a()},get form(){return t.form}}),f=>r()[0]=f,()=>{var f;return(f=r())==null?void 0:f[0]})}),b(E,n)});var x=$(y,2);D(x,()=>v(h),E=>{var n=ht(),d=et(n);D(d,()=>v(s),_=>{var R=ct();rt(()=>it(R,v(e))),b(_,R)}),st(n),b(E,n)}),b(o,l),tt()}const St=mt(gt),Tt=[()=>P(()=>import("../nodes/0.CRsj61kc.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),()=>P(()=>import("../nodes/1.K0Kk2Ise.js"),__vite__mapDeps([6,1,2,7,3,8,9]),import.meta.url),()=>P(()=>import("../nodes/2.giLQRjG9.js"),__vite__mapDeps([10,1,2,3,7,11,12,13,14,4,15,16,17]),import.meta.url),()=>P(()=>import("../nodes/3.BHlBWuTF.js"),__vite__mapDeps([18,1,2,3,12,7,11,19,14,4,13,20]),import.meta.url),()=>P(()=>import("../nodes/4.D1ZMLmBG.js"),__vite__mapDeps([21,1,3,2,22]),import.meta.url),()=>P(()=>import("../nodes/5.BIAXfyRB.js"),__vite__mapDeps([23,1,2,7,3,11,12,16,15,9,24]),import.meta.url),()=>P(()=>import("../nodes/6.RBcn971s.js"),__vite__mapDeps([25,1]),import.meta.url)],Ct=[],Dt={"/":[-3],"/demo":[3],"/demo/elements":[4],"/demo/fonts":[5],"/demo/ig-story":[6]},It={handleError:({error:o})=>{console.error(o)},reroute:()=>{}};export{Dt as dictionary,It as hooks,At as matchers,Tt as nodes,St as root,Ct as server_loads};
