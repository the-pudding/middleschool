import"../chunks/disclose-version.Bg9kRutz.js";import{aD as W,v as E,h as K,i as R,a3 as Q,k as c,r as l,at as p,t as S,j as q,au as U,a6 as x,aj as X,as as C}from"../chunks/runtime.CVyLOi3v.js";import{l as Y,k as Z,a as b}from"../chunks/store.DbDuznDu.js";import{s as A,e as F,r as I,i as B}from"../chunks/attributes.CPqZ9eBk.js";import{a as z,t as M}from"../chunks/template.1UWceXFB.js";import{p as k,a as $}from"../chunks/props.DyH_QjFo.js";import"../chunks/transform.BXP9HJX6.js";import{o as ee}from"../chunks/index-client.BYrvEw6D.js";import{b as te}from"../chunks/paths.B6IiMc9M.js";function se(e,t,s,r){var a=e.__styles??(e.__styles={});a[t]!==s&&(a[t]=s,s==null?e.style.removeProperty(t):e.style.setProperty(t,s,""))}function J(e,t,s=t){var r=W();Y(e,"input",()=>{var a=D(e)?P(e.value):e.value;s(a),r&&a!==(a=t())&&(e.value=a??"")}),E(()=>{var a=t();if(K&&e.defaultValue!==e.value){s(D(e)?P(e.value):e.value);return}D(e)&&a===P(e.value)||e.type==="date"&&!a&&!e.value||a!==e.value&&(e.value=a??"")})}function D(e){var t=e.type;return t==="number"||t==="range"}function P(e){return e===""?null:+e}function re(e,t){return e==null||t==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}class ae extends Map{constructor(t,s=oe){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:s}}),t!=null)for(const[r,a]of t)this.set(r,a)}get(t){return super.get(O(this,t))}has(t){return super.has(O(this,t))}set(t,s){return super.set(ie(this,t),s)}delete(t){return super.delete(ne(this,t))}}function O({_intern:e,_key:t},s){const r=t(s);return e.has(r)?e.get(r):s}function ie({_intern:e,_key:t},s){const r=t(s);return e.has(r)?e.get(r):(e.set(r,s),s)}function ne({_intern:e,_key:t},s){const r=t(s);return e.has(r)&&(s=e.get(r),e.delete(r)),s}function oe(e){return e!==null&&typeof e=="object"?e.valueOf():e}function le(e){return e}function fe(e,...t){return ue(e,Array.from,le,t)}function ue(e,t,s,r){return function a(y,f){if(f>=r.length)return s(y);const n=new ae,u=r[f++];let d=-1;for(const o of y){const i=u(o,++d,y),v=n.get(i);v?v.push(o):n.set(i,[o])}for(const[o,i]of n)n.set(o,a(i,f));return t(n)}(e,0)}var ce=M('<link rel="external stylesheet">'),ye=M('<div class="svelte-15nxc8l"><h3 class="svelte-15nxc8l"> </h3> <p> </p> <details class="svelte-15nxc8l"><summary class="svelte-15nxc8l">CSS Snippet</summary> <code class="svelte-15nxc8l"> </code></details></div>');function me(e,t){R(t,!0);let s=k(t,"id",3,""),r=k(t,"family",3,""),a=k(t,"size",3,16),y=X(()=>`${a()}px`),f=U("");const n=`${te}/assets/demo/fonts/${s()}.css`;ee(async()=>{const _=await fetch(n);Q(f,$(await _.text()))});var u=ye();Z(_=>{var g=ce();A(g,"href",n),z(_,g)});var d=c(u),o=c(d,!0);l(d);var i=p(d,2),v=c(i,!0);l(i);var m=p(i,2),h=p(c(m),2),j=c(h,!0);l(h),l(m),l(u),S(()=>{A(u,"style",`font-family: '${r()??""}';`),b(o,r()),se(i,"font-size",x(y)),b(v,t.text),b(j,x(f))}),z(e,u),q()}const pe=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"inconsolata",family:"Inconsolata",type:"mono"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];var de=M('<h2> </h2> <section class="svelte-1lzc8ku"></section>',1),ve=M('<div id="info" class="svelte-1lzc8ku"><h1>Hosted Fonts on The Pudding</h1> <p><em>Do not use fonts hosted by The Pudding without written permission.</em></p> <form><label for="size" class="svelte-1lzc8ku"> </label> <input id="size" type="range" min="12" max="48"> <label for="text" class="svelte-1lzc8ku">text sample</label> <input id="text" type="text" maxlength="100"></form></div> <article class="svelte-1lzc8ku"></article>',1);function he(e,t){R(t,!0);let s=k(t,"size",7,18),r=k(t,"text",7,"The quick brown fox jumps over the lazy dog.");const a=fe(pe,m=>m.type);a.sort((m,h)=>re(m[1].length,h[1].length));var y=ve(),f=C(y),n=p(c(f),4),u=c(n),d=c(u);l(u);var o=p(u,2);I(o);var i=p(o,4);I(i),l(n),l(f);var v=p(f,2);F(v,21,()=>a,B,(m,h)=>{let j=()=>x(h)[0],_=()=>x(h)[1];var g=de(),w=C(g),G=c(w,!0);l(w);var T=p(w,2);F(T,21,_,B,(H,N)=>{let L=()=>x(N).family,V=()=>x(N).id;me(H,{get id(){return V()},get family(){return L()},get size(){return s()},get text(){return r()}})}),l(T),S(()=>b(G,j())),z(m,g)}),l(v),S(()=>b(d,`font-size: ${s()??""}px`)),J(o,s),J(i,r),z(e,y),q()}function De(e){he(e,{})}export{De as component};
