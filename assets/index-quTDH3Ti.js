(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Qc(n,e){const t=new Set(n.split(","));return r=>t.has(r)}const yt={},Kr=[],xn=()=>{},zg=()=>!1,Oa=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),eu=n=>n.startsWith("onUpdate:"),$t=Object.assign,tu=(n,e)=>{const t=n.indexOf(e);t>-1&&n.splice(t,1)},Hg=Object.prototype.hasOwnProperty,st=(n,e)=>Hg.call(n,e),et=Array.isArray,qs=n=>ka(n)==="[object Map]",Vg=n=>ka(n)==="[object Set]",tt=n=>typeof n=="function",Ft=n=>typeof n=="string",Ba=n=>typeof n=="symbol",Et=n=>n!==null&&typeof n=="object",dp=n=>(Et(n)||tt(n))&&tt(n.then)&&tt(n.catch),Wg=Object.prototype.toString,ka=n=>Wg.call(n),Xg=n=>ka(n).slice(8,-1),jg=n=>ka(n)==="[object Object]",nu=n=>Ft(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Ks=Qc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ga=n=>{const e=Object.create(null);return t=>e[t]||(e[t]=n(t))},Yg=/-(\w)/g,$n=Ga(n=>n.replace(Yg,(e,t)=>t?t.toUpperCase():"")),qg=/\B([A-Z])/g,gs=Ga(n=>n.replace(qg,"-$1").toLowerCase()),za=Ga(n=>n.charAt(0).toUpperCase()+n.slice(1)),vl=Ga(n=>n?`on${za(n)}`:""),Xi=(n,e)=>!Object.is(n,e),xl=(n,e)=>{for(let t=0;t<n.length;t++)n[t](e)},Ea=(n,e,t)=>{Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value:t})},Kg=n=>{const e=parseFloat(n);return isNaN(e)?n:e};let ef;const pp=()=>ef||(ef=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function iu(n){if(et(n)){const e={};for(let t=0;t<n.length;t++){const r=n[t],i=Ft(r)?Qg(r):iu(r);if(i)for(const s in i)e[s]=i[s]}return e}else if(Ft(n)||Et(n))return n}const Zg=/;(?![^(]*\))/g,Jg=/:([^]+)/,$g=/\/\*[^]*?\*\//g;function Qg(n){const e={};return n.replace($g,"").split(Zg).forEach(t=>{if(t){const r=t.split(Jg);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function ru(n){let e="";if(Ft(n))e=n;else if(et(n))for(let t=0;t<n.length;t++){const r=ru(n[t]);r&&(e+=r+" ")}else if(Et(n))for(const t in n)n[t]&&(e+=t+" ");return e.trim()}const e0="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",t0=Qc(e0);function mp(n){return!!n||n===""}/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ln;class n0{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this.parent=Ln,!e&&Ln&&(this.index=(Ln.scopes||(Ln.scopes=[])).push(this)-1)}get active(){return this._active}run(e){if(this._active){const t=Ln;try{return Ln=this,e()}finally{Ln=t}}}on(){Ln=this}off(){Ln=this.parent}stop(e){if(this._active){let t,r;for(t=0,r=this.effects.length;t<r;t++)this.effects[t].stop();for(t=0,r=this.cleanups.length;t<r;t++)this.cleanups[t]();if(this.scopes)for(t=0,r=this.scopes.length;t<r;t++)this.scopes[t].stop(!0);if(!this.detached&&this.parent&&!e){const i=this.parent.scopes.pop();i&&i!==this&&(this.parent.scopes[this.index]=i,i.index=this.index)}this.parent=void 0,this._active=!1}}}function i0(n,e=Ln){e&&e.active&&e.effects.push(n)}function r0(){return Ln}let hr;class su{constructor(e,t,r,i){this.fn=e,this.trigger=t,this.scheduler=r,this.active=!0,this.deps=[],this._dirtyLevel=4,this._trackId=0,this._runnings=0,this._shouldSchedule=!1,this._depsLength=0,i0(this,i)}get dirty(){if(this._dirtyLevel===2||this._dirtyLevel===3){this._dirtyLevel=1,yr();for(let e=0;e<this._depsLength;e++){const t=this.deps[e];if(t.computed&&(s0(t.computed),this._dirtyLevel>=4))break}this._dirtyLevel===1&&(this._dirtyLevel=0),Mr()}return this._dirtyLevel>=4}set dirty(e){this._dirtyLevel=e?4:0}run(){if(this._dirtyLevel=0,!this.active)return this.fn();let e=Gi,t=hr;try{return Gi=!0,hr=this,this._runnings++,tf(this),this.fn()}finally{nf(this),this._runnings--,hr=t,Gi=e}}stop(){var e;this.active&&(tf(this),nf(this),(e=this.onStop)==null||e.call(this),this.active=!1)}}function s0(n){return n.value}function tf(n){n._trackId++,n._depsLength=0}function nf(n){if(n.deps.length>n._depsLength){for(let e=n._depsLength;e<n.deps.length;e++)gp(n.deps[e],n);n.deps.length=n._depsLength}}function gp(n,e){const t=n.get(e);t!==void 0&&e._trackId!==t&&(n.delete(e),n.size===0&&n.cleanup())}let Gi=!0,xc=0;const _p=[];function yr(){_p.push(Gi),Gi=!1}function Mr(){const n=_p.pop();Gi=n===void 0?!0:n}function ou(){xc++}function au(){for(xc--;!xc&&yc.length;)yc.shift()()}function vp(n,e,t){if(e.get(n)!==n._trackId){e.set(n,n._trackId);const r=n.deps[n._depsLength];r!==e?(r&&gp(r,n),n.deps[n._depsLength++]=e):n._depsLength++}}const yc=[];function xp(n,e,t){ou();for(const r of n.keys()){let i;r._dirtyLevel<e&&(i??(i=n.get(r)===r._trackId))&&(r._shouldSchedule||(r._shouldSchedule=r._dirtyLevel===0),r._dirtyLevel=e),r._shouldSchedule&&(i??(i=n.get(r)===r._trackId))&&(r.trigger(),(!r._runnings||r.allowRecurse)&&r._dirtyLevel!==2&&(r._shouldSchedule=!1,r.scheduler&&yc.push(r.scheduler)))}au()}const yp=(n,e)=>{const t=new Map;return t.cleanup=n,t.computed=e,t},Mc=new WeakMap,dr=Symbol(""),Sc=Symbol("");function ln(n,e,t){if(Gi&&hr){let r=Mc.get(n);r||Mc.set(n,r=new Map);let i=r.get(t);i||r.set(t,i=yp(()=>r.delete(t))),vp(hr,i)}}function pi(n,e,t,r,i,s){const o=Mc.get(n);if(!o)return;let a=[];if(e==="clear")a=[...o.values()];else if(t==="length"&&et(n)){const l=Number(r);o.forEach((c,u)=>{(u==="length"||!Ba(u)&&u>=l)&&a.push(c)})}else switch(t!==void 0&&a.push(o.get(t)),e){case"add":et(n)?nu(t)&&a.push(o.get("length")):(a.push(o.get(dr)),qs(n)&&a.push(o.get(Sc)));break;case"delete":et(n)||(a.push(o.get(dr)),qs(n)&&a.push(o.get(Sc)));break;case"set":qs(n)&&a.push(o.get(dr));break}ou();for(const l of a)l&&xp(l,4);au()}const o0=Qc("__proto__,__v_isRef,__isVue"),Mp=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Ba)),rf=a0();function a0(){const n={};return["includes","indexOf","lastIndexOf"].forEach(e=>{n[e]=function(...t){const r=lt(this);for(let s=0,o=this.length;s<o;s++)ln(r,"get",s+"");const i=r[e](...t);return i===-1||i===!1?r[e](...t.map(lt)):i}}),["push","pop","shift","unshift","splice"].forEach(e=>{n[e]=function(...t){yr(),ou();const r=lt(this)[e].apply(this,t);return au(),Mr(),r}}),n}function l0(n){const e=lt(this);return ln(e,"has",n),e.hasOwnProperty(n)}class Sp{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,r){const i=this._isReadonly,s=this._isShallow;if(t==="__v_isReactive")return!i;if(t==="__v_isReadonly")return i;if(t==="__v_isShallow")return s;if(t==="__v_raw")return r===(i?s?M0:wp:s?Tp:Ep).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=et(e);if(!i){if(o&&st(rf,t))return Reflect.get(rf,t,r);if(t==="hasOwnProperty")return l0}const a=Reflect.get(e,t,r);return(Ba(t)?Mp.has(t):o0(t))||(i||ln(e,"get",t),s)?a:cn(a)?o&&nu(t)?a:a.value:Et(a)?i?Rp(a):Va(a):a}}class bp extends Sp{constructor(e=!1){super(!1,e)}set(e,t,r,i){let s=e[t];if(!this._isShallow){const l=ns(s);if(!Ta(r)&&!ns(r)&&(s=lt(s),r=lt(r)),!et(e)&&cn(s)&&!cn(r))return l?!1:(s.value=r,!0)}const o=et(e)&&nu(t)?Number(t)<e.length:st(e,t),a=Reflect.set(e,t,r,i);return e===lt(i)&&(o?Xi(r,s)&&pi(e,"set",t,r):pi(e,"add",t,r)),a}deleteProperty(e,t){const r=st(e,t);e[t];const i=Reflect.deleteProperty(e,t);return i&&r&&pi(e,"delete",t,void 0),i}has(e,t){const r=Reflect.has(e,t);return(!Ba(t)||!Mp.has(t))&&ln(e,"has",t),r}ownKeys(e){return ln(e,"iterate",et(e)?"length":dr),Reflect.ownKeys(e)}}class c0 extends Sp{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}}const u0=new bp,f0=new c0,h0=new bp(!0),lu=n=>n,Ha=n=>Reflect.getPrototypeOf(n);function Lo(n,e,t=!1,r=!1){n=n.__v_raw;const i=lt(n),s=lt(e);t||(Xi(e,s)&&ln(i,"get",e),ln(i,"get",s));const{has:o}=Ha(i),a=r?lu:t?fu:ao;if(o.call(i,e))return a(n.get(e));if(o.call(i,s))return a(n.get(s));n!==i&&n.get(e)}function Po(n,e=!1){const t=this.__v_raw,r=lt(t),i=lt(n);return e||(Xi(n,i)&&ln(r,"has",n),ln(r,"has",i)),n===i?t.has(n):t.has(n)||t.has(i)}function Uo(n,e=!1){return n=n.__v_raw,!e&&ln(lt(n),"iterate",dr),Reflect.get(n,"size",n)}function sf(n){n=lt(n);const e=lt(this);return Ha(e).has.call(e,n)||(e.add(n),pi(e,"add",n,n)),this}function of(n,e){e=lt(e);const t=lt(this),{has:r,get:i}=Ha(t);let s=r.call(t,n);s||(n=lt(n),s=r.call(t,n));const o=i.call(t,n);return t.set(n,e),s?Xi(e,o)&&pi(t,"set",n,e):pi(t,"add",n,e),this}function af(n){const e=lt(this),{has:t,get:r}=Ha(e);let i=t.call(e,n);i||(n=lt(n),i=t.call(e,n)),r&&r.call(e,n);const s=e.delete(n);return i&&pi(e,"delete",n,void 0),s}function lf(){const n=lt(this),e=n.size!==0,t=n.clear();return e&&pi(n,"clear",void 0,void 0),t}function Do(n,e){return function(r,i){const s=this,o=s.__v_raw,a=lt(o),l=e?lu:n?fu:ao;return!n&&ln(a,"iterate",dr),o.forEach((c,u)=>r.call(i,l(c),l(u),s))}}function Io(n,e,t){return function(...r){const i=this.__v_raw,s=lt(i),o=qs(s),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=i[n](...r),u=t?lu:e?fu:ao;return!e&&ln(s,"iterate",l?Sc:dr),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:a?[u(f[0]),u(f[1])]:u(f),done:h}},[Symbol.iterator](){return this}}}}function bi(n){return function(...e){return n==="delete"?!1:n==="clear"?void 0:this}}function d0(){const n={get(s){return Lo(this,s)},get size(){return Uo(this)},has:Po,add:sf,set:of,delete:af,clear:lf,forEach:Do(!1,!1)},e={get(s){return Lo(this,s,!1,!0)},get size(){return Uo(this)},has:Po,add:sf,set:of,delete:af,clear:lf,forEach:Do(!1,!0)},t={get(s){return Lo(this,s,!0)},get size(){return Uo(this,!0)},has(s){return Po.call(this,s,!0)},add:bi("add"),set:bi("set"),delete:bi("delete"),clear:bi("clear"),forEach:Do(!0,!1)},r={get(s){return Lo(this,s,!0,!0)},get size(){return Uo(this,!0)},has(s){return Po.call(this,s,!0)},add:bi("add"),set:bi("set"),delete:bi("delete"),clear:bi("clear"),forEach:Do(!0,!0)};return["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=Io(s,!1,!1),t[s]=Io(s,!0,!1),e[s]=Io(s,!1,!0),r[s]=Io(s,!0,!0)}),[n,t,e,r]}const[p0,m0,g0,_0]=d0();function cu(n,e){const t=e?n?_0:g0:n?m0:p0;return(r,i,s)=>i==="__v_isReactive"?!n:i==="__v_isReadonly"?n:i==="__v_raw"?r:Reflect.get(st(t,i)&&i in r?t:r,i,s)}const v0={get:cu(!1,!1)},x0={get:cu(!1,!0)},y0={get:cu(!0,!1)},Ep=new WeakMap,Tp=new WeakMap,wp=new WeakMap,M0=new WeakMap;function S0(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function b0(n){return n.__v_skip||!Object.isExtensible(n)?0:S0(Xg(n))}function Va(n){return ns(n)?n:uu(n,!1,u0,v0,Ep)}function Ap(n){return uu(n,!1,h0,x0,Tp)}function Rp(n){return uu(n,!0,f0,y0,wp)}function uu(n,e,t,r,i){if(!Et(n)||n.__v_raw&&!(e&&n.__v_isReactive))return n;const s=i.get(n);if(s)return s;const o=b0(n);if(o===0)return n;const a=new Proxy(n,o===2?r:t);return i.set(n,a),a}function Zr(n){return ns(n)?Zr(n.__v_raw):!!(n&&n.__v_isReactive)}function ns(n){return!!(n&&n.__v_isReadonly)}function Ta(n){return!!(n&&n.__v_isShallow)}function Cp(n){return Zr(n)||ns(n)}function lt(n){const e=n&&n.__v_raw;return e?lt(e):n}function Lp(n){return Object.isExtensible(n)&&Ea(n,"__v_skip",!0),n}const ao=n=>Et(n)?Va(n):n,fu=n=>Et(n)?Rp(n):n;class Pp{constructor(e,t,r,i){this.getter=e,this._setter=t,this.dep=void 0,this.__v_isRef=!0,this.__v_isReadonly=!1,this.effect=new su(()=>e(this._value),()=>pa(this,this.effect._dirtyLevel===2?2:3)),this.effect.computed=this,this.effect.active=this._cacheable=!i,this.__v_isReadonly=r}get value(){const e=lt(this);return(!e._cacheable||e.effect.dirty)&&Xi(e._value,e._value=e.effect.run())&&pa(e,4),Up(e),e.effect._dirtyLevel>=2&&pa(e,2),e._value}set value(e){this._setter(e)}get _dirty(){return this.effect.dirty}set _dirty(e){this.effect.dirty=e}}function E0(n,e,t=!1){let r,i;const s=tt(n);return s?(r=n,i=xn):(r=n.get,i=n.set),new Pp(r,i,s||!i,t)}function Up(n){var e;Gi&&hr&&(n=lt(n),vp(hr,(e=n.dep)!=null?e:n.dep=yp(()=>n.dep=void 0,n instanceof Pp?n:void 0)))}function pa(n,e=4,t){n=lt(n);const r=n.dep;r&&xp(r,e)}function cn(n){return!!(n&&n.__v_isRef===!0)}function lo(n){return Dp(n,!1)}function T0(n){return Dp(n,!0)}function Dp(n,e){return cn(n)?n:new w0(n,e)}class w0{constructor(e,t){this.__v_isShallow=t,this.dep=void 0,this.__v_isRef=!0,this._rawValue=t?e:lt(e),this._value=t?e:ao(e)}get value(){return Up(this),this._value}set value(e){const t=this.__v_isShallow||Ta(e)||ns(e);e=t?e:lt(e),Xi(e,this._rawValue)&&(this._rawValue=e,this._value=t?e:ao(e),pa(this,4))}}function Jr(n){return cn(n)?n.value:n}const A0={get:(n,e,t)=>Jr(Reflect.get(n,e,t)),set:(n,e,t,r)=>{const i=n[e];return cn(i)&&!cn(t)?(i.value=t,!0):Reflect.set(n,e,t,r)}};function Ip(n){return Zr(n)?n:new Proxy(n,A0)}/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function zi(n,e,t,r){try{return r?n(...r):n()}catch(i){Wa(i,e,t)}}function On(n,e,t,r){if(tt(n)){const s=zi(n,e,t,r);return s&&dp(s)&&s.catch(o=>{Wa(o,e,t)}),s}const i=[];for(let s=0;s<n.length;s++)i.push(On(n[s],e,t,r));return i}function Wa(n,e,t,r=!0){const i=e?e.vnode:null;if(e){let s=e.parent;const o=e.proxy,a=`https://vuejs.org/error-reference/#runtime-${t}`;for(;s;){const c=s.ec;if(c){for(let u=0;u<c.length;u++)if(c[u](n,o,a)===!1)return}s=s.parent}const l=e.appContext.config.errorHandler;if(l){zi(l,null,10,[n,o,a]);return}}R0(n,t,i,r)}function R0(n,e,t,r=!0){console.error(n)}let co=!1,bc=!1;const Ht=[];let Kn=0;const $r=[];let Ui=null,lr=0;const Fp=Promise.resolve();let hu=null;function Np(n){const e=hu||Fp;return n?e.then(this?n.bind(this):n):e}function C0(n){let e=Kn+1,t=Ht.length;for(;e<t;){const r=e+t>>>1,i=Ht[r],s=uo(i);s<n||s===n&&i.pre?e=r+1:t=r}return e}function du(n){(!Ht.length||!Ht.includes(n,co&&n.allowRecurse?Kn+1:Kn))&&(n.id==null?Ht.push(n):Ht.splice(C0(n.id),0,n),Op())}function Op(){!co&&!bc&&(bc=!0,hu=Fp.then(kp))}function L0(n){const e=Ht.indexOf(n);e>Kn&&Ht.splice(e,1)}function P0(n){et(n)?$r.push(...n):(!Ui||!Ui.includes(n,n.allowRecurse?lr+1:lr))&&$r.push(n),Op()}function cf(n,e,t=co?Kn+1:0){for(;t<Ht.length;t++){const r=Ht[t];if(r&&r.pre){if(n&&r.id!==n.uid)continue;Ht.splice(t,1),t--,r()}}}function Bp(n){if($r.length){const e=[...new Set($r)].sort((t,r)=>uo(t)-uo(r));if($r.length=0,Ui){Ui.push(...e);return}for(Ui=e,lr=0;lr<Ui.length;lr++)Ui[lr]();Ui=null,lr=0}}const uo=n=>n.id==null?1/0:n.id,U0=(n,e)=>{const t=uo(n)-uo(e);if(t===0){if(n.pre&&!e.pre)return-1;if(e.pre&&!n.pre)return 1}return t};function kp(n){bc=!1,co=!0,Ht.sort(U0);try{for(Kn=0;Kn<Ht.length;Kn++){const e=Ht[Kn];e&&e.active!==!1&&zi(e,null,14)}}finally{Kn=0,Ht.length=0,Bp(),co=!1,hu=null,(Ht.length||$r.length)&&kp()}}function D0(n,e,...t){if(n.isUnmounted)return;const r=n.vnode.props||yt;let i=t;const s=e.startsWith("update:"),o=s&&e.slice(7);if(o&&o in r){const u=`${o==="modelValue"?"model":o}Modifiers`,{number:f,trim:h}=r[u]||yt;h&&(i=t.map(d=>Ft(d)?d.trim():d)),f&&(i=t.map(Kg))}let a,l=r[a=vl(e)]||r[a=vl($n(e))];!l&&s&&(l=r[a=vl(gs(e))]),l&&On(l,n,6,i);const c=r[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,On(c,n,6,i)}}function Gp(n,e,t=!1){const r=e.emitsCache,i=r.get(n);if(i!==void 0)return i;const s=n.emits;let o={},a=!1;if(!tt(n)){const l=c=>{const u=Gp(c,e,!0);u&&(a=!0,$t(o,u))};!t&&e.mixins.length&&e.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!s&&!a?(Et(n)&&r.set(n,null),null):(et(s)?s.forEach(l=>o[l]=null):$t(o,s),Et(n)&&r.set(n,o),o)}function Xa(n,e){return!n||!Oa(e)?!1:(e=e.slice(2).replace(/Once$/,""),st(n,e[0].toLowerCase()+e.slice(1))||st(n,gs(e))||st(n,e))}let Fn=null,ja=null;function wa(n){const e=Fn;return Fn=n,ja=n&&n.type.__scopeId||null,e}function I0(n){ja=n}function F0(){ja=null}function N0(n,e=Fn,t){if(!e||n._n)return n;const r=(...i)=>{r._d&&Mf(-1);const s=wa(e);let o;try{o=n(...i)}finally{wa(s),r._d&&Mf(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function uf(n){const{type:e,vnode:t,proxy:r,withProxy:i,props:s,propsOptions:[o],slots:a,attrs:l,emit:c,render:u,renderCache:f,data:h,setupState:d,ctx:g,inheritAttrs:_}=n;let p,m;const y=wa(n);try{if(t.shapeFlag&4){const M=i||r,A=M;p=Yn(u.call(A,M,f,s,d,h,g)),m=l}else{const M=e;p=Yn(M.length>1?M(s,{attrs:l,slots:a,emit:c}):M(s,null)),m=e.props?l:O0(l)}}catch(M){$s.length=0,Wa(M,n,1),p=Zt(_r)}let v=p;if(m&&_!==!1){const M=Object.keys(m),{shapeFlag:A}=v;M.length&&A&7&&(o&&M.some(eu)&&(m=B0(m,o)),v=rs(v,m))}return t.dirs&&(v=rs(v),v.dirs=v.dirs?v.dirs.concat(t.dirs):t.dirs),t.transition&&(v.transition=t.transition),p=v,wa(y),p}const O0=n=>{let e;for(const t in n)(t==="class"||t==="style"||Oa(t))&&((e||(e={}))[t]=n[t]);return e},B0=(n,e)=>{const t={};for(const r in n)(!eu(r)||!(r.slice(9)in e))&&(t[r]=n[r]);return t};function k0(n,e,t){const{props:r,children:i,component:s}=n,{props:o,children:a,patchFlag:l}=e,c=s.emitsOptions;if(e.dirs||e.transition)return!0;if(t&&l>=0){if(l&1024)return!0;if(l&16)return r?ff(r,o,c):!!o;if(l&8){const u=e.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(o[h]!==r[h]&&!Xa(c,h))return!0}}}else return(i||a)&&(!a||!a.$stable)?!0:r===o?!1:r?o?ff(r,o,c):!0:!!o;return!1}function ff(n,e,t){const r=Object.keys(e);if(r.length!==Object.keys(n).length)return!0;for(let i=0;i<r.length;i++){const s=r[i];if(e[s]!==n[s]&&!Xa(t,s))return!0}return!1}function G0({vnode:n,parent:e},t){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===n&&(r.el=n.el),r===n)(n=e.vnode).el=t,e=e.parent;else break}}const z0="components";function H0(n,e){return W0(z0,n,!0,e)||n}const V0=Symbol.for("v-ndc");function W0(n,e,t=!0,r=!1){const i=Fn||Vt;if(i){const s=i.type;{const a=B_(s,!1);if(a&&(a===e||a===$n(e)||a===za($n(e))))return s}const o=hf(i[n]||s[n],e)||hf(i.appContext[n],e);return!o&&r?s:o}}function hf(n,e){return n&&(n[e]||n[$n(e)]||n[za($n(e))])}const X0=n=>n.__isSuspense;function j0(n,e){e&&e.pendingBranch?et(n)?e.effects.push(...n):e.effects.push(n):P0(n)}const Y0=Symbol.for("v-scx"),q0=()=>mi(Y0),Fo={};function ma(n,e,t){return zp(n,e,t)}function zp(n,e,{immediate:t,deep:r,flush:i,once:s,onTrack:o,onTrigger:a}=yt){if(e&&s){const w=e;e=(...T)=>{w(...T),A()}}const l=Vt,c=w=>r===!0?w:jr(w,r===!1?1:void 0);let u,f=!1,h=!1;if(cn(n)?(u=()=>n.value,f=Ta(n)):Zr(n)?(u=()=>c(n),f=!0):et(n)?(h=!0,f=n.some(w=>Zr(w)||Ta(w)),u=()=>n.map(w=>{if(cn(w))return w.value;if(Zr(w))return c(w);if(tt(w))return zi(w,l,2)})):tt(n)?e?u=()=>zi(n,l,2):u=()=>(d&&d(),On(n,l,3,[g])):u=xn,e&&r){const w=u;u=()=>jr(w())}let d,g=w=>{d=v.onStop=()=>{zi(w,l,4),d=v.onStop=void 0}},_;if(Za)if(g=xn,e?t&&On(e,l,3,[u(),h?[]:void 0,g]):u(),i==="sync"){const w=q0();_=w.__watcherHandles||(w.__watcherHandles=[])}else return xn;let p=h?new Array(n.length).fill(Fo):Fo;const m=()=>{if(!(!v.active||!v.dirty))if(e){const w=v.run();(r||f||(h?w.some((T,P)=>Xi(T,p[P])):Xi(w,p)))&&(d&&d(),On(e,l,3,[w,p===Fo?void 0:h&&p[0]===Fo?[]:p,g]),p=w)}else v.run()};m.allowRecurse=!!e;let y;i==="sync"?y=m:i==="post"?y=()=>on(m,l&&l.suspense):(m.pre=!0,l&&(m.id=l.uid),y=()=>du(m));const v=new su(u,xn,y),M=r0(),A=()=>{v.stop(),M&&tu(M.effects,v)};return e?t?m():p=v.run():i==="post"?on(v.run.bind(v),l&&l.suspense):v.run(),_&&_.push(A),A}function K0(n,e,t){const r=this.proxy,i=Ft(n)?n.includes(".")?Hp(r,n):()=>r[n]:n.bind(r,r);let s;tt(e)?s=e:(s=e.handler,t=e);const o=yo(this),a=zp(i,s.bind(r),t);return o(),a}function Hp(n,e){const t=e.split(".");return()=>{let r=n;for(let i=0;i<t.length&&r;i++)r=r[t[i]];return r}}function jr(n,e,t=0,r){if(!Et(n)||n.__v_skip)return n;if(e&&e>0){if(t>=e)return n;t++}if(r=r||new Set,r.has(n))return n;if(r.add(n),cn(n))jr(n.value,e,t,r);else if(et(n))for(let i=0;i<n.length;i++)jr(n[i],e,t,r);else if(Vg(n)||qs(n))n.forEach(i=>{jr(i,e,t,r)});else if(jg(n))for(const i in n)jr(n[i],e,t,r);return n}function Ji(n,e,t,r){const i=n.dirs,s=e&&e.dirs;for(let o=0;o<i.length;o++){const a=i[o];s&&(a.oldValue=s[o].value);let l=a.dir[r];l&&(yr(),On(l,t,8,[n.el,a,n,e]),Mr())}}/*! #__NO_SIDE_EFFECTS__ */function Vp(n,e){return tt(n)?$t({name:n.name},e,{setup:n}):n}const ga=n=>!!n.type.__asyncLoader,Wp=n=>n.type.__isKeepAlive;function Z0(n,e){Xp(n,"a",e)}function J0(n,e){Xp(n,"da",e)}function Xp(n,e,t=Vt){const r=n.__wdc||(n.__wdc=()=>{let i=t;for(;i;){if(i.isDeactivated)return;i=i.parent}return n()});if(Ya(e,r,t),t){let i=t.parent;for(;i&&i.parent;)Wp(i.parent.vnode)&&$0(r,e,t,i),i=i.parent}}function $0(n,e,t,r){const i=Ya(e,n,r,!0);mu(()=>{tu(r[e],i)},t)}function Ya(n,e,t=Vt,r=!1){if(t){const i=t[n]||(t[n]=[]),s=e.__weh||(e.__weh=(...o)=>{if(t.isUnmounted)return;yr();const a=yo(t),l=On(e,t,n,o);return a(),Mr(),l});return r?i.unshift(s):i.push(s),s}}const _i=n=>(e,t=Vt)=>(!Za||n==="sp")&&Ya(n,(...r)=>e(...r),t),Q0=_i("bm"),pu=_i("m"),e_=_i("bu"),t_=_i("u"),n_=_i("bum"),mu=_i("um"),i_=_i("sp"),r_=_i("rtg"),s_=_i("rtc");function o_(n,e=Vt){Ya("ec",n,e)}const Ec=n=>n?rm(n)?vu(n)||n.proxy:Ec(n.parent):null,Zs=$t(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>Ec(n.parent),$root:n=>Ec(n.root),$emit:n=>n.emit,$options:n=>Yp(n),$forceUpdate:n=>n.f||(n.f=()=>{n.effect.dirty=!0,du(n.update)}),$nextTick:n=>n.n||(n.n=Np.bind(n.proxy)),$watch:n=>K0.bind(n)}),yl=(n,e)=>n!==yt&&!n.__isScriptSetup&&st(n,e),a_={get({_:n},e){const{ctx:t,setupState:r,data:i,props:s,accessCache:o,type:a,appContext:l}=n;let c;if(e[0]!=="$"){const d=o[e];if(d!==void 0)switch(d){case 1:return r[e];case 2:return i[e];case 4:return t[e];case 3:return s[e]}else{if(yl(r,e))return o[e]=1,r[e];if(i!==yt&&st(i,e))return o[e]=2,i[e];if((c=n.propsOptions[0])&&st(c,e))return o[e]=3,s[e];if(t!==yt&&st(t,e))return o[e]=4,t[e];Tc&&(o[e]=0)}}const u=Zs[e];let f,h;if(u)return e==="$attrs"&&ln(n,"get",e),u(n);if((f=a.__cssModules)&&(f=f[e]))return f;if(t!==yt&&st(t,e))return o[e]=4,t[e];if(h=l.config.globalProperties,st(h,e))return h[e]},set({_:n},e,t){const{data:r,setupState:i,ctx:s}=n;return yl(i,e)?(i[e]=t,!0):r!==yt&&st(r,e)?(r[e]=t,!0):st(n.props,e)||e[0]==="$"&&e.slice(1)in n?!1:(s[e]=t,!0)},has({_:{data:n,setupState:e,accessCache:t,ctx:r,appContext:i,propsOptions:s}},o){let a;return!!t[o]||n!==yt&&st(n,o)||yl(e,o)||(a=s[0])&&st(a,o)||st(r,o)||st(Zs,o)||st(i.config.globalProperties,o)},defineProperty(n,e,t){return t.get!=null?n._.accessCache[e]=0:st(t,"value")&&this.set(n,e,t.value,null),Reflect.defineProperty(n,e,t)}};function df(n){return et(n)?n.reduce((e,t)=>(e[t]=null,e),{}):n}let Tc=!0;function l_(n){const e=Yp(n),t=n.proxy,r=n.ctx;Tc=!1,e.beforeCreate&&pf(e.beforeCreate,n,"bc");const{data:i,computed:s,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:g,activated:_,deactivated:p,beforeDestroy:m,beforeUnmount:y,destroyed:v,unmounted:M,render:A,renderTracked:w,renderTriggered:T,errorCaptured:P,serverPrefetch:$,expose:E,inheritAttrs:C,components:B,directives:Y,filters:R}=e;if(c&&c_(c,r,null),o)for(const re in o){const J=o[re];tt(J)&&(r[re]=J.bind(t))}if(i){const re=i.call(t,t);Et(re)&&(n.data=Va(re))}if(Tc=!0,s)for(const re in s){const J=s[re],K=tt(J)?J.bind(t,t):tt(J.get)?J.get.bind(t,t):xn,q=!tt(J)&&tt(J.set)?J.set.bind(t):xn,U=Pn({get:K,set:q});Object.defineProperty(r,re,{enumerable:!0,configurable:!0,get:()=>U.value,set:X=>U.value=X})}if(a)for(const re in a)jp(a[re],r,t,re);if(l){const re=tt(l)?l.call(t):l;Reflect.ownKeys(re).forEach(J=>{_a(J,re[J])})}u&&pf(u,n,"c");function H(re,J){et(J)?J.forEach(K=>re(K.bind(t))):J&&re(J.bind(t))}if(H(Q0,f),H(pu,h),H(e_,d),H(t_,g),H(Z0,_),H(J0,p),H(o_,P),H(s_,w),H(r_,T),H(n_,y),H(mu,M),H(i_,$),et(E))if(E.length){const re=n.exposed||(n.exposed={});E.forEach(J=>{Object.defineProperty(re,J,{get:()=>t[J],set:K=>t[J]=K})})}else n.exposed||(n.exposed={});A&&n.render===xn&&(n.render=A),C!=null&&(n.inheritAttrs=C),B&&(n.components=B),Y&&(n.directives=Y)}function c_(n,e,t=xn){et(n)&&(n=wc(n));for(const r in n){const i=n[r];let s;Et(i)?"default"in i?s=mi(i.from||r,i.default,!0):s=mi(i.from||r):s=mi(i),cn(s)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:o=>s.value=o}):e[r]=s}}function pf(n,e,t){On(et(n)?n.map(r=>r.bind(e.proxy)):n.bind(e.proxy),e,t)}function jp(n,e,t,r){const i=r.includes(".")?Hp(t,r):()=>t[r];if(Ft(n)){const s=e[n];tt(s)&&ma(i,s)}else if(tt(n))ma(i,n.bind(t));else if(Et(n))if(et(n))n.forEach(s=>jp(s,e,t,r));else{const s=tt(n.handler)?n.handler.bind(t):e[n.handler];tt(s)&&ma(i,s,n)}}function Yp(n){const e=n.type,{mixins:t,extends:r}=e,{mixins:i,optionsCache:s,config:{optionMergeStrategies:o}}=n.appContext,a=s.get(e);let l;return a?l=a:!i.length&&!t&&!r?l=e:(l={},i.length&&i.forEach(c=>Aa(l,c,o,!0)),Aa(l,e,o)),Et(e)&&s.set(e,l),l}function Aa(n,e,t,r=!1){const{mixins:i,extends:s}=e;s&&Aa(n,s,t,!0),i&&i.forEach(o=>Aa(n,o,t,!0));for(const o in e)if(!(r&&o==="expose")){const a=u_[o]||t&&t[o];n[o]=a?a(n[o],e[o]):e[o]}return n}const u_={data:mf,props:gf,emits:gf,methods:js,computed:js,beforeCreate:jt,created:jt,beforeMount:jt,mounted:jt,beforeUpdate:jt,updated:jt,beforeDestroy:jt,beforeUnmount:jt,destroyed:jt,unmounted:jt,activated:jt,deactivated:jt,errorCaptured:jt,serverPrefetch:jt,components:js,directives:js,watch:h_,provide:mf,inject:f_};function mf(n,e){return e?n?function(){return $t(tt(n)?n.call(this,this):n,tt(e)?e.call(this,this):e)}:e:n}function f_(n,e){return js(wc(n),wc(e))}function wc(n){if(et(n)){const e={};for(let t=0;t<n.length;t++)e[n[t]]=n[t];return e}return n}function jt(n,e){return n?[...new Set([].concat(n,e))]:e}function js(n,e){return n?$t(Object.create(null),n,e):e}function gf(n,e){return n?et(n)&&et(e)?[...new Set([...n,...e])]:$t(Object.create(null),df(n),df(e??{})):e}function h_(n,e){if(!n)return e;if(!e)return n;const t=$t(Object.create(null),n);for(const r in e)t[r]=jt(n[r],e[r]);return t}function qp(){return{app:null,config:{isNativeTag:zg,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let d_=0;function p_(n,e){return function(r,i=null){tt(r)||(r=$t({},r)),i!=null&&!Et(i)&&(i=null);const s=qp(),o=new WeakSet;let a=!1;const l=s.app={_uid:d_++,_component:r,_props:i,_container:null,_context:s,_instance:null,version:G_,get config(){return s.config},set config(c){},use(c,...u){return o.has(c)||(c&&tt(c.install)?(o.add(c),c.install(l,...u)):tt(c)&&(o.add(c),c(l,...u))),l},mixin(c){return s.mixins.includes(c)||s.mixins.push(c),l},component(c,u){return u?(s.components[c]=u,l):s.components[c]},directive(c,u){return u?(s.directives[c]=u,l):s.directives[c]},mount(c,u,f){if(!a){const h=Zt(r,i);return h.appContext=s,f===!0?f="svg":f===!1&&(f=void 0),n(h,c,f),a=!0,l._container=c,c.__vue_app__=l,vu(h.component)||h.component.proxy}},unmount(){a&&(n(null,l._container),delete l._container.__vue_app__)},provide(c,u){return s.provides[c]=u,l},runWithContext(c){const u=Js;Js=l;try{return c()}finally{Js=u}}};return l}}let Js=null;function _a(n,e){if(Vt){let t=Vt.provides;const r=Vt.parent&&Vt.parent.provides;r===t&&(t=Vt.provides=Object.create(r)),t[n]=e}}function mi(n,e,t=!1){const r=Vt||Fn;if(r||Js){const i=r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:Js._context.provides;if(i&&n in i)return i[n];if(arguments.length>1)return t&&tt(e)?e.call(r&&r.proxy):e}}function m_(n,e,t,r=!1){const i={},s={};Ea(s,Ka,1),n.propsDefaults=Object.create(null),Kp(n,e,i,s);for(const o in n.propsOptions[0])o in i||(i[o]=void 0);t?n.props=r?i:Ap(i):n.type.props?n.props=i:n.props=s,n.attrs=s}function g_(n,e,t,r){const{props:i,attrs:s,vnode:{patchFlag:o}}=n,a=lt(i),[l]=n.propsOptions;let c=!1;if((r||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Xa(n.emitsOptions,h))continue;const d=e[h];if(l)if(st(s,h))d!==s[h]&&(s[h]=d,c=!0);else{const g=$n(h);i[g]=Ac(l,a,g,d,n,!1)}else d!==s[h]&&(s[h]=d,c=!0)}}}else{Kp(n,e,i,s)&&(c=!0);let u;for(const f in a)(!e||!st(e,f)&&((u=gs(f))===f||!st(e,u)))&&(l?t&&(t[f]!==void 0||t[u]!==void 0)&&(i[f]=Ac(l,a,f,void 0,n,!0)):delete i[f]);if(s!==a)for(const f in s)(!e||!st(e,f))&&(delete s[f],c=!0)}c&&pi(n,"set","$attrs")}function Kp(n,e,t,r){const[i,s]=n.propsOptions;let o=!1,a;if(e)for(let l in e){if(Ks(l))continue;const c=e[l];let u;i&&st(i,u=$n(l))?!s||!s.includes(u)?t[u]=c:(a||(a={}))[u]=c:Xa(n.emitsOptions,l)||(!(l in r)||c!==r[l])&&(r[l]=c,o=!0)}if(s){const l=lt(t),c=a||yt;for(let u=0;u<s.length;u++){const f=s[u];t[f]=Ac(i,l,f,c[f],n,!st(c,f))}}return o}function Ac(n,e,t,r,i,s){const o=n[t];if(o!=null){const a=st(o,"default");if(a&&r===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&tt(l)){const{propsDefaults:c}=i;if(t in c)r=c[t];else{const u=yo(i);r=c[t]=l.call(null,e),u()}}else r=l}o[0]&&(s&&!a?r=!1:o[1]&&(r===""||r===gs(t))&&(r=!0))}return r}function Zp(n,e,t=!1){const r=e.propsCache,i=r.get(n);if(i)return i;const s=n.props,o={},a=[];let l=!1;if(!tt(n)){const u=f=>{l=!0;const[h,d]=Zp(f,e,!0);$t(o,h),d&&a.push(...d)};!t&&e.mixins.length&&e.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!s&&!l)return Et(n)&&r.set(n,Kr),Kr;if(et(s))for(let u=0;u<s.length;u++){const f=$n(s[u]);_f(f)&&(o[f]=yt)}else if(s)for(const u in s){const f=$n(u);if(_f(f)){const h=s[u],d=o[f]=et(h)||tt(h)?{type:h}:$t({},h);if(d){const g=yf(Boolean,d.type),_=yf(String,d.type);d[0]=g>-1,d[1]=_<0||g<_,(g>-1||st(d,"default"))&&a.push(f)}}}const c=[o,a];return Et(n)&&r.set(n,c),c}function _f(n){return n[0]!=="$"&&!Ks(n)}function vf(n){return n===null?"null":typeof n=="function"?n.name||"":typeof n=="object"&&n.constructor&&n.constructor.name||""}function xf(n,e){return vf(n)===vf(e)}function yf(n,e){return et(e)?e.findIndex(t=>xf(t,n)):tt(e)&&xf(e,n)?0:-1}const Jp=n=>n[0]==="_"||n==="$stable",gu=n=>et(n)?n.map(Yn):[Yn(n)],__=(n,e,t)=>{if(e._n)return e;const r=N0((...i)=>gu(e(...i)),t);return r._c=!1,r},$p=(n,e,t)=>{const r=n._ctx;for(const i in n){if(Jp(i))continue;const s=n[i];if(tt(s))e[i]=__(i,s,r);else if(s!=null){const o=gu(s);e[i]=()=>o}}},Qp=(n,e)=>{const t=gu(e);n.slots.default=()=>t},v_=(n,e)=>{if(n.vnode.shapeFlag&32){const t=e._;t?(n.slots=lt(e),Ea(e,"_",t)):$p(e,n.slots={})}else n.slots={},e&&Qp(n,e);Ea(n.slots,Ka,1)},x_=(n,e,t)=>{const{vnode:r,slots:i}=n;let s=!0,o=yt;if(r.shapeFlag&32){const a=e._;a?t&&a===1?s=!1:($t(i,e),!t&&a===1&&delete i._):(s=!e.$stable,$p(e,i)),o=e}else e&&(Qp(n,e),o={default:1});if(s)for(const a in i)!Jp(a)&&o[a]==null&&delete i[a]};function Rc(n,e,t,r,i=!1){if(et(n)){n.forEach((h,d)=>Rc(h,e&&(et(e)?e[d]:e),t,r,i));return}if(ga(r)&&!i)return;const s=r.shapeFlag&4?vu(r.component)||r.component.proxy:r.el,o=i?null:s,{i:a,r:l}=n,c=e&&e.r,u=a.refs===yt?a.refs={}:a.refs,f=a.setupState;if(c!=null&&c!==l&&(Ft(c)?(u[c]=null,st(f,c)&&(f[c]=null)):cn(c)&&(c.value=null)),tt(l))zi(l,a,12,[o,u]);else{const h=Ft(l),d=cn(l);if(h||d){const g=()=>{if(n.f){const _=h?st(f,l)?f[l]:u[l]:l.value;i?et(_)&&tu(_,s):et(_)?_.includes(s)||_.push(s):h?(u[l]=[s],st(f,l)&&(f[l]=u[l])):(l.value=[s],n.k&&(u[n.k]=l.value))}else h?(u[l]=o,st(f,l)&&(f[l]=o)):d&&(l.value=o,n.k&&(u[n.k]=o))};o?(g.id=-1,on(g,t)):g()}}}const on=j0;function y_(n){return M_(n)}function M_(n,e){const t=pp();t.__VUE__=!0;const{insert:r,remove:i,patchProp:s,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=xn,insertStaticContent:g}=n,_=(x,I,O,Z=null,Q=null,ce=null,ie=void 0,se=null,fe=!!I.dynamicChildren)=>{if(x===I)return;x&&!Is(x,I)&&(Z=F(x),X(x,Q,ce,!0),x=null),I.patchFlag===-2&&(fe=!1,I.dynamicChildren=null);const{type:b,ref:S,shapeFlag:k}=I;switch(b){case qa:p(x,I,O,Z);break;case _r:m(x,I,O,Z);break;case Sl:x==null&&y(I,O,Z,ie);break;case jn:B(x,I,O,Z,Q,ce,ie,se,fe);break;default:k&1?A(x,I,O,Z,Q,ce,ie,se,fe):k&6?Y(x,I,O,Z,Q,ce,ie,se,fe):(k&64||k&128)&&b.process(x,I,O,Z,Q,ce,ie,se,fe,me)}S!=null&&Q&&Rc(S,x&&x.ref,ce,I||x,!I)},p=(x,I,O,Z)=>{if(x==null)r(I.el=a(I.children),O,Z);else{const Q=I.el=x.el;I.children!==x.children&&c(Q,I.children)}},m=(x,I,O,Z)=>{x==null?r(I.el=l(I.children||""),O,Z):I.el=x.el},y=(x,I,O,Z)=>{[x.el,x.anchor]=g(x.children,I,O,Z,x.el,x.anchor)},v=({el:x,anchor:I},O,Z)=>{let Q;for(;x&&x!==I;)Q=h(x),r(x,O,Z),x=Q;r(I,O,Z)},M=({el:x,anchor:I})=>{let O;for(;x&&x!==I;)O=h(x),i(x),x=O;i(I)},A=(x,I,O,Z,Q,ce,ie,se,fe)=>{I.type==="svg"?ie="svg":I.type==="math"&&(ie="mathml"),x==null?w(I,O,Z,Q,ce,ie,se,fe):$(x,I,Q,ce,ie,se,fe)},w=(x,I,O,Z,Q,ce,ie,se)=>{let fe,b;const{props:S,shapeFlag:k,transition:W,dirs:te}=x;if(fe=x.el=o(x.type,ce,S&&S.is,S),k&8?u(fe,x.children):k&16&&P(x.children,fe,null,Z,Q,Ml(x,ce),ie,se),te&&Ji(x,null,Z,"created"),T(fe,x,x.scopeId,ie,Z),S){for(const ye in S)ye!=="value"&&!Ks(ye)&&s(fe,ye,null,S[ye],ce,x.children,Z,Q,oe);"value"in S&&s(fe,"value",null,S.value,ce),(b=S.onVnodeBeforeMount)&&Xn(b,Z,x)}te&&Ji(x,null,Z,"beforeMount");const he=S_(Q,W);he&&W.beforeEnter(fe),r(fe,I,O),((b=S&&S.onVnodeMounted)||he||te)&&on(()=>{b&&Xn(b,Z,x),he&&W.enter(fe),te&&Ji(x,null,Z,"mounted")},Q)},T=(x,I,O,Z,Q)=>{if(O&&d(x,O),Z)for(let ce=0;ce<Z.length;ce++)d(x,Z[ce]);if(Q){let ce=Q.subTree;if(I===ce){const ie=Q.vnode;T(x,ie,ie.scopeId,ie.slotScopeIds,Q.parent)}}},P=(x,I,O,Z,Q,ce,ie,se,fe=0)=>{for(let b=fe;b<x.length;b++){const S=x[b]=se?Di(x[b]):Yn(x[b]);_(null,S,I,O,Z,Q,ce,ie,se)}},$=(x,I,O,Z,Q,ce,ie)=>{const se=I.el=x.el;let{patchFlag:fe,dynamicChildren:b,dirs:S}=I;fe|=x.patchFlag&16;const k=x.props||yt,W=I.props||yt;let te;if(O&&$i(O,!1),(te=W.onVnodeBeforeUpdate)&&Xn(te,O,I,x),S&&Ji(I,x,O,"beforeUpdate"),O&&$i(O,!0),b?E(x.dynamicChildren,b,se,O,Z,Ml(I,Q),ce):ie||J(x,I,se,null,O,Z,Ml(I,Q),ce,!1),fe>0){if(fe&16)C(se,I,k,W,O,Z,Q);else if(fe&2&&k.class!==W.class&&s(se,"class",null,W.class,Q),fe&4&&s(se,"style",k.style,W.style,Q),fe&8){const he=I.dynamicProps;for(let ye=0;ye<he.length;ye++){const be=he[ye],ge=k[be],Ee=W[be];(Ee!==ge||be==="value")&&s(se,be,ge,Ee,Q,x.children,O,Z,oe)}}fe&1&&x.children!==I.children&&u(se,I.children)}else!ie&&b==null&&C(se,I,k,W,O,Z,Q);((te=W.onVnodeUpdated)||S)&&on(()=>{te&&Xn(te,O,I,x),S&&Ji(I,x,O,"updated")},Z)},E=(x,I,O,Z,Q,ce,ie)=>{for(let se=0;se<I.length;se++){const fe=x[se],b=I[se],S=fe.el&&(fe.type===jn||!Is(fe,b)||fe.shapeFlag&70)?f(fe.el):O;_(fe,b,S,null,Z,Q,ce,ie,!0)}},C=(x,I,O,Z,Q,ce,ie)=>{if(O!==Z){if(O!==yt)for(const se in O)!Ks(se)&&!(se in Z)&&s(x,se,O[se],null,ie,I.children,Q,ce,oe);for(const se in Z){if(Ks(se))continue;const fe=Z[se],b=O[se];fe!==b&&se!=="value"&&s(x,se,b,fe,ie,I.children,Q,ce,oe)}"value"in Z&&s(x,"value",O.value,Z.value,ie)}},B=(x,I,O,Z,Q,ce,ie,se,fe)=>{const b=I.el=x?x.el:a(""),S=I.anchor=x?x.anchor:a("");let{patchFlag:k,dynamicChildren:W,slotScopeIds:te}=I;te&&(se=se?se.concat(te):te),x==null?(r(b,O,Z),r(S,O,Z),P(I.children||[],O,S,Q,ce,ie,se,fe)):k>0&&k&64&&W&&x.dynamicChildren?(E(x.dynamicChildren,W,O,Q,ce,ie,se),(I.key!=null||Q&&I===Q.subTree)&&em(x,I,!0)):J(x,I,O,S,Q,ce,ie,se,fe)},Y=(x,I,O,Z,Q,ce,ie,se,fe)=>{I.slotScopeIds=se,x==null?I.shapeFlag&512?Q.ctx.activate(I,O,Z,ie,fe):R(I,O,Z,Q,ce,ie,fe):ne(x,I,fe)},R=(x,I,O,Z,Q,ce,ie)=>{const se=x.component=D_(x,Z,Q);if(Wp(x)&&(se.ctx.renderer=me),I_(se),se.asyncDep){if(Q&&Q.registerDep(se,H),!x.el){const fe=se.subTree=Zt(_r);m(null,fe,I,O)}}else H(se,x,I,O,Q,ce,ie)},ne=(x,I,O)=>{const Z=I.component=x.component;if(k0(x,I,O))if(Z.asyncDep&&!Z.asyncResolved){re(Z,I,O);return}else Z.next=I,L0(Z.update),Z.effect.dirty=!0,Z.update();else I.el=x.el,Z.vnode=I},H=(x,I,O,Z,Q,ce,ie)=>{const se=()=>{if(x.isMounted){let{next:S,bu:k,u:W,parent:te,vnode:he}=x;{const Fe=tm(x);if(Fe){S&&(S.el=he.el,re(x,S,ie)),Fe.asyncDep.then(()=>{x.isUnmounted||se()});return}}let ye=S,be;$i(x,!1),S?(S.el=he.el,re(x,S,ie)):S=he,k&&xl(k),(be=S.props&&S.props.onVnodeBeforeUpdate)&&Xn(be,te,S,he),$i(x,!0);const ge=uf(x),Ee=x.subTree;x.subTree=ge,_(Ee,ge,f(Ee.el),F(Ee),x,Q,ce),S.el=ge.el,ye===null&&G0(x,ge.el),W&&on(W,Q),(be=S.props&&S.props.onVnodeUpdated)&&on(()=>Xn(be,te,S,he),Q)}else{let S;const{el:k,props:W}=I,{bm:te,m:he,parent:ye}=x,be=ga(I);$i(x,!1),te&&xl(te),!be&&(S=W&&W.onVnodeBeforeMount)&&Xn(S,ye,I),$i(x,!0);{const ge=x.subTree=uf(x);_(null,ge,O,Z,x,Q,ce),I.el=ge.el}if(he&&on(he,Q),!be&&(S=W&&W.onVnodeMounted)){const ge=I;on(()=>Xn(S,ye,ge),Q)}(I.shapeFlag&256||ye&&ga(ye.vnode)&&ye.vnode.shapeFlag&256)&&x.a&&on(x.a,Q),x.isMounted=!0,I=O=Z=null}},fe=x.effect=new su(se,xn,()=>du(b),x.scope),b=x.update=()=>{fe.dirty&&fe.run()};b.id=x.uid,$i(x,!0),b()},re=(x,I,O)=>{I.component=x;const Z=x.vnode.props;x.vnode=I,x.next=null,g_(x,I.props,Z,O),x_(x,I.children,O),yr(),cf(x),Mr()},J=(x,I,O,Z,Q,ce,ie,se,fe=!1)=>{const b=x&&x.children,S=x?x.shapeFlag:0,k=I.children,{patchFlag:W,shapeFlag:te}=I;if(W>0){if(W&128){q(b,k,O,Z,Q,ce,ie,se,fe);return}else if(W&256){K(b,k,O,Z,Q,ce,ie,se,fe);return}}te&8?(S&16&&oe(b,Q,ce),k!==b&&u(O,k)):S&16?te&16?q(b,k,O,Z,Q,ce,ie,se,fe):oe(b,Q,ce,!0):(S&8&&u(O,""),te&16&&P(k,O,Z,Q,ce,ie,se,fe))},K=(x,I,O,Z,Q,ce,ie,se,fe)=>{x=x||Kr,I=I||Kr;const b=x.length,S=I.length,k=Math.min(b,S);let W;for(W=0;W<k;W++){const te=I[W]=fe?Di(I[W]):Yn(I[W]);_(x[W],te,O,null,Q,ce,ie,se,fe)}b>S?oe(x,Q,ce,!0,!1,k):P(I,O,Z,Q,ce,ie,se,fe,k)},q=(x,I,O,Z,Q,ce,ie,se,fe)=>{let b=0;const S=I.length;let k=x.length-1,W=S-1;for(;b<=k&&b<=W;){const te=x[b],he=I[b]=fe?Di(I[b]):Yn(I[b]);if(Is(te,he))_(te,he,O,null,Q,ce,ie,se,fe);else break;b++}for(;b<=k&&b<=W;){const te=x[k],he=I[W]=fe?Di(I[W]):Yn(I[W]);if(Is(te,he))_(te,he,O,null,Q,ce,ie,se,fe);else break;k--,W--}if(b>k){if(b<=W){const te=W+1,he=te<S?I[te].el:Z;for(;b<=W;)_(null,I[b]=fe?Di(I[b]):Yn(I[b]),O,he,Q,ce,ie,se,fe),b++}}else if(b>W)for(;b<=k;)X(x[b],Q,ce,!0),b++;else{const te=b,he=b,ye=new Map;for(b=he;b<=W;b++){const Se=I[b]=fe?Di(I[b]):Yn(I[b]);Se.key!=null&&ye.set(Se.key,b)}let be,ge=0;const Ee=W-he+1;let Fe=!1,Te=0;const Be=new Array(Ee);for(b=0;b<Ee;b++)Be[b]=0;for(b=te;b<=k;b++){const Se=x[b];if(ge>=Ee){X(Se,Q,ce,!0);continue}let Ae;if(Se.key!=null)Ae=ye.get(Se.key);else for(be=he;be<=W;be++)if(Be[be-he]===0&&Is(Se,I[be])){Ae=be;break}Ae===void 0?X(Se,Q,ce,!0):(Be[Ae-he]=b+1,Ae>=Te?Te=Ae:Fe=!0,_(Se,I[Ae],O,null,Q,ce,ie,se,fe),ge++)}const De=Fe?b_(Be):Kr;for(be=De.length-1,b=Ee-1;b>=0;b--){const Se=he+b,Ae=I[Se],Ie=Se+1<S?I[Se+1].el:Z;Be[b]===0?_(null,Ae,O,Ie,Q,ce,ie,se,fe):Fe&&(be<0||b!==De[be]?U(Ae,O,Ie,2):be--)}}},U=(x,I,O,Z,Q=null)=>{const{el:ce,type:ie,transition:se,children:fe,shapeFlag:b}=x;if(b&6){U(x.component.subTree,I,O,Z);return}if(b&128){x.suspense.move(I,O,Z);return}if(b&64){ie.move(x,I,O,me);return}if(ie===jn){r(ce,I,O);for(let k=0;k<fe.length;k++)U(fe[k],I,O,Z);r(x.anchor,I,O);return}if(ie===Sl){v(x,I,O);return}if(Z!==2&&b&1&&se)if(Z===0)se.beforeEnter(ce),r(ce,I,O),on(()=>se.enter(ce),Q);else{const{leave:k,delayLeave:W,afterLeave:te}=se,he=()=>r(ce,I,O),ye=()=>{k(ce,()=>{he(),te&&te()})};W?W(ce,he,ye):ye()}else r(ce,I,O)},X=(x,I,O,Z=!1,Q=!1)=>{const{type:ce,props:ie,ref:se,children:fe,dynamicChildren:b,shapeFlag:S,patchFlag:k,dirs:W}=x;if(se!=null&&Rc(se,null,O,x,!0),S&256){I.ctx.deactivate(x);return}const te=S&1&&W,he=!ga(x);let ye;if(he&&(ye=ie&&ie.onVnodeBeforeUnmount)&&Xn(ye,I,x),S&6)V(x.component,O,Z);else{if(S&128){x.suspense.unmount(O,Z);return}te&&Ji(x,null,I,"beforeUnmount"),S&64?x.type.remove(x,I,O,Q,me,Z):b&&(ce!==jn||k>0&&k&64)?oe(b,I,O,!1,!0):(ce===jn&&k&384||!Q&&S&16)&&oe(fe,I,O),Z&&le(x)}(he&&(ye=ie&&ie.onVnodeUnmounted)||te)&&on(()=>{ye&&Xn(ye,I,x),te&&Ji(x,null,I,"unmounted")},O)},le=x=>{const{type:I,el:O,anchor:Z,transition:Q}=x;if(I===jn){N(O,Z);return}if(I===Sl){M(x);return}const ce=()=>{i(O),Q&&!Q.persisted&&Q.afterLeave&&Q.afterLeave()};if(x.shapeFlag&1&&Q&&!Q.persisted){const{leave:ie,delayLeave:se}=Q,fe=()=>ie(O,ce);se?se(x.el,ce,fe):fe()}else ce()},N=(x,I)=>{let O;for(;x!==I;)O=h(x),i(x),x=O;i(I)},V=(x,I,O)=>{const{bum:Z,scope:Q,update:ce,subTree:ie,um:se}=x;Z&&xl(Z),Q.stop(),ce&&(ce.active=!1,X(ie,x,I,O)),se&&on(se,I),on(()=>{x.isUnmounted=!0},I),I&&I.pendingBranch&&!I.isUnmounted&&x.asyncDep&&!x.asyncResolved&&x.suspenseId===I.pendingId&&(I.deps--,I.deps===0&&I.resolve())},oe=(x,I,O,Z=!1,Q=!1,ce=0)=>{for(let ie=ce;ie<x.length;ie++)X(x[ie],I,O,Z,Q)},F=x=>x.shapeFlag&6?F(x.component.subTree):x.shapeFlag&128?x.suspense.next():h(x.anchor||x.el);let j=!1;const ee=(x,I,O)=>{x==null?I._vnode&&X(I._vnode,null,null,!0):_(I._vnode||null,x,I,null,null,null,O),j||(j=!0,cf(),Bp(),j=!1),I._vnode=x},me={p:_,um:X,m:U,r:le,mt:R,mc:P,pc:J,pbc:E,n:F,o:n};return{render:ee,hydrate:void 0,createApp:p_(ee)}}function Ml({type:n,props:e},t){return t==="svg"&&n==="foreignObject"||t==="mathml"&&n==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:t}function $i({effect:n,update:e},t){n.allowRecurse=e.allowRecurse=t}function S_(n,e){return(!n||n&&!n.pendingBranch)&&e&&!e.persisted}function em(n,e,t=!1){const r=n.children,i=e.children;if(et(r)&&et(i))for(let s=0;s<r.length;s++){const o=r[s];let a=i[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[s]=Di(i[s]),a.el=o.el),t||em(o,a)),a.type===qa&&(a.el=o.el)}}function b_(n){const e=n.slice(),t=[0];let r,i,s,o,a;const l=n.length;for(r=0;r<l;r++){const c=n[r];if(c!==0){if(i=t[t.length-1],n[i]<c){e[r]=i,t.push(r);continue}for(s=0,o=t.length-1;s<o;)a=s+o>>1,n[t[a]]<c?s=a+1:o=a;c<n[t[s]]&&(s>0&&(e[r]=t[s-1]),t[s]=r)}}for(s=t.length,o=t[s-1];s-- >0;)t[s]=o,o=e[o];return t}function tm(n){const e=n.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:tm(e)}const E_=n=>n.__isTeleport,jn=Symbol.for("v-fgt"),qa=Symbol.for("v-txt"),_r=Symbol.for("v-cmt"),Sl=Symbol.for("v-stc"),$s=[];let Nn=null;function is(n=!1){$s.push(Nn=n?null:[])}function T_(){$s.pop(),Nn=$s[$s.length-1]||null}let fo=1;function Mf(n){fo+=n}function nm(n){return n.dynamicChildren=fo>0?Nn||Kr:null,T_(),fo>0&&Nn&&Nn.push(n),n}function ho(n,e,t,r,i,s){return nm(Bn(n,e,t,r,i,s,!0))}function w_(n,e,t,r,i){return nm(Zt(n,e,t,r,i,!0))}function Cc(n){return n?n.__v_isVNode===!0:!1}function Is(n,e){return n.type===e.type&&n.key===e.key}const Ka="__vInternal",im=({key:n})=>n??null,va=({ref:n,ref_key:e,ref_for:t})=>(typeof n=="number"&&(n=""+n),n!=null?Ft(n)||cn(n)||tt(n)?{i:Fn,r:n,k:e,f:!!t}:n:null);function Bn(n,e=null,t=null,r=0,i=null,s=n===jn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:e,key:e&&im(e),ref:e&&va(e),scopeId:ja,slotScopeIds:null,children:t,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Fn};return a?(_u(l,t),s&128&&n.normalize(l)):t&&(l.shapeFlag|=Ft(t)?8:16),fo>0&&!o&&Nn&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&Nn.push(l),l}const Zt=A_;function A_(n,e=null,t=null,r=0,i=null,s=!1){if((!n||n===V0)&&(n=_r),Cc(n)){const a=rs(n,e,!0);return t&&_u(a,t),fo>0&&!s&&Nn&&(a.shapeFlag&6?Nn[Nn.indexOf(n)]=a:Nn.push(a)),a.patchFlag|=-2,a}if(k_(n)&&(n=n.__vccOpts),e){e=R_(e);let{class:a,style:l}=e;a&&!Ft(a)&&(e.class=ru(a)),Et(l)&&(Cp(l)&&!et(l)&&(l=$t({},l)),e.style=iu(l))}const o=Ft(n)?1:X0(n)?128:E_(n)?64:Et(n)?4:tt(n)?2:0;return Bn(n,e,t,r,i,o,s,!0)}function R_(n){return n?Cp(n)||Ka in n?$t({},n):n:null}function rs(n,e,t=!1){const{props:r,ref:i,patchFlag:s,children:o}=n,a=e?L_(r||{},e):r;return{__v_isVNode:!0,__v_skip:!0,type:n.type,props:a,key:a&&im(a),ref:e&&e.ref?t&&i?et(i)?i.concat(va(e)):[i,va(e)]:va(e):i,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:o,target:n.target,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:e&&n.type!==jn?s===-1?16:s|16:s,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:n.transition,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&rs(n.ssContent),ssFallback:n.ssFallback&&rs(n.ssFallback),el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce}}function Qs(n=" ",e=0){return Zt(qa,null,n,e)}function C_(n="",e=!1){return e?(is(),w_(_r,null,n)):Zt(_r,null,n)}function Yn(n){return n==null||typeof n=="boolean"?Zt(_r):et(n)?Zt(jn,null,n.slice()):typeof n=="object"?Di(n):Zt(qa,null,String(n))}function Di(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:rs(n)}function _u(n,e){let t=0;const{shapeFlag:r}=n;if(e==null)e=null;else if(et(e))t=16;else if(typeof e=="object")if(r&65){const i=e.default;i&&(i._c&&(i._d=!1),_u(n,i()),i._c&&(i._d=!0));return}else{t=32;const i=e._;!i&&!(Ka in e)?e._ctx=Fn:i===3&&Fn&&(Fn.slots._===1?e._=1:(e._=2,n.patchFlag|=1024))}else tt(e)?(e={default:e,_ctx:Fn},t=32):(e=String(e),r&64?(t=16,e=[Qs(e)]):t=8);n.children=e,n.shapeFlag|=t}function L_(...n){const e={};for(let t=0;t<n.length;t++){const r=n[t];for(const i in r)if(i==="class")e.class!==r.class&&(e.class=ru([e.class,r.class]));else if(i==="style")e.style=iu([e.style,r.style]);else if(Oa(i)){const s=e[i],o=r[i];o&&s!==o&&!(et(s)&&s.includes(o))&&(e[i]=s?[].concat(s,o):o)}else i!==""&&(e[i]=r[i])}return e}function Xn(n,e,t,r=null){On(n,e,7,[t,r])}const P_=qp();let U_=0;function D_(n,e,t){const r=n.type,i=(e?e.appContext:n.appContext)||P_,s={uid:U_++,vnode:n,type:r,parent:e,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,scope:new n0(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(i.provides),accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Zp(r,i),emitsOptions:Gp(r,i),emit:null,emitted:null,propsDefaults:yt,inheritAttrs:r.inheritAttrs,ctx:yt,data:yt,props:yt,attrs:yt,slots:yt,refs:yt,setupState:yt,setupContext:null,attrsProxy:null,slotsProxy:null,suspense:t,suspenseId:t?t.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=e?e.root:s,s.emit=D0.bind(null,s),n.ce&&n.ce(s),s}let Vt=null,Ra,Lc;{const n=pp(),e=(t,r)=>{let i;return(i=n[t])||(i=n[t]=[]),i.push(r),s=>{i.length>1?i.forEach(o=>o(s)):i[0](s)}};Ra=e("__VUE_INSTANCE_SETTERS__",t=>Vt=t),Lc=e("__VUE_SSR_SETTERS__",t=>Za=t)}const yo=n=>{const e=Vt;return Ra(n),n.scope.on(),()=>{n.scope.off(),Ra(e)}},Sf=()=>{Vt&&Vt.scope.off(),Ra(null)};function rm(n){return n.vnode.shapeFlag&4}let Za=!1;function I_(n,e=!1){e&&Lc(e);const{props:t,children:r}=n.vnode,i=rm(n);m_(n,t,i,e),v_(n,r);const s=i?F_(n,e):void 0;return e&&Lc(!1),s}function F_(n,e){const t=n.type;n.accessCache=Object.create(null),n.proxy=Lp(new Proxy(n.ctx,a_));const{setup:r}=t;if(r){const i=n.setupContext=r.length>1?O_(n):null,s=yo(n);yr();const o=zi(r,n,0,[n.props,i]);if(Mr(),s(),dp(o)){if(o.then(Sf,Sf),e)return o.then(a=>{bf(n,a)}).catch(a=>{Wa(a,n,0)});n.asyncDep=o}else bf(n,o)}else sm(n)}function bf(n,e,t){tt(e)?n.type.__ssrInlineRender?n.ssrRender=e:n.render=e:Et(e)&&(n.setupState=Ip(e)),sm(n)}function sm(n,e,t){const r=n.type;n.render||(n.render=r.render||xn);{const i=yo(n);yr();try{l_(n)}finally{Mr(),i()}}}function N_(n){return n.attrsProxy||(n.attrsProxy=new Proxy(n.attrs,{get(e,t){return ln(n,"get","$attrs"),e[t]}}))}function O_(n){const e=t=>{n.exposed=t||{}};return{get attrs(){return N_(n)},slots:n.slots,emit:n.emit,expose:e}}function vu(n){if(n.exposed)return n.exposeProxy||(n.exposeProxy=new Proxy(Ip(Lp(n.exposed)),{get(e,t){if(t in e)return e[t];if(t in Zs)return Zs[t](n)},has(e,t){return t in e||t in Zs}}))}function B_(n,e=!0){return tt(n)?n.displayName||n.name:n.name||e&&n.__name}function k_(n){return tt(n)&&"__vccOpts"in n}const Pn=(n,e)=>E0(n,e,Za);function om(n,e,t){const r=arguments.length;return r===2?Et(e)&&!et(e)?Cc(e)?Zt(n,null,[e]):Zt(n,e):Zt(n,null,e):(r>3?t=Array.prototype.slice.call(arguments,2):r===3&&Cc(t)&&(t=[t]),Zt(n,e,t))}const G_="3.4.21";/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const z_="http://www.w3.org/2000/svg",H_="http://www.w3.org/1998/Math/MathML",Ii=typeof document<"u"?document:null,Ef=Ii&&Ii.createElement("template"),V_={insert:(n,e,t)=>{e.insertBefore(n,t||null)},remove:n=>{const e=n.parentNode;e&&e.removeChild(n)},createElement:(n,e,t,r)=>{const i=e==="svg"?Ii.createElementNS(z_,n):e==="mathml"?Ii.createElementNS(H_,n):Ii.createElement(n,t?{is:t}:void 0);return n==="select"&&r&&r.multiple!=null&&i.setAttribute("multiple",r.multiple),i},createText:n=>Ii.createTextNode(n),createComment:n=>Ii.createComment(n),setText:(n,e)=>{n.nodeValue=e},setElementText:(n,e)=>{n.textContent=e},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>Ii.querySelector(n),setScopeId(n,e){n.setAttribute(e,"")},insertStaticContent(n,e,t,r,i,s){const o=t?t.previousSibling:e.lastChild;if(i&&(i===s||i.nextSibling))for(;e.insertBefore(i.cloneNode(!0),t),!(i===s||!(i=i.nextSibling)););else{Ef.innerHTML=r==="svg"?`<svg>${n}</svg>`:r==="mathml"?`<math>${n}</math>`:n;const a=Ef.content;if(r==="svg"||r==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}e.insertBefore(a,t)}return[o?o.nextSibling:e.firstChild,t?t.previousSibling:e.lastChild]}},W_=Symbol("_vtc");function X_(n,e,t){const r=n[W_];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?n.removeAttribute("class"):t?n.setAttribute("class",e):n.className=e}const Tf=Symbol("_vod"),j_=Symbol("_vsh"),Y_=Symbol(""),q_=/(^|;)\s*display\s*:/;function K_(n,e,t){const r=n.style,i=Ft(t);let s=!1;if(t&&!i){if(e)if(Ft(e))for(const o of e.split(";")){const a=o.slice(0,o.indexOf(":")).trim();t[a]==null&&xa(r,a,"")}else for(const o in e)t[o]==null&&xa(r,o,"");for(const o in t)o==="display"&&(s=!0),xa(r,o,t[o])}else if(i){if(e!==t){const o=r[Y_];o&&(t+=";"+o),r.cssText=t,s=q_.test(t)}}else e&&n.removeAttribute("style");Tf in n&&(n[Tf]=s?r.display:"",n[j_]&&(r.display="none"))}const wf=/\s*!important$/;function xa(n,e,t){if(et(t))t.forEach(r=>xa(n,e,r));else if(t==null&&(t=""),e.startsWith("--"))n.setProperty(e,t);else{const r=Z_(n,e);wf.test(t)?n.setProperty(gs(r),t.replace(wf,""),"important"):n[r]=t}}const Af=["Webkit","Moz","ms"],bl={};function Z_(n,e){const t=bl[e];if(t)return t;let r=$n(e);if(r!=="filter"&&r in n)return bl[e]=r;r=za(r);for(let i=0;i<Af.length;i++){const s=Af[i]+r;if(s in n)return bl[e]=s}return e}const Rf="http://www.w3.org/1999/xlink";function J_(n,e,t,r,i){if(r&&e.startsWith("xlink:"))t==null?n.removeAttributeNS(Rf,e.slice(6,e.length)):n.setAttributeNS(Rf,e,t);else{const s=t0(e);t==null||s&&!mp(t)?n.removeAttribute(e):n.setAttribute(e,s?"":t)}}function $_(n,e,t,r,i,s,o){if(e==="innerHTML"||e==="textContent"){r&&o(r,i,s),n[e]=t??"";return}const a=n.tagName;if(e==="value"&&a!=="PROGRESS"&&!a.includes("-")){const c=a==="OPTION"?n.getAttribute("value")||"":n.value,u=t??"";(c!==u||!("_value"in n))&&(n.value=u),t==null&&n.removeAttribute(e),n._value=t;return}let l=!1;if(t===""||t==null){const c=typeof n[e];c==="boolean"?t=mp(t):t==null&&c==="string"?(t="",l=!0):c==="number"&&(t=0,l=!0)}try{n[e]=t}catch{}l&&n.removeAttribute(e)}function Q_(n,e,t,r){n.addEventListener(e,t,r)}function ev(n,e,t,r){n.removeEventListener(e,t,r)}const Cf=Symbol("_vei");function tv(n,e,t,r,i=null){const s=n[Cf]||(n[Cf]={}),o=s[e];if(r&&o)o.value=r;else{const[a,l]=nv(e);if(r){const c=s[e]=sv(r,i);Q_(n,a,c,l)}else o&&(ev(n,a,o,l),s[e]=void 0)}}const Lf=/(?:Once|Passive|Capture)$/;function nv(n){let e;if(Lf.test(n)){e={};let r;for(;r=n.match(Lf);)n=n.slice(0,n.length-r[0].length),e[r[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):gs(n.slice(2)),e]}let El=0;const iv=Promise.resolve(),rv=()=>El||(iv.then(()=>El=0),El=Date.now());function sv(n,e){const t=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=t.attached)return;On(ov(r,t.value),e,5,[r])};return t.value=n,t.attached=rv(),t}function ov(n,e){if(et(e)){const t=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{t.call(n),n._stopped=!0},e.map(r=>i=>!i._stopped&&r&&r(i))}else return e}const Pf=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,av=(n,e,t,r,i,s,o,a,l)=>{const c=i==="svg";e==="class"?X_(n,r,c):e==="style"?K_(n,t,r):Oa(e)?eu(e)||tv(n,e,t,r,o):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):lv(n,e,r,c))?$_(n,e,r,s,o,a,l):(e==="true-value"?n._trueValue=r:e==="false-value"&&(n._falseValue=r),J_(n,e,r,c))};function lv(n,e,t,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in n&&Pf(e)&&tt(t));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&n.tagName==="INPUT"||e==="type"&&n.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const i=n.tagName;if(i==="IMG"||i==="VIDEO"||i==="CANVAS"||i==="SOURCE")return!1}return Pf(e)&&Ft(t)?!1:e in n}const cv=$t({patchProp:av},V_);let Uf;function uv(){return Uf||(Uf=y_(cv))}const fv=(...n)=>{const e=uv().createApp(...n),{mount:t}=e;return e.mount=r=>{const i=dv(r);if(!i)return;const s=e._component;!tt(s)&&!s.render&&!s.template&&(s.template=i.innerHTML),i.innerHTML="";const o=t(i,!1,hv(i));return i instanceof Element&&(i.removeAttribute("v-cloak"),i.setAttribute("data-v-app","")),o},e};function hv(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function dv(n){return Ft(n)?document.querySelector(n):n}/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const Wr=typeof document<"u";function am(n){return typeof n=="object"||"displayName"in n||"props"in n||"__vccOpts"in n}function pv(n){return n.__esModule||n[Symbol.toStringTag]==="Module"||n.default&&am(n.default)}const ct=Object.assign;function Tl(n,e){const t={};for(const r in e){const i=e[r];t[r]=Gn(i)?i.map(n):n(i)}return t}const eo=()=>{},Gn=Array.isArray,lm=/#/g,mv=/&/g,gv=/\//g,_v=/=/g,vv=/\?/g,cm=/\+/g,xv=/%5B/g,yv=/%5D/g,um=/%5E/g,Mv=/%60/g,fm=/%7B/g,Sv=/%7C/g,hm=/%7D/g,bv=/%20/g;function xu(n){return encodeURI(""+n).replace(Sv,"|").replace(xv,"[").replace(yv,"]")}function Ev(n){return xu(n).replace(fm,"{").replace(hm,"}").replace(um,"^")}function Pc(n){return xu(n).replace(cm,"%2B").replace(bv,"+").replace(lm,"%23").replace(mv,"%26").replace(Mv,"`").replace(fm,"{").replace(hm,"}").replace(um,"^")}function Tv(n){return Pc(n).replace(_v,"%3D")}function wv(n){return xu(n).replace(lm,"%23").replace(vv,"%3F")}function Av(n){return n==null?"":wv(n).replace(gv,"%2F")}function po(n){try{return decodeURIComponent(""+n)}catch{}return""+n}const Rv=/\/$/,Cv=n=>n.replace(Rv,"");function wl(n,e,t="/"){let r,i={},s="",o="";const a=e.indexOf("#");let l=e.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(r=e.slice(0,l),s=e.slice(l+1,a>-1?a:e.length),i=n(s)),a>-1&&(r=r||e.slice(0,a),o=e.slice(a,e.length)),r=Dv(r??e,t),{fullPath:r+(s&&"?")+s+o,path:r,query:i,hash:po(o)}}function Lv(n,e){const t=e.query?n(e.query):"";return e.path+(t&&"?")+t+(e.hash||"")}function Df(n,e){return!e||!n.toLowerCase().startsWith(e.toLowerCase())?n:n.slice(e.length)||"/"}function Pv(n,e,t){const r=e.matched.length-1,i=t.matched.length-1;return r>-1&&r===i&&ss(e.matched[r],t.matched[i])&&dm(e.params,t.params)&&n(e.query)===n(t.query)&&e.hash===t.hash}function ss(n,e){return(n.aliasOf||n)===(e.aliasOf||e)}function dm(n,e){if(Object.keys(n).length!==Object.keys(e).length)return!1;for(const t in n)if(!Uv(n[t],e[t]))return!1;return!0}function Uv(n,e){return Gn(n)?If(n,e):Gn(e)?If(e,n):n===e}function If(n,e){return Gn(e)?n.length===e.length&&n.every((t,r)=>t===e[r]):n.length===1&&n[0]===e}function Dv(n,e){if(n.startsWith("/"))return n;if(!n)return e;const t=e.split("/"),r=n.split("/"),i=r[r.length-1];(i===".."||i===".")&&r.push("");let s=t.length-1,o,a;for(o=0;o<r.length;o++)if(a=r[o],a!==".")if(a==="..")s>1&&s--;else break;return t.slice(0,s).join("/")+"/"+r.slice(o).join("/")}const Ei={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var mo;(function(n){n.pop="pop",n.push="push"})(mo||(mo={}));var to;(function(n){n.back="back",n.forward="forward",n.unknown=""})(to||(to={}));function Iv(n){if(!n)if(Wr){const e=document.querySelector("base");n=e&&e.getAttribute("href")||"/",n=n.replace(/^\w+:\/\/[^\/]+/,"")}else n="/";return n[0]!=="/"&&n[0]!=="#"&&(n="/"+n),Cv(n)}const Fv=/^[^#]+#/;function Nv(n,e){return n.replace(Fv,"#")+e}function Ov(n,e){const t=document.documentElement.getBoundingClientRect(),r=n.getBoundingClientRect();return{behavior:e.behavior,left:r.left-t.left-(e.left||0),top:r.top-t.top-(e.top||0)}}const Ja=()=>({left:window.scrollX,top:window.scrollY});function Bv(n){let e;if("el"in n){const t=n.el,r=typeof t=="string"&&t.startsWith("#"),i=typeof t=="string"?r?document.getElementById(t.slice(1)):document.querySelector(t):t;if(!i)return;e=Ov(i,n)}else e=n;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Ff(n,e){return(history.state?history.state.position-e:-1)+n}const Uc=new Map;function kv(n,e){Uc.set(n,e)}function Gv(n){const e=Uc.get(n);return Uc.delete(n),e}let zv=()=>location.protocol+"//"+location.host;function pm(n,e){const{pathname:t,search:r,hash:i}=e,s=n.indexOf("#");if(s>-1){let a=i.includes(n.slice(s))?n.slice(s).length:1,l=i.slice(a);return l[0]!=="/"&&(l="/"+l),Df(l,"")}return Df(t,n)+r+i}function Hv(n,e,t,r){let i=[],s=[],o=null;const a=({state:h})=>{const d=pm(n,location),g=t.value,_=e.value;let p=0;if(h){if(t.value=d,e.value=h,o&&o===g){o=null;return}p=_?h.position-_.position:0}else r(d);i.forEach(m=>{m(t.value,g,{delta:p,type:mo.pop,direction:p?p>0?to.forward:to.back:to.unknown})})};function l(){o=t.value}function c(h){i.push(h);const d=()=>{const g=i.indexOf(h);g>-1&&i.splice(g,1)};return s.push(d),d}function u(){const{history:h}=window;h.state&&h.replaceState(ct({},h.state,{scroll:Ja()}),"")}function f(){for(const h of s)h();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",u)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",u,{passive:!0}),{pauseListeners:l,listen:c,destroy:f}}function Nf(n,e,t,r=!1,i=!1){return{back:n,current:e,forward:t,replaced:r,position:window.history.length,scroll:i?Ja():null}}function Vv(n){const{history:e,location:t}=window,r={value:pm(n,t)},i={value:e.state};i.value||s(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function s(l,c,u){const f=n.indexOf("#"),h=f>-1?(t.host&&document.querySelector("base")?n:n.slice(f))+l:zv()+n+l;try{e[u?"replaceState":"pushState"](c,"",h),i.value=c}catch(d){console.error(d),t[u?"replace":"assign"](h)}}function o(l,c){const u=ct({},e.state,Nf(i.value.back,l,i.value.forward,!0),c,{position:i.value.position});s(l,u,!0),r.value=l}function a(l,c){const u=ct({},i.value,e.state,{forward:l,scroll:Ja()});s(u.current,u,!0);const f=ct({},Nf(r.value,l,null),{position:u.position+1},c);s(l,f,!1),r.value=l}return{location:r,state:i,push:a,replace:o}}function Wv(n){n=Iv(n);const e=Vv(n),t=Hv(n,e.state,e.location,e.replace);function r(s,o=!0){o||t.pauseListeners(),history.go(s)}const i=ct({location:"",base:n,go:r,createHref:Nv.bind(null,n)},e,t);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>e.state.value}),i}function Xv(n){return n=location.host?n||location.pathname+location.search:"",n.includes("#")||(n+="#"),Wv(n)}function jv(n){return typeof n=="string"||n&&typeof n=="object"}function mm(n){return typeof n=="string"||typeof n=="symbol"}const gm=Symbol("");var Of;(function(n){n[n.aborted=4]="aborted",n[n.cancelled=8]="cancelled",n[n.duplicated=16]="duplicated"})(Of||(Of={}));function os(n,e){return ct(new Error,{type:n,[gm]:!0},e)}function ni(n,e){return n instanceof Error&&gm in n&&(e==null||!!(n.type&e))}const Bf="[^/]+?",Yv={sensitive:!1,strict:!1,start:!0,end:!0},qv=/[.+*?^${}()[\]/\\]/g;function Kv(n,e){const t=ct({},Yv,e),r=[];let i=t.start?"^":"";const s=[];for(const c of n){const u=c.length?[]:[90];t.strict&&!c.length&&(i+="/");for(let f=0;f<c.length;f++){const h=c[f];let d=40+(t.sensitive?.25:0);if(h.type===0)f||(i+="/"),i+=h.value.replace(qv,"\\$&"),d+=40;else if(h.type===1){const{value:g,repeatable:_,optional:p,regexp:m}=h;s.push({name:g,repeatable:_,optional:p});const y=m||Bf;if(y!==Bf){d+=10;try{new RegExp(`(${y})`)}catch(M){throw new Error(`Invalid custom RegExp for param "${g}" (${y}): `+M.message)}}let v=_?`((?:${y})(?:/(?:${y}))*)`:`(${y})`;f||(v=p&&c.length<2?`(?:/${v})`:"/"+v),p&&(v+="?"),i+=v,d+=20,p&&(d+=-8),_&&(d+=-20),y===".*"&&(d+=-50)}u.push(d)}r.push(u)}if(t.strict&&t.end){const c=r.length-1;r[c][r[c].length-1]+=.7000000000000001}t.strict||(i+="/?"),t.end?i+="$":t.strict&&!i.endsWith("/")&&(i+="(?:/|$)");const o=new RegExp(i,t.sensitive?"":"i");function a(c){const u=c.match(o),f={};if(!u)return null;for(let h=1;h<u.length;h++){const d=u[h]||"",g=s[h-1];f[g.name]=d&&g.repeatable?d.split("/"):d}return f}function l(c){let u="",f=!1;for(const h of n){(!f||!u.endsWith("/"))&&(u+="/"),f=!1;for(const d of h)if(d.type===0)u+=d.value;else if(d.type===1){const{value:g,repeatable:_,optional:p}=d,m=g in c?c[g]:"";if(Gn(m)&&!_)throw new Error(`Provided param "${g}" is an array but it is not repeatable (* or + modifiers)`);const y=Gn(m)?m.join("/"):m;if(!y)if(p)h.length<2&&(u.endsWith("/")?u=u.slice(0,-1):f=!0);else throw new Error(`Missing required param "${g}"`);u+=y}}return u||"/"}return{re:o,score:r,keys:s,parse:a,stringify:l}}function Zv(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=e[t]-n[t];if(r)return r;t++}return n.length<e.length?n.length===1&&n[0]===80?-1:1:n.length>e.length?e.length===1&&e[0]===80?1:-1:0}function _m(n,e){let t=0;const r=n.score,i=e.score;for(;t<r.length&&t<i.length;){const s=Zv(r[t],i[t]);if(s)return s;t++}if(Math.abs(i.length-r.length)===1){if(kf(r))return 1;if(kf(i))return-1}return i.length-r.length}function kf(n){const e=n[n.length-1];return n.length>0&&e[e.length-1]<0}const Jv={type:0,value:""},$v=/[a-zA-Z0-9_]/;function Qv(n){if(!n)return[[]];if(n==="/")return[[Jv]];if(!n.startsWith("/"))throw new Error(`Invalid path "${n}"`);function e(d){throw new Error(`ERR (${t})/"${c}": ${d}`)}let t=0,r=t;const i=[];let s;function o(){s&&i.push(s),s=[]}let a=0,l,c="",u="";function f(){c&&(t===0?s.push({type:0,value:c}):t===1||t===2||t===3?(s.length>1&&(l==="*"||l==="+")&&e(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:u,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):e("Invalid state to consume buffer"),c="")}function h(){c+=l}for(;a<n.length;){if(l=n[a++],l==="\\"&&t!==2){r=t,t=4;continue}switch(t){case 0:l==="/"?(c&&f(),o()):l===":"?(f(),t=1):h();break;case 4:h(),t=r;break;case 1:l==="("?t=2:$v.test(l)?h():(f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?u[u.length-1]=="\\"?u=u.slice(0,-1)+l:t=3:u+=l;break;case 3:f(),t=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,u="";break;default:e("Unknown state");break}}return t===2&&e(`Unfinished custom RegExp for param "${c}"`),f(),o(),i}function ex(n,e,t){const r=Kv(Qv(n.path),t),i=ct(r,{record:n,parent:e,children:[],alias:[]});return e&&!i.record.aliasOf==!e.record.aliasOf&&e.children.push(i),i}function tx(n,e){const t=[],r=new Map;e=Vf({strict:!1,end:!0,sensitive:!1},e);function i(f){return r.get(f)}function s(f,h,d){const g=!d,_=zf(f);_.aliasOf=d&&d.record;const p=Vf(e,f),m=[_];if("alias"in f){const M=typeof f.alias=="string"?[f.alias]:f.alias;for(const A of M)m.push(zf(ct({},_,{components:d?d.record.components:_.components,path:A,aliasOf:d?d.record:_})))}let y,v;for(const M of m){const{path:A}=M;if(h&&A[0]!=="/"){const w=h.record.path,T=w[w.length-1]==="/"?"":"/";M.path=h.record.path+(A&&T+A)}if(y=ex(M,h,p),d?d.alias.push(y):(v=v||y,v!==y&&v.alias.push(y),g&&f.name&&!Hf(y)&&o(f.name)),vm(y)&&l(y),_.children){const w=_.children;for(let T=0;T<w.length;T++)s(w[T],y,d&&d.children[T])}d=d||y}return v?()=>{o(v)}:eo}function o(f){if(mm(f)){const h=r.get(f);h&&(r.delete(f),t.splice(t.indexOf(h),1),h.children.forEach(o),h.alias.forEach(o))}else{const h=t.indexOf(f);h>-1&&(t.splice(h,1),f.record.name&&r.delete(f.record.name),f.children.forEach(o),f.alias.forEach(o))}}function a(){return t}function l(f){const h=rx(f,t);t.splice(h,0,f),f.record.name&&!Hf(f)&&r.set(f.record.name,f)}function c(f,h){let d,g={},_,p;if("name"in f&&f.name){if(d=r.get(f.name),!d)throw os(1,{location:f});p=d.record.name,g=ct(Gf(h.params,d.keys.filter(v=>!v.optional).concat(d.parent?d.parent.keys.filter(v=>v.optional):[]).map(v=>v.name)),f.params&&Gf(f.params,d.keys.map(v=>v.name))),_=d.stringify(g)}else if(f.path!=null)_=f.path,d=t.find(v=>v.re.test(_)),d&&(g=d.parse(_),p=d.record.name);else{if(d=h.name?r.get(h.name):t.find(v=>v.re.test(h.path)),!d)throw os(1,{location:f,currentLocation:h});p=d.record.name,g=ct({},h.params,f.params),_=d.stringify(g)}const m=[];let y=d;for(;y;)m.unshift(y.record),y=y.parent;return{name:p,path:_,params:g,matched:m,meta:ix(m)}}n.forEach(f=>s(f));function u(){t.length=0,r.clear()}return{addRoute:s,resolve:c,removeRoute:o,clearRoutes:u,getRoutes:a,getRecordMatcher:i}}function Gf(n,e){const t={};for(const r of e)r in n&&(t[r]=n[r]);return t}function zf(n){const e={path:n.path,redirect:n.redirect,name:n.name,meta:n.meta||{},aliasOf:n.aliasOf,beforeEnter:n.beforeEnter,props:nx(n),children:n.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in n?n.components||null:n.component&&{default:n.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function nx(n){const e={},t=n.props||!1;if("component"in n)e.default=t;else for(const r in n.components)e[r]=typeof t=="object"?t[r]:t;return e}function Hf(n){for(;n;){if(n.record.aliasOf)return!0;n=n.parent}return!1}function ix(n){return n.reduce((e,t)=>ct(e,t.meta),{})}function Vf(n,e){const t={};for(const r in n)t[r]=r in e?e[r]:n[r];return t}function rx(n,e){let t=0,r=e.length;for(;t!==r;){const s=t+r>>1;_m(n,e[s])<0?r=s:t=s+1}const i=sx(n);return i&&(r=e.lastIndexOf(i,r-1)),r}function sx(n){let e=n;for(;e=e.parent;)if(vm(e)&&_m(n,e)===0)return e}function vm({record:n}){return!!(n.name||n.components&&Object.keys(n.components).length||n.redirect)}function ox(n){const e={};if(n===""||n==="?")return e;const r=(n[0]==="?"?n.slice(1):n).split("&");for(let i=0;i<r.length;++i){const s=r[i].replace(cm," "),o=s.indexOf("="),a=po(o<0?s:s.slice(0,o)),l=o<0?null:po(s.slice(o+1));if(a in e){let c=e[a];Gn(c)||(c=e[a]=[c]),c.push(l)}else e[a]=l}return e}function Wf(n){let e="";for(let t in n){const r=n[t];if(t=Tv(t),r==null){r!==void 0&&(e+=(e.length?"&":"")+t);continue}(Gn(r)?r.map(s=>s&&Pc(s)):[r&&Pc(r)]).forEach(s=>{s!==void 0&&(e+=(e.length?"&":"")+t,s!=null&&(e+="="+s))})}return e}function ax(n){const e={};for(const t in n){const r=n[t];r!==void 0&&(e[t]=Gn(r)?r.map(i=>i==null?null:""+i):r==null?r:""+r)}return e}const lx=Symbol(""),Xf=Symbol(""),yu=Symbol(""),xm=Symbol(""),Dc=Symbol("");function Fs(){let n=[];function e(r){return n.push(r),()=>{const i=n.indexOf(r);i>-1&&n.splice(i,1)}}function t(){n=[]}return{add:e,list:()=>n.slice(),reset:t}}function Fi(n,e,t,r,i,s=o=>o()){const o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((a,l)=>{const c=h=>{h===!1?l(os(4,{from:t,to:e})):h instanceof Error?l(h):jv(h)?l(os(2,{from:e,to:h})):(o&&r.enterCallbacks[i]===o&&typeof h=="function"&&o.push(h),a())},u=s(()=>n.call(r&&r.instances[i],e,t,c));let f=Promise.resolve(u);n.length<3&&(f=f.then(c)),f.catch(h=>l(h))})}function Al(n,e,t,r,i=s=>s()){const s=[];for(const o of n)for(const a in o.components){let l=o.components[a];if(!(e!=="beforeRouteEnter"&&!o.instances[a]))if(am(l)){const u=(l.__vccOpts||l)[e];u&&s.push(Fi(u,t,r,o,a,i))}else{let c=l();s.push(()=>c.then(u=>{if(!u)throw new Error(`Couldn't resolve component "${a}" at "${o.path}"`);const f=pv(u)?u.default:u;o.mods[a]=u,o.components[a]=f;const d=(f.__vccOpts||f)[e];return d&&Fi(d,t,r,o,a,i)()}))}}return s}function jf(n){const e=mi(yu),t=mi(xm),r=Pn(()=>{const l=Jr(n.to);return e.resolve(l)}),i=Pn(()=>{const{matched:l}=r.value,{length:c}=l,u=l[c-1],f=t.matched;if(!u||!f.length)return-1;const h=f.findIndex(ss.bind(null,u));if(h>-1)return h;const d=Yf(l[c-2]);return c>1&&Yf(u)===d&&f[f.length-1].path!==d?f.findIndex(ss.bind(null,l[c-2])):h}),s=Pn(()=>i.value>-1&&dx(t.params,r.value.params)),o=Pn(()=>i.value>-1&&i.value===t.matched.length-1&&dm(t.params,r.value.params));function a(l={}){if(hx(l)){const c=e[Jr(n.replace)?"replace":"push"](Jr(n.to)).catch(eo);return n.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:r,href:Pn(()=>r.value.href),isActive:s,isExactActive:o,navigate:a}}function cx(n){return n.length===1?n[0]:n}const ux=Vp({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:jf,setup(n,{slots:e}){const t=Va(jf(n)),{options:r}=mi(yu),i=Pn(()=>({[qf(n.activeClass,r.linkActiveClass,"router-link-active")]:t.isActive,[qf(n.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:t.isExactActive}));return()=>{const s=e.default&&cx(e.default(t));return n.custom?s:om("a",{"aria-current":t.isExactActive?n.ariaCurrentValue:null,href:t.href,onClick:t.navigate,class:i.value},s)}}}),fx=ux;function hx(n){if(!(n.metaKey||n.altKey||n.ctrlKey||n.shiftKey)&&!n.defaultPrevented&&!(n.button!==void 0&&n.button!==0)){if(n.currentTarget&&n.currentTarget.getAttribute){const e=n.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return n.preventDefault&&n.preventDefault(),!0}}function dx(n,e){for(const t in e){const r=e[t],i=n[t];if(typeof r=="string"){if(r!==i)return!1}else if(!Gn(i)||i.length!==r.length||r.some((s,o)=>s!==i[o]))return!1}return!0}function Yf(n){return n?n.aliasOf?n.aliasOf.path:n.path:""}const qf=(n,e,t)=>n??e??t,px=Vp({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(n,{attrs:e,slots:t}){const r=mi(Dc),i=Pn(()=>n.route||r.value),s=mi(Xf,0),o=Pn(()=>{let c=Jr(s);const{matched:u}=i.value;let f;for(;(f=u[c])&&!f.components;)c++;return c}),a=Pn(()=>i.value.matched[o.value]);_a(Xf,Pn(()=>o.value+1)),_a(lx,a),_a(Dc,i);const l=lo();return ma(()=>[l.value,a.value,n.name],([c,u,f],[h,d,g])=>{u&&(u.instances[f]=c,d&&d!==u&&c&&c===h&&(u.leaveGuards.size||(u.leaveGuards=d.leaveGuards),u.updateGuards.size||(u.updateGuards=d.updateGuards))),c&&u&&(!d||!ss(u,d)||!h)&&(u.enterCallbacks[f]||[]).forEach(_=>_(c))},{flush:"post"}),()=>{const c=i.value,u=n.name,f=a.value,h=f&&f.components[u];if(!h)return Kf(t.default,{Component:h,route:c});const d=f.props[u],g=d?d===!0?c.params:typeof d=="function"?d(c):d:null,p=om(h,ct({},g,e,{onVnodeUnmounted:m=>{m.component.isUnmounted&&(f.instances[u]=null)},ref:l}));return Kf(t.default,{Component:p,route:c})||p}}});function Kf(n,e){if(!n)return null;const t=n(e);return t.length===1?t[0]:t}const mx=px;function gx(n){const e=tx(n.routes,n),t=n.parseQuery||ox,r=n.stringifyQuery||Wf,i=n.history,s=Fs(),o=Fs(),a=Fs(),l=T0(Ei);let c=Ei;Wr&&n.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const u=Tl.bind(null,F=>""+F),f=Tl.bind(null,Av),h=Tl.bind(null,po);function d(F,j){let ee,me;return mm(F)?(ee=e.getRecordMatcher(F),me=j):me=F,e.addRoute(me,ee)}function g(F){const j=e.getRecordMatcher(F);j&&e.removeRoute(j)}function _(){return e.getRoutes().map(F=>F.record)}function p(F){return!!e.getRecordMatcher(F)}function m(F,j){if(j=ct({},j||l.value),typeof F=="string"){const O=wl(t,F,j.path),Z=e.resolve({path:O.path},j),Q=i.createHref(O.fullPath);return ct(O,Z,{params:h(Z.params),hash:po(O.hash),redirectedFrom:void 0,href:Q})}let ee;if(F.path!=null)ee=ct({},F,{path:wl(t,F.path,j.path).path});else{const O=ct({},F.params);for(const Z in O)O[Z]==null&&delete O[Z];ee=ct({},F,{params:f(O)}),j.params=f(j.params)}const me=e.resolve(ee,j),de=F.hash||"";me.params=u(h(me.params));const x=Lv(r,ct({},F,{hash:Ev(de),path:me.path})),I=i.createHref(x);return ct({fullPath:x,hash:de,query:r===Wf?ax(F.query):F.query||{}},me,{redirectedFrom:void 0,href:I})}function y(F){return typeof F=="string"?wl(t,F,l.value.path):ct({},F)}function v(F,j){if(c!==F)return os(8,{from:j,to:F})}function M(F){return T(F)}function A(F){return M(ct(y(F),{replace:!0}))}function w(F){const j=F.matched[F.matched.length-1];if(j&&j.redirect){const{redirect:ee}=j;let me=typeof ee=="function"?ee(F):ee;return typeof me=="string"&&(me=me.includes("?")||me.includes("#")?me=y(me):{path:me},me.params={}),ct({query:F.query,hash:F.hash,params:me.path!=null?{}:F.params},me)}}function T(F,j){const ee=c=m(F),me=l.value,de=F.state,x=F.force,I=F.replace===!0,O=w(ee);if(O)return T(ct(y(O),{state:typeof O=="object"?ct({},de,O.state):de,force:x,replace:I}),j||ee);const Z=ee;Z.redirectedFrom=j;let Q;return!x&&Pv(r,me,ee)&&(Q=os(16,{to:Z,from:me}),U(me,me,!0,!1)),(Q?Promise.resolve(Q):E(Z,me)).catch(ce=>ni(ce)?ni(ce,2)?ce:q(ce):J(ce,Z,me)).then(ce=>{if(ce){if(ni(ce,2))return T(ct({replace:I},y(ce.to),{state:typeof ce.to=="object"?ct({},de,ce.to.state):de,force:x}),j||Z)}else ce=B(Z,me,!0,I,de);return C(Z,me,ce),ce})}function P(F,j){const ee=v(F,j);return ee?Promise.reject(ee):Promise.resolve()}function $(F){const j=N.values().next().value;return j&&typeof j.runWithContext=="function"?j.runWithContext(F):F()}function E(F,j){let ee;const[me,de,x]=_x(F,j);ee=Al(me.reverse(),"beforeRouteLeave",F,j);for(const O of me)O.leaveGuards.forEach(Z=>{ee.push(Fi(Z,F,j))});const I=P.bind(null,F,j);return ee.push(I),oe(ee).then(()=>{ee=[];for(const O of s.list())ee.push(Fi(O,F,j));return ee.push(I),oe(ee)}).then(()=>{ee=Al(de,"beforeRouteUpdate",F,j);for(const O of de)O.updateGuards.forEach(Z=>{ee.push(Fi(Z,F,j))});return ee.push(I),oe(ee)}).then(()=>{ee=[];for(const O of x)if(O.beforeEnter)if(Gn(O.beforeEnter))for(const Z of O.beforeEnter)ee.push(Fi(Z,F,j));else ee.push(Fi(O.beforeEnter,F,j));return ee.push(I),oe(ee)}).then(()=>(F.matched.forEach(O=>O.enterCallbacks={}),ee=Al(x,"beforeRouteEnter",F,j,$),ee.push(I),oe(ee))).then(()=>{ee=[];for(const O of o.list())ee.push(Fi(O,F,j));return ee.push(I),oe(ee)}).catch(O=>ni(O,8)?O:Promise.reject(O))}function C(F,j,ee){a.list().forEach(me=>$(()=>me(F,j,ee)))}function B(F,j,ee,me,de){const x=v(F,j);if(x)return x;const I=j===Ei,O=Wr?history.state:{};ee&&(me||I?i.replace(F.fullPath,ct({scroll:I&&O&&O.scroll},de)):i.push(F.fullPath,de)),l.value=F,U(F,j,ee,I),q()}let Y;function R(){Y||(Y=i.listen((F,j,ee)=>{if(!V.listening)return;const me=m(F),de=w(me);if(de){T(ct(de,{replace:!0,force:!0}),me).catch(eo);return}c=me;const x=l.value;Wr&&kv(Ff(x.fullPath,ee.delta),Ja()),E(me,x).catch(I=>ni(I,12)?I:ni(I,2)?(T(ct(y(I.to),{force:!0}),me).then(O=>{ni(O,20)&&!ee.delta&&ee.type===mo.pop&&i.go(-1,!1)}).catch(eo),Promise.reject()):(ee.delta&&i.go(-ee.delta,!1),J(I,me,x))).then(I=>{I=I||B(me,x,!1),I&&(ee.delta&&!ni(I,8)?i.go(-ee.delta,!1):ee.type===mo.pop&&ni(I,20)&&i.go(-1,!1)),C(me,x,I)}).catch(eo)}))}let ne=Fs(),H=Fs(),re;function J(F,j,ee){q(F);const me=H.list();return me.length?me.forEach(de=>de(F,j,ee)):console.error(F),Promise.reject(F)}function K(){return re&&l.value!==Ei?Promise.resolve():new Promise((F,j)=>{ne.add([F,j])})}function q(F){return re||(re=!F,R(),ne.list().forEach(([j,ee])=>F?ee(F):j()),ne.reset()),F}function U(F,j,ee,me){const{scrollBehavior:de}=n;if(!Wr||!de)return Promise.resolve();const x=!ee&&Gv(Ff(F.fullPath,0))||(me||!ee)&&history.state&&history.state.scroll||null;return Np().then(()=>de(F,j,x)).then(I=>I&&Bv(I)).catch(I=>J(I,F,j))}const X=F=>i.go(F);let le;const N=new Set,V={currentRoute:l,listening:!0,addRoute:d,removeRoute:g,clearRoutes:e.clearRoutes,hasRoute:p,getRoutes:_,resolve:m,options:n,push:M,replace:A,go:X,back:()=>X(-1),forward:()=>X(1),beforeEach:s.add,beforeResolve:o.add,afterEach:a.add,onError:H.add,isReady:K,install(F){const j=this;F.component("RouterLink",fx),F.component("RouterView",mx),F.config.globalProperties.$router=j,Object.defineProperty(F.config.globalProperties,"$route",{enumerable:!0,get:()=>Jr(l)}),Wr&&!le&&l.value===Ei&&(le=!0,M(i.location).catch(de=>{}));const ee={};for(const de in Ei)Object.defineProperty(ee,de,{get:()=>l.value[de],enumerable:!0});F.provide(yu,j),F.provide(xm,Ap(ee)),F.provide(Dc,l);const me=F.unmount;N.add(F),F.unmount=function(){N.delete(F),N.size<1&&(c=Ei,Y&&Y(),Y=null,l.value=Ei,le=!1,re=!1),me()}}};function oe(F){return F.reduce((j,ee)=>j.then(()=>$(ee)),Promise.resolve())}return V}function _x(n,e){const t=[],r=[],i=[],s=Math.max(e.matched.length,n.matched.length);for(let o=0;o<s;o++){const a=e.matched[o];a&&(n.matched.find(c=>ss(c,a))?r.push(a):t.push(a));const l=n.matched[o];l&&(e.matched.find(c=>ss(c,l))||i.push(l))}return[t,r,i]}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mu="162",Er={ROTATE:0,DOLLY:1,PAN:2},Tr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},vx=0,Zf=1,xx=2,ym=1,Mm=2,ci=3,gi=0,an=1,Un=2,Hi=0,Qr=1,Jf=2,$f=3,Qf=4,yx=5,cr=100,Mx=101,Sx=102,eh=103,th=104,bx=200,Ex=201,Tx=202,wx=203,Ic=204,Fc=205,Ax=206,Rx=207,Cx=208,Lx=209,Px=210,Ux=211,Dx=212,Ix=213,Fx=214,Nx=0,Ox=1,Bx=2,Ca=3,kx=4,Gx=5,zx=6,Hx=7,Sm=0,Vx=1,Wx=2,Vi=0,Xx=1,jx=2,Yx=3,bm=4,qx=5,Kx=6,Zx=7,nh="attached",Jx="detached",Em=300,as=301,ls=302,Nc=303,Oc=304,$a=306,cs=1e3,_n=1001,La=1002,Ut=1003,Bc=1004,Xr=1005,Pt=1006,ya=1007,fi=1008,Wi=1009,$x=1010,Qx=1011,Su=1012,Tm=1013,Bi=1014,Dn=1015,go=1016,wm=1017,Am=1018,pr=1020,ey=1021,vn=1023,ty=1024,ny=1025,mr=1026,us=1027,Rm=1028,Cm=1029,iy=1030,Lm=1031,Pm=1033,Rl=33776,Cl=33777,Ll=33778,Pl=33779,ih=35840,rh=35841,sh=35842,oh=35843,Um=36196,ah=37492,lh=37496,ch=37808,uh=37809,fh=37810,hh=37811,dh=37812,ph=37813,mh=37814,gh=37815,_h=37816,vh=37817,xh=37818,yh=37819,Mh=37820,Sh=37821,Ul=36492,bh=36494,Eh=36495,ry=36283,Th=36284,wh=36285,Ah=36286,_o=2300,fs=2301,Dl=2302,Rh=2400,Ch=2401,Lh=2402,sy=2500,oy=0,Dm=1,kc=2,ay=3200,Im=3201,Fm=0,ly=1,Oi="",qt="srgb",Nt="srgb-linear",bu="display-p3",Qa="display-p3-linear",Pa="linear",xt="srgb",Ua="rec709",Da="p3",wr=7680,Ph=519,cy=512,uy=513,fy=514,Nm=515,hy=516,dy=517,py=518,my=519,Gc=35044,Uh="300 es",zc=1035,hi=2e3,Ia=2001;class vi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const i=r.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dh=1234567;const no=Math.PI/180,hs=180/Math.PI;function kn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[r&255]+Gt[r>>8&255]+Gt[r>>16&255]+Gt[r>>24&255]).toLowerCase()}function It(n,e,t){return Math.max(e,Math.min(t,n))}function Eu(n,e){return(n%e+e)%e}function gy(n,e,t,r,i){return r+(n-e)*(i-r)/(t-e)}function _y(n,e,t){return n!==e?(t-n)/(e-n):0}function io(n,e,t){return(1-t)*n+t*e}function vy(n,e,t,r){return io(n,e,1-Math.exp(-t*r))}function xy(n,e=1){return e-Math.abs(Eu(n,e*2)-e)}function yy(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function My(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Sy(n,e){return n+Math.floor(Math.random()*(e-n+1))}function by(n,e){return n+Math.random()*(e-n)}function Ey(n){return n*(.5-Math.random())}function Ty(n){n!==void 0&&(Dh=n);let e=Dh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function wy(n){return n*no}function Ay(n){return n*hs}function Hc(n){return(n&n-1)===0&&n!==0}function Ry(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Fa(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Cy(n,e,t,r,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+r)/2),u=o((e+r)/2),f=s((e-r)/2),h=o((e-r)/2),d=s((r-e)/2),g=o((r-e)/2);switch(i){case"XYX":n.set(a*u,l*f,l*h,a*c);break;case"YZY":n.set(l*h,a*u,l*f,a*c);break;case"ZXZ":n.set(l*f,l*h,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*d,a*c);break;case"YXY":n.set(l*d,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*d,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function In(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ht(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Om={DEG2RAD:no,RAD2DEG:hs,generateUUID:kn,clamp:It,euclideanModulo:Eu,mapLinear:gy,inverseLerp:_y,lerp:io,damp:vy,pingpong:xy,smoothstep:yy,smootherstep:My,randInt:Sy,randFloat:by,randFloatSpread:Ey,seededRandom:Ty,degToRad:wy,radToDeg:Ay,isPowerOfTwo:Hc,ceilPowerOfTwo:Ry,floorPowerOfTwo:Fa,setQuaternionFromProperEuler:Cy,normalize:ht,denormalize:In};class Ce{constructor(e=0,t=0){Ce.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,i=e.elements;return this.x=i[0]*t+i[3]*r+i[6],this.y=i[1]*t+i[4]*r+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(It(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*r-o*i+e.x,this.y=s*i+o*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qe{constructor(e,t,r,i,s,o,a,l,c){Qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,i,s,o,a,l,c)}set(e,t,r,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=r,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,i=t.elements,s=this.elements,o=r[0],a=r[3],l=r[6],c=r[1],u=r[4],f=r[7],h=r[2],d=r[5],g=r[8],_=i[0],p=i[3],m=i[6],y=i[1],v=i[4],M=i[7],A=i[2],w=i[5],T=i[8];return s[0]=o*_+a*y+l*A,s[3]=o*p+a*v+l*w,s[6]=o*m+a*M+l*T,s[1]=c*_+u*y+f*A,s[4]=c*p+u*v+f*w,s[7]=c*m+u*M+f*T,s[2]=h*_+d*y+g*A,s[5]=h*p+d*v+g*w,s[8]=h*m+d*M+g*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-r*s*u+r*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],r=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,h=a*l-u*s,d=c*s-o*l,g=t*f+r*h+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=f*_,e[1]=(i*c-u*r)*_,e[2]=(a*r-i*o)*_,e[3]=h*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=d*_,e[7]=(r*l-c*t)*_,e[8]=(o*t-r*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(r*l,r*c,-r*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Il.makeScale(e,t)),this}rotate(e){return this.premultiply(Il.makeRotation(-e)),this}translate(e,t){return this.premultiply(Il.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let i=0;i<9;i++)if(t[i]!==r[i])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Il=new Qe;function Bm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function vo(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ly(){const n=vo("canvas");return n.style.display="block",n}const Ih={};function km(n){n in Ih||(Ih[n]=!0,console.warn(n))}const Fh=new Qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Nh=new Qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),No={[Nt]:{transfer:Pa,primaries:Ua,toReference:n=>n,fromReference:n=>n},[qt]:{transfer:xt,primaries:Ua,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Qa]:{transfer:Pa,primaries:Da,toReference:n=>n.applyMatrix3(Nh),fromReference:n=>n.applyMatrix3(Fh)},[bu]:{transfer:xt,primaries:Da,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Nh),fromReference:n=>n.applyMatrix3(Fh).convertLinearToSRGB()}},Py=new Set([Nt,Qa]),ut={enabled:!0,_workingColorSpace:Nt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Py.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const r=No[e].toReference,i=No[t].fromReference;return i(r(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return No[n].primaries},getTransfer:function(n){return n===Oi?Pa:No[n].transfer}};function es(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Fl(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ar;class Gm{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ar===void 0&&(Ar=vo("canvas")),Ar.width=e.width,Ar.height=e.height;const r=Ar.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=Ar}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=vo("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const i=r.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=es(s[o]/255)*255;return r.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(es(t[r]/255)*255):t[r]=es(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Uy=0;class zm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uy++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Nl(i[o].image)):s.push(Nl(i[o]))}else s=Nl(i);r.url=s}return t||(e.images[this.uuid]=r),r}}function Nl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Gm.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Dy=0;class wt extends vi{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,r=_n,i=_n,s=Pt,o=fi,a=vn,l=Wi,c=wt.DEFAULT_ANISOTROPY,u=Oi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Dy++}),this.uuid=kn(),this.name="",this.source=new zm(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ce(0,0),this.repeat=new Ce(1,1),this.center=new Ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Em)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cs:e.x=e.x-Math.floor(e.x);break;case _n:e.x=e.x<0?0:1;break;case La:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cs:e.y=e.y-Math.floor(e.y);break;case _n:e.y=e.y<0?0:1;break;case La:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=Em;wt.DEFAULT_ANISOTROPY=1;class pt{constructor(e=0,t=0,r=0,i=1){pt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,i){return this.x=e,this.y=t,this.z=r,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*r+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*r+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*r+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*r+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,i,s;const l=e.elements,c=l[0],u=l[4],f=l[8],h=l[1],d=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(f-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,M=(d+1)/2,A=(m+1)/2,w=(u+h)/4,T=(f+_)/4,P=(g+p)/4;return v>M&&v>A?v<.01?(r=0,i=.707106781,s=.707106781):(r=Math.sqrt(v),i=w/r,s=T/r):M>A?M<.01?(r=.707106781,i=0,s=.707106781):(i=Math.sqrt(M),r=w/i,s=P/i):A<.01?(r=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),r=T/s,i=P/s),this.set(r,i,s,t),this}let y=Math.sqrt((p-g)*(p-g)+(f-_)*(f-_)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(f-_)/y,this.z=(h-u)/y,this.w=Math.acos((c+d+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Iy extends vi{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t);const i={width:e,height:t,depth:1};r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},r);const s=new wt(i,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace);s.flipY=!1,s.generateMipmaps=r.generateMipmaps,s.internalFormat=r.internalFormat,this.textures=[];const o=r.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=r;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let r=0,i=e.textures.length;r<i;r++)this.textures[r]=e.textures[r].clone(),this.textures[r].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new zm(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vr extends Iy{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Hm extends wt{constructor(e=null,t=1,r=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fy extends wt{constructor(e=null,t=1,r=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:i},this.magFilter=Ut,this.minFilter=Ut,this.wrapR=_n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qn{constructor(e=0,t=0,r=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=i}static slerpFlat(e,t,r,i,s,o,a){let l=r[i+0],c=r[i+1],u=r[i+2],f=r[i+3];const h=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f;return}if(a===1){e[t+0]=h,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(f!==_||l!==h||c!==d||u!==g){let p=1-a;const m=l*h+c*d+u*g+f*_,y=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const A=Math.sqrt(v),w=Math.atan2(A,m*y);p=Math.sin(p*w)/A,a=Math.sin(a*w)/A}const M=a*y;if(l=l*p+h*M,c=c*p+d*M,u=u*p+g*M,f=f*p+_*M,p===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=A,c*=A,u*=A,f*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,r,i,s,o){const a=r[i],l=r[i+1],c=r[i+2],u=r[i+3],f=s[o],h=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*f+l*d-c*h,e[t+1]=l*g+u*h+c*f-a*d,e[t+2]=c*g+u*d+a*h-l*f,e[t+3]=u*g-a*f-l*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,i){return this._x=e,this._y=t,this._z=r,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(r/2),u=a(i/2),f=a(s/2),h=l(r/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"YXZ":this._x=h*u*f+c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"ZXY":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f-h*d*g;break;case"ZYX":this._x=h*u*f-c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f+h*d*g;break;case"YZX":this._x=h*u*f+c*d*g,this._y=c*d*f+h*u*g,this._z=c*u*g-h*d*f,this._w=c*u*f-h*d*g;break;case"XZY":this._x=h*u*f-c*d*g,this._y=c*d*f-h*u*g,this._z=c*u*g+h*d*f,this._w=c*u*f+h*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,i=Math.sin(r);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],f=t[10],h=r+a+f;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(r>a&&r>f){const d=2*Math.sqrt(1+r-a-f);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>f){const d=2*Math.sqrt(1+a-r-f);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+f-r-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const i=Math.min(1,t/r);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=r*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-r*c,this._z=s*u+o*c+r*l-i*a,this._w=o*u-r*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+r*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=r,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*r+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),f=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*f+this._w*h,this._x=r*f+this._x*h,this._y=i*f+this._y*h,this._z=s*f+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),i=Math.sqrt(1-r),s=Math.sqrt(r);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,r=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Oh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Oh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*r+s[6]*i,this.y=s[1]*t+s[4]*r+s[7]*i,this.z=s[2]*t+s[5]*r+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*r+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*r+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*r+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*r+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,r=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*r),u=2*(a*t-s*i),f=2*(s*r-o*t);return this.x=t+l*c+o*f-a*u,this.y=r+l*u+a*c-s*f,this.z=i+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*r+s[8]*i,this.y=s[1]*t+s[5]*r+s[9]*i,this.z=s[2]*t+s[6]*r+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-r*l,this.z=r*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return Ol.copy(this).projectOnVector(e),this.sub(Ol)}reflect(e){return this.sub(Ol.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(It(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,i=this.z-e.z;return t*t+r*r+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const i=Math.sin(t)*e;return this.x=i*Math.sin(r),this.y=Math.cos(t)*e,this.z=i*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ol=new D,Oh=new Qn;class zn{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const s=r.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(s,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Oo.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Oo.copy(r.boundingBox)),Oo.applyMatrix4(e.matrixWorld),this.union(Oo)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ns),Bo.subVectors(this.max,Ns),Rr.subVectors(e.a,Ns),Cr.subVectors(e.b,Ns),Lr.subVectors(e.c,Ns),Ti.subVectors(Cr,Rr),wi.subVectors(Lr,Cr),Qi.subVectors(Rr,Lr);let t=[0,-Ti.z,Ti.y,0,-wi.z,wi.y,0,-Qi.z,Qi.y,Ti.z,0,-Ti.x,wi.z,0,-wi.x,Qi.z,0,-Qi.x,-Ti.y,Ti.x,0,-wi.y,wi.x,0,-Qi.y,Qi.x,0];return!Bl(t,Rr,Cr,Lr,Bo)||(t=[1,0,0,0,1,0,0,0,1],!Bl(t,Rr,Cr,Lr,Bo))?!1:(ko.crossVectors(Ti,wi),t=[ko.x,ko.y,ko.z],Bl(t,Rr,Cr,Lr,Bo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ii=[new D,new D,new D,new D,new D,new D,new D,new D],An=new D,Oo=new zn,Rr=new D,Cr=new D,Lr=new D,Ti=new D,wi=new D,Qi=new D,Ns=new D,Bo=new D,ko=new D,er=new D;function Bl(n,e,t,r,i){for(let s=0,o=n.length-3;s<=o;s+=3){er.fromArray(n,s);const a=i.x*Math.abs(er.x)+i.y*Math.abs(er.y)+i.z*Math.abs(er.z),l=e.dot(er),c=t.dot(er),u=r.dot(er);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ny=new zn,Os=new D,kl=new D;class Hn{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):Ny.setFromPoints(e).getCenter(r);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,r.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Os.subVectors(e,this.center);const t=Os.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),i=(r-this.radius)*.5;this.center.addScaledVector(Os,i/r),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Os.copy(e.center).add(kl)),this.expandByPoint(Os.copy(e.center).sub(kl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ri=new D,Gl=new D,Go=new D,Ai=new D,zl=new D,zo=new D,Hl=new D;class _s{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ri.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,t),ri.distanceToSquared(e))}distanceSqToSegment(e,t,r,i){Gl.copy(e).add(t).multiplyScalar(.5),Go.copy(t).sub(e).normalize(),Ai.copy(this.origin).sub(Gl);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Go),a=Ai.dot(this.direction),l=-Ai.dot(Go),c=Ai.lengthSq(),u=Math.abs(1-o*o);let f,h,d,g;if(u>0)if(f=o*l-a,h=o*a-l,g=s*u,f>=0)if(h>=-g)if(h<=g){const _=1/u;f*=_,h*=_,d=f*(f+o*h+2*a)+h*(o*f+h+2*l)+c}else h=s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h=-s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;else h<=-g?(f=Math.max(0,-(-o*s+a)),h=f>0?-s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c):h<=g?(f=0,h=Math.min(Math.max(-s,-l),s),d=h*(h+2*l)+c):(f=Math.max(0,-(o*s+a)),h=f>0?s:Math.min(Math.max(-s,-l),s),d=-f*f+h*(h+2*l)+c);else h=o>0?-s:s,f=Math.max(0,-(o*h+a)),d=-f*f+h*(h+2*l)+c;return r&&r.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Gl).addScaledVector(Go,h),d}intersectSphere(e,t){ri.subVectors(e.center,this.origin);const r=ri.dot(this.direction),i=ri.dot(ri)-r*r,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=r-o,l=r+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return c>=0?(r=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(r=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(s=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(s=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),r>o||s>i||((s>r||isNaN(r))&&(r=s),(o<i||isNaN(i))&&(i=o),f>=0?(a=(e.min.z-h.z)*f,l=(e.max.z-h.z)*f):(a=(e.max.z-h.z)*f,l=(e.min.z-h.z)*f),r>l||a>i)||((a>r||r!==r)&&(r=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(r>=0?r:i,t)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,t,r,i,s){zl.subVectors(t,e),zo.subVectors(r,e),Hl.crossVectors(zl,zo);let o=this.direction.dot(Hl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ai.subVectors(this.origin,e);const l=a*this.direction.dot(zo.crossVectors(Ai,zo));if(l<0)return null;const c=a*this.direction.dot(zl.cross(Ai));if(c<0||l+c>o)return null;const u=-a*Ai.dot(Hl);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Je{constructor(e,t,r,i,s,o,a,l,c,u,f,h,d,g,_,p){Je.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,i,s,o,a,l,c,u,f,h,d,g,_,p)}set(e,t,r,i,s,o,a,l,c,u,f,h,d,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=r,m[12]=i,m[1]=s,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=f,m[14]=h,m[3]=d,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Je().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,i=1/Pr.setFromMatrixColumn(e,0).length(),s=1/Pr.setFromMatrixColumn(e,1).length(),o=1/Pr.setFromMatrixColumn(e,2).length();return t[0]=r[0]*i,t[1]=r[1]*i,t[2]=r[2]*i,t[3]=0,t[4]=r[4]*s,t[5]=r[5]*s,t[6]=r[6]*s,t[7]=0,t[8]=r[8]*o,t[9]=r[9]*o,t[10]=r[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,i=e.y,s=e.z,o=Math.cos(r),a=Math.sin(r),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=-l*f,t[8]=c,t[1]=d+g*c,t[5]=h-_*c,t[9]=-a*l,t[2]=_-h*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*f,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,d=l*f,g=c*u,_=c*f;t[0]=h-_*a,t[4]=-o*f,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,d=o*f,g=a*u,_=a*f;t[0]=l*u,t[4]=g*c-d,t[8]=h*c+_,t[1]=l*f,t[5]=_*c+h,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-h*f,t[8]=g*f+d,t[1]=f,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*f+g,t[10]=h-_*f}else if(e.order==="XZY"){const h=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-f,t[8]=c*u,t[1]=h*f+_,t[5]=o*u,t[9]=d*f-g,t[2]=g*f-d,t[6]=a*u,t[10]=_*f+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Oy,e,By)}lookAt(e,t,r){const i=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Ri.crossVectors(r,hn),Ri.lengthSq()===0&&(Math.abs(r.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Ri.crossVectors(r,hn)),Ri.normalize(),Ho.crossVectors(hn,Ri),i[0]=Ri.x,i[4]=Ho.x,i[8]=hn.x,i[1]=Ri.y,i[5]=Ho.y,i[9]=hn.y,i[2]=Ri.z,i[6]=Ho.z,i[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,i=t.elements,s=this.elements,o=r[0],a=r[4],l=r[8],c=r[12],u=r[1],f=r[5],h=r[9],d=r[13],g=r[2],_=r[6],p=r[10],m=r[14],y=r[3],v=r[7],M=r[11],A=r[15],w=i[0],T=i[4],P=i[8],$=i[12],E=i[1],C=i[5],B=i[9],Y=i[13],R=i[2],ne=i[6],H=i[10],re=i[14],J=i[3],K=i[7],q=i[11],U=i[15];return s[0]=o*w+a*E+l*R+c*J,s[4]=o*T+a*C+l*ne+c*K,s[8]=o*P+a*B+l*H+c*q,s[12]=o*$+a*Y+l*re+c*U,s[1]=u*w+f*E+h*R+d*J,s[5]=u*T+f*C+h*ne+d*K,s[9]=u*P+f*B+h*H+d*q,s[13]=u*$+f*Y+h*re+d*U,s[2]=g*w+_*E+p*R+m*J,s[6]=g*T+_*C+p*ne+m*K,s[10]=g*P+_*B+p*H+m*q,s[14]=g*$+_*Y+p*re+m*U,s[3]=y*w+v*E+M*R+A*J,s[7]=y*T+v*C+M*ne+A*K,s[11]=y*P+v*B+M*H+A*q,s[15]=y*$+v*Y+M*re+A*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],h=e[10],d=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+s*l*f-i*c*f-s*a*h+r*c*h+i*a*d-r*l*d)+_*(+t*l*d-t*c*h+s*o*h-i*o*d+i*c*u-s*l*u)+p*(+t*c*f-t*a*d-s*o*f+r*o*d+s*a*u-r*c*u)+m*(-i*a*u-t*l*f+t*a*h+i*o*f-r*o*h+r*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],h=e[10],d=e[11],g=e[12],_=e[13],p=e[14],m=e[15],y=f*p*c-_*h*c+_*l*d-a*p*d-f*l*m+a*h*m,v=g*h*c-u*p*c-g*l*d+o*p*d+u*l*m-o*h*m,M=u*_*c-g*f*c+g*a*d-o*_*d-u*a*m+o*f*m,A=g*f*l-u*_*l-g*a*h+o*_*h+u*a*p-o*f*p,w=t*y+r*v+i*M+s*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/w;return e[0]=y*T,e[1]=(_*h*s-f*p*s-_*i*d+r*p*d+f*i*m-r*h*m)*T,e[2]=(a*p*s-_*l*s+_*i*c-r*p*c-a*i*m+r*l*m)*T,e[3]=(f*l*s-a*h*s-f*i*c+r*h*c+a*i*d-r*l*d)*T,e[4]=v*T,e[5]=(u*p*s-g*h*s+g*i*d-t*p*d-u*i*m+t*h*m)*T,e[6]=(g*l*s-o*p*s-g*i*c+t*p*c+o*i*m-t*l*m)*T,e[7]=(o*h*s-u*l*s+u*i*c-t*h*c-o*i*d+t*l*d)*T,e[8]=M*T,e[9]=(g*f*s-u*_*s-g*r*d+t*_*d+u*r*m-t*f*m)*T,e[10]=(o*_*s-g*a*s+g*r*c-t*_*c-o*r*m+t*a*m)*T,e[11]=(u*a*s-o*f*s-u*r*c+t*f*c+o*r*d-t*a*d)*T,e[12]=A*T,e[13]=(u*_*i-g*f*i+g*r*h-t*_*h-u*r*p+t*f*p)*T,e[14]=(g*a*i-o*_*i-g*r*l+t*_*l+o*r*p-t*a*p)*T,e[15]=(o*f*i-u*a*i+u*r*l-t*f*l-o*r*h+t*a*h)*T,this}scale(e){const t=this.elements,r=e.x,i=e.y,s=e.z;return t[0]*=r,t[4]*=i,t[8]*=s,t[1]*=r,t[5]*=i,t[9]*=s,t[2]*=r,t[6]*=i,t[10]*=s,t[3]*=r,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,i))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),i=Math.sin(t),s=1-r,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+r,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+r,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,i,s,o){return this.set(1,r,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,r){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,f=a+a,h=s*c,d=s*u,g=s*f,_=o*u,p=o*f,m=a*f,y=l*c,v=l*u,M=l*f,A=r.x,w=r.y,T=r.z;return i[0]=(1-(_+m))*A,i[1]=(d+M)*A,i[2]=(g-v)*A,i[3]=0,i[4]=(d-M)*w,i[5]=(1-(h+m))*w,i[6]=(p+y)*w,i[7]=0,i[8]=(g+v)*T,i[9]=(p-y)*T,i[10]=(1-(h+_))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,r){const i=this.elements;let s=Pr.set(i[0],i[1],i[2]).length();const o=Pr.set(i[4],i[5],i[6]).length(),a=Pr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Rn.copy(this);const c=1/s,u=1/o,f=1/a;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=f,Rn.elements[9]*=f,Rn.elements[10]*=f,t.setFromRotationMatrix(Rn),r.x=s,r.y=o,r.z=a,this}makePerspective(e,t,r,i,s,o,a=hi){const l=this.elements,c=2*s/(t-e),u=2*s/(r-i),f=(t+e)/(t-e),h=(r+i)/(r-i);let d,g;if(a===hi)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Ia)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,r,i,s,o,a=hi){const l=this.elements,c=1/(t-e),u=1/(r-i),f=1/(o-s),h=(t+e)*c,d=(r+i)*u;let g,_;if(a===hi)g=(o+s)*f,_=-2*f;else if(a===Ia)g=s*f,_=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let i=0;i<16;i++)if(t[i]!==r[i])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const Pr=new D,Rn=new Je,Oy=new D(0,0,0),By=new D(1,1,1),Ri=new D,Ho=new D,hn=new D,Bh=new Je,kh=new Qn;class ei{constructor(e=0,t=0,r=0,i=ei.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,i=this._order){return this._x=e,this._y=t,this._z=r,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],f=i[2],h=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(It(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-It(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(It(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-It(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(It(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return Bh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bh,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kh.setFromEuler(this),this.setFromQuaternion(kh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ei.DEFAULT_ORDER="XYZ";class Tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ky=0;const Gh=new D,Ur=new Qn,si=new Je,Vo=new D,Bs=new D,Gy=new D,zy=new Qn,zh=new D(1,0,0),Hh=new D(0,1,0),Vh=new D(0,0,1),Hy={type:"added"},Vy={type:"removed"},Vl={type:"childadded",child:null},Wl={type:"childremoved",child:null};class St extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ky++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new D,t=new ei,r=new Qn,i=new D(1,1,1);function s(){r.setFromEuler(t,!1)}function o(){t.setFromQuaternion(r,void 0,!1)}t._onChange(s),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Je},normalMatrix:{value:new Qe}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.multiply(Ur),this}rotateOnWorldAxis(e,t){return Ur.setFromAxisAngle(e,t),this.quaternion.premultiply(Ur),this}rotateX(e){return this.rotateOnAxis(zh,e)}rotateY(e){return this.rotateOnAxis(Hh,e)}rotateZ(e){return this.rotateOnAxis(Vh,e)}translateOnAxis(e,t){return Gh.copy(e).applyQuaternion(this.quaternion),this.position.add(Gh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zh,e)}translateY(e){return this.translateOnAxis(Hh,e)}translateZ(e){return this.translateOnAxis(Vh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Vo.copy(e):Vo.set(e,t,r);const i=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(Bs,Vo,this.up):si.lookAt(Vo,Bs,this.up),this.quaternion.setFromRotationMatrix(si),i&&(si.extractRotation(i.matrixWorld),Ur.setFromRotationMatrix(si),this.quaternion.premultiply(Ur.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Hy),Vl.child=e,this.dispatchEvent(Vl),Vl.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vy),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,i=this.children.length;r<i;r++){const o=this.children[r].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,e,Gy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,zy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,i=t.length;r<i;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,i=t.length;r<i;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,i=t.length;r<i;r++){const s=t[r];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),h=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(r.geometries=a),l.length>0&&(r.materials=l),c.length>0&&(r.textures=c),u.length>0&&(r.images=u),f.length>0&&(r.shapes=f),h.length>0&&(r.skeletons=h),d.length>0&&(r.animations=d),g.length>0&&(r.nodes=g)}return r.object=i,r;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const i=e.children[r];this.add(i.clone())}return this}}St.DEFAULT_UP=new D(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Cn=new D,oi=new D,Xl=new D,ai=new D,Dr=new D,Ir=new D,Wh=new D,jl=new D,Yl=new D,ql=new D;class Zn{constructor(e=new D,t=new D,r=new D){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,i){i.subVectors(r,t),Cn.subVectors(e,t),i.cross(Cn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,r,i,s){Cn.subVectors(i,t),oi.subVectors(r,t),Xl.subVectors(e,t);const o=Cn.dot(Cn),a=Cn.dot(oi),l=Cn.dot(Xl),c=oi.dot(oi),u=oi.dot(Xl),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const h=1/f,d=(c*l-a*u)*h,g=(o*u-a*l)*h;return s.set(1-d-g,g,d)}static containsPoint(e,t,r,i){return this.getBarycoord(e,t,r,i,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,t,r,i,s,o,a,l){return this.getBarycoord(e,t,r,i,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ai.x),l.addScaledVector(o,ai.y),l.addScaledVector(a,ai.z),l)}static isFrontFacing(e,t,r,i){return Cn.subVectors(r,t),oi.subVectors(e,t),Cn.cross(oi).dot(i)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,i){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,r,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Cn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Zn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Zn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,i,s){return Zn.getInterpolation(e,this.a,this.b,this.c,t,r,i,s)}containsPoint(e){return Zn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Zn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,i=this.b,s=this.c;let o,a;Dr.subVectors(i,r),Ir.subVectors(s,r),jl.subVectors(e,r);const l=Dr.dot(jl),c=Ir.dot(jl);if(l<=0&&c<=0)return t.copy(r);Yl.subVectors(e,i);const u=Dr.dot(Yl),f=Ir.dot(Yl);if(u>=0&&f<=u)return t.copy(i);const h=l*f-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(r).addScaledVector(Dr,o);ql.subVectors(e,s);const d=Dr.dot(ql),g=Ir.dot(ql);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(r).addScaledVector(Ir,a);const p=u*g-d*f;if(p<=0&&f-u>=0&&d-g>=0)return Wh.subVectors(s,i),a=(f-u)/(f-u+(d-g)),t.copy(i).addScaledVector(Wh,a);const m=1/(p+_+h);return o=_*m,a=h*m,t.copy(r).addScaledVector(Dr,o).addScaledVector(Ir,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},Wo={h:0,s:0,l:0};function Kl(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class Ue{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=qt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ut.toWorkingColorSpace(this,t),this}setRGB(e,t,r,i=ut.workingColorSpace){return this.r=e,this.g=t,this.b=r,ut.toWorkingColorSpace(this,i),this}setHSL(e,t,r,i=ut.workingColorSpace){if(e=Eu(e,1),t=It(t,0,1),r=It(r,0,1),t===0)this.r=this.g=this.b=r;else{const s=r<=.5?r*(1+t):r+t-r*t,o=2*r-s;this.r=Kl(o,s,e+1/3),this.g=Kl(o,s,e),this.b=Kl(o,s,e-1/3)}return ut.toWorkingColorSpace(this,i),this}setStyle(e,t=qt){function r(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return r(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return r(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return r(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=qt){const r=Vm[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=es(e.r),this.g=es(e.g),this.b=es(e.b),this}copyLinearToSRGB(e){return this.r=Fl(e.r),this.g=Fl(e.g),this.b=Fl(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=qt){return ut.fromWorkingColorSpace(zt.copy(this),e),Math.round(It(zt.r*255,0,255))*65536+Math.round(It(zt.g*255,0,255))*256+Math.round(It(zt.b*255,0,255))}getHexString(e=qt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ut.workingColorSpace){ut.fromWorkingColorSpace(zt.copy(this),t);const r=zt.r,i=zt.g,s=zt.b,o=Math.max(r,i,s),a=Math.min(r,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case r:l=(i-s)/f+(i<s?6:0);break;case i:l=(s-r)/f+2;break;case s:l=(r-i)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ut.workingColorSpace){return ut.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=qt){ut.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,r=zt.g,i=zt.b;return e!==qt?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(i*255)})`}offsetHSL(e,t,r){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+t,Ci.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Ci),e.getHSL(Wo);const r=io(Ci.h,Wo.h,t),i=io(Ci.s,Wo.s,t),s=io(Ci.l,Wo.l,t);return this.setHSL(r,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*r+s[6]*i,this.g=s[1]*t+s[4]*r+s[7]*i,this.b=s[2]*t+s[5]*r+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new Ue;Ue.NAMES=Vm;let Wy=0;class Jn extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wy++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=Qr,this.side=gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Fc,this.blendEquation=cr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=Ca,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ph,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wr,this.stencilZFail=wr,this.stencilZPass=wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(r):i&&i.isVector3&&r&&r.isVector3?i.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Qr&&(r.blending=this.blending),this.side!==gi&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Ic&&(r.blendSrc=this.blendSrc),this.blendDst!==Fc&&(r.blendDst=this.blendDst),this.blendEquation!==cr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==Ca&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ph&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wr&&(r.stencilFail=this.stencilFail),this.stencilZFail!==wr&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==wr&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(r.textures=s),o.length>0&&(r.images=o)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const i=t.length;r=new Array(i);for(let s=0;s!==i;++s)r[s]=t[s].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class rt extends Jn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.combine=Sm,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new D,Xo=new Ce;class Jt{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Gc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return km("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[r+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Xo.fromBufferAttribute(this,t),Xo.applyMatrix3(e),this.setXY(t,Xo.x,Xo.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=In(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=ht(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=In(t,this.array)),t}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=In(t,this.array)),t}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=In(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=In(t,this.array)),t}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),r=ht(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,i){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),r=ht(r,this.array),i=ht(i,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=i,this}setXYZW(e,t,r,i,s){return e*=this.itemSize,this.normalized&&(t=ht(t,this.array),r=ht(r,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Gc&&(e.usage=this.usage),e}}class Wm extends Jt{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Xm extends Jt{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class yn extends Jt{constructor(e,t,r){super(new Float32Array(e),t,r)}}let Xy=0;const pn=new Je,Zl=new St,Fr=new D,dn=new zn,ks=new zn,Lt=new D;class Mn extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bm(e)?Xm:Wm)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const s=new Qe().getNormalMatrix(e);r.applyNormalMatrix(s),r.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return pn.makeRotationFromQuaternion(e),this.applyMatrix4(pn),this}rotateX(e){return pn.makeRotationX(e),this.applyMatrix4(pn),this}rotateY(e){return pn.makeRotationY(e),this.applyMatrix4(pn),this}rotateZ(e){return pn.makeRotationZ(e),this.applyMatrix4(pn),this}translate(e,t,r){return pn.makeTranslation(e,t,r),this.applyMatrix4(pn),this}scale(e,t,r){return pn.makeScale(e,t,r),this.applyMatrix4(pn),this}lookAt(e){return Zl.lookAt(e),Zl.updateMatrix(),this.applyMatrix4(Zl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fr).negate(),this.translate(Fr.x,Fr.y,Fr.z),this}setFromPoints(e){const t=[];for(let r=0,i=e.length;r<i;r++){const s=e[r];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new yn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,i=t.length;r<i;r++){const s=t[r];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(Lt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(Lt),Lt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(Lt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const r=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];ks.setFromBufferAttribute(a),this.morphTargetsRelative?(Lt.addVectors(dn.min,ks.min),dn.expandByPoint(Lt),Lt.addVectors(dn.max,ks.max),dn.expandByPoint(Lt)):(dn.expandByPoint(ks.min),dn.expandByPoint(ks.max))}dn.getCenter(r);let i=0;for(let s=0,o=e.count;s<o;s++)Lt.fromBufferAttribute(e,s),i=Math.max(i,r.distanceToSquared(Lt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Lt.fromBufferAttribute(a,c),l&&(Fr.fromBufferAttribute(e,c),Lt.add(Fr)),i=Math.max(i,r.distanceToSquared(Lt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*r.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<r.count;P++)a[P]=new D,l[P]=new D;const c=new D,u=new D,f=new D,h=new Ce,d=new Ce,g=new Ce,_=new D,p=new D;function m(P,$,E){c.fromBufferAttribute(r,P),u.fromBufferAttribute(r,$),f.fromBufferAttribute(r,E),h.fromBufferAttribute(s,P),d.fromBufferAttribute(s,$),g.fromBufferAttribute(s,E),u.sub(c),f.sub(c),d.sub(h),g.sub(h);const C=1/(d.x*g.y-g.x*d.y);isFinite(C)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(f,-d.y).multiplyScalar(C),p.copy(f).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(C),a[P].add(_),a[$].add(_),a[E].add(_),l[P].add(p),l[$].add(p),l[E].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let P=0,$=y.length;P<$;++P){const E=y[P],C=E.start,B=E.count;for(let Y=C,R=C+B;Y<R;Y+=3)m(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const v=new D,M=new D,A=new D,w=new D;function T(P){A.fromBufferAttribute(i,P),w.copy(A);const $=a[P];v.copy($),v.sub(A.multiplyScalar(A.dot($))).normalize(),M.crossVectors(w,$);const C=M.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,C)}for(let P=0,$=y.length;P<$;++P){const E=y[P],C=E.start,B=E.count;for(let Y=C,R=C+B;Y<R;Y+=3)T(e.getX(Y+0)),T(e.getX(Y+1)),T(e.getX(Y+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let h=0,d=r.count;h<d;h++)r.setXYZ(h,0,0,0);const i=new D,s=new D,o=new D,a=new D,l=new D,c=new D,u=new D,f=new D;if(e)for(let h=0,d=e.count;h<d;h+=3){const g=e.getX(h+0),_=e.getX(h+1),p=e.getX(h+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),u.subVectors(o,s),f.subVectors(i,s),u.cross(f),a.fromBufferAttribute(r,g),l.fromBufferAttribute(r,_),c.fromBufferAttribute(r,p),a.add(u),l.add(u),c.add(u),r.setXYZ(g,a.x,a.y,a.z),r.setXYZ(_,l.x,l.y,l.z),r.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)i.fromBufferAttribute(t,h+0),s.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,s),f.subVectors(i,s),u.cross(f),r.setXYZ(h+0,u.x,u.y,u.z),r.setXYZ(h+1,u.x,u.y,u.z),r.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)Lt.fromBufferAttribute(e,t),Lt.normalize(),e.setXYZ(t,Lt.x,Lt.y,Lt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,h=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let m=0;m<u;m++)h[g++]=c[d++]}return new Jt(h,u,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mn,r=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,r);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const h=c[u],d=e(h,r);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const l in r){const c=r[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,h=c.length;f<h;f++){const d=c[f];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let h=0,d=f.length;h<d;h++)u.push(f[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xh=new Je,tr=new _s,jo=new Hn,jh=new D,Nr=new D,Or=new D,Br=new D,Jl=new D,Yo=new D,qo=new Ce,Ko=new Ce,Zo=new Ce,Yh=new D,qh=new D,Kh=new D,Jo=new D,$o=new D;class at extends St{constructor(e=new Mn,t=new rt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const i=t[r[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const r=this.geometry,i=r.attributes.position,s=r.morphAttributes.position,o=r.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Yo.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Jl.fromBufferAttribute(f,e),o?Yo.addScaledVector(Jl,u):Yo.addScaledVector(Jl.sub(t),u))}t.add(Yo)}return t}raycast(e,t){const r=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),jo.copy(r.boundingSphere),jo.applyMatrix4(s),tr.copy(e.ray).recast(e.near),!(jo.containsPoint(tr.origin)===!1&&(tr.intersectSphere(jo,jh)===null||tr.origin.distanceToSquared(jh)>(e.far-e.near)**2))&&(Xh.copy(s).invert(),tr.copy(e.ray).applyMatrix4(Xh),!(r.boundingBox!==null&&tr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,tr)))}_computeIntersections(e,t,r){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const p=h[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let M=y,A=v;M<A;M+=3){const w=a.getX(M),T=a.getX(M+1),P=a.getX(M+2);i=Qo(this,m,e,r,c,u,f,w,T,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=a.getX(p),v=a.getX(p+1),M=a.getX(p+2);i=Qo(this,o,e,r,c,u,f,y,v,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=h.length;g<_;g++){const p=h[g],m=o[p.materialIndex],y=Math.max(p.start,d.start),v=Math.min(l.count,Math.min(p.start+p.count,d.start+d.count));for(let M=y,A=v;M<A;M+=3){const w=M,T=M+1,P=M+2;i=Qo(this,m,e,r,c,u,f,w,T,P),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=p.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let p=g,m=_;p<m;p+=3){const y=p,v=p+1,M=p+2;i=Qo(this,o,e,r,c,u,f,y,v,M),i&&(i.faceIndex=Math.floor(p/3),t.push(i))}}}}function jy(n,e,t,r,i,s,o,a){let l;if(e.side===an?l=r.intersectTriangle(o,s,i,!0,a):l=r.intersectTriangle(i,s,o,e.side===gi,a),l===null)return null;$o.copy(a),$o.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo($o);return c<t.near||c>t.far?null:{distance:c,point:$o.clone(),object:n}}function Qo(n,e,t,r,i,s,o,a,l,c){n.getVertexPosition(a,Nr),n.getVertexPosition(l,Or),n.getVertexPosition(c,Br);const u=jy(n,e,t,r,Nr,Or,Br,Jo);if(u){i&&(qo.fromBufferAttribute(i,a),Ko.fromBufferAttribute(i,l),Zo.fromBufferAttribute(i,c),u.uv=Zn.getInterpolation(Jo,Nr,Or,Br,qo,Ko,Zo,new Ce)),s&&(qo.fromBufferAttribute(s,a),Ko.fromBufferAttribute(s,l),Zo.fromBufferAttribute(s,c),u.uv1=Zn.getInterpolation(Jo,Nr,Or,Br,qo,Ko,Zo,new Ce)),o&&(Yh.fromBufferAttribute(o,a),qh.fromBufferAttribute(o,l),Kh.fromBufferAttribute(o,c),u.normal=Zn.getInterpolation(Jo,Nr,Or,Br,Yh,qh,Kh,new D),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new D,materialIndex:0};Zn.getNormal(Nr,Or,Br,f.normal),u.face=f}return u}class vs extends Mn{constructor(e=1,t=1,r=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let h=0,d=0;g("z","y","x",-1,-1,r,t,e,o,s,0),g("z","y","x",1,-1,r,t,-e,o,s,1),g("x","z","y",1,1,e,r,t,i,o,2),g("x","z","y",1,-1,e,r,-t,i,o,3),g("x","y","z",1,-1,e,t,r,i,s,4),g("x","y","z",-1,-1,e,t,-r,i,s,5),this.setIndex(l),this.setAttribute("position",new yn(c,3)),this.setAttribute("normal",new yn(u,3)),this.setAttribute("uv",new yn(f,2));function g(_,p,m,y,v,M,A,w,T,P,$){const E=M/T,C=A/P,B=M/2,Y=A/2,R=w/2,ne=T+1,H=P+1;let re=0,J=0;const K=new D;for(let q=0;q<H;q++){const U=q*C-Y;for(let X=0;X<ne;X++){const le=X*E-B;K[_]=le*y,K[p]=U*v,K[m]=R,c.push(K.x,K.y,K.z),K[_]=0,K[p]=0,K[m]=w>0?1:-1,u.push(K.x,K.y,K.z),f.push(X/T),f.push(1-q/P),re+=1}}for(let q=0;q<P;q++)for(let U=0;U<T;U++){const X=h+U+ne*q,le=h+U+ne*(q+1),N=h+(U+1)+ne*(q+1),V=h+(U+1)+ne*q;l.push(X,le,V),l.push(le,N,V),J+=6}a.addGroup(d,J,$),d+=J,h+=re}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ds(n){const e={};for(const t in n){e[t]={};for(const r in n[t]){const i=n[t][r];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=i.clone():Array.isArray(i)?e[t][r]=i.slice():e[t][r]=i}}return e}function Yt(n){const e={};for(let t=0;t<n.length;t++){const r=ds(n[t]);for(const i in r)e[i]=r[i]}return e}function Yy(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function jm(n){return n.getRenderTarget()===null?n.outputColorSpace:ut.workingColorSpace}const Ym={clone:ds,merge:Yt};var qy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ky=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ji extends Jn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qy,this.fragmentShader=Ky,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=Yy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const i in this.extensions)this.extensions[i]===!0&&(r[i]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class qm extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=hi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Li=new D,Zh=new Ce,Jh=new Ce;class Kt extends qm{constructor(e=50,t=1,r=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(no*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(no*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Li.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Li.x,Li.y).multiplyScalar(-e/Li.z),Li.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Li.x,Li.y).multiplyScalar(-e/Li.z)}getViewSize(e,t){return this.getViewBounds(e,Zh,Jh),t.subVectors(Jh,Zh)}setViewOffset(e,t,r,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(no*.5*this.fov)/this.zoom,r=2*t,i=this.aspect*r,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*r/c,i*=o.width/l,r*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const kr=-90,Gr=1;class Zy extends St{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Kt(kr,Gr,e,t);i.layers=this.layers,this.add(i);const s=new Kt(kr,Gr,e,t);s.layers=this.layers,this.add(s);const o=new Kt(kr,Gr,e,t);o.layers=this.layers,this.add(o);const a=new Kt(kr,Gr,e,t);a.layers=this.layers,this.add(a);const l=new Kt(kr,Gr,e,t);l.layers=this.layers,this.add(l);const c=new Kt(kr,Gr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===hi)r.up.set(0,1,0),r.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ia)r.up.set(0,-1,0),r.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,i),e.render(t,s),e.setRenderTarget(r,1,i),e.render(t,o),e.setRenderTarget(r,2,i),e.render(t,a),e.setRenderTarget(r,3,i),e.render(t,l),e.setRenderTarget(r,4,i),e.render(t,c),r.texture.generateMipmaps=_,e.setRenderTarget(r,5,i),e.render(t,u),e.setRenderTarget(f,h,d),e.xr.enabled=g,r.texture.needsPMREMUpdate=!0}}class Km extends wt{constructor(e,t,r,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:as,super(e,t,r,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Jy extends vr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},i=[r,r,r,r,r,r];this.texture=new Km(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Pt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vs(5,5,5),s=new ji({name:"CubemapFromEquirect",uniforms:ds(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:an,blending:Hi});s.uniforms.tEquirect.value=t;const o=new at(i,s),a=t.minFilter;return t.minFilter===fi&&(t.minFilter=Pt),new Zy(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,r,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,r,i);e.setRenderTarget(s)}}const $l=new D,$y=new D,Qy=new Qe;class ui{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,i){return this.normal.set(e,t,r),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const i=$l.subVectors(r,t).cross($y.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta($l),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(r,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||Qy.getNormalMatrix(e),i=this.coplanarPoint($l).applyMatrix4(e),s=this.normal.applyMatrix3(r).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const nr=new Hn,ea=new D;class wu{constructor(e=new ui,t=new ui,r=new ui,i=new ui,s=new ui,o=new ui){this.planes=[e,t,r,i,s,o]}set(e,t,r,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(r),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=hi){const r=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],f=i[6],h=i[7],d=i[8],g=i[9],_=i[10],p=i[11],m=i[12],y=i[13],v=i[14],M=i[15];if(r[0].setComponents(l-s,h-c,p-d,M-m).normalize(),r[1].setComponents(l+s,h+c,p+d,M+m).normalize(),r[2].setComponents(l+o,h+u,p+g,M+y).normalize(),r[3].setComponents(l-o,h-u,p-g,M-y).normalize(),r[4].setComponents(l-a,h-f,p-_,M-v).normalize(),t===hi)r[5].setComponents(l+a,h+f,p+_,M+v).normalize();else if(t===Ia)r[5].setComponents(a,f,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(nr)}intersectsSprite(e){return nr.center.set(0,0,0),nr.radius=.7071067811865476,nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(nr)}intersectsSphere(e){const t=this.planes,r=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(r)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const i=t[r];if(ea.x=i.normal.x>0?e.max.x:e.min.x,ea.y=i.normal.y>0?e.max.y:e.min.y,ea.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ea)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zm(){let n=null,e=!1,t=null,r=null;function i(s,o){t(s,o),r=n.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(r=n.requestAnimationFrame(i),e=!0)},stop:function(){n.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function eM(n,e){const t=e.isWebGL2,r=new WeakMap;function i(c,u){const f=c.array,h=c.usage,d=f.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,f,h),c.onUploadCallback();let _;if(f instanceof Float32Array)_=n.FLOAT;else if(f instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(f instanceof Int16Array)_=n.SHORT;else if(f instanceof Uint32Array)_=n.UNSIGNED_INT;else if(f instanceof Int32Array)_=n.INT;else if(f instanceof Int8Array)_=n.BYTE;else if(f instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(f instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+f);return{buffer:g,type:_,bytesPerElement:f.BYTES_PER_ELEMENT,version:c.version,size:d}}function s(c,u,f){const h=u.array,d=u._updateRange,g=u.updateRanges;if(n.bindBuffer(f,c),d.count===-1&&g.length===0&&n.bufferSubData(f,0,h),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];t?n.bufferSubData(f,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count):n.bufferSubData(f,m.start*h.BYTES_PER_ELEMENT,h.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}d.count!==-1&&(t?n.bufferSubData(f,d.offset*h.BYTES_PER_ELEMENT,h,d.offset,d.count):n.bufferSubData(f,d.offset*h.BYTES_PER_ELEMENT,h.subarray(d.offset,d.offset+d.count)),d.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),r.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=r.get(c);u&&(n.deleteBuffer(u.buffer),r.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const h=r.get(c);(!h||h.version<c.version)&&r.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const f=r.get(c);if(f===void 0)r.set(c,i(c,u));else if(f.version<c.version){if(f.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(f.buffer,c,u),f.version=c.version}}return{get:o,remove:a,update:l}}class je extends Mn{constructor(e=1,t=1,r=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(r),l=Math.floor(i),c=a+1,u=l+1,f=e/a,h=t/l,d=[],g=[],_=[],p=[];for(let m=0;m<u;m++){const y=m*h-o;for(let v=0;v<c;v++){const M=v*f-s;g.push(M,-y,0),_.push(0,0,1),p.push(v/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){const v=y+c*m,M=y+c*(m+1),A=y+1+c*(m+1),w=y+1+c*m;d.push(v,M,w),d.push(M,A,w)}this.setIndex(d),this.setAttribute("position",new yn(g,3)),this.setAttribute("normal",new yn(_,3)),this.setAttribute("uv",new yn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new je(e.width,e.height,e.widthSegments,e.heightSegments)}}var tM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,iM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sM=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,oM=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aM=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lM=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cM=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uM=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,fM=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hM=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dM=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pM=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mM=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gM=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_M=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vM=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xM=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yM=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,MM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,SM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,EM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,TM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,wM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,AM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,CM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,LM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,PM="gl_FragColor = linearToOutputTexel( gl_FragColor );",UM=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,DM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,IM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,FM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,NM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,OM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,BM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kM=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,GM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,zM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,HM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,VM=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,WM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,XM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,qM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,KM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,JM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$M=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,QM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,eS=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tS=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nS=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,iS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,aS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,lS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fS=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mS=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,_S=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,vS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,xS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yS=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,MS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ES=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,TS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,RS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,CS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,LS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,PS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,US=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,DS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,IS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,FS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,NS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,OS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,BS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,GS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,zS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,VS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,XS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,YS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,KS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ZS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,JS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$S=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,QS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,eb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ib=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ob=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ab=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,cb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ub=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,db=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_b=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Sb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,wb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ab=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ub=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Db=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ib=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$e={alphahash_fragment:tM,alphahash_pars_fragment:nM,alphamap_fragment:iM,alphamap_pars_fragment:rM,alphatest_fragment:sM,alphatest_pars_fragment:oM,aomap_fragment:aM,aomap_pars_fragment:lM,batching_pars_vertex:cM,batching_vertex:uM,begin_vertex:fM,beginnormal_vertex:hM,bsdfs:dM,iridescence_fragment:pM,bumpmap_pars_fragment:mM,clipping_planes_fragment:gM,clipping_planes_pars_fragment:_M,clipping_planes_pars_vertex:vM,clipping_planes_vertex:xM,color_fragment:yM,color_pars_fragment:MM,color_pars_vertex:SM,color_vertex:bM,common:EM,cube_uv_reflection_fragment:TM,defaultnormal_vertex:wM,displacementmap_pars_vertex:AM,displacementmap_vertex:RM,emissivemap_fragment:CM,emissivemap_pars_fragment:LM,colorspace_fragment:PM,colorspace_pars_fragment:UM,envmap_fragment:DM,envmap_common_pars_fragment:IM,envmap_pars_fragment:FM,envmap_pars_vertex:NM,envmap_physical_pars_fragment:qM,envmap_vertex:OM,fog_vertex:BM,fog_pars_vertex:kM,fog_fragment:GM,fog_pars_fragment:zM,gradientmap_pars_fragment:HM,lightmap_fragment:VM,lightmap_pars_fragment:WM,lights_lambert_fragment:XM,lights_lambert_pars_fragment:jM,lights_pars_begin:YM,lights_toon_fragment:KM,lights_toon_pars_fragment:ZM,lights_phong_fragment:JM,lights_phong_pars_fragment:$M,lights_physical_fragment:QM,lights_physical_pars_fragment:eS,lights_fragment_begin:tS,lights_fragment_maps:nS,lights_fragment_end:iS,logdepthbuf_fragment:rS,logdepthbuf_pars_fragment:sS,logdepthbuf_pars_vertex:oS,logdepthbuf_vertex:aS,map_fragment:lS,map_pars_fragment:cS,map_particle_fragment:uS,map_particle_pars_fragment:fS,metalnessmap_fragment:hS,metalnessmap_pars_fragment:dS,morphinstance_vertex:pS,morphcolor_vertex:mS,morphnormal_vertex:gS,morphtarget_pars_vertex:_S,morphtarget_vertex:vS,normal_fragment_begin:xS,normal_fragment_maps:yS,normal_pars_fragment:MS,normal_pars_vertex:SS,normal_vertex:bS,normalmap_pars_fragment:ES,clearcoat_normal_fragment_begin:TS,clearcoat_normal_fragment_maps:wS,clearcoat_pars_fragment:AS,iridescence_pars_fragment:RS,opaque_fragment:CS,packing:LS,premultiplied_alpha_fragment:PS,project_vertex:US,dithering_fragment:DS,dithering_pars_fragment:IS,roughnessmap_fragment:FS,roughnessmap_pars_fragment:NS,shadowmap_pars_fragment:OS,shadowmap_pars_vertex:BS,shadowmap_vertex:kS,shadowmask_pars_fragment:GS,skinbase_vertex:zS,skinning_pars_vertex:HS,skinning_vertex:VS,skinnormal_vertex:WS,specularmap_fragment:XS,specularmap_pars_fragment:jS,tonemapping_fragment:YS,tonemapping_pars_fragment:qS,transmission_fragment:KS,transmission_pars_fragment:ZS,uv_pars_fragment:JS,uv_pars_vertex:$S,uv_vertex:QS,worldpos_vertex:eb,background_vert:tb,background_frag:nb,backgroundCube_vert:ib,backgroundCube_frag:rb,cube_vert:sb,cube_frag:ob,depth_vert:ab,depth_frag:lb,distanceRGBA_vert:cb,distanceRGBA_frag:ub,equirect_vert:fb,equirect_frag:hb,linedashed_vert:db,linedashed_frag:pb,meshbasic_vert:mb,meshbasic_frag:gb,meshlambert_vert:_b,meshlambert_frag:vb,meshmatcap_vert:xb,meshmatcap_frag:yb,meshnormal_vert:Mb,meshnormal_frag:Sb,meshphong_vert:bb,meshphong_frag:Eb,meshphysical_vert:Tb,meshphysical_frag:wb,meshtoon_vert:Ab,meshtoon_frag:Rb,points_vert:Cb,points_frag:Lb,shadow_vert:Pb,shadow_frag:Ub,sprite_vert:Db,sprite_frag:Ib},Ne={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qe}},envmap:{envMap:{value:null},envMapRotation:{value:new Qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qe},normalScale:{value:new Ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0},uvTransform:{value:new Qe}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new Ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qe},alphaMap:{value:null},alphaMapTransform:{value:new Qe},alphaTest:{value:0}}},qn={basic:{uniforms:Yt([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:$e.meshbasic_vert,fragmentShader:$e.meshbasic_frag},lambert:{uniforms:Yt([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Ue(0)}}]),vertexShader:$e.meshlambert_vert,fragmentShader:$e.meshlambert_frag},phong:{uniforms:Yt([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30}}]),vertexShader:$e.meshphong_vert,fragmentShader:$e.meshphong_frag},standard:{uniforms:Yt([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag},toon:{uniforms:Yt([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Ue(0)}}]),vertexShader:$e.meshtoon_vert,fragmentShader:$e.meshtoon_frag},matcap:{uniforms:Yt([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:$e.meshmatcap_vert,fragmentShader:$e.meshmatcap_frag},points:{uniforms:Yt([Ne.points,Ne.fog]),vertexShader:$e.points_vert,fragmentShader:$e.points_frag},dashed:{uniforms:Yt([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$e.linedashed_vert,fragmentShader:$e.linedashed_frag},depth:{uniforms:Yt([Ne.common,Ne.displacementmap]),vertexShader:$e.depth_vert,fragmentShader:$e.depth_frag},normal:{uniforms:Yt([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:$e.meshnormal_vert,fragmentShader:$e.meshnormal_frag},sprite:{uniforms:Yt([Ne.sprite,Ne.fog]),vertexShader:$e.sprite_vert,fragmentShader:$e.sprite_frag},background:{uniforms:{uvTransform:{value:new Qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$e.background_vert,fragmentShader:$e.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qe}},vertexShader:$e.backgroundCube_vert,fragmentShader:$e.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$e.cube_vert,fragmentShader:$e.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$e.equirect_vert,fragmentShader:$e.equirect_frag},distanceRGBA:{uniforms:Yt([Ne.common,Ne.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$e.distanceRGBA_vert,fragmentShader:$e.distanceRGBA_frag},shadow:{uniforms:Yt([Ne.lights,Ne.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:$e.shadow_vert,fragmentShader:$e.shadow_frag}};qn.physical={uniforms:Yt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qe},clearcoatNormalScale:{value:new Ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qe},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qe},transmissionSamplerSize:{value:new Ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qe},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qe},anisotropyVector:{value:new Ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qe}}]),vertexShader:$e.meshphysical_vert,fragmentShader:$e.meshphysical_frag};const ta={r:0,b:0,g:0},ir=new ei,Fb=new Je;function Nb(n,e,t,r,i,s,o){const a=new Ue(0);let l=s===!0?0:1,c,u,f=null,h=0,d=null;function g(p,m){let y=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v===null?_(a,l):v&&v.isColor&&(_(v,1),y=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?r.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),v&&(v.isCubeTexture||v.mapping===$a)?(u===void 0&&(u=new at(new vs(1,1,1),new ji({name:"BackgroundCubeMaterial",uniforms:ds(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,w,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),ir.copy(m.backgroundRotation),ir.x*=-1,ir.y*=-1,ir.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ir.y*=-1,ir.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fb.makeRotationFromEuler(ir)),u.material.toneMapped=ut.getTransfer(v.colorSpace)!==xt,(f!==v||h!==v.version||d!==n.toneMapping)&&(u.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new at(new je(2,2),new ji({name:"BackgroundMaterial",uniforms:ds(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:gi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=ut.getTransfer(v.colorSpace)!==xt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(f!==v||h!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,f=v,h=v.version,d=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,m){p.getRGB(ta,jm(n)),r.buffers.color.setClear(ta.r,ta.g,ta.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),l=m,_(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(a,l)},render:g}}function Ob(n,e,t,r){const i=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=r.isWebGL2?null:e.get("OES_vertex_array_object"),o=r.isWebGL2||s!==null,a={},l=p(null);let c=l,u=!1;function f(R,ne,H,re,J){let K=!1;if(o){const q=_(re,H,ne);c!==q&&(c=q,d(c.object)),K=m(R,re,H,J),K&&y(R,re,H,J)}else{const q=ne.wireframe===!0;(c.geometry!==re.id||c.program!==H.id||c.wireframe!==q)&&(c.geometry=re.id,c.program=H.id,c.wireframe=q,K=!0)}J!==null&&t.update(J,n.ELEMENT_ARRAY_BUFFER),(K||u)&&(u=!1,P(R,ne,H,re),J!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(J).buffer))}function h(){return r.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function d(R){return r.isWebGL2?n.bindVertexArray(R):s.bindVertexArrayOES(R)}function g(R){return r.isWebGL2?n.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function _(R,ne,H){const re=H.wireframe===!0;let J=a[R.id];J===void 0&&(J={},a[R.id]=J);let K=J[ne.id];K===void 0&&(K={},J[ne.id]=K);let q=K[re];return q===void 0&&(q=p(h()),K[re]=q),q}function p(R){const ne=[],H=[],re=[];for(let J=0;J<i;J++)ne[J]=0,H[J]=0,re[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:ne,enabledAttributes:H,attributeDivisors:re,object:R,attributes:{},index:null}}function m(R,ne,H,re){const J=c.attributes,K=ne.attributes;let q=0;const U=H.getAttributes();for(const X in U)if(U[X].location>=0){const N=J[X];let V=K[X];if(V===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(V=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(V=R.instanceColor)),N===void 0||N.attribute!==V||V&&N.data!==V.data)return!0;q++}return c.attributesNum!==q||c.index!==re}function y(R,ne,H,re){const J={},K=ne.attributes;let q=0;const U=H.getAttributes();for(const X in U)if(U[X].location>=0){let N=K[X];N===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(N=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(N=R.instanceColor));const V={};V.attribute=N,N&&N.data&&(V.data=N.data),J[X]=V,q++}c.attributes=J,c.attributesNum=q,c.index=re}function v(){const R=c.newAttributes;for(let ne=0,H=R.length;ne<H;ne++)R[ne]=0}function M(R){A(R,0)}function A(R,ne){const H=c.newAttributes,re=c.enabledAttributes,J=c.attributeDivisors;H[R]=1,re[R]===0&&(n.enableVertexAttribArray(R),re[R]=1),J[R]!==ne&&((r.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,ne),J[R]=ne)}function w(){const R=c.newAttributes,ne=c.enabledAttributes;for(let H=0,re=ne.length;H<re;H++)ne[H]!==R[H]&&(n.disableVertexAttribArray(H),ne[H]=0)}function T(R,ne,H,re,J,K,q){q===!0?n.vertexAttribIPointer(R,ne,H,J,K):n.vertexAttribPointer(R,ne,H,re,J,K)}function P(R,ne,H,re){if(r.isWebGL2===!1&&(R.isInstancedMesh||re.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const J=re.attributes,K=H.getAttributes(),q=ne.defaultAttributeValues;for(const U in K){const X=K[U];if(X.location>=0){let le=J[U];if(le===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const N=le.normalized,V=le.itemSize,oe=t.get(le);if(oe===void 0)continue;const F=oe.buffer,j=oe.type,ee=oe.bytesPerElement,me=r.isWebGL2===!0&&(j===n.INT||j===n.UNSIGNED_INT||le.gpuType===Tm);if(le.isInterleavedBufferAttribute){const de=le.data,x=de.stride,I=le.offset;if(de.isInstancedInterleavedBuffer){for(let O=0;O<X.locationSize;O++)A(X.location+O,de.meshPerAttribute);R.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let O=0;O<X.locationSize;O++)M(X.location+O);n.bindBuffer(n.ARRAY_BUFFER,F);for(let O=0;O<X.locationSize;O++)T(X.location+O,V/X.locationSize,j,N,x*ee,(I+V/X.locationSize*O)*ee,me)}else{if(le.isInstancedBufferAttribute){for(let de=0;de<X.locationSize;de++)A(X.location+de,le.meshPerAttribute);R.isInstancedMesh!==!0&&re._maxInstanceCount===void 0&&(re._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let de=0;de<X.locationSize;de++)M(X.location+de);n.bindBuffer(n.ARRAY_BUFFER,F);for(let de=0;de<X.locationSize;de++)T(X.location+de,V/X.locationSize,j,N,V*ee,V/X.locationSize*de*ee,me)}}else if(q!==void 0){const N=q[U];if(N!==void 0)switch(N.length){case 2:n.vertexAttrib2fv(X.location,N);break;case 3:n.vertexAttrib3fv(X.location,N);break;case 4:n.vertexAttrib4fv(X.location,N);break;default:n.vertexAttrib1fv(X.location,N)}}}}w()}function $(){B();for(const R in a){const ne=a[R];for(const H in ne){const re=ne[H];for(const J in re)g(re[J].object),delete re[J];delete ne[H]}delete a[R]}}function E(R){if(a[R.id]===void 0)return;const ne=a[R.id];for(const H in ne){const re=ne[H];for(const J in re)g(re[J].object),delete re[J];delete ne[H]}delete a[R.id]}function C(R){for(const ne in a){const H=a[ne];if(H[R.id]===void 0)continue;const re=H[R.id];for(const J in re)g(re[J].object),delete re[J];delete H[R.id]}}function B(){Y(),u=!0,c!==l&&(c=l,d(c.object))}function Y(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:f,reset:B,resetDefaultState:Y,dispose:$,releaseStatesOfGeometry:E,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:M,disableUnusedAttributes:w}}function Bb(n,e,t,r){const i=r.isWebGL2;let s;function o(u){s=u}function a(u,f){n.drawArrays(s,u,f),t.update(f,s,1)}function l(u,f,h){if(h===0)return;let d,g;if(i)d=n,g="drawArraysInstanced";else if(d=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",d===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}d[g](s,u,f,h),t.update(f,s,h)}function c(u,f,h){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<h;g++)this.render(u[g],f[g]);else{d.multiDrawArraysWEBGL(s,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=f[_];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function kb(n,e,t){let r;function i(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function s(T){if(T==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),v=h>0,M=o||e.has("OES_texture_float"),A=v&&M,w=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:u,maxTextures:f,maxVertexTextures:h,maxTextureSize:d,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:A,maxSamples:w}}function Gb(n){const e=this;let t=null,r=0,i=!1,s=!1;const o=new ui,a=new Qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const d=f.length!==0||h||r!==0||i;return i=h,r=f.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){t=u(f,h,0)},this.setState=function(f,h,d){const g=f.clippingPlanes,_=f.clipIntersection,p=f.clipShadows,m=n.get(f);if(!i||g===null||g.length===0||s&&!p)s?u(null):c();else{const y=s?0:r,v=y*4;let M=m.clippingState||null;l.value=M,M=u(g,h,v,d);for(let A=0;A!==v;++A)M[A]=t[A];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function u(f,h,d,g){const _=f!==null?f.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=d+_*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,M=d;v!==_;++v,M+=4)o.copy(f[v]).applyMatrix4(y,a),o.normal.toArray(p,M),p[M+3]=o.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function zb(n){let e=new WeakMap;function t(o,a){return a===Nc?o.mapping=as:a===Oc&&(o.mapping=ls),o}function r(o){if(o&&o.isTexture){const a=o.mapping;if(a===Nc||a===Oc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Jy(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:r,dispose:s}}class Au extends qm{constructor(e=-1,t=1,r=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=r-e,o=r+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Yr=4,$h=[.125,.215,.35,.446,.526,.582],ur=20,Ql=new Au,Qh=new Ue;let ec=null,tc=0,nc=0;const ar=(1+Math.sqrt(5))/2,zr=1/ar,ed=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,ar,zr),new D(0,ar,-zr),new D(zr,0,ar),new D(-zr,0,ar),new D(ar,zr,0),new D(-ar,zr,0)];class td{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,i=100){ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,r,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=id(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ec,tc,nc),e.scissorTest=!1,na(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===as||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ec=this._renderer.getRenderTarget(),tc=this._renderer.getActiveCubeFace(),nc=this._renderer.getActiveMipmapLevel();const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Pt,minFilter:Pt,generateMipmaps:!1,type:go,format:vn,colorSpace:Nt,depthBuffer:!1},i=nd(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nd(e,t,r);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hb(s)),this._blurMaterial=Vb(s,e,t)}return i}_compileMaterial(e){const t=new at(this._lodPlanes[0],e);this._renderer.compile(t,Ql)}_sceneToCubeUV(e,t,r,i){const a=new Kt(90,1,t,r),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,h=u.toneMapping;u.getClearColor(Qh),u.toneMapping=Vi,u.autoClear=!1;const d=new rt({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),g=new at(new vs,d);let _=!1;const p=e.background;p?p.isColor&&(d.color.copy(p),e.background=null,_=!0):(d.color.copy(Qh),_=!0);for(let m=0;m<6;m++){const y=m%3;y===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):y===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const v=this._cubeSize;na(i,y*v,m>2?v:0,v,v),u.setRenderTarget(i),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=f,e.background=p}_textureToCubeUV(e,t){const r=this._renderer,i=e.mapping===as||e.mapping===ls;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=rd()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=id());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new at(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;na(t,0,0,3*l,2*l),r.setRenderTarget(t),r.render(o,Ql)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=ed[(i-1)%ed.length];this._blur(e,i-1,i,s,o)}t.autoClear=r}_blur(e,t,r,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,r,i,"latitudinal",s),this._halfBlur(o,e,r,r,i,"longitudinal",s)}_halfBlur(e,t,r,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,f=new at(this._lodPlanes[i],c),h=c.uniforms,d=this._sizeLods[r]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ur-1),_=s/g,p=isFinite(s)?1+Math.floor(u*_):ur;p>ur&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ur}`);const m=[];let y=0;for(let T=0;T<ur;++T){const P=T/_,$=Math.exp(-P*P/2);m.push($),T===0?y+=$:T<p&&(y+=2*$)}for(let T=0;T<m.length;T++)m[T]=m[T]/y;h.envMap.value=e.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-r;const M=this._sizeLods[i],A=3*M*(i>v-Yr?i-v+Yr:0),w=4*(this._cubeSize-M);na(t,A,w,3*M,2*M),l.setRenderTarget(t),l.render(f,Ql)}}function Hb(n){const e=[],t=[],r=[];let i=n;const s=n-Yr+1+$h.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>n-Yr?l=$h[o-n+Yr-1]:o===0&&(l=0),r.push(l);const c=1/(a-2),u=-c,f=1+c,h=[u,u,f,u,f,f,u,u,f,f,u,f],d=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*d),v=new Float32Array(p*g*d),M=new Float32Array(m*g*d);for(let w=0;w<d;w++){const T=w%3*2/3-1,P=w>2?0:-1,$=[T,P,0,T+2/3,P,0,T+2/3,P+1,0,T,P,0,T+2/3,P+1,0,T,P+1,0];y.set($,_*g*w),v.set(h,p*g*w);const E=[w,w,w,w,w,w];M.set(E,m*g*w)}const A=new Mn;A.setAttribute("position",new Jt(y,_)),A.setAttribute("uv",new Jt(v,p)),A.setAttribute("faceIndex",new Jt(M,m)),e.push(A),i>Yr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function nd(n,e,t){const r=new vr(n,e,t);return r.texture.mapping=$a,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function na(n,e,t,r,i){n.viewport.set(e,t,r,i),n.scissor.set(e,t,r,i)}function Vb(n,e,t){const r=new Float32Array(ur),i=new D(0,1,0);return new ji({name:"SphericalGaussianBlur",defines:{n:ur,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function id(){return new ji({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function rd(){return new ji({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function Ru(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Wb(n){let e=new WeakMap,t=null;function r(a){if(a&&a.isTexture){const l=a.mapping,c=l===Nc||l===Oc,u=l===as||l===ls;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let f=e.get(a);return t===null&&(t=new td(n)),f=c?t.fromEquirectangular(a,f):t.fromCubemap(a,f),e.set(a,f),f.texture}else{if(e.has(a))return e.get(a).texture;{const f=a.image;if(c&&f&&f.height>0||u&&f&&i(f)){t===null&&(t=new td(n));const h=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,h),a.addEventListener("dispose",s),h.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:o}}function Xb(n){const e={};function t(r){if(e[r]!==void 0)return e[r];let i;switch(r){case"WEBGL_depth_texture":i=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=n.getExtension(r)}return e[r]=i,i}return{has:function(r){return t(r)!==null},init:function(r){r.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(r){const i=t(r);return i===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),i}}}function jb(n,e,t,r){const i={},s=new WeakMap;function o(f){const h=f.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);for(const g in h.morphAttributes){const _=h.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}h.removeEventListener("dispose",o),delete i[h.id];const d=s.get(h);d&&(e.remove(d),s.delete(h)),r.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(f,h){return i[h.id]===!0||(h.addEventListener("dispose",o),i[h.id]=!0,t.memory.geometries++),h}function l(f){const h=f.attributes;for(const g in h)e.update(h[g],n.ARRAY_BUFFER);const d=f.morphAttributes;for(const g in d){const _=d[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],n.ARRAY_BUFFER)}}function c(f){const h=[],d=f.index,g=f.attributes.position;let _=0;if(d!==null){const y=d.array;_=d.version;for(let v=0,M=y.length;v<M;v+=3){const A=y[v+0],w=y[v+1],T=y[v+2];h.push(A,w,w,T,T,A)}}else if(g!==void 0){const y=g.array;_=g.version;for(let v=0,M=y.length/3-1;v<M;v+=3){const A=v+0,w=v+1,T=v+2;h.push(A,w,w,T,T,A)}}else return;const p=new(Bm(h)?Xm:Wm)(h,1);p.version=_;const m=s.get(f);m&&e.remove(m),s.set(f,p)}function u(f){const h=s.get(f);if(h){const d=f.index;d!==null&&h.version<d.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function Yb(n,e,t,r){const i=r.isWebGL2;let s;function o(d){s=d}let a,l;function c(d){a=d.type,l=d.bytesPerElement}function u(d,g){n.drawElements(s,g,a,d*l),t.update(g,s,1)}function f(d,g,_){if(_===0)return;let p,m;if(i)p=n,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](s,g,a,d*l,_),t.update(g,s,_)}function h(d,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(d[m]/l,g[m]);else{p.multiDrawElementsWEBGL(s,g,0,a,d,0,_);let m=0;for(let y=0;y<_;y++)m+=g[y];t.update(m,s,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=f,this.renderMultiDraw=h}function qb(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:r}}function Kb(n,e){return n[0]-e[0]}function Zb(n,e){return Math.abs(e[1])-Math.abs(n[1])}function Jb(n,e,t){const r={},i=new Float32Array(8),s=new WeakMap,o=new pt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,f){const h=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let p=s.get(u);if(p===void 0||p.count!==_){let Y=function(){C.dispose(),s.delete(u),u.removeEventListener("dispose",Y)};var d=Y;p!==void 0&&p.texture.dispose();const m=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,M=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],w=u.morphAttributes.color||[];let T=0;m===!0&&(T=1),y===!0&&(T=2),v===!0&&(T=3);let P=u.attributes.position.count*T,$=1;P>e.maxTextureSize&&($=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const E=new Float32Array(P*$*4*_),C=new Hm(E,P,$,_);C.type=Dn,C.needsUpdate=!0;const B=T*4;for(let R=0;R<_;R++){const ne=M[R],H=A[R],re=w[R],J=P*$*4*R;for(let K=0;K<ne.count;K++){const q=K*B;m===!0&&(o.fromBufferAttribute(ne,K),E[J+q+0]=o.x,E[J+q+1]=o.y,E[J+q+2]=o.z,E[J+q+3]=0),y===!0&&(o.fromBufferAttribute(H,K),E[J+q+4]=o.x,E[J+q+5]=o.y,E[J+q+6]=o.z,E[J+q+7]=0),v===!0&&(o.fromBufferAttribute(re,K),E[J+q+8]=o.x,E[J+q+9]=o.y,E[J+q+10]=o.z,E[J+q+11]=re.itemSize===4?o.w:1)}}p={count:_,texture:C,size:new Ce(P,$)},s.set(u,p),u.addEventListener("dispose",Y)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)f.getUniforms().setValue(n,"morphTexture",c.morphTexture,t);else{let m=0;for(let v=0;v<h.length;v++)m+=h[v];const y=u.morphTargetsRelative?1:1-m;f.getUniforms().setValue(n,"morphTargetBaseInfluence",y),f.getUniforms().setValue(n,"morphTargetInfluences",h)}f.getUniforms().setValue(n,"morphTargetsTexture",p.texture,t),f.getUniforms().setValue(n,"morphTargetsTextureSize",p.size)}else{const g=h===void 0?0:h.length;let _=r[u.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];r[u.id]=_}for(let M=0;M<g;M++){const A=_[M];A[0]=M,A[1]=h[M]}_.sort(Zb);for(let M=0;M<8;M++)M<g&&_[M][1]?(a[M][0]=_[M][0],a[M][1]=_[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(Kb);const p=u.morphAttributes.position,m=u.morphAttributes.normal;let y=0;for(let M=0;M<8;M++){const A=a[M],w=A[0],T=A[1];w!==Number.MAX_SAFE_INTEGER&&T?(p&&u.getAttribute("morphTarget"+M)!==p[w]&&u.setAttribute("morphTarget"+M,p[w]),m&&u.getAttribute("morphNormal"+M)!==m[w]&&u.setAttribute("morphNormal"+M,m[w]),i[M]=T,y+=T):(p&&u.hasAttribute("morphTarget"+M)===!0&&u.deleteAttribute("morphTarget"+M),m&&u.hasAttribute("morphNormal"+M)===!0&&u.deleteAttribute("morphNormal"+M),i[M]=0)}const v=u.morphTargetsRelative?1:1-y;f.getUniforms().setValue(n,"morphTargetBaseInfluence",v),f.getUniforms().setValue(n,"morphTargetInfluences",i)}}return{update:l}}function $b(n,e,t,r){let i=new WeakMap;function s(l){const c=r.render.frame,u=l.geometry,f=e.get(l,u);if(i.get(f)!==c&&(e.update(f),i.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return f}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Jm extends wt{constructor(e,t,r,i,s,o,a,l,c,u){if(u=u!==void 0?u:mr,u!==mr&&u!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&u===mr&&(r=Bi),r===void 0&&u===us&&(r=pr),super(null,i,s,o,a,l,u,r,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Ut,this.minFilter=l!==void 0?l:Ut,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const $m=new wt,Qm=new Jm(1,1);Qm.compareFunction=Nm;const eg=new Hm,tg=new Fy,ng=new Km,sd=[],od=[],ad=new Float32Array(16),ld=new Float32Array(9),cd=new Float32Array(4);function xs(n,e,t){const r=n[0];if(r<=0||r>0)return n;const i=e*t;let s=sd[i];if(s===void 0&&(s=new Float32Array(i),sd[i]=s),e!==0){r.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function At(n,e){if(n.length!==e.length)return!1;for(let t=0,r=n.length;t<r;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,r=e.length;t<r;t++)n[t]=e[t]}function el(n,e){let t=od[e];t===void 0&&(t=new Int32Array(e),od[e]=t);for(let r=0;r!==e;++r)t[r]=n.allocateTextureUnit();return t}function Qb(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function eE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function tE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function nE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function iE(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(At(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,r))return;cd.set(r),n.uniformMatrix2fv(this.addr,!1,cd),Rt(t,r)}}function rE(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(At(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,r))return;ld.set(r),n.uniformMatrix3fv(this.addr,!1,ld),Rt(t,r)}}function sE(n,e){const t=this.cache,r=e.elements;if(r===void 0){if(At(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,r))return;ad.set(r),n.uniformMatrix4fv(this.addr,!1,ad),Rt(t,r)}}function oE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function aE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function lE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function cE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function uE(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function fE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function hE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function dE(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function pE(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i);const s=this.type===n.SAMPLER_2D_SHADOW?Qm:$m;t.setTexture2D(e||s,i)}function mE(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i),t.setTexture3D(e||tg,i)}function gE(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i),t.setTextureCube(e||ng,i)}function _E(n,e,t){const r=this.cache,i=t.allocateTextureUnit();r[0]!==i&&(n.uniform1i(this.addr,i),r[0]=i),t.setTexture2DArray(e||eg,i)}function vE(n){switch(n){case 5126:return Qb;case 35664:return eE;case 35665:return tE;case 35666:return nE;case 35674:return iE;case 35675:return rE;case 35676:return sE;case 5124:case 35670:return oE;case 35667:case 35671:return aE;case 35668:case 35672:return lE;case 35669:case 35673:return cE;case 5125:return uE;case 36294:return fE;case 36295:return hE;case 36296:return dE;case 35678:case 36198:case 36298:case 36306:case 35682:return pE;case 35679:case 36299:case 36307:return mE;case 35680:case 36300:case 36308:case 36293:return gE;case 36289:case 36303:case 36311:case 36292:return _E}}function xE(n,e){n.uniform1fv(this.addr,e)}function yE(n,e){const t=xs(e,this.size,2);n.uniform2fv(this.addr,t)}function ME(n,e){const t=xs(e,this.size,3);n.uniform3fv(this.addr,t)}function SE(n,e){const t=xs(e,this.size,4);n.uniform4fv(this.addr,t)}function bE(n,e){const t=xs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function EE(n,e){const t=xs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function TE(n,e){const t=xs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function wE(n,e){n.uniform1iv(this.addr,e)}function AE(n,e){n.uniform2iv(this.addr,e)}function RE(n,e){n.uniform3iv(this.addr,e)}function CE(n,e){n.uniform4iv(this.addr,e)}function LE(n,e){n.uniform1uiv(this.addr,e)}function PE(n,e){n.uniform2uiv(this.addr,e)}function UE(n,e){n.uniform3uiv(this.addr,e)}function DE(n,e){n.uniform4uiv(this.addr,e)}function IE(n,e,t){const r=this.cache,i=e.length,s=el(t,i);At(r,s)||(n.uniform1iv(this.addr,s),Rt(r,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||$m,s[o])}function FE(n,e,t){const r=this.cache,i=e.length,s=el(t,i);At(r,s)||(n.uniform1iv(this.addr,s),Rt(r,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||tg,s[o])}function NE(n,e,t){const r=this.cache,i=e.length,s=el(t,i);At(r,s)||(n.uniform1iv(this.addr,s),Rt(r,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||ng,s[o])}function OE(n,e,t){const r=this.cache,i=e.length,s=el(t,i);At(r,s)||(n.uniform1iv(this.addr,s),Rt(r,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||eg,s[o])}function BE(n){switch(n){case 5126:return xE;case 35664:return yE;case 35665:return ME;case 35666:return SE;case 35674:return bE;case 35675:return EE;case 35676:return TE;case 5124:case 35670:return wE;case 35667:case 35671:return AE;case 35668:case 35672:return RE;case 35669:case 35673:return CE;case 5125:return LE;case 36294:return PE;case 36295:return UE;case 36296:return DE;case 35678:case 36198:case 36298:case 36306:case 35682:return IE;case 35679:case 36299:case 36307:return FE;case 35680:case 36300:case 36308:case 36293:return NE;case 36289:case 36303:case 36311:case 36292:return OE}}class kE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=vE(t.type)}}class GE{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=BE(t.type)}}class zE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],r)}}}const ic=/(\w+)(\])?(\[|\.)?/g;function ud(n,e){n.seq.push(e),n.map[e.id]=e}function HE(n,e,t){const r=n.name,i=r.length;for(ic.lastIndex=0;;){const s=ic.exec(r),o=ic.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){ud(t,c===void 0?new kE(a,n,e):new GE(a,n,e));break}else{let f=t.map[a];f===void 0&&(f=new zE(a),ud(t,f)),t=f}}}class Ma{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<r;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);HE(s,o,this)}}setValue(e,t,r,i){const s=this.map[t];s!==void 0&&s.setValue(e,r,i)}setOptional(e,t,r){const i=t[r];i!==void 0&&this.setValue(e,r,i)}static upload(e,t,r,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=r[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const r=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&r.push(o)}return r}}function fd(n,e,t){const r=n.createShader(e);return n.shaderSource(r,t),n.compileShader(r),r}const VE=37297;let WE=0;function XE(n,e){const t=n.split(`
`),r=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;r.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return r.join(`
`)}function jE(n){const e=ut.getPrimaries(ut.workingColorSpace),t=ut.getPrimaries(n);let r;switch(e===t?r="":e===Da&&t===Ua?r="LinearDisplayP3ToLinearSRGB":e===Ua&&t===Da&&(r="LinearSRGBToLinearDisplayP3"),n){case Nt:case Qa:return[r,"LinearTransferOETF"];case qt:case bu:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[r,"LinearTransferOETF"]}}function hd(n,e,t){const r=n.getShaderParameter(e,n.COMPILE_STATUS),i=n.getShaderInfoLog(e).trim();if(r&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+XE(n.getShaderSource(e),o)}else return i}function YE(n,e){const t=jE(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function qE(n,e){let t;switch(e){case Xx:t="Linear";break;case jx:t="Reinhard";break;case Yx:t="OptimizedCineon";break;case bm:t="ACESFilmic";break;case Kx:t="AgX";break;case Zx:t="Neutral";break;case qx:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function KE(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.alphaToCoverage||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(qr).join(`
`)}function ZE(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(qr).join(`
`)}function JE(n){const e=[];for(const t in n){const r=n[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function $E(n,e){const t={},r=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){const s=n.getActiveAttrib(e,i),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function qr(n){return n!==""}function dd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function pd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const QE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vc(n){return n.replace(QE,tT)}const eT=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function tT(n,e){let t=$e[e];if(t===void 0){const r=eT.get(e);if(r!==void 0)t=$e[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return Vc(t)}const nT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function md(n){return n.replace(nT,iT)}function iT(n,e,t,r){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=r.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function gd(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	`;return n.isWebGL2&&(e+=`precision ${n.precision} sampler3D;
		precision ${n.precision} sampler2DArray;
		precision ${n.precision} sampler2DShadow;
		precision ${n.precision} samplerCubeShadow;
		precision ${n.precision} sampler2DArrayShadow;
		precision ${n.precision} isampler2D;
		precision ${n.precision} isampler3D;
		precision ${n.precision} isamplerCube;
		precision ${n.precision} isampler2DArray;
		precision ${n.precision} usampler2D;
		precision ${n.precision} usampler3D;
		precision ${n.precision} usamplerCube;
		precision ${n.precision} usampler2DArray;
		`),n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function rT(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ym?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Mm?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ci&&(e="SHADOWMAP_TYPE_VSM"),e}function sT(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case as:case ls:e="ENVMAP_TYPE_CUBE";break;case $a:e="ENVMAP_TYPE_CUBE_UV";break}return e}function oT(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ls:e="ENVMAP_MODE_REFRACTION";break}return e}function aT(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Sm:e="ENVMAP_BLENDING_MULTIPLY";break;case Vx:e="ENVMAP_BLENDING_MIX";break;case Wx:e="ENVMAP_BLENDING_ADD";break}return e}function lT(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function cT(n,e,t,r){const i=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=rT(t),c=sT(t),u=oT(t),f=aT(t),h=lT(t),d=t.isWebGL2?"":KE(t),g=ZE(t),_=JE(s),p=i.createProgram();let m,y,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qr).join(`
`),m.length>0&&(m+=`
`),y=[d,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(qr).join(`
`),y.length>0&&(y+=`
`)):(m=[gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(qr).join(`
`),y=[d,gd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vi?"#define TONE_MAPPING":"",t.toneMapping!==Vi?$e.tonemapping_pars_fragment:"",t.toneMapping!==Vi?qE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",$e.colorspace_pars_fragment,YE("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(qr).join(`
`)),o=Vc(o),o=dd(o,t),o=pd(o,t),a=Vc(a),a=dd(a,t),a=pd(a,t),o=md(o),a=md(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const M=v+m+o,A=v+y+a,w=fd(i,i.VERTEX_SHADER,M),T=fd(i,i.FRAGMENT_SHADER,A);i.attachShader(p,w),i.attachShader(p,T),t.index0AttributeName!==void 0?i.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function P(B){if(n.debug.checkShaderErrors){const Y=i.getProgramInfoLog(p).trim(),R=i.getShaderInfoLog(w).trim(),ne=i.getShaderInfoLog(T).trim();let H=!0,re=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(i,p,w,T);else{const J=hd(i,w,"vertex"),K=hd(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+Y+`
`+J+`
`+K)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(R===""||ne==="")&&(re=!1);re&&(B.diagnostics={runnable:H,programLog:Y,vertexShader:{log:R,prefix:m},fragmentShader:{log:ne,prefix:y}})}i.deleteShader(w),i.deleteShader(T),$=new Ma(i,p),E=$E(i,p)}let $;this.getUniforms=function(){return $===void 0&&P(this),$};let E;this.getAttributes=function(){return E===void 0&&P(this),E};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(p,VE)),C},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=WE++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=T,this}let uT=0;class fT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(r),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new hT(e),t.set(e,r)),r}}class hT{constructor(e){this.id=uT++,this.code=e,this.usedTimes=0}}function dT(n,e,t,r,i,s,o){const a=new Tu,l=new fT,c=new Set,u=[],f=i.isWebGL2,h=i.logarithmicDepthBuffer,d=i.vertexTextures;let g=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,C,B,Y,R){const ne=Y.fog,H=R.geometry,re=E.isMeshStandardMaterial?Y.environment:null,J=(E.isMeshStandardMaterial?t:e).get(E.envMap||re),K=J&&J.mapping===$a?J.image.height:null,q=_[E.type];E.precision!==null&&(g=i.getMaxPrecision(E.precision),g!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",g,"instead."));const U=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,X=U!==void 0?U.length:0;let le=0;H.morphAttributes.position!==void 0&&(le=1),H.morphAttributes.normal!==void 0&&(le=2),H.morphAttributes.color!==void 0&&(le=3);let N,V,oe,F;if(q){const ke=qn[q];N=ke.vertexShader,V=ke.fragmentShader}else N=E.vertexShader,V=E.fragmentShader,l.update(E),oe=l.getVertexShaderID(E),F=l.getFragmentShaderID(E);const j=n.getRenderTarget(),ee=R.isInstancedMesh===!0,me=R.isBatchedMesh===!0,de=!!E.map,x=!!E.matcap,I=!!J,O=!!E.aoMap,Z=!!E.lightMap,Q=!!E.bumpMap,ce=!!E.normalMap,ie=!!E.displacementMap,se=!!E.emissiveMap,fe=!!E.metalnessMap,b=!!E.roughnessMap,S=E.anisotropy>0,k=E.clearcoat>0,W=E.iridescence>0,te=E.sheen>0,he=E.transmission>0,ye=S&&!!E.anisotropyMap,be=k&&!!E.clearcoatMap,ge=k&&!!E.clearcoatNormalMap,Ee=k&&!!E.clearcoatRoughnessMap,Fe=W&&!!E.iridescenceMap,Te=W&&!!E.iridescenceThicknessMap,Be=te&&!!E.sheenColorMap,De=te&&!!E.sheenRoughnessMap,Se=!!E.specularMap,Ae=!!E.specularColorMap,Ie=!!E.specularIntensityMap,G=he&&!!E.transmissionMap,xe=he&&!!E.thicknessMap,we=!!E.gradientMap,z=!!E.alphaMap,Le=E.alphaTest>0,ae=!!E.alphaHash,Me=!!E.extensions;let Pe=Vi;E.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Pe=n.toneMapping);const Ge={isWebGL2:f,shaderID:q,shaderType:E.type,shaderName:E.name,vertexShader:N,fragmentShader:V,defines:E.defines,customVertexShaderID:oe,customFragmentShaderID:F,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:g,batching:me,instancing:ee,instancingColor:ee&&R.instanceColor!==null,instancingMorph:ee&&R.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:j===null?n.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Nt,alphaToCoverage:!!E.alphaToCoverage,map:de,matcap:x,envMap:I,envMapMode:I&&J.mapping,envMapCubeUVHeight:K,aoMap:O,lightMap:Z,bumpMap:Q,normalMap:ce,displacementMap:d&&ie,emissiveMap:se,normalMapObjectSpace:ce&&E.normalMapType===ly,normalMapTangentSpace:ce&&E.normalMapType===Fm,metalnessMap:fe,roughnessMap:b,anisotropy:S,anisotropyMap:ye,clearcoat:k,clearcoatMap:be,clearcoatNormalMap:ge,clearcoatRoughnessMap:Ee,iridescence:W,iridescenceMap:Fe,iridescenceThicknessMap:Te,sheen:te,sheenColorMap:Be,sheenRoughnessMap:De,specularMap:Se,specularColorMap:Ae,specularIntensityMap:Ie,transmission:he,transmissionMap:G,thicknessMap:xe,gradientMap:we,opaque:E.transparent===!1&&E.blending===Qr&&E.alphaToCoverage===!1,alphaMap:z,alphaTest:Le,alphaHash:ae,combine:E.combine,mapUv:de&&p(E.map.channel),aoMapUv:O&&p(E.aoMap.channel),lightMapUv:Z&&p(E.lightMap.channel),bumpMapUv:Q&&p(E.bumpMap.channel),normalMapUv:ce&&p(E.normalMap.channel),displacementMapUv:ie&&p(E.displacementMap.channel),emissiveMapUv:se&&p(E.emissiveMap.channel),metalnessMapUv:fe&&p(E.metalnessMap.channel),roughnessMapUv:b&&p(E.roughnessMap.channel),anisotropyMapUv:ye&&p(E.anisotropyMap.channel),clearcoatMapUv:be&&p(E.clearcoatMap.channel),clearcoatNormalMapUv:ge&&p(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&p(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&p(E.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&p(E.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&p(E.sheenColorMap.channel),sheenRoughnessMapUv:De&&p(E.sheenRoughnessMap.channel),specularMapUv:Se&&p(E.specularMap.channel),specularColorMapUv:Ae&&p(E.specularColorMap.channel),specularIntensityMapUv:Ie&&p(E.specularIntensityMap.channel),transmissionMapUv:G&&p(E.transmissionMap.channel),thicknessMapUv:xe&&p(E.thicknessMap.channel),alphaMapUv:z&&p(E.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(ce||S),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!H.attributes.uv&&(de||z),fog:!!ne,useFog:E.fog===!0,fogExp2:!!ne&&ne.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:R.isSkinnedMesh===!0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:X,morphTextureStride:le,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&B.length>0,shadowMapType:n.shadowMap.type,toneMapping:Pe,useLegacyLights:n._useLegacyLights,decodeVideoTexture:de&&E.map.isVideoTexture===!0&&ut.getTransfer(E.map.colorSpace)===xt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Un,flipSided:E.side===an,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:Me&&E.extensions.derivatives===!0,extensionFragDepth:Me&&E.extensions.fragDepth===!0,extensionDrawBuffers:Me&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:Me&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Me&&E.extensions.clipCullDistance===!0&&r.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Me&&E.extensions.multiDraw===!0&&r.has("WEBGL_multi_draw"),rendererExtensionFragDepth:f||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:f||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:f||r.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Ge.vertexUv1s=c.has(1),Ge.vertexUv2s=c.has(2),Ge.vertexUv3s=c.has(3),c.clear(),Ge}function y(E){const C=[];if(E.shaderID?C.push(E.shaderID):(C.push(E.customVertexShaderID),C.push(E.customFragmentShaderID)),E.defines!==void 0)for(const B in E.defines)C.push(B),C.push(E.defines[B]);return E.isRawShaderMaterial===!1&&(v(C,E),M(C,E),C.push(n.outputColorSpace)),C.push(E.customProgramCacheKey),C.join()}function v(E,C){E.push(C.precision),E.push(C.outputColorSpace),E.push(C.envMapMode),E.push(C.envMapCubeUVHeight),E.push(C.mapUv),E.push(C.alphaMapUv),E.push(C.lightMapUv),E.push(C.aoMapUv),E.push(C.bumpMapUv),E.push(C.normalMapUv),E.push(C.displacementMapUv),E.push(C.emissiveMapUv),E.push(C.metalnessMapUv),E.push(C.roughnessMapUv),E.push(C.anisotropyMapUv),E.push(C.clearcoatMapUv),E.push(C.clearcoatNormalMapUv),E.push(C.clearcoatRoughnessMapUv),E.push(C.iridescenceMapUv),E.push(C.iridescenceThicknessMapUv),E.push(C.sheenColorMapUv),E.push(C.sheenRoughnessMapUv),E.push(C.specularMapUv),E.push(C.specularColorMapUv),E.push(C.specularIntensityMapUv),E.push(C.transmissionMapUv),E.push(C.thicknessMapUv),E.push(C.combine),E.push(C.fogExp2),E.push(C.sizeAttenuation),E.push(C.morphTargetsCount),E.push(C.morphAttributeCount),E.push(C.numDirLights),E.push(C.numPointLights),E.push(C.numSpotLights),E.push(C.numSpotLightMaps),E.push(C.numHemiLights),E.push(C.numRectAreaLights),E.push(C.numDirLightShadows),E.push(C.numPointLightShadows),E.push(C.numSpotLightShadows),E.push(C.numSpotLightShadowsWithMaps),E.push(C.numLightProbes),E.push(C.shadowMapType),E.push(C.toneMapping),E.push(C.numClippingPlanes),E.push(C.numClipIntersection),E.push(C.depthPacking)}function M(E,C){a.disableAll(),C.isWebGL2&&a.enable(0),C.supportsVertexTextures&&a.enable(1),C.instancing&&a.enable(2),C.instancingColor&&a.enable(3),C.instancingMorph&&a.enable(4),C.matcap&&a.enable(5),C.envMap&&a.enable(6),C.normalMapObjectSpace&&a.enable(7),C.normalMapTangentSpace&&a.enable(8),C.clearcoat&&a.enable(9),C.iridescence&&a.enable(10),C.alphaTest&&a.enable(11),C.vertexColors&&a.enable(12),C.vertexAlphas&&a.enable(13),C.vertexUv1s&&a.enable(14),C.vertexUv2s&&a.enable(15),C.vertexUv3s&&a.enable(16),C.vertexTangents&&a.enable(17),C.anisotropy&&a.enable(18),C.alphaHash&&a.enable(19),C.batching&&a.enable(20),E.push(a.mask),a.disableAll(),C.fog&&a.enable(0),C.useFog&&a.enable(1),C.flatShading&&a.enable(2),C.logarithmicDepthBuffer&&a.enable(3),C.skinning&&a.enable(4),C.morphTargets&&a.enable(5),C.morphNormals&&a.enable(6),C.morphColors&&a.enable(7),C.premultipliedAlpha&&a.enable(8),C.shadowMapEnabled&&a.enable(9),C.useLegacyLights&&a.enable(10),C.doubleSided&&a.enable(11),C.flipSided&&a.enable(12),C.useDepthPacking&&a.enable(13),C.dithering&&a.enable(14),C.transmission&&a.enable(15),C.sheen&&a.enable(16),C.opaque&&a.enable(17),C.pointsUvs&&a.enable(18),C.decodeVideoTexture&&a.enable(19),C.alphaToCoverage&&a.enable(20),E.push(a.mask)}function A(E){const C=_[E.type];let B;if(C){const Y=qn[C];B=Ym.clone(Y.uniforms)}else B=E.uniforms;return B}function w(E,C){let B;for(let Y=0,R=u.length;Y<R;Y++){const ne=u[Y];if(ne.cacheKey===C){B=ne,++B.usedTimes;break}}return B===void 0&&(B=new cT(n,C,E,s),u.push(B)),B}function T(E){if(--E.usedTimes===0){const C=u.indexOf(E);u[C]=u[u.length-1],u.pop(),E.destroy()}}function P(E){l.remove(E)}function $(){l.dispose()}return{getParameters:m,getProgramCacheKey:y,getUniforms:A,acquireProgram:w,releaseProgram:T,releaseShaderCache:P,programs:u,dispose:$}}function pT(){let n=new WeakMap;function e(s){let o=n.get(s);return o===void 0&&(o={},n.set(s,o)),o}function t(s){n.delete(s)}function r(s,o,a){n.get(s)[o]=a}function i(){n=new WeakMap}return{get:e,remove:t,update:r,dispose:i}}function mT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function _d(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function vd(){const n=[];let e=0;const t=[],r=[],i=[];function s(){e=0,t.length=0,r.length=0,i.length=0}function o(f,h,d,g,_,p){let m=n[e];return m===void 0?(m={id:f.id,object:f,geometry:h,material:d,groupOrder:g,renderOrder:f.renderOrder,z:_,group:p},n[e]=m):(m.id=f.id,m.object=f,m.geometry=h,m.material=d,m.groupOrder=g,m.renderOrder=f.renderOrder,m.z=_,m.group=p),e++,m}function a(f,h,d,g,_,p){const m=o(f,h,d,g,_,p);d.transmission>0?r.push(m):d.transparent===!0?i.push(m):t.push(m)}function l(f,h,d,g,_,p){const m=o(f,h,d,g,_,p);d.transmission>0?r.unshift(m):d.transparent===!0?i.unshift(m):t.unshift(m)}function c(f,h){t.length>1&&t.sort(f||mT),r.length>1&&r.sort(h||_d),i.length>1&&i.sort(h||_d)}function u(){for(let f=e,h=n.length;f<h;f++){const d=n[f];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:r,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function gT(){let n=new WeakMap;function e(r,i){const s=n.get(r);let o;return s===void 0?(o=new vd,n.set(r,[o])):i>=s.length?(o=new vd,s.push(o)):o=s[i],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function _T(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ue};break;case"SpotLight":t={position:new D,direction:new D,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function vT(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let xT=0;function yT(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function MT(n,e){const t=new _T,r=vT(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new D);const s=new D,o=new Je,a=new Je;function l(u,f){let h=0,d=0,g=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let _=0,p=0,m=0,y=0,v=0,M=0,A=0,w=0,T=0,P=0,$=0;u.sort(yT);const E=f===!0?Math.PI:1;for(let B=0,Y=u.length;B<Y;B++){const R=u[B],ne=R.color,H=R.intensity,re=R.distance,J=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=ne.r*H*E,d+=ne.g*H*E,g+=ne.b*H*E;else if(R.isLightProbe){for(let K=0;K<9;K++)i.probe[K].addScaledVector(R.sh.coefficients[K],H);$++}else if(R.isDirectionalLight){const K=t.get(R);if(K.color.copy(R.color).multiplyScalar(R.intensity*E),R.castShadow){const q=R.shadow,U=r.get(R);U.shadowBias=q.bias,U.shadowNormalBias=q.normalBias,U.shadowRadius=q.radius,U.shadowMapSize=q.mapSize,i.directionalShadow[_]=U,i.directionalShadowMap[_]=J,i.directionalShadowMatrix[_]=R.shadow.matrix,M++}i.directional[_]=K,_++}else if(R.isSpotLight){const K=t.get(R);K.position.setFromMatrixPosition(R.matrixWorld),K.color.copy(ne).multiplyScalar(H*E),K.distance=re,K.coneCos=Math.cos(R.angle),K.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),K.decay=R.decay,i.spot[m]=K;const q=R.shadow;if(R.map&&(i.spotLightMap[T]=R.map,T++,q.updateMatrices(R),R.castShadow&&P++),i.spotLightMatrix[m]=q.matrix,R.castShadow){const U=r.get(R);U.shadowBias=q.bias,U.shadowNormalBias=q.normalBias,U.shadowRadius=q.radius,U.shadowMapSize=q.mapSize,i.spotShadow[m]=U,i.spotShadowMap[m]=J,w++}m++}else if(R.isRectAreaLight){const K=t.get(R);K.color.copy(ne).multiplyScalar(H),K.halfWidth.set(R.width*.5,0,0),K.halfHeight.set(0,R.height*.5,0),i.rectArea[y]=K,y++}else if(R.isPointLight){const K=t.get(R);if(K.color.copy(R.color).multiplyScalar(R.intensity*E),K.distance=R.distance,K.decay=R.decay,R.castShadow){const q=R.shadow,U=r.get(R);U.shadowBias=q.bias,U.shadowNormalBias=q.normalBias,U.shadowRadius=q.radius,U.shadowMapSize=q.mapSize,U.shadowCameraNear=q.camera.near,U.shadowCameraFar=q.camera.far,i.pointShadow[p]=U,i.pointShadowMap[p]=J,i.pointShadowMatrix[p]=R.shadow.matrix,A++}i.point[p]=K,p++}else if(R.isHemisphereLight){const K=t.get(R);K.skyColor.copy(R.color).multiplyScalar(H*E),K.groundColor.copy(R.groundColor).multiplyScalar(H*E),i.hemi[v]=K,v++}}y>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ne.LTC_FLOAT_1,i.rectAreaLTC2=Ne.LTC_FLOAT_2):(i.rectAreaLTC1=Ne.LTC_HALF_1,i.rectAreaLTC2=Ne.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ne.LTC_FLOAT_1,i.rectAreaLTC2=Ne.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=Ne.LTC_HALF_1,i.rectAreaLTC2=Ne.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=g;const C=i.hash;(C.directionalLength!==_||C.pointLength!==p||C.spotLength!==m||C.rectAreaLength!==y||C.hemiLength!==v||C.numDirectionalShadows!==M||C.numPointShadows!==A||C.numSpotShadows!==w||C.numSpotMaps!==T||C.numLightProbes!==$)&&(i.directional.length=_,i.spot.length=m,i.rectArea.length=y,i.point.length=p,i.hemi.length=v,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=w+T-P,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=$,C.directionalLength=_,C.pointLength=p,C.spotLength=m,C.rectAreaLength=y,C.hemiLength=v,C.numDirectionalShadows=M,C.numPointShadows=A,C.numSpotShadows=w,C.numSpotMaps=T,C.numLightProbes=$,i.version=xT++)}function c(u,f){let h=0,d=0,g=0,_=0,p=0;const m=f.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){const M=u[y];if(M.isDirectionalLight){const A=i.directional[h];A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),h++}else if(M.isSpotLight){const A=i.spot[g];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(M.isRectAreaLight){const A=i.rectArea[_];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),a.identity(),o.copy(M.matrixWorld),o.premultiply(m),a.extractRotation(o),A.halfWidth.set(M.width*.5,0,0),A.halfHeight.set(0,M.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(M.isPointLight){const A=i.point[d];A.position.setFromMatrixPosition(M.matrixWorld),A.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const A=i.hemi[p];A.direction.setFromMatrixPosition(M.matrixWorld),A.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:i}}function xd(n,e){const t=new MT(n,e),r=[],i=[];function s(){r.length=0,i.length=0}function o(f){r.push(f)}function a(f){i.push(f)}function l(f){t.setup(r,f)}function c(f){t.setupView(r,f)}return{init:s,state:{lightsArray:r,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function ST(n,e){let t=new WeakMap;function r(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new xd(n,e),t.set(s,[l])):o>=a.length?(l=new xd(n,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:r,dispose:i}}class ig extends Jn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ay,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class rg extends Jn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const bT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ET=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function TT(n,e,t){let r=new wu;const i=new Ce,s=new Ce,o=new pt,a=new ig({depthPacking:Im}),l=new rg,c={},u=t.maxTextureSize,f={[gi]:an,[an]:gi,[Un]:Un},h=new ji({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ce},radius:{value:4}},vertexShader:bT,fragmentShader:ET}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const g=new Mn;g.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new at(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ym;let m=this.type;this.render=function(w,T,P){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const $=n.getRenderTarget(),E=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),B=n.state;B.setBlending(Hi),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const Y=m!==ci&&this.type===ci,R=m===ci&&this.type!==ci;for(let ne=0,H=w.length;ne<H;ne++){const re=w[ne],J=re.shadow;if(J===void 0){console.warn("THREE.WebGLShadowMap:",re,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;i.copy(J.mapSize);const K=J.getFrameExtents();if(i.multiply(K),s.copy(J.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/K.x),i.x=s.x*K.x,J.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/K.y),i.y=s.y*K.y,J.mapSize.y=s.y)),J.map===null||Y===!0||R===!0){const U=this.type!==ci?{minFilter:Ut,magFilter:Ut}:{};J.map!==null&&J.map.dispose(),J.map=new vr(i.x,i.y,U),J.map.texture.name=re.name+".shadowMap",J.camera.updateProjectionMatrix()}n.setRenderTarget(J.map),n.clear();const q=J.getViewportCount();for(let U=0;U<q;U++){const X=J.getViewport(U);o.set(s.x*X.x,s.y*X.y,s.x*X.z,s.y*X.w),B.viewport(o),J.updateMatrices(re,U),r=J.getFrustum(),M(T,P,J.camera,re,this.type)}J.isPointLightShadow!==!0&&this.type===ci&&y(J,P),J.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget($,E,C)};function y(w,T){const P=e.update(_);h.defines.VSM_SAMPLES!==w.blurSamples&&(h.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new vr(i.x,i.y)),h.uniforms.shadow_pass.value=w.map.texture,h.uniforms.resolution.value=w.mapSize,h.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(T,null,P,h,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(T,null,P,d,_,null)}function v(w,T,P,$){let E=null;const C=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(C!==void 0)E=C;else if(E=P.isPointLight===!0?l:a,n.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const B=E.uuid,Y=T.uuid;let R=c[B];R===void 0&&(R={},c[B]=R);let ne=R[Y];ne===void 0&&(ne=E.clone(),R[Y]=ne,T.addEventListener("dispose",A)),E=ne}if(E.visible=T.visible,E.wireframe=T.wireframe,$===ci?E.side=T.shadowSide!==null?T.shadowSide:T.side:E.side=T.shadowSide!==null?T.shadowSide:f[T.side],E.alphaMap=T.alphaMap,E.alphaTest=T.alphaTest,E.map=T.map,E.clipShadows=T.clipShadows,E.clippingPlanes=T.clippingPlanes,E.clipIntersection=T.clipIntersection,E.displacementMap=T.displacementMap,E.displacementScale=T.displacementScale,E.displacementBias=T.displacementBias,E.wireframeLinewidth=T.wireframeLinewidth,E.linewidth=T.linewidth,P.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const B=n.properties.get(E);B.light=P}return E}function M(w,T,P,$,E){if(w.visible===!1)return;if(w.layers.test(T.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===ci)&&(!w.frustumCulled||r.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const Y=e.update(w),R=w.material;if(Array.isArray(R)){const ne=Y.groups;for(let H=0,re=ne.length;H<re;H++){const J=ne[H],K=R[J.materialIndex];if(K&&K.visible){const q=v(w,K,$,E);w.onBeforeShadow(n,w,T,P,Y,q,J),n.renderBufferDirect(P,null,Y,q,w,J),w.onAfterShadow(n,w,T,P,Y,q,J)}}}else if(R.visible){const ne=v(w,R,$,E);w.onBeforeShadow(n,w,T,P,Y,ne,null),n.renderBufferDirect(P,null,Y,ne,w,null),w.onAfterShadow(n,w,T,P,Y,ne,null)}}const B=w.children;for(let Y=0,R=B.length;Y<R;Y++)M(B[Y],T,P,$,E)}function A(w){w.target.removeEventListener("dispose",A);for(const P in c){const $=c[P],E=w.target.uuid;E in $&&($[E].dispose(),delete $[E])}}}function wT(n,e,t){const r=t.isWebGL2;function i(){let z=!1;const Le=new pt;let ae=null;const Me=new pt(0,0,0,0);return{setMask:function(Pe){ae!==Pe&&!z&&(n.colorMask(Pe,Pe,Pe,Pe),ae=Pe)},setLocked:function(Pe){z=Pe},setClear:function(Pe,Ge,ke,He,nt){nt===!0&&(Pe*=He,Ge*=He,ke*=He),Le.set(Pe,Ge,ke,He),Me.equals(Le)===!1&&(n.clearColor(Pe,Ge,ke,He),Me.copy(Le))},reset:function(){z=!1,ae=null,Me.set(-1,0,0,0)}}}function s(){let z=!1,Le=null,ae=null,Me=null;return{setTest:function(Pe){Pe?ee(n.DEPTH_TEST):me(n.DEPTH_TEST)},setMask:function(Pe){Le!==Pe&&!z&&(n.depthMask(Pe),Le=Pe)},setFunc:function(Pe){if(ae!==Pe){switch(Pe){case Nx:n.depthFunc(n.NEVER);break;case Ox:n.depthFunc(n.ALWAYS);break;case Bx:n.depthFunc(n.LESS);break;case Ca:n.depthFunc(n.LEQUAL);break;case kx:n.depthFunc(n.EQUAL);break;case Gx:n.depthFunc(n.GEQUAL);break;case zx:n.depthFunc(n.GREATER);break;case Hx:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ae=Pe}},setLocked:function(Pe){z=Pe},setClear:function(Pe){Me!==Pe&&(n.clearDepth(Pe),Me=Pe)},reset:function(){z=!1,Le=null,ae=null,Me=null}}}function o(){let z=!1,Le=null,ae=null,Me=null,Pe=null,Ge=null,ke=null,He=null,nt=null;return{setTest:function(We){z||(We?ee(n.STENCIL_TEST):me(n.STENCIL_TEST))},setMask:function(We){Le!==We&&!z&&(n.stencilMask(We),Le=We)},setFunc:function(We,Ye,mt){(ae!==We||Me!==Ye||Pe!==mt)&&(n.stencilFunc(We,Ye,mt),ae=We,Me=Ye,Pe=mt)},setOp:function(We,Ye,mt){(Ge!==We||ke!==Ye||He!==mt)&&(n.stencilOp(We,Ye,mt),Ge=We,ke=Ye,He=mt)},setLocked:function(We){z=We},setClear:function(We){nt!==We&&(n.clearStencil(We),nt=We)},reset:function(){z=!1,Le=null,ae=null,Me=null,Pe=null,Ge=null,ke=null,He=null,nt=null}}}const a=new i,l=new s,c=new o,u=new WeakMap,f=new WeakMap;let h={},d={},g=new WeakMap,_=[],p=null,m=!1,y=null,v=null,M=null,A=null,w=null,T=null,P=null,$=new Ue(0,0,0),E=0,C=!1,B=null,Y=null,R=null,ne=null,H=null;const re=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,K=0;const q=n.getParameter(n.VERSION);q.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(q)[1]),J=K>=1):q.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),J=K>=2);let U=null,X={};const le=n.getParameter(n.SCISSOR_BOX),N=n.getParameter(n.VIEWPORT),V=new pt().fromArray(le),oe=new pt().fromArray(N);function F(z,Le,ae,Me){const Pe=new Uint8Array(4),Ge=n.createTexture();n.bindTexture(z,Ge),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<ae;ke++)r&&(z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY)?n.texImage3D(Le,0,n.RGBA,1,1,Me,0,n.RGBA,n.UNSIGNED_BYTE,Pe):n.texImage2D(Le+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Pe);return Ge}const j={};j[n.TEXTURE_2D]=F(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=F(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(j[n.TEXTURE_2D_ARRAY]=F(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=F(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),ee(n.DEPTH_TEST),l.setFunc(Ca),ie(!1),se(Zf),ee(n.CULL_FACE),Q(Hi);function ee(z){h[z]!==!0&&(n.enable(z),h[z]=!0)}function me(z){h[z]!==!1&&(n.disable(z),h[z]=!1)}function de(z,Le){return d[z]!==Le?(n.bindFramebuffer(z,Le),d[z]=Le,r&&(z===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=Le),z===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=Le)),!0):!1}function x(z,Le){let ae=_,Me=!1;if(z){ae=g.get(Le),ae===void 0&&(ae=[],g.set(Le,ae));const Pe=z.textures;if(ae.length!==Pe.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let Ge=0,ke=Pe.length;Ge<ke;Ge++)ae[Ge]=n.COLOR_ATTACHMENT0+Ge;ae.length=Pe.length,Me=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,Me=!0);if(Me)if(t.isWebGL2)n.drawBuffers(ae);else if(e.has("WEBGL_draw_buffers")===!0)e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae);else throw new Error("THREE.WebGLState: Usage of gl.drawBuffers() require WebGL2 or WEBGL_draw_buffers extension")}function I(z){return p!==z?(n.useProgram(z),p=z,!0):!1}const O={[cr]:n.FUNC_ADD,[Mx]:n.FUNC_SUBTRACT,[Sx]:n.FUNC_REVERSE_SUBTRACT};if(r)O[eh]=n.MIN,O[th]=n.MAX;else{const z=e.get("EXT_blend_minmax");z!==null&&(O[eh]=z.MIN_EXT,O[th]=z.MAX_EXT)}const Z={[bx]:n.ZERO,[Ex]:n.ONE,[Tx]:n.SRC_COLOR,[Ic]:n.SRC_ALPHA,[Px]:n.SRC_ALPHA_SATURATE,[Cx]:n.DST_COLOR,[Ax]:n.DST_ALPHA,[wx]:n.ONE_MINUS_SRC_COLOR,[Fc]:n.ONE_MINUS_SRC_ALPHA,[Lx]:n.ONE_MINUS_DST_COLOR,[Rx]:n.ONE_MINUS_DST_ALPHA,[Ux]:n.CONSTANT_COLOR,[Dx]:n.ONE_MINUS_CONSTANT_COLOR,[Ix]:n.CONSTANT_ALPHA,[Fx]:n.ONE_MINUS_CONSTANT_ALPHA};function Q(z,Le,ae,Me,Pe,Ge,ke,He,nt,We){if(z===Hi){m===!0&&(me(n.BLEND),m=!1);return}if(m===!1&&(ee(n.BLEND),m=!0),z!==yx){if(z!==y||We!==C){if((v!==cr||w!==cr)&&(n.blendEquation(n.FUNC_ADD),v=cr,w=cr),We)switch(z){case Qr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jf:n.blendFunc(n.ONE,n.ONE);break;case $f:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qf:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Qr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Jf:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case $f:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Qf:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}M=null,A=null,T=null,P=null,$.set(0,0,0),E=0,y=z,C=We}return}Pe=Pe||Le,Ge=Ge||ae,ke=ke||Me,(Le!==v||Pe!==w)&&(n.blendEquationSeparate(O[Le],O[Pe]),v=Le,w=Pe),(ae!==M||Me!==A||Ge!==T||ke!==P)&&(n.blendFuncSeparate(Z[ae],Z[Me],Z[Ge],Z[ke]),M=ae,A=Me,T=Ge,P=ke),(He.equals($)===!1||nt!==E)&&(n.blendColor(He.r,He.g,He.b,nt),$.copy(He),E=nt),y=z,C=!1}function ce(z,Le){z.side===Un?me(n.CULL_FACE):ee(n.CULL_FACE);let ae=z.side===an;Le&&(ae=!ae),ie(ae),z.blending===Qr&&z.transparent===!1?Q(Hi):Q(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),l.setFunc(z.depthFunc),l.setTest(z.depthTest),l.setMask(z.depthWrite),a.setMask(z.colorWrite);const Me=z.stencilWrite;c.setTest(Me),Me&&(c.setMask(z.stencilWriteMask),c.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),c.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),b(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):me(n.SAMPLE_ALPHA_TO_COVERAGE)}function ie(z){B!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),B=z)}function se(z){z!==vx?(ee(n.CULL_FACE),z!==Y&&(z===Zf?n.cullFace(n.BACK):z===xx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):me(n.CULL_FACE),Y=z}function fe(z){z!==R&&(J&&n.lineWidth(z),R=z)}function b(z,Le,ae){z?(ee(n.POLYGON_OFFSET_FILL),(ne!==Le||H!==ae)&&(n.polygonOffset(Le,ae),ne=Le,H=ae)):me(n.POLYGON_OFFSET_FILL)}function S(z){z?ee(n.SCISSOR_TEST):me(n.SCISSOR_TEST)}function k(z){z===void 0&&(z=n.TEXTURE0+re-1),U!==z&&(n.activeTexture(z),U=z)}function W(z,Le,ae){ae===void 0&&(U===null?ae=n.TEXTURE0+re-1:ae=U);let Me=X[ae];Me===void 0&&(Me={type:void 0,texture:void 0},X[ae]=Me),(Me.type!==z||Me.texture!==Le)&&(U!==ae&&(n.activeTexture(ae),U=ae),n.bindTexture(z,Le||j[z]),Me.type=z,Me.texture=Le)}function te(){const z=X[U];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function he(){try{n.compressedTexImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ye(){try{n.compressedTexImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function be(){try{n.texSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ge(){try{n.texSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ee(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Fe(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Te(){try{n.texStorage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Be(){try{n.texStorage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function De(){try{n.texImage2D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Se(){try{n.texImage3D.apply(n,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ae(z){V.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),V.copy(z))}function Ie(z){oe.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),oe.copy(z))}function G(z,Le){let ae=f.get(Le);ae===void 0&&(ae=new WeakMap,f.set(Le,ae));let Me=ae.get(z);Me===void 0&&(Me=n.getUniformBlockIndex(Le,z.name),ae.set(z,Me))}function xe(z,Le){const Me=f.get(Le).get(z);u.get(Le)!==Me&&(n.uniformBlockBinding(Le,Me,z.__bindingPointIndex),u.set(Le,Me))}function we(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),r===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},U=null,X={},d={},g=new WeakMap,_=[],p=null,m=!1,y=null,v=null,M=null,A=null,w=null,T=null,P=null,$=new Ue(0,0,0),E=0,C=!1,B=null,Y=null,R=null,ne=null,H=null,V.set(0,0,n.canvas.width,n.canvas.height),oe.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:ee,disable:me,bindFramebuffer:de,drawBuffers:x,useProgram:I,setBlending:Q,setMaterial:ce,setFlipSided:ie,setCullFace:se,setLineWidth:fe,setPolygonOffset:b,setScissorTest:S,activeTexture:k,bindTexture:W,unbindTexture:te,compressedTexImage2D:he,compressedTexImage3D:ye,texImage2D:De,texImage3D:Se,updateUBOMapping:G,uniformBlockBinding:xe,texStorage2D:Te,texStorage3D:Be,texSubImage2D:be,texSubImage3D:ge,compressedTexSubImage2D:Ee,compressedTexSubImage3D:Fe,scissor:Ae,viewport:Ie,reset:we}}function AT(n,e,t,r,i,s,o){const a=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ce,f=new WeakMap;let h;const d=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,S){return g?new OffscreenCanvas(b,S):vo("canvas")}function p(b,S,k,W){let te=1;const he=fe(b);if((he.width>W||he.height>W)&&(te=W/Math.max(he.width,he.height)),te<1||S===!0)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const ye=S?Fa:Math.floor,be=ye(te*he.width),ge=ye(te*he.height);h===void 0&&(h=_(be,ge));const Ee=k?_(be,ge):h;return Ee.width=be,Ee.height=ge,Ee.getContext("2d").drawImage(b,0,0,be,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+he.width+"x"+he.height+") to ("+be+"x"+ge+")."),Ee}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+he.width+"x"+he.height+")."),b;return b}function m(b){const S=fe(b);return Hc(S.width)&&Hc(S.height)}function y(b){return a?!1:b.wrapS!==_n||b.wrapT!==_n||b.minFilter!==Ut&&b.minFilter!==Pt}function v(b,S){return b.generateMipmaps&&S&&b.minFilter!==Ut&&b.minFilter!==Pt}function M(b){n.generateMipmap(b)}function A(b,S,k,W,te=!1){if(a===!1)return S;if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let he=S;if(S===n.RED&&(k===n.FLOAT&&(he=n.R32F),k===n.HALF_FLOAT&&(he=n.R16F),k===n.UNSIGNED_BYTE&&(he=n.R8)),S===n.RED_INTEGER&&(k===n.UNSIGNED_BYTE&&(he=n.R8UI),k===n.UNSIGNED_SHORT&&(he=n.R16UI),k===n.UNSIGNED_INT&&(he=n.R32UI),k===n.BYTE&&(he=n.R8I),k===n.SHORT&&(he=n.R16I),k===n.INT&&(he=n.R32I)),S===n.RG&&(k===n.FLOAT&&(he=n.RG32F),k===n.HALF_FLOAT&&(he=n.RG16F),k===n.UNSIGNED_BYTE&&(he=n.RG8)),S===n.RG_INTEGER&&(k===n.UNSIGNED_BYTE&&(he=n.RG8UI),k===n.UNSIGNED_SHORT&&(he=n.RG16UI),k===n.UNSIGNED_INT&&(he=n.RG32UI),k===n.BYTE&&(he=n.RG8I),k===n.SHORT&&(he=n.RG16I),k===n.INT&&(he=n.RG32I)),S===n.RGBA){const ye=te?Pa:ut.getTransfer(W);k===n.FLOAT&&(he=n.RGBA32F),k===n.HALF_FLOAT&&(he=n.RGBA16F),k===n.UNSIGNED_BYTE&&(he=ye===xt?n.SRGB8_ALPHA8:n.RGBA8),k===n.UNSIGNED_SHORT_4_4_4_4&&(he=n.RGBA4),k===n.UNSIGNED_SHORT_5_5_5_1&&(he=n.RGB5_A1)}return(he===n.R16F||he===n.R32F||he===n.RG16F||he===n.RG32F||he===n.RGBA16F||he===n.RGBA32F)&&e.get("EXT_color_buffer_float"),he}function w(b,S,k){return v(b,k)===!0||b.isFramebufferTexture&&b.minFilter!==Ut&&b.minFilter!==Pt?Math.log2(Math.max(S.width,S.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?S.mipmaps.length:1}function T(b){return b===Ut||b===Bc||b===Xr?n.NEAREST:n.LINEAR}function P(b){const S=b.target;S.removeEventListener("dispose",P),E(S),S.isVideoTexture&&f.delete(S)}function $(b){const S=b.target;S.removeEventListener("dispose",$),B(S)}function E(b){const S=r.get(b);if(S.__webglInit===void 0)return;const k=b.source,W=d.get(k);if(W){const te=W[S.__cacheKey];te.usedTimes--,te.usedTimes===0&&C(b),Object.keys(W).length===0&&d.delete(k)}r.remove(b)}function C(b){const S=r.get(b);n.deleteTexture(S.__webglTexture);const k=b.source,W=d.get(k);delete W[S.__cacheKey],o.memory.textures--}function B(b){const S=r.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(S.__webglFramebuffer[W]))for(let te=0;te<S.__webglFramebuffer[W].length;te++)n.deleteFramebuffer(S.__webglFramebuffer[W][te]);else n.deleteFramebuffer(S.__webglFramebuffer[W]);S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer[W])}else{if(Array.isArray(S.__webglFramebuffer))for(let W=0;W<S.__webglFramebuffer.length;W++)n.deleteFramebuffer(S.__webglFramebuffer[W]);else n.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&n.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&n.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let W=0;W<S.__webglColorRenderbuffer.length;W++)S.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(S.__webglColorRenderbuffer[W]);S.__webglDepthRenderbuffer&&n.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=b.textures;for(let W=0,te=k.length;W<te;W++){const he=r.get(k[W]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),o.memory.textures--),r.remove(k[W])}r.remove(b)}let Y=0;function R(){Y=0}function ne(){const b=Y;return b>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+i.maxTextures),Y+=1,b}function H(b){const S=[];return S.push(b.wrapS),S.push(b.wrapT),S.push(b.wrapR||0),S.push(b.magFilter),S.push(b.minFilter),S.push(b.anisotropy),S.push(b.internalFormat),S.push(b.format),S.push(b.type),S.push(b.generateMipmaps),S.push(b.premultiplyAlpha),S.push(b.flipY),S.push(b.unpackAlignment),S.push(b.colorSpace),S.join()}function re(b,S){const k=r.get(b);if(b.isVideoTexture&&ie(b),b.isRenderTargetTexture===!1&&b.version>0&&k.__version!==b.version){const W=b.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(k,b,S);return}}t.bindTexture(n.TEXTURE_2D,k.__webglTexture,n.TEXTURE0+S)}function J(b,S){const k=r.get(b);if(b.version>0&&k.__version!==b.version){oe(k,b,S);return}t.bindTexture(n.TEXTURE_2D_ARRAY,k.__webglTexture,n.TEXTURE0+S)}function K(b,S){const k=r.get(b);if(b.version>0&&k.__version!==b.version){oe(k,b,S);return}t.bindTexture(n.TEXTURE_3D,k.__webglTexture,n.TEXTURE0+S)}function q(b,S){const k=r.get(b);if(b.version>0&&k.__version!==b.version){F(k,b,S);return}t.bindTexture(n.TEXTURE_CUBE_MAP,k.__webglTexture,n.TEXTURE0+S)}const U={[cs]:n.REPEAT,[_n]:n.CLAMP_TO_EDGE,[La]:n.MIRRORED_REPEAT},X={[Ut]:n.NEAREST,[Bc]:n.NEAREST_MIPMAP_NEAREST,[Xr]:n.NEAREST_MIPMAP_LINEAR,[Pt]:n.LINEAR,[ya]:n.LINEAR_MIPMAP_NEAREST,[fi]:n.LINEAR_MIPMAP_LINEAR},le={[cy]:n.NEVER,[my]:n.ALWAYS,[uy]:n.LESS,[Nm]:n.LEQUAL,[fy]:n.EQUAL,[py]:n.GEQUAL,[hy]:n.GREATER,[dy]:n.NOTEQUAL};function N(b,S,k){if(S.type===Dn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Pt||S.magFilter===ya||S.magFilter===Xr||S.magFilter===fi||S.minFilter===Pt||S.minFilter===ya||S.minFilter===Xr||S.minFilter===fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),k?(n.texParameteri(b,n.TEXTURE_WRAP_S,U[S.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,U[S.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,U[S.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,X[S.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,X[S.minFilter])):(n.texParameteri(b,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(b,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(S.wrapS!==_n||S.wrapT!==_n)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(b,n.TEXTURE_MAG_FILTER,T(S.magFilter)),n.texParameteri(b,n.TEXTURE_MIN_FILTER,T(S.minFilter)),S.minFilter!==Ut&&S.minFilter!==Pt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,le[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Ut||S.minFilter!==Xr&&S.minFilter!==fi||S.type===Dn&&e.has("OES_texture_float_linear")===!1||a===!1&&S.type===go&&e.has("OES_texture_half_float_linear")===!1)return;if(S.anisotropy>1||r.get(S).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),r.get(S).__currentAnisotropy=S.anisotropy}}}function V(b,S){let k=!1;b.__webglInit===void 0&&(b.__webglInit=!0,S.addEventListener("dispose",P));const W=S.source;let te=d.get(W);te===void 0&&(te={},d.set(W,te));const he=H(S);if(he!==b.__cacheKey){te[he]===void 0&&(te[he]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,k=!0),te[he].usedTimes++;const ye=te[b.__cacheKey];ye!==void 0&&(te[b.__cacheKey].usedTimes--,ye.usedTimes===0&&C(S)),b.__cacheKey=he,b.__webglTexture=te[he].texture}return k}function oe(b,S,k){let W=n.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),S.isData3DTexture&&(W=n.TEXTURE_3D);const te=V(b,S),he=S.source;t.bindTexture(W,b.__webglTexture,n.TEXTURE0+k);const ye=r.get(he);if(he.version!==ye.__version||te===!0){t.activeTexture(n.TEXTURE0+k);const be=ut.getPrimaries(ut.workingColorSpace),ge=S.colorSpace===Oi?null:ut.getPrimaries(S.colorSpace),Ee=S.colorSpace===Oi||be===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Fe=y(S)&&m(S.image)===!1;let Te=p(S.image,Fe,!1,i.maxTextureSize);Te=se(S,Te);const Be=m(Te)||a,De=s.convert(S.format,S.colorSpace);let Se=s.convert(S.type),Ae=A(S.internalFormat,De,Se,S.colorSpace,S.isVideoTexture);N(W,S,Be);let Ie;const G=S.mipmaps,xe=a&&S.isVideoTexture!==!0&&Ae!==Um,we=ye.__version===void 0||te===!0,z=he.dataReady,Le=w(S,Te,Be);if(S.isDepthTexture)Ae=n.DEPTH_COMPONENT,a?S.type===Dn?Ae=n.DEPTH_COMPONENT32F:S.type===Bi?Ae=n.DEPTH_COMPONENT24:S.type===pr?Ae=n.DEPTH24_STENCIL8:Ae=n.DEPTH_COMPONENT16:S.type===Dn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===mr&&Ae===n.DEPTH_COMPONENT&&S.type!==Su&&S.type!==Bi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Bi,Se=s.convert(S.type)),S.format===us&&Ae===n.DEPTH_COMPONENT&&(Ae=n.DEPTH_STENCIL,S.type!==pr&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=pr,Se=s.convert(S.type))),we&&(xe?t.texStorage2D(n.TEXTURE_2D,1,Ae,Te.width,Te.height):t.texImage2D(n.TEXTURE_2D,0,Ae,Te.width,Te.height,0,De,Se,null));else if(S.isDataTexture)if(G.length>0&&Be){xe&&we&&t.texStorage2D(n.TEXTURE_2D,Le,Ae,G[0].width,G[0].height);for(let ae=0,Me=G.length;ae<Me;ae++)Ie=G[ae],xe?z&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Ie.width,Ie.height,De,Se,Ie.data):t.texImage2D(n.TEXTURE_2D,ae,Ae,Ie.width,Ie.height,0,De,Se,Ie.data);S.generateMipmaps=!1}else xe?(we&&t.texStorage2D(n.TEXTURE_2D,Le,Ae,Te.width,Te.height),z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Te.width,Te.height,De,Se,Te.data)):t.texImage2D(n.TEXTURE_2D,0,Ae,Te.width,Te.height,0,De,Se,Te.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){xe&&we&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Le,Ae,G[0].width,G[0].height,Te.depth);for(let ae=0,Me=G.length;ae<Me;ae++)Ie=G[ae],S.format!==vn?De!==null?xe?z&&t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Ie.width,Ie.height,Te.depth,De,Ie.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,Ae,Ie.width,Ie.height,Te.depth,0,Ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xe?z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,Ie.width,Ie.height,Te.depth,De,Se,Ie.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,Ae,Ie.width,Ie.height,Te.depth,0,De,Se,Ie.data)}else{xe&&we&&t.texStorage2D(n.TEXTURE_2D,Le,Ae,G[0].width,G[0].height);for(let ae=0,Me=G.length;ae<Me;ae++)Ie=G[ae],S.format!==vn?De!==null?xe?z&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,Ie.width,Ie.height,De,Ie.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,Ae,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):xe?z&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,Ie.width,Ie.height,De,Se,Ie.data):t.texImage2D(n.TEXTURE_2D,ae,Ae,Ie.width,Ie.height,0,De,Se,Ie.data)}else if(S.isDataArrayTexture)xe?(we&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Le,Ae,Te.width,Te.height,Te.depth),z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Te.width,Te.height,Te.depth,De,Se,Te.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,Te.width,Te.height,Te.depth,0,De,Se,Te.data);else if(S.isData3DTexture)xe?(we&&t.texStorage3D(n.TEXTURE_3D,Le,Ae,Te.width,Te.height,Te.depth),z&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Te.width,Te.height,Te.depth,De,Se,Te.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,Te.width,Te.height,Te.depth,0,De,Se,Te.data);else if(S.isFramebufferTexture){if(we)if(xe)t.texStorage2D(n.TEXTURE_2D,Le,Ae,Te.width,Te.height);else{let ae=Te.width,Me=Te.height;for(let Pe=0;Pe<Le;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,Ae,ae,Me,0,De,Se,null),ae>>=1,Me>>=1}}else if(G.length>0&&Be){if(xe&&we){const ae=fe(G[0]);t.texStorage2D(n.TEXTURE_2D,Le,Ae,ae.width,ae.height)}for(let ae=0,Me=G.length;ae<Me;ae++)Ie=G[ae],xe?z&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,De,Se,Ie):t.texImage2D(n.TEXTURE_2D,ae,Ae,De,Se,Ie);S.generateMipmaps=!1}else if(xe){if(we){const ae=fe(Te);t.texStorage2D(n.TEXTURE_2D,Le,Ae,ae.width,ae.height)}z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,De,Se,Te)}else t.texImage2D(n.TEXTURE_2D,0,Ae,De,Se,Te);v(S,Be)&&M(W),ye.__version=he.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function F(b,S,k){if(S.image.length!==6)return;const W=V(b,S),te=S.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+k);const he=r.get(te);if(te.version!==he.__version||W===!0){t.activeTexture(n.TEXTURE0+k);const ye=ut.getPrimaries(ut.workingColorSpace),be=S.colorSpace===Oi?null:ut.getPrimaries(S.colorSpace),ge=S.colorSpace===Oi||ye===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge);const Ee=S.isCompressedTexture||S.image[0].isCompressedTexture,Fe=S.image[0]&&S.image[0].isDataTexture,Te=[];for(let ae=0;ae<6;ae++)!Ee&&!Fe?Te[ae]=p(S.image[ae],!1,!0,i.maxCubemapSize):Te[ae]=Fe?S.image[ae].image:S.image[ae],Te[ae]=se(S,Te[ae]);const Be=Te[0],De=m(Be)||a,Se=s.convert(S.format,S.colorSpace),Ae=s.convert(S.type),Ie=A(S.internalFormat,Se,Ae,S.colorSpace),G=a&&S.isVideoTexture!==!0,xe=he.__version===void 0||W===!0,we=te.dataReady;let z=w(S,Be,De);N(n.TEXTURE_CUBE_MAP,S,De);let Le;if(Ee){G&&xe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,z,Ie,Be.width,Be.height);for(let ae=0;ae<6;ae++){Le=Te[ae].mipmaps;for(let Me=0;Me<Le.length;Me++){const Pe=Le[Me];S.format!==vn?Se!==null?G?we&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me,0,0,Pe.width,Pe.height,Se,Pe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me,Ie,Pe.width,Pe.height,0,Pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me,0,0,Pe.width,Pe.height,Se,Ae,Pe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me,Ie,Pe.width,Pe.height,0,Se,Ae,Pe.data)}}}else{if(Le=S.mipmaps,G&&xe){Le.length>0&&z++;const ae=fe(Te[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,z,Ie,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(Fe){G?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Te[ae].width,Te[ae].height,Se,Ae,Te[ae].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ie,Te[ae].width,Te[ae].height,0,Se,Ae,Te[ae].data);for(let Me=0;Me<Le.length;Me++){const Ge=Le[Me].image[ae].image;G?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me+1,0,0,Ge.width,Ge.height,Se,Ae,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me+1,Ie,Ge.width,Ge.height,0,Se,Ae,Ge.data)}}else{G?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Se,Ae,Te[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Ie,Se,Ae,Te[ae]);for(let Me=0;Me<Le.length;Me++){const Pe=Le[Me];G?we&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me+1,0,0,Se,Ae,Pe.image[ae]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Me+1,Ie,Se,Ae,Pe.image[ae])}}}v(S,De)&&M(n.TEXTURE_CUBE_MAP),he.__version=te.version,S.onUpdate&&S.onUpdate(S)}b.__version=S.version}function j(b,S,k,W,te,he){const ye=s.convert(k.format,k.colorSpace),be=s.convert(k.type),ge=A(k.internalFormat,ye,be,k.colorSpace);if(!r.get(S).__hasExternalTextures){const Fe=Math.max(1,S.width>>he),Te=Math.max(1,S.height>>he);te===n.TEXTURE_3D||te===n.TEXTURE_2D_ARRAY?t.texImage3D(te,he,ge,Fe,Te,S.depth,0,ye,be,null):t.texImage2D(te,he,ge,Fe,Te,0,ye,be,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),ce(S)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,te,r.get(k).__webglTexture,0,Q(S)):(te===n.TEXTURE_2D||te>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,te,r.get(k).__webglTexture,he),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ee(b,S,k){if(n.bindRenderbuffer(n.RENDERBUFFER,b),S.depthBuffer&&!S.stencilBuffer){let W=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(k||ce(S)){const te=S.depthTexture;te&&te.isDepthTexture&&(te.type===Dn?W=n.DEPTH_COMPONENT32F:te.type===Bi&&(W=n.DEPTH_COMPONENT24));const he=Q(S);ce(S)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,he,W,S.width,S.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,he,W,S.width,S.height)}else n.renderbufferStorage(n.RENDERBUFFER,W,S.width,S.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,b)}else if(S.depthBuffer&&S.stencilBuffer){const W=Q(S);k&&ce(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,W,n.DEPTH24_STENCIL8,S.width,S.height):ce(S)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,W,n.DEPTH24_STENCIL8,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,b)}else{const W=S.textures;for(let te=0;te<W.length;te++){const he=W[te],ye=s.convert(he.format,he.colorSpace),be=s.convert(he.type),ge=A(he.internalFormat,ye,be,he.colorSpace),Ee=Q(S);k&&ce(S)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ee,ge,S.width,S.height):ce(S)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ee,ge,S.width,S.height):n.renderbufferStorage(n.RENDERBUFFER,ge,S.width,S.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function me(b,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),re(S.depthTexture,0);const W=r.get(S.depthTexture).__webglTexture,te=Q(S);if(S.depthTexture.format===mr)ce(S)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,W,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,W,0);else if(S.depthTexture.format===us)ce(S)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,W,0,te):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,W,0);else throw new Error("Unknown depthTexture format")}function de(b){const S=r.get(b),k=b.isWebGLCubeRenderTarget===!0;if(b.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");me(S.__webglFramebuffer,b)}else if(k){S.__webglDepthbuffer=[];for(let W=0;W<6;W++)t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer[W]),S.__webglDepthbuffer[W]=n.createRenderbuffer(),ee(S.__webglDepthbuffer[W],b,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=n.createRenderbuffer(),ee(S.__webglDepthbuffer,b,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function x(b,S,k){const W=r.get(b);S!==void 0&&j(W.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),k!==void 0&&de(b)}function I(b){const S=b.texture,k=r.get(b),W=r.get(S);b.addEventListener("dispose",$);const te=b.textures,he=b.isWebGLCubeRenderTarget===!0,ye=te.length>1,be=m(b)||a;if(ye||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=S.version,o.memory.textures++),he){k.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(a&&S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[ge]=[];for(let Ee=0;Ee<S.mipmaps.length;Ee++)k.__webglFramebuffer[ge][Ee]=n.createFramebuffer()}else k.__webglFramebuffer[ge]=n.createFramebuffer()}else{if(a&&S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let ge=0;ge<S.mipmaps.length;ge++)k.__webglFramebuffer[ge]=n.createFramebuffer()}else k.__webglFramebuffer=n.createFramebuffer();if(ye)if(i.drawBuffers)for(let ge=0,Ee=te.length;ge<Ee;ge++){const Fe=r.get(te[ge]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=n.createTexture(),o.memory.textures++)}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&b.samples>0&&ce(b)===!1){k.__webglMultisampledFramebuffer=n.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ge=0;ge<te.length;ge++){const Ee=te[ge];k.__webglColorRenderbuffer[ge]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,k.__webglColorRenderbuffer[ge]);const Fe=s.convert(Ee.format,Ee.colorSpace),Te=s.convert(Ee.type),Be=A(Ee.internalFormat,Fe,Te,Ee.colorSpace,b.isXRRenderTarget===!0),De=Q(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,Be,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,k.__webglColorRenderbuffer[ge])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(k.__webglDepthRenderbuffer=n.createRenderbuffer(),ee(k.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(he){t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),N(n.TEXTURE_CUBE_MAP,S,be);for(let ge=0;ge<6;ge++)if(a&&S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)j(k.__webglFramebuffer[ge][Ee],b,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ee);else j(k.__webglFramebuffer[ge],b,S,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);v(S,be)&&M(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ge=0,Ee=te.length;ge<Ee;ge++){const Fe=te[ge],Te=r.get(Fe);t.bindTexture(n.TEXTURE_2D,Te.__webglTexture),N(n.TEXTURE_2D,Fe,be),j(k.__webglFramebuffer,b,Fe,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,0),v(Fe,be)&&M(n.TEXTURE_2D)}t.unbindTexture()}else{let ge=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(a?ge=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,W.__webglTexture),N(ge,S,be),a&&S.mipmaps&&S.mipmaps.length>0)for(let Ee=0;Ee<S.mipmaps.length;Ee++)j(k.__webglFramebuffer[Ee],b,S,n.COLOR_ATTACHMENT0,ge,Ee);else j(k.__webglFramebuffer,b,S,n.COLOR_ATTACHMENT0,ge,0);v(S,be)&&M(ge),t.unbindTexture()}b.depthBuffer&&de(b)}function O(b){const S=m(b)||a,k=b.textures;for(let W=0,te=k.length;W<te;W++){const he=k[W];if(v(he,S)){const ye=b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,be=r.get(he).__webglTexture;t.bindTexture(ye,be),M(ye),t.unbindTexture()}}}function Z(b){if(a&&b.samples>0&&ce(b)===!1){const S=b.textures,k=b.width,W=b.height;let te=n.COLOR_BUFFER_BIT;const he=[],ye=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=r.get(b),ge=S.length>1;if(ge)for(let Ee=0;Ee<S.length;Ee++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ee=0;Ee<S.length;Ee++){he.push(n.COLOR_ATTACHMENT0+Ee),b.depthBuffer&&he.push(ye);const Fe=be.__ignoreDepthValues!==void 0?be.__ignoreDepthValues:!1;if(Fe===!1&&(b.depthBuffer&&(te|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&(te|=n.STENCIL_BUFFER_BIT)),ge&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]),Fe===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[ye]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[ye])),ge){const Te=r.get(S[Ee]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Te,0)}n.blitFramebuffer(0,0,k,W,0,0,k,W,te,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,he)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ge)for(let Ee=0;Ee<S.length;Ee++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ee]);const Fe=r.get(S[Ee]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ee,n.TEXTURE_2D,Fe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}}function Q(b){return Math.min(i.maxSamples,b.samples)}function ce(b){const S=r.get(b);return a&&b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ie(b){const S=o.render.frame;f.get(b)!==S&&(f.set(b,S),b.update())}function se(b,S){const k=b.colorSpace,W=b.format,te=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||b.format===zc||k!==Nt&&k!==Oi&&(ut.getTransfer(k)===xt?a===!1?e.has("EXT_sRGB")===!0&&W===vn?(b.format=zc,b.minFilter=Pt,b.generateMipmaps=!1):S=Gm.sRGBToLinear(S):(W!==vn||te!==Wi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function fe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(u.width=b.naturalWidth||b.width,u.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(u.width=b.displayWidth,u.height=b.displayHeight):(u.width=b.width,u.height=b.height),u}this.allocateTextureUnit=ne,this.resetTextureUnits=R,this.setTexture2D=re,this.setTexture2DArray=J,this.setTexture3D=K,this.setTextureCube=q,this.rebindTextures=x,this.setupRenderTarget=I,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=j,this.useMultisampledRTT=ce}function RT(n,e,t){const r=t.isWebGL2;function i(s,o=Oi){let a;const l=ut.getTransfer(o);if(s===Wi)return n.UNSIGNED_BYTE;if(s===wm)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Am)return n.UNSIGNED_SHORT_5_5_5_1;if(s===$x)return n.BYTE;if(s===Qx)return n.SHORT;if(s===Su)return n.UNSIGNED_SHORT;if(s===Tm)return n.INT;if(s===Bi)return n.UNSIGNED_INT;if(s===Dn)return n.FLOAT;if(s===go)return r?n.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===ey)return n.ALPHA;if(s===vn)return n.RGBA;if(s===ty)return n.LUMINANCE;if(s===ny)return n.LUMINANCE_ALPHA;if(s===mr)return n.DEPTH_COMPONENT;if(s===us)return n.DEPTH_STENCIL;if(s===zc)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Rm)return n.RED;if(s===Cm)return n.RED_INTEGER;if(s===iy)return n.RG;if(s===Lm)return n.RG_INTEGER;if(s===Pm)return n.RGBA_INTEGER;if(s===Rl||s===Cl||s===Ll||s===Pl)if(l===xt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Rl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Cl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ll)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Pl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Rl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Cl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ll)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Pl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===ih||s===rh||s===sh||s===oh)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===ih)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===rh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===sh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===oh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Um)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ah||s===lh)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===ah)return l===xt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===lh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===ch||s===uh||s===fh||s===hh||s===dh||s===ph||s===mh||s===gh||s===_h||s===vh||s===xh||s===yh||s===Mh||s===Sh)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===ch)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===uh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===fh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===hh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===dh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===ph)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===mh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===gh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===_h)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===vh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===xh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===yh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Mh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Sh)return l===xt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ul||s===bh||s===Eh)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Ul)return l===xt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===bh)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Eh)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===ry||s===Th||s===wh||s===Ah)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Ul)return a.COMPRESSED_RED_RGTC1_EXT;if(s===Th)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===wh)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Ah)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===pr?r?n.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:i}}class CT extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class di extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const LT={type:"move"};class rc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new di,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new di,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new di,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,r),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],h=u.position.distanceTo(f.position),d=.02,g=.005;c.inputState.pinching&&h>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,r),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,r),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(LT)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new di;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const PT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,UT=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepthEXT = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class DT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,r){if(this.texture===null){const i=new wt,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=r.depthNear||t.depthFar!=r.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}render(e,t){if(this.texture!==null){if(this.mesh===null){const r=t.cameras[0].viewport,i=new ji({extensions:{fragDepth:!0},vertexShader:PT,fragmentShader:UT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:r.z},depthHeight:{value:r.w}}});this.mesh=new at(new je(20,20),i)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class IT extends vi{constructor(e,t){super();const r=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,h=null,d=null,g=null;const _=new DT,p=t.getContextAttributes();let m=null,y=null;const v=[],M=[],A=new Ce;let w=null;const T=new Kt;T.layers.enable(1),T.viewport=new pt;const P=new Kt;P.layers.enable(2),P.viewport=new pt;const $=[T,P],E=new CT;E.layers.enable(1),E.layers.enable(2);let C=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(N){let V=v[N];return V===void 0&&(V=new rc,v[N]=V),V.getTargetRaySpace()},this.getControllerGrip=function(N){let V=v[N];return V===void 0&&(V=new rc,v[N]=V),V.getGripSpace()},this.getHand=function(N){let V=v[N];return V===void 0&&(V=new rc,v[N]=V),V.getHandSpace()};function Y(N){const V=M.indexOf(N.inputSource);if(V===-1)return;const oe=v[V];oe!==void 0&&(oe.update(N.inputSource,N.frame,c||o),oe.dispatchEvent({type:N.type,data:N.inputSource}))}function R(){i.removeEventListener("select",Y),i.removeEventListener("selectstart",Y),i.removeEventListener("selectend",Y),i.removeEventListener("squeeze",Y),i.removeEventListener("squeezestart",Y),i.removeEventListener("squeezeend",Y),i.removeEventListener("end",R),i.removeEventListener("inputsourceschange",ne);for(let N=0;N<v.length;N++){const V=M[N];V!==null&&(M[N]=null,v[N].disconnect(V))}C=null,B=null,_.reset(),e.setRenderTarget(m),d=null,h=null,f=null,i=null,y=null,le.stop(),r.isPresenting=!1,e.setPixelRatio(w),e.setSize(A.width,A.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(N){s=N,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(N){a=N,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(N){c=N},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(N){if(i=N,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",Y),i.addEventListener("selectstart",Y),i.addEventListener("selectend",Y),i.addEventListener("squeeze",Y),i.addEventListener("squeezestart",Y),i.addEventListener("squeezeend",Y),i.addEventListener("end",R),i.addEventListener("inputsourceschange",ne),p.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(A),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const V={antialias:i.renderState.layers===void 0?p.antialias:!0,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,V),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),y=new vr(d.framebufferWidth,d.framebufferHeight,{format:vn,type:Wi,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let V=null,oe=null,F=null;p.depth&&(F=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,V=p.stencil?us:mr,oe=p.stencil?pr:Bi);const j={colorFormat:t.RGBA8,depthFormat:F,scaleFactor:s};f=new XRWebGLBinding(i,t),h=f.createProjectionLayer(j),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new vr(h.textureWidth,h.textureHeight,{format:vn,type:Wi,depthTexture:new Jm(h.textureWidth,h.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,V),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0});const ee=e.properties.get(y);ee.__ignoreDepthValues=h.ignoreDepthValues}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),le.setContext(i),le.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function ne(N){for(let V=0;V<N.removed.length;V++){const oe=N.removed[V],F=M.indexOf(oe);F>=0&&(M[F]=null,v[F].disconnect(oe))}for(let V=0;V<N.added.length;V++){const oe=N.added[V];let F=M.indexOf(oe);if(F===-1){for(let ee=0;ee<v.length;ee++)if(ee>=M.length){M.push(oe),F=ee;break}else if(M[ee]===null){M[ee]=oe,F=ee;break}if(F===-1)break}const j=v[F];j&&j.connect(oe)}}const H=new D,re=new D;function J(N,V,oe){H.setFromMatrixPosition(V.matrixWorld),re.setFromMatrixPosition(oe.matrixWorld);const F=H.distanceTo(re),j=V.projectionMatrix.elements,ee=oe.projectionMatrix.elements,me=j[14]/(j[10]-1),de=j[14]/(j[10]+1),x=(j[9]+1)/j[5],I=(j[9]-1)/j[5],O=(j[8]-1)/j[0],Z=(ee[8]+1)/ee[0],Q=me*O,ce=me*Z,ie=F/(-O+Z),se=ie*-O;V.matrixWorld.decompose(N.position,N.quaternion,N.scale),N.translateX(se),N.translateZ(ie),N.matrixWorld.compose(N.position,N.quaternion,N.scale),N.matrixWorldInverse.copy(N.matrixWorld).invert();const fe=me+ie,b=de+ie,S=Q-se,k=ce+(F-se),W=x*de/b*fe,te=I*de/b*fe;N.projectionMatrix.makePerspective(S,k,W,te,fe,b),N.projectionMatrixInverse.copy(N.projectionMatrix).invert()}function K(N,V){V===null?N.matrixWorld.copy(N.matrix):N.matrixWorld.multiplyMatrices(V.matrixWorld,N.matrix),N.matrixWorldInverse.copy(N.matrixWorld).invert()}this.updateCamera=function(N){if(i===null)return;_.texture!==null&&(N.near=_.depthNear,N.far=_.depthFar),E.near=P.near=T.near=N.near,E.far=P.far=T.far=N.far,(C!==E.near||B!==E.far)&&(i.updateRenderState({depthNear:E.near,depthFar:E.far}),C=E.near,B=E.far,T.near=C,T.far=B,P.near=C,P.far=B,T.updateProjectionMatrix(),P.updateProjectionMatrix(),N.updateProjectionMatrix());const V=N.parent,oe=E.cameras;K(E,V);for(let F=0;F<oe.length;F++)K(oe[F],V);oe.length===2?J(E,T,P):E.projectionMatrix.copy(T.projectionMatrix),q(N,E,V)};function q(N,V,oe){oe===null?N.matrix.copy(V.matrixWorld):(N.matrix.copy(oe.matrixWorld),N.matrix.invert(),N.matrix.multiply(V.matrixWorld)),N.matrix.decompose(N.position,N.quaternion,N.scale),N.updateMatrixWorld(!0),N.projectionMatrix.copy(V.projectionMatrix),N.projectionMatrixInverse.copy(V.projectionMatrixInverse),N.isPerspectiveCamera&&(N.fov=hs*2*Math.atan(1/N.projectionMatrix.elements[5]),N.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&d===null))return l},this.setFoveation=function(N){l=N,h!==null&&(h.fixedFoveation=N),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=N)},this.hasDepthSensing=function(){return _.texture!==null};let U=null;function X(N,V){if(u=V.getViewerPose(c||o),g=V,u!==null){const oe=u.views;d!==null&&(e.setRenderTargetFramebuffer(y,d.framebuffer),e.setRenderTarget(y));let F=!1;oe.length!==E.cameras.length&&(E.cameras.length=0,F=!0);for(let ee=0;ee<oe.length;ee++){const me=oe[ee];let de=null;if(d!==null)de=d.getViewport(me);else{const I=f.getViewSubImage(h,me);de=I.viewport,ee===0&&(e.setRenderTargetTextures(y,I.colorTexture,h.ignoreDepthValues?void 0:I.depthStencilTexture),e.setRenderTarget(y))}let x=$[ee];x===void 0&&(x=new Kt,x.layers.enable(ee),x.viewport=new pt,$[ee]=x),x.matrix.fromArray(me.transform.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale),x.projectionMatrix.fromArray(me.projectionMatrix),x.projectionMatrixInverse.copy(x.projectionMatrix).invert(),x.viewport.set(de.x,de.y,de.width,de.height),ee===0&&(E.matrix.copy(x.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),F===!0&&E.cameras.push(x)}const j=i.enabledFeatures;if(j&&j.includes("depth-sensing")){const ee=f.getDepthInformation(oe[0]);ee&&ee.isValid&&ee.texture&&_.init(e,ee,i.renderState)}}for(let oe=0;oe<v.length;oe++){const F=M[oe],j=v[oe];F!==null&&j!==void 0&&j.update(F,V,c||o)}_.render(e,E),U&&U(N,V),V.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:V}),g=null}const le=new Zm;le.setAnimationLoop(X),this.setAnimationLoop=function(N){U=N},this.dispose=function(){}}}const rr=new ei,FT=new Je;function NT(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function r(p,m){m.color.getRGB(p.fogColor.value,jm(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,v,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),f(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),h(p,m),m.isMeshPhysicalMaterial&&d(p,m,M)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),_(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,y,v):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===an&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===an&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m),v=y.envMap,M=y.envMapRotation;if(v&&(p.envMap.value=v,rr.copy(M),rr.x*=-1,rr.y*=-1,rr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),p.envMapRotation.value.setFromMatrix4(FT.makeRotationFromEuler(rr)),p.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const A=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*A,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===an&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function OT(n,e,t,r){let i={},s={},o=[];const a=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,v){const M=v.program;r.uniformBlockBinding(y,M)}function c(y,v){let M=i[y.id];M===void 0&&(g(y),M=u(y),i[y.id]=M,y.addEventListener("dispose",p));const A=v.program;r.updateUBOMapping(y,A);const w=e.render.frame;s[y.id]!==w&&(h(y),s[y.id]=w)}function u(y){const v=f();y.__bindingPointIndex=v;const M=n.createBuffer(),A=y.__size,w=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,A,w),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,v,M),M}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const v=i[y.id],M=y.uniforms,A=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,v);for(let w=0,T=M.length;w<T;w++){const P=Array.isArray(M[w])?M[w]:[M[w]];for(let $=0,E=P.length;$<E;$++){const C=P[$];if(d(C,w,$,A)===!0){const B=C.__offset,Y=Array.isArray(C.value)?C.value:[C.value];let R=0;for(let ne=0;ne<Y.length;ne++){const H=Y[ne],re=_(H);typeof H=="number"||typeof H=="boolean"?(C.__data[0]=H,n.bufferSubData(n.UNIFORM_BUFFER,B+R,C.__data)):H.isMatrix3?(C.__data[0]=H.elements[0],C.__data[1]=H.elements[1],C.__data[2]=H.elements[2],C.__data[3]=0,C.__data[4]=H.elements[3],C.__data[5]=H.elements[4],C.__data[6]=H.elements[5],C.__data[7]=0,C.__data[8]=H.elements[6],C.__data[9]=H.elements[7],C.__data[10]=H.elements[8],C.__data[11]=0):(H.toArray(C.__data,R),R+=re.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,B,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function d(y,v,M,A){const w=y.value,T=v+"_"+M;if(A[T]===void 0)return typeof w=="number"||typeof w=="boolean"?A[T]=w:A[T]=w.clone(),!0;{const P=A[T];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return A[T]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(y){const v=y.uniforms;let M=0;const A=16;for(let T=0,P=v.length;T<P;T++){const $=Array.isArray(v[T])?v[T]:[v[T]];for(let E=0,C=$.length;E<C;E++){const B=$[E],Y=Array.isArray(B.value)?B.value:[B.value];for(let R=0,ne=Y.length;R<ne;R++){const H=Y[R],re=_(H),J=M%A;J!==0&&A-J<re.boundary&&(M+=A-J),B.__data=new Float32Array(re.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=M,M+=re.storage}}}const w=M%A;return w>0&&(M+=A-w),y.__size=M,y.__cache={},this}function _(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function p(y){const v=y.target;v.removeEventListener("dispose",p);const M=o.indexOf(v.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function m(){for(const y in i)n.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:m}}class sg{constructor(e={}){const{canvas:t=Ly(),context:r=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let h;r!==null?h=r.getContextAttributes().alpha:h=o;const d=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=qt,this._useLegacyLights=!1,this.toneMapping=Vi,this.toneMappingExposure=1;const v=this;let M=!1,A=0,w=0,T=null,P=-1,$=null;const E=new pt,C=new pt;let B=null;const Y=new Ue(0);let R=0,ne=t.width,H=t.height,re=1,J=null,K=null;const q=new pt(0,0,ne,H),U=new pt(0,0,ne,H);let X=!1;const le=new wu;let N=!1,V=!1,oe=null;const F=new Je,j=new Ce,ee=new D,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function de(){return T===null?re:1}let x=r;function I(L,ue){for(let _e=0;_e<L.length;_e++){const ve=L[_e],pe=t.getContext(ve,ue);if(pe!==null)return pe}return null}try{const L={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Mu}`),t.addEventListener("webglcontextlost",we,!1),t.addEventListener("webglcontextrestored",z,!1),t.addEventListener("webglcontextcreationerror",Le,!1),x===null){const ue=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&ue.shift(),x=I(ue,L),x===null)throw I(ue)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&x instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),x.getShaderPrecisionFormat===void 0&&(x.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let O,Z,Q,ce,ie,se,fe,b,S,k,W,te,he,ye,be,ge,Ee,Fe,Te,Be,De,Se,Ae,Ie;function G(){O=new Xb(x),Z=new kb(x,O,e),O.init(Z),Se=new RT(x,O,Z),Q=new wT(x,O,Z),ce=new qb(x),ie=new pT,se=new AT(x,O,Q,ie,Z,Se,ce),fe=new zb(v),b=new Wb(v),S=new eM(x,Z),Ae=new Ob(x,O,S,Z),k=new jb(x,S,ce,Ae),W=new $b(x,k,S,ce),Te=new Jb(x,Z,se),ge=new Gb(ie),te=new dT(v,fe,b,O,Z,Ae,ge),he=new NT(v,ie),ye=new gT,be=new ST(O,Z),Fe=new Nb(v,fe,b,Q,W,h,l),Ee=new TT(v,W,Z),Ie=new OT(x,ce,Z,Q),Be=new Bb(x,O,ce,Z),De=new Yb(x,O,ce,Z),ce.programs=te.programs,v.capabilities=Z,v.extensions=O,v.properties=ie,v.renderLists=ye,v.shadowMap=Ee,v.state=Q,v.info=ce}G();const xe=new IT(v,x);this.xr=xe,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){const L=O.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=O.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(L){L!==void 0&&(re=L,this.setSize(ne,H,!1))},this.getSize=function(L){return L.set(ne,H)},this.setSize=function(L,ue,_e=!0){if(xe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}ne=L,H=ue,t.width=Math.floor(L*re),t.height=Math.floor(ue*re),_e===!0&&(t.style.width=L+"px",t.style.height=ue+"px"),this.setViewport(0,0,L,ue)},this.getDrawingBufferSize=function(L){return L.set(ne*re,H*re).floor()},this.setDrawingBufferSize=function(L,ue,_e){ne=L,H=ue,re=_e,t.width=Math.floor(L*_e),t.height=Math.floor(ue*_e),this.setViewport(0,0,L,ue)},this.getCurrentViewport=function(L){return L.copy(E)},this.getViewport=function(L){return L.copy(q)},this.setViewport=function(L,ue,_e,ve){L.isVector4?q.set(L.x,L.y,L.z,L.w):q.set(L,ue,_e,ve),Q.viewport(E.copy(q).multiplyScalar(re).round())},this.getScissor=function(L){return L.copy(U)},this.setScissor=function(L,ue,_e,ve){L.isVector4?U.set(L.x,L.y,L.z,L.w):U.set(L,ue,_e,ve),Q.scissor(C.copy(U).multiplyScalar(re).round())},this.getScissorTest=function(){return X},this.setScissorTest=function(L){Q.setScissorTest(X=L)},this.setOpaqueSort=function(L){J=L},this.setTransparentSort=function(L){K=L},this.getClearColor=function(L){return L.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(L=!0,ue=!0,_e=!0){let ve=0;if(L){let pe=!1;if(T!==null){const Oe=T.texture.format;pe=Oe===Pm||Oe===Lm||Oe===Cm}if(pe){const Oe=T.texture.type,ze=Oe===Wi||Oe===Bi||Oe===Su||Oe===pr||Oe===wm||Oe===Am,Ve=Fe.getClearColor(),Re=Fe.getClearAlpha(),qe=Ve.r,Ke=Ve.g,Xe=Ve.b;ze?(d[0]=qe,d[1]=Ke,d[2]=Xe,d[3]=Re,x.clearBufferuiv(x.COLOR,0,d)):(g[0]=qe,g[1]=Ke,g[2]=Xe,g[3]=Re,x.clearBufferiv(x.COLOR,0,g))}else ve|=x.COLOR_BUFFER_BIT}ue&&(ve|=x.DEPTH_BUFFER_BIT),_e&&(ve|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),x.clear(ve)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",we,!1),t.removeEventListener("webglcontextrestored",z,!1),t.removeEventListener("webglcontextcreationerror",Le,!1),ye.dispose(),be.dispose(),ie.dispose(),fe.dispose(),b.dispose(),W.dispose(),Ae.dispose(),Ie.dispose(),te.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",nt),xe.removeEventListener("sessionend",We),oe&&(oe.dispose(),oe=null),Ye.stop()};function we(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function z(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const L=ce.autoReset,ue=Ee.enabled,_e=Ee.autoUpdate,ve=Ee.needsUpdate,pe=Ee.type;G(),ce.autoReset=L,Ee.enabled=ue,Ee.autoUpdate=_e,Ee.needsUpdate=ve,Ee.type=pe}function Le(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function ae(L){const ue=L.target;ue.removeEventListener("dispose",ae),Me(ue)}function Me(L){Pe(L),ie.remove(L)}function Pe(L){const ue=ie.get(L).programs;ue!==void 0&&(ue.forEach(function(_e){te.releaseProgram(_e)}),L.isShaderMaterial&&te.releaseShaderCache(L))}this.renderBufferDirect=function(L,ue,_e,ve,pe,Oe){ue===null&&(ue=me);const ze=pe.isMesh&&pe.matrixWorld.determinant()<0,Ve=bo(L,ue,_e,ve,pe);Q.setMaterial(ve,ze);let Re=_e.index,qe=1;if(ve.wireframe===!0){if(Re=k.getWireframeAttribute(_e),Re===void 0)return;qe=2}const Ke=_e.drawRange,Xe=_e.attributes.position;let vt=Ke.start*qe,Bt=(Ke.start+Ke.count)*qe;Oe!==null&&(vt=Math.max(vt,Oe.start*qe),Bt=Math.min(Bt,(Oe.start+Oe.count)*qe)),Re!==null?(vt=Math.max(vt,0),Bt=Math.min(Bt,Re.count)):Xe!=null&&(vt=Math.max(vt,0),Bt=Math.min(Bt,Xe.count));const bt=Bt-vt;if(bt<0||bt===1/0)return;Ae.setup(pe,ve,Ve,_e,Re);let tn,gt=Be;if(Re!==null&&(tn=S.get(Re),gt=De,gt.setIndex(tn)),pe.isMesh)ve.wireframe===!0?(Q.setLineWidth(ve.wireframeLinewidth*de()),gt.setMode(x.LINES)):gt.setMode(x.TRIANGLES);else if(pe.isLine){let Ze=ve.linewidth;Ze===void 0&&(Ze=1),Q.setLineWidth(Ze*de()),pe.isLineSegments?gt.setMode(x.LINES):pe.isLineLoop?gt.setMode(x.LINE_LOOP):gt.setMode(x.LINE_STRIP)}else pe.isPoints?gt.setMode(x.POINTS):pe.isSprite&&gt.setMode(x.TRIANGLES);if(pe.isBatchedMesh)gt.renderMultiDraw(pe._multiDrawStarts,pe._multiDrawCounts,pe._multiDrawCount);else if(pe.isInstancedMesh)gt.renderInstances(vt,bt,pe.count);else if(_e.isInstancedBufferGeometry){const Ze=_e._maxInstanceCount!==void 0?_e._maxInstanceCount:1/0,yi=Math.min(_e.instanceCount,Ze);gt.renderInstances(vt,bt,yi)}else gt.render(vt,bt)};function Ge(L,ue,_e){L.transparent===!0&&L.side===Un&&L.forceSinglePass===!1?(L.side=an,L.needsUpdate=!0,en(L,ue,_e),L.side=gi,L.needsUpdate=!0,en(L,ue,_e),L.side=Un):en(L,ue,_e)}this.compile=function(L,ue,_e=null){_e===null&&(_e=L),p=be.get(_e),p.init(),y.push(p),_e.traverseVisible(function(pe){pe.isLight&&pe.layers.test(ue.layers)&&(p.pushLight(pe),pe.castShadow&&p.pushShadow(pe))}),L!==_e&&L.traverseVisible(function(pe){pe.isLight&&pe.layers.test(ue.layers)&&(p.pushLight(pe),pe.castShadow&&p.pushShadow(pe))}),p.setupLights(v._useLegacyLights);const ve=new Set;return L.traverse(function(pe){const Oe=pe.material;if(Oe)if(Array.isArray(Oe))for(let ze=0;ze<Oe.length;ze++){const Ve=Oe[ze];Ge(Ve,_e,pe),ve.add(Ve)}else Ge(Oe,_e,pe),ve.add(Oe)}),y.pop(),p=null,ve},this.compileAsync=function(L,ue,_e=null){const ve=this.compile(L,ue,_e);return new Promise(pe=>{function Oe(){if(ve.forEach(function(ze){ie.get(ze).currentProgram.isReady()&&ve.delete(ze)}),ve.size===0){pe(L);return}setTimeout(Oe,10)}O.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let ke=null;function He(L){ke&&ke(L)}function nt(){Ye.stop()}function We(){Ye.start()}const Ye=new Zm;Ye.setAnimationLoop(He),typeof self<"u"&&Ye.setContext(self),this.setAnimationLoop=function(L){ke=L,xe.setAnimationLoop(L),L===null?Ye.stop():Ye.start()},xe.addEventListener("sessionstart",nt),xe.addEventListener("sessionend",We),this.render=function(L,ue){if(ue!==void 0&&ue.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ue.parent===null&&ue.matrixWorldAutoUpdate===!0&&ue.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(ue),ue=xe.getCamera()),L.isScene===!0&&L.onBeforeRender(v,L,ue,T),p=be.get(L,y.length),p.init(),y.push(p),F.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),le.setFromProjectionMatrix(F),V=this.localClippingEnabled,N=ge.init(this.clippingPlanes,V),_=ye.get(L,m.length),_.init(),m.push(_),mt(L,ue,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(J,K),this.info.render.frame++,N===!0&&ge.beginShadows();const _e=p.state.shadowsArray;if(Ee.render(_e,L,ue),N===!0&&ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),(xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1)&&Fe.render(_,L),p.setupLights(v._useLegacyLights),ue.isArrayCamera){const ve=ue.cameras;for(let pe=0,Oe=ve.length;pe<Oe;pe++){const ze=ve[pe];Ot(_,L,ze,ze.viewport)}}else Ot(_,L,ue);T!==null&&(se.updateMultisampleRenderTarget(T),se.updateRenderTargetMipmap(T)),L.isScene===!0&&L.onAfterRender(v,L,ue),Ae.resetDefaultState(),P=-1,$=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function mt(L,ue,_e,ve){if(L.visible===!1)return;if(L.layers.test(ue.layers)){if(L.isGroup)_e=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(ue);else if(L.isLight)p.pushLight(L),L.castShadow&&p.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||le.intersectsSprite(L)){ve&&ee.setFromMatrixPosition(L.matrixWorld).applyMatrix4(F);const ze=W.update(L),Ve=L.material;Ve.visible&&_.push(L,ze,Ve,_e,ee.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||le.intersectsObject(L))){const ze=W.update(L),Ve=L.material;if(ve&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),ee.copy(L.boundingSphere.center)):(ze.boundingSphere===null&&ze.computeBoundingSphere(),ee.copy(ze.boundingSphere.center)),ee.applyMatrix4(L.matrixWorld).applyMatrix4(F)),Array.isArray(Ve)){const Re=ze.groups;for(let qe=0,Ke=Re.length;qe<Ke;qe++){const Xe=Re[qe],vt=Ve[Xe.materialIndex];vt&&vt.visible&&_.push(L,ze,vt,_e,ee.z,Xe)}}else Ve.visible&&_.push(L,ze,Ve,_e,ee.z,null)}}const Oe=L.children;for(let ze=0,Ve=Oe.length;ze<Ve;ze++)mt(Oe[ze],ue,_e,ve)}function Ot(L,ue,_e,ve){const pe=L.opaque,Oe=L.transmissive,ze=L.transparent;p.setupLightsView(_e),N===!0&&ge.setGlobalState(v.clippingPlanes,_e),Oe.length>0&&Qt(pe,Oe,ue,_e),ve&&Q.viewport(E.copy(ve)),pe.length>0&&un(pe,ue,_e),Oe.length>0&&un(Oe,ue,_e),ze.length>0&&un(ze,ue,_e),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function Qt(L,ue,_e,ve){if((_e.isScene===!0?_e.overrideMaterial:null)!==null)return;const Oe=Z.isWebGL2;oe===null&&(oe=new vr(1,1,{generateMipmaps:!0,type:O.has("EXT_color_buffer_half_float")?go:Wi,minFilter:fi,samples:Oe?4:0})),v.getDrawingBufferSize(j),Oe?oe.setSize(j.x,j.y):oe.setSize(Fa(j.x),Fa(j.y));const ze=v.getRenderTarget();v.setRenderTarget(oe),v.getClearColor(Y),R=v.getClearAlpha(),R<1&&v.setClearColor(16777215,.5),v.clear();const Ve=v.toneMapping;v.toneMapping=Vi,un(L,_e,ve),se.updateMultisampleRenderTarget(oe),se.updateRenderTargetMipmap(oe);let Re=!1;for(let qe=0,Ke=ue.length;qe<Ke;qe++){const Xe=ue[qe],vt=Xe.object,Bt=Xe.geometry,bt=Xe.material,tn=Xe.group;if(bt.side===Un&&vt.layers.test(ve.layers)){const gt=bt.side;bt.side=an,bt.needsUpdate=!0,Vn(vt,_e,ve,Bt,bt,tn),bt.side=gt,bt.needsUpdate=!0,Re=!0}}Re===!0&&(se.updateMultisampleRenderTarget(oe),se.updateRenderTargetMipmap(oe)),v.setRenderTarget(ze),v.setClearColor(Y,R),v.toneMapping=Ve}function un(L,ue,_e){const ve=ue.isScene===!0?ue.overrideMaterial:null;for(let pe=0,Oe=L.length;pe<Oe;pe++){const ze=L[pe],Ve=ze.object,Re=ze.geometry,qe=ve===null?ze.material:ve,Ke=ze.group;Ve.layers.test(_e.layers)&&Vn(Ve,ue,_e,Re,qe,Ke)}}function Vn(L,ue,_e,ve,pe,Oe){L.onBeforeRender(v,ue,_e,ve,pe,Oe),L.modelViewMatrix.multiplyMatrices(_e.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),pe.onBeforeRender(v,ue,_e,ve,L,Oe),pe.transparent===!0&&pe.side===Un&&pe.forceSinglePass===!1?(pe.side=an,pe.needsUpdate=!0,v.renderBufferDirect(_e,ue,ve,pe,L,Oe),pe.side=gi,pe.needsUpdate=!0,v.renderBufferDirect(_e,ue,ve,pe,L,Oe),pe.side=Un):v.renderBufferDirect(_e,ue,ve,pe,L,Oe),L.onAfterRender(v,ue,_e,ve,pe,Oe)}function en(L,ue,_e){ue.isScene!==!0&&(ue=me);const ve=ie.get(L),pe=p.state.lights,Oe=p.state.shadowsArray,ze=pe.state.version,Ve=te.getParameters(L,pe.state,Oe,ue,_e),Re=te.getProgramCacheKey(Ve);let qe=ve.programs;ve.environment=L.isMeshStandardMaterial?ue.environment:null,ve.fog=ue.fog,ve.envMap=(L.isMeshStandardMaterial?b:fe).get(L.envMap||ve.environment),ve.envMapRotation=ve.environment!==null&&L.envMap===null?ue.environmentRotation:L.envMapRotation,qe===void 0&&(L.addEventListener("dispose",ae),qe=new Map,ve.programs=qe);let Ke=qe.get(Re);if(Ke!==void 0){if(ve.currentProgram===Ke&&ve.lightsStateVersion===ze)return Wn(L,Ve),Ke}else Ve.uniforms=te.getUniforms(L),L.onBuild(_e,Ve,v),L.onBeforeCompile(Ve,v),Ke=te.acquireProgram(Ve,Re),qe.set(Re,Ke),ve.uniforms=Ve.uniforms;const Xe=ve.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Xe.clippingPlanes=ge.uniform),Wn(L,Ve),ve.needsLights=ol(L),ve.lightsStateVersion=ze,ve.needsLights&&(Xe.ambientLightColor.value=pe.state.ambient,Xe.lightProbe.value=pe.state.probe,Xe.directionalLights.value=pe.state.directional,Xe.directionalLightShadows.value=pe.state.directionalShadow,Xe.spotLights.value=pe.state.spot,Xe.spotLightShadows.value=pe.state.spotShadow,Xe.rectAreaLights.value=pe.state.rectArea,Xe.ltc_1.value=pe.state.rectAreaLTC1,Xe.ltc_2.value=pe.state.rectAreaLTC2,Xe.pointLights.value=pe.state.point,Xe.pointLightShadows.value=pe.state.pointShadow,Xe.hemisphereLights.value=pe.state.hemi,Xe.directionalShadowMap.value=pe.state.directionalShadowMap,Xe.directionalShadowMatrix.value=pe.state.directionalShadowMatrix,Xe.spotShadowMap.value=pe.state.spotShadowMap,Xe.spotLightMatrix.value=pe.state.spotLightMatrix,Xe.spotLightMap.value=pe.state.spotLightMap,Xe.pointShadowMap.value=pe.state.pointShadowMap,Xe.pointShadowMatrix.value=pe.state.pointShadowMatrix),ve.currentProgram=Ke,ve.uniformsList=null,Ke}function Ct(L){if(L.uniformsList===null){const ue=L.currentProgram.getUniforms();L.uniformsList=Ma.seqWithValue(ue.seq,L.uniforms)}return L.uniformsList}function Wn(L,ue){const _e=ie.get(L);_e.outputColorSpace=ue.outputColorSpace,_e.batching=ue.batching,_e.instancing=ue.instancing,_e.instancingColor=ue.instancingColor,_e.instancingMorph=ue.instancingMorph,_e.skinning=ue.skinning,_e.morphTargets=ue.morphTargets,_e.morphNormals=ue.morphNormals,_e.morphColors=ue.morphColors,_e.morphTargetsCount=ue.morphTargetsCount,_e.numClippingPlanes=ue.numClippingPlanes,_e.numIntersection=ue.numClipIntersection,_e.vertexAlphas=ue.vertexAlphas,_e.vertexTangents=ue.vertexTangents,_e.toneMapping=ue.toneMapping}function bo(L,ue,_e,ve,pe){ue.isScene!==!0&&(ue=me),se.resetTextureUnits();const Oe=ue.fog,ze=ve.isMeshStandardMaterial?ue.environment:null,Ve=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Nt,Re=(ve.isMeshStandardMaterial?b:fe).get(ve.envMap||ze),qe=ve.vertexColors===!0&&!!_e.attributes.color&&_e.attributes.color.itemSize===4,Ke=!!_e.attributes.tangent&&(!!ve.normalMap||ve.anisotropy>0),Xe=!!_e.morphAttributes.position,vt=!!_e.morphAttributes.normal,Bt=!!_e.morphAttributes.color;let bt=Vi;ve.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(bt=v.toneMapping);const tn=_e.morphAttributes.position||_e.morphAttributes.normal||_e.morphAttributes.color,gt=tn!==void 0?tn.length:0,Ze=ie.get(ve),yi=p.state.lights;if(N===!0&&(V===!0||L!==$)){const kt=L===$&&ve.id===P;ge.setState(ve,L,kt)}let _t=!1;ve.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==yi.state.version||Ze.outputColorSpace!==Ve||pe.isBatchedMesh&&Ze.batching===!1||!pe.isBatchedMesh&&Ze.batching===!0||pe.isInstancedMesh&&Ze.instancing===!1||!pe.isInstancedMesh&&Ze.instancing===!0||pe.isSkinnedMesh&&Ze.skinning===!1||!pe.isSkinnedMesh&&Ze.skinning===!0||pe.isInstancedMesh&&Ze.instancingColor===!0&&pe.instanceColor===null||pe.isInstancedMesh&&Ze.instancingColor===!1&&pe.instanceColor!==null||pe.isInstancedMesh&&Ze.instancingMorph===!0&&pe.morphTexture===null||pe.isInstancedMesh&&Ze.instancingMorph===!1&&pe.morphTexture!==null||Ze.envMap!==Re||ve.fog===!0&&Ze.fog!==Oe||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==ge.numPlanes||Ze.numIntersection!==ge.numIntersection)||Ze.vertexAlphas!==qe||Ze.vertexTangents!==Ke||Ze.morphTargets!==Xe||Ze.morphNormals!==vt||Ze.morphColors!==Bt||Ze.toneMapping!==bt||Z.isWebGL2===!0&&Ze.morphTargetsCount!==gt)&&(_t=!0):(_t=!0,Ze.__version=ve.version);let Sn=Ze.currentProgram;_t===!0&&(Sn=en(ve,ue,pe));let Ts=!1,bn=!1,qi=!1;const Mt=Sn.getUniforms(),En=Ze.uniforms;if(Q.useProgram(Sn.program)&&(Ts=!0,bn=!0,qi=!0),ve.id!==P&&(P=ve.id,bn=!0),Ts||$!==L){Mt.setValue(x,"projectionMatrix",L.projectionMatrix),Mt.setValue(x,"viewMatrix",L.matrixWorldInverse);const kt=Mt.map.cameraPosition;kt!==void 0&&kt.setValue(x,ee.setFromMatrixPosition(L.matrixWorld)),Z.logarithmicDepthBuffer&&Mt.setValue(x,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ve.isMeshPhongMaterial||ve.isMeshToonMaterial||ve.isMeshLambertMaterial||ve.isMeshBasicMaterial||ve.isMeshStandardMaterial||ve.isShaderMaterial)&&Mt.setValue(x,"isOrthographic",L.isOrthographicCamera===!0),$!==L&&($=L,bn=!0,qi=!0)}if(pe.isSkinnedMesh){Mt.setOptional(x,pe,"bindMatrix"),Mt.setOptional(x,pe,"bindMatrixInverse");const kt=pe.skeleton;kt&&(Z.floatVertexTextures?(kt.boneTexture===null&&kt.computeBoneTexture(),Mt.setValue(x,"boneTexture",kt.boneTexture,se)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}pe.isBatchedMesh&&(Mt.setOptional(x,pe,"batchingTexture"),Mt.setValue(x,"batchingTexture",pe._matricesTexture,se));const Ki=_e.morphAttributes;if((Ki.position!==void 0||Ki.normal!==void 0||Ki.color!==void 0&&Z.isWebGL2===!0)&&Te.update(pe,_e,Sn),(bn||Ze.receiveShadow!==pe.receiveShadow)&&(Ze.receiveShadow=pe.receiveShadow,Mt.setValue(x,"receiveShadow",pe.receiveShadow)),ve.isMeshGouraudMaterial&&ve.envMap!==null&&(En.envMap.value=Re,En.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),bn&&(Mt.setValue(x,"toneMappingExposure",v.toneMappingExposure),Ze.needsLights&&Es(En,qi),Oe&&ve.fog===!0&&he.refreshFogUniforms(En,Oe),he.refreshMaterialUniforms(En,ve,re,H,oe),Ma.upload(x,Ct(Ze),En,se)),ve.isShaderMaterial&&ve.uniformsNeedUpdate===!0&&(Ma.upload(x,Ct(Ze),En,se),ve.uniformsNeedUpdate=!1),ve.isSpriteMaterial&&Mt.setValue(x,"center",pe.center),Mt.setValue(x,"modelViewMatrix",pe.modelViewMatrix),Mt.setValue(x,"normalMatrix",pe.normalMatrix),Mt.setValue(x,"modelMatrix",pe.matrixWorld),ve.isShaderMaterial||ve.isRawShaderMaterial){const kt=ve.uniformsGroups;for(let nn=0,al=kt.length;nn<al;nn++)if(Z.isWebGL2){const Zi=kt[nn];Ie.update(Zi,Sn),Ie.bind(Zi,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function Es(L,ue){L.ambientLightColor.needsUpdate=ue,L.lightProbe.needsUpdate=ue,L.directionalLights.needsUpdate=ue,L.directionalLightShadows.needsUpdate=ue,L.pointLights.needsUpdate=ue,L.pointLightShadows.needsUpdate=ue,L.spotLights.needsUpdate=ue,L.spotLightShadows.needsUpdate=ue,L.rectAreaLights.needsUpdate=ue,L.hemisphereLights.needsUpdate=ue}function ol(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(L,ue,_e){ie.get(L.texture).__webglTexture=ue,ie.get(L.depthTexture).__webglTexture=_e;const ve=ie.get(L);ve.__hasExternalTextures=!0,ve.__autoAllocateDepthBuffer=_e===void 0,ve.__autoAllocateDepthBuffer||O.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ve.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,ue){const _e=ie.get(L);_e.__webglFramebuffer=ue,_e.__useDefaultFramebuffer=ue===void 0},this.setRenderTarget=function(L,ue=0,_e=0){T=L,A=ue,w=_e;let ve=!0,pe=null,Oe=!1,ze=!1;if(L){const Re=ie.get(L);Re.__useDefaultFramebuffer!==void 0?(Q.bindFramebuffer(x.FRAMEBUFFER,null),ve=!1):Re.__webglFramebuffer===void 0?se.setupRenderTarget(L):Re.__hasExternalTextures&&se.rebindTextures(L,ie.get(L.texture).__webglTexture,ie.get(L.depthTexture).__webglTexture);const qe=L.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(ze=!0);const Ke=ie.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Ke[ue])?pe=Ke[ue][_e]:pe=Ke[ue],Oe=!0):Z.isWebGL2&&L.samples>0&&se.useMultisampledRTT(L)===!1?pe=ie.get(L).__webglMultisampledFramebuffer:Array.isArray(Ke)?pe=Ke[_e]:pe=Ke,E.copy(L.viewport),C.copy(L.scissor),B=L.scissorTest}else E.copy(q).multiplyScalar(re).floor(),C.copy(U).multiplyScalar(re).floor(),B=X;if(Q.bindFramebuffer(x.FRAMEBUFFER,pe)&&Z.drawBuffers&&ve&&Q.drawBuffers(L,pe),Q.viewport(E),Q.scissor(C),Q.setScissorTest(B),Oe){const Re=ie.get(L.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Re.__webglTexture,_e)}else if(ze){const Re=ie.get(L.texture),qe=ue||0;x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,Re.__webglTexture,_e||0,qe)}P=-1},this.readRenderTargetPixels=function(L,ue,_e,ve,pe,Oe,ze){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ve=ie.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&ze!==void 0&&(Ve=Ve[ze]),Ve){Q.bindFramebuffer(x.FRAMEBUFFER,Ve);try{const Re=L.texture,qe=Re.format,Ke=Re.type;if(qe!==vn&&Se.convert(qe)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Xe=Ke===go&&(O.has("EXT_color_buffer_half_float")||Z.isWebGL2&&O.has("EXT_color_buffer_float"));if(Ke!==Wi&&Se.convert(Ke)!==x.getParameter(x.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ke===Dn&&(Z.isWebGL2||O.has("OES_texture_float")||O.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ue>=0&&ue<=L.width-ve&&_e>=0&&_e<=L.height-pe&&x.readPixels(ue,_e,ve,pe,Se.convert(qe),Se.convert(Ke),Oe)}finally{const Re=T!==null?ie.get(T).__webglFramebuffer:null;Q.bindFramebuffer(x.FRAMEBUFFER,Re)}}},this.copyFramebufferToTexture=function(L,ue,_e=0){const ve=Math.pow(2,-_e),pe=Math.floor(ue.image.width*ve),Oe=Math.floor(ue.image.height*ve);se.setTexture2D(ue,0),x.copyTexSubImage2D(x.TEXTURE_2D,_e,0,0,L.x,L.y,pe,Oe),Q.unbindTexture()},this.copyTextureToTexture=function(L,ue,_e,ve=0){const pe=ue.image.width,Oe=ue.image.height,ze=Se.convert(_e.format),Ve=Se.convert(_e.type);se.setTexture2D(_e,0),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,_e.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_e.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,_e.unpackAlignment),ue.isDataTexture?x.texSubImage2D(x.TEXTURE_2D,ve,L.x,L.y,pe,Oe,ze,Ve,ue.image.data):ue.isCompressedTexture?x.compressedTexSubImage2D(x.TEXTURE_2D,ve,L.x,L.y,ue.mipmaps[0].width,ue.mipmaps[0].height,ze,ue.mipmaps[0].data):x.texSubImage2D(x.TEXTURE_2D,ve,L.x,L.y,ze,Ve,ue.image),ve===0&&_e.generateMipmaps&&x.generateMipmap(x.TEXTURE_2D),Q.unbindTexture()},this.copyTextureToTexture3D=function(L,ue,_e,ve,pe=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Oe=Math.round(L.max.x-L.min.x),ze=Math.round(L.max.y-L.min.y),Ve=L.max.z-L.min.z+1,Re=Se.convert(ve.format),qe=Se.convert(ve.type);let Ke;if(ve.isData3DTexture)se.setTexture3D(ve,0),Ke=x.TEXTURE_3D;else if(ve.isDataArrayTexture||ve.isCompressedArrayTexture)se.setTexture2DArray(ve,0),Ke=x.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,ve.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ve.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,ve.unpackAlignment);const Xe=x.getParameter(x.UNPACK_ROW_LENGTH),vt=x.getParameter(x.UNPACK_IMAGE_HEIGHT),Bt=x.getParameter(x.UNPACK_SKIP_PIXELS),bt=x.getParameter(x.UNPACK_SKIP_ROWS),tn=x.getParameter(x.UNPACK_SKIP_IMAGES),gt=_e.isCompressedTexture?_e.mipmaps[pe]:_e.image;x.pixelStorei(x.UNPACK_ROW_LENGTH,gt.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,gt.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,L.min.x),x.pixelStorei(x.UNPACK_SKIP_ROWS,L.min.y),x.pixelStorei(x.UNPACK_SKIP_IMAGES,L.min.z),_e.isDataTexture||_e.isData3DTexture?x.texSubImage3D(Ke,pe,ue.x,ue.y,ue.z,Oe,ze,Ve,Re,qe,gt.data):ve.isCompressedArrayTexture?x.compressedTexSubImage3D(Ke,pe,ue.x,ue.y,ue.z,Oe,ze,Ve,Re,gt.data):x.texSubImage3D(Ke,pe,ue.x,ue.y,ue.z,Oe,ze,Ve,Re,qe,gt),x.pixelStorei(x.UNPACK_ROW_LENGTH,Xe),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,vt),x.pixelStorei(x.UNPACK_SKIP_PIXELS,Bt),x.pixelStorei(x.UNPACK_SKIP_ROWS,bt),x.pixelStorei(x.UNPACK_SKIP_IMAGES,tn),pe===0&&ve.generateMipmaps&&x.generateMipmap(Ke),Q.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?se.setTextureCube(L,0):L.isData3DTexture?se.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?se.setTexture2DArray(L,0):se.setTexture2D(L,0),Q.unbindTexture()},this.resetState=function(){A=0,w=0,T=null,Q.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===bu?"display-p3":"srgb",t.unpackColorSpace=ut.workingColorSpace===Qa?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class BT extends sg{}BT.prototype.isWebGL1Renderer=!0;let kT=class extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ei,this.environmentRotation=new ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentRotation=this.environmentRotation.toArray(),t}};class GT{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Gc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return km("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,r){e*=this.stride,r*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[r+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(t,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Wt=new D;class Cu{constructor(e,t,r,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=r,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,r=this.data.count;t<r;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let r=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(r=In(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=ht(r,this.array)),this.data.array[e*this.data.stride+this.offset+t]=r,this}setX(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ht(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=In(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=In(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=In(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=In(t,this.array)),t}setXY(e,t,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),r=ht(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this}setXYZ(e,t,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),r=ht(r,this.array),i=ht(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=i,this}setXYZW(e,t,r,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ht(t,this.array),r=ht(r,this.array),i=ht(i,this.array),s=ht(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const i=r*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Cu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const i=r*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const yd=new D,Md=new pt,Sd=new pt,zT=new D,bd=new Je,ia=new D,sc=new Hn,Ed=new Je,oc=new _s;class HT extends at{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=nh,this.bindMatrix=new Je,this.bindMatrixInverse=new Je,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new zn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let r=0;r<t.count;r++)this.getVertexPosition(r,ia),this.boundingBox.expandByPoint(ia)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Hn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let r=0;r<t.count;r++)this.getVertexPosition(r,ia),this.boundingSphere.expandByPoint(ia)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const r=this.material,i=this.matrixWorld;r!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),sc.copy(this.boundingSphere),sc.applyMatrix4(i),e.ray.intersectsSphere(sc)!==!1&&(Ed.copy(i).invert(),oc.copy(e.ray).applyMatrix4(Ed),!(this.boundingBox!==null&&oc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,oc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new pt,t=this.geometry.attributes.skinWeight;for(let r=0,i=t.count;r<i;r++){e.fromBufferAttribute(t,r);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(r,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===nh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Jx?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const r=this.skeleton,i=this.geometry;Md.fromBufferAttribute(i.attributes.skinIndex,e),Sd.fromBufferAttribute(i.attributes.skinWeight,e),yd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Sd.getComponent(s);if(o!==0){const a=Md.getComponent(s);bd.multiplyMatrices(r.bones[a].matrixWorld,r.boneInverses[a]),t.addScaledVector(zT.copy(yd).applyMatrix4(bd),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class og extends St{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ag extends wt{constructor(e=null,t=1,r=1,i,s,o,a,l,c=Ut,u=Ut,f,h){super(null,o,a,l,c,u,i,s,f,h),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Td=new Je,VT=new Je;class Lu{constructor(e=[],t=[]){this.uuid=kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let r=0,i=this.bones.length;r<i;r++)this.boneInverses.push(new Je)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const r=new Je;this.bones[e]&&r.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(r)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const r=this.bones[e];r&&r.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const r=this.bones[e];r&&(r.parent&&r.parent.isBone?(r.matrix.copy(r.parent.matrixWorld).invert(),r.matrix.multiply(r.matrixWorld)):r.matrix.copy(r.matrixWorld),r.matrix.decompose(r.position,r.quaternion,r.scale))}}update(){const e=this.bones,t=this.boneInverses,r=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:VT;Td.multiplyMatrices(a,t[s]),Td.toArray(r,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Lu(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const r=new ag(t,e,e,vn,Dn);return r.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=r,this}getBoneByName(e){for(let t=0,r=this.bones.length;t<r;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let r=0,i=e.bones.length;r<i;r++){const s=e.bones[r];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new og),this.bones.push(o),this.boneInverses.push(new Je().fromArray(e.boneInverses[r]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,r=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=r[i];e.boneInverses.push(a.toArray())}return e}}class Na extends Jt{constructor(e,t,r,i=1){super(e,t,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Hr=new Je,wd=new Je,ra=[],Ad=new zn,WT=new Je,Gs=new at,zs=new Hn;class XT extends at{constructor(e,t,r){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Na(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<r;i++)this.setMatrixAt(i,WT)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new zn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Hr),Ad.copy(e.boundingBox).applyMatrix4(Hr),this.boundingBox.union(Ad)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Hr),zs.copy(e.boundingSphere).applyMatrix4(Hr),this.boundingSphere.union(zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const r=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=r.length+1,o=e*s+1;for(let a=0;a<r.length;a++)r[a]=i[o+a]}raycast(e,t){const r=this.matrixWorld,i=this.count;if(Gs.geometry=this.geometry,Gs.material=this.material,Gs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zs.copy(this.boundingSphere),zs.applyMatrix4(r),e.ray.intersectsSphere(zs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Hr),wd.multiplyMatrices(r,Hr),Gs.matrixWorld=wd,Gs.raycast(e,ra);for(let o=0,a=ra.length;o<a;o++){const l=ra[o];l.instanceId=s,l.object=this,t.push(l)}ra.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Na(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const r=t.morphTargetInfluences,i=r.length+1;this.morphTexture===null&&(this.morphTexture=new ag(new Float32Array(i*this.count),i,this.count,Rm,Dn));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<r.length;c++)o+=r[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(r,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class lg extends Jn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Rd=new D,Cd=new D,Ld=new Je,ac=new _s,sa=new Hn;class Pu extends St{constructor(e=new Mn,t=new lg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let i=1,s=t.count;i<s;i++)Rd.fromBufferAttribute(t,i-1),Cd.fromBufferAttribute(t,i),r[i]=r[i-1],r[i]+=Rd.distanceTo(Cd);e.setAttribute("lineDistance",new yn(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),sa.copy(r.boundingSphere),sa.applyMatrix4(i),sa.radius+=s,e.ray.intersectsSphere(sa)===!1)return;Ld.copy(i).invert(),ac.copy(e.ray).applyMatrix4(Ld);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new D,u=new D,f=new D,h=new D,d=this.isLineSegments?2:1,g=r.index,p=r.attributes.position;if(g!==null){const m=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let v=m,M=y-1;v<M;v+=d){const A=g.getX(v),w=g.getX(v+1);if(c.fromBufferAttribute(p,A),u.fromBufferAttribute(p,w),ac.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(h);P<e.near||P>e.far||t.push({distance:P,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,o.start),y=Math.min(p.count,o.start+o.count);for(let v=m,M=y-1;v<M;v+=d){if(c.fromBufferAttribute(p,v),u.fromBufferAttribute(p,v+1),ac.distanceSqToSegment(c,u,h,f)>l)continue;h.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(h);w<e.near||w>e.far||t.push({distance:w,point:f.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const i=t[r[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const Pd=new D,Ud=new D;class jT extends Pu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let i=0,s=t.count;i<s;i+=2)Pd.fromBufferAttribute(t,i),Ud.fromBufferAttribute(t,i+1),r[i]=i===0?0:r[i-1],r[i+1]=r[i]+Pd.distanceTo(Ud);e.setAttribute("lineDistance",new yn(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class YT extends Pu{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class cg extends Jn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Dd=new Je,Wc=new _s,oa=new Hn,aa=new D;class qT extends St{constructor(e=new Mn,t=new cg){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),oa.copy(r.boundingSphere),oa.applyMatrix4(i),oa.radius+=s,e.ray.intersectsSphere(oa)===!1)return;Dd.copy(i).invert(),Wc.copy(e.ray).applyMatrix4(Dd);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=r.index,f=r.attributes.position;if(c!==null){const h=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=h,_=d;g<_;g++){const p=c.getX(g);aa.fromBufferAttribute(f,p),Id(aa,p,l,i,e,t,this)}}else{const h=Math.max(0,o.start),d=Math.min(f.count,o.start+o.count);for(let g=h,_=d;g<_;g++)aa.fromBufferAttribute(f,g),Id(aa,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const i=t[r[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Id(n,e,t,r,i,s,o){const a=Wc.distanceSqToPoint(n);if(a<t){const l=new D;Wc.closestPointToPoint(n,l),l.applyMatrix4(r);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Uu extends Mn{constructor(e=1,t=32,r=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new D,h=new D,d=[],g=[],_=[],p=[];for(let m=0;m<=r;m++){const y=[],v=m/r;let M=0;m===0&&o===0?M=.5/t:m===r&&l===Math.PI&&(M=-.5/t);for(let A=0;A<=t;A++){const w=A/t;f.x=-e*Math.cos(i+w*s)*Math.sin(o+v*a),f.y=e*Math.cos(o+v*a),f.z=e*Math.sin(i+w*s)*Math.sin(o+v*a),g.push(f.x,f.y,f.z),h.copy(f).normalize(),_.push(h.x,h.y,h.z),p.push(w+M,1-v),y.push(c++)}u.push(y)}for(let m=0;m<r;m++)for(let y=0;y<t;y++){const v=u[m][y+1],M=u[m][y],A=u[m+1][y],w=u[m+1][y+1];(m!==0||o>0)&&d.push(v,M,w),(m!==r-1||l<Math.PI)&&d.push(M,A,w)}this.setIndex(d),this.setAttribute("position",new yn(g,3)),this.setAttribute("normal",new yn(_,3)),this.setAttribute("uv",new yn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class fr extends Jn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fm,this.normalScale=new Ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ft extends fr{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return It(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function la(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function KT(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function ZT(n){function e(i,s){return n[i]-n[s]}const t=n.length,r=new Array(t);for(let i=0;i!==t;++i)r[i]=i;return r.sort(e),r}function Fd(n,e,t){const r=n.length,i=new n.constructor(r);for(let s=0,o=0;o!==r;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=n[a+l]}return i}function ug(n,e,t,r){let i=1,s=n[0];for(;s!==void 0&&s[r]===void 0;)s=n[i++];if(s===void 0)return;let o=s[r];if(o!==void 0)if(Array.isArray(o))do o=s[r],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=n[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[r],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=n[i++];while(s!==void 0);else do o=s[r],o!==void 0&&(e.push(s.time),t.push(o)),s=n[i++];while(s!==void 0)}class Mo{constructor(e,t,r,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(r),this.sampleValues=t,this.valueSize=r,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let r=this._cachedIndex,i=t[r],s=t[r-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=r+2;;){if(i===void 0){if(e<s)break i;return r=t.length,this._cachedIndex=r,this.copySampleValue_(r-1)}if(r===a)break;if(s=i,i=t[++r],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(r=2,s=a);for(let l=r-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===l)break;if(i=s,s=t[--r-1],e>=s)break t}o=r,r=0;break n}break e}for(;r<o;){const a=r+o>>>1;e<t[a]?o=a:r=a+1}if(i=t[r],s=t[r-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return r=t.length,this._cachedIndex=r,this.copySampleValue_(r-1)}this._cachedIndex=r,this.intervalChanged_(r,s,i)}return this.interpolate_(r,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,r=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=r[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class JT extends Mo{constructor(e,t,r,i){super(e,t,r,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rh,endingEnd:Rh}}intervalChanged_(e,t,r){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ch:s=e,a=2*t-r;break;case Lh:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=r}if(l===void 0)switch(this.getSettings_().endingEnd){case Ch:o=e,l=2*r-t;break;case Lh:o=1,l=r+i[1]-i[0];break;default:o=e-1,l=t}const c=(r-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-r),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,r,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,f=this._offsetNext,h=this._weightPrev,d=this._weightNext,g=(r-t)/(i-t),_=g*g,p=_*g,m=-h*p+2*h*_-h*g,y=(1+h)*p+(-1.5-2*h)*_+(-.5+h)*g+1,v=(-1-d)*p+(1.5+d)*_+.5*g,M=d*p-d*_;for(let A=0;A!==a;++A)s[A]=m*o[u+A]+y*o[c+A]+v*o[l+A]+M*o[f+A];return s}}class $T extends Mo{constructor(e,t,r,i){super(e,t,r,i)}interpolate_(e,t,r,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(r-t)/(i-t),f=1-u;for(let h=0;h!==a;++h)s[h]=o[c+h]*f+o[l+h]*u;return s}}class QT extends Mo{constructor(e,t,r,i){super(e,t,r,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ti{constructor(e,t,r,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=la(t,this.TimeBufferType),this.values=la(r,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let r;if(t.toJSON!==this.toJSON)r=t.toJSON(e);else{r={name:e.name,times:la(e.times,Array),values:la(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(r.interpolation=i)}return r.type=e.ValueTypeName,r}InterpolantFactoryMethodDiscrete(e){return new QT(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $T(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new JT(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case _o:t=this.InterpolantFactoryMethodDiscrete;break;case fs:t=this.InterpolantFactoryMethodLinear;break;case Dl:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const r="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(r);return console.warn("THREE.KeyframeTrack:",r),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _o;case this.InterpolantFactoryMethodLinear:return fs;case this.InterpolantFactoryMethodSmooth:return Dl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let r=0,i=t.length;r!==i;++r)t[r]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let r=0,i=t.length;r!==i;++r)t[r]*=e}return this}trim(e,t){const r=this.times,i=r.length;let s=0,o=i-1;for(;s!==i&&r[s]<e;)++s;for(;o!==-1&&r[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=r.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const r=this.times,i=this.values,s=r.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=r[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&KT(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),r=this.getValueSize(),i=this.getInterpolation()===Dl,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const f=a*r,h=f-r,d=f+r;for(let g=0;g!==r;++g){const _=t[f+g];if(_!==t[h+g]||_!==t[d+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const f=a*r,h=o*r;for(let d=0;d!==r;++d)t[h+d]=t[f+d]}++o}}if(s>0){e[o]=e[s];for(let a=s*r,l=o*r,c=0;c!==r;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*r)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),r=this.constructor,i=new r(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ti.prototype.TimeBufferType=Float32Array;ti.prototype.ValueBufferType=Float32Array;ti.prototype.DefaultInterpolation=fs;class ys extends ti{}ys.prototype.ValueTypeName="bool";ys.prototype.ValueBufferType=Array;ys.prototype.DefaultInterpolation=_o;ys.prototype.InterpolantFactoryMethodLinear=void 0;ys.prototype.InterpolantFactoryMethodSmooth=void 0;class fg extends ti{}fg.prototype.ValueTypeName="color";class ps extends ti{}ps.prototype.ValueTypeName="number";class e1 extends Mo{constructor(e,t,r,i){super(e,t,r,i)}interpolate_(e,t,r,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(r-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Qn.slerpFlat(s,0,o,c-a,o,c,l);return s}}class xr extends ti{InterpolantFactoryMethodLinear(e){return new e1(this.times,this.values,this.getValueSize(),e)}}xr.prototype.ValueTypeName="quaternion";xr.prototype.DefaultInterpolation=fs;xr.prototype.InterpolantFactoryMethodSmooth=void 0;class Ms extends ti{}Ms.prototype.ValueTypeName="string";Ms.prototype.ValueBufferType=Array;Ms.prototype.DefaultInterpolation=_o;Ms.prototype.InterpolantFactoryMethodLinear=void 0;Ms.prototype.InterpolantFactoryMethodSmooth=void 0;class ms extends ti{}ms.prototype.ValueTypeName="vector";class t1{constructor(e,t=-1,r,i=sy){this.name=e,this.tracks=r,this.duration=t,this.blendMode=i,this.uuid=kn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],r=e.tracks,i=1/(e.fps||1);for(let o=0,a=r.length;o!==a;++o)t.push(i1(r[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],r=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=r.length;s!==o;++s)t.push(ti.toJSON(r[s]));return i}static CreateFromMorphTargetSequence(e,t,r,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=ZT(l);l=Fd(l,1,u),c=Fd(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ps(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/r))}return new this(e,-1,o)}static findByName(e,t){let r=e;if(!Array.isArray(e)){const i=e;r=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<r.length;i++)if(r[i].name===t)return r[i];return null}static CreateClipsFromMorphTargetSequences(e,t,r){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const f=u[1];let h=i[f];h||(i[f]=h=[]),h.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,r));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const r=function(f,h,d,g,_){if(d.length!==0){const p=[],m=[];ug(d,p,m,g),p.length!==0&&_.push(new f(h,p,m))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let f=0;f<c.length;f++){const h=c[f].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const d={};let g;for(g=0;g<h.length;g++)if(h[g].morphTargets)for(let _=0;_<h[g].morphTargets.length;_++)d[h[g].morphTargets[_]]=-1;for(const _ in d){const p=[],m=[];for(let y=0;y!==h[g].morphTargets.length;++y){const v=h[g];p.push(v.time),m.push(v.morphTarget===_?1:0)}i.push(new ps(".morphTargetInfluence["+_+"]",p,m))}l=d.length*o}else{const d=".bones["+t[f].name+"]";r(ms,d+".position",h,"pos",i),r(xr,d+".quaternion",h,"rot",i),r(ms,d+".scale",h,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let r=0,i=e.length;r!==i;++r){const s=this.tracks[r];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function n1(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ps;case"vector":case"vector2":case"vector3":case"vector4":return ms;case"color":return fg;case"quaternion":return xr;case"bool":case"boolean":return ys;case"string":return Ms}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function i1(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=n1(n.type);if(n.times===void 0){const t=[],r=[];ug(n.keys,t,r,"value"),n.times=t,n.values=r}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}const ki={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class r1{constructor(e,t,r){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=r,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,f){return c.push(u,f),this},this.removeHandler=function(u){const f=c.indexOf(u);return f!==-1&&c.splice(f,2),this},this.getHandler=function(u){for(let f=0,h=c.length;f<h;f+=2){const d=c[f],g=c[f+1];if(d.global&&(d.lastIndex=0),d.test(u))return g}return null}}}const s1=new r1;class Ss{constructor(e){this.manager=e!==void 0?e:s1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const r=this;return new Promise(function(i,s){r.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ss.DEFAULT_MATERIAL_NAME="__DEFAULT";const li={};class o1 extends Error{constructor(e,t){super(e),this.response=t}}class hg extends Ss{constructor(e){super(e)}load(e,t,r,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ki.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(li[e]!==void 0){li[e].push({onLoad:t,onProgress:r,onError:i});return}li[e]=[],li[e].push({onLoad:t,onProgress:r,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=li[e],f=c.body.getReader(),h=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),d=h?parseInt(h):0,g=d!==0;let _=0;const p=new ReadableStream({start(m){y();function y(){f.read().then(({done:v,value:M})=>{if(v)m.close();else{_+=M.byteLength;const A=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:d});for(let w=0,T=u.length;w<T;w++){const P=u[w];P.onProgress&&P.onProgress(A)}m.enqueue(M),y()}})}}});return new Response(p)}else throw new o1(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a===void 0)return c.text();{const f=/charset="?([^;"\s]*)"?/i.exec(a),h=f&&f[1]?f[1].toLowerCase():void 0,d=new TextDecoder(h);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{ki.add(e,c);const u=li[e];delete li[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onLoad&&d.onLoad(c)}}).catch(c=>{const u=li[e];if(u===void 0)throw this.manager.itemError(e),c;delete li[e];for(let f=0,h=u.length;f<h;f++){const d=u[f];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class a1 extends Ss{constructor(e){super(e)}load(e,t,r,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ki.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=vo("img");function l(){u(),ki.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(f){u(),i&&i(f),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class dg extends Ss{constructor(e){super(e)}load(e,t,r,i){const s=new wt,o=new a1(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},r,i),s}}class tl extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const lc=new Je,Nd=new D,Od=new D;class Du{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ce(512,512),this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new wu,this._frameExtents=new Ce(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;Nd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Nd),Od.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Od),t.updateMatrixWorld(),lc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lc),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(lc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class l1 extends Du{constructor(){super(new Kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,r=hs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(r!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=r,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class c1 extends tl{constructor(e,t,r=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.distance=r,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new l1}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Bd=new Je,Hs=new D,cc=new D;class u1 extends Du{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ce(4,2),this._viewportCount=6,this._viewports=[new pt(2,1,1,1),new pt(0,1,1,1),new pt(3,1,1,1),new pt(1,1,1,1),new pt(3,0,1,1),new pt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,i=this.matrix,s=e.distance||r.far;s!==r.far&&(r.far=s,r.updateProjectionMatrix()),Hs.setFromMatrixPosition(e.matrixWorld),r.position.copy(Hs),cc.copy(r.position),cc.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(cc),r.updateMatrixWorld(),i.makeTranslation(-Hs.x,-Hs.y,-Hs.z),Bd.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Bd)}}class Xc extends tl{constructor(e,t,r=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=i,this.shadow=new u1}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class f1 extends Du{constructor(){super(new Au(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pg extends tl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new f1}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class h1 extends tl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ro{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let r=0,i=e.length;r<i;r++)t+=String.fromCharCode(e[r]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class d1 extends Mn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){const e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}}class p1 extends Ss{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,r,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=ki.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return ki.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ki.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});ki.add(e,l),s.manager.itemStart(e)}}const Iu="\\[\\]\\.:\\/",m1=new RegExp("["+Iu+"]","g"),Fu="[^"+Iu+"]",g1="[^"+Iu.replace("\\.","")+"]",_1=/((?:WC+[\/:])*)/.source.replace("WC",Fu),v1=/(WCOD+)?/.source.replace("WCOD",g1),x1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fu),y1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fu),M1=new RegExp("^"+_1+v1+x1+y1+"$"),S1=["material","materials","bones","map"];class b1{constructor(e,t,r){const i=r||dt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const r=this._targetGroup.nCachedObjects_,i=this._bindings[r];i!==void 0&&i.getValue(e,t)}setValue(e,t){const r=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=r.length;i!==s;++i)r[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].unbind()}}class dt{constructor(e,t,r){this.path=t,this.parsedPath=r||dt.parseTrackName(t),this.node=dt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,r){return e&&e.isAnimationObjectGroup?new dt.Composite(e,t,r):new dt(e,t,r)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(m1,"")}static parseTrackName(e){const t=M1.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const r={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=r.nodeName&&r.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=r.nodeName.substring(i+1);S1.indexOf(s)!==-1&&(r.nodeName=r.nodeName.substring(0,i),r.objectName=s)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return r}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const r=e.skeleton.getBoneByName(t);if(r!==void 0)return r}if(e.children){const r=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=r(a.children);if(l)return l}return null},i=r(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)e[t++]=r[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)r[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)r[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const r=this.resolvedProperty;for(let i=0,s=r.length;i!==s;++i)r[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,r=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=dt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let c=t.objectIndex;switch(r){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[r]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}dt.Composite=b1;dt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};dt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};dt.prototype.GetterByBindingType=[dt.prototype._getValue_direct,dt.prototype._getValue_array,dt.prototype._getValue_arrayElement,dt.prototype._getValue_toArray];dt.prototype.SetterByBindingTypeAndVersioning=[[dt.prototype._setValue_direct,dt.prototype._setValue_direct_setNeedsUpdate,dt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_array,dt.prototype._setValue_array_setNeedsUpdate,dt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_arrayElement,dt.prototype._setValue_arrayElement_setNeedsUpdate,dt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[dt.prototype._setValue_fromArray,dt.prototype._setValue_fromArray_setNeedsUpdate,dt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const kd=new Je;class Nu{constructor(e,t,r=0,i=1/0){this.ray=new _s(e,t),this.near=r,this.far=i,this.camera=null,this.layers=new Tu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return kd.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kd),this}intersectObject(e,t=!0,r=[]){return jc(e,this,r,t),r.sort(Gd),r}intersectObjects(e,t=!0,r=[]){for(let i=0,s=e.length;i<s;i++)jc(e[i],this,r,t);return r.sort(Gd),r}}function Gd(n,e){return n.distance-e.distance}function jc(n,e,t,r){if(n.layers.test(e.layers)&&n.raycast(e,t),r===!0){const i=n.children;for(let s=0,o=i.length;s<o;s++)jc(i[s],e,t,!0)}}class zd{constructor(e=1,t=0,r=0){return this.radius=e,this.phi=t,this.theta=r,this}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(It(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mu);const Hd={type:"change"},uc={type:"start"},Vd={type:"end"},ca=new _s,Wd=new ui,E1=Math.cos(70*Om.DEG2RAD);class T1 extends vi{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Er.ROTATE,MIDDLE:Er.DOLLY,RIGHT:Er.PAN},this.touches={ONE:Tr.ROTATE,TWO:Tr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(G){G.addEventListener("keydown",be),this._domElementKeyEvents=G},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",be),this._domElementKeyEvents=null},this.saveState=function(){r.target0.copy(r.target),r.position0.copy(r.object.position),r.zoom0=r.object.zoom},this.reset=function(){r.target.copy(r.target0),r.object.position.copy(r.position0),r.object.zoom=r.zoom0,r.object.updateProjectionMatrix(),r.dispatchEvent(Hd),r.update(),s=i.NONE},this.update=function(){const G=new D,xe=new Qn().setFromUnitVectors(e.up,new D(0,1,0)),we=xe.clone().invert(),z=new D,Le=new Qn,ae=new D,Me=2*Math.PI;return function(Ge=null){const ke=r.object.position;G.copy(ke).sub(r.target),G.applyQuaternion(xe),a.setFromVector3(G),r.autoRotate&&s===i.NONE&&B(E(Ge)),r.enableDamping?(a.theta+=l.theta*r.dampingFactor,a.phi+=l.phi*r.dampingFactor):(a.theta+=l.theta,a.phi+=l.phi);let He=r.minAzimuthAngle,nt=r.maxAzimuthAngle;isFinite(He)&&isFinite(nt)&&(He<-Math.PI?He+=Me:He>Math.PI&&(He-=Me),nt<-Math.PI?nt+=Me:nt>Math.PI&&(nt-=Me),He<=nt?a.theta=Math.max(He,Math.min(nt,a.theta)):a.theta=a.theta>(He+nt)/2?Math.max(He,a.theta):Math.min(nt,a.theta)),a.phi=Math.max(r.minPolarAngle,Math.min(r.maxPolarAngle,a.phi)),a.makeSafe(),r.enableDamping===!0?r.target.addScaledVector(u,r.dampingFactor):r.target.add(u),r.target.sub(r.cursor),r.target.clampLength(r.minTargetRadius,r.maxTargetRadius),r.target.add(r.cursor);let We=!1;if(r.zoomToCursor&&w||r.object.isOrthographicCamera)a.radius=q(a.radius);else{const Ye=a.radius;a.radius=q(a.radius*c),We=Ye!=a.radius}if(G.setFromSpherical(a),G.applyQuaternion(we),ke.copy(r.target).add(G),r.object.lookAt(r.target),r.enableDamping===!0?(l.theta*=1-r.dampingFactor,l.phi*=1-r.dampingFactor,u.multiplyScalar(1-r.dampingFactor)):(l.set(0,0,0),u.set(0,0,0)),r.zoomToCursor&&w){let Ye=null;if(r.object.isPerspectiveCamera){const mt=G.length();Ye=q(mt*c);const Ot=mt-Ye;r.object.position.addScaledVector(M,Ot),r.object.updateMatrixWorld(),We=!!Ot}else if(r.object.isOrthographicCamera){const mt=new D(A.x,A.y,0);mt.unproject(r.object);const Ot=r.object.zoom;r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/c)),r.object.updateProjectionMatrix(),We=Ot!==r.object.zoom;const Qt=new D(A.x,A.y,0);Qt.unproject(r.object),r.object.position.sub(Qt).add(mt),r.object.updateMatrixWorld(),Ye=G.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),r.zoomToCursor=!1;Ye!==null&&(this.screenSpacePanning?r.target.set(0,0,-1).transformDirection(r.object.matrix).multiplyScalar(Ye).add(r.object.position):(ca.origin.copy(r.object.position),ca.direction.set(0,0,-1).transformDirection(r.object.matrix),Math.abs(r.object.up.dot(ca.direction))<E1?e.lookAt(r.target):(Wd.setFromNormalAndCoplanarPoint(r.object.up,r.target),ca.intersectPlane(Wd,r.target))))}else if(r.object.isOrthographicCamera){const Ye=r.object.zoom;r.object.zoom=Math.max(r.minZoom,Math.min(r.maxZoom,r.object.zoom/c)),Ye!==r.object.zoom&&(r.object.updateProjectionMatrix(),We=!0)}return c=1,w=!1,We||z.distanceToSquared(r.object.position)>o||8*(1-Le.dot(r.object.quaternion))>o||ae.distanceToSquared(r.target)>o?(r.dispatchEvent(Hd),z.copy(r.object.position),Le.copy(r.object.quaternion),ae.copy(r.target),!0):!1}}(),this.dispose=function(){r.domElement.removeEventListener("contextmenu",Fe),r.domElement.removeEventListener("pointerdown",se),r.domElement.removeEventListener("pointercancel",b),r.domElement.removeEventListener("wheel",W),r.domElement.removeEventListener("pointermove",fe),r.domElement.removeEventListener("pointerup",b),r.domElement.getRootNode().removeEventListener("keydown",he,{capture:!0}),r._domElementKeyEvents!==null&&(r._domElementKeyEvents.removeEventListener("keydown",be),r._domElementKeyEvents=null)};const r=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let s=i.NONE;const o=1e-6,a=new zd,l=new zd;let c=1;const u=new D,f=new Ce,h=new Ce,d=new Ce,g=new Ce,_=new Ce,p=new Ce,m=new Ce,y=new Ce,v=new Ce,M=new D,A=new Ce;let w=!1;const T=[],P={};let $=!1;function E(G){return G!==null?2*Math.PI/60*r.autoRotateSpeed*G:2*Math.PI/60/60*r.autoRotateSpeed}function C(G){const xe=Math.abs(G*.01);return Math.pow(.95,r.zoomSpeed*xe)}function B(G){l.theta-=G}function Y(G){l.phi-=G}const R=function(){const G=new D;return function(we,z){G.setFromMatrixColumn(z,0),G.multiplyScalar(-we),u.add(G)}}(),ne=function(){const G=new D;return function(we,z){r.screenSpacePanning===!0?G.setFromMatrixColumn(z,1):(G.setFromMatrixColumn(z,0),G.crossVectors(r.object.up,G)),G.multiplyScalar(we),u.add(G)}}(),H=function(){const G=new D;return function(we,z){const Le=r.domElement;if(r.object.isPerspectiveCamera){const ae=r.object.position;G.copy(ae).sub(r.target);let Me=G.length();Me*=Math.tan(r.object.fov/2*Math.PI/180),R(2*we*Me/Le.clientHeight,r.object.matrix),ne(2*z*Me/Le.clientHeight,r.object.matrix)}else r.object.isOrthographicCamera?(R(we*(r.object.right-r.object.left)/r.object.zoom/Le.clientWidth,r.object.matrix),ne(z*(r.object.top-r.object.bottom)/r.object.zoom/Le.clientHeight,r.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),r.enablePan=!1)}}();function re(G){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?c/=G:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function J(G){r.object.isPerspectiveCamera||r.object.isOrthographicCamera?c*=G:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),r.enableZoom=!1)}function K(G,xe){if(!r.zoomToCursor)return;w=!0;const we=r.domElement.getBoundingClientRect(),z=G-we.left,Le=xe-we.top,ae=we.width,Me=we.height;A.x=z/ae*2-1,A.y=-(Le/Me)*2+1,M.set(A.x,A.y,1).unproject(r.object).sub(r.object.position).normalize()}function q(G){return Math.max(r.minDistance,Math.min(r.maxDistance,G))}function U(G){f.set(G.clientX,G.clientY)}function X(G){K(G.clientX,G.clientX),m.set(G.clientX,G.clientY)}function le(G){g.set(G.clientX,G.clientY)}function N(G){h.set(G.clientX,G.clientY),d.subVectors(h,f).multiplyScalar(r.rotateSpeed);const xe=r.domElement;B(2*Math.PI*d.x/xe.clientHeight),Y(2*Math.PI*d.y/xe.clientHeight),f.copy(h),r.update()}function V(G){y.set(G.clientX,G.clientY),v.subVectors(y,m),v.y>0?re(C(v.y)):v.y<0&&J(C(v.y)),m.copy(y),r.update()}function oe(G){_.set(G.clientX,G.clientY),p.subVectors(_,g).multiplyScalar(r.panSpeed),H(p.x,p.y),g.copy(_),r.update()}function F(G){K(G.clientX,G.clientY),G.deltaY<0?J(C(G.deltaY)):G.deltaY>0&&re(C(G.deltaY)),r.update()}function j(G){let xe=!1;switch(G.code){case r.keys.UP:G.ctrlKey||G.metaKey||G.shiftKey?Y(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):H(0,r.keyPanSpeed),xe=!0;break;case r.keys.BOTTOM:G.ctrlKey||G.metaKey||G.shiftKey?Y(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):H(0,-r.keyPanSpeed),xe=!0;break;case r.keys.LEFT:G.ctrlKey||G.metaKey||G.shiftKey?B(2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):H(r.keyPanSpeed,0),xe=!0;break;case r.keys.RIGHT:G.ctrlKey||G.metaKey||G.shiftKey?B(-2*Math.PI*r.rotateSpeed/r.domElement.clientHeight):H(-r.keyPanSpeed,0),xe=!0;break}xe&&(G.preventDefault(),r.update())}function ee(G){if(T.length===1)f.set(G.pageX,G.pageY);else{const xe=Ae(G),we=.5*(G.pageX+xe.x),z=.5*(G.pageY+xe.y);f.set(we,z)}}function me(G){if(T.length===1)g.set(G.pageX,G.pageY);else{const xe=Ae(G),we=.5*(G.pageX+xe.x),z=.5*(G.pageY+xe.y);g.set(we,z)}}function de(G){const xe=Ae(G),we=G.pageX-xe.x,z=G.pageY-xe.y,Le=Math.sqrt(we*we+z*z);m.set(0,Le)}function x(G){r.enableZoom&&de(G),r.enablePan&&me(G)}function I(G){r.enableZoom&&de(G),r.enableRotate&&ee(G)}function O(G){if(T.length==1)h.set(G.pageX,G.pageY);else{const we=Ae(G),z=.5*(G.pageX+we.x),Le=.5*(G.pageY+we.y);h.set(z,Le)}d.subVectors(h,f).multiplyScalar(r.rotateSpeed);const xe=r.domElement;B(2*Math.PI*d.x/xe.clientHeight),Y(2*Math.PI*d.y/xe.clientHeight),f.copy(h)}function Z(G){if(T.length===1)_.set(G.pageX,G.pageY);else{const xe=Ae(G),we=.5*(G.pageX+xe.x),z=.5*(G.pageY+xe.y);_.set(we,z)}p.subVectors(_,g).multiplyScalar(r.panSpeed),H(p.x,p.y),g.copy(_)}function Q(G){const xe=Ae(G),we=G.pageX-xe.x,z=G.pageY-xe.y,Le=Math.sqrt(we*we+z*z);y.set(0,Le),v.set(0,Math.pow(y.y/m.y,r.zoomSpeed)),re(v.y),m.copy(y);const ae=(G.pageX+xe.x)*.5,Me=(G.pageY+xe.y)*.5;K(ae,Me)}function ce(G){r.enableZoom&&Q(G),r.enablePan&&Z(G)}function ie(G){r.enableZoom&&Q(G),r.enableRotate&&O(G)}function se(G){r.enabled!==!1&&(T.length===0&&(r.domElement.setPointerCapture(G.pointerId),r.domElement.addEventListener("pointermove",fe),r.domElement.addEventListener("pointerup",b)),!De(G)&&(Te(G),G.pointerType==="touch"?ge(G):S(G)))}function fe(G){r.enabled!==!1&&(G.pointerType==="touch"?Ee(G):k(G))}function b(G){switch(Be(G),T.length){case 0:r.domElement.releasePointerCapture(G.pointerId),r.domElement.removeEventListener("pointermove",fe),r.domElement.removeEventListener("pointerup",b),r.dispatchEvent(Vd),s=i.NONE;break;case 1:const xe=T[0],we=P[xe];ge({pointerId:xe,pageX:we.x,pageY:we.y});break}}function S(G){let xe;switch(G.button){case 0:xe=r.mouseButtons.LEFT;break;case 1:xe=r.mouseButtons.MIDDLE;break;case 2:xe=r.mouseButtons.RIGHT;break;default:xe=-1}switch(xe){case Er.DOLLY:if(r.enableZoom===!1)return;X(G),s=i.DOLLY;break;case Er.ROTATE:if(G.ctrlKey||G.metaKey||G.shiftKey){if(r.enablePan===!1)return;le(G),s=i.PAN}else{if(r.enableRotate===!1)return;U(G),s=i.ROTATE}break;case Er.PAN:if(G.ctrlKey||G.metaKey||G.shiftKey){if(r.enableRotate===!1)return;U(G),s=i.ROTATE}else{if(r.enablePan===!1)return;le(G),s=i.PAN}break;default:s=i.NONE}s!==i.NONE&&r.dispatchEvent(uc)}function k(G){switch(s){case i.ROTATE:if(r.enableRotate===!1)return;N(G);break;case i.DOLLY:if(r.enableZoom===!1)return;V(G);break;case i.PAN:if(r.enablePan===!1)return;oe(G);break}}function W(G){r.enabled===!1||r.enableZoom===!1||s!==i.NONE||(G.preventDefault(),r.dispatchEvent(uc),F(te(G)),r.dispatchEvent(Vd))}function te(G){const xe=G.deltaMode,we={clientX:G.clientX,clientY:G.clientY,deltaY:G.deltaY};switch(xe){case 1:we.deltaY*=16;break;case 2:we.deltaY*=100;break}return G.ctrlKey&&!$&&(we.deltaY*=10),we}function he(G){G.key==="Control"&&($=!0,r.domElement.getRootNode().addEventListener("keyup",ye,{passive:!0,capture:!0}))}function ye(G){G.key==="Control"&&($=!1,r.domElement.getRootNode().removeEventListener("keyup",ye,{passive:!0,capture:!0}))}function be(G){r.enabled===!1||r.enablePan===!1||j(G)}function ge(G){switch(Se(G),T.length){case 1:switch(r.touches.ONE){case Tr.ROTATE:if(r.enableRotate===!1)return;ee(G),s=i.TOUCH_ROTATE;break;case Tr.PAN:if(r.enablePan===!1)return;me(G),s=i.TOUCH_PAN;break;default:s=i.NONE}break;case 2:switch(r.touches.TWO){case Tr.DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;x(G),s=i.TOUCH_DOLLY_PAN;break;case Tr.DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;I(G),s=i.TOUCH_DOLLY_ROTATE;break;default:s=i.NONE}break;default:s=i.NONE}s!==i.NONE&&r.dispatchEvent(uc)}function Ee(G){switch(Se(G),s){case i.TOUCH_ROTATE:if(r.enableRotate===!1)return;O(G),r.update();break;case i.TOUCH_PAN:if(r.enablePan===!1)return;Z(G),r.update();break;case i.TOUCH_DOLLY_PAN:if(r.enableZoom===!1&&r.enablePan===!1)return;ce(G),r.update();break;case i.TOUCH_DOLLY_ROTATE:if(r.enableZoom===!1&&r.enableRotate===!1)return;ie(G),r.update();break;default:s=i.NONE}}function Fe(G){r.enabled!==!1&&G.preventDefault()}function Te(G){T.push(G.pointerId)}function Be(G){delete P[G.pointerId];for(let xe=0;xe<T.length;xe++)if(T[xe]==G.pointerId){T.splice(xe,1);return}}function De(G){for(let xe=0;xe<T.length;xe++)if(T[xe]==G.pointerId)return!0;return!1}function Se(G){let xe=P[G.pointerId];xe===void 0&&(xe=new Ce,P[G.pointerId]=xe),xe.set(G.pageX,G.pageY)}function Ae(G){const xe=G.pointerId===T[0]?T[1]:T[0];return P[xe]}r.domElement.addEventListener("contextmenu",Fe),r.domElement.addEventListener("pointerdown",se),r.domElement.addEventListener("pointercancel",b),r.domElement.addEventListener("wheel",W,{passive:!1}),r.domElement.getRootNode().addEventListener("keydown",he,{passive:!0,capture:!0}),this.update()}}const Xd=new Nu,fc=new Ce,mg=[],gg=n=>mg.forEach(e=>e.onClick(n)),xi=(n,e,t)=>{mg.push({onClick:r=>{fc.x=r.clientX/window.innerWidth*2-1,fc.y=-(r.clientY/window.innerHeight)*2+1,Xd.setFromCamera(fc,e);const i=Xd.intersectObjects(n.parent.children,!1);i.length>0&&i[0].object.uuid==n.uuid&&t(i[0])}})},w1=()=>window.addEventListener("pointerdown",gg),A1=()=>window.removeEventListener("pointerdown",gg),jd=new Nu,mn=new Ce,ua=new Ce,hc=new Ce,nl=[],_g=n=>nl.forEach(e=>e.onDragDown(n)),vg=n=>nl.forEach(e=>e.onDragUp(n)),xg=n=>nl.forEach(e=>e.onDrag(n)),yg=(n,e,t,r,i)=>{const s={isActive:!1,onDragDown:o=>{mn.x=o.clientX/window.innerWidth*2-1,mn.y=-(o.clientY/window.innerHeight)*2+1,hc.copy(ua.sub(mn)),ua.copy(mn),jd.setFromCamera(mn,e);const a=jd.intersectObjects(n.parent.children,!1);a.length>0&&a[0].object.uuid==n.uuid&&n.visible&&(t(mn,e,a[0]),s.isActive=!0)},onDragUp:o=>{s.isActive&&(r(mn,e),s.isActive=!1)},onDrag:o=>{s.isActive&&(mn.x=o.clientX/window.innerWidth*2-1,mn.y=-(o.clientY/window.innerHeight)*2+1,hc.copy(ua.sub(mn)),i(mn,e,hc),ua.copy(mn))}};nl.push(s)},R1=()=>{window.addEventListener("pointerdown",_g),window.addEventListener("pointerup",vg),window.addEventListener("pointermove",xg)},C1=()=>{window.removeEventListener("pointerdown",_g),window.removeEventListener("pointerup",vg),window.removeEventListener("pointermove",xg)},Ou=[],Mg=n=>Ou.forEach(e=>e.onKeyDown(n)),Sg=n=>Ou.forEach(e=>e.onKeyUp(n)),L1=(n,e)=>{Ou.push({onKeyDown:t=>n(t),onKeyUp:t=>e(t)})},P1=()=>{window.addEventListener("keydown",Mg),window.addEventListener("keyup",Sg)},U1=()=>{window.removeEventListener("keydown",Mg),window.removeEventListener("keyup",Sg)};let bg;const xo=new vi,D1=()=>{bg=setInterval(()=>{xo.dispatchEvent({type:"loopEvent"})},60)},I1=()=>{clearInterval(bg)};function F1(n){const e=n.domElement,t=e.clientWidth,r=e.clientHeight,i=e.width!==t||e.height!==r;return i&&n.setSize(t,r,!1),i}function N1(){const n=new kT;return n.background=new Ue(16777215),n}function O1(n){const e=new sg({canvas:n,antialias:!0});return e.shadowMap.enabled=!0,e.shadowMap.type=Mm,e.toneMapping=bm,e.toneMappingExposure=1.5,e.outputEncoding=void 0,e}function Yd(n,e){if(e===oy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===kc||e===Dm){let t=n.getIndex();if(t===null){const o=[],a=n.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);n.setIndex(o),t=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const r=t.count-2,i=[];if(e===kc)for(let o=1;o<=r;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<r;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==r&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=n.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}class B1 extends Ss{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new V1(t)}),this.register(function(t){return new $1(t)}),this.register(function(t){return new Q1(t)}),this.register(function(t){return new ew(t)}),this.register(function(t){return new X1(t)}),this.register(function(t){return new j1(t)}),this.register(function(t){return new Y1(t)}),this.register(function(t){return new q1(t)}),this.register(function(t){return new H1(t)}),this.register(function(t){return new K1(t)}),this.register(function(t){return new W1(t)}),this.register(function(t){return new J1(t)}),this.register(function(t){return new Z1(t)}),this.register(function(t){return new G1(t)}),this.register(function(t){return new tw(t)}),this.register(function(t){return new nw(t)})}load(e,t,r,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ro.extractUrlBase(e);o=ro.resolveURL(c,this.path)}else o=ro.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new hg(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},r,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,r,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Eg){try{o[it.KHR_BINARY_GLTF]=new iw(e)}catch(f){i&&i(f);return}s=JSON.parse(o[it.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new gw(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const f=this.pluginCallbacks[u](c);f.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[f.name]=f,o[f.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const f=s.extensionsUsed[u],h=s.extensionsRequired||[];switch(f){case it.KHR_MATERIALS_UNLIT:o[f]=new z1;break;case it.KHR_DRACO_MESH_COMPRESSION:o[f]=new rw(s,this.dracoLoader);break;case it.KHR_TEXTURE_TRANSFORM:o[f]=new sw;break;case it.KHR_MESH_QUANTIZATION:o[f]=new ow;break;default:h.indexOf(f)>=0&&a[f]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+f+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(r,i)}parseAsync(e,t){const r=this;return new Promise(function(i,s){r.parse(e,t,i,s)})}}function k1(){let n={};return{get:function(e){return n[e]},add:function(e,t){n[e]=t},remove:function(e){delete n[e]},removeAll:function(){n={}}}}const it={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class G1{constructor(e){this.parser=e,this.name=it.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let r=0,i=t.length;r<i;r++){const s=t[r];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,r="light:"+e;let i=t.cache.get(r);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Ue(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Nt);const f=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new pg(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Xc(u),c.distance=f;break;case"spot":c=new c1(u),c.distance=f,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Ni(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(r,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,r=this.parser,s=r.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return r._getNodeRef(t.cache,a,l)})}}class z1{constructor(){this.name=it.KHR_MATERIALS_UNLIT}getMaterialType(){return rt}extendParams(e,t,r){const i=[];e.color=new Ue(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Nt),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(r.assignTexture(e,"map",s.baseColorTexture,qt))}return Promise.all(i)}}class H1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class V1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(r.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(r.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(r.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ce(a,a)}return Promise.all(s)}}class W1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(r.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(r.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class X1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SHEEN}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Ue(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Nt)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(r.assignTexture(t,"sheenColorMap",o.sheenColorTexture,qt)),o.sheenRoughnessTexture!==void 0&&s.push(r.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class j1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(r.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Y1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_VOLUME}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(r.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Ue().setRGB(a[0],a[1],a[2],Nt),Promise.all(s)}}class q1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_IOR}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class K1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_SPECULAR}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(r.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Ue().setRGB(a[0],a[1],a[2],Nt),o.specularColorTexture!==void 0&&s.push(r.assignTexture(t,"specularColorMap",o.specularColorTexture,qt)),Promise.all(s)}}class Z1{constructor(e){this.parser=e,this.name=it.EXT_MATERIALS_BUMP}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(r.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class J1{constructor(e){this.parser=e,this.name=it.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:ft}extendMaterialParams(e,t){const r=this.parser,i=r.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(r.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class $1{constructor(e){this.parser=e,this.name=it.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,r=t.json,i=r.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(r.extensionsRequired&&r.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class Q1{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,r=this.parser,i=r.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=r.textureLoader;if(a.uri){const c=r.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return r.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return r.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class ew{constructor(e){this.parser=e,this.name=it.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,r=this.parser,i=r.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=r.textureLoader;if(a.uri){const c=r.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return r.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return r.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class tw{constructor(e){this.name=it.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,r=t.bufferViews[e];if(r.extensions&&r.extensions[this.name]){const i=r.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,f=i.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,f,h,i.mode,i.filter).then(function(d){return d.buffer}):o.ready.then(function(){const d=new ArrayBuffer(u*f);return o.decodeGltfBuffer(new Uint8Array(d),u,f,h,i.mode,i.filter),d})})}else return null}}class nw{constructor(e){this.name=it.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,r=t.nodes[e];if(!r.extensions||!r.extensions[this.name]||r.mesh===void 0)return null;const i=t.meshes[r.mesh];for(const c of i.primitives)if(c.mode!==gn.TRIANGLES&&c.mode!==gn.TRIANGLE_STRIP&&c.mode!==gn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=r.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),f=u.isGroup?u.children:[u],h=c[0].count,d=[];for(const g of f){const _=new Je,p=new D,m=new Qn,y=new D(1,1,1),v=new XT(g.geometry,g.material,h);for(let M=0;M<h;M++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,M),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,M),l.SCALE&&y.fromBufferAttribute(l.SCALE,M),v.setMatrixAt(M,_.compose(p,m,y));for(const M in l)if(M==="_COLOR_0"){const A=l[M];v.instanceColor=new Na(A.array,A.itemSize,A.normalized)}else M!=="TRANSLATION"&&M!=="ROTATION"&&M!=="SCALE"&&g.geometry.setAttribute(M,l[M]);St.prototype.copy.call(v,g),this.parser.assignFinalMaterial(v),d.push(v)}return u.isGroup?(u.clear(),u.add(...d),u):d[0]}))}}const Eg="glTF",Vs=12,qd={JSON:1313821514,BIN:5130562};class iw{constructor(e){this.name=it.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Vs),r=new TextDecoder;if(this.header={magic:r.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Eg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Vs,s=new DataView(e,Vs);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===qd.JSON){const c=new Uint8Array(e,Vs+o,a);this.content=r.decode(c)}else if(l===qd.BIN){const c=Vs+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class rw{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=it.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const r=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const f=Yc[u]||u.toLowerCase();a[f]=o[u]}for(const u in e.attributes){const f=Yc[u]||u.toLowerCase();if(o[u]!==void 0){const h=r.accessors[e.attributes[u]],d=ts[h.componentType];c[f]=d.name,l[f]=h.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(f,h){i.decodeDracoFile(u,function(d){for(const g in d.attributes){const _=d.attributes[g],p=l[g];p!==void 0&&(_.normalized=p)}f(d)},a,c,Nt,h)})})}}class sw{constructor(){this.name=it.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ow{constructor(){this.name=it.KHR_MESH_QUANTIZATION}}class Tg extends Mo{constructor(e,t,r,i){super(e,t,r,i)}copySampleValue_(e){const t=this.resultBuffer,r=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=r[s+o];return t}interpolate_(e,t,r,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,f=(r-t)/u,h=f*f,d=h*f,g=e*c,_=g-c,p=-2*d+3*h,m=d-h,y=1-p,v=m-h+f;for(let M=0;M!==a;M++){const A=o[_+M+a],w=o[_+M+l]*u,T=o[g+M+a],P=o[g+M]*u;s[M]=y*A+v*w+p*T+m*P}return s}}const aw=new Qn;class lw extends Tg{interpolate_(e,t,r,i){const s=super.interpolate_(e,t,r,i);return aw.fromArray(s).normalize().toArray(s),s}}const gn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Kd={9728:Ut,9729:Pt,9984:Bc,9985:ya,9986:Xr,9987:fi},Zd={33071:_n,33648:La,10497:cs},dc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Yc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Pi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},cw={CUBICSPLINE:void 0,LINEAR:fs,STEP:_o},pc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function uw(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new fr({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:gi})),n.DefaultMaterial}function sr(n,e,t){for(const r in t.extensions)n[r]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[r]=t.extensions[r])}function Ni(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function fw(n,e,t){let r=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const f=e[c];if(f.POSITION!==void 0&&(r=!0),f.NORMAL!==void 0&&(i=!0),f.COLOR_0!==void 0&&(s=!0),r&&i&&s)break}if(!r&&!i&&!s)return Promise.resolve(n);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const f=e[c];if(r){const h=f.POSITION!==void 0?t.getDependency("accessor",f.POSITION):n.attributes.position;o.push(h)}if(i){const h=f.NORMAL!==void 0?t.getDependency("accessor",f.NORMAL):n.attributes.normal;a.push(h)}if(s){const h=f.COLOR_0!==void 0?t.getDependency("accessor",f.COLOR_0):n.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],f=c[1],h=c[2];return r&&(n.morphAttributes.position=u),i&&(n.morphAttributes.normal=f),s&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function hw(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let t=0,r=e.weights.length;t<r;t++)n.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(n.morphTargetInfluences.length===t.length){n.morphTargetDictionary={};for(let r=0,i=t.length;r<i;r++)n.morphTargetDictionary[t[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function dw(n){let e;const t=n.extensions&&n.extensions[it.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+mc(t.attributes):e=n.indices+":"+mc(n.attributes)+":"+n.mode,n.targets!==void 0)for(let r=0,i=n.targets.length;r<i;r++)e+=":"+mc(n.targets[r]);return e}function mc(n){let e="";const t=Object.keys(n).sort();for(let r=0,i=t.length;r<i;r++)e+=t[r]+":"+n[t[r]]+";";return e}function qc(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function pw(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const mw=new Je;class gw{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new k1,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let r=!1,i=!1,s=-1;typeof navigator<"u"&&(r=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||r||i&&s<98?this.textureLoader=new dg(this.options.manager):this.textureLoader=new p1(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new hg(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const r=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([r.getDependencies("scene"),r.getDependencies("animation"),r.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:r,userData:{}};return sr(s,a,i),Ni(a,i),Promise.all(r._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],r=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(r[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,r){if(e.refs[t]<=1)return r;const i=r.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(r,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let r=0;r<t.length;r++){const i=e(t[r]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const r=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&r.push(s)}return r}getDependency(e,t){const r=e+":"+t;let i=this.cache.get(r);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(r,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const r=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return r.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],r=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[it.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){r.load(ro.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(r){const i=t.byteLength||0,s=t.byteOffset||0;return r.slice(s,s+i)})}loadAccessor(e){const t=this,r=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=dc[i.type],a=ts[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Jt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=dc[i.type],c=ts[i.componentType],u=c.BYTES_PER_ELEMENT,f=u*l,h=i.byteOffset||0,d=i.bufferView!==void 0?r.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,p;if(d&&d!==f){const m=Math.floor(h/d),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+m+":"+i.count;let v=t.cache.get(y);v||(_=new c(a,m*d,i.count*d/u),v=new GT(_,d/u),t.cache.add(y,v)),p=new Cu(v,l,h%d/u,g)}else a===null?_=new c(i.count*l):_=new c(a,h,i.count*l),p=new Jt(_,l,g);if(i.sparse!==void 0){const m=dc.SCALAR,y=ts[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,M=i.sparse.values.byteOffset||0,A=new y(o[1],v,i.sparse.count*m),w=new c(o[2],M,i.sparse.count*l);a!==null&&(p=new Jt(p.array.slice(),p.itemSize,p.normalized));for(let T=0,P=A.length;T<P;T++){const $=A[T];if(p.setX($,w[T*l]),l>=2&&p.setY($,w[T*l+1]),l>=3&&p.setZ($,w[T*l+2]),l>=4&&p.setW($,w[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return p})}loadTexture(e){const t=this.json,r=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=r.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,r){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,r).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(s.samplers||{})[o.sampler]||{};return u.magFilter=Kd[h.magFilter]||Pt,u.minFilter=Kd[h.minFilter]||fi,u.wrapS=Zd[h.wrapS]||cs,u.wrapT=Zd[h.wrapT]||cs,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const r=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=r.getDependency("bufferView",o.bufferView).then(function(f){c=!0;const h=new Blob([f],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(f){return new Promise(function(h,d){let g=h;t.isImageBitmapLoader===!0&&(g=function(_){const p=new wt(_);p.needsUpdate=!0,h(p)}),t.load(ro.resolveURL(f,s.path),g,void 0,d)})}).then(function(f){return c===!0&&a.revokeObjectURL(l),f.userData.mimeType=o.mimeType||pw(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=u,u}assignTexture(e,t,r,i){const s=this;return this.getDependency("texture",r.index).then(function(o){if(!o)return null;if(r.texCoord!==void 0&&r.texCoord>0&&(o=o.clone(),o.channel=r.texCoord),s.extensions[it.KHR_TEXTURE_TRANSFORM]){const a=r.extensions!==void 0?r.extensions[it.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[it.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let r=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+r.uuid;let l=this.cache.get(a);l||(l=new cg,Jn.prototype.copy.call(l,r),l.color.copy(r.color),l.map=r.map,l.sizeAttenuation=!1,this.cache.add(a,l)),r=l}else if(e.isLine){const a="LineBasicMaterial:"+r.uuid;let l=this.cache.get(a);l||(l=new lg,Jn.prototype.copy.call(l,r),l.color.copy(r.color),l.map=r.map,this.cache.add(a,l)),r=l}if(i||s||o){let a="ClonedMaterial:"+r.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=r.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(r))),r=l}e.material=r}getMaterialType(){return fr}loadMaterial(e){const t=this,r=this.json,i=this.extensions,s=r.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[it.KHR_MATERIALS_UNLIT]){const f=i[it.KHR_MATERIALS_UNLIT];o=f.getMaterialType(),c.push(f.extendParams(a,s,t))}else{const f=s.pbrMetallicRoughness||{};if(a.color=new Ue(1,1,1),a.opacity=1,Array.isArray(f.baseColorFactor)){const h=f.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Nt),a.opacity=h[3]}f.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",f.baseColorTexture,qt)),a.metalness=f.metallicFactor!==void 0?f.metallicFactor:1,a.roughness=f.roughnessFactor!==void 0?f.roughnessFactor:1,f.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",f.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",f.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Un);const u=s.alphaMode||pc.OPAQUE;if(u===pc.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===pc.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==rt&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ce(1,1),s.normalTexture.scale!==void 0)){const f=s.normalTexture.scale;a.normalScale.set(f,f)}if(s.occlusionTexture!==void 0&&o!==rt&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==rt){const f=s.emissiveFactor;a.emissive=new Ue().setRGB(f[0],f[1],f[2],Nt)}return s.emissiveTexture!==void 0&&o!==rt&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,qt)),Promise.all(c).then(function(){const f=new o(a);return s.name&&(f.name=s.name),Ni(f,s),t.associations.set(f,{materials:e}),s.extensions&&sr(i,f,s),f})}createUniqueName(e){const t=dt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,r=this.extensions,i=this.primitiveCache;function s(a){return r[it.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Jd(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=dw(c),f=i[u];if(f)o.push(f.promise);else{let h;c.extensions&&c.extensions[it.KHR_DRACO_MESH_COMPRESSION]?h=s(c):h=Jd(new Mn,c,t),i[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,r=this.json,i=this.extensions,s=r.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?uw(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],f=[];for(let d=0,g=u.length;d<g;d++){const _=u[d],p=o[d];let m;const y=c[d];if(p.mode===gn.TRIANGLES||p.mode===gn.TRIANGLE_STRIP||p.mode===gn.TRIANGLE_FAN||p.mode===void 0)m=s.isSkinnedMesh===!0?new HT(_,y):new at(_,y),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),p.mode===gn.TRIANGLE_STRIP?m.geometry=Yd(m.geometry,Dm):p.mode===gn.TRIANGLE_FAN&&(m.geometry=Yd(m.geometry,kc));else if(p.mode===gn.LINES)m=new jT(_,y);else if(p.mode===gn.LINE_STRIP)m=new Pu(_,y);else if(p.mode===gn.LINE_LOOP)m=new YT(_,y);else if(p.mode===gn.POINTS)m=new qT(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(m.geometry.morphAttributes).length>0&&hw(m,s),m.name=t.createUniqueName(s.name||"mesh_"+e),Ni(m,s),p.extensions&&sr(i,m,p),t.assignFinalMaterial(m),f.push(m)}for(let d=0,g=f.length;d<g;d++)t.associations.set(f[d],{meshes:e,primitives:d});if(f.length===1)return s.extensions&&sr(i,f[0],s),f[0];const h=new di;s.extensions&&sr(i,h,s),t.associations.set(h,{meshes:e});for(let d=0,g=f.length;d<g;d++)h.add(f[d]);return h})}loadCamera(e){let t;const r=this.json.cameras[e],i=r[r.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return r.type==="perspective"?t=new Kt(Om.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):r.type==="orthographic"&&(t=new Au(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),r.name&&(t.name=this.createUniqueName(r.name)),Ni(t,r),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],r=[];for(let i=0,s=t.joints.length;i<s;i++)r.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?r.push(this.getDependency("accessor",t.inverseBindMatrices)):r.push(null),Promise.all(r).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const f=o[c];if(f){a.push(f);const h=new Je;s!==null&&h.fromArray(s.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Lu(a,l)})}loadAnimation(e){const t=this.json,r=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let f=0,h=i.channels.length;f<h;f++){const d=i.channels[f],g=i.samplers[d.sampler],_=d.target,p=_.node,m=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(o.push(this.getDependency("node",p)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",y)),c.push(g),u.push(_))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(f){const h=f[0],d=f[1],g=f[2],_=f[3],p=f[4],m=[];for(let y=0,v=h.length;y<v;y++){const M=h[y],A=d[y],w=g[y],T=_[y],P=p[y];if(M===void 0)continue;M.updateMatrix&&M.updateMatrix();const $=r._createAnimationTracks(M,A,w,T,P);if($)for(let E=0;E<$.length;E++)m.push($[E])}return new t1(s,void 0,m)})}createNodeMesh(e){const t=this.json,r=this,i=t.nodes[e];return i.mesh===void 0?null:r.getDependency("mesh",i.mesh).then(function(s){const o=r._getNodeRef(r.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,r=this,i=t.nodes[e],s=r._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(r.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):r.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],f=c[1],h=c[2];h!==null&&u.traverse(function(d){d.isSkinnedMesh&&d.bind(h,mw)});for(let d=0,g=f.length;d<g;d++)u.add(f[d]);return u})}_loadNodeShallow(e){const t=this.json,r=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new og:c.length>1?u=new di:c.length===1?u=c[0]:u=new St,u!==c[0])for(let f=0,h=c.length;f<h;f++)u.add(c[f]);if(s.name&&(u.userData.name=s.name,u.name=o),Ni(u,s),s.extensions&&sr(r,u,s),s.matrix!==void 0){const f=new Je;f.fromArray(s.matrix),u.applyMatrix4(f)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);return i.associations.has(u)||i.associations.set(u,{}),i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,r=this.json.scenes[e],i=this,s=new di;r.name&&(s.name=i.createUniqueName(r.name)),Ni(s,r),r.extensions&&sr(t,s,r);const o=r.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,f=l.length;u<f;u++)s.add(l[u]);const c=u=>{const f=new Map;for(const[h,d]of i.associations)(h instanceof Jn||h instanceof wt)&&f.set(h,d);return u.traverse(h=>{const d=i.associations.get(h);d!=null&&f.set(h,d)}),f};return i.associations=c(s),s})}_createAnimationTracks(e,t,r,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Pi[s.path]===Pi.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(Pi[s.path]){case Pi.weights:c=ps;break;case Pi.rotation:c=xr;break;case Pi.position:case Pi.scale:c=ms;break;default:switch(r.itemSize){case 1:c=ps;break;case 2:case 3:default:c=ms;break}break}const u=i.interpolation!==void 0?cw[i.interpolation]:fs,f=this._getArrayFromAccessor(r);for(let h=0,d=l.length;h<d;h++){const g=new c(l[h]+"."+Pi[s.path],t.array,f,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const r=qc(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*r;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(r){const i=this instanceof xr?lw:Tg;return new i(this.times,this.values,this.getValueSize()/3,r)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function _w(n,e,t){const r=e.attributes,i=new zn;if(r.POSITION!==void 0){const a=t.json.accessors[r.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),a.normalized){const u=qc(ts[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new D,l=new D;for(let c=0,u=s.length;c<u;c++){const f=s[c];if(f.POSITION!==void 0){const h=t.json.accessors[f.POSITION],d=h.min,g=h.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),h.normalized){const _=qc(ts[h.componentType]);l.multiplyScalar(_)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}n.boundingBox=i;const o=new Hn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,n.boundingSphere=o}function Jd(n,e,t){const r=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){n.setAttribute(a,l)})}for(const o in r){const a=Yc[o]||o.toLowerCase();a in n.attributes||i.push(s(r[o],a))}if(e.indices!==void 0&&!n.index){const o=t.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});i.push(o)}return ut.workingColorSpace!==Nt&&"COLOR_0"in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ut.workingColorSpace}" not supported.`),Ni(n,e),_w(n,e,t),Promise.all(i).then(function(){return e.targets!==void 0?fw(n,e.targets,t):n})}const vw=new dg,fa={},il=async n=>(fa[n]||(fa[n]=await vw.loadAsync(n)),fa[n]);function xw(n){const t=document.createElement("canvas");t.width=256,t.height=1;const r=t.getContext("2d"),i=r.createLinearGradient(0,0,256,0);n.forEach(([o,a])=>{i.addColorStop(o,a)}),r.fillStyle=i,r.fillRect(0,0,256,1);const s=new wt(t);return s.needsUpdate=!0,s}async function Xt(n,e,t,r=[],i){const a=(await new B1().loadAsync(n)).scene;return i.add(a),a.position.y=-1,a.rotation.y=Math.PI/2,a.traverse(l=>{l.isMesh&&(l.castShadow=e,l.receiveShadow=t),r.forEach(c=>{c.pattern?new RegExp(c.pattern).test(l.name)&&(l.material=c.material):l.name===c.name&&(l.material=c.material)})}),a}async function yw(n){const e=new ft({color:14540253,metalness:.6,roughness:0}),t=new ft({color:3355443,metalness:.3,roughness:.4}),r=new ft({color:3355443,metalness:1,roughness:1}),i=new ft({color:16777215,metalness:1,roughness:1}),s=new ft({color:2965972,metalness:1,roughness:1}),o=new ft({color:16711680,metalness:.3,roughness:.4}),a=new fr({color:65280,emissive:65280,emissiveIntensity:.5}),l=new fr({color:16777215,emissive:16777215,emissiveIntensity:.5}),c=new fr({color:16777215,emissive:16777215,emissiveIntensity:.1});c.transparent=!0,c.opacity=.05;const u=new fr({color:2965972,emissive:2965972,emissiveIntensity:.1});u.transparent=!0,u.opacity=.1;const f=await il("/textures/black_fabric_basecolor.png"),h=new ft({map:f});Xt("/table.glb",!0,!0,[{name:"Table_Legs",material:e},{name:"Table_Top",material:t}],n),Xt("/keyboard.glb",!0,!0,[{name:"Keyboard",material:e},{name:"Light_1",material:a},{name:"Light_2",material:a},{name:"Light_3",material:a},{pattern:/Key_\d+_Top/,material:o},{pattern:/Key_\d+_Bottom/,material:t}],n),Xt("/mouse.glb",!0,!0,[{name:"Mouse_Back",material:o},{name:"Mouse_Front",material:e},{name:"Scroll",material:t}],n),Xt("/mousepad.glb",!0,!0,[{name:"Mousepad",material:r}],n),Xt("/chair.glb",!0,!0,[{name:"Chair_Metal",material:e},{name:"Chair_Pillow",material:h},{name:"Chair_Back",material:h},{pattern:/Chair_Wheel/,material:t}],n),Xt("/lamp.glb",!0,!0,[{name:"Lamp",material:h},{name:"Lamp_Stand",material:e},{name:"Lamp_Light_Top",material:l},{name:"Lamp_Light_Bottom",material:e}],n),Xt("/lamp_emission.glb",!1,!1,[{name:"Lamp_Light_Emission_1",material:c}],n),Xt("/notebook.glb",!0,!0,[{name:"Notebook",material:i},{name:"Notebook_Lines",material:s},{name:"Notebook_R_1",material:i},{name:"Notebook_R_2",material:i},{name:"Notebook_Top",material:s}],n),Xt("/pen.glb",!0,!0,[{name:"Pen",material:r},{name:"Pen_Handle",material:t}],n),(await Xt("/coffee.glb",!0,!0,[{name:"Cup",material:i},{name:"Coffee",material:t}],n)).position.set(-.8,-1,-.3),Xt("/sky.glb",!1,!0,[{name:"Sky",material:l},{name:"Sky_Floor",material:i}],n),Xt("/monitor.glb",!0,!0,[{name:"Monitor_Stand",material:e},{name:"Monitor_Frame",material:e},{name:"Monitor_Glass",material:t}],n);const g=new ft({color:16711680,emissive:16711680,emissiveIntensity:1}),_=new ft({color:3355443,emissive:3355443,emissiveIntensity:1}),p=await Xt("/openToOpportunities.glb",!0,!0,[{name:"Text",material:g},{name:"Cube",material:_}],n);p.position.set(1.65,.37,-.37),p.scale.set(.1,.1,.1),p.rotation.y-=Math.PI/2+.3;const m=new ft({color:16759629}),y=new ft({color:16716820}),v=new ft({color:3750324}),M=new ft({color:4671303}),A=await Xt("/lemonadeGuy.glb",!0,!0,[{name:"Skin",material:m},{name:"Shirt",material:y},{name:"Pants",material:v},{name:"Shoes",material:M}],n);A.position.set(-1.65,.49,-.37),A.scale.set(.05,.05,.05),A.rotation.y-=Math.PI/2-.5;const w=new ft({color:2965972,emissive:2965972,emissiveIntensity:1}),T=new ft({color:3355443,emissive:3355443,emissiveIntensity:1}),P=new ft({color:11184810,emissive:11184810,emissiveIntensity:1}),$=new ft({color:2967,emissive:2967,emissiveIntensity:1}),E=new ft({color:0,emissive:0,emissiveIntensity:1}),C=new ft({color:16777215,emissive:16777215,emissiveIntensity:1}),B=await Xt("/os.glb",!1,!1,[{name:"Monitor_Screen",material:w},{name:"Monitor_StartBar",material:T},{name:"Monitor_StartBar_BrowserButton",material:P},{name:"Monitor_StartBar_StartButton",material:P},{pattern:/Monitor_StartBar_StartButton_Icon/,material:$},{name:"Monitor_BrowserButton_Text",material:E},{name:"Monitor_WindowBar",material:T},{name:"Monitor_Window_Icon",material:$},{name:"Monitor_WindowAddressBar",material:C},{name:"Monitor_WindowBgg",material:C},{name:"Monitor_WindowBgg",material:C},{name:"Monitor_WindowCloseButton",material:P},{name:"Monitor_WindowMinimizeButton",material:P},{pattern:/Monitor_WindowCloseButton_Icon/,material:E},{pattern:/Monitor_WindowMinimizeButton_Icon/,material:E}],n);return B.visible=!1,B}function Mw(n){const e=new pg(16777215,.3);e.position.set(0,2,0),e.castShadow=!0,e.shadow.camera.top=20,e.shadow.camera.bottom=-20,e.shadow.camera.left=-20,e.shadow.camera.right=20,e.shadow.camera.near=.1,e.shadow.camera.far=1e3,e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,n.add(e);const t=new h1(16777215,.3);n.add(t);const r=new Xc(16777215,4.5);r.position.set(0,1.5,3),r.castShadow=!0,n.add(r);const i=new Xc(16777215,4.5);return i.position.set(-1.15,1,-.2),i.castShadow=!0,n.add(i),{setPointLightColor:o=>{r.color=o,i.color=o}}}function Sw(){var n=Object.create(null);function e(i,s){var o=i.id,a=i.name,l=i.dependencies;l===void 0&&(l=[]);var c=i.init;c===void 0&&(c=function(){});var u=i.getTransferables;if(u===void 0&&(u=null),!n[o])try{l=l.map(function(h){return h&&h.isWorkerModule&&(e(h,function(d){if(d instanceof Error)throw d}),h=n[h.id].value),h}),c=r("<"+a+">.init",c),u&&(u=r("<"+a+">.getTransferables",u));var f=null;typeof c=="function"?f=c.apply(void 0,l):console.error("worker module init function failed to rehydrate"),n[o]={id:o,value:f,getTransferables:u},s(f)}catch(h){h&&h.noLog||console.error(h),s(h)}}function t(i,s){var o,a=i.id,l=i.args;(!n[a]||typeof n[a].value!="function")&&s(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var c=(o=n[a]).value.apply(o,l);c&&typeof c.then=="function"?c.then(u,function(f){return s(f instanceof Error?f:new Error(""+f))}):u(c)}catch(f){s(f)}function u(f){try{var h=n[a].getTransferables&&n[a].getTransferables(f);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),s(f,h)}catch(d){console.error(d),s(d)}}}function r(i,s){var o=void 0;self.troikaDefine=function(l){return o=l};var a=URL.createObjectURL(new Blob(["/** "+i.replace(/\*/g,"")+` **/

troikaDefine(
`+s+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch(l){console.error(l)}return URL.revokeObjectURL(a),delete self.troikaDefine,o}self.addEventListener("message",function(i){var s=i.data,o=s.messageId,a=s.action,l=s.data;try{a==="registerModule"&&e(l,function(c){c instanceof Error?postMessage({messageId:o,success:!1,error:c.message}):postMessage({messageId:o,success:!0,result:{isCallable:typeof c=="function"}})}),a==="callModule"&&t(l,function(c,u){c instanceof Error?postMessage({messageId:o,success:!1,error:c.message}):postMessage({messageId:o,success:!0,result:c},u||void 0)})}catch(c){postMessage({messageId:o,success:!1,error:c.stack})}})}function bw(n){var e=function(){for(var t=[],r=arguments.length;r--;)t[r]=arguments[r];return e._getInitResult().then(function(i){if(typeof i=="function")return i.apply(void 0,t);throw new Error("Worker module function was called but `init` did not return a callable function")})};return e._getInitResult=function(){var t=n.dependencies,r=n.init;t=Array.isArray(t)?t.map(function(s){return s&&(s=s.onMainThread||s,s._getInitResult&&(s=s._getInitResult())),s}):[];var i=Promise.all(t).then(function(s){return r.apply(null,s)});return e._getInitResult=function(){return i},i},e}var wg=function(){var n=!1;if(typeof window<"u"&&typeof window.document<"u")try{var e=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));e.terminate(),n=!0}catch(t){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+t.message+"]")}return wg=function(){return n},n},Ew=0,Tw=0,gc=!1,so=Object.create(null),oo=Object.create(null),Kc=Object.create(null);function bs(n){if((!n||typeof n.init!="function")&&!gc)throw new Error("requires `options.init` function");var e=n.dependencies,t=n.init,r=n.getTransferables,i=n.workerId,s=bw(n);i==null&&(i="#default");var o="workerModule"+ ++Ew,a=n.name||o,l=null;e=e&&e.map(function(u){return typeof u=="function"&&!u.workerModuleData&&(gc=!0,u=bs({workerId:i,name:"<"+a+"> function dependency: "+u.name,init:`function(){return (
`+Sa(u)+`
)}`}),gc=!1),u&&u.workerModuleData&&(u=u.workerModuleData),u});function c(){for(var u=[],f=arguments.length;f--;)u[f]=arguments[f];if(!wg())return s.apply(void 0,u);if(!l){l=$d(i,"registerModule",c.workerModuleData);var h=function(){l=null,oo[i].delete(h)};(oo[i]||(oo[i]=new Set)).add(h)}return l.then(function(d){var g=d.isCallable;if(g)return $d(i,"callModule",{id:o,args:u});throw new Error("Worker module function was called but `init` did not return a callable function")})}return c.workerModuleData={isWorkerModule:!0,id:o,name:a,dependencies:e,init:Sa(t),getTransferables:r&&Sa(r)},c.onMainThread=s,c}function ww(n){oo[n]&&oo[n].forEach(function(e){e()}),so[n]&&(so[n].terminate(),delete so[n])}function Sa(n){var e=n.toString();return!/^function/.test(e)&&/^\w+\s*\(/.test(e)&&(e="function "+e),e}function Aw(n){var e=so[n];if(!e){var t=Sa(Sw);e=so[n]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+n.replace(/\*/g,"")+` **/

;(`+t+")()"],{type:"application/javascript"}))),e.onmessage=function(r){var i=r.data,s=i.messageId,o=Kc[s];if(!o)throw new Error("WorkerModule response with empty or unknown messageId");delete Kc[s],o(i)}}return e}function $d(n,e,t){return new Promise(function(r,i){var s=++Tw;Kc[s]=function(o){o.success?r(o.result):i(new Error("Error in worker "+e+" call: "+o.error))},Aw(n).postMessage({messageId:s,action:e,data:t})})}function Ag(){var n=function(e){function t(K,q,U,X,le,N,V,oe){var F=1-V;oe.x=F*F*K+2*F*V*U+V*V*le,oe.y=F*F*q+2*F*V*X+V*V*N}function r(K,q,U,X,le,N,V,oe,F,j){var ee=1-F;j.x=ee*ee*ee*K+3*ee*ee*F*U+3*ee*F*F*le+F*F*F*V,j.y=ee*ee*ee*q+3*ee*ee*F*X+3*ee*F*F*N+F*F*F*oe}function i(K,q){for(var U=/([MLQCZ])([^MLQCZ]*)/g,X,le,N,V,oe;X=U.exec(K);){var F=X[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(j){return parseFloat(j)});switch(X[1]){case"M":V=le=F[0],oe=N=F[1];break;case"L":(F[0]!==V||F[1]!==oe)&&q("L",V,oe,V=F[0],oe=F[1]);break;case"Q":{q("Q",V,oe,V=F[2],oe=F[3],F[0],F[1]);break}case"C":{q("C",V,oe,V=F[4],oe=F[5],F[0],F[1],F[2],F[3]);break}case"Z":(V!==le||oe!==N)&&q("L",V,oe,le,N);break}}}function s(K,q,U){U===void 0&&(U=16);var X={x:0,y:0};i(K,function(le,N,V,oe,F,j,ee,me,de){switch(le){case"L":q(N,V,oe,F);break;case"Q":{for(var x=N,I=V,O=1;O<U;O++)t(N,V,j,ee,oe,F,O/(U-1),X),q(x,I,X.x,X.y),x=X.x,I=X.y;break}case"C":{for(var Z=N,Q=V,ce=1;ce<U;ce++)r(N,V,j,ee,me,de,oe,F,ce/(U-1),X),q(Z,Q,X.x,X.y),Z=X.x,Q=X.y;break}}})}var o="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",l=new WeakMap,c={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function u(K,q){var U=K.getContext?K.getContext("webgl",c):K,X=l.get(U);if(!X){let Z=function(b){var S=N[b];if(!S&&(S=N[b]=U.getExtension(b),!S))throw new Error(b+" not supported");return S},Q=function(b,S){var k=U.createShader(S);return U.shaderSource(k,b),U.compileShader(k),k},ce=function(b,S,k,W){if(!V[b]){var te={},he={},ye=U.createProgram();U.attachShader(ye,Q(S,U.VERTEX_SHADER)),U.attachShader(ye,Q(k,U.FRAGMENT_SHADER)),U.linkProgram(ye),V[b]={program:ye,transaction:function(ge){U.useProgram(ye),ge({setUniform:function(Fe,Te){for(var Be=[],De=arguments.length-2;De-- >0;)Be[De]=arguments[De+2];var Se=he[Te]||(he[Te]=U.getUniformLocation(ye,Te));U["uniform"+Fe].apply(U,[Se].concat(Be))},setAttribute:function(Fe,Te,Be,De,Se){var Ae=te[Fe];Ae||(Ae=te[Fe]={buf:U.createBuffer(),loc:U.getAttribLocation(ye,Fe),data:null}),U.bindBuffer(U.ARRAY_BUFFER,Ae.buf),U.vertexAttribPointer(Ae.loc,Te,U.FLOAT,!1,0,0),U.enableVertexAttribArray(Ae.loc),le?U.vertexAttribDivisor(Ae.loc,De):Z("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(Ae.loc,De),Se!==Ae.data&&(U.bufferData(U.ARRAY_BUFFER,Se,Be),Ae.data=Se)}})}}}V[b].transaction(W)},ie=function(b,S){F++;try{U.activeTexture(U.TEXTURE0+F);var k=oe[b];k||(k=oe[b]=U.createTexture(),U.bindTexture(U.TEXTURE_2D,k),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_MIN_FILTER,U.NEAREST),U.texParameteri(U.TEXTURE_2D,U.TEXTURE_MAG_FILTER,U.NEAREST)),U.bindTexture(U.TEXTURE_2D,k),S(k,F)}finally{F--}},se=function(b,S,k){var W=U.createFramebuffer();j.push(W),U.bindFramebuffer(U.FRAMEBUFFER,W),U.activeTexture(U.TEXTURE0+S),U.bindTexture(U.TEXTURE_2D,b),U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,b,0);try{k(W)}finally{U.deleteFramebuffer(W),U.bindFramebuffer(U.FRAMEBUFFER,j[--j.length-1]||null)}},fe=function(){N={},V={},oe={},F=-1,j.length=0};var ee=Z,me=Q,de=ce,x=ie,I=se,O=fe,le=typeof WebGL2RenderingContext<"u"&&U instanceof WebGL2RenderingContext,N={},V={},oe={},F=-1,j=[];U.canvas.addEventListener("webglcontextlost",function(b){fe(),b.preventDefault()},!1),l.set(U,X={gl:U,isWebGL2:le,getExtension:Z,withProgram:ce,withTexture:ie,withTextureFramebuffer:se,handleContextLoss:fe})}q(X)}function f(K,q,U,X,le,N,V,oe){V===void 0&&(V=15),oe===void 0&&(oe=null),u(K,function(F){var j=F.gl,ee=F.withProgram,me=F.withTexture;me("copy",function(de,x){j.texImage2D(j.TEXTURE_2D,0,j.RGBA,le,N,0,j.RGBA,j.UNSIGNED_BYTE,q),ee("copy",o,a,function(I){var O=I.setUniform,Z=I.setAttribute;Z("aUV",2,j.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),O("1i","image",x),j.bindFramebuffer(j.FRAMEBUFFER,oe||null),j.disable(j.BLEND),j.colorMask(V&8,V&4,V&2,V&1),j.viewport(U,X,le,N),j.scissor(U,X,le,N),j.drawArrays(j.TRIANGLES,0,3)})})})}function h(K,q,U){var X=K.width,le=K.height;u(K,function(N){var V=N.gl,oe=new Uint8Array(X*le*4);V.readPixels(0,0,X,le,V.RGBA,V.UNSIGNED_BYTE,oe),K.width=q,K.height=U,f(V,oe,0,0,X,le)})}var d=Object.freeze({__proto__:null,withWebGLContext:u,renderImageData:f,resizeWebGLCanvasWithoutClearing:h});function g(K,q,U,X,le,N){N===void 0&&(N=1);var V=new Uint8Array(K*q),oe=X[2]-X[0],F=X[3]-X[1],j=[];s(U,function(Z,Q,ce,ie){j.push({x1:Z,y1:Q,x2:ce,y2:ie,minX:Math.min(Z,ce),minY:Math.min(Q,ie),maxX:Math.max(Z,ce),maxY:Math.max(Q,ie)})}),j.sort(function(Z,Q){return Z.maxX-Q.maxX});for(var ee=0;ee<K;ee++)for(var me=0;me<q;me++){var de=I(X[0]+oe*(ee+.5)/K,X[1]+F*(me+.5)/q),x=Math.pow(1-Math.abs(de)/le,N)/2;de<0&&(x=1-x),x=Math.max(0,Math.min(255,Math.round(x*255))),V[me*K+ee]=x}return V;function I(Z,Q){for(var ce=1/0,ie=1/0,se=j.length;se--;){var fe=j[se];if(fe.maxX+ie<=Z)break;if(Z+ie>fe.minX&&Q-ie<fe.maxY&&Q+ie>fe.minY){var b=m(Z,Q,fe.x1,fe.y1,fe.x2,fe.y2);b<ce&&(ce=b,ie=Math.sqrt(ce))}}return O(Z,Q)&&(ie=-ie),ie}function O(Z,Q){for(var ce=0,ie=j.length;ie--;){var se=j[ie];if(se.maxX<=Z)break;var fe=se.y1>Q!=se.y2>Q&&Z<(se.x2-se.x1)*(Q-se.y1)/(se.y2-se.y1)+se.x1;fe&&(ce+=se.y1<se.y2?1:-1)}return ce!==0}}function _(K,q,U,X,le,N,V,oe,F,j){N===void 0&&(N=1),oe===void 0&&(oe=0),F===void 0&&(F=0),j===void 0&&(j=0),p(K,q,U,X,le,N,V,null,oe,F,j)}function p(K,q,U,X,le,N,V,oe,F,j,ee){N===void 0&&(N=1),F===void 0&&(F=0),j===void 0&&(j=0),ee===void 0&&(ee=0);for(var me=g(K,q,U,X,le,N),de=new Uint8Array(me.length*4),x=0;x<me.length;x++)de[x*4+ee]=me[x];f(V,de,F,j,K,q,1<<3-ee,oe)}function m(K,q,U,X,le,N){var V=le-U,oe=N-X,F=V*V+oe*oe,j=F?Math.max(0,Math.min(1,((K-U)*V+(q-X)*oe)/F)):0,ee=K-(U+j*V),me=q-(X+j*oe);return ee*ee+me*me}var y=Object.freeze({__proto__:null,generate:g,generateIntoCanvas:_,generateIntoFramebuffer:p}),v="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",M="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",A="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",w=new Float32Array([0,0,2,0,0,2]),T=null,P=!1,$={},E=new WeakMap;function C(K){if(!P&&!ne(K))throw new Error("WebGL generation not supported")}function B(K,q,U,X,le,N,V){if(N===void 0&&(N=1),V===void 0&&(V=null),!V&&(V=T,!V)){var oe=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!oe)throw new Error("OffscreenCanvas or DOM canvas not supported");V=T=oe.getContext("webgl",{depth:!1})}C(V);var F=new Uint8Array(K*q*4);u(V,function(de){var x=de.gl,I=de.withTexture,O=de.withTextureFramebuffer;I("readable",function(Z,Q){x.texImage2D(x.TEXTURE_2D,0,x.RGBA,K,q,0,x.RGBA,x.UNSIGNED_BYTE,null),O(Z,Q,function(ce){R(K,q,U,X,le,N,x,ce,0,0,0),x.readPixels(0,0,K,q,x.RGBA,x.UNSIGNED_BYTE,F)})})});for(var j=new Uint8Array(K*q),ee=0,me=0;ee<F.length;ee+=4)j[me++]=F[ee];return j}function Y(K,q,U,X,le,N,V,oe,F,j){N===void 0&&(N=1),oe===void 0&&(oe=0),F===void 0&&(F=0),j===void 0&&(j=0),R(K,q,U,X,le,N,V,null,oe,F,j)}function R(K,q,U,X,le,N,V,oe,F,j,ee){N===void 0&&(N=1),F===void 0&&(F=0),j===void 0&&(j=0),ee===void 0&&(ee=0),C(V);var me=[];s(U,function(de,x,I,O){me.push(de,x,I,O)}),me=new Float32Array(me),u(V,function(de){var x=de.gl,I=de.isWebGL2,O=de.getExtension,Z=de.withProgram,Q=de.withTexture,ce=de.withTextureFramebuffer,ie=de.handleContextLoss;if(Q("rawDistances",function(se,fe){(K!==se._lastWidth||q!==se._lastHeight)&&x.texImage2D(x.TEXTURE_2D,0,x.RGBA,se._lastWidth=K,se._lastHeight=q,0,x.RGBA,x.UNSIGNED_BYTE,null),Z("main",v,M,function(b){var S=b.setAttribute,k=b.setUniform,W=!I&&O("ANGLE_instanced_arrays"),te=!I&&O("EXT_blend_minmax");S("aUV",2,x.STATIC_DRAW,0,w),S("aLineSegment",4,x.DYNAMIC_DRAW,1,me),k.apply(void 0,["4f","uGlyphBounds"].concat(X)),k("1f","uMaxDistance",le),k("1f","uExponent",N),ce(se,fe,function(he){x.enable(x.BLEND),x.colorMask(!0,!0,!0,!0),x.viewport(0,0,K,q),x.scissor(0,0,K,q),x.blendFunc(x.ONE,x.ONE),x.blendEquationSeparate(x.FUNC_ADD,I?x.MAX:te.MAX_EXT),x.clear(x.COLOR_BUFFER_BIT),I?x.drawArraysInstanced(x.TRIANGLES,0,3,me.length/4):W.drawArraysInstancedANGLE(x.TRIANGLES,0,3,me.length/4)})}),Z("post",o,A,function(b){b.setAttribute("aUV",2,x.STATIC_DRAW,0,w),b.setUniform("1i","tex",fe),x.bindFramebuffer(x.FRAMEBUFFER,oe),x.disable(x.BLEND),x.colorMask(ee===0,ee===1,ee===2,ee===3),x.viewport(F,j,K,q),x.scissor(F,j,K,q),x.drawArrays(x.TRIANGLES,0,3)})}),x.isContextLost())throw ie(),new Error("webgl context lost")})}function ne(K){var q=!K||K===T?$:K.canvas||K,U=E.get(q);if(U===void 0){P=!0;var X=null;try{var le=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],N=B(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,K);U=N&&le.length===N.length&&N.every(function(V,oe){return V===le[oe]}),U||(X="bad trial run results",console.info(le,N))}catch(V){U=!1,X=V.message}X&&console.warn("WebGL SDF generation not supported:",X),P=!1,E.set(q,U)}return U}var H=Object.freeze({__proto__:null,generate:B,generateIntoCanvas:Y,generateIntoFramebuffer:R,isSupported:ne});function re(K,q,U,X,le,N){le===void 0&&(le=Math.max(X[2]-X[0],X[3]-X[1])/2),N===void 0&&(N=1);try{return B.apply(H,arguments)}catch(V){return console.info("WebGL SDF generation failed, falling back to JS",V),g.apply(y,arguments)}}function J(K,q,U,X,le,N,V,oe,F,j){le===void 0&&(le=Math.max(X[2]-X[0],X[3]-X[1])/2),N===void 0&&(N=1),oe===void 0&&(oe=0),F===void 0&&(F=0),j===void 0&&(j=0);try{return Y.apply(H,arguments)}catch(ee){return console.info("WebGL SDF generation failed, falling back to JS",ee),_.apply(y,arguments)}}return e.forEachPathCommand=i,e.generate=re,e.generateIntoCanvas=J,e.javascript=y,e.pathToLineSegments=s,e.webgl=H,e.webglUtils=d,Object.defineProperty(e,"__esModule",{value:!0}),e}({});return n}function Rw(){var n=function(e){var t={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},r={},i={};r.L=1,i[1]="L",Object.keys(t).forEach(function(ie,se){r[ie]=1<<se+1,i[r[ie]]=ie}),Object.freeze(r);var s=r.LRI|r.RLI|r.FSI,o=r.L|r.R|r.AL,a=r.B|r.S|r.WS|r.ON|r.FSI|r.LRI|r.RLI|r.PDI,l=r.BN|r.RLE|r.LRE|r.RLO|r.LRO|r.PDF,c=r.S|r.WS|r.B|s|r.PDI|l,u=null;function f(){if(!u){u=new Map;var ie=function(fe){if(t.hasOwnProperty(fe)){var b=0;t[fe].split(",").forEach(function(S){var k=S.split("+"),W=k[0],te=k[1];W=parseInt(W,36),te=te?parseInt(te,36):0,u.set(b+=W,r[fe]);for(var he=0;he<te;he++)u.set(++b,r[fe])})}};for(var se in t)ie(se)}}function h(ie){return f(),u.get(ie.codePointAt(0))||r.L}function d(ie){return i[h(ie)]}var g={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function _(ie,se){var fe=36,b=0,S=new Map,k=se&&new Map,W;return ie.split(",").forEach(function te(he){if(he.indexOf("+")!==-1)for(var ye=+he;ye--;)te(W);else{W=he;var be=he.split(">"),ge=be[0],Ee=be[1];ge=String.fromCodePoint(b+=parseInt(ge,fe)),Ee=String.fromCodePoint(b+=parseInt(Ee,fe)),S.set(ge,Ee),se&&k.set(Ee,ge)}}),{map:S,reverseMap:k}}var p,m,y;function v(){if(!p){var ie=_(g.pairs,!0),se=ie.map,fe=ie.reverseMap;p=se,m=fe,y=_(g.canonical,!1).map}}function M(ie){return v(),p.get(ie)||null}function A(ie){return v(),m.get(ie)||null}function w(ie){return v(),y.get(ie)||null}var T=r.L,P=r.R,$=r.EN,E=r.ES,C=r.ET,B=r.AN,Y=r.CS,R=r.B,ne=r.S,H=r.ON,re=r.BN,J=r.NSM,K=r.AL,q=r.LRO,U=r.RLO,X=r.LRE,le=r.RLE,N=r.PDF,V=r.LRI,oe=r.RLI,F=r.FSI,j=r.PDI;function ee(ie,se){for(var fe=125,b=new Uint32Array(ie.length),S=0;S<ie.length;S++)b[S]=h(ie[S]);var k=new Map;function W(rn,wn){var sn=b[rn];b[rn]=wn,k.set(sn,k.get(sn)-1),sn&a&&k.set(a,k.get(a)-1),k.set(wn,(k.get(wn)||0)+1),wn&a&&k.set(a,(k.get(a)||0)+1)}for(var te=new Uint8Array(ie.length),he=new Map,ye=[],be=null,ge=0;ge<ie.length;ge++)be||ye.push(be={start:ge,end:ie.length-1,level:se==="rtl"?1:se==="ltr"?0:$u(ge,!1)}),b[ge]&R&&(be.end=ge,be=null);for(var Ee=le|X|U|q|s|j|N|R,Fe=function(rn){return rn+(rn&1?1:2)},Te=function(rn){return rn+(rn&1?2:1)},Be=0;Be<ye.length;Be++){be=ye[Be];var De=[{_level:be.level,_override:0,_isolate:0}],Se=void 0,Ae=0,Ie=0,G=0;k.clear();for(var xe=be.start;xe<=be.end;xe++){var we=b[xe];if(Se=De[De.length-1],k.set(we,(k.get(we)||0)+1),we&a&&k.set(a,(k.get(a)||0)+1),we&Ee)if(we&(le|X)){te[xe]=Se._level;var z=(we===le?Te:Fe)(Se._level);z<=fe&&!Ae&&!Ie?De.push({_level:z,_override:0,_isolate:0}):Ae||Ie++}else if(we&(U|q)){te[xe]=Se._level;var Le=(we===U?Te:Fe)(Se._level);Le<=fe&&!Ae&&!Ie?De.push({_level:Le,_override:we&U?P:T,_isolate:0}):Ae||Ie++}else if(we&s){we&F&&(we=$u(xe+1,!0)===1?oe:V),te[xe]=Se._level,Se._override&&W(xe,Se._override);var ae=(we===oe?Te:Fe)(Se._level);ae<=fe&&Ae===0&&Ie===0?(G++,De.push({_level:ae,_override:0,_isolate:1,_isolInitIndex:xe})):Ae++}else if(we&j){if(Ae>0)Ae--;else if(G>0){for(Ie=0;!De[De.length-1]._isolate;)De.pop();var Me=De[De.length-1]._isolInitIndex;Me!=null&&(he.set(Me,xe),he.set(xe,Me)),De.pop(),G--}Se=De[De.length-1],te[xe]=Se._level,Se._override&&W(xe,Se._override)}else we&N?(Ae===0&&(Ie>0?Ie--:!Se._isolate&&De.length>1&&(De.pop(),Se=De[De.length-1])),te[xe]=Se._level):we&R&&(te[xe]=be.level);else te[xe]=Se._level,Se._override&&we!==re&&W(xe,Se._override)}for(var Pe=[],Ge=null,ke=be.start;ke<=be.end;ke++){var He=b[ke];if(!(He&l)){var nt=te[ke],We=He&s,Ye=He===j;Ge&&nt===Ge._level?(Ge._end=ke,Ge._endsWithIsolInit=We):Pe.push(Ge={_start:ke,_end:ke,_level:nt,_startsWithPDI:Ye,_endsWithIsolInit:We})}}for(var mt=[],Ot=0;Ot<Pe.length;Ot++){var Qt=Pe[Ot];if(!Qt._startsWithPDI||Qt._startsWithPDI&&!he.has(Qt._start)){for(var un=[Ge=Qt],Vn=void 0;Ge&&Ge._endsWithIsolInit&&(Vn=he.get(Ge._end))!=null;)for(var en=Ot+1;en<Pe.length;en++)if(Pe[en]._start===Vn){un.push(Ge=Pe[en]);break}for(var Ct=[],Wn=0;Wn<un.length;Wn++)for(var bo=un[Wn],Es=bo._start;Es<=bo._end;Es++)Ct.push(Es);for(var ol=te[Ct[0]],L=be.level,ue=Ct[0]-1;ue>=0;ue--)if(!(b[ue]&l)){L=te[ue];break}var _e=Ct[Ct.length-1],ve=te[_e],pe=be.level;if(!(b[_e]&s)){for(var Oe=_e+1;Oe<=be.end;Oe++)if(!(b[Oe]&l)){pe=te[Oe];break}}mt.push({_seqIndices:Ct,_sosType:Math.max(L,ol)%2?P:T,_eosType:Math.max(pe,ve)%2?P:T})}}for(var ze=0;ze<mt.length;ze++){var Ve=mt[ze],Re=Ve._seqIndices,qe=Ve._sosType,Ke=Ve._eosType,Xe=te[Re[0]]&1?P:T;if(k.get(J))for(var vt=0;vt<Re.length;vt++){var Bt=Re[vt];if(b[Bt]&J){for(var bt=qe,tn=vt-1;tn>=0;tn--)if(!(b[Re[tn]]&l)){bt=b[Re[tn]];break}W(Bt,bt&(s|j)?H:bt)}}if(k.get($))for(var gt=0;gt<Re.length;gt++){var Ze=Re[gt];if(b[Ze]&$)for(var yi=gt-1;yi>=-1;yi--){var _t=yi===-1?qe:b[Re[yi]];if(_t&o){_t===K&&W(Ze,B);break}}}if(k.get(K))for(var Sn=0;Sn<Re.length;Sn++){var Ts=Re[Sn];b[Ts]&K&&W(Ts,P)}if(k.get(E)||k.get(Y))for(var bn=1;bn<Re.length-1;bn++){var qi=Re[bn];if(b[qi]&(E|Y)){for(var Mt=0,En=0,Ki=bn-1;Ki>=0&&(Mt=b[Re[Ki]],!!(Mt&l));Ki--);for(var kt=bn+1;kt<Re.length&&(En=b[Re[kt]],!!(En&l));kt++);Mt===En&&(b[qi]===E?Mt===$:Mt&($|B))&&W(qi,Mt)}}if(k.get($))for(var nn=0;nn<Re.length;nn++){var al=Re[nn];if(b[al]&$){for(var Zi=nn-1;Zi>=0&&b[Re[Zi]]&(C|l);Zi--)W(Re[Zi],$);for(nn++;nn<Re.length&&b[Re[nn]]&(C|l|$);nn++)b[Re[nn]]!==$&&W(Re[nn],$)}}if(k.get(C)||k.get(E)||k.get(Y))for(var ws=0;ws<Re.length;ws++){var ku=Re[ws];if(b[ku]&(C|E|Y)){W(ku,H);for(var Eo=ws-1;Eo>=0&&b[Re[Eo]]&l;Eo--)W(Re[Eo],H);for(var To=ws+1;To<Re.length&&b[Re[To]]&l;To++)W(Re[To],H)}}if(k.get($))for(var ll=0,Gu=qe;ll<Re.length;ll++){var zu=Re[ll],cl=b[zu];cl&$?Gu===T&&W(zu,T):cl&o&&(Gu=cl)}if(k.get(a)){var As=P|$|B,Hu=As|T,wo=[];{for(var Sr=[],br=0;br<Re.length;br++)if(b[Re[br]]&a){var Rs=ie[Re[br]],Vu=void 0;if(M(Rs)!==null)if(Sr.length<63)Sr.push({char:Rs,seqIndex:br});else break;else if((Vu=A(Rs))!==null)for(var Cs=Sr.length-1;Cs>=0;Cs--){var ul=Sr[Cs].char;if(ul===Vu||ul===A(w(Rs))||M(w(ul))===Rs){wo.push([Sr[Cs].seqIndex,br]),Sr.length=Cs;break}}}wo.sort(function(rn,wn){return rn[0]-wn[0]})}for(var fl=0;fl<wo.length;fl++){for(var Wu=wo[fl],Ao=Wu[0],hl=Wu[1],Xu=!1,Tn=0,dl=Ao+1;dl<hl;dl++){var ju=Re[dl];if(b[ju]&Hu){Xu=!0;var Yu=b[ju]&As?P:T;if(Yu===Xe){Tn=Yu;break}}}if(Xu&&!Tn){Tn=qe;for(var pl=Ao-1;pl>=0;pl--){var qu=Re[pl];if(b[qu]&Hu){var Ku=b[qu]&As?P:T;Ku!==Xe?Tn=Ku:Tn=Xe;break}}}if(Tn){if(b[Re[Ao]]=b[Re[hl]]=Tn,Tn!==Xe){for(var Ls=Ao+1;Ls<Re.length;Ls++)if(!(b[Re[Ls]]&l)){h(ie[Re[Ls]])&J&&(b[Re[Ls]]=Tn);break}}if(Tn!==Xe){for(var Ps=hl+1;Ps<Re.length;Ps++)if(!(b[Re[Ps]]&l)){h(ie[Re[Ps]])&J&&(b[Re[Ps]]=Tn);break}}}}for(var Mi=0;Mi<Re.length;Mi++)if(b[Re[Mi]]&a){for(var Zu=Mi,ml=Mi,gl=qe,Us=Mi-1;Us>=0;Us--)if(b[Re[Us]]&l)Zu=Us;else{gl=b[Re[Us]]&As?P:T;break}for(var Ju=Ke,Ds=Mi+1;Ds<Re.length;Ds++)if(b[Re[Ds]]&(a|l))ml=Ds;else{Ju=b[Re[Ds]]&As?P:T;break}for(var _l=Zu;_l<=ml;_l++)b[Re[_l]]=gl===Ju?gl:Xe;Mi=ml}}}for(var fn=be.start;fn<=be.end;fn++){var kg=te[fn],Ro=b[fn];if(kg&1?Ro&(T|$|B)&&te[fn]++:Ro&P?te[fn]++:Ro&(B|$)&&(te[fn]+=2),Ro&l&&(te[fn]=fn===0?be.level:te[fn-1]),fn===be.end||h(ie[fn])&(ne|R))for(var Co=fn;Co>=0&&h(ie[Co])&c;Co--)te[Co]=be.level}}return{levels:te,paragraphs:ye};function $u(rn,wn){for(var sn=rn;sn<ie.length;sn++){var Si=b[sn];if(Si&(P|K))return 1;if(Si&(R|T)||wn&&Si===j)return 0;if(Si&s){var Qu=Gg(sn);sn=Qu===-1?ie.length:Qu}}return 0}function Gg(rn){for(var wn=1,sn=rn+1;sn<ie.length;sn++){var Si=b[sn];if(Si&R)break;if(Si&j){if(--wn===0)return sn}else Si&s&&wn++}return-1}}var me="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",de;function x(){if(!de){var ie=_(me,!0),se=ie.map,fe=ie.reverseMap;fe.forEach(function(b,S){se.set(S,b)}),de=se}}function I(ie){return x(),de.get(ie)||null}function O(ie,se,fe,b){var S=ie.length;fe=Math.max(0,fe==null?0:+fe),b=Math.min(S-1,b==null?S-1:+b);for(var k=new Map,W=fe;W<=b;W++)if(se[W]&1){var te=I(ie[W]);te!==null&&k.set(W,te)}return k}function Z(ie,se,fe,b){var S=ie.length;fe=Math.max(0,fe==null?0:+fe),b=Math.min(S-1,b==null?S-1:+b);var k=[];return se.paragraphs.forEach(function(W){var te=Math.max(fe,W.start),he=Math.min(b,W.end);if(te<he){for(var ye=se.levels.slice(te,he+1),be=he;be>=te&&h(ie[be])&c;be--)ye[be]=W.level;for(var ge=W.level,Ee=1/0,Fe=0;Fe<ye.length;Fe++){var Te=ye[Fe];Te>ge&&(ge=Te),Te<Ee&&(Ee=Te|1)}for(var Be=ge;Be>=Ee;Be--)for(var De=0;De<ye.length;De++)if(ye[De]>=Be){for(var Se=De;De+1<ye.length&&ye[De+1]>=Be;)De++;De>Se&&k.push([Se+te,De+te])}}}),k}function Q(ie,se,fe,b){var S=ce(ie,se,fe,b),k=[].concat(ie);return S.forEach(function(W,te){k[te]=(se.levels[W]&1?I(ie[W]):null)||ie[W]}),k.join("")}function ce(ie,se,fe,b){for(var S=Z(ie,se,fe,b),k=[],W=0;W<ie.length;W++)k[W]=W;return S.forEach(function(te){for(var he=te[0],ye=te[1],be=k.slice(he,ye+1),ge=be.length;ge--;)k[ye-ge]=be[ge]}),k}return e.closingToOpeningBracket=A,e.getBidiCharType=h,e.getBidiCharTypeName=d,e.getCanonicalBracket=w,e.getEmbeddingLevels=ee,e.getMirroredCharacter=I,e.getMirroredCharactersMap=O,e.getReorderSegments=Z,e.getReorderedIndices=ce,e.getReorderedString=Q,e.openingToClosingBracket=M,Object.defineProperty(e,"__esModule",{value:!0}),e}({});return n}const Rg=/\bvoid\s+main\s*\(\s*\)\s*{/g;function Zc(n){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(r,i){let s=$e[i];return s?Zc(s):r}return n.replace(e,t)}const Dt=[];for(let n=0;n<256;n++)Dt[n]=(n<16?"0":"")+n.toString(16);function Cw(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Dt[n&255]+Dt[n>>8&255]+Dt[n>>16&255]+Dt[n>>24&255]+"-"+Dt[e&255]+Dt[e>>8&255]+"-"+Dt[e>>16&15|64]+Dt[e>>24&255]+"-"+Dt[t&63|128]+Dt[t>>8&255]+"-"+Dt[t>>16&255]+Dt[t>>24&255]+Dt[r&255]+Dt[r>>8&255]+Dt[r>>16&255]+Dt[r>>24&255]).toUpperCase()}const or=Object.assign||function(){let n=arguments[0];for(let e=1,t=arguments.length;e<t;e++){let r=arguments[e];if(r)for(let i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}return n},Lw=Date.now(),Qd=new WeakMap,ep=new Map;let Pw=1e10;function Jc(n,e){const t=Fw(e);let r=Qd.get(n);if(r||Qd.set(n,r=Object.create(null)),r[t])return new r[t];const i=`_onBeforeCompile${t}`,s=function(c,u){n.onBeforeCompile.call(this,c,u);const f=this.customProgramCacheKey()+"|"+c.vertexShader+"|"+c.fragmentShader;let h=ep[f];if(!h){const d=Uw(this,c,e,t);h=ep[f]=d}c.vertexShader=h.vertexShader,c.fragmentShader=h.fragmentShader,or(c.uniforms,this.uniforms),e.timeUniform&&(c.uniforms[e.timeUniform]={get value(){return Date.now()-Lw}}),this[i]&&this[i](c)},o=function(){return a(e.chained?n:n.clone())},a=function(c){const u=Object.create(c,l);return Object.defineProperty(u,"baseMaterial",{value:n}),Object.defineProperty(u,"id",{value:Pw++}),u.uuid=Cw(),u.uniforms=or({},c.uniforms,e.uniforms),u.defines=or({},c.defines,e.defines),u.defines[`TROIKA_DERIVED_MATERIAL_${t}`]="",u.extensions=or({},c.extensions,e.extensions),u._listeners=void 0,u},l={constructor:{value:o},isDerivedMaterial:{value:!0},type:{get:()=>n.type,set:c=>{n.type=c}},isDerivedFrom:{writable:!0,configurable:!0,value:function(c){const u=this.baseMaterial;return c===u||u.isDerivedMaterial&&u.isDerivedFrom(c)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return n.customProgramCacheKey()+"|"+t}},onBeforeCompile:{get(){return s},set(c){this[i]=c}},copy:{writable:!0,configurable:!0,value:function(c){return n.copy.call(this,c),!n.isShaderMaterial&&!n.isDerivedMaterial&&(or(this.extensions,c.extensions),or(this.defines,c.defines),or(this.uniforms,Ym.clone(c.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const c=new n.constructor;return a(c).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let c=this._depthMaterial;return c||(c=this._depthMaterial=Jc(n.isDerivedMaterial?n.getDepthMaterial():new ig({depthPacking:Im}),e),c.defines.IS_DEPTH_MATERIAL="",c.uniforms=this.uniforms),c}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let c=this._distanceMaterial;return c||(c=this._distanceMaterial=Jc(n.isDerivedMaterial?n.getDistanceMaterial():new rg,e),c.defines.IS_DISTANCE_MATERIAL="",c.uniforms=this.uniforms),c}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:c,_distanceMaterial:u}=this;c&&c.dispose(),u&&u.dispose(),n.dispose.call(this)}}};return r[t]=o,new o}function Uw(n,{vertexShader:e,fragmentShader:t},r,i){let{vertexDefs:s,vertexMainIntro:o,vertexMainOutro:a,vertexTransform:l,fragmentDefs:c,fragmentMainIntro:u,fragmentMainOutro:f,fragmentColorTransform:h,customRewriter:d,timeUniform:g}=r;if(s=s||"",o=o||"",a=a||"",c=c||"",u=u||"",f=f||"",(l||d)&&(e=Zc(e)),(h||d)&&(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),t=Zc(t)),d){let _=d({vertexShader:e,fragmentShader:t});e=_.vertexShader,t=_.fragmentShader}if(h){let _=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,p=>(_.push(p),"")),f=`${h}
${_.join(`
`)}
${f}`}if(g){const _=`
uniform float ${g};
`;s=_+s,c=_+c}return l&&(e=`vec3 troika_position_${i};
vec3 troika_normal_${i};
vec2 troika_uv_${i};
${e}
`,s=`${s}
void troikaVertexTransform${i}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${l}
}
`,o=`
troika_position_${i} = vec3(position);
troika_normal_${i} = vec3(normal);
troika_uv_${i} = vec2(uv);
troikaVertexTransform${i}(troika_position_${i}, troika_normal_${i}, troika_uv_${i});
${o}
`,e=e.replace(/\b(position|normal|uv)\b/g,(_,p,m,y)=>/\battribute\s+vec[23]\s+$/.test(y.substr(0,m))?p:`troika_${p}_${i}`),n.map&&n.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${i}`))),e=tp(e,i,s,o,a),t=tp(t,i,c,u,f),{vertexShader:e,fragmentShader:t}}function tp(n,e,t,r,i){return(r||i||t)&&(n=n.replace(Rg,`
${t}
void troikaOrigMain${e}() {`),n+=`
void main() {
  ${r}
  troikaOrigMain${e}();
  ${i}
}`),n}function Dw(n,e){return n==="uniforms"?void 0:typeof e=="function"?e.toString():e}let Iw=0;const np=new Map;function Fw(n){const e=JSON.stringify(n,Dw);let t=np.get(e);return t==null&&np.set(e,t=++Iw),t}/*!
Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
*/function Nw(){return typeof window>"u"&&(self.window=self),function(n){var e={parse:function(i){var s=e._bin,o=new Uint8Array(i);if(s.readASCII(o,0,4)=="ttcf"){var a=4;s.readUshort(o,a),a+=2,s.readUshort(o,a),a+=2;var l=s.readUint(o,a);a+=4;for(var c=[],u=0;u<l;u++){var f=s.readUint(o,a);a+=4,c.push(e._readFont(o,f))}return c}return[e._readFont(o,0)]},_readFont:function(i,s){var o=e._bin,a=s;o.readFixed(i,s),s+=4;var l=o.readUshort(i,s);s+=2,o.readUshort(i,s),s+=2,o.readUshort(i,s),s+=2,o.readUshort(i,s),s+=2;for(var c=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],u={_data:i,_offset:a},f={},h=0;h<l;h++){var d=o.readASCII(i,s,4);s+=4,o.readUint(i,s),s+=4;var g=o.readUint(i,s);s+=4;var _=o.readUint(i,s);s+=4,f[d]={offset:g,length:_}}for(h=0;h<c.length;h++){var p=c[h];f[p]&&(u[p.trim()]=e[p.trim()].parse(i,f[p].offset,f[p].length,u))}return u},_tabOffset:function(i,s,o){for(var a=e._bin,l=a.readUshort(i,o+4),c=o+12,u=0;u<l;u++){var f=a.readASCII(i,c,4);c+=4,a.readUint(i,c),c+=4;var h=a.readUint(i,c);if(c+=4,a.readUint(i,c),c+=4,f==s)return h}return 0}};e._bin={readFixed:function(i,s){return(i[s]<<8|i[s+1])+(i[s+2]<<8|i[s+3])/65540},readF2dot14:function(i,s){return e._bin.readShort(i,s)/16384},readInt:function(i,s){return e._bin._view(i).getInt32(s)},readInt8:function(i,s){return e._bin._view(i).getInt8(s)},readShort:function(i,s){return e._bin._view(i).getInt16(s)},readUshort:function(i,s){return e._bin._view(i).getUint16(s)},readUshorts:function(i,s,o){for(var a=[],l=0;l<o;l++)a.push(e._bin.readUshort(i,s+2*l));return a},readUint:function(i,s){return e._bin._view(i).getUint32(s)},readUint64:function(i,s){return 4294967296*e._bin.readUint(i,s)+e._bin.readUint(i,s+4)},readASCII:function(i,s,o){for(var a="",l=0;l<o;l++)a+=String.fromCharCode(i[s+l]);return a},readUnicode:function(i,s,o){for(var a="",l=0;l<o;l++){var c=i[s++]<<8|i[s++];a+=String.fromCharCode(c)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(i,s,o){var a=e._bin._tdec;return a&&s==0&&o==i.length?a.decode(i):e._bin.readASCII(i,s,o)},readBytes:function(i,s,o){for(var a=[],l=0;l<o;l++)a.push(i[s+l]);return a},readASCIIArray:function(i,s,o){for(var a=[],l=0;l<o;l++)a.push(String.fromCharCode(i[s+l]));return a},_view:function(i){return i._dataView||(i._dataView=i.buffer?new DataView(i.buffer,i.byteOffset,i.byteLength):new DataView(new Uint8Array(i).buffer))}},e._lctf={},e._lctf.parse=function(i,s,o,a,l){var c=e._bin,u={},f=s;c.readFixed(i,s),s+=4;var h=c.readUshort(i,s);s+=2;var d=c.readUshort(i,s);s+=2;var g=c.readUshort(i,s);return s+=2,u.scriptList=e._lctf.readScriptList(i,f+h),u.featureList=e._lctf.readFeatureList(i,f+d),u.lookupList=e._lctf.readLookupList(i,f+g,l),u},e._lctf.readLookupList=function(i,s,o){var a=e._bin,l=s,c=[],u=a.readUshort(i,s);s+=2;for(var f=0;f<u;f++){var h=a.readUshort(i,s);s+=2;var d=e._lctf.readLookupTable(i,l+h,o);c.push(d)}return c},e._lctf.readLookupTable=function(i,s,o){var a=e._bin,l=s,c={tabs:[]};c.ltype=a.readUshort(i,s),s+=2,c.flag=a.readUshort(i,s),s+=2;var u=a.readUshort(i,s);s+=2;for(var f=c.ltype,h=0;h<u;h++){var d=a.readUshort(i,s);s+=2;var g=o(i,f,l+d,c);c.tabs.push(g)}return c},e._lctf.numOfOnes=function(i){for(var s=0,o=0;o<32;o++)i>>>o&1&&s++;return s},e._lctf.readClassDef=function(i,s){var o=e._bin,a=[],l=o.readUshort(i,s);if(s+=2,l==1){var c=o.readUshort(i,s);s+=2;var u=o.readUshort(i,s);s+=2;for(var f=0;f<u;f++)a.push(c+f),a.push(c+f),a.push(o.readUshort(i,s)),s+=2}if(l==2){var h=o.readUshort(i,s);for(s+=2,f=0;f<h;f++)a.push(o.readUshort(i,s)),s+=2,a.push(o.readUshort(i,s)),s+=2,a.push(o.readUshort(i,s)),s+=2}return a},e._lctf.getInterval=function(i,s){for(var o=0;o<i.length;o+=3){var a=i[o],l=i[o+1];if(i[o+2],a<=s&&s<=l)return o}return-1},e._lctf.readCoverage=function(i,s){var o=e._bin,a={};a.fmt=o.readUshort(i,s),s+=2;var l=o.readUshort(i,s);return s+=2,a.fmt==1&&(a.tab=o.readUshorts(i,s,l)),a.fmt==2&&(a.tab=o.readUshorts(i,s,3*l)),a},e._lctf.coverageIndex=function(i,s){var o=i.tab;if(i.fmt==1)return o.indexOf(s);if(i.fmt==2){var a=e._lctf.getInterval(o,s);if(a!=-1)return o[a+2]+(s-o[a])}return-1},e._lctf.readFeatureList=function(i,s){var o=e._bin,a=s,l=[],c=o.readUshort(i,s);s+=2;for(var u=0;u<c;u++){var f=o.readASCII(i,s,4);s+=4;var h=o.readUshort(i,s);s+=2;var d=e._lctf.readFeatureTable(i,a+h);d.tag=f.trim(),l.push(d)}return l},e._lctf.readFeatureTable=function(i,s){var o=e._bin,a=s,l={},c=o.readUshort(i,s);s+=2,c>0&&(l.featureParams=a+c);var u=o.readUshort(i,s);s+=2,l.tab=[];for(var f=0;f<u;f++)l.tab.push(o.readUshort(i,s+2*f));return l},e._lctf.readScriptList=function(i,s){var o=e._bin,a=s,l={},c=o.readUshort(i,s);s+=2;for(var u=0;u<c;u++){var f=o.readASCII(i,s,4);s+=4;var h=o.readUshort(i,s);s+=2,l[f.trim()]=e._lctf.readScriptTable(i,a+h)}return l},e._lctf.readScriptTable=function(i,s){var o=e._bin,a=s,l={},c=o.readUshort(i,s);s+=2,c>0&&(l.default=e._lctf.readLangSysTable(i,a+c));var u=o.readUshort(i,s);s+=2;for(var f=0;f<u;f++){var h=o.readASCII(i,s,4);s+=4;var d=o.readUshort(i,s);s+=2,l[h.trim()]=e._lctf.readLangSysTable(i,a+d)}return l},e._lctf.readLangSysTable=function(i,s){var o=e._bin,a={};o.readUshort(i,s),s+=2,a.reqFeature=o.readUshort(i,s),s+=2;var l=o.readUshort(i,s);return s+=2,a.features=o.readUshorts(i,s,l),a},e.CFF={},e.CFF.parse=function(i,s,o){var a=e._bin;(i=new Uint8Array(i.buffer,s,o))[s=0],i[++s],i[++s],i[++s],s++;var l=[];s=e.CFF.readIndex(i,s,l);for(var c=[],u=0;u<l.length-1;u++)c.push(a.readASCII(i,s+l[u],l[u+1]-l[u]));s+=l[l.length-1];var f=[];s=e.CFF.readIndex(i,s,f);var h=[];for(u=0;u<f.length-1;u++)h.push(e.CFF.readDict(i,s+f[u],s+f[u+1]));s+=f[f.length-1];var d=h[0],g=[];s=e.CFF.readIndex(i,s,g);var _=[];for(u=0;u<g.length-1;u++)_.push(a.readASCII(i,s+g[u],g[u+1]-g[u]));if(s+=g[g.length-1],e.CFF.readSubrs(i,s,d),d.CharStrings){s=d.CharStrings,g=[],s=e.CFF.readIndex(i,s,g);var p=[];for(u=0;u<g.length-1;u++)p.push(a.readBytes(i,s+g[u],g[u+1]-g[u]));d.CharStrings=p}if(d.ROS){s=d.FDArray;var m=[];for(s=e.CFF.readIndex(i,s,m),d.FDArray=[],u=0;u<m.length-1;u++){var y=e.CFF.readDict(i,s+m[u],s+m[u+1]);e.CFF._readFDict(i,y,_),d.FDArray.push(y)}s+=m[m.length-1],s=d.FDSelect,d.FDSelect=[];var v=i[s];if(s++,v!=3)throw v;var M=a.readUshort(i,s);for(s+=2,u=0;u<M+1;u++)d.FDSelect.push(a.readUshort(i,s),i[s+2]),s+=3}return d.Encoding&&(d.Encoding=e.CFF.readEncoding(i,d.Encoding,d.CharStrings.length)),d.charset&&(d.charset=e.CFF.readCharset(i,d.charset,d.CharStrings.length)),e.CFF._readFDict(i,d,_),d},e.CFF._readFDict=function(i,s,o){var a;for(var l in s.Private&&(a=s.Private[1],s.Private=e.CFF.readDict(i,a,a+s.Private[0]),s.Private.Subrs&&e.CFF.readSubrs(i,a+s.Private.Subrs,s.Private)),s)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(l)!=-1&&(s[l]=o[s[l]-426+35])},e.CFF.readSubrs=function(i,s,o){var a=e._bin,l=[];s=e.CFF.readIndex(i,s,l);var c,u=l.length;c=u<1240?107:u<33900?1131:32768,o.Bias=c,o.Subrs=[];for(var f=0;f<l.length-1;f++)o.Subrs.push(a.readBytes(i,s+l[f],l[f+1]-l[f]))},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(i,s){for(var o=0;o<i.charset.length;o++)if(i.charset[o]==s)return o;return-1},e.CFF.glyphBySE=function(i,s){return s<0||s>255?-1:e.CFF.glyphByUnicode(i,e.CFF.tableSE[s])},e.CFF.readEncoding=function(i,s,o){e._bin;var a=[".notdef"],l=i[s];if(s++,l!=0)throw"error: unknown encoding format: "+l;var c=i[s];s++;for(var u=0;u<c;u++)a.push(i[s+u]);return a},e.CFF.readCharset=function(i,s,o){var a=e._bin,l=[".notdef"],c=i[s];if(s++,c==0)for(var u=0;u<o;u++){var f=a.readUshort(i,s);s+=2,l.push(f)}else{if(c!=1&&c!=2)throw"error: format: "+c;for(;l.length<o;){f=a.readUshort(i,s),s+=2;var h=0;for(c==1?(h=i[s],s++):(h=a.readUshort(i,s),s+=2),u=0;u<=h;u++)l.push(f),f++}}return l},e.CFF.readIndex=function(i,s,o){var a=e._bin,l=a.readUshort(i,s)+1,c=i[s+=2];if(s++,c==1)for(var u=0;u<l;u++)o.push(i[s+u]);else if(c==2)for(u=0;u<l;u++)o.push(a.readUshort(i,s+2*u));else if(c==3)for(u=0;u<l;u++)o.push(16777215&a.readUint(i,s+3*u-1));else if(l!=1)throw"unsupported offset size: "+c+", count: "+l;return(s+=l*c)-1},e.CFF.getCharString=function(i,s,o){var a=e._bin,l=i[s],c=i[s+1];i[s+2],i[s+3],i[s+4];var u=1,f=null,h=null;l<=20&&(f=l,u=1),l==12&&(f=100*l+c,u=2),21<=l&&l<=27&&(f=l,u=1),l==28&&(h=a.readShort(i,s+1),u=3),29<=l&&l<=31&&(f=l,u=1),32<=l&&l<=246&&(h=l-139,u=1),247<=l&&l<=250&&(h=256*(l-247)+c+108,u=2),251<=l&&l<=254&&(h=256*-(l-251)-c-108,u=2),l==255&&(h=a.readInt(i,s+1)/65535,u=5),o.val=h??"o"+f,o.size=u},e.CFF.readCharString=function(i,s,o){for(var a=s+o,l=e._bin,c=[];s<a;){var u=i[s],f=i[s+1];i[s+2],i[s+3],i[s+4];var h=1,d=null,g=null;u<=20&&(d=u,h=1),u==12&&(d=100*u+f,h=2),u!=19&&u!=20||(d=u,h=2),21<=u&&u<=27&&(d=u,h=1),u==28&&(g=l.readShort(i,s+1),h=3),29<=u&&u<=31&&(d=u,h=1),32<=u&&u<=246&&(g=u-139,h=1),247<=u&&u<=250&&(g=256*(u-247)+f+108,h=2),251<=u&&u<=254&&(g=256*-(u-251)-f-108,h=2),u==255&&(g=l.readInt(i,s+1)/65535,h=5),c.push(g??"o"+d),s+=h}return c},e.CFF.readDict=function(i,s,o){for(var a=e._bin,l={},c=[];s<o;){var u=i[s],f=i[s+1];i[s+2],i[s+3],i[s+4];var h=1,d=null,g=null;if(u==28&&(g=a.readShort(i,s+1),h=3),u==29&&(g=a.readInt(i,s+1),h=5),32<=u&&u<=246&&(g=u-139,h=1),247<=u&&u<=250&&(g=256*(u-247)+f+108,h=2),251<=u&&u<=254&&(g=256*-(u-251)-f-108,h=2),u==255)throw g=a.readInt(i,s+1)/65535,h=5,"unknown number";if(u==30){var _=[];for(h=1;;){var p=i[s+h];h++;var m=p>>4,y=15&p;if(m!=15&&_.push(m),y!=15&&_.push(y),y==15)break}for(var v="",M=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],A=0;A<_.length;A++)v+=M[_[A]];g=parseFloat(v)}u<=21&&(d=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][u],h=1,u==12&&(d=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][f],h=2)),d!=null?(l[d]=c.length==1?c[0]:c,c=[]):c.push(g),s+=h}return l},e.cmap={},e.cmap.parse=function(i,s,o){i=new Uint8Array(i.buffer,s,o),s=0;var a=e._bin,l={};a.readUshort(i,s),s+=2;var c=a.readUshort(i,s);s+=2;var u=[];l.tables=[];for(var f=0;f<c;f++){var h=a.readUshort(i,s);s+=2;var d=a.readUshort(i,s);s+=2;var g=a.readUint(i,s);s+=4;var _="p"+h+"e"+d,p=u.indexOf(g);if(p==-1){var m;p=l.tables.length,u.push(g);var y=a.readUshort(i,g);y==0?m=e.cmap.parse0(i,g):y==4?m=e.cmap.parse4(i,g):y==6?m=e.cmap.parse6(i,g):y==12?m=e.cmap.parse12(i,g):console.debug("unknown format: "+y,h,d,g),l.tables.push(m)}if(l[_]!=null)throw"multiple tables for one platform+encoding";l[_]=p}return l},e.cmap.parse0=function(i,s){var o=e._bin,a={};a.format=o.readUshort(i,s),s+=2;var l=o.readUshort(i,s);s+=2,o.readUshort(i,s),s+=2,a.map=[];for(var c=0;c<l-6;c++)a.map.push(i[s+c]);return a},e.cmap.parse4=function(i,s){var o=e._bin,a=s,l={};l.format=o.readUshort(i,s),s+=2;var c=o.readUshort(i,s);s+=2,o.readUshort(i,s),s+=2;var u=o.readUshort(i,s);s+=2;var f=u/2;l.searchRange=o.readUshort(i,s),s+=2,l.entrySelector=o.readUshort(i,s),s+=2,l.rangeShift=o.readUshort(i,s),s+=2,l.endCount=o.readUshorts(i,s,f),s+=2*f,s+=2,l.startCount=o.readUshorts(i,s,f),s+=2*f,l.idDelta=[];for(var h=0;h<f;h++)l.idDelta.push(o.readShort(i,s)),s+=2;for(l.idRangeOffset=o.readUshorts(i,s,f),s+=2*f,l.glyphIdArray=[];s<a+c;)l.glyphIdArray.push(o.readUshort(i,s)),s+=2;return l},e.cmap.parse6=function(i,s){var o=e._bin,a={};a.format=o.readUshort(i,s),s+=2,o.readUshort(i,s),s+=2,o.readUshort(i,s),s+=2,a.firstCode=o.readUshort(i,s),s+=2;var l=o.readUshort(i,s);s+=2,a.glyphIdArray=[];for(var c=0;c<l;c++)a.glyphIdArray.push(o.readUshort(i,s)),s+=2;return a},e.cmap.parse12=function(i,s){var o=e._bin,a={};a.format=o.readUshort(i,s),s+=2,s+=2,o.readUint(i,s),s+=4,o.readUint(i,s),s+=4;var l=o.readUint(i,s);s+=4,a.groups=[];for(var c=0;c<l;c++){var u=s+12*c,f=o.readUint(i,u+0),h=o.readUint(i,u+4),d=o.readUint(i,u+8);a.groups.push([f,h,d])}return a},e.glyf={},e.glyf.parse=function(i,s,o,a){for(var l=[],c=0;c<a.maxp.numGlyphs;c++)l.push(null);return l},e.glyf._parseGlyf=function(i,s){var o=e._bin,a=i._data,l=e._tabOffset(a,"glyf",i._offset)+i.loca[s];if(i.loca[s]==i.loca[s+1])return null;var c={};if(c.noc=o.readShort(a,l),l+=2,c.xMin=o.readShort(a,l),l+=2,c.yMin=o.readShort(a,l),l+=2,c.xMax=o.readShort(a,l),l+=2,c.yMax=o.readShort(a,l),l+=2,c.xMin>=c.xMax||c.yMin>=c.yMax)return null;if(c.noc>0){c.endPts=[];for(var u=0;u<c.noc;u++)c.endPts.push(o.readUshort(a,l)),l+=2;var f=o.readUshort(a,l);if(l+=2,a.length-l<f)return null;c.instructions=o.readBytes(a,l,f),l+=f;var h=c.endPts[c.noc-1]+1;for(c.flags=[],u=0;u<h;u++){var d=a[l];if(l++,c.flags.push(d),(8&d)!=0){var g=a[l];l++;for(var _=0;_<g;_++)c.flags.push(d),u++}}for(c.xs=[],u=0;u<h;u++){var p=(2&c.flags[u])!=0,m=(16&c.flags[u])!=0;p?(c.xs.push(m?a[l]:-a[l]),l++):m?c.xs.push(0):(c.xs.push(o.readShort(a,l)),l+=2)}for(c.ys=[],u=0;u<h;u++)p=(4&c.flags[u])!=0,m=(32&c.flags[u])!=0,p?(c.ys.push(m?a[l]:-a[l]),l++):m?c.ys.push(0):(c.ys.push(o.readShort(a,l)),l+=2);var y=0,v=0;for(u=0;u<h;u++)y+=c.xs[u],v+=c.ys[u],c.xs[u]=y,c.ys[u]=v}else{var M;c.parts=[];do{M=o.readUshort(a,l),l+=2;var A={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(c.parts.push(A),A.glyphIndex=o.readUshort(a,l),l+=2,1&M){var w=o.readShort(a,l);l+=2;var T=o.readShort(a,l);l+=2}else w=o.readInt8(a,l),l++,T=o.readInt8(a,l),l++;2&M?(A.m.tx=w,A.m.ty=T):(A.p1=w,A.p2=T),8&M?(A.m.a=A.m.d=o.readF2dot14(a,l),l+=2):64&M?(A.m.a=o.readF2dot14(a,l),l+=2,A.m.d=o.readF2dot14(a,l),l+=2):128&M&&(A.m.a=o.readF2dot14(a,l),l+=2,A.m.b=o.readF2dot14(a,l),l+=2,A.m.c=o.readF2dot14(a,l),l+=2,A.m.d=o.readF2dot14(a,l),l+=2)}while(32&M);if(256&M){var P=o.readUshort(a,l);for(l+=2,c.instr=[],u=0;u<P;u++)c.instr.push(a[l]),l++}}return c},e.GDEF={},e.GDEF.parse=function(i,s,o,a){var l=s;s+=4;var c=e._bin.readUshort(i,s);return{glyphClassDef:c===0?null:e._lctf.readClassDef(i,l+c)}},e.GPOS={},e.GPOS.parse=function(i,s,o,a){return e._lctf.parse(i,s,o,a,e.GPOS.subt)},e.GPOS.subt=function(i,s,o,a){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(i,o),o+=2,s==1||s==2||s==3||s==7||s==8&&u.fmt<=2){var f=l.readUshort(i,o);o+=2,u.coverage=e._lctf.readCoverage(i,f+c)}if(s==1&&u.fmt==1){var h=l.readUshort(i,o);o+=2,h!=0&&(u.pos=e.GPOS.readValueRecord(i,o,h))}else if(s==2&&u.fmt>=1&&u.fmt<=2){h=l.readUshort(i,o),o+=2;var d=l.readUshort(i,o);o+=2;var g=e._lctf.numOfOnes(h),_=e._lctf.numOfOnes(d);if(u.fmt==1){u.pairsets=[];var p=l.readUshort(i,o);o+=2;for(var m=0;m<p;m++){var y=c+l.readUshort(i,o);o+=2;var v=l.readUshort(i,y);y+=2;for(var M=[],A=0;A<v;A++){var w=l.readUshort(i,y);y+=2,h!=0&&(B=e.GPOS.readValueRecord(i,y,h),y+=2*g),d!=0&&(Y=e.GPOS.readValueRecord(i,y,d),y+=2*_),M.push({gid2:w,val1:B,val2:Y})}u.pairsets.push(M)}}if(u.fmt==2){var T=l.readUshort(i,o);o+=2;var P=l.readUshort(i,o);o+=2;var $=l.readUshort(i,o);o+=2;var E=l.readUshort(i,o);for(o+=2,u.classDef1=e._lctf.readClassDef(i,c+T),u.classDef2=e._lctf.readClassDef(i,c+P),u.matrix=[],m=0;m<$;m++){var C=[];for(A=0;A<E;A++){var B=null,Y=null;h!=0&&(B=e.GPOS.readValueRecord(i,o,h),o+=2*g),d!=0&&(Y=e.GPOS.readValueRecord(i,o,d),o+=2*_),C.push({val1:B,val2:Y})}u.matrix.push(C)}}}else if(s==4&&u.fmt==1)u.markCoverage=e._lctf.readCoverage(i,l.readUshort(i,o)+c),u.baseCoverage=e._lctf.readCoverage(i,l.readUshort(i,o+2)+c),u.markClassCount=l.readUshort(i,o+4),u.markArray=e.GPOS.readMarkArray(i,l.readUshort(i,o+6)+c),u.baseArray=e.GPOS.readBaseArray(i,l.readUshort(i,o+8)+c,u.markClassCount);else if(s==6&&u.fmt==1)u.mark1Coverage=e._lctf.readCoverage(i,l.readUshort(i,o)+c),u.mark2Coverage=e._lctf.readCoverage(i,l.readUshort(i,o+2)+c),u.markClassCount=l.readUshort(i,o+4),u.mark1Array=e.GPOS.readMarkArray(i,l.readUshort(i,o+6)+c),u.mark2Array=e.GPOS.readBaseArray(i,l.readUshort(i,o+8)+c,u.markClassCount);else{if(s==9&&u.fmt==1){var R=l.readUshort(i,o);o+=2;var ne=l.readUint(i,o);if(o+=4,a.ltype==9)a.ltype=R;else if(a.ltype!=R)throw"invalid extension substitution";return e.GPOS.subt(i,a.ltype,c+ne)}console.debug("unsupported GPOS table LookupType",s,"format",u.fmt)}return u},e.GPOS.readValueRecord=function(i,s,o){var a=e._bin,l=[];return l.push(1&o?a.readShort(i,s):0),s+=1&o?2:0,l.push(2&o?a.readShort(i,s):0),s+=2&o?2:0,l.push(4&o?a.readShort(i,s):0),s+=4&o?2:0,l.push(8&o?a.readShort(i,s):0),s+=8&o?2:0,l},e.GPOS.readBaseArray=function(i,s,o){var a=e._bin,l=[],c=s,u=a.readUshort(i,s);s+=2;for(var f=0;f<u;f++){for(var h=[],d=0;d<o;d++)h.push(e.GPOS.readAnchorRecord(i,c+a.readUshort(i,s))),s+=2;l.push(h)}return l},e.GPOS.readMarkArray=function(i,s){var o=e._bin,a=[],l=s,c=o.readUshort(i,s);s+=2;for(var u=0;u<c;u++){var f=e.GPOS.readAnchorRecord(i,o.readUshort(i,s+2)+l);f.markClass=o.readUshort(i,s),a.push(f),s+=4}return a},e.GPOS.readAnchorRecord=function(i,s){var o=e._bin,a={};return a.fmt=o.readUshort(i,s),a.x=o.readShort(i,s+2),a.y=o.readShort(i,s+4),a},e.GSUB={},e.GSUB.parse=function(i,s,o,a){return e._lctf.parse(i,s,o,a,e.GSUB.subt)},e.GSUB.subt=function(i,s,o,a){var l=e._bin,c=o,u={};if(u.fmt=l.readUshort(i,o),o+=2,s!=1&&s!=2&&s!=4&&s!=5&&s!=6)return null;if(s==1||s==2||s==4||s==5&&u.fmt<=2||s==6&&u.fmt<=2){var f=l.readUshort(i,o);o+=2,u.coverage=e._lctf.readCoverage(i,c+f)}if(s==1&&u.fmt>=1&&u.fmt<=2){if(u.fmt==1)u.delta=l.readShort(i,o),o+=2;else if(u.fmt==2){var h=l.readUshort(i,o);o+=2,u.newg=l.readUshorts(i,o,h),o+=2*u.newg.length}}else if(s==2&&u.fmt==1){h=l.readUshort(i,o),o+=2,u.seqs=[];for(var d=0;d<h;d++){var g=l.readUshort(i,o)+c;o+=2;var _=l.readUshort(i,g);u.seqs.push(l.readUshorts(i,g+2,_))}}else if(s==4)for(u.vals=[],h=l.readUshort(i,o),o+=2,d=0;d<h;d++){var p=l.readUshort(i,o);o+=2,u.vals.push(e.GSUB.readLigatureSet(i,c+p))}else if(s==5&&u.fmt==2){if(u.fmt==2){var m=l.readUshort(i,o);o+=2,u.cDef=e._lctf.readClassDef(i,c+m),u.scset=[];var y=l.readUshort(i,o);for(o+=2,d=0;d<y;d++){var v=l.readUshort(i,o);o+=2,u.scset.push(v==0?null:e.GSUB.readSubClassSet(i,c+v))}}}else if(s==6&&u.fmt==3){if(u.fmt==3){for(d=0;d<3;d++){h=l.readUshort(i,o),o+=2;for(var M=[],A=0;A<h;A++)M.push(e._lctf.readCoverage(i,c+l.readUshort(i,o+2*A)));o+=2*h,d==0&&(u.backCvg=M),d==1&&(u.inptCvg=M),d==2&&(u.ahedCvg=M)}h=l.readUshort(i,o),o+=2,u.lookupRec=e.GSUB.readSubstLookupRecords(i,o,h)}}else{if(s==7&&u.fmt==1){var w=l.readUshort(i,o);o+=2;var T=l.readUint(i,o);if(o+=4,a.ltype==9)a.ltype=w;else if(a.ltype!=w)throw"invalid extension substitution";return e.GSUB.subt(i,a.ltype,c+T)}console.debug("unsupported GSUB table LookupType",s,"format",u.fmt)}return u},e.GSUB.readSubClassSet=function(i,s){var o=e._bin.readUshort,a=s,l=[],c=o(i,s);s+=2;for(var u=0;u<c;u++){var f=o(i,s);s+=2,l.push(e.GSUB.readSubClassRule(i,a+f))}return l},e.GSUB.readSubClassRule=function(i,s){var o=e._bin.readUshort,a={},l=o(i,s),c=o(i,s+=2);s+=2,a.input=[];for(var u=0;u<l-1;u++)a.input.push(o(i,s)),s+=2;return a.substLookupRecords=e.GSUB.readSubstLookupRecords(i,s,c),a},e.GSUB.readSubstLookupRecords=function(i,s,o){for(var a=e._bin.readUshort,l=[],c=0;c<o;c++)l.push(a(i,s),a(i,s+2)),s+=4;return l},e.GSUB.readChainSubClassSet=function(i,s){var o=e._bin,a=s,l=[],c=o.readUshort(i,s);s+=2;for(var u=0;u<c;u++){var f=o.readUshort(i,s);s+=2,l.push(e.GSUB.readChainSubClassRule(i,a+f))}return l},e.GSUB.readChainSubClassRule=function(i,s){for(var o=e._bin,a={},l=["backtrack","input","lookahead"],c=0;c<l.length;c++){var u=o.readUshort(i,s);s+=2,c==1&&u--,a[l[c]]=o.readUshorts(i,s,u),s+=2*a[l[c]].length}return u=o.readUshort(i,s),s+=2,a.subst=o.readUshorts(i,s,2*u),s+=2*a.subst.length,a},e.GSUB.readLigatureSet=function(i,s){var o=e._bin,a=s,l=[],c=o.readUshort(i,s);s+=2;for(var u=0;u<c;u++){var f=o.readUshort(i,s);s+=2,l.push(e.GSUB.readLigature(i,a+f))}return l},e.GSUB.readLigature=function(i,s){var o=e._bin,a={chain:[]};a.nglyph=o.readUshort(i,s),s+=2;var l=o.readUshort(i,s);s+=2;for(var c=0;c<l-1;c++)a.chain.push(o.readUshort(i,s)),s+=2;return a},e.head={},e.head.parse=function(i,s,o){var a=e._bin,l={};return a.readFixed(i,s),s+=4,l.fontRevision=a.readFixed(i,s),s+=4,a.readUint(i,s),s+=4,a.readUint(i,s),s+=4,l.flags=a.readUshort(i,s),s+=2,l.unitsPerEm=a.readUshort(i,s),s+=2,l.created=a.readUint64(i,s),s+=8,l.modified=a.readUint64(i,s),s+=8,l.xMin=a.readShort(i,s),s+=2,l.yMin=a.readShort(i,s),s+=2,l.xMax=a.readShort(i,s),s+=2,l.yMax=a.readShort(i,s),s+=2,l.macStyle=a.readUshort(i,s),s+=2,l.lowestRecPPEM=a.readUshort(i,s),s+=2,l.fontDirectionHint=a.readShort(i,s),s+=2,l.indexToLocFormat=a.readShort(i,s),s+=2,l.glyphDataFormat=a.readShort(i,s),s+=2,l},e.hhea={},e.hhea.parse=function(i,s,o){var a=e._bin,l={};return a.readFixed(i,s),s+=4,l.ascender=a.readShort(i,s),s+=2,l.descender=a.readShort(i,s),s+=2,l.lineGap=a.readShort(i,s),s+=2,l.advanceWidthMax=a.readUshort(i,s),s+=2,l.minLeftSideBearing=a.readShort(i,s),s+=2,l.minRightSideBearing=a.readShort(i,s),s+=2,l.xMaxExtent=a.readShort(i,s),s+=2,l.caretSlopeRise=a.readShort(i,s),s+=2,l.caretSlopeRun=a.readShort(i,s),s+=2,l.caretOffset=a.readShort(i,s),s+=2,s+=8,l.metricDataFormat=a.readShort(i,s),s+=2,l.numberOfHMetrics=a.readUshort(i,s),s+=2,l},e.hmtx={},e.hmtx.parse=function(i,s,o,a){for(var l=e._bin,c={aWidth:[],lsBearing:[]},u=0,f=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(u=l.readUshort(i,s),s+=2,f=l.readShort(i,s),s+=2),c.aWidth.push(u),c.lsBearing.push(f);return c},e.kern={},e.kern.parse=function(i,s,o,a){var l=e._bin,c=l.readUshort(i,s);if(s+=2,c==1)return e.kern.parseV1(i,s-2,o,a);var u=l.readUshort(i,s);s+=2;for(var f={glyph1:[],rval:[]},h=0;h<u;h++){s+=2,o=l.readUshort(i,s),s+=2;var d=l.readUshort(i,s);s+=2;var g=d>>>8;if((g&=15)!=0)throw"unknown kern table format: "+g;s=e.kern.readFormat0(i,s,f)}return f},e.kern.parseV1=function(i,s,o,a){var l=e._bin;l.readFixed(i,s),s+=4;var c=l.readUint(i,s);s+=4;for(var u={glyph1:[],rval:[]},f=0;f<c;f++){l.readUint(i,s),s+=4;var h=l.readUshort(i,s);s+=2,l.readUshort(i,s),s+=2;var d=h>>>8;if((d&=15)!=0)throw"unknown kern table format: "+d;s=e.kern.readFormat0(i,s,u)}return u},e.kern.readFormat0=function(i,s,o){var a=e._bin,l=-1,c=a.readUshort(i,s);s+=2,a.readUshort(i,s),s+=2,a.readUshort(i,s),s+=2,a.readUshort(i,s),s+=2;for(var u=0;u<c;u++){var f=a.readUshort(i,s);s+=2;var h=a.readUshort(i,s);s+=2;var d=a.readShort(i,s);s+=2,f!=l&&(o.glyph1.push(f),o.rval.push({glyph2:[],vals:[]}));var g=o.rval[o.rval.length-1];g.glyph2.push(h),g.vals.push(d),l=f}return s},e.loca={},e.loca.parse=function(i,s,o,a){var l=e._bin,c=[],u=a.head.indexToLocFormat,f=a.maxp.numGlyphs+1;if(u==0)for(var h=0;h<f;h++)c.push(l.readUshort(i,s+(h<<1))<<1);if(u==1)for(h=0;h<f;h++)c.push(l.readUint(i,s+(h<<2)));return c},e.maxp={},e.maxp.parse=function(i,s,o){var a=e._bin,l={},c=a.readUint(i,s);return s+=4,l.numGlyphs=a.readUshort(i,s),s+=2,c==65536&&(l.maxPoints=a.readUshort(i,s),s+=2,l.maxContours=a.readUshort(i,s),s+=2,l.maxCompositePoints=a.readUshort(i,s),s+=2,l.maxCompositeContours=a.readUshort(i,s),s+=2,l.maxZones=a.readUshort(i,s),s+=2,l.maxTwilightPoints=a.readUshort(i,s),s+=2,l.maxStorage=a.readUshort(i,s),s+=2,l.maxFunctionDefs=a.readUshort(i,s),s+=2,l.maxInstructionDefs=a.readUshort(i,s),s+=2,l.maxStackElements=a.readUshort(i,s),s+=2,l.maxSizeOfInstructions=a.readUshort(i,s),s+=2,l.maxComponentElements=a.readUshort(i,s),s+=2,l.maxComponentDepth=a.readUshort(i,s),s+=2),l},e.name={},e.name.parse=function(i,s,o){var a=e._bin,l={};a.readUshort(i,s),s+=2;var c=a.readUshort(i,s);s+=2,a.readUshort(i,s);for(var u,f=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=s+=2,d=0;d<c;d++){var g=a.readUshort(i,s);s+=2;var _=a.readUshort(i,s);s+=2;var p=a.readUshort(i,s);s+=2;var m=a.readUshort(i,s);s+=2;var y=a.readUshort(i,s);s+=2;var v=a.readUshort(i,s);s+=2;var M,A=f[m],w=h+12*c+v;if(g==0)M=a.readUnicode(i,w,y/2);else if(g==3&&_==0)M=a.readUnicode(i,w,y/2);else if(_==0)M=a.readASCII(i,w,y);else if(_==1)M=a.readUnicode(i,w,y/2);else if(_==3)M=a.readUnicode(i,w,y/2);else{if(g!=1)throw"unknown encoding "+_+", platformID: "+g;M=a.readASCII(i,w,y),console.debug("reading unknown MAC encoding "+_+" as ASCII")}var T="p"+g+","+p.toString(16);l[T]==null&&(l[T]={}),l[T][A!==void 0?A:m]=M,l[T]._lang=p}for(var P in l)if(l[P].postScriptName!=null&&l[P]._lang==1033)return l[P];for(var P in l)if(l[P].postScriptName!=null&&l[P]._lang==0)return l[P];for(var P in l)if(l[P].postScriptName!=null&&l[P]._lang==3084)return l[P];for(var P in l)if(l[P].postScriptName!=null)return l[P];for(var P in l){u=P;break}return console.debug("returning name table with languageID "+l[u]._lang),l[u]},e["OS/2"]={},e["OS/2"].parse=function(i,s,o){var a=e._bin.readUshort(i,s);s+=2;var l={};if(a==0)e["OS/2"].version0(i,s,l);else if(a==1)e["OS/2"].version1(i,s,l);else if(a==2||a==3||a==4)e["OS/2"].version2(i,s,l);else{if(a!=5)throw"unknown OS/2 table version: "+a;e["OS/2"].version5(i,s,l)}return l},e["OS/2"].version0=function(i,s,o){var a=e._bin;return o.xAvgCharWidth=a.readShort(i,s),s+=2,o.usWeightClass=a.readUshort(i,s),s+=2,o.usWidthClass=a.readUshort(i,s),s+=2,o.fsType=a.readUshort(i,s),s+=2,o.ySubscriptXSize=a.readShort(i,s),s+=2,o.ySubscriptYSize=a.readShort(i,s),s+=2,o.ySubscriptXOffset=a.readShort(i,s),s+=2,o.ySubscriptYOffset=a.readShort(i,s),s+=2,o.ySuperscriptXSize=a.readShort(i,s),s+=2,o.ySuperscriptYSize=a.readShort(i,s),s+=2,o.ySuperscriptXOffset=a.readShort(i,s),s+=2,o.ySuperscriptYOffset=a.readShort(i,s),s+=2,o.yStrikeoutSize=a.readShort(i,s),s+=2,o.yStrikeoutPosition=a.readShort(i,s),s+=2,o.sFamilyClass=a.readShort(i,s),s+=2,o.panose=a.readBytes(i,s,10),s+=10,o.ulUnicodeRange1=a.readUint(i,s),s+=4,o.ulUnicodeRange2=a.readUint(i,s),s+=4,o.ulUnicodeRange3=a.readUint(i,s),s+=4,o.ulUnicodeRange4=a.readUint(i,s),s+=4,o.achVendID=[a.readInt8(i,s),a.readInt8(i,s+1),a.readInt8(i,s+2),a.readInt8(i,s+3)],s+=4,o.fsSelection=a.readUshort(i,s),s+=2,o.usFirstCharIndex=a.readUshort(i,s),s+=2,o.usLastCharIndex=a.readUshort(i,s),s+=2,o.sTypoAscender=a.readShort(i,s),s+=2,o.sTypoDescender=a.readShort(i,s),s+=2,o.sTypoLineGap=a.readShort(i,s),s+=2,o.usWinAscent=a.readUshort(i,s),s+=2,o.usWinDescent=a.readUshort(i,s),s+=2},e["OS/2"].version1=function(i,s,o){var a=e._bin;return s=e["OS/2"].version0(i,s,o),o.ulCodePageRange1=a.readUint(i,s),s+=4,o.ulCodePageRange2=a.readUint(i,s),s+=4},e["OS/2"].version2=function(i,s,o){var a=e._bin;return s=e["OS/2"].version1(i,s,o),o.sxHeight=a.readShort(i,s),s+=2,o.sCapHeight=a.readShort(i,s),s+=2,o.usDefault=a.readUshort(i,s),s+=2,o.usBreak=a.readUshort(i,s),s+=2,o.usMaxContext=a.readUshort(i,s),s+=2},e["OS/2"].version5=function(i,s,o){var a=e._bin;return s=e["OS/2"].version2(i,s,o),o.usLowerOpticalPointSize=a.readUshort(i,s),s+=2,o.usUpperOpticalPointSize=a.readUshort(i,s),s+=2},e.post={},e.post.parse=function(i,s,o){var a=e._bin,l={};return l.version=a.readFixed(i,s),s+=4,l.italicAngle=a.readFixed(i,s),s+=4,l.underlinePosition=a.readShort(i,s),s+=2,l.underlineThickness=a.readShort(i,s),s+=2,l},e==null&&(e={}),e.U==null&&(e.U={}),e.U.codeToGlyph=function(i,s){var o=i.cmap,a=-1;if(o.p0e4!=null?a=o.p0e4:o.p3e1!=null?a=o.p3e1:o.p1e0!=null?a=o.p1e0:o.p0e3!=null&&(a=o.p0e3),a==-1)throw"no familiar platform and encoding!";var l=o.tables[a];if(l.format==0)return s>=l.map.length?0:l.map[s];if(l.format==4){for(var c=-1,u=0;u<l.endCount.length;u++)if(s<=l.endCount[u]){c=u;break}return c==-1||l.startCount[c]>s?0:65535&(l.idRangeOffset[c]!=0?l.glyphIdArray[s-l.startCount[c]+(l.idRangeOffset[c]>>1)-(l.idRangeOffset.length-c)]:s+l.idDelta[c])}if(l.format==12){if(s>l.groups[l.groups.length-1][1])return 0;for(u=0;u<l.groups.length;u++){var f=l.groups[u];if(f[0]<=s&&s<=f[1])return f[2]+(s-f[0])}return 0}throw"unknown cmap table format "+l.format},e.U.glyphToPath=function(i,s){var o={cmds:[],crds:[]};if(i.SVG&&i.SVG.entries[s]){var a=i.SVG.entries[s];return a==null?o:(typeof a=="string"&&(a=e.SVG.toPath(a),i.SVG.entries[s]=a),a)}if(i.CFF){var l={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:i.CFF.Private?i.CFF.Private.defaultWidthX:0,open:!1},c=i.CFF,u=i.CFF.Private;if(c.ROS){for(var f=0;c.FDSelect[f+2]<=s;)f+=2;u=c.FDArray[c.FDSelect[f+1]].Private}e.U._drawCFF(i.CFF.CharStrings[s],l,c,u,o)}else i.glyf&&e.U._drawGlyf(s,i,o);return o},e.U._drawGlyf=function(i,s,o){var a=s.glyf[i];a==null&&(a=s.glyf[i]=e.glyf._parseGlyf(s,i)),a!=null&&(a.noc>-1?e.U._simpleGlyph(a,o):e.U._compoGlyph(a,s,o))},e.U._simpleGlyph=function(i,s){for(var o=0;o<i.noc;o++){for(var a=o==0?0:i.endPts[o-1]+1,l=i.endPts[o],c=a;c<=l;c++){var u=c==a?l:c-1,f=c==l?a:c+1,h=1&i.flags[c],d=1&i.flags[u],g=1&i.flags[f],_=i.xs[c],p=i.ys[c];if(c==a)if(h){if(!d){e.U.P.moveTo(s,_,p);continue}e.U.P.moveTo(s,i.xs[u],i.ys[u])}else d?e.U.P.moveTo(s,i.xs[u],i.ys[u]):e.U.P.moveTo(s,(i.xs[u]+_)/2,(i.ys[u]+p)/2);h?d&&e.U.P.lineTo(s,_,p):g?e.U.P.qcurveTo(s,_,p,i.xs[f],i.ys[f]):e.U.P.qcurveTo(s,_,p,(_+i.xs[f])/2,(p+i.ys[f])/2)}e.U.P.closePath(s)}},e.U._compoGlyph=function(i,s,o){for(var a=0;a<i.parts.length;a++){var l={cmds:[],crds:[]},c=i.parts[a];e.U._drawGlyf(c.glyphIndex,s,l);for(var u=c.m,f=0;f<l.crds.length;f+=2){var h=l.crds[f],d=l.crds[f+1];o.crds.push(h*u.a+d*u.b+u.tx),o.crds.push(h*u.c+d*u.d+u.ty)}for(f=0;f<l.cmds.length;f++)o.cmds.push(l.cmds[f])}},e.U._getGlyphClass=function(i,s){var o=e._lctf.getInterval(s,i);return o==-1?0:s[o+2]},e.U._applySubs=function(i,s,o,a){for(var l=i.length-s-1,c=0;c<o.tabs.length;c++)if(o.tabs[c]!=null){var u,f=o.tabs[c];if(!f.coverage||(u=e._lctf.coverageIndex(f.coverage,i[s]))!=-1){if(o.ltype==1)i[s],f.fmt==1?i[s]=i[s]+f.delta:i[s]=f.newg[u];else if(o.ltype==4)for(var h=f.vals[u],d=0;d<h.length;d++){var g=h[d],_=g.chain.length;if(!(_>l)){for(var p=!0,m=0,y=0;y<_;y++){for(;i[s+m+(1+y)]==-1;)m++;g.chain[y]!=i[s+m+(1+y)]&&(p=!1)}if(p){for(i[s]=g.nglyph,y=0;y<_+m;y++)i[s+y+1]=-1;break}}}else if(o.ltype==5&&f.fmt==2)for(var v=e._lctf.getInterval(f.cDef,i[s]),M=f.cDef[v+2],A=f.scset[M],w=0;w<A.length;w++){var T=A[w],P=T.input;if(!(P.length>l)){for(p=!0,y=0;y<P.length;y++){var $=e._lctf.getInterval(f.cDef,i[s+1+y]);if(v==-1&&f.cDef[$+2]!=P[y]){p=!1;break}}if(p){var E=T.substLookupRecords;for(d=0;d<E.length;d+=2)E[d],E[d+1]}}}else if(o.ltype==6&&f.fmt==3){if(!e.U._glsCovered(i,f.backCvg,s-f.backCvg.length)||!e.U._glsCovered(i,f.inptCvg,s)||!e.U._glsCovered(i,f.ahedCvg,s+f.inptCvg.length))continue;var C=f.lookupRec;for(w=0;w<C.length;w+=2){v=C[w];var B=a[C[w+1]];e.U._applySubs(i,s+v,B,a)}}}}},e.U._glsCovered=function(i,s,o){for(var a=0;a<s.length;a++)if(e._lctf.coverageIndex(s[a],i[o+a])==-1)return!1;return!0},e.U.glyphsToPath=function(i,s,o){for(var a={cmds:[],crds:[]},l=0,c=0;c<s.length;c++){var u=s[c];if(u!=-1){for(var f=c<s.length-1&&s[c+1]!=-1?s[c+1]:0,h=e.U.glyphToPath(i,u),d=0;d<h.crds.length;d+=2)a.crds.push(h.crds[d]+l),a.crds.push(h.crds[d+1]);for(o&&a.cmds.push(o),d=0;d<h.cmds.length;d++)a.cmds.push(h.cmds[d]);o&&a.cmds.push("X"),l+=i.hmtx.aWidth[u],c<s.length-1&&(l+=e.U.getPairAdjustment(i,u,f))}}return a},e.U.P={},e.U.P.moveTo=function(i,s,o){i.cmds.push("M"),i.crds.push(s,o)},e.U.P.lineTo=function(i,s,o){i.cmds.push("L"),i.crds.push(s,o)},e.U.P.curveTo=function(i,s,o,a,l,c,u){i.cmds.push("C"),i.crds.push(s,o,a,l,c,u)},e.U.P.qcurveTo=function(i,s,o,a,l){i.cmds.push("Q"),i.crds.push(s,o,a,l)},e.U.P.closePath=function(i){i.cmds.push("Z")},e.U._drawCFF=function(i,s,o,a,l){for(var c=s.stack,u=s.nStems,f=s.haveWidth,h=s.width,d=s.open,g=0,_=s.x,p=s.y,m=0,y=0,v=0,M=0,A=0,w=0,T=0,P=0,$=0,E=0,C={val:0,size:0};g<i.length;){e.CFF.getCharString(i,g,C);var B=C.val;if(g+=C.size,B=="o1"||B=="o18")c.length%2!=0&&!f&&(h=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,f=!0;else if(B=="o3"||B=="o23")c.length%2!=0&&!f&&(h=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,f=!0;else if(B=="o4")c.length>1&&!f&&(h=c.shift()+a.nominalWidthX,f=!0),d&&e.U.P.closePath(l),p+=c.pop(),e.U.P.moveTo(l,_,p),d=!0;else if(B=="o5")for(;c.length>0;)_+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,_,p);else if(B=="o6"||B=="o7")for(var Y=c.length,R=B=="o6",ne=0;ne<Y;ne++){var H=c.shift();R?_+=H:p+=H,R=!R,e.U.P.lineTo(l,_,p)}else if(B=="o8"||B=="o24"){Y=c.length;for(var re=0;re+6<=Y;)m=_+c.shift(),y=p+c.shift(),v=m+c.shift(),M=y+c.shift(),_=v+c.shift(),p=M+c.shift(),e.U.P.curveTo(l,m,y,v,M,_,p),re+=6;B=="o24"&&(_+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,_,p))}else{if(B=="o11")break;if(B=="o1234"||B=="o1235"||B=="o1236"||B=="o1237")B=="o1234"&&(y=p,v=(m=_+c.shift())+c.shift(),E=M=y+c.shift(),w=M,P=p,_=(T=(A=($=v+c.shift())+c.shift())+c.shift())+c.shift(),e.U.P.curveTo(l,m,y,v,M,$,E),e.U.P.curveTo(l,A,w,T,P,_,p)),B=="o1235"&&(m=_+c.shift(),y=p+c.shift(),v=m+c.shift(),M=y+c.shift(),$=v+c.shift(),E=M+c.shift(),A=$+c.shift(),w=E+c.shift(),T=A+c.shift(),P=w+c.shift(),_=T+c.shift(),p=P+c.shift(),c.shift(),e.U.P.curveTo(l,m,y,v,M,$,E),e.U.P.curveTo(l,A,w,T,P,_,p)),B=="o1236"&&(m=_+c.shift(),y=p+c.shift(),v=m+c.shift(),E=M=y+c.shift(),w=M,T=(A=($=v+c.shift())+c.shift())+c.shift(),P=w+c.shift(),_=T+c.shift(),e.U.P.curveTo(l,m,y,v,M,$,E),e.U.P.curveTo(l,A,w,T,P,_,p)),B=="o1237"&&(m=_+c.shift(),y=p+c.shift(),v=m+c.shift(),M=y+c.shift(),$=v+c.shift(),E=M+c.shift(),A=$+c.shift(),w=E+c.shift(),T=A+c.shift(),P=w+c.shift(),Math.abs(T-_)>Math.abs(P-p)?_=T+c.shift():p=P+c.shift(),e.U.P.curveTo(l,m,y,v,M,$,E),e.U.P.curveTo(l,A,w,T,P,_,p));else if(B=="o14"){if(c.length>0&&!f&&(h=c.shift()+o.nominalWidthX,f=!0),c.length==4){var J=c.shift(),K=c.shift(),q=c.shift(),U=c.shift(),X=e.CFF.glyphBySE(o,q),le=e.CFF.glyphBySE(o,U);e.U._drawCFF(o.CharStrings[X],s,o,a,l),s.x=J,s.y=K,e.U._drawCFF(o.CharStrings[le],s,o,a,l)}d&&(e.U.P.closePath(l),d=!1)}else if(B=="o19"||B=="o20")c.length%2!=0&&!f&&(h=c.shift()+a.nominalWidthX),u+=c.length>>1,c.length=0,f=!0,g+=u+7>>3;else if(B=="o21")c.length>2&&!f&&(h=c.shift()+a.nominalWidthX,f=!0),p+=c.pop(),_+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,_,p),d=!0;else if(B=="o22")c.length>1&&!f&&(h=c.shift()+a.nominalWidthX,f=!0),_+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,_,p),d=!0;else if(B=="o25"){for(;c.length>6;)_+=c.shift(),p+=c.shift(),e.U.P.lineTo(l,_,p);m=_+c.shift(),y=p+c.shift(),v=m+c.shift(),M=y+c.shift(),_=v+c.shift(),p=M+c.shift(),e.U.P.curveTo(l,m,y,v,M,_,p)}else if(B=="o26")for(c.length%2&&(_+=c.shift());c.length>0;)m=_,y=p+c.shift(),_=v=m+c.shift(),p=(M=y+c.shift())+c.shift(),e.U.P.curveTo(l,m,y,v,M,_,p);else if(B=="o27")for(c.length%2&&(p+=c.shift());c.length>0;)y=p,v=(m=_+c.shift())+c.shift(),M=y+c.shift(),_=v+c.shift(),p=M,e.U.P.curveTo(l,m,y,v,M,_,p);else if(B=="o10"||B=="o29"){var N=B=="o10"?a:o;if(c.length==0)console.debug("error: empty stack");else{var V=c.pop(),oe=N.Subrs[V+N.Bias];s.x=_,s.y=p,s.nStems=u,s.haveWidth=f,s.width=h,s.open=d,e.U._drawCFF(oe,s,o,a,l),_=s.x,p=s.y,u=s.nStems,f=s.haveWidth,h=s.width,d=s.open}}else if(B=="o30"||B=="o31"){var F=c.length,j=(re=0,B=="o31");for(re+=F-(Y=-3&F);re<Y;)j?(y=p,v=(m=_+c.shift())+c.shift(),p=(M=y+c.shift())+c.shift(),Y-re==5?(_=v+c.shift(),re++):_=v,j=!1):(m=_,y=p+c.shift(),v=m+c.shift(),M=y+c.shift(),_=v+c.shift(),Y-re==5?(p=M+c.shift(),re++):p=M,j=!0),e.U.P.curveTo(l,m,y,v,M,_,p),re+=4}else{if((B+"").charAt(0)=="o")throw console.debug("Unknown operation: "+B,i),B;c.push(B)}}}s.x=_,s.y=p,s.nStems=u,s.haveWidth=f,s.width=h,s.open=d};var t=e,r={Typr:t};return n.Typr=t,n.default=r,Object.defineProperty(n,"__esModule",{value:!0}),n}({}).Typr}/*!
Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
(https://github.com/101arrowz/fflate) for use in Troika text rendering. 
Original licenses apply: 
- fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
- woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
*/function Ow(){return function(n){var e=Uint8Array,t=Uint16Array,r=Uint32Array,i=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),s=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),o=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(B,Y){for(var R=new t(31),ne=0;ne<31;++ne)R[ne]=Y+=1<<B[ne-1];var H=new r(R[30]);for(ne=1;ne<30;++ne)for(var re=R[ne];re<R[ne+1];++re)H[re]=re-R[ne]<<5|ne;return[R,H]},l=a(i,2),c=l[0],u=l[1];c[28]=258,u[258]=28;for(var f=a(s,0)[0],h=new t(32768),d=0;d<32768;++d){var g=(43690&d)>>>1|(21845&d)<<1;g=(61680&(g=(52428&g)>>>2|(13107&g)<<2))>>>4|(3855&g)<<4,h[d]=((65280&g)>>>8|(255&g)<<8)>>>1}var _=function(B,Y,R){for(var ne=B.length,H=0,re=new t(Y);H<ne;++H)++re[B[H]-1];var J,K=new t(Y);for(H=0;H<Y;++H)K[H]=K[H-1]+re[H-1]<<1;{J=new t(1<<Y);var q=15-Y;for(H=0;H<ne;++H)if(B[H])for(var U=H<<4|B[H],X=Y-B[H],le=K[B[H]-1]++<<X,N=le|(1<<X)-1;le<=N;++le)J[h[le]>>>q]=U}return J},p=new e(288);for(d=0;d<144;++d)p[d]=8;for(d=144;d<256;++d)p[d]=9;for(d=256;d<280;++d)p[d]=7;for(d=280;d<288;++d)p[d]=8;var m=new e(32);for(d=0;d<32;++d)m[d]=5;var y=_(p,9),v=_(m,5),M=function(B){for(var Y=B[0],R=1;R<B.length;++R)B[R]>Y&&(Y=B[R]);return Y},A=function(B,Y,R){var ne=Y/8|0;return(B[ne]|B[ne+1]<<8)>>(7&Y)&R},w=function(B,Y){var R=Y/8|0;return(B[R]|B[R+1]<<8|B[R+2]<<16)>>(7&Y)},T=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],P=function(B,Y,R){var ne=new Error(Y||T[B]);if(ne.code=B,Error.captureStackTrace&&Error.captureStackTrace(ne,P),!R)throw ne;return ne},$=function(B,Y,R){var ne=B.length;if(!ne||R&&!R.l&&ne<5)return Y||new e(0);var H=!Y||R,re=!R||R.i;R||(R={}),Y||(Y=new e(3*ne));var J,K=function(Se){var Ae=Y.length;if(Se>Ae){var Ie=new e(Math.max(2*Ae,Se));Ie.set(Y),Y=Ie}},q=R.f||0,U=R.p||0,X=R.b||0,le=R.l,N=R.d,V=R.m,oe=R.n,F=8*ne;do{if(!le){R.f=q=A(B,U,1);var j=A(B,U+1,3);if(U+=3,!j){var ee=B[(fe=((J=U)/8|0)+(7&J&&1)+4)-4]|B[fe-3]<<8,me=fe+ee;if(me>ne){re&&P(0);break}H&&K(X+ee),Y.set(B.subarray(fe,me),X),R.b=X+=ee,R.p=U=8*me;continue}if(j==1)le=y,N=v,V=9,oe=5;else if(j==2){var de=A(B,U,31)+257,x=A(B,U+10,15)+4,I=de+A(B,U+5,31)+1;U+=14;for(var O=new e(I),Z=new e(19),Q=0;Q<x;++Q)Z[o[Q]]=A(B,U+3*Q,7);U+=3*x;var ce=M(Z),ie=(1<<ce)-1,se=_(Z,ce);for(Q=0;Q<I;){var fe,b=se[A(B,U,ie)];if(U+=15&b,(fe=b>>>4)<16)O[Q++]=fe;else{var S=0,k=0;for(fe==16?(k=3+A(B,U,3),U+=2,S=O[Q-1]):fe==17?(k=3+A(B,U,7),U+=3):fe==18&&(k=11+A(B,U,127),U+=7);k--;)O[Q++]=S}}var W=O.subarray(0,de),te=O.subarray(de);V=M(W),oe=M(te),le=_(W,V),N=_(te,oe)}else P(1);if(U>F){re&&P(0);break}}H&&K(X+131072);for(var he=(1<<V)-1,ye=(1<<oe)-1,be=U;;be=U){var ge=(S=le[w(B,U)&he])>>>4;if((U+=15&S)>F){re&&P(0);break}if(S||P(2),ge<256)Y[X++]=ge;else{if(ge==256){be=U,le=null;break}var Ee=ge-254;if(ge>264){var Fe=i[Q=ge-257];Ee=A(B,U,(1<<Fe)-1)+c[Q],U+=Fe}var Te=N[w(B,U)&ye],Be=Te>>>4;if(Te||P(3),U+=15&Te,te=f[Be],Be>3&&(Fe=s[Be],te+=w(B,U)&(1<<Fe)-1,U+=Fe),U>F){re&&P(0);break}H&&K(X+131072);for(var De=X+Ee;X<De;X+=4)Y[X]=Y[X-te],Y[X+1]=Y[X+1-te],Y[X+2]=Y[X+2-te],Y[X+3]=Y[X+3-te];X=De}}R.l=le,R.p=be,R.b=X,le&&(q=1,R.m=V,R.d=N,R.n=oe)}while(!q);return X==Y.length?Y:function(Se,Ae,Ie){(Ie==null||Ie>Se.length)&&(Ie=Se.length);var G=new(Se instanceof t?t:Se instanceof r?r:e)(Ie-Ae);return G.set(Se.subarray(Ae,Ie)),G}(Y,0,X)},E=new e(0),C=typeof TextDecoder<"u"&&new TextDecoder;try{C.decode(E,{stream:!0})}catch{}return n.convert_streams=function(B){var Y=new DataView(B),R=0;function ne(){var de=Y.getUint16(R);return R+=2,de}function H(){var de=Y.getUint32(R);return R+=4,de}function re(de){ee.setUint16(me,de),me+=2}function J(de){ee.setUint32(me,de),me+=4}for(var K={signature:H(),flavor:H(),length:H(),numTables:ne(),reserved:ne(),totalSfntSize:H(),majorVersion:ne(),minorVersion:ne(),metaOffset:H(),metaLength:H(),metaOrigLength:H(),privOffset:H(),privLength:H()},q=0;Math.pow(2,q)<=K.numTables;)q++;q--;for(var U=16*Math.pow(2,q),X=16*K.numTables-U,le=12,N=[],V=0;V<K.numTables;V++)N.push({tag:H(),offset:H(),compLength:H(),origLength:H(),origChecksum:H()}),le+=16;var oe,F=new Uint8Array(12+16*N.length+N.reduce(function(de,x){return de+x.origLength+4},0)),j=F.buffer,ee=new DataView(j),me=0;return J(K.flavor),re(K.numTables),re(U),re(q),re(X),N.forEach(function(de){J(de.tag),J(de.origChecksum),J(le),J(de.origLength),de.outOffset=le,(le+=de.origLength)%4!=0&&(le+=4-le%4)}),N.forEach(function(de){var x,I=B.slice(de.offset,de.offset+de.compLength);if(de.compLength!=de.origLength){var O=new Uint8Array(de.origLength);x=new Uint8Array(I,2),$(x,O)}else O=new Uint8Array(I);F.set(O,de.outOffset);var Z=0;(le=de.outOffset+de.origLength)%4!=0&&(Z=4-le%4),F.set(new Uint8Array(Z).buffer,de.outOffset+de.origLength),oe=le+Z}),j.slice(0,oe)},Object.defineProperty(n,"__esModule",{value:!0}),n}({}).convert_streams}function Bw(n,e){const t={M:2,L:2,Q:4,C:6,Z:0},r={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},i=1,s=2,o=4,a=8,l=16,c=32;let u;function f(T){if(!u){const P={R:s,L:i,D:o,C:l,U:c,T:a};u=new Map;for(let $ in r){let E=0;r[$].split(",").forEach(C=>{let[B,Y]=C.split("+");B=parseInt(B,36),Y=Y?parseInt(Y,36):0,u.set(E+=B,P[$]);for(let R=Y;R--;)u.set(++E,P[$])})}}return u.get(T)||c}const h=1,d=2,g=3,_=4,p=[null,"isol","init","fina","medi"];function m(T){const P=new Uint8Array(T.length);let $=c,E=h,C=-1;for(let B=0;B<T.length;B++){const Y=T.codePointAt(B);let R=f(Y)|0,ne=h;R&a||($&(i|o|l)?R&(s|o|l)?(ne=g,(E===h||E===g)&&P[C]++):R&(i|c)&&(E===d||E===_)&&P[C]--:$&(s|c)&&(E===d||E===_)&&P[C]--,E=P[B]=ne,$=R,C=B,Y>65535&&B++)}return P}function y(T,P){const $=[];for(let C=0;C<P.length;C++){const B=P.codePointAt(C);B>65535&&C++,$.push(n.U.codeToGlyph(T,B))}const E=T.GSUB;if(E){const{lookupList:C,featureList:B}=E;let Y;const R=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,ne=[];B.forEach(H=>{if(R.test(H.tag))for(let re=0;re<H.tab.length;re++){if(ne[H.tab[re]])continue;ne[H.tab[re]]=!0;const J=C[H.tab[re]],K=/^(isol|init|fina|medi)$/.test(H.tag);K&&!Y&&(Y=m(P));for(let q=0;q<$.length;q++)(!Y||!K||p[Y[q]]===H.tag)&&n.U._applySubs($,q,J,C)}})}return $}function v(T,P){const $=new Int16Array(P.length*3);let E=0;for(;E<P.length;E++){const R=P[E];if(R===-1)continue;$[E*3+2]=T.hmtx.aWidth[R];const ne=T.GPOS;if(ne){const H=ne.lookupList;for(let re=0;re<H.length;re++){const J=H[re];for(let K=0;K<J.tabs.length;K++){const q=J.tabs[K];if(J.ltype===1){if(n._lctf.coverageIndex(q.coverage,R)!==-1&&q.pos){Y(q.pos,E);break}}else if(J.ltype===2){let U=null,X=C();if(X!==-1){const le=n._lctf.coverageIndex(q.coverage,P[X]);if(le!==-1){if(q.fmt===1){const N=q.pairsets[le];for(let V=0;V<N.length;V++)N[V].gid2===R&&(U=N[V])}else if(q.fmt===2){const N=n.U._getGlyphClass(P[X],q.classDef1),V=n.U._getGlyphClass(R,q.classDef2);U=q.matrix[N][V]}if(U){U.val1&&Y(U.val1,X),U.val2&&Y(U.val2,E);break}}}}else if(J.ltype===4){const U=n._lctf.coverageIndex(q.markCoverage,R);if(U!==-1){const X=C(B),le=X===-1?-1:n._lctf.coverageIndex(q.baseCoverage,P[X]);if(le!==-1){const N=q.markArray[U],V=q.baseArray[le][N.markClass];$[E*3]=V.x-N.x+$[X*3]-$[X*3+2],$[E*3+1]=V.y-N.y+$[X*3+1];break}}}else if(J.ltype===6){const U=n._lctf.coverageIndex(q.mark1Coverage,R);if(U!==-1){const X=C();if(X!==-1){const le=P[X];if(M(T,le)===3){const N=n._lctf.coverageIndex(q.mark2Coverage,le);if(N!==-1){const V=q.mark1Array[U],oe=q.mark2Array[N][V.markClass];$[E*3]=oe.x-V.x+$[X*3]-$[X*3+2],$[E*3+1]=oe.y-V.y+$[X*3+1];break}}}}}}}}else if(T.kern&&!T.cff){const H=C();if(H!==-1){const re=T.kern.glyph1.indexOf(P[H]);if(re!==-1){const J=T.kern.rval[re].glyph2.indexOf(R);J!==-1&&($[H*3+2]+=T.kern.rval[re].vals[J])}}}}return $;function C(R){for(let ne=E-1;ne>=0;ne--)if(P[ne]!==-1&&(!R||R(P[ne])))return ne;return-1}function B(R){return M(T,R)===1}function Y(R,ne){for(let H=0;H<3;H++)$[ne*3+H]+=R[H]||0}}function M(T,P){const $=T.GDEF&&T.GDEF.glyphClassDef;return $?n.U._getGlyphClass(P,$):0}function A(...T){for(let P=0;P<T.length;P++)if(typeof T[P]=="number")return T[P]}function w(T){const P=Object.create(null),$=T["OS/2"],E=T.hhea,C=T.head.unitsPerEm,B=A($&&$.sTypoAscender,E&&E.ascender,C),Y={unitsPerEm:C,ascender:B,descender:A($&&$.sTypoDescender,E&&E.descender,0),capHeight:A($&&$.sCapHeight,B),xHeight:A($&&$.sxHeight,B),lineGap:A($&&$.sTypoLineGap,E&&E.lineGap),supportsCodePoint(R){return n.U.codeToGlyph(T,R)>0},forEachGlyph(R,ne,H,re){let J=0;const K=1/Y.unitsPerEm*ne,q=y(T,R);let U=0;const X=v(T,q);return q.forEach((le,N)=>{if(le!==-1){let V=P[le];if(!V){const{cmds:oe,crds:F}=n.U.glyphToPath(T,le);let j="",ee=0;for(let O=0,Z=oe.length;O<Z;O++){const Q=t[oe[O]];j+=oe[O];for(let ce=1;ce<=Q;ce++)j+=(ce>1?",":"")+F[ee++]}let me,de,x,I;if(F.length){me=de=1/0,x=I=-1/0;for(let O=0,Z=F.length;O<Z;O+=2){let Q=F[O],ce=F[O+1];Q<me&&(me=Q),ce<de&&(de=ce),Q>x&&(x=Q),ce>I&&(I=ce)}}else me=x=de=I=0;V=P[le]={index:le,advanceWidth:T.hmtx.aWidth[le],xMin:me,yMin:de,xMax:x,yMax:I,path:j}}re.call(null,V,J+X[N*3]*K,X[N*3+1]*K,U),J+=X[N*3+2]*K,H&&(J+=H*ne)}U+=R.codePointAt(U)>65535?2:1}),J}};return Y}return function(P){const $=new Uint8Array(P,0,4),E=n._bin.readASCII($,0,4);if(E==="wOFF")P=e(P);else if(E==="wOF2")throw new Error("woff2 fonts not supported");return w(n.parse(P)[0])}}const kw=bs({name:"Typr Font Parser",dependencies:[Nw,Ow,Bw],init(n,e,t){const r=n(),i=e();return t(r,i)}});/*!
Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
for use in Troika text rendering. 
Original MIT license applies
*/function Gw(){return function(n){var e=function(){this.buckets=new Map};e.prototype.add=function(v){var M=v>>5;this.buckets.set(M,(this.buckets.get(M)||0)|1<<(31&v))},e.prototype.has=function(v){var M=this.buckets.get(v>>5);return M!==void 0&&(M&1<<(31&v))!=0},e.prototype.serialize=function(){var v=[];return this.buckets.forEach(function(M,A){v.push((+A).toString(36)+":"+M.toString(36))}),v.join(",")},e.prototype.deserialize=function(v){var M=this;this.buckets.clear(),v.split(",").forEach(function(A){var w=A.split(":");M.buckets.set(parseInt(w[0],36),parseInt(w[1],36))})};var t=Math.pow(2,8),r=t-1,i=~r;function s(v){var M=function(w){return w&i}(v).toString(16),A=function(w){return(w&i)+t-1}(v).toString(16);return"codepoint-index/plane"+(v>>16)+"/"+M+"-"+A+".json"}function o(v,M){var A=v&r,w=M.codePointAt(A/6|0);return((w=(w||48)-48)&1<<A%6)!=0}function a(v,M){var A;(A=v,A.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map(function(w){return w.split("-").map(function(T){return parseInt(T.trim(),16)})})).forEach(function(w){var T=w[0],P=w[1];P===void 0&&(P=T),M(T,P)})}function l(v,M){a(v,function(A,w){for(var T=A;T<=w;T++)M(T)})}var c={},u={},f=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function d(v){var M=f.get(v);return M||(M=new e,l(v.ranges,function(A){return M.add(A)}),f.set(v,M)),M}var g,_=new Map;function p(v,M,A){return v[M]?M:v[A]?A:function(w){for(var T in w)return T}(v)}function m(v,M){var A=M;if(!v.includes(A)){A=1/0;for(var w=0;w<v.length;w++)Math.abs(v[w]-M)<Math.abs(A-M)&&(A=v[w])}return A}function y(v){return g||(g=new Set,l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",function(M){g.add(M)})),g.has(v)}return n.CodePointSet=e,n.clearCache=function(){c={},u={}},n.getFontsForString=function(v,M){M===void 0&&(M={});var A,w=M.lang;w===void 0&&(w=new RegExp("\\p{Script=Hangul}","u").test(A=v)?"ko":new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}","u").test(A)?"ja":"en");var T=M.category;T===void 0&&(T="sans-serif");var P=M.style;P===void 0&&(P="normal");var $=M.weight;$===void 0&&($=400);var E=(M.dataUrl||h).replace(/\/$/g,""),C=new Map,B=new Uint8Array(v.length),Y={},R={},ne=new Array(v.length),H=new Map,re=!1;function J(U){var X=_.get(U);return X||(X=fetch(E+"/"+U).then(function(le){if(!le.ok)throw new Error(le.statusText);return le.json().then(function(N){if(!Array.isArray(N)||N[0]!==1)throw new Error("Incorrect schema version; need 1, got "+N[0]);return N[1]})}).catch(function(le){if(E!==h)return re||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+E+'", trying default CDN. '+le.message),re=!0),E=h,_.delete(U),J(U);throw le}),_.set(U,X)),X}for(var K=function(U){var X=v.codePointAt(U),le=s(X);ne[U]=le,c[le]||H.has(le)||H.set(le,J(le).then(function(N){c[le]=N})),X>65535&&(U++,q=U)},q=0;q<v.length;q++)K(q);return Promise.all(H.values()).then(function(){H.clear();for(var U=function(le){var N=v.codePointAt(le),V=null,oe=c[ne[le]],F=void 0;for(var j in oe){var ee=R[j];if(ee===void 0&&(ee=R[j]=new RegExp(j).test(w||"en")),ee){for(var me in F=j,oe[j])if(o(N,oe[j][me])){V=me;break}break}}if(!V){e:for(var de in oe)if(de!==F){for(var x in oe[de])if(o(N,oe[de][x])){V=x;break e}}}V||(console.debug("No font coverage for U+"+N.toString(16)),V="latin"),ne[le]=V,u[V]||H.has(V)||H.set(V,J("font-meta/"+V+".json").then(function(I){u[V]=I})),N>65535&&(le++,X=le)},X=0;X<v.length;X++)U(X);return Promise.all(H.values())}).then(function(){for(var U,X=null,le=0;le<v.length;le++){var N=v.codePointAt(le);if(X&&(y(N)||d(X).has(N)))B[le]=B[le-1];else{X=u[ne[le]];var V=Y[X.id];if(!V){var oe=X.typeforms,F=p(oe,T,"sans-serif"),j=p(oe[F],P,"normal"),ee=m((U=oe[F])===null||U===void 0?void 0:U[j],$);V=Y[X.id]=E+"/font-files/"+X.id+"/"+F+"."+j+"."+ee+".woff"}var me=C.get(V);me==null&&(me=C.size,C.set(V,me)),B[le]=me}N>65535&&(le++,B[le]=B[le-1])}return{fontUrls:Array.from(C.keys()),chars:B}})},Object.defineProperty(n,"__esModule",{value:!0}),n}({})}function zw(n,e){const t=Object.create(null),r=Object.create(null);function i(o,a){const l=c=>{console.error(`Failure loading font ${o}`,c)};try{const c=new XMLHttpRequest;c.open("get",o,!0),c.responseType="arraybuffer",c.onload=function(){if(c.status>=400)l(new Error(c.statusText));else if(c.status>0)try{const u=n(c.response);u.src=o,a(u)}catch(u){l(u)}},c.onerror=l,c.send()}catch(c){l(c)}}function s(o,a){let l=t[o];l?a(l):r[o]?r[o].push(a):(r[o]=[a],i(o,c=>{c.src=o,t[o]=c,r[o].forEach(u=>u(c)),delete r[o]}))}return function(o,a,{lang:l,fonts:c=[],style:u="normal",weight:f="normal",unicodeFontsURL:h}={}){const d=new Uint8Array(o.length),g=[];o.length||y();const _=new Map,p=[];if(u!=="italic"&&(u="normal"),typeof f!="number"&&(f=f==="bold"?700:400),c&&!Array.isArray(c)&&(c=[c]),c=c.slice().filter(M=>!M.lang||M.lang.test(l)).reverse(),c.length){let T=0;(function P($=0){for(let E=$,C=o.length;E<C;E++){const B=o.codePointAt(E);if(T===1&&g[d[E-1]].supportsCodePoint(B)||E>0&&/\s/.test(o[E]))d[E]=d[E-1],T===2&&(p[p.length-1][1]=E);else for(let Y=d[E],R=c.length;Y<=R;Y++)if(Y===R){const ne=T===2?p[p.length-1]:p[p.length]=[E,E];ne[1]=E,T=2}else{d[E]=Y;const{src:ne,unicodeRange:H}=c[Y];if(!H||v(B,H)){const re=t[ne];if(!re){s(ne,()=>{P(E)});return}if(re.supportsCodePoint(B)){let J=_.get(re);typeof J!="number"&&(J=g.length,g.push(re),_.set(re,J)),d[E]=J,T=1;break}}}B>65535&&E+1<C&&(d[E+1]=d[E],E++,T===2&&(p[p.length-1][1]=E))}m()})()}else p.push([0,o.length-1]),m();function m(){if(p.length){const M=p.map(A=>o.substring(A[0],A[1]+1)).join(`
`);e.getFontsForString(M,{lang:l||void 0,style:u,weight:f,dataUrl:h}).then(({fontUrls:A,chars:w})=>{const T=g.length;let P=0;p.forEach(E=>{for(let C=0,B=E[1]-E[0];C<=B;C++)d[E[0]+C]=w[P++]+T;P++});let $=0;A.forEach((E,C)=>{s(E,B=>{g[C+T]=B,++$===A.length&&y()})})})}else y()}function y(){a({chars:d,fonts:g})}function v(M,A){for(let w=0;w<A.length;w++){const[T,P=T]=A[w];if(T<=M&&M<=P)return!0}return!1}}}const Hw=bs({name:"FontResolver",dependencies:[zw,kw,Gw],init(n,e,t){return n(e,t())}});function Vw(n,e){const r=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,i="[^\\S\\u00A0]",s=new RegExp(`${i}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function o({text:g,lang:_,fonts:p,style:m,weight:y,preResolvedFonts:v,unicodeFontsURL:M},A){const w=({chars:T,fonts:P})=>{let $,E;const C=[];for(let B=0;B<T.length;B++)T[B]!==E?(E=T[B],C.push($={start:B,end:B,fontObj:P[T[B]]})):$.end=B;A(C)};v?w(v):n(g,w,{lang:_,fonts:p,style:m,weight:y,unicodeFontsURL:M})}function a({text:g="",font:_,lang:p,sdfGlyphSize:m=64,fontSize:y=400,fontWeight:v=1,fontStyle:M="normal",letterSpacing:A=0,lineHeight:w="normal",maxWidth:T=1/0,direction:P,textAlign:$="left",textIndent:E=0,whiteSpace:C="normal",overflowWrap:B="normal",anchorX:Y=0,anchorY:R=0,metricsOnly:ne=!1,unicodeFontsURL:H,preResolvedFonts:re=null,includeCaretPositions:J=!1,chunkedBoundsSize:K=8192,colorRanges:q=null},U){const X=f(),le={fontLoad:0,typesetting:0};g.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),g=g.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),y=+y,A=+A,T=+T,w=w||"normal",E=+E,o({text:g,lang:p,style:M,weight:v,fonts:typeof _=="string"?[{src:_}]:_,unicodeFontsURL:H,preResolvedFonts:re},N=>{le.fontLoad=f()-X;const V=isFinite(T);let oe=null,F=null,j=null,ee=null,me=null,de=null,x=null,I=null,O=0,Z=0,Q=C!=="nowrap";const ce=new Map,ie=f();let se=E,fe=0,b=new h;const S=[b];N.forEach(ye=>{const{fontObj:be}=ye,{ascender:ge,descender:Ee,unitsPerEm:Fe,lineGap:Te,capHeight:Be,xHeight:De}=be;let Se=ce.get(be);if(!Se){const we=y/Fe,z=w==="normal"?(ge-Ee+Te)*we:w*y,Le=(z-(ge-Ee)*we)/2,ae=Math.min(z,(ge-Ee)*we),Me=(ge+Ee)/2*we+ae/2;Se={index:ce.size,src:be.src,fontObj:be,fontSizeMult:we,unitsPerEm:Fe,ascender:ge*we,descender:Ee*we,capHeight:Be*we,xHeight:De*we,lineHeight:z,baseline:-Le-ge*we,caretTop:Me,caretBottom:Me-ae},ce.set(be,Se)}const{fontSizeMult:Ae}=Se,Ie=g.slice(ye.start,ye.end+1);let G,xe;be.forEachGlyph(Ie,y,A,(we,z,Le,ae)=>{z+=fe,ae+=ye.start,G=z,xe=we;const Me=g.charAt(ae),Pe=we.advanceWidth*Ae,Ge=b.count;let ke;if("isEmpty"in we||(we.isWhitespace=!!Me&&new RegExp(i).test(Me),we.canBreakAfter=!!Me&&s.test(Me),we.isEmpty=we.xMin===we.xMax||we.yMin===we.yMax||r.test(Me)),!we.isWhitespace&&!we.isEmpty&&Z++,Q&&V&&!we.isWhitespace&&z+Pe+se>T&&Ge){if(b.glyphAt(Ge-1).glyphObj.canBreakAfter)ke=new h,se=-z;else for(let nt=Ge;nt--;)if(nt===0&&B==="break-word"){ke=new h,se=-z;break}else if(b.glyphAt(nt).glyphObj.canBreakAfter){ke=b.splitAt(nt+1);const We=ke.glyphAt(0).x;se-=We;for(let Ye=ke.count;Ye--;)ke.glyphAt(Ye).x-=We;break}ke&&(b.isSoftWrapped=!0,b=ke,S.push(b),O=T)}let He=b.glyphAt(b.count);He.glyphObj=we,He.x=z+se,He.y=Le,He.width=Pe,He.charIndex=ae,He.fontData=Se,Me===`
`&&(b=new h,S.push(b),se=-(z+Pe+A*y)+E)}),fe=G+xe.advanceWidth*Ae+A*y});let k=0;S.forEach(ye=>{let be=!0;for(let ge=ye.count;ge--;){const Ee=ye.glyphAt(ge);be&&!Ee.glyphObj.isWhitespace&&(ye.width=Ee.x+Ee.width,ye.width>O&&(O=ye.width),be=!1);let{lineHeight:Fe,capHeight:Te,xHeight:Be,baseline:De}=Ee.fontData;Fe>ye.lineHeight&&(ye.lineHeight=Fe);const Se=De-ye.baseline;Se<0&&(ye.baseline+=Se,ye.cap+=Se,ye.ex+=Se),ye.cap=Math.max(ye.cap,ye.baseline+Te),ye.ex=Math.max(ye.ex,ye.baseline+Be)}ye.baseline-=k,ye.cap-=k,ye.ex-=k,k+=ye.lineHeight});let W=0,te=0;if(Y&&(typeof Y=="number"?W=-Y:typeof Y=="string"&&(W=-O*(Y==="left"?0:Y==="center"?.5:Y==="right"?1:c(Y)))),R&&(typeof R=="number"?te=-R:typeof R=="string"&&(te=R==="top"?0:R==="top-baseline"?-S[0].baseline:R==="top-cap"?-S[0].cap:R==="top-ex"?-S[0].ex:R==="middle"?k/2:R==="bottom"?k:R==="bottom-baseline"?-S[S.length-1].baseline:c(R)*k)),!ne){const ye=e.getEmbeddingLevels(g,P);oe=new Uint16Array(Z),F=new Uint8Array(Z),j=new Float32Array(Z*2),ee={},x=[1/0,1/0,-1/0,-1/0],I=[],J&&(de=new Float32Array(g.length*4)),q&&(me=new Uint8Array(Z*3));let be=0,ge=-1,Ee=-1,Fe,Te;if(S.forEach((Be,De)=>{let{count:Se,width:Ae}=Be;if(Se>0){let Ie=0;for(let ae=Se;ae--&&Be.glyphAt(ae).glyphObj.isWhitespace;)Ie++;let G=0,xe=0;if($==="center")G=(O-Ae)/2;else if($==="right")G=O-Ae;else if($==="justify"&&Be.isSoftWrapped){let ae=0;for(let Me=Se-Ie;Me--;)Be.glyphAt(Me).glyphObj.isWhitespace&&ae++;xe=(O-Ae)/ae}if(xe||G){let ae=0;for(let Me=0;Me<Se;Me++){let Pe=Be.glyphAt(Me);const Ge=Pe.glyphObj;Pe.x+=G+ae,xe!==0&&Ge.isWhitespace&&Me<Se-Ie&&(ae+=xe,Pe.width+=xe)}}const we=e.getReorderSegments(g,ye,Be.glyphAt(0).charIndex,Be.glyphAt(Be.count-1).charIndex);for(let ae=0;ae<we.length;ae++){const[Me,Pe]=we[ae];let Ge=1/0,ke=-1/0;for(let He=0;He<Se;He++)if(Be.glyphAt(He).charIndex>=Me){let nt=He,We=He;for(;We<Se;We++){let Ye=Be.glyphAt(We);if(Ye.charIndex>Pe)break;We<Se-Ie&&(Ge=Math.min(Ge,Ye.x),ke=Math.max(ke,Ye.x+Ye.width))}for(let Ye=nt;Ye<We;Ye++){const mt=Be.glyphAt(Ye);mt.x=ke-(mt.x+mt.width-Ge)}break}}let z;const Le=ae=>z=ae;for(let ae=0;ae<Se;ae++){const Me=Be.glyphAt(ae);z=Me.glyphObj;const Pe=z.index,Ge=ye.levels[Me.charIndex]&1;if(Ge){const ke=e.getMirroredCharacter(g[Me.charIndex]);ke&&Me.fontData.fontObj.forEachGlyph(ke,0,0,Le)}if(J){const{charIndex:ke,fontData:He}=Me,nt=Me.x+W,We=Me.x+Me.width+W;de[ke*4]=Ge?We:nt,de[ke*4+1]=Ge?nt:We,de[ke*4+2]=Be.baseline+He.caretBottom+te,de[ke*4+3]=Be.baseline+He.caretTop+te;const Ye=ke-ge;Ye>1&&u(de,ge,Ye),ge=ke}if(q){const{charIndex:ke}=Me;for(;ke>Ee;)Ee++,q.hasOwnProperty(Ee)&&(Te=q[Ee])}if(!z.isWhitespace&&!z.isEmpty){const ke=be++,{fontSizeMult:He,src:nt,index:We}=Me.fontData,Ye=ee[nt]||(ee[nt]={});Ye[Pe]||(Ye[Pe]={path:z.path,pathBounds:[z.xMin,z.yMin,z.xMax,z.yMax]});const mt=Me.x+W,Ot=Me.y+Be.baseline+te;j[ke*2]=mt,j[ke*2+1]=Ot;const Qt=mt+z.xMin*He,un=Ot+z.yMin*He,Vn=mt+z.xMax*He,en=Ot+z.yMax*He;Qt<x[0]&&(x[0]=Qt),un<x[1]&&(x[1]=un),Vn>x[2]&&(x[2]=Vn),en>x[3]&&(x[3]=en),ke%K===0&&(Fe={start:ke,end:ke,rect:[1/0,1/0,-1/0,-1/0]},I.push(Fe)),Fe.end++;const Ct=Fe.rect;if(Qt<Ct[0]&&(Ct[0]=Qt),un<Ct[1]&&(Ct[1]=un),Vn>Ct[2]&&(Ct[2]=Vn),en>Ct[3]&&(Ct[3]=en),oe[ke]=Pe,F[ke]=We,q){const Wn=ke*3;me[Wn]=Te>>16&255,me[Wn+1]=Te>>8&255,me[Wn+2]=Te&255}}}}}),de){const Be=g.length-ge;Be>1&&u(de,ge,Be)}}const he=[];ce.forEach(({index:ye,src:be,unitsPerEm:ge,ascender:Ee,descender:Fe,lineHeight:Te,capHeight:Be,xHeight:De})=>{he[ye]={src:be,unitsPerEm:ge,ascender:Ee,descender:Fe,lineHeight:Te,capHeight:Be,xHeight:De}}),le.typesetting=f()-ie,U({glyphIds:oe,glyphFontIndices:F,glyphPositions:j,glyphData:ee,fontData:he,caretPositions:de,glyphColors:me,chunkedBounds:I,fontSize:y,topBaseline:te+S[0].baseline,blockBounds:[W,te-k,W+O,te],visibleBounds:x,timings:le})})}function l(g,_){a({...g,metricsOnly:!0},p=>{const[m,y,v,M]=p.blockBounds;_({width:v-m,height:M-y})})}function c(g){let _=g.match(/^([\d.]+)%$/),p=_?parseFloat(_[1]):NaN;return isNaN(p)?0:p/100}function u(g,_,p){const m=g[_*4],y=g[_*4+1],v=g[_*4+2],M=g[_*4+3],A=(y-m)/p;for(let w=0;w<p;w++){const T=(_+w)*4;g[T]=m+A*w,g[T+1]=m+A*(w+1),g[T+2]=v,g[T+3]=M}}function f(){return(self.performance||Date).now()}function h(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(g){let _=h.flyweight;return _.data=this.data,_.index=g,_},splitAt(g){let _=new h;return _.data=this.data.splice(g*d.length),_}},h.flyweight=d.reduce((g,_,p,m)=>(Object.defineProperty(g,_,{get(){return this.data[this.index*d.length+p]},set(y){this.data[this.index*d.length+p]=y}}),g),{data:null,index:0}),{typeset:a,measure:l}}const gr=()=>(self.performance||Date).now(),rl=Ag();let ip;function Ww(n,e,t,r,i,s,o,a,l,c,u=!0){return u?jw(n,e,t,r,i,s,o,a,l,c).then(null,f=>(ip||(console.warn("WebGL SDF generation failed, falling back to JS",f),ip=!0),sp(n,e,t,r,i,s,o,a,l,c))):sp(n,e,t,r,i,s,o,a,l,c)}const ba=[],Xw=5;let $c=0;function Cg(){const n=gr();for(;ba.length&&gr()-n<Xw;)ba.shift()();$c=ba.length?setTimeout(Cg,0):0}const jw=(...n)=>new Promise((e,t)=>{ba.push(()=>{const r=gr();try{rl.webgl.generateIntoCanvas(...n),e({timing:gr()-r})}catch(i){t(i)}}),$c||($c=setTimeout(Cg,0))}),Yw=4,qw=2e3,rp={};let Kw=0;function sp(n,e,t,r,i,s,o,a,l,c){const u="TroikaTextSDFGenerator_JS_"+Kw++%Yw;let f=rp[u];return f||(f=rp[u]={workerModule:bs({name:u,workerId:u,dependencies:[Ag,gr],init(h,d){const g=h().javascript.generate;return function(..._){const p=d();return{textureData:g(..._),timing:d()-p}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),f.requests++,clearTimeout(f.idleTimer),f.workerModule(n,e,t,r,i,s).then(({textureData:h,timing:d})=>{const g=gr(),_=new Uint8Array(h.length*4);for(let p=0;p<h.length;p++)_[p*4+c]=h[p];return rl.webglUtils.renderImageData(o,_,a,l,n,e,1<<3-c),d+=gr()-g,--f.requests===0&&(f.idleTimer=setTimeout(()=>{ww(u)},qw)),{timing:d}})}function Zw(n){n._warm||(rl.webgl.isSupported(n),n._warm=!0)}const Jw=rl.webglUtils.resizeWebGLCanvasWithoutClearing,Ys={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},$w=new Ue;function Vr(){return(self.performance||Date).now()}const op=Object.create(null);function Qw(n,e){n=tA({},n);const t=Vr(),r=[];if(n.font&&r.push({label:"user",src:nA(n.font)}),n.font=r,n.text=""+n.text,n.sdfGlyphSize=n.sdfGlyphSize||Ys.sdfGlyphSize,n.unicodeFontsURL=n.unicodeFontsURL||Ys.unicodeFontsURL,n.colorRanges!=null){let h={};for(let d in n.colorRanges)if(n.colorRanges.hasOwnProperty(d)){let g=n.colorRanges[d];typeof g!="number"&&(g=$w.set(g).getHex()),h[d]=g}n.colorRanges=h}Object.freeze(n);const{textureWidth:i,sdfExponent:s}=Ys,{sdfGlyphSize:o}=n,a=i/o*4;let l=op[o];if(!l){const h=document.createElement("canvas");h.width=i,h.height=o*256/a,l=op[o]={glyphCount:0,sdfGlyphSize:o,sdfCanvas:h,sdfTexture:new wt(h,void 0,void 0,void 0,Pt,Pt),contextLost:!1,glyphsByFont:new Map},l.sdfTexture.generateMipmaps=!1,eA(l)}const{sdfTexture:c,sdfCanvas:u}=l;Ug(n).then(h=>{const{glyphIds:d,glyphFontIndices:g,fontData:_,glyphPositions:p,fontSize:m,timings:y}=h,v=[],M=new Float32Array(d.length*4);let A=0,w=0;const T=Vr(),P=_.map(Y=>{let R=l.glyphsByFont.get(Y.src);return R||l.glyphsByFont.set(Y.src,R=new Map),R});d.forEach((Y,R)=>{const ne=g[R],{src:H,unitsPerEm:re}=_[ne];let J=P[ne].get(Y);if(!J){const{path:le,pathBounds:N}=h.glyphData[H][Y],V=Math.max(N[2]-N[0],N[3]-N[1])/o*(Ys.sdfMargin*o+.5),oe=l.glyphCount++,F=[N[0]-V,N[1]-V,N[2]+V,N[3]+V];P[ne].set(Y,J={path:le,atlasIndex:oe,sdfViewBox:F}),v.push(J)}const{sdfViewBox:K}=J,q=p[w++],U=p[w++],X=m/re;M[A++]=q+K[0]*X,M[A++]=U+K[1]*X,M[A++]=q+K[2]*X,M[A++]=U+K[3]*X,d[R]=J.atlasIndex}),y.quads=(y.quads||0)+(Vr()-T);const $=Vr();y.sdf={};const E=u.height,C=Math.ceil(l.glyphCount/a),B=Math.pow(2,Math.ceil(Math.log2(C*o)));B>E&&(console.info(`Increasing SDF texture size ${E}->${B}`),Jw(u,i,B),c.dispose()),Promise.all(v.map(Y=>Lg(Y,l,n.gpuAccelerateSDF).then(({timing:R})=>{y.sdf[Y.atlasIndex]=R}))).then(()=>{v.length&&!l.contextLost&&(Pg(l),c.needsUpdate=!0),y.sdfTotal=Vr()-$,y.total=Vr()-t,e(Object.freeze({parameters:n,sdfTexture:c,sdfGlyphSize:o,sdfExponent:s,glyphBounds:M,glyphAtlasIndices:d,glyphColors:h.glyphColors,caretPositions:h.caretPositions,chunkedBounds:h.chunkedBounds,ascender:h.ascender,descender:h.descender,lineHeight:h.lineHeight,capHeight:h.capHeight,xHeight:h.xHeight,topBaseline:h.topBaseline,blockBounds:h.blockBounds,visibleBounds:h.visibleBounds,timings:h.timings}))})}),Promise.resolve().then(()=>{l.contextLost||Zw(u)})}function Lg({path:n,atlasIndex:e,sdfViewBox:t},{sdfGlyphSize:r,sdfCanvas:i,contextLost:s},o){if(s)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:l}=Ys,c=Math.max(t[2]-t[0],t[3]-t[1]),u=Math.floor(e/4),f=u%(a/r)*r,h=Math.floor(u/(a/r))*r,d=e%4;return Ww(r,r,n,t,c,l,i,f,h,d,o)}function eA(n){const e=n.sdfCanvas;e.addEventListener("webglcontextlost",t=>{console.log("Context Lost",t),t.preventDefault(),n.contextLost=!0}),e.addEventListener("webglcontextrestored",t=>{console.log("Context Restored",t),n.contextLost=!1;const r=[];n.glyphsByFont.forEach(i=>{i.forEach(s=>{r.push(Lg(s,n,!0))})}),Promise.all(r).then(()=>{Pg(n),n.sdfTexture.needsUpdate=!0})})}function tA(n,e){for(let t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}let ha;function nA(n){return ha||(ha=typeof document>"u"?{}:document.createElement("a")),ha.href=n,ha.href}function Pg(n){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:e,sdfTexture:t}=n,{width:r,height:i}=e,s=n.sdfCanvas.getContext("webgl");let o=t.image.data;(!o||o.length!==r*i*4)&&(o=new Uint8Array(r*i*4),t.image={width:r,height:i,data:o},t.flipY=!1,t.isDataTexture=!0),s.readPixels(0,0,r,i,s.RGBA,s.UNSIGNED_BYTE,o)}}const iA=bs({name:"Typesetter",dependencies:[Vw,Hw,Rw],init(n,e,t){return n(e,t())}}),Ug=bs({name:"Typesetter",dependencies:[iA],init(n){return function(e){return new Promise(t=>{n.typeset(e,t)})}},getTransferables(n){const e=[];for(let t in n)n[t]&&n[t].buffer&&e.push(n[t].buffer);return e}});Ug.onMainThread;const ap={};function rA(n){let e=ap[n];return e||(e=ap[n]=new je(1,1,n,n).translate(.5,.5,0)),e}const sA="aTroikaGlyphBounds",lp="aTroikaGlyphIndex",oA="aTroikaGlyphColor";class aA extends d1{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Hn,this.boundingBox=new zn}computeBoundingSphere(){}computeBoundingBox(){}set detail(e){if(e!==this._detail){this._detail=e,(typeof e!="number"||e<1)&&(e=1);let t=rA(e);["position","normal","uv"].forEach(r=>{this.attributes[r]=t.attributes[r].clone()}),this.setIndex(t.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,t,r,i,s){this.updateAttributeData(sA,e,4),this.updateAttributeData(lp,t,1),this.updateAttributeData(oA,s,3),this._blockBounds=r,this._chunkedBounds=i,this.instanceCount=t.length,this._updateBounds()}_updateBounds(){const e=this._blockBounds;if(e){const{curveRadius:t,boundingBox:r}=this;if(t){const{PI:i,floor:s,min:o,max:a,sin:l,cos:c}=Math,u=i/2,f=i*2,h=Math.abs(t),d=e[0]/h,g=e[2]/h,_=s((d+u)/f)!==s((g+u)/f)?-h:o(l(d)*h,l(g)*h),p=s((d-u)/f)!==s((g-u)/f)?h:a(l(d)*h,l(g)*h),m=s((d+i)/f)!==s((g+i)/f)?h*2:a(h-c(d)*h,h-c(g)*h);r.min.set(_,e[1],t<0?-m:0),r.max.set(p,e[3],t<0?0:m)}else r.min.set(e[0],e[1],0),r.max.set(e[2],e[3],0);r.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let t=this.getAttribute(lp).count,r=this._chunkedBounds;if(r)for(let i=r.length;i--;){t=r[i].end;let s=r[i].rect;if(s[1]<e.w&&s[3]>e.y&&s[0]<e.z&&s[2]>e.x)break}this.instanceCount=t}updateAttributeData(e,t,r){const i=this.getAttribute(e);t?i&&i.array.length===t.length?(i.array.set(t),i.needsUpdate=!0):(this.setAttribute(e,new Na(t,r)),delete this._maxInstanceCount,this.dispose()):i&&this.deleteAttribute(e)}}const lA=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,cA=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,uA=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,fA=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function hA(n){const e=Jc(n,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new Ce},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new pt(0,0,0,0)},uTroikaClipRect:{value:new pt(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new Ce},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Ue},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new Qe},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:lA,vertexTransform:cA,fragmentDefs:uA,fragmentColorTransform:fA,customRewriter({vertexShader:t,fragmentShader:r}){let i=/\buniform\s+vec3\s+diffuse\b/;return i.test(r)&&(r=r.replace(i,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),i.test(t)||(t=t.replace(Rg,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:t,fragmentShader:r}}});return e.transparent=!0,e.forceSinglePass=!0,Object.defineProperties(e,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),e}const Bu=new rt({color:16777215,side:Un,transparent:!0}),cp=8421504,up=new Je,da=new D,_c=new D,Ws=[],dA=new D,vc="+x+y";function fp(n){return Array.isArray(n)?n[0]:n}let Dg=()=>{const n=new at(new je(1,1),Bu);return Dg=()=>n,n},Ig=()=>{const n=new at(new je(1,1,32,1),Bu);return Ig=()=>n,n};const pA={type:"syncstart"},mA={type:"synccomplete"},Fg=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],gA=Fg.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class ot extends at{constructor(){const e=new aA;super(e,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=cp,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=vc,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(pA),Qw({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},t=>{this._isSyncing=!1,this._textRenderInfo=t,this.geometry.updateGlyphs(t.glyphBounds,t.glyphAtlasIndices,t.blockBounds,t.chunkedBounds,t.glyphColors);const r=this._queuedSyncs;r&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{r.forEach(i=>i&&i())})),this.dispatchEvent(mA),e&&e()})))}onBeforeRender(e,t,r,i,s,o){this.sync(),s.isTroikaTextMaterial&&this._prepareForRender(s)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(e){return hA(e)}get material(){let e=this._derivedMaterial;const t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=Bu.clone());if((!e||!e.isDerivedFrom(t))&&(e=this._derivedMaterial=this.createDerivedMaterial(t),t.addEventListener("dispose",function r(){t.removeEventListener("dispose",r),e.dispose()})),this.hasOutline()){let r=e._outlineMtl;return r||(r=e._outlineMtl=Object.create(e,{id:{value:e.id+.1}}),r.isTextOutlineMaterial=!0,r.depthWrite=!1,r.map=null,e.addEventListener("dispose",function i(){e.removeEventListener("dispose",i),r.dispose()})),[r,e]}else return e}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return fp(this.material).getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return fp(this.material).getDistanceMaterial()}set customDistanceMaterial(e){}_prepareForRender(e){const t=e.isTextOutlineMaterial,r=e.uniforms,i=this.textRenderInfo;if(i){const{sdfTexture:a,blockBounds:l}=i;r.uTroikaSDFTexture.value=a,r.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),r.uTroikaSDFGlyphSize.value=i.sdfGlyphSize,r.uTroikaSDFExponent.value=i.sdfExponent,r.uTroikaTotalBounds.value.fromArray(l),r.uTroikaUseGlyphColors.value=!t&&!!i.glyphColors;let c=0,u=0,f=0,h,d,g,_=0,p=0;if(t){let{outlineWidth:y,outlineOffsetX:v,outlineOffsetY:M,outlineBlur:A,outlineOpacity:w}=this;c=this._parsePercent(y)||0,u=Math.max(0,this._parsePercent(A)||0),h=w,_=this._parsePercent(v)||0,p=this._parsePercent(M)||0}else f=Math.max(0,this._parsePercent(this.strokeWidth)||0),f&&(g=this.strokeColor,r.uTroikaStrokeColor.value.set(g??cp),d=this.strokeOpacity,d==null&&(d=1)),h=this.fillOpacity;r.uTroikaEdgeOffset.value=c,r.uTroikaPositionOffset.value.set(_,p),r.uTroikaBlurRadius.value=u,r.uTroikaStrokeWidth.value=f,r.uTroikaStrokeOpacity.value=d,r.uTroikaFillOpacity.value=h??1,r.uTroikaCurveRadius.value=this.curveRadius||0;let m=this.clipRect;if(m&&Array.isArray(m)&&m.length===4)r.uTroikaClipRect.value.fromArray(m);else{const y=(this.fontSize||.1)*100;r.uTroikaClipRect.value.set(l[0]-y,l[1]-y,l[2]+y,l[3]+y)}this.geometry.applyClipRect(r.uTroikaClipRect.value)}r.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;const s=t?this.outlineColor||0:this.color;if(s==null)delete e.color;else{const a=e.hasOwnProperty("color")?e.color:e.color=new Ue;(s!==a._input||typeof s=="object")&&a.set(a._input=s)}let o=this.orientation||vc;if(o!==e._orientation){let a=r.uTroikaOrient.value;o=o.replace(/[^-+xyz]/g,"");let l=o!==vc&&o.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,c,u,f,h]=l;da.set(0,0,0)[u]=c==="-"?1:-1,_c.set(0,0,0)[h]=f==="-"?-1:1,up.lookAt(dA,da.cross(_c),_c),a.setFromMatrix4(up)}else a.identity();e._orientation=o}}_parsePercent(e){if(typeof e=="string"){let t=e.match(/^(-?[\d.]+)%$/),r=t?parseFloat(t[1]):NaN;e=(isNaN(r)?0:r/100)*this.fontSize}return e}localPositionToTextCoords(e,t=new Ce){t.copy(e);const r=this.curveRadius;return r&&(t.x=Math.atan2(e.x,Math.abs(r)-Math.abs(e.z))*Math.abs(r)),t}worldPositionToTextCoords(e,t=new Ce){return da.copy(e),this.localPositionToTextCoords(this.worldToLocal(da),t)}raycast(e,t){const{textRenderInfo:r,curveRadius:i}=this;if(r){const s=r.blockBounds,o=i?Ig():Dg(),a=o.geometry,{position:l,uv:c}=a.attributes;for(let u=0;u<c.count;u++){let f=s[0]+c.getX(u)*(s[2]-s[0]);const h=s[1]+c.getY(u)*(s[3]-s[1]);let d=0;i&&(d=i-Math.cos(f/i)*i,f=Math.sin(f/i)*i),l.setXYZ(u,f,h,d)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,o.matrixWorld=this.matrixWorld,o.material.side=this.material.side,Ws.length=0,o.raycast(e,Ws);for(let u=0;u<Ws.length;u++)Ws[u].object=this,t.push(Ws[u])}}copy(e){const t=this.geometry;return super.copy(e),this.geometry=t,gA.forEach(r=>{this[r]=e[r]}),this}clone(){return new this.constructor().copy(this)}}Fg.forEach(n=>{const e="_private_"+n;Object.defineProperty(ot.prototype,n,{get(){return this[e]},set(t){t!==this[e]&&(this[e]=t,this._needsSync=!0)}})});new zn;new Ue;async function Yi(n,e,t,r,i,s={iconGeometry:new je(.1,.1),iconRotation:new D(0,-Math.PI/2,0),textColor:new Ue,fontSize:.02}){const o=await il(e),a=new rt({map:o,transparent:!0,alphaTest:.5}),l=new at(s.iconGeometry,a);i.add(l),l.rotation.x=s.iconRotation.x,l.rotation.y=s.iconRotation.y,l.rotation.z=s.iconRotation.z,l.position.copy(t);const c=new ot;return c.fontSize=s.fontSize,c.color=s.textColor||new Ue,l.add(c),c.text=n,c.position.x-=r.x,c.position.y-=r.y,c.sync(),l}let hp=0,Ng=[];function Og(){for(var n of Ng)n()}async function So(n,e,t,r,i={windowGeometry:new je(.1,.1),windowMaterial:new rt,fontMaterial:new rt,fontSize:1,dragBoundaries:{zMin:0,zMax:10,yMin:0,yMax:10},logoIconOffset:null,closeBtnOffset:null,disableDrag:!1,useHeaderForDrag:!1}){hp++,e.x+=hp*.001;const s=new at(i.windowGeometry,i.windowMaterial);t.add(s),s.rotation.y=-Math.PI/2,s.position.copy(e);const o=await il(n),a=new rt({map:o,transparent:!0,alphaTest:.5}),l=new at(new je(.06,.06),a);s.add(l),l.position.set(-.47,.27,0),i.logoIconOffset&&l.position.add(i.logoIconOffset);const c=new D(.47,.27,0);i.closeBtnOffset&&c.add(i.closeBtnOffset);const u=await Yi("","/icons/square-xmark-solid-fontawesome.png",c,new D,s,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),fontSize:.02}),f=new at(new je(i.windowGeometry.parameters.width,.06),new ft({color:3355443,emissive:3355443}));s.add(f),f.position.set(0,.27,0),s.visible=!1;const h=new D().copy(s.position);h.copy(s.position),s.position.set(99,0,0);const d=()=>{s.visible||(Og(),s.position.copy(h),s.visible=!0)},g=()=>{s.visible&&(s.visible=!1,h.copy(s.position),s.position.set(99,0,0))},_=()=>{s.visible?g():d()};if(xi(u,r,()=>{g()}),i.disableDrag!==!0){const p=i.useHeaderForDrag===!0?f:s;yg(p,r,(m,y,v)=>{},()=>{},(m,y,v)=>{s.position.set(s.position.x,s.position.y-v.y*.6,s.position.z-v.x*1),s.position.z<i.dragBoundaries.zMin?s.position.z=i.dragBoundaries.zMin:s.position.z>i.dragBoundaries.zMax&&(s.position.z=i.dragBoundaries.zMax),s.position.y<i.dragBoundaries.yMin?s.position.y=i.dragBoundaries.yMin:s.position.y>i.dragBoundaries.yMax&&(s.position.y=i.dragBoundaries.yMax)})}return Ng.push(g),{windowMesh:s,showWindow:d,hideWindow:g,toggleWindow:_}}async function _A(n,e){const{windowMesh:t,toggleWindow:r}=await So("/icons/globeIcon.png",new D(.355,2.15,0),n.__mesh,e,{windowGeometry:new je(1,.6),windowMaterial:new rt,fontMaterial:new rt({color:new Ue(0).setHex(1122867)}),dragBoundaries:{zMin:-.25535714285714217,zMax:.2553571428571435,yMin:2.0891841779975326,yMax:2.2389987639060496},disableDrag:!1,useHeaderForDrag:!0}),i={__draggingOffset:new D,__mesh:t,__createButton:async(l,c,u,f,h,d,g)=>{const _=await Yi(l,c,u,f,d,g);return xi(_,e,()=>{d.visible&&h()}),_},toggle:()=>r(),websites:{},website:null},s=new at(new je(.8,.04),new rt({color:new Ue(0).setHex(16777215)}));i.__mesh.add(s),s.position.set(0,.27,0);const o=new ot;i.__mesh.add(o),o.fontSize=.02,o.position.x=-.384,o.position.y=.285,o.color=0;const a=new ot;return i.__mesh.add(a),a.text="Page not found (404)",a.fontSize=.02,a.position.x=-.1,a.position.y=-.015,a.color=0,a.sync(),a.visible=!1,i.setWebsite=l=>{o.text=l,o.sync(),i.website&&(i.website.wrapper.visible=!1,i.website=null),i.websites[l]?(i.website=i.websites[l],i.website.wrapper.visible=!0,a.visible=!1):a.visible=!0},i.createWebsite=(l,c)=>{const u=new at(new je(1,.54),new rt({color:new Ue(0).setHex(14540253)}));i.__mesh.add(u),u.visible=!1,u.position.set(0,-.03,0),c(u),i.websites[l]={wrapper:u,address:l}},i.createWebsite("http://localhost:5173/about",async l=>{const c=new at(new je(.8,.06),new rt({color:new Ue(0).setHex(16777215)}));l.add(c),c.position.set(0,.21,0);const u=new ot;l.add(u),u.text="About",u.fontSize=.025,u.position.x=-.384,u.position.y=.227,u.color=0,u.sync(),await i.__createButton("projects","/icons/box-archive-solid-fontawesome.png",new D(.355,.217,.01),new Ce(.029,.014),()=>i.setWebsite("http://localhost:5173/projects"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015});const f=new at(new je(.8,.37),new rt({color:new Ue(0).setHex(16777215)}));l.add(f),f.position.set(0,-.03,0);const h=new ot;l.add(h),h.text="Hi, I'm Nicolai 👋",h.fontSize=.02,h.position.x=-.384,h.position.y=.13,h.color=0,h.sync();const d=new ot;l.add(d),d.text=`Welcome to my website! I'm a full-stack developer from Denmark who enjoys building things —
sometimes practical, sometimes experimental, always driven by curiosity.

I have a background in computer science and years of hands-on experience building everything from
web platforms to multiplayer game systems. My stack includes tools like JavaScript/TypeScript,
Node.js, React, MySQL, MongoDB, and WebSocket, and I often work with technologies like Docker,
Unity, and Blender.

Whether it's crafting backend systems, designing frontend interfaces, or exploring new tech,
I'm always up for a challenge. Take a look around!`,d.fontSize=.015,d.position.x=-.384,d.position.y=.1,d.color=0,d.sync();const g=new ot;l.add(g),g.text="Connect with me:",g.fontSize=.02,g.position.x=-.384,g.position.y=-.16,g.color=0,g.sync(),await i.__createButton("GitHub","/icons/github-brands-fontawesome.png",new D(.35,-.163,.008),new Ce(.025,.014),()=>window.open("https://github.com/niiicolai","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015}),await i.__createButton("LinkedIn","/icons/linkedin-brands-fontawesome.png",new D(.275,-.163,.008),new Ce(.028,.014),()=>window.open("https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015})}),i.createWebsite("http://localhost:5173/projects",async l=>{await i.__createButton("back","/icons/left-long-solid-fontawesome.png",new D(-.365,.217,.008),new Ce(.017,.014),()=>i.setWebsite("http://localhost:5173/about"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015});const c=new at(new je(.8,.47),new rt({color:new Ue(0).setHex(16777215)}));l.add(c),c.position.set(0,.01,0);const u=new ot;l.add(u),u.text="Find some of my personal projects below:",u.fontSize=.02,u.position.x=-.334,u.position.y=.23,u.color=0,u.sync();const f=new ot;l.add(f),f.text="🧠 SAR CPU Data Analyzer:",f.fontSize=.018,f.position.x=-.384,f.position.y=.16,f.color=0,f.sync();const h=new ot;l.add(h),h.text="A small Python tool I made to test and visualize CPU usage data.",h.fontSize=.015,h.position.x=-.384,h.position.y=.13,h.color=0,h.sync(),await i.__createButton("GitHub","/icons/github-brands-fontawesome.png",new D(.355,.143,.008),new Ce(.025,.014),()=>window.open("https://github.com/niiicolai/sar-cpu-data-analyzer","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015});const d=new ot;l.add(d),d.text="🌌 Europa: The Celestial Quest",d.fontSize=.018,d.position.x=-.384,d.position.y=.1,d.color=0,d.sync();const g=new ot;l.add(g),g.text="The Celestial Quest: A browser-based real-time strategy game set in space.",g.fontSize=.015,g.position.x=-.384,g.position.y=.07,g.color=0,g.sync(),await i.__createButton("Video","/icons/youtube-brands-fontawesome.png",new D(.295,.083,.008),new Ce(.02,.014),()=>window.open("https://www.youtube.com/watch?v=gc0yM8eqkV0","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015}),await i.__createButton("GitHub","/icons/github-brands-fontawesome.png",new D(.355,.083,.008),new Ce(.025,.014),()=>window.open("https://github.com/niiicolai-apps/europa-celestial-quest","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015});const _=new ot;l.add(_),_.text="🛍️ VR Webshop",_.fontSize=.018,_.position.x=-.384,_.position.y=.04,_.color=0,_.sync();const p=new ot;l.add(p),p.text="An experiment to combine VR, 3D tools, and ecommerce.",p.fontSize=.015,p.position.x=-.384,p.position.y=.01,p.color=0,p.sync(),await i.__createButton("Video","/icons/youtube-brands-fontawesome.png",new D(.295,.023,.008),new Ce(.02,.014),()=>window.open("https://www.youtube.com/watch?v=gZ16FViAOOE","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015}),await i.__createButton("GitHub","/icons/github-brands-fontawesome.png",new D(.355,.023,.008),new Ce(.025,.014),()=>window.open("https://github.com/VR-web-shop","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015});const m=new ot;l.add(m),m.text="🤖 AI Code Editor",m.fontSize=.018,m.position.x=-.384,m.position.y=-.02,m.color=0,m.sync();const y=new ot;l.add(y),y.text="An early attempt at building a code editor powered by AI with tool-calling support.",y.fontSize=.015,y.position.x=-.384,y.position.y=-.05,y.color=0,y.sync(),await i.__createButton("GitHub","/icons/github-brands-fontawesome.png",new D(.355,-.04,.008),new Ce(.025,.014),()=>window.open("https://github.com/niiicolai/ai-editor","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015});const v=new ot;l.add(v),v.text="💬 Chat App",v.fontSize=.018,v.position.x=-.384,v.position.y=-.08,v.color=0,v.sync();const M=new ot;l.add(M),M.text="A full-featured real-time chat application with frontends in both Vue and React.",M.fontSize=.015,M.position.x=-.384,M.position.y=-.11,M.color=0,M.sync(),await i.__createButton("GitHub","/icons/github-brands-fontawesome.png",new D(.355,-.1,.008),new Ce(.025,.014),()=>window.open("https://github.com/niiicolai/chat-app","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015});const A=new ot;l.add(A),A.text="🎥 Custom Video Player",A.fontSize=.018,A.position.x=-.384,A.position.y=-.14,A.color=0,A.sync();const w=new ot;l.add(w),w.text="A lightweight video player written in plain HTML, CSS, and JS.",w.fontSize=.015,w.position.x=-.384,w.position.y=-.17,w.color=0,w.sync(),await i.__createButton("Tutorial","/icons/medium-brands-fontawesome.png",new D(.295,-.16,.008),new Ce(.025,.014),()=>window.open("https://medium.com/better-programming/a-tutorial-to-the-html-video-element-b8b9a4bf2f76","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015}),await i.__createButton("GitHub","/icons/github-brands-fontawesome.png",new D(.355,-.16,.008),new Ce(.025,.014),()=>window.open("https://github.com/niiicolai/video-player","_blank"),l,{iconGeometry:new je(.03,.03),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.015})}),i.setWebsite("http://localhost:5173/about"),i}function vA(n,e){const t={__createButton:async(l,c,u,f,h,d={iconGeometry:new je(.1,.1),iconRotation:new D(0,-Math.PI/2,0),textColor:new Ue,fontSize:.02})=>{const g=await Yi(l,c,u,f,n.__mesh,d);xi(g,e,()=>{n.__mesh.visible&&h()})}};t.__createButton("Browser","/icons/globeIcon.png",new D(.36,2.45,-.65),new Ce(.04,.027),()=>n.browser.toggle()),t.__createButton("Light App","/icons/lightbulbIcon.png",new D(.36,2.33,-.65),new Ce(.045,.033),()=>n.lightApp.toggle()),t.__createButton("Paint App","/icons/paintingIcon.png",new D(.36,2.205,-.65),new Ce(.045,.033),()=>n.paint.toggle()),t.__createButton("Snake Game","/icons/snakegameIcon.png",new D(.36,2.08,-.65),new Ce(.055,.033),()=>n.snake.toggle()),t.__createButton("Trashbin","/icons/trashIcon.png",new D(.36,1.93,.6),new Ce(.04,.033),()=>n.trash.toggle());const r=20,i=[],s=new Uu(.005,6,6),o=new rt({color:16777215}),a={yMin:1.8,yMax:2.535,zMin:-.755,zMax:.755};for(let l=0;l<r;l++){const c=new at(s,o.clone());c.position.set(.365,a.yMin+Math.random()*(a.yMax-a.yMin),a.zMin+Math.random()*(a.zMax-a.zMin));const u=.58+Math.random()*.08,f=.5+Math.random()*.5,h=.4+Math.random()*.3;c.material.color.setHSL(u,f,h),n.__mesh.add(c),i.push({mesh:c,velocity:new D(0,(Math.random()-.5)*.001,(Math.random()-.5)*.001)})}return xo.addEventListener("loopEvent",()=>{for(const l of i)l.mesh.position.add(l.velocity),(l.mesh.position.y>a.yMax||l.mesh.position.y<a.yMin)&&(l.velocity.y*=-1),(l.mesh.position.z>a.zMax||l.mesh.position.z<a.zMin)&&(l.velocity.z*=-1)}),t}function xA(n,e){const r={__mesh:n.__mesh.children[0].children.find(a=>a.name=="Monitor_StartBar"),__createButton:async(a,l,c,u,f)=>{const h=await Yi(a,l,c,u,n.__mesh,{iconGeometry:new je(.07,.07),iconRotation:new D(0,-Math.PI/2,0),fontSize:.02});xi(h,e,()=>{n.__mesh.visible&&f()})}};r.__createButton("","/icons/startIcon.png",new D(.36,1.757,-0),new Ce(0,0),()=>n.startMenu.toggle()),r.__createButton("","/icons/globeIcon.png",new D(.36,1.757,.06),new Ce(0,0),()=>n.browser.toggle());const i=new ot;i.fontSize=.018,r.__mesh.add(i),i.color=new Ue().setHex(16777215),i.rotation.y=-Math.PI/2,i.position.x=-.005,i.position.y=.025,i.position.z=.666;const s=new ot;s.fontSize=.018,r.__mesh.add(s),s.color=new Ue().setHex(16777215),s.rotation.y=-Math.PI/2,s.position.x=-.005,s.position.y=.005,s.position.z=.658;const o=()=>{const a=new Date;i.text=a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),s.text=new Date().toLocaleDateString(),i.sync(),s.sync()};return xo.addEventListener("loopEvent",()=>o()),o(),r}function yA(n,e){const r={__mesh:n.__mesh.children[0].children.find(i=>i.name=="Monitor_StartMenu"),__createButton:async(i,s,o,a,l)=>{const c=await Yi(i,s,o,a,r.__mesh,{iconGeometry:new je(.4,.4),iconRotation:new D(-Math.PI/2,0,-Math.PI/2),fontSize:.08,textColor:new Ue().setHex(0)});xi(c,e,()=>{r.__mesh.visible&&l()})}};return r.toggle=()=>{r.__mesh.visible=!r.__mesh.visible},r.__createButton("Browser","/icons/globeIcon.png",new D(1.2,.02,-.6),new Ce(.16,.137),()=>{n.browser.toggle(),n.startMenu.toggle()}),r.__createButton("Light App","/icons/lightbulbIcon.png",new D(1.2,.02,0),new Ce(.18,.137),()=>{n.lightApp.toggle(),n.startMenu.toggle()}),r.__createButton("Paint App","/icons/paintingIcon.png",new D(1.2,.02,.6),new Ce(.18,.137),()=>{n.paint.toggle(),n.startMenu.toggle()}),r.__createButton("Snake Game","/icons/snakegameIcon.png",new D(.6,.02,-.6),new Ce(.22,.137),()=>{n.snake.toggle(),n.startMenu.toggle()}),r.__createButton("Shutdown","/icons/turnoffIcon.png",new D(-.56,.02,-.62),new Ce(.185,.137),()=>{n.turnOff(),n.startMenu.toggle()}),r.__mesh.visible=!1,r}async function MA(n,e){const{windowMesh:t,toggleWindow:r}=await So("/icons/trashIcon.png",new D(.355,2.15,0),n.__mesh,e,{windowGeometry:new je(.5,.6),windowMaterial:new rt,fontMaterial:new rt({color:new Ue(0).setHex(1122867)}),dragBoundaries:{zMin:-.5080321285140572,zMax:.5058232931726915,yMin:2.0891841779975326,yMax:2.2389987639060496},logoIconOffset:new D(.25,0,0),closeBtnOffset:new D(-.25,0,0)}),i={__draggingOffset:new D,__mesh:t,__createButton:(o,a)=>{xi(o,e,()=>{i.__mesh.visible&&a()})}};i.toggle=()=>r();const s=new ot;return i.__mesh.add(s),s.text="The trashbin is empty.",s.fontSize=.02,s.position.x=-.1,s.position.y=-.015,s.color=0,s.sync(),i}async function SA(n,e,t){const{windowMesh:r,toggleWindow:i}=await So("/icons/lightbulbIcon.png",new D(.35,2.15,0),n.__mesh,e,{windowGeometry:new je(.5,.6),windowMaterial:new rt,fontMaterial:new rt({color:new Ue(0).setHex(1122867)}),dragBoundaries:{zMin:-.5080321285140572,zMax:.5058232931726915,yMin:2.0891841779975326,yMax:2.2389987639060496},logoIconOffset:new D(.25,0,0),closeBtnOffset:new D(-.25,0,0),disableDrag:!1,useHeaderForDrag:!0}),s={__draggingOffset:new D,__mesh:r,__createButton:async(l,c,u,f,h)=>{const d=await Yi(l,c,u,f,s.__mesh,{iconGeometry:new je(.05,.05),iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.02});xi(d,e,()=>{s.__mesh.visible&&h()})},toggle:()=>i(),setLightColor:l=>t.setPointLightColor(l)},o=new ot;s.__mesh.add(o),o.text="Control Light:",o.fontSize=.025,o.position.x=-.2,o.position.y=.205,o.color=0,o.sync();const a=new ot;return s.__mesh.add(a),a.text="Select your favorite color for the room.",a.fontSize=.02,a.position.x=-.2,a.position.y=.165,a.color=0,a.sync(),s.__createButton("White Light","/icons/whiteColor.png",new D(-.17,.06,.008),new Ce(-.045,-.014),()=>{s.setLightColor(new Ue().setHex(16777215))}),s.__createButton("Red Light","/icons/redColor.png",new D(.06,.06,.008),new Ce(-.045,-.014),()=>{s.setLightColor(new Ue().setHex(16711680))}),s.__createButton("Green Light","/icons/greenColor.png",new D(-.17,-.04,.008),new Ce(-.045,-.014),()=>{s.setLightColor(new Ue().setHex(65280))}),s.__createButton("Blue Light","/icons/blueColor.png",new D(.06,-.04,.008),new Ce(-.045,-.014),()=>{s.setLightColor(new Ue().setHex(65535))}),s.__createButton("Yellow Light","/icons/yellowColor.png",new D(-.17,-.14,.008),new Ce(-.045,-.014),()=>{s.setLightColor(new Ue().setHex(16776960))}),s.__createButton("Orange Light","/icons/orangeColor.png",new D(.06,-.14,.008),new Ce(-.045,-.014),()=>{s.setLightColor(new Ue().setHex(16753920))}),s}async function bA(n,e){const{windowMesh:t,toggleWindow:r}=await So("/icons/paintingIcon.png",new D(.345,2.15,0),n.__mesh,e,{windowGeometry:new je(.5,.6),windowMaterial:new rt,fontMaterial:new rt({color:new Ue(0).setHex(1122867)}),dragBoundaries:{zMin:-.5080321285140572,zMax:.5058232931726915,yMin:2.0891841779975326,yMax:2.2389987639060496},logoIconOffset:new D(.25,0,0),closeBtnOffset:new D(-.25,0,0),disableDrag:!1,useHeaderForDrag:!0}),i={__draggingOffset:new D,__mesh:t,__createButton:async(u,f,h,d,g,_=new je(.03,.03))=>{const p=await Yi(u,f,h,d,i.__mesh,{iconGeometry:_,iconRotation:new D(0,0,0),textColor:new Ue().setHex(0),fontSize:.02});xi(p,e,()=>{i.__mesh.visible&&g()})},__paintingMaterial:new rt,__selectedMesh:new at(new je(.03,.03),new rt),__isPainting:!1,toggle:()=>r()},s=new di;i.__mesh.add(s);const o=()=>{for(;s.children.length>0;){const u=s.children[0];s.remove(u),u.geometry&&u.geometry.dispose(),u.material&&u.material.dispose()}},a={xMin:-.2439056741881411,xMax:.2452954501094407,yMin:-.2923841573676015,yMax:.20202578998397547};yg(i.__mesh,e,()=>{i.__mesh.visible&&(i.__isPainting=!0)},()=>{i.__isPainting=!1},(u,f,h)=>{if(i.__isPainting){const d=i.__paintingMaterial,g=new Nu;g.setFromCamera(u,f);const _=new ui(new D(0,0,1),0);_.applyMatrix4(i.__mesh.matrixWorld);const p=new D;if(g.ray.intersectPlane(_,p)){const m=i.__mesh.worldToLocal(p.clone());m.x<a.xMin?m.x=a.xMin:m.x>a.xMax&&(m.x=a.xMax),m.y<a.yMin?m.y=a.yMin:m.y>a.yMax&&(m.y=a.yMax);const y=.01,v=new vs(y,y,y),M=d.clone(),A=new at(v,M);A.position.copy(m),s.add(A)}}});const l=(u,f)=>{i.__paintingMaterial=new rt({color:new Ue().setHex(u)}),il(f).then(h=>i.__selectedMesh.material.map=h)},c=new ot;return i.__mesh.add(c),c.text="Selected:",c.fontSize=.025,c.position.x=.104,c.position.y=.24,c.color=0,c.sync(),i.__mesh.add(i.__selectedMesh),i.__selectedMesh.position.set(.23,.22,.008),l(0,"/icons/blackColor.png"),i.__createButton("","/icons/blackColor.png",new D(-.23,.22,.008),new Ce(-.045,-.014),()=>{l(0,"/icons/blackColor.png")}),i.__createButton("","/icons/brownColor.png",new D(-.198,.22,.008),new Ce(-.045,-.014),()=>{l(9127187,"/icons/brownColor.png")}),i.__createButton("","/icons/greyColor.png",new D(-.165,.22,.008),new Ce(-.045,-.014),()=>{l(8421504,"/icons/greyColor.png")}),i.__createButton("","/icons/whiteColor.png",new D(-.132,.22,.008),new Ce(-.045,-.014),()=>{l(16777215,"/icons/whiteColor.png")}),i.__createButton("","/icons/redColor.png",new D(-.099,.22,.008),new Ce(-.045,-.014),()=>{l(16711680,"/icons/redColor.png")}),i.__createButton("","/icons/greenColor.png",new D(-.067,.22,.008),new Ce(-.045,-.014),()=>{l(65280,"/icons/greenColor.png")}),i.__createButton("","/icons/blueColor.png",new D(-.034,.22,.008),new Ce(-.045,-.014),()=>{l(255,"/icons/blueColor.png")}),i.__createButton("","/icons/orangeColor.png",new D(-.001,.22,.008),new Ce(-.045,-.014),()=>{l(16753920,"/icons/orangeColor.png")}),i.__createButton("","/icons/yellowColor.png",new D(.032,.22,.008),new Ce(-.045,-.014),()=>{l(16776960,"/icons/yellowColor.png")}),i.__createButton("","/icons/trashIcon.png",new D(.065,.22,.008),new Ce(-.045,-.014),()=>{o()},new je(.04,.04)),i}async function EA(n,e){const{windowMesh:t,toggleWindow:r}=await So("/icons/snakegameIcon.png",new D(.34,2.15,0),n.__mesh,e,{windowGeometry:new je(.5,.6),windowMaterial:new rt({color:new Ue(0).setHex(0)}),fontMaterial:new rt({color:new Ue(0).setHex(1122867)}),dragBoundaries:{zMin:-.5080321285140572,zMax:.5058232931726915,yMin:2.0891841779975326,yMax:2.2389987639060496},logoIconOffset:new D(.25,0,0),closeBtnOffset:new D(-.25,0,0),disableDrag:!1,useHeaderForDrag:!0}),i={__draggingOffset:new D,__mesh:t,__createButton:async(M,A,w,T,P)=>{const $=await Yi(M,A,w,T,i.__mesh,{iconGeometry:new je(.05,.05),iconRotation:new D(0,0,0),textColor:new Ue().setHex(16777215),fontSize:.02});return xi($,e,()=>{i.__mesh.visible&&P()}),$},__isGameActive:!1,__score:0,toggle:()=>r()},s=new ot;i.__mesh.add(s),s.text="Snake Game",s.fontSize=.035,s.position.x=-.1,s.position.y=-.005,s.color=16777215,s.sync();const o=new ot;i.__mesh.add(o),o.text="Game Over",o.fontSize=.035,o.position.x=-.1,o.position.y=-.005,o.color=16711680,o.visible=!1,o.sync();const a=new ot;i.__mesh.add(a),a.text="Score: 0",a.fontSize=.02,a.position.x=-.2,a.position.y=.215,a.color=16777215,a.visible=!1,a.sync();const l=await i.__createButton("Start Game","/icons/circle-play-solid-fontawesome.png",new D(-.07,-.1,.008),new Ce(-.045,-.014),()=>{i.startGame()}),c={xMin:-.2439056741881411,xMax:.2452954501094407,yMin:-.2923841573676015,yMax:.20202578998397547},u=new at(new je(.015,.015),new rt({color:new Ue().setHex(16711680)}));i.__mesh.add(u),u.visible=!1;const f=()=>{const M=Math.random()*(c.xMax-c.xMin)+c.xMin,A=Math.random()*(c.yMax-c.yMin)+c.yMin;u.position.set(M,A,u.position.z)},h=new at(new je(.02,.02),new rt({color:new Ue().setHex(16777215)}));i.__mesh.add(h),h.visible=!1;const d=new di;i.__mesh.add(d);let g=[h.position.clone()];const _=()=>{const M=g[g.length-1].clone(),A=new at(new je(.02,.02),new rt({color:new Ue().setHex(16777215)}));A.position.copy(M),d.add(A),g.push(M)},p=()=>{d.clear(),g=[h.position.clone()]};xo.addEventListener("loopEvent",()=>{if(g.unshift(h.position.clone()),g.length>d.children.length+1&&g.pop(),d.children.forEach((M,A)=>{M.position.copy(g[A+1])}),h.position.distanceTo(u.position)<.018&&(f(),_(),i.__score+=1,a.text=`Score: ${i.__score}`,a.sync()),i.__isGameActive){for(let M=3;M<g.length;M++)if(h.position.distanceTo(g[M])<.015){v();break}}});const m=.01,y=new Ce(0,m);xo.addEventListener("loopEvent",()=>{h.position.x+=y.x,h.position.y+=y.y,h.position.x<c.xMin?h.position.x=c.xMax:h.position.x>c.xMax&&(h.position.x=c.xMin),h.position.y<c.yMin?h.position.y=c.yMax:h.position.y>c.yMax&&(h.position.y=c.yMin)}),L1(M=>{switch(M.key){case"w":case"ArrowUp":y.x=0,y.y=m;break;case"a":case"ArrowLeft":y.x=-m,y.y=0;break;case"s":case"ArrowDown":y.x=0,y.y=-m;break;case"d":case"ArrowRight":y.x=m,y.y=0;break}},()=>{}),i.startGame=()=>{i.__isGameActive=!0,i.__score=0,s.visible=!1,a.visible=!0,a.text="Score: 0",a.sync(),o.visible=!1,l.visible=!1,p(),u.visible=!0,f(),h.position.set(0,0,0),h.visible=!0};const v=()=>{i.__isGameActive=!1,h.visible=!1,u.visible=!1,o.visible=!0,l.visible=!0};return i}async function TA(n,e){const t=new at(new je(1.515,.82),new rt({color:new Ue().setHex(0)}));n.__mesh.add(t),t.visible=!1,t.position.set(.358,2.135,0),t.rotation.y=-Math.PI/2;const r={__mesh:n.__mesh,toggle:()=>{t.visible=!t.visible,t.visible&&(Og(),t.position.set(.358,2.135,0),_(1))}},i=xw([[0,"#ff5f6d"],[.2,"#ffc371"],[.4,"#47cf73"],[.6,"#00c6fb"],[.8,"#845ec2"],[1,"#ff5fcf"]]),s=new rt({map:i,transparent:!0,opacity:0,alphaTest:.01}),o=new ot;r.__mesh.add(o),o.text="Nico OS",o.fontSize=.145,o.rotation.y=-Math.PI/2,o.position.z=-.27,o.position.y=2.3,o.position.x=.35,o.material=s,o.sync();const a=new ot;r.__mesh.add(a),a.text="Version 0.0.1.iceCream",a.fontSize=.045,a.rotation.y=-Math.PI/2,a.position.z=-.24,a.position.y=2.1,a.position.x=.35,a.material=s,a.sync();const l=new D(0,1.12,.4);let c=1e3,u=2e3,f=1e3,h=null,d=null;function g(p){o.material.opacity=p,a.material.opacity=p,o.material.needsUpdate=!0,a.material.needsUpdate=!0}function _(p){t.material.opacity=p,t.material.transparent=!0,t.material.needsUpdate=!0}return r.load=()=>{t.visible=!0,_(1),g(0),h=performance.now();const p=e.position.clone();d=setInterval(()=>{let y=performance.now()-h;if(y<c){let v=y/c;g(v),e.position.lerpVectors(p,l,v),e.rotation.x+=(0-e.rotation.x)*v,e.rotation.y+=(0-e.rotation.y)*v,e.rotation.z+=(0-e.rotation.z)*v}else if(y<c+u)g(1);else if(y<c+u+f){let v=(y-c-u)/f;_(1-v),g(1-v)}else _(0),g(0),t.visible=!1,t.position.set(99,0,0),n.browser.toggle(),clearInterval(d)},1e3/60)},r}async function wA(n,e,t,r){const i={__mesh:n,__camera:e};return i.eventDispatcher=new vi,i.isActive=!1,r.controls.target.set(-0,1.12,-.5),i.turnOn=()=>{r.setUseControls(!1),i.startScreen.toggle(),i.startScreen.load(),n.visible=!0,i.isActive=!0,i.eventDispatcher.dispatchEvent({type:"stateChanged"})},i.turnOff=()=>{r.setUseControls(!0),n.visible=!1,e.position.set(0,1,2),i.isActive=!1,i.eventDispatcher.dispatchEvent({type:"stateChanged"})},i.browser=await _A(i,e),i.trash=await MA(i,e),i.lightApp=await SA(i,e,t),i.paint=await bA(i,e),i.snake=await EA(i,e),i.startScreen=await TA(i,e),i.desktop=vA(i,e),i.startMenu=yA(i,e),i.startBar=xA(i,e),i}const Xs=lo({});function AA(){const n=r=>{var i;if((i=Xs.value)!=null&&i.camera){const s=Xs.value.camera;s.fov=Math.max(80,Math.min(130,75*(1200/window.innerWidth))),s.updateProjectionMatrix()}};return window.onresize=n,{onMounted:async(r,i={camera:{fov:75,aspect:window.innerWidth/window.innerHeight,near:.1,far:1e3}})=>{const s=N1(),o=O1(r),a=new Kt(i.camera.fov,i.camera.aspect,i.camera.near,i.camera.far);let l=!0;const c=new T1(a,o.domElement),f={controls:c,setUseControls:p=>{l=p,c.enabled=p}};c.enableDamping=!0,c.autoRotate=!0;const h=Mw(s),d=await yw(s),g=await wA(d,a,h,f);a.position.x=0,a.position.z=2,a.position.y=1,a.lookAt(0,1,0),P1(),w1(),R1(),D1();const _=()=>{if(requestAnimationFrame(_),F1(o)){const p=o.domElement;a.aspect=p.clientWidth/p.clientHeight,a.updateProjectionMatrix()}l&&c.update(),o.render(s,a)};_(),Xs.value={scene:s,camera:a,renderer:o,os:g},n()},onUnmounted:()=>{U1(),A1(),C1(),I1(),Xs.value={}},adapter:Xs}}const sl=(n,e)=>{const t=n.__vccOpts||n;for(const[r,i]of e)t[r]=i;return t},RA={__name:"Scene",setup(n,{expose:e}){const t=lo(null),r=AA();return pu(async()=>await r.onMounted(t.value)),mu(()=>r.onUnmounted()),e({adapter:r.adapter}),(i,s)=>(is(),ho("canvas",{ref_key:"canvasRef",ref:t},null,512))}},CA=sl(RA,[["__scopeId","data-v-40292d09"]]),Bg=n=>(I0("data-v-1e74b899"),n=n(),F0(),n),LA={key:0,class:"overlay"},PA=Bg(()=>Bn("small",null,[Qs(" Hey there! 👋 I'm Nicolai, and this is my interactive portfolio. Power up the PC to explore what I've been working on!"),Bn("br"),Qs(" On your phone? For a smoother experience, visit my "),Bn("a",{class:"link",href:"https://github.com/niiicolai",target:"_blank"},"GitHub"),Qs(" to see all my projects. ")],-1)),UA=Bg(()=>Bn("p",{class:"author"},[Qs("by "),Bn("a",{href:"https://www.linkedin.com/in/nicolai-berg-andersen-ab1279b3/",target:"_blank"},"nicolai")],-1)),DA={__name:"Home",setup(n){const e=lo(null),t=lo(!1),r=()=>{var s,o,a;(a=(o=(s=e.value)==null?void 0:s.adapter)==null?void 0:o.os)==null||a.turnOn()},i=()=>{var s,o;return(o=(s=e.value)==null?void 0:s.adapter)!=null&&o.os?(e.value.adapter.os.eventDispatcher.addEventListener("stateChanged",()=>{var a,l,c;t.value=(c=(l=(a=e.value)==null?void 0:a.adapter)==null?void 0:l.os)==null?void 0:c.isActive}),!0):!1};return pu(()=>{if(!i()){const s=setInterval(()=>{i()&&clearInterval(s)},100)}}),(s,o)=>(is(),ho(jn,null,[Zt(CA,{ref_key:"sceneRef",ref:e},null,512),t.value?C_("",!0):(is(),ho("div",LA,[Bn("div",null,[Bn("div",{class:"overlay__content"},[Bn("button",{onClick:r,class:"a"},"Turn On"),PA]),UA])]))],64))}},IA=sl(DA,[["__scopeId","data-v-1e74b899"]]),FA={},NA=Bn("h1",null,"Not found (404)",-1),OA=[NA];function BA(n,e){return is(),ho("div",null,OA)}const kA=sl(FA,[["render",BA]]),GA=[{path:"/",component:IA},{path:"/:pathMatch(.*)*",component:kA}],zA=gx({history:Xv(),routes:GA}),HA={};function VA(n,e){const t=H0("RouterView");return is(),ho("main",null,[Zt(t)])}const WA=sl(HA,[["render",VA]]);fv(WA).use(zA).mount("#app");
