(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();function $e(i,e){e=e||{};const{positions:t,values:n}=i;if(t.length!==n.length)throw new Error("positions and values must have the same length");this.dim=typeof t[0]=="number"?1:t[0].length,this.positions=this.dim===1?t.map(r=>[r]):t,this.values=n,this.n=n.length,this.extent=e.periodicExtent,this.isPeriodic=e.periodicExtent!==void 0,this.innerDistFunction=e.innerDistFunction||(r=>r*r),this.outerDistFunction=e.outerDistFunction||(r=>Math.sqrt($e.sum(r))),this.weightFunction=e.weightFunction||(r=>r),this.denominatorOffset=e.denominatorOffset||0,Object.assign(this,e),this.hasCustomWeightFunction=!!e.weightFunction,this.isPeriodic&&this._validatePeriodicPositions(),this.setPeriodicSmoothing(.1)}$e.prototype._validatePeriodicPositions=function(){const i=this.extent;this.positions.forEach(e=>{e.forEach((t,n)=>{if(i[n]!==void 0&&!(t>=i[n][0]&&t<=i[n][1]))throw new Error(`Position at index ${n} is outside the bounds specified in periodicExtent.`)})})};$e.prototype._mapPeriodically=function(i){const e=this.extent;return i=i.map((t,n)=>{if(e[n]===void 0)return t;const[r,o]=e[n];let a=(t-r)/(o-r);return a-=Math.floor(a),r+(o-r)*a}),i};$e.prototype.setDistanceFunctions=function(i,e){if(typeof i!="function")throw new Error("innerDistFunction must be a function");if(typeof e!="function")throw new Error("outerDistFunction must be a function");this.innerDistFunction=i,this.outerDistFunction=e};$e.prototype.useEuclideanDistance=function(){this.setDistanceFunctions(i=>i*i,i=>Math.sqrt($e.sum(i)))};$e.prototype.useTaxicabDistance=function(){this.setDistanceFunctions(Math.abs,$e.sum)};$e.prototype.useChessboardDistance=function(){this.setDistanceFunctions(Math.abs,i=>Math.max(...i))};$e.prototype.useMinkowskiDistance=function(i=2){this.setDistanceFunctions(e=>Math.pow(Math.abs(e),i),e=>Math.pow($e.sum(e),1/i))};$e.prototype.setWeightFunction=function(i){if(typeof i!="function")throw new Error("weightFunction must be a function");this.weightFunction=i,this.hasCustomWeightFunction=!0};$e.prototype.setDenominatorOffset=function(i){if(typeof i!="number")throw new Error("denominatorOffset must be a number");this.denominatorOffset=i};$e.prototype.setPeriodicSmoothing=function(i){if(typeof i!="number")throw new Error("smoothing must be a number");if(!(i>=0&&i<=1))throw new Error("smoothing must be between 0 and 1");this.periodicSmoothing=i/2};$e.prototype._distance=function(i,e){return this.dim===1&&(i=typeof i=="number"?[i]:i,e=typeof e=="number"?[e]:e),this.isPeriodic?this._periodicDistance(i,e):this._standardDistance(i,e)};$e.prototype._standardDistance=function(i,e){const t=Array(this.dim).fill().map((n,r)=>{let o=e[r]-i[r];return this.innerDistFunction(o,r)});return this.outerDistFunction(t)};$e.prototype._periodicDistance=function(i,e){i=this._mapPeriodically(i),e=this._mapPeriodically(e);const t=this.extent,n=Array(this.dim).fill().map((r,o)=>{let a=e[o]-i[o];if(t[o]!==void 0){const s=t[o][1]-t[o][0];a=Math.abs(a),a>s/2&&(a=s-a);const l=this.periodicSmoothing;a=s/2*$e._squareEase(a/(s/2),l,l)}return this.innerDistFunction(a,o)});return this.outerDistFunction(n)};$e._normalizeValues=function(i){const e=$e.sum(i);return i.map(t=>t/e)};$e.sum=function(i){return i.reduce((e,t)=>(e+=t,e),0)};$e._squareEase=function(i,e=.05,t=.05){if(e+t>1)throw new Error("The sum of wStart and wEnd cannot exceed 1");if(i<=0)return 0;if(i>1)return 1;const n=1/(2-(e+t));if(i>0&&i<=e)return n/e*i*i;if(i>e&&i<=1-t){const r=2*n,o=-e*n;return r*i+o}return i>1-t&&i<=1?-n/t*(1-i)*(1-i)+1:1};$e.prototype.getData=function(){return{positions:this.positions,value:this.value}};$e.prototype.evaluate=function(i,e=2){let t=Array(this.n).fill();this.positions.forEach((r,o)=>{const a=this._distance(i,r);t[o]=1/(Math.pow(a,e)+this.denominatorOffset)}),t=$e._normalizeValues(t),this.hasCustomWeightFunction&&(t=t.map(r=>this.weightFunction(r)));for(let r=0;r<t.length;r++)if(!Number.isFinite(t[r]))return this.values[r];return this.hasCustomWeightFunction&&(t=$e._normalizeValues(t)),t.reduce((r,o,a)=>(r+=o*this.values[a],r),0)};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lo="163",zn={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},In={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Is=0,yo=1,Fs=2,Ja=1,Os=2,$t=3,un=0,vt=1,qt=2,cn=0,ii=1,Mo=2,So=3,Eo=4,Bs=5,Sn=100,Hs=101,Vs=102,ks=103,Gs=104,Ws=200,Xs=201,Ys=202,$s=203,eo=204,to=205,qs=206,Zs=207,js=208,Ks=209,Js=210,Qs=211,el=212,tl=213,nl=214,il=0,rl=1,ol=2,nr=3,al=4,sl=5,ll=6,cl=7,Qa=0,hl=1,dl=2,hn=0,ul=1,fl=2,pl=3,ml=4,gl=5,_l=6,xl=7,es=300,ai=301,si=302,no=303,io=304,cr=306,ro=1e3,An=1001,oo=1002,xt=1003,vl=1004,Ni=1005,Lt=1006,xr=1007,Tn=1008,dn=1009,bl=1010,yl=1011,ts=1012,ns=1013,li=1014,Zt=1015,ir=1016,is=1017,rs=1018,wi=1020,Ml=35902,Sl=1021,El=1022,Bt=1023,Al=1024,Tl=1025,ri=1026,Ei=1027,os=1028,as=1029,wl=1030,ss=1031,ls=1033,vr=33776,br=33777,yr=33778,Mr=33779,Ao=35840,To=35841,wo=35842,Ro=35843,cs=36196,Co=37492,No=37496,Do=37808,Po=37809,Lo=37810,Uo=37811,zo=37812,Io=37813,Fo=37814,Oo=37815,Bo=37816,Ho=37817,Vo=37818,ko=37819,Go=37820,Wo=37821,Sr=36492,Xo=36494,Yo=36495,Rl=36283,$o=36284,qo=36285,Zo=36286,Cl=3200,Nl=3201,Dl=0,Pl=1,ln="",It="srgb",Ct="srgb-linear",co="display-p3",hr="display-p3-linear",rr="linear",qe="srgb",or="rec709",ar="p3",Fn=7680,jo=519,Ll=512,Ul=513,zl=514,hs=515,Il=516,Fl=517,Ol=518,Bl=519,Ko=35044,Hl=35048,Jo="300 es",jt=2e3,sr=2001;class Nn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const o=r.indexOf(t);o!==-1&&r.splice(o,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let o=0,a=r.length;o<a;o++)r[o].call(this,e);e.target=null}}}const dt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Qo=1234567;const Mi=Math.PI/180,Ai=180/Math.PI;function hi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(dt[i&255]+dt[i>>8&255]+dt[i>>16&255]+dt[i>>24&255]+"-"+dt[e&255]+dt[e>>8&255]+"-"+dt[e>>16&15|64]+dt[e>>24&255]+"-"+dt[t&63|128]+dt[t>>8&255]+"-"+dt[t>>16&255]+dt[t>>24&255]+dt[n&255]+dt[n>>8&255]+dt[n>>16&255]+dt[n>>24&255]).toLowerCase()}function ft(i,e,t){return Math.max(e,Math.min(t,i))}function ho(i,e){return(i%e+e)%e}function Vl(i,e,t,n,r){return n+(i-e)*(r-n)/(t-e)}function kl(i,e,t){return i!==e?(t-i)/(e-i):0}function Si(i,e,t){return(1-t)*i+t*e}function Gl(i,e,t,n){return Si(i,e,1-Math.exp(-t*n))}function Wl(i,e=1){return e-Math.abs(ho(i,e*2)-e)}function Xl(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Yl(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function $l(i,e){return i+Math.floor(Math.random()*(e-i+1))}function ql(i,e){return i+Math.random()*(e-i)}function Zl(i){return i*(.5-Math.random())}function jl(i){i!==void 0&&(Qo=i);let e=Qo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Kl(i){return i*Mi}function Jl(i){return i*Ai}function Ql(i){return(i&i-1)===0&&i!==0}function ec(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function tc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function nc(i,e,t,n,r){const o=Math.cos,a=Math.sin,s=o(t/2),l=a(t/2),c=o((e+n)/2),d=a((e+n)/2),f=o((e-n)/2),p=a((e-n)/2),g=o((n-e)/2),x=a((n-e)/2);switch(r){case"XYX":i.set(s*d,l*f,l*p,s*c);break;case"YZY":i.set(l*p,s*d,l*f,s*c);break;case"ZXZ":i.set(l*f,l*p,s*d,s*c);break;case"XZX":i.set(s*d,l*x,l*g,s*c);break;case"YXY":i.set(l*g,s*d,l*x,s*c);break;case"ZYZ":i.set(l*x,l*g,s*d,s*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ti(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function mt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ds={DEG2RAD:Mi,RAD2DEG:Ai,generateUUID:hi,clamp:ft,euclideanModulo:ho,mapLinear:Vl,inverseLerp:kl,lerp:Si,damp:Gl,pingpong:Wl,smoothstep:Xl,smootherstep:Yl,randInt:$l,randFloat:ql,randFloatSpread:Zl,seededRandom:jl,degToRad:Kl,radToDeg:Jl,isPowerOfTwo:Ql,ceilPowerOfTwo:ec,floorPowerOfTwo:tc,setQuaternionFromProperEuler:nc,normalize:mt,denormalize:ti};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),o=this.x-e.x,a=this.y-e.y;return this.x=o*n-a*r+e.x,this.y=o*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class De{constructor(e,t,n,r,o,a,s,l,c){De.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,a,s,l,c)}set(e,t,n,r,o,a,s,l,c){const d=this.elements;return d[0]=e,d[1]=r,d[2]=s,d[3]=t,d[4]=o,d[5]=l,d[6]=n,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,a=n[0],s=n[3],l=n[6],c=n[1],d=n[4],f=n[7],p=n[2],g=n[5],x=n[8],b=r[0],u=r[3],h=r[6],E=r[1],y=r[4],w=r[7],I=r[2],R=r[5],T=r[8];return o[0]=a*b+s*E+l*I,o[3]=a*u+s*y+l*R,o[6]=a*h+s*w+l*T,o[1]=c*b+d*E+f*I,o[4]=c*u+d*y+f*R,o[7]=c*h+d*w+f*T,o[2]=p*b+g*E+x*I,o[5]=p*u+g*y+x*R,o[8]=p*h+g*w+x*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],a=e[4],s=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*s*c-n*o*d+n*s*l+r*o*c-r*a*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],a=e[4],s=e[5],l=e[6],c=e[7],d=e[8],f=d*a-s*c,p=s*l-d*o,g=c*o-a*l,x=t*f+n*p+r*g;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/x;return e[0]=f*b,e[1]=(r*c-d*n)*b,e[2]=(s*n-r*a)*b,e[3]=p*b,e[4]=(d*t-r*l)*b,e[5]=(r*o-s*t)*b,e[6]=g*b,e[7]=(n*l-c*t)*b,e[8]=(a*t-n*o)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,o,a,s){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*a+c*s)+a+e,-r*c,r*l,-r*(-c*a+l*s)+s+t,0,0,1),this}scale(e,t){return this.premultiply(Er.makeScale(e,t)),this}rotate(e){return this.premultiply(Er.makeRotation(-e)),this}translate(e,t){return this.premultiply(Er.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Er=new De;function us(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function ic(){const i=lr("canvas");return i.style.display="block",i}const ea={};function rc(i){i in ea||(ea[i]=!0,console.warn(i))}const ta=new De().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),na=new De().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Di={[Ct]:{transfer:rr,primaries:or,toReference:i=>i,fromReference:i=>i},[It]:{transfer:qe,primaries:or,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[hr]:{transfer:rr,primaries:ar,toReference:i=>i.applyMatrix3(na),fromReference:i=>i.applyMatrix3(ta)},[co]:{transfer:qe,primaries:ar,toReference:i=>i.convertSRGBToLinear().applyMatrix3(na),fromReference:i=>i.applyMatrix3(ta).convertLinearToSRGB()}},oc=new Set([Ct,hr]),Ye={enabled:!0,_workingColorSpace:Ct,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!oc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Di[e].toReference,r=Di[t].fromReference;return r(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Di[i].primaries},getTransfer:function(i){return i===ln?rr:Di[i].transfer}};function oi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ar(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let On;class ac{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{On===void 0&&(On=lr("canvas")),On.width=e.width,On.height=e.height;const n=On.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=On}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),o=r.data;for(let a=0;a<o.length;a++)o[a]=oi(o[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sc=0;class fs{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sc++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let o;if(Array.isArray(r)){o=[];for(let a=0,s=r.length;a<s;a++)r[a].isDataTexture?o.push(Tr(r[a].image)):o.push(Tr(r[a]))}else o=Tr(r);n.url=o}return t||(e.images[this.uuid]=n),n}}function Tr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ac.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let lc=0;class pt extends Nn{constructor(e=pt.DEFAULT_IMAGE,t=pt.DEFAULT_MAPPING,n=An,r=An,o=Lt,a=Tn,s=Bt,l=dn,c=pt.DEFAULT_ANISOTROPY,d=ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:lc++}),this.uuid=hi(),this.name="",this.source=new fs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=o,this.minFilter=a,this.anisotropy=c,this.format=s,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==es)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ro:e.x=e.x-Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case oo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ro:e.y=e.y-Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case oo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}pt.DEFAULT_IMAGE=null;pt.DEFAULT_MAPPING=es;pt.DEFAULT_ANISOTROPY=1;class Je{constructor(e=0,t=0,n=0,r=1){Je.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*o,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*o,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*o,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*o,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,o;const l=e.elements,c=l[0],d=l[4],f=l[8],p=l[1],g=l[5],x=l[9],b=l[2],u=l[6],h=l[10];if(Math.abs(d-p)<.01&&Math.abs(f-b)<.01&&Math.abs(x-u)<.01){if(Math.abs(d+p)<.1&&Math.abs(f+b)<.1&&Math.abs(x+u)<.1&&Math.abs(c+g+h-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,w=(g+1)/2,I=(h+1)/2,R=(d+p)/4,T=(f+b)/4,V=(x+u)/4;return y>w&&y>I?y<.01?(n=0,r=.707106781,o=.707106781):(n=Math.sqrt(y),r=R/n,o=T/n):w>I?w<.01?(n=.707106781,r=0,o=.707106781):(r=Math.sqrt(w),n=R/r,o=V/r):I<.01?(n=.707106781,r=.707106781,o=0):(o=Math.sqrt(I),n=T/o,r=V/o),this.set(n,r,o,t),this}let E=Math.sqrt((u-x)*(u-x)+(f-b)*(f-b)+(p-d)*(p-d));return Math.abs(E)<.001&&(E=1),this.x=(u-x)/E,this.y=(f-b)/E,this.z=(p-d)/E,this.w=Math.acos((c+g+h-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class cc extends Nn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Je(0,0,e,t),this.scissorTest=!1,this.viewport=new Je(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Lt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new pt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let s=0;s<a;s++)this.textures[s]=o.clone(),this.textures[s].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,o=this.textures.length;r<o;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new fs(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rn extends cc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ps extends pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=xt,this.minFilter=xt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hc extends pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=xt,this.minFilter=xt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,o,a,s){let l=n[r+0],c=n[r+1],d=n[r+2],f=n[r+3];const p=o[a+0],g=o[a+1],x=o[a+2],b=o[a+3];if(s===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f;return}if(s===1){e[t+0]=p,e[t+1]=g,e[t+2]=x,e[t+3]=b;return}if(f!==b||l!==p||c!==g||d!==x){let u=1-s;const h=l*p+c*g+d*x+f*b,E=h>=0?1:-1,y=1-h*h;if(y>Number.EPSILON){const I=Math.sqrt(y),R=Math.atan2(I,h*E);u=Math.sin(u*R)/I,s=Math.sin(s*R)/I}const w=s*E;if(l=l*u+p*w,c=c*u+g*w,d=d*u+x*w,f=f*u+b*w,u===1-s){const I=1/Math.sqrt(l*l+c*c+d*d+f*f);l*=I,c*=I,d*=I,f*=I}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=f}static multiplyQuaternionsFlat(e,t,n,r,o,a){const s=n[r],l=n[r+1],c=n[r+2],d=n[r+3],f=o[a],p=o[a+1],g=o[a+2],x=o[a+3];return e[t]=s*x+d*f+l*g-c*p,e[t+1]=l*x+d*p+c*f-s*g,e[t+2]=c*x+d*g+s*p-l*f,e[t+3]=d*x-s*f-l*p-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,o=e._z,a=e._order,s=Math.cos,l=Math.sin,c=s(n/2),d=s(r/2),f=s(o/2),p=l(n/2),g=l(r/2),x=l(o/2);switch(a){case"XYZ":this._x=p*d*f+c*g*x,this._y=c*g*f-p*d*x,this._z=c*d*x+p*g*f,this._w=c*d*f-p*g*x;break;case"YXZ":this._x=p*d*f+c*g*x,this._y=c*g*f-p*d*x,this._z=c*d*x-p*g*f,this._w=c*d*f+p*g*x;break;case"ZXY":this._x=p*d*f-c*g*x,this._y=c*g*f+p*d*x,this._z=c*d*x+p*g*f,this._w=c*d*f-p*g*x;break;case"ZYX":this._x=p*d*f-c*g*x,this._y=c*g*f+p*d*x,this._z=c*d*x-p*g*f,this._w=c*d*f+p*g*x;break;case"YZX":this._x=p*d*f+c*g*x,this._y=c*g*f+p*d*x,this._z=c*d*x-p*g*f,this._w=c*d*f-p*g*x;break;case"XZY":this._x=p*d*f-c*g*x,this._y=c*g*f-p*d*x,this._z=c*d*x+p*g*f,this._w=c*d*f+p*g*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],o=t[8],a=t[1],s=t[5],l=t[9],c=t[2],d=t[6],f=t[10],p=n+s+f;if(p>0){const g=.5/Math.sqrt(p+1);this._w=.25/g,this._x=(d-l)*g,this._y=(o-c)*g,this._z=(a-r)*g}else if(n>s&&n>f){const g=2*Math.sqrt(1+n-s-f);this._w=(d-l)/g,this._x=.25*g,this._y=(r+a)/g,this._z=(o+c)/g}else if(s>f){const g=2*Math.sqrt(1+s-n-f);this._w=(o-c)/g,this._x=(r+a)/g,this._y=.25*g,this._z=(l+d)/g}else{const g=2*Math.sqrt(1+f-n-s);this._w=(a-r)/g,this._x=(o+c)/g,this._y=(l+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,o=e._z,a=e._w,s=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+a*s+r*c-o*l,this._y=r*d+a*l+o*s-n*c,this._z=o*d+a*c+n*l-r*s,this._w=a*d-n*s-r*l-o*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,o=this._z,a=this._w;let s=a*e._w+n*e._x+r*e._y+o*e._z;if(s<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,s=-s):this.copy(e),s>=1)return this._w=a,this._x=n,this._y=r,this._z=o,this;const l=1-s*s;if(l<=Number.EPSILON){const g=1-t;return this._w=g*a+t*this._w,this._x=g*n+t*this._x,this._y=g*r+t*this._y,this._z=g*o+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,s),f=Math.sin((1-t)*d)/c,p=Math.sin(t*d)/c;return this._w=a*f+this._w*p,this._x=n*f+this._x*p,this._y=r*f+this._y*p,this._z=o*f+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),o*Math.sin(t),o*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ia.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ia.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[3]*n+o[6]*r,this.y=o[1]*t+o[4]*n+o[7]*r,this.z=o[2]*t+o[5]*n+o[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,o=e.elements,a=1/(o[3]*t+o[7]*n+o[11]*r+o[15]);return this.x=(o[0]*t+o[4]*n+o[8]*r+o[12])*a,this.y=(o[1]*t+o[5]*n+o[9]*r+o[13])*a,this.z=(o[2]*t+o[6]*n+o[10]*r+o[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,o=e.x,a=e.y,s=e.z,l=e.w,c=2*(a*r-s*n),d=2*(s*t-o*r),f=2*(o*n-a*t);return this.x=t+l*c+a*f-s*d,this.y=n+l*d+s*c-o*f,this.z=r+l*f+o*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r,this.y=o[1]*t+o[5]*n+o[9]*r,this.z=o[2]*t+o[6]*n+o[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,o=e.z,a=t.x,s=t.y,l=t.z;return this.x=r*l-o*s,this.y=o*a-n*l,this.z=n*s-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wr.copy(this).projectOnVector(e),this.sub(wr)}reflect(e){return this.sub(wr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wr=new N,ia=new Cn;class Dn{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Nt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Nt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Nt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const o=n.getAttribute("position");if(t===!0&&o!==void 0&&e.isInstancedMesh!==!0)for(let a=0,s=o.count;a<s;a++)e.isMesh===!0?e.getVertexPosition(a,Nt):Nt.fromBufferAttribute(o,a),Nt.applyMatrix4(e.matrixWorld),this.expandByPoint(Nt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pi.copy(n.boundingBox)),Pi.applyMatrix4(e.matrixWorld),this.union(Pi)}const r=e.children;for(let o=0,a=r.length;o<a;o++)this.expandByObject(r[o],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Nt),Nt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(fi),Li.subVectors(this.max,fi),Bn.subVectors(e.a,fi),Hn.subVectors(e.b,fi),Vn.subVectors(e.c,fi),en.subVectors(Hn,Bn),tn.subVectors(Vn,Hn),gn.subVectors(Bn,Vn);let t=[0,-en.z,en.y,0,-tn.z,tn.y,0,-gn.z,gn.y,en.z,0,-en.x,tn.z,0,-tn.x,gn.z,0,-gn.x,-en.y,en.x,0,-tn.y,tn.x,0,-gn.y,gn.x,0];return!Rr(t,Bn,Hn,Vn,Li)||(t=[1,0,0,0,1,0,0,0,1],!Rr(t,Bn,Hn,Vn,Li))?!1:(Ui.crossVectors(en,tn),t=[Ui.x,Ui.y,Ui.z],Rr(t,Bn,Hn,Vn,Li))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Nt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(kt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),kt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),kt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),kt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),kt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),kt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),kt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),kt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(kt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const kt=[new N,new N,new N,new N,new N,new N,new N,new N],Nt=new N,Pi=new Dn,Bn=new N,Hn=new N,Vn=new N,en=new N,tn=new N,gn=new N,fi=new N,Li=new N,Ui=new N,_n=new N;function Rr(i,e,t,n,r){for(let o=0,a=i.length-3;o<=a;o+=3){_n.fromArray(i,o);const s=r.x*Math.abs(_n.x)+r.y*Math.abs(_n.y)+r.z*Math.abs(_n.z),l=e.dot(_n),c=t.dot(_n),d=n.dot(_n);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>s)return!1}return!0}const dc=new Dn,pi=new N,Cr=new N;class Ri{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):dc.setFromPoints(e).getCenter(n);let r=0;for(let o=0,a=e.length;o<a;o++)r=Math.max(r,n.distanceToSquared(e[o]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pi.subVectors(e,this.center);const t=pi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(pi,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pi.copy(e.center).add(Cr)),this.expandByPoint(pi.copy(e.center).sub(Cr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gt=new N,Nr=new N,zi=new N,nn=new N,Dr=new N,Ii=new N,Pr=new N;class ms{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gt)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gt.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gt.copy(this.origin).addScaledVector(this.direction,t),Gt.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Nr.copy(e).add(t).multiplyScalar(.5),zi.copy(t).sub(e).normalize(),nn.copy(this.origin).sub(Nr);const o=e.distanceTo(t)*.5,a=-this.direction.dot(zi),s=nn.dot(this.direction),l=-nn.dot(zi),c=nn.lengthSq(),d=Math.abs(1-a*a);let f,p,g,x;if(d>0)if(f=a*l-s,p=a*s-l,x=o*d,f>=0)if(p>=-x)if(p<=x){const b=1/d;f*=b,p*=b,g=f*(f+a*p+2*s)+p*(a*f+p+2*l)+c}else p=o,f=Math.max(0,-(a*p+s)),g=-f*f+p*(p+2*l)+c;else p=-o,f=Math.max(0,-(a*p+s)),g=-f*f+p*(p+2*l)+c;else p<=-x?(f=Math.max(0,-(-a*o+s)),p=f>0?-o:Math.min(Math.max(-o,-l),o),g=-f*f+p*(p+2*l)+c):p<=x?(f=0,p=Math.min(Math.max(-o,-l),o),g=p*(p+2*l)+c):(f=Math.max(0,-(a*o+s)),p=f>0?o:Math.min(Math.max(-o,-l),o),g=-f*f+p*(p+2*l)+c);else p=a>0?-o:o,f=Math.max(0,-(a*p+s)),g=-f*f+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Nr).addScaledVector(zi,p),g}intersectSphere(e,t){Gt.subVectors(e.center,this.origin);const n=Gt.dot(this.direction),r=Gt.dot(Gt)-n*n,o=e.radius*e.radius;if(r>o)return null;const a=Math.sqrt(o-r),s=n-a,l=n+a;return l<0?null:s<0?this.at(l,t):this.at(s,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,o,a,s,l;const c=1/this.direction.x,d=1/this.direction.y,f=1/this.direction.z,p=this.origin;return c>=0?(n=(e.min.x-p.x)*c,r=(e.max.x-p.x)*c):(n=(e.max.x-p.x)*c,r=(e.min.x-p.x)*c),d>=0?(o=(e.min.y-p.y)*d,a=(e.max.y-p.y)*d):(o=(e.max.y-p.y)*d,a=(e.min.y-p.y)*d),n>a||o>r||((o>n||isNaN(n))&&(n=o),(a<r||isNaN(r))&&(r=a),f>=0?(s=(e.min.z-p.z)*f,l=(e.max.z-p.z)*f):(s=(e.max.z-p.z)*f,l=(e.min.z-p.z)*f),n>l||s>r)||((s>n||n!==n)&&(n=s),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Gt)!==null}intersectTriangle(e,t,n,r,o){Dr.subVectors(t,e),Ii.subVectors(n,e),Pr.crossVectors(Dr,Ii);let a=this.direction.dot(Pr),s;if(a>0){if(r)return null;s=1}else if(a<0)s=-1,a=-a;else return null;nn.subVectors(this.origin,e);const l=s*this.direction.dot(Ii.crossVectors(nn,Ii));if(l<0)return null;const c=s*this.direction.dot(Dr.cross(nn));if(c<0||l+c>a)return null;const d=-s*nn.dot(Pr);return d<0?null:this.at(d/a,o)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ze{constructor(e,t,n,r,o,a,s,l,c,d,f,p,g,x,b,u){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,o,a,s,l,c,d,f,p,g,x,b,u)}set(e,t,n,r,o,a,s,l,c,d,f,p,g,x,b,u){const h=this.elements;return h[0]=e,h[4]=t,h[8]=n,h[12]=r,h[1]=o,h[5]=a,h[9]=s,h[13]=l,h[2]=c,h[6]=d,h[10]=f,h[14]=p,h[3]=g,h[7]=x,h[11]=b,h[15]=u,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/kn.setFromMatrixColumn(e,0).length(),o=1/kn.setFromMatrixColumn(e,1).length(),a=1/kn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*o,t[5]=n[5]*o,t[6]=n[6]*o,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,o=e.z,a=Math.cos(n),s=Math.sin(n),l=Math.cos(r),c=Math.sin(r),d=Math.cos(o),f=Math.sin(o);if(e.order==="XYZ"){const p=a*d,g=a*f,x=s*d,b=s*f;t[0]=l*d,t[4]=-l*f,t[8]=c,t[1]=g+x*c,t[5]=p-b*c,t[9]=-s*l,t[2]=b-p*c,t[6]=x+g*c,t[10]=a*l}else if(e.order==="YXZ"){const p=l*d,g=l*f,x=c*d,b=c*f;t[0]=p+b*s,t[4]=x*s-g,t[8]=a*c,t[1]=a*f,t[5]=a*d,t[9]=-s,t[2]=g*s-x,t[6]=b+p*s,t[10]=a*l}else if(e.order==="ZXY"){const p=l*d,g=l*f,x=c*d,b=c*f;t[0]=p-b*s,t[4]=-a*f,t[8]=x+g*s,t[1]=g+x*s,t[5]=a*d,t[9]=b-p*s,t[2]=-a*c,t[6]=s,t[10]=a*l}else if(e.order==="ZYX"){const p=a*d,g=a*f,x=s*d,b=s*f;t[0]=l*d,t[4]=x*c-g,t[8]=p*c+b,t[1]=l*f,t[5]=b*c+p,t[9]=g*c-x,t[2]=-c,t[6]=s*l,t[10]=a*l}else if(e.order==="YZX"){const p=a*l,g=a*c,x=s*l,b=s*c;t[0]=l*d,t[4]=b-p*f,t[8]=x*f+g,t[1]=f,t[5]=a*d,t[9]=-s*d,t[2]=-c*d,t[6]=g*f+x,t[10]=p-b*f}else if(e.order==="XZY"){const p=a*l,g=a*c,x=s*l,b=s*c;t[0]=l*d,t[4]=-f,t[8]=c*d,t[1]=p*f+b,t[5]=a*d,t[9]=g*f-x,t[2]=x*f-g,t[6]=s*d,t[10]=b*f+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(uc,e,fc)}lookAt(e,t,n){const r=this.elements;return Mt.subVectors(e,t),Mt.lengthSq()===0&&(Mt.z=1),Mt.normalize(),rn.crossVectors(n,Mt),rn.lengthSq()===0&&(Math.abs(n.z)===1?Mt.x+=1e-4:Mt.z+=1e-4,Mt.normalize(),rn.crossVectors(n,Mt)),rn.normalize(),Fi.crossVectors(Mt,rn),r[0]=rn.x,r[4]=Fi.x,r[8]=Mt.x,r[1]=rn.y,r[5]=Fi.y,r[9]=Mt.y,r[2]=rn.z,r[6]=Fi.z,r[10]=Mt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,o=this.elements,a=n[0],s=n[4],l=n[8],c=n[12],d=n[1],f=n[5],p=n[9],g=n[13],x=n[2],b=n[6],u=n[10],h=n[14],E=n[3],y=n[7],w=n[11],I=n[15],R=r[0],T=r[4],V=r[8],S=r[12],v=r[1],L=r[5],W=r[9],C=r[13],$=r[2],X=r[6],j=r[10],J=r[14],H=r[3],ee=r[7],Q=r[11],ue=r[15];return o[0]=a*R+s*v+l*$+c*H,o[4]=a*T+s*L+l*X+c*ee,o[8]=a*V+s*W+l*j+c*Q,o[12]=a*S+s*C+l*J+c*ue,o[1]=d*R+f*v+p*$+g*H,o[5]=d*T+f*L+p*X+g*ee,o[9]=d*V+f*W+p*j+g*Q,o[13]=d*S+f*C+p*J+g*ue,o[2]=x*R+b*v+u*$+h*H,o[6]=x*T+b*L+u*X+h*ee,o[10]=x*V+b*W+u*j+h*Q,o[14]=x*S+b*C+u*J+h*ue,o[3]=E*R+y*v+w*$+I*H,o[7]=E*T+y*L+w*X+I*ee,o[11]=E*V+y*W+w*j+I*Q,o[15]=E*S+y*C+w*J+I*ue,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],o=e[12],a=e[1],s=e[5],l=e[9],c=e[13],d=e[2],f=e[6],p=e[10],g=e[14],x=e[3],b=e[7],u=e[11],h=e[15];return x*(+o*l*f-r*c*f-o*s*p+n*c*p+r*s*g-n*l*g)+b*(+t*l*g-t*c*p+o*a*p-r*a*g+r*c*d-o*l*d)+u*(+t*c*f-t*s*g-o*a*f+n*a*g+o*s*d-n*c*d)+h*(-r*s*d-t*l*f+t*s*p+r*a*f-n*a*p+n*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],o=e[3],a=e[4],s=e[5],l=e[6],c=e[7],d=e[8],f=e[9],p=e[10],g=e[11],x=e[12],b=e[13],u=e[14],h=e[15],E=f*u*c-b*p*c+b*l*g-s*u*g-f*l*h+s*p*h,y=x*p*c-d*u*c-x*l*g+a*u*g+d*l*h-a*p*h,w=d*b*c-x*f*c+x*s*g-a*b*g-d*s*h+a*f*h,I=x*f*l-d*b*l-x*s*p+a*b*p+d*s*u-a*f*u,R=t*E+n*y+r*w+o*I;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return e[0]=E*T,e[1]=(b*p*o-f*u*o-b*r*g+n*u*g+f*r*h-n*p*h)*T,e[2]=(s*u*o-b*l*o+b*r*c-n*u*c-s*r*h+n*l*h)*T,e[3]=(f*l*o-s*p*o-f*r*c+n*p*c+s*r*g-n*l*g)*T,e[4]=y*T,e[5]=(d*u*o-x*p*o+x*r*g-t*u*g-d*r*h+t*p*h)*T,e[6]=(x*l*o-a*u*o-x*r*c+t*u*c+a*r*h-t*l*h)*T,e[7]=(a*p*o-d*l*o+d*r*c-t*p*c-a*r*g+t*l*g)*T,e[8]=w*T,e[9]=(x*f*o-d*b*o-x*n*g+t*b*g+d*n*h-t*f*h)*T,e[10]=(a*b*o-x*s*o+x*n*c-t*b*c-a*n*h+t*s*h)*T,e[11]=(d*s*o-a*f*o-d*n*c+t*f*c+a*n*g-t*s*g)*T,e[12]=I*T,e[13]=(d*b*r-x*f*r+x*n*p-t*b*p-d*n*u+t*f*u)*T,e[14]=(x*s*r-a*b*r-x*n*l+t*b*l+a*n*u-t*s*u)*T,e[15]=(a*f*r-d*s*r+d*n*l-t*f*l-a*n*p+t*s*p)*T,this}scale(e){const t=this.elements,n=e.x,r=e.y,o=e.z;return t[0]*=n,t[4]*=r,t[8]*=o,t[1]*=n,t[5]*=r,t[9]*=o,t[2]*=n,t[6]*=r,t[10]*=o,t[3]*=n,t[7]*=r,t[11]*=o,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),o=1-n,a=e.x,s=e.y,l=e.z,c=o*a,d=o*s;return this.set(c*a+n,c*s-r*l,c*l+r*s,0,c*s+r*l,d*s+n,d*l-r*a,0,c*l-r*s,d*l+r*a,o*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,o,a){return this.set(1,n,o,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,o=t._x,a=t._y,s=t._z,l=t._w,c=o+o,d=a+a,f=s+s,p=o*c,g=o*d,x=o*f,b=a*d,u=a*f,h=s*f,E=l*c,y=l*d,w=l*f,I=n.x,R=n.y,T=n.z;return r[0]=(1-(b+h))*I,r[1]=(g+w)*I,r[2]=(x-y)*I,r[3]=0,r[4]=(g-w)*R,r[5]=(1-(p+h))*R,r[6]=(u+E)*R,r[7]=0,r[8]=(x+y)*T,r[9]=(u-E)*T,r[10]=(1-(p+b))*T,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let o=kn.set(r[0],r[1],r[2]).length();const a=kn.set(r[4],r[5],r[6]).length(),s=kn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(o=-o),e.x=r[12],e.y=r[13],e.z=r[14],Dt.copy(this);const c=1/o,d=1/a,f=1/s;return Dt.elements[0]*=c,Dt.elements[1]*=c,Dt.elements[2]*=c,Dt.elements[4]*=d,Dt.elements[5]*=d,Dt.elements[6]*=d,Dt.elements[8]*=f,Dt.elements[9]*=f,Dt.elements[10]*=f,t.setFromRotationMatrix(Dt),n.x=o,n.y=a,n.z=s,this}makePerspective(e,t,n,r,o,a,s=jt){const l=this.elements,c=2*o/(t-e),d=2*o/(n-r),f=(t+e)/(t-e),p=(n+r)/(n-r);let g,x;if(s===jt)g=-(a+o)/(a-o),x=-2*a*o/(a-o);else if(s===sr)g=-a/(a-o),x=-a*o/(a-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return l[0]=c,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,o,a,s=jt){const l=this.elements,c=1/(t-e),d=1/(n-r),f=1/(a-o),p=(t+e)*c,g=(n+r)*d;let x,b;if(s===jt)x=(a+o)*f,b=-2*f;else if(s===sr)x=o*f,b=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-g,l[2]=0,l[6]=0,l[10]=b,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const kn=new N,Dt=new Ze,uc=new N(0,0,0),fc=new N(1,1,1),rn=new N,Fi=new N,Mt=new N,ra=new Ze,oa=new Cn;class Kt{constructor(e=0,t=0,n=0,r=Kt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,o=r[0],a=r[4],s=r[8],l=r[1],c=r[5],d=r[9],f=r[2],p=r[6],g=r[10];switch(t){case"XYZ":this._y=Math.asin(ft(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-a,o)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(s,g),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(ft(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-f,g),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-ft(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(s,g));break;case"XZY":this._z=Math.asin(-ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(s,o)):(this._x=Math.atan2(-d,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ra.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ra,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return oa.setFromEuler(this),this.setFromQuaternion(oa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Kt.DEFAULT_ORDER="XYZ";class gs{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let pc=0;const aa=new N,Gn=new Cn,Wt=new Ze,Oi=new N,mi=new N,mc=new N,gc=new Cn,sa=new N(1,0,0),la=new N(0,1,0),ca=new N(0,0,1),ha={type:"added"},_c={type:"removed"},Wn={type:"childadded",child:null},Lr={type:"childremoved",child:null};class _t extends Nn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pc++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=_t.DEFAULT_UP.clone();const e=new N,t=new Kt,n=new Cn,r=new N(1,1,1);function o(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(o),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ze},normalMatrix:{value:new De}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=_t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Gn.setFromAxisAngle(e,t),this.quaternion.multiply(Gn),this}rotateOnWorldAxis(e,t){return Gn.setFromAxisAngle(e,t),this.quaternion.premultiply(Gn),this}rotateX(e){return this.rotateOnAxis(sa,e)}rotateY(e){return this.rotateOnAxis(la,e)}rotateZ(e){return this.rotateOnAxis(ca,e)}translateOnAxis(e,t){return aa.copy(e).applyQuaternion(this.quaternion),this.position.add(aa.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sa,e)}translateY(e){return this.translateOnAxis(la,e)}translateZ(e){return this.translateOnAxis(ca,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Wt.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Oi.copy(e):Oi.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),mi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wt.lookAt(mi,Oi,this.up):Wt.lookAt(Oi,mi,this.up),this.quaternion.setFromRotationMatrix(Wt),r&&(Wt.extractRotation(r.matrixWorld),Gn.setFromRotationMatrix(Wt),this.quaternion.premultiply(Gn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ha),Wn.child=e,this.dispatchEvent(Wn),Wn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(_c),Lr.child=e,this.dispatchEvent(Lr),Lr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Wt.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Wt.multiply(e.parent.matrixWorld)),e.applyMatrix4(Wt),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ha),Wn.child=e,this.dispatchEvent(Wn),Wn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mi,e,mc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(mi,gc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++){const o=t[n];(o.matrixWorldAutoUpdate===!0||e===!0)&&o.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let o=0,a=r.length;o<a;o++){const s=r[o];s.matrixWorldAutoUpdate===!0&&s.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(s=>({boxInitialized:s.boxInitialized,boxMin:s.box.min.toArray(),boxMax:s.box.max.toArray(),sphereInitialized:s.sphereInitialized,sphereRadius:s.sphere.radius,sphereCenter:s.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function o(s,l){return s[l.uuid]===void 0&&(s[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=o(e.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const l=s.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const f=l[c];o(e.shapes,f)}else o(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let l=0,c=this.material.length;l<c;l++)s.push(o(e.materials,this.material[l]));r.material=s}else r.material=o(e.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){const l=this.animations[s];r.animations.push(o(e.animations,l))}}if(t){const s=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),f=a(e.shapes),p=a(e.skeletons),g=a(e.animations),x=a(e.nodes);s.length>0&&(n.geometries=s),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),f.length>0&&(n.shapes=f),p.length>0&&(n.skeletons=p),g.length>0&&(n.animations=g),x.length>0&&(n.nodes=x)}return n.object=r,n;function a(s){const l=[];for(const c in s){const d=s[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}_t.DEFAULT_UP=new N(0,1,0);_t.DEFAULT_MATRIX_AUTO_UPDATE=!0;_t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Pt=new N,Xt=new N,Ur=new N,Yt=new N,Xn=new N,Yn=new N,da=new N,zr=new N,Ir=new N,Fr=new N;class Ot{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Pt.subVectors(e,t),r.cross(Pt);const o=r.lengthSq();return o>0?r.multiplyScalar(1/Math.sqrt(o)):r.set(0,0,0)}static getBarycoord(e,t,n,r,o){Pt.subVectors(r,t),Xt.subVectors(n,t),Ur.subVectors(e,t);const a=Pt.dot(Pt),s=Pt.dot(Xt),l=Pt.dot(Ur),c=Xt.dot(Xt),d=Xt.dot(Ur),f=a*c-s*s;if(f===0)return o.set(0,0,0),null;const p=1/f,g=(c*l-s*d)*p,x=(a*d-s*l)*p;return o.set(1-g-x,x,g)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Yt)===null?!1:Yt.x>=0&&Yt.y>=0&&Yt.x+Yt.y<=1}static getInterpolation(e,t,n,r,o,a,s,l){return this.getBarycoord(e,t,n,r,Yt)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,Yt.x),l.addScaledVector(a,Yt.y),l.addScaledVector(s,Yt.z),l)}static isFrontFacing(e,t,n,r){return Pt.subVectors(n,t),Xt.subVectors(e,t),Pt.cross(Xt).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pt.subVectors(this.c,this.b),Xt.subVectors(this.a,this.b),Pt.cross(Xt).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ot.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ot.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,o){return Ot.getInterpolation(e,this.a,this.b,this.c,t,n,r,o)}containsPoint(e){return Ot.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ot.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,o=this.c;let a,s;Xn.subVectors(r,n),Yn.subVectors(o,n),zr.subVectors(e,n);const l=Xn.dot(zr),c=Yn.dot(zr);if(l<=0&&c<=0)return t.copy(n);Ir.subVectors(e,r);const d=Xn.dot(Ir),f=Yn.dot(Ir);if(d>=0&&f<=d)return t.copy(r);const p=l*f-d*c;if(p<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(n).addScaledVector(Xn,a);Fr.subVectors(e,o);const g=Xn.dot(Fr),x=Yn.dot(Fr);if(x>=0&&g<=x)return t.copy(o);const b=g*c-l*x;if(b<=0&&c>=0&&x<=0)return s=c/(c-x),t.copy(n).addScaledVector(Yn,s);const u=d*x-g*f;if(u<=0&&f-d>=0&&g-x>=0)return da.subVectors(o,r),s=(f-d)/(f-d+(g-x)),t.copy(r).addScaledVector(da,s);const h=1/(u+b+p);return a=b*h,s=p*h,t.copy(n).addScaledVector(Xn,a).addScaledVector(Yn,s)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _s={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},on={h:0,s:0,l:0},Bi={h:0,s:0,l:0};function Or(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Ye.workingColorSpace){if(e=ho(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+t):n+t-n*t,a=2*n-o;this.r=Or(a,o,e+1/3),this.g=Or(a,o,e),this.b=Or(a,o,e-1/3)}return Ye.toWorkingColorSpace(this,r),this}setStyle(e,t=It){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let o;const a=r[1],s=r[2];switch(a){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,t);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,t);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const o=r[1],a=o.length;if(a===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(o,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const n=_s[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=Ar(e.r),this.g=Ar(e.g),this.b=Ar(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return Ye.fromWorkingColorSpace(ut.copy(this),e),Math.round(ft(ut.r*255,0,255))*65536+Math.round(ft(ut.g*255,0,255))*256+Math.round(ft(ut.b*255,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(ut.copy(this),t);const n=ut.r,r=ut.g,o=ut.b,a=Math.max(n,r,o),s=Math.min(n,r,o);let l,c;const d=(s+a)/2;if(s===a)l=0,c=0;else{const f=a-s;switch(c=d<=.5?f/(a+s):f/(2-a-s),a){case n:l=(r-o)/f+(r<o?6:0);break;case r:l=(o-n)/f+2;break;case o:l=(n-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(ut.copy(this),t),e.r=ut.r,e.g=ut.g,e.b=ut.b,e}getStyle(e=It){Ye.fromWorkingColorSpace(ut.copy(this),e);const t=ut.r,n=ut.g,r=ut.b;return e!==It?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(on),this.setHSL(on.h+e,on.s+t,on.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(on),e.getHSL(Bi);const n=Si(on.h,Bi.h,t),r=Si(on.s,Bi.s,t),o=Si(on.l,Bi.l,t);return this.setHSL(n,r,o),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,o=e.elements;return this.r=o[0]*t+o[3]*n+o[6]*r,this.g=o[1]*t+o[4]*n+o[7]*r,this.b=o[2]*t+o[5]*n+o[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ut=new ze;ze.NAMES=_s;let xc=0;class dr extends Nn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:xc++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=ii,this.side=un,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=eo,this.blendDst=to,this.blendEquation=Sn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fn,this.stencilZFail=Fn,this.stencilZPass=Fn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ii&&(n.blending=this.blending),this.side!==un&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==eo&&(n.blendSrc=this.blendSrc),this.blendDst!==to&&(n.blendDst=this.blendDst),this.blendEquation!==Sn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==nr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(o){const a=[];for(const s in o){const l=o[s];delete l.metadata,a.push(l)}return a}if(t){const o=r(e.textures),a=r(e.images);o.length>0&&(n.textures=o),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let o=0;o!==r;++o)n[o]=t[o].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class uo extends dr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kt,this.combine=Qa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rt=new N,Hi=new Se;class zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ko,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Zt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return rc("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,o=this.itemSize;r<o;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hi.fromBufferAttribute(this,t),Hi.applyMatrix3(e),this.setXY(t,Hi.x,Hi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)rt.fromBufferAttribute(this,t),rt.applyMatrix3(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)rt.fromBufferAttribute(this,t),rt.applyMatrix4(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rt.fromBufferAttribute(this,t),rt.applyNormalMatrix(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rt.fromBufferAttribute(this,t),rt.transformDirection(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ti(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,o){return e*=this.itemSize,this.normalized&&(t=mt(t,this.array),n=mt(n,this.array),r=mt(r,this.array),o=mt(o,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=o,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ko&&(e.usage=this.usage),e}}class xs extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class vs extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wn extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let vc=0;const Tt=new Ze,Br=new _t,$n=new N,St=new Dn,gi=new Dn,ct=new N;class Pn extends Nn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vc++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(us(e)?vs:xs)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new De().getNormalMatrix(e);n.applyNormalMatrix(o),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Tt.makeRotationFromQuaternion(e),this.applyMatrix4(Tt),this}rotateX(e){return Tt.makeRotationX(e),this.applyMatrix4(Tt),this}rotateY(e){return Tt.makeRotationY(e),this.applyMatrix4(Tt),this}rotateZ(e){return Tt.makeRotationZ(e),this.applyMatrix4(Tt),this}translate(e,t,n){return Tt.makeTranslation(e,t,n),this.applyMatrix4(Tt),this}scale(e,t,n){return Tt.makeScale(e,t,n),this.applyMatrix4(Tt),this}lookAt(e){return Br.lookAt(e),Br.updateMatrix(),this.applyMatrix4(Br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($n).negate(),this.translate($n.x,$n.y,$n.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const o=e[n];t.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new wn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const o=t[n];St.setFromBufferAttribute(o),this.morphTargetsRelative?(ct.addVectors(this.boundingBox.min,St.min),this.boundingBox.expandByPoint(ct),ct.addVectors(this.boundingBox.max,St.max),this.boundingBox.expandByPoint(ct)):(this.boundingBox.expandByPoint(St.min),this.boundingBox.expandByPoint(St.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(St.setFromBufferAttribute(e),t)for(let o=0,a=t.length;o<a;o++){const s=t[o];gi.setFromBufferAttribute(s),this.morphTargetsRelative?(ct.addVectors(St.min,gi.min),St.expandByPoint(ct),ct.addVectors(St.max,gi.max),St.expandByPoint(ct)):(St.expandByPoint(gi.min),St.expandByPoint(gi.max))}St.getCenter(n);let r=0;for(let o=0,a=e.count;o<a;o++)ct.fromBufferAttribute(e,o),r=Math.max(r,n.distanceToSquared(ct));if(t)for(let o=0,a=t.length;o<a;o++){const s=t[o],l=this.morphTargetsRelative;for(let c=0,d=s.count;c<d;c++)ct.fromBufferAttribute(s,c),l&&($n.fromBufferAttribute(e,c),ct.add($n)),r=Math.max(r,n.distanceToSquared(ct))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,o=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),s=[],l=[];for(let V=0;V<n.count;V++)s[V]=new N,l[V]=new N;const c=new N,d=new N,f=new N,p=new Se,g=new Se,x=new Se,b=new N,u=new N;function h(V,S,v){c.fromBufferAttribute(n,V),d.fromBufferAttribute(n,S),f.fromBufferAttribute(n,v),p.fromBufferAttribute(o,V),g.fromBufferAttribute(o,S),x.fromBufferAttribute(o,v),d.sub(c),f.sub(c),g.sub(p),x.sub(p);const L=1/(g.x*x.y-x.x*g.y);isFinite(L)&&(b.copy(d).multiplyScalar(x.y).addScaledVector(f,-g.y).multiplyScalar(L),u.copy(f).multiplyScalar(g.x).addScaledVector(d,-x.x).multiplyScalar(L),s[V].add(b),s[S].add(b),s[v].add(b),l[V].add(u),l[S].add(u),l[v].add(u))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let V=0,S=E.length;V<S;++V){const v=E[V],L=v.start,W=v.count;for(let C=L,$=L+W;C<$;C+=3)h(e.getX(C+0),e.getX(C+1),e.getX(C+2))}const y=new N,w=new N,I=new N,R=new N;function T(V){I.fromBufferAttribute(r,V),R.copy(I);const S=s[V];y.copy(S),y.sub(I.multiplyScalar(I.dot(S))).normalize(),w.crossVectors(R,S);const L=w.dot(l[V])<0?-1:1;a.setXYZW(V,y.x,y.y,y.z,L)}for(let V=0,S=E.length;V<S;++V){const v=E[V],L=v.start,W=v.count;for(let C=L,$=L+W;C<$;C+=3)T(e.getX(C+0)),T(e.getX(C+1)),T(e.getX(C+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,g=n.count;p<g;p++)n.setXYZ(p,0,0,0);const r=new N,o=new N,a=new N,s=new N,l=new N,c=new N,d=new N,f=new N;if(e)for(let p=0,g=e.count;p<g;p+=3){const x=e.getX(p+0),b=e.getX(p+1),u=e.getX(p+2);r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,b),a.fromBufferAttribute(t,u),d.subVectors(a,o),f.subVectors(r,o),d.cross(f),s.fromBufferAttribute(n,x),l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,u),s.add(d),l.add(d),c.add(d),n.setXYZ(x,s.x,s.y,s.z),n.setXYZ(b,l.x,l.y,l.z),n.setXYZ(u,c.x,c.y,c.z)}else for(let p=0,g=t.count;p<g;p+=3)r.fromBufferAttribute(t,p+0),o.fromBufferAttribute(t,p+1),a.fromBufferAttribute(t,p+2),d.subVectors(a,o),f.subVectors(r,o),d.cross(f),n.setXYZ(p+0,d.x,d.y,d.z),n.setXYZ(p+1,d.x,d.y,d.z),n.setXYZ(p+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ct.fromBufferAttribute(e,t),ct.normalize(),e.setXYZ(t,ct.x,ct.y,ct.z)}toNonIndexed(){function e(s,l){const c=s.array,d=s.itemSize,f=s.normalized,p=new c.constructor(l.length*d);let g=0,x=0;for(let b=0,u=l.length;b<u;b++){s.isInterleavedBufferAttribute?g=l[b]*s.data.stride+s.offset:g=l[b]*d;for(let h=0;h<d;h++)p[x++]=c[g++]}return new zt(p,d,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pn,n=this.index.array,r=this.attributes;for(const s in r){const l=r[s],c=e(l,n);t.setAttribute(s,c)}const o=this.morphAttributes;for(const s in o){const l=[],c=o[s];for(let d=0,f=c.length;d<f;d++){const p=c[d],g=e(p,n);l.push(g)}t.morphAttributes[s]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let s=0,l=a.length;s<l;s++){const c=a[s];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let f=0,p=c.length;f<p;f++){const g=c[f];d.push(g.toJSON(e.data))}d.length>0&&(r[l]=d,o=!0)}o&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const s=this.boundingSphere;return s!==null&&(e.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const d=r[c];this.setAttribute(c,d.clone(t))}const o=e.morphAttributes;for(const c in o){const d=[],f=o[c];for(let p=0,g=f.length;p<g;p++)d.push(f[p].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,d=a.length;c<d;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const s=e.boundingBox;s!==null&&(this.boundingBox=s.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ua=new Ze,xn=new ms,Vi=new Ri,fa=new N,qn=new N,Zn=new N,jn=new N,Hr=new N,ki=new N,Gi=new Se,Wi=new Se,Xi=new Se,pa=new N,ma=new N,ga=new N,Yi=new N,$i=new N;class Ut extends _t{constructor(e=new Pn,t=new uo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,a=r.length;o<a;o++){const s=r[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=o}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,o=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const s=this.morphTargetInfluences;if(o&&s){ki.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const d=s[l],f=o[l];d!==0&&(Hr.fromBufferAttribute(f,e),a?ki.addScaledVector(Hr,d):ki.addScaledVector(Hr.sub(t),d))}t.add(ki)}return t}raycast(e,t){const n=this.geometry,r=this.material,o=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vi.copy(n.boundingSphere),Vi.applyMatrix4(o),xn.copy(e.ray).recast(e.near),!(Vi.containsPoint(xn.origin)===!1&&(xn.intersectSphere(Vi,fa)===null||xn.origin.distanceToSquared(fa)>(e.far-e.near)**2))&&(ua.copy(o).invert(),xn.copy(e.ray).applyMatrix4(ua),!(n.boundingBox!==null&&xn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xn)))}_computeIntersections(e,t,n){let r;const o=this.geometry,a=this.material,s=o.index,l=o.attributes.position,c=o.attributes.uv,d=o.attributes.uv1,f=o.attributes.normal,p=o.groups,g=o.drawRange;if(s!==null)if(Array.isArray(a))for(let x=0,b=p.length;x<b;x++){const u=p[x],h=a[u.materialIndex],E=Math.max(u.start,g.start),y=Math.min(s.count,Math.min(u.start+u.count,g.start+g.count));for(let w=E,I=y;w<I;w+=3){const R=s.getX(w),T=s.getX(w+1),V=s.getX(w+2);r=qi(this,h,e,n,c,d,f,R,T,V),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=u.materialIndex,t.push(r))}}else{const x=Math.max(0,g.start),b=Math.min(s.count,g.start+g.count);for(let u=x,h=b;u<h;u+=3){const E=s.getX(u),y=s.getX(u+1),w=s.getX(u+2);r=qi(this,a,e,n,c,d,f,E,y,w),r&&(r.faceIndex=Math.floor(u/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,b=p.length;x<b;x++){const u=p[x],h=a[u.materialIndex],E=Math.max(u.start,g.start),y=Math.min(l.count,Math.min(u.start+u.count,g.start+g.count));for(let w=E,I=y;w<I;w+=3){const R=w,T=w+1,V=w+2;r=qi(this,h,e,n,c,d,f,R,T,V),r&&(r.faceIndex=Math.floor(w/3),r.face.materialIndex=u.materialIndex,t.push(r))}}else{const x=Math.max(0,g.start),b=Math.min(l.count,g.start+g.count);for(let u=x,h=b;u<h;u+=3){const E=u,y=u+1,w=u+2;r=qi(this,a,e,n,c,d,f,E,y,w),r&&(r.faceIndex=Math.floor(u/3),t.push(r))}}}}function bc(i,e,t,n,r,o,a,s){let l;if(e.side===vt?l=n.intersectTriangle(a,o,r,!0,s):l=n.intersectTriangle(r,o,a,e.side===un,s),l===null)return null;$i.copy(s),$i.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo($i);return c<t.near||c>t.far?null:{distance:c,point:$i.clone(),object:i}}function qi(i,e,t,n,r,o,a,s,l,c){i.getVertexPosition(s,qn),i.getVertexPosition(l,Zn),i.getVertexPosition(c,jn);const d=bc(i,e,t,n,qn,Zn,jn,Yi);if(d){r&&(Gi.fromBufferAttribute(r,s),Wi.fromBufferAttribute(r,l),Xi.fromBufferAttribute(r,c),d.uv=Ot.getInterpolation(Yi,qn,Zn,jn,Gi,Wi,Xi,new Se)),o&&(Gi.fromBufferAttribute(o,s),Wi.fromBufferAttribute(o,l),Xi.fromBufferAttribute(o,c),d.uv1=Ot.getInterpolation(Yi,qn,Zn,jn,Gi,Wi,Xi,new Se)),a&&(pa.fromBufferAttribute(a,s),ma.fromBufferAttribute(a,l),ga.fromBufferAttribute(a,c),d.normal=Ot.getInterpolation(Yi,qn,Zn,jn,pa,ma,ga,new N),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const f={a:s,b:l,c,normal:new N,materialIndex:0};Ot.getNormal(qn,Zn,jn,f.normal),d.face=f}return d}class Ln extends Pn{constructor(e=1,t=1,n=1,r=1,o=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:o,depthSegments:a};const s=this;r=Math.floor(r),o=Math.floor(o),a=Math.floor(a);const l=[],c=[],d=[],f=[];let p=0,g=0;x("z","y","x",-1,-1,n,t,e,a,o,0),x("z","y","x",1,-1,n,t,-e,a,o,1),x("x","z","y",1,1,e,n,t,r,a,2),x("x","z","y",1,-1,e,n,-t,r,a,3),x("x","y","z",1,-1,e,t,n,r,o,4),x("x","y","z",-1,-1,e,t,-n,r,o,5),this.setIndex(l),this.setAttribute("position",new wn(c,3)),this.setAttribute("normal",new wn(d,3)),this.setAttribute("uv",new wn(f,2));function x(b,u,h,E,y,w,I,R,T,V,S){const v=w/T,L=I/V,W=w/2,C=I/2,$=R/2,X=T+1,j=V+1;let J=0,H=0;const ee=new N;for(let Q=0;Q<j;Q++){const ue=Q*L-C;for(let Le=0;Le<X;Le++){const We=Le*v-W;ee[b]=We*E,ee[u]=ue*y,ee[h]=$,c.push(ee.x,ee.y,ee.z),ee[b]=0,ee[u]=0,ee[h]=R>0?1:-1,d.push(ee.x,ee.y,ee.z),f.push(Le/T),f.push(1-Q/V),J+=1}}for(let Q=0;Q<V;Q++)for(let ue=0;ue<T;ue++){const Le=p+ue+X*Q,We=p+ue+X*(Q+1),k=p+(ue+1)+X*(Q+1),te=p+(ue+1)+X*Q;l.push(Le,We,te),l.push(We,k,te),H+=6}s.addGroup(g,H,S),g+=H,p+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ln(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ci(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function gt(i){const e={};for(let t=0;t<i.length;t++){const n=ci(i[t]);for(const r in n)e[r]=n[r]}return e}function yc(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function bs(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ye.workingColorSpace}const Mc={clone:ci,merge:gt};var Sc=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ec=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fn extends dr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Sc,this.fragmentShader=Ec,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ci(e.uniforms),this.uniformsGroups=yc(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ys extends _t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=jt}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const an=new N,_a=new Se,xa=new Se;class Rt extends ys{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ai*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Mi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ai*2*Math.atan(Math.tan(Mi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){an.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(an.x,an.y).multiplyScalar(-e/an.z),an.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(an.x,an.y).multiplyScalar(-e/an.z)}getViewSize(e,t){return this.getViewBounds(e,_a,xa),t.subVectors(xa,_a)}setViewOffset(e,t,n,r,o,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Mi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,o=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;o+=a.offsetX*r/l,t-=a.offsetY*n/c,r*=a.width/l,n*=a.height/c}const s=this.filmOffset;s!==0&&(o+=e*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Kn=-90,Jn=1;class Ac extends _t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Rt(Kn,Jn,e,t);r.layers=this.layers,this.add(r);const o=new Rt(Kn,Jn,e,t);o.layers=this.layers,this.add(o);const a=new Rt(Kn,Jn,e,t);a.layers=this.layers,this.add(a);const s=new Rt(Kn,Jn,e,t);s.layers=this.layers,this.add(s);const l=new Rt(Kn,Jn,e,t);l.layers=this.layers,this.add(l);const c=new Rt(Kn,Jn,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,o,a,s,l]=t;for(const c of t)this.remove(c);if(e===jt)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[o,a,s,l,c,d]=this.children,f=e.getRenderTarget(),p=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,o),e.setRenderTarget(n,1,r),e.render(t,a),e.setRenderTarget(n,2,r),e.render(t,s),e.setRenderTarget(n,3,r),e.render(t,l),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=b,e.setRenderTarget(n,5,r),e.render(t,d),e.setRenderTarget(f,p,g),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Ms extends pt{constructor(e,t,n,r,o,a,s,l,c,d){e=e!==void 0?e:[],t=t!==void 0?t:ai,super(e,t,n,r,o,a,s,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Tc extends Rn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ms(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Lt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ln(5,5,5),o=new fn({name:"CubemapFromEquirect",uniforms:ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vt,blending:cn});o.uniforms.tEquirect.value=t;const a=new Ut(r,o),s=t.minFilter;return t.minFilter===Tn&&(t.minFilter=Lt),new Ac(1,10,this).update(e,a),t.minFilter=s,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,r){const o=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(o)}}const Vr=new N,wc=new N,Rc=new De;class sn{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=Vr.subVectors(n,t).cross(wc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Vr),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/r;return o<0||o>1?null:t.copy(e.start).addScaledVector(n,o)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Rc.getNormalMatrix(e),r=this.coplanarPoint(Vr).applyMatrix4(e),o=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(o),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vn=new Ri,Zi=new N;class fo{constructor(e=new sn,t=new sn,n=new sn,r=new sn,o=new sn,a=new sn){this.planes=[e,t,n,r,o,a]}set(e,t,n,r,o,a){const s=this.planes;return s[0].copy(e),s[1].copy(t),s[2].copy(n),s[3].copy(r),s[4].copy(o),s[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=jt){const n=this.planes,r=e.elements,o=r[0],a=r[1],s=r[2],l=r[3],c=r[4],d=r[5],f=r[6],p=r[7],g=r[8],x=r[9],b=r[10],u=r[11],h=r[12],E=r[13],y=r[14],w=r[15];if(n[0].setComponents(l-o,p-c,u-g,w-h).normalize(),n[1].setComponents(l+o,p+c,u+g,w+h).normalize(),n[2].setComponents(l+a,p+d,u+x,w+E).normalize(),n[3].setComponents(l-a,p-d,u-x,w-E).normalize(),n[4].setComponents(l-s,p-f,u-b,w-y).normalize(),t===jt)n[5].setComponents(l+s,p+f,u+b,w+y).normalize();else if(t===sr)n[5].setComponents(s,f,b,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vn)}intersectsSprite(e){return vn.center.set(0,0,0),vn.radius=.7071067811865476,vn.applyMatrix4(e.matrixWorld),this.intersectsSphere(vn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let o=0;o<6;o++)if(t[o].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Zi.x=r.normal.x>0?e.max.x:e.min.x,Zi.y=r.normal.y>0?e.max.y:e.min.y,Zi.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Zi)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ss(){let i=null,e=!1,t=null,n=null;function r(o,a){t(o,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(o){t=o},setContext:function(o){i=o}}}function Cc(i){const e=new WeakMap;function t(s,l){const c=s.array,d=s.usage,f=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,d),s.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(c instanceof Uint16Array)s.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:s.version,size:f}}function n(s,l,c){const d=l.array,f=l._updateRange,p=l.updateRanges;if(i.bindBuffer(c,s),f.count===-1&&p.length===0&&i.bufferSubData(c,0,d),p.length!==0){for(let g=0,x=p.length;g<x;g++){const b=p[g];i.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}f.count!==-1&&(i.bufferSubData(c,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count),f.count=-1),l.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),e.get(s)}function o(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=e.get(s);l&&(i.deleteBuffer(l.buffer),e.delete(s))}function a(s,l){if(s.isGLBufferAttribute){const d=e.get(s);(!d||d.version<s.version)&&e.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}s.isInterleavedBufferAttribute&&(s=s.data);const c=e.get(s);if(c===void 0)e.set(s,t(s,l));else if(c.version<s.version){if(c.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,s,l),c.version=s.version}}return{get:r,remove:o,update:a}}class ur extends Pn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const o=e/2,a=t/2,s=Math.floor(n),l=Math.floor(r),c=s+1,d=l+1,f=e/s,p=t/l,g=[],x=[],b=[],u=[];for(let h=0;h<d;h++){const E=h*p-a;for(let y=0;y<c;y++){const w=y*f-o;x.push(w,-E,0),b.push(0,0,1),u.push(y/s),u.push(1-h/l)}}for(let h=0;h<l;h++)for(let E=0;E<s;E++){const y=E+c*h,w=E+c*(h+1),I=E+1+c*(h+1),R=E+1+c*h;g.push(y,w,R),g.push(w,I,R)}this.setIndex(g),this.setAttribute("position",new wn(x,3)),this.setAttribute("normal",new wn(b,3)),this.setAttribute("uv",new wn(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ur(e.width,e.height,e.widthSegments,e.heightSegments)}}var Nc=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dc=`#ifdef USE_ALPHAHASH
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
#endif`,Pc=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Lc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zc=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ic=`#ifdef USE_AOMAP
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
#endif`,Fc=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Oc=`#ifdef USE_BATCHING
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
#endif`,Bc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Hc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Vc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kc=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gc=`#ifdef USE_IRIDESCENCE
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
#endif`,Wc=`#ifdef USE_BUMPMAP
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
#endif`,Xc=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$c=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qc=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zc=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Kc=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Jc=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Qc=`#define PI 3.141592653589793
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
} // validated`,eh=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,th=`vec3 transformedNormal = objectNormal;
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
#endif`,nh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ih=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,oh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ah="gl_FragColor = linearToOutputTexel( gl_FragColor );",sh=`
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
}`,lh=`#ifdef USE_ENVMAP
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
#endif`,ch=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hh=`#ifdef USE_ENVMAP
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
#endif`,dh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uh=`#ifdef USE_ENVMAP
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
#endif`,fh=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ph=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_h=`#ifdef USE_GRADIENTMAP
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
}`,xh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,vh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,bh=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,yh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mh=`uniform bool receiveShadow;
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
#endif`,Sh=`#ifdef USE_ENVMAP
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
#endif`,Eh=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ah=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Th=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wh=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rh=`PhysicalMaterial material;
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
#endif`,Ch=`struct PhysicalMaterial {
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
}`,Nh=`
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
#endif`,Dh=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ph=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lh=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uh=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zh=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ih=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fh=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Oh=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bh=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hh=`#if defined( USE_POINTS_UV )
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
#endif`,Vh=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,kh=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gh=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Wh=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Xh=`#ifdef USE_MORPHNORMALS
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
#endif`,Yh=`#ifdef USE_MORPHTARGETS
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
#endif`,$h=`#ifdef USE_MORPHTARGETS
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
#endif`,qh=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Zh=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kh=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jh=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Qh=`#ifdef USE_NORMALMAP
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
#endif`,ed=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,td=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,nd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,id=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,od=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,ad=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,sd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ld=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,cd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,hd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ud=`#if NUM_SPOT_LIGHT_COORDS > 0
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
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
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
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,fd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,md=`float getShadowMask() {
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
}`,gd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_d=`#ifdef USE_SKINNING
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
#endif`,xd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vd=`#ifdef USE_SKINNING
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
#endif`,bd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Md=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sd=`#ifndef saturate
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
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ed=`#ifdef USE_TRANSMISSION
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
#endif`,Ad=`#ifdef USE_TRANSMISSION
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
#endif`,Td=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Cd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Dd=`uniform sampler2D t2D;
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
}`,Pd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ld=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ud=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Id=`#include <common>
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
}`,Fd=`#if DEPTH_PACKING == 3200
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
}`,Od=`#define DISTANCE
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
}`,Bd=`#define DISTANCE
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
}`,Hd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Vd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kd=`uniform float scale;
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
}`,Gd=`uniform vec3 diffuse;
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
}`,Wd=`#include <common>
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
}`,Xd=`uniform vec3 diffuse;
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
}`,Yd=`#define LAMBERT
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
}`,$d=`#define LAMBERT
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
}`,qd=`#define MATCAP
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
}`,Zd=`#define MATCAP
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
}`,jd=`#define NORMAL
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
}`,Kd=`#define NORMAL
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
}`,Jd=`#define PHONG
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
}`,Qd=`#define PHONG
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
}`,eu=`#define STANDARD
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
}`,tu=`#define STANDARD
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
}`,nu=`#define TOON
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
}`,iu=`#define TOON
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
}`,ru=`uniform float size;
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
}`,ou=`uniform vec3 diffuse;
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
}`,au=`#include <common>
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
}`,su=`uniform vec3 color;
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
}`,lu=`uniform float rotation;
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
}`,cu=`uniform vec3 diffuse;
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
}`,Ne={alphahash_fragment:Nc,alphahash_pars_fragment:Dc,alphamap_fragment:Pc,alphamap_pars_fragment:Lc,alphatest_fragment:Uc,alphatest_pars_fragment:zc,aomap_fragment:Ic,aomap_pars_fragment:Fc,batching_pars_vertex:Oc,batching_vertex:Bc,begin_vertex:Hc,beginnormal_vertex:Vc,bsdfs:kc,iridescence_fragment:Gc,bumpmap_pars_fragment:Wc,clipping_planes_fragment:Xc,clipping_planes_pars_fragment:Yc,clipping_planes_pars_vertex:$c,clipping_planes_vertex:qc,color_fragment:Zc,color_pars_fragment:jc,color_pars_vertex:Kc,color_vertex:Jc,common:Qc,cube_uv_reflection_fragment:eh,defaultnormal_vertex:th,displacementmap_pars_vertex:nh,displacementmap_vertex:ih,emissivemap_fragment:rh,emissivemap_pars_fragment:oh,colorspace_fragment:ah,colorspace_pars_fragment:sh,envmap_fragment:lh,envmap_common_pars_fragment:ch,envmap_pars_fragment:hh,envmap_pars_vertex:dh,envmap_physical_pars_fragment:Sh,envmap_vertex:uh,fog_vertex:fh,fog_pars_vertex:ph,fog_fragment:mh,fog_pars_fragment:gh,gradientmap_pars_fragment:_h,lightmap_fragment:xh,lightmap_pars_fragment:vh,lights_lambert_fragment:bh,lights_lambert_pars_fragment:yh,lights_pars_begin:Mh,lights_toon_fragment:Eh,lights_toon_pars_fragment:Ah,lights_phong_fragment:Th,lights_phong_pars_fragment:wh,lights_physical_fragment:Rh,lights_physical_pars_fragment:Ch,lights_fragment_begin:Nh,lights_fragment_maps:Dh,lights_fragment_end:Ph,logdepthbuf_fragment:Lh,logdepthbuf_pars_fragment:Uh,logdepthbuf_pars_vertex:zh,logdepthbuf_vertex:Ih,map_fragment:Fh,map_pars_fragment:Oh,map_particle_fragment:Bh,map_particle_pars_fragment:Hh,metalnessmap_fragment:Vh,metalnessmap_pars_fragment:kh,morphinstance_vertex:Gh,morphcolor_vertex:Wh,morphnormal_vertex:Xh,morphtarget_pars_vertex:Yh,morphtarget_vertex:$h,normal_fragment_begin:qh,normal_fragment_maps:Zh,normal_pars_fragment:jh,normal_pars_vertex:Kh,normal_vertex:Jh,normalmap_pars_fragment:Qh,clearcoat_normal_fragment_begin:ed,clearcoat_normal_fragment_maps:td,clearcoat_pars_fragment:nd,iridescence_pars_fragment:id,opaque_fragment:rd,packing:od,premultiplied_alpha_fragment:ad,project_vertex:sd,dithering_fragment:ld,dithering_pars_fragment:cd,roughnessmap_fragment:hd,roughnessmap_pars_fragment:dd,shadowmap_pars_fragment:ud,shadowmap_pars_vertex:fd,shadowmap_vertex:pd,shadowmask_pars_fragment:md,skinbase_vertex:gd,skinning_pars_vertex:_d,skinning_vertex:xd,skinnormal_vertex:vd,specularmap_fragment:bd,specularmap_pars_fragment:yd,tonemapping_fragment:Md,tonemapping_pars_fragment:Sd,transmission_fragment:Ed,transmission_pars_fragment:Ad,uv_pars_fragment:Td,uv_pars_vertex:wd,uv_vertex:Rd,worldpos_vertex:Cd,background_vert:Nd,background_frag:Dd,backgroundCube_vert:Pd,backgroundCube_frag:Ld,cube_vert:Ud,cube_frag:zd,depth_vert:Id,depth_frag:Fd,distanceRGBA_vert:Od,distanceRGBA_frag:Bd,equirect_vert:Hd,equirect_frag:Vd,linedashed_vert:kd,linedashed_frag:Gd,meshbasic_vert:Wd,meshbasic_frag:Xd,meshlambert_vert:Yd,meshlambert_frag:$d,meshmatcap_vert:qd,meshmatcap_frag:Zd,meshnormal_vert:jd,meshnormal_frag:Kd,meshphong_vert:Jd,meshphong_frag:Qd,meshphysical_vert:eu,meshphysical_frag:tu,meshtoon_vert:nu,meshtoon_frag:iu,points_vert:ru,points_frag:ou,shadow_vert:au,shadow_frag:su,sprite_vert:lu,sprite_frag:cu},re={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},Ft={basic:{uniforms:gt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Ne.meshbasic_vert,fragmentShader:Ne.meshbasic_frag},lambert:{uniforms:gt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ne.meshlambert_vert,fragmentShader:Ne.meshlambert_frag},phong:{uniforms:gt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:Ne.meshphong_vert,fragmentShader:Ne.meshphong_frag},standard:{uniforms:gt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag},toon:{uniforms:gt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new ze(0)}}]),vertexShader:Ne.meshtoon_vert,fragmentShader:Ne.meshtoon_frag},matcap:{uniforms:gt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Ne.meshmatcap_vert,fragmentShader:Ne.meshmatcap_frag},points:{uniforms:gt([re.points,re.fog]),vertexShader:Ne.points_vert,fragmentShader:Ne.points_frag},dashed:{uniforms:gt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ne.linedashed_vert,fragmentShader:Ne.linedashed_frag},depth:{uniforms:gt([re.common,re.displacementmap]),vertexShader:Ne.depth_vert,fragmentShader:Ne.depth_frag},normal:{uniforms:gt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Ne.meshnormal_vert,fragmentShader:Ne.meshnormal_frag},sprite:{uniforms:gt([re.sprite,re.fog]),vertexShader:Ne.sprite_vert,fragmentShader:Ne.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ne.background_vert,fragmentShader:Ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:Ne.backgroundCube_vert,fragmentShader:Ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ne.cube_vert,fragmentShader:Ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ne.equirect_vert,fragmentShader:Ne.equirect_frag},distanceRGBA:{uniforms:gt([re.common,re.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ne.distanceRGBA_vert,fragmentShader:Ne.distanceRGBA_frag},shadow:{uniforms:gt([re.lights,re.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:Ne.shadow_vert,fragmentShader:Ne.shadow_frag}};Ft.physical={uniforms:gt([Ft.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:Ne.meshphysical_vert,fragmentShader:Ne.meshphysical_frag};const ji={r:0,b:0,g:0},bn=new Kt,hu=new Ze;function du(i,e,t,n,r,o,a){const s=new ze(0);let l=o===!0?0:1,c,d,f=null,p=0,g=null;function x(u,h){let E=!1,y=h.isScene===!0?h.background:null;y&&y.isTexture&&(y=(h.backgroundBlurriness>0?t:e).get(y)),y===null?b(s,l):y&&y.isColor&&(b(y,1),E=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,a):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||E)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),y&&(y.isCubeTexture||y.mapping===cr)?(d===void 0&&(d=new Ut(new Ln(1,1,1),new fn({name:"BackgroundCubeMaterial",uniforms:ci(Ft.backgroundCube.uniforms),vertexShader:Ft.backgroundCube.vertexShader,fragmentShader:Ft.backgroundCube.fragmentShader,side:vt,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),bn.copy(h.backgroundRotation),bn.x*=-1,bn.y*=-1,bn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(bn.y*=-1,bn.z*=-1),d.material.uniforms.envMap.value=y,d.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=h.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(hu.makeRotationFromEuler(bn)),d.material.toneMapped=Ye.getTransfer(y.colorSpace)!==qe,(f!==y||p!==y.version||g!==i.toneMapping)&&(d.material.needsUpdate=!0,f=y,p=y.version,g=i.toneMapping),d.layers.enableAll(),u.unshift(d,d.geometry,d.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Ut(new ur(2,2),new fn({name:"BackgroundMaterial",uniforms:ci(Ft.background.uniforms),vertexShader:Ft.background.vertexShader,fragmentShader:Ft.background.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=h.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(y.colorSpace)!==qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(f!==y||p!==y.version||g!==i.toneMapping)&&(c.material.needsUpdate=!0,f=y,p=y.version,g=i.toneMapping),c.layers.enableAll(),u.unshift(c,c.geometry,c.material,0,0,null))}function b(u,h){u.getRGB(ji,bs(i)),n.buffers.color.setClear(ji.r,ji.g,ji.b,h,a)}return{getClearColor:function(){return s},setClearColor:function(u,h=1){s.set(u),l=h,b(s,l)},getClearAlpha:function(){return l},setClearAlpha:function(u){l=u,b(s,l)},render:x}}function uu(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=p(null);let o=r,a=!1;function s(v,L,W,C,$){let X=!1;const j=f(C,W,L);o!==j&&(o=j,c(o.object)),X=g(v,C,W,$),X&&x(v,C,W,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,w(v,L,W,C),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function d(v){return i.deleteVertexArray(v)}function f(v,L,W){const C=W.wireframe===!0;let $=n[v.id];$===void 0&&($={},n[v.id]=$);let X=$[L.id];X===void 0&&(X={},$[L.id]=X);let j=X[C];return j===void 0&&(j=p(l()),X[C]=j),j}function p(v){const L=[],W=[],C=[];for(let $=0;$<t;$++)L[$]=0,W[$]=0,C[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:W,attributeDivisors:C,object:v,attributes:{},index:null}}function g(v,L,W,C){const $=o.attributes,X=L.attributes;let j=0;const J=W.getAttributes();for(const H in J)if(J[H].location>=0){const Q=$[H];let ue=X[H];if(ue===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(ue=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(ue=v.instanceColor)),Q===void 0||Q.attribute!==ue||ue&&Q.data!==ue.data)return!0;j++}return o.attributesNum!==j||o.index!==C}function x(v,L,W,C){const $={},X=L.attributes;let j=0;const J=W.getAttributes();for(const H in J)if(J[H].location>=0){let Q=X[H];Q===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(Q=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(Q=v.instanceColor));const ue={};ue.attribute=Q,Q&&Q.data&&(ue.data=Q.data),$[H]=ue,j++}o.attributes=$,o.attributesNum=j,o.index=C}function b(){const v=o.newAttributes;for(let L=0,W=v.length;L<W;L++)v[L]=0}function u(v){h(v,0)}function h(v,L){const W=o.newAttributes,C=o.enabledAttributes,$=o.attributeDivisors;W[v]=1,C[v]===0&&(i.enableVertexAttribArray(v),C[v]=1),$[v]!==L&&(i.vertexAttribDivisor(v,L),$[v]=L)}function E(){const v=o.newAttributes,L=o.enabledAttributes;for(let W=0,C=L.length;W<C;W++)L[W]!==v[W]&&(i.disableVertexAttribArray(W),L[W]=0)}function y(v,L,W,C,$,X,j){j===!0?i.vertexAttribIPointer(v,L,W,$,X):i.vertexAttribPointer(v,L,W,C,$,X)}function w(v,L,W,C){b();const $=C.attributes,X=W.getAttributes(),j=L.defaultAttributeValues;for(const J in X){const H=X[J];if(H.location>=0){let ee=$[J];if(ee===void 0&&(J==="instanceMatrix"&&v.instanceMatrix&&(ee=v.instanceMatrix),J==="instanceColor"&&v.instanceColor&&(ee=v.instanceColor)),ee!==void 0){const Q=ee.normalized,ue=ee.itemSize,Le=e.get(ee);if(Le===void 0)continue;const We=Le.buffer,k=Le.type,te=Le.bytesPerElement,ce=k===i.INT||k===i.UNSIGNED_INT||ee.gpuType===ns;if(ee.isInterleavedBufferAttribute){const ae=ee.data,Ee=ae.stride,Te=ee.offset;if(ae.isInstancedInterleavedBuffer){for(let Ie=0;Ie<H.locationSize;Ie++)h(H.location+Ie,ae.meshPerAttribute);v.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ie=0;Ie<H.locationSize;Ie++)u(H.location+Ie);i.bindBuffer(i.ARRAY_BUFFER,We);for(let Ie=0;Ie<H.locationSize;Ie++)y(H.location+Ie,ue/H.locationSize,k,Q,Ee*te,(Te+ue/H.locationSize*Ie)*te,ce)}else{if(ee.isInstancedBufferAttribute){for(let ae=0;ae<H.locationSize;ae++)h(H.location+ae,ee.meshPerAttribute);v.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ae=0;ae<H.locationSize;ae++)u(H.location+ae);i.bindBuffer(i.ARRAY_BUFFER,We);for(let ae=0;ae<H.locationSize;ae++)y(H.location+ae,ue/H.locationSize,k,Q,ue*te,ue/H.locationSize*ae*te,ce)}}else if(j!==void 0){const Q=j[J];if(Q!==void 0)switch(Q.length){case 2:i.vertexAttrib2fv(H.location,Q);break;case 3:i.vertexAttrib3fv(H.location,Q);break;case 4:i.vertexAttrib4fv(H.location,Q);break;default:i.vertexAttrib1fv(H.location,Q)}}}}E()}function I(){V();for(const v in n){const L=n[v];for(const W in L){const C=L[W];for(const $ in C)d(C[$].object),delete C[$];delete L[W]}delete n[v]}}function R(v){if(n[v.id]===void 0)return;const L=n[v.id];for(const W in L){const C=L[W];for(const $ in C)d(C[$].object),delete C[$];delete L[W]}delete n[v.id]}function T(v){for(const L in n){const W=n[L];if(W[v.id]===void 0)continue;const C=W[v.id];for(const $ in C)d(C[$].object),delete C[$];delete W[v.id]}}function V(){S(),a=!0,o!==r&&(o=r,c(o.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:V,resetDefaultState:S,dispose:I,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:u,disableUnusedAttributes:E}}function fu(i,e,t){let n;function r(l){n=l}function o(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,d){d!==0&&(i.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function s(l,c,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<d;p++)this.render(l[p],c[p]);else{f.multiDrawArraysWEBGL(n,l,0,c,0,d);let p=0;for(let g=0;g<d;g++)p+=c[g];t.update(p,n,1)}}this.setMode=r,this.render=o,this.renderInstances=a,this.renderMultiDraw=s}function pu(i,e,t){let n;function r(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const y=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(y){if(y==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp";const s=o(a);s!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",s,"instead."),a=s);const l=t.logarithmicDepthBuffer===!0,c=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),u=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),h=d>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:l,maxTextures:c,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:x,maxVaryings:b,maxFragmentUniforms:u,vertexTextures:h,maxSamples:E}}function mu(i){const e=this;let t=null,n=0,r=!1,o=!1;const a=new sn,s=new De,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,p){const g=f.length!==0||p||n!==0||r;return r=p,n=f.length,g},this.beginShadows=function(){o=!0,d(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,p){t=d(f,p,0)},this.setState=function(f,p,g){const x=f.clippingPlanes,b=f.clipIntersection,u=f.clipShadows,h=i.get(f);if(!r||x===null||x.length===0||o&&!u)o?d(null):c();else{const E=o?0:n,y=E*4;let w=h.clippingState||null;l.value=w,w=d(x,p,y,g);for(let I=0;I!==y;++I)w[I]=t[I];h.clippingState=w,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(f,p,g,x){const b=f!==null?f.length:0;let u=null;if(b!==0){if(u=l.value,x!==!0||u===null){const h=g+b*4,E=p.matrixWorldInverse;s.getNormalMatrix(E),(u===null||u.length<h)&&(u=new Float32Array(h));for(let y=0,w=g;y!==b;++y,w+=4)a.copy(f[y]).applyMatrix4(E,s),a.normal.toArray(u,w),u[w+3]=a.constant}l.value=u,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,u}}function gu(i){let e=new WeakMap;function t(a,s){return s===no?a.mapping=ai:s===io&&(a.mapping=si),a}function n(a){if(a&&a.isTexture){const s=a.mapping;if(s===no||s===io)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Tc(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const s=a.target;s.removeEventListener("dispose",r);const l=e.get(s);l!==void 0&&(e.delete(s),l.dispose())}function o(){e=new WeakMap}return{get:n,dispose:o}}class Es extends ys{constructor(e=-1,t=1,n=1,r=-1,o=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=o,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,o,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=o,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let o=n-e,a=n+e,s=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,a=o+c*this.view.width,s-=d*this.view.offsetY,l=s-d*this.view.height}this.projectionMatrix.makeOrthographic(o,a,s,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ni=4,va=[.125,.215,.35,.446,.526,.582],En=20,kr=new Es,ba=new ze;let Gr=null,Wr=0,Xr=0,Yr=!1;const Mn=(1+Math.sqrt(5))/2,Qn=1/Mn,ya=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,Mn,Qn),new N(0,Mn,-Qn),new N(Qn,0,Mn),new N(-Qn,0,Mn),new N(Mn,Qn,0),new N(-Mn,Qn,0)];class Ma{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){Gr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),Yr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(e,n,r,o),t>0&&this._blur(o,0,0,t),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Aa(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ea(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Gr,Wr,Xr),this._renderer.xr.enabled=Yr,e.scissorTest=!1,Ki(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ai||e.mapping===si?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),Yr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Lt,minFilter:Lt,generateMipmaps:!1,type:ir,format:Bt,colorSpace:Ct,depthBuffer:!1},r=Sa(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sa(e,t,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_u(o)),this._blurMaterial=xu(o,e,t)}return r}_compileMaterial(e){const t=new Ut(this._lodPlanes[0],e);this._renderer.compile(t,kr)}_sceneToCubeUV(e,t,n,r){const s=new Rt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,p=d.toneMapping;d.getClearColor(ba),d.toneMapping=hn,d.autoClear=!1;const g=new uo({name:"PMREM.Background",side:vt,depthWrite:!1,depthTest:!1}),x=new Ut(new Ln,g);let b=!1;const u=e.background;u?u.isColor&&(g.color.copy(u),e.background=null,b=!0):(g.color.copy(ba),b=!0);for(let h=0;h<6;h++){const E=h%3;E===0?(s.up.set(0,l[h],0),s.lookAt(c[h],0,0)):E===1?(s.up.set(0,0,l[h]),s.lookAt(0,c[h],0)):(s.up.set(0,l[h],0),s.lookAt(0,0,c[h]));const y=this._cubeSize;Ki(r,E*y,h>2?y:0,y,y),d.setRenderTarget(r),b&&d.render(x,s),d.render(e,s)}x.geometry.dispose(),x.material.dispose(),d.toneMapping=p,d.autoClear=f,e.background=u}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===ai||e.mapping===si;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Aa()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ea());const o=r?this._cubemapMaterial:this._equirectMaterial,a=new Ut(this._lodPlanes[0],o),s=o.uniforms;s.envMap.value=e;const l=this._cubeSize;Ki(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,kr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ya[(r-1)%ya.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,r,o){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",o),this._halfBlur(a,e,n,n,r,"longitudinal",o)}_halfBlur(e,t,n,r,o,a,s){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,f=new Ut(this._lodPlanes[r],c),p=c.uniforms,g=this._sizeLods[n]-1,x=isFinite(o)?Math.PI/(2*g):2*Math.PI/(2*En-1),b=o/x,u=isFinite(o)?1+Math.floor(d*b):En;u>En&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${u} samples when the maximum is set to ${En}`);const h=[];let E=0;for(let T=0;T<En;++T){const V=T/b,S=Math.exp(-V*V/2);h.push(S),T===0?E+=S:T<u&&(E+=2*S)}for(let T=0;T<h.length;T++)h[T]=h[T]/E;p.envMap.value=e.texture,p.samples.value=u,p.weights.value=h,p.latitudinal.value=a==="latitudinal",s&&(p.poleAxis.value=s);const{_lodMax:y}=this;p.dTheta.value=x,p.mipInt.value=y-n;const w=this._sizeLods[r],I=3*w*(r>y-ni?r-y+ni:0),R=4*(this._cubeSize-w);Ki(t,I,R,3*w,2*w),l.setRenderTarget(t),l.render(f,kr)}}function _u(i){const e=[],t=[],n=[];let r=i;const o=i-ni+1+va.length;for(let a=0;a<o;a++){const s=Math.pow(2,r);t.push(s);let l=1/s;a>i-ni?l=va[a-i+ni-1]:a===0&&(l=0),n.push(l);const c=1/(s-2),d=-c,f=1+c,p=[d,d,f,d,f,f,d,d,f,f,d,f],g=6,x=6,b=3,u=2,h=1,E=new Float32Array(b*x*g),y=new Float32Array(u*x*g),w=new Float32Array(h*x*g);for(let R=0;R<g;R++){const T=R%3*2/3-1,V=R>2?0:-1,S=[T,V,0,T+2/3,V,0,T+2/3,V+1,0,T,V,0,T+2/3,V+1,0,T,V+1,0];E.set(S,b*x*R),y.set(p,u*x*R);const v=[R,R,R,R,R,R];w.set(v,h*x*R)}const I=new Pn;I.setAttribute("position",new zt(E,b)),I.setAttribute("uv",new zt(y,u)),I.setAttribute("faceIndex",new zt(w,h)),e.push(I),r>ni&&r--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Sa(i,e,t){const n=new Rn(i,e,t);return n.texture.mapping=cr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ki(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function xu(i,e,t){const n=new Float32Array(En),r=new N(0,1,0);return new fn({name:"SphericalGaussianBlur",defines:{n:En,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:po(),fragmentShader:`

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
		`,blending:cn,depthTest:!1,depthWrite:!1})}function Ea(){return new fn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:po(),fragmentShader:`

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
		`,blending:cn,depthTest:!1,depthWrite:!1})}function Aa(){return new fn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:po(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:cn,depthTest:!1,depthWrite:!1})}function po(){return`

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
	`}function vu(i){let e=new WeakMap,t=null;function n(s){if(s&&s.isTexture){const l=s.mapping,c=l===no||l===io,d=l===ai||l===si;if(c||d){let f=e.get(s);const p=f!==void 0?f.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==p)return t===null&&(t=new Ma(i)),f=c?t.fromEquirectangular(s,f):t.fromCubemap(s,f),f.texture.pmremVersion=s.pmremVersion,e.set(s,f),f.texture;if(f!==void 0)return f.texture;{const g=s.image;return c&&g&&g.height>0||d&&g&&r(g)?(t===null&&(t=new Ma(i)),f=c?t.fromEquirectangular(s):t.fromCubemap(s),f.texture.pmremVersion=s.pmremVersion,e.set(s,f),s.addEventListener("dispose",o),f.texture):null}}}return s}function r(s){let l=0;const c=6;for(let d=0;d<c;d++)s[d]!==void 0&&l++;return l===c}function o(s){const l=s.target;l.removeEventListener("dispose",o);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function bu(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function yu(i,e,t,n){const r={},o=new WeakMap;function a(f){const p=f.target;p.index!==null&&e.remove(p.index);for(const x in p.attributes)e.remove(p.attributes[x]);for(const x in p.morphAttributes){const b=p.morphAttributes[x];for(let u=0,h=b.length;u<h;u++)e.remove(b[u])}p.removeEventListener("dispose",a),delete r[p.id];const g=o.get(p);g&&(e.remove(g),o.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function s(f,p){return r[p.id]===!0||(p.addEventListener("dispose",a),r[p.id]=!0,t.memory.geometries++),p}function l(f){const p=f.attributes;for(const x in p)e.update(p[x],i.ARRAY_BUFFER);const g=f.morphAttributes;for(const x in g){const b=g[x];for(let u=0,h=b.length;u<h;u++)e.update(b[u],i.ARRAY_BUFFER)}}function c(f){const p=[],g=f.index,x=f.attributes.position;let b=0;if(g!==null){const E=g.array;b=g.version;for(let y=0,w=E.length;y<w;y+=3){const I=E[y+0],R=E[y+1],T=E[y+2];p.push(I,R,R,T,T,I)}}else if(x!==void 0){const E=x.array;b=x.version;for(let y=0,w=E.length/3-1;y<w;y+=3){const I=y+0,R=y+1,T=y+2;p.push(I,R,R,T,T,I)}}else return;const u=new(us(p)?vs:xs)(p,1);u.version=b;const h=o.get(f);h&&e.remove(h),o.set(f,u)}function d(f){const p=o.get(f);if(p){const g=f.index;g!==null&&p.version<g.version&&c(f)}else c(f);return o.get(f)}return{get:s,update:l,getWireframeAttribute:d}}function Mu(i,e,t){let n;function r(f){n=f}let o,a;function s(f){o=f.type,a=f.bytesPerElement}function l(f,p){i.drawElements(n,p,o,f*a),t.update(p,n,1)}function c(f,p,g){g!==0&&(i.drawElementsInstanced(n,p,o,f*a,g),t.update(p,n,g))}function d(f,p,g){if(g===0)return;const x=e.get("WEBGL_multi_draw");if(x===null)for(let b=0;b<g;b++)this.render(f[b]/a,p[b]);else{x.multiDrawElementsWEBGL(n,p,0,o,f,0,g);let b=0;for(let u=0;u<g;u++)b+=p[u];t.update(b,n,1)}}this.setMode=r,this.setIndex=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function Su(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,a,s){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=s*(o/3);break;case i.LINES:t.lines+=s*(o/2);break;case i.LINE_STRIP:t.lines+=s*(o-1);break;case i.LINE_LOOP:t.lines+=s*o;break;case i.POINTS:t.points+=s*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Eu(i,e,t){const n=new WeakMap,r=new Je;function o(a,s,l){const c=a.morphTargetInfluences,d=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,f=d!==void 0?d.length:0;let p=n.get(s);if(p===void 0||p.count!==f){let v=function(){V.dispose(),n.delete(s),s.removeEventListener("dispose",v)};var g=v;p!==void 0&&p.texture.dispose();const x=s.morphAttributes.position!==void 0,b=s.morphAttributes.normal!==void 0,u=s.morphAttributes.color!==void 0,h=s.morphAttributes.position||[],E=s.morphAttributes.normal||[],y=s.morphAttributes.color||[];let w=0;x===!0&&(w=1),b===!0&&(w=2),u===!0&&(w=3);let I=s.attributes.position.count*w,R=1;I>e.maxTextureSize&&(R=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const T=new Float32Array(I*R*4*f),V=new ps(T,I,R,f);V.type=Zt,V.needsUpdate=!0;const S=w*4;for(let L=0;L<f;L++){const W=h[L],C=E[L],$=y[L],X=I*R*4*L;for(let j=0;j<W.count;j++){const J=j*S;x===!0&&(r.fromBufferAttribute(W,j),T[X+J+0]=r.x,T[X+J+1]=r.y,T[X+J+2]=r.z,T[X+J+3]=0),b===!0&&(r.fromBufferAttribute(C,j),T[X+J+4]=r.x,T[X+J+5]=r.y,T[X+J+6]=r.z,T[X+J+7]=0),u===!0&&(r.fromBufferAttribute($,j),T[X+J+8]=r.x,T[X+J+9]=r.y,T[X+J+10]=r.z,T[X+J+11]=$.itemSize===4?r.w:1)}}p={count:f,texture:V,size:new Se(I,R)},n.set(s,p),s.addEventListener("dispose",v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let x=0;for(let u=0;u<c.length;u++)x+=c[u];const b=s.morphTargetsRelative?1:1-x;l.getUniforms().setValue(i,"morphTargetBaseInfluence",b),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:o}}function Au(i,e,t,n){let r=new WeakMap;function o(l){const c=n.render.frame,d=l.geometry,f=e.get(l,d);if(r.get(f)!==c&&(e.update(f),r.set(f,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",s)===!1&&l.addEventListener("dispose",s),r.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==c&&(p.update(),r.set(p,c))}return f}function a(){r=new WeakMap}function s(l){const c=l.target;c.removeEventListener("dispose",s),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:o,dispose:a}}class As extends pt{constructor(e,t,n,r,o,a,s,l,c,d){if(d=d!==void 0?d:ri,d!==ri&&d!==Ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&d===ri&&(n=li),n===void 0&&d===Ei&&(n=wi),super(null,r,o,a,s,l,d,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=s!==void 0?s:xt,this.minFilter=l!==void 0?l:xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ts=new pt,ws=new As(1,1);ws.compareFunction=hs;const Rs=new ps,Cs=new hc,Ns=new Ms,Ta=[],wa=[],Ra=new Float32Array(16),Ca=new Float32Array(9),Na=new Float32Array(4);function di(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let o=Ta[r];if(o===void 0&&(o=new Float32Array(r),Ta[r]=o),e!==0){n.toArray(o,0);for(let a=1,s=0;a!==e;++a)s+=t,i[a].toArray(o,s)}return o}function ot(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function at(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function fr(i,e){let t=wa[e];t===void 0&&(t=new Int32Array(e),wa[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Tu(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function wu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2fv(this.addr,e),at(t,e)}}function Ru(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ot(t,e))return;i.uniform3fv(this.addr,e),at(t,e)}}function Cu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4fv(this.addr,e),at(t,e)}}function Nu(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),at(t,e)}else{if(ot(t,n))return;Na.set(n),i.uniformMatrix2fv(this.addr,!1,Na),at(t,n)}}function Du(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),at(t,e)}else{if(ot(t,n))return;Ca.set(n),i.uniformMatrix3fv(this.addr,!1,Ca),at(t,n)}}function Pu(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ot(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),at(t,e)}else{if(ot(t,n))return;Ra.set(n),i.uniformMatrix4fv(this.addr,!1,Ra),at(t,n)}}function Lu(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Uu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2iv(this.addr,e),at(t,e)}}function zu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;i.uniform3iv(this.addr,e),at(t,e)}}function Iu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4iv(this.addr,e),at(t,e)}}function Fu(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ou(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ot(t,e))return;i.uniform2uiv(this.addr,e),at(t,e)}}function Bu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ot(t,e))return;i.uniform3uiv(this.addr,e),at(t,e)}}function Hu(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ot(t,e))return;i.uniform4uiv(this.addr,e),at(t,e)}}function Vu(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);const o=this.type===i.SAMPLER_2D_SHADOW?ws:Ts;t.setTexture2D(e||o,r)}function ku(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Cs,r)}function Gu(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Ns,r)}function Wu(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Rs,r)}function Xu(i){switch(i){case 5126:return Tu;case 35664:return wu;case 35665:return Ru;case 35666:return Cu;case 35674:return Nu;case 35675:return Du;case 35676:return Pu;case 5124:case 35670:return Lu;case 35667:case 35671:return Uu;case 35668:case 35672:return zu;case 35669:case 35673:return Iu;case 5125:return Fu;case 36294:return Ou;case 36295:return Bu;case 36296:return Hu;case 35678:case 36198:case 36298:case 36306:case 35682:return Vu;case 35679:case 36299:case 36307:return ku;case 35680:case 36300:case 36308:case 36293:return Gu;case 36289:case 36303:case 36311:case 36292:return Wu}}function Yu(i,e){i.uniform1fv(this.addr,e)}function $u(i,e){const t=di(e,this.size,2);i.uniform2fv(this.addr,t)}function qu(i,e){const t=di(e,this.size,3);i.uniform3fv(this.addr,t)}function Zu(i,e){const t=di(e,this.size,4);i.uniform4fv(this.addr,t)}function ju(i,e){const t=di(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Ku(i,e){const t=di(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Ju(i,e){const t=di(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Qu(i,e){i.uniform1iv(this.addr,e)}function ef(i,e){i.uniform2iv(this.addr,e)}function tf(i,e){i.uniform3iv(this.addr,e)}function nf(i,e){i.uniform4iv(this.addr,e)}function rf(i,e){i.uniform1uiv(this.addr,e)}function of(i,e){i.uniform2uiv(this.addr,e)}function af(i,e){i.uniform3uiv(this.addr,e)}function sf(i,e){i.uniform4uiv(this.addr,e)}function lf(i,e,t){const n=this.cache,r=e.length,o=fr(t,r);ot(n,o)||(i.uniform1iv(this.addr,o),at(n,o));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Ts,o[a])}function cf(i,e,t){const n=this.cache,r=e.length,o=fr(t,r);ot(n,o)||(i.uniform1iv(this.addr,o),at(n,o));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Cs,o[a])}function hf(i,e,t){const n=this.cache,r=e.length,o=fr(t,r);ot(n,o)||(i.uniform1iv(this.addr,o),at(n,o));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Ns,o[a])}function df(i,e,t){const n=this.cache,r=e.length,o=fr(t,r);ot(n,o)||(i.uniform1iv(this.addr,o),at(n,o));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Rs,o[a])}function uf(i){switch(i){case 5126:return Yu;case 35664:return $u;case 35665:return qu;case 35666:return Zu;case 35674:return ju;case 35675:return Ku;case 35676:return Ju;case 5124:case 35670:return Qu;case 35667:case 35671:return ef;case 35668:case 35672:return tf;case 35669:case 35673:return nf;case 5125:return rf;case 36294:return of;case 36295:return af;case 36296:return sf;case 35678:case 36198:case 36298:case 36306:case 35682:return lf;case 35679:case 36299:case 36307:return cf;case 35680:case 36300:case 36308:case 36293:return hf;case 36289:case 36303:case 36311:case 36292:return df}}class ff{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xu(t.type)}}class pf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uf(t.type)}}class mf{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let o=0,a=r.length;o!==a;++o){const s=r[o];s.setValue(e,t[s.id],n)}}}const $r=/(\w+)(\])?(\[|\.)?/g;function Da(i,e){i.seq.push(e),i.map[e.id]=e}function gf(i,e,t){const n=i.name,r=n.length;for($r.lastIndex=0;;){const o=$r.exec(n),a=$r.lastIndex;let s=o[1];const l=o[2]==="]",c=o[3];if(l&&(s=s|0),c===void 0||c==="["&&a+2===r){Da(t,c===void 0?new ff(s,i,e):new pf(s,i,e));break}else{let f=t.map[s];f===void 0&&(f=new mf(s),Da(t,f)),t=f}}}class tr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=e.getActiveUniform(t,r),a=e.getUniformLocation(t,o.name);gf(o,a,this)}}setValue(e,t,n,r){const o=this.map[t];o!==void 0&&o.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let o=0,a=t.length;o!==a;++o){const s=t[o],l=n[s.id];l.needsUpdate!==!1&&s.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,o=e.length;r!==o;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Pa(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const _f=37297;let xf=0;function vf(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),o=Math.min(e+6,t.length);for(let a=r;a<o;a++){const s=a+1;n.push(`${s===e?">":" "} ${s}: ${t[a]}`)}return n.join(`
`)}function bf(i){const e=Ye.getPrimaries(Ye.workingColorSpace),t=Ye.getPrimaries(i);let n;switch(e===t?n="":e===ar&&t===or?n="LinearDisplayP3ToLinearSRGB":e===or&&t===ar&&(n="LinearSRGBToLinearDisplayP3"),i){case Ct:case hr:return[n,"LinearTransferOETF"];case It:case co:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function La(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+vf(i.getShaderSource(e),a)}else return r}function yf(i,e){const t=bf(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Mf(i,e){let t;switch(e){case ul:t="Linear";break;case fl:t="Reinhard";break;case pl:t="OptimizedCineon";break;case ml:t="ACESFilmic";break;case _l:t="AgX";break;case xl:t="Neutral";break;case gl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Sf(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(yi).join(`
`)}function Ef(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Af(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const o=i.getActiveAttrib(e,r),a=o.name;let s=1;o.type===i.FLOAT_MAT2&&(s=2),o.type===i.FLOAT_MAT3&&(s=3),o.type===i.FLOAT_MAT4&&(s=4),t[a]={type:o.type,location:i.getAttribLocation(e,a),locationSize:s}}return t}function yi(i){return i!==""}function Ua(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function za(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tf=/^[ \t]*#include +<([\w\d./]+)>/gm;function ao(i){return i.replace(Tf,Rf)}const wf=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Rf(i,e){let t=Ne[e];if(t===void 0){const n=wf.get(e);if(n!==void 0)t=Ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ao(t)}const Cf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ia(i){return i.replace(Cf,Nf)}function Nf(i,e,t,n){let r="";for(let o=parseInt(e);o<parseInt(t);o++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return r}function Fa(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Df(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ja?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Os?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===$t&&(e="SHADOWMAP_TYPE_VSM"),e}function Pf(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ai:case si:e="ENVMAP_TYPE_CUBE";break;case cr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Lf(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case si:e="ENVMAP_MODE_REFRACTION";break}return e}function Uf(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Qa:e="ENVMAP_BLENDING_MULTIPLY";break;case hl:e="ENVMAP_BLENDING_MIX";break;case dl:e="ENVMAP_BLENDING_ADD";break}return e}function zf(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function If(i,e,t,n){const r=i.getContext(),o=t.defines;let a=t.vertexShader,s=t.fragmentShader;const l=Df(t),c=Pf(t),d=Lf(t),f=Uf(t),p=zf(t),g=Sf(t),x=Ef(o),b=r.createProgram();let u,h,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(yi).join(`
`),u.length>0&&(u+=`
`),h=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(yi).join(`
`),h.length>0&&(h+=`
`)):(u=[Fa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(yi).join(`
`),h=[Fa(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hn?"#define TONE_MAPPING":"",t.toneMapping!==hn?Ne.tonemapping_pars_fragment:"",t.toneMapping!==hn?Mf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ne.colorspace_pars_fragment,yf("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(yi).join(`
`)),a=ao(a),a=Ua(a,t),a=za(a,t),s=ao(s),s=Ua(s,t),s=za(s,t),a=Ia(a),s=Ia(s),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,u=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+u,h=["#define varying in",t.glslVersion===Jo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Jo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const y=E+u+a,w=E+h+s,I=Pa(r,r.VERTEX_SHADER,y),R=Pa(r,r.FRAGMENT_SHADER,w);r.attachShader(b,I),r.attachShader(b,R),t.index0AttributeName!==void 0?r.bindAttribLocation(b,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(b,0,"position"),r.linkProgram(b);function T(L){if(i.debug.checkShaderErrors){const W=r.getProgramInfoLog(b).trim(),C=r.getShaderInfoLog(I).trim(),$=r.getShaderInfoLog(R).trim();let X=!0,j=!0;if(r.getProgramParameter(b,r.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,b,I,R);else{const J=La(r,I,"vertex"),H=La(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(b,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+W+`
`+J+`
`+H)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(C===""||$==="")&&(j=!1);j&&(L.diagnostics={runnable:X,programLog:W,vertexShader:{log:C,prefix:u},fragmentShader:{log:$,prefix:h}})}r.deleteShader(I),r.deleteShader(R),V=new tr(r,b),S=Af(r,b)}let V;this.getUniforms=function(){return V===void 0&&T(this),V};let S;this.getAttributes=function(){return S===void 0&&T(this),S};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(b,_f)),v},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=xf++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=I,this.fragmentShader=R,this}let Ff=0;class Of{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),o=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(o)===!1&&(a.add(o),o.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Bf(e),t.set(e,n)),n}}class Bf{constructor(e){this.id=Ff++,this.code=e,this.usedTimes=0}}function Hf(i,e,t,n,r,o,a){const s=new gs,l=new Of,c=new Set,d=[],f=r.logarithmicDepthBuffer,p=r.vertexTextures;let g=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(S){return c.add(S),S===0?"uv":`uv${S}`}function u(S,v,L,W,C){const $=W.fog,X=C.geometry,j=S.isMeshStandardMaterial?W.environment:null,J=(S.isMeshStandardMaterial?t:e).get(S.envMap||j),H=J&&J.mapping===cr?J.image.height:null,ee=x[S.type];S.precision!==null&&(g=r.getMaxPrecision(S.precision),g!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",g,"instead."));const Q=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ue=Q!==void 0?Q.length:0;let Le=0;X.morphAttributes.position!==void 0&&(Le=1),X.morphAttributes.normal!==void 0&&(Le=2),X.morphAttributes.color!==void 0&&(Le=3);let We,k,te,ce;if(ee){const st=Ft[ee];We=st.vertexShader,k=st.fragmentShader}else We=S.vertexShader,k=S.fragmentShader,l.update(S),te=l.getVertexShaderID(S),ce=l.getFragmentShaderID(S);const ae=i.getRenderTarget(),Ee=C.isInstancedMesh===!0,Te=C.isBatchedMesh===!0,Ie=!!S.map,P=!!S.matcap,Pe=!!J,ve=!!S.aoMap,et=!!S.lightMap,be=!!S.bumpMap,Ge=!!S.normalMap,A=!!S.displacementMap,_=!!S.emissiveMap,B=!!S.metalnessMap,Y=!!S.roughnessMap,q=S.anisotropy>0,Z=S.clearcoat>0,ge=S.iridescence>0,K=S.sheen>0,me=S.transmission>0,_e=q&&!!S.anisotropyMap,ie=Z&&!!S.clearcoatMap,se=Z&&!!S.clearcoatNormalMap,ye=Z&&!!S.clearcoatRoughnessMap,he=ge&&!!S.iridescenceMap,de=ge&&!!S.iridescenceThicknessMap,Fe=K&&!!S.sheenColorMap,Oe=K&&!!S.sheenRoughnessMap,Ve=!!S.specularMap,He=!!S.specularColorMap,ke=!!S.specularIntensityMap,fe=me&&!!S.transmissionMap,m=me&&!!S.thicknessMap,U=!!S.gradientMap,G=!!S.alphaMap,ne=S.alphaTest>0,le=!!S.alphaHash,Be=!!S.extensions;let Ue=hn;S.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Ue=i.toneMapping);const je={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:We,fragmentShader:k,defines:S.defines,customVertexShaderID:te,customFragmentShaderID:ce,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:g,batching:Te,instancing:Ee,instancingColor:Ee&&C.instanceColor!==null,instancingMorph:Ee&&C.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Ct,alphaToCoverage:!!S.alphaToCoverage,map:Ie,matcap:P,envMap:Pe,envMapMode:Pe&&J.mapping,envMapCubeUVHeight:H,aoMap:ve,lightMap:et,bumpMap:be,normalMap:Ge,displacementMap:p&&A,emissiveMap:_,normalMapObjectSpace:Ge&&S.normalMapType===Pl,normalMapTangentSpace:Ge&&S.normalMapType===Dl,metalnessMap:B,roughnessMap:Y,anisotropy:q,anisotropyMap:_e,clearcoat:Z,clearcoatMap:ie,clearcoatNormalMap:se,clearcoatRoughnessMap:ye,iridescence:ge,iridescenceMap:he,iridescenceThicknessMap:de,sheen:K,sheenColorMap:Fe,sheenRoughnessMap:Oe,specularMap:Ve,specularColorMap:He,specularIntensityMap:ke,transmission:me,transmissionMap:fe,thicknessMap:m,gradientMap:U,opaque:S.transparent===!1&&S.blending===ii&&S.alphaToCoverage===!1,alphaMap:G,alphaTest:ne,alphaHash:le,combine:S.combine,mapUv:Ie&&b(S.map.channel),aoMapUv:ve&&b(S.aoMap.channel),lightMapUv:et&&b(S.lightMap.channel),bumpMapUv:be&&b(S.bumpMap.channel),normalMapUv:Ge&&b(S.normalMap.channel),displacementMapUv:A&&b(S.displacementMap.channel),emissiveMapUv:_&&b(S.emissiveMap.channel),metalnessMapUv:B&&b(S.metalnessMap.channel),roughnessMapUv:Y&&b(S.roughnessMap.channel),anisotropyMapUv:_e&&b(S.anisotropyMap.channel),clearcoatMapUv:ie&&b(S.clearcoatMap.channel),clearcoatNormalMapUv:se&&b(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&b(S.clearcoatRoughnessMap.channel),iridescenceMapUv:he&&b(S.iridescenceMap.channel),iridescenceThicknessMapUv:de&&b(S.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&b(S.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&b(S.sheenRoughnessMap.channel),specularMapUv:Ve&&b(S.specularMap.channel),specularColorMapUv:He&&b(S.specularColorMap.channel),specularIntensityMapUv:ke&&b(S.specularIntensityMap.channel),transmissionMapUv:fe&&b(S.transmissionMap.channel),thicknessMapUv:m&&b(S.thicknessMap.channel),alphaMapUv:G&&b(S.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ge||q),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!X.attributes.uv&&(Ie||G),fog:!!$,useFog:S.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:f,skinning:C.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ue,morphTextureStride:Le,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ue,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ie&&S.map.isVideoTexture===!0&&Ye.getTransfer(S.map.colorSpace)===qe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===qt,flipSided:S.side===vt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Be&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Be&&S.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return je.vertexUv1s=c.has(1),je.vertexUv2s=c.has(2),je.vertexUv3s=c.has(3),c.clear(),je}function h(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const L in S.defines)v.push(L),v.push(S.defines[L]);return S.isRawShaderMaterial===!1&&(E(v,S),y(v,S),v.push(i.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function E(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function y(S,v){s.disableAll(),v.supportsVertexTextures&&s.enable(0),v.instancing&&s.enable(1),v.instancingColor&&s.enable(2),v.instancingMorph&&s.enable(3),v.matcap&&s.enable(4),v.envMap&&s.enable(5),v.normalMapObjectSpace&&s.enable(6),v.normalMapTangentSpace&&s.enable(7),v.clearcoat&&s.enable(8),v.iridescence&&s.enable(9),v.alphaTest&&s.enable(10),v.vertexColors&&s.enable(11),v.vertexAlphas&&s.enable(12),v.vertexUv1s&&s.enable(13),v.vertexUv2s&&s.enable(14),v.vertexUv3s&&s.enable(15),v.vertexTangents&&s.enable(16),v.anisotropy&&s.enable(17),v.alphaHash&&s.enable(18),v.batching&&s.enable(19),S.push(s.mask),s.disableAll(),v.fog&&s.enable(0),v.useFog&&s.enable(1),v.flatShading&&s.enable(2),v.logarithmicDepthBuffer&&s.enable(3),v.skinning&&s.enable(4),v.morphTargets&&s.enable(5),v.morphNormals&&s.enable(6),v.morphColors&&s.enable(7),v.premultipliedAlpha&&s.enable(8),v.shadowMapEnabled&&s.enable(9),v.useLegacyLights&&s.enable(10),v.doubleSided&&s.enable(11),v.flipSided&&s.enable(12),v.useDepthPacking&&s.enable(13),v.dithering&&s.enable(14),v.transmission&&s.enable(15),v.sheen&&s.enable(16),v.opaque&&s.enable(17),v.pointsUvs&&s.enable(18),v.decodeVideoTexture&&s.enable(19),v.alphaToCoverage&&s.enable(20),S.push(s.mask)}function w(S){const v=x[S.type];let L;if(v){const W=Ft[v];L=Mc.clone(W.uniforms)}else L=S.uniforms;return L}function I(S,v){let L;for(let W=0,C=d.length;W<C;W++){const $=d[W];if($.cacheKey===v){L=$,++L.usedTimes;break}}return L===void 0&&(L=new If(i,v,S,o),d.push(L)),L}function R(S){if(--S.usedTimes===0){const v=d.indexOf(S);d[v]=d[d.length-1],d.pop(),S.destroy()}}function T(S){l.remove(S)}function V(){l.dispose()}return{getParameters:u,getProgramCacheKey:h,getUniforms:w,acquireProgram:I,releaseProgram:R,releaseShaderCache:T,programs:d,dispose:V}}function Vf(){let i=new WeakMap;function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function t(o){i.delete(o)}function n(o,a,s){i.get(o)[a]=s}function r(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:r}}function kf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Oa(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ba(){const i=[];let e=0;const t=[],n=[],r=[];function o(){e=0,t.length=0,n.length=0,r.length=0}function a(f,p,g,x,b,u){let h=i[e];return h===void 0?(h={id:f.id,object:f,geometry:p,material:g,groupOrder:x,renderOrder:f.renderOrder,z:b,group:u},i[e]=h):(h.id=f.id,h.object=f,h.geometry=p,h.material=g,h.groupOrder=x,h.renderOrder=f.renderOrder,h.z=b,h.group=u),e++,h}function s(f,p,g,x,b,u){const h=a(f,p,g,x,b,u);g.transmission>0?n.push(h):g.transparent===!0?r.push(h):t.push(h)}function l(f,p,g,x,b,u){const h=a(f,p,g,x,b,u);g.transmission>0?n.unshift(h):g.transparent===!0?r.unshift(h):t.unshift(h)}function c(f,p){t.length>1&&t.sort(f||kf),n.length>1&&n.sort(p||Oa),r.length>1&&r.sort(p||Oa)}function d(){for(let f=e,p=i.length;f<p;f++){const g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:r,init:o,push:s,unshift:l,finish:d,sort:c}}function Gf(){let i=new WeakMap;function e(n,r){const o=i.get(n);let a;return o===void 0?(a=new Ba,i.set(n,[a])):r>=o.length?(a=new Ba,o.push(a)):a=o[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Wf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new ze};break;case"SpotLight":t={position:new N,direction:new N,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function Xf(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Yf=0;function $f(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function qf(i){const e=new Wf,t=Xf(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);const r=new N,o=new Ze,a=new Ze;function s(c,d){let f=0,p=0,g=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let x=0,b=0,u=0,h=0,E=0,y=0,w=0,I=0,R=0,T=0,V=0;c.sort($f);const S=d===!0?Math.PI:1;for(let L=0,W=c.length;L<W;L++){const C=c[L],$=C.color,X=C.intensity,j=C.distance,J=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)f+=$.r*X*S,p+=$.g*X*S,g+=$.b*X*S;else if(C.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(C.sh.coefficients[H],X);V++}else if(C.isDirectionalLight){const H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity*S),C.castShadow){const ee=C.shadow,Q=t.get(C);Q.shadowBias=ee.bias,Q.shadowNormalBias=ee.normalBias,Q.shadowRadius=ee.radius,Q.shadowMapSize=ee.mapSize,n.directionalShadow[x]=Q,n.directionalShadowMap[x]=J,n.directionalShadowMatrix[x]=C.shadow.matrix,y++}n.directional[x]=H,x++}else if(C.isSpotLight){const H=e.get(C);H.position.setFromMatrixPosition(C.matrixWorld),H.color.copy($).multiplyScalar(X*S),H.distance=j,H.coneCos=Math.cos(C.angle),H.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),H.decay=C.decay,n.spot[u]=H;const ee=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,ee.updateMatrices(C),C.castShadow&&T++),n.spotLightMatrix[u]=ee.matrix,C.castShadow){const Q=t.get(C);Q.shadowBias=ee.bias,Q.shadowNormalBias=ee.normalBias,Q.shadowRadius=ee.radius,Q.shadowMapSize=ee.mapSize,n.spotShadow[u]=Q,n.spotShadowMap[u]=J,I++}u++}else if(C.isRectAreaLight){const H=e.get(C);H.color.copy($).multiplyScalar(X),H.halfWidth.set(C.width*.5,0,0),H.halfHeight.set(0,C.height*.5,0),n.rectArea[h]=H,h++}else if(C.isPointLight){const H=e.get(C);if(H.color.copy(C.color).multiplyScalar(C.intensity*S),H.distance=C.distance,H.decay=C.decay,C.castShadow){const ee=C.shadow,Q=t.get(C);Q.shadowBias=ee.bias,Q.shadowNormalBias=ee.normalBias,Q.shadowRadius=ee.radius,Q.shadowMapSize=ee.mapSize,Q.shadowCameraNear=ee.camera.near,Q.shadowCameraFar=ee.camera.far,n.pointShadow[b]=Q,n.pointShadowMap[b]=J,n.pointShadowMatrix[b]=C.shadow.matrix,w++}n.point[b]=H,b++}else if(C.isHemisphereLight){const H=e.get(C);H.skyColor.copy(C.color).multiplyScalar(X*S),H.groundColor.copy(C.groundColor).multiplyScalar(X*S),n.hemi[E]=H,E++}}h>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=re.LTC_FLOAT_1,n.rectAreaLTC2=re.LTC_FLOAT_2):(n.rectAreaLTC1=re.LTC_HALF_1,n.rectAreaLTC2=re.LTC_HALF_2)),n.ambient[0]=f,n.ambient[1]=p,n.ambient[2]=g;const v=n.hash;(v.directionalLength!==x||v.pointLength!==b||v.spotLength!==u||v.rectAreaLength!==h||v.hemiLength!==E||v.numDirectionalShadows!==y||v.numPointShadows!==w||v.numSpotShadows!==I||v.numSpotMaps!==R||v.numLightProbes!==V)&&(n.directional.length=x,n.spot.length=u,n.rectArea.length=h,n.point.length=b,n.hemi.length=E,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=I,n.spotShadowMap.length=I,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=I+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=V,v.directionalLength=x,v.pointLength=b,v.spotLength=u,v.rectAreaLength=h,v.hemiLength=E,v.numDirectionalShadows=y,v.numPointShadows=w,v.numSpotShadows=I,v.numSpotMaps=R,v.numLightProbes=V,n.version=Yf++)}function l(c,d){let f=0,p=0,g=0,x=0,b=0;const u=d.matrixWorldInverse;for(let h=0,E=c.length;h<E;h++){const y=c[h];if(y.isDirectionalLight){const w=n.directional[f];w.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(u),f++}else if(y.isSpotLight){const w=n.spot[g];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(u),w.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(r),w.direction.transformDirection(u),g++}else if(y.isRectAreaLight){const w=n.rectArea[x];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(u),a.identity(),o.copy(y.matrixWorld),o.premultiply(u),a.extractRotation(o),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){const w=n.point[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(u),p++}else if(y.isHemisphereLight){const w=n.hemi[b];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(u),b++}}}return{setup:s,setupView:l,state:n}}function Ha(i){const e=new qf(i),t=[],n=[];function r(){t.length=0,n.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function s(d){e.setup(t,d)}function l(d){e.setupView(t,d)}return{init:r,state:{lightsArray:t,shadowsArray:n,lights:e,transmissionRenderTarget:null},setupLights:s,setupLightsView:l,pushLight:o,pushShadow:a}}function Zf(i){let e=new WeakMap;function t(r,o=0){const a=e.get(r);let s;return a===void 0?(s=new Ha(i),e.set(r,[s])):o>=a.length?(s=new Ha(i),a.push(s)):s=a[o],s}function n(){e=new WeakMap}return{get:t,dispose:n}}class jf extends dr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cl,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Kf extends dr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Jf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qf=`uniform sampler2D shadow_pass;
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
}`;function ep(i,e,t){let n=new fo;const r=new Se,o=new Se,a=new Je,s=new jf({depthPacking:Nl}),l=new Kf,c={},d=t.maxTextureSize,f={[un]:vt,[vt]:un,[qt]:qt},p=new fn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:Jf,fragmentShader:Qf}),g=p.clone();g.defines.HORIZONTAL_PASS=1;const x=new Pn;x.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Ut(x,p),u=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ja;let h=this.type;this.render=function(R,T,V){if(u.enabled===!1||u.autoUpdate===!1&&u.needsUpdate===!1||R.length===0)return;const S=i.getRenderTarget(),v=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),W=i.state;W.setBlending(cn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const C=h!==$t&&this.type===$t,$=h===$t&&this.type!==$t;for(let X=0,j=R.length;X<j;X++){const J=R[X],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ee=H.getFrameExtents();if(r.multiply(ee),o.copy(H.mapSize),(r.x>d||r.y>d)&&(r.x>d&&(o.x=Math.floor(d/ee.x),r.x=o.x*ee.x,H.mapSize.x=o.x),r.y>d&&(o.y=Math.floor(d/ee.y),r.y=o.y*ee.y,H.mapSize.y=o.y)),H.map===null||C===!0||$===!0){const ue=this.type!==$t?{minFilter:xt,magFilter:xt}:{};H.map!==null&&H.map.dispose(),H.map=new Rn(r.x,r.y,ue),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const Q=H.getViewportCount();for(let ue=0;ue<Q;ue++){const Le=H.getViewport(ue);a.set(o.x*Le.x,o.y*Le.y,o.x*Le.z,o.y*Le.w),W.viewport(a),H.updateMatrices(J,ue),n=H.getFrustum(),w(T,V,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===$t&&E(H,V),H.needsUpdate=!1}h=this.type,u.needsUpdate=!1,i.setRenderTarget(S,v,L)};function E(R,T){const V=e.update(b);p.defines.VSM_SAMPLES!==R.blurSamples&&(p.defines.VSM_SAMPLES=R.blurSamples,g.defines.VSM_SAMPLES=R.blurSamples,p.needsUpdate=!0,g.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Rn(r.x,r.y)),p.uniforms.shadow_pass.value=R.map.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(T,null,V,p,b,null),g.uniforms.shadow_pass.value=R.mapPass.texture,g.uniforms.resolution.value=R.mapSize,g.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(T,null,V,g,b,null)}function y(R,T,V,S){let v=null;const L=V.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)v=L;else if(v=V.isPointLight===!0?l:s,i.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const W=v.uuid,C=T.uuid;let $=c[W];$===void 0&&($={},c[W]=$);let X=$[C];X===void 0&&(X=v.clone(),$[C]=X,T.addEventListener("dispose",I)),v=X}if(v.visible=T.visible,v.wireframe=T.wireframe,S===$t?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:f[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,V.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const W=i.properties.get(v);W.light=V}return v}function w(R,T,V,S,v){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&v===$t)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,R.matrixWorld);const C=e.update(R),$=R.material;if(Array.isArray($)){const X=C.groups;for(let j=0,J=X.length;j<J;j++){const H=X[j],ee=$[H.materialIndex];if(ee&&ee.visible){const Q=y(R,ee,S,v);R.onBeforeShadow(i,R,T,V,C,Q,H),i.renderBufferDirect(V,null,C,Q,R,H),R.onAfterShadow(i,R,T,V,C,Q,H)}}}else if($.visible){const X=y(R,$,S,v);R.onBeforeShadow(i,R,T,V,C,X,null),i.renderBufferDirect(V,null,C,X,R,null),R.onAfterShadow(i,R,T,V,C,X,null)}}const W=R.children;for(let C=0,$=W.length;C<$;C++)w(W[C],T,V,S,v)}function I(R){R.target.removeEventListener("dispose",I);for(const V in c){const S=c[V],v=R.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}function tp(i){function e(){let m=!1;const U=new Je;let G=null;const ne=new Je(0,0,0,0);return{setMask:function(le){G!==le&&!m&&(i.colorMask(le,le,le,le),G=le)},setLocked:function(le){m=le},setClear:function(le,Be,Ue,je,st){st===!0&&(le*=je,Be*=je,Ue*=je),U.set(le,Be,Ue,je),ne.equals(U)===!1&&(i.clearColor(le,Be,Ue,je),ne.copy(U))},reset:function(){m=!1,G=null,ne.set(-1,0,0,0)}}}function t(){let m=!1,U=null,G=null,ne=null;return{setTest:function(le){le?ce(i.DEPTH_TEST):ae(i.DEPTH_TEST)},setMask:function(le){U!==le&&!m&&(i.depthMask(le),U=le)},setFunc:function(le){if(G!==le){switch(le){case il:i.depthFunc(i.NEVER);break;case rl:i.depthFunc(i.ALWAYS);break;case ol:i.depthFunc(i.LESS);break;case nr:i.depthFunc(i.LEQUAL);break;case al:i.depthFunc(i.EQUAL);break;case sl:i.depthFunc(i.GEQUAL);break;case ll:i.depthFunc(i.GREATER);break;case cl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}G=le}},setLocked:function(le){m=le},setClear:function(le){ne!==le&&(i.clearDepth(le),ne=le)},reset:function(){m=!1,U=null,G=null,ne=null}}}function n(){let m=!1,U=null,G=null,ne=null,le=null,Be=null,Ue=null,je=null,st=null;return{setTest:function(Xe){m||(Xe?ce(i.STENCIL_TEST):ae(i.STENCIL_TEST))},setMask:function(Xe){U!==Xe&&!m&&(i.stencilMask(Xe),U=Xe)},setFunc:function(Xe,nt,it){(G!==Xe||ne!==nt||le!==it)&&(i.stencilFunc(Xe,nt,it),G=Xe,ne=nt,le=it)},setOp:function(Xe,nt,it){(Be!==Xe||Ue!==nt||je!==it)&&(i.stencilOp(Xe,nt,it),Be=Xe,Ue=nt,je=it)},setLocked:function(Xe){m=Xe},setClear:function(Xe){st!==Xe&&(i.clearStencil(Xe),st=Xe)},reset:function(){m=!1,U=null,G=null,ne=null,le=null,Be=null,Ue=null,je=null,st=null}}}const r=new e,o=new t,a=new n,s=new WeakMap,l=new WeakMap;let c={},d={},f=new WeakMap,p=[],g=null,x=!1,b=null,u=null,h=null,E=null,y=null,w=null,I=null,R=new ze(0,0,0),T=0,V=!1,S=null,v=null,L=null,W=null,C=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,j=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(J)[1]),X=j>=1):J.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),X=j>=2);let H=null,ee={};const Q=i.getParameter(i.SCISSOR_BOX),ue=i.getParameter(i.VIEWPORT),Le=new Je().fromArray(Q),We=new Je().fromArray(ue);function k(m,U,G,ne){const le=new Uint8Array(4),Be=i.createTexture();i.bindTexture(m,Be),i.texParameteri(m,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(m,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ue=0;Ue<G;Ue++)m===i.TEXTURE_3D||m===i.TEXTURE_2D_ARRAY?i.texImage3D(U,0,i.RGBA,1,1,ne,0,i.RGBA,i.UNSIGNED_BYTE,le):i.texImage2D(U+Ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,le);return Be}const te={};te[i.TEXTURE_2D]=k(i.TEXTURE_2D,i.TEXTURE_2D,1),te[i.TEXTURE_CUBE_MAP]=k(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[i.TEXTURE_2D_ARRAY]=k(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),te[i.TEXTURE_3D]=k(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(i.DEPTH_TEST),o.setFunc(nr),be(!1),Ge(yo),ce(i.CULL_FACE),ve(cn);function ce(m){c[m]!==!0&&(i.enable(m),c[m]=!0)}function ae(m){c[m]!==!1&&(i.disable(m),c[m]=!1)}function Ee(m,U){return d[m]!==U?(i.bindFramebuffer(m,U),d[m]=U,m===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=U),m===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=U),!0):!1}function Te(m,U){let G=p,ne=!1;if(m){G=f.get(U),G===void 0&&(G=[],f.set(U,G));const le=m.textures;if(G.length!==le.length||G[0]!==i.COLOR_ATTACHMENT0){for(let Be=0,Ue=le.length;Be<Ue;Be++)G[Be]=i.COLOR_ATTACHMENT0+Be;G.length=le.length,ne=!0}}else G[0]!==i.BACK&&(G[0]=i.BACK,ne=!0);ne&&i.drawBuffers(G)}function Ie(m){return g!==m?(i.useProgram(m),g=m,!0):!1}const P={[Sn]:i.FUNC_ADD,[Hs]:i.FUNC_SUBTRACT,[Vs]:i.FUNC_REVERSE_SUBTRACT};P[ks]=i.MIN,P[Gs]=i.MAX;const Pe={[Ws]:i.ZERO,[Xs]:i.ONE,[Ys]:i.SRC_COLOR,[eo]:i.SRC_ALPHA,[Js]:i.SRC_ALPHA_SATURATE,[js]:i.DST_COLOR,[qs]:i.DST_ALPHA,[$s]:i.ONE_MINUS_SRC_COLOR,[to]:i.ONE_MINUS_SRC_ALPHA,[Ks]:i.ONE_MINUS_DST_COLOR,[Zs]:i.ONE_MINUS_DST_ALPHA,[Qs]:i.CONSTANT_COLOR,[el]:i.ONE_MINUS_CONSTANT_COLOR,[tl]:i.CONSTANT_ALPHA,[nl]:i.ONE_MINUS_CONSTANT_ALPHA};function ve(m,U,G,ne,le,Be,Ue,je,st,Xe){if(m===cn){x===!0&&(ae(i.BLEND),x=!1);return}if(x===!1&&(ce(i.BLEND),x=!0),m!==Bs){if(m!==b||Xe!==V){if((u!==Sn||y!==Sn)&&(i.blendEquation(i.FUNC_ADD),u=Sn,y=Sn),Xe)switch(m){case ii:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mo:i.blendFunc(i.ONE,i.ONE);break;case So:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",m);break}else switch(m){case ii:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Mo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case So:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Eo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",m);break}h=null,E=null,w=null,I=null,R.set(0,0,0),T=0,b=m,V=Xe}return}le=le||U,Be=Be||G,Ue=Ue||ne,(U!==u||le!==y)&&(i.blendEquationSeparate(P[U],P[le]),u=U,y=le),(G!==h||ne!==E||Be!==w||Ue!==I)&&(i.blendFuncSeparate(Pe[G],Pe[ne],Pe[Be],Pe[Ue]),h=G,E=ne,w=Be,I=Ue),(je.equals(R)===!1||st!==T)&&(i.blendColor(je.r,je.g,je.b,st),R.copy(je),T=st),b=m,V=!1}function et(m,U){m.side===qt?ae(i.CULL_FACE):ce(i.CULL_FACE);let G=m.side===vt;U&&(G=!G),be(G),m.blending===ii&&m.transparent===!1?ve(cn):ve(m.blending,m.blendEquation,m.blendSrc,m.blendDst,m.blendEquationAlpha,m.blendSrcAlpha,m.blendDstAlpha,m.blendColor,m.blendAlpha,m.premultipliedAlpha),o.setFunc(m.depthFunc),o.setTest(m.depthTest),o.setMask(m.depthWrite),r.setMask(m.colorWrite);const ne=m.stencilWrite;a.setTest(ne),ne&&(a.setMask(m.stencilWriteMask),a.setFunc(m.stencilFunc,m.stencilRef,m.stencilFuncMask),a.setOp(m.stencilFail,m.stencilZFail,m.stencilZPass)),_(m.polygonOffset,m.polygonOffsetFactor,m.polygonOffsetUnits),m.alphaToCoverage===!0?ce(i.SAMPLE_ALPHA_TO_COVERAGE):ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function be(m){S!==m&&(m?i.frontFace(i.CW):i.frontFace(i.CCW),S=m)}function Ge(m){m!==Is?(ce(i.CULL_FACE),m!==v&&(m===yo?i.cullFace(i.BACK):m===Fs?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ae(i.CULL_FACE),v=m}function A(m){m!==L&&(X&&i.lineWidth(m),L=m)}function _(m,U,G){m?(ce(i.POLYGON_OFFSET_FILL),(W!==U||C!==G)&&(i.polygonOffset(U,G),W=U,C=G)):ae(i.POLYGON_OFFSET_FILL)}function B(m){m?ce(i.SCISSOR_TEST):ae(i.SCISSOR_TEST)}function Y(m){m===void 0&&(m=i.TEXTURE0+$-1),H!==m&&(i.activeTexture(m),H=m)}function q(m,U,G){G===void 0&&(H===null?G=i.TEXTURE0+$-1:G=H);let ne=ee[G];ne===void 0&&(ne={type:void 0,texture:void 0},ee[G]=ne),(ne.type!==m||ne.texture!==U)&&(H!==G&&(i.activeTexture(G),H=G),i.bindTexture(m,U||te[m]),ne.type=m,ne.texture=U)}function Z(){const m=ee[H];m!==void 0&&m.type!==void 0&&(i.bindTexture(m.type,null),m.type=void 0,m.texture=void 0)}function ge(){try{i.compressedTexImage2D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function me(){try{i.texSubImage2D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function _e(){try{i.texSubImage3D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function se(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function ye(){try{i.texStorage2D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function he(){try{i.texStorage3D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function de(){try{i.texImage2D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function Fe(){try{i.texImage3D.apply(i,arguments)}catch(m){console.error("THREE.WebGLState:",m)}}function Oe(m){Le.equals(m)===!1&&(i.scissor(m.x,m.y,m.z,m.w),Le.copy(m))}function Ve(m){We.equals(m)===!1&&(i.viewport(m.x,m.y,m.z,m.w),We.copy(m))}function He(m,U){let G=l.get(U);G===void 0&&(G=new WeakMap,l.set(U,G));let ne=G.get(m);ne===void 0&&(ne=i.getUniformBlockIndex(U,m.name),G.set(m,ne))}function ke(m,U){const ne=l.get(U).get(m);s.get(U)!==ne&&(i.uniformBlockBinding(U,ne,m.__bindingPointIndex),s.set(U,ne))}function fe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},H=null,ee={},d={},f=new WeakMap,p=[],g=null,x=!1,b=null,u=null,h=null,E=null,y=null,w=null,I=null,R=new ze(0,0,0),T=0,V=!1,S=null,v=null,L=null,W=null,C=null,Le.set(0,0,i.canvas.width,i.canvas.height),We.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ce,disable:ae,bindFramebuffer:Ee,drawBuffers:Te,useProgram:Ie,setBlending:ve,setMaterial:et,setFlipSided:be,setCullFace:Ge,setLineWidth:A,setPolygonOffset:_,setScissorTest:B,activeTexture:Y,bindTexture:q,unbindTexture:Z,compressedTexImage2D:ge,compressedTexImage3D:K,texImage2D:de,texImage3D:Fe,updateUBOMapping:He,uniformBlockBinding:ke,texStorage2D:ye,texStorage3D:he,texSubImage2D:me,texSubImage3D:_e,compressedTexSubImage2D:ie,compressedTexSubImage3D:se,scissor:Oe,viewport:Ve,reset:fe}}function np(i,e,t,n,r,o,a){const s=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,d=new WeakMap;let f;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,_){return g?new OffscreenCanvas(A,_):lr("canvas")}function b(A,_,B){let Y=1;const q=Ge(A);if((q.width>B||q.height>B)&&(Y=B/Math.max(q.width,q.height)),Y<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Z=Math.floor(Y*q.width),ge=Math.floor(Y*q.height);f===void 0&&(f=x(Z,ge));const K=_?x(Z,ge):f;return K.width=Z,K.height=ge,K.getContext("2d").drawImage(A,0,0,Z,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+Z+"x"+ge+")."),K}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),A;return A}function u(A){return A.generateMipmaps&&A.minFilter!==xt&&A.minFilter!==Lt}function h(A){i.generateMipmap(A)}function E(A,_,B,Y,q=!1){if(A!==null){if(i[A]!==void 0)return i[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Z=_;if(_===i.RED&&(B===i.FLOAT&&(Z=i.R32F),B===i.HALF_FLOAT&&(Z=i.R16F),B===i.UNSIGNED_BYTE&&(Z=i.R8)),_===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.R8UI),B===i.UNSIGNED_SHORT&&(Z=i.R16UI),B===i.UNSIGNED_INT&&(Z=i.R32UI),B===i.BYTE&&(Z=i.R8I),B===i.SHORT&&(Z=i.R16I),B===i.INT&&(Z=i.R32I)),_===i.RG&&(B===i.FLOAT&&(Z=i.RG32F),B===i.HALF_FLOAT&&(Z=i.RG16F),B===i.UNSIGNED_BYTE&&(Z=i.RG8)),_===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(Z=i.RG8UI),B===i.UNSIGNED_SHORT&&(Z=i.RG16UI),B===i.UNSIGNED_INT&&(Z=i.RG32UI),B===i.BYTE&&(Z=i.RG8I),B===i.SHORT&&(Z=i.RG16I),B===i.INT&&(Z=i.RG32I)),_===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),_===i.RGBA){const ge=q?rr:Ye.getTransfer(Y);B===i.FLOAT&&(Z=i.RGBA32F),B===i.HALF_FLOAT&&(Z=i.RGBA16F),B===i.UNSIGNED_BYTE&&(Z=ge===qe?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function y(A,_){return u(A)===!0||A.isFramebufferTexture&&A.minFilter!==xt&&A.minFilter!==Lt?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function w(A){const _=A.target;_.removeEventListener("dispose",w),R(_),_.isVideoTexture&&d.delete(_)}function I(A){const _=A.target;_.removeEventListener("dispose",I),V(_)}function R(A){const _=n.get(A);if(_.__webglInit===void 0)return;const B=A.source,Y=p.get(B);if(Y){const q=Y[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&T(A),Object.keys(Y).length===0&&p.delete(B)}n.remove(A)}function T(A){const _=n.get(A);i.deleteTexture(_.__webglTexture);const B=A.source,Y=p.get(B);delete Y[_.__cacheKey],a.memory.textures--}function V(A){const _=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let q=0;q<_.__webglFramebuffer[Y].length;q++)i.deleteFramebuffer(_.__webglFramebuffer[Y][q]);else i.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)i.deleteFramebuffer(_.__webglFramebuffer[Y]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=A.textures;for(let Y=0,q=B.length;Y<q;Y++){const Z=n.get(B[Y]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),a.memory.textures--),n.remove(B[Y])}n.remove(A)}let S=0;function v(){S=0}function L(){const A=S;return A>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+r.maxTextures),S+=1,A}function W(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function C(A,_){const B=n.get(A);if(A.isVideoTexture&&et(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const Y=A.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Le(B,A,_);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+_)}function $(A,_){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Le(B,A,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+_)}function X(A,_){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Le(B,A,_);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+_)}function j(A,_){const B=n.get(A);if(A.version>0&&B.__version!==A.version){We(B,A,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+_)}const J={[ro]:i.REPEAT,[An]:i.CLAMP_TO_EDGE,[oo]:i.MIRRORED_REPEAT},H={[xt]:i.NEAREST,[vl]:i.NEAREST_MIPMAP_NEAREST,[Ni]:i.NEAREST_MIPMAP_LINEAR,[Lt]:i.LINEAR,[xr]:i.LINEAR_MIPMAP_NEAREST,[Tn]:i.LINEAR_MIPMAP_LINEAR},ee={[Ll]:i.NEVER,[Bl]:i.ALWAYS,[Ul]:i.LESS,[hs]:i.LEQUAL,[zl]:i.EQUAL,[Ol]:i.GEQUAL,[Il]:i.GREATER,[Fl]:i.NOTEQUAL};function Q(A,_){if(_.type===Zt&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Lt||_.magFilter===xr||_.magFilter===Ni||_.magFilter===Tn||_.minFilter===Lt||_.minFilter===xr||_.minFilter===Ni||_.minFilter===Tn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,J[_.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,J[_.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,J[_.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,H[_.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,H[_.minFilter]),_.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,ee[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===xt||_.minFilter!==Ni&&_.minFilter!==Tn||_.type===Zt&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function ue(A,_){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",w));const Y=_.source;let q=p.get(Y);q===void 0&&(q={},p.set(Y,q));const Z=W(_);if(Z!==A.__cacheKey){q[Z]===void 0&&(q[Z]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),q[Z].usedTimes++;const ge=q[A.__cacheKey];ge!==void 0&&(q[A.__cacheKey].usedTimes--,ge.usedTimes===0&&T(_)),A.__cacheKey=Z,A.__webglTexture=q[Z].texture}return B}function Le(A,_,B){let Y=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=i.TEXTURE_3D);const q=ue(A,_),Z=_.source;t.bindTexture(Y,A.__webglTexture,i.TEXTURE0+B);const ge=n.get(Z);if(Z.version!==ge.__version||q===!0){t.activeTexture(i.TEXTURE0+B);const K=Ye.getPrimaries(Ye.workingColorSpace),me=_.colorSpace===ln?null:Ye.getPrimaries(_.colorSpace),_e=_.colorSpace===ln||K===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let ie=b(_.image,!1,r.maxTextureSize);ie=be(_,ie);const se=o.convert(_.format,_.colorSpace),ye=o.convert(_.type);let he=E(_.internalFormat,se,ye,_.colorSpace,_.isVideoTexture);Q(Y,_);let de;const Fe=_.mipmaps,Oe=_.isVideoTexture!==!0&&he!==cs,Ve=ge.__version===void 0||q===!0,He=Z.dataReady,ke=y(_,ie);if(_.isDepthTexture)he=i.DEPTH_COMPONENT16,_.type===Zt?he=i.DEPTH_COMPONENT32F:_.type===li?he=i.DEPTH_COMPONENT24:_.type===wi&&(he=i.DEPTH24_STENCIL8),Ve&&(Oe?t.texStorage2D(i.TEXTURE_2D,1,he,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,he,ie.width,ie.height,0,se,ye,null));else if(_.isDataTexture)if(Fe.length>0){Oe&&Ve&&t.texStorage2D(i.TEXTURE_2D,ke,he,Fe[0].width,Fe[0].height);for(let fe=0,m=Fe.length;fe<m;fe++)de=Fe[fe],Oe?He&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,de.width,de.height,se,ye,de.data):t.texImage2D(i.TEXTURE_2D,fe,he,de.width,de.height,0,se,ye,de.data);_.generateMipmaps=!1}else Oe?(Ve&&t.texStorage2D(i.TEXTURE_2D,ke,he,ie.width,ie.height),He&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,se,ye,ie.data)):t.texImage2D(i.TEXTURE_2D,0,he,ie.width,ie.height,0,se,ye,ie.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Oe&&Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,he,Fe[0].width,Fe[0].height,ie.depth);for(let fe=0,m=Fe.length;fe<m;fe++)de=Fe[fe],_.format!==Bt?se!==null?Oe?He&&t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,de.width,de.height,ie.depth,se,de.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,fe,he,de.width,de.height,ie.depth,0,de.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?He&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,fe,0,0,0,de.width,de.height,ie.depth,se,ye,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,fe,he,de.width,de.height,ie.depth,0,se,ye,de.data)}else{Oe&&Ve&&t.texStorage2D(i.TEXTURE_2D,ke,he,Fe[0].width,Fe[0].height);for(let fe=0,m=Fe.length;fe<m;fe++)de=Fe[fe],_.format!==Bt?se!==null?Oe?He&&t.compressedTexSubImage2D(i.TEXTURE_2D,fe,0,0,de.width,de.height,se,de.data):t.compressedTexImage2D(i.TEXTURE_2D,fe,he,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Oe?He&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,de.width,de.height,se,ye,de.data):t.texImage2D(i.TEXTURE_2D,fe,he,de.width,de.height,0,se,ye,de.data)}else if(_.isDataArrayTexture)Oe?(Ve&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ke,he,ie.width,ie.height,ie.depth),He&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,se,ye,ie.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,he,ie.width,ie.height,ie.depth,0,se,ye,ie.data);else if(_.isData3DTexture)Oe?(Ve&&t.texStorage3D(i.TEXTURE_3D,ke,he,ie.width,ie.height,ie.depth),He&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,se,ye,ie.data)):t.texImage3D(i.TEXTURE_3D,0,he,ie.width,ie.height,ie.depth,0,se,ye,ie.data);else if(_.isFramebufferTexture){if(Ve)if(Oe)t.texStorage2D(i.TEXTURE_2D,ke,he,ie.width,ie.height);else{let fe=ie.width,m=ie.height;for(let U=0;U<ke;U++)t.texImage2D(i.TEXTURE_2D,U,he,fe,m,0,se,ye,null),fe>>=1,m>>=1}}else if(Fe.length>0){if(Oe&&Ve){const fe=Ge(Fe[0]);t.texStorage2D(i.TEXTURE_2D,ke,he,fe.width,fe.height)}for(let fe=0,m=Fe.length;fe<m;fe++)de=Fe[fe],Oe?He&&t.texSubImage2D(i.TEXTURE_2D,fe,0,0,se,ye,de):t.texImage2D(i.TEXTURE_2D,fe,he,se,ye,de);_.generateMipmaps=!1}else if(Oe){if(Ve){const fe=Ge(ie);t.texStorage2D(i.TEXTURE_2D,ke,he,fe.width,fe.height)}He&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,ye,ie)}else t.texImage2D(i.TEXTURE_2D,0,he,se,ye,ie);u(_)&&h(Y),ge.__version=Z.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function We(A,_,B){if(_.image.length!==6)return;const Y=ue(A,_),q=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+B);const Z=n.get(q);if(q.version!==Z.__version||Y===!0){t.activeTexture(i.TEXTURE0+B);const ge=Ye.getPrimaries(Ye.workingColorSpace),K=_.colorSpace===ln?null:Ye.getPrimaries(_.colorSpace),me=_.colorSpace===ln||ge===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const _e=_.isCompressedTexture||_.image[0].isCompressedTexture,ie=_.image[0]&&_.image[0].isDataTexture,se=[];for(let m=0;m<6;m++)!_e&&!ie?se[m]=b(_.image[m],!0,r.maxCubemapSize):se[m]=ie?_.image[m].image:_.image[m],se[m]=be(_,se[m]);const ye=se[0],he=o.convert(_.format,_.colorSpace),de=o.convert(_.type),Fe=E(_.internalFormat,he,de,_.colorSpace),Oe=_.isVideoTexture!==!0,Ve=Z.__version===void 0||Y===!0,He=q.dataReady;let ke=y(_,ye);Q(i.TEXTURE_CUBE_MAP,_);let fe;if(_e){Oe&&Ve&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ke,Fe,ye.width,ye.height);for(let m=0;m<6;m++){fe=se[m].mipmaps;for(let U=0;U<fe.length;U++){const G=fe[U];_.format!==Bt?he!==null?Oe?He&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U,0,0,G.width,G.height,he,G.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U,Fe,G.width,G.height,0,G.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Oe?He&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U,0,0,G.width,G.height,he,de,G.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U,Fe,G.width,G.height,0,he,de,G.data)}}}else{if(fe=_.mipmaps,Oe&&Ve){fe.length>0&&ke++;const m=Ge(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ke,Fe,m.width,m.height)}for(let m=0;m<6;m++)if(ie){Oe?He&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,0,0,0,se[m].width,se[m].height,he,de,se[m].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,0,Fe,se[m].width,se[m].height,0,he,de,se[m].data);for(let U=0;U<fe.length;U++){const ne=fe[U].image[m].image;Oe?He&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U+1,0,0,ne.width,ne.height,he,de,ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U+1,Fe,ne.width,ne.height,0,he,de,ne.data)}}else{Oe?He&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,0,0,0,he,de,se[m]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,0,Fe,he,de,se[m]);for(let U=0;U<fe.length;U++){const G=fe[U];Oe?He&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U+1,0,0,he,de,G.image[m]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+m,U+1,Fe,he,de,G.image[m])}}}u(_)&&h(i.TEXTURE_CUBE_MAP),Z.__version=q.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function k(A,_,B,Y,q,Z){const ge=o.convert(B.format,B.colorSpace),K=o.convert(B.type),me=E(B.internalFormat,ge,K,B.colorSpace);if(!n.get(_).__hasExternalTextures){const ie=Math.max(1,_.width>>Z),se=Math.max(1,_.height>>Z);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?t.texImage3D(q,Z,me,ie,se,_.depth,0,ge,K,null):t.texImage2D(q,Z,me,ie,se,0,ge,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),ve(_)?s.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,q,n.get(B).__webglTexture,0,Pe(_)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,q,n.get(B).__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function te(A,_,B){if(i.bindRenderbuffer(i.RENDERBUFFER,A),_.depthBuffer&&!_.stencilBuffer){let Y=i.DEPTH_COMPONENT24;if(B||ve(_)){const q=_.depthTexture;q&&q.isDepthTexture&&(q.type===Zt?Y=i.DEPTH_COMPONENT32F:q.type===li&&(Y=i.DEPTH_COMPONENT24));const Z=Pe(_);ve(_)?s.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,Y,_.width,_.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,Y,_.width,_.height)}else i.renderbufferStorage(i.RENDERBUFFER,Y,_.width,_.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,A)}else if(_.depthBuffer&&_.stencilBuffer){const Y=Pe(_);B&&ve(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Y,i.DEPTH24_STENCIL8,_.width,_.height):ve(_)?s.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Y,i.DEPTH24_STENCIL8,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,A)}else{const Y=_.textures;for(let q=0;q<Y.length;q++){const Z=Y[q],ge=o.convert(Z.format,Z.colorSpace),K=o.convert(Z.type),me=E(Z.internalFormat,ge,K,Z.colorSpace),_e=Pe(_);B&&ve(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,me,_.width,_.height):ve(_)?s.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,me,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,me,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ce(A,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(_.depthTexture).__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),C(_.depthTexture,0);const Y=n.get(_.depthTexture).__webglTexture,q=Pe(_);if(_.depthTexture.format===ri)ve(_)?s.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(_.depthTexture.format===Ei)ve(_)?s.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function ae(A){const _=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!_.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");ce(_.__webglFramebuffer,A)}else if(B){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]=i.createRenderbuffer(),te(_.__webglDepthbuffer[Y],A,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer=i.createRenderbuffer(),te(_.__webglDepthbuffer,A,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ee(A,_,B){const Y=n.get(A);_!==void 0&&k(Y.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&ae(A)}function Te(A){const _=A.texture,B=n.get(A),Y=n.get(_);A.addEventListener("dispose",I);const q=A.textures,Z=A.isWebGLCubeRenderTarget===!0,ge=q.length>1;if(ge||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=_.version,a.memory.textures++),Z){B.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[K]=[];for(let me=0;me<_.mipmaps.length;me++)B.__webglFramebuffer[K][me]=i.createFramebuffer()}else B.__webglFramebuffer[K]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)B.__webglFramebuffer[K]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ge)for(let K=0,me=q.length;K<me;K++){const _e=n.get(q[K]);_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&ve(A)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let K=0;K<q.length;K++){const me=q[K];B.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[K]);const _e=o.convert(me.format,me.colorSpace),ie=o.convert(me.type),se=E(me.internalFormat,_e,ie,me.colorSpace,A.isXRRenderTarget===!0),ye=Pe(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,se,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,B.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),te(B.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Q(i.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)k(B.__webglFramebuffer[K][me],A,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,me);else k(B.__webglFramebuffer[K],A,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);u(_)&&h(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ge){for(let K=0,me=q.length;K<me;K++){const _e=q[K],ie=n.get(_e);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),Q(i.TEXTURE_2D,_e),k(B.__webglFramebuffer,A,_e,i.COLOR_ATTACHMENT0+K,i.TEXTURE_2D,0),u(_e)&&h(i.TEXTURE_2D)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(K=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,Y.__webglTexture),Q(K,_),_.mipmaps&&_.mipmaps.length>0)for(let me=0;me<_.mipmaps.length;me++)k(B.__webglFramebuffer[me],A,_,i.COLOR_ATTACHMENT0,K,me);else k(B.__webglFramebuffer,A,_,i.COLOR_ATTACHMENT0,K,0);u(_)&&h(K),t.unbindTexture()}A.depthBuffer&&ae(A)}function Ie(A){const _=A.textures;for(let B=0,Y=_.length;B<Y;B++){const q=_[B];if(u(q)){const Z=A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ge=n.get(q).__webglTexture;t.bindTexture(Z,ge),h(Z),t.unbindTexture()}}}function P(A){if(A.samples>0&&ve(A)===!1){const _=A.textures,B=A.width,Y=A.height;let q=i.COLOR_BUFFER_BIT;const Z=[],ge=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=n.get(A),me=_.length>1;if(me)for(let _e=0;_e<_.length;_e++)t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,K.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,K.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,K.__webglFramebuffer);for(let _e=0;_e<_.length;_e++){Z.push(i.COLOR_ATTACHMENT0+_e),A.depthBuffer&&Z.push(ge);const ie=K.__ignoreDepthValues!==void 0?K.__ignoreDepthValues:!1;if(ie===!1&&(A.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&K.__isTransmissionRenderTarget!==!0&&(q|=i.STENCIL_BUFFER_BIT)),me&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,K.__webglColorRenderbuffer[_e]),ie===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ge]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ge])),me){const se=n.get(_[_e]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,B,Y,0,0,B,Y,q,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let _e=0;_e<_.length;_e++){t.bindFramebuffer(i.FRAMEBUFFER,K.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.RENDERBUFFER,K.__webglColorRenderbuffer[_e]);const ie=n.get(_[_e]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,K.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_e,i.TEXTURE_2D,ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,K.__webglMultisampledFramebuffer)}}function Pe(A){return Math.min(r.maxSamples,A.samples)}function ve(A){const _=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function et(A){const _=a.render.frame;d.get(A)!==_&&(d.set(A,_),A.update())}function be(A,_){const B=A.colorSpace,Y=A.format,q=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Ct&&B!==ln&&(Ye.getTransfer(B)===qe?(Y!==Bt||q!==dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),_}function Ge(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=L,this.resetTextureUnits=v,this.setTexture2D=C,this.setTexture2DArray=$,this.setTexture3D=X,this.setTextureCube=j,this.rebindTextures=Ee,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=P,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=k,this.useMultisampledRTT=ve}function ip(i,e){function t(n,r=ln){let o;const a=Ye.getTransfer(r);if(n===dn)return i.UNSIGNED_BYTE;if(n===is)return i.UNSIGNED_SHORT_4_4_4_4;if(n===rs)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ml)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===bl)return i.BYTE;if(n===yl)return i.SHORT;if(n===ts)return i.UNSIGNED_SHORT;if(n===ns)return i.INT;if(n===li)return i.UNSIGNED_INT;if(n===Zt)return i.FLOAT;if(n===ir)return i.HALF_FLOAT;if(n===Sl)return i.ALPHA;if(n===El)return i.RGB;if(n===Bt)return i.RGBA;if(n===Al)return i.LUMINANCE;if(n===Tl)return i.LUMINANCE_ALPHA;if(n===ri)return i.DEPTH_COMPONENT;if(n===Ei)return i.DEPTH_STENCIL;if(n===os)return i.RED;if(n===as)return i.RED_INTEGER;if(n===wl)return i.RG;if(n===ss)return i.RG_INTEGER;if(n===ls)return i.RGBA_INTEGER;if(n===vr||n===br||n===yr||n===Mr)if(a===qe)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===vr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===yr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===vr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===yr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Mr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ao||n===To||n===wo||n===Ro)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Ao)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===To)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ro)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cs)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Co||n===No)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Co)return a===qe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===No)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Do||n===Po||n===Lo||n===Uo||n===zo||n===Io||n===Fo||n===Oo||n===Bo||n===Ho||n===Vo||n===ko||n===Go||n===Wo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Do)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Po)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Lo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===zo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Io)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Bo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ho)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ko)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Go)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wo)return a===qe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Sr||n===Xo||n===Yo)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(n===Sr)return a===qe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xo)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yo)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rl||n===$o||n===qo||n===Zo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(n===Sr)return o.COMPRESSED_RED_RGTC1_EXT;if(n===$o)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class rp extends Rt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ji extends _t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const op={type:"move"};class qr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ji,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ji,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ji,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,o=null,a=null;const s=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const b of e.hand.values()){const u=t.getJointPose(b,n),h=this._getHandJoint(c,b);u!==null&&(h.matrix.fromArray(u.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=u.radius),h.visible=u!==null}const d=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],p=d.position.distanceTo(f.position),g=.02,x=.005;c.inputState.pinching&&p>g+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&p<=g-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(o=t.getPose(e.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));s!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&o!==null&&(r=o),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(op)))}return s!==null&&(s.visible=r!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ji;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const ap=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,sp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lp{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new pt,o=e.properties.get(r);o.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}render(e,t){if(this.texture!==null){if(this.mesh===null){const n=t.cameras[0].viewport,r=new fn({vertexShader:ap,fragmentShader:sp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ut(new ur(20,20),r)}e.render(this.mesh,t)}}reset(){this.texture=null,this.mesh=null}}class cp extends Nn{constructor(e,t){super();const n=this;let r=null,o=1,a=null,s="local-floor",l=1,c=null,d=null,f=null,p=null,g=null,x=null;const b=new lp,u=t.getContextAttributes();let h=null,E=null;const y=[],w=[],I=new Se;let R=null;const T=new Rt;T.layers.enable(1),T.viewport=new Je;const V=new Rt;V.layers.enable(2),V.viewport=new Je;const S=[T,V],v=new rp;v.layers.enable(1),v.layers.enable(2);let L=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let te=y[k];return te===void 0&&(te=new qr,y[k]=te),te.getTargetRaySpace()},this.getControllerGrip=function(k){let te=y[k];return te===void 0&&(te=new qr,y[k]=te),te.getGripSpace()},this.getHand=function(k){let te=y[k];return te===void 0&&(te=new qr,y[k]=te),te.getHandSpace()};function C(k){const te=w.indexOf(k.inputSource);if(te===-1)return;const ce=y[te];ce!==void 0&&(ce.update(k.inputSource,k.frame,c||a),ce.dispatchEvent({type:k.type,data:k.inputSource}))}function $(){r.removeEventListener("select",C),r.removeEventListener("selectstart",C),r.removeEventListener("selectend",C),r.removeEventListener("squeeze",C),r.removeEventListener("squeezestart",C),r.removeEventListener("squeezeend",C),r.removeEventListener("end",$),r.removeEventListener("inputsourceschange",X);for(let k=0;k<y.length;k++){const te=w[k];te!==null&&(w[k]=null,y[k].disconnect(te))}L=null,W=null,b.reset(),e.setRenderTarget(h),g=null,p=null,f=null,r=null,E=null,We.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(I.width,I.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){o=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){s=k,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return p!==null?p:g},this.getBinding=function(){return f},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(k){if(r=k,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",C),r.addEventListener("selectstart",C),r.addEventListener("selectend",C),r.addEventListener("squeeze",C),r.addEventListener("squeezestart",C),r.addEventListener("squeezeend",C),r.addEventListener("end",$),r.addEventListener("inputsourceschange",X),u.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(I),r.renderState.layers===void 0){const te={antialias:u.antialias,alpha:!0,depth:u.depth,stencil:u.stencil,framebufferScaleFactor:o};g=new XRWebGLLayer(r,t,te),r.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),E=new Rn(g.framebufferWidth,g.framebufferHeight,{format:Bt,type:dn,colorSpace:e.outputColorSpace,stencilBuffer:u.stencil})}else{let te=null,ce=null,ae=null;u.depth&&(ae=u.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=u.stencil?Ei:ri,ce=u.stencil?wi:li);const Ee={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:o};f=new XRWebGLBinding(r,t),p=f.createProjectionLayer(Ee),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),E=new Rn(p.textureWidth,p.textureHeight,{format:Bt,type:dn,depthTexture:new As(p.textureWidth,p.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:u.stencil,colorSpace:e.outputColorSpace,samples:u.antialias?4:0});const Te=e.properties.get(E);Te.__ignoreDepthValues=p.ignoreDepthValues}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(s),We.setContext(r),We.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function X(k){for(let te=0;te<k.removed.length;te++){const ce=k.removed[te],ae=w.indexOf(ce);ae>=0&&(w[ae]=null,y[ae].disconnect(ce))}for(let te=0;te<k.added.length;te++){const ce=k.added[te];let ae=w.indexOf(ce);if(ae===-1){for(let Te=0;Te<y.length;Te++)if(Te>=w.length){w.push(ce),ae=Te;break}else if(w[Te]===null){w[Te]=ce,ae=Te;break}if(ae===-1)break}const Ee=y[ae];Ee&&Ee.connect(ce)}}const j=new N,J=new N;function H(k,te,ce){j.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(ce.matrixWorld);const ae=j.distanceTo(J),Ee=te.projectionMatrix.elements,Te=ce.projectionMatrix.elements,Ie=Ee[14]/(Ee[10]-1),P=Ee[14]/(Ee[10]+1),Pe=(Ee[9]+1)/Ee[5],ve=(Ee[9]-1)/Ee[5],et=(Ee[8]-1)/Ee[0],be=(Te[8]+1)/Te[0],Ge=Ie*et,A=Ie*be,_=ae/(-et+be),B=_*-et;te.matrixWorld.decompose(k.position,k.quaternion,k.scale),k.translateX(B),k.translateZ(_),k.matrixWorld.compose(k.position,k.quaternion,k.scale),k.matrixWorldInverse.copy(k.matrixWorld).invert();const Y=Ie+_,q=P+_,Z=Ge-B,ge=A+(ae-B),K=Pe*P/q*Y,me=ve*P/q*Y;k.projectionMatrix.makePerspective(Z,ge,K,me,Y,q),k.projectionMatrixInverse.copy(k.projectionMatrix).invert()}function ee(k,te){te===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(te.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(r===null)return;b.texture!==null&&(k.near=b.depthNear,k.far=b.depthFar),v.near=V.near=T.near=k.near,v.far=V.far=T.far=k.far,(L!==v.near||W!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),L=v.near,W=v.far,T.near=L,T.far=W,V.near=L,V.far=W,T.updateProjectionMatrix(),V.updateProjectionMatrix(),k.updateProjectionMatrix());const te=k.parent,ce=v.cameras;ee(v,te);for(let ae=0;ae<ce.length;ae++)ee(ce[ae],te);ce.length===2?H(v,T,V):v.projectionMatrix.copy(T.projectionMatrix),Q(k,v,te)};function Q(k,te,ce){ce===null?k.matrix.copy(te.matrixWorld):(k.matrix.copy(ce.matrixWorld),k.matrix.invert(),k.matrix.multiply(te.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(te.projectionMatrix),k.projectionMatrixInverse.copy(te.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=Ai*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(p===null&&g===null))return l},this.setFoveation=function(k){l=k,p!==null&&(p.fixedFoveation=k),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=k)},this.hasDepthSensing=function(){return b.texture!==null};let ue=null;function Le(k,te){if(d=te.getViewerPose(c||a),x=te,d!==null){const ce=d.views;g!==null&&(e.setRenderTargetFramebuffer(E,g.framebuffer),e.setRenderTarget(E));let ae=!1;ce.length!==v.cameras.length&&(v.cameras.length=0,ae=!0);for(let Te=0;Te<ce.length;Te++){const Ie=ce[Te];let P=null;if(g!==null)P=g.getViewport(Ie);else{const ve=f.getViewSubImage(p,Ie);P=ve.viewport,Te===0&&(e.setRenderTargetTextures(E,ve.colorTexture,p.ignoreDepthValues?void 0:ve.depthStencilTexture),e.setRenderTarget(E))}let Pe=S[Te];Pe===void 0&&(Pe=new Rt,Pe.layers.enable(Te),Pe.viewport=new Je,S[Te]=Pe),Pe.matrix.fromArray(Ie.transform.matrix),Pe.matrix.decompose(Pe.position,Pe.quaternion,Pe.scale),Pe.projectionMatrix.fromArray(Ie.projectionMatrix),Pe.projectionMatrixInverse.copy(Pe.projectionMatrix).invert(),Pe.viewport.set(P.x,P.y,P.width,P.height),Te===0&&(v.matrix.copy(Pe.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ae===!0&&v.cameras.push(Pe)}const Ee=r.enabledFeatures;if(Ee&&Ee.includes("depth-sensing")){const Te=f.getDepthInformation(ce[0]);Te&&Te.isValid&&Te.texture&&b.init(e,Te,r.renderState)}}for(let ce=0;ce<y.length;ce++){const ae=w[ce],Ee=y[ce];ae!==null&&Ee!==void 0&&Ee.update(ae,te,c||a)}b.render(e,v),ue&&ue(k,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),x=null}const We=new Ss;We.setAnimationLoop(Le),this.setAnimationLoop=function(k){ue=k},this.dispose=function(){}}}const yn=new Kt,hp=new Ze;function dp(i,e){function t(u,h){u.matrixAutoUpdate===!0&&u.updateMatrix(),h.value.copy(u.matrix)}function n(u,h){h.color.getRGB(u.fogColor.value,bs(i)),h.isFog?(u.fogNear.value=h.near,u.fogFar.value=h.far):h.isFogExp2&&(u.fogDensity.value=h.density)}function r(u,h,E,y,w){h.isMeshBasicMaterial||h.isMeshLambertMaterial?o(u,h):h.isMeshToonMaterial?(o(u,h),f(u,h)):h.isMeshPhongMaterial?(o(u,h),d(u,h)):h.isMeshStandardMaterial?(o(u,h),p(u,h),h.isMeshPhysicalMaterial&&g(u,h,w)):h.isMeshMatcapMaterial?(o(u,h),x(u,h)):h.isMeshDepthMaterial?o(u,h):h.isMeshDistanceMaterial?(o(u,h),b(u,h)):h.isMeshNormalMaterial?o(u,h):h.isLineBasicMaterial?(a(u,h),h.isLineDashedMaterial&&s(u,h)):h.isPointsMaterial?l(u,h,E,y):h.isSpriteMaterial?c(u,h):h.isShadowMaterial?(u.color.value.copy(h.color),u.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function o(u,h){u.opacity.value=h.opacity,h.color&&u.diffuse.value.copy(h.color),h.emissive&&u.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(u.map.value=h.map,t(h.map,u.mapTransform)),h.alphaMap&&(u.alphaMap.value=h.alphaMap,t(h.alphaMap,u.alphaMapTransform)),h.bumpMap&&(u.bumpMap.value=h.bumpMap,t(h.bumpMap,u.bumpMapTransform),u.bumpScale.value=h.bumpScale,h.side===vt&&(u.bumpScale.value*=-1)),h.normalMap&&(u.normalMap.value=h.normalMap,t(h.normalMap,u.normalMapTransform),u.normalScale.value.copy(h.normalScale),h.side===vt&&u.normalScale.value.negate()),h.displacementMap&&(u.displacementMap.value=h.displacementMap,t(h.displacementMap,u.displacementMapTransform),u.displacementScale.value=h.displacementScale,u.displacementBias.value=h.displacementBias),h.emissiveMap&&(u.emissiveMap.value=h.emissiveMap,t(h.emissiveMap,u.emissiveMapTransform)),h.specularMap&&(u.specularMap.value=h.specularMap,t(h.specularMap,u.specularMapTransform)),h.alphaTest>0&&(u.alphaTest.value=h.alphaTest);const E=e.get(h),y=E.envMap,w=E.envMapRotation;if(y&&(u.envMap.value=y,yn.copy(w),yn.x*=-1,yn.y*=-1,yn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(yn.y*=-1,yn.z*=-1),u.envMapRotation.value.setFromMatrix4(hp.makeRotationFromEuler(yn)),u.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,u.reflectivity.value=h.reflectivity,u.ior.value=h.ior,u.refractionRatio.value=h.refractionRatio),h.lightMap){u.lightMap.value=h.lightMap;const I=i._useLegacyLights===!0?Math.PI:1;u.lightMapIntensity.value=h.lightMapIntensity*I,t(h.lightMap,u.lightMapTransform)}h.aoMap&&(u.aoMap.value=h.aoMap,u.aoMapIntensity.value=h.aoMapIntensity,t(h.aoMap,u.aoMapTransform))}function a(u,h){u.diffuse.value.copy(h.color),u.opacity.value=h.opacity,h.map&&(u.map.value=h.map,t(h.map,u.mapTransform))}function s(u,h){u.dashSize.value=h.dashSize,u.totalSize.value=h.dashSize+h.gapSize,u.scale.value=h.scale}function l(u,h,E,y){u.diffuse.value.copy(h.color),u.opacity.value=h.opacity,u.size.value=h.size*E,u.scale.value=y*.5,h.map&&(u.map.value=h.map,t(h.map,u.uvTransform)),h.alphaMap&&(u.alphaMap.value=h.alphaMap,t(h.alphaMap,u.alphaMapTransform)),h.alphaTest>0&&(u.alphaTest.value=h.alphaTest)}function c(u,h){u.diffuse.value.copy(h.color),u.opacity.value=h.opacity,u.rotation.value=h.rotation,h.map&&(u.map.value=h.map,t(h.map,u.mapTransform)),h.alphaMap&&(u.alphaMap.value=h.alphaMap,t(h.alphaMap,u.alphaMapTransform)),h.alphaTest>0&&(u.alphaTest.value=h.alphaTest)}function d(u,h){u.specular.value.copy(h.specular),u.shininess.value=Math.max(h.shininess,1e-4)}function f(u,h){h.gradientMap&&(u.gradientMap.value=h.gradientMap)}function p(u,h){u.metalness.value=h.metalness,h.metalnessMap&&(u.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,u.metalnessMapTransform)),u.roughness.value=h.roughness,h.roughnessMap&&(u.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,u.roughnessMapTransform)),h.envMap&&(u.envMapIntensity.value=h.envMapIntensity)}function g(u,h,E){u.ior.value=h.ior,h.sheen>0&&(u.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),u.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(u.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,u.sheenColorMapTransform)),h.sheenRoughnessMap&&(u.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,u.sheenRoughnessMapTransform))),h.clearcoat>0&&(u.clearcoat.value=h.clearcoat,u.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(u.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,u.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(u.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,u.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(u.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,u.clearcoatNormalMapTransform),u.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===vt&&u.clearcoatNormalScale.value.negate())),h.iridescence>0&&(u.iridescence.value=h.iridescence,u.iridescenceIOR.value=h.iridescenceIOR,u.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],u.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(u.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,u.iridescenceMapTransform)),h.iridescenceThicknessMap&&(u.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,u.iridescenceThicknessMapTransform))),h.transmission>0&&(u.transmission.value=h.transmission,u.transmissionSamplerMap.value=E.texture,u.transmissionSamplerSize.value.set(E.width,E.height),h.transmissionMap&&(u.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,u.transmissionMapTransform)),u.thickness.value=h.thickness,h.thicknessMap&&(u.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,u.thicknessMapTransform)),u.attenuationDistance.value=h.attenuationDistance,u.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(u.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(u.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,u.anisotropyMapTransform))),u.specularIntensity.value=h.specularIntensity,u.specularColor.value.copy(h.specularColor),h.specularColorMap&&(u.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,u.specularColorMapTransform)),h.specularIntensityMap&&(u.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,u.specularIntensityMapTransform))}function x(u,h){h.matcap&&(u.matcap.value=h.matcap)}function b(u,h){const E=e.get(h).light;u.referencePosition.value.setFromMatrixPosition(E.matrixWorld),u.nearDistance.value=E.shadow.camera.near,u.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function up(i,e,t,n){let r={},o={},a=[];const s=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,y){const w=y.program;n.uniformBlockBinding(E,w)}function c(E,y){let w=r[E.id];w===void 0&&(x(E),w=d(E),r[E.id]=w,E.addEventListener("dispose",u));const I=y.program;n.updateUBOMapping(E,I);const R=e.render.frame;o[E.id]!==R&&(p(E),o[E.id]=R)}function d(E){const y=f();E.__bindingPointIndex=y;const w=i.createBuffer(),I=E.__size,R=E.usage;return i.bindBuffer(i.UNIFORM_BUFFER,w),i.bufferData(i.UNIFORM_BUFFER,I,R),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,w),w}function f(){for(let E=0;E<s;E++)if(a.indexOf(E)===-1)return a.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(E){const y=r[E.id],w=E.uniforms,I=E.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let R=0,T=w.length;R<T;R++){const V=Array.isArray(w[R])?w[R]:[w[R]];for(let S=0,v=V.length;S<v;S++){const L=V[S];if(g(L,R,S,I)===!0){const W=L.__offset,C=Array.isArray(L.value)?L.value:[L.value];let $=0;for(let X=0;X<C.length;X++){const j=C[X],J=b(j);typeof j=="number"||typeof j=="boolean"?(L.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,W+$,L.__data)):j.isMatrix3?(L.__data[0]=j.elements[0],L.__data[1]=j.elements[1],L.__data[2]=j.elements[2],L.__data[3]=0,L.__data[4]=j.elements[3],L.__data[5]=j.elements[4],L.__data[6]=j.elements[5],L.__data[7]=0,L.__data[8]=j.elements[6],L.__data[9]=j.elements[7],L.__data[10]=j.elements[8],L.__data[11]=0):(j.toArray(L.__data,$),$+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(E,y,w,I){const R=E.value,T=y+"_"+w;if(I[T]===void 0)return typeof R=="number"||typeof R=="boolean"?I[T]=R:I[T]=R.clone(),!0;{const V=I[T];if(typeof R=="number"||typeof R=="boolean"){if(V!==R)return I[T]=R,!0}else if(V.equals(R)===!1)return V.copy(R),!0}return!1}function x(E){const y=E.uniforms;let w=0;const I=16;for(let T=0,V=y.length;T<V;T++){const S=Array.isArray(y[T])?y[T]:[y[T]];for(let v=0,L=S.length;v<L;v++){const W=S[v],C=Array.isArray(W.value)?W.value:[W.value];for(let $=0,X=C.length;$<X;$++){const j=C[$],J=b(j),H=w%I;H!==0&&I-H<J.boundary&&(w+=I-H),W.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=w,w+=J.storage}}}const R=w%I;return R>0&&(w+=I-R),E.__size=w,E.__cache={},this}function b(E){const y={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(y.boundary=4,y.storage=4):E.isVector2?(y.boundary=8,y.storage=8):E.isVector3||E.isColor?(y.boundary=16,y.storage=12):E.isVector4?(y.boundary=16,y.storage=16):E.isMatrix3?(y.boundary=48,y.storage=48):E.isMatrix4?(y.boundary=64,y.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),y}function u(E){const y=E.target;y.removeEventListener("dispose",u);const w=a.indexOf(y.__bindingPointIndex);a.splice(w,1),i.deleteBuffer(r[y.id]),delete r[y.id],delete o[y.id]}function h(){for(const E in r)i.deleteBuffer(r[E]);a=[],r={},o={}}return{bind:l,update:c,dispose:h}}class fp{constructor(e={}){const{canvas:t=ic(),context:n=null,depth:r=!0,stencil:o=!1,alpha:a=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:f=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const g=new Uint32Array(4),x=new Int32Array(4);let b=null,u=null;const h=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=It,this._useLegacyLights=!1,this.toneMapping=hn,this.toneMappingExposure=1;const y=this;let w=!1,I=0,R=0,T=null,V=-1,S=null;const v=new Je,L=new Je;let W=null;const C=new ze(0);let $=0,X=t.width,j=t.height,J=1,H=null,ee=null;const Q=new Je(0,0,X,j),ue=new Je(0,0,X,j);let Le=!1;const We=new fo;let k=!1,te=!1;const ce=new Ze,ae=new Se,Ee=new N,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ie(){return T===null?J:1}let P=n;function Pe(M,D){const F=t.getContext(M,D);return F!==null?F:null}try{const M={alpha:!0,depth:r,stencil:o,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${lo}`),t.addEventListener("webglcontextlost",U,!1),t.addEventListener("webglcontextrestored",G,!1),t.addEventListener("webglcontextcreationerror",ne,!1),P===null){const D="webgl2";if(P=Pe(D,M),P===null)throw Pe(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ve,et,be,Ge,A,_,B,Y,q,Z,ge,K,me,_e,ie,se,ye,he,de,Fe,Oe,Ve,He,ke;function fe(){ve=new bu(P),ve.init(),et=new pu(P,ve,e),Ve=new ip(P,ve),be=new tp(P),Ge=new Su(P),A=new Vf,_=new np(P,ve,be,A,et,Ve,Ge),B=new gu(y),Y=new vu(y),q=new Cc(P),He=new uu(P,q),Z=new yu(P,q,Ge,He),ge=new Au(P,Z,q,Ge),de=new Eu(P,et,_),se=new mu(A),K=new Hf(y,B,Y,ve,et,He,se),me=new dp(y,A),_e=new Gf,ie=new Zf(ve),he=new du(y,B,Y,be,ge,p,l),ye=new ep(y,ge,et),ke=new up(P,Ge,et,be),Fe=new fu(P,ve,Ge),Oe=new Mu(P,ve,Ge),Ge.programs=K.programs,y.capabilities=et,y.extensions=ve,y.properties=A,y.renderLists=_e,y.shadowMap=ye,y.state=be,y.info=Ge}fe();const m=new cp(y,P);this.xr=m,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const M=ve.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ve.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(M){M!==void 0&&(J=M,this.setSize(X,j,!1))},this.getSize=function(M){return M.set(X,j)},this.setSize=function(M,D,F=!0){if(m.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=M,j=D,t.width=Math.floor(M*J),t.height=Math.floor(D*J),F===!0&&(t.style.width=M+"px",t.style.height=D+"px"),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(X*J,j*J).floor()},this.setDrawingBufferSize=function(M,D,F){X=M,j=D,J=F,t.width=Math.floor(M*F),t.height=Math.floor(D*F),this.setViewport(0,0,M,D)},this.getCurrentViewport=function(M){return M.copy(v)},this.getViewport=function(M){return M.copy(Q)},this.setViewport=function(M,D,F,O){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,D,F,O),be.viewport(v.copy(Q).multiplyScalar(J).round())},this.getScissor=function(M){return M.copy(ue)},this.setScissor=function(M,D,F,O){M.isVector4?ue.set(M.x,M.y,M.z,M.w):ue.set(M,D,F,O),be.scissor(L.copy(ue).multiplyScalar(J).round())},this.getScissorTest=function(){return Le},this.setScissorTest=function(M){be.setScissorTest(Le=M)},this.setOpaqueSort=function(M){H=M},this.setTransparentSort=function(M){ee=M},this.getClearColor=function(M){return M.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor.apply(he,arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha.apply(he,arguments)},this.clear=function(M=!0,D=!0,F=!0){let O=0;if(M){let z=!1;if(T!==null){const oe=T.texture.format;z=oe===ls||oe===ss||oe===as}if(z){const oe=T.texture.type,pe=oe===dn||oe===li||oe===ts||oe===wi||oe===is||oe===rs,xe=he.getClearColor(),Me=he.getClearAlpha(),we=xe.r,Ae=xe.g,Re=xe.b;pe?(g[0]=we,g[1]=Ae,g[2]=Re,g[3]=Me,P.clearBufferuiv(P.COLOR,0,g)):(x[0]=we,x[1]=Ae,x[2]=Re,x[3]=Me,P.clearBufferiv(P.COLOR,0,x))}else O|=P.COLOR_BUFFER_BIT}D&&(O|=P.DEPTH_BUFFER_BIT),F&&(O|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",U,!1),t.removeEventListener("webglcontextrestored",G,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),_e.dispose(),ie.dispose(),A.dispose(),B.dispose(),Y.dispose(),ge.dispose(),He.dispose(),ke.dispose(),K.dispose(),m.dispose(),m.removeEventListener("sessionstart",nt),m.removeEventListener("sessionend",it),bt.stop()};function U(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function G(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const M=Ge.autoReset,D=ye.enabled,F=ye.autoUpdate,O=ye.needsUpdate,z=ye.type;fe(),Ge.autoReset=M,ye.enabled=D,ye.autoUpdate=F,ye.needsUpdate=O,ye.type=z}function ne(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function le(M){const D=M.target;D.removeEventListener("dispose",le),Be(D)}function Be(M){Ue(M),A.remove(M)}function Ue(M){const D=A.get(M).programs;D!==void 0&&(D.forEach(function(F){K.releaseProgram(F)}),M.isShaderMaterial&&K.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,F,O,z,oe){D===null&&(D=Te);const pe=z.isMesh&&z.matrixWorld.determinant()<0,xe=Ps(M,D,F,O,z);be.setMaterial(O,pe);let Me=F.index,we=1;if(O.wireframe===!0){if(Me=Z.getWireframeAttribute(F),Me===void 0)return;we=2}const Ae=F.drawRange,Re=F.attributes.position;let tt=Ae.start*we,yt=(Ae.start+Ae.count)*we;oe!==null&&(tt=Math.max(tt,oe.start*we),yt=Math.min(yt,(oe.start+oe.count)*we)),Me!==null?(tt=Math.max(tt,0),yt=Math.min(yt,Me.count)):Re!=null&&(tt=Math.max(tt,0),yt=Math.min(yt,Re.count));const lt=yt-tt;if(lt<0||lt===1/0)return;He.setup(z,O,xe,F,Me);let Vt,Qe=Fe;if(Me!==null&&(Vt=q.get(Me),Qe=Oe,Qe.setIndex(Vt)),z.isMesh)O.wireframe===!0?(be.setLineWidth(O.wireframeLinewidth*Ie()),Qe.setMode(P.LINES)):Qe.setMode(P.TRIANGLES);else if(z.isLine){let Ce=O.linewidth;Ce===void 0&&(Ce=1),be.setLineWidth(Ce*Ie()),z.isLineSegments?Qe.setMode(P.LINES):z.isLineLoop?Qe.setMode(P.LINE_LOOP):Qe.setMode(P.LINE_STRIP)}else z.isPoints?Qe.setMode(P.POINTS):z.isSprite&&Qe.setMode(P.TRIANGLES);if(z.isBatchedMesh)Qe.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else if(z.isInstancedMesh)Qe.renderInstances(tt,lt,z.count);else if(F.isInstancedBufferGeometry){const Ce=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,pr=Math.min(F.instanceCount,Ce);Qe.renderInstances(tt,lt,pr)}else Qe.render(tt,lt)};function je(M,D,F){M.transparent===!0&&M.side===qt&&M.forceSinglePass===!1?(M.side=vt,M.needsUpdate=!0,Ci(M,D,F),M.side=un,M.needsUpdate=!0,Ci(M,D,F),M.side=qt):Ci(M,D,F)}this.compile=function(M,D,F=null){F===null&&(F=M),u=ie.get(F),u.init(),E.push(u),F.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(u.pushLight(z),z.castShadow&&u.pushShadow(z))}),M!==F&&M.traverseVisible(function(z){z.isLight&&z.layers.test(D.layers)&&(u.pushLight(z),z.castShadow&&u.pushShadow(z))}),u.setupLights(y._useLegacyLights);const O=new Set;return M.traverse(function(z){const oe=z.material;if(oe)if(Array.isArray(oe))for(let pe=0;pe<oe.length;pe++){const xe=oe[pe];je(xe,F,z),O.add(xe)}else je(oe,F,z),O.add(oe)}),E.pop(),u=null,O},this.compileAsync=function(M,D,F=null){const O=this.compile(M,D,F);return new Promise(z=>{function oe(){if(O.forEach(function(pe){A.get(pe).currentProgram.isReady()&&O.delete(pe)}),O.size===0){z(M);return}setTimeout(oe,10)}ve.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let st=null;function Xe(M){st&&st(M)}function nt(){bt.stop()}function it(){bt.start()}const bt=new Ss;bt.setAnimationLoop(Xe),typeof self<"u"&&bt.setContext(self),this.setAnimationLoop=function(M){st=M,m.setAnimationLoop(M),M===null?bt.stop():bt.start()},m.addEventListener("sessionstart",nt),m.addEventListener("sessionend",it),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),m.enabled===!0&&m.isPresenting===!0&&(m.cameraAutoUpdate===!0&&m.updateCamera(D),D=m.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,D,T),u=ie.get(M,E.length),u.init(),E.push(u),ce.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),We.setFromProjectionMatrix(ce),te=this.localClippingEnabled,k=se.init(this.clippingPlanes,te),b=_e.get(M,h.length),b.init(),h.push(b),Et(M,D,0,y.sortObjects),b.finish(),y.sortObjects===!0&&b.sort(H,ee),this.info.render.frame++,k===!0&&se.beginShadows();const F=u.state.shadowsArray;if(ye.render(F,M,D),k===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(m.enabled===!1||m.isPresenting===!1||m.hasDepthSensing()===!1)&&he.render(b,M),u.setupLights(y._useLegacyLights),D.isArrayCamera){const O=D.cameras;for(let z=0,oe=O.length;z<oe;z++){const pe=O[z];Jt(b,M,pe,pe.viewport)}}else Jt(b,M,D);T!==null&&(_.updateMultisampleRenderTarget(T),_.updateRenderTargetMipmap(T)),M.isScene===!0&&M.onAfterRender(y,M,D),He.resetDefaultState(),V=-1,S=null,E.pop(),E.length>0?u=E[E.length-1]:u=null,h.pop(),h.length>0?b=h[h.length-1]:b=null};function Et(M,D,F,O){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)F=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)u.pushLight(M),M.castShadow&&u.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||We.intersectsSprite(M)){O&&Ee.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ce);const pe=ge.update(M),xe=M.material;xe.visible&&b.push(M,pe,xe,F,Ee.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||We.intersectsObject(M))){const pe=ge.update(M),xe=M.material;if(O&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ee.copy(M.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),Ee.copy(pe.boundingSphere.center)),Ee.applyMatrix4(M.matrixWorld).applyMatrix4(ce)),Array.isArray(xe)){const Me=pe.groups;for(let we=0,Ae=Me.length;we<Ae;we++){const Re=Me[we],tt=xe[Re.materialIndex];tt&&tt.visible&&b.push(M,pe,tt,F,Ee.z,Re)}}else xe.visible&&b.push(M,pe,xe,F,Ee.z,null)}}const oe=M.children;for(let pe=0,xe=oe.length;pe<xe;pe++)Et(oe[pe],D,F,O)}function Jt(M,D,F,O){const z=M.opaque,oe=M.transmissive,pe=M.transparent;u.setupLightsView(F),k===!0&&se.setGlobalState(y.clippingPlanes,F),oe.length>0&&Un(z,oe,D,F),O&&be.viewport(v.copy(O)),z.length>0&&pn(z,D,F),oe.length>0&&pn(oe,D,F),pe.length>0&&pn(pe,D,F),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Un(M,D,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;if(u.state.transmissionRenderTarget===null){u.state.transmissionRenderTarget=new Rn(1,1,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")||ve.has("EXT_color_buffer_float")?ir:dn,minFilter:Tn,samples:4,stencilBuffer:o});const we=A.get(u.state.transmissionRenderTarget);we.__isTransmissionRenderTarget=!0}const oe=u.state.transmissionRenderTarget;y.getDrawingBufferSize(ae),oe.setSize(ae.x,ae.y);const pe=y.getRenderTarget();y.setRenderTarget(oe),y.getClearColor(C),$=y.getClearAlpha(),$<1&&y.setClearColor(16777215,.5),y.clear();const xe=y.toneMapping;y.toneMapping=hn,pn(M,F,O),_.updateMultisampleRenderTarget(oe),_.updateRenderTargetMipmap(oe);let Me=!1;for(let we=0,Ae=D.length;we<Ae;we++){const Re=D[we],tt=Re.object,yt=Re.geometry,lt=Re.material,Vt=Re.group;if(lt.side===qt&&tt.layers.test(O.layers)){const Qe=lt.side;lt.side=vt,lt.needsUpdate=!0,go(tt,F,O,yt,lt,Vt),lt.side=Qe,lt.needsUpdate=!0,Me=!0}}Me===!0&&(_.updateMultisampleRenderTarget(oe),_.updateRenderTargetMipmap(oe)),y.setRenderTarget(pe),y.setClearColor(C,$),y.toneMapping=xe}function pn(M,D,F){const O=D.isScene===!0?D.overrideMaterial:null;for(let z=0,oe=M.length;z<oe;z++){const pe=M[z],xe=pe.object,Me=pe.geometry,we=O===null?pe.material:O,Ae=pe.group;xe.layers.test(F.layers)&&go(xe,D,F,Me,we,Ae)}}function go(M,D,F,O,z,oe){M.onBeforeRender(y,D,F,O,z,oe),M.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),z.onBeforeRender(y,D,F,O,M,oe),z.transparent===!0&&z.side===qt&&z.forceSinglePass===!1?(z.side=vt,z.needsUpdate=!0,y.renderBufferDirect(F,D,O,z,M,oe),z.side=un,z.needsUpdate=!0,y.renderBufferDirect(F,D,O,z,M,oe),z.side=qt):y.renderBufferDirect(F,D,O,z,M,oe),M.onAfterRender(y,D,F,O,z,oe)}function Ci(M,D,F){D.isScene!==!0&&(D=Te);const O=A.get(M),z=u.state.lights,oe=u.state.shadowsArray,pe=z.state.version,xe=K.getParameters(M,z.state,oe,D,F),Me=K.getProgramCacheKey(xe);let we=O.programs;O.environment=M.isMeshStandardMaterial?D.environment:null,O.fog=D.fog,O.envMap=(M.isMeshStandardMaterial?Y:B).get(M.envMap||O.environment),O.envMapRotation=O.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,we===void 0&&(M.addEventListener("dispose",le),we=new Map,O.programs=we);let Ae=we.get(Me);if(Ae!==void 0){if(O.currentProgram===Ae&&O.lightsStateVersion===pe)return xo(M,xe),Ae}else xe.uniforms=K.getUniforms(M),M.onBuild(F,xe,y),M.onBeforeCompile(xe,y),Ae=K.acquireProgram(xe,Me),we.set(Me,Ae),O.uniforms=xe.uniforms;const Re=O.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Re.clippingPlanes=se.uniform),xo(M,xe),O.needsLights=Us(M),O.lightsStateVersion=pe,O.needsLights&&(Re.ambientLightColor.value=z.state.ambient,Re.lightProbe.value=z.state.probe,Re.directionalLights.value=z.state.directional,Re.directionalLightShadows.value=z.state.directionalShadow,Re.spotLights.value=z.state.spot,Re.spotLightShadows.value=z.state.spotShadow,Re.rectAreaLights.value=z.state.rectArea,Re.ltc_1.value=z.state.rectAreaLTC1,Re.ltc_2.value=z.state.rectAreaLTC2,Re.pointLights.value=z.state.point,Re.pointLightShadows.value=z.state.pointShadow,Re.hemisphereLights.value=z.state.hemi,Re.directionalShadowMap.value=z.state.directionalShadowMap,Re.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Re.spotShadowMap.value=z.state.spotShadowMap,Re.spotLightMatrix.value=z.state.spotLightMatrix,Re.spotLightMap.value=z.state.spotLightMap,Re.pointShadowMap.value=z.state.pointShadowMap,Re.pointShadowMatrix.value=z.state.pointShadowMatrix),O.currentProgram=Ae,O.uniformsList=null,Ae}function _o(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=tr.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function xo(M,D){const F=A.get(M);F.outputColorSpace=D.outputColorSpace,F.batching=D.batching,F.instancing=D.instancing,F.instancingColor=D.instancingColor,F.instancingMorph=D.instancingMorph,F.skinning=D.skinning,F.morphTargets=D.morphTargets,F.morphNormals=D.morphNormals,F.morphColors=D.morphColors,F.morphTargetsCount=D.morphTargetsCount,F.numClippingPlanes=D.numClippingPlanes,F.numIntersection=D.numClipIntersection,F.vertexAlphas=D.vertexAlphas,F.vertexTangents=D.vertexTangents,F.toneMapping=D.toneMapping}function Ps(M,D,F,O,z){D.isScene!==!0&&(D=Te),_.resetTextureUnits();const oe=D.fog,pe=O.isMeshStandardMaterial?D.environment:null,xe=T===null?y.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Ct,Me=(O.isMeshStandardMaterial?Y:B).get(O.envMap||pe),we=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Ae=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Re=!!F.morphAttributes.position,tt=!!F.morphAttributes.normal,yt=!!F.morphAttributes.color;let lt=hn;O.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(lt=y.toneMapping);const Vt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Qe=Vt!==void 0?Vt.length:0,Ce=A.get(O),pr=u.state.lights;if(k===!0&&(te===!0||M!==S)){const At=M===S&&O.id===V;se.setState(O,M,At)}let Ke=!1;O.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==pr.state.version||Ce.outputColorSpace!==xe||z.isBatchedMesh&&Ce.batching===!1||!z.isBatchedMesh&&Ce.batching===!0||z.isInstancedMesh&&Ce.instancing===!1||!z.isInstancedMesh&&Ce.instancing===!0||z.isSkinnedMesh&&Ce.skinning===!1||!z.isSkinnedMesh&&Ce.skinning===!0||z.isInstancedMesh&&Ce.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&Ce.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&Ce.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&Ce.instancingMorph===!1&&z.morphTexture!==null||Ce.envMap!==Me||O.fog===!0&&Ce.fog!==oe||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==se.numPlanes||Ce.numIntersection!==se.numIntersection)||Ce.vertexAlphas!==we||Ce.vertexTangents!==Ae||Ce.morphTargets!==Re||Ce.morphNormals!==tt||Ce.morphColors!==yt||Ce.toneMapping!==lt||Ce.morphTargetsCount!==Qe)&&(Ke=!0):(Ke=!0,Ce.__version=O.version);let mn=Ce.currentProgram;Ke===!0&&(mn=Ci(O,D,z));let vo=!1,ui=!1,mr=!1;const ht=mn.getUniforms(),Qt=Ce.uniforms;if(be.useProgram(mn.program)&&(vo=!0,ui=!0,mr=!0),O.id!==V&&(V=O.id,ui=!0),vo||S!==M){ht.setValue(P,"projectionMatrix",M.projectionMatrix),ht.setValue(P,"viewMatrix",M.matrixWorldInverse);const At=ht.map.cameraPosition;At!==void 0&&At.setValue(P,Ee.setFromMatrixPosition(M.matrixWorld)),et.logarithmicDepthBuffer&&ht.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&ht.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,ui=!0,mr=!0)}if(z.isSkinnedMesh){ht.setOptional(P,z,"bindMatrix"),ht.setOptional(P,z,"bindMatrixInverse");const At=z.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),ht.setValue(P,"boneTexture",At.boneTexture,_))}z.isBatchedMesh&&(ht.setOptional(P,z,"batchingTexture"),ht.setValue(P,"batchingTexture",z._matricesTexture,_));const gr=F.morphAttributes;if((gr.position!==void 0||gr.normal!==void 0||gr.color!==void 0)&&de.update(z,F,mn),(ui||Ce.receiveShadow!==z.receiveShadow)&&(Ce.receiveShadow=z.receiveShadow,ht.setValue(P,"receiveShadow",z.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(Qt.envMap.value=Me,Qt.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&D.environment!==null&&(Qt.envMapIntensity.value=D.environmentIntensity),ui&&(ht.setValue(P,"toneMappingExposure",y.toneMappingExposure),Ce.needsLights&&Ls(Qt,mr),oe&&O.fog===!0&&me.refreshFogUniforms(Qt,oe),me.refreshMaterialUniforms(Qt,O,J,j,u.state.transmissionRenderTarget),tr.upload(P,_o(Ce),Qt,_)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(tr.upload(P,_o(Ce),Qt,_),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&ht.setValue(P,"center",z.center),ht.setValue(P,"modelViewMatrix",z.modelViewMatrix),ht.setValue(P,"normalMatrix",z.normalMatrix),ht.setValue(P,"modelMatrix",z.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const At=O.uniformsGroups;for(let _r=0,zs=At.length;_r<zs;_r++){const bo=At[_r];ke.update(bo,mn),ke.bind(bo,mn)}}return mn}function Ls(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function Us(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(M,D,F){A.get(M.texture).__webglTexture=D,A.get(M.depthTexture).__webglTexture=F;const O=A.get(M);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,D){const F=A.get(M);F.__webglFramebuffer=D,F.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(M,D=0,F=0){T=M,I=D,R=F;let O=!0,z=null,oe=!1,pe=!1;if(M){const Me=A.get(M);Me.__useDefaultFramebuffer!==void 0?(be.bindFramebuffer(P.FRAMEBUFFER,null),O=!1):Me.__webglFramebuffer===void 0?_.setupRenderTarget(M):Me.__hasExternalTextures&&_.rebindTextures(M,A.get(M.texture).__webglTexture,A.get(M.depthTexture).__webglTexture);const we=M.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(pe=!0);const Ae=A.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ae[D])?z=Ae[D][F]:z=Ae[D],oe=!0):M.samples>0&&_.useMultisampledRTT(M)===!1?z=A.get(M).__webglMultisampledFramebuffer:Array.isArray(Ae)?z=Ae[F]:z=Ae,v.copy(M.viewport),L.copy(M.scissor),W=M.scissorTest}else v.copy(Q).multiplyScalar(J).floor(),L.copy(ue).multiplyScalar(J).floor(),W=Le;if(be.bindFramebuffer(P.FRAMEBUFFER,z)&&O&&be.drawBuffers(M,z),be.viewport(v),be.scissor(L),be.setScissorTest(W),oe){const Me=A.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,Me.__webglTexture,F)}else if(pe){const Me=A.get(M.texture),we=D||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Me.__webglTexture,F||0,we)}V=-1},this.readRenderTargetPixels=function(M,D,F,O,z,oe,pe){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=A.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&pe!==void 0&&(xe=xe[pe]),xe){be.bindFramebuffer(P.FRAMEBUFFER,xe);try{const Me=M.texture,we=Me.format,Ae=Me.type;if(we!==Bt&&Ve.convert(we)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Re=Ae===ir&&(ve.has("EXT_color_buffer_half_float")||ve.has("EXT_color_buffer_float"));if(Ae!==dn&&Ve.convert(Ae)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&Ae!==Zt&&!Re){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-O&&F>=0&&F<=M.height-z&&P.readPixels(D,F,O,z,Ve.convert(we),Ve.convert(Ae),oe)}finally{const Me=T!==null?A.get(T).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,Me)}}},this.copyFramebufferToTexture=function(M,D,F=0){const O=Math.pow(2,-F),z=Math.floor(D.image.width*O),oe=Math.floor(D.image.height*O);_.setTexture2D(D,0),P.copyTexSubImage2D(P.TEXTURE_2D,F,0,0,M.x,M.y,z,oe),be.unbindTexture()},this.copyTextureToTexture=function(M,D,F,O=0){const z=D.image.width,oe=D.image.height,pe=Ve.convert(F.format),xe=Ve.convert(F.type);_.setTexture2D(F,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,F.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,F.unpackAlignment),D.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,O,M.x,M.y,z,oe,pe,xe,D.image.data):D.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,O,M.x,M.y,D.mipmaps[0].width,D.mipmaps[0].height,pe,D.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,O,M.x,M.y,pe,xe,D.image),O===0&&F.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),be.unbindTexture()},this.copyTextureToTexture3D=function(M,D,F,O,z=0){const oe=Math.round(M.max.x-M.min.x),pe=Math.round(M.max.y-M.min.y),xe=M.max.z-M.min.z+1,Me=Ve.convert(O.format),we=Ve.convert(O.type);let Ae;if(O.isData3DTexture)_.setTexture3D(O,0),Ae=P.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)_.setTexture2DArray(O,0),Ae=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,O.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,O.unpackAlignment);const Re=P.getParameter(P.UNPACK_ROW_LENGTH),tt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),yt=P.getParameter(P.UNPACK_SKIP_PIXELS),lt=P.getParameter(P.UNPACK_SKIP_ROWS),Vt=P.getParameter(P.UNPACK_SKIP_IMAGES),Qe=F.isCompressedTexture?F.mipmaps[z]:F.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,Qe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Qe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,M.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,M.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,M.min.z),F.isDataTexture||F.isData3DTexture?P.texSubImage3D(Ae,z,D.x,D.y,D.z,oe,pe,xe,Me,we,Qe.data):O.isCompressedArrayTexture?P.compressedTexSubImage3D(Ae,z,D.x,D.y,D.z,oe,pe,xe,Me,Qe.data):P.texSubImage3D(Ae,z,D.x,D.y,D.z,oe,pe,xe,Me,we,Qe),P.pixelStorei(P.UNPACK_ROW_LENGTH,Re),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,tt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,yt),P.pixelStorei(P.UNPACK_SKIP_ROWS,lt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Vt),z===0&&O.generateMipmaps&&P.generateMipmap(Ae),be.unbindTexture()},this.initTexture=function(M){M.isCubeTexture?_.setTextureCube(M,0):M.isData3DTexture?_.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?_.setTexture2DArray(M,0):_.setTexture2D(M,0),be.unbindTexture()},this.resetState=function(){I=0,R=0,T=null,be.reset(),He.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===co?"display-p3":"srgb",t.unpackColorSpace=Ye.workingColorSpace===hr?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class pp extends _t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kt,this.environmentIntensity=1,this.environmentRotation=new Kt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class mp extends pt{constructor(e=null,t=1,n=1,r,o,a,s,l,c=xt,d=xt,f,p){super(null,a,s,l,c,d,r,o,f,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Va extends zt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ei=new Ze,ka=new Ze,Qi=[],Ga=new Dn,gp=new Ze,_i=new Ut,xi=new Ri;class _p extends Ut{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Va(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,gp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Dn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ei),Ga.copy(e.boundingBox).applyMatrix4(ei),this.boundingBox.union(Ga)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ei),xi.copy(e.boundingSphere).applyMatrix4(ei),this.boundingSphere.union(xi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,o=n.length+1,a=e*o+1;for(let s=0;s<n.length;s++)n[s]=r[a+s]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(_i.geometry=this.geometry,_i.material=this.material,_i.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),xi.copy(this.boundingSphere),xi.applyMatrix4(n),e.ray.intersectsSphere(xi)!==!1))for(let o=0;o<r;o++){this.getMatrixAt(o,ei),ka.multiplyMatrices(n,ei),_i.matrixWorld=ka,_i.raycast(e,Qi);for(let a=0,s=Qi.length;a<s;a++){const l=Qi[a];l.instanceId=o,l.object=this,t.push(l)}Qi.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Va(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new mp(new Float32Array(r*this.count),r,this.count,os,Zt));const o=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const s=this.geometry.morphTargetsRelative?1:1-a,l=r*e;o[l]=s,o.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class xp extends pt{constructor(e,t,n,r,o,a,s,l,c){super(e,t,n,r,o,a,s,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vp extends _t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Zr=new Ze,Wa=new N,Xa=new N;class bp{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fo,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Wa.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wa),Xa.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xa),t.updateMatrixWorld(),Zr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Ya=new Ze,vi=new N,jr=new N;class yp extends bp{constructor(){super(new Rt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Se(4,2),this._viewportCount=6,this._viewports=[new Je(2,1,1,1),new Je(0,1,1,1),new Je(3,1,1,1),new Je(1,1,1,1),new Je(3,0,1,1),new Je(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,o=e.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),vi.setFromMatrixPosition(e.matrixWorld),n.position.copy(vi),jr.copy(n.position),jr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(jr),n.updateMatrixWorld(),r.makeTranslation(-vi.x,-vi.y,-vi.z),Ya.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ya)}}class Mp extends vp{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new yp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $a{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lo);const qa={type:"change"},Kr={type:"start"},Za={type:"end"},er=new ms,ja=new sn,Sp=Math.cos(70*ds.DEG2RAD);class Ep extends Nn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zn.ROTATE,MIDDLE:zn.DOLLY,RIGHT:zn.PAN},this.touches={ONE:In.ROTATE,TWO:In.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return s.phi},this.getAzimuthalAngle=function(){return s.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(m){m.addEventListener("keydown",se),this._domElementKeyEvents=m},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",se),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(qa),n.update(),o=r.NONE},this.update=function(){const m=new N,U=new Cn().setFromUnitVectors(e.up,new N(0,1,0)),G=U.clone().invert(),ne=new N,le=new Cn,Be=new N,Ue=2*Math.PI;return function(st=null){const Xe=n.object.position;m.copy(Xe).sub(n.target),m.applyQuaternion(U),s.setFromVector3(m),n.autoRotate&&o===r.NONE&&W(v(st)),n.enableDamping?(s.theta+=l.theta*n.dampingFactor,s.phi+=l.phi*n.dampingFactor):(s.theta+=l.theta,s.phi+=l.phi);let nt=n.minAzimuthAngle,it=n.maxAzimuthAngle;isFinite(nt)&&isFinite(it)&&(nt<-Math.PI?nt+=Ue:nt>Math.PI&&(nt-=Ue),it<-Math.PI?it+=Ue:it>Math.PI&&(it-=Ue),nt<=it?s.theta=Math.max(nt,Math.min(it,s.theta)):s.theta=s.theta>(nt+it)/2?Math.max(nt,s.theta):Math.min(it,s.theta)),s.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,s.phi)),s.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(d,n.dampingFactor):n.target.add(d),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let bt=!1;if(n.zoomToCursor&&R||n.object.isOrthographicCamera)s.radius=Q(s.radius);else{const Et=s.radius;s.radius=Q(s.radius*c),bt=Et!=s.radius}if(m.setFromSpherical(s),m.applyQuaternion(G),Xe.copy(n.target).add(m),n.object.lookAt(n.target),n.enableDamping===!0?(l.theta*=1-n.dampingFactor,l.phi*=1-n.dampingFactor,d.multiplyScalar(1-n.dampingFactor)):(l.set(0,0,0),d.set(0,0,0)),n.zoomToCursor&&R){let Et=null;if(n.object.isPerspectiveCamera){const Jt=m.length();Et=Q(Jt*c);const Un=Jt-Et;n.object.position.addScaledVector(w,Un),n.object.updateMatrixWorld(),bt=!!Un}else if(n.object.isOrthographicCamera){const Jt=new N(I.x,I.y,0);Jt.unproject(n.object);const Un=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),n.object.updateProjectionMatrix(),bt=Un!==n.object.zoom;const pn=new N(I.x,I.y,0);pn.unproject(n.object),n.object.position.sub(pn).add(Jt),n.object.updateMatrixWorld(),Et=m.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Et!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Et).add(n.object.position):(er.origin.copy(n.object.position),er.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(er.direction))<Sp?e.lookAt(n.target):(ja.setFromNormalAndCoplanarPoint(n.object.up,n.target),er.intersectPlane(ja,n.target))))}else if(n.object.isOrthographicCamera){const Et=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/c)),Et!==n.object.zoom&&(n.object.updateProjectionMatrix(),bt=!0)}return c=1,R=!1,bt||ne.distanceToSquared(n.object.position)>a||8*(1-le.dot(n.object.quaternion))>a||Be.distanceToSquared(n.target)>a?(n.dispatchEvent(qa),ne.copy(n.object.position),le.copy(n.object.quaternion),Be.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",de),n.domElement.removeEventListener("pointerdown",B),n.domElement.removeEventListener("pointercancel",q),n.domElement.removeEventListener("wheel",K),n.domElement.removeEventListener("pointermove",Y),n.domElement.removeEventListener("pointerup",q),n.domElement.getRootNode().removeEventListener("keydown",_e,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",se),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=r.NONE;const a=1e-6,s=new $a,l=new $a;let c=1;const d=new N,f=new Se,p=new Se,g=new Se,x=new Se,b=new Se,u=new Se,h=new Se,E=new Se,y=new Se,w=new N,I=new Se;let R=!1;const T=[],V={};let S=!1;function v(m){return m!==null?2*Math.PI/60*n.autoRotateSpeed*m:2*Math.PI/60/60*n.autoRotateSpeed}function L(m){const U=Math.abs(m*.01);return Math.pow(.95,n.zoomSpeed*U)}function W(m){l.theta-=m}function C(m){l.phi-=m}const $=function(){const m=new N;return function(G,ne){m.setFromMatrixColumn(ne,0),m.multiplyScalar(-G),d.add(m)}}(),X=function(){const m=new N;return function(G,ne){n.screenSpacePanning===!0?m.setFromMatrixColumn(ne,1):(m.setFromMatrixColumn(ne,0),m.crossVectors(n.object.up,m)),m.multiplyScalar(G),d.add(m)}}(),j=function(){const m=new N;return function(G,ne){const le=n.domElement;if(n.object.isPerspectiveCamera){const Be=n.object.position;m.copy(Be).sub(n.target);let Ue=m.length();Ue*=Math.tan(n.object.fov/2*Math.PI/180),$(2*G*Ue/le.clientHeight,n.object.matrix),X(2*ne*Ue/le.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?($(G*(n.object.right-n.object.left)/n.object.zoom/le.clientWidth,n.object.matrix),X(ne*(n.object.top-n.object.bottom)/n.object.zoom/le.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function J(m){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c/=m:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function H(m){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?c*=m:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ee(m,U){if(!n.zoomToCursor)return;R=!0;const G=n.domElement.getBoundingClientRect(),ne=m-G.left,le=U-G.top,Be=G.width,Ue=G.height;I.x=ne/Be*2-1,I.y=-(le/Ue)*2+1,w.set(I.x,I.y,1).unproject(n.object).sub(n.object.position).normalize()}function Q(m){return Math.max(n.minDistance,Math.min(n.maxDistance,m))}function ue(m){f.set(m.clientX,m.clientY)}function Le(m){ee(m.clientX,m.clientX),h.set(m.clientX,m.clientY)}function We(m){x.set(m.clientX,m.clientY)}function k(m){p.set(m.clientX,m.clientY),g.subVectors(p,f).multiplyScalar(n.rotateSpeed);const U=n.domElement;W(2*Math.PI*g.x/U.clientHeight),C(2*Math.PI*g.y/U.clientHeight),f.copy(p),n.update()}function te(m){E.set(m.clientX,m.clientY),y.subVectors(E,h),y.y>0?J(L(y.y)):y.y<0&&H(L(y.y)),h.copy(E),n.update()}function ce(m){b.set(m.clientX,m.clientY),u.subVectors(b,x).multiplyScalar(n.panSpeed),j(u.x,u.y),x.copy(b),n.update()}function ae(m){ee(m.clientX,m.clientY),m.deltaY<0?H(L(m.deltaY)):m.deltaY>0&&J(L(m.deltaY)),n.update()}function Ee(m){let U=!1;switch(m.code){case n.keys.UP:m.ctrlKey||m.metaKey||m.shiftKey?C(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):j(0,n.keyPanSpeed),U=!0;break;case n.keys.BOTTOM:m.ctrlKey||m.metaKey||m.shiftKey?C(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):j(0,-n.keyPanSpeed),U=!0;break;case n.keys.LEFT:m.ctrlKey||m.metaKey||m.shiftKey?W(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):j(n.keyPanSpeed,0),U=!0;break;case n.keys.RIGHT:m.ctrlKey||m.metaKey||m.shiftKey?W(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):j(-n.keyPanSpeed,0),U=!0;break}U&&(m.preventDefault(),n.update())}function Te(m){if(T.length===1)f.set(m.pageX,m.pageY);else{const U=ke(m),G=.5*(m.pageX+U.x),ne=.5*(m.pageY+U.y);f.set(G,ne)}}function Ie(m){if(T.length===1)x.set(m.pageX,m.pageY);else{const U=ke(m),G=.5*(m.pageX+U.x),ne=.5*(m.pageY+U.y);x.set(G,ne)}}function P(m){const U=ke(m),G=m.pageX-U.x,ne=m.pageY-U.y,le=Math.sqrt(G*G+ne*ne);h.set(0,le)}function Pe(m){n.enableZoom&&P(m),n.enablePan&&Ie(m)}function ve(m){n.enableZoom&&P(m),n.enableRotate&&Te(m)}function et(m){if(T.length==1)p.set(m.pageX,m.pageY);else{const G=ke(m),ne=.5*(m.pageX+G.x),le=.5*(m.pageY+G.y);p.set(ne,le)}g.subVectors(p,f).multiplyScalar(n.rotateSpeed);const U=n.domElement;W(2*Math.PI*g.x/U.clientHeight),C(2*Math.PI*g.y/U.clientHeight),f.copy(p)}function be(m){if(T.length===1)b.set(m.pageX,m.pageY);else{const U=ke(m),G=.5*(m.pageX+U.x),ne=.5*(m.pageY+U.y);b.set(G,ne)}u.subVectors(b,x).multiplyScalar(n.panSpeed),j(u.x,u.y),x.copy(b)}function Ge(m){const U=ke(m),G=m.pageX-U.x,ne=m.pageY-U.y,le=Math.sqrt(G*G+ne*ne);E.set(0,le),y.set(0,Math.pow(E.y/h.y,n.zoomSpeed)),J(y.y),h.copy(E);const Be=(m.pageX+U.x)*.5,Ue=(m.pageY+U.y)*.5;ee(Be,Ue)}function A(m){n.enableZoom&&Ge(m),n.enablePan&&be(m)}function _(m){n.enableZoom&&Ge(m),n.enableRotate&&et(m)}function B(m){n.enabled!==!1&&(T.length===0&&(n.domElement.setPointerCapture(m.pointerId),n.domElement.addEventListener("pointermove",Y),n.domElement.addEventListener("pointerup",q)),!Ve(m)&&(Fe(m),m.pointerType==="touch"?ye(m):Z(m)))}function Y(m){n.enabled!==!1&&(m.pointerType==="touch"?he(m):ge(m))}function q(m){switch(Oe(m),T.length){case 0:n.domElement.releasePointerCapture(m.pointerId),n.domElement.removeEventListener("pointermove",Y),n.domElement.removeEventListener("pointerup",q),n.dispatchEvent(Za),o=r.NONE;break;case 1:const U=T[0],G=V[U];ye({pointerId:U,pageX:G.x,pageY:G.y});break}}function Z(m){let U;switch(m.button){case 0:U=n.mouseButtons.LEFT;break;case 1:U=n.mouseButtons.MIDDLE;break;case 2:U=n.mouseButtons.RIGHT;break;default:U=-1}switch(U){case zn.DOLLY:if(n.enableZoom===!1)return;Le(m),o=r.DOLLY;break;case zn.ROTATE:if(m.ctrlKey||m.metaKey||m.shiftKey){if(n.enablePan===!1)return;We(m),o=r.PAN}else{if(n.enableRotate===!1)return;ue(m),o=r.ROTATE}break;case zn.PAN:if(m.ctrlKey||m.metaKey||m.shiftKey){if(n.enableRotate===!1)return;ue(m),o=r.ROTATE}else{if(n.enablePan===!1)return;We(m),o=r.PAN}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(Kr)}function ge(m){switch(o){case r.ROTATE:if(n.enableRotate===!1)return;k(m);break;case r.DOLLY:if(n.enableZoom===!1)return;te(m);break;case r.PAN:if(n.enablePan===!1)return;ce(m);break}}function K(m){n.enabled===!1||n.enableZoom===!1||o!==r.NONE||(m.preventDefault(),n.dispatchEvent(Kr),ae(me(m)),n.dispatchEvent(Za))}function me(m){const U=m.deltaMode,G={clientX:m.clientX,clientY:m.clientY,deltaY:m.deltaY};switch(U){case 1:G.deltaY*=16;break;case 2:G.deltaY*=100;break}return m.ctrlKey&&!S&&(G.deltaY*=10),G}function _e(m){m.key==="Control"&&(S=!0,n.domElement.getRootNode().addEventListener("keyup",ie,{passive:!0,capture:!0}))}function ie(m){m.key==="Control"&&(S=!1,n.domElement.getRootNode().removeEventListener("keyup",ie,{passive:!0,capture:!0}))}function se(m){n.enabled===!1||n.enablePan===!1||Ee(m)}function ye(m){switch(He(m),T.length){case 1:switch(n.touches.ONE){case In.ROTATE:if(n.enableRotate===!1)return;Te(m),o=r.TOUCH_ROTATE;break;case In.PAN:if(n.enablePan===!1)return;Ie(m),o=r.TOUCH_PAN;break;default:o=r.NONE}break;case 2:switch(n.touches.TWO){case In.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Pe(m),o=r.TOUCH_DOLLY_PAN;break;case In.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ve(m),o=r.TOUCH_DOLLY_ROTATE;break;default:o=r.NONE}break;default:o=r.NONE}o!==r.NONE&&n.dispatchEvent(Kr)}function he(m){switch(He(m),o){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;et(m),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;be(m),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;A(m),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;_(m),n.update();break;default:o=r.NONE}}function de(m){n.enabled!==!1&&m.preventDefault()}function Fe(m){T.push(m.pointerId)}function Oe(m){delete V[m.pointerId];for(let U=0;U<T.length;U++)if(T[U]==m.pointerId){T.splice(U,1);return}}function Ve(m){for(let U=0;U<T.length;U++)if(T[U]==m.pointerId)return!0;return!1}function He(m){let U=V[m.pointerId];U===void 0&&(U=new Se,V[m.pointerId]=U),U.set(m.pageX,m.pageY)}function ke(m){const U=m.pointerId===T[0]?T[1]:T[0];return V[U]}n.domElement.addEventListener("contextmenu",de),n.domElement.addEventListener("pointerdown",B),n.domElement.addEventListener("pointercancel",q),n.domElement.addEventListener("wheel",K,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",_e,{passive:!0,capture:!0}),this.update()}}const bi=new N;function wt(i,e,t,n,r,o){const a=2*Math.PI*r/4,s=Math.max(o-2*r,0),l=Math.PI/4;bi.copy(e),bi[n]=0,bi.normalize();const c=.5*a/(a+s),d=1-bi.angleTo(i)/l;return Math.sign(bi[t])===1?d*c:s/(a+s)+c+c*(1-d)}class Ap extends Ln{constructor(e=1,t=1,n=1,r=2,o=.1){if(r=r*2+1,o=Math.min(e/2,t/2,n/2,o),super(1,1,1,r,r,r),r===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const s=new N,l=new N,c=new N(e,t,n).divideScalar(2).subScalar(o),d=this.attributes.position.array,f=this.attributes.normal.array,p=this.attributes.uv.array,g=d.length/6,x=new N,b=.5/r;for(let u=0,h=0;u<d.length;u+=3,h+=2)switch(s.fromArray(d,u),l.copy(s),l.x-=Math.sign(l.x)*b,l.y-=Math.sign(l.y)*b,l.z-=Math.sign(l.z)*b,l.normalize(),d[u+0]=c.x*Math.sign(s.x)+l.x*o,d[u+1]=c.y*Math.sign(s.y)+l.y*o,d[u+2]=c.z*Math.sign(s.z)+l.z*o,f[u+0]=l.x,f[u+1]=l.y,f[u+2]=l.z,Math.floor(u/g)){case 0:x.set(1,0,0),p[h+0]=wt(x,l,"z","y",o,n),p[h+1]=1-wt(x,l,"y","z",o,t);break;case 1:x.set(-1,0,0),p[h+0]=1-wt(x,l,"z","y",o,n),p[h+1]=1-wt(x,l,"y","z",o,t);break;case 2:x.set(0,1,0),p[h+0]=1-wt(x,l,"x","z",o,e),p[h+1]=wt(x,l,"z","x",o,n);break;case 3:x.set(0,-1,0),p[h+0]=1-wt(x,l,"x","z",o,e),p[h+1]=1-wt(x,l,"z","x",o,n);break;case 4:x.set(0,0,1),p[h+0]=1-wt(x,l,"x","y",o,e),p[h+1]=1-wt(x,l,"y","x",o,t);break;case 5:x.set(0,0,-1),p[h+0]=wt(x,l,"x","y",o,e),p[h+1]=1-wt(x,l,"y","x",o,t);break}}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.19.2
 * @author George Michael Brower
 * @license MIT
 */class Ht{constructor(e,t,n,r,o="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),Ht.nextNameID=Ht.nextNameID||0,this.$name.id=`lil-gui-name-${++Ht.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Tp extends Ht{constructor(e,t,n){super(e,t,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function so(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const wp={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:so,toHexString:so},Ti={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},Rp={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){const n=Ti.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return Ti.toHexString(r)}},Cp={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){const n=Ti.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;const r=i*n<<16^e*n<<8^t*n<<0;return Ti.toHexString(r)}},Np=[wp,Ti,Rp,Cp];function Dp(i){return Np.find(e=>e.match(i))}class Pp extends Ht{constructor(e,t,n,r){super(e,t,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Dp(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=so(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Jr extends Ht{constructor(e,t,n){super(e,t,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Lp extends Ht{constructor(e,t,n,r,o,a){super(e,t,n,"number"),this._initInput(),this.min(r),this.max(o);const s=a!==void 0;this.step(s?a:this._getImplicitStep(),s),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let E=parseFloat(this.$input.value);isNaN(E)||(this._stepExplicit&&(E=this._snap(E)),this.setValue(this._clamp(E)))},n=E=>{const y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+E),this.$input.value=this.getValue())},r=E=>{E.key==="Enter"&&this.$input.blur(),E.code==="ArrowUp"&&(E.preventDefault(),n(this._step*this._arrowKeyMultiplier(E))),E.code==="ArrowDown"&&(E.preventDefault(),n(this._step*this._arrowKeyMultiplier(E)*-1))},o=E=>{this._inputFocused&&(E.preventDefault(),n(this._step*this._normalizeMouseWheel(E)))};let a=!1,s,l,c,d,f;const p=5,g=E=>{s=E.clientX,l=c=E.clientY,a=!0,d=this.getValue(),f=0,window.addEventListener("mousemove",x),window.addEventListener("mouseup",b)},x=E=>{if(a){const y=E.clientX-s,w=E.clientY-l;Math.abs(w)>p?(E.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>p&&b()}if(!a){const y=E.clientY-c;f-=y*this._step*this._arrowKeyMultiplier(E),d+f>this._max?f=this._max-d:d+f<this._min&&(f=this._min-d),this._snapClampSetValue(d+f)}c=E.clientY},b=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",b)},u=()=>{this._inputFocused=!0},h=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",g),this.$input.addEventListener("focus",u),this.$input.addEventListener("blur",h)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(h,E,y,w,I)=>(h-E)/(y-E)*(I-w)+w,t=h=>{const E=this.$slider.getBoundingClientRect();let y=e(h,E.left,E.right,this._min,this._max);this._snapClampSetValue(y)},n=h=>{this._setDraggingStyle(!0),t(h.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",o)},r=h=>{t(h.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",o)};let a=!1,s,l;const c=h=>{h.preventDefault(),this._setDraggingStyle(!0),t(h.touches[0].clientX),a=!1},d=h=>{h.touches.length>1||(this._hasScrollBar?(s=h.touches[0].clientX,l=h.touches[0].clientY,a=!0):c(h),window.addEventListener("touchmove",f,{passive:!1}),window.addEventListener("touchend",p))},f=h=>{if(a){const E=h.touches[0].clientX-s,y=h.touches[0].clientY-l;Math.abs(E)>Math.abs(y)?c(h):(window.removeEventListener("touchmove",f),window.removeEventListener("touchend",p))}else h.preventDefault(),t(h.touches[0].clientX)},p=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",f),window.removeEventListener("touchend",p)},g=this._callOnFinishChange.bind(this),x=400;let b;const u=h=>{if(Math.abs(h.deltaX)<Math.abs(h.deltaY)&&this._hasScrollBar)return;h.preventDefault();const y=this._normalizeMouseWheel(h)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(b),b=setTimeout(g,x)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",u,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){const t=Math.round(e/this._step)*this._step;return parseFloat(t.toPrecision(15))}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Up extends Ht{constructor(e,t,n,r){super(e,t,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class zp extends Ht{constructor(e,t,n){super(e,t,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}const Ip=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  line-height: calc(var(--title-height) - 4px);
  font-weight: 600;
  padding: 0 var(--padding);
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  outline: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  border: none;
}
@media (hover: hover) {
  .lil-gui button:hover {
    background: var(--hover-color);
  }
  .lil-gui button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function Fp(i){const e=document.createElement("style");e.innerHTML=i;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ka=!1;class mo{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:o="Controls",closeFolders:a=!1,injectStyles:s=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("div"),this.$title.classList.add("title"),this.$title.setAttribute("role","button"),this.$title.setAttribute("aria-expanded",!0),this.$title.setAttribute("tabindex",0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("keydown",c=>{(c.code==="Enter"||c.code==="Space")&&(c.preventDefault(),this.$title.click())}),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Ka&&s&&(Fp(Ip),Ka=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=a}add(e,t,n,r,o){if(Object(n)===n)return new Up(this,e,t,n);const a=e[t];switch(typeof a){case"number":return new Lp(this,e,t,n,r,o);case"boolean":return new Tp(this,e,t);case"string":return new zp(this,e,t);case"function":return new Jr(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new Pp(this,e,t,n)}addFolder(e){const t=new mo({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Jr||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Jr)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");const n=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}const Op=[{Z:"NaN",arsenic:"0.6",arsenic1:"0.2",arsenic2:"绿",benzene:"2.0",benzene1:"0.8",benzene2:"橙",benzo:"2.3",benzo1:"0.9",benzo2:"橙",cadmium:"1.5",cadmium1:"0.6",cadmium2:"橙",chlordane:"2.2",chlordane1:"0.9",chlordane2:"橙",chloroform:"0.5",chloroform1:"0.2",chloroform2:"绿",endDepth:.2,exceed:"橙",id:"1",latitude:"3195256.388",lead:"0.5",lead1:"0.2",lead2:"绿",longitude:"201932.5333",orderNumber:1,pointNumber:"A01",sampleNumber:"A01-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.8",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"2.3",arsenic1:"0.9",arsenic2:"橙",benzene:"1.2",benzene1:"0.5",benzene2:"橙",benzo:"2.7",benzo1:"1.1",benzo2:"红",cadmium:"2.9",cadmium1:"1.2",cadmium2:"红",chlordane:"0.4",chlordane1:"0.2",chlordane2:"绿",chloroform:"1.3",chloroform1:"0.5",chloroform2:"橙",endDepth:1,exceed:"红",id:"2",latitude:"3195256.388",lead:"2.1",lead1:"0.8",lead2:"橙",longitude:"201932.5333",orderNumber:2,pointNumber:"A01",sampleNumber:"A01-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.2",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"3.0",arsenic1:"1.2",arsenic2:"红",benzene:"0.6",benzene1:"0.2",benzene2:"绿",benzo:"2.8",benzo1:"1.1",benzo2:"红",cadmium:"0.8",cadmium1:"0.3",cadmium2:"绿",chlordane:"0.9",chlordane1:"0.4",chlordane2:"绿",chloroform:"2.0",chloroform1:"0.8",chloroform2:"橙",endDepth:2,exceed:"红",id:"3",latitude:"3195256.388",lead:"2.8",lead1:"1.1",lead2:"红",longitude:"201932.5333",orderNumber:3,pointNumber:"A01",sampleNumber:"A01-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.7",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"1.1",arsenic1:"0.4",arsenic2:"橙",benzene:"2.8",benzene1:"1.1",benzene2:"红",benzo:"0.9",benzo1:"0.4",benzo2:"绿",cadmium:"0.8",cadmium1:"0.3",cadmium2:"绿",chlordane:"2.4",chlordane1:"1.0",chlordane2:"橙",chloroform:"0.6",chloroform1:"0.2",chloroform2:"绿",endDepth:3,exceed:"红",id:"4",latitude:"3195256.388",lead:"0.7",lead1:"0.3",lead2:"绿",longitude:"201932.5333",orderNumber:4,pointNumber:"A01",sampleNumber:"A01-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.4",trichloroethylene1:"1.0",trichloroethylene2:"橙",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"1.9",arsenic1:"0.8",arsenic2:"橙",benzene:"0.9",benzene1:"0.4",benzene2:"绿",benzo:"2.6",benzo1:"1.1",benzo2:"红",cadmium:"0.7",cadmium1:"0.3",cadmium2:"绿",chlordane:"2.6",chlordane1:"1.0",chlordane2:"红",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:4,exceed:"红",id:"5",latitude:"3195256.388",lead:"1.6",lead1:"0.6",lead2:"橙",longitude:"201932.5333",orderNumber:5,pointNumber:"A01",sampleNumber:"A01-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.0",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"2.9",arsenic1:"1.1",arsenic2:"红",benzene:"2.3",benzene1:"0.9",benzene2:"橙",benzo:"0.9",benzo1:"0.4",benzo2:"绿",cadmium:"2.7",cadmium1:"1.1",cadmium2:"红",chlordane:"0.4",chlordane1:"0.2",chlordane2:"绿",chloroform:"1.8",chloroform1:"0.7",chloroform2:"橙",endDepth:5,exceed:"红",id:"6",latitude:"3195256.388",lead:"0.6",lead1:"0.3",lead2:"绿",longitude:"201932.5333",orderNumber:6,pointNumber:"A01",sampleNumber:"A01-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"3.0",trichloroethylene1:"1.2",trichloroethylene2:"红",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"3.0",arsenic1:"1.2",arsenic2:"红",benzene:"0.5",benzene1:"0.2",benzene2:"绿",benzo:"1.7",benzo1:"0.7",benzo2:"橙",cadmium:"0.5",cadmium1:"0.2",cadmium2:"绿",chlordane:"1.0",chlordane1:"0.4",chlordane2:"绿",chloroform:"2.9",chloroform1:"1.1",chloroform2:"红",endDepth:6,exceed:"红",id:"7",latitude:"3195256.388",lead:"2.0",lead1:"0.8",lead2:"橙",longitude:"201932.5333",orderNumber:7,pointNumber:"A01",sampleNumber:"A01-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.9",trichloroethylene1:"0.4",trichloroethylene2:"绿",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"1.2",arsenic1:"0.5",arsenic2:"橙",benzene:"2.7",benzene1:"1.1",benzene2:"红",benzo:"2.5",benzo1:"1.0",benzo2:"红",cadmium:"2.4",cadmium1:"0.9",cadmium2:"橙",chlordane:"2.3",chlordane1:"0.9",chlordane2:"橙",chloroform:"1.2",chloroform1:"0.5",chloroform2:"橙",endDepth:7.2,exceed:"红",id:"8",latitude:"3195256.388",lead:"1.2",lead1:"0.5",lead2:"橙",longitude:"201932.5333",orderNumber:8,pointNumber:"A01",sampleNumber:"A01-08",sampleType:"土壤",startDepth:7,trichloroethylene:"2.1",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.2",arsenic2:"绿",benzene:"0.9",benzene1:"0.4",benzene2:"绿",benzo:"0.5",benzo1:"0.2",benzo2:"绿",cadmium:"0.6",cadmium1:"0.3",cadmium2:"绿",chlordane:"1.0",chlordane1:"0.5",chlordane2:"绿",chloroform:"0.6",chloroform1:"0.3",chloroform2:"绿",endDepth:9.5,exceed:"绿",id:"9",latitude:"3195256.388",lead:"0.5",lead1:"0.3",lead2:"绿",longitude:"201932.5333",orderNumber:9,pointNumber:"A01",sampleNumber:"A01-09",sampleType:"土壤",startDepth:9,trichloroethylene:"0.3",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195256.388"},{Z:"NaN",arsenic:"1.4",arsenic1:"0.6",arsenic2:"橙",benzene:"1.2",benzene1:"0.5",benzene2:"橙",benzo:"2.7",benzo1:"1.1",benzo2:"红",cadmium:"1.0",cadmium1:"0.4",cadmium2:"绿",chlordane:"1.6",chlordane1:"0.6",chlordane2:"橙",chloroform:"0.9",chloroform1:"0.4",chloroform2:"绿",endDepth:.2,exceed:"红",id:"10",latitude:"3195285.383",lead:"2.3",lead1:"0.9",lead2:"橙",longitude:"201995.5375",orderNumber:10,pointNumber:"A02",sampleNumber:"A02-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.4",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"1.3",arsenic1:"0.5",arsenic2:"橙",benzene:"2.8",benzene1:"1.1",benzene2:"红",benzo:"1.8",benzo1:"0.7",benzo2:"橙",cadmium:"1.4",cadmium1:"0.6",cadmium2:"橙",chlordane:"1.0",chlordane1:"0.4",chlordane2:"绿",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:1,exceed:"红",id:"11",latitude:"3195285.383",lead:"1.2",lead1:"0.5",lead2:"橙",longitude:"201995.5375",orderNumber:11,pointNumber:"A02",sampleNumber:"A02-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"2.1",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"2.7",arsenic1:"1.1",arsenic2:"红",benzene:"0.8",benzene1:"0.3",benzene2:"绿",benzo:"1.6",benzo1:"0.7",benzo2:"橙",cadmium:"0.5",cadmium1:"0.2",cadmium2:"绿",chlordane:"1.2",chlordane1:"0.5",chlordane2:"橙",chloroform:"1.2",chloroform1:"0.5",chloroform2:"橙",endDepth:2,exceed:"红",id:"12",latitude:"3195285.383",lead:"1.4",lead1:"0.5",lead2:"橙",longitude:"201995.5375",orderNumber:12,pointNumber:"A02",sampleNumber:"A02-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"2.0",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"2.4",arsenic1:"1.0",arsenic2:"橙",benzene:"2.9",benzene1:"1.2",benzene2:"红",benzo:"2.6",benzo1:"1.0",benzo2:"红",cadmium:"3.0",cadmium1:"1.2",cadmium2:"红",chlordane:"0.9",chlordane1:"0.4",chlordane2:"绿",chloroform:"1.3",chloroform1:"0.5",chloroform2:"橙",endDepth:3,exceed:"红",id:"13",latitude:"3195285.383",lead:"1.6",lead1:"0.6",lead2:"橙",longitude:"201995.5375",orderNumber:13,pointNumber:"A02",sampleNumber:"A02-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"0.2",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"0.4",arsenic1:"0.2",arsenic2:"绿",benzene:"0.3",benzene1:"0.1",benzene2:"绿",benzo:"2.5",benzo1:"1.0",benzo2:"橙",cadmium:"0.9",cadmium1:"0.4",cadmium2:"绿",chlordane:"3.0",chlordane1:"1.2",chlordane2:"红",chloroform:"2.9",chloroform1:"1.2",chloroform2:"红",endDepth:4,exceed:"红",id:"14",latitude:"3195285.383",lead:"2.6",lead1:"1.0",lead2:"红",longitude:"201995.5375",orderNumber:14,pointNumber:"A02",sampleNumber:"A02-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"1.9",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"0.6",arsenic1:"0.2",arsenic2:"绿",benzene:"2.0",benzene1:"0.8",benzene2:"橙",benzo:"1.2",benzo1:"0.5",benzo2:"橙",cadmium:"2.2",cadmium1:"0.9",cadmium2:"橙",chlordane:"0.7",chlordane1:"0.3",chlordane2:"绿",chloroform:"0.2",chloroform1:"0.1",chloroform2:"绿",endDepth:5,exceed:"橙",id:"15",latitude:"3195285.383",lead:"2.5",lead1:"1.0",lead2:"橙",longitude:"201995.5375",orderNumber:15,pointNumber:"A02",sampleNumber:"A02-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"0.4",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"0.4",arsenic1:"0.1",arsenic2:"绿",benzene:"2.1",benzene1:"0.8",benzene2:"橙",benzo:"1.8",benzo1:"0.7",benzo2:"橙",cadmium:"0.6",cadmium1:"0.2",cadmium2:"绿",chlordane:"1.2",chlordane1:"0.5",chlordane2:"橙",chloroform:"2.0",chloroform1:"0.8",chloroform2:"橙",endDepth:6,exceed:"红",id:"16",latitude:"3195285.383",lead:"0.5",lead1:"0.2",lead2:"绿",longitude:"201995.5375",orderNumber:16,pointNumber:"A02",sampleNumber:"A02-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"2.6",trichloroethylene1:"1.0",trichloroethylene2:"红",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"0.6",arsenic1:"0.3",arsenic2:"绿",benzene:"0.7",benzene1:"0.3",benzene2:"绿",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"0.7",cadmium1:"0.3",cadmium2:"绿",chlordane:"1.0",chlordane1:"0.5",chlordane2:"绿",chloroform:"0.8",chloroform1:"0.4",chloroform2:"绿",endDepth:7.2,exceed:"绿",id:"17",latitude:"3195285.383",lead:"0.8",lead1:"0.4",lead2:"绿",longitude:"201995.5375",orderNumber:17,pointNumber:"A02",sampleNumber:"A02-08",sampleType:"土壤",startDepth:7,trichloroethylene:"0.3",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195285.383"},{Z:"NaN",arsenic:"0.4",arsenic1:"0.2",arsenic2:"绿",benzene:"1.3",benzene1:"0.5",benzene2:"橙",benzo:"1.0",benzo1:"0.4",benzo2:"绿",cadmium:"2.1",cadmium1:"0.8",cadmium2:"橙",chlordane:"2.0",chlordane1:"0.8",chlordane2:"橙",chloroform:"0.9",chloroform1:"0.3",chloroform2:"绿",endDepth:.2,exceed:"橙",id:"19",latitude:"3195326.799",lead:"1.3",lead1:"0.5",lead2:"橙",longitude:"202188.0356",orderNumber:19,pointNumber:"A03",sampleNumber:"A03-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.1",trichloroethylene1:"0.4",trichloroethylene2:"橙",x:"180.0",y:"3195326.799"},{Z:"NaN",arsenic:"1.4",arsenic1:"0.6",arsenic2:"橙",benzene:"1.0",benzene1:"0.4",benzene2:"橙",benzo:"1.3",benzo1:"0.5",benzo2:"橙",cadmium:"0.4",cadmium1:"0.2",cadmium2:"绿",chlordane:"0.5",chlordane1:"0.2",chlordane2:"绿",chloroform:"2.9",chloroform1:"1.2",chloroform2:"红",endDepth:1,exceed:"红",id:"20",latitude:"3195326.799",lead:"0.7",lead1:"0.3",lead2:"绿",longitude:"202188.0356",orderNumber:20,pointNumber:"A03",sampleNumber:"A03-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"0.9",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195326.799"},{Z:"NaN",arsenic:"1.5",arsenic1:"0.6",arsenic2:"橙",benzene:"1.8",benzene1:"0.7",benzene2:"橙",benzo:"1.5",benzo1:"0.6",benzo2:"橙",cadmium:"2.6",cadmium1:"1.0",cadmium2:"红",chlordane:"2.5",chlordane1:"1.0",chlordane2:"红",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:2,exceed:"红",id:"21",latitude:"3195326.799",lead:"1.5",lead1:"0.6",lead2:"橙",longitude:"202188.0356",orderNumber:21,pointNumber:"A03",sampleNumber:"A03-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"2.4",trichloroethylene1:"1.0",trichloroethylene2:"橙",x:"180.0",y:"3195326.799"},{Z:"NaN",arsenic:"1.6",arsenic1:"0.6",arsenic2:"橙",benzene:"1.1",benzene1:"0.5",benzene2:"橙",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"0.6",cadmium1:"0.2",cadmium2:"绿",chlordane:"1.9",chlordane1:"0.8",chlordane2:"橙",chloroform:"0.4",chloroform1:"0.2",chloroform2:"绿",endDepth:3,exceed:"橙",id:"22",latitude:"3195326.799",lead:"1.6",lead1:"0.7",lead2:"橙",longitude:"202188.0356",orderNumber:22,pointNumber:"A03",sampleNumber:"A03-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"1.3",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195326.799"},{Z:"NaN",arsenic:"0.8",arsenic1:"0.3",arsenic2:"绿",benzene:"0.2",benzene1:"0.1",benzene2:"绿",benzo:"1.7",benzo1:"0.7",benzo2:"橙",cadmium:"0.7",cadmium1:"0.3",cadmium2:"绿",chlordane:"2.2",chlordane1:"0.9",chlordane2:"橙",chloroform:"2.5",chloroform1:"1.0",chloroform2:"橙",endDepth:4,exceed:"橙",id:"23",latitude:"3195326.799",lead:"1.1",lead1:"0.4",lead2:"橙",longitude:"202188.0356",orderNumber:23,pointNumber:"A03",sampleNumber:"A03-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.0",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195326.799"},{Z:"NaN",arsenic:"1.1",arsenic1:"0.5",arsenic2:"橙",benzene:"1.1",benzene1:"0.4",benzene2:"橙",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"2.3",cadmium1:"0.9",cadmium2:"橙",chlordane:"3.0",chlordane1:"1.2",chlordane2:"红",chloroform:"2.7",chloroform1:"1.1",chloroform2:"红",endDepth:5,exceed:"红",id:"24",latitude:"3195326.799",lead:"0.4",lead1:"0.2",lead2:"绿",longitude:"202188.0356",orderNumber:24,pointNumber:"A03",sampleNumber:"A03-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"2.5",trichloroethylene1:"1.0",trichloroethylene2:"红",x:"180.0",y:"3195326.799"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"0.4",benzene1:"0.2",benzene2:"绿",benzo:"0.7",benzo1:"0.3",benzo2:"绿",cadmium:"0.2",cadmium1:"0.1",cadmium2:"绿",chlordane:"0.7",chlordane1:"0.4",chlordane2:"绿",chloroform:"0.9",chloroform1:"0.5",chloroform2:"绿",endDepth:6,exceed:"绿",id:"25",latitude:"3195326.799",lead:"0.8",lead1:"0.4",lead2:"绿",longitude:"202188.0356",orderNumber:25,pointNumber:"A03",sampleNumber:"A03-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.5",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195326.799"},{Z:"NaN",arsenic:"2.1",arsenic1:"0.9",arsenic2:"橙",benzene:"1.6",benzene1:"0.7",benzene2:"橙",benzo:"0.7",benzo1:"0.3",benzo2:"绿",cadmium:"1.0",cadmium1:"0.4",cadmium2:"橙",chlordane:"1.6",chlordane1:"0.6",chlordane2:"橙",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:.2,exceed:"红",id:"26",latitude:"3195339.699",lead:"1.6",lead1:"0.7",lead2:"橙",longitude:"202251.8507",orderNumber:26,pointNumber:"A04",sampleNumber:"A04-01",sampleType:"土壤",startDepth:0,trichloroethylene:"3.0",trichloroethylene1:"1.2",trichloroethylene2:"红",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"2.7",arsenic1:"1.1",arsenic2:"红",benzene:"2.9",benzene1:"1.2",benzene2:"红",benzo:"2.8",benzo1:"1.1",benzo2:"红",cadmium:"2.9",cadmium1:"1.2",cadmium2:"红",chlordane:"2.0",chlordane1:"0.8",chlordane2:"橙",chloroform:"3.0",chloroform1:"1.2",chloroform2:"红",endDepth:1,exceed:"红",id:"27",latitude:"3195339.699",lead:"0.4",lead1:"0.1",lead2:"绿",longitude:"202251.8507",orderNumber:27,pointNumber:"A04",sampleNumber:"A04-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.0",trichloroethylene1:"0.4",trichloroethylene2:"橙",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.1",arsenic2:"绿",benzene:"2.6",benzene1:"1.0",benzene2:"红",benzo:"1.2",benzo1:"0.5",benzo2:"橙",cadmium:"0.3",cadmium1:"0.1",cadmium2:"绿",chlordane:"1.0",chlordane1:"0.4",chlordane2:"绿",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:2,exceed:"红",id:"28",latitude:"3195339.699",lead:"1.4",lead1:"0.5",lead2:"橙",longitude:"202251.8507",orderNumber:28,pointNumber:"A04",sampleNumber:"A04-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.1",arsenic2:"绿",benzene:"2.8",benzene1:"1.1",benzene2:"红",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"1.2",cadmium1:"0.5",cadmium2:"橙",chlordane:"2.6",chlordane1:"1.0",chlordane2:"红",chloroform:"1.8",chloroform1:"0.7",chloroform2:"橙",endDepth:3,exceed:"红",id:"29",latitude:"3195339.699",lead:"1.6",lead1:"0.7",lead2:"橙",longitude:"202251.8507",orderNumber:29,pointNumber:"A04",sampleNumber:"A04-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"2.2",arsenic1:"0.9",arsenic2:"橙",benzene:"0.7",benzene1:"0.3",benzene2:"绿",benzo:"0.9",benzo1:"0.4",benzo2:"绿",cadmium:"2.8",cadmium1:"1.1",cadmium2:"红",chlordane:"2.6",chlordane1:"1.1",chlordane2:"红",chloroform:"2.7",chloroform1:"1.1",chloroform2:"红",endDepth:4,exceed:"红",id:"30",latitude:"3195339.699",lead:"1.0",lead1:"0.4",lead2:"绿",longitude:"202251.8507",orderNumber:30,pointNumber:"A04",sampleNumber:"A04-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.5",trichloroethylene1:"1.0",trichloroethylene2:"橙",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"2.7",arsenic1:"1.1",arsenic2:"红",benzene:"2.7",benzene1:"1.1",benzene2:"红",benzo:"2.7",benzo1:"1.1",benzo2:"红",cadmium:"2.5",cadmium1:"1.0",cadmium2:"红",chlordane:"1.4",chlordane1:"0.5",chlordane2:"橙",chloroform:"1.5",chloroform1:"0.6",chloroform2:"橙",endDepth:5,exceed:"红",id:"31",latitude:"3195339.699",lead:"2.9",lead1:"1.1",lead2:"红",longitude:"202251.8507",orderNumber:31,pointNumber:"A04",sampleNumber:"A04-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"1.5",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"2.9",arsenic1:"1.1",arsenic2:"红",benzene:"1.4",benzene1:"0.6",benzene2:"橙",benzo:"1.2",benzo1:"0.5",benzo2:"橙",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"0.6",chlordane1:"0.2",chlordane2:"绿",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:6,exceed:"红",id:"32",latitude:"3195339.699",lead:"0.9",lead1:"0.4",lead2:"绿",longitude:"202251.8507",orderNumber:32,pointNumber:"A04",sampleNumber:"A04-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"1.5",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"2.9",benzene1:"1.2",benzene2:"红",benzo:"1.7",benzo1:"0.7",benzo2:"橙",cadmium:"2.1",cadmium1:"0.8",cadmium2:"橙",chlordane:"1.7",chlordane1:"0.7",chlordane2:"橙",chloroform:"1.6",chloroform1:"0.6",chloroform2:"橙",endDepth:7.2,exceed:"红",id:"33",latitude:"3195339.699",lead:"1.3",lead1:"0.5",lead2:"橙",longitude:"202251.8507",orderNumber:33,pointNumber:"A04",sampleNumber:"A04-08",sampleType:"土壤",startDepth:7,trichloroethylene:"1.5",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"0.6",arsenic1:"0.3",arsenic2:"绿",benzene:"0.4",benzene1:"0.2",benzene2:"绿",benzo:"0.4",benzo1:"0.2",benzo2:"绿",cadmium:"0.9",cadmium1:"0.4",cadmium2:"绿",chlordane:"0.6",chlordane1:"0.3",chlordane2:"绿",chloroform:"0.2",chloroform1:"0.1",chloroform2:"绿",endDepth:9.5,exceed:"绿",id:"34",latitude:"3195339.699",lead:"1.0",lead1:"0.5",lead2:"绿",longitude:"202251.8507",orderNumber:34,pointNumber:"A04",sampleNumber:"A04-09",sampleType:"土壤",startDepth:9,trichloroethylene:"1.0",trichloroethylene1:"0.5",trichloroethylene2:"绿",x:"180.0",y:"3195339.699"},{Z:"NaN",arsenic:"2.0",arsenic1:"0.8",arsenic2:"橙",benzene:"0.6",benzene1:"0.2",benzene2:"绿",benzo:"1.4",benzo1:"0.6",benzo2:"橙",cadmium:"0.5",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.9",chlordane1:"1.2",chlordane2:"红",chloroform:"1.9",chloroform1:"0.8",chloroform2:"橙",endDepth:.2,exceed:"红",id:"35",latitude:"3195278.973",lead:"2.4",lead1:"1.0",lead2:"橙",longitude:"202264.9116",orderNumber:35,pointNumber:"A05",sampleNumber:"A05-01",sampleType:"土壤",startDepth:0,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"1.5",arsenic1:"0.6",arsenic2:"橙",benzene:"2.0",benzene1:"0.8",benzene2:"橙",benzo:"0.5",benzo1:"0.2",benzo2:"绿",cadmium:"0.7",cadmium1:"0.3",cadmium2:"绿",chlordane:"1.5",chlordane1:"0.6",chlordane2:"橙",chloroform:"1.3",chloroform1:"0.5",chloroform2:"橙",endDepth:1,exceed:"橙",id:"36",latitude:"3195278.973",lead:"0.4",lead1:"0.2",lead2:"绿",longitude:"202264.9116",orderNumber:36,pointNumber:"A05",sampleNumber:"A05-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.8",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"2.6",arsenic1:"1.0",arsenic2:"红",benzene:"0.9",benzene1:"0.4",benzene2:"绿",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"1.5",cadmium1:"0.6",cadmium2:"橙",chlordane:"0.9",chlordane1:"0.4",chlordane2:"绿",chloroform:"2.2",chloroform1:"0.9",chloroform2:"橙",endDepth:2,exceed:"红",id:"37",latitude:"3195278.973",lead:"1.3",lead1:"0.5",lead2:"橙",longitude:"202264.9116",orderNumber:37,pointNumber:"A05",sampleNumber:"A05-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"2.2",trichloroethylene1:"0.9",trichloroethylene2:"橙",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"0.5",arsenic1:"0.2",arsenic2:"绿",benzene:"2.8",benzene1:"1.1",benzene2:"红",benzo:"1.0",benzo1:"0.4",benzo2:"绿",cadmium:"2.6",cadmium1:"1.0",cadmium2:"红",chlordane:"1.3",chlordane1:"0.5",chlordane2:"橙",chloroform:"1.7",chloroform1:"0.7",chloroform2:"橙",endDepth:3,exceed:"红",id:"38",latitude:"3195278.973",lead:"1.5",lead1:"0.6",lead2:"橙",longitude:"202264.9116",orderNumber:38,pointNumber:"A05",sampleNumber:"A05-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.6",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"1.0",arsenic1:"0.4",arsenic2:"绿",benzene:"1.8",benzene1:"0.7",benzene2:"橙",benzo:"2.6",benzo1:"1.0",benzo2:"红",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"2.7",chlordane1:"1.1",chlordane2:"红",chloroform:"1.6",chloroform1:"0.7",chloroform2:"橙",endDepth:4,exceed:"红",id:"39",latitude:"3195278.973",lead:"2.9",lead1:"1.1",lead2:"红",longitude:"202264.9116",orderNumber:39,pointNumber:"A05",sampleNumber:"A05-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.9",trichloroethylene1:"1.2",trichloroethylene2:"红",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"0.9",arsenic1:"0.4",arsenic2:"绿",benzene:"0.9",benzene1:"0.4",benzene2:"绿",benzo:"0.7",benzo1:"0.3",benzo2:"绿",cadmium:"1.6",cadmium1:"0.6",cadmium2:"橙",chlordane:"0.6",chlordane1:"0.2",chlordane2:"绿",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:5,exceed:"红",id:"40",latitude:"3195278.973",lead:"1.3",lead1:"0.5",lead2:"橙",longitude:"202264.9116",orderNumber:40,pointNumber:"A05",sampleNumber:"A05-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"2.7",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"0.2",arsenic1:"0.1",arsenic2:"绿",benzene:"0.5",benzene1:"0.2",benzene2:"绿",benzo:"0.6",benzo1:"0.2",benzo2:"绿",cadmium:"1.6",cadmium1:"0.7",cadmium2:"橙",chlordane:"0.6",chlordane1:"0.2",chlordane2:"绿",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:6,exceed:"红",id:"41",latitude:"3195278.973",lead:"0.4",lead1:"0.2",lead2:"绿",longitude:"202264.9116",orderNumber:41,pointNumber:"A05",sampleNumber:"A05-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.3",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"1.4",arsenic1:"0.5",arsenic2:"橙",benzene:"2.4",benzene1:"0.9",benzene2:"橙",benzo:"1.2",benzo1:"0.5",benzo2:"橙",cadmium:"0.8",cadmium1:"0.3",cadmium2:"绿",chlordane:"1.2",chlordane1:"0.5",chlordane2:"橙",chloroform:"2.9",chloroform1:"1.2",chloroform2:"红",endDepth:7.2,exceed:"红",id:"42",latitude:"3195278.973",lead:"2.3",lead1:"0.9",lead2:"橙",longitude:"202264.9116",orderNumber:42,pointNumber:"A05",sampleNumber:"A05-08",sampleType:"土壤",startDepth:7,trichloroethylene:"0.6",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"1.0",arsenic1:"0.5",arsenic2:"绿",benzene:"0.9",benzene1:"0.4",benzene2:"绿",benzo:"0.8",benzo1:"0.4",benzo2:"绿",cadmium:"0.5",cadmium1:"0.2",cadmium2:"绿",chlordane:"0.9",chlordane1:"0.5",chlordane2:"绿",chloroform:"0.6",chloroform1:"0.3",chloroform2:"绿",endDepth:9.5,exceed:"绿",id:"43",latitude:"3195278.973",lead:"0.5",lead1:"0.2",lead2:"绿",longitude:"202264.9116",orderNumber:43,pointNumber:"A05",sampleNumber:"A05-09",sampleType:"土壤",startDepth:9,trichloroethylene:"0.8",trichloroethylene1:"0.4",trichloroethylene2:"绿",x:"180.0",y:"3195278.9730000007"},{Z:"NaN",arsenic:"2.5",arsenic1:"1.0",arsenic2:"红",benzene:"2.1",benzene1:"0.8",benzene2:"橙",benzo:"2.1",benzo1:"0.9",benzo2:"橙",cadmium:"1.6",cadmium1:"0.7",cadmium2:"橙",chlordane:"2.0",chlordane1:"0.8",chlordane2:"橙",chloroform:"1.4",chloroform1:"0.6",chloroform2:"橙",endDepth:.2,exceed:"红",id:"44",latitude:"3195268.979",lead:"1.2",lead1:"0.5",lead2:"橙",longitude:"202202.8658",orderNumber:44,pointNumber:"A06",sampleNumber:"A06-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.0",trichloroethylene1:"0.4",trichloroethylene2:"绿",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"1.9",arsenic1:"0.8",arsenic2:"橙",benzene:"2.1",benzene1:"0.9",benzene2:"橙",benzo:"2.8",benzo1:"1.1",benzo2:"红",cadmium:"2.7",cadmium1:"1.1",cadmium2:"红",chlordane:"1.1",chlordane1:"0.4",chlordane2:"橙",chloroform:"0.6",chloroform1:"0.2",chloroform2:"绿",endDepth:1,exceed:"红",id:"45",latitude:"3195268.979",lead:"0.5",lead1:"0.2",lead2:"绿",longitude:"202202.8658",orderNumber:45,pointNumber:"A06",sampleNumber:"A06-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.6",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.1",arsenic2:"绿",benzene:"1.9",benzene1:"0.8",benzene2:"橙",benzo:"0.4",benzo1:"0.2",benzo2:"绿",cadmium:"0.5",cadmium1:"0.2",cadmium2:"绿",chlordane:"1.3",chlordane1:"0.5",chlordane2:"橙",chloroform:"2.4",chloroform1:"1.0",chloroform2:"橙",endDepth:2,exceed:"红",id:"46",latitude:"3195268.979",lead:"2.9",lead1:"1.2",lead2:"红",longitude:"202202.8658",orderNumber:46,pointNumber:"A06",sampleNumber:"A06-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.6",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"2.6",arsenic1:"1.0",arsenic2:"红",benzene:"1.7",benzene1:"0.7",benzene2:"橙",benzo:"3.0",benzo1:"1.2",benzo2:"红",cadmium:"0.8",cadmium1:"0.3",cadmium2:"绿",chlordane:"1.6",chlordane1:"0.6",chlordane2:"橙",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:3,exceed:"红",id:"47",latitude:"3195268.979",lead:"1.4",lead1:"0.6",lead2:"橙",longitude:"202202.8658",orderNumber:47,pointNumber:"A06",sampleNumber:"A06-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.5",trichloroethylene1:"1.0",trichloroethylene2:"红",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"1.3",arsenic1:"0.5",arsenic2:"橙",benzene:"1.6",benzene1:"0.6",benzene2:"橙",benzo:"2.8",benzo1:"1.1",benzo2:"红",cadmium:"1.6",cadmium1:"0.6",cadmium2:"橙",chlordane:"1.4",chlordane1:"0.6",chlordane2:"橙",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:4,exceed:"红",id:"48",latitude:"3195268.979",lead:"1.8",lead1:"0.7",lead2:"橙",longitude:"202202.8658",orderNumber:48,pointNumber:"A06",sampleNumber:"A06-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"1.4",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"2.8",arsenic1:"1.1",arsenic2:"红",benzene:"2.2",benzene1:"0.9",benzene2:"橙",benzo:"2.3",benzo1:"0.9",benzo2:"橙",cadmium:"1.0",cadmium1:"0.4",cadmium2:"橙",chlordane:"0.5",chlordane1:"0.2",chlordane2:"绿",chloroform:"0.9",chloroform1:"0.4",chloroform2:"绿",endDepth:5,exceed:"红",id:"49",latitude:"3195268.979",lead:"1.6",lead1:"0.7",lead2:"橙",longitude:"202202.8658",orderNumber:49,pointNumber:"A06",sampleNumber:"A06-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"1.7",arsenic1:"0.7",arsenic2:"橙",benzene:"2.1",benzene1:"0.8",benzene2:"橙",benzo:"0.2",benzo1:"0.1",benzo2:"绿",cadmium:"0.8",cadmium1:"0.3",cadmium2:"绿",chlordane:"2.7",chlordane1:"1.1",chlordane2:"红",chloroform:"2.3",chloroform1:"0.9",chloroform2:"橙",endDepth:6,exceed:"红",id:"50",latitude:"3195268.979",lead:"0.4",lead1:"0.1",lead2:"绿",longitude:"202202.8658",orderNumber:50,pointNumber:"A06",sampleNumber:"A06-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"1.6",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.2",arsenic2:"绿",benzene:"0.7",benzene1:"0.4",benzene2:"绿",benzo:"0.8",benzo1:"0.4",benzo2:"绿",cadmium:"0.5",cadmium1:"0.3",cadmium2:"绿",chlordane:"0.3",chlordane1:"0.2",chlordane2:"绿",chloroform:"0.2",chloroform1:"0.1",chloroform2:"绿",endDepth:7.2,exceed:"绿",id:"51",latitude:"3195268.979",lead:"0.3",lead1:"0.1",lead2:"绿",longitude:"202202.8658",orderNumber:51,pointNumber:"A06",sampleNumber:"A06-08",sampleType:"土壤",startDepth:7,trichloroethylene:"0.8",trichloroethylene1:"0.4",trichloroethylene2:"绿",x:"180.0",y:"3195268.979"},{Z:"NaN",arsenic:"2.5",arsenic1:"1.0",arsenic2:"橙",benzene:"1.2",benzene1:"0.5",benzene2:"橙",benzo:"2.6",benzo1:"1.0",benzo2:"红",cadmium:"0.6",cadmium1:"0.3",cadmium2:"绿",chlordane:"2.2",chlordane1:"0.9",chlordane2:"橙",chloroform:"2.3",chloroform1:"0.9",chloroform2:"橙",endDepth:.2,exceed:"红",id:"52",latitude:"3195305.096",lead:"0.4",lead1:"0.2",lead2:"绿",longitude:"202207.6129",orderNumber:52,pointNumber:"A07",sampleNumber:"A07-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.2",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"1.2",arsenic1:"0.5",arsenic2:"橙",benzene:"2.0",benzene1:"0.8",benzene2:"橙",benzo:"2.8",benzo1:"1.1",benzo2:"红",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"2.9",chlordane1:"1.2",chlordane2:"红",chloroform:"0.2",chloroform1:"0.1",chloroform2:"绿",endDepth:1,exceed:"红",id:"53",latitude:"3195305.096",lead:"2.3",lead1:"0.9",lead2:"橙",longitude:"202207.6129",orderNumber:53,pointNumber:"A07",sampleNumber:"A07-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.4",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"1.7",arsenic1:"0.7",arsenic2:"橙",benzene:"0.4",benzene1:"0.1",benzene2:"绿",benzo:"0.2",benzo1:"0.1",benzo2:"绿",cadmium:"1.6",cadmium1:"0.6",cadmium2:"橙",chlordane:"2.1",chlordane1:"0.8",chlordane2:"橙",chloroform:"1.7",chloroform1:"0.7",chloroform2:"橙",endDepth:2,exceed:"橙",id:"54",latitude:"3195305.096",lead:"2.1",lead1:"0.8",lead2:"橙",longitude:"202207.6129",orderNumber:54,pointNumber:"A07",sampleNumber:"A07-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.2",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"2.6",arsenic1:"1.1",arsenic2:"红",benzene:"2.5",benzene1:"1.0",benzene2:"红",benzo:"0.6",benzo1:"0.2",benzo2:"绿",cadmium:"2.6",cadmium1:"1.1",cadmium2:"红",chlordane:"1.3",chlordane1:"0.5",chlordane2:"橙",chloroform:"0.5",chloroform1:"0.2",chloroform2:"绿",endDepth:3,exceed:"红",id:"55",latitude:"3195305.096",lead:"1.7",lead1:"0.7",lead2:"橙",longitude:"202207.6129",orderNumber:55,pointNumber:"A07",sampleNumber:"A07-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"0.3",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"3.0",arsenic1:"1.2",arsenic2:"红",benzene:"2.3",benzene1:"0.9",benzene2:"橙",benzo:"1.1",benzo1:"0.4",benzo2:"橙",cadmium:"2.3",cadmium1:"0.9",cadmium2:"橙",chlordane:"1.2",chlordane1:"0.5",chlordane2:"橙",chloroform:"2.0",chloroform1:"0.8",chloroform2:"橙",endDepth:4,exceed:"红",id:"56",latitude:"3195305.096",lead:"2.3",lead1:"0.9",lead2:"橙",longitude:"202207.6129",orderNumber:56,pointNumber:"A07",sampleNumber:"A07-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"1.8",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"1.3",benzene1:"0.5",benzene2:"橙",benzo:"1.0",benzo1:"0.4",benzo2:"橙",cadmium:"0.5",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.4",chlordane1:"0.9",chlordane2:"橙",chloroform:"1.4",chloroform1:"0.6",chloroform2:"橙",endDepth:5,exceed:"橙",id:"57",latitude:"3195305.096",lead:"1.7",lead1:"0.7",lead2:"橙",longitude:"202207.6129",orderNumber:57,pointNumber:"A07",sampleNumber:"A07-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"0.9",trichloroethylene1:"0.4",trichloroethylene2:"绿",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"0.4",arsenic1:"0.2",arsenic2:"绿",benzene:"1.1",benzene1:"0.4",benzene2:"橙",benzo:"2.8",benzo1:"1.1",benzo2:"红",cadmium:"1.2",cadmium1:"0.5",cadmium2:"橙",chlordane:"3.0",chlordane1:"1.2",chlordane2:"红",chloroform:"0.7",chloroform1:"0.3",chloroform2:"绿",endDepth:6,exceed:"红",id:"58",latitude:"3195305.096",lead:"0.4",lead1:"0.2",lead2:"绿",longitude:"202207.6129",orderNumber:58,pointNumber:"A07",sampleNumber:"A07-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.4",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"2.4",arsenic1:"1.0",arsenic2:"橙",benzene:"2.2",benzene1:"0.9",benzene2:"橙",benzo:"0.7",benzo1:"0.3",benzo2:"绿",cadmium:"0.4",cadmium1:"0.2",cadmium2:"绿",chlordane:"1.7",chlordane1:"0.7",chlordane2:"橙",chloroform:"0.4",chloroform1:"0.2",chloroform2:"绿",endDepth:7.2,exceed:"橙",id:"59",latitude:"3195305.096",lead:"1.9",lead1:"0.8",lead2:"橙",longitude:"202207.6129",orderNumber:59,pointNumber:"A07",sampleNumber:"A07-08",sampleType:"土壤",startDepth:7,trichloroethylene:"2.5",trichloroethylene1:"1.0",trichloroethylene2:"橙",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"0.2",arsenic1:"0.1",arsenic2:"绿",benzene:"0.9",benzene1:"0.5",benzene2:"绿",benzo:"0.4",benzo1:"0.2",benzo2:"绿",cadmium:"1.0",cadmium1:"0.5",cadmium2:"绿",chlordane:"0.2",chlordane1:"0.1",chlordane2:"绿",chloroform:"0.5",chloroform1:"0.2",chloroform2:"绿",endDepth:9.5,exceed:"绿",id:"60",latitude:"3195305.096",lead:"0.7",lead1:"0.3",lead2:"绿",longitude:"202207.6129",orderNumber:60,pointNumber:"A07",sampleNumber:"A07-09",sampleType:"土壤",startDepth:9,trichloroethylene:"0.3",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195305.096"},{Z:"NaN",arsenic:"2.7",arsenic1:"1.1",arsenic2:"红",benzene:"0.2",benzene1:"0.1",benzene2:"绿",benzo:"1.6",benzo1:"0.6",benzo2:"橙",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"2.7",chlordane1:"1.1",chlordane2:"红",chloroform:"2.0",chloroform1:"0.8",chloroform2:"橙",endDepth:.2,exceed:"红",id:"61",latitude:"3195295.018",lead:"1.1",lead1:"0.5",lead2:"橙",longitude:"202236.3103",orderNumber:61,pointNumber:"A08",sampleNumber:"A08-01",sampleType:"土壤",startDepth:0,trichloroethylene:"2.1",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"2.0",arsenic1:"0.8",arsenic2:"橙",benzene:"1.2",benzene1:"0.5",benzene2:"橙",benzo:"1.2",benzo1:"0.5",benzo2:"橙",cadmium:"1.5",cadmium1:"0.6",cadmium2:"橙",chlordane:"1.8",chlordane1:"0.7",chlordane2:"橙",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:1,exceed:"橙",id:"62",latitude:"3195295.018",lead:"0.6",lead1:"0.3",lead2:"绿",longitude:"202236.3103",orderNumber:62,pointNumber:"A08",sampleNumber:"A08-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"0.7",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"2.9",arsenic1:"1.2",arsenic2:"红",benzene:"2.8",benzene1:"1.1",benzene2:"红",benzo:"1.0",benzo1:"0.4",benzo2:"橙",cadmium:"0.6",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.6",chlordane1:"1.0",chlordane2:"红",chloroform:"0.3",chloroform1:"0.1",chloroform2:"绿",endDepth:2,exceed:"红",id:"63",latitude:"3195295.018",lead:"2.3",lead1:"0.9",lead2:"橙",longitude:"202236.3103",orderNumber:63,pointNumber:"A08",sampleNumber:"A08-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"2.9",trichloroethylene1:"1.2",trichloroethylene2:"红",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"3.0",arsenic1:"1.2",arsenic2:"红",benzene:"2.6",benzene1:"1.0",benzene2:"红",benzo:"2.5",benzo1:"1.0",benzo2:"橙",cadmium:"0.4",cadmium1:"0.2",cadmium2:"绿",chlordane:"0.7",chlordane1:"0.3",chlordane2:"绿",chloroform:"2.1",chloroform1:"0.8",chloroform2:"橙",endDepth:3,exceed:"红",id:"64",latitude:"3195295.018",lead:"1.0",lead1:"0.4",lead2:"绿",longitude:"202236.3103",orderNumber:64,pointNumber:"A08",sampleNumber:"A08-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.6",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"1.8",arsenic1:"0.7",arsenic2:"橙",benzene:"1.4",benzene1:"0.5",benzene2:"橙",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"0.5",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.9",chlordane1:"1.2",chlordane2:"红",chloroform:"2.3",chloroform1:"0.9",chloroform2:"橙",endDepth:4,exceed:"红",id:"65",latitude:"3195295.018",lead:"2.6",lead1:"1.0",lead2:"红",longitude:"202236.3103",orderNumber:65,pointNumber:"A08",sampleNumber:"A08-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.0",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"0.9",arsenic1:"0.4",arsenic2:"绿",benzene:"3.0",benzene1:"1.2",benzene2:"红",benzo:"1.5",benzo1:"0.6",benzo2:"橙",cadmium:"1.7",cadmium1:"0.7",cadmium2:"橙",chlordane:"2.4",chlordane1:"1.0",chlordane2:"橙",chloroform:"1.8",chloroform1:"0.7",chloroform2:"橙",endDepth:5,exceed:"红",id:"66",latitude:"3195295.018",lead:"2.6",lead1:"1.0",lead2:"红",longitude:"202236.3103",orderNumber:66,pointNumber:"A08",sampleNumber:"A08-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"0.7",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"0.6",arsenic1:"0.2",arsenic2:"绿",benzene:"1.4",benzene1:"0.6",benzene2:"橙",benzo:"2.5",benzo1:"1.0",benzo2:"红",cadmium:"0.7",cadmium1:"0.3",cadmium2:"绿",chlordane:"1.7",chlordane1:"0.7",chlordane2:"橙",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:6,exceed:"红",id:"67",latitude:"3195295.018",lead:"2.8",lead1:"1.1",lead2:"红",longitude:"202236.3103",orderNumber:67,pointNumber:"A08",sampleNumber:"A08-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"0.5",arsenic1:"0.3",arsenic2:"绿",benzene:"0.6",benzene1:"0.3",benzene2:"绿",benzo:"0.5",benzo1:"0.3",benzo2:"绿",cadmium:"0.3",cadmium1:"0.1",cadmium2:"绿",chlordane:"0.7",chlordane1:"0.3",chlordane2:"绿",chloroform:"0.3",chloroform1:"0.1",chloroform2:"绿",endDepth:7.2,exceed:"绿",id:"68",latitude:"3195295.018",lead:"0.5",lead1:"0.2",lead2:"绿",longitude:"202236.3103",orderNumber:68,pointNumber:"A08",sampleNumber:"A08-08",sampleType:"土壤",startDepth:7,trichloroethylene:"0.9",trichloroethylene1:"0.5",trichloroethylene2:"绿",x:"180.0",y:"3195295.018"},{Z:"NaN",arsenic:"1.3",arsenic1:"0.5",arsenic2:"橙",benzene:"0.7",benzene1:"0.3",benzene2:"绿",benzo:"2.5",benzo1:"1.0",benzo2:"红",cadmium:"0.6",cadmium1:"0.2",cadmium2:"绿",chlordane:"0.3",chlordane1:"0.1",chlordane2:"绿",chloroform:"1.5",chloroform1:"0.6",chloroform2:"橙",endDepth:.2,exceed:"红",id:"69",latitude:"3195288.607",lead:"1.4",lead1:"0.5",lead2:"橙",longitude:"202211.5076",orderNumber:69,pointNumber:"A09",sampleNumber:"A09-01",sampleType:"土壤",startDepth:0,trichloroethylene:"0.9",trichloroethylene1:"0.4",trichloroethylene2:"绿",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"1.0",benzene1:"0.4",benzene2:"绿",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"1.4",cadmium1:"0.5",cadmium2:"橙",chlordane:"2.9",chlordane1:"1.2",chlordane2:"红",chloroform:"0.2",chloroform1:"0.1",chloroform2:"绿",endDepth:.2,exceed:"红",id:"69",latitude:"3195267.297",lead:"1.8",lead1:"0.7",lead2:"橙",longitude:"202010.6381",orderNumber:69,pointNumber:"A11",sampleNumber:"A11-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.7",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"0.2",arsenic1:"0.1",arsenic2:"绿",benzene:"0.6",benzene1:"0.2",benzene2:"绿",benzo:"1.1",benzo1:"0.5",benzo2:"橙",cadmium:"2.3",cadmium1:"0.9",cadmium2:"橙",chlordane:"2.0",chlordane1:"0.8",chlordane2:"橙",chloroform:"1.7",chloroform1:"0.7",chloroform2:"橙",endDepth:1,exceed:"橙",id:"70",latitude:"3195288.607",lead:"0.8",lead1:"0.3",lead2:"绿",longitude:"202211.5076",orderNumber:70,pointNumber:"A09",sampleNumber:"A09-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.4",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"2.9",benzene1:"1.1",benzene2:"红",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"1.7",chlordane1:"0.7",chlordane2:"橙",chloroform:"0.4",chloroform1:"0.1",chloroform2:"绿",endDepth:1,exceed:"红",id:"70",latitude:"3195267.297",lead:"1.5",lead1:"0.6",lead2:"橙",longitude:"202010.6381",orderNumber:70,pointNumber:"A11",sampleNumber:"A11-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.3",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"0.5",arsenic1:"0.2",arsenic2:"绿",benzene:"2.2",benzene1:"0.9",benzene2:"橙",benzo:"1.0",benzo1:"0.4",benzo2:"橙",cadmium:"2.1",cadmium1:"0.9",cadmium2:"橙",chlordane:"2.8",chlordane1:"1.1",chlordane2:"红",chloroform:"1.3",chloroform1:"0.5",chloroform2:"橙",endDepth:2,exceed:"红",id:"71",latitude:"3195288.607",lead:"0.8",lead1:"0.3",lead2:"绿",longitude:"202211.5076",orderNumber:71,pointNumber:"A09",sampleNumber:"A09-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.4",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"2.9",arsenic1:"1.2",arsenic2:"红",benzene:"0.5",benzene1:"0.2",benzene2:"绿",benzo:"0.7",benzo1:"0.3",benzo2:"绿",cadmium:"1.9",cadmium1:"0.7",cadmium2:"橙",chlordane:"0.5",chlordane1:"0.2",chlordane2:"绿",chloroform:"2.1",chloroform1:"0.8",chloroform2:"橙",endDepth:2,exceed:"红",id:"71",latitude:"3195267.297",lead:"0.7",lead1:"0.3",lead2:"绿",longitude:"202010.6381",orderNumber:71,pointNumber:"A11",sampleNumber:"A11-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.8",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"2.6",arsenic1:"1.0",arsenic2:"红",benzene:"0.4",benzene1:"0.1",benzene2:"绿",benzo:"0.8",benzo1:"0.3",benzo2:"绿",cadmium:"0.4",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.5",chlordane1:"1.0",chlordane2:"红",chloroform:"2.0",chloroform1:"0.8",chloroform2:"橙",endDepth:3,exceed:"红",id:"72",latitude:"3195267.297",lead:"0.4",lead1:"0.2",lead2:"绿",longitude:"202010.6381",orderNumber:72,pointNumber:"A11",sampleNumber:"A11-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"0.9",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"2.5",arsenic1:"1.0",arsenic2:"红",benzene:"2.0",benzene1:"0.8",benzene2:"橙",benzo:"0.5",benzo1:"0.2",benzo2:"绿",cadmium:"0.7",cadmium1:"0.3",cadmium2:"绿",chlordane:"2.8",chlordane1:"1.1",chlordane2:"红",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:3,exceed:"红",id:"72",latitude:"3195288.607",lead:"2.6",lead1:"1.0",lead2:"红",longitude:"202211.5076",orderNumber:72,pointNumber:"A09",sampleNumber:"A09-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.5",trichloroethylene1:"1.0",trichloroethylene2:"橙",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"2.1",arsenic1:"0.8",arsenic2:"橙",benzene:"0.3",benzene1:"0.1",benzene2:"绿",benzo:"1.4",benzo1:"0.6",benzo2:"橙",cadmium:"0.4",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.6",chlordane1:"1.0",chlordane2:"红",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:4,exceed:"红",id:"73",latitude:"3195267.297",lead:"1.1",lead1:"0.4",lead2:"橙",longitude:"202010.6381",orderNumber:73,pointNumber:"A11",sampleNumber:"A11-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.2",trichloroethylene1:"0.9",trichloroethylene2:"橙",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"2.5",arsenic1:"1.0",arsenic2:"红",benzene:"2.1",benzene1:"0.8",benzene2:"橙",benzo:"2.5",benzo1:"1.0",benzo2:"橙",cadmium:"1.9",cadmium1:"0.7",cadmium2:"橙",chlordane:"1.3",chlordane1:"0.5",chlordane2:"橙",chloroform:"1.1",chloroform1:"0.4",chloroform2:"橙",endDepth:4,exceed:"红",id:"73",latitude:"3195288.607",lead:"0.7",lead1:"0.3",lead2:"绿",longitude:"202211.5076",orderNumber:73,pointNumber:"A09",sampleNumber:"A09-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"1.3",arsenic1:"0.5",arsenic2:"橙",benzene:"1.3",benzene1:"0.5",benzene2:"橙",benzo:"2.2",benzo1:"0.9",benzo2:"橙",cadmium:"0.3",cadmium1:"0.1",cadmium2:"绿",chlordane:"1.2",chlordane1:"0.5",chlordane2:"橙",chloroform:"0.3",chloroform1:"0.1",chloroform2:"绿",endDepth:5,exceed:"红",id:"74",latitude:"3195288.607",lead:"0.3",lead1:"0.1",lead2:"绿",longitude:"202211.5076",orderNumber:74,pointNumber:"A09",sampleNumber:"A09-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"1.3",arsenic1:"0.5",arsenic2:"橙",benzene:"2.3",benzene1:"0.9",benzene2:"橙",benzo:"1.0",benzo1:"0.4",benzo2:"绿",cadmium:"1.8",cadmium1:"0.7",cadmium2:"橙",chlordane:"0.7",chlordane1:"0.3",chlordane2:"绿",chloroform:"2.0",chloroform1:"0.8",chloroform2:"橙",endDepth:5,exceed:"橙",id:"74",latitude:"3195267.297",lead:"0.6",lead1:"0.2",lead2:"绿",longitude:"202010.6381",orderNumber:74,pointNumber:"A11",sampleNumber:"A11-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"2.4",trichloroethylene1:"1.0",trichloroethylene2:"橙",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"2.0",arsenic1:"0.8",arsenic2:"橙",benzene:"1.1",benzene1:"0.5",benzene2:"橙",benzo:"1.6",benzo1:"0.7",benzo2:"橙",cadmium:"2.3",cadmium1:"0.9",cadmium2:"橙",chlordane:"1.3",chlordane1:"0.5",chlordane2:"橙",chloroform:"2.9",chloroform1:"1.2",chloroform2:"红",endDepth:6,exceed:"红",id:"75",latitude:"3195267.297",lead:"1.5",lead1:"0.6",lead2:"橙",longitude:"202010.6381",orderNumber:75,pointNumber:"A11",sampleNumber:"A11-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.5",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"2.8",arsenic1:"1.1",arsenic2:"红",benzene:"2.2",benzene1:"0.9",benzene2:"橙",benzo:"2.3",benzo1:"0.9",benzo2:"橙",cadmium:"2.3",cadmium1:"0.9",cadmium2:"橙",chlordane:"1.8",chlordane1:"0.7",chlordane2:"橙",chloroform:"2.8",chloroform1:"1.1",chloroform2:"红",endDepth:6,exceed:"红",id:"75",latitude:"3195288.607",lead:"0.9",lead1:"0.4",lead2:"绿",longitude:"202211.5076",orderNumber:75,pointNumber:"A09",sampleNumber:"A09-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.9",trichloroethylene1:"0.4",trichloroethylene2:"绿",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"1.6",arsenic1:"0.6",arsenic2:"橙",benzene:"2.9",benzene1:"1.2",benzene2:"红",benzo:"0.9",benzo1:"0.4",benzo2:"绿",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"0.9",chlordane1:"0.4",chlordane2:"绿",chloroform:"2.8",chloroform1:"1.1",chloroform2:"红",endDepth:7.2,exceed:"红",id:"76",latitude:"3195288.607",lead:"1.4",lead1:"0.5",lead2:"橙",longitude:"202211.5076",orderNumber:76,pointNumber:"A09",sampleNumber:"A09-08",sampleType:"土壤",startDepth:7,trichloroethylene:"1.2",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"0.4",arsenic1:"0.2",arsenic2:"绿",benzene:"0.7",benzene1:"0.3",benzene2:"绿",benzo:"1.1",benzo1:"0.4",benzo2:"橙",cadmium:"2.7",cadmium1:"1.1",cadmium2:"红",chlordane:"2.9",chlordane1:"1.2",chlordane2:"红",chloroform:"0.3",chloroform1:"0.1",chloroform2:"绿",endDepth:7.2,exceed:"红",id:"76",latitude:"3195267.297",lead:"0.3",lead1:"0.1",lead2:"绿",longitude:"202010.6381",orderNumber:76,pointNumber:"A11",sampleNumber:"A11-08",sampleType:"土壤",startDepth:7,trichloroethylene:"3.0",trichloroethylene1:"1.2",trichloroethylene2:"红",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"0.4",arsenic1:"0.2",arsenic2:"绿",benzene:"0.4",benzene1:"0.2",benzene2:"绿",benzo:"0.8",benzo1:"0.4",benzo2:"绿",cadmium:"1.0",cadmium1:"0.5",cadmium2:"绿",chlordane:"0.5",chlordane1:"0.3",chlordane2:"绿",chloroform:"1.0",chloroform1:"0.5",chloroform2:"绿",endDepth:9.5,exceed:"绿",id:"77",latitude:"3195288.607",lead:"0.5",lead1:"0.3",lead2:"绿",longitude:"202211.5076",orderNumber:77,pointNumber:"A09",sampleNumber:"A09-09",sampleType:"土壤",startDepth:9,trichloroethylene:"0.1",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195288.607"},{Z:"NaN",arsenic:"1.0",arsenic1:"0.5",arsenic2:"绿",benzene:"0.7",benzene1:"0.3",benzene2:"绿",benzo:"0.2",benzo1:"0.1",benzo2:"绿",cadmium:"0.9",cadmium1:"0.5",cadmium2:"绿",chlordane:"0.7",chlordane1:"0.4",chlordane2:"绿",chloroform:"0.8",chloroform1:"0.4",chloroform2:"绿",endDepth:9.5,exceed:"绿",id:"77",latitude:"3195267.297",lead:"1.0",lead1:"0.5",lead2:"绿",longitude:"202010.6381",orderNumber:77,pointNumber:"A11",sampleNumber:"A11-09",sampleType:"土壤",startDepth:9,trichloroethylene:"0.3",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195267.297"},{Z:"NaN",arsenic:"2.7",arsenic1:"1.1",arsenic2:"红",benzene:"2.9",benzene1:"1.2",benzene2:"红",benzo:"2.1",benzo1:"0.8",benzo2:"橙",cadmium:"0.3",cadmium1:"0.1",cadmium2:"绿",chlordane:"0.5",chlordane1:"0.2",chlordane2:"绿",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:.2,exceed:"红",id:"78",latitude:"3195259.887",lead:"1.9",lead1:"0.8",lead2:"橙",longitude:"201957.3069",orderNumber:78,pointNumber:"A12",sampleNumber:"A12-01",sampleType:"土壤",startDepth:0,trichloroethylene:"2.4",trichloroethylene1:"1.0",trichloroethylene2:"橙",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"1.8",arsenic1:"0.7",arsenic2:"橙",benzene:"0.7",benzene1:"0.3",benzene2:"绿",benzo:"2.4",benzo1:"1.0",benzo2:"橙",cadmium:"1.7",cadmium1:"0.7",cadmium2:"橙",chlordane:"1.6",chlordane1:"0.6",chlordane2:"橙",chloroform:"0.4",chloroform1:"0.2",chloroform2:"绿",endDepth:1,exceed:"橙",id:"79",latitude:"3195259.887",lead:"2.0",lead1:"0.8",lead2:"橙",longitude:"201957.3069",orderNumber:79,pointNumber:"A12",sampleNumber:"A12-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.8",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"1.4",arsenic1:"0.6",arsenic2:"橙",benzene:"1.6",benzene1:"0.6",benzene2:"橙",benzo:"0.4",benzo1:"0.2",benzo2:"绿",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"0.6",chlordane1:"0.2",chlordane2:"绿",chloroform:"2.7",chloroform1:"1.1",chloroform2:"红",endDepth:2,exceed:"红",id:"80",latitude:"3195259.887",lead:"1.3",lead1:"0.5",lead2:"橙",longitude:"201957.3069",orderNumber:80,pointNumber:"A12",sampleNumber:"A12-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"2.5",trichloroethylene1:"1.0",trichloroethylene2:"红",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"0.9",arsenic1:"0.3",arsenic2:"绿",benzene:"1.4",benzene1:"0.6",benzene2:"橙",benzo:"1.4",benzo1:"0.6",benzo2:"橙",cadmium:"1.0",cadmium1:"0.4",cadmium2:"绿",chlordane:"1.7",chlordane1:"0.7",chlordane2:"橙",chloroform:"0.5",chloroform1:"0.2",chloroform2:"绿",endDepth:3,exceed:"橙",id:"81",latitude:"3195259.887",lead:"1.2",lead1:"0.5",lead2:"橙",longitude:"201957.3069",orderNumber:81,pointNumber:"A12",sampleNumber:"A12-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"0.5",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"0.5",benzene1:"0.2",benzene2:"绿",benzo:"0.7",benzo1:"0.3",benzo2:"绿",cadmium:"1.2",cadmium1:"0.5",cadmium2:"橙",chlordane:"1.7",chlordane1:"0.7",chlordane2:"橙",chloroform:"2.5",chloroform1:"1.0",chloroform2:"橙",endDepth:4,exceed:"红",id:"82",latitude:"3195259.887",lead:"2.5",lead1:"1.0",lead2:"红",longitude:"201957.3069",orderNumber:82,pointNumber:"A12",sampleNumber:"A12-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"0.6",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"2.8",arsenic1:"1.1",arsenic2:"红",benzene:"2.6",benzene1:"1.0",benzene2:"红",benzo:"1.6",benzo1:"0.7",benzo2:"橙",cadmium:"1.4",cadmium1:"0.5",cadmium2:"橙",chlordane:"2.1",chlordane1:"0.8",chlordane2:"橙",chloroform:"1.7",chloroform1:"0.7",chloroform2:"橙",endDepth:5,exceed:"红",id:"83",latitude:"3195259.887",lead:"2.8",lead1:"1.1",lead2:"红",longitude:"201957.3069",orderNumber:83,pointNumber:"A12",sampleNumber:"A12-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"0.7",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.1",arsenic2:"绿",benzene:"2.4",benzene1:"1.0",benzene2:"橙",benzo:"2.4",benzo1:"1.0",benzo2:"橙",cadmium:"2.6",cadmium1:"1.1",cadmium2:"红",chlordane:"1.9",chlordane1:"0.8",chlordane2:"橙",chloroform:"2.3",chloroform1:"0.9",chloroform2:"橙",endDepth:6,exceed:"红",id:"84",latitude:"3195259.887",lead:"2.8",lead1:"1.1",lead2:"红",longitude:"201957.3069",orderNumber:84,pointNumber:"A12",sampleNumber:"A12-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"1.6",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"0.8",arsenic1:"0.4",arsenic2:"绿",benzene:"0.2",benzene1:"0.1",benzene2:"绿",benzo:"0.8",benzo1:"0.4",benzo2:"绿",cadmium:"0.3",cadmium1:"0.1",cadmium2:"绿",chlordane:"0.5",chlordane1:"0.2",chlordane2:"绿",chloroform:"0.4",chloroform1:"0.2",chloroform2:"绿",endDepth:7.2,exceed:"绿",id:"85",latitude:"3195259.887",lead:"0.5",lead1:"0.3",lead2:"绿",longitude:"201957.3069",orderNumber:85,pointNumber:"A12",sampleNumber:"A12-08",sampleType:"土壤",startDepth:7,trichloroethylene:"0.4",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195259.887"},{Z:"NaN",arsenic:"0.6",arsenic1:"0.2",arsenic2:"绿",benzene:"2.0",benzene1:"0.8",benzene2:"橙",benzo:"0.4",benzo1:"0.2",benzo2:"绿",cadmium:"2.0",cadmium1:"0.8",cadmium2:"橙",chlordane:"2.8",chlordane1:"1.1",chlordane2:"红",chloroform:"2.1",chloroform1:"0.8",chloroform2:"橙",endDepth:.2,exceed:"红",id:"86",latitude:"3195289.167",lead:"1.1",lead1:"0.4",lead2:"橙",longitude:"202089.3121",orderNumber:86,pointNumber:"A13",sampleNumber:"A13-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.3",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"2.5",arsenic1:"1.0",arsenic2:"红",benzene:"2.2",benzene1:"0.9",benzene2:"橙",benzo:"2.7",benzo1:"1.1",benzo2:"红",cadmium:"1.0",cadmium1:"0.4",cadmium2:"绿",chlordane:"1.4",chlordane1:"0.6",chlordane2:"橙",chloroform:"1.6",chloroform1:"0.6",chloroform2:"橙",endDepth:1,exceed:"红",id:"87",latitude:"3195289.167",lead:"1.3",lead1:"0.5",lead2:"橙",longitude:"202089.3121",orderNumber:87,pointNumber:"A13",sampleNumber:"A13-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"0.7",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"0.4",arsenic1:"0.1",arsenic2:"绿",benzene:"2.0",benzene1:"0.8",benzene2:"橙",benzo:"2.6",benzo1:"1.0",benzo2:"红",cadmium:"1.3",cadmium1:"0.5",cadmium2:"橙",chlordane:"2.8",chlordane1:"1.1",chlordane2:"红",chloroform:"2.6",chloroform1:"1.1",chloroform2:"红",endDepth:2,exceed:"红",id:"88",latitude:"3195289.167",lead:"2.0",lead1:"0.8",lead2:"橙",longitude:"202089.3121",orderNumber:88,pointNumber:"A13",sampleNumber:"A13-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.3",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"2.8",arsenic1:"1.1",arsenic2:"红",benzene:"0.8",benzene1:"0.3",benzene2:"绿",benzo:"2.7",benzo1:"1.1",benzo2:"红",cadmium:"1.9",cadmium1:"0.8",cadmium2:"橙",chlordane:"0.3",chlordane1:"0.1",chlordane2:"绿",chloroform:"1.7",chloroform1:"0.7",chloroform2:"橙",endDepth:3,exceed:"红",id:"89",latitude:"3195289.167",lead:"1.7",lead1:"0.7",lead2:"橙",longitude:"202089.3121",orderNumber:89,pointNumber:"A13",sampleNumber:"A13-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"0.2",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"1.7",benzene1:"0.7",benzene2:"橙",benzo:"1.1",benzo1:"0.4",benzo2:"橙",cadmium:"2.6",cadmium1:"1.0",cadmium2:"红",chlordane:"2.1",chlordane1:"0.9",chlordane2:"橙",chloroform:"1.3",chloroform1:"0.5",chloroform2:"橙",endDepth:4,exceed:"红",id:"90",latitude:"3195289.167",lead:"2.6",lead1:"1.0",lead2:"红",longitude:"202089.3121",orderNumber:90,pointNumber:"A13",sampleNumber:"A13-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"2.2",trichloroethylene1:"0.9",trichloroethylene2:"橙",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.1",arsenic2:"绿",benzene:"1.3",benzene1:"0.5",benzene2:"橙",benzo:"2.7",benzo1:"1.1",benzo2:"红",cadmium:"1.9",cadmium1:"0.8",cadmium2:"橙",chlordane:"2.8",chlordane1:"1.1",chlordane2:"红",chloroform:"1.4",chloroform1:"0.6",chloroform2:"橙",endDepth:5,exceed:"红",id:"91",latitude:"3195289.167",lead:"2.3",lead1:"0.9",lead2:"橙",longitude:"202089.3121",orderNumber:91,pointNumber:"A13",sampleNumber:"A13-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"1.5",trichloroethylene1:"0.6",trichloroethylene2:"橙",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"0.6",arsenic1:"0.3",arsenic2:"绿",benzene:"0.5",benzene1:"0.2",benzene2:"绿",benzo:"0.1",benzo1:"0.1",benzo2:"绿",cadmium:"0.2",cadmium1:"0.1",cadmium2:"绿",chlordane:"0.2",chlordane1:"0.1",chlordane2:"绿",chloroform:"0.7",chloroform1:"0.4",chloroform2:"绿",endDepth:6,exceed:"绿",id:"92",latitude:"3195289.167",lead:"0.4",lead1:"0.2",lead2:"绿",longitude:"202089.3121",orderNumber:92,pointNumber:"A13",sampleNumber:"A13-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.1",trichloroethylene1:"0.1",trichloroethylene2:"绿",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"0.9",arsenic1:"0.4",arsenic2:"绿",benzene:"1.4",benzene1:"0.6",benzene2:"橙",benzo:"0.9",benzo1:"0.4",benzo2:"绿",cadmium:"1.6",cadmium1:"0.6",cadmium2:"橙",chlordane:"2.1",chlordane1:"0.8",chlordane2:"橙",chloroform:"1.3",chloroform1:"0.5",chloroform2:"橙",endDepth:.2,exceed:"红",id:"93",latitude:"3195295.03",lead:"0.5",lead1:"0.2",lead2:"绿",longitude:"202129.6969",orderNumber:93,pointNumber:"A14",sampleNumber:"A14-01",sampleType:"土壤",startDepth:0,trichloroethylene:"3.0",trichloroethylene1:"1.2",trichloroethylene2:"红",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"2.4",arsenic1:"1.0",arsenic2:"橙",benzene:"2.8",benzene1:"1.1",benzene2:"红",benzo:"1.1",benzo1:"0.4",benzo2:"橙",cadmium:"2.5",cadmium1:"1.0",cadmium2:"红",chlordane:"1.1",chlordane1:"0.4",chlordane2:"橙",chloroform:"1.4",chloroform1:"0.5",chloroform2:"橙",endDepth:1,exceed:"红",id:"94",latitude:"3195295.03",lead:"0.3",lead1:"0.1",lead2:"绿",longitude:"202129.6969",orderNumber:94,pointNumber:"A14",sampleNumber:"A14-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.9",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"1.4",arsenic1:"0.6",arsenic2:"橙",benzene:"0.4",benzene1:"0.2",benzene2:"绿",benzo:"1.0",benzo1:"0.4",benzo2:"绿",cadmium:"2.8",cadmium1:"1.1",cadmium2:"红",chlordane:"0.4",chlordane1:"0.2",chlordane2:"绿",chloroform:"1.8",chloroform1:"0.7",chloroform2:"橙",endDepth:2,exceed:"红",id:"95",latitude:"3195295.03",lead:"0.6",lead1:"0.2",lead2:"绿",longitude:"202129.6969",orderNumber:95,pointNumber:"A14",sampleNumber:"A14-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.8",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"3.0",arsenic1:"1.2",arsenic2:"红",benzene:"1.2",benzene1:"0.5",benzene2:"橙",benzo:"2.7",benzo1:"1.1",benzo2:"红",cadmium:"0.9",cadmium1:"0.4",cadmium2:"绿",chlordane:"2.4",chlordane1:"1.0",chlordane2:"橙",chloroform:"0.3",chloroform1:"0.1",chloroform2:"绿",endDepth:3,exceed:"红",id:"96",latitude:"3195295.03",lead:"3.0",lead1:"1.2",lead2:"红",longitude:"202129.6969",orderNumber:96,pointNumber:"A14",sampleNumber:"A14-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.1",trichloroethylene1:"0.8",trichloroethylene2:"橙",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"1.4",arsenic1:"0.6",arsenic2:"橙",benzene:"1.3",benzene1:"0.5",benzene2:"橙",benzo:"2.0",benzo1:"0.8",benzo2:"橙",cadmium:"2.1",cadmium1:"0.8",cadmium2:"橙",chlordane:"2.4",chlordane1:"0.9",chlordane2:"橙",chloroform:"2.6",chloroform1:"1.0",chloroform2:"红",endDepth:4,exceed:"红",id:"97",latitude:"3195295.03",lead:"0.6",lead1:"0.2",lead2:"绿",longitude:"202129.6969",orderNumber:97,pointNumber:"A14",sampleNumber:"A14-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"1.3",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"2.9",arsenic1:"1.2",arsenic2:"红",benzene:"0.3",benzene1:"0.1",benzene2:"绿",benzo:"0.9",benzo1:"0.3",benzo2:"绿",cadmium:"1.0",cadmium1:"0.4",cadmium2:"绿",chlordane:"1.7",chlordane1:"0.7",chlordane2:"橙",chloroform:"1.3",chloroform1:"0.5",chloroform2:"橙",endDepth:5,exceed:"红",id:"98",latitude:"3195295.03",lead:"1.0",lead1:"0.4",lead2:"绿",longitude:"202129.6969",orderNumber:98,pointNumber:"A14",sampleNumber:"A14-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"1.8",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"1.9",arsenic1:"0.8",arsenic2:"橙",benzene:"1.0",benzene1:"0.4",benzene2:"橙",benzo:"0.5",benzo1:"0.2",benzo2:"绿",cadmium:"1.2",cadmium1:"0.5",cadmium2:"橙",chlordane:"2.5",chlordane1:"1.0",chlordane2:"橙",chloroform:"1.1",chloroform1:"0.4",chloroform2:"橙",endDepth:6,exceed:"橙",id:"99",latitude:"3195295.03",lead:"1.7",lead1:"0.7",lead2:"橙",longitude:"202129.6969",orderNumber:99,pointNumber:"A14",sampleNumber:"A14-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"1.2",trichloroethylene1:"0.5",trichloroethylene2:"橙",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"2.4",arsenic1:"0.9",arsenic2:"橙",benzene:"2.5",benzene1:"1.0",benzene2:"橙",benzo:"1.6",benzo1:"0.6",benzo2:"橙",cadmium:"0.6",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.2",chlordane1:"0.9",chlordane2:"橙",chloroform:"1.0",chloroform1:"0.4",chloroform2:"绿",endDepth:7.2,exceed:"橙",id:"100",latitude:"3195295.03",lead:"2.4",lead1:"0.9",lead2:"橙",longitude:"202129.6969",orderNumber:100,pointNumber:"A14",sampleNumber:"A14-08",sampleType:"土壤",startDepth:7,trichloroethylene:"2.4",trichloroethylene1:"0.9",trichloroethylene2:"橙",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"0.3",arsenic1:"0.2",arsenic2:"绿",benzene:"0.5",benzene1:"0.2",benzene2:"绿",benzo:"0.6",benzo1:"0.3",benzo2:"绿",cadmium:"0.9",cadmium1:"0.5",cadmium2:"绿",chlordane:"0.5",chlordane1:"0.2",chlordane2:"绿",chloroform:"0.3",chloroform1:"0.1",chloroform2:"绿",endDepth:9.5,exceed:"绿",id:"101",latitude:"3195295.03",lead:"0.1",lead1:"0.1",lead2:"绿",longitude:"202129.6969",orderNumber:101,pointNumber:"A14",sampleNumber:"A14-09",sampleType:"土壤",startDepth:9,trichloroethylene:"0.4",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195295.0300000003"},{Z:"NaN",arsenic:"0.7",arsenic1:"0.3",arsenic2:"绿",benzene:"0.9",benzene1:"0.4",benzene2:"绿",benzo:"1.2",benzo1:"0.5",benzo2:"橙",cadmium:"0.3",cadmium1:"0.1",cadmium2:"绿",chlordane:"2.7",chlordane1:"1.1",chlordane2:"红",chloroform:"0.8",chloroform1:"0.3",chloroform2:"绿",endDepth:.2,exceed:"红",id:"102",latitude:"3195311.794",lead:"1.2",lead1:"0.5",lead2:"橙",longitude:"202143.3802",orderNumber:102,pointNumber:"A15",sampleNumber:"A15-01",sampleType:"土壤",startDepth:0,trichloroethylene:"1.8",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195311.794"},{Z:"NaN",arsenic:"0.6",arsenic1:"0.3",arsenic2:"绿",benzene:"1.0",benzene1:"0.4",benzene2:"绿",benzo:"0.2",benzo1:"0.1",benzo2:"绿",cadmium:"0.6",cadmium1:"0.2",cadmium2:"绿",chlordane:"2.1",chlordane1:"0.8",chlordane2:"橙",chloroform:"2.0",chloroform1:"0.8",chloroform2:"橙",endDepth:1,exceed:"红",id:"103",latitude:"3195289.167",lead:"2.5",lead1:"1.0",lead2:"红",longitude:"202089.3121",orderNumber:103,pointNumber:"A13",sampleNumber:"A15-02",sampleType:"土壤",startDepth:.8,trichloroethylene:"1.8",trichloroethylene1:"0.7",trichloroethylene2:"橙",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"1.1",arsenic1:"0.4",arsenic2:"橙",benzene:"2.7",benzene1:"1.1",benzene2:"红",benzo:"0.3",benzo1:"0.1",benzo2:"绿",cadmium:"2.7",cadmium1:"1.1",cadmium2:"红",chlordane:"2.8",chlordane1:"1.1",chlordane2:"红",chloroform:"2.4",chloroform1:"1.0",chloroform2:"橙",endDepth:2,exceed:"红",id:"104",latitude:"3195289.167",lead:"0.6",lead1:"0.2",lead2:"绿",longitude:"202089.3121",orderNumber:104,pointNumber:"A13",sampleNumber:"A15-03",sampleType:"土壤",startDepth:1.8,trichloroethylene:"0.4",trichloroethylene1:"0.2",trichloroethylene2:"绿",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"1.4",arsenic1:"0.6",arsenic2:"橙",benzene:"0.8",benzene1:"0.3",benzene2:"绿",benzo:"2.5",benzo1:"1.0",benzo2:"红",cadmium:"1.8",cadmium1:"0.7",cadmium2:"橙",chlordane:"2.9",chlordane1:"1.2",chlordane2:"红",chloroform:"0.3",chloroform1:"0.1",chloroform2:"绿",endDepth:3,exceed:"红",id:"105",latitude:"3195289.167",lead:"1.7",lead1:"0.7",lead2:"橙",longitude:"202089.3121",orderNumber:105,pointNumber:"A13",sampleNumber:"A15-04",sampleType:"土壤",startDepth:2.8,trichloroethylene:"2.8",trichloroethylene1:"1.1",trichloroethylene2:"红",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"0.5",arsenic1:"0.2",arsenic2:"绿",benzene:"0.4",benzene1:"0.2",benzene2:"绿",benzo:"2.1",benzo1:"0.8",benzo2:"橙",cadmium:"1.9",cadmium1:"0.8",cadmium2:"橙",chlordane:"0.3",chlordane1:"0.1",chlordane2:"绿",chloroform:"2.7",chloroform1:"1.1",chloroform2:"红",endDepth:4,exceed:"红",id:"106",latitude:"3195289.167",lead:"2.5",lead1:"1.0",lead2:"橙",longitude:"202089.3121",orderNumber:106,pointNumber:"A13",sampleNumber:"A15-05",sampleType:"土壤",startDepth:3.6,trichloroethylene:"0.6",trichloroethylene1:"0.3",trichloroethylene2:"绿",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"1.9",arsenic1:"0.7",arsenic2:"橙",benzene:"2.2",benzene1:"0.9",benzene2:"橙",benzo:"2.6",benzo1:"1.0",benzo2:"红",cadmium:"1.5",cadmium1:"0.6",cadmium2:"橙",chlordane:"0.5",chlordane1:"0.2",chlordane2:"绿",chloroform:"2.1",chloroform1:"0.9",chloroform2:"橙",endDepth:5,exceed:"红",id:"107",latitude:"3195289.167",lead:"0.4",lead1:"0.1",lead2:"绿",longitude:"202089.3121",orderNumber:107,pointNumber:"A13",sampleNumber:"A15-06",sampleType:"土壤",startDepth:4.5,trichloroethylene:"2.1",trichloroethylene1:"0.9",trichloroethylene2:"橙",x:"180.0",y:"3195289.167"},{Z:"NaN",arsenic:"1.0",arsenic1:"0.5",arsenic2:"绿",benzene:"0.4",benzene1:"0.2",benzene2:"绿",benzo:"0.6",benzo1:"0.3",benzo2:"绿",cadmium:"0.7",cadmium1:"0.4",cadmium2:"绿",chlordane:"0.4",chlordane1:"0.2",chlordane2:"绿",chloroform:"0.2",chloroform1:"0.1",chloroform2:"绿",endDepth:6,exceed:"绿",id:"108",latitude:"3195289.167",lead:"0.8",lead1:"0.4",lead2:"绿",longitude:"202089.3121",orderNumber:108,pointNumber:"A13",sampleNumber:"A15-07",sampleType:"土壤",startDepth:5.8,trichloroethylene:"0.9",trichloroethylene1:"0.5",trichloroethylene2:"绿",x:"180.0",y:"3195289.167"}];class Bp{constructor(e,t=32){this.isLut=!0,this.lut=[],this.map=[],this.n=0,this.minV=0,this.maxV=1,this.setColorMap(e,t)}set(e){return e.isLut===!0&&this.copy(e),this}setMin(e){return this.minV=e,this}setMax(e){return this.maxV=e,this}setColorMap(e,t=32){this.map=Qr[e]||Qr.rainbow,this.n=t;const n=1/this.n,r=new ze,o=new ze;this.lut.length=0,this.lut.push(new ze(this.map[0][1]));for(let a=1;a<t;a++){const s=a*n;for(let l=0;l<this.map.length-1;l++)if(s>this.map[l][0]&&s<=this.map[l+1][0]){const c=this.map[l][0],d=this.map[l+1][0];r.setHex(this.map[l][1],Ct),o.setHex(this.map[l+1][1],Ct);const f=new ze().lerpColors(r,o,(s-c)/(d-c));this.lut.push(f)}}return this.lut.push(new ze(this.map[this.map.length-1][1])),this}copy(e){return this.lut=e.lut,this.map=e.map,this.n=e.n,this.minV=e.minV,this.maxV=e.maxV,this}getColor(e){e=ds.clamp(e,this.minV,this.maxV),e=(e-this.minV)/(this.maxV-this.minV);const t=Math.round(e*this.n);return this.lut[t]}addColorMap(e,t){return Qr[e]=t,this}createCanvas(){const e=document.createElement("canvas");return e.width=1,e.height=this.n,this.updateCanvas(e),e}updateCanvas(e){const t=e.getContext("2d",{alpha:!1}),n=t.getImageData(0,0,1,this.n),r=n.data;let o=0;const a=1/this.n,s=new ze,l=new ze,c=new ze;for(let d=1;d>=0;d-=a)for(let f=this.map.length-1;f>=0;f--)if(d<this.map[f][0]&&d>=this.map[f-1][0]){const p=this.map[f-1][0],g=this.map[f][0];s.setHex(this.map[f-1][1],Ct),l.setHex(this.map[f][1],Ct),c.lerpColors(s,l,(d-p)/(g-p)),r[o*4]=Math.round(c.r*255),r[o*4+1]=Math.round(c.g*255),r[o*4+2]=Math.round(c.b*255),r[o*4+3]=255,o+=1}return t.putImageData(n,0,0),e}}const Qr={rainbow:[[0,255],[.2,65535],[.5,65280],[.8,16776960],[1,16711680]],cooltowarm:[[0,3952322],[.2,10206463],[.5,14474460],[.8,16163717],[1,11797542]],blackbody:[[0,0],[.2,7864320],[.5,15086080],[.8,16776960],[1,16777215]],grayscale:[[0,0],[.2,4210752],[.5,8355712],[.8,12566463],[1,16777215]]};function Hp(){const i=document.createElement("canvas"),e=i.getContext("2d");i.width=256,i.height=256;const t=e.createLinearGradient(0,0,0,i.height/4);return t.addColorStop(0,"#757373"),t.addColorStop(1,"#242323"),e.fillStyle=t,e.fillRect(0,0,i.width,i.height),new xp(i)}function Vp(i){let e={minLat:1/0,minLon:1/0,minDepth:1/0,maxDepth:-1/0,maxLat:-1/0,maxLon:-1/0};i.forEach(n=>{const r=Number.parseFloat(n.latitude),o=Number.parseFloat(n.longitude),a=Number.parseFloat(n.startDepth)*9;e.minDepth=Math.min(a,e.minDepth),e.maxDepth=Math.max(a,e.maxDepth),e.maxLat=Math.max(r,e.maxLat),e.maxLon=Math.max(o,e.maxLon),e.minLat=Math.min(r,e.minLat),e.minLon=Math.min(o,e.minLon)}),e.latRange=e.maxLat-e.minLat,e.lonRange=e.maxLon-e.minLon,e.depthRange=e.maxDepth-e.minDepth,e.minLon+(e.maxLon-e.minLon)/2,e.minLat+(e.maxLat-e.minLat)/2;let t=[];return i.forEach(n=>{let r=Number.parseFloat(n.latitude),o=Number.parseFloat(n.longitude);r=r-e.minLat,o=o-e.minLon,t.push({...n,x:r,y:o,z:n.startDepth*9,value:Number.parseFloat(n.cadmium)})}),{result:t,bbox:e}}class kp{constructor(){this.initApp(),this.initGUI(),this.initGeometry(),this.addEventListener()}initGeometry(){const{result:e,bbox:t}=Vp(Op,this.params.scaleValue);this.bbox=t,this.dataSource=e;const n=this.dataSource.map(x=>[x.x,x.y,x.z]),r=this.dataSource.map(x=>x.value),o=Math.max(...r);this.lut.setMax(o),this.lut.setMin(0),this.idw=new $e({positions:n,values:r},{periodicExtent:[[0,t.latRange],[0,t.lonRange],[0,t.depthRange]]}),this.geometry=new Ln(t.lonRange,t.latRange,t.depthRange),this.geometry.computeBoundingBox();const a=this,s=this.params,l=new Ap(s.boxSize,s.boxSize,s.boxSize,2,s.boxRoundness),c=new uo({}),d=g(),f=p(d);this.scene.add(f);function p(x){const b=new _t,u=new _p(l,c,x.length);u.instanceMatrix.setUsage(Hl);for(let h=0;h<x.length;h++)u.setColorAt(h,x[h].color),b.position.copy(x[h].position),b.updateMatrix(),u.setMatrixAt(h,b.matrix);return u.instanceMatrix.needsUpdate=!0,u.instanceColor.needsUpdate=!0,u}function g(){const x=a.params;let b=[],u=a.geometry.boundingBox;u.min.y+=.5*x.resolution;for(let h=u.min.x;h<u.max.x;h+=x.resolution)for(let E=u.min.y;E<u.max.y;E+=x.resolution)for(let y=u.min.z;y<u.max.z;y+=x.resolution){const w=new N(h,E,y),I=a.idw.evaluate([w.x,w.y,w.z],3),R=a.lut.getColor(I);b.push({color:R,position:w})}return b}}initApp(){this.lut=new Bp,this.lut.setColorMap("rainbow"),this.params={resolution:15,modelPreviewSize:2,modelSize:9,gridSize:0,boxSize:14,boxRoundness:.03},this.canvas=document.getElementById("renderingCanvas"),this.canvas.width=this.canvas.clientWidth,this.canvas.height=this.canvas.clientHeight,this.gui=new mo,this.gui.add(document,"title").name("案例名称"),this.scene=new pp,this.scene.background=Hp(),this.camera=new Es(-this.canvas.clientWidth/2,this.canvas.clientHeight/2,this.canvas.clientHeight/2,-this.canvas.clientHeight/2,.1,3e3),this.camera.position.set(1e3,1e3,1e3),this.camera.lookAt(this.scene.position),this.scene.add(this.camera);const e=new Mp(16777215,3,0,0);this.camera.add(e),this.renderer=new fp({antialias:!0,canvas:this.canvas}),this.renderer.localClippingEnabled=!0,this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.autoClear=!1,this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight),this.controls=new Ep(this.camera,this.renderer.domElement)}render(){this.renderer.clear(),this.renderer.render(this.scene,this.camera),this.controls.update()}initGUI(){const e=this;this.gui.add(this.params,"resolution",5,10,1).name("分辨率").onChange(()=>{e.needUpdate=!0})}addEventListener(){window.addEventListener("resize",()=>{this.canvas.style.width="100%",this.canvas.style.height="100%",this.camera.aspect=this.canvas.clientWidth/this.canvas.clientHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.canvas.clientWidth,this.canvas.clientHeight)})}}const Gp=new kp;function Ds(){requestAnimationFrame(Ds),Gp.render()}Ds();
