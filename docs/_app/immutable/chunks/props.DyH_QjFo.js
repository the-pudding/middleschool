import{S as T,a0 as Y,a1 as G,W as y,a2 as Z,a3 as b,a4 as S,a5 as o,a6 as h,K as L,a7 as V,Z as $,G as z,a8 as H,a9 as W,aa as J,ab as Q,g as C,ac as X,ad as k,ae as q,af as ee,f as re,ag as te,ah as ne,ai as U,aj as F,ak as ae,al as ie,V as fe,am as N}from"./runtime.CVyLOi3v.js";import{h as se}from"./store.DbDuznDu.js";function O(r,n=null,u){if(typeof r!="object"||r===null||T in r)return r;const s=$(r);if(s!==Y&&s!==G)return r;var a=new Map,_=z(r),P=y(0);_&&a.set("length",y(r.length));var w;return new Proxy(r,{defineProperty(l,e,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&Z();var f=a.get(e);return f===void 0?(f=y(t.value),a.set(e,f)):b(f,O(t.value,w)),!0},deleteProperty(l,e){var t=a.get(e);if(t===void 0)e in l&&a.set(e,y(o));else{if(_&&typeof e=="string"){var f=a.get("length"),i=Number(e);Number.isInteger(i)&&i<f.v&&b(f,i)}b(t,o),K(P)}return!0},get(l,e,t){var c;if(e===T)return r;var f=a.get(e),i=e in l;if(f===void 0&&(!i||(c=S(l,e))!=null&&c.writable)&&(f=y(O(i?l[e]:o,w)),a.set(e,f)),f!==void 0){var v=h(f);return v===o?void 0:v}return Reflect.get(l,e,t)},getOwnPropertyDescriptor(l,e){var t=Reflect.getOwnPropertyDescriptor(l,e);if(t&&"value"in t){var f=a.get(e);f&&(t.value=h(f))}else if(t===void 0){var i=a.get(e),v=i==null?void 0:i.v;if(i!==void 0&&v!==o)return{enumerable:!0,configurable:!0,value:v,writable:!0}}return t},has(l,e){var v;if(e===T)return!0;var t=a.get(e),f=t!==void 0&&t.v!==o||Reflect.has(l,e);if(t!==void 0||L!==null&&(!f||(v=S(l,e))!=null&&v.writable)){t===void 0&&(t=y(f?O(l[e],w):o),a.set(e,t));var i=h(t);if(i===o)return!1}return f},set(l,e,t,f){var I;var i=a.get(e),v=e in l;if(_&&e==="length")for(var c=t;c<i.v;c+=1){var m=a.get(c+"");m!==void 0?b(m,o):c in l&&(m=y(o),a.set(c+"",m))}i===void 0?(!v||(I=S(l,e))!=null&&I.writable)&&(i=y(void 0),b(i,O(t,w)),a.set(e,i)):(v=i.v!==o,b(i,O(t,w)));var g=Reflect.getOwnPropertyDescriptor(l,e);if(g!=null&&g.set&&g.set.call(f,t),!v){if(_&&typeof e=="string"){var E=a.get("length"),A=Number(e);Number.isInteger(A)&&A>=E.v&&b(E,A+1)}K(P)}return!0},ownKeys(l){h(P);var e=Reflect.ownKeys(l).filter(i=>{var v=a.get(i);return v===void 0||v.v!==o});for(var[t,f]of a)f.v!==o&&!(t in l)&&e.push(t);return e},setPrototypeOf(){V()}})}function K(r,n=1){b(r,r.v+n)}const ue={get(r,n){let u=r.props.length;for(;u--;){let s=r.props[u];if(N(s)&&(s=s()),typeof s=="object"&&s!==null&&n in s)return s[n]}},set(r,n,u){let s=r.props.length;for(;s--;){let a=r.props[s];N(a)&&(a=a());const _=S(a,n);if(_&&_.set)return _.set(u),!0}return!1},getOwnPropertyDescriptor(r,n){let u=r.props.length;for(;u--;){let s=r.props[u];if(N(s)&&(s=s()),typeof s=="object"&&s!==null&&n in s){const a=S(s,n);return a&&!a.configurable&&(a.configurable=!0),a}}},has(r,n){if(n===T||n===U)return!1;for(let u of r.props)if(N(u)&&(u=u()),u!=null&&n in u)return!0;return!1},ownKeys(r){const n=[];for(let u of r.props){N(u)&&(u=u());for(const s in u)n.includes(s)||n.push(s)}return n}};function de(...r){return new Proxy({props:r},ue)}function M(r){for(var n=L,u=L;n!==null&&!(n.f&(X|k));)n=n.parent;try{return q(n),r()}finally{q(u)}}function _e(r,n,u,s){var B;var a=(u&ee)!==0,_=!re||(u&te)!==0,P=(u&ne)!==0,w=(u&ie)!==0,l=!1,e;P?[e,l]=se(()=>r[n]):e=r[n];var t=T in r||U in r,f=((B=S(r,n))==null?void 0:B.set)??(t&&P&&n in r?d=>r[n]=d:void 0),i=s,v=!0,c=!1,m=()=>(c=!0,v&&(v=!1,w?i=C(s):i=s),i);e===void 0&&s!==void 0&&(f&&_&&H(),e=m(),f&&f(e));var g;if(_)g=()=>{var d=r[n];return d===void 0?m():(v=!0,c=!1,d)};else{var E=M(()=>(a?F:ae)(()=>r[n]));E.f|=W,g=()=>{var d=h(E);return d!==void 0&&(i=void 0),d===void 0?i:d}}if(!(u&J))return g;if(f){var A=r.$$legacy;return function(d,R){return arguments.length>0?((!_||!R||A||l)&&f(R?g():d),d):g()}}var I=!1,j=!1,p=fe(e),D=M(()=>F(()=>{var d=g(),R=h(p);return I?(I=!1,j=!0,R):(j=!1,p.v=d)}));return a||(D.equals=Q),function(d,R){if(arguments.length>0){const x=R?h(D):_&&P?O(d):d;return D.equals(x)||(I=!0,b(p,x),c&&i!==void 0&&(i=x),C(()=>h(D))),d}return h(D)}}export{O as a,_e as p,de as s};
