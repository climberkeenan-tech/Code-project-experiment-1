var Ff=Object.defineProperty;var Nf=(r,e,t)=>e in r?Ff(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var wl=(r,e,t)=>Nf(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gc="170",Uf=0,Tl=1,Of=2,td=1,nd=2,Xn=3,En=0,Gt=1,Nt=2,Qn=0,cs=1,Ut=2,El=3,Al=4,kf=5,Ci=100,zf=101,Bf=102,Hf=103,Gf=104,Vf=200,Wf=201,qf=202,jf=203,Wo=204,qo=205,Xf=206,Yf=207,Kf=208,$f=209,Qf=210,Zf=211,Jf=212,ep=213,tp=214,jo=0,Xo=1,Yo=2,ds=3,Ko=4,$o=5,Qo=6,Zo=7,id=0,np=1,ip=2,Zn=0,sd=1,rd=2,ad=3,Vc=4,sp=5,od=6,cd=7,Rl="attached",rp="detached",ld=300,fs=301,ps=302,Jo=303,ec=304,Ta=306,Ii=1e3,gi=1001,ga=1002,$t=1003,hd=1004,Ys=1005,sn=1006,ca=1007,In=1008,ti=1009,ud=1010,dd=1011,rr=1012,Wc=1013,Fi=1014,wn=1015,Nn=1016,qc=1017,jc=1018,ms=1020,fd=35902,pd=1021,md=1022,gn=1023,gd=1024,_d=1025,ls=1026,gs=1027,Xc=1028,Yc=1029,vd=1030,Kc=1031,$c=1033,la=33776,ha=33777,ua=33778,da=33779,tc=35840,nc=35841,ic=35842,sc=35843,rc=36196,ac=37492,oc=37496,cc=37808,lc=37809,hc=37810,uc=37811,dc=37812,fc=37813,pc=37814,mc=37815,gc=37816,_c=37817,vc=37818,bc=37819,yc=37820,xc=37821,fa=36492,Mc=36494,Sc=36495,bd=36283,wc=36284,Tc=36285,Ec=36286,ar=2300,or=2301,ka=2302,Cl=2400,Pl=2401,Ll=2402,ap=2500,op=0,yd=1,Ac=2,cp=3200,lp=3201,xd=0,hp=1,mi="",yt="srgb",Qt="srgb-linear",Ea="linear",at="srgb",zi=7680,Dl=519,up=512,dp=513,fp=514,Md=515,pp=516,mp=517,gp=518,_p=519,Rc=35044,vp=35048,Il="300 es",$n=2e3,_a=2001;class Ts{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fl=1234567;const Zs=Math.PI/180,_s=180/Math.PI;function _n(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[r&255]+kt[r>>8&255]+kt[r>>16&255]+kt[r>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function Pt(r,e,t){return Math.max(e,Math.min(t,r))}function Qc(r,e){return(r%e+e)%e}function bp(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function yp(r,e,t){return r!==e?(t-r)/(e-r):0}function Js(r,e,t){return(1-t)*r+t*e}function xp(r,e,t,n){return Js(r,e,1-Math.exp(-t*n))}function Mp(r,e=1){return e-Math.abs(Qc(r,e*2)-e)}function Sp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function wp(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Tp(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Ep(r,e){return r+Math.random()*(e-r)}function Ap(r){return r*(.5-Math.random())}function Rp(r){r!==void 0&&(Fl=r);let e=Fl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Cp(r){return r*Zs}function Pp(r){return r*_s}function Lp(r){return(r&r-1)===0&&r!==0}function Dp(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Ip(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Fp(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),m=a((n-e)/2);switch(i){case"XYX":r.set(o*h,c*u,c*d,o*l);break;case"YZY":r.set(c*d,o*h,c*u,o*l);break;case"ZXZ":r.set(c*u,c*d,o*h,o*l);break;case"XZX":r.set(o*h,c*m,c*f,o*l);break;case"YXY":r.set(c*f,o*h,c*m,o*l);break;case"ZYZ":r.set(c*m,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Sn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ot(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Np={DEG2RAD:Zs,RAD2DEG:_s,generateUUID:_n,clamp:Pt,euclideanModulo:Qc,mapLinear:bp,inverseLerp:yp,lerp:Js,damp:xp,pingpong:Mp,smoothstep:Sp,smootherstep:wp,randInt:Tp,randFloat:Ep,randFloatSpread:Ap,seededRandom:Rp,degToRad:Cp,radToDeg:Pp,isPowerOfTwo:Lp,ceilPowerOfTwo:Dp,floorPowerOfTwo:Ip,setQuaternionFromProperEuler:Fp,normalize:ot,denormalize:Sn};class ne{constructor(e=0,t=0){ne.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,i,s,a,o,c,l){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=i[0],g=i[3],p=i[6],y=i[1],x=i[4],v=i[7],P=i[2],A=i[5],E=i[8];return s[0]=a*_+o*y+c*P,s[3]=a*g+o*x+c*A,s[6]=a*p+o*v+c*E,s[1]=l*_+h*y+u*P,s[4]=l*g+h*x+u*A,s[7]=l*p+h*v+u*E,s[2]=d*_+f*y+m*P,s[5]=d*g+f*x+m*A,s[8]=d*p+f*v+m*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,f=l*s-a*c,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*s-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(za.makeScale(e,t)),this}rotate(e){return this.premultiply(za.makeRotation(-e)),this}translate(e,t){return this.premultiply(za.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const za=new Ve;function Sd(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function cr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Up(){const r=cr("canvas");return r.style.display="block",r}const Nl={};function Ks(r){r in Nl||(Nl[r]=!0,console.warn(r))}function Op(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function kp(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function zp(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const $e={enabled:!0,workingColorSpace:Qt,spaces:{},convert:function(r,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===at&&(r.r=Jn(r.r),r.g=Jn(r.g),r.b=Jn(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===at&&(r.r=hs(r.r),r.g=hs(r.g),r.b=hs(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===mi?Ea:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Jn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function hs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const Ul=[.64,.33,.3,.6,.15,.06],Ol=[.2126,.7152,.0722],kl=[.3127,.329],zl=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bl=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$e.define({[Qt]:{primaries:Ul,whitePoint:kl,transfer:Ea,toXYZ:zl,fromXYZ:Bl,luminanceCoefficients:Ol,workingColorSpaceConfig:{unpackColorSpace:yt},outputColorSpaceConfig:{drawingBufferColorSpace:yt}},[yt]:{primaries:Ul,whitePoint:kl,transfer:at,toXYZ:zl,fromXYZ:Bl,luminanceCoefficients:Ol,outputColorSpaceConfig:{drawingBufferColorSpace:yt}}});let Bi;class Bp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Bi===void 0&&(Bi=cr("canvas")),Bi.width=e.width,Bi.height=e.height;const n=Bi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Bi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Jn(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Jn(t[n]/255)*255):t[n]=Jn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hp=0;class wd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hp++}),this.uuid=_n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Ba(i[a].image)):s.push(Ba(i[a]))}else s=Ba(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Ba(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Bp.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gp=0;class Et extends Ts{constructor(e=Et.DEFAULT_IMAGE,t=Et.DEFAULT_MAPPING,n=gi,i=gi,s=sn,a=In,o=gn,c=ti,l=Et.DEFAULT_ANISOTROPY,h=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=_n(),this.name="",this.source=new wd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ld)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ii:e.x=e.x-Math.floor(e.x);break;case gi:e.x=e.x<0?0:1;break;case ga:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ii:e.y=e.y-Math.floor(e.y);break;case gi:e.y=e.y<0?0:1;break;case ga:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Et.DEFAULT_IMAGE=null;Et.DEFAULT_MAPPING=ld;Et.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,i=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,v=(f+1)/2,P=(p+1)/2,A=(h+d)/4,E=(u+_)/4,L=(m+g)/4;return x>v&&x>P?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=A/n,s=E/n):v>P?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=A/i,s=L/i):P<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(P),n=E/s,i=L/s),this.set(n,i,s,t),this}let y=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vp extends Ts{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Et(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new wd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class an extends Vp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Td extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$t,this.minFilter=$t,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wp extends Et{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=$t,this.minFilter=$t,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ht{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],f=s[a+1],m=s[a+2],_=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==m){let g=1-o;const p=c*d+l*f+h*m+u*_,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const P=Math.sqrt(x),A=Math.atan2(P,p*y);g=Math.sin(g*A)/P,o=Math.sin(o*A)/P}const v=o*y;if(c=c*g+d*v,l=l*g+f*v,h=h*g+m*v,u=u*g+_*v,g===1-o){const P=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=P,l*=P,h*=P,u*=P}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return e[t]=o*m+h*u+c*f-l*d,e[t+1]=c*m+h*d+l*u-o*f,e[t+2]=l*m+h*f+o*d-c*u,e[t+3]=h*m-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),u=o(s/2),d=c(n/2),f=c(i/2),m=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class b{constructor(e=0,t=0,n=0){b.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-s*u,this.z=i+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ha.copy(this).projectOnVector(e),this.sub(Ha)}reflect(e){return this.sub(Ha.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ha=new b,Hl=new ht;class on{constructor(e=new b(1/0,1/0,1/0),t=new b(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,yn):yn.fromBufferAttribute(s,a),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Sr.copy(n.boundingBox)),Sr.applyMatrix4(e.matrixWorld),this.union(Sr)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Fs),wr.subVectors(this.max,Fs),Hi.subVectors(e.a,Fs),Gi.subVectors(e.b,Fs),Vi.subVectors(e.c,Fs),ai.subVectors(Gi,Hi),oi.subVectors(Vi,Gi),bi.subVectors(Hi,Vi);let t=[0,-ai.z,ai.y,0,-oi.z,oi.y,0,-bi.z,bi.y,ai.z,0,-ai.x,oi.z,0,-oi.x,bi.z,0,-bi.x,-ai.y,ai.x,0,-oi.y,oi.x,0,-bi.y,bi.x,0];return!Ga(t,Hi,Gi,Vi,wr)||(t=[1,0,0,0,1,0,0,0,1],!Ga(t,Hi,Gi,Vi,wr))?!1:(Tr.crossVectors(ai,oi),t=[Tr.x,Tr.y,Tr.z],Ga(t,Hi,Gi,Vi,wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Hn=[new b,new b,new b,new b,new b,new b,new b,new b],yn=new b,Sr=new on,Hi=new b,Gi=new b,Vi=new b,ai=new b,oi=new b,bi=new b,Fs=new b,wr=new b,Tr=new b,yi=new b;function Ga(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){yi.fromArray(r,s);const o=i.x*Math.abs(yi.x)+i.y*Math.abs(yi.y)+i.z*Math.abs(yi.z),c=e.dot(yi),l=t.dot(yi),h=n.dot(yi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const qp=new on,Ns=new b,Va=new b;class An{constructor(e=new b,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qp.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ns.subVectors(e,this.center);const t=Ns.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ns,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Va.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ns.copy(e.center).add(Va)),this.expandByPoint(Ns.copy(e.center).sub(Va))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Gn=new b,Wa=new b,Er=new b,ci=new b,qa=new b,Ar=new b,ja=new b;class Aa{constructor(e=new b,t=new b(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Gn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Gn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Gn.copy(this.origin).addScaledVector(this.direction,t),Gn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Wa.copy(e).add(t).multiplyScalar(.5),Er.copy(t).sub(e).normalize(),ci.copy(this.origin).sub(Wa);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Er),o=ci.dot(this.direction),c=-ci.dot(Er),l=ci.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*c-o,d=a*o-c,m=s*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Wa).addScaledVector(Er,d),f}intersectSphere(e,t){Gn.subVectors(e.center,this.origin);const n=Gn.dot(this.direction),i=Gn.dot(Gn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Gn)!==null}intersectTriangle(e,t,n,i,s){qa.subVectors(t,e),Ar.subVectors(n,e),ja.crossVectors(qa,Ar);let a=this.direction.dot(ja),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ci.subVectors(this.origin,e);const c=o*this.direction.dot(Ar.crossVectors(ci,Ar));if(c<0)return null;const l=o*this.direction.dot(qa.cross(ci));if(l<0||c+l>a)return null;const h=-o*ci.dot(ja);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ne{constructor(e,t,n,i,s,a,o,c,l,h,u,d,f,m,_,g){Ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,u,d,f,m,_,g)}set(e,t,n,i,s,a,o,c,l,h,u,d,f,m,_,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ne().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Wi.setFromMatrixColumn(e,0).length(),s=1/Wi.setFromMatrixColumn(e,1).length(),a=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,m=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d+_*o,t[4]=m*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-m,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,m=o*h,_=o*u;t[0]=c*h,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=m*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+m,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*c,f=a*l,m=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jp,e,Xp)}lookAt(e,t,n){const i=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),li.crossVectors(n,tn),li.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),li.crossVectors(n,tn)),li.normalize(),Rr.crossVectors(tn,li),i[0]=li.x,i[4]=Rr.x,i[8]=tn.x,i[1]=li.y,i[5]=Rr.y,i[9]=tn.y,i[2]=li.z,i[6]=Rr.z,i[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],x=n[7],v=n[11],P=n[15],A=i[0],E=i[4],L=i[8],S=i[12],M=i[1],C=i[5],U=i[9],F=i[13],I=i[2],B=i[6],z=i[10],V=i[14],H=i[3],J=i[7],ie=i[11],re=i[15];return s[0]=a*A+o*M+c*I+l*H,s[4]=a*E+o*C+c*B+l*J,s[8]=a*L+o*U+c*z+l*ie,s[12]=a*S+o*F+c*V+l*re,s[1]=h*A+u*M+d*I+f*H,s[5]=h*E+u*C+d*B+f*J,s[9]=h*L+u*U+d*z+f*ie,s[13]=h*S+u*F+d*V+f*re,s[2]=m*A+_*M+g*I+p*H,s[6]=m*E+_*C+g*B+p*J,s[10]=m*L+_*U+g*z+p*ie,s[14]=m*S+_*F+g*V+p*re,s[3]=y*A+x*M+v*I+P*H,s[7]=y*E+x*C+v*B+P*J,s[11]=y*L+x*U+v*z+P*ie,s[15]=y*S+x*F+v*V+P*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+s*c*u-i*l*u-s*o*d+n*l*d+i*o*f-n*c*f)+_*(+t*c*f-t*l*d+s*a*d-i*a*f+i*l*h-s*c*h)+g*(+t*l*u-t*o*f-s*a*u+n*a*f+s*o*h-n*l*h)+p*(-i*o*h-t*c*u+t*o*d+i*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=u*g*l-_*d*l+_*c*f-o*g*f-u*c*p+o*d*p,x=m*d*l-h*g*l-m*c*f+a*g*f+h*c*p-a*d*p,v=h*_*l-m*u*l+m*o*f-a*_*f-h*o*p+a*u*p,P=m*u*c-h*_*c-m*o*d+a*_*d+h*o*g-a*u*g,A=t*y+n*x+i*v+s*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/A;return e[0]=y*E,e[1]=(_*d*s-u*g*s-_*i*f+n*g*f+u*i*p-n*d*p)*E,e[2]=(o*g*s-_*c*s+_*i*l-n*g*l-o*i*p+n*c*p)*E,e[3]=(u*c*s-o*d*s-u*i*l+n*d*l+o*i*f-n*c*f)*E,e[4]=x*E,e[5]=(h*g*s-m*d*s+m*i*f-t*g*f-h*i*p+t*d*p)*E,e[6]=(m*c*s-a*g*s-m*i*l+t*g*l+a*i*p-t*c*p)*E,e[7]=(a*d*s-h*c*s+h*i*l-t*d*l-a*i*f+t*c*f)*E,e[8]=v*E,e[9]=(m*u*s-h*_*s-m*n*f+t*_*f+h*n*p-t*u*p)*E,e[10]=(a*_*s-m*o*s+m*n*l-t*_*l-a*n*p+t*o*p)*E,e[11]=(h*o*s-a*u*s-h*n*l+t*u*l+a*n*f-t*o*f)*E,e[12]=P*E,e[13]=(h*_*i-m*u*i+m*n*d-t*_*d-h*n*g+t*u*g)*E,e[14]=(m*o*i-a*_*i-m*n*c+t*_*c+a*n*g-t*o*g)*E,e[15]=(a*u*i-h*o*i+h*n*c-t*u*c-a*n*d+t*o*d)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,f=s*h,m=s*u,_=a*h,g=a*u,p=o*u,y=c*l,x=c*h,v=c*u,P=n.x,A=n.y,E=n.z;return i[0]=(1-(_+p))*P,i[1]=(f+v)*P,i[2]=(m-x)*P,i[3]=0,i[4]=(f-v)*A,i[5]=(1-(d+p))*A,i[6]=(g+y)*A,i[7]=0,i[8]=(m+x)*E,i[9]=(g-y)*E,i[10]=(1-(d+_))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Wi.set(i[0],i[1],i[2]).length();const a=Wi.set(i[4],i[5],i[6]).length(),o=Wi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],xn.copy(this);const l=1/s,h=1/a,u=1/o;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,t.setFromRotationMatrix(xn),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=$n){const c=this.elements,l=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,m;if(o===$n)f=-(a+s)/(a-s),m=-2*a*s/(a-s);else if(o===_a)f=-a/(a-s),m=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=$n){const c=this.elements,l=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*l,f=(n+i)*h;let m,_;if(o===$n)m=(a+s)*u,_=-2*u;else if(o===_a)m=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Wi=new b,xn=new Ne,jp=new b(0,0,0),Xp=new b(1,1,1),li=new b,Rr=new b,tn=new b,Gl=new Ne,Vl=new ht;class Wt{constructor(e=0,t=0,n=0,i=Wt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Gl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Vl.setFromEuler(this),this.setFromQuaternion(Vl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wt.DEFAULT_ORDER="XYZ";class Ed{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yp=0;const Wl=new b,qi=new ht,Vn=new Ne,Cr=new b,Us=new b,Kp=new b,$p=new ht,ql=new b(1,0,0),jl=new b(0,1,0),Xl=new b(0,0,1),Yl={type:"added"},Qp={type:"removed"},ji={type:"childadded",child:null},Xa={type:"childremoved",child:null};class ft extends Ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=_n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new b,t=new Wt,n=new ht,i=new b(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ne},normalMatrix:{value:new Ve}}),this.matrix=new Ne,this.matrixWorld=new Ne,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ed,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.multiply(qi),this}rotateOnWorldAxis(e,t){return qi.setFromAxisAngle(e,t),this.quaternion.premultiply(qi),this}rotateX(e){return this.rotateOnAxis(ql,e)}rotateY(e){return this.rotateOnAxis(jl,e)}rotateZ(e){return this.rotateOnAxis(Xl,e)}translateOnAxis(e,t){return Wl.copy(e).applyQuaternion(this.quaternion),this.position.add(Wl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ql,e)}translateY(e){return this.translateOnAxis(jl,e)}translateZ(e){return this.translateOnAxis(Xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cr.copy(e):Cr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(Us,Cr,this.up):Vn.lookAt(Cr,Us,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),qi.setFromRotationMatrix(Vn),this.quaternion.premultiply(qi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Yl),ji.child=e,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qp),Xa.child=e,this.dispatchEvent(Xa),Xa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Yl),ji.child=e,this.dispatchEvent(ji),ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,e,Kp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,$p,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ft.DEFAULT_UP=new b(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new b,Wn=new b,Ya=new b,qn=new b,Xi=new b,Yi=new b,Kl=new b,Ka=new b,$a=new b,Qa=new b,Za=new tt,Ja=new tt,eo=new tt;class mn{constructor(e=new b,t=new b,n=new b){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Mn.subVectors(e,t),i.cross(Mn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Mn.subVectors(i,t),Wn.subVectors(n,t),Ya.subVectors(e,t);const a=Mn.dot(Mn),o=Mn.dot(Wn),c=Mn.dot(Ya),l=Wn.dot(Wn),h=Wn.dot(Ya),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,m=(a*h-o*c)*d;return s.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,qn)===null?!1:qn.x>=0&&qn.y>=0&&qn.x+qn.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,qn.x),c.addScaledVector(a,qn.y),c.addScaledVector(o,qn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Za.setScalar(0),Ja.setScalar(0),eo.setScalar(0),Za.fromBufferAttribute(e,t),Ja.fromBufferAttribute(e,n),eo.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Za,s.x),a.addScaledVector(Ja,s.y),a.addScaledVector(eo,s.z),a}static isFrontFacing(e,t,n,i){return Mn.subVectors(n,t),Wn.subVectors(e,t),Mn.cross(Wn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),Mn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return mn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return mn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return mn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return mn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return mn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Xi.subVectors(i,n),Yi.subVectors(s,n),Ka.subVectors(e,n);const c=Xi.dot(Ka),l=Yi.dot(Ka);if(c<=0&&l<=0)return t.copy(n);$a.subVectors(e,i);const h=Xi.dot($a),u=Yi.dot($a);if(h>=0&&u<=h)return t.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Xi,a);Qa.subVectors(e,s);const f=Xi.dot(Qa),m=Yi.dot(Qa);if(m>=0&&f<=m)return t.copy(s);const _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Yi,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Kl.subVectors(s,i),o=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(Kl,o);const p=1/(g+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Xi,a).addScaledVector(Yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ad={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function to(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class X{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=yt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=$e.workingColorSpace){if(e=Qc(e,1),t=Pt(t,0,1),n=Pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=to(a,s,e+1/3),this.g=to(a,s,e),this.b=to(a,s,e-1/3)}return $e.toWorkingColorSpace(this,i),this}setStyle(e,t=yt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=yt){const n=Ad[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Jn(e.r),this.g=Jn(e.g),this.b=Jn(e.b),this}copyLinearToSRGB(e){return this.r=hs(e.r),this.g=hs(e.g),this.b=hs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=yt){return $e.fromWorkingColorSpace(zt.copy(this),e),Math.round(Pt(zt.r*255,0,255))*65536+Math.round(Pt(zt.g*255,0,255))*256+Math.round(Pt(zt.b*255,0,255))}getHexString(e=yt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(zt.copy(this),t);const n=zt.r,i=zt.g,s=zt.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=yt){$e.fromWorkingColorSpace(zt.copy(this),e);const t=zt.r,n=zt.g,i=zt.b;return e!==yt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(hi),this.setHSL(hi.h+e,hi.s+t,hi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(hi),e.getHSL(Pr);const n=Js(hi.h,Pr.h,t),i=Js(hi.s,Pr.s,t),s=Js(hi.l,Pr.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zt=new X;X.NAMES=Ad;let Zp=0;class Tn extends Ts{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=_n(),this.name="",this.blending=cs,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Wo,this.blendDst=qo,this.blendEquation=Ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new X(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=zi,this.stencilZFail=zi,this.stencilZPass=zi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==cs&&(n.blending=this.blending),this.side!==En&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Wo&&(n.blendSrc=this.blendSrc),this.blendDst!==qo&&(n.blendDst=this.blendDst),this.blendEquation!==Ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ds&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==zi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==zi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==zi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class xt extends Tn{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new X(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=id,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const St=new b,Lr=new ne;class lt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rc,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXY(t,Lr.x,Lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix3(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)St.fromBufferAttribute(this,t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Sn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Sn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Sn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Sn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Rc&&(e.usage=this.usage),e}}class Rd extends lt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Cd extends lt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class nt extends lt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Jp=0;const ln=new Ne,no=new ft,Ki=new b,nn=new on,Os=new on,Ct=new b;class vt extends Ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=_n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Sd(e)?Cd:Rd)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ve().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ln.makeRotationFromQuaternion(e),this.applyMatrix4(ln),this}rotateX(e){return ln.makeRotationX(e),this.applyMatrix4(ln),this}rotateY(e){return ln.makeRotationY(e),this.applyMatrix4(ln),this}rotateZ(e){return ln.makeRotationZ(e),this.applyMatrix4(ln),this}translate(e,t,n){return ln.makeTranslation(e,t,n),this.applyMatrix4(ln),this}scale(e,t,n){return ln.makeScale(e,t,n),this.applyMatrix4(ln),this}lookAt(e){return no.lookAt(e),no.updateMatrix(),this.applyMatrix4(no.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ki).negate(),this.translate(Ki.x,Ki.y,Ki.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new nt(n,3))}else{for(let n=0,i=t.count;n<i;n++){const s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new on);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new b(-1/0,-1/0,-1/0),new b(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new An);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new b,1/0);return}if(e){const n=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Os.setFromBufferAttribute(o),this.morphTargetsRelative?(Ct.addVectors(nn.min,Os.min),nn.expandByPoint(Ct),Ct.addVectors(nn.max,Os.max),nn.expandByPoint(Ct)):(nn.expandByPoint(Os.min),nn.expandByPoint(Os.max))}nn.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Ct.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Ct));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ct.fromBufferAttribute(o,l),c&&(Ki.fromBufferAttribute(e,l),Ct.add(Ki)),i=Math.max(i,n.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new lt(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let L=0;L<n.count;L++)o[L]=new b,c[L]=new b;const l=new b,h=new b,u=new b,d=new ne,f=new ne,m=new ne,_=new b,g=new b;function p(L,S,M){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,S),u.fromBufferAttribute(n,M),d.fromBufferAttribute(s,L),f.fromBufferAttribute(s,S),m.fromBufferAttribute(s,M),h.sub(l),u.sub(l),f.sub(d),m.sub(d);const C=1/(f.x*m.y-m.x*f.y);isFinite(C)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(C),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(C),o[L].add(_),o[S].add(_),o[M].add(_),c[L].add(g),c[S].add(g),c[M].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let L=0,S=y.length;L<S;++L){const M=y[L],C=M.start,U=M.count;for(let F=C,I=C+U;F<I;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const x=new b,v=new b,P=new b,A=new b;function E(L){P.fromBufferAttribute(i,L),A.copy(P);const S=o[L];x.copy(S),x.sub(P.multiplyScalar(P.dot(S))).normalize(),v.crossVectors(A,S);const C=v.dot(c[L])<0?-1:1;a.setXYZW(L,x.x,x.y,x.z,C)}for(let L=0,S=y.length;L<S;++L){const M=y[L],C=M.start,U=M.count;for(let F=C,I=C+U;F<I;F+=3)E(e.getX(F+0)),E(e.getX(F+1)),E(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new lt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new b,s=new b,a=new b,o=new b,c=new b,l=new b,h=new b,u=new b;if(e)for(let d=0,f=e.count;d<f;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),o.add(h),c.add(h),l.add(h),n.setXYZ(m,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,m=0;for(let _=0,g=c.length;_<g;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new lt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $l=new Ne,xi=new Aa,Dr=new An,Ql=new b,Ir=new b,Fr=new b,Nr=new b,io=new b,Ur=new b,Zl=new b,Or=new b;class pe extends ft{constructor(e=new vt,t=new xt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Ur.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],u=s[c];h!==0&&(io.fromBufferAttribute(u,e),a?Ur.addScaledVector(io,h):Ur.addScaledVector(io.sub(t),h))}t.add(Ur)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere),Dr.applyMatrix4(s),xi.copy(e.ray).recast(e.near),!(Dr.containsPoint(xi.origin)===!1&&(xi.intersectSphere(Dr,Ql)===null||xi.origin.distanceToSquared(Ql)>(e.far-e.near)**2))&&($l.copy(s).invert(),xi.copy(e.ray).applyMatrix4($l),!(n.boundingBox!==null&&xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,xi)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),x=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,P=x;v<P;v+=3){const A=o.getX(v),E=o.getX(v+1),L=o.getX(v+2);i=kr(this,p,e,n,l,h,u,A,E,L),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=o.getX(g),x=o.getX(g+1),v=o.getX(g+2);i=kr(this,a,e,n,l,h,u,y,x,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],y=Math.max(g.start,f.start),x=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,P=x;v<P;v+=3){const A=v,E=v+1,L=v+2;i=kr(this,p,e,n,l,h,u,A,E,L),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const y=g,x=g+1,v=g+2;i=kr(this,a,e,n,l,h,u,y,x,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function em(r,e,t,n,i,s,a,o){let c;if(e.side===Gt?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,e.side===En,o),c===null)return null;Or.copy(o),Or.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(Or);return l<t.near||l>t.far?null:{distance:l,point:Or.clone(),object:r}}function kr(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,Ir),r.getVertexPosition(c,Fr),r.getVertexPosition(l,Nr);const h=em(r,e,t,n,Ir,Fr,Nr,Zl);if(h){const u=new b;mn.getBarycoord(Zl,Ir,Fr,Nr,u),i&&(h.uv=mn.getInterpolatedAttribute(i,o,c,l,u,new ne)),s&&(h.uv1=mn.getInterpolatedAttribute(s,o,c,l,u,new ne)),a&&(h.normal=mn.getInterpolatedAttribute(a,o,c,l,u,new b),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new b,materialIndex:0};mn.getNormal(Ir,Fr,Nr,d.normal),h.face=d,h.barycoord=u}return h}class gt extends vt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,n,t,e,a,s,0),m("z","y","x",1,-1,n,t,-e,a,s,1),m("x","z","y",1,1,e,n,t,i,a,2),m("x","z","y",1,-1,e,n,-t,i,a,3),m("x","y","z",1,-1,e,t,n,i,s,4),m("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new nt(l,3)),this.setAttribute("normal",new nt(h,3)),this.setAttribute("uv",new nt(u,2));function m(_,g,p,y,x,v,P,A,E,L,S){const M=v/E,C=P/L,U=v/2,F=P/2,I=A/2,B=E+1,z=L+1;let V=0,H=0;const J=new b;for(let ie=0;ie<z;ie++){const re=ie*C-F;for(let ye=0;ye<B;ye++){const Ie=ye*M-U;J[_]=Ie*y,J[g]=re*x,J[p]=I,l.push(J.x,J.y,J.z),J[_]=0,J[g]=0,J[p]=A>0?1:-1,h.push(J.x,J.y,J.z),u.push(ye/E),u.push(1-ie/L),V+=1}}for(let ie=0;ie<L;ie++)for(let re=0;re<E;re++){const ye=d+re+B*ie,Ie=d+re+B*(ie+1),W=d+(re+1)+B*(ie+1),te=d+(re+1)+B*ie;c.push(ye,Ie,te),c.push(Ie,W,te),H+=6}o.addGroup(f,H,S),f+=H,d+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function vs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Yt(r){const e={};for(let t=0;t<r.length;t++){const n=vs(r[t]);for(const i in n)e[i]=n[i]}return e}function tm(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Pd(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const lr={clone:vs,merge:Yt};var nm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,im=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tt extends Tn{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=nm,this.fragmentShader=im,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vs(e.uniforms),this.uniformsGroups=tm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ld extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ne,this.projectionMatrix=new Ne,this.projectionMatrixInverse=new Ne,this.coordinateSystem=$n}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ui=new b,Jl=new ne,eh=new ne;class Kt extends Ld{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=_s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Zs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return _s*2*Math.atan(Math.tan(Zs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ui.x,ui.y).multiplyScalar(-e/ui.z),ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ui.x,ui.y).multiplyScalar(-e/ui.z)}getViewSize(e,t){return this.getViewBounds(e,Jl,eh),t.subVectors(eh,Jl)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Zs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const $i=-90,Qi=1;class sm extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Kt($i,Qi,e,t);i.layers=this.layers,this.add(i);const s=new Kt($i,Qi,e,t);s.layers=this.layers,this.add(s);const a=new Kt($i,Qi,e,t);a.layers=this.layers,this.add(a);const o=new Kt($i,Qi,e,t);o.layers=this.layers,this.add(o);const c=new Kt($i,Qi,e,t);c.layers=this.layers,this.add(c);const l=new Kt($i,Qi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===$n)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===_a)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Dd extends Et{constructor(e,t,n,i,s,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:fs,super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class rm extends an{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Dd(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new gt(5,5,5),s=new Tt({name:"CubemapFromEquirect",uniforms:vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Gt,blending:Qn});s.uniforms.tEquirect.value=t;const a=new pe(i,s),o=t.minFilter;return t.minFilter===In&&(t.minFilter=sn),new sm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const so=new b,am=new b,om=new Ve;class Ai{constructor(e=new b(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=so.subVectors(n,t).cross(am.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(so),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||om.getNormalMatrix(e),i=this.coplanarPoint(so).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new An,zr=new b;class Zc{constructor(e=new Ai,t=new Ai,n=new Ai,i=new Ai,s=new Ai,a=new Ai){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=$n){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],m=i[9],_=i[10],g=i[11],p=i[12],y=i[13],x=i[14],v=i[15];if(n[0].setComponents(c-s,d-l,g-f,v-p).normalize(),n[1].setComponents(c+s,d+l,g+f,v+p).normalize(),n[2].setComponents(c+a,d+h,g+m,v+y).normalize(),n[3].setComponents(c-a,d-h,g-m,v-y).normalize(),n[4].setComponents(c-o,d-u,g-_,v-x).normalize(),t===$n)n[5].setComponents(c+o,d+u,g+_,v+x).normalize();else if(t===_a)n[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(zr.x=i.normal.x>0?e.max.x:e.min.x,zr.y=i.normal.y>0?e.max.y:e.min.y,zr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(zr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Id(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function cm(r){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,o),u.length===0)r.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const _=u[f];r.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(r.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}class Es extends vt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,u=e/o,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const y=p*d-a;for(let x=0;x<l;x++){const v=x*u-s;m.push(v,-y,0),_.push(0,0,1),g.push(x/o),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const x=y+l*p,v=y+l*(p+1),P=y+1+l*(p+1),A=y+1+l*p;f.push(x,v,A),f.push(v,P,A)}this.setIndex(f),this.setAttribute("position",new nt(m,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Es(e.width,e.height,e.widthSegments,e.heightSegments)}}var lm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,hm=`#ifdef USE_ALPHAHASH
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
#endif`,um=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mm=`#ifdef USE_AOMAP
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
#endif`,gm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_m=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
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
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ym=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Mm=`#ifdef USE_IRIDESCENCE
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
#endif`,Sm=`#ifdef USE_BUMPMAP
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
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Tm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Em=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Lm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Dm=`#define PI 3.141592653589793
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
} // validated`,Im=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fm=`vec3 transformedNormal = objectNormal;
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
#endif`,Nm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Um=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Om=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,km=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Bm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Hm=`#ifdef USE_ENVMAP
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
#endif`,Gm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Vm=`#ifdef USE_ENVMAP
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
#endif`,Wm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qm=`#ifdef USE_ENVMAP
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
#endif`,jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Xm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ym=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Km=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,$m=`#ifdef USE_GRADIENTMAP
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
}`,Qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Zm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eg=`uniform bool receiveShadow;
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
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
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
#endif`,tg=`#ifdef USE_ENVMAP
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
#endif`,ng=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ag=`PhysicalMaterial material;
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
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
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
#endif`,og=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
}`,cg=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,lg=`#if defined( RE_IndirectDiffuse )
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
#endif`,hg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ug=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_g=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vg=`#if defined( USE_POINTS_UV )
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
#endif`,bg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Mg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Sg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
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
#endif`,Tg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Eg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ag=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Rg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lg=`#ifdef USE_NORMALMAP
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
#endif`,Dg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ig=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Fg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ng=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ug=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Og=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
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
}`,kg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
			float shadowIntensity;
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
			float shadowIntensity;
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
			float shadowIntensity;
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return mix( 1.0, shadow, shadowIntensity );
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
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
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,qg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
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
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Xg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Yg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Kg=`#ifdef USE_SKINNING
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
#endif`,$g=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qg=`#ifdef USE_SKINNING
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
#endif`,Zg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,e0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,t0=`#ifndef saturate
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
vec3 CineonToneMapping( vec3 color ) {
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
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,n0=`#ifdef USE_TRANSMISSION
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
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,i0=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,a0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const c0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l0=`uniform sampler2D t2D;
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
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`#include <common>
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
}`,m0=`#if DEPTH_PACKING == 3200
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
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,g0=`#define DISTANCE
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
}`,_0=`#define DISTANCE
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
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,b0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`uniform float scale;
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
}`,x0=`uniform vec3 diffuse;
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
}`,M0=`#include <common>
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
}`,S0=`uniform vec3 diffuse;
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
}`,w0=`#define LAMBERT
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
}`,T0=`#define LAMBERT
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
}`,E0=`#define MATCAP
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
}`,A0=`#define MATCAP
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
}`,R0=`#define NORMAL
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
}`,C0=`#define NORMAL
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
}`,P0=`#define PHONG
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
}`,L0=`#define PHONG
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
}`,D0=`#define STANDARD
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
}`,I0=`#define STANDARD
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
#ifdef USE_DISPERSION
	uniform float dispersion;
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
}`,F0=`#define TOON
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
}`,N0=`#define TOON
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
}`,U0=`uniform float size;
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
}`,O0=`uniform vec3 diffuse;
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
}`,k0=`#include <common>
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
}`,z0=`uniform vec3 color;
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
}`,B0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
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
}`,H0=`uniform vec3 diffuse;
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
}`,qe={alphahash_fragment:lm,alphahash_pars_fragment:hm,alphamap_fragment:um,alphamap_pars_fragment:dm,alphatest_fragment:fm,alphatest_pars_fragment:pm,aomap_fragment:mm,aomap_pars_fragment:gm,batching_pars_vertex:_m,batching_vertex:vm,begin_vertex:bm,beginnormal_vertex:ym,bsdfs:xm,iridescence_fragment:Mm,bumpmap_pars_fragment:Sm,clipping_planes_fragment:wm,clipping_planes_pars_fragment:Tm,clipping_planes_pars_vertex:Em,clipping_planes_vertex:Am,color_fragment:Rm,color_pars_fragment:Cm,color_pars_vertex:Pm,color_vertex:Lm,common:Dm,cube_uv_reflection_fragment:Im,defaultnormal_vertex:Fm,displacementmap_pars_vertex:Nm,displacementmap_vertex:Um,emissivemap_fragment:Om,emissivemap_pars_fragment:km,colorspace_fragment:zm,colorspace_pars_fragment:Bm,envmap_fragment:Hm,envmap_common_pars_fragment:Gm,envmap_pars_fragment:Vm,envmap_pars_vertex:Wm,envmap_physical_pars_fragment:tg,envmap_vertex:qm,fog_vertex:jm,fog_pars_vertex:Xm,fog_fragment:Ym,fog_pars_fragment:Km,gradientmap_pars_fragment:$m,lightmap_pars_fragment:Qm,lights_lambert_fragment:Zm,lights_lambert_pars_fragment:Jm,lights_pars_begin:eg,lights_toon_fragment:ng,lights_toon_pars_fragment:ig,lights_phong_fragment:sg,lights_phong_pars_fragment:rg,lights_physical_fragment:ag,lights_physical_pars_fragment:og,lights_fragment_begin:cg,lights_fragment_maps:lg,lights_fragment_end:hg,logdepthbuf_fragment:ug,logdepthbuf_pars_fragment:dg,logdepthbuf_pars_vertex:fg,logdepthbuf_vertex:pg,map_fragment:mg,map_pars_fragment:gg,map_particle_fragment:_g,map_particle_pars_fragment:vg,metalnessmap_fragment:bg,metalnessmap_pars_fragment:yg,morphinstance_vertex:xg,morphcolor_vertex:Mg,morphnormal_vertex:Sg,morphtarget_pars_vertex:wg,morphtarget_vertex:Tg,normal_fragment_begin:Eg,normal_fragment_maps:Ag,normal_pars_fragment:Rg,normal_pars_vertex:Cg,normal_vertex:Pg,normalmap_pars_fragment:Lg,clearcoat_normal_fragment_begin:Dg,clearcoat_normal_fragment_maps:Ig,clearcoat_pars_fragment:Fg,iridescence_pars_fragment:Ng,opaque_fragment:Ug,packing:Og,premultiplied_alpha_fragment:kg,project_vertex:zg,dithering_fragment:Bg,dithering_pars_fragment:Hg,roughnessmap_fragment:Gg,roughnessmap_pars_fragment:Vg,shadowmap_pars_fragment:Wg,shadowmap_pars_vertex:qg,shadowmap_vertex:jg,shadowmask_pars_fragment:Xg,skinbase_vertex:Yg,skinning_pars_vertex:Kg,skinning_vertex:$g,skinnormal_vertex:Qg,specularmap_fragment:Zg,specularmap_pars_fragment:Jg,tonemapping_fragment:e0,tonemapping_pars_fragment:t0,transmission_fragment:n0,transmission_pars_fragment:i0,uv_pars_fragment:s0,uv_pars_vertex:r0,uv_vertex:a0,worldpos_vertex:o0,background_vert:c0,background_frag:l0,backgroundCube_vert:h0,backgroundCube_frag:u0,cube_vert:d0,cube_frag:f0,depth_vert:p0,depth_frag:m0,distanceRGBA_vert:g0,distanceRGBA_frag:_0,equirect_vert:v0,equirect_frag:b0,linedashed_vert:y0,linedashed_frag:x0,meshbasic_vert:M0,meshbasic_frag:S0,meshlambert_vert:w0,meshlambert_frag:T0,meshmatcap_vert:E0,meshmatcap_frag:A0,meshnormal_vert:R0,meshnormal_frag:C0,meshphong_vert:P0,meshphong_frag:L0,meshphysical_vert:D0,meshphysical_frag:I0,meshtoon_vert:F0,meshtoon_frag:N0,points_vert:U0,points_frag:O0,shadow_vert:k0,shadow_frag:z0,sprite_vert:B0,sprite_frag:H0},de={common:{diffuse:{value:new X(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new X(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new X(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new X(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},Ln={basic:{uniforms:Yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:qe.meshbasic_vert,fragmentShader:qe.meshbasic_frag},lambert:{uniforms:Yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new X(0)}}]),vertexShader:qe.meshlambert_vert,fragmentShader:qe.meshlambert_frag},phong:{uniforms:Yt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new X(0)},specular:{value:new X(1118481)},shininess:{value:30}}]),vertexShader:qe.meshphong_vert,fragmentShader:qe.meshphong_frag},standard:{uniforms:Yt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new X(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag},toon:{uniforms:Yt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new X(0)}}]),vertexShader:qe.meshtoon_vert,fragmentShader:qe.meshtoon_frag},matcap:{uniforms:Yt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:qe.meshmatcap_vert,fragmentShader:qe.meshmatcap_frag},points:{uniforms:Yt([de.points,de.fog]),vertexShader:qe.points_vert,fragmentShader:qe.points_frag},dashed:{uniforms:Yt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qe.linedashed_vert,fragmentShader:qe.linedashed_frag},depth:{uniforms:Yt([de.common,de.displacementmap]),vertexShader:qe.depth_vert,fragmentShader:qe.depth_frag},normal:{uniforms:Yt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:qe.meshnormal_vert,fragmentShader:qe.meshnormal_frag},sprite:{uniforms:Yt([de.sprite,de.fog]),vertexShader:qe.sprite_vert,fragmentShader:qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qe.background_vert,fragmentShader:qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:qe.backgroundCube_vert,fragmentShader:qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qe.cube_vert,fragmentShader:qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qe.equirect_vert,fragmentShader:qe.equirect_frag},distanceRGBA:{uniforms:Yt([de.common,de.displacementmap,{referencePosition:{value:new b},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qe.distanceRGBA_vert,fragmentShader:qe.distanceRGBA_frag},shadow:{uniforms:Yt([de.lights,de.fog,{color:{value:new X(0)},opacity:{value:1}}]),vertexShader:qe.shadow_vert,fragmentShader:qe.shadow_frag}};Ln.physical={uniforms:Yt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new X(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new X(0)},specularColor:{value:new X(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:qe.meshphysical_vert,fragmentShader:qe.meshphysical_frag};const Br={r:0,b:0,g:0},Si=new Wt,G0=new Ne;function V0(r,e,t,n,i,s,a){const o=new X(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function m(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?t:e).get(x)),x}function _(y){let x=!1;const v=m(y);v===null?p(o,c):v&&v.isColor&&(p(v,1),x=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,a):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(y,x){const v=m(x);v&&(v.isCubeTexture||v.mapping===Ta)?(h===void 0&&(h=new pe(new gt(1,1,1),new Tt({name:"BackgroundCubeMaterial",uniforms:vs(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Si.copy(x.backgroundRotation),Si.x*=-1,Si.y*=-1,Si.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(G0.makeRotationFromEuler(Si)),h.material.toneMapped=$e.getTransfer(v.colorSpace)!==at,(u!==v||d!==v.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=r.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new pe(new Es(2,2),new Tt({name:"BackgroundMaterial",uniforms:vs(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=$e.getTransfer(v.colorSpace)!==at,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,f=r.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Br,Pd(r)),n.buffers.color.setClear(Br.r,Br.g,Br.b,x,a)}return{getClearColor:function(){return o},setClearColor:function(y,x=1){o.set(y),c=x,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(o,c)},render:_,addToRenderList:g}}function W0(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,a=!1;function o(M,C,U,F,I){let B=!1;const z=u(F,U,C);s!==z&&(s=z,l(s.object)),B=f(M,F,U,I),B&&m(M,F,U,I),I!==null&&e.update(I,r.ELEMENT_ARRAY_BUFFER),(B||a)&&(a=!1,v(M,C,U,F),I!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function c(){return r.createVertexArray()}function l(M){return r.bindVertexArray(M)}function h(M){return r.deleteVertexArray(M)}function u(M,C,U){const F=U.wireframe===!0;let I=n[M.id];I===void 0&&(I={},n[M.id]=I);let B=I[C.id];B===void 0&&(B={},I[C.id]=B);let z=B[F];return z===void 0&&(z=d(c()),B[F]=z),z}function d(M){const C=[],U=[],F=[];for(let I=0;I<t;I++)C[I]=0,U[I]=0,F[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:U,attributeDivisors:F,object:M,attributes:{},index:null}}function f(M,C,U,F){const I=s.attributes,B=C.attributes;let z=0;const V=U.getAttributes();for(const H in V)if(V[H].location>=0){const ie=I[H];let re=B[H];if(re===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(re=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(re=M.instanceColor)),ie===void 0||ie.attribute!==re||re&&ie.data!==re.data)return!0;z++}return s.attributesNum!==z||s.index!==F}function m(M,C,U,F){const I={},B=C.attributes;let z=0;const V=U.getAttributes();for(const H in V)if(V[H].location>=0){let ie=B[H];ie===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(ie=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(ie=M.instanceColor));const re={};re.attribute=ie,ie&&ie.data&&(re.data=ie.data),I[H]=re,z++}s.attributes=I,s.attributesNum=z,s.index=F}function _(){const M=s.newAttributes;for(let C=0,U=M.length;C<U;C++)M[C]=0}function g(M){p(M,0)}function p(M,C){const U=s.newAttributes,F=s.enabledAttributes,I=s.attributeDivisors;U[M]=1,F[M]===0&&(r.enableVertexAttribArray(M),F[M]=1),I[M]!==C&&(r.vertexAttribDivisor(M,C),I[M]=C)}function y(){const M=s.newAttributes,C=s.enabledAttributes;for(let U=0,F=C.length;U<F;U++)C[U]!==M[U]&&(r.disableVertexAttribArray(U),C[U]=0)}function x(M,C,U,F,I,B,z){z===!0?r.vertexAttribIPointer(M,C,U,I,B):r.vertexAttribPointer(M,C,U,F,I,B)}function v(M,C,U,F){_();const I=F.attributes,B=U.getAttributes(),z=C.defaultAttributeValues;for(const V in B){const H=B[V];if(H.location>=0){let J=I[V];if(J===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(J=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(J=M.instanceColor)),J!==void 0){const ie=J.normalized,re=J.itemSize,ye=e.get(J);if(ye===void 0)continue;const Ie=ye.buffer,W=ye.type,te=ye.bytesPerElement,ve=W===r.INT||W===r.UNSIGNED_INT||J.gpuType===Wc;if(J.isInterleavedBufferAttribute){const he=J.data,De=he.stride,ke=J.offset;if(he.isInstancedInterleavedBuffer){for(let Fe=0;Fe<H.locationSize;Fe++)p(H.location+Fe,he.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Fe=0;Fe<H.locationSize;Fe++)g(H.location+Fe);r.bindBuffer(r.ARRAY_BUFFER,Ie);for(let Fe=0;Fe<H.locationSize;Fe++)x(H.location+Fe,re/H.locationSize,W,ie,De*te,(ke+re/H.locationSize*Fe)*te,ve)}else{if(J.isInstancedBufferAttribute){for(let he=0;he<H.locationSize;he++)p(H.location+he,J.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let he=0;he<H.locationSize;he++)g(H.location+he);r.bindBuffer(r.ARRAY_BUFFER,Ie);for(let he=0;he<H.locationSize;he++)x(H.location+he,re/H.locationSize,W,ie,re*te,re/H.locationSize*he*te,ve)}}else if(z!==void 0){const ie=z[V];if(ie!==void 0)switch(ie.length){case 2:r.vertexAttrib2fv(H.location,ie);break;case 3:r.vertexAttrib3fv(H.location,ie);break;case 4:r.vertexAttrib4fv(H.location,ie);break;default:r.vertexAttrib1fv(H.location,ie)}}}}y()}function P(){L();for(const M in n){const C=n[M];for(const U in C){const F=C[U];for(const I in F)h(F[I].object),delete F[I];delete C[U]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const C=n[M.id];for(const U in C){const F=C[U];for(const I in F)h(F[I].object),delete F[I];delete C[U]}delete n[M.id]}function E(M){for(const C in n){const U=n[C];if(U[M.id]===void 0)continue;const F=U[M.id];for(const I in F)h(F[I].object),delete F[I];delete U[M.id]}}function L(){S(),a=!0,s!==i&&(s=i,l(s.object))}function S(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:L,resetDefaultState:S,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:E,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function q0(r,e,t){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)a(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];t.update(m,n,1)}}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function j0(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(E){return!(E!==gn&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const L=E===Nn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==ti&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==wn&&!L)}function c(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),P=m>0,A=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:P,maxSamples:A}}function X0(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Ai,o=new Ve,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||m===null||m.length===0||s&&!g)s?h(null):l();else{const y=s?0:n,x=y*4;let v=p.clippingState||null;c.value=v,v=h(m,d,x,f);for(let P=0;P!==x;++P)v[P]=t[P];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=f+_*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let x=0,v=f;x!==_;++x,v+=4)a.copy(u[x]).applyMatrix4(y,o),a.normal.toArray(g,v),g[v+3]=a.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function Y0(r){let e=new WeakMap;function t(a,o){return o===Jo?a.mapping=fs:o===ec&&(a.mapping=ps),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Jo||o===ec)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new rm(c.height);return l.fromEquirectangularTexture(r,a),e.set(a,l),a.addEventListener("dispose",i),t(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class gr extends Ld{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ss=4,th=[.125,.215,.35,.446,.526,.582],Pi=20,ro=new gr,nh=new X;let ao=null,oo=0,co=0,lo=!1;const Ri=(1+Math.sqrt(5))/2,Zi=1/Ri,ih=[new b(-Ri,Zi,0),new b(Ri,Zi,0),new b(-Zi,0,Ri),new b(Zi,0,Ri),new b(0,Ri,-Zi),new b(0,Ri,Zi),new b(-1,1,-1),new b(1,1,-1),new b(-1,1,1),new b(1,1,1)];class Cc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ao=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ah(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ao,oo,co),this._renderer.xr.enabled=lo,e.scissorTest=!1,Hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===fs||e.mapping===ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ao=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),co=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:Nn,format:gn,colorSpace:Qt,depthBuffer:!1},i=sh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sh(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=K0(s)),this._blurMaterial=$0(s,e,t)}return i}_compileMaterial(e){const t=new pe(this._lodPlanes[0],e);this._renderer.compile(t,ro)}_sceneToCubeUV(e,t,n,i){const o=new Kt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(nh),h.toneMapping=Zn,h.autoClear=!1;const f=new xt({name:"PMREM.Background",side:Gt,depthWrite:!1,depthTest:!1}),m=new pe(new gt,f);let _=!1;const g=e.background;g?g.isColor&&(f.color.copy(g),e.background=null,_=!0):(f.color.copy(nh),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):y===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const x=this._cubeSize;Hr(i,y*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(m,o),h.render(e,o)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=g}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===fs||e.mapping===ps;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=ah()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new pe(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Hr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ro)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=ih[(i-s-1)%ih.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new pe(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Pi-1),_=s/m,g=isFinite(s)?1+Math.floor(h*_):Pi;g>Pi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Pi}`);const p=[];let y=0;for(let E=0;E<Pi;++E){const L=E/_,S=Math.exp(-L*L/2);p.push(S),E===0?y+=S:E<g&&(y+=2*S)}for(let E=0;E<p.length;E++)p[E]=p[E]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-n;const v=this._sizeLods[i],P=3*v*(i>x-ss?i-x+ss:0),A=4*(this._cubeSize-v);Hr(t,P,A,3*v,2*v),c.setRenderTarget(t),c.render(u,ro)}}function K0(r){const e=[],t=[],n=[];let i=r;const s=r-ss+1+th.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>r-ss?c=th[a-r+ss-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),x=new Float32Array(g*m*f),v=new Float32Array(p*m*f);for(let A=0;A<f;A++){const E=A%3*2/3-1,L=A>2?0:-1,S=[E,L,0,E+2/3,L,0,E+2/3,L+1,0,E,L,0,E+2/3,L+1,0,E,L+1,0];y.set(S,_*m*A),x.set(d,g*m*A);const M=[A,A,A,A,A,A];v.set(M,p*m*A)}const P=new vt;P.setAttribute("position",new lt(y,_)),P.setAttribute("uv",new lt(x,g)),P.setAttribute("faceIndex",new lt(v,p)),e.push(P),i>ss&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function sh(r,e,t){const n=new an(r,e,t);return n.texture.mapping=Ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hr(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function $0(r,e,t){const n=new Float32Array(Pi),i=new b(0,1,0);return new Tt({name:"SphericalGaussianBlur",defines:{n:Pi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Jc(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function rh(){return new Tt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Jc(),fragmentShader:`

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
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function ah(){return new Tt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Jc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Jc(){return`

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
	`}function Q0(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Jo||c===ec,h=c===fs||c===ps;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Cc(r)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new Cc(r)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function i(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Z0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ks("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function J0(r,e,t,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const m in d.attributes)e.remove(d.attributes[m]);for(const m in d.morphAttributes){const _=d.morphAttributes[m];for(let g=0,p=_.length;g<p;g++)e.remove(_[g])}d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const m in d)e.update(d[m],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const m in f){const _=f[m];for(let g=0,p=_.length;g<p;g++)e.update(_[g],r.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let x=0,v=y.length;x<v;x+=3){const P=y[x+0],A=y[x+1],E=y[x+2];d.push(P,A,A,E,E,P)}}else if(m!==void 0){const y=m.array;_=m.version;for(let x=0,v=y.length/3-1;x<v;x+=3){const P=x+0,A=x+1,E=x+2;d.push(P,A,A,E,E,P)}}else return;const g=new(Sd(d)?Cd:Rd)(d,1);g.version=_;const p=s.get(u);p&&e.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function e_(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,f){r.drawElements(n,f,s,d*a),t.update(f,n,1)}function l(d,f,m){m!==0&&(r.drawElementsInstanced(n,f,s,d*a,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,_){if(m===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];t.update(p,n,1)}}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function t_(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function n_(r,e,t){const n=new WeakMap,i=new tt;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let M=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let v=0;m===!0&&(v=1),_===!0&&(v=2),g===!0&&(v=3);let P=o.attributes.position.count*v,A=1;P>e.maxTextureSize&&(A=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const E=new Float32Array(P*A*4*u),L=new Td(E,P,A,u);L.type=wn,L.needsUpdate=!0;const S=v*4;for(let C=0;C<u;C++){const U=p[C],F=y[C],I=x[C],B=P*A*4*C;for(let z=0;z<U.count;z++){const V=z*S;m===!0&&(i.fromBufferAttribute(U,z),E[B+V+0]=i.x,E[B+V+1]=i.y,E[B+V+2]=i.z,E[B+V+3]=0),_===!0&&(i.fromBufferAttribute(F,z),E[B+V+4]=i.x,E[B+V+5]=i.y,E[B+V+6]=i.z,E[B+V+7]=0),g===!0&&(i.fromBufferAttribute(I,z),E[B+V+8]=i.x,E[B+V+9]=i.y,E[B+V+10]=i.z,E[B+V+11]=I.itemSize===4?i.w:1)}}d={count:u,texture:L,size:new ne(P,A)},n.set(o,d),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let m=0;for(let g=0;g<l.length;g++)m+=l[g];const _=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(r,"morphTargetBaseInfluence",_),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function i_(r,e,t,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),i.get(c)!==l&&(t.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}class Fd extends Et{constructor(e,t,n,i,s,a,o,c,l,h=ls){if(h!==ls&&h!==gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ls&&(n=Fi),n===void 0&&h===gs&&(n=ms),super(null,i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:$t,this.minFilter=c!==void 0?c:$t,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Nd=new Et,oh=new Fd(1,1),Ud=new Td,Od=new Wp,kd=new Dd,ch=[],lh=[],hh=new Float32Array(16),uh=new Float32Array(9),dh=new Float32Array(4);function As(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=ch[i];if(s===void 0&&(s=new Float32Array(i),ch[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function At(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Rt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ra(r,e){let t=lh[e];t===void 0&&(t=new Int32Array(e),lh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function s_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function r_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2fv(this.addr,e),Rt(t,e)}}function a_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;r.uniform3fv(this.addr,e),Rt(t,e)}}function o_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4fv(this.addr,e),Rt(t,e)}}function c_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;dh.set(n),r.uniformMatrix2fv(this.addr,!1,dh),Rt(t,n)}}function l_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;uh.set(n),r.uniformMatrix3fv(this.addr,!1,uh),Rt(t,n)}}function h_(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(At(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,n))return;hh.set(n),r.uniformMatrix4fv(this.addr,!1,hh),Rt(t,n)}}function u_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function d_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2iv(this.addr,e),Rt(t,e)}}function f_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;r.uniform3iv(this.addr,e),Rt(t,e)}}function p_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4iv(this.addr,e),Rt(t,e)}}function m_(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function g_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;r.uniform2uiv(this.addr,e),Rt(t,e)}}function __(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;r.uniform3uiv(this.addr,e),Rt(t,e)}}function v_(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;r.uniform4uiv(this.addr,e),Rt(t,e)}}function b_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(oh.compareFunction=Md,s=oh):s=Nd,t.setTexture2D(e||s,i)}function y_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Od,i)}function x_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||kd,i)}function M_(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ud,i)}function S_(r){switch(r){case 5126:return s_;case 35664:return r_;case 35665:return a_;case 35666:return o_;case 35674:return c_;case 35675:return l_;case 35676:return h_;case 5124:case 35670:return u_;case 35667:case 35671:return d_;case 35668:case 35672:return f_;case 35669:case 35673:return p_;case 5125:return m_;case 36294:return g_;case 36295:return __;case 36296:return v_;case 35678:case 36198:case 36298:case 36306:case 35682:return b_;case 35679:case 36299:case 36307:return y_;case 35680:case 36300:case 36308:case 36293:return x_;case 36289:case 36303:case 36311:case 36292:return M_}}function w_(r,e){r.uniform1fv(this.addr,e)}function T_(r,e){const t=As(e,this.size,2);r.uniform2fv(this.addr,t)}function E_(r,e){const t=As(e,this.size,3);r.uniform3fv(this.addr,t)}function A_(r,e){const t=As(e,this.size,4);r.uniform4fv(this.addr,t)}function R_(r,e){const t=As(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function C_(r,e){const t=As(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function P_(r,e){const t=As(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function L_(r,e){r.uniform1iv(this.addr,e)}function D_(r,e){r.uniform2iv(this.addr,e)}function I_(r,e){r.uniform3iv(this.addr,e)}function F_(r,e){r.uniform4iv(this.addr,e)}function N_(r,e){r.uniform1uiv(this.addr,e)}function U_(r,e){r.uniform2uiv(this.addr,e)}function O_(r,e){r.uniform3uiv(this.addr,e)}function k_(r,e){r.uniform4uiv(this.addr,e)}function z_(r,e,t){const n=this.cache,i=e.length,s=Ra(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Nd,s[a])}function B_(r,e,t){const n=this.cache,i=e.length,s=Ra(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Od,s[a])}function H_(r,e,t){const n=this.cache,i=e.length,s=Ra(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||kd,s[a])}function G_(r,e,t){const n=this.cache,i=e.length,s=Ra(t,i);At(n,s)||(r.uniform1iv(this.addr,s),Rt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Ud,s[a])}function V_(r){switch(r){case 5126:return w_;case 35664:return T_;case 35665:return E_;case 35666:return A_;case 35674:return R_;case 35675:return C_;case 35676:return P_;case 5124:case 35670:return L_;case 35667:case 35671:return D_;case 35668:case 35672:return I_;case 35669:case 35673:return F_;case 5125:return N_;case 36294:return U_;case 36295:return O_;case 36296:return k_;case 35678:case 36198:case 36298:case 36306:case 35682:return z_;case 35679:case 36299:case 36307:return B_;case 35680:case 36300:case 36308:case 36293:return H_;case 36289:case 36303:case 36311:case 36292:return G_}}class W_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=S_(t.type)}}class q_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=V_(t.type)}}class j_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const ho=/(\w+)(\])?(\[|\.)?/g;function fh(r,e){r.seq.push(e),r.map[e.id]=e}function X_(r,e,t){const n=r.name,i=n.length;for(ho.lastIndex=0;;){const s=ho.exec(n),a=ho.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){fh(t,l===void 0?new W_(o,r,e):new q_(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new j_(o),fh(t,u)),t=u}}}class pa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);X_(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function ph(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Y_=37297;let K_=0;function $_(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const mh=new Ve;function Q_(r){$e._getMatrix(mh,$e.workingColorSpace,r);const e=`mat3( ${mh.elements.map(t=>t.toFixed(4))} )`;switch($e.getTransfer(r)){case Ea:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function gh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+$_(r.getShaderSource(e),a)}else return i}function Z_(r,e){const t=Q_(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function J_(r,e){let t;switch(e){case sd:t="Linear";break;case rd:t="Reinhard";break;case ad:t="Cineon";break;case Vc:t="ACESFilmic";break;case od:t="AgX";break;case cd:t="Neutral";break;case sp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Gr=new b;function ev(){$e.getLuminanceCoefficients(Gr);const r=Gr.x.toFixed(4),e=Gr.y.toFixed(4),t=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function tv(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter($s).join(`
`)}function nv(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function iv(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function $s(r){return r!==""}function _h(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const sv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pc(r){return r.replace(sv,av)}const rv=new Map;function av(r,e){let t=qe[e];if(t===void 0){const n=rv.get(e);if(n!==void 0)t=qe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Pc(t)}const ov=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bh(r){return r.replace(ov,cv)}function cv(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function yh(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function lv(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===td?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===nd?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Xn&&(e="SHADOWMAP_TYPE_VSM"),e}function hv(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case fs:case ps:e="ENVMAP_TYPE_CUBE";break;case Ta:e="ENVMAP_TYPE_CUBE_UV";break}return e}function uv(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ps:e="ENVMAP_MODE_REFRACTION";break}return e}function dv(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case id:e="ENVMAP_BLENDING_MULTIPLY";break;case np:e="ENVMAP_BLENDING_MIX";break;case ip:e="ENVMAP_BLENDING_ADD";break}return e}function fv(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function pv(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=lv(t),l=hv(t),h=uv(t),u=dv(t),d=fv(t),f=tv(t),m=nv(s),_=i.createProgram();let g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter($s).join(`
`),p.length>0&&(p+=`
`)):(g=[yh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter($s).join(`
`),p=[yh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?qe.tonemapping_pars_fragment:"",t.toneMapping!==Zn?J_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",qe.colorspace_pars_fragment,Z_("linearToOutputTexel",t.outputColorSpace),ev(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter($s).join(`
`)),a=Pc(a),a=_h(a,t),a=vh(a,t),o=Pc(o),o=_h(o,t),o=vh(o,t),a=bh(a),o=bh(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Il?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+g+a,v=y+p+o,P=ph(i,i.VERTEX_SHADER,x),A=ph(i,i.FRAGMENT_SHADER,v);i.attachShader(_,P),i.attachShader(_,A),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function E(C){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(_).trim(),F=i.getShaderInfoLog(P).trim(),I=i.getShaderInfoLog(A).trim();let B=!0,z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(B=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,P,A);else{const V=gh(i,P,"vertex"),H=gh(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+U+`
`+V+`
`+H)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(F===""||I==="")&&(z=!1);z&&(C.diagnostics={runnable:B,programLog:U,vertexShader:{log:F,prefix:g},fragmentShader:{log:I,prefix:p}})}i.deleteShader(P),i.deleteShader(A),L=new pa(i,_),S=iv(i,_)}let L;this.getUniforms=function(){return L===void 0&&E(this),L};let S;this.getAttributes=function(){return S===void 0&&E(this),S};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Y_)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=K_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=A,this}let mv=0;class gv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _v(e),t.set(e,n)),n}}class _v{constructor(e){this.id=mv++,this.code=e,this.usedTimes=0}}function vv(r,e,t,n,i,s,a){const o=new Ed,c=new gv,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return l.add(S),S===0?"uv":`uv${S}`}function g(S,M,C,U,F){const I=U.fog,B=F.geometry,z=S.isMeshStandardMaterial?U.environment:null,V=(S.isMeshStandardMaterial?t:e).get(S.envMap||z),H=V&&V.mapping===Ta?V.image.height:null,J=m[S.type];S.precision!==null&&(f=i.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const ie=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,re=ie!==void 0?ie.length:0;let ye=0;B.morphAttributes.position!==void 0&&(ye=1),B.morphAttributes.normal!==void 0&&(ye=2),B.morphAttributes.color!==void 0&&(ye=3);let Ie,W,te,ve;if(J){const rt=Ln[J];Ie=rt.vertexShader,W=rt.fragmentShader}else Ie=S.vertexShader,W=S.fragmentShader,c.update(S),te=c.getVertexShaderID(S),ve=c.getFragmentShaderID(S);const he=r.getRenderTarget(),De=r.state.buffers.depth.getReversed(),ke=F.isInstancedMesh===!0,Fe=F.isBatchedMesh===!0,Ye=!!S.map,Z=!!S.matcap,oe=!!V,D=!!S.aoMap,Pe=!!S.lightMap,se=!!S.bumpMap,Se=!!S.normalMap,ue=!!S.displacementMap,Ue=!!S.emissiveMap,xe=!!S.metalnessMap,R=!!S.roughnessMap,w=S.anisotropy>0,G=S.clearcoat>0,K=S.dispersion>0,ee=S.iridescence>0,$=S.sheen>0,Ee=S.transmission>0,fe=w&&!!S.anisotropyMap,Me=G&&!!S.clearcoatMap,Ke=G&&!!S.clearcoatNormalMap,ae=G&&!!S.clearcoatRoughnessMap,we=ee&&!!S.iridescenceMap,Oe=ee&&!!S.iridescenceThicknessMap,ze=$&&!!S.sheenColorMap,Te=$&&!!S.sheenRoughnessMap,Ze=!!S.specularMap,We=!!S.specularColorMap,ut=!!S.specularIntensityMap,N=Ee&&!!S.transmissionMap,me=Ee&&!!S.thicknessMap,Y=!!S.gradientMap,Q=!!S.alphaMap,be=S.alphaTest>0,ge=!!S.alphaHash,He=!!S.extensions;let bt=Zn;S.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(bt=r.toneMapping);const Ot={shaderID:J,shaderType:S.type,shaderName:S.name,vertexShader:Ie,fragmentShader:W,defines:S.defines,customVertexShaderID:te,customFragmentShaderID:ve,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:Fe,batchingColor:Fe&&F._colorsTexture!==null,instancing:ke,instancingColor:ke&&F.instanceColor!==null,instancingMorph:ke&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?r.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Qt,alphaToCoverage:!!S.alphaToCoverage,map:Ye,matcap:Z,envMap:oe,envMapMode:oe&&V.mapping,envMapCubeUVHeight:H,aoMap:D,lightMap:Pe,bumpMap:se,normalMap:Se,displacementMap:d&&ue,emissiveMap:Ue,normalMapObjectSpace:Se&&S.normalMapType===hp,normalMapTangentSpace:Se&&S.normalMapType===xd,metalnessMap:xe,roughnessMap:R,anisotropy:w,anisotropyMap:fe,clearcoat:G,clearcoatMap:Me,clearcoatNormalMap:Ke,clearcoatRoughnessMap:ae,dispersion:K,iridescence:ee,iridescenceMap:we,iridescenceThicknessMap:Oe,sheen:$,sheenColorMap:ze,sheenRoughnessMap:Te,specularMap:Ze,specularColorMap:We,specularIntensityMap:ut,transmission:Ee,transmissionMap:N,thicknessMap:me,gradientMap:Y,opaque:S.transparent===!1&&S.blending===cs&&S.alphaToCoverage===!1,alphaMap:Q,alphaTest:be,alphaHash:ge,combine:S.combine,mapUv:Ye&&_(S.map.channel),aoMapUv:D&&_(S.aoMap.channel),lightMapUv:Pe&&_(S.lightMap.channel),bumpMapUv:se&&_(S.bumpMap.channel),normalMapUv:Se&&_(S.normalMap.channel),displacementMapUv:ue&&_(S.displacementMap.channel),emissiveMapUv:Ue&&_(S.emissiveMap.channel),metalnessMapUv:xe&&_(S.metalnessMap.channel),roughnessMapUv:R&&_(S.roughnessMap.channel),anisotropyMapUv:fe&&_(S.anisotropyMap.channel),clearcoatMapUv:Me&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:Ke&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:Oe&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:ze&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:Te&&_(S.sheenRoughnessMap.channel),specularMapUv:Ze&&_(S.specularMap.channel),specularColorMapUv:We&&_(S.specularColorMap.channel),specularIntensityMapUv:ut&&_(S.specularIntensityMap.channel),transmissionMapUv:N&&_(S.transmissionMap.channel),thicknessMapUv:me&&_(S.thicknessMap.channel),alphaMapUv:Q&&_(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Se||w),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!B.attributes.uv&&(Ye||Q),fog:!!I,useFog:S.fog===!0,fogExp2:!!I&&I.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:De,skinning:F.isSkinnedMesh===!0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:ye,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:r.shadowMap.enabled&&C.length>0,shadowMapType:r.shadowMap.type,toneMapping:bt,decodeVideoTexture:Ye&&S.map.isVideoTexture===!0&&$e.getTransfer(S.map.colorSpace)===at,decodeVideoTextureEmissive:Ue&&S.emissiveMap.isVideoTexture===!0&&$e.getTransfer(S.emissiveMap.colorSpace)===at,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Nt,flipSided:S.side===Gt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:He&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&S.extensions.multiDraw===!0||Fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Ot.vertexUv1s=l.has(1),Ot.vertexUv2s=l.has(2),Ot.vertexUv3s=l.has(3),l.clear(),Ot}function p(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const C in S.defines)M.push(C),M.push(S.defines[C]);return S.isRawShaderMaterial===!1&&(y(M,S),x(M,S),M.push(r.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function y(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function x(S,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),S.push(o.mask)}function v(S){const M=m[S.type];let C;if(M){const U=Ln[M];C=lr.clone(U.uniforms)}else C=S.uniforms;return C}function P(S,M){let C;for(let U=0,F=h.length;U<F;U++){const I=h[U];if(I.cacheKey===M){C=I,++C.usedTimes;break}}return C===void 0&&(C=new pv(r,M,S,s),h.push(C)),C}function A(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function E(S){c.remove(S)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:P,releaseProgram:A,releaseShaderCache:E,programs:h,dispose:L}}function bv(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function yv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function xh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Mh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,m,_,g){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),e++,p}function o(u,d,f,m,_,g){const p=a(u,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,m,_,g){const p=a(u,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||yv),n.length>1&&n.sort(d||xh),i.length>1&&i.sort(d||xh)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:c,finish:h,sort:l}}function xv(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Mh,r.set(n,[a])):i>=s.length?(a=new Mh,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function Mv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new b,color:new X};break;case"SpotLight":t={position:new b,direction:new b,color:new X,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new b,color:new X,distance:0,decay:0};break;case"HemisphereLight":t={direction:new b,skyColor:new X,groundColor:new X};break;case"RectAreaLight":t={color:new X,position:new b,halfWidth:new b,halfHeight:new b};break}return r[e.id]=t,t}}}function Sv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let wv=0;function Tv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Ev(r){const e=new Mv,t=Sv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new b);const i=new b,s=new Ne,a=new Ne;function o(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,x=0,v=0,P=0,A=0,E=0;l.sort(Tv);for(let S=0,M=l.length;S<M;S++){const C=l[S],U=C.color,F=C.intensity,I=C.distance,B=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)h+=U.r*F,u+=U.g*F,d+=U.b*F;else if(C.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(C.sh.coefficients[z],F);E++}else if(C.isDirectionalLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const V=C.shadow,H=t.get(C);H.shadowIntensity=V.intensity,H.shadowBias=V.bias,H.shadowNormalBias=V.normalBias,H.shadowRadius=V.radius,H.shadowMapSize=V.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=B,n.directionalShadowMatrix[f]=C.shadow.matrix,y++}n.directional[f]=z,f++}else if(C.isSpotLight){const z=e.get(C);z.position.setFromMatrixPosition(C.matrixWorld),z.color.copy(U).multiplyScalar(F),z.distance=I,z.coneCos=Math.cos(C.angle),z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),z.decay=C.decay,n.spot[_]=z;const V=C.shadow;if(C.map&&(n.spotLightMap[P]=C.map,P++,V.updateMatrices(C),C.castShadow&&A++),n.spotLightMatrix[_]=V.matrix,C.castShadow){const H=t.get(C);H.shadowIntensity=V.intensity,H.shadowBias=V.bias,H.shadowNormalBias=V.normalBias,H.shadowRadius=V.radius,H.shadowMapSize=V.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=B,v++}_++}else if(C.isRectAreaLight){const z=e.get(C);z.color.copy(U).multiplyScalar(F),z.halfWidth.set(C.width*.5,0,0),z.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=z,g++}else if(C.isPointLight){const z=e.get(C);if(z.color.copy(C.color).multiplyScalar(C.intensity),z.distance=C.distance,z.decay=C.decay,C.castShadow){const V=C.shadow,H=t.get(C);H.shadowIntensity=V.intensity,H.shadowBias=V.bias,H.shadowNormalBias=V.normalBias,H.shadowRadius=V.radius,H.shadowMapSize=V.mapSize,H.shadowCameraNear=V.camera.near,H.shadowCameraFar=V.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=B,n.pointShadowMatrix[m]=C.shadow.matrix,x++}n.point[m]=z,m++}else if(C.isHemisphereLight){const z=e.get(C);z.skyColor.copy(C.color).multiplyScalar(F),z.groundColor.copy(C.groundColor).multiplyScalar(F),n.hemi[p]=z,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const L=n.hash;(L.directionalLength!==f||L.pointLength!==m||L.spotLength!==_||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==y||L.numPointShadows!==x||L.numSpotShadows!==v||L.numSpotMaps!==P||L.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+P-A,n.spotLightMap.length=P,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=E,L.directionalLength=f,L.pointLength=m,L.spotLength=_,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=y,L.numPointShadows=x,L.numSpotShadows=v,L.numSpotMaps=P,L.numLightProbes=E,n.version=wv++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const x=l[p];if(x.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),u++}else if(x.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(g),f++}else if(x.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),a.identity(),s.copy(x.matrixWorld),s.premultiply(g),a.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(a),v.halfHeight.applyMatrix4(a),m++}else if(x.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(g),d++}else if(x.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:o,setupView:c,state:n}}function Sh(r){const e=new Ev(r),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function s(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function Av(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Sh(r),e.set(i,[o])):s>=a.length?(o=new Sh(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Rv extends Tn{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cv extends Tn{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Pv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Lv=`uniform sampler2D shadow_pass;
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
}`;function Dv(r,e,t){let n=new Zc;const i=new ne,s=new ne,a=new tt,o=new Rv({depthPacking:lp}),c=new Cv,l={},h=t.maxTextureSize,u={[En]:Gt,[Gt]:En,[Nt]:Nt},d=new Tt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:Pv,fragmentShader:Lv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new vt;m.setAttribute("position",new lt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new pe(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=td;let p=this.type;this.render=function(A,E,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const S=r.getRenderTarget(),M=r.getActiveCubeFace(),C=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Qn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const F=p!==Xn&&this.type===Xn,I=p===Xn&&this.type!==Xn;for(let B=0,z=A.length;B<z;B++){const V=A[B],H=V.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const J=H.getFrameExtents();if(i.multiply(J),s.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/J.x),i.x=s.x*J.x,H.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/J.y),i.y=s.y*J.y,H.mapSize.y=s.y)),H.map===null||F===!0||I===!0){const re=this.type!==Xn?{minFilter:$t,magFilter:$t}:{};H.map!==null&&H.map.dispose(),H.map=new an(i.x,i.y,re),H.map.texture.name=V.name+".shadowMap",H.camera.updateProjectionMatrix()}r.setRenderTarget(H.map),r.clear();const ie=H.getViewportCount();for(let re=0;re<ie;re++){const ye=H.getViewport(re);a.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),U.viewport(a),H.updateMatrices(V,re),n=H.getFrustum(),v(E,L,H.camera,V,this.type)}H.isPointLightShadow!==!0&&this.type===Xn&&y(H,L),H.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(S,M,C)};function y(A,E){const L=e.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new an(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,r.setRenderTarget(A.mapPass),r.clear(),r.renderBufferDirect(E,null,L,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,r.setRenderTarget(A.map),r.clear(),r.renderBufferDirect(E,null,L,f,_,null)}function x(A,E,L,S){let M=null;const C=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(C!==void 0)M=C;else if(M=L.isPointLight===!0?c:o,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const U=M.uuid,F=E.uuid;let I=l[U];I===void 0&&(I={},l[U]=I);let B=I[F];B===void 0&&(B=M.clone(),I[F]=B,E.addEventListener("dispose",P)),M=B}if(M.visible=E.visible,M.wireframe=E.wireframe,S===Xn?M.side=E.shadowSide!==null?E.shadowSide:E.side:M.side=E.shadowSide!==null?E.shadowSide:u[E.side],M.alphaMap=E.alphaMap,M.alphaTest=E.alphaTest,M.map=E.map,M.clipShadows=E.clipShadows,M.clippingPlanes=E.clippingPlanes,M.clipIntersection=E.clipIntersection,M.displacementMap=E.displacementMap,M.displacementScale=E.displacementScale,M.displacementBias=E.displacementBias,M.wireframeLinewidth=E.wireframeLinewidth,M.linewidth=E.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const U=r.properties.get(M);U.light=L}return M}function v(A,E,L,S,M){if(A.visible===!1)return;if(A.layers.test(E.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Xn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const F=e.update(A),I=A.material;if(Array.isArray(I)){const B=F.groups;for(let z=0,V=B.length;z<V;z++){const H=B[z],J=I[H.materialIndex];if(J&&J.visible){const ie=x(A,J,S,M);A.onBeforeShadow(r,A,E,L,F,ie,H),r.renderBufferDirect(L,null,F,ie,A,H),A.onAfterShadow(r,A,E,L,F,ie,H)}}}else if(I.visible){const B=x(A,I,S,M);A.onBeforeShadow(r,A,E,L,F,B,null),r.renderBufferDirect(L,null,F,B,A,null),A.onAfterShadow(r,A,E,L,F,B,null)}}const U=A.children;for(let F=0,I=U.length;F<I;F++)v(U[F],E,L,S,M)}function P(A){A.target.removeEventListener("dispose",P);for(const L in l){const S=l[L],M=A.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const Iv={[jo]:Xo,[Yo]:Qo,[Ko]:Zo,[ds]:$o,[Xo]:jo,[Qo]:Yo,[Zo]:Ko,[$o]:ds};function Fv(r,e){function t(){let N=!1;const me=new tt;let Y=null;const Q=new tt(0,0,0,0);return{setMask:function(be){Y!==be&&!N&&(r.colorMask(be,be,be,be),Y=be)},setLocked:function(be){N=be},setClear:function(be,ge,He,bt,Ot){Ot===!0&&(be*=bt,ge*=bt,He*=bt),me.set(be,ge,He,bt),Q.equals(me)===!1&&(r.clearColor(be,ge,He,bt),Q.copy(me))},reset:function(){N=!1,Y=null,Q.set(-1,0,0,0)}}}function n(){let N=!1,me=!1,Y=null,Q=null,be=null;return{setReversed:function(ge){if(me!==ge){const He=e.get("EXT_clip_control");me?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT);const bt=be;be=null,this.setClear(bt)}me=ge},getReversed:function(){return me},setTest:function(ge){ge?he(r.DEPTH_TEST):De(r.DEPTH_TEST)},setMask:function(ge){Y!==ge&&!N&&(r.depthMask(ge),Y=ge)},setFunc:function(ge){if(me&&(ge=Iv[ge]),Q!==ge){switch(ge){case jo:r.depthFunc(r.NEVER);break;case Xo:r.depthFunc(r.ALWAYS);break;case Yo:r.depthFunc(r.LESS);break;case ds:r.depthFunc(r.LEQUAL);break;case Ko:r.depthFunc(r.EQUAL);break;case $o:r.depthFunc(r.GEQUAL);break;case Qo:r.depthFunc(r.GREATER);break;case Zo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Q=ge}},setLocked:function(ge){N=ge},setClear:function(ge){be!==ge&&(me&&(ge=1-ge),r.clearDepth(ge),be=ge)},reset:function(){N=!1,Y=null,Q=null,be=null,me=!1}}}function i(){let N=!1,me=null,Y=null,Q=null,be=null,ge=null,He=null,bt=null,Ot=null;return{setTest:function(rt){N||(rt?he(r.STENCIL_TEST):De(r.STENCIL_TEST))},setMask:function(rt){me!==rt&&!N&&(r.stencilMask(rt),me=rt)},setFunc:function(rt,vn,zn){(Y!==rt||Q!==vn||be!==zn)&&(r.stencilFunc(rt,vn,zn),Y=rt,Q=vn,be=zn)},setOp:function(rt,vn,zn){(ge!==rt||He!==vn||bt!==zn)&&(r.stencilOp(rt,vn,zn),ge=rt,He=vn,bt=zn)},setLocked:function(rt){N=rt},setClear:function(rt){Ot!==rt&&(r.clearStencil(rt),Ot=rt)},reset:function(){N=!1,me=null,Y=null,Q=null,be=null,ge=null,He=null,bt=null,Ot=null}}}const s=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,x=null,v=null,P=null,A=null,E=new X(0,0,0),L=0,S=!1,M=null,C=null,U=null,F=null,I=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,V=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(H)[1]),z=V>=1):H.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),z=V>=2);let J=null,ie={};const re=r.getParameter(r.SCISSOR_BOX),ye=r.getParameter(r.VIEWPORT),Ie=new tt().fromArray(re),W=new tt().fromArray(ye);function te(N,me,Y,Q){const be=new Uint8Array(4),ge=r.createTexture();r.bindTexture(N,ge),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let He=0;He<Y;He++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(me,0,r.RGBA,1,1,Q,0,r.RGBA,r.UNSIGNED_BYTE,be):r.texImage2D(me+He,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,be);return ge}const ve={};ve[r.TEXTURE_2D]=te(r.TEXTURE_2D,r.TEXTURE_2D,1),ve[r.TEXTURE_CUBE_MAP]=te(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[r.TEXTURE_2D_ARRAY]=te(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ve[r.TEXTURE_3D]=te(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),he(r.DEPTH_TEST),a.setFunc(ds),se(!1),Se(Tl),he(r.CULL_FACE),D(Qn);function he(N){h[N]!==!0&&(r.enable(N),h[N]=!0)}function De(N){h[N]!==!1&&(r.disable(N),h[N]=!1)}function ke(N,me){return u[N]!==me?(r.bindFramebuffer(N,me),u[N]=me,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=me),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=me),!0):!1}function Fe(N,me){let Y=f,Q=!1;if(N){Y=d.get(me),Y===void 0&&(Y=[],d.set(me,Y));const be=N.textures;if(Y.length!==be.length||Y[0]!==r.COLOR_ATTACHMENT0){for(let ge=0,He=be.length;ge<He;ge++)Y[ge]=r.COLOR_ATTACHMENT0+ge;Y.length=be.length,Q=!0}}else Y[0]!==r.BACK&&(Y[0]=r.BACK,Q=!0);Q&&r.drawBuffers(Y)}function Ye(N){return m!==N?(r.useProgram(N),m=N,!0):!1}const Z={[Ci]:r.FUNC_ADD,[zf]:r.FUNC_SUBTRACT,[Bf]:r.FUNC_REVERSE_SUBTRACT};Z[Hf]=r.MIN,Z[Gf]=r.MAX;const oe={[Vf]:r.ZERO,[Wf]:r.ONE,[qf]:r.SRC_COLOR,[Wo]:r.SRC_ALPHA,[Qf]:r.SRC_ALPHA_SATURATE,[Kf]:r.DST_COLOR,[Xf]:r.DST_ALPHA,[jf]:r.ONE_MINUS_SRC_COLOR,[qo]:r.ONE_MINUS_SRC_ALPHA,[$f]:r.ONE_MINUS_DST_COLOR,[Yf]:r.ONE_MINUS_DST_ALPHA,[Zf]:r.CONSTANT_COLOR,[Jf]:r.ONE_MINUS_CONSTANT_COLOR,[ep]:r.CONSTANT_ALPHA,[tp]:r.ONE_MINUS_CONSTANT_ALPHA};function D(N,me,Y,Q,be,ge,He,bt,Ot,rt){if(N===Qn){_===!0&&(De(r.BLEND),_=!1);return}if(_===!1&&(he(r.BLEND),_=!0),N!==kf){if(N!==g||rt!==S){if((p!==Ci||v!==Ci)&&(r.blendEquation(r.FUNC_ADD),p=Ci,v=Ci),rt)switch(N){case cs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ut:r.blendFunc(r.ONE,r.ONE);break;case El:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Al:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case cs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Ut:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case El:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Al:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}y=null,x=null,P=null,A=null,E.set(0,0,0),L=0,g=N,S=rt}return}be=be||me,ge=ge||Y,He=He||Q,(me!==p||be!==v)&&(r.blendEquationSeparate(Z[me],Z[be]),p=me,v=be),(Y!==y||Q!==x||ge!==P||He!==A)&&(r.blendFuncSeparate(oe[Y],oe[Q],oe[ge],oe[He]),y=Y,x=Q,P=ge,A=He),(bt.equals(E)===!1||Ot!==L)&&(r.blendColor(bt.r,bt.g,bt.b,Ot),E.copy(bt),L=Ot),g=N,S=!1}function Pe(N,me){N.side===Nt?De(r.CULL_FACE):he(r.CULL_FACE);let Y=N.side===Gt;me&&(Y=!Y),se(Y),N.blending===cs&&N.transparent===!1?D(Qn):D(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const Q=N.stencilWrite;o.setTest(Q),Q&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ue(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?he(r.SAMPLE_ALPHA_TO_COVERAGE):De(r.SAMPLE_ALPHA_TO_COVERAGE)}function se(N){M!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),M=N)}function Se(N){N!==Uf?(he(r.CULL_FACE),N!==C&&(N===Tl?r.cullFace(r.BACK):N===Of?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):De(r.CULL_FACE),C=N}function ue(N){N!==U&&(z&&r.lineWidth(N),U=N)}function Ue(N,me,Y){N?(he(r.POLYGON_OFFSET_FILL),(F!==me||I!==Y)&&(r.polygonOffset(me,Y),F=me,I=Y)):De(r.POLYGON_OFFSET_FILL)}function xe(N){N?he(r.SCISSOR_TEST):De(r.SCISSOR_TEST)}function R(N){N===void 0&&(N=r.TEXTURE0+B-1),J!==N&&(r.activeTexture(N),J=N)}function w(N,me,Y){Y===void 0&&(J===null?Y=r.TEXTURE0+B-1:Y=J);let Q=ie[Y];Q===void 0&&(Q={type:void 0,texture:void 0},ie[Y]=Q),(Q.type!==N||Q.texture!==me)&&(J!==Y&&(r.activeTexture(Y),J=Y),r.bindTexture(N,me||ve[N]),Q.type=N,Q.texture=me)}function G(){const N=ie[J];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function K(){try{r.compressedTexImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ee(){try{r.compressedTexImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $(){try{r.texSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{r.texSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function fe(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Me(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ke(){try{r.texStorage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{r.texStorage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function we(){try{r.texImage2D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Oe(){try{r.texImage3D.apply(r,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ze(N){Ie.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Ie.copy(N))}function Te(N){W.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),W.copy(N))}function Ze(N,me){let Y=l.get(me);Y===void 0&&(Y=new WeakMap,l.set(me,Y));let Q=Y.get(N);Q===void 0&&(Q=r.getUniformBlockIndex(me,N.name),Y.set(N,Q))}function We(N,me){const Q=l.get(me).get(N);c.get(me)!==Q&&(r.uniformBlockBinding(me,Q,N.__bindingPointIndex),c.set(me,Q))}function ut(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},J=null,ie={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,x=null,v=null,P=null,A=null,E=new X(0,0,0),L=0,S=!1,M=null,C=null,U=null,F=null,I=null,Ie.set(0,0,r.canvas.width,r.canvas.height),W.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:he,disable:De,bindFramebuffer:ke,drawBuffers:Fe,useProgram:Ye,setBlending:D,setMaterial:Pe,setFlipSided:se,setCullFace:Se,setLineWidth:ue,setPolygonOffset:Ue,setScissorTest:xe,activeTexture:R,bindTexture:w,unbindTexture:G,compressedTexImage2D:K,compressedTexImage3D:ee,texImage2D:we,texImage3D:Oe,updateUBOMapping:Ze,uniformBlockBinding:We,texStorage2D:Ke,texStorage3D:ae,texSubImage2D:$,texSubImage3D:Ee,compressedTexSubImage2D:fe,compressedTexSubImage3D:Me,scissor:ze,viewport:Te,reset:ut}}function wh(r,e,t,n){const i=Nv(n);switch(t){case pd:return r*e;case gd:return r*e;case _d:return r*e*2;case Xc:return r*e/i.components*i.byteLength;case Yc:return r*e/i.components*i.byteLength;case vd:return r*e*2/i.components*i.byteLength;case Kc:return r*e*2/i.components*i.byteLength;case md:return r*e*3/i.components*i.byteLength;case gn:return r*e*4/i.components*i.byteLength;case $c:return r*e*4/i.components*i.byteLength;case la:case ha:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ua:case da:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case nc:case sc:return Math.max(r,16)*Math.max(e,8)/4;case tc:case ic:return Math.max(r,8)*Math.max(e,8)/2;case rc:case ac:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case oc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case cc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case lc:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case hc:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case uc:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case dc:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case fc:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case pc:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case mc:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case gc:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case _c:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case vc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case bc:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case yc:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case xc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case fa:case Mc:case Sc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case bd:case wc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Tc:case Ec:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Nv(r){switch(r){case ti:case ud:return{byteLength:1,components:1};case rr:case dd:case Nn:return{byteLength:2,components:1};case qc:case jc:return{byteLength:2,components:4};case Fi:case Wc:case wn:return{byteLength:4,components:1};case fd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function Uv(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ne,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(R,w){return f?new OffscreenCanvas(R,w):cr("canvas")}function _(R,w,G){let K=1;const ee=xe(R);if((ee.width>G||ee.height>G)&&(K=G/Math.max(ee.width,ee.height)),K<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const $=Math.floor(K*ee.width),Ee=Math.floor(K*ee.height);u===void 0&&(u=m($,Ee));const fe=w?m($,Ee):u;return fe.width=$,fe.height=Ee,fe.getContext("2d").drawImage(R,0,0,$,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+$+"x"+Ee+")."),fe}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),R;return R}function g(R){return R.generateMipmaps}function p(R){r.generateMipmap(R)}function y(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(R,w,G,K,ee=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let $=w;if(w===r.RED&&(G===r.FLOAT&&($=r.R32F),G===r.HALF_FLOAT&&($=r.R16F),G===r.UNSIGNED_BYTE&&($=r.R8)),w===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.R8UI),G===r.UNSIGNED_SHORT&&($=r.R16UI),G===r.UNSIGNED_INT&&($=r.R32UI),G===r.BYTE&&($=r.R8I),G===r.SHORT&&($=r.R16I),G===r.INT&&($=r.R32I)),w===r.RG&&(G===r.FLOAT&&($=r.RG32F),G===r.HALF_FLOAT&&($=r.RG16F),G===r.UNSIGNED_BYTE&&($=r.RG8)),w===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RG8UI),G===r.UNSIGNED_SHORT&&($=r.RG16UI),G===r.UNSIGNED_INT&&($=r.RG32UI),G===r.BYTE&&($=r.RG8I),G===r.SHORT&&($=r.RG16I),G===r.INT&&($=r.RG32I)),w===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RGB8UI),G===r.UNSIGNED_SHORT&&($=r.RGB16UI),G===r.UNSIGNED_INT&&($=r.RGB32UI),G===r.BYTE&&($=r.RGB8I),G===r.SHORT&&($=r.RGB16I),G===r.INT&&($=r.RGB32I)),w===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&($=r.RGBA8UI),G===r.UNSIGNED_SHORT&&($=r.RGBA16UI),G===r.UNSIGNED_INT&&($=r.RGBA32UI),G===r.BYTE&&($=r.RGBA8I),G===r.SHORT&&($=r.RGBA16I),G===r.INT&&($=r.RGBA32I)),w===r.RGB&&G===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),w===r.RGBA){const Ee=ee?Ea:$e.getTransfer(K);G===r.FLOAT&&($=r.RGBA32F),G===r.HALF_FLOAT&&($=r.RGBA16F),G===r.UNSIGNED_BYTE&&($=Ee===at?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function v(R,w){let G;return R?w===null||w===Fi||w===ms?G=r.DEPTH24_STENCIL8:w===wn?G=r.DEPTH32F_STENCIL8:w===rr&&(G=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===Fi||w===ms?G=r.DEPTH_COMPONENT24:w===wn?G=r.DEPTH_COMPONENT32F:w===rr&&(G=r.DEPTH_COMPONENT16),G}function P(R,w){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==$t&&R.minFilter!==sn?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function A(R){const w=R.target;w.removeEventListener("dispose",A),L(w),w.isVideoTexture&&h.delete(w)}function E(R){const w=R.target;w.removeEventListener("dispose",E),M(w)}function L(R){const w=n.get(R);if(w.__webglInit===void 0)return;const G=R.source,K=d.get(G);if(K){const ee=K[w.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&S(R),Object.keys(K).length===0&&d.delete(G)}n.remove(R)}function S(R){const w=n.get(R);r.deleteTexture(w.__webglTexture);const G=R.source,K=d.get(G);delete K[w.__cacheKey],a.memory.textures--}function M(R){const w=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(w.__webglFramebuffer[K]))for(let ee=0;ee<w.__webglFramebuffer[K].length;ee++)r.deleteFramebuffer(w.__webglFramebuffer[K][ee]);else r.deleteFramebuffer(w.__webglFramebuffer[K]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[K])}else{if(Array.isArray(w.__webglFramebuffer))for(let K=0;K<w.__webglFramebuffer.length;K++)r.deleteFramebuffer(w.__webglFramebuffer[K]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let K=0;K<w.__webglColorRenderbuffer.length;K++)w.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[K]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const G=R.textures;for(let K=0,ee=G.length;K<ee;K++){const $=n.get(G[K]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),a.memory.textures--),n.remove(G[K])}n.remove(R)}let C=0;function U(){C=0}function F(){const R=C;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),C+=1,R}function I(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.colorSpace),w.join()}function B(R,w){const G=n.get(R);if(R.isVideoTexture&&ue(R),R.isRenderTargetTexture===!1&&R.version>0&&G.__version!==R.version){const K=R.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(G,R,w);return}}t.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+w)}function z(R,w){const G=n.get(R);if(R.version>0&&G.__version!==R.version){W(G,R,w);return}t.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+w)}function V(R,w){const G=n.get(R);if(R.version>0&&G.__version!==R.version){W(G,R,w);return}t.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+w)}function H(R,w){const G=n.get(R);if(R.version>0&&G.__version!==R.version){te(G,R,w);return}t.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+w)}const J={[Ii]:r.REPEAT,[gi]:r.CLAMP_TO_EDGE,[ga]:r.MIRRORED_REPEAT},ie={[$t]:r.NEAREST,[hd]:r.NEAREST_MIPMAP_NEAREST,[Ys]:r.NEAREST_MIPMAP_LINEAR,[sn]:r.LINEAR,[ca]:r.LINEAR_MIPMAP_NEAREST,[In]:r.LINEAR_MIPMAP_LINEAR},re={[up]:r.NEVER,[_p]:r.ALWAYS,[dp]:r.LESS,[Md]:r.LEQUAL,[fp]:r.EQUAL,[gp]:r.GEQUAL,[pp]:r.GREATER,[mp]:r.NOTEQUAL};function ye(R,w){if(w.type===wn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===sn||w.magFilter===ca||w.magFilter===Ys||w.magFilter===In||w.minFilter===sn||w.minFilter===ca||w.minFilter===Ys||w.minFilter===In)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,J[w.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,J[w.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,J[w.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,ie[w.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,ie[w.minFilter]),w.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,re[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===$t||w.minFilter!==Ys&&w.minFilter!==In||w.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function Ie(R,w){let G=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",A));const K=w.source;let ee=d.get(K);ee===void 0&&(ee={},d.set(K,ee));const $=I(w);if($!==R.__cacheKey){ee[$]===void 0&&(ee[$]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,G=!0),ee[$].usedTimes++;const Ee=ee[R.__cacheKey];Ee!==void 0&&(ee[R.__cacheKey].usedTimes--,Ee.usedTimes===0&&S(w)),R.__cacheKey=$,R.__webglTexture=ee[$].texture}return G}function W(R,w,G){let K=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(K=r.TEXTURE_3D);const ee=Ie(R,w),$=w.source;t.bindTexture(K,R.__webglTexture,r.TEXTURE0+G);const Ee=n.get($);if($.version!==Ee.__version||ee===!0){t.activeTexture(r.TEXTURE0+G);const fe=$e.getPrimaries($e.workingColorSpace),Me=w.colorSpace===mi?null:$e.getPrimaries(w.colorSpace),Ke=w.colorSpace===mi||fe===Me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ke);let ae=_(w.image,!1,i.maxTextureSize);ae=Ue(w,ae);const we=s.convert(w.format,w.colorSpace),Oe=s.convert(w.type);let ze=x(w.internalFormat,we,Oe,w.colorSpace,w.isVideoTexture);ye(K,w);let Te;const Ze=w.mipmaps,We=w.isVideoTexture!==!0,ut=Ee.__version===void 0||ee===!0,N=$.dataReady,me=P(w,ae);if(w.isDepthTexture)ze=v(w.format===gs,w.type),ut&&(We?t.texStorage2D(r.TEXTURE_2D,1,ze,ae.width,ae.height):t.texImage2D(r.TEXTURE_2D,0,ze,ae.width,ae.height,0,we,Oe,null));else if(w.isDataTexture)if(Ze.length>0){We&&ut&&t.texStorage2D(r.TEXTURE_2D,me,ze,Ze[0].width,Ze[0].height);for(let Y=0,Q=Ze.length;Y<Q;Y++)Te=Ze[Y],We?N&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Te.width,Te.height,we,Oe,Te.data):t.texImage2D(r.TEXTURE_2D,Y,ze,Te.width,Te.height,0,we,Oe,Te.data);w.generateMipmaps=!1}else We?(ut&&t.texStorage2D(r.TEXTURE_2D,me,ze,ae.width,ae.height),N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ae.width,ae.height,we,Oe,ae.data)):t.texImage2D(r.TEXTURE_2D,0,ze,ae.width,ae.height,0,we,Oe,ae.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){We&&ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,me,ze,Ze[0].width,Ze[0].height,ae.depth);for(let Y=0,Q=Ze.length;Y<Q;Y++)if(Te=Ze[Y],w.format!==gn)if(we!==null)if(We){if(N)if(w.layerUpdates.size>0){const be=wh(Te.width,Te.height,w.format,w.type);for(const ge of w.layerUpdates){const He=Te.data.subarray(ge*be/Te.data.BYTES_PER_ELEMENT,(ge+1)*be/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,ge,Te.width,Te.height,1,we,He)}w.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,Te.width,Te.height,ae.depth,we,Te.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Y,ze,Te.width,Te.height,ae.depth,0,Te.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Y,0,0,0,Te.width,Te.height,ae.depth,we,Oe,Te.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Y,ze,Te.width,Te.height,ae.depth,0,we,Oe,Te.data)}else{We&&ut&&t.texStorage2D(r.TEXTURE_2D,me,ze,Ze[0].width,Ze[0].height);for(let Y=0,Q=Ze.length;Y<Q;Y++)Te=Ze[Y],w.format!==gn?we!==null?We?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,Y,0,0,Te.width,Te.height,we,Te.data):t.compressedTexImage2D(r.TEXTURE_2D,Y,ze,Te.width,Te.height,0,Te.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?N&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,Te.width,Te.height,we,Oe,Te.data):t.texImage2D(r.TEXTURE_2D,Y,ze,Te.width,Te.height,0,we,Oe,Te.data)}else if(w.isDataArrayTexture)if(We){if(ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,me,ze,ae.width,ae.height,ae.depth),N)if(w.layerUpdates.size>0){const Y=wh(ae.width,ae.height,w.format,w.type);for(const Q of w.layerUpdates){const be=ae.data.subarray(Q*Y/ae.data.BYTES_PER_ELEMENT,(Q+1)*Y/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Q,ae.width,ae.height,1,we,Oe,be)}w.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,we,Oe,ae.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,ze,ae.width,ae.height,ae.depth,0,we,Oe,ae.data);else if(w.isData3DTexture)We?(ut&&t.texStorage3D(r.TEXTURE_3D,me,ze,ae.width,ae.height,ae.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,we,Oe,ae.data)):t.texImage3D(r.TEXTURE_3D,0,ze,ae.width,ae.height,ae.depth,0,we,Oe,ae.data);else if(w.isFramebufferTexture){if(ut)if(We)t.texStorage2D(r.TEXTURE_2D,me,ze,ae.width,ae.height);else{let Y=ae.width,Q=ae.height;for(let be=0;be<me;be++)t.texImage2D(r.TEXTURE_2D,be,ze,Y,Q,0,we,Oe,null),Y>>=1,Q>>=1}}else if(Ze.length>0){if(We&&ut){const Y=xe(Ze[0]);t.texStorage2D(r.TEXTURE_2D,me,ze,Y.width,Y.height)}for(let Y=0,Q=Ze.length;Y<Q;Y++)Te=Ze[Y],We?N&&t.texSubImage2D(r.TEXTURE_2D,Y,0,0,we,Oe,Te):t.texImage2D(r.TEXTURE_2D,Y,ze,we,Oe,Te);w.generateMipmaps=!1}else if(We){if(ut){const Y=xe(ae);t.texStorage2D(r.TEXTURE_2D,me,ze,Y.width,Y.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,we,Oe,ae)}else t.texImage2D(r.TEXTURE_2D,0,ze,we,Oe,ae);g(w)&&p(K),Ee.__version=$.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function te(R,w,G){if(w.image.length!==6)return;const K=Ie(R,w),ee=w.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+G);const $=n.get(ee);if(ee.version!==$.__version||K===!0){t.activeTexture(r.TEXTURE0+G);const Ee=$e.getPrimaries($e.workingColorSpace),fe=w.colorSpace===mi?null:$e.getPrimaries(w.colorSpace),Me=w.colorSpace===mi||Ee===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Me);const Ke=w.isCompressedTexture||w.image[0].isCompressedTexture,ae=w.image[0]&&w.image[0].isDataTexture,we=[];for(let Q=0;Q<6;Q++)!Ke&&!ae?we[Q]=_(w.image[Q],!0,i.maxCubemapSize):we[Q]=ae?w.image[Q].image:w.image[Q],we[Q]=Ue(w,we[Q]);const Oe=we[0],ze=s.convert(w.format,w.colorSpace),Te=s.convert(w.type),Ze=x(w.internalFormat,ze,Te,w.colorSpace),We=w.isVideoTexture!==!0,ut=$.__version===void 0||K===!0,N=ee.dataReady;let me=P(w,Oe);ye(r.TEXTURE_CUBE_MAP,w);let Y;if(Ke){We&&ut&&t.texStorage2D(r.TEXTURE_CUBE_MAP,me,Ze,Oe.width,Oe.height);for(let Q=0;Q<6;Q++){Y=we[Q].mipmaps;for(let be=0;be<Y.length;be++){const ge=Y[be];w.format!==gn?ze!==null?We?N&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,ge.width,ge.height,ze,ge.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Ze,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,0,0,ge.width,ge.height,ze,Te,ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be,Ze,ge.width,ge.height,0,ze,Te,ge.data)}}}else{if(Y=w.mipmaps,We&&ut){Y.length>0&&me++;const Q=xe(we[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,me,Ze,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(ae){We?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,we[Q].width,we[Q].height,ze,Te,we[Q].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ze,we[Q].width,we[Q].height,0,ze,Te,we[Q].data);for(let be=0;be<Y.length;be++){const He=Y[be].image[Q].image;We?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,He.width,He.height,ze,Te,He.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Ze,He.width,He.height,0,ze,Te,He.data)}}else{We?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ze,Te,we[Q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ze,ze,Te,we[Q]);for(let be=0;be<Y.length;be++){const ge=Y[be];We?N&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,0,0,ze,Te,ge.image[Q]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Q,be+1,Ze,ze,Te,ge.image[Q])}}}g(w)&&p(r.TEXTURE_CUBE_MAP),$.__version=ee.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function ve(R,w,G,K,ee,$){const Ee=s.convert(G.format,G.colorSpace),fe=s.convert(G.type),Me=x(G.internalFormat,Ee,fe,G.colorSpace),Ke=n.get(w),ae=n.get(G);if(ae.__renderTarget=w,!Ke.__hasExternalTextures){const we=Math.max(1,w.width>>$),Oe=Math.max(1,w.height>>$);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,$,Me,we,Oe,w.depth,0,Ee,fe,null):t.texImage2D(ee,$,Me,we,Oe,0,Ee,fe,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),Se(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,ee,ae.__webglTexture,0,se(w)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,ee,ae.__webglTexture,$),t.bindFramebuffer(r.FRAMEBUFFER,null)}function he(R,w,G){if(r.bindRenderbuffer(r.RENDERBUFFER,R),w.depthBuffer){const K=w.depthTexture,ee=K&&K.isDepthTexture?K.type:null,$=v(w.stencilBuffer,ee),Ee=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,fe=se(w);Se(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,fe,$,w.width,w.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,fe,$,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,$,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ee,r.RENDERBUFFER,R)}else{const K=w.textures;for(let ee=0;ee<K.length;ee++){const $=K[ee],Ee=s.convert($.format,$.colorSpace),fe=s.convert($.type),Me=x($.internalFormat,Ee,fe,$.colorSpace),Ke=se(w);G&&Se(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ke,Me,w.width,w.height):Se(w)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ke,Me,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,Me,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function De(R,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=n.get(w.depthTexture);K.__renderTarget=w,(!K.__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),B(w.depthTexture,0);const ee=K.__webglTexture,$=se(w);if(w.depthTexture.format===ls)Se(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ee,0);else if(w.depthTexture.format===gs)Se(w)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function ke(R){const w=n.get(R),G=R.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==R.depthTexture){const K=R.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),K){const ee=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,K.removeEventListener("dispose",ee)};K.addEventListener("dispose",ee),w.__depthDisposeCallback=ee}w.__boundDepthTexture=K}if(R.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");De(w.__webglFramebuffer,R)}else if(G){w.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[K]),w.__webglDepthbuffer[K]===void 0)w.__webglDepthbuffer[K]=r.createRenderbuffer(),he(w.__webglDepthbuffer[K],R,!1);else{const ee=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=w.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,$)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=r.createRenderbuffer(),he(w.__webglDepthbuffer,R,!1);else{const K=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ee=w.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ee),r.framebufferRenderbuffer(r.FRAMEBUFFER,K,r.RENDERBUFFER,ee)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function Fe(R,w,G){const K=n.get(R);w!==void 0&&ve(K.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&ke(R)}function Ye(R){const w=R.texture,G=n.get(R),K=n.get(w);R.addEventListener("dispose",E);const ee=R.textures,$=R.isWebGLCubeRenderTarget===!0,Ee=ee.length>1;if(Ee||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=w.version,a.memory.textures++),$){G.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[fe]=[];for(let Me=0;Me<w.mipmaps.length;Me++)G.__webglFramebuffer[fe][Me]=r.createFramebuffer()}else G.__webglFramebuffer[fe]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let fe=0;fe<w.mipmaps.length;fe++)G.__webglFramebuffer[fe]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(Ee)for(let fe=0,Me=ee.length;fe<Me;fe++){const Ke=n.get(ee[fe]);Ke.__webglTexture===void 0&&(Ke.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&Se(R)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let fe=0;fe<ee.length;fe++){const Me=ee[fe];G.__webglColorRenderbuffer[fe]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[fe]);const Ke=s.convert(Me.format,Me.colorSpace),ae=s.convert(Me.type),we=x(Me.internalFormat,Ke,ae,Me.colorSpace,R.isXRRenderTarget===!0),Oe=se(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Oe,we,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+fe,r.RENDERBUFFER,G.__webglColorRenderbuffer[fe])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),he(G.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){t.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),ye(r.TEXTURE_CUBE_MAP,w);for(let fe=0;fe<6;fe++)if(w.mipmaps&&w.mipmaps.length>0)for(let Me=0;Me<w.mipmaps.length;Me++)ve(G.__webglFramebuffer[fe][Me],R,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Me);else ve(G.__webglFramebuffer[fe],R,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);g(w)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let fe=0,Me=ee.length;fe<Me;fe++){const Ke=ee[fe],ae=n.get(Ke);t.bindTexture(r.TEXTURE_2D,ae.__webglTexture),ye(r.TEXTURE_2D,Ke),ve(G.__webglFramebuffer,R,Ke,r.COLOR_ATTACHMENT0+fe,r.TEXTURE_2D,0),g(Ke)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let fe=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(fe=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(fe,K.__webglTexture),ye(fe,w),w.mipmaps&&w.mipmaps.length>0)for(let Me=0;Me<w.mipmaps.length;Me++)ve(G.__webglFramebuffer[Me],R,w,r.COLOR_ATTACHMENT0,fe,Me);else ve(G.__webglFramebuffer,R,w,r.COLOR_ATTACHMENT0,fe,0);g(w)&&p(fe),t.unbindTexture()}R.depthBuffer&&ke(R)}function Z(R){const w=R.textures;for(let G=0,K=w.length;G<K;G++){const ee=w[G];if(g(ee)){const $=y(R),Ee=n.get(ee).__webglTexture;t.bindTexture($,Ee),p($),t.unbindTexture()}}}const oe=[],D=[];function Pe(R){if(R.samples>0){if(Se(R)===!1){const w=R.textures,G=R.width,K=R.height;let ee=r.COLOR_BUFFER_BIT;const $=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ee=n.get(R),fe=w.length>1;if(fe)for(let Me=0;Me<w.length;Me++)t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Me=0;Me<w.length;Me++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),fe){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ee.__webglColorRenderbuffer[Me]);const Ke=n.get(w[Me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ke,0)}r.blitFramebuffer(0,0,G,K,0,0,G,K,ee,r.NEAREST),c===!0&&(oe.length=0,D.length=0,oe.push(r.COLOR_ATTACHMENT0+Me),R.depthBuffer&&R.resolveDepthBuffer===!1&&(oe.push($),D.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,D)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,oe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),fe)for(let Me=0;Me<w.length;Me++){t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.RENDERBUFFER,Ee.__webglColorRenderbuffer[Me]);const Ke=n.get(w[Me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Me,r.TEXTURE_2D,Ke,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const w=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[w])}}}function se(R){return Math.min(i.maxSamples,R.samples)}function Se(R){const w=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function ue(R){const w=a.render.frame;h.get(R)!==w&&(h.set(R,w),R.update())}function Ue(R,w){const G=R.colorSpace,K=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||G!==Qt&&G!==mi&&($e.getTransfer(G)===at?(K!==gn||ee!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}function xe(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=U,this.setTexture2D=B,this.setTexture2DArray=z,this.setTexture3D=V,this.setTextureCube=H,this.rebindTextures=Fe,this.setupRenderTarget=Ye,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Se}function Ov(r,e){function t(n,i=mi){let s;const a=$e.getTransfer(i);if(n===ti)return r.UNSIGNED_BYTE;if(n===qc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===jc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===fd)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===ud)return r.BYTE;if(n===dd)return r.SHORT;if(n===rr)return r.UNSIGNED_SHORT;if(n===Wc)return r.INT;if(n===Fi)return r.UNSIGNED_INT;if(n===wn)return r.FLOAT;if(n===Nn)return r.HALF_FLOAT;if(n===pd)return r.ALPHA;if(n===md)return r.RGB;if(n===gn)return r.RGBA;if(n===gd)return r.LUMINANCE;if(n===_d)return r.LUMINANCE_ALPHA;if(n===ls)return r.DEPTH_COMPONENT;if(n===gs)return r.DEPTH_STENCIL;if(n===Xc)return r.RED;if(n===Yc)return r.RED_INTEGER;if(n===vd)return r.RG;if(n===Kc)return r.RG_INTEGER;if(n===$c)return r.RGBA_INTEGER;if(n===la||n===ha||n===ua||n===da)if(a===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===la)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ha)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===da)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===la)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ha)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ua)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===da)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===tc||n===nc||n===ic||n===sc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===tc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===nc)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ic)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===rc||n===ac||n===oc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===rc||n===ac)return a===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===oc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===cc||n===lc||n===hc||n===uc||n===dc||n===fc||n===pc||n===mc||n===gc||n===_c||n===vc||n===bc||n===yc||n===xc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===cc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===hc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===uc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===pc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===mc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===_c)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===vc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===xc)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fa||n===Mc||n===Sc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===fa)return a===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bd||n===wc||n===Tc||n===Ec)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===wc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Tc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ec)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ms?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}class kv extends Kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Xe extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zv={type:"move"};class uo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new b,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new b),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new b,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new b),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(zv)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Bv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Hv=`
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

}`;class Gv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Et,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Tt({vertexShader:Bv,fragmentShader:Hv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pe(new Es(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Vv extends Ts{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null;const _=new Gv,g=t.getContextAttributes();let p=null,y=null;const x=[],v=[],P=new ne;let A=null;const E=new Kt;E.viewport=new tt;const L=new Kt;L.viewport=new tt;const S=[E,L],M=new kv;let C=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let te=x[W];return te===void 0&&(te=new uo,x[W]=te),te.getTargetRaySpace()},this.getControllerGrip=function(W){let te=x[W];return te===void 0&&(te=new uo,x[W]=te),te.getGripSpace()},this.getHand=function(W){let te=x[W];return te===void 0&&(te=new uo,x[W]=te),te.getHandSpace()};function F(W){const te=v.indexOf(W.inputSource);if(te===-1)return;const ve=x[te];ve!==void 0&&(ve.update(W.inputSource,W.frame,l||a),ve.dispatchEvent({type:W.type,data:W.inputSource}))}function I(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",I),i.removeEventListener("inputsourceschange",B);for(let W=0;W<x.length;W++){const te=v[W];te!==null&&(v[W]=null,x[W].disconnect(te))}C=null,U=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,i=null,y=null,Ie.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",I),i.addEventListener("inputsourceschange",B),g.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(P),i.renderState.layers===void 0){const te={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,te),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new an(f.framebufferWidth,f.framebufferHeight,{format:gn,type:ti,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let te=null,ve=null,he=null;g.depth&&(he=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=g.stencil?gs:ls,ve=g.stencil?ms:Fi);const De={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(De),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new an(d.textureWidth,d.textureHeight,{format:gn,type:ti,depthTexture:new Fd(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Ie.setContext(i),Ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function B(W){for(let te=0;te<W.removed.length;te++){const ve=W.removed[te],he=v.indexOf(ve);he>=0&&(v[he]=null,x[he].disconnect(ve))}for(let te=0;te<W.added.length;te++){const ve=W.added[te];let he=v.indexOf(ve);if(he===-1){for(let ke=0;ke<x.length;ke++)if(ke>=v.length){v.push(ve),he=ke;break}else if(v[ke]===null){v[ke]=ve,he=ke;break}if(he===-1)break}const De=x[he];De&&De.connect(ve)}}const z=new b,V=new b;function H(W,te,ve){z.setFromMatrixPosition(te.matrixWorld),V.setFromMatrixPosition(ve.matrixWorld);const he=z.distanceTo(V),De=te.projectionMatrix.elements,ke=ve.projectionMatrix.elements,Fe=De[14]/(De[10]-1),Ye=De[14]/(De[10]+1),Z=(De[9]+1)/De[5],oe=(De[9]-1)/De[5],D=(De[8]-1)/De[0],Pe=(ke[8]+1)/ke[0],se=Fe*D,Se=Fe*Pe,ue=he/(-D+Pe),Ue=ue*-D;if(te.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ue),W.translateZ(ue),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),De[10]===-1)W.projectionMatrix.copy(te.projectionMatrix),W.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const xe=Fe+ue,R=Ye+ue,w=se-Ue,G=Se+(he-Ue),K=Z*Ye/R*xe,ee=oe*Ye/R*xe;W.projectionMatrix.makePerspective(w,G,K,ee,xe,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function J(W,te){te===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(te.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;let te=W.near,ve=W.far;_.texture!==null&&(_.depthNear>0&&(te=_.depthNear),_.depthFar>0&&(ve=_.depthFar)),M.near=L.near=E.near=te,M.far=L.far=E.far=ve,(C!==M.near||U!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),C=M.near,U=M.far),E.layers.mask=W.layers.mask|2,L.layers.mask=W.layers.mask|4,M.layers.mask=E.layers.mask|L.layers.mask;const he=W.parent,De=M.cameras;J(M,he);for(let ke=0;ke<De.length;ke++)J(De[ke],he);De.length===2?H(M,E,L):M.projectionMatrix.copy(E.projectionMatrix),ie(W,M,he)};function ie(W,te,ve){ve===null?W.matrix.copy(te.matrixWorld):(W.matrix.copy(ve.matrixWorld),W.matrix.invert(),W.matrix.multiply(te.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(te.projectionMatrix),W.projectionMatrixInverse.copy(te.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=_s*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(W){c=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let re=null;function ye(W,te){if(h=te.getViewerPose(l||a),m=te,h!==null){const ve=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let he=!1;ve.length!==M.cameras.length&&(M.cameras.length=0,he=!0);for(let ke=0;ke<ve.length;ke++){const Fe=ve[ke];let Ye=null;if(f!==null)Ye=f.getViewport(Fe);else{const oe=u.getViewSubImage(d,Fe);Ye=oe.viewport,ke===0&&(e.setRenderTargetTextures(y,oe.colorTexture,d.ignoreDepthValues?void 0:oe.depthStencilTexture),e.setRenderTarget(y))}let Z=S[ke];Z===void 0&&(Z=new Kt,Z.layers.enable(ke),Z.viewport=new tt,S[ke]=Z),Z.matrix.fromArray(Fe.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(Fe.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(Ye.x,Ye.y,Ye.width,Ye.height),ke===0&&(M.matrix.copy(Z.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),he===!0&&M.cameras.push(Z)}const De=i.enabledFeatures;if(De&&De.includes("depth-sensing")){const ke=u.getDepthInformation(ve[0]);ke&&ke.isValid&&ke.texture&&_.init(e,ke,i.renderState)}}for(let ve=0;ve<x.length;ve++){const he=v[ve],De=x[ve];he!==null&&De!==void 0&&De.update(he,te,l||a)}re&&re(W,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),m=null}const Ie=new Id;Ie.setAnimationLoop(ye),this.setAnimationLoop=function(W){re=W},this.dispose=function(){}}}const wi=new Wt,Wv=new Ne;function qv(r,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Pd(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,v)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?c(g,p,y,x):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Gt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Gt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const y=e.get(p),x=y.envMap,v=y.envMapRotation;x&&(g.envMap.value=x,wi.copy(v),wi.x*=-1,wi.y*=-1,wi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),g.envMapRotation.value.setFromMatrix4(Wv.makeRotationFromEuler(wi)),g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,x){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=x*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Gt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function jv(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const v=x.program;n.uniformBlockBinding(y,v)}function l(y,x){let v=i[y.id];v===void 0&&(m(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",g));const P=x.program;n.updateUBOMapping(y,P);const A=e.render.frame;s[y.id]!==A&&(d(y),s[y.id]=A)}function h(y){const x=u();y.__bindingPointIndex=x;const v=r.createBuffer(),P=y.__size,A=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,P,A),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function u(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=i[y.id],v=y.uniforms,P=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let A=0,E=v.length;A<E;A++){const L=Array.isArray(v[A])?v[A]:[v[A]];for(let S=0,M=L.length;S<M;S++){const C=L[S];if(f(C,A,S,P)===!0){const U=C.__offset,F=Array.isArray(C.value)?C.value:[C.value];let I=0;for(let B=0;B<F.length;B++){const z=F[B],V=_(z);typeof z=="number"||typeof z=="boolean"?(C.__data[0]=z,r.bufferSubData(r.UNIFORM_BUFFER,U+I,C.__data)):z.isMatrix3?(C.__data[0]=z.elements[0],C.__data[1]=z.elements[1],C.__data[2]=z.elements[2],C.__data[3]=0,C.__data[4]=z.elements[3],C.__data[5]=z.elements[4],C.__data[6]=z.elements[5],C.__data[7]=0,C.__data[8]=z.elements[6],C.__data[9]=z.elements[7],C.__data[10]=z.elements[8],C.__data[11]=0):(z.toArray(C.__data,I),I+=V.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,C.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(y,x,v,P){const A=y.value,E=x+"_"+v;if(P[E]===void 0)return typeof A=="number"||typeof A=="boolean"?P[E]=A:P[E]=A.clone(),!0;{const L=P[E];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return P[E]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function m(y){const x=y.uniforms;let v=0;const P=16;for(let E=0,L=x.length;E<L;E++){const S=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,C=S.length;M<C;M++){const U=S[M],F=Array.isArray(U.value)?U.value:[U.value];for(let I=0,B=F.length;I<B;I++){const z=F[I],V=_(z),H=v%P,J=H%V.boundary,ie=H+J;v+=J,ie!==0&&P-ie<V.storage&&(v+=P-ie),U.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=V.storage}}}const A=v%P;return A>0&&(v+=P-A),y.__size=v,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function g(y){const x=y.target;x.removeEventListener("dispose",g);const v=a.indexOf(x.__bindingPointIndex);a.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const y in i)r.deleteBuffer(i[y]);a=[],i={},s={}}return{bind:c,update:l,dispose:p}}class Xv{constructor(e={}){const{canvas:t=Up(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const y=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=yt,this.toneMapping=Zn,this.toneMappingExposure=1;const v=this;let P=!1,A=0,E=0,L=null,S=-1,M=null;const C=new tt,U=new tt;let F=null;const I=new X(0);let B=0,z=t.width,V=t.height,H=1,J=null,ie=null;const re=new tt(0,0,z,V),ye=new tt(0,0,z,V);let Ie=!1;const W=new Zc;let te=!1,ve=!1;const he=new Ne,De=new Ne,ke=new b,Fe=new tt,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Z=!1;function oe(){return L===null?H:1}let D=n;function Pe(T,O){return t.getContext(T,O)}try{const T={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gc}`),t.addEventListener("webglcontextlost",Q,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",ge,!1),D===null){const O="webgl2";if(D=Pe(O,T),D===null)throw Pe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let se,Se,ue,Ue,xe,R,w,G,K,ee,$,Ee,fe,Me,Ke,ae,we,Oe,ze,Te,Ze,We,ut,N;function me(){se=new Z0(D),se.init(),We=new Ov(D,se),Se=new j0(D,se,e,We),ue=new Fv(D,se),Se.reverseDepthBuffer&&d&&ue.buffers.depth.setReversed(!0),Ue=new t_(D),xe=new bv,R=new Uv(D,se,ue,xe,Se,We,Ue),w=new Y0(v),G=new Q0(v),K=new cm(D),ut=new W0(D,K),ee=new J0(D,K,Ue,ut),$=new i_(D,ee,K,Ue),ze=new n_(D,Se,R),ae=new X0(xe),Ee=new vv(v,w,G,se,Se,ut,ae),fe=new qv(v,xe),Me=new xv,Ke=new Av(se),Oe=new V0(v,w,G,ue,$,f,c),we=new Dv(v,$,Se),N=new jv(D,Ue,Se,ue),Te=new q0(D,se,Ue),Ze=new e_(D,se,Ue),Ue.programs=Ee.programs,v.capabilities=Se,v.extensions=se,v.properties=xe,v.renderLists=Me,v.shadowMap=we,v.state=ue,v.info=Ue}me();const Y=new Vv(v,D);this.xr=Y,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const T=se.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=se.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(T){T!==void 0&&(H=T,this.setSize(z,V,!1))},this.getSize=function(T){return T.set(z,V)},this.setSize=function(T,O,q=!0){if(Y.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=T,V=O,t.width=Math.floor(T*H),t.height=Math.floor(O*H),q===!0&&(t.style.width=T+"px",t.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(z*H,V*H).floor()},this.setDrawingBufferSize=function(T,O,q){z=T,V=O,H=q,t.width=Math.floor(T*q),t.height=Math.floor(O*q),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(C)},this.getViewport=function(T){return T.copy(re)},this.setViewport=function(T,O,q,j){T.isVector4?re.set(T.x,T.y,T.z,T.w):re.set(T,O,q,j),ue.viewport(C.copy(re).multiplyScalar(H).round())},this.getScissor=function(T){return T.copy(ye)},this.setScissor=function(T,O,q,j){T.isVector4?ye.set(T.x,T.y,T.z,T.w):ye.set(T,O,q,j),ue.scissor(U.copy(ye).multiplyScalar(H).round())},this.getScissorTest=function(){return Ie},this.setScissorTest=function(T){ue.setScissorTest(Ie=T)},this.setOpaqueSort=function(T){J=T},this.setTransparentSort=function(T){ie=T},this.getClearColor=function(T){return T.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor.apply(Oe,arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha.apply(Oe,arguments)},this.clear=function(T=!0,O=!0,q=!0){let j=0;if(T){let k=!1;if(L!==null){const ce=L.texture.format;k=ce===$c||ce===Kc||ce===Yc}if(k){const ce=L.texture.type,_e=ce===ti||ce===Fi||ce===rr||ce===ms||ce===qc||ce===jc,Ae=Oe.getClearColor(),Re=Oe.getClearAlpha(),Be=Ae.r,Ge=Ae.g,Ce=Ae.b;_e?(m[0]=Be,m[1]=Ge,m[2]=Ce,m[3]=Re,D.clearBufferuiv(D.COLOR,0,m)):(_[0]=Be,_[1]=Ge,_[2]=Ce,_[3]=Re,D.clearBufferiv(D.COLOR,0,_))}else j|=D.COLOR_BUFFER_BIT}O&&(j|=D.DEPTH_BUFFER_BIT),q&&(j|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Q,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",ge,!1),Me.dispose(),Ke.dispose(),xe.dispose(),w.dispose(),G.dispose(),$.dispose(),ut.dispose(),N.dispose(),Ee.dispose(),Y.dispose(),Y.removeEventListener("sessionstart",gl),Y.removeEventListener("sessionend",_l),vi.stop()};function Q(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const T=Ue.autoReset,O=we.enabled,q=we.autoUpdate,j=we.needsUpdate,k=we.type;me(),Ue.autoReset=T,we.enabled=O,we.autoUpdate=q,we.needsUpdate=j,we.type=k}function ge(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function He(T){const O=T.target;O.removeEventListener("dispose",He),bt(O)}function bt(T){Ot(T),xe.remove(T)}function Ot(T){const O=xe.get(T).programs;O!==void 0&&(O.forEach(function(q){Ee.releaseProgram(q)}),T.isShaderMaterial&&Ee.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,q,j,k,ce){O===null&&(O=Ye);const _e=k.isMesh&&k.matrixWorld.determinant()<0,Ae=Lf(T,O,q,j,k);ue.setMaterial(j,_e);let Re=q.index,Be=1;if(j.wireframe===!0){if(Re=ee.getWireframeAttribute(q),Re===void 0)return;Be=2}const Ge=q.drawRange,Ce=q.attributes.position;let et=Ge.start*Be,dt=(Ge.start+Ge.count)*Be;ce!==null&&(et=Math.max(et,ce.start*Be),dt=Math.min(dt,(ce.start+ce.count)*Be)),Re!==null?(et=Math.max(et,0),dt=Math.min(dt,Re.count)):Ce!=null&&(et=Math.max(et,0),dt=Math.min(dt,Ce.count));const pt=dt-et;if(pt<0||pt===1/0)return;ut.setup(k,j,Ae,q,Re);let Zt,it=Te;if(Re!==null&&(Zt=K.get(Re),it=Ze,it.setIndex(Zt)),k.isMesh)j.wireframe===!0?(ue.setLineWidth(j.wireframeLinewidth*oe()),it.setMode(D.LINES)):it.setMode(D.TRIANGLES);else if(k.isLine){let Le=j.linewidth;Le===void 0&&(Le=1),ue.setLineWidth(Le*oe()),k.isLineSegments?it.setMode(D.LINES):k.isLineLoop?it.setMode(D.LINE_LOOP):it.setMode(D.LINE_STRIP)}else k.isPoints?it.setMode(D.POINTS):k.isSprite&&it.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)it.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(se.get("WEBGL_multi_draw"))it.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Le=k._multiDrawStarts,Bn=k._multiDrawCounts,st=k._multiDrawCount,bn=Re?K.get(Re).bytesPerElement:1,ki=xe.get(j).currentProgram.getUniforms();for(let en=0;en<st;en++)ki.setValue(D,"_gl_DrawID",en),it.render(Le[en]/bn,Bn[en])}else if(k.isInstancedMesh)it.renderInstances(et,pt,k.count);else if(q.isInstancedBufferGeometry){const Le=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Bn=Math.min(q.instanceCount,Le);it.renderInstances(et,pt,Bn)}else it.render(et,pt)};function rt(T,O,q){T.transparent===!0&&T.side===Nt&&T.forceSinglePass===!1?(T.side=Gt,T.needsUpdate=!0,Mr(T,O,q),T.side=En,T.needsUpdate=!0,Mr(T,O,q),T.side=Nt):Mr(T,O,q)}this.compile=function(T,O,q=null){q===null&&(q=T),p=Ke.get(q),p.init(O),x.push(p),q.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),T!==q&&T.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();const j=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const ce=k.material;if(ce)if(Array.isArray(ce))for(let _e=0;_e<ce.length;_e++){const Ae=ce[_e];rt(Ae,q,k),j.add(Ae)}else rt(ce,q,k),j.add(ce)}),x.pop(),p=null,j},this.compileAsync=function(T,O,q=null){const j=this.compile(T,O,q);return new Promise(k=>{function ce(){if(j.forEach(function(_e){xe.get(_e).currentProgram.isReady()&&j.delete(_e)}),j.size===0){k(T);return}setTimeout(ce,10)}se.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let vn=null;function zn(T){vn&&vn(T)}function gl(){vi.stop()}function _l(){vi.start()}const vi=new Id;vi.setAnimationLoop(zn),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(T){vn=T,Y.setAnimationLoop(T),T===null?vi.stop():vi.start()},Y.addEventListener("sessionstart",gl),Y.addEventListener("sessionend",_l),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Y.enabled===!0&&Y.isPresenting===!0&&(Y.cameraAutoUpdate===!0&&Y.updateCamera(O),O=Y.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,O,L),p=Ke.get(T,x.length),p.init(O),x.push(p),De.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),W.setFromProjectionMatrix(De),ve=this.localClippingEnabled,te=ae.init(this.clippingPlanes,ve),g=Me.get(T,y.length),g.init(),y.push(g),Y.enabled===!0&&Y.isPresenting===!0){const ce=v.xr.getDepthSensingMesh();ce!==null&&Oa(ce,O,-1/0,v.sortObjects)}Oa(T,O,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(J,ie),Z=Y.enabled===!1||Y.isPresenting===!1||Y.hasDepthSensing()===!1,Z&&Oe.addToRenderList(g,T),this.info.render.frame++,te===!0&&ae.beginShadows();const q=p.state.shadowsArray;we.render(q,T,O),te===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=g.opaque,k=g.transmissive;if(p.setupLights(),O.isArrayCamera){const ce=O.cameras;if(k.length>0)for(let _e=0,Ae=ce.length;_e<Ae;_e++){const Re=ce[_e];bl(j,k,T,Re)}Z&&Oe.render(T);for(let _e=0,Ae=ce.length;_e<Ae;_e++){const Re=ce[_e];vl(g,T,Re,Re.viewport)}}else k.length>0&&bl(j,k,T,O),Z&&Oe.render(T),vl(g,T,O);L!==null&&(R.updateMultisampleRenderTarget(L),R.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(v,T,O),ut.resetDefaultState(),S=-1,M=null,x.pop(),x.length>0?(p=x[x.length-1],te===!0&&ae.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function Oa(T,O,q,j){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)q=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||W.intersectsSprite(T)){j&&Fe.setFromMatrixPosition(T.matrixWorld).applyMatrix4(De);const _e=$.update(T),Ae=T.material;Ae.visible&&g.push(T,_e,Ae,q,Fe.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||W.intersectsObject(T))){const _e=$.update(T),Ae=T.material;if(j&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Fe.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Fe.copy(_e.boundingSphere.center)),Fe.applyMatrix4(T.matrixWorld).applyMatrix4(De)),Array.isArray(Ae)){const Re=_e.groups;for(let Be=0,Ge=Re.length;Be<Ge;Be++){const Ce=Re[Be],et=Ae[Ce.materialIndex];et&&et.visible&&g.push(T,_e,et,q,Fe.z,Ce)}}else Ae.visible&&g.push(T,_e,Ae,q,Fe.z,null)}}const ce=T.children;for(let _e=0,Ae=ce.length;_e<Ae;_e++)Oa(ce[_e],O,q,j)}function vl(T,O,q,j){const k=T.opaque,ce=T.transmissive,_e=T.transparent;p.setupLightsView(q),te===!0&&ae.setGlobalState(v.clippingPlanes,q),j&&ue.viewport(C.copy(j)),k.length>0&&xr(k,O,q),ce.length>0&&xr(ce,O,q),_e.length>0&&xr(_e,O,q),ue.buffers.depth.setTest(!0),ue.buffers.depth.setMask(!0),ue.buffers.color.setMask(!0),ue.setPolygonOffset(!1)}function bl(T,O,q,j){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new an(1,1,{generateMipmaps:!0,type:se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float")?Nn:ti,minFilter:In,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const ce=p.state.transmissionRenderTarget[j.id],_e=j.viewport||C;ce.setSize(_e.z,_e.w);const Ae=v.getRenderTarget();v.setRenderTarget(ce),v.getClearColor(I),B=v.getClearAlpha(),B<1&&v.setClearColor(16777215,.5),v.clear(),Z&&Oe.render(q);const Re=v.toneMapping;v.toneMapping=Zn;const Be=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),te===!0&&ae.setGlobalState(v.clippingPlanes,j),xr(T,q,j),R.updateMultisampleRenderTarget(ce),R.updateRenderTargetMipmap(ce),se.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Ce=0,et=O.length;Ce<et;Ce++){const dt=O[Ce],pt=dt.object,Zt=dt.geometry,it=dt.material,Le=dt.group;if(it.side===Nt&&pt.layers.test(j.layers)){const Bn=it.side;it.side=Gt,it.needsUpdate=!0,yl(pt,q,j,Zt,it,Le),it.side=Bn,it.needsUpdate=!0,Ge=!0}}Ge===!0&&(R.updateMultisampleRenderTarget(ce),R.updateRenderTargetMipmap(ce))}v.setRenderTarget(Ae),v.setClearColor(I,B),Be!==void 0&&(j.viewport=Be),v.toneMapping=Re}function xr(T,O,q){const j=O.isScene===!0?O.overrideMaterial:null;for(let k=0,ce=T.length;k<ce;k++){const _e=T[k],Ae=_e.object,Re=_e.geometry,Be=j===null?_e.material:j,Ge=_e.group;Ae.layers.test(q.layers)&&yl(Ae,O,q,Re,Be,Ge)}}function yl(T,O,q,j,k,ce){T.onBeforeRender(v,O,q,j,k,ce),T.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(v,O,q,j,T,ce),k.transparent===!0&&k.side===Nt&&k.forceSinglePass===!1?(k.side=Gt,k.needsUpdate=!0,v.renderBufferDirect(q,O,j,k,T,ce),k.side=En,k.needsUpdate=!0,v.renderBufferDirect(q,O,j,k,T,ce),k.side=Nt):v.renderBufferDirect(q,O,j,k,T,ce),T.onAfterRender(v,O,q,j,k,ce)}function Mr(T,O,q){O.isScene!==!0&&(O=Ye);const j=xe.get(T),k=p.state.lights,ce=p.state.shadowsArray,_e=k.state.version,Ae=Ee.getParameters(T,k.state,ce,O,q),Re=Ee.getProgramCacheKey(Ae);let Be=j.programs;j.environment=T.isMeshStandardMaterial?O.environment:null,j.fog=O.fog,j.envMap=(T.isMeshStandardMaterial?G:w).get(T.envMap||j.environment),j.envMapRotation=j.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Be===void 0&&(T.addEventListener("dispose",He),Be=new Map,j.programs=Be);let Ge=Be.get(Re);if(Ge!==void 0){if(j.currentProgram===Ge&&j.lightsStateVersion===_e)return Ml(T,Ae),Ge}else Ae.uniforms=Ee.getUniforms(T),T.onBeforeCompile(Ae,v),Ge=Ee.acquireProgram(Ae,Re),Be.set(Re,Ge),j.uniforms=Ae.uniforms;const Ce=j.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ce.clippingPlanes=ae.uniform),Ml(T,Ae),j.needsLights=If(T),j.lightsStateVersion=_e,j.needsLights&&(Ce.ambientLightColor.value=k.state.ambient,Ce.lightProbe.value=k.state.probe,Ce.directionalLights.value=k.state.directional,Ce.directionalLightShadows.value=k.state.directionalShadow,Ce.spotLights.value=k.state.spot,Ce.spotLightShadows.value=k.state.spotShadow,Ce.rectAreaLights.value=k.state.rectArea,Ce.ltc_1.value=k.state.rectAreaLTC1,Ce.ltc_2.value=k.state.rectAreaLTC2,Ce.pointLights.value=k.state.point,Ce.pointLightShadows.value=k.state.pointShadow,Ce.hemisphereLights.value=k.state.hemi,Ce.directionalShadowMap.value=k.state.directionalShadowMap,Ce.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ce.spotShadowMap.value=k.state.spotShadowMap,Ce.spotLightMatrix.value=k.state.spotLightMatrix,Ce.spotLightMap.value=k.state.spotLightMap,Ce.pointShadowMap.value=k.state.pointShadowMap,Ce.pointShadowMatrix.value=k.state.pointShadowMatrix),j.currentProgram=Ge,j.uniformsList=null,Ge}function xl(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=pa.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function Ml(T,O){const q=xe.get(T);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function Lf(T,O,q,j,k){O.isScene!==!0&&(O=Ye),R.resetTextureUnits();const ce=O.fog,_e=j.isMeshStandardMaterial?O.environment:null,Ae=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Qt,Re=(j.isMeshStandardMaterial?G:w).get(j.envMap||_e),Be=j.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Ge=!!q.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Ce=!!q.morphAttributes.position,et=!!q.morphAttributes.normal,dt=!!q.morphAttributes.color;let pt=Zn;j.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(pt=v.toneMapping);const Zt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,it=Zt!==void 0?Zt.length:0,Le=xe.get(j),Bn=p.state.lights;if(te===!0&&(ve===!0||T!==M)){const cn=T===M&&j.id===S;ae.setState(j,T,cn)}let st=!1;j.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==Bn.state.version||Le.outputColorSpace!==Ae||k.isBatchedMesh&&Le.batching===!1||!k.isBatchedMesh&&Le.batching===!0||k.isBatchedMesh&&Le.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Le.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Le.instancing===!1||!k.isInstancedMesh&&Le.instancing===!0||k.isSkinnedMesh&&Le.skinning===!1||!k.isSkinnedMesh&&Le.skinning===!0||k.isInstancedMesh&&Le.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Le.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Le.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Le.instancingMorph===!1&&k.morphTexture!==null||Le.envMap!==Re||j.fog===!0&&Le.fog!==ce||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ae.numPlanes||Le.numIntersection!==ae.numIntersection)||Le.vertexAlphas!==Be||Le.vertexTangents!==Ge||Le.morphTargets!==Ce||Le.morphNormals!==et||Le.morphColors!==dt||Le.toneMapping!==pt||Le.morphTargetsCount!==it)&&(st=!0):(st=!0,Le.__version=j.version);let bn=Le.currentProgram;st===!0&&(bn=Mr(j,O,k));let ki=!1,en=!1,Ds=!1;const mt=bn.getUniforms(),Rn=Le.uniforms;if(ue.useProgram(bn.program)&&(ki=!0,en=!0,Ds=!0),j.id!==S&&(S=j.id,en=!0),ki||M!==T){ue.buffers.depth.getReversed()?(he.copy(T.projectionMatrix),kp(he),zp(he),mt.setValue(D,"projectionMatrix",he)):mt.setValue(D,"projectionMatrix",T.projectionMatrix),mt.setValue(D,"viewMatrix",T.matrixWorldInverse);const si=mt.map.cameraPosition;si!==void 0&&si.setValue(D,ke.setFromMatrixPosition(T.matrixWorld)),Se.logarithmicDepthBuffer&&mt.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&mt.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,en=!0,Ds=!0)}if(k.isSkinnedMesh){mt.setOptional(D,k,"bindMatrix"),mt.setOptional(D,k,"bindMatrixInverse");const cn=k.skeleton;cn&&(cn.boneTexture===null&&cn.computeBoneTexture(),mt.setValue(D,"boneTexture",cn.boneTexture,R))}k.isBatchedMesh&&(mt.setOptional(D,k,"batchingTexture"),mt.setValue(D,"batchingTexture",k._matricesTexture,R),mt.setOptional(D,k,"batchingIdTexture"),mt.setValue(D,"batchingIdTexture",k._indirectTexture,R),mt.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&mt.setValue(D,"batchingColorTexture",k._colorsTexture,R));const Is=q.morphAttributes;if((Is.position!==void 0||Is.normal!==void 0||Is.color!==void 0)&&ze.update(k,q,bn),(en||Le.receiveShadow!==k.receiveShadow)&&(Le.receiveShadow=k.receiveShadow,mt.setValue(D,"receiveShadow",k.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Rn.envMap.value=Re,Rn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&O.environment!==null&&(Rn.envMapIntensity.value=O.environmentIntensity),en&&(mt.setValue(D,"toneMappingExposure",v.toneMappingExposure),Le.needsLights&&Df(Rn,Ds),ce&&j.fog===!0&&fe.refreshFogUniforms(Rn,ce),fe.refreshMaterialUniforms(Rn,j,H,V,p.state.transmissionRenderTarget[T.id]),pa.upload(D,xl(Le),Rn,R)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(pa.upload(D,xl(Le),Rn,R),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&mt.setValue(D,"center",k.center),mt.setValue(D,"modelViewMatrix",k.modelViewMatrix),mt.setValue(D,"normalMatrix",k.normalMatrix),mt.setValue(D,"modelMatrix",k.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const cn=j.uniformsGroups;for(let si=0,ri=cn.length;si<ri;si++){const Sl=cn[si];N.update(Sl,bn),N.bind(Sl,bn)}}return bn}function Df(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function If(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,O,q){xe.get(T.texture).__webglTexture=O,xe.get(T.depthTexture).__webglTexture=q;const j=xe.get(T);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=q===void 0,j.__autoAllocateDepthBuffer||se.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){const q=xe.get(T);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,q=0){L=T,A=O,E=q;let j=!0,k=null,ce=!1,_e=!1;if(T){const Re=xe.get(T);if(Re.__useDefaultFramebuffer!==void 0)ue.bindFramebuffer(D.FRAMEBUFFER,null),j=!1;else if(Re.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(Re.__hasExternalTextures)R.rebindTextures(T,xe.get(T.texture).__webglTexture,xe.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Ce=T.depthTexture;if(Re.__boundDepthTexture!==Ce){if(Ce!==null&&xe.has(Ce)&&(T.width!==Ce.image.width||T.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}const Be=T.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(_e=!0);const Ge=xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[O])?k=Ge[O][q]:k=Ge[O],ce=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?k=xe.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?k=Ge[q]:k=Ge,C.copy(T.viewport),U.copy(T.scissor),F=T.scissorTest}else C.copy(re).multiplyScalar(H).floor(),U.copy(ye).multiplyScalar(H).floor(),F=Ie;if(ue.bindFramebuffer(D.FRAMEBUFFER,k)&&j&&ue.drawBuffers(T,k),ue.viewport(C),ue.scissor(U),ue.setScissorTest(F),ce){const Re=xe.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,Re.__webglTexture,q)}else if(_e){const Re=xe.get(T.texture),Be=O||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,Re.__webglTexture,q||0,Be)}S=-1},this.readRenderTargetPixels=function(T,O,q,j,k,ce,_e){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Ae=Ae[_e]),Ae){ue.bindFramebuffer(D.FRAMEBUFFER,Ae);try{const Re=T.texture,Be=Re.format,Ge=Re.type;if(!Se.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Se.textureTypeReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-j&&q>=0&&q<=T.height-k&&D.readPixels(O,q,j,k,We.convert(Be),We.convert(Ge),ce)}finally{const Re=L!==null?xe.get(L).__webglFramebuffer:null;ue.bindFramebuffer(D.FRAMEBUFFER,Re)}}},this.readRenderTargetPixelsAsync=async function(T,O,q,j,k,ce,_e){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(Ae=Ae[_e]),Ae){const Re=T.texture,Be=Re.format,Ge=Re.type;if(!Se.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Se.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-j&&q>=0&&q<=T.height-k){ue.bindFramebuffer(D.FRAMEBUFFER,Ae);const Ce=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ce),D.bufferData(D.PIXEL_PACK_BUFFER,ce.byteLength,D.STREAM_READ),D.readPixels(O,q,j,k,We.convert(Be),We.convert(Ge),0);const et=L!==null?xe.get(L).__webglFramebuffer:null;ue.bindFramebuffer(D.FRAMEBUFFER,et);const dt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Op(D,dt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ce),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ce),D.deleteBuffer(Ce),D.deleteSync(dt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,q=0){T.isTexture!==!0&&(Ks("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);const j=Math.pow(2,-q),k=Math.floor(T.image.width*j),ce=Math.floor(T.image.height*j),_e=O!==null?O.x:0,Ae=O!==null?O.y:0;R.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,q,0,0,_e,Ae,k,ce),ue.unbindTexture()},this.copyTextureToTexture=function(T,O,q=null,j=null,k=0){T.isTexture!==!0&&(Ks("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,T=arguments[1],O=arguments[2],k=arguments[3]||0,q=null);let ce,_e,Ae,Re,Be,Ge,Ce,et,dt;const pt=T.isCompressedTexture?T.mipmaps[k]:T.image;q!==null?(ce=q.max.x-q.min.x,_e=q.max.y-q.min.y,Ae=q.isBox3?q.max.z-q.min.z:1,Re=q.min.x,Be=q.min.y,Ge=q.isBox3?q.min.z:0):(ce=pt.width,_e=pt.height,Ae=pt.depth||1,Re=0,Be=0,Ge=0),j!==null?(Ce=j.x,et=j.y,dt=j.z):(Ce=0,et=0,dt=0);const Zt=We.convert(O.format),it=We.convert(O.type);let Le;O.isData3DTexture?(R.setTexture3D(O,0),Le=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(R.setTexture2DArray(O,0),Le=D.TEXTURE_2D_ARRAY):(R.setTexture2D(O,0),Le=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);const Bn=D.getParameter(D.UNPACK_ROW_LENGTH),st=D.getParameter(D.UNPACK_IMAGE_HEIGHT),bn=D.getParameter(D.UNPACK_SKIP_PIXELS),ki=D.getParameter(D.UNPACK_SKIP_ROWS),en=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,pt.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,pt.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Re),D.pixelStorei(D.UNPACK_SKIP_ROWS,Be),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ge);const Ds=T.isDataArrayTexture||T.isData3DTexture,mt=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const Rn=xe.get(T),Is=xe.get(O),cn=xe.get(Rn.__renderTarget),si=xe.get(Is.__renderTarget);ue.bindFramebuffer(D.READ_FRAMEBUFFER,cn.__webglFramebuffer),ue.bindFramebuffer(D.DRAW_FRAMEBUFFER,si.__webglFramebuffer);for(let ri=0;ri<Ae;ri++)Ds&&D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xe.get(T).__webglTexture,k,Ge+ri),T.isDepthTexture?(mt&&D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,xe.get(O).__webglTexture,k,dt+ri),D.blitFramebuffer(Re,Be,ce,_e,Ce,et,ce,_e,D.DEPTH_BUFFER_BIT,D.NEAREST)):mt?D.copyTexSubImage3D(Le,k,Ce,et,dt+ri,Re,Be,ce,_e):D.copyTexSubImage2D(Le,k,Ce,et,dt+ri,Re,Be,ce,_e);ue.bindFramebuffer(D.READ_FRAMEBUFFER,null),ue.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else mt?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(Le,k,Ce,et,dt,ce,_e,Ae,Zt,it,pt.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(Le,k,Ce,et,dt,ce,_e,Ae,Zt,pt.data):D.texSubImage3D(Le,k,Ce,et,dt,ce,_e,Ae,Zt,it,pt):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,k,Ce,et,ce,_e,Zt,it,pt.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,k,Ce,et,pt.width,pt.height,Zt,pt.data):D.texSubImage2D(D.TEXTURE_2D,k,Ce,et,ce,_e,Zt,it,pt);D.pixelStorei(D.UNPACK_ROW_LENGTH,Bn),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,st),D.pixelStorei(D.UNPACK_SKIP_PIXELS,bn),D.pixelStorei(D.UNPACK_SKIP_ROWS,ki),D.pixelStorei(D.UNPACK_SKIP_IMAGES,en),k===0&&O.generateMipmaps&&D.generateMipmap(Le),ue.unbindTexture()},this.copyTextureToTexture3D=function(T,O,q=null,j=null,k=0){return T.isTexture!==!0&&(Ks("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,j=arguments[1]||null,T=arguments[2],O=arguments[3],k=arguments[4]||0),Ks('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,q,j,k)},this.initRenderTarget=function(T){xe.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),ue.unbindTexture()},this.resetState=function(){A=0,E=0,L=null,ue.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=$e._getDrawingBufferColorSpace(e),t.unpackColorSpace=$e._getUnpackColorSpace()}}class el extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class zd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rc,this.updateRanges=[],this.version=0,this.uuid=_n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jt=new b;class hr{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyMatrix4(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.applyNormalMatrix(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jt.fromBufferAttribute(this,t),jt.transformDirection(e),this.setXYZ(t,jt.x,jt.y,jt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ot(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ot(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Sn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Sn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Sn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Sn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ot(t,this.array),n=ot(n,this.array),i=ot(i,this.array),s=ot(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new lt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new hr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ni extends Tn{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Ji;const ks=new b,es=new b,ts=new b,ns=new ne,zs=new ne,Bd=new Ne,Vr=new b,Bs=new b,Wr=new b,Th=new ne,fo=new ne,Eh=new ne;class Fn extends ft{constructor(e=new ni){if(super(),this.isSprite=!0,this.type="Sprite",Ji===void 0){Ji=new vt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zd(t,5);Ji.setIndex([0,1,2,0,2,3]),Ji.setAttribute("position",new hr(n,3,0,!1)),Ji.setAttribute("uv",new hr(n,2,3,!1))}this.geometry=Ji,this.material=e,this.center=new ne(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),es.setFromMatrixScale(this.matrixWorld),Bd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ts.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&es.multiplyScalar(-ts.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;qr(Vr.set(-.5,-.5,0),ts,a,es,i,s),qr(Bs.set(.5,-.5,0),ts,a,es,i,s),qr(Wr.set(.5,.5,0),ts,a,es,i,s),Th.set(0,0),fo.set(1,0),Eh.set(1,1);let o=e.ray.intersectTriangle(Vr,Bs,Wr,!1,ks);if(o===null&&(qr(Bs.set(-.5,.5,0),ts,a,es,i,s),fo.set(0,1),o=e.ray.intersectTriangle(Vr,Wr,Bs,!1,ks),o===null))return;const c=e.ray.origin.distanceTo(ks);c<e.near||c>e.far||t.push({distance:c,point:ks.clone(),uv:mn.getInterpolation(ks,Vr,Bs,Wr,Th,fo,Eh,new ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function qr(r,e,t,n,i,s){ns.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(zs.x=s*ns.x-i*ns.y,zs.y=i*ns.x+s*ns.y):zs.copy(ns),r.copy(e),r.x+=zs.x,r.y+=zs.y,r.applyMatrix4(Bd)}const jr=new b,Ah=new b;class Yv extends ft{constructor(){super(),this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]},isLOD:{value:!0}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);const t=e.levels;for(let n=0,i=t.length;n<i;n++){const s=t[n];this.addLevel(s.object.clone(),s.distance,s.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);const i=this.levels;let s;for(s=0;s<i.length&&!(t<i[s].distance);s++);return i.splice(s,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){const t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){const i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){const t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let s=t[n].distance;if(t[n].object.visible&&(s-=s*t[n].hysteresis),e<s)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){jr.setFromMatrixPosition(this.matrixWorld);const i=e.ray.origin.distanceTo(jr);this.getObjectForDistance(i).raycast(e,t)}}update(e){const t=this.levels;if(t.length>1){jr.setFromMatrixPosition(e.matrixWorld),Ah.setFromMatrixPosition(this.matrixWorld);const n=jr.distanceTo(Ah)/e.zoom;t[0].object.visible=!0;let i,s;for(i=1,s=t.length;i<s;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<s;i++)t[i].object.visible=!1}}toJSON(e){const t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];const n=this.levels;for(let i=0,s=n.length;i<s;i++){const a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}}const Rh=new b,Ch=new tt,Ph=new tt,Kv=new b,Lh=new Ne,Xr=new b,po=new An,Dh=new Ne,mo=new Aa;class $v extends pe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Rl,this.bindMatrix=new Ne,this.bindMatrixInverse=new Ne,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new on),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xr),this.boundingBox.expandByPoint(Xr)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new An),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Xr),this.boundingSphere.expandByPoint(Xr)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),po.copy(this.boundingSphere),po.applyMatrix4(i),e.ray.intersectsSphere(po)!==!1&&(Dh.copy(i).invert(),mo.copy(e.ray).applyMatrix4(Dh),!(this.boundingBox!==null&&mo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,mo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Rl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Ch.fromBufferAttribute(i.attributes.skinIndex,e),Ph.fromBufferAttribute(i.attributes.skinWeight,e),Rh.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=Ph.getComponent(s);if(a!==0){const o=Ch.getComponent(s);Lh.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Kv.copy(Rh).applyMatrix4(Lh),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Hd extends ft{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Gd extends Et{constructor(e=null,t=1,n=1,i,s,a,o,c,l=$t,h=$t,u,d){super(null,a,o,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ih=new Ne,Qv=new Ne;class tl{constructor(e=[],t=[]){this.uuid=_n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ne)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ne;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Qv;Ih.multiplyMatrices(o,t[s]),Ih.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new tl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Gd(t,e,e,gn,wn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new Hd),this.bones.push(a),this.boneInverses.push(new Ne().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Lc extends lt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const is=new Ne,Fh=new Ne,Yr=[],Nh=new on,Zv=new Ne,Hs=new pe,Gs=new An;class va extends pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Lc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Zv)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new on),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,is),Nh.copy(e.boundingBox).applyMatrix4(is),this.boundingBox.union(Nh)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new An),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,is),Gs.copy(e.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Gs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Hs.geometry=this.geometry,Hs.material=this.material,Hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Gs.copy(this.boundingSphere),Gs.applyMatrix4(n),e.ray.intersectsSphere(Gs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,is),Fh.multiplyMatrices(n,is),Hs.matrixWorld=Fh,Hs.raycast(e,Yr);for(let a=0,o=Yr.length;a<o;a++){const c=Yr[a];c.instanceId=s,c.object=this,t.push(c)}Yr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Lc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gd(new Float32Array(i*this.count),i,this.count,Xc,wn));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;s[c]=o,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Vd extends Tn{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new X(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ba=new b,ya=new b,Uh=new Ne,Vs=new Aa,Kr=new An,go=new b,Oh=new b;class nl extends ft{constructor(e=new vt,t=new Vd){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ba.fromBufferAttribute(t,i-1),ya.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ba.distanceTo(ya);e.setAttribute("lineDistance",new nt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kr.copy(n.boundingSphere),Kr.applyMatrix4(i),Kr.radius+=s,e.ray.intersectsSphere(Kr)===!1)return;Uh.copy(i).invert(),Vs.copy(e.ray).applyMatrix4(Uh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=h.getX(_),y=h.getX(_+1),x=$r(this,e,Vs,c,p,y);x&&t.push(x)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(f),p=$r(this,e,Vs,c,_,g);p&&t.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=l){const p=$r(this,e,Vs,c,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=$r(this,e,Vs,c,m-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $r(r,e,t,n,i,s){const a=r.geometry.attributes.position;if(ba.fromBufferAttribute(a,i),ya.fromBufferAttribute(a,s),t.distanceSqToSegment(ba,ya,go,Oh)>n)return;go.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(go);if(!(c<e.near||c>e.far))return{distance:c,point:Oh.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const kh=new b,zh=new b;class Jv extends nl{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)kh.fromBufferAttribute(t,i),zh.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+kh.distanceTo(zh);e.setAttribute("lineDistance",new nt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class eb extends nl{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class il extends Tn{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new X(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bh=new Ne,Dc=new Aa,Qr=new An,Zr=new b;class sl extends ft{constructor(e=new vt,t=new il){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(i),Qr.radius+=s,e.ray.intersectsSphere(Qr)===!1)return;Bh.copy(i).invert(),Dc.copy(e.ray).applyMatrix4(Bh);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=l.getX(m);Zr.fromBufferAttribute(u,g),Hh(Zr,g,c,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,_=f;m<_;m++)Zr.fromBufferAttribute(u,m),Hh(Zr,m,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Hh(r,e,t,n,i,s,a){const o=Dc.distanceSqToPoint(r);if(o<t){const c=new b;Dc.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Oi extends Et{constructor(e,t,n,i,s,a,o,c,l){super(e,t,n,i,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let i=0;const s=n.length;let a;t?a=t:a=e*n[s-1];let o=0,c=s-1,l;for(;o<=c;)if(i=Math.floor(o+(c-o)/2),l=n[i]-a,l<0)o=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===a)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(a-h)/d;return(i+f)/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);const a=this.getPoint(i),o=this.getPoint(s),c=t||(a.isVector2?new ne:new b);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new b,i=[],s=[],a=[],o=new b,c=new Ne;for(let f=0;f<=e;f++){const m=f/e;i[f]=this.getTangentAt(m,new b)}s[0]=new b,a[0]=new b;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Pt(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,m))}a[f].crossVectors(i[f],s[f])}if(t===!0){let f=Math.acos(Pt(s[0].dot(s[e]),-1,1));f/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let m=1;m<=e;m++)s[m].applyMatrix4(c.makeRotationAxis(i[m],f*m)),a[m].crossVectors(i[m],s[m])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class rl extends Un{constructor(e=0,t=0,n=1,i=1,s=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new ne){const n=t,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(a?s=0:s=i),this.aClockwise===!0&&!a&&(s===i?s=-i:s=s-i);const o=this.aStartAngle+e*s;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class tb extends rl{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function al(){let r=0,e=0,t=0,n=0;function i(s,a,o,c){r=s,e=o,t=-3*s+3*a-2*o-c,n=2*s-2*a+o+c}return{initCatmullRom:function(s,a,o,c,l){i(a,o,l*(o-s),l*(c-a))},initNonuniformCatmullRom:function(s,a,o,c,l,h,u){let d=(a-s)/l-(o-s)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,i(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+e*s+t*a+n*o}}}const Jr=new b,_o=new al,vo=new al,bo=new al;class nb extends Un{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new b){const n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:c===0&&o===s-1&&(o=s-2,c=1);let l,h;this.closed||o>0?l=i[(o-1)%s]:(Jr.subVectors(i[0],i[1]).add(i[0]),l=Jr);const u=i[o%s],d=i[(o+1)%s];if(this.closed||o+2<s?h=i[(o+2)%s]:(Jr.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Jr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),_o.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,g),vo.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,g),bo.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(_o.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),vo.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),bo.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(_o.calc(c),vo.calc(c),bo.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new b().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Gh(r,e,t,n,i){const s=(n-e)*.5,a=(i-t)*.5,o=r*r,c=r*o;return(2*t-2*n+s+a)*c+(-3*t+3*n-2*s-a)*o+s*r+t}function ib(r,e){const t=1-r;return t*t*e}function sb(r,e){return 2*(1-r)*r*e}function rb(r,e){return r*r*e}function er(r,e,t,n){return ib(r,e)+sb(r,t)+rb(r,n)}function ab(r,e){const t=1-r;return t*t*t*e}function ob(r,e){const t=1-r;return 3*t*t*r*e}function cb(r,e){return 3*(1-r)*r*r*e}function lb(r,e){return r*r*r*e}function tr(r,e,t,n,i){return ab(r,e)+ob(r,t)+cb(r,n)+lb(r,i)}class Wd extends Un{constructor(e=new ne,t=new ne,n=new ne,i=new ne){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ne){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(tr(e,i.x,s.x,a.x,o.x),tr(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class hb extends Un{constructor(e=new b,t=new b,n=new b,i=new b){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new b){const n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set(tr(e,i.x,s.x,a.x,o.x),tr(e,i.y,s.y,a.y,o.y),tr(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class qd extends Un{constructor(e=new ne,t=new ne){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ne){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ne){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ub extends Un{constructor(e=new b,t=new b){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new b){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new b){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class jd extends Un{constructor(e=new ne,t=new ne,n=new ne){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ne){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(er(e,i.x,s.x,a.x),er(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class db extends Un{constructor(e=new b,t=new b,n=new b){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new b){const n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(er(e,i.x,s.x,a.x),er(e,i.y,s.y,a.y),er(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xd extends Un{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ne){const n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,c=i[a===0?a:a-1],l=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Gh(o,c.x,l.x,h.x,u.x),Gh(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new ne().fromArray(i))}return this}}var Ic=Object.freeze({__proto__:null,ArcCurve:tb,CatmullRomCurve3:nb,CubicBezierCurve:Wd,CubicBezierCurve3:hb,EllipseCurve:rl,LineCurve:qd,LineCurve3:ub,QuadraticBezierCurve:jd,QuadraticBezierCurve3:db,SplineCurve:Xd});class fb extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ic[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const a=i[s]-n,o=this.curves[s],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const a=s[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const i=e.curves[t];this.curves.push(new Ic[i.type]().fromJSON(i))}return this}}class Vh extends fb{constructor(e){super(),this.type="Path",this.currentPoint=new ne,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new qd(this.currentPoint.clone(),new ne(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){const s=new jd(this.currentPoint.clone(),new ne(e,t),new ne(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){const o=new Wd(this.currentPoint.clone(),new ne(e,t),new ne(n,i),new ne(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Xd(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,s,a,o,c),this}absellipse(e,t,n,i,s,a,o,c){const l=new rl(e,t,n,i,s,a,o,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Ca extends vt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const s=[],a=[],o=[],c=[],l=new b,h=new ne;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new nt(a,3)),this.setAttribute("normal",new nt(o,3)),this.setAttribute("uv",new nt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ii extends vt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const _=[],g=n/2;let p=0;y(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new nt(u,3)),this.setAttribute("normal",new nt(d,3)),this.setAttribute("uv",new nt(f,2));function y(){const v=new b,P=new b;let A=0;const E=(t-e)/n;for(let L=0;L<=s;L++){const S=[],M=L/s,C=M*(t-e)+e;for(let U=0;U<=i;U++){const F=U/i,I=F*c+o,B=Math.sin(I),z=Math.cos(I);P.x=C*B,P.y=-M*n+g,P.z=C*z,u.push(P.x,P.y,P.z),v.set(B,E,z).normalize(),d.push(v.x,v.y,v.z),f.push(F,1-M),S.push(m++)}_.push(S)}for(let L=0;L<i;L++)for(let S=0;S<s;S++){const M=_[S][L],C=_[S+1][L],U=_[S+1][L+1],F=_[S][L+1];(e>0||S!==0)&&(h.push(M,C,F),A+=3),(t>0||S!==s-1)&&(h.push(C,U,F),A+=3)}l.addGroup(p,A,0),p+=A}function x(v){const P=m,A=new ne,E=new b;let L=0;const S=v===!0?e:t,M=v===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,g*M,0),d.push(0,M,0),f.push(.5,.5),m++;const C=m;for(let U=0;U<=i;U++){const I=U/i*c+o,B=Math.cos(I),z=Math.sin(I);E.x=S*z,E.y=g*M,E.z=S*B,u.push(E.x,E.y,E.z),d.push(0,M,0),A.x=B*.5+.5,A.y=z*.5*M+.5,f.push(A.x,A.y),m++}for(let U=0;U<i;U++){const F=P+U,I=C+U;v===!0?h.push(I,I+1,F):h.push(I+1,I,F),L+=3}l.addGroup(p,L,v===!0?1:2),p+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class _r extends ii{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new _r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class vr extends vt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),l(n),h(),this.setAttribute("position",new nt(s,3)),this.setAttribute("normal",new nt(s.slice(),3)),this.setAttribute("uv",new nt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const x=new b,v=new b,P=new b;for(let A=0;A<t.length;A+=3)f(t[A+0],x),f(t[A+1],v),f(t[A+2],P),c(x,v,P,y)}function c(y,x,v,P){const A=P+1,E=[];for(let L=0;L<=A;L++){E[L]=[];const S=y.clone().lerp(v,L/A),M=x.clone().lerp(v,L/A),C=A-L;for(let U=0;U<=C;U++)U===0&&L===A?E[L][U]=S:E[L][U]=S.clone().lerp(M,U/C)}for(let L=0;L<A;L++)for(let S=0;S<2*(A-L)-1;S++){const M=Math.floor(S/2);S%2===0?(d(E[L][M+1]),d(E[L+1][M]),d(E[L][M])):(d(E[L][M+1]),d(E[L+1][M+1]),d(E[L+1][M]))}}function l(y){const x=new b;for(let v=0;v<s.length;v+=3)x.x=s[v+0],x.y=s[v+1],x.z=s[v+2],x.normalize().multiplyScalar(y),s[v+0]=x.x,s[v+1]=x.y,s[v+2]=x.z}function h(){const y=new b;for(let x=0;x<s.length;x+=3){y.x=s[x+0],y.y=s[x+1],y.z=s[x+2];const v=g(y)/2/Math.PI+.5,P=p(y)/Math.PI+.5;a.push(v,1-P)}m(),u()}function u(){for(let y=0;y<a.length;y+=6){const x=a[y+0],v=a[y+2],P=a[y+4],A=Math.max(x,v,P),E=Math.min(x,v,P);A>.9&&E<.1&&(x<.2&&(a[y+0]+=1),v<.2&&(a[y+2]+=1),P<.2&&(a[y+4]+=1))}}function d(y){s.push(y.x,y.y,y.z)}function f(y,x){const v=y*3;x.x=e[v+0],x.y=e[v+1],x.z=e[v+2]}function m(){const y=new b,x=new b,v=new b,P=new b,A=new ne,E=new ne,L=new ne;for(let S=0,M=0;S<s.length;S+=9,M+=6){y.set(s[S+0],s[S+1],s[S+2]),x.set(s[S+3],s[S+4],s[S+5]),v.set(s[S+6],s[S+7],s[S+8]),A.set(a[M+0],a[M+1]),E.set(a[M+2],a[M+3]),L.set(a[M+4],a[M+5]),P.copy(y).add(x).add(v).divideScalar(3);const C=g(P);_(A,M+0,y,C),_(E,M+2,x,C),_(L,M+4,v,C)}}function _(y,x,v,P){P<0&&y.x===1&&(a[x]=y.x-1),v.x===0&&v.z===0&&(a[x]=P/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.vertices,e.indices,e.radius,e.details)}}class ol extends vr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ol(e.radius,e.detail)}}class cl extends Vh{constructor(e){super(e),this.uuid=_n(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const i=e.holes[t];this.holes.push(new Vh().fromJSON(i))}return this}}const pb={triangulate:function(r,e,t=2){const n=e&&e.length,i=n?e[0]*t:r.length;let s=Yd(r,0,i,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,c,l,h,u,d,f;if(n&&(s=bb(r,e,s,t)),r.length>80*t){o=l=r[0],c=h=r[1];for(let m=t;m<i;m+=t)u=r[m],d=r[m+1],u<o&&(o=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-o,h-c),f=f!==0?32767/f:0}return ur(s,a,t,o,c,f,0),a}};function Yd(r,e,t,n,i){let s,a;if(i===Pb(r,e,t,n)>0)for(s=e;s<t;s+=n)a=Wh(s,r[s],r[s+1],a);else for(s=t-n;s>=e;s-=n)a=Wh(s,r[s],r[s+1],a);return a&&Pa(a,a.next)&&(fr(a),a=a.next),a}function Ni(r,e){if(!r)return r;e||(e=r);let t=r,n;do if(n=!1,!t.steiner&&(Pa(t,t.next)||_t(t.prev,t,t.next)===0)){if(fr(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function ur(r,e,t,n,i,s,a){if(!r)return;!a&&s&&wb(r,n,i,s);let o=r,c,l;for(;r.prev!==r.next;){if(c=r.prev,l=r.next,s?gb(r,n,i,s):mb(r)){e.push(c.i/t|0),e.push(r.i/t|0),e.push(l.i/t|0),fr(r),r=l.next,o=l.next;continue}if(r=l,r===o){a?a===1?(r=_b(Ni(r),e,t),ur(r,e,t,n,i,s,2)):a===2&&vb(r,e,t,n,i,s):ur(Ni(r),e,t,n,i,s,1);break}}}function mb(r){const e=r.prev,t=r,n=r.next;if(_t(e,t,n)>=0)return!1;const i=e.x,s=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=i<s?i<a?i:a:s<a?s:a,u=o<c?o<l?o:l:c<l?c:l,d=i>s?i>a?i:a:s>a?s:a,f=o>c?o>l?o:l:c>l?c:l;let m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&rs(i,o,s,c,a,l,m.x,m.y)&&_t(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function gb(r,e,t,n){const i=r.prev,s=r,a=r.next;if(_t(i,s,a)>=0)return!1;const o=i.x,c=s.x,l=a.x,h=i.y,u=s.y,d=a.y,f=o<c?o<l?o:l:c<l?c:l,m=h<u?h<d?h:d:u<d?u:d,_=o>c?o>l?o:l:c>l?c:l,g=h>u?h>d?h:d:u>d?u:d,p=Fc(f,m,e,t,n),y=Fc(_,g,e,t,n);let x=r.prevZ,v=r.nextZ;for(;x&&x.z>=p&&v&&v.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&rs(o,h,c,u,l,d,x.x,x.y)&&_t(x.prev,x,x.next)>=0||(x=x.prevZ,v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&rs(o,h,c,u,l,d,v.x,v.y)&&_t(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==a&&rs(o,h,c,u,l,d,x.x,x.y)&&_t(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==a&&rs(o,h,c,u,l,d,v.x,v.y)&&_t(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function _b(r,e,t){let n=r;do{const i=n.prev,s=n.next.next;!Pa(i,s)&&Kd(i,n,n.next,s)&&dr(i,s)&&dr(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),fr(n),fr(n.next),n=r=s),n=n.next}while(n!==r);return Ni(n)}function vb(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Ab(a,o)){let c=$d(a,o);a=Ni(a,a.next),c=Ni(c,c.next),ur(a,e,t,n,i,s,0),ur(c,e,t,n,i,s,0);return}o=o.next}a=a.next}while(a!==r)}function bb(r,e,t,n){const i=[];let s,a,o,c,l;for(s=0,a=e.length;s<a;s++)o=e[s]*n,c=s<a-1?e[s+1]*n:r.length,l=Yd(r,o,c,n,!1),l===l.next&&(l.steiner=!0),i.push(Eb(l));for(i.sort(yb),s=0;s<i.length;s++)t=xb(i[s],t);return t}function yb(r,e){return r.x-e.x}function xb(r,e){const t=Mb(r,e);if(!t)return e;const n=$d(t,r);return Ni(n,n.next),Ni(t,t.next)}function Mb(r,e){let t=e,n=-1/0,i;const s=r.x,a=r.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>n&&(n=d,i=t.x<t.next.x?t:t.next,d===s))return i}t=t.next}while(t!==e);if(!i)return null;const o=i,c=i.x,l=i.y;let h=1/0,u;t=i;do s>=t.x&&t.x>=c&&s!==t.x&&rs(a<l?s:n,a,c,l,a<l?n:s,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(s-t.x),dr(t,r)&&(u<h||u===h&&(t.x>i.x||t.x===i.x&&Sb(i,t)))&&(i=t,h=u)),t=t.next;while(t!==o);return i}function Sb(r,e){return _t(r.prev,r,e.prev)<0&&_t(e.next,r,r.next)<0}function wb(r,e,t,n){let i=r;do i.z===0&&(i.z=Fc(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,Tb(i)}function Tb(r){let e,t,n,i,s,a,o,c,l=1;do{for(t=r,r=null,s=null,a=0;t;){for(a++,n=t,o=0,e=0;e<l&&(o++,n=n.nextZ,!!n);e++);for(c=l;o>0||c>0&&n;)o!==0&&(c===0||!n||t.z<=n.z)?(i=t,t=t.nextZ,o--):(i=n,n=n.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;t=n}s.nextZ=null,l*=2}while(a>1);return r}function Fc(r,e,t,n,i){return r=(r-t)*i|0,e=(e-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Eb(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function rs(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function Ab(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Rb(r,e)&&(dr(r,e)&&dr(e,r)&&Cb(r,e)&&(_t(r.prev,r,e.prev)||_t(r,e.prev,e))||Pa(r,e)&&_t(r.prev,r,r.next)>0&&_t(e.prev,e,e.next)>0)}function _t(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Pa(r,e){return r.x===e.x&&r.y===e.y}function Kd(r,e,t,n){const i=ta(_t(r,e,t)),s=ta(_t(r,e,n)),a=ta(_t(t,n,r)),o=ta(_t(t,n,e));return!!(i!==s&&a!==o||i===0&&ea(r,t,e)||s===0&&ea(r,n,e)||a===0&&ea(t,r,n)||o===0&&ea(t,e,n))}function ea(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function ta(r){return r>0?1:r<0?-1:0}function Rb(r,e){let t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Kd(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function dr(r,e){return _t(r.prev,r,r.next)<0?_t(r,e,r.next)>=0&&_t(r,r.prev,e)>=0:_t(r,e,r.prev)<0||_t(r,r.next,e)<0}function Cb(r,e){let t=r,n=!1;const i=(r.x+e.x)/2,s=(r.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&i<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==r);return n}function $d(r,e){const t=new Nc(r.i,r.x,r.y),n=new Nc(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Wh(r,e,t,n){const i=new Nc(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function fr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Nc(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Pb(r,e,t,n){let i=0;for(let s=e,a=t-n;s<t;s+=n)i+=(r[a]-r[s])*(r[s+1]+r[a+1]),a=s;return i}class nr{static area(e){const t=e.length;let n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return n*.5}static isClockWise(e){return nr.area(e)<0}static triangulateShape(e,t){const n=[],i=[],s=[];qh(e),jh(n,e);let a=e.length;t.forEach(qh);for(let c=0;c<t.length;c++)i.push(a),a+=t[c].length,jh(n,t[c]);const o=pb.triangulate(n,i);for(let c=0;c<o.length;c+=3)s.push(o.slice(c,c+3));return s}}function qh(r){const e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function jh(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}class La extends vt{constructor(e=new cl([new ne(.5,.5),new ne(-.5,.5),new ne(-.5,-.5),new ne(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,i=[],s=[];for(let o=0,c=e.length;o<c;o++){const l=e[o];a(l)}this.setAttribute("position",new nt(i,3)),this.setAttribute("uv",new nt(s,2)),this.computeVertexNormals();function a(o){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:Lb;let x,v=!1,P,A,E,L;p&&(x=p.getSpacedPoints(h),v=!0,d=!1,P=p.computeFrenetFrames(h,!1),A=new b,E=new b,L=new b),d||(g=0,f=0,m=0,_=0);const S=o.extractPoints(l);let M=S.shape;const C=S.holes;if(!nr.isClockWise(M)){M=M.reverse();for(let Z=0,oe=C.length;Z<oe;Z++){const D=C[Z];nr.isClockWise(D)&&(C[Z]=D.reverse())}}const F=nr.triangulateShape(M,C),I=M;for(let Z=0,oe=C.length;Z<oe;Z++){const D=C[Z];M=M.concat(D)}function B(Z,oe,D){return oe||console.error("THREE.ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(oe,D)}const z=M.length,V=F.length;function H(Z,oe,D){let Pe,se,Se;const ue=Z.x-oe.x,Ue=Z.y-oe.y,xe=D.x-Z.x,R=D.y-Z.y,w=ue*ue+Ue*Ue,G=ue*R-Ue*xe;if(Math.abs(G)>Number.EPSILON){const K=Math.sqrt(w),ee=Math.sqrt(xe*xe+R*R),$=oe.x-Ue/K,Ee=oe.y+ue/K,fe=D.x-R/ee,Me=D.y+xe/ee,Ke=((fe-$)*R-(Me-Ee)*xe)/(ue*R-Ue*xe);Pe=$+ue*Ke-Z.x,se=Ee+Ue*Ke-Z.y;const ae=Pe*Pe+se*se;if(ae<=2)return new ne(Pe,se);Se=Math.sqrt(ae/2)}else{let K=!1;ue>Number.EPSILON?xe>Number.EPSILON&&(K=!0):ue<-Number.EPSILON?xe<-Number.EPSILON&&(K=!0):Math.sign(Ue)===Math.sign(R)&&(K=!0),K?(Pe=-Ue,se=ue,Se=Math.sqrt(w)):(Pe=ue,se=Ue,Se=Math.sqrt(w/2))}return new ne(Pe/Se,se/Se)}const J=[];for(let Z=0,oe=I.length,D=oe-1,Pe=Z+1;Z<oe;Z++,D++,Pe++)D===oe&&(D=0),Pe===oe&&(Pe=0),J[Z]=H(I[Z],I[D],I[Pe]);const ie=[];let re,ye=J.concat();for(let Z=0,oe=C.length;Z<oe;Z++){const D=C[Z];re=[];for(let Pe=0,se=D.length,Se=se-1,ue=Pe+1;Pe<se;Pe++,Se++,ue++)Se===se&&(Se=0),ue===se&&(ue=0),re[Pe]=H(D[Pe],D[Se],D[ue]);ie.push(re),ye=ye.concat(re)}for(let Z=0;Z<g;Z++){const oe=Z/g,D=f*Math.cos(oe*Math.PI/2),Pe=m*Math.sin(oe*Math.PI/2)+_;for(let se=0,Se=I.length;se<Se;se++){const ue=B(I[se],J[se],Pe);he(ue.x,ue.y,-D)}for(let se=0,Se=C.length;se<Se;se++){const ue=C[se];re=ie[se];for(let Ue=0,xe=ue.length;Ue<xe;Ue++){const R=B(ue[Ue],re[Ue],Pe);he(R.x,R.y,-D)}}}const Ie=m+_;for(let Z=0;Z<z;Z++){const oe=d?B(M[Z],ye[Z],Ie):M[Z];v?(E.copy(P.normals[0]).multiplyScalar(oe.x),A.copy(P.binormals[0]).multiplyScalar(oe.y),L.copy(x[0]).add(E).add(A),he(L.x,L.y,L.z)):he(oe.x,oe.y,0)}for(let Z=1;Z<=h;Z++)for(let oe=0;oe<z;oe++){const D=d?B(M[oe],ye[oe],Ie):M[oe];v?(E.copy(P.normals[Z]).multiplyScalar(D.x),A.copy(P.binormals[Z]).multiplyScalar(D.y),L.copy(x[Z]).add(E).add(A),he(L.x,L.y,L.z)):he(D.x,D.y,u/h*Z)}for(let Z=g-1;Z>=0;Z--){const oe=Z/g,D=f*Math.cos(oe*Math.PI/2),Pe=m*Math.sin(oe*Math.PI/2)+_;for(let se=0,Se=I.length;se<Se;se++){const ue=B(I[se],J[se],Pe);he(ue.x,ue.y,u+D)}for(let se=0,Se=C.length;se<Se;se++){const ue=C[se];re=ie[se];for(let Ue=0,xe=ue.length;Ue<xe;Ue++){const R=B(ue[Ue],re[Ue],Pe);v?he(R.x,R.y+x[h-1].y,x[h-1].x+D):he(R.x,R.y,u+D)}}}W(),te();function W(){const Z=i.length/3;if(d){let oe=0,D=z*oe;for(let Pe=0;Pe<V;Pe++){const se=F[Pe];De(se[2]+D,se[1]+D,se[0]+D)}oe=h+g*2,D=z*oe;for(let Pe=0;Pe<V;Pe++){const se=F[Pe];De(se[0]+D,se[1]+D,se[2]+D)}}else{for(let oe=0;oe<V;oe++){const D=F[oe];De(D[2],D[1],D[0])}for(let oe=0;oe<V;oe++){const D=F[oe];De(D[0]+z*h,D[1]+z*h,D[2]+z*h)}}n.addGroup(Z,i.length/3-Z,0)}function te(){const Z=i.length/3;let oe=0;ve(I,oe),oe+=I.length;for(let D=0,Pe=C.length;D<Pe;D++){const se=C[D];ve(se,oe),oe+=se.length}n.addGroup(Z,i.length/3-Z,1)}function ve(Z,oe){let D=Z.length;for(;--D>=0;){const Pe=D;let se=D-1;se<0&&(se=Z.length-1);for(let Se=0,ue=h+g*2;Se<ue;Se++){const Ue=z*Se,xe=z*(Se+1),R=oe+Pe+Ue,w=oe+se+Ue,G=oe+se+xe,K=oe+Pe+xe;ke(R,w,G,K)}}}function he(Z,oe,D){c.push(Z),c.push(oe),c.push(D)}function De(Z,oe,D){Fe(Z),Fe(oe),Fe(D);const Pe=i.length/3,se=y.generateTopUV(n,i,Pe-3,Pe-2,Pe-1);Ye(se[0]),Ye(se[1]),Ye(se[2])}function ke(Z,oe,D,Pe){Fe(Z),Fe(oe),Fe(Pe),Fe(oe),Fe(D),Fe(Pe);const se=i.length/3,Se=y.generateSideWallUV(n,i,se-6,se-3,se-2,se-1);Ye(Se[0]),Ye(Se[1]),Ye(Se[3]),Ye(Se[1]),Ye(Se[2]),Ye(Se[3])}function Fe(Z){i.push(c[Z*3+0]),i.push(c[Z*3+1]),i.push(c[Z*3+2])}function Ye(Z){s.push(Z.x),s.push(Z.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Db(t,n,e)}static fromJSON(e,t){const n=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];n.push(o)}const i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ic[i.type]().fromJSON(i)),new La(n,e.options)}}const Lb={generateTopUV:function(r,e,t,n,i){const s=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[i*3],h=e[i*3+1];return[new ne(s,a),new ne(o,c),new ne(l,h)]},generateSideWallUV:function(r,e,t,n,i,s){const a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],_=e[s*3],g=e[s*3+1],p=e[s*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new ne(a,1-c),new ne(l,1-u),new ne(d,1-m),new ne(_,1-p)]:[new ne(o,1-c),new ne(h,1-u),new ne(f,1-m),new ne(g,1-p)]}};function Db(r,e,t){if(t.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];t.shapes.push(s.uuid)}else t.shapes.push(r.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class br extends vr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new br(e.radius,e.detail)}}class Da extends vr{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Da(e.radius,e.detail)}}class rn extends vt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new b,d=new b,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const y=[],x=p/n;let v=0;p===0&&a===0?v=.5/t:p===n&&c===Math.PI&&(v=-.5/t);for(let P=0;P<=t;P++){const A=P/t;u.x=-e*Math.cos(i+A*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+A*s)*Math.sin(a+x*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(A+v,1-x),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const x=h[p][y+1],v=h[p][y],P=h[p+1][y],A=h[p+1][y+1];(p!==0||a>0)&&f.push(x,v,A),(p!==n-1||c<Math.PI)&&f.push(v,P,A)}this.setIndex(f),this.setAttribute("position",new nt(m,3)),this.setAttribute("normal",new nt(_,3)),this.setAttribute("uv",new nt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Ia extends vt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],c=[],l=[],h=new b,u=new b,d=new b;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){const _=m/i*s,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){const _=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,y=(i+1)*f+m;a.push(_,g,y),a.push(g,p,y)}this.setIndex(a),this.setAttribute("position",new nt(o,3)),this.setAttribute("normal",new nt(c,3)),this.setAttribute("uv",new nt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ia(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ib extends Tt{static get type(){return"RawShaderMaterial"}constructor(e){super(e),this.isRawShaderMaterial=!0}}class Mt extends Tn{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new X(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new X(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xd,this.normalScale=new ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class On extends Mt{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new X(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new X(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new X(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function na(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Fb(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Nb(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Xh(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let c=0;c!==e;++c)i[a++]=r[o+c]}return i}function Qd(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class yr{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let a;t:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break t}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Ub extends yr{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Cl,endingEnd:Cl}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Pl:s=e,o=2*t-n;break;case Ll:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Pl:a=e,c=2*n-t;break;case Ll:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,x=(-1-f)*g+(1.5+f)*_+.5*m,v=f*g-f*_;for(let P=0;P!==o;++P)s[P]=p*a[h+P]+y*a[l+P]+x*a[c+P]+v*a[u+P];return s}}class Ob extends yr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[l+d]*u+a[c+d]*h;return s}}class kb extends yr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class kn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=na(t,this.TimeBufferType),this.values=na(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:na(e.times,Array),values:na(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new kb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ob(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ub(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ar:t=this.InterpolantFactoryMethodDiscrete;break;case or:t=this.InterpolantFactoryMethodLinear;break;case ka:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ar;case this.InterpolantFactoryMethodLinear:return or;case this.InterpolantFactoryMethodSmooth:return ka}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&Fb(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===ka,s=e.length-1;let a=1;for(let o=1;o<s;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{const u=o*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){const _=t[u+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=or;class Rs extends kn{constructor(e,t,n){super(e,t,n)}}Rs.prototype.ValueTypeName="bool";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=ar;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;class Zd extends kn{}Zd.prototype.ValueTypeName="color";class bs extends kn{}bs.prototype.ValueTypeName="number";class zb extends yr{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let h=l+o;l!==h;l+=4)ht.slerpFlat(s,0,a,l-o,a,l,c);return s}}class ys extends kn{InterpolantFactoryMethodLinear(e){return new zb(this.times,this.values,this.getValueSize(),e)}}ys.prototype.ValueTypeName="quaternion";ys.prototype.InterpolantFactoryMethodSmooth=void 0;class Cs extends kn{constructor(e,t,n){super(e,t,n)}}Cs.prototype.ValueTypeName="string";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=ar;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;class xs extends kn{}xs.prototype.ValueTypeName="vector";class Bb{constructor(e="",t=-1,n=[],i=ap){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=_n(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Gb(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(kn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);const h=Nb(c);c=Xh(c,1,h),l=Xh(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new bs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,m,_){if(f.length!==0){const g=[],p=[];Qd(f,g,p,m),g.length!==0&&_.push(new u(d,g,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(const _ in f){const g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){const x=d[m];g.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new bs(".morphTargetInfluence["+_+"]",g,p))}c=f.length*a}else{const f=".bones["+t[u].name+"]";n(xs,f+".position",d,"pos",i),n(ys,f+".quaternion",d,"rot",i),n(xs,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Hb(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return bs;case"vector":case"vector2":case"vector3":case"vector4":return xs;case"color":return Zd;case"quaternion":return ys;case"bool":case"boolean":return Rs;case"string":return Cs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Gb(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Hb(r.type);if(r.times===void 0){const t=[],n=[];Qd(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const _i={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Vb{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}}const Wb=new Vb;class Ps{constructor(e){this.manager=e!==void 0?e:Wb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ps.DEFAULT_MATERIAL_NAME="__DEFAULT";const jn={};class qb extends Error{constructor(e,t){super(e),this.response=t}}class Jd extends Ps{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=_i.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(jn[e]!==void 0){jn[e].push({onLoad:t,onProgress:n,onError:i});return}jn[e]=[],jn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=jn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0;let _=0;const g=new ReadableStream({start(p){y();function y(){u.read().then(({done:x,value:v})=>{if(x)p.close();else{_+=v.byteLength;const P=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let A=0,E=h.length;A<E;A++){const L=h[A];L.onProgress&&L.onProgress(P)}p.enqueue(v),y()}},x=>{p.error(x)})}}});return new Response(g)}else throw new qb(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{_i.add(e,l);const h=jn[e];delete jn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=jn[e];if(h===void 0)throw this.manager.itemError(e),l;delete jn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class jb extends Ps{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=_i.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=cr("img");function c(){h(),_i.add(e,this),t&&t(this),s.manager.itemEnd(e)}function l(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Xb extends Ps{constructor(e){super(e)}load(e,t,n,i){const s=new Et,a=new jb(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Fa extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new X(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Yb extends Fa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new X(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const yo=new Ne,Yh=new b,Kh=new b;class ll{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ne(512,512),this.map=null,this.mapPass=null,this.matrix=new Ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zc,this._frameExtents=new ne(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Yh.setFromMatrixPosition(e.matrixWorld),t.position.copy(Yh),Kh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Kh),t.updateMatrixWorld(),yo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(yo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Kb extends ll{constructor(){super(new Kt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=_s*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class $b extends Fa{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Kb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const $h=new Ne,Ws=new b,xo=new b;class Qb extends ll{constructor(){super(new Kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ne(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new b(1,0,0),new b(-1,0,0),new b(0,0,1),new b(0,0,-1),new b(0,1,0),new b(0,-1,0)],this._cubeUps=[new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,1,0),new b(0,0,1),new b(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ws.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ws),xo.copy(n.position),xo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(xo),n.updateMatrixWorld(),i.makeTranslation(-Ws.x,-Ws.y,-Ws.z),$h.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix($h)}}class Zb extends Fa{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Qb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Jb extends ll{constructor(){super(new gr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ef extends Fa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Jb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ir{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ey extends Ps{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=_i.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),s.manager.itemEnd(e)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return _i.add(e,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),_i.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});_i.add(e,c),s.manager.itemStart(e)}}class ty{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Qh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Qh();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Qh(){return performance.now()}const hl="\\[\\]\\.:\\/",ny=new RegExp("["+hl+"]","g"),ul="[^"+hl+"]",iy="[^"+hl.replace("\\.","")+"]",sy=/((?:WC+[\/:])*)/.source.replace("WC",ul),ry=/(WCOD+)?/.source.replace("WCOD",iy),ay=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ul),oy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ul),cy=new RegExp("^"+sy+ry+ay+oy+"$"),ly=["material","materials","bones","map"];class hy{constructor(e,t,n){const i=n||ct.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class ct{constructor(e,t,n){this.path=t,this.parsedPath=n||ct.parseTrackName(t),this.node=ct.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new ct.Composite(e,t,n):new ct(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ny,"")}static parseTrackName(e){const t=cy.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);ly.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=ct.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ct.Composite=hy;ct.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ct.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ct.prototype.GetterByBindingType=[ct.prototype._getValue_direct,ct.prototype._getValue_array,ct.prototype._getValue_arrayElement,ct.prototype._getValue_toArray];ct.prototype.SetterByBindingTypeAndVersioning=[[ct.prototype._setValue_direct,ct.prototype._setValue_direct_setNeedsUpdate,ct.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_array,ct.prototype._setValue_array_setNeedsUpdate,ct.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_arrayElement,ct.prototype._setValue_arrayElement_setNeedsUpdate,ct.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ct.prototype._setValue_fromArray,ct.prototype._setValue_fromArray_setNeedsUpdate,ct.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gc);const tf={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Ls{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const uy=new gr(-1,1,1,-1,0,1);class dy extends vt{constructor(){super(),this.setAttribute("position",new nt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new nt([0,2,0,0,2,0],2))}}const fy=new dy;class dl{constructor(e){this._mesh=new pe(fy,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,uy)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class nf extends Ls{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Tt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=lr.clone(e.uniforms),this.material=new Tt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new dl(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Zh extends Ls{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class py extends Ls{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class my{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ne);this._width=n.width,this._height=n.height,t=new an(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Nn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new nf(tf),this.copyPass.material.blending=Qn,this.clock=new ty}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),c.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Zh!==void 0&&(a instanceof Zh?n=!0:a instanceof py&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ne);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class gy extends Ls{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new X}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const _y={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new X(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ms extends Ls{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ne(e.x,e.y):new ne(256,256),this.clearColor=new X(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new an(s,a,{type:Nn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new an(s,a,{type:Nn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new an(s,a,{type:Nn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),a=Math.round(a/2)}const o=_y;this.highPassUniforms=lr.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Tt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ne(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1),new b(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=tf;this.copyUniforms=lr.clone(h.uniforms),this.blendMaterial=new Tt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ut,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new X,this.oldClearAlpha=1,this.basic=new xt,this.fsQuad=new dl(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ne(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[c].uniforms.direction.value=Ms.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[c]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Ms.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[c]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Tt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ne(.5,.5)},direction:{value:new ne(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Tt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ms.BlurDirectionX=new ne(1,0);Ms.BlurDirectionY=new ne(0,1);const vy={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class by extends Ls{constructor(){super();const e=vy;this.uniforms=lr.clone(e.uniforms),this.material=new Ib({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new dl(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},$e.getTransfer(this._outputColorSpace)===at&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===sd?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===rd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ad?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===od?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===cd&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const yy={uniforms:{tDiffuse:{value:null},uSaturation:{value:1.14},uCurve:{value:.22}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float uSaturation;
    uniform float uCurve;
    varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
      vec3 x = clamp(mix(vec3(l), c.rgb, uSaturation), 0.0, 1.0);
      vec3 curved = x * x * (3.0 - 2.0 * x);
      gl_FragColor = vec4(mix(x, curved, uCurve), c.a);
    }
  `};class xy{constructor(e){this.canvas=e,this.isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||navigator.maxTouchPoints>1&&/Mac/.test(navigator.userAgent),this.renderer=new Xv({canvas:e,antialias:!1,logarithmicDepthBuffer:!0,powerPreference:"high-performance",stencil:!1}),this.renderer.toneMapping=Vc,this.renderer.toneMappingExposure=1.1,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=nd,this.scene=new el,this.camera=new Kt(68,window.innerWidth/window.innerHeight,.1,2e6);const t=new an(1,1,{type:Nn,samples:this.isMobile?2:4});this.composer=new my(this.renderer,t),this.renderPass=new gy(this.scene,this.camera),this.bloomPass=new Ms(new ne(512,512),.65,.5,.85),this.outputPass=new by,this.gradePass=new nf(yy),this.composer.addPass(this.renderPass),this.composer.addPass(this.bloomPass),this.composer.addPass(this.outputPass),this.composer.addPass(this.gradePass),this.pixelRatioCap=2,this.resolutionScale=this.isMobile?.85:1,this.updateCallbacks=[],this.elapsed=0,this._lastTime=-1,this._running=!1,this._onResize=this._onResize.bind(this),window.addEventListener("resize",this._onResize),window.addEventListener("orientationchange",this._onResize),e.addEventListener("webglcontextlost",n=>{n.preventDefault(),console.warn("[Engine] WebGL context lost")}),e.addEventListener("webglcontextrestored",()=>{console.warn("[Engine] WebGL context restored"),this._applySize()}),this._applySize()}onUpdate(e){this.updateCallbacks.push(e)}setResolutionScale(e){Math.abs(e-this.resolutionScale)<.01||(this.resolutionScale=e,this._applySize())}_applySize(){const e=window.innerWidth,t=window.innerHeight,n=Math.min(window.devicePixelRatio||1,this.pixelRatioCap)*this.resolutionScale;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(n),this.renderer.setSize(e,t,!1),this.composer.setPixelRatio(n),this.composer.setSize(e,t)}_onResize(){this._applySize(),requestAnimationFrame(()=>this._applySize())}start(){this._running||(this._running=!0,this._lastTime=-1,this.renderer.setAnimationLoop(e=>this._tick(e)))}stop(){this._running=!1,this.renderer.setAnimationLoop(null)}_tick(e){const t=this._lastTime<0?.016666666666666666:Math.min((e-this._lastTime)/1e3,.05);this._lastTime=e,this.elapsed+=t;for(const n of this.updateCallbacks)n(t,this.elapsed);this.composer.render()}dispose(){this.stop(),window.removeEventListener("resize",this._onResize),window.removeEventListener("orientationchange",this._onResize),this.composer.dispose(),this.renderer.dispose()}}class My{constructor(){this.listeners=new Map}on(e,t){let n=this.listeners.get(e);return n||(n=new Set,this.listeners.set(e,n)),n.add(t),()=>n.delete(t)}once(e,t){const n=this.on(e,i=>{n(),t(i)});return n}emit(e,t){const n=this.listeners.get(e);if(!(!n||n.size===0))for(const i of[...n])i(t)}}class Sy{constructor(){this.state={pitch:0,yaw:0,roll:0,throttle:0,strafeX:0,strafeY:0,boost:!1,brake:!1,fire:!1},this.walk={moveX:0,moveZ:0,lookX:0,lookY:0,jump:!1,sprint:!1},this.mode="flight",this.interactQueued=!1,this.tradeQueued=!1,this.counterQueued=!1,this.warpQueued=!1,this.warpCycleQueued=!1,this.landQueued=!1,this.fleetQueued=!1,this.fleetFocusQueued=!1,this.keys=new Set,this.mouse={x:0,y:0,px:0,py:0,active:!1,buttons:0},this.virtual={steer:{x:0,y:0,active:!1},throttle:{value:0,active:!1},roll:{value:0,active:!1},boost:!1,fire:!1,walk:{x:0,y:0,active:!1},look:{x:0,y:0,active:!1},jump:!1},this.touchActive=!1,this.actionQueue=[],this._onKeyDown=this._onKeyDown.bind(this),this._onKeyUp=this._onKeyUp.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onBlur=this._onBlur.bind(this),window.addEventListener("keydown",this._onKeyDown),window.addEventListener("keyup",this._onKeyUp),window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerdown",this._onPointerDown),window.addEventListener("pointerup",this._onPointerUp),window.addEventListener("blur",this._onBlur)}dispose(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerdown",this._onPointerDown),window.removeEventListener("pointerup",this._onPointerUp),window.removeEventListener("blur",this._onBlur)}_onKeyDown(e){e.metaKey||e.ctrlKey||(this.keys.add(e.code),e.code==="Space"&&e.preventDefault(),e.code==="KeyE"&&!e.repeat&&(this.interactQueued=!0),e.code==="KeyT"&&!e.repeat&&(this.tradeQueued=!0),e.code==="KeyC"&&!e.repeat&&(this.counterQueued=!0),e.code==="KeyJ"&&!e.repeat&&(this.warpQueued=!0),e.code==="KeyB"&&!e.repeat&&(this.warpCycleQueued=!0),e.code==="KeyL"&&!e.repeat&&(this.landQueued=!0),e.code==="KeyG"&&!e.repeat&&(this.fleetQueued=!0),e.code==="KeyV"&&!e.repeat&&(this.fleetFocusQueued=!0))}_onKeyUp(e){this.keys.delete(e.code)}_onPointerMove(e){if(e.pointerType==="touch")return;const t=window.innerWidth/2,n=window.innerHeight/2,i=Math.min(window.innerWidth,window.innerHeight)*.42;this.mouse.x=hn((e.clientX-t)/i),this.mouse.y=hn((e.clientY-n)/i),this.mouse.px=e.clientX,this.mouse.py=e.clientY,this.mouse.active=!0}_onPointerDown(e){if(e.pointerType==="touch"){this.touchActive=!0;return}this.mouse.buttons|=1<<e.button}_onPointerUp(e){e.pointerType!=="touch"&&(this.mouse.buttons&=~(1<<e.button))}_onBlur(){this.keys.clear(),this.mouse.buttons=0}pushAction(e){this.actionQueue.push(e)}consumeInteract(){const e=this.interactQueued;return this.interactQueued=!1,e}consumeTrade(){const e=this.tradeQueued;return this.tradeQueued=!1,e}consumeCounter(){const e=this.counterQueued;return this.counterQueued=!1,e}consumeWarp(){const e=this.warpQueued;return this.warpQueued=!1,e}consumeWarpCycle(){const e=this.warpCycleQueued;return this.warpCycleQueued=!1,e}consumeLand(){const e=this.landQueued;return this.landQueued=!1,e}consumeFleet(){const e=this.fleetQueued;return this.fleetQueued=!1,e}consumeFleetFocus(){const e=this.fleetFocusQueued;return this.fleetFocusQueued=!1,e}drainActions(){const e=this.actionQueue;return this.actionQueue=[],e}update(){const e=this.state,t=this.keys,n=this.virtual;if(this.mode==="foot"){this._updateWalk(),e.pitch=e.yaw=e.roll=e.throttle=e.strafeX=e.strafeY=0,e.boost=e.brake=e.fire=!1;return}let i=0,s=0;n.steer.active?(s=n.steer.x,i=-n.steer.y):this.mouse.active&&(s=ia(this.mouse.x),i=-ia(this.mouse.y)),t.has("ArrowUp")&&(i=1),t.has("ArrowDown")&&(i=-1),t.has("ArrowLeft")&&(s=-1),t.has("ArrowRight")&&(s=1),e.pitch=hn(i),e.yaw=hn(s);let a=0;n.roll.active&&(a=n.roll.value),t.has("KeyA")&&(a-=1),t.has("KeyD")&&(a+=1),e.roll=hn(a);let o=0;n.throttle.active&&(o=n.throttle.value),t.has("KeyW")&&(o=1),t.has("KeyS")&&(o=-1),e.throttle=hn(o);let c=0,l=0;t.has("KeyQ")&&(c-=1),t.has("KeyE")&&(c+=1),t.has("KeyR")&&(l+=1),t.has("KeyF")&&(l-=1),e.strafeX=hn(c),e.strafeY=hn(l),e.boost=n.boost||t.has("ShiftLeft")||t.has("ShiftRight"),e.brake=t.has("KeyX"),e.fire=n.fire||t.has("Space")||(this.mouse.buttons&1)!==0}_updateWalk(){const e=this.walk,t=this.keys,n=this.virtual;let i=0,s=0;n.walk.active&&(i=n.walk.x,s=-n.walk.y),t.has("KeyW")&&(s=1),t.has("KeyS")&&(s=-1),t.has("KeyA")&&(i=-1),t.has("KeyD")&&(i=1),e.moveX=hn(i),e.moveZ=hn(s);let a=0,o=0;n.look.active?(a=n.look.x,o=n.look.y):this.mouse.active&&(a=ia(this.mouse.x),o=ia(this.mouse.y)),t.has("ArrowLeft")&&(a=-1),t.has("ArrowRight")&&(a=1),t.has("ArrowUp")&&(o=-1),t.has("ArrowDown")&&(o=1),e.lookX=hn(a),e.lookY=hn(o),e.jump=n.jump||t.has("Space"),e.sprint=t.has("ShiftLeft")||t.has("ShiftRight")}}function hn(r){return r<-1?-1:r>1?1:r}function ia(r){const t=Math.abs(r);if(t<.06)return 0;const n=Math.min(1,(t-.06)/(1-.06));return Math.sign(r)*n*n*(3-2*n)}class wy{constructor(){this.ctx=null,this.master=null,this.buses={sfx:null,engine:null,music:null,ambient:null},this.noiseBuffer=null,this.muted=!1}get ready(){return this.ctx!==null&&this.ctx.state==="running"}get time(){return this.ctx?this.ctx.currentTime:0}unlock(){if(!this.ctx){const e=window.AudioContext||window.webkitAudioContext;if(!e)return;this.ctx=new e({latencyHint:"interactive"});const t=this.ctx.createDynamicsCompressor();t.threshold.value=-14,t.knee.value=20,t.ratio.value=5,t.attack.value=.004,t.release.value=.24,t.connect(this.ctx.destination),this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:1,this.master.connect(t);for(const n of Object.keys(this.buses)){const i=this.ctx.createGain();i.connect(this.master),this.buses[n]=i}this.buses.sfx.gain.value=.9,this.buses.engine.gain.value=.55,this.buses.music.gain.value=.5,this.buses.ambient.gain.value=.6,this.noiseBuffer=this._createNoiseBuffer(2)}this.ctx.state==="suspended"&&this.ctx.resume()}setMuted(e){this.muted=e,this.master&&this.master.gain.setTargetAtTime(e?0:1,this.time,.05)}_createNoiseBuffer(e){const t=this.ctx.sampleRate,n=this.ctx.createBuffer(1,Math.floor(t*e),t),i=n.getChannelData(0);for(let s=0;s<i.length;s++)i[s]=Math.random()*2-1;return n}playTone({type:e="sine",freq:t,freqEnd:n=null,duration:i=.2,gain:s=.3,attack:a=.005,bus:o="sfx",detune:c=0}){if(!this.ready)return;const l=this.time,h=this.ctx.createOscillator();h.type=e,h.frequency.setValueAtTime(t,l),n!==null&&h.frequency.exponentialRampToValueAtTime(Math.max(1,n),l+i),h.detune.value=c;const u=this.ctx.createGain();u.gain.setValueAtTime(0,l),u.gain.linearRampToValueAtTime(s,l+a),u.gain.exponentialRampToValueAtTime(.001,l+i),h.connect(u),u.connect(this.buses[o]),h.start(l),h.stop(l+i+.05),h.onended=()=>{h.disconnect(),u.disconnect()}}playNoise({duration:e=.4,gain:t=.4,filterFreq:n=2e3,filterEnd:i=200,attack:s=.002,bus:a="sfx",playbackRate:o=1}){if(!this.ready)return;const c=this.time,l=this.ctx.createBufferSource();l.buffer=this.noiseBuffer,l.loop=!0,l.playbackRate.value=o;const h=this.ctx.createBiquadFilter();h.type="lowpass",h.frequency.setValueAtTime(n,c),h.frequency.exponentialRampToValueAtTime(Math.max(30,i),c+e),h.Q.value=.7;const u=this.ctx.createGain();u.gain.setValueAtTime(0,c),u.gain.linearRampToValueAtTime(t,c+s),u.gain.exponentialRampToValueAtTime(.001,c+e),l.connect(h),h.connect(u),u.connect(this.buses[a]),l.start(c,Math.random()*1.5),l.stop(c+e+.05),l.onended=()=>{l.disconnect(),h.disconnect(),u.disconnect()}}createLoop({bus:e="ambient",filterFreq:t=400,gain:n=0}){if(!this.ready)return null;const i=this.ctx.createBufferSource();i.buffer=this.noiseBuffer,i.loop=!0;const s=this.ctx.createBiquadFilter();s.type="lowpass",s.frequency.value=t,s.Q.value=.5;const a=this.ctx.createGain();return a.gain.value=n,i.connect(s),s.connect(a),a.connect(this.buses[e]),i.start(),{gain:a,filter:s,stop:()=>{try{i.stop()}catch{}i.disconnect(),s.disconnect(),a.disconnect()}}}}class Ty{constructor(e=8192){this.threshold=e,this.thresholdSq=e*e,this.offset=new b,this.callbacks=new Set,this._delta=new b}onShift(e){return this.callbacks.add(e),()=>this.callbacks.delete(e)}update(e){if(e.lengthSq()<this.thresholdSq)return;const t=this._delta.copy(e);for(const n of this.callbacks)n(t);this.offset.add(t)}}class Ey{constructor(e){this.engine=e,this.minScale=.55,this.maxScale=e.isMobile?.9:1,this.scale=e.resolutionScale,this._accumTime=0,this._accumFrames=0,this._cooldown=0,this.fps=60}update(e){if(this.fps+=(1/Math.max(e,1e-4)-this.fps)*.05,this._accumTime+=e,this._accumFrames++,this._cooldown>0&&(this._cooldown-=e),this._accumTime<1||this._cooldown>0)return;const t=this._accumTime/this._accumFrames;this._accumTime=0,this._accumFrames=0,t>1/42&&this.scale>this.minScale?(this.scale=Math.max(this.minScale,this.scale-.1),this.engine.setResolutionScale(this.scale),this._cooldown=2):t<1/57&&this.scale<this.maxScale&&(this.scale=Math.min(this.maxScale,this.scale+.05),this.engine.setResolutionScale(this.scale),this._cooldown=3)}}class Ay{constructor(e){this.engine=new xy(e),this.events=new My,this.input=new Sy,this.audio=new wy,this.origin=new Ty(8192),this.quality=new Ey(this.engine),this.systems=[],this.player=null,this.universe=null,this.enemies=null,this.weapons=null,this.obstacles=[],this.asteroidFields=[],this.explosions=null,this.pickups=null,this.entryHeat=0,this.paused=!0,this.mode="flight",this.creative=!1,this.rebaseAnchor=null,this.engine.onUpdate((t,n)=>this._update(t,n))}addSystem(e,t){return this.systems.push({name:e,system:t}),t}_update(e,t){if(this.input.update(),!this.paused){for(const{system:i}of this.systems)i.update&&i.update(e,t);const n=this.rebaseAnchor||this.player&&this.player.position;n&&this.origin.update(n)}this.quality.update(e)}start(){this.engine.start()}}const sf=new b(0,0,0),Mo=5e3,Na=new b(1200,800,46e3),Dn="starfall-7741";class Ua{constructor(e){this.object3D=new Xe,this.visual=e.group,this.object3D.add(this.visual),this.position=this.object3D.position,this.quaternion=this.object3D.quaternion,this.velocity=new b,this.angularRates=new b,this.radius=e.radius,this.engines=e.engines,this.hardpoints=e.hardpoints,this.glowColor=e.glowColor,this.engineScale=e.engineScale??1,this.rigModeled=e.modeled!==!1,this.hullMax=100,this.hull=100,this.shieldMax=100,this.shield=100,this.shieldRegenRate=9,this.shieldRegenDelay=3.5,this.alive=!0,this._sinceDamage=1/0,this._tmpQuat=new ht,this._tmpEuler=new Wt,this._tmpVec=new b}getForward(e){return e.set(0,0,-1).applyQuaternion(this.quaternion)}getUp(e){return e.set(0,1,0).applyQuaternion(this.quaternion)}get speed(){return this.velocity.length()}applyDamage(e){if(!this.alive)return{shieldAbsorbed:0,hullDamage:0,destroyed:!1};this._sinceDamage=0;const t=Math.min(this.shield,e);this.shield-=t;const n=e-t;this.hull=Math.max(0,this.hull-n);const i=this.hull<=0;return i&&(this.alive=!1),{shieldAbsorbed:t,hullDamage:n,destroyed:i}}integrate(e){this._tmpEuler.set(this.angularRates.x*e,this.angularRates.y*e,this.angularRates.z*e,"XYZ"),this._tmpQuat.setFromEuler(this._tmpEuler),this.quaternion.multiply(this._tmpQuat).normalize(),this.position.addScaledVector(this.velocity,e)}updateDefense(e){this._sinceDamage+=e,this.alive&&this._sinceDamage>this.shieldRegenDelay&&this.shield<this.shieldMax&&(this.shield=Math.min(this.shieldMax,this.shield+this.shieldRegenRate*e))}}function rf(r){const e=String(r);let t=2166136261;for(let n=0;n<e.length;n++)t^=e.charCodeAt(n),t=Math.imul(t,16777619);return t>>>0}function af(r){let e=r>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}class qt{constructor(e){this.next=af(rf(e))}range(e,t){return e+this.next()*(t-e)}int(e,t){return e+Math.floor(this.next()*(t-e+1))}chance(e){return this.next()<e}pick(e){return e[Math.floor(this.next()*e.length)]}unitVector(){let e,t,n;do e=this.range(-1,1),t=this.range(-1,1),n=e*e+t*t;while(n>=1||n===0);const i=2*Math.sqrt(1-n);return[e*i,t*i,1-2*n]}gaussian(){return(this.next()+this.next()+this.next()+this.next()-2)*1.73}}function Jh(r,e){if(e===op)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Ac||e===yd){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Ac)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class of extends Ps{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Dy(t)}),this.register(function(t){return new Iy(t)}),this.register(function(t){return new Gy(t)}),this.register(function(t){return new Vy(t)}),this.register(function(t){return new Wy(t)}),this.register(function(t){return new Ny(t)}),this.register(function(t){return new Uy(t)}),this.register(function(t){return new Oy(t)}),this.register(function(t){return new ky(t)}),this.register(function(t){return new Ly(t)}),this.register(function(t){return new zy(t)}),this.register(function(t){return new Fy(t)}),this.register(function(t){return new Hy(t)}),this.register(function(t){return new By(t)}),this.register(function(t){return new Cy(t)}),this.register(function(t){return new qy(t)}),this.register(function(t){return new jy(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=ir.extractUrlBase(e);a=ir.resolveURL(l,this.path)}else a=ir.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Jd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===cf){try{a[je.KHR_BINARY_GLTF]=new Xy(e)}catch(u){i&&i(u);return}s=JSON.parse(a[je.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new ax(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case je.KHR_MATERIALS_UNLIT:a[u]=new Py;break;case je.KHR_DRACO_MESH_COMPRESSION:a[u]=new Yy(s,this.dracoLoader);break;case je.KHR_TEXTURE_TRANSFORM:a[u]=new Ky;break;case je.KHR_MESH_QUANTIZATION:a[u]=new $y;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Ry(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Cy{constructor(e){this.parser=e,this.name=je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new X(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Qt);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new ef(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new Zb(h),l.distance=u;break;case"spot":l=new $b(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,Yn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class Py{constructor(){this.name=je.KHR_MATERIALS_UNLIT}getMaterialType(){return xt}extendParams(e,t,n){const i=[];e.color=new X(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Qt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,yt))}return Promise.all(i)}}class Ly{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class Dy{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ne(o,o)}return Promise.all(s)}}class Iy{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Fy{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class Ny{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new X(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Qt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,yt)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class Uy{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class Oy{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new X().setRGB(o[0],o[1],o[2],Qt),Promise.all(s)}}class ky{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class zy{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new X().setRGB(o[0],o[1],o[2],Qt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,yt)),Promise.all(s)}}class By{constructor(e){this.parser=e,this.name=je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class Hy{constructor(e){this.parser=e,this.name=je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:On}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class Gy{constructor(e){this.parser=e,this.name=je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class Vy{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class Wy{constructor(e){this.parser=e,this.name=je.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class qy{constructor(e){this.name=je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class jy{constructor(e){this.name=je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==fn.TRIANGLES&&l.mode!==fn.TRIANGLE_STRIP&&l.mode!==fn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const m of u){const _=new Ne,g=new b,p=new ht,y=new b(1,1,1),x=new va(m.geometry,m.material,d);for(let v=0;v<d;v++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,v),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,v),c.SCALE&&y.fromBufferAttribute(c.SCALE,v),x.setMatrixAt(v,_.compose(g,p,y));for(const v in c)if(v==="_COLOR_0"){const P=c[v];x.instanceColor=new Lc(P.array,P.itemSize,P.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&m.geometry.setAttribute(v,c[v]);ft.prototype.copy.call(x,m),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const cf="glTF",qs=12,eu={JSON:1313821514,BIN:5130562};class Xy{constructor(e){this.name=je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,qs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==cf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-qs,s=new DataView(e,qs);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const c=s.getUint32(a,!0);if(a+=4,c===eu.JSON){const l=new Uint8Array(e,qs+a,o);this.content=n.decode(l)}else if(c===eu.BIN){const l=qs+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class Yy{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=Uc[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Uc[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=us[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const m in f.attributes){const _=f.attributes[m],g=c[m];g!==void 0&&(_.normalized=g)}u(f)},o,l,Qt,d)})})}}class Ky{constructor(){this.name=je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class $y{constructor(){this.name=je.KHR_MESH_QUANTIZATION}}class lf extends yr{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,m=e*l,_=m-l,g=-2*f+3*d,p=f-d,y=1-g,x=p-d+u;for(let v=0;v!==o;v++){const P=a[_+v+o],A=a[_+v+c]*h,E=a[m+v+o],L=a[m+v]*h;s[v]=y*P+x*A+g*E+p*L}return s}}const Qy=new ht;class Zy extends lf{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return Qy.fromArray(s).normalize().toArray(s),s}}const fn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},us={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},tu={9728:$t,9729:sn,9984:hd,9985:ca,9986:Ys,9987:In},nu={33071:gi,33648:ga,10497:Ii},So={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Uc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},di={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Jy={CUBICSPLINE:void 0,LINEAR:or,STEP:ar},wo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ex(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Mt({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:En})),r.DefaultMaterial}function Ti(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Yn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function tx(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function nx(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ix(r){let e;const t=r.extensions&&r.extensions[je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+To(t.attributes):e=r.indices+":"+To(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+To(r.targets[n]);return e}function To(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Oc(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function sx(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const rx=new Ne;class ax{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Ry,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Xb(this.options.manager):this.textureLoader=new ey(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Jd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Ti(s,o,i),Yn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())s(h,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[je.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(ir.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=So[i.type],o=us[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new lt(l,a,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],c=So[i.type],l=us[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,m=i.normalized===!0;let _,g;if(f&&f!==u){const p=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(y);x||(_=new l(o,p*f,i.count*f/h),x=new zd(_,f/h),t.cache.add(y,x)),g=new hr(x,c,d%f/h,m)}else o===null?_=new l(i.count*c):_=new l(o,d,i.count*c),g=new lt(_,c,m);if(i.sparse!==void 0){const p=So.SCALAR,y=us[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,P=new y(a[1],x,i.sparse.count*p),A=new l(a[2],v,i.sparse.count*c);o!==null&&(g=new lt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let E=0,L=P.length;E<L;E++){const S=P[E];if(g.setX(S,A[E*c]),c>=2&&g.setY(S,A[E*c+1]),c>=3&&g.setZ(S,A[E*c+2]),c>=4&&g.setW(S,A[E*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=m}return g})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=tu[d.magFilter]||sn,h.minFilter=tu[d.minFilter]||In,h.wrapS=nu[d.wrapS]||Ii,h.wrapT=nu[d.wrapT]||Ii,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==$t&&h.minFilter!==sn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let m=d;t.isImageBitmapLoader===!0&&(m=function(_){const g=new Et(_);g.needsUpdate=!0,d(g)}),t.load(ir.resolveURL(u,s.path),m,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),Yn(u,a),u.userData.mimeType=a.mimeType||sx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[je.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[je.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=s.associations.get(a);a=s.extensions[je.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new il,Tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Vd,Tn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Mt}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},c=s.extensions||{},l=[];if(c[je.KHR_MATERIALS_UNLIT]){const u=i[je.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new X(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Qt),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,yt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Nt);const h=s.alphaMode||wo.OPAQUE;if(h===wo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===wo.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==xt&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ne(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==xt&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==xt){const u=s.emissiveFactor;o.emissive=new X().setRGB(u[0],u[1],u[2],Qt)}return s.emissiveTexture!==void 0&&a!==xt&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,yt)),Promise.all(l).then(function(){const u=new a(o);return s.name&&(u.name=s.name),Yn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Ti(i,u,s),u})}createUniqueName(e){const t=ct.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return iu(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=ix(l),u=i[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[je.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=iu(new vt,l,t),i[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?ex(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,m=h.length;f<m;f++){const _=h[f],g=a[f];let p;const y=l[f];if(g.mode===fn.TRIANGLES||g.mode===fn.TRIANGLE_STRIP||g.mode===fn.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new $v(_,y):new pe(_,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===fn.TRIANGLE_STRIP?p.geometry=Jh(p.geometry,yd):g.mode===fn.TRIANGLE_FAN&&(p.geometry=Jh(p.geometry,Ac));else if(g.mode===fn.LINES)p=new Jv(_,y);else if(g.mode===fn.LINE_STRIP)p=new nl(_,y);else if(g.mode===fn.LINE_LOOP)p=new eb(_,y);else if(g.mode===fn.POINTS)p=new sl(_,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&nx(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Yn(p,s),g.extensions&&Ti(i,p,g),t.assignFinalMaterial(p),u.push(p)}for(let f=0,m=u.length;f<m;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Ti(i,u[0],s),u[0];const d=new Xe;s.extensions&&Ti(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,m=u.length;f<m;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Kt(Np.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new gr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Yn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new Ne;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new tl(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],m=i.samplers[f.sampler],_=f.target,g=_.node,p=i.parameters!==void 0?i.parameters[m.input]:m.input,y=i.parameters!==void 0?i.parameters[m.output]:m.output;_.node!==void 0&&(a.push(this.getDependency("node",g)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",y)),l.push(m),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],m=u[2],_=u[3],g=u[4],p=[];for(let y=0,x=d.length;y<x;y++){const v=d[y],P=f[y],A=m[y],E=_[y],L=g[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const S=n._createAnimationTracks(v,P,A,E,L);if(S)for(let M=0;M<S.length;M++)p.push(S[M])}return new Bb(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,rx)});for(let f=0,m=u.length;f<m;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(s.isBone===!0?h=new Hd:l.length>1?h=new Xe:l.length===1?h=l[0]:h=new ft,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=a),Yn(h,s),s.extensions&&Ti(n,h,s),s.matrix!==void 0){const u=new Ne;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Xe;n.name&&(s.name=i.createUniqueName(n.name)),Yn(s,n),n.extensions&&Ti(t,s,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof Tn||d instanceof Et)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,c=[];di[s.path]===di.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(di[s.path]){case di.weights:l=bs;break;case di.rotation:l=ys;break;case di.position:case di.scale:l=xs;break;default:switch(n.itemSize){case 1:l=bs;break;case 2:case 3:default:l=xs;break}break}const h=i.interpolation!==void 0?Jy[i.interpolation]:or,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const m=new l(c[d]+"."+di[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),a.push(m)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Oc(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ys?Zy:lf;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function ox(r,e,t){const n=e.attributes,i=new on;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new b(c[0],c[1],c[2]),new b(l[0],l[1],l[2])),o.normalized){const h=Oc(us[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new b,c=new b;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,m=d.max;if(f!==void 0&&m!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(m[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(m[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(m[2]))),d.normalized){const _=Oc(us[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new An;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function iu(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(const a in n){const o=Uc[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return $e.workingColorSpace!==Qt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${$e.workingColorSpace}" not supported.`),Yn(r,e),ox(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?tx(r,e.targets,t):r})}var hf=(function(){var r="b9H79Tebbbe8Fv9Gbb9Gvuuuuueu9Giuuub9Geueu9Giuuueuikqbeeedddillviebeoweuec:q;iekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbeY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVbdE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbiL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtblK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbol79IV9Rbrq:P8Yqdbk;3sezu8Jjjjjbcj;eb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Radz1jjjbhwcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhDcbhqinaqae9pmeaDaeaq9RaqaDfae6Egkcsfgocl4cifcd4hxdndndndnaoc9WGgmTmbcbhPcehsawcjdfhzalhHinaraH9Rax6midnaraHaxfgl9RcK6mbczhoinawcj;cbfaogifgoc9WfhOdndndndndnaHaic9WfgAco4fRbbaAci4coG4ciGPlbedibkaO9cb83ibaOcwf9cb83ibxikaOalRblalRbbgAco4gCaCciSgCE86bbaocGfalclfaCfgORbbaAcl4ciGgCaCciSgCE86bbaocVfaOaCfgORbbaAcd4ciGgCaCciSgCE86bbaoc7faOaCfgORbbaAciGgAaAciSgAE86bbaoctfaOaAfgARbbalRbegOco4gCaCciSgCE86bbaoc91faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc4faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc93faAaCfgARbbaOciGgOaOciSgOE86bbaoc94faAaOfgARbbalRbdgOco4gCaCciSgCE86bbaoc95faAaCfgARbbaOcl4ciGgCaCciSgCE86bbaoc96faAaCfgARbbaOcd4ciGgCaCciSgCE86bbaoc97faAaCfgARbbaOciGgOaOciSgOE86bbaoc98faAaOfgORbbalRbiglco4gAaAciSgAE86bbaoc99faOaAfgORbbalcl4ciGgAaAciSgAE86bbaoc9:faOaAfgORbbalcd4ciGgAaAciSgAE86bbaocufaOaAfgoRbbalciGglalciSglE86bbaoalfhlxdkaOalRbwalRbbgAcl4gCaCcsSgCE86bbaocGfalcwfaCfgORbbaAcsGgAaAcsSgAE86bbaocVfaOaAfgORbbalRbegAcl4gCaCcsSgCE86bbaoc7faOaCfgORbbaAcsGgAaAcsSgAE86bbaoctfaOaAfgORbbalRbdgAcl4gCaCcsSgCE86bbaoc91faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc4faOaAfgORbbalRbigAcl4gCaCcsSgCE86bbaoc93faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc94faOaAfgORbbalRblgAcl4gCaCcsSgCE86bbaoc95faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc96faOaAfgORbbalRbvgAcl4gCaCcsSgCE86bbaoc97faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc98faOaAfgORbbalRbogAcl4gCaCcsSgCE86bbaoc99faOaCfgORbbaAcsGgAaAcsSgAE86bbaoc9:faOaAfgORbbalRbrglcl4gAaAcsSgAE86bbaocufaOaAfgoRbbalcsGglalcsSglE86bbaoalfhlxekaOal8Pbb83bbaOcwfalcwf8Pbb83bbalczfhlkdnaiam9pmbaiczfhoaral9RcL0mekkaiam6mialTmidnakTmbawaPfRbbhOcbhoazhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkkazcefhzaPcefgPad6hsalhHaPad9hmexvkkcbhlasceGmdxikalaxad2fhCdnakTmbcbhHcehsawcjdfhminaral9Rax6mialTmdalaxfhlawaHfRbbhOcbhoamhiinaiawcj;cbfaofRbbgAce4cbaAceG9R7aOfgO86bbaiadfhiaocefgoak9hmbkamcefhmaHcefgHad6hsaHad9hmbkaChlxikcbhocehsinaral9Rax6mdalTmealaxfhlaocefgoad6hsadao9hmbkaChlxdkcbhlasceGTmekc9:hoxikabaqad2fawcjdfakad2z1jjjb8Aawawcjdfakcufad2fadz1jjjb8Aakaqfhqalmbkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;ebf8Kjjjjbaok;yzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecjez:jjjjb8AavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:Lvoeue99dud99eud99dndnadcl9hmbaeTmeindndnabcdfgd8Sbb:Yab8Sbbgi:Ygl:l:tabcefgv8Sbbgo:Ygr:l:tgwJbb;:9cawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai86bbdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad86bbdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad86bbabclfhbaecufgembxdkkaeTmbindndnabclfgd8Ueb:Yab8Uebgi:Ygl:l:tabcdfgv8Uebgo:Ygr:l:tgwJb;:FSawawNJbbbbawawJbbbb9GgDEgq:mgkaqaicb9iEalMgwawNakaqaocb9iEarMgqaqNMM:r:vglNJbbbZJbbb:;aDEMgr:lJbbb9p9DTmbar:Ohixekcjjjj94hikadai87ebdndnaqalNJbbbZJbbb:;aqJbbbb9GEMgq:lJbbb9p9DTmbaq:Ohdxekcjjjj94hdkavad87ebdndnawalNJbbbZJbbb:;awJbbbb9GEMgw:lJbbb9p9DTmbaw:Ohdxekcjjjj94hdkabad87ebabcwfhbaecufgembkkk;siliui99iue99dnaeTmbcbhiabhlindndnJ;Zl81Zalcof8UebgvciV:Y:vgoal8Ueb:YNgrJb;:FSNJbbbZJbbb:;arJbbbb9GEMgw:lJbbb9p9DTmbaw:OhDxekcjjjj94hDkalclf8Uebhqalcdf8UebhkabavcefciGaiVcetfaD87ebdndnaoak:YNgwJb;:FSNJbbbZJbbb:;awJbbbb9GEMgx:lJbbb9p9DTmbax:Ohkxekcjjjj94hkkabavcdfciGaiVcetfak87ebdndnaoaq:YNgoJb;:FSNJbbbZJbbb:;aoJbbbb9GEMgx:lJbbb9p9DTmbax:Ohqxekcjjjj94hqkabavcufciGaiVcetfaq87ebdndnJbbjZararN:tawawN:taoaoN:tgrJbbbbarJbbbb9GE:rJb;:FSNJbbbZMgr:lJbbb9p9DTmbar:Ohqxekcjjjj94hqkabavciGaiVcetfaq87ebalcwfhlaiclfhiaecufgembkkk9mbdnadcd4ae2geTmbinababydbgdcwtcw91:Yadce91cjjj;8ifcjjj98G::NUdbabclfhbaecufgembkkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaik;LeeeudndnaeabVciGTmbabhixekdndnadcz9pmbabhixekabhiinaiaeydbBdbaiclfaeclfydbBdbaicwfaecwfydbBdbaicxfaecxfydbBdbaiczfhiaeczfheadc9Wfgdcs0mbkkadcl6mbinaiaeydbBdbaeclfheaiclfhiadc98fgdci0mbkkdnadTmbinaiaeRbb86bbaicefhiaecefheadcufgdmbkkabk;aeedudndnabciGTmbabhixekaecFeGc:b:c:ew2hldndnadcz9pmbabhixekabhiinaialBdbaicxfalBdbaicwfalBdbaiclfalBdbaiczfhiadc9Wfgdcs0mbkkadcl6mbinaialBdbaiclfhiadc98fgdci0mbkkdnadTmbinaiae86bbaicefhiadcufgdmbkkabkkkebcjwklz9Kbb",e="b9H79TebbbeKl9Gbb9Gvuuuuueu9Giuuub9Geueuikqbbebeedddilve9Weeeviebeoweuec:q;Aekr;leDo9TW9T9VV95dbH9F9F939H79T9F9J9H229F9Jt9VV7bb8A9TW79O9V9Wt9F9KW9J9V9KW9wWVtW949c919M9MWVbdY9TW79O9V9Wt9F9KW9J9V9KW69U9KW949c919M9MWVblE9TW79O9V9Wt9F9KW9J9V9KW69U9KW949tWG91W9U9JWbvL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9p9JtboK9TW79O9V9Wt9F9KW9J9V9KWS9P2tWV9r919HtbrL9TW79O9V9Wt9F9KW9J9V9KWS9P2tWVT949Wbwl79IV9RbDq;t9tqlbzik9:evu8Jjjjjbcz9Rhbcbheincbhdcbhiinabcwfadfaicjuaead4ceGglE86bbaialfhiadcefgdcw9hmbkaec:q:yjjbfai86bbaecitc:q1jjbfab8Piw83ibaecefgecjd9hmbkk;h8JlHud97euo978Jjjjjbcj;kb9Rgv8Kjjjjbc9:hodnadcefal0mbcuhoaiRbbc:Ge9hmbavaialfgrad9Rad;8qbbcj;abad9UhoaicefhldnadTmbaoc;WFbGgocjdaocjd6EhwcbhDinaDae9pmeawaeaD9RaDawfae6Egqcsfgoc9WGgkci2hxakcethmaocl4cifcd4hPabaDad2fhscbhzdnincehHalhOcbhAdninaraO9RaP6miavcj;cbfaAak2fhCaOaPfhlcbhidnakc;ab6mbaral9Rc;Gb6mbcbhoinaCaofhidndndndndnaOaoco4fRbbgXciGPlbedibkaipxbbbbbbbbbbbbbbbbpklbxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklbalczfhlkdndndndndnaXcd4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklzxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklzalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklzalczfhlkdndndndndnaXcl4ciGPlbedibkaipxbbbbbbbbbbbbbbbbpklaxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklaalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaialpbbbpklaalczfhlkdndndndndnaXco4Plbedibkaipxbbbbbbbbbbbbbbbbpkl8WxikaialpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalclfaYpQbfaXc:q:yjjbfRbbfhlxdkaialpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibaXc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgXcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spkl8WalcwfaYpQbfaXc:q:yjjbfRbbfhlxekaialpbbbpkl8Walczfhlkaoc;abfhiaocjefak0meaihoaral9Rc;Fb0mbkkdndnaiak9pmbaici4hoinaral9RcK6mdaCaifhXdndndndndnaOaico4fRbbaocoG4ciGPlbedibkaXpxbbbbbbbbbbbbbbbbpklbxikaXalpbblalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLgQcdp:meaQpmbzeHdOiAlCvXoQrLpxiiiiiiiiiiiiiiiip9ogLpxiiiiiiiiiiiiiiiip8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalclfaYpQbfaKc:q:yjjbfRbbfhlxdkaXalpbbwalpbbbgQclp:meaQpmbzeHdOiAlCvXoQrLpxssssssssssssssssp9ogLpxssssssssssssssssp8JgQp5b9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibaKc:q:yjjbfpbbbgYaYpmbbbbbbbbbbbbbbbbaQp5e9cjF;8;4;W;G;ab9:9cU1:NgKcitc:q1jjbfpbibp9UpmbedilvorzHOACXQLpPaLaQp9spklbalcwfaYpQbfaKc:q:yjjbfRbbfhlxekaXalpbbbpklbalczfhlkaocdfhoaiczfgiak6mbkkalTmbaAci6hHalhOaAcefgohAaoclSmdxekkcbhlaHceGmdkdnakTmbavcjdfazfhiavazfpbdbhYcbhXinaiavcj;cbfaXfgopblbgLcep9TaLpxeeeeeeeeeeeeeeeegQp9op9Hp9rgLaoakfpblbg8Acep9Ta8AaQp9op9Hp9rg8ApmbzeHdOiAlCvXoQrLgEaoamfpblbg3cep9Ta3aQp9op9Hp9rg3aoaxfpblbg5cep9Ta5aQp9op9Hp9rg5pmbzeHdOiAlCvXoQrLg8EpmbezHdiOAlvCXorQLgQaQpmbedibedibedibediaYp9UgYp9AdbbaiadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaEa8EpmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwKDYq8AkEx3m5P8Es8FgLa3a5pmwKDYq8AkEx3m5P8Es8Fg8ApmbezHdiOAlvCXorQLgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfgoaYaLa8ApmwDKYqk8AExm35Ps8E8FgQaQpmbedibedibedibedip9UgYp9AdbbaoadfgoaYaQaQpmlvorlvorlvorlvorp9UgYp9AdbbaoadfgoaYaQaQpmwDqkwDqkwDqkwDqkp9UgYp9AdbbaoadfgoaYaQaQpmxmPsxmPsxmPsxmPsp9UgYp9AdbbaoadfhiaXczfgXak6mbkkazclfgzad6mbkasavcjdfaqad2;8qbbavavcjdfaqcufad2fad;8qbbaqaDfhDc9:hoalmexikkc9:hoxekcbc99aral9Radcaadca0ESEhokavcj;kbf8Kjjjjbaokwbz:bjjjbk;uzeHu8Jjjjjbc;ae9Rgv8Kjjjjbc9:hodnaeci9UgrcHfal0mbcuhoaiRbbgwc;WeGc;Ge9hmbawcsGgDce0mbavc;abfcFecje;8kbavcUf9cu83ibavc8Wf9cu83ibavcyf9cu83ibavcaf9cu83ibavcKf9cu83ibavczf9cu83ibav9cu83iwav9cu83ibaialfc9WfhqaicefgwarfhodnaeTmbcmcsaDceSEhkcbhxcbhmcbhDcbhicbhlindnaoaq9nmbc9:hoxikdndnawRbbgrc;Ve0mbavc;abfalarcl4cu7fcsGcitfgPydlhsaPydbhzdnarcsGgPak9pmbavaiarcu7fcsGcdtfydbaxaPEhraPThPdndnadcd9hmbabaDcetfgHaz87ebaHcdfas87ebaHclfar87ebxekabaDcdtfgHazBdbaHclfasBdbaHcwfarBdbkaxaPfhxavc;abfalcitfgHarBdbaHasBdlavaicdtfarBdbavc;abfalcefcsGglcitfgHazBdbaHarBdlaiaPfhialcefhlxdkdndnaPcsSmbamaPfaPc987fcefhmxekaocefhrao8SbbgPcFeGhHdndnaPcu9mmbarhoxekaocvfhoaHcFbGhHcrhPdninar8SbbgOcFbGaPtaHVhHaOcu9kmearcefhraPcrfgPc8J9hmbxdkkarcefhokaHce4cbaHceG9R7amfhmkdndnadcd9hmbabaDcetfgraz87ebarcdfas87ebarclfam87ebxekabaDcdtfgrazBdbarclfasBdbarcwfamBdbkavc;abfalcitfgramBdbarasBdlavaicdtfamBdbavc;abfalcefcsGglcitfgrazBdbaramBdlaicefhialcefhlxekdnarcpe0mbaxcefgOavaiaqarcsGfRbbgPcl49RcsGcdtfydbaPcz6gHEhravaiaP9RcsGcdtfydbaOaHfgsaPcsGgOEhPaOThOdndnadcd9hmbabaDcetfgzax87ebazcdfar87ebazclfaP87ebxekabaDcdtfgzaxBdbazclfarBdbazcwfaPBdbkavaicdtfaxBdbavc;abfalcitfgzarBdbazaxBdlavaicefgicsGcdtfarBdbavc;abfalcefcsGcitfgzaPBdbazarBdlavaiaHfcsGgicdtfaPBdbavc;abfalcdfcsGglcitfgraxBdbaraPBdlalcefhlaiaOfhiasaOfhxxekaxcbaoRbbgzEgAarc;:eSgrfhsazcsGhCazcl4hXdndnazcs0mbascefhOxekashOavaiaX9RcsGcdtfydbhskdndnaCmbaOcefhxxekaOhxavaiaz9RcsGcdtfydbhOkdndnarTmbaocefhrxekaocdfhrao8SbegHcFeGhPdnaHcu9kmbaocofhAaPcFbGhPcrhodninar8SbbgHcFbGaotaPVhPaHcu9kmearcefhraocrfgoc8J9hmbkaAhrxekarcefhrkaPce4cbaPceG9R7amfgmhAkdndnaXcsSmbarhPxekarcefhPar8SbbgocFeGhHdnaocu9kmbarcvfhsaHcFbGhHcrhodninaP8SbbgrcFbGaotaHVhHarcu9kmeaPcefhPaocrfgoc8J9hmbkashPxekaPcefhPkaHce4cbaHceG9R7amfgmhskdndnaCcsSmbaPhoxekaPcefhoaP8SbbgrcFeGhHdnarcu9kmbaPcvfhOaHcFbGhHcrhrdninao8SbbgPcFbGartaHVhHaPcu9kmeaocefhoarcrfgrc8J9hmbkaOhoxekaocefhokaHce4cbaHceG9R7amfgmhOkdndnadcd9hmbabaDcetfgraA87ebarcdfas87ebarclfaO87ebxekabaDcdtfgraABdbarclfasBdbarcwfaOBdbkavc;abfalcitfgrasBdbaraABdlavaicdtfaABdbavc;abfalcefcsGcitfgraOBdbarasBdlavaicefgicsGcdtfasBdbavc;abfalcdfcsGcitfgraABdbaraOBdlavaiazcz6aXcsSVfgicsGcdtfaOBdbaiaCTaCcsSVfhialcifhlkawcefhwalcsGhlaicsGhiaDcifgDae6mbkkcbc99aoaqSEhokavc;aef8Kjjjjbaok:llevu8Jjjjjbcz9Rhvc9:hodnaecvfal0mbcuhoaiRbbc;:eGc;qe9hmbav9cb83iwaicefhraialfc98fhwdnaeTmbdnadcdSmbcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcdtfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfglBdbaoalBdbaDcefgDae9hmbxdkkcbhDindnaraw6mbc9:skarcefhoar8SbbglcFeGhidndnalcu9mmbaohrxekarcvfhraicFbGhicrhldninao8SbbgdcFbGaltaiVhiadcu9kmeaocefhoalcrfglc8J9hmbxdkkaocefhrkabaDcetfaicd4cbaice4ceG9R7avcwfaiceGcdtVgoydbfgl87ebaoalBdbaDcefgDae9hmbkkcbc99arawSEhokaok:EPliuo97eue978Jjjjjbca9Rhidndnadcl9hmbdnaec98GglTmbcbhvabhdinadadpbbbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpkbbadczfhdavclfgval6mbkkalae9pmeaiaeciGgvcdtgdVcbczad9R;8kbaiabalcdtfglad;8qbbdnavTmbaiaipblbgocKp:RecKp:Sep;6egraocwp:RecKp:Sep;6earp;Geaoczp:RecKp:Sep;6egwp;Gep;Kep;LegDpxbbbbbbbbbbbbbbbbp:2egqarpxbbbjbbbjbbbjbbbjgkp9op9rp;Kegrpxbb;:9cbb;:9cbb;:9cbb;:9cararp;MeaDaDp;Meawaqawakp9op9rp;Kegrarp;Mep;Kep;Kep;Jep;Negwp;Mepxbbn0bbn0bbn0bbn0gqp;KepxFbbbFbbbFbbbFbbbp9oaopxbbbFbbbFbbbFbbbFp9op9qarawp;Meaqp;Kecwp:RepxbFbbbFbbbFbbbFbbp9op9qaDawp;Meaqp;Keczp:RepxbbFbbbFbbbFbbbFbp9op9qpklbkalaiad;8qbbskdnaec98GgxTmbcbhvabhdinadczfglalpbbbgopxbbbbbbFFbbbbbbFFgkp9oadpbbbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpkbbadaDakp9oawaopmbezHdiOAlvCXorQLp9qpkbbadcafhdavclfgvax6mbkkaxae9pmbaiaeciGgvcitgdfcbcaad9R;8kbaiabaxcitfglad;8qbbdnavTmbaiaipblzgopxbbbbbbFFbbbbbbFFgkp9oaipblbgDaopmlvorxmPsCXQL358E8FpxFubbFubbFubbFubbp9op;6eaDaopmbediwDqkzHOAKY8AEgoczp:Sep;6egrp;Geaoczp:Reczp:Sep;6egwp;Gep;Kep;Legopxb;:FSb;:FSb;:FSb;:FSawaopxbbbbbbbbbbbbbbbbp:2egqawpxbbbjbbbjbbbjbbbjgmp9op9rp;Kegwawp;Meaoaop;Mearaqaramp9op9rp;Kegoaop;Mep;Kep;Kep;Jep;Negrp;Mepxbbn0bbn0bbn0bbn0gqp;Keczp:Reawarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9op9qgwaoarp;Meaqp;KepxFFbbFFbbFFbbFFbbp9ogopmwDKYqk8AExm35Ps8E8Fp9qpklzaiaDakp9oawaopmbezHdiOAlvCXorQLp9qpklbkalaiad;8qbbkk;4wllue97euv978Jjjjjbc8W9Rhidnaec98GglTmbcbhvabhoinaiaopbbbgraoczfgwpbbbgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklbaopxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblbpEb:T:j83ibaocwfarp5eaipblbpEe:T:j83ibawaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblbpEd:T:j83ibaocKfakp5eaipblbpEi:T:j83ibaocafhoavclfgval6mbkkdnalae9pmbaiaeciGgvcitgofcbcaao9R;8kbaiabalcitfgwao;8qbbdnavTmbaiaipblbgraipblzgDpmlvorxmPsCXQL358E8Fgqczp:Segkclp:RepklaaipxbbjZbbjZbbjZbbjZpx;Zl81Z;Zl81Z;Zl81Z;Zl81Zakpxibbbibbbibbbibbbp9qp;6ep;NegkaraDpmbediwDqkzHOAKY8AEgrczp:Reczp:Sep;6ep;MegDaDp;Meakarczp:Sep;6ep;Megxaxp;Meakaqczp:Reczp:Sep;6ep;Megqaqp;Mep;Kep;Kep;Lepxbbbbbbbbbbbbbbbbp:4ep;Jepxb;:FSb;:FSb;:FSb;:FSgkp;Mepxbbn0bbn0bbn0bbn0grp;KepxFFbbFFbbFFbbFFbbgmp9oaxakp;Mearp;Keczp:Rep9qgxaqakp;Mearp;Keczp:ReaDakp;Mearp;Keamp9op9qgkpmbezHdiOAlvCXorQLgrp5baipblapEb:T:j83ibaiarp5eaipblapEe:T:j83iwaiaxakpmwDKYqk8AExm35Ps8E8Fgkp5baipblapEd:T:j83izaiakp5eaipblapEi:T:j83iKkawaiao;8qbbkk:Pddiue978Jjjjjbc;ab9Rhidnadcd4ae2glc98GgvTmbcbhdabheinaeaepbbbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepkbbaeczfheadclfgdav6mbkkdnaval9pmbaialciGgdcdtgeVcbc;abae9R;8kbaiabavcdtfgvae;8qbbdnadTmbaiaipblbgocwp:Recwp:Sep;6eaocep:SepxbbjZbbjZbbjZbbjZp:UepxbbjFbbjFbbjFbbjFp9op;Mepklbkavaiae;8qbbkk9teiucbcbydj1jjbgeabcifc98GfgbBdj1jjbdndnabZbcztgd9nmbcuhiabad9RcFFifcz4nbcuSmekaehikaikkkebcjwklz9Tbb",t=new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,3,2,0,0,5,3,1,0,1,12,1,0,10,22,2,12,0,65,0,65,0,65,0,252,10,0,0,11,7,0,65,0,253,15,26,11]),n=new Uint8Array([32,0,65,2,1,106,34,33,3,128,11,4,13,64,6,253,10,7,15,116,127,5,8,12,40,16,19,54,20,9,27,255,113,17,42,67,24,23,146,148,18,14,22,45,70,69,56,114,101,21,25,63,75,136,108,28,118,29,73,115]);if(typeof WebAssembly!="object")return{supported:!1};var i=WebAssembly.validate(t)?e:r,s,a=WebAssembly.instantiate(o(i),{}).then(function(p){s=p.instance,s.exports.__wasm_call_ctors()});function o(p){for(var y=new Uint8Array(p.length),x=0;x<p.length;++x){var v=p.charCodeAt(x);y[x]=v>96?v-97:v>64?v-39:v+4}for(var P=0,x=0;x<p.length;++x)y[P++]=y[x]<60?n[y[x]]:(y[x]-60)*64+y[++x];return y.buffer.slice(0,P)}function c(p,y,x,v,P,A){var E=s.exports.sbrk,L=x+3&-4,S=E(L*v),M=E(P.length),C=new Uint8Array(s.exports.memory.buffer);C.set(P,M);var U=p(S,x,v,M,P.length);if(U==0&&A&&A(S,L,v),y.set(C.subarray(S,S+x*v)),E(S-E(0)),U!=0)throw new Error("Malformed buffer data: "+U)}var l={NONE:"",OCTAHEDRAL:"meshopt_decodeFilterOct",QUATERNION:"meshopt_decodeFilterQuat",EXPONENTIAL:"meshopt_decodeFilterExp"},h={ATTRIBUTES:"meshopt_decodeVertexBuffer",TRIANGLES:"meshopt_decodeIndexBuffer",INDICES:"meshopt_decodeIndexSequence"},u=[],d=0;function f(p){var y={object:new Worker(p),pending:0,requests:{}};return y.object.onmessage=function(x){var v=x.data;y.pending-=v.count,y.requests[v.id][v.action](v.value),delete y.requests[v.id]},y}function m(p){for(var y="var instance; var ready = WebAssembly.instantiate(new Uint8Array(["+new Uint8Array(o(i))+"]), {}).then(function(result) { instance = result.instance; instance.exports.__wasm_call_ctors(); });self.onmessage = workerProcess;"+c.toString()+g.toString(),x=new Blob([y],{type:"text/javascript"}),v=URL.createObjectURL(x),P=0;P<p;++P)u[P]=f(v);URL.revokeObjectURL(v)}function _(p,y,x,v,P){for(var A=u[0],E=1;E<u.length;++E)u[E].pending<A.pending&&(A=u[E]);return new Promise(function(L,S){var M=new Uint8Array(x),C=d++;A.pending+=p,A.requests[C]={resolve:L,reject:S},A.object.postMessage({id:C,count:p,size:y,source:M,mode:v,filter:P},[M.buffer])})}function g(p){a.then(function(){var y=p.data;try{var x=new Uint8Array(y.count*y.size);c(s.exports[y.mode],x,y.count,y.size,y.source,s.exports[y.filter]),self.postMessage({id:y.id,count:y.count,action:"resolve",value:x},[x.buffer])}catch(v){self.postMessage({id:y.id,count:y.count,action:"reject",value:v})}})}return{ready:a,supported:!0,useWorkers:function(p){m(p)},decodeVertexBuffer:function(p,y,x,v,P){c(s.exports.meshopt_decodeVertexBuffer,p,y,x,v,s.exports[l[P]])},decodeIndexBuffer:function(p,y,x,v){c(s.exports.meshopt_decodeIndexBuffer,p,y,x,v)},decodeIndexSequence:function(p,y,x,v){c(s.exports.meshopt_decodeIndexSequence,p,y,x,v)},decodeGltfBuffer:function(p,y,x,v,P,A){c(s.exports[h[P]],p,y,x,v,s.exports[l[A]])},decodeGltfBufferAsync:function(p,y,x,v,P){return u.length>0?_(p,y,x,h[v],l[P]):a.then(function(){var A=new Uint8Array(p*y);return c(s.exports[h[v]],A,p,y,x,s.exports[l[P]]),A})}}})();const uf={starter:{url:"models-glb/starter.glb",targetLength:9,yaw:-Math.PI/2,pitch:0,anchors:[[-1.81,-.66,3.78],[1.81,-.66,3.78],[-1.25,-.57,3.84],[1.25,-.57,3.84],[-1.45,.54,4.18],[1.45,.54,4.18]]},gunship:{url:"models-glb/gunship.glb",targetLength:11,yaw:-Math.PI/2,pitch:0,anchors:[[-1.11,.19,5.11],[1.11,.19,5.11],[-1.01,-.47,5.05],[1.01,-.47,5.05]]},dreadnought:{url:"models-glb/dreadnought.glb",targetLength:32,yaw:-Math.PI/2,pitch:0,anchors:[[-8.47,-2.44,14.79],[8.47,-2.44,14.79],[-2.11,-3.85,15.28],[2.11,-3.85,15.28]]},flagship:{url:"models-glb/flagship.glb",targetLength:100,yaw:-Math.PI/2,pitch:0,anchors:[[-10.54,-5.47,45.25],[10.54,-5.47,45.25],[-4.4,2.35,46.37],[4.4,2.35,46.37],[-2.59,-7.36,47.01],[2.59,-7.36,47.01]]},aethelred:{url:"models-glb/aethelred.glb",targetLength:300,yaw:-Math.PI/2,pitch:0,anchors:[[-27.19,-6.06,134.18],[27.19,-6.06,134.18],[-9.38,-10.18,133.22],[9.38,-10.18,133.22],[-9.2,15.13,134.25],[9.2,15.13,134.25]]},aegis:{url:"models-glb/aegis.glb",targetLength:16,yaw:-Math.PI/2,pitch:0,anchors:[[-4.04,.15,7.59],[4.04,.15,7.59],[-2.15,-.37,6.96],[2.15,-.37,6.96],[-1.09,.04,7.79],[1.09,.04,7.79],[-1.08,-.85,7.51],[1.08,-.85,7.51]]},nighthawk:{url:"models-glb/nighthawk.glb",targetLength:12,yaw:-Math.PI/2,pitch:0,anchors:[[-1.52,.62,5.6],[1.52,.62,5.6],[0,-.6,5.43]]},stardestroyer:{url:"models-glb/stardestroyer.glb",targetLength:120,yaw:-Math.PI/2,pitch:0,anchors:[[-12.2,7.3,56],[12.2,7.3,56],[-3.05,-6.6,51.4],[3.05,-6.6,51.4],[0,6.7,53.5]]},falcon:{url:"models-glb/falcon.glb",targetLength:13,yaw:-Math.PI/2,pitch:0,anchors:[[-.9,.1,5.7],[-.3,.1,5.75],[.3,.1,5.75],[.9,.1,5.7]]},wedge:{url:"models-glb/wedge.glb",targetLength:14,yaw:-Math.PI/2,pitch:0,anchors:[[-.7,.72,6.68],[.7,.72,6.68],[-.95,-.35,6.3],[.95,-.35,6.3]]},leviathan:{url:"models-glb/leviathan.glb",targetLength:2600,yaw:-Math.PI/2,pitch:0},bastion:{url:"models-glb/bastion.glb",targetLength:20,yaw:-Math.PI/2,pitch:0,anchors:[[-1.03,1.07,8.74],[1.03,1.07,8.74],[-1.18,-.07,8.35],[1.18,-.07,8.35],[0,-.01,9.03]]}},su={starter:{x:.16,y:.02,z:.9},gunship:{x:.28,y:0,z:.86},dreadnought:{x:.2,y:.05,z:.92},flagship:{x:.22,y:.04,z:.94},aethelred:{x:.24,y:.06,z:.9}},Li={},Eo={};let sa=null;const df=[];function ff(r){df.push(r);for(const e of Object.keys(Li))r(e)}function cx(){return Object.keys(uf).length}function lx(r){return Li[r]??null}function pf(r){if(Eo[r])return Eo[r];const e=Li[r];if(!e)return null;const t=e.clone(!0),n=new Map;return t.traverse(i=>{if(!i.isMesh)return;const a=(Array.isArray(i.material)?i.material:[i.material]).map(o=>o&&(n.has(o.uuid)||n.set(o.uuid,o.clone()),n.get(o.uuid)));i.material=Array.isArray(i.material)?a:a[0]}),t.userData.shipBounds=e.userData.shipBounds,Eo[r]=t,t}function hx(r,e,t){return new Promise((n,i)=>{let s=!1;const a=setTimeout(()=>{s||(s=!0,i(new Error(`timeout after ${t}ms`)))},t);r.load(e,o=>{s||(s=!0,clearTimeout(a),n(o))},void 0,o=>{s||(s=!0,clearTimeout(a),i(o))})})}function mf(){if(sa)return sa;const r=new of;r.setMeshoptDecoder(hf);const e=async(t,n)=>{for(let i=0;i<3;i++)try{const s=await hx(r,n.url,15e3);Li[t]=ux(s.scene,n),su[t]&&(Li[t].userData.nozzles=su[t]),n.anchors&&(Li[t].userData.nozzleAnchors=n.anchors);for(const a of df)a(t);return}catch(s){if(i===2){console.warn(`[models] ${t} failed after 3 tries (procedural fallback stays):`,s);return}await new Promise(a=>setTimeout(a,500*(i+1)))}};return sa=Promise.allSettled(Object.entries(uf).map(([t,n])=>e(t,n))).then(()=>Li),sa}function ux(r,e){r.updateMatrixWorld(!0);const t=new on().setFromObject(r),n=t.getSize(new b),i=t.getCenter(new b);r.position.sub(i);const s=new Xe;s.add(r),s.rotation.set(e.pitch,e.yaw,0);const a=Math.max(n.x,n.y,n.z,1e-6);s.scale.setScalar(e.targetLength/a);const o=new Xe;o.add(s),o.traverse(h=>{if(!h.isMesh)return;h.castShadow=!0,h.receiveShadow=!0;const u=Array.isArray(h.material)?h.material:[h.material];for(const d of u)d&&(d.side=En,"shininess"in d&&(d.shininess=Math.min(d.shininess??30,60)))});const c=new on().setFromObject(o),l=c.getSize(new b);return o.userData.shipBounds={length:l.z,width:l.x,height:l.y,rearZ:c.max.z,noseZ:c.min.z},o}const Ao=new Map;function Lt(r,e){return Ao.has(r)||Ao.set(r,e()),Ao.get(r)}function Pn(r,e,{length:t,rearRadius:n,noseRadius:i,flatten:s,noseLength:a}){const o=`fus:${t}:${n}:${i}:${s}:${a}`,c=Lt(o,()=>{const d=new ii(n,i,t,6);return d.rotateX(Math.PI/2),d.scale(1,s,1),d}),l=new pe(c,e);r.add(l);const h=Lt(`${o}:nose`,()=>{const d=new _r(i,a,6);return d.rotateX(-Math.PI/2),d.scale(1,s,1),d}),u=new pe(h,e);u.position.z=-(t/2+a/2-.01),r.add(u)}function pi(r,e,{span:t,rootChordZ0:n,rootChordZ1:i,tipChordZ0:s,tipChordZ1:a,thickness:o,y:c}){const l=`wing:${t}:${n}:${i}:${s}:${a}:${o}`,h=Lt(l,()=>{const d=new cl;d.moveTo(-t,s),d.lineTo(0,n),d.lineTo(t,s),d.lineTo(t,a),d.lineTo(0,i),d.lineTo(-t,a),d.closePath();const f=new La(d,{depth:o,bevelEnabled:!1});return f.rotateX(Math.PI/2),f.computeVertexNormals(),f}),u=new pe(h,e);u.position.y=c,r.add(u)}function Ft(r,e,{height:t,rootLength:n,rake:i,z:s,thickness:a=.07,x:o=0,tilt:c=0}){const l=`fin:${t}:${n}:${i}:${a}`,h=Lt(l,()=>{const d=new cl;d.moveTo(0,0),d.lineTo(n,0),d.lineTo(n+i,t),d.lineTo(n*.55+i,t),d.closePath();const f=new La(d,{depth:a,bevelEnabled:!1});return f.rotateY(-Math.PI/2),f.translate(a/2,0,0),f.computeVertexNormals(),f}),u=new pe(h,e);u.position.set(o,0,s),u.rotation.z=c,r.add(u)}function Bt(r,e,t,{x:n,y:i,z:s,radius:a,length:o}){const c=[],l=Lt(`nac:${a}:${o}`,()=>{const u=new ii(a,a*.82,o,6);return u.rotateX(Math.PI/2),u}),h=Lt(`disc:${a}`,()=>new Ca(a*.72,12));for(const u of[-1,1]){const d=new pe(l,e);d.position.set(u*n,i,s),r.add(d);const f=new pe(h,t);f.position.set(u*n,i,s+o/2+.02),r.add(f),c.push(new b(u*n,i,s+o/2+.05))}return c}function ma(r,e,{x:t,y:n,z:i,length:s}){const a=[],o=Lt(`cannon:${s}`,()=>{const c=new ii(.07,.09,s,5);return c.rotateX(Math.PI/2),c});for(const c of[-1,1]){const l=new pe(o,e);l.position.set(c*t,n,i),r.add(l),a.push(new b(c*t,n,i-s/2-.1))}return a}function Di(r,e,{z:t,width:n,height:i,length:s}){const a=Lt(`canopy:${n}:${i}:${s}`,()=>{const c=new rn(1,10,7);return c.scale(n,i,s),c}),o=new pe(a,e);o.position.set(0,i*.75,t),r.add(o)}const Ro=new Map;function fi({hullColor:r,accentColor:e,glowColor:t}){const n=`${r}:${e}:${t.getHexString()}`;if(Ro.has(n))return Ro.get(n);const i=dx({hullColor:r,accentColor:e,glowColor:t});return Ro.set(n,i),i}function dx({hullColor:r,accentColor:e,glowColor:t}){return{hull:new Mt({color:r,metalness:.72,roughness:.38,flatShading:!0}),accent:new Mt({color:e,metalness:.6,roughness:.45,flatShading:!0}),glass:new Mt({color:661030,metalness:.95,roughness:.12,flatShading:!0}),glow:new xt({color:t})}}const pr=[{id:"starter",name:"SF-10 Sentinel",level:1,unlockLevel:1,cost:0,hull:1,shield:1,engine:1,crew:2,model:"starter",scale:1,hullColor:12175062,accentColor:2371647,glow:[.9,2.6,5.2]},{id:"explorer",name:"SF-20 Nebula Gunship",level:10,unlockLevel:10,cost:320,hull:1.25,shield:1.2,engine:1.08,crew:3,model:"gunship",scale:1.08,hullColor:13227208,accentColor:3031092,glow:[.8,3.2,3.4]},{id:"interceptor",name:"SF-30 Kestrel",level:20,unlockLevel:20,cost:800,hull:1.5,shield:1.45,engine:1.18,crew:3,model:"gunship",modelScale:1.18,scale:1.14,hullColor:14076345,accentColor:4863268,glow:[3.6,2.2,.7]},{id:"nighthawk",name:"SF-45 Night Hawk",level:90,unlockLevel:90,cost:1400,hull:2,shield:1.9,engine:1.42,crew:3,weapon:1.4,model:"nighthawk",reinforce:!0,scale:1.2,hullColor:2765378,accentColor:1054498,glow:[2.4,1.1,5.8]},{id:"wedge",name:"SF-55 Void Wedge",level:100,unlockLevel:100,cost:2500,hull:2.3,shield:2.2,engine:1.4,crew:3,weapon:1.45,model:"wedge",scale:1.25,hullColor:3813194,accentColor:1642532,glow:[3.5,1.5,5.5]},{id:"falcon",name:"SF-60 Falcon",level:110,unlockLevel:110,cost:5e3,hull:2.6,shield:2.5,engine:1.65,crew:4,weapon:1.5,model:"falcon",scale:1.3,hullColor:12106948,accentColor:3817544,glow:[2,2.4,5]},{id:"stardestroyer",name:"SF-150 Star Destroyer",level:120,unlockLevel:120,cost:3e4,hull:9,shield:7,engine:.9,crew:8,turrets:3,weapon:2,model:"stardestroyer",fleetCall:!0,noLanding:!0,scale:1,hullColor:10134192,accentColor:2896962,glow:[1,2.6,5]},{id:"frigate",name:"SF-50 Aegis Gunner",level:30,unlockLevel:30,cost:2080,hull:2.2,shield:2.1,engine:1.28,crew:4,weapon:1.5,model:"aegis",twinFin:!0,scale:1.26,hullColor:11452372,accentColor:2241613,glow:[1.2,2.2,5.4]},{id:"battlecruiser",name:"SF-70 Bastion Gunner",level:40,unlockLevel:40,cost:6400,hull:3.4,shield:3.1,engine:1.38,crew:5,weapon:2,model:"bastion",twinFin:!0,quadEngines:!0,scale:1.42,hullColor:10135741,accentColor:4204365,glow:[3.2,1.2,5.2]},{id:"sovereign",name:"SF-100 Sovereign",level:50,unlockLevel:50,cost:20800,hull:5.2,shield:4.6,engine:1.5,crew:7,twinFin:!0,quadEngines:!0,model:"bastion",modelScale:1.5,scale:1.62,hullColor:14212582,accentColor:10124078,glow:[4.6,3.4,1]},{id:"battleship",name:"SF-85 Obsidian Dreadnought",level:60,unlockLevel:60,cost:12800,hull:7,shield:5.5,engine:1.05,crew:6,turrets:4,hangar:4,capital:"battleship",model:"dreadnought",scale:1,hullColor:9279400,accentColor:3360607,glow:[1,2,5]},{id:"carrier",name:"SF-110 Vanguard",level:70,unlockLevel:70,cost:4e4,hull:11,shield:8,engine:.85,crew:8,turrets:2,hangar:15,capital:"carrier",model:"flagship",noLanding:!0,scale:1,hullColor:11187398,accentColor:2773574,glow:[.8,3,4.6]},{id:"aethelred",name:"SF-200 Aethelred",level:80,unlockLevel:80,cost:9e4,hull:16,shield:12,engine:.8,crew:12,turrets:4,hangar:15,gunnerHangar:5,capital:"carrier",launchPort:"lowerside",model:"aethelred",noLanding:!0,weapon:2.5,scale:1,hullColor:10465476,accentColor:2771546,glow:[.9,2.4,4.8]}],Vt=Object.fromEntries(pr.map(r=>[r.id,r]));function xa(r="starter"){const e=Vt[r]??pr[0],t=new X(...e.glow),n=fi({hullColor:e.hullColor,accentColor:e.accentColor,glowColor:t});if(e.model){const c=fx(e.model,t,e.modelScale??1);if(c)return c}if(e.capital){const c=e.capital==="carrier"?mx(n,t):px(n,t);for(const l of c.group.children)l.castShadow=!0,l.receiveShadow=!0;return c}const i=new Xe;Pn(i,n.hull,{length:4.6,rearRadius:.62,noseRadius:.3,flatten:.6,noseLength:1.7}),Di(i,n.glass,{z:-1.15,width:.34,height:.42,length:1.05}),pi(i,n.accent,{span:2.9,rootChordZ0:-.5,rootChordZ1:1.7,tipChordZ0:1.15,tipChordZ1:1.85,thickness:.09,y:-.1}),e.twinFin?(Ft(i,n.accent,{height:.95,rootLength:1.15,rake:.55,z:2.25,x:.5}),Ft(i,n.accent,{height:.95,rootLength:1.15,rake:.55,z:2.25,x:-.57})):Ft(i,n.accent,{height:.95,rootLength:1.15,rake:.55,z:2.25});const s=Bt(i,n.hull,n.glow,{x:.78,y:-.02,z:1.55,radius:.34,length:1.7});e.quadEngines&&s.push(...Bt(i,n.hull,n.glow,{x:1.35,y:.05,z:1.65,radius:.26,length:1.4}));const a=ma(i,n.accent,{x:2.75,y:-.06,z:1,length:1.3}),o=e.scale;if(o!==1){i.scale.setScalar(o);for(const c of a)c.multiplyScalar(o)}for(const c of i.children)c.castShadow=!0,c.receiveShadow=!0;return{group:i,engines:s,hardpoints:a,radius:3.2*o,glowColor:t}}function Kn(r,e,{x:t,y:n,z:i,w:s,h:a,l:o}){const c=[],l=Lt(`pod:${s}:${a}:${o}`,()=>new gt(s,a,o));for(const h of[-1,1]){const u=new pe(l,e);u.position.set(h*t,n,i),r.add(u),c.push(new b(h*t,n,i-o/2-.1))}return c}function fx(r,e,t=1){const n=lx(r);if(!n)return null;const i=n.clone(!0);t!==1&&i.scale.multiplyScalar(t);const s=n.userData.shipBounds,a=gf(n),o=s.width*t,c=[new b(-o*.34,0,s.noseZ*t*.45),new b(o*.34,0,s.noseZ*t*.45)];return{group:i,engines:a.anchors,hardpoints:c,radius:s.length*t/2.6,glowColor:e,engineScale:a.flameScale}}function gf(r){const e=r.userData.shipBounds,t=r.userData.nozzleAnchors;if(t?.length){const o=t.map(h=>new b(h[0],h[1],h[2]));let c=1/0;for(let h=0;h<o.length;h++)for(let u=h+1;u<o.length;u++)c=Math.min(c,o[h].distanceTo(o[u]));const l=o.length>1?Math.min(Math.max(1,c*.55),Math.max(1,e.length/8)):Math.max(1,e.length/10);return{anchors:o,flameScale:l}}const n=r.userData.nozzles??{},i=n.x??.16,s=n.y??0,a=n.z??.92;return{anchors:[new b(-e.width*i,e.height*s,e.rearZ*a),new b(e.width*i,e.height*s,e.rearZ*a)],flameScale:Math.max(1,e.length/10)}}function px(r,e){const t=new Xe;Pn(t,r.hull,{length:15,rearRadius:2.1,noseRadius:.9,flatten:.6,noseLength:3.6});const n=Lt("pbattleTower",()=>new gt(1.6,1.8,3.4)),i=new pe(n,r.accent);i.position.set(0,1.5,2.4),t.add(i),Di(t,r.glass,{z:1.2,width:.6,height:.5,length:1.3}),pi(t,r.accent,{span:6.4,rootChordZ0:-2.4,rootChordZ1:3.6,tipChordZ0:.4,tipChordZ1:2.8,thickness:.35,y:-.2});const s=[...Kn(t,r.accent,{x:3,y:.5,z:-1.6,w:1.1,h:.9,l:2.4}),...Kn(t,r.accent,{x:4.6,y:.3,z:1.4,w:1,h:.8,l:2.2})];Ft(t,r.accent,{height:2.4,rootLength:3.2,rake:1.6,z:4.6,x:1.2}),Ft(t,r.accent,{height:2.4,rootLength:3.2,rake:1.6,z:4.6,x:-1.4});const a=[...Bt(t,r.hull,r.glow,{x:1.3,y:0,z:6.8,radius:.8,length:2.6}),...Bt(t,r.hull,r.glow,{x:2.9,y:-.1,z:6.9,radius:.6,length:2.2})];return{group:t,engines:a,hardpoints:s,radius:11,glowColor:e}}function mx(r,e){const t=new Xe;Pn(t,r.hull,{length:22,rearRadius:2.6,noseRadius:1.2,flatten:.7,noseLength:5});const n=Lt("pcarrierDeck",()=>new gt(7,1.4,15));for(const c of[-1,1]){const l=new pe(n,r.hull);l.position.set(c*5.4,.3,1.5),t.add(l);const h=Lt("pcarrierStrip",()=>new gt(.35,.12,13)),u=new pe(h,r.glow);u.position.set(c*5.4,1.05,1.5),t.add(u)}const i=Lt("pcarrierTower",()=>new gt(2.2,3,4.4)),s=new pe(i,r.accent);s.position.set(0,2.4,5.5),t.add(s),Di(t,r.glass,{z:4,width:.8,height:.6,length:1.6});const a=Kn(t,r.accent,{x:3.2,y:1,z:-4,w:1.2,h:1,l:2.6});Ft(t,r.accent,{height:3,rootLength:4,rake:2,z:7,x:0});const o=[...Bt(t,r.hull,r.glow,{x:1.8,y:0,z:10.2,radius:1.1,length:3.4}),...Bt(t,r.hull,r.glow,{x:4,y:-.2,z:10.4,radius:.8,length:2.8})];return{group:t,engines:o,hardpoints:a,radius:14,glowColor:e}}const gx={scout:1.6,fighter:1.5,heavy:1.4,cruiser:1.35,destroyer:1,warship:1,redcarrier:1,apex:1.3},_x={scout:{model:"starter",scale:.85},fighter:{model:"starter",scale:1.05},heavy:{model:"starter",scale:1.5},cruiser:{model:"gunship",scale:1.35},destroyer:{model:"gunship",scale:2.1},warship:{model:"dreadnought",scale:.9},redcarrier:{model:"flagship",scale:.75},apex:{model:"flagship",scale:1.25}};function kc(r){const e=_x[r];if(e){const s=pf(e.model);if(s){const a=s.clone(!0);a.scale.multiplyScalar(e.scale);const o=s.userData.shipBounds,c=gf(s),l=o.width*e.scale,h=[new b(-l*.3,0,o.noseZ*e.scale*.45),new b(l*.3,0,o.noseZ*e.scale*.45)];return{group:a,engines:c.anchors,hardpoints:h,radius:o.length*e.scale/2.6,glowColor:new X(5.4,.6,.5),engineScale:c.flameScale,modeled:!0}}}const n=(Co[r]||(r==="apex"?Co.destroyer:Co.fighter))(),i=gx[r]??1.4;if(i!==1){n.group.scale.setScalar(i);for(const s of n.hardpoints)s.multiplyScalar(i);n.radius*=i}for(const s of n.group.children)s.castShadow=!0,s.receiveShadow=!0;return n.modeled=!e,n}const Co={scout(){const r=new Xe,e=new X(5,1.4,.5),t=fi({hullColor:9937848,accentColor:10111790,glowColor:e});Pn(r,t.hull,{length:3.6,rearRadius:.5,noseRadius:.18,flatten:.66,noseLength:1.6}),pi(r,t.accent,{span:2.2,rootChordZ0:.1,rootChordZ1:1.4,tipChordZ0:1.2,tipChordZ1:1.6,thickness:.08,y:0}),Ft(r,t.accent,{height:.85,rootLength:.95,rake:.5,z:.7});const n=Bt(r,t.hull,t.glow,{x:.46,y:0,z:1.45,radius:.26,length:1.2}),i=ma(r,t.accent,{x:2.05,y:-.04,z:1.05,length:.9});return{group:r,engines:n,hardpoints:i,radius:3,glowColor:e}},fighter(){const r=new Xe,e=new X(4.6,1.1,.4),t=fi({hullColor:8884907,accentColor:10705450,glowColor:e});Pn(r,t.hull,{length:4.6,rearRadius:.62,noseRadius:.26,flatten:.62,noseLength:1.6}),Di(r,t.glass,{z:-1.05,width:.32,height:.4,length:1}),pi(r,t.accent,{span:2.8,rootChordZ0:.3,rootChordZ1:1.9,tipChordZ0:-.4,tipChordZ1:.9,thickness:.1,y:-.08}),Ft(r,t.accent,{height:.95,rootLength:1.05,rake:.5,z:2.1});const n=Bt(r,t.hull,t.glow,{x:.74,y:0,z:1.55,radius:.31,length:1.5}),i=ma(r,t.accent,{x:2.65,y:-.05,z:-.1,length:1.1});return{group:r,engines:n,hardpoints:i,radius:3.2,glowColor:e}},heavy(){const r=new Xe,e=new X(5.2,.7,.9),t=fi({hullColor:8226712,accentColor:9386795,glowColor:e});Pn(r,t.hull,{length:6.6,rearRadius:1.15,noseRadius:.58,flatten:.55,noseLength:2}),Di(r,t.glass,{z:-2,width:.5,height:.5,length:1.2}),pi(r,t.accent,{span:3.8,rootChordZ0:-.9,rootChordZ1:2.4,tipChordZ0:1.4,tipChordZ1:2.6,thickness:.15,y:-.12}),Ft(r,t.accent,{height:1.1,rootLength:1.5,rake:.7,z:2.6,x:.7}),Ft(r,t.accent,{height:1.1,rootLength:1.5,rake:.7,z:2.6,x:-.77});const n=Bt(r,t.hull,t.glow,{x:.9,y:-.1,z:2.7,radius:.42,length:2}),i=Bt(r,t.hull,t.glow,{x:1.7,y:-.05,z:2.8,radius:.34,length:1.7}),s=ma(r,t.accent,{x:3.5,y:-.1,z:1.5,length:1.5});return{group:r,engines:[...n,...i],hardpoints:s,radius:4.6,glowColor:e}},cruiser(){const r=new Xe,e=new X(3.4,.8,5),t=fi({hullColor:8616860,accentColor:6967214,glowColor:e});Pn(r,t.hull,{length:8.4,rearRadius:1.35,noseRadius:.7,flatten:.7,noseLength:2.2}),Di(r,t.glass,{z:-2.7,width:.55,height:.5,length:1.3}),pi(r,t.accent,{span:4.4,rootChordZ0:-.6,rootChordZ1:2.2,tipChordZ0:.8,tipChordZ1:2,thickness:.2,y:-.1});const n=Kn(r,t.accent,{x:2.6,y:.05,z:.2,w:.7,h:.6,l:2.6});Ft(r,t.accent,{height:1.4,rootLength:1.8,rake:.9,z:3.2,x:.9}),Ft(r,t.accent,{height:1.4,rootLength:1.8,rake:.9,z:3.2,x:-.98});const i=Bt(r,t.hull,t.glow,{x:1.1,y:-.05,z:3.4,radius:.5,length:2.2});return{group:r,engines:i,hardpoints:n,radius:6.5,glowColor:e}},warship(){const r=new Xe,e=new X(5.4,.6,.5),t=fi({hullColor:8016208,accentColor:9383722,glowColor:e});Pn(r,t.hull,{length:14,rearRadius:2,noseRadius:.9,flatten:.6,noseLength:3.4});const n=Lt("ewarshipTower",()=>new gt(1.6,1.7,3.2)),i=new pe(n,t.accent);i.position.set(0,1.4,2.2),r.add(i),pi(r,t.accent,{span:6,rootChordZ0:-2.2,rootChordZ1:3.4,tipChordZ0:.4,tipChordZ1:2.6,thickness:.32,y:-.2});const s=[...Kn(r,t.accent,{x:2.8,y:.5,z:-1.5,w:1.1,h:.9,l:2.3}),...Kn(r,t.accent,{x:4.3,y:.3,z:1.3,w:1,h:.8,l:2.1})];Ft(r,t.accent,{height:2.2,rootLength:3,rake:1.5,z:4.4,x:1.1}),Ft(r,t.accent,{height:2.2,rootLength:3,rake:1.5,z:4.4,x:-1.3});const a=Bt(r,t.hull,t.glow,{x:1.6,y:0,z:6.4,radius:.9,length:2.6});return{group:r,engines:a,hardpoints:s,radius:10.5,glowColor:e}},redcarrier(){const r=new Xe,e=new X(5.8,.5,.4),t=fi({hullColor:7162445,accentColor:10039338,glowColor:e});Pn(r,t.hull,{length:20,rearRadius:2.4,noseRadius:1.1,flatten:.7,noseLength:4.6});const n=Lt("ecarrierDeck",()=>new gt(6.4,1.3,14));for(const c of[-1,1]){const l=new pe(n,t.hull);l.position.set(c*5,.3,1.4),r.add(l);const h=Lt("ecarrierStrip",()=>new gt(.3,.12,12)),u=new pe(h,t.glow);u.position.set(c*5,.98,1.4),r.add(u)}const i=Lt("ecarrierTower",()=>new gt(2,2.8,4)),s=new pe(i,t.accent);s.position.set(0,2.2,5),r.add(s);const a=Kn(r,t.accent,{x:3,y:.9,z:-3.6,w:1.2,h:1,l:2.5});Ft(r,t.accent,{height:2.8,rootLength:3.6,rake:1.8,z:6.4,x:0});const o=[...Bt(r,t.hull,t.glow,{x:1.7,y:0,z:9.4,radius:1,length:3.2}),...Bt(r,t.hull,t.glow,{x:3.7,y:-.2,z:9.6,radius:.75,length:2.6})];return{group:r,engines:o,hardpoints:a,radius:13,glowColor:e}},destroyer(){const r=new Xe,e=new X(6,.5,.4),t=fi({hullColor:7041922,accentColor:6697002,glowColor:e});Pn(r,t.hull,{length:26,rearRadius:3.4,noseRadius:1.4,flatten:.62,noseLength:6});const n=Lt("destroyerTower",()=>new gt(2.2,2.6,5)),i=new pe(n,t.accent);i.position.set(0,2,4),r.add(i),Di(r,t.glass,{z:1.8,width:.9,height:.7,length:2}),pi(r,t.accent,{span:12,rootChordZ0:-5,rootChordZ1:7,tipChordZ0:0,tipChordZ1:5,thickness:.6,y:-.3});const s=[...Kn(r,t.accent,{x:5.5,y:.4,z:-3,w:1.4,h:1.2,l:3.4}),...Kn(r,t.accent,{x:8.5,y:.2,z:1,w:1.2,h:1,l:3})];Ft(r,t.accent,{height:4.2,rootLength:6,rake:3,z:8,x:2.4}),Ft(r,t.accent,{height:4.2,rootLength:6,rake:3,z:8,x:-2.8});const a=Bt(r,t.hull,t.glow,{x:2.2,y:0,z:12,radius:1.3,length:4}),o=Bt(r,t.hull,t.glow,{x:5,y:-.2,z:12,radius:1.1,length:3.6});return{group:r,engines:[...a,...o],hardpoints:s,radius:26,glowColor:e}}},ei=new Map;function mr(r=128,e=2.2){const t=`glow:${r}:${e}`;if(ei.has(t))return ei.get(t);const n=document.createElement("canvas");n.width=n.height=r;const i=n.getContext("2d"),s=i.createImageData(r,r),a=r/2;for(let c=0;c<r;c++)for(let l=0;l<r;l++){const h=(l-a+.5)/a,u=(c-a+.5)/a,d=Math.min(1,Math.sqrt(h*h+u*u)),f=Math.pow(Math.max(0,1-d),e),m=(c*r+l)*4;s.data[m]=255,s.data[m+1]=255,s.data[m+2]=255,s.data[m+3]=Math.round(f*255)}i.putImageData(s,0,0);const o=new Oi(n);return o.colorSpace=yt,ei.set(t,o),o}function vx(r=128){const e=`plume:${r}`;if(ei.has(e))return ei.get(e);const t=document.createElement("canvas");t.width=t.height=r;const n=t.getContext("2d"),i=n.createImageData(r,r);for(let a=0;a<r;a++){const o=a/(r-1),c=Math.pow(1-o,1.7);for(let l=0;l<r;l++){const h=Math.abs(l/(r-1)-.5)*2,u=Math.pow(Math.max(0,1-h),2.4),d=(a*r+l)*4,f=c*u;i.data[d]=255,i.data[d+1]=255,i.data[d+2]=255,i.data[d+3]=Math.round(f*255)}}n.putImageData(i,0,0);const s=new Oi(t);return s.colorSpace=yt,ei.set(e,s),s}function bx(r=64){const e=`bolt:${r}`;if(ei.has(e))return ei.get(e);const t=document.createElement("canvas");t.width=t.height=r;const n=t.getContext("2d"),i=n.createImageData(r,r);for(let a=0;a<r;a++){const o=Math.abs(a/(r-1)-.5)*2,c=Math.pow(Math.max(0,1-o),.7);for(let l=0;l<r;l++){const h=Math.abs(l/(r-1)-.5)*2,u=Math.pow(Math.max(0,1-h),4),d=Math.pow(Math.max(0,1-h),1.6)*.5,f=(a*r+l)*4;i.data[f]=255,i.data[f+1]=255,i.data[f+2]=255,i.data[f+3]=Math.round(Math.min(1,u+d)*c*255)}}n.putImageData(i,0,0);const s=new Oi(t);return s.colorSpace=yt,ei.set(e,s),s}let js=null;function yx(){return js||(js=new Es(1,1),js.rotateX(-Math.PI/2),js.translate(0,0,.5)),js}const Po=new Map;function xx(r){const e=r.getHexString();if(Po.has(e))return Po.get(e);const t=r.clone().multiplyScalar(.22),n={sprite:new ni({map:mr(128,2.4),color:t,blending:Ut,depthWrite:!1,transparent:!0}),plume:new xt({map:vx(128),color:t,blending:Ut,depthWrite:!1,transparent:!0,side:Nt})};return Po.set(e,n),n}class Ss{constructor(e,t,n,i=1){this.units=[];const{sprite:s,plume:a}=xx(n),o=yx();for(const c of t){const l=new Xe;l.position.copy(c),l.scale.setScalar(i);const h=new Fn(s);h.scale.setScalar(1.4),l.add(h);const u=new pe(o,a),d=new pe(o,a);d.rotation.z=Math.PI/2,l.add(u,d),e.add(l),this.units.push({unit:l,sprite:h,planeA:u,planeB:d,phase:Math.random()*10})}}update(e,t,n){const i=.16+e*.6+t*.75;for(const{unit:s,sprite:a,planeA:o,planeB:c,phase:l}of this.units){const h=1+Math.sin(n*31+l)*.06+Math.sin(n*57+l*2)*.04,u=i*h;a.scale.setScalar(.75+u*.95);const d=.4+u*4.2+t*3,f=.35+u*.5;o.scale.set(f,1,d),c.scale.set(f,1,d),s.visible=u>.02}}}const Mx=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  void main() {
    vNormal = normalize(mat3(modelMatrix) * normal);
    vObjPos = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
    #include <logdepthbuf_vertex>
  }
`,Sx=`
  #include <common>
  #include <logdepthbuf_pars_fragment>
  uniform vec3 uColor;
  uniform float uFlash;
  uniform vec3 uHitPos; // ship-local space
  uniform float uRadius;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec3 vObjPos;
  void main() {
    #include <logdepthbuf_fragment>
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float fresnel = pow(1.0 - abs(dot(viewDir, normalize(vNormal))), 2.4);
    // Local brightening around the impact point.
    float d = distance(vObjPos, uHitPos) / uRadius;
    float impact = exp(-d * d * 5.0);
    float intensity = uFlash * (fresnel * 0.85 + impact * 1.6);
    gl_FragColor = vec4(uColor * intensity, intensity);
  }
`,Lo=new Map;function wx(r){const e=Math.round(r*10);return Lo.has(e)||Lo.set(e,new br(r,2)),Lo.get(e)}class ws{constructor(e,t,n=new X(.45,.8,1.6)){this.radius=t,this.material=new Tt({vertexShader:Mx,fragmentShader:Sx,uniforms:{uColor:{value:n},uFlash:{value:0},uHitPos:{value:new b},uRadius:{value:t}},transparent:!0,blending:Ut,depthWrite:!1,side:En}),this.mesh=new pe(wx(t),this.material),this.mesh.visible=!1,e.add(this.mesh),this._localHit=new b}flash(e,t=1){this.material.uniforms.uFlash.value=Math.min(1.2,this.material.uniforms.uFlash.value+t),this._localHit.copy(e),this.mesh.parent.worldToLocal(this._localHit),this.material.uniforms.uHitPos.value.copy(this._localHit),this.mesh.visible=!0}update(e){const t=this.material.uniforms.uFlash;if(t.value<=.01){this.mesh.visible&&(this.mesh.visible=!1);return}t.value*=Math.exp(-5.5*e)}dispose(){this.material.dispose(),this.mesh.parent&&this.mesh.parent.remove(this.mesh)}}const un=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),Tx=1/3,Cn=1/6;class pn{constructor(e=0){const t=af(rf(e)),n=new Uint8Array(256);for(let i=0;i<256;i++)n[i]=i;for(let i=255;i>0;i--){const s=Math.floor(t()*(i+1)),a=n[i];n[i]=n[s],n[s]=a}this.perm=new Uint8Array(512),this.permMod12=new Uint8Array(512);for(let i=0;i<512;i++)this.perm[i]=n[i&255],this.permMod12[i]=this.perm[i]%12}noise3(e,t,n){const{perm:i,permMod12:s}=this;let a=0,o=0,c=0,l=0;const h=(e+t+n)*Tx,u=Math.floor(e+h),d=Math.floor(t+h),f=Math.floor(n+h),m=(u+d+f)*Cn,_=e-(u-m),g=t-(d-m),p=n-(f-m);let y,x,v,P,A,E;_>=g?g>=p?(y=1,x=0,v=0,P=1,A=1,E=0):_>=p?(y=1,x=0,v=0,P=1,A=0,E=1):(y=0,x=0,v=1,P=1,A=0,E=1):g<p?(y=0,x=0,v=1,P=0,A=1,E=1):_<p?(y=0,x=1,v=0,P=0,A=1,E=1):(y=0,x=1,v=0,P=1,A=1,E=0);const L=_-y+Cn,S=g-x+Cn,M=p-v+Cn,C=_-P+2*Cn,U=g-A+2*Cn,F=p-E+2*Cn,I=_-1+3*Cn,B=g-1+3*Cn,z=p-1+3*Cn,V=u&255,H=d&255,J=f&255;let ie=.6-_*_-g*g-p*p;if(ie>0){const W=s[V+i[H+i[J]]]*3;ie*=ie,a=ie*ie*(un[W]*_+un[W+1]*g+un[W+2]*p)}let re=.6-L*L-S*S-M*M;if(re>0){const W=s[V+y+i[H+x+i[J+v]]]*3;re*=re,o=re*re*(un[W]*L+un[W+1]*S+un[W+2]*M)}let ye=.6-C*C-U*U-F*F;if(ye>0){const W=s[V+P+i[H+A+i[J+E]]]*3;ye*=ye,c=ye*ye*(un[W]*C+un[W+1]*U+un[W+2]*F)}let Ie=.6-I*I-B*B-z*z;if(Ie>0){const W=s[V+1+i[H+1+i[J+1]]]*3;Ie*=Ie,l=Ie*Ie*(un[W]*I+un[W+1]*B+un[W+2]*z)}return 32*(a+o+c+l)}fbm(e,t,n,i=4,s=2,a=.5){let o=0,c=1,l=0;for(let h=0;h<i;h++)o+=c*this.noise3(e,t,n),l+=c,c*=a,e*=s,t*=s,n*=s;return o/l}ridged(e,t,n,i=4,s=2.1,a=.55){let o=0,c=.6,l=0,h=1;for(let u=0;u<i;u++){let d=1-Math.abs(this.noise3(e,t,n));d*=d,o+=d*c*h,l+=c,h=d,c*=a,e*=s,t*=s,n*=s}return o/l}billow(e,t,n,i=4,s=2,a=.5){let o=0,c=1,l=0;for(let h=0;h<i;h++)o+=c*Math.abs(this.noise3(e,t,n)),l+=c,c*=a,e*=s,t*=s,n*=s;return o/l}}function wt(r,e,t){const n=Math.min(1,Math.max(0,(t-r)/(e-r)));return n*n*(3-2*n)}function Ht(r,e,t){return r+(e-r)*t}function Qe(r,e,t){return r<e?e:r>t?t:r}function Dt(r,e){return 1-Math.exp(-r*e)}const It={accelForward:110,accelReverse:60,accelStrafe:70,boostAccelMult:2.9,baseMaxSpeed:240,boostMaxMult:2.4,damping:.5,brakeDamping:3.4,pitchRate:1.55,yawRate:1,rollRate:2.7,angularResponse:9,boostDrain:30,boostRegen:17,boostRegenDelay:.9,boostMinEngage:14};class Ex extends Ua{constructor(e){super(xa()),this.game=e,this.hullMax=this.hull=100,this.shieldMax=this.shield=100,this.shieldRegenRate=10,this.shieldRegenDelay=3.2,this.boostEnergy=100,this.boostActive=!1,this._sinceBoost=1/0,this.envSpeedScale=1,this.gravity=new b,this.autolanding=!1,this.resources=0,this.credits=0,this.inventory={},this.upgradesByShip={},this.upgrades=this.upgradesFor("starter"),this.ships={owned:["starter"],active:"starter"},this.statMult=Vt.starter,this.hangarStock={fighter:15,gunner:5},this.glow=new Ss(this.visual,this.engines,this.glowColor,this.engineScale),this.shieldFx=new ws(this.object3D,this.radius*1.4),this._throttleSmooth=0,this._boostBlend=0,this._fwd=new b,this._thrust=new b,e.engine.scene.add(this.object3D),e.origin.onShift(t=>{this.position.sub(t)})}update(e,t){if(this.shieldFx.update(e),!this.alive)return;if(this.game.mode==="onfoot"){this.velocity.multiplyScalar(Math.exp(-6*e)),this.position.addScaledVector(this.velocity,e),this.updateDefense(e);return}if(this.autolanding){this.angularRates.set(0,0,0),this.position.addScaledVector(this.velocity,e),this.updateDefense(e),this.glow.update(.35,0,t);return}const n=this.game.input.state,i=!!(this.game.warp&&this.game.warp.engaged),s=!i&&n.boost&&n.throttle>0;s&&!this.boostActive&&this.boostEnergy>It.boostMinEngage&&(this.boostActive=!0,this.game.events.emit("player:boost-start")),this.boostActive?(this.boostEnergy-=It.boostDrain*e,this._sinceBoost=0,(!s||this.boostEnergy<=0)&&(this.boostActive=!1,this.boostEnergy=Math.max(0,this.boostEnergy),this.game.events.emit("player:boost-end"))):(this._sinceBoost+=e,this._sinceBoost>It.boostRegenDelay&&(this.boostEnergy=Math.min(100,this.boostEnergy+It.boostRegen*e)));const a=i?.45:1,o=Dt(It.angularResponse,e);if(this.angularRates.x=Ht(this.angularRates.x,n.pitch*It.pitchRate*a,o),this.angularRates.y=Ht(this.angularRates.y,-n.yaw*It.yawRate*a,o),this.angularRates.z=Ht(this.angularRates.z,-n.roll*It.rollRate*a,o),!i){const c=this.upgrades.engine*(this.statMult.engine??1),l=this.boostActive?It.boostAccelMult:1,h=n.throttle>=0?n.throttle*It.accelForward:n.throttle*It.accelReverse;this._thrust.set(n.strafeX*It.accelStrafe,n.strafeY*It.accelStrafe,-h).multiplyScalar(l*c),this._thrust.applyQuaternion(this.quaternion),this.velocity.addScaledVector(this._thrust,e),this.velocity.addScaledVector(this.gravity,e);const u=n.brake?It.brakeDamping:It.damping;this.velocity.multiplyScalar(Math.exp(-u*e));const d=It.baseMaxSpeed*this.envSpeedScale*c*(this.boostActive?It.boostMaxMult:1),f=this.velocity.length();if(f>d){const m=f/d;this.velocity.multiplyScalar(Math.pow(m,-Math.min(1,6*e)))}}this.integrate(e),this.updateDefense(e),this._throttleSmooth=Ht(this._throttleSmooth,Math.max(0,n.throttle),Dt(6,e)),this._boostBlend=Ht(this._boostBlend,this.boostActive?1:0,Dt(7,e)),this.visual.rotation.z=Ht(this.visual.rotation.z,this.angularRates.y*.55,Dt(6,e)),this.visual.rotation.x=Ht(this.visual.rotation.x,this.angularRates.x*.1,Dt(6,e)),this.glow.update(this._throttleSmooth,this._boostBlend,t)}applyUpgrades(){const e=this.statMult,t=this.shieldMax,n=this.hullMax;this.shieldMax=Math.round(100*this.upgrades.shield*e.shield),this.shieldRegenRate=10*this.upgrades.shield,this.hullMax=Math.round(100*e.hull),this.shieldMax>t&&(this.shield+=this.shieldMax-t),this.hullMax>n&&(this.hull+=this.hullMax-n),this.shield=Math.min(this.shield,this.shieldMax),this.hull=Math.min(this.hull,this.hullMax)}refreshShip(){const e=this.ships.active;this.ships.active=null,this.setShip(e)}upgradesFor(e){return this.upgradesByShip[e]||(this.upgradesByShip[e]={engine:1,shield:1,weapon:1}),this.upgradesByShip[e]}setShip(e){const t=Vt[e];if(!t||this.ships.active===e)return;this.ships.active=e,this.statMult=t,this.upgrades=this.upgradesFor(e),this.object3D.remove(this.visual),this.object3D.remove(this.shieldFx.mesh),this.shieldFx.dispose();const n=xa(e);this.visual=n.group,this.object3D.add(this.visual),this.radius=n.radius,this.engines=n.engines,this.hardpoints=n.hardpoints,this.glowColor=n.glowColor,this.engineScale=n.engineScale??1,this.glow=new Ss(this.visual,this.engines,this.glowColor,this.engineScale),this.shieldFx=new ws(this.object3D,this.radius*1.4),this.applyUpgrades(),this.hull=this.hullMax,this.shield=this.shieldMax,this.game.events.emit("ship:changed",t)}get hull01(){return this.hull/this.hullMax}get shield01(){return this.shield/this.shieldMax}get boost01(){return this.boostEnergy/100}respawn(){this.hull=this.hullMax,this.shield=this.shieldMax,this.boostEnergy=100,this.velocity.set(0,0,0),this.angularRates.set(0,0,0),this.alive=!0,this.object3D.visible=!0}}const _f={scout:{displayName:"Scout",level:10,credits:20,weapon:"bolt",accuracy:.6,hull:28,shield:12,accel:90,maxSpeed:150,turnRate:1.9,fireRange:300,fireInterval:1.2,damage:9,detectRange:1200,evadeSkill:.4,attackRunTime:4,resources:2},fighter:{displayName:"Fighter",level:20,credits:50,weapon:"bolt",accuracy:.7,hull:50,shield:25,accel:80,maxSpeed:140,turnRate:1.4,fireRange:360,fireInterval:.9,damage:15,detectRange:950,evadeSkill:.28,attackRunTime:6,resources:4},heavy:{displayName:"Heavy Assault",level:40,credits:160,weapon:"bolt",accuracy:.8,hull:150,shield:70,accel:60,maxSpeed:105,turnRate:.8,fireRange:460,fireInterval:1.6,damage:28,detectRange:850,evadeSkill:.12,attackRunTime:9,resources:10},cruiser:{displayName:"Missile Cruiser",level:60,credits:420,weapon:"missile",accuracy:.85,hull:240,shield:130,accel:45,maxSpeed:90,turnRate:.6,fireRange:1100,fireInterval:3.2,damage:48,detectRange:1400,evadeSkill:.08,attackRunTime:14,resources:16,kiteRange:620},destroyer:{displayName:"Planet Destroyer",level:100,credits:1e4,weapon:"missile",accuracy:.9,hull:2200,shield:1e3,accel:22,maxSpeed:55,turnRate:.22,fireRange:1500,fireInterval:2.4,damage:70,detectRange:2400,evadeSkill:.02,attackRunTime:40,resources:60,kiteRange:900},warship:{displayName:"Battlecruiser",level:75,credits:1500,weapon:"bolt",accuracy:.8,turret:!0,hull:900,shield:400,accel:30,maxSpeed:70,turnRate:.3,fireRange:700,fireInterval:.55,damage:18,detectRange:1600,evadeSkill:.02,attackRunTime:30,resources:30,kiteRange:420},apex:{displayName:"Ravager Dreadnought",level:120,credits:25e3,weapon:"missile",accuracy:.92,turret:!0,deploys:"fighter",apex:!0,hull:6e3,shield:2500,accel:20,maxSpeed:58,turnRate:.2,fireRange:1600,fireInterval:2,damage:85,detectRange:1e9,evadeSkill:0,attackRunTime:9999,resources:120,kiteRange:900},redcarrier:{displayName:"Dreadcarrier",level:90,credits:4e3,weapon:"missile",accuracy:.85,turret:!0,deploys:"fighter",hull:1500,shield:700,accel:24,maxSpeed:60,turnRate:.24,fireRange:1300,fireInterval:3.5,damage:55,detectRange:2e3,evadeSkill:.01,attackRunTime:40,resources:45,kiteRange:800}};for(const r of Object.values(_f))r.hull=Math.round(r.hull*1.25),r.shield=Math.round(r.shield*1.25),r.damage=Math.round(r.damage*1.25),r.accuracy=Math.min(.97,(r.accuracy??.7)+.08),r.fireInterval*=.9,r.detectRange=Math.round(r.detectRange*1.3);const Je={PATROL:"patrol",CHASE:"chase",ATTACK:"attack",EVADE:"evade",RETREAT:"retreat"};let Ax=1;class Rx extends Ua{constructor(e,t,n,i=600){super(kc(t)),this.game=e,this.type=t,this.stats=_f[t],this.id=Ax++,this.hullMax=this.hull=this.stats.hull,this.shieldMax=this.shield=this.stats.shield,this.shieldRegenRate=6,this.shieldRegenDelay=5,this.state=Je.PATROL,this.homeCenter=n.clone(),this.patrolRadius=i,this.rng=new qt(`enemy:${this.id}:${Math.random()}`),this.waypoint=new b,this._pickPatrolWaypoint(),this.fireCooldown=this.rng.range(0,this.stats.fireInterval),this.stateTime=0,this._lostSightTime=0,this._evadeDir=new b,this._evadeDuration=0,this._attackRunTime=0,this.triggerHeld=!1,this.victim=null,this._victimTimer=this.rng.range(0,1.2),this.region=null,this.glow=new Ss(this.visual,this.engines,this.glowColor,this.engineScale),this.shieldFx=new ws(this.object3D,this.radius*1.35,new X(1.6,.8,.4)),this._throttle=0,this._toTarget=new b,this._desired=new b,this._local=new b,this._quatInv=new ht,this._avoid=new b,this._fwd=new b}refreshVisual(){if(this.rigModeled||!this.alive)return;const e=kc(this.type);e.modeled!==!1&&(this.object3D.remove(this.visual),this.shieldFx.dispose(),this.visual=e.group,this.object3D.add(this.visual),this.radius=e.radius,this.engines=e.engines,this.hardpoints=e.hardpoints,this.glowColor=e.glowColor,this.engineScale=e.engineScale??1,this.rigModeled=!0,this.glow=new Ss(this.visual,this.engines,this.glowColor,this.engineScale),this.shieldFx=new ws(this.object3D,this.radius*1.35,new X(1.6,.8,.4)))}_pickPatrolWaypoint(){const[e,t,n]=this.rng.unitVector();this.waypoint.copy(this.homeCenter).add(new b(e,t,n).multiplyScalar(this.rng.range(.3,1)*this.patrolRadius))}notifyHit(){this.alive&&(this.state===Je.PATROL?this._setState(Je.CHASE):this.state!==Je.RETREAT&&this.rng.chance(this.stats.evadeSkill*.7)&&this._startEvade())}notifyNearMiss(){!this.alive||this.state===Je.RETREAT||(this.state===Je.CHASE||this.state===Je.ATTACK)&&this.rng.chance(this.stats.evadeSkill*.4)&&this._startEvade()}_pickVictim(e,t){const n=this.game,i=n.player;if(this.stats.apex)return this.victim=t?i:null,this.victim;this._victimTimer-=e;const s=this.victim,a=s&&(s===i?t:s.alive);if(a&&this._victimTimer>0)return s;a||(this.victim=null),this._victimTimer=1.2+this.rng.range(0,.8);const o=this.id%2===0?.45:1.25;let c=t?i:null,l=t?this.position.distanceToSquared(i.position):1/0;const h=u=>{if(!u||!u.alive)return;const d=this.position.distanceToSquared(u.position)*o*o;d<l&&(l=d,c=u)};for(const u of n.fleet?.escorts??[])h(u);for(const u of n.traffic?.ships??[])h(u);return this.victim=c,c}_startEvade(){const e=this.victim??this.game.player;this._toTarget.copy(e.position).sub(this.position).normalize();const[t,n,i]=this.rng.unitVector();this._evadeDir.set(t,n,i).cross(this._toTarget),this._evadeDir.lengthSq()<.05&&this._evadeDir.set(0,1,0),this._evadeDir.normalize(),this._evadeDuration=this.rng.range(.7,1.6),this._setState(Je.EVADE)}_setState(e){this.state!==e&&(this.state=e,this.stateTime=0)}update(e,t){if(this.shieldFx.update(e),!this.alive)return;this.stateTime+=e,this.fireCooldown-=e;const n=this.game.player,i=n&&n.alive,s=this._pickVictim(e,i),a=s?this._toTarget.copy(s.position).sub(this.position).length():1/0;this._updateAI(e,a,!!s),this.integrate(e),this.updateDefense(e),this.glow.update(this._throttle,this.state===Je.RETREAT?.6:0,t+this.id)}_updateAI(e,t,n){const i=this.stats,s=this.victim;this.triggerHeld=!1,i.apex&&n&&this.state===Je.PATROL&&this._setState(Je.CHASE),!i.apex&&!this.fearless&&this.state!==Je.RETREAT&&this.hull/this.hullMax<.28&&(this._setState(Je.RETREAT),this.game.events.emit("enemy:retreating",this));let a=.45,o=this.waypoint;switch(this.state){case Je.PATROL:{this.position.distanceTo(this.waypoint)<60&&this._pickPatrolWaypoint(),n&&t<i.detectRange&&(this._setState(Je.CHASE),this.game.events.emit("enemy:detected-player",this));break}case Je.CHASE:{if(!n){this._setState(Je.PATROL);break}o=s.position,a=1,t>i.detectRange*1.8?(this._lostSightTime+=e,this._lostSightTime>5&&(this._lostSightTime=0,this._setState(Je.PATROL))):this._lostSightTime=0,t<i.fireRange&&(i.turret||this._isAlignedWith(s,.93))&&(this._setState(Je.ATTACK),this._attackRunTime=i.attackRunTime);break}case Je.ATTACK:{if(!n){this._setState(Je.PATROL);break}if(o=s.position,this._attackRunTime-=e,i.weapon==="missile"){const l=i.kiteRange||600;a=t<l?.45:.85,this.triggerHeld=t<i.fireRange&&(i.turret||this._isAlignedWith(s,.72)),this._attackRunTime<=0?this._startEvade():t>i.fireRange*1.4&&this._setState(Je.CHASE)}else if(i.turret){const l=i.kiteRange||400;a=t<l?.3:.7,this.triggerHeld=t<i.fireRange,t>i.fireRange*1.5&&this._setState(Je.CHASE)}else a=Qe(t/220,.35,1),this.triggerHeld=this._isAlignedWith(s,.965)&&t<i.fireRange,t<70||this._attackRunTime<=0?this._startEvade():t>i.fireRange*1.35&&this._setState(Je.CHASE);if(i.deploys&&(this._deployCooldown=(this._deployCooldown??2)-e,this._deployCooldown<=0&&this.game.enemies.enemies.length<14)){this._deployCooldown=9;const l=this.position.clone();l.x+=(Math.random()-.5)*60,l.y+=20;const h=this.game.enemies.spawn(i.deploys,l,this.homeCenter);h.region=this.region,h.state=Je.CHASE}break}case Je.EVADE:{a=1,this.stateTime>this._evadeDuration&&this._setState(n?Je.CHASE:Je.PATROL);break}case Je.RETREAT:{a=1.1,(!n||t>1400)&&(this._setState(Je.PATROL),this._pickPatrolWaypoint());break}}const c=this.state===Je.ATTACK&&i.weapon==="missile"&&n&&t<(i.kiteRange||600)*.8;if(this.state===Je.EVADE)this._desired.copy(this._evadeDir);else if((this.state===Je.RETREAT||c)&&n)this._desired.copy(this.position).sub(s.position).normalize();else{this._desired.copy(o).sub(this.position);const l=this._desired.length();l>.001?this._desired.divideScalar(l):this._desired.set(0,0,-1),this.state===Je.ATTACK&&n&&this._desired.addScaledVector(s.velocity,Qe(l/900,0,.4)/900).normalize()}this._avoidObstacles(),this._steerToward(this._desired,e),this._applyThrust(a,e)}_isAlignedWith(e,t){return this.getForward(this._fwd),this._toTarget.copy(e.position).sub(this.position).normalize(),this._fwd.dot(this._toTarget)>t}_avoidObstacles(){const e=this.game.obstacles;if(e)for(const t of e){const n=t.radius*1.15+120;this._avoid.copy(this.position).sub(t.position);const i=this._avoid.length();if(i>n*2.5)continue;const s=Qe(1-(i-n)/n,0,1);s>0&&(this._avoid.divideScalar(Math.max(i,.001)),this._desired.addScaledVector(this._avoid,s*2.2).normalize())}}_steerToward(e,t){const n=this.stats;this._quatInv.copy(this.quaternion).invert(),this._local.copy(e).applyQuaternion(this._quatInv);const i=Math.atan2(this._local.x,-this._local.z),s=Math.hypot(this._local.x,this._local.z),a=Math.atan2(this._local.y,s),o=Dt(6,t);this.angularRates.x=Ht(this.angularRates.x,Qe(a*2.5,-n.turnRate,n.turnRate),o),this.angularRates.y=Ht(this.angularRates.y,Qe(-i*2.5,-n.turnRate*.85,n.turnRate*.85),o),this.angularRates.z=Ht(this.angularRates.z,Qe(-i*1.4,-2.2,2.2),o)}dispose(){this.shieldFx.dispose()}_applyThrust(e,t){const n=this.stats;this.getForward(this._fwd),this.velocity.addScaledVector(this._fwd,n.accel*t),this.velocity.multiplyScalar(Math.exp(-.6*t));const i=n.maxSpeed*e,s=this.velocity.length();s>i&&this.velocity.multiplyScalar(Math.pow(s/i,-Math.min(1,8*t))),this._throttle=Qe(s/n.maxSpeed,0,1)}}class Cx{constructor(e){this.game=e,this.enemies=[],e.origin.onShift(t=>{for(const n of this.enemies)n.position.sub(t),n.homeCenter.sub(t),n.waypoint.sub(t)})}spawn(e,t,n=null,i=600){const s=new Rx(this.game,e,n??t,i);return s.position.copy(t),s.quaternion.setFromEuler(new Wt(0,Math.random()*Math.PI*2,0)),this.game.engine.scene.add(s.object3D),this.enemies.push(s),s}spawnSquad(e,t,n=250,i=700){const s=[];for(const a of t){const o=new b((Math.random()-.5)*2*n,(Math.random()-.5)*2*n*.4,(Math.random()-.5)*2*n);s.push(this.spawn(a,o.add(e),e,i))}return s}remove(e){const t=this.enemies.indexOf(e);t!==-1&&(this.enemies.splice(t,1),this.game.engine.scene.remove(e.object3D),e.dispose())}refreshModels(){for(const e of this.enemies)e.refreshVisual()}countNear(e,t){let n=0;for(const i of this.enemies)i.position.distanceTo(e)<t&&n++;return n}update(e,t){for(const n of this.enemies)n.update(e,t)}}const Px=10,Lx=1e3,Dx=1700,Ix=14e3,Do=2,Fx={1:["scout","scout"],2:["fighter","scout","scout"],3:["heavy","fighter","fighter"],4:["cruiser","fighter","fighter","scout"],5:["destroyer","heavy","fighter"],6:["warship","fighter","fighter"],7:["redcarrier","warship"]};class Nx{constructor(e){this.game=e,this.rng=new qt(`${Dn}:encounters`),this.regions=[],this._checkTimer=0,this._ambientTimer=0,this._dir=new b,this._buildRegions(),e.origin.onShift(t=>{for(const n of this.regions)n.center.sub(t)})}_buildRegions(){const e=this.game,t=this.rng;if(e.poi)for(const n of e.poi.sites)n.kind==="station"?this._addRegion(n.position,5e3,2,n.name):n.kind==="cache"?this._addRegion(n.position,4e3,3,n.name):n.kind==="anomaly"&&this._addRegion(n.position,5e3,2,n.name);for(let n=0;n<5;n++){const i=t.range(0,Math.PI*2),s=t.range(45e3,2e5);this._addRegion(new b(Math.cos(i)*s,t.gaussian()*6e3,Math.sin(i)*s),11e3,t.chance(.3)?4:t.chance(.5)?3:2,`territory ${n}`)}for(const[n,i,s]of[[6,9e4,18e4],[7,12e4,22e4]]){const a=t.range(0,Math.PI*2),o=t.range(i,s);this._addRegion(new b(Math.cos(a)*o,t.gaussian()*7e3,Math.sin(a)*o),13e3,n,n===7?"carrier fleet":"capital patrol")}{const n=t.range(0,Math.PI*2),i=t.range(15e4,24e4);this._addRegion(new b(Math.cos(n)*i,t.gaussian()*8e3,Math.sin(n)*i),14e3,5,"Destroyer patrol")}if(e.universe){const n=e.universe.planets.filter(()=>t.chance(.35));for(const i of n)this._addRegion(i.group.position,i.radius*4,1,i.descriptor.name,i)}}_addRegion(e,t,n,i,s=null){this.regions.push({center:e.clone(),planet:s,radius:t,tier:n,cooldown:0,label:i})}update(e){if(this._checkTimer-=e,this._checkTimer>0||(this._checkTimer=Do,this.game.missions?.active))return;const t=this.game,n=t.player,i=t.enemies;if(!n||!n.alive||!i)return;for(const o of[...i.enemies])o.stats?.apex||o.hubGuard||o.position.distanceTo(n.position)>Ix&&i.remove(o);const s=i.enemies.filter(o=>!o.stats?.apex).length;for(const o of this.regions)o.planet&&o.center.copy(o.planet.group.position),o.cooldown>0&&(o.cooldown-=Do);if(s>=Px)return;for(const o of this.regions)if(!(o.cooldown>0||n.position.distanceTo(o.center)>o.radius||i.enemies.filter(h=>h.region===o).length>0)){this._deploySquad(o);return}this._ambientTimer+=Do;const a=t.universe?.playerContext.planet;s<2&&!a&&this._ambientTimer>30&&Math.random()<.16&&(this._ambientTimer=0,this._deploySquad({center:n.position,radius:6e3,tier:this.rng.chance(.4)?2:1,cooldown:0,label:"wanderers"}))}_effectiveTier(e){const t=Vt[this.game.player?.ships?.active]?.level??10,n=t>=100?7:t>=85?6:t>=70?5:t>=50?4:t>=30?3:2,i=t>=100?3:t>=70?2:1;return Math.min(n,Math.max(e,i))}_deploySquad(e){const t=this.game,n=t.player,i=Fx[this._effectiveTier(e.tier)],[s,a,o]=this.rng.unitVector();this._dir.set(s,a,o);const c=n.position.clone().addScaledVector(this._dir,this.rng.range(Lx,Dx)),l=t.enemies.spawnSquad(c,i,220,e.radius*.4),h=Vt[n?.ships?.active]?.level??10,u=1+Math.max(0,h-10)/120,d=1+Math.max(0,h-10)/150;for(const f of l)f.region=e,f.homeCenter.copy(e.center),f.damageScale=d,f.hullMax=Math.round(f.hullMax*u),f.hull=f.hullMax,f.shieldMax=Math.round(f.shieldMax*u),f.shield=f.shieldMax;e.cooldown=160+this.rng.range(0,80),t.events.emit("combat:contact",{count:i.length,label:e.label})}}const Ux=6e4,Ox=600,kx=90,zx=5e3;class Bx{constructor(e){this.game=e,this.hunter=null,this._cooldown=kx,this._dir=new b,e.events.on("player:respawned",()=>{this.hunter?.alive&&this._placeFar(this.hunter.position)})}update(e){const t=this.game,n=t.player;if(!n||!n.alive||t.missions?.active&&!this.hunter)return;if(this.hunter&&(!this.hunter.alive||!t.enemies.enemies.includes(this.hunter))&&(this.hunter=null,this._cooldown=Ox),!this.hunter){this._cooldown-=e,this._cooldown<=0&&this._spawn();return}const i=this.hunter.position.distanceTo(n.position);if(i>zx){const s=Math.min(1400,Math.max(140,i*.012));this._dir.copy(n.position).sub(this.hunter.position).normalize(),this.hunter.position.addScaledVector(this._dir,s*e)}}_spawn(){const e=this.game,t=new b;this._placeFar(t),this.hunter=e.enemies.spawn("apex",t,t.clone(),4e3),e.events.emit("combat:contact",{count:1,label:"APEX SIGNATURE — Ravager Dreadnought"})}_placeFar(e){const t=Math.random()*Math.PI*2,n=(Math.random()-.5)*.3;this._dir.set(Math.cos(t),n,Math.sin(t)).normalize(),e.copy(this.game.player.position).addScaledVector(this._dir,Ux)}}const Hx=new b(43e4,26e3,-38e4),Gx=15e4,Vx=70,ru=26e3,Wx=34e3,au=.6,qx=.12,jx=1.5,ou=1.4,Xx=9e3,Yx=25,cu=["scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","scout","fighter","fighter","fighter","heavy","heavy","heavy","cruiser","cruiser","warship","redcarrier","destroyer"];class Kx{constructor(e){this.object3D=new Xe,this.visual=e.clone(!0),this.object3D.add(this.visual),this.visual.traverse(n=>{if(!n.isMesh)return;const i=Array.isArray(n.material)?n.material:[n.material];for(const s of i)s&&(s.side=Nt)}),this.position=this.object3D.position,this.quaternion=this.object3D.quaternion,this.velocity=new b;const t=e.userData.shipBounds;this.radius=Math.max(t.length,t.width,t.height)/2.4,this.id="leviathan-hub",this.type="leviathan",this.stats={displayName:"Obsidian Leviathan",level:200,credits:15e4,resources:150,apex:!0,fireRange:0},this.hullMax=this.hull=Gx,this.shieldMax=this.shield=0,this.alive=!0,this.hitFlash=0,this.homeCenter=new b,this.waypoint=new b,this.hardpoints=[]}getForward(e){return e.set(0,0,-1).applyQuaternion(this.quaternion)}getUp(e){return e.set(0,1,0).applyQuaternion(this.quaternion)}get speed(){return 0}applyDamage(e){if(!this.alive)return{shieldAbsorbed:0,hullDamage:0,destroyed:!1};this.hull=Math.max(0,this.hull-e);const t=this.hull<=0;return t&&(this.alive=!1),{shieldAbsorbed:0,hullDamage:e,destroyed:t}}update(){}updateDefense(){}notifyHit(){}notifyNearMiss(){}refreshVisual(){}dispose(){}}class $x{constructor(e){this.game=e,this.center=Hx.clone(),e.origin.onShift(t=>this.center.sub(t)),this.hub=null,this.obstacle=null,this.navTarget=null,this.guards=[],this._streamTimer=0,this._mixCursor=0,this._announced=!1,this._fallen=!1,this._filled=!1,this._alarm=0,this._dir=new b,e.events.on("combat:hit-confirmed",({target:t})=>{(t===this.hub||t?.hubGuard)&&(this._alarm=Yx)})}update(e){const t=this.game;if(this._fallen)return;if(!this.hub){const a=pf("leviathan");if(!a)return;this._build(a)}const n=this.hub;if(!n.alive||!t.enemies.enemies.includes(n)){this._onDestroyed();return}const i=t.player;if(!i||!i.alive)return;this.guards=this.guards.filter(a=>a.alive&&t.enemies.enemies.includes(a));const s=i.position.distanceTo(n.position);if(s>Wx){for(const a of this.guards)t.enemies.remove(a);this.guards.length=0,this._announced=!1,this._filled=!1,this._alarm=0;return}if(!this._announced&&s<ru&&(this._announced=!0,t.events.emit("leviathan:contact")),this._alarm>0){this._alarm-=e;for(const a of this.guards)a.state==="patrol"&&(a.state="chase")}if(!t.missions?.active&&!(s>ru)){if(this.guards.length>=Vx){this._filled||(this._filled=!0,this._streamTimer=au);return}this._streamTimer-=e,!(this._streamTimer>0)&&(this._streamTimer=this._filled?au:qx,this._launchGuard())}}_build(e){const t=this.game,n=new Kx(e);n.position.copy(this.center),n.homeCenter.copy(this.center),n.waypoint.copy(this.center),t.engine.scene.add(n.object3D),t.enemies.enemies.push(n),this.obstacle={position:n.position,radius:n.radius*1.04},t.obstacles.push(this.obstacle),this.navTarget={group:{position:n.position},radius:n.radius,influenceRadius:6e3,descriptor:{name:"☠ OBSIDIAN LEVIATHAN"},leviathan:!0},this.hub=n}_launchGuard(){const e=this.game,t=this.hub,n=cu[this._mixCursor%cu.length];this._mixCursor++,this._dir.set(Math.random()-.5,(Math.random()-.5)*.7,Math.random()-.5),this._dir.lengthSq()<1e-4&&this._dir.set(0,1,0),this._dir.normalize();const i=t.position.clone().addScaledVector(this._dir,t.radius*1.02),a=this._mixCursor%5===0?t.radius+4200+Math.random()*2400:t.radius+400+Math.random()*1600,o=e.enemies.spawn(n,i,t.position,a);o.hubGuard=!0,o.stats={...o.stats,damage:Math.round(o.stats.damage*jx),fireInterval:o.stats.fireInterval*.8,accuracy:Math.min(.95,(o.stats.accuracy??.7)+.1),detectRange:Math.max(o.stats.detectRange,Xx)},o.hullMax=o.hull=Math.round(o.hullMax*ou),o.shieldMax=o.shield=Math.round(o.shieldMax*ou),o.fearless=!0;const c=e.player;(this._alarm>0||c&&c.position.distanceTo(t.position)<8e3)&&(o.state="chase"),o.velocity.copy(this._dir).multiplyScalar(70),this.guards.push(o)}_onDestroyed(){const e=this.game;this._fallen=!0;const t=this.hub;if(this.hub=null,e.explosions)for(let i=0;i<14;i++){this._dir.set(Math.random()-.5,Math.random()-.5,Math.random()-.5),this._dir.lengthSq()<1e-4&&this._dir.set(0,1,0);const s=t.position.clone().addScaledVector(this._dir.normalize(),Math.random()*t.radius*.9);e.explosions.spawn(s,2.6)}for(const i of this.guards)i.alive&&e.enemies.enemies.includes(i)&&e.enemies.remove(i);this.guards.length=0;const n=e.obstacles.indexOf(this.obstacle);n!==-1&&e.obstacles.splice(n,1),this.obstacle=null,this.navTarget=null,e.events.emit("leviathan:destroyed")}}const Qx=16,lu=3.5,Zx=8,hu=950,Jx=1500,eM={redcarrier:"warship",destroyer:"heavy"};class tM{constructor(e){this.game=e,this.queue=[],this._dir=new b,e.events.on("enemy:killed",t=>{if(!t?.stats||t.stats.apex||t.hubGuard||e.missions?.active)return;const n=eM[t.type]??t.type,i=this.queue.length===0;for(let s=0;s<2;s++)this.queue.push({type:n,timer:lu+Math.random()*(Zx-lu)});i&&e.events.emit("combat:contact",{count:2,label:"reinforcements — warp out to escape"})})}update(e){if(this.queue.length===0)return;const t=this.game,n=t.player;if(!n||!n.alive||t.warp?.engaged){this.queue.length=0;return}for(let i=this.queue.length-1;i>=0;i--){const s=this.queue[i];s.timer-=e,!(s.timer>0||(this.queue.splice(i,1),t.enemies.enemies.filter(o=>!o.stats?.apex).length>=Qx))&&this._spawn(s.type)}}_spawn(e){const t=this.game,n=t.player,i=Math.random()*Math.PI*2;this._dir.set(Math.cos(i),(Math.random()-.5)*.5,Math.sin(i)).normalize();const s=n.position.clone().addScaledVector(this._dir,hu+Math.random()*(Jx-hu)),a=t.enemies.spawn(e,s,n.position.clone(),3e3),o=Vt[n.ships?.active]?.level??10;a.damageScale=1+Math.max(0,o-10)/150;const c=1+Math.max(0,o-10)/120;a.hullMax=Math.round(a.hullMax*c),a.hull=a.hullMax,a.shieldMax=Math.round(a.shieldMax*c),a.shield=a.shieldMax}}const nM=5,iM=3,uu=2500,sM=7e3,du=16e3,fu=1600,pu=1300,mu=4500,gu=.55,rM=7,_u=["starter","starter","explorer","explorer","interceptor","frigate"],vu=["battlecruiser","battleship","carrier"],bu=["Trader","Hauler","Patrol","Escort","Surveyor","Courier","Miner"];class Io extends Ua{constructor(e,t,n){super(xa(t)),this.game=e,this.isFriendly=!0,this.callsign=n,this.cruise=70+Math.random()*90,this.combatSpeed=260,this.waypoint=new b,this.target=null,this._retarget=0,this._seed=Math.random()*10,this._fireCooldown=Math.random()*gu,this._desired=new b,this._dir=new b,this._away=new b,this._muzzle=new b,this._lead=new b,this._q=new ht;const i=Vt[t]??Vt.starter;this.hullMax=this.hull=Math.round(90*i.hull),this.shieldMax=this.shield=Math.round(90*i.shield),this.shieldRegenRate=7,this.shieldRegenDelay=4.5,this.fireDamage=rM*(i.weapon??1),this.glow=new Ss(this.visual,this.engines,this.glowColor,this.engineScale),this.shieldFx=new ws(this.object3D,this.radius*1.4),e.engine.scene.add(this.object3D)}update(e){if(this.shieldFx.update(e),!this.alive)return;const t=this.game;this._fireCooldown-=e,this._retarget-=e,(this._retarget<=0||this.position.distanceToSquared(this.waypoint)<4e4)&&(this._retarget=18+Math.random()*20,this.waypoint.set(Math.random()-.5,(Math.random()-.5)*.4,Math.random()-.5).normalize().multiplyScalar(1200+Math.random()*4800).add(t.player.position));const n=this._acquire();let i=this.waypoint,s=this.cruise;n&&(this._desired.copy(this.position).sub(n.position).normalize(),i=this._away.copy(n.position).addScaledVector(this._desired,110+this._seed*8),s=this.combatSpeed),this._desired.copy(i).sub(this.position);const a=this._desired.length(),o=Qe(a*(n?1:.4),30,s);a>.001&&this._desired.divideScalar(a).multiplyScalar(o);for(const c of t.obstacles){this._away.copy(this.position).sub(c.position);const l=this._away.length(),h=c.radius+500;l<h&&l>.001&&this._desired.addScaledVector(this._away.divideScalar(l),(h-l)*.8)}if(this.velocity.lerp(this._desired,1-Math.exp(-(n?2.4:1.4)*e)),this.position.addScaledVector(this.velocity,e),n?(this._dir.copy(n.position).sub(this.position).normalize(),this._q.setFromUnitVectors(yu,this._dir),this.quaternion.slerp(this._q,Dt(3.2,e))):this.velocity.lengthSq()>4&&(this._dir.copy(this.velocity).normalize(),this._q.setFromUnitVectors(yu,this._dir),this.quaternion.slerp(this._q,Dt(2.2,e))),n&&this._fireCooldown<=0){this._fireCooldown=gu;const c=this.hardpoints[Math.floor(Math.random()*this.hardpoints.length)];this._muzzle.copy(c).applyQuaternion(this.quaternion).add(this.position);const l=this._lead.copy(n.position).sub(this._muzzle).length();this._lead.copy(n.position).addScaledVector(n.velocity,l/950).addScaledVector(this.velocity,-l/950).sub(this._muzzle).normalize(),this._lead.x+=(Math.random()-.5)*.025,this._lead.y+=(Math.random()-.5)*.025,t.weapons.fire(this._muzzle,this._lead.normalize(),{fromPlayer:!0,damage:this.fireDamage,speed:950,source:this,inheritVel:this.velocity})}this.updateDefense(e),this.glow.update(Qe(this.velocity.length()/s,.25,1),0,this._seed)}_acquire(){const e=this.game.player;if(this.target?.alive&&this.target.position.distanceToSquared(e.position)<mu*mu)return this.target;this.target=null;let t=null,n=1/0;const i=fu*fu,s=pu*pu;for(const a of this.game.enemies?.enemies??[]){if(!a.alive)continue;const o=a.position.distanceToSquared(this.position);(o<i||a.position.distanceToSquared(e.position)<s)&&o<n&&(n=o,t=a)}return this.target=t,t}dispose(){this.shieldFx.dispose(),this.game.engine.scene.remove(this.object3D)}}class aM{constructor(e){this.game=e,this.ships=[],this._checkTimer=0,this._spawnPos=new b,e.traffic=this,e.origin.onShift(t=>{for(const n of this.ships)n.position.sub(t),n.waypoint.sub(t)}),e.events.on("reinforce:call",({count:t})=>this.spawnReinforcements(t)),e.events.on("fleetcall:call",({variants:t})=>this.spawnFleet(t))}spawnFleet(e){const t=this.game,n=(e??[]).slice(0,50);n.forEach((i,s)=>{const a=new Io(t,i,"Fleet");a.reinforcement=!0,a.life=200;const o=s/Math.max(1,n.length)*Math.PI*2,c=240+a.radius*1.6+s%5*80;a.position.copy(t.player.position),a.position.x+=Math.cos(o)*c,a.position.y+=(s%3-1)*90,a.position.z+=Math.sin(o)*c,a.waypoint.copy(a.position),a._retarget=0,this.ships.push(a)}),t.audio?.playTone?.({type:"sine",freq:300,freqEnd:760,duration:.7,gain:.22})}spawnReinforcements(e){const t=this.game,n=Math.max(1,Math.min(40,Math.floor(e)||1));for(let i=0;i<n;i++){const s=i%6===5?"frigate":i%3===2?"explorer":"starter",a=new Io(t,s,"Reinforcement");a.reinforcement=!0,a.life=150;const o=i/n*Math.PI*2,c=180+i%5*70;a.position.copy(t.player.position),a.position.x+=Math.cos(o)*c,a.position.y+=(i%3-1)*60,a.position.z+=Math.sin(o)*c,a.waypoint.copy(a.position),a._retarget=0,this.ships.push(a)}t.audio?.playTone?.({type:"sine",freq:420,freqEnd:880,duration:.5,gain:.2})}update(e){const n=this.game.player;if(n){for(const i of this.ships)i.update(e),i.reinforcement&&(i.life-=e,i.life<=0&&!i.target?.alive&&(i.dispose(),this.ships.splice(this.ships.indexOf(i),1)));if(this._checkTimer-=e,!(this._checkTimer>0)){this._checkTimer=iM;for(let i=this.ships.length-1;i>=0;i--)this.ships[i].position.distanceToSquared(n.position)>du*du&&(this.ships[i].dispose(),this.ships.splice(i,1));this.ships.length>=nM||this._spawnOne()}}}onTrafficDestroyed(e){const t=this.ships.indexOf(e);t!==-1&&this.ships.splice(t,1),e.dispose()}_spawnOne(){const e=this.game,t=Math.random()<.12?vu[Math.floor(Math.random()*vu.length)]:_u[Math.floor(Math.random()*_u.length)];for(let n=0;n<6;n++){this._spawnPos.set(Math.random()-.5,(Math.random()-.5)*.5,Math.random()-.5).normalize().multiplyScalar(uu+Math.random()*(sM-uu)).add(e.player.position);let i=!0;for(const a of e.obstacles)if(this._spawnPos.distanceTo(a.position)<a.radius+600){i=!1;break}if(!i)continue;const s=new Io(e,t,bu[Math.floor(Math.random()*bu.length)]);s.position.copy(this._spawnPos),s.waypoint.copy(this._spawnPos),s._retarget=0,this.ships.push(s);return}}}const yu=new b(0,0,-1);class fl{constructor(e,t=null,n=0){this.create=e,this.reset=t,this.free=[],this.active=new Set;for(let i=0;i<n;i++)this.free.push(this.create())}acquire(){const e=this.free.length>0?this.free.pop():this.create();return this.active.add(e),e}release(e){this.active.delete(e)&&(this.reset&&this.reset(e),this.free.push(e))}releaseAll(){for(const e of[...this.active])this.release(e)}forEachActive(e){for(const t of[...this.active])e(t)}get activeCount(){return this.active.size}}const oM=1.6,xu=950,Mu=480,cM=.13,lM=50,hM=70,uM=1.35,dM=.12,fM=1600,pM=5.5,mM=26,gM=30,Su=20,_M=680,vM=9,bM=2.2,Fo=8;class yM{constructor(e){this.game=e;const t=xM(.55,7),n=Tu(new X(.5,2.2,3.2)),i=Tu(new X(4,.35,.28)),s=SM(),a=new xt({color:new X(5,1.6,.5)});this.pool=new fl(()=>({mesh:null,playerMesh:new pe(t,n),enemyMesh:new pe(t,i),missileMesh:new pe(s,a),velocity:new b,prevPos:new b,life:0,damage:0,fromPlayer:!1,source:null,nearMissDone:!1,homing:!1,isMissile:!1,target:null,turnRate:0,speed:0}),o=>{o.mesh&&(o.mesh.visible=!1)},24),this.pool.free.forEach(o=>this._attachBolt(o)),this.incoming=[],this.playerCooldown=0,this.playerHeat=0,this.overheated=!1,this._muzzleIndex=0,this.assistTarget=null,this._aimRay=new b,this._aimPoint=new b,this._lead=new b,this._soundBudget=0,this._dir=new b,this._muzzle=new b,this._toTarget=new b,this._closest=new b,this._segment=new b,this._axis=new b,this._jitterQuat=new ht,this._jitterEuler=new Wt,e.origin.onShift(o=>{this.pool.forEachActive(c=>{c.mesh.position.sub(o),c.prevPos.sub(o)})})}_attachBolt(e){e.playerMesh.visible=!1,e.enemyMesh.visible=!1,e.missileMesh.visible=!1,this.game.engine.scene.add(e.playerMesh,e.enemyMesh,e.missileMesh)}get playerHeat01(){return this.playerHeat/100}fire(e,t,{fromPlayer:n,damage:i,speed:s,source:a,inheritVel:o=null,missile:c=!1,target:l=null,life:h=null}){const u=this.pool.acquire();u.playerMesh.parent||this._attachBolt(u),u.isMissile=c,u.homing=c&&!!l,u.target=l,u.turnRate=c?bM:0,u.mesh=c?u.missileMesh:n?u.playerMesh:u.enemyMesh,u.mesh.visible=!0,u.mesh.position.copy(e),u.prevPos.copy(e),u.velocity.copy(t).multiplyScalar(s),o&&u.velocity.add(o),u.speed=s,u.life=h??oM,u.damage=i,u.fromPlayer=n,u.source=a,u.nearMissDone=!1,u.mesh.quaternion.setFromUnitVectors(wu,this._dir.copy(u.velocity).normalize())}update(e,t){this._soundBudget=Math.min(4,this._soundBudget+e*10),this._updatePlayerFire(e),this._updateEnemyFire(e),this._updateBolts(e),this._trackIncoming(),this.game.input.consumeCounter()&&this._fireCountermeasure()}_trackIncoming(){const e=this.game.player,t=this.incoming.length;this.incoming.length=0,!(!e||!e.alive)&&(this.pool.forEachActive(n=>{n.isMissile&&!n.fromPlayer&&n.target===e&&this.incoming.push(n)}),this.incoming.length>t&&t===0?this.game.events.emit("missile:incoming",{count:this.incoming.length}):this.incoming.length===0&&t>0&&this.game.events.emit("missile:cleared"))}_fireCountermeasure(){const e=this.game.player;if(!e||this.incoming.length===0)return;let t=null,n=1/0;for(const s of this.incoming){const a=s.mesh.position.distanceToSquared(e.position);a<n&&(n=a,t=s)}if(!t)return;this.game.explosions&&this.game.explosions.spawn(t.mesh.position,.6),this.game.audio?.playNoise?.({duration:.25,gain:.4,filterFreq:2200,filterEnd:300}),this.game.events.emit("missile:destroyed"),this.pool.release(t);const i=this.incoming.indexOf(t);i!==-1&&this.incoming.splice(i,1)}_updatePlayerFire(e){const t=this.game.player;if(this.playerCooldown-=e,this.playerHeat=Math.max(0,this.playerHeat-mM*e),this.overheated&&this.playerHeat<=gM&&(this.overheated=!1,this.game.audio.playTone({type:"sine",freq:660,freqEnd:880,duration:.12,gain:.12})),!t||!t.alive){this.assistTarget=null;return}this._muzzleIndex=(this._muzzleIndex+1)%t.hardpoints.length;const n=t.hardpoints[this._muzzleIndex];this._muzzle.copy(n).applyQuaternion(t.quaternion).add(t.position);const i=this.game.input,s=this.game.engine.camera;if(i.mouse.active&&!i.touchActive&&this.game.mode==="flight"){const o=i.mouse.px/window.innerWidth*2-1,c=-(i.mouse.py/window.innerHeight)*2+1;this._aimRay.set(o,c,.5).unproject(s).sub(s.position).normalize(),this._aimPoint.copy(s.position).addScaledVector(this._aimRay,1400),this._dir.copy(this._aimPoint).sub(this._muzzle).normalize()}else t.getForward(this._dir);this.assistTarget=null;const a=this.game.enemies?.enemies;if(a){let o=Math.cos(dM);for(const c of a){if(!c.alive)continue;this._toTarget.copy(c.position).sub(this._muzzle);const l=this._toTarget.length();if(l>fM||l<.001)continue;const h=this._toTarget.divideScalar(l).dot(this._dir);h>o&&(o=h,this.assistTarget=c)}if(this.assistTarget){const l=this.assistTarget.position.distanceTo(this._muzzle)/xu;this._lead.copy(this.assistTarget.velocity).sub(t.velocity),this._toTarget.copy(this.assistTarget.position).addScaledVector(this._lead,l).sub(this._muzzle).normalize(),this._dir.copy(this._toTarget)}}!this.game.input.state.fire||this.playerCooldown>0||this.overheated||(this.fire(this._muzzle,this._dir,{fromPlayer:!0,damage:lM*t.upgrades.weapon*(t.statMult?.weapon??1),speed:xu,source:t,inheritVel:t.velocity}),this.playerCooldown=cM,this.playerHeat+=pM,this.playerHeat>=100&&(this.overheated=!0,this.game.audio.playTone({type:"sawtooth",freq:320,freqEnd:90,duration:.5,gain:.2})),this._soundBudget>=1&&(this._soundBudget-=1,this.game.audio.playTone({type:"square",freq:1150,freqEnd:240,duration:.14,gain:.16,detune:(Math.random()-.5)*60})))}_updateEnemyFire(e){const t=this.game.enemies,n=this.game.player;if(!(!t||!n))for(const i of t.enemies){if(!i.alive||!i.triggerHeld||i.fireCooldown>0)continue;i.fireCooldown=i.stats.fireInterval*(.85+Math.random()*.3);const s=i.victim?.alive?i.victim:n,a=i.hardpoints[Math.floor(Math.random()*i.hardpoints.length)];this._muzzle.copy(a).applyQuaternion(i.quaternion).add(i.position);const o=this._toTarget.copy(s.position).sub(this._muzzle).length();if(i.stats.weapon==="missile"){i.getForward(this._dir),this._toTarget.copy(s.position).sub(this._muzzle).normalize(),this._dir.lerp(this._toTarget,.5).normalize(),this.fire(this._muzzle,this._dir,{fromPlayer:!1,damage:i.stats.damage*(i.damageScale??1),speed:_M,source:i,inheritVel:i.velocity,missile:!0,target:s,life:vM}),this.game.audio?.playTone?.({type:"sawtooth",freq:260,freqEnd:520,duration:.3,gain:.16});continue}const c=o/Mu;this._toTarget.copy(s.position).addScaledVector(s.velocity,c*1).sub(this._muzzle).normalize();const l=(1-(i.stats.accuracy??.7))*.06;this._jitterEuler.set((Math.random()-.5)*l,(Math.random()-.5)*l,0),this._jitterQuat.setFromEuler(this._jitterEuler),this._toTarget.applyQuaternion(this._jitterQuat),this.fire(this._muzzle,this._toTarget,{fromPlayer:!1,damage:hM,speed:Mu,source:i,inheritVel:i.velocity});const h=Qe(1-o/1600,0,1)*.14;h>.01&&this._soundBudget>=1&&(this._soundBudget-=1,this.game.audio.playTone({type:"sawtooth",freq:620,freqEnd:150,duration:.18,gain:h,detune:(Math.random()-.5)*80}))}}_updateBolts(e){this.pool.forEachActive(t=>{if(t.life-=e,t.life<=0){this.pool.release(t);return}if(t.homing&&t.target&&t.target.alive){this._toTarget.copy(t.target.position).sub(t.mesh.position);const n=this._toTarget.length();if(n>.001){this._toTarget.divideScalar(n),this._dir.copy(t.velocity).normalize();const i=Math.acos(Qe(this._dir.dot(this._toTarget),-1,1)),s=t.turnRate*e;i<=s?this._dir.copy(this._toTarget):(this._axis.crossVectors(this._dir,this._toTarget),this._axis.lengthSq()>1e-10?this._dir.applyAxisAngle(this._axis.normalize(),s):this._dir.lerp(this._toTarget,.2).normalize()),t.velocity.copy(this._dir).multiplyScalar(t.speed),t.mesh.quaternion.setFromUnitVectors(wu,this._dir)}}t.prevPos.copy(t.mesh.position),t.mesh.position.addScaledVector(t.velocity,e),this._resolveHit(t)&&this.pool.release(t)})}_resolveHit(e){const t=this.game;if(e.fromPlayer){const n=t.enemies?.enemies;if(n)for(const i of n){if(!i.alive)continue;const s=this._segmentPointDistanceSq(e.prevPos,e.mesh.position,i.position),a=i.radius*uM;if(s<a*a)return this._applyHit(e,i,!0),!0;!e.nearMissDone&&s<Su*Su&&(e.nearMissDone=!0,i.notifyNearMiss())}}else{const n=t.player;if(n&&n.alive){const s=this._segmentPointDistanceSq(e.prevPos,e.mesh.position,n.position),a=e.isMissile?Fo:n.radius;if(s<a*a)return this._applyHit(e,n,!1),!0}const i=t.fleet?.escorts;if(i)for(const s of i){if(!s.alive)continue;const a=this._segmentPointDistanceSq(e.prevPos,e.mesh.position,s.position),o=e.isMissile?Fo:s.radius*1.1;if(a<o*o)return this._applyHit(e,s,!1),!0}for(const s of t.traffic?.ships??[]){if(!s.alive)continue;const a=this._segmentPointDistanceSq(e.prevPos,e.mesh.position,s.position),o=e.isMissile?Fo:s.radius*1.1;if(a<o*o)return this._applyHit(e,s,!1),!0}}for(const n of t.obstacles)if(!(e.mesh.position.distanceToSquared(n.position)>=n.radius*n.radius)&&(!n.planet||n.planet.getAltitude(e.mesh.position)<=0))return!0;for(const n of t.asteroidFields){let i=n.sphereHit(e.mesh.position,1.2);if(i||(this._closest.lerpVectors(e.prevPos,e.mesh.position,.5),i=n.sphereHit(this._closest,1.2)??n.sphereHit(e.prevPos,1.2)),i)return n.damageRock(i,e.damage||15,e.mesh.position,e.fromPlayer),!0}return!1}_applyHit(e,t,n){const i=this.game,s=t.applyDamage(e.damage);e.isMissile&&i.explosions&&i.explosions.spawn(e.mesh.position,.7),s.shieldAbsorbed>0&&t.shieldFx&&t.shieldFx.flash(e.mesh.position,.8),n?(t.notifyHit(),t.hitFlash=.18,i.events.emit("combat:hit-confirmed",{target:t,killed:s.destroyed}),this._soundBudget>=.5&&(this._soundBudget-=.5,i.audio.playTone({type:"triangle",freq:1900,freqEnd:1100,duration:.06,gain:.08}))):t===i.player?(i.events.emit("player:hit",{damage:e.damage}),i.events.emit("camera:shake",.22),s.shieldAbsorbed>0&&s.hullDamage===0?i.audio.playTone({type:"sine",freq:480,freqEnd:300,duration:.22,gain:.3}):i.audio.playNoise({duration:.3,gain:.4,filterFreq:1400,filterEnd:160})):this._soundBudget>=.5&&(this._soundBudget-=.5,i.audio.playTone({type:"sine",freq:380,freqEnd:240,duration:.14,gain:.1})),s.destroyed&&i.events.emit("ship:destroyed",{ship:t,byPlayer:e.fromPlayer})}_segmentPointDistanceSq(e,t,n){this._segment.copy(t).sub(e);const i=this._segment.lengthSq();if(i<1e-8)return e.distanceToSquared(n);let s=this._closest.copy(n).sub(e).dot(this._segment)/i;return s=Qe(s,0,1),this._closest.copy(e).addScaledVector(this._segment,s),this._closest.distanceToSquared(n)}}const wu=new b(0,1,0);function xM(r,e){const t=new Es(r,e),n=t.clone().rotateY(Math.PI/2),i=MM(t,n);return t.dispose(),n.dispose(),i}function MM(r,e){const t=r.toNonIndexed(),n=e.toNonIndexed(),i=t.getAttribute("position"),s=n.getAttribute("position"),a=t.getAttribute("uv"),o=n.getAttribute("uv"),c=new Float32Array((i.count+s.count)*3);c.set(i.array,0),c.set(s.array,i.count*3);const l=new Float32Array((a.count+o.count)*2);l.set(a.array,0),l.set(o.array,a.count*2);const h=new vt;return h.setAttribute("position",new lt(c,3)),h.setAttribute("uv",new lt(l,2)),t.dispose(),n.dispose(),h}function Tu(r){return new xt({map:bx(64),color:r,transparent:!0,blending:Ut,depthWrite:!1,side:Nt})}function SM(){const r=new _r(.45,2.4,6);return r.rotateX(Math.PI),r}class wM{constructor(e){this.game=e,this._ramCooldowns=new Map,this._delta=new b,e.events.on("ship:destroyed",({ship:t,byPlayer:n})=>{if(t===e.player)this._onPlayerDestroyed();else if(t.isEscort)e.fleet?.onEscortDestroyed(t);else if(t.isFriendly)e.traffic?.onTrafficDestroyed(t);else{if(n){const i=t.stats?.credits??0;e.player.credits+=i,e.events.emit("enemy:killed",t),e.events.emit("combat:reward",{credits:i,name:t.stats?.displayName??"Hostile"})}e.enemies.remove(t)}}),e.events.on("player:respawn-requested",()=>this._respawnPlayer())}_onPlayerDestroyed(){const e=this.game;e.player.object3D.visible=!1,e.events.emit("camera:shake",1),e.events.emit("player:died")}_respawnPlayer(){const e=this.game,t=e.player;t.inventory={},t.resources=Math.floor(t.resources*.7);const n=t.ships.active,i=t.ships.owned.indexOf(n);i!==-1&&t.ships.owned.splice(i,1),delete t.upgradesByShip[n],t.ships.owned.length===0&&t.ships.owned.push("starter");const s=[...t.ships.owned].sort((a,o)=>(Vt[a]?.cost??0)-(Vt[o]?.cost??0))[0];s!==n&&t.setShip(s),t.position.copy(Na).sub(e.origin.offset),t.quaternion.identity(),t.respawn(),e.events.emit("player:respawned")}update(e){this._updateRamming(e)}_updateRamming(e){const t=this.game,n=t.player;if(!(!n||!n.alive||!t.enemies)){for(const[i,s]of this._ramCooldowns){const a=s-e;a<=0?this._ramCooldowns.delete(i):this._ramCooldowns.set(i,a)}for(const i of[...t.enemies.enemies]){if(!i.alive||this._ramCooldowns.has(i))continue;const s=n.radius+i.radius;this._delta.copy(n.position).sub(i.position);const a=this._delta.length();if(a>=s||a<1e-4)continue;this._ramCooldowns.set(i,.6),this._delta.normalize();const o=Math.abs(n.velocity.dot(this._delta)-i.velocity.dot(this._delta)),c=Qe(o*.12,8,40),l=n.applyDamage(c),h=i.applyDamage(c*1.4);n.shieldFx&&n.shieldFx.flash(i.position,1),i.shieldFx&&i.shieldFx.flash(n.position,1);const u=this._delta;n.velocity.addScaledVector(u,30),i.velocity.addScaledVector(u,-30),n.position.addScaledVector(u,(s-a)*.6),t.events.emit("player:hit",{damage:c}),t.events.emit("camera:shake",.5),t.audio.playNoise({duration:.4,gain:.5,filterFreq:900,filterEnd:120}),h.destroyed&&t.events.emit("ship:destroyed",{ship:i,byPlayer:!0}),l.destroyed&&t.events.emit("ship:destroyed",{ship:n,byPlayer:!1})}}}}const Eu=["Vex","Cael","Rho","Nix","Mira","Juno","Dax","Sable","Orin","Wren","Kade","Lyra"],Au=["Okonkwo","Reyes","Tan","Volkov","Adeyemi","Cho","Marek","Idris","Sato","Nakamura"],Ru=700;let Cu=1;function Pu(r){return Math.round(20+(r-1)*70)}class vf{constructor(e){this.game=e,this.roster=[],this._muzzle=new b,this._toTarget=new b,this._dir=new b,this._jEuler=new Wt,this._jQuat=new ht,e.events.on("player:respawned",()=>{this.roster.length=0,this._announce()}),e.crew=this}get engineer(){return this.roster.find(e=>e.role==="engineer")||null}get gunner(){return this.roster.find(e=>e.role==="gunner")||null}get capacity(){return this.game.player?.statMult?.crew??3}hire(e){return this.roster.length>=this.capacity?!1:(this.roster.push({id:Cu++,role:e.role,name:e.name,stars:e.stars}),this._announce(),!0)}fire(e){const t=this.roster.findIndex(n=>n.id===e);t!==-1&&(this.roster.splice(t,1),this._announce())}_announce(){this.game.events.emit("crew:changed",this.roster)}restore(e){Array.isArray(e)&&(this.roster=e.filter(t=>t&&(t.role==="engineer"||t.role==="gunner")&&t.stars>=1).map(t=>({id:Cu++,role:t.role,name:String(t.name||"Crew"),stars:t.stars|0})))}static makeRecruit(e=Math.random){const t=e()<.5?"engineer":"gunner",n=e(),i=n<.4?1:n<.7?2:n<.88?3:n<.97?4:5,s=Eu[e()*Eu.length|0]+" "+Au[e()*Au.length|0];return{role:t,stars:i,name:s}}update(e){const t=this.game,n=t.player;if(!n||!n.alive||t.mode!=="flight")return;const i=this.engineer;if(i&&n.hull<n.hullMax){const o=1.2+i.stars*1.6;n.hull=Math.min(n.hullMax,n.hull+o*e)}const s=Math.max(1,n.statMult?.turrets??1),a=this.roster.filter(o=>o.role==="gunner").slice(0,s);if(a.length&&t.enemies&&t.weapons){let o=null;for(let c=0;c<a.length;c++){const l=a[c];if(l._cd=(l._cd??Math.random())-e,!(l._cd>0)){if(o||(o=t.enemies.enemies.filter(h=>h.alive&&h.position.distanceToSquared(n.position)<Ru*Ru).sort((h,u)=>h.position.distanceToSquared(n.position)-u.position.distanceToSquared(n.position))),o.length===0)break;this._gunnerFire(n,o[c%o.length],l)}}}}_gunnerFire(e,t,n){const i=this.game.weapons;n._cd=.95-n.stars*.12;const s=e.hardpoints[Math.floor(Math.random()*e.hardpoints.length)];this._muzzle.copy(s).applyQuaternion(e.quaternion).add(e.position);const o=this._toTarget.copy(t.position).sub(this._muzzle).length()/950;this._toTarget.copy(t.position).addScaledVector(t.velocity,o).sub(this._muzzle).normalize();const c=(1-n.stars/5)*.06+.004;this._jEuler.set((Math.random()-.5)*c,(Math.random()-.5)*c,0),this._jQuat.setFromEuler(this._jEuler),this._toTarget.applyQuaternion(this._jQuat),i.fire(this._muzzle,this._toTarget,{fromPlayer:!0,damage:(6+n.stars*2)*e.upgrades.weapon,speed:950,source:e,inheritVel:e.velocity})}}const Lu=5e3,TM=5200,No=750,EM=800,AM=1200,RM=2800,Du=.42,Iu=330,CM=8;class PM extends Ua{constructor(e,t,n){super(xa(t)),this.game=e,this.variantId=t,this.slot=n,this.isEscort=!0,this.recalling=!1,this.docked=!1,this.wingSize=1,this.launchPort="side",this.role="guard",this.roleIndex=n,this.roleCount=1,this.target=null,this.defender=!1,this._orbitAng=Math.random()*Math.PI*2,this._orbitRate=.16+Math.random()*.08,this._claims=new Map;const i=Vt[t]??Vt.starter;this.hullMax=this.hull=Math.round(100*i.hull),this.shieldMax=this.shield=Math.round(100*i.shield),this.shieldRegenRate=8,this.shieldRegenDelay=4,this.fireDamage=CM*(i.weapon??1),this.glow=new Ss(this.visual,this.engines,this.glowColor,this.engineScale),this.shieldFx=new ws(this.object3D,this.radius*1.4),this._fireCooldown=Math.random()*Du,this._slotPos=new b,this._desired=new b,this._toTarget=new b,this._dir=new b,this._muzzle=new b,this._q=new ht,e.engine.scene.add(this.object3D)}update(e){if(this.shieldFx.update(e),!this.alive)return;const t=this.game,n=t.player;this._fireCooldown-=e;const i=Math.max(1,this.roleCount);if(this.role==="scout"){this._orbitAng+=e*this._orbitRate;const f=1300+this.roleIndex*160;this._slotPos.set(Math.cos(this._orbitAng)*f,Math.sin(this._orbitAng*.6)*f*.25,Math.sin(this._orbitAng)*f).add(n.position)}else{const f=(this.roleIndex+.5)/i,m=Math.acos(1-2*f),_=DM*(this.roleIndex+.5),g=n.radius+26+this.roleIndex%2*10;this._slotPos.set(Math.sin(m)*Math.cos(_)*g,Math.cos(m)*g,Math.sin(m)*Math.sin(_)*g).applyQuaternion(n.quaternion).add(n.position)}if(this.recalling){const f=this.slot%2===0?-1:1,m=Math.floor(this.slot/2),_=n.radius;this.launchPort==="bottom"?this._slotPos.set(f*_*.22,-_*.7,_*.1+m*3):this.launchPort==="lowerside"?this._slotPos.set(f*_*.7,-_*.3,_*.05+m*3):this._slotPos.set(f*_*.85,0,_*.05+m*3),this._slotPos.applyQuaternion(n.quaternion).add(n.position)}const s=this.recalling?null:this._acquire();let a=this._slotPos;s&&(this._desired.copy(this.position).sub(s.position).normalize(),a=this._slotPos.copy(s.position).addScaledVector(this._desired,90+this.slot*14)),this._desired.copy(a).sub(this.position);const o=this._desired.length(),c=this.role==="scout"?1.15:1,l=Qe(o*1.1,0,Iu*c*(this.recalling?1.4:1));o>.001&&this._desired.divideScalar(o).multiplyScalar(l),this.velocity.lerp(this._desired,1-Math.exp(-2.6*e)),this.position.addScaledVector(this.velocity,e),this._toTarget.copy(this.position).sub(n.position);const h=this._toTarget.length(),u=n.radius*.7+this.radius*.5;if(h<u&&h>.001){this._toTarget.divideScalar(h),this.position.copy(n.position).addScaledVector(this._toTarget,u);const f=this.velocity.dot(this._toTarget);f<0&&this.velocity.addScaledVector(this._toTarget,-f)}this.docked=this.recalling&&o<12;const d=s;if(this._dir.copy(d?d.position:a).sub(this.position),this._dir.lengthSq()>1&&(this._dir.normalize(),this._q.setFromUnitVectors(LM,this._dir),this.quaternion.slerp(this._q,Dt(3.5,e))),d&&this._fireCooldown<=0){this._fireCooldown=Du;const f=this.hardpoints[Math.floor(Math.random()*this.hardpoints.length)];this._muzzle.copy(f).applyQuaternion(this.quaternion).add(this.position);const m=this._toTarget.copy(d.position).sub(this._muzzle).length();this._toTarget.copy(d.position).addScaledVector(d.velocity,m/950).addScaledVector(this.velocity,-m/950).sub(this._muzzle).normalize(),this._toTarget.x+=(Math.random()-.5)*.02,this._toTarget.y+=(Math.random()-.5)*.02,t.weapons.fire(this._muzzle,this._toTarget.normalize(),{fromPlayer:!0,damage:this.fireDamage,speed:950,source:this,inheritVel:this.velocity})}this.updateDefense(e),this.glow.update(Qe(this.velocity.length()/Iu,.2,1),0,this.slot*3)}_acquire(){const e=this.game.fleet,t=this.game.player,n=e?.focusTarget;if(n?.alive&&n.position.distanceToSquared(this.position)<Lu*Lu&&(!this.defender||n.position.distanceToSquared(t.position)<No*No))return n;const i=this.defender?No:TM;if(this.target?.alive&&this.target.position.distanceToSquared(t.position)<i*i)return this.target;this.target=null;const s=this.game.enemies?.enemies??[];if(!s.length)return null;const a=this._claims;a.clear();for(const m of e?.escorts??[])m!==this&&m.alive&&m.target?.alive&&a.set(m.target,(a.get(m.target)??0)+1);const o=this.defender?450:this.role==="scout"?RM:EM,c=o*o,l=this.defender?600:AM,h=l*l;let u=null,d=1/0,f=1/0;for(const m of s){if(!m.alive)continue;const _=m.position.distanceToSquared(this.position);if(!(_<c||this.role==="guard"&&m.position.distanceToSquared(t.position)<h))continue;const p=a.get(m)??0;(p<d||p===d&&_<f)&&(d=p,f=_,u=m)}return this.target=u,u}dispose(){this.shieldFx.dispose(),this.game.engine.scene.remove(this.object3D)}}const LM=new b(0,0,-1),DM=Math.PI*(3-Math.sqrt(5)),Fu="starter",Nu="frigate",IM=.32;class FM{constructor(e){this.game=e,this.escorts=[],this.focusTarget=null,this._launchQueue=[],this._launchTimer=0,this._launchPort="side",this._wingSize=0,this._scratchA=new b,this._scratchB=new b,e.fleet=this,e.origin.onShift(t=>{for(const n of this.escorts)n.position.sub(t)}),e.events.on("player:died",()=>this._despawnAll()),e.events.on("onfoot:entered",()=>this.recall(!0))}get deployed(){return this.escorts.length>0||this._launchQueue.length>0}get hangar(){return this.game.player?.statMult?.hangar??0}get stored(){const e=this.game.player;return e.ships.owned.filter(t=>t!==e.ships.active)}update(e){const t=this.game;if(t.mode==="flight"&&t.input.consumeFleet()&&(t.player.statMult?.fleetCall?t.events.emit("fleetcall:prompt"):t.player.statMult?.reinforce?t.events.emit("reinforce:prompt"):this.deployed?this.recall(!1):this.launch()),t.mode==="flight"&&t.input.consumeFleetFocus()&&this._commandFocus(),this.focusTarget&&(!this.focusTarget.alive||!t.enemies.enemies.includes(this.focusTarget))&&(this.focusTarget=null,this.deployed&&t.events.emit("fleet:free")),this.deployed&&t.universe?.playerContext?.inAtmosphere&&this.recall(!0),this._launchQueue.length&&(this._launchTimer-=e,this._launchTimer<=0)){this._launchTimer=IM;for(let n=0;n<2&&this._launchQueue.length;n++)this._spawnEscort(this._launchQueue.shift())}for(const n of[...this.escorts])n.update(e),n.recalling&&n.docked&&this._dock(n)}launch(){const e=this.game,t=this.hangar;if(t<=0){e.audio?.playTone?.({type:"square",freq:160,freqEnd:110,duration:.14,gain:.1}),e.events.emit("fleet:denied");return}const n=e.player.hangarStock??(e.player.hangarStock={fighter:15,gunner:5}),i=Math.min(t,Math.max(0,n.fighter)),s=Math.min(e.player.statMult?.gunnerHangar??0,Math.max(0,n.gunner));if(i+s<=0){e.audio?.playTone?.({type:"square",freq:160,freqEnd:110,duration:.14,gain:.1}),e.events.emit("fleet:empty");return}this._launchPort=e.player.statMult?.launchPort??(e.player.statMult?.capital==="battleship"?"bottom":"side");const a=i>=3?Math.max(1,Math.floor(i/3)):0,o=i-a,c=o+s;this._wingSize=i+s,this._launchQueue=[];let l=0,h=0;for(let u=0;u<o;u++)this._launchQueue.push({variant:Fu,slot:l++,role:"guard",roleIndex:h++,roleCount:c});for(let u=0;u<s;u++)this._launchQueue.push({variant:Nu,slot:l++,role:"guard",roleIndex:h++,roleCount:c});for(let u=0;u<a;u++)this._launchQueue.push({variant:Fu,slot:l++,role:"scout",roleIndex:u,roleCount:a});this._launchTimer=0,e.events.emit("fleet:launched",this._wingSize),e.audio?.playTone?.({type:"sine",freq:500,freqEnd:840,duration:.3,gain:.16})}_spawnEscort(e){const t=this.game,n=t.player,{variant:i,slot:s}=e,a=new PM(t,i,s);a.wingSize=this._wingSize,a.launchPort=this._launchPort,a.role=e.role??"guard",a.roleIndex=e.roleIndex??s,a.roleCount=e.roleCount??this._wingSize,a.defender=a.role==="guard"&&a.roleIndex%2===0,a.role==="scout"&&(a._orbitAng=a.roleIndex/Math.max(1,a.roleCount)*Math.PI*2);const o=s%2===0?-1:1,c=Math.floor(s/2),l=n.radius,h=this._scratchA,u=this._scratchB;this._launchPort==="bottom"?(h.set(o*l*.22,-l*.75,l*.12-c*3),u.set(o*.3,-1,0)):this._launchPort==="lowerside"?(h.set(o*l*.7,-l*.32,l*.1-c*3),u.set(o,-.5,0)):(h.set(o*l*.85,0,l*.1-c*3),u.set(o,0,0)),a.position.copy(h.applyQuaternion(n.quaternion)).add(n.position),a.velocity.copy(n.velocity).addScaledVector(u.applyQuaternion(n.quaternion).normalize(),80),this.escorts.push(a),t.audio?.playTone?.({type:"triangle",freq:600,freqEnd:900,duration:.1,gain:.08})}_commandFocus(){const e=this.game;if(!this.deployed){e.events.emit("fleet:no-wing");return}let t=e.weapons?.assistTarget??null;if(!t||!t.alive){t=null;let n=3e3*3e3;for(const i of e.enemies?.enemies??[]){if(!i.alive)continue;const s=i.position.distanceToSquared(e.player.position);s<n&&(n=s,t=i)}}t?(this.focusTarget=t,e.events.emit("fleet:focus",t),e.audio?.playTone?.({type:"sine",freq:620,freqEnd:980,duration:.16,gain:.14})):(this.focusTarget=null,e.events.emit("fleet:free"),e.audio?.playTone?.({type:"sine",freq:560,freqEnd:440,duration:.14,gain:.12}))}recall(e){if(this.deployed){if(this._launchQueue=[],e){this._despawnAll(),this.game.events.emit("fleet:recalled");return}for(const t of this.escorts)t.recalling=!0;this.game.events.emit("fleet:recalling"),this.game.audio?.playTone?.({type:"sine",freq:700,freqEnd:460,duration:.25,gain:.14})}}_dock(e){const t=this.escorts.indexOf(e);t!==-1&&this.escorts.splice(t,1),e.dispose(),this.game.audio?.playTone?.({type:"triangle",freq:620,freqEnd:880,duration:.12,gain:.12}),this.escorts.length===0&&(this.focusTarget=null,this.game.events.emit("fleet:recalled"))}onEscortDestroyed(e){const t=this.escorts.indexOf(e);t!==-1&&this.escorts.splice(t,1),e.dispose();const n=this.game.player?.hangarStock;if(n){const i=e.variantId===Nu?"gunner":"fighter";n[i]=Math.max(0,(n[i]??0)-1)}this.game.events.emit("fleet:ship-lost",e.variantId)}_despawnAll(){for(const e of this.escorts)e.dispose();this.escorts.length=0,this._launchQueue=[],this.focusTarget=null}}const as=[{ships:["scout"],label:"Destroy a Lv10 Scout",reward:60},{ships:["fighter"],label:"Destroy a Lv20 Fighter",reward:150},{ships:["heavy"],label:"Destroy a Lv40 Heavy Assault",reward:450},{ships:["scout","scout","scout","fighter","fighter"],label:"Destroy a small pirate fleet (5 ships)",reward:900},{ships:["cruiser"],label:"Destroy an enemy Gunner Ship",reward:1400},{ships:["cruiser","cruiser","cruiser"],label:"Destroy a fleet of Gunner Ships (3)",reward:4200},{ships:["cruiser"],requiresShip:"starter",label:"Destroy a Gunner Ship — flying the SF-10 Sentinel",reward:6e3},{ships:["warship"],label:"Destroy a Lv75 Warship",reward:3600},{ships:["redcarrier"],label:"Destroy a Lv90 Carrier",reward:9e3},{ships:["destroyer"],label:"Destroy the Lv100 Planet Destroyer",reward:24e3}],Uu=["scout","fighter","heavy","cruiser","warship","redcarrier","destroyer"],Ou={scout:"Scout",fighter:"Fighter",heavy:"Heavy Assault",cruiser:"Gunner Ship",warship:"Warship",redcarrier:"Carrier",destroyer:"Planet Destroyer"},NM={scout:60,fighter:150,heavy:450,cruiser:1400,warship:3600,redcarrier:9e3,destroyer:24e3};for(let r=as.length;r<75;r++){const e=Uu[Math.min(Uu.length-1,Math.floor((r-10)/10))],t=Math.min(6,2+r%3+Math.floor((r-10)/20)),n=r%2===0?Math.min(6,2+Math.floor(r/20)):Math.min(3,Math.floor(r/25)),i=new Array(t).fill(e).concat(new Array(n).fill("scout")),s=t>1?`Destroy a squadron of ${t} ${Ou[e]}s${n?` (+${n} escorts)`:""}`:`Destroy a ${Ou[e]}${n?` and its ${n} escorts`:""}`,a=Math.round((NM[e]*t*.8+n*60)/10)*10;as.push({ships:i,label:s,reward:a})}class UM{constructor(e){this.game=e,this.index=0,this.active=null,this._fwd=new b,e.missions=this,e.events.on("ship:destroyed",({ship:t})=>{!this.active||!this.active.remaining.has(t)||(this.active.remaining.delete(t),this.active.remaining.size===0?this._complete():e.events.emit("mission:progress",{left:this.active.remaining.size,total:this.active.def.ships.length}))}),e.events.on("player:respawned",()=>{this.active=null})}get ladder(){return as}get completedAll(){return this.index>=as.length}wrongShip(){const e=as[this.index];return!!(e?.requiresShip&&this.game.player?.ships.active!==e.requiresShip)}_sweepUninvited(){const e=this.game.enemies;if(!(!e||!this._preExisting)){for(const t of[...e.enemies])this._preExisting.has(t)||e.remove(t);this._preExisting=null}}start(){const e=this.game;if(this.active||this.completedAll||!e.player?.alive)return!1;const t=as[this.index];if(this.wrongShip())return!1;this._preExisting=new Set(e.enemies?.enemies??[]),e.player.getForward(this._fwd);const n=new Set;return t.ships.forEach((i,s)=>{const a=e.player.position.clone().addScaledVector(this._fwd,1500+s*90);a.x+=(s%2===0?1:-1)*s*70,a.y+=140+s%3*60;const o=e.enemies?.spawn(i,a);o&&n.add(o)}),n.size?(this.active={def:t,remaining:n},e.events.emit("mission:started",{index:this.index,...t,count:n.size}),!0):!1}update(){if(this.active){for(const e of this.active.remaining)if(!this.game.enemies.enemies.includes(e)&&e.alive){this.active=null,this._sweepUninvited(),this.game.events.emit("mission:lost");return}}}_complete(){const e=this.game,{def:t}=this.active;this.active=null,this._sweepUninvited(),this.index+=1,e.player.credits+=t.reward,e.events.emit("mission:completed",{reward:t.reward,label:t.label}),e.audio?.playTone?.({type:"triangle",freq:660,freqEnd:1180,duration:.4,gain:.22}),this.completedAll&&e.events.emit("mission:allcomplete")}}const ku=160,OM=10,kM=50;class zM{constructor(e){this.game=e;const t=new Da(.9,0),n=new Mt({color:4864035,emissive:new X(1.7,.85,.28),metalness:.4,roughness:.3,flatShading:!0});this.pool=new fl(()=>({mesh:new pe(t,n),velocity:new b,life:0,value:1,spin:Math.random()*2+1}),i=>{i.mesh.visible=!1},12),this.pool.free.forEach(i=>{i.mesh.visible=!1,e.engine.scene.add(i.mesh)}),this._toPlayer=new b,e.events.on("ship:destroyed",({ship:i,byPlayer:s})=>{i!==e.player&&this.spawnBurst(i.position,i.stats?.resources??3)}),e.origin.onShift(i=>{this.pool.forEachActive(s=>s.mesh.position.sub(i))})}spawnBurst(e,t){for(let n=0;n<t;n++){const i=this.pool.acquire();i.mesh.parent||this.game.engine.scene.add(i.mesh),i.mesh.visible=!0,i.mesh.position.copy(e),i.velocity.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(14+Math.random()*22),i.life=kM,i.value=1}}update(e,t){const n=this.game.player;this.pool.forEachActive(i=>{if(i.life-=e,i.life<=0){this.pool.release(i);return}if(i.velocity.multiplyScalar(Math.exp(-.8*e)),i.mesh.rotation.y+=i.spin*e,i.mesh.rotation.x+=i.spin*.6*e,n&&n.alive){this._toPlayer.copy(n.position).sub(i.mesh.position);const s=this._toPlayer.length();if(s<OM+n.radius){this._collect(i);return}if(s<ku){const a=220*(1-s/ku)+40;i.velocity.addScaledVector(this._toPlayer.normalize(),a*e)}}i.mesh.position.addScaledVector(i.velocity,e)})}_collect(e){const t=this.game;t.player.resources+=e.value,this.pool.release(e);const n=880+Math.random()*220;t.audio.playTone({type:"sine",freq:n,freqEnd:n*1.6,duration:.18,gain:.18}),t.events.emit("pickup:collected")}}const ra=26,Uo=14,BM=1.35;class HM{constructor(e){this.game=e;const t=mr(128,2);this.pool=new fl(()=>this._createInstance(t),n=>{n.root.visible=!1},4),this.pool.free.forEach(n=>e.engine.scene.add(n.root)),e.events.on("ship:destroyed",({ship:n,byPlayer:i})=>{const s=Qe(n.radius/2.2,.9,3.2);this.spawn(n.position,s)}),e.origin.onShift(n=>{this.pool.forEachActive(i=>i.root.position.sub(n))})}_createInstance(e){const t=new Xe;t.visible=!1;const n=new Fn(new ni({map:e,color:new X(6,3.2,1.4),transparent:!0,blending:Ut,depthWrite:!1}));t.add(n);const i=ra+Uo,s=new Float32Array(i*3),a=new Float32Array(i*3),o=new vt;o.setAttribute("position",new lt(s,3)),o.setAttribute("color",new lt(a,3));const c=new sl(o,new il({map:e,size:3.2,vertexColors:!0,transparent:!0,blending:Ut,depthWrite:!1,sizeAttenuation:!0}));c.frustumCulled=!1,t.add(c);const l=new Fn(new ni({map:e,color:new X(1.4,1.1,.7),transparent:!0,blending:Ut,depthWrite:!1,opacity:.6}));return t.add(l),{root:t,flash:n,points:c,ring:l,velocities:new Float32Array(i*3),time:0,scale:1}}spawn(e,t=1){const n=this.pool.acquire();n.root.parent||this.game.engine.scene.add(n.root),n.root.position.copy(e),n.root.visible=!0,n.time=0,n.scale=t;const i=n.points.geometry.getAttribute("position"),s=n.points.geometry.getAttribute("color"),a=n.velocities,o=ra+Uo;for(let h=0;h<o;h++){const u=h>=ra;let d=Math.random()*2-1,f=Math.random()*2-1,m=Math.random()*2-1;const _=1/Math.max(.2,Math.hypot(d,f,m)),g=(u?55+Math.random()*65:10+Math.random()*26)*t;a[h*3]=d*_*g,a[h*3+1]=f*_*g,a[h*3+2]=m*_*g,i.setXYZ(h,0,0,0),u?s.setXYZ(h,3.5,3.2,2.6):s.setXYZ(h,2.6,1.1,.3)}i.needsUpdate=!0,s.needsUpdate=!0,n.flash.scale.setScalar(.1),n.flash.material.opacity=1,n.ring.scale.setScalar(.1),n.ring.material.opacity=.6;const c=this.game.player?e.distanceTo(this.game.player.position):0,l=Qe(1-c/2800,0,1);l>.02&&(this.game.audio.playNoise({duration:1.1,gain:l*.55,filterFreq:2600,filterEnd:60,attack:.005}),this.game.audio.playTone({type:"sine",freq:110,freqEnd:32,duration:.9,gain:l*.4})),this.game.events.emit("camera:shake",Qe(1-c/900,0,1)*.55*t)}update(e){this.pool.forEachActive(t=>{t.time+=e;const n=t.time/BM;if(n>=1){this.pool.release(t);return}const i=Math.min(1,t.time/.22);t.flash.scale.setScalar((2+i*14)*t.scale),t.flash.material.opacity=Math.max(0,1-i)**1.4,t.ring.scale.setScalar((1+n*40)*t.scale),t.ring.material.opacity=.6*(1-n);const s=t.points.geometry.getAttribute("position"),a=t.velocities,o=Math.exp(-1.6*e),c=ra+Uo;for(let l=0;l<c;l++)a[l*3]*=o,a[l*3+1]*=o,a[l*3+2]*=o,s.array[l*3]+=a[l*3]*e,s.array[l*3+1]+=a[l*3+1]*e,s.array[l*3+2]+=a[l*3+2]*e;s.needsUpdate=!0,t.points.material.opacity=1-n*n,t.points.material.size=(3.2+n*2.5)*t.scale})}}class GM{constructor(e){this.game=e,this.camera=e.engine.camera,this.baseOffset=new b(0,2.4,10),this.baseFov=68,this.smoothedQuat=new ht,this.smoothedPos=new b,this.initialized=!1,this.trauma=0,this.noise=new pn("camera-shake"),this._offset=new b,this._lookTarget=new b,this._shakeEuler=new Wt,this._shakeQuat=new ht,this._fwd=new b,this._fovCurrent=this.baseFov,e.events.on("camera:shake",t=>this.addTrauma(t)),e.origin.onShift(t=>{this.smoothedPos.sub(t),this.camera.position.sub(t)})}addTrauma(e){this.trauma=Qe(this.trauma+e,0,1)}update(e,t){const n=this.game.player;if(!n)return;if(this.game.mode==="onfoot"){this.initialized=!1;return}this.initialized||(this.smoothedQuat.copy(n.quaternion),this.smoothedPos.copy(n.position),this.initialized=!0);const i=n.boostActive?7.5:5.5;this.smoothedQuat.slerp(n.quaternion,Dt(i,e));const s=Qe(n.speed/600,0,1),a=Math.max(1,n.radius/3.2);if(this._offset.copy(this.baseOffset).multiplyScalar(a),this._offset.z+=s*3.2*a,this._offset.applyQuaternion(this.smoothedQuat),this.smoothedPos.lerp(n.position,Dt(30,e)),this.camera.position.copy(this.smoothedPos).add(this._offset),n.getForward(this._fwd),this._lookTarget.copy(n.position).addScaledVector(this._fwd,28),this.camera.up.set(0,1,0).applyQuaternion(this.smoothedQuat),this.camera.lookAt(this._lookTarget),this.trauma>.001){const c=this.trauma*this.trauma,l=t*24;this._shakeEuler.set(this.noise.noise3(l,0,0)*.045*c,this.noise.noise3(0,l,100)*.045*c,this.noise.noise3(100,0,l)*.06*c),this._shakeQuat.setFromEuler(this._shakeEuler),this.camera.quaternion.multiply(this._shakeQuat),this.trauma=Math.max(0,this.trauma-e*1.4)}const o=this.baseFov+(n.boostActive?9:0)+(this.game.warp?.engaged?22:0)+s*5;this._fovCurrent=Ht(this._fovCurrent,o,Dt(4.5,e)),Math.abs(this._fovCurrent-this.camera.fov)>.01&&(this.camera.fov=this._fovCurrent,this.camera.updateProjectionMatrix())}}class VM{constructor(e){this.game=e,this.position=sf.clone(),this.light=new ef(16773340,3.4),this.light.castShadow=!0;const t=e.engine.isMobile?1024:2048;this.light.shadow.mapSize.set(t,t);const n=this.light.shadow.camera;n.left=-90,n.right=90,n.top=90,n.bottom=-90,n.near=1,n.far=500,this.light.shadow.bias=-6e-4,this.light.shadow.normalBias=.5,e.engine.scene.add(this.light),e.engine.scene.add(this.light.target),this.fill=new Yb(2173244,658450,.55),e.engine.scene.add(this.fill),this._spaceSky=new X(2173244),this._spaceGround=new X(658450),this._daySky=new X(11058646),this._dayGround=new X(6052416),this._upTmp=new b,this.disc=new pe(new rn(Mo,24,16),new xt({color:new X(8.5,6.7,4.6),fog:!1})),this.disc.position.copy(this.position),e.engine.scene.add(this.disc);const i=mr(256,1.6);this.corona=new Fn(new ni({map:i,color:new X(.62,.45,.24),transparent:!0,blending:Ut,depthWrite:!1})),this.corona.scale.setScalar(Mo*3.4),this.corona.position.copy(this.position),e.engine.scene.add(this.corona),this.coronaInner=new Fn(new ni({map:mr(256,3.2),color:new X(2.1,1.6,.85),transparent:!0,blending:Ut,depthWrite:!1})),this.coronaInner.scale.setScalar(Mo*1.9),this.coronaInner.position.copy(this.position),e.engine.scene.add(this.coronaInner),this.extraStars=[];for(const s of(e.starSystems??[]).slice(1)){const a=new pe(this.disc.geometry,this.disc.material),o=new Fn(this.corona.material);o.scale.copy(this.corona.scale);const c=new Fn(this.coronaInner.material);c.scale.copy(this.coronaInner.scale),e.engine.scene.add(a,o,c),this.extraStars.push({sys:s,disc:a,corona:o,coronaInner:c})}this._sunDir=new b,this._nearest=new b,e.origin.onShift(s=>{this.position.sub(s),this.disc.position.copy(this.position),this.corona.position.copy(this.position),this.coronaInner.position.copy(this.position)})}getLightDirection(e,t){return e.copy(t).sub(this.position).normalize()}update(){const e=this.game.player;if(!e)return;const t=Math.max(90,e.radius*1.5),n=this.light.shadow.camera;n.right!==t&&(n.left=-t,n.right=t,n.top=t,n.bottom=-t,n.far=Math.max(500,240+t*2),n.updateProjectionMatrix());let i=this.position,s=this.position.distanceToSquared(e.position);for(const l of this.extraStars){l.disc.position.copy(l.sys.render),l.corona.position.copy(l.sys.render),l.coronaInner.position.copy(l.sys.render);const h=l.sys.render.distanceToSquared(e.position);h<s&&(s=h,i=l.sys.render)}this._sunDir.copy(e.position).sub(i).normalize();const a=this.game.universe?.playerContext?.planet;a&&this._sunDir.applyAxisAngle(a.up,a.spinAngle),this.light.position.copy(e.position).addScaledVector(this._sunDir,-180),this.light.target.position.copy(e.position);let o=0;const c=this.game.universe?.playerContext;if(a?.descriptor.hasAtmosphere&&c){const l=Math.max(0,1-c.altitude/(a.descriptor.atmosphereHeight*1.2));this._upTmp.copy(e.position).sub(a.group.position).normalize();const h=Math.max(0,Math.min(1,this._upTmp.dot(a.sunDir)*1.5+.35));o=Math.min(1,l)*h}this.fill.color.copy(this._spaceSky).lerp(this._daySky,o),this.fill.groundColor.copy(this._spaceGround).lerp(this._dayGround,o),this.fill.intensity=.55+o*.85,this.daylight=o}}const WM=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uDaylight;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    // Slow per-star twinkle: two incommensurate sines look organic.
    float tw = 0.78
      + 0.14 * sin(uTime * 1.7 + aPhase * 13.0)
      + 0.08 * sin(uTime * 3.3 + aPhase * 29.0);
    // Stars are invisible from inside a daylit atmosphere — a starry noon
    // sky over the forest was the biggest "space game" tell on the ground.
    vAlpha = tw * (1.0 - uDaylight * 0.97);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aSize * uPixelRatio * tw;
    #include <logdepthbuf_vertex>
  }
`,qM=`
  #include <common>
  #include <logdepthbuf_pars_fragment>
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    #include <logdepthbuf_fragment>
    // Soft round point.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv) * 2.0;
    float a = smoothstep(1.0, 0.25, d);
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * vAlpha, a);
  }
`,zu=[[1,.72,.55],[1,.85,.7],[1,.97,.9],[.85,.9,1],[.65,.78,1]];class jM{constructor(e,{starCount:t=5200,bandCount:n=2800,radius:i=14e5}={}){this.game=e;const s=new qt("starfield"),a=t+n,o=new Float32Array(a*3),c=new Float32Array(a),l=new Float32Array(a*3),h=new Float32Array(a),u=new b(.35,.85,.4).normalize(),d=new b(1,0,0).cross(u).normalize(),f=new b().crossVectors(u,d),m=new b;for(let g=0;g<a;g++){if(g<t){const[v,P,A]=s.unitVector();m.set(v,P,A)}else{const v=s.range(0,Math.PI*2),P=s.gaussian()*.09;m.copy(d).multiplyScalar(Math.cos(v)).addScaledVector(f,Math.sin(v)).addScaledVector(u,P).normalize()}o[g*3]=m.x*i,o[g*3+1]=m.y*i,o[g*3+2]=m.z*i;const p=Math.pow(s.next(),3);c[g]=1+p*3.4+(s.chance(.01)?2.2:0);const y=zu[s.int(0,zu.length-1)],x=.5+p*.7;l[g*3]=y[0]*x,l[g*3+1]=y[1]*x,l[g*3+2]=y[2]*x,h[g]=s.next()}const _=new vt;_.setAttribute("position",new lt(o,3)),_.setAttribute("aSize",new lt(c,1)),_.setAttribute("aColor",new lt(l,3)),_.setAttribute("aPhase",new lt(h,1)),this.material=new Tt({vertexShader:WM,fragmentShader:qM,uniforms:{uTime:{value:0},uPixelRatio:{value:1},uDaylight:{value:0}},transparent:!0,depthWrite:!1,blending:Ut}),this.points=new sl(_,this.material),this.points.frustumCulled=!1,this.points.renderOrder=-100,e.engine.scene.add(this.points),e.origin.onShift(g=>this.points.position.sub(g))}update(e,t){this.points.position.copy(this.game.engine.camera.position),this.material.uniforms.uTime.value=t,this.material.uniforms.uPixelRatio.value=this.game.engine.renderer.getPixelRatio(),this.material.uniforms.uDaylight.value=this.game.sun?.daylight??0}}class XM{constructor(e){this.game=e,this.group=new Xe,e.engine.scene.add(this.group);const t=new qt("deep-sky"),n=[{r:.55,g:.25,b:.75},{r:.2,g:.5,b:.7},{r:.65,g:.25,b:.45},{r:.2,g:.3,b:.75},{r:.7,g:.4,b:.25}];for(let i=0;i<5;i++){const s=n[i%n.length],a=YM(`nebula:${i}`,s),o=new Fn(new ni({map:a,transparent:!0,blending:Ut,depthWrite:!1,opacity:t.range(.16,.3)})),[c,l,h]=t.unitVector();o.position.set(c,l,h).multiplyScalar(13e5),o.scale.setScalar(t.range(36e4,75e4)),this.group.add(o)}for(let i=0;i<4;i++){const s=KM(`galaxy:${i}`),a=new Fn(new ni({map:s,transparent:!0,blending:Ut,depthWrite:!1,opacity:t.range(.5,.8)})),[o,c,l]=t.unitVector();a.position.set(o,c,l).multiplyScalar(134e4),a.scale.setScalar(t.range(5e4,11e4)),a.material.rotation=t.range(0,Math.PI*2),this.group.add(a)}this.group.renderOrder=-99,e.origin.onShift(i=>this.group.position.sub(i))}_collectSprites(){const e=[];return this.group?.traverse?.(t=>{t.isSprite&&e.push({material:t.material,base:t.material.opacity})}),e}update(){const e=this.game?.sun?.daylight??0;for(const t of this._fadeSprites??(this._fadeSprites=this._collectSprites()))t.material.opacity=t.base*(1-e*.95);this.group.position.copy(this.game.engine.camera.position)}}function YM(r,e){const n=new pn(r),i=new qt(r),s=document.createElement("canvas");s.width=s.height=192;const a=s.getContext("2d"),o=a.createImageData(192,192),c=i.range(0,100),l=i.range(0,100);for(let u=0;u<192;u++)for(let d=0;d<192;d++){const f=d/192-.5,m=u/192-.5,_=Math.max(0,1-Math.hypot(f,m)*2.2),g=n.fbm(f*3+c,m*3+l,0,3);let p=n.fbm(f*4+g*.9+c,m*4+g*.9+l,7.3,5);p=Math.max(0,p*.5+.5-.28);const y=p*_,x=Math.pow(_,3)*p*1.6,v=(u*192+d)*4;o.data[v]=Math.min(255,(e.r*y+x*.9)*255),o.data[v+1]=Math.min(255,(e.g*y+x*.8)*255),o.data[v+2]=Math.min(255,(e.b*y+x*.9)*255),o.data[v+3]=Math.min(255,y*340)}a.putImageData(o,0,0);const h=new Oi(s);return h.colorSpace=yt,h}function KM(r){const t=new qt(r),n=document.createElement("canvas");n.width=n.height=128;const i=n.getContext("2d"),s=128/2;i.globalCompositeOperation="lighter";const a=i.createRadialGradient(s,s,0,s,s,128*.16);a.addColorStop(0,"rgba(255, 240, 214, 0.9)"),a.addColorStop(1,"rgba(255, 240, 214, 0)"),i.fillStyle=a,i.fillRect(0,0,128,128);const o=t.range(.55,1);for(let l=0;l<2;l++){const h=l*Math.PI+t.range(-.2,.2);for(let u=.4;u<3.4*Math.PI;u+=.05){const d=2.6*Math.exp(.23*u);if(d>s*.95)break;const f=d+t.range(-2.5,2.5),m=s+Math.cos(u+h)*f,_=s+Math.sin(u+h)*f*o,g=.1*(1-d/s),p=i.createRadialGradient(m,_,0,m,_,3.6);p.addColorStop(0,`rgba(200, 215, 255, ${g})`),p.addColorStop(1,"rgba(200, 215, 255, 0)"),i.fillStyle=p,i.fillRect(m-4,_-4,8,8)}}const c=new Oi(n);return c.colorSpace=yt,c}function $M(r,e){const t=new el,n=new rn(50,24,16),i=new Tt({side:Gt,depthWrite:!1,uniforms:{},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      varying vec3 vDir;
      void main() {
        float h = vDir.y * 0.5 + 0.5;
        vec3 bottom = vec3(0.004, 0.005, 0.012);
        vec3 top = vec3(0.010, 0.014, 0.030);
        vec3 color = mix(bottom, top, h);
        // Faint violet band across the "galactic plane".
        float band = exp(-abs(vDir.y + 0.15) * 6.0);
        color += vec3(0.020, 0.012, 0.030) * band;
        gl_FragColor = vec4(color, 1.0);
      }
    `});t.add(new pe(n,i));const s=new pe(new rn(2.4,16,12),new xt({color:new X(28,24,18)}));s.position.copy(e).normalize().multiplyScalar(40),t.add(s);const a=new xt({color:new X(.05,.02,.09)}),o=new pe(new rn(8,8,6),a);o.position.set(-30,10,-25),t.add(o);const c=new xt({color:new X(.02,.05,.07)}),l=new pe(new rn(6,8,6),c);l.position.set(25,-14,20),t.add(l);const h=new Cc(r),u=h.fromScene(t,.04).texture;return n.dispose(),i.dispose(),s.geometry.dispose(),s.material.dispose(),o.geometry.dispose(),a.dispose(),l.geometry.dispose(),c.dispose(),h.dispose(),u}class QM{constructor(e){this.game=e,this.planets=[],this.playerContext={planet:null,altitude:1/0,inAtmosphere:!1,density:0,grounded:!1,groundedPlanet:null},this._gravity=new b,this._normal=new b,this._dir=new b,this._entryHeatSmooth=0,this._wind=null,this._speedScale=1}addPlanet(e){return this.planets.push(e),e}update(e,t){const n=this.game,i=n.engine.camera.position,s=n.sun?n.sun.position:ZM;this._updateSystemTransit(e);for(const a of this.planets)a.update(e,t,i,a.starRender??s);this._updatePlayer(e),this._updateEnemies(e)}_nearestPlanet(e){let t=null,n=1/0;for(const i of this.planets){const s=i.getAltitudeSpherical(e);s<n&&(n=s,t=i)}return t}_updatePlayer(e){const t=this.game,n=t.player;if(!n)return;const i=this.playerContext,s=this._nearestPlanet(n.position);if(!s){n.gravity.set(0,0,0);return}const a=s.getAltitudeSpherical(n.position),o=a<s.descriptor.relief+900?s.getAltitude(n.position):a,c=i.inAtmosphere,l=s.getAtmosphereDensity(n.position);i.planet=o<s.radius*3?s:null,i.altitude=o,i.density=l,i.inAtmosphere=l>.02,i.inAtmosphere!==c&&t.events.emit(i.inAtmosphere?"planet:entered":"planet:left",s);const h=s.radius,u=h+Math.max(o,0),d=(h/u)**2,f=wt(h*3,h*1.5,Math.max(o,0)),m=s.descriptor.gravity*d*f;this._dir.copy(s.group.position).sub(n.position).normalize(),n.gravity.copy(this._dir).multiplyScalar(m),l>.001&&n.velocity.multiplyScalar(Math.exp(-l*.22*e));const _=Qe(Math.max(o,0)/700,1,24);this._speedScale=Ht(this._speedScale,_,Dt(1.8,e)),n.envSpeedScale=this._speedScale;const g=Qe(n.speed/520,0,1.25),p=l*(1-l)*4,y=Qe(g*p*wt(.35,1,g),0,1);this._entryHeatSmooth=Ht(this._entryHeatSmooth,y,Dt(3,e)),t.entryHeat=this._entryHeatSmooth,this._entryHeatSmooth>.08&&t.events.emit("camera:shake",this._entryHeatSmooth*.05),this._updateWind(l,n.speed),o<n.radius&&n.alive&&this._resolveGroundHit(n,s,o,!0);const x=i.planet!==null&&!n.statMult?.noLanding&&o<n.radius+8&&n.speed<2&&n.alive;x!==i.grounded&&(i.grounded=x,i.groundedPlanet=x?s:null,t.events.emit(x?"player:can-disembark":"player:cannot-disembark",s))}_resolveGroundHit(e,t,n,i){const s=this.game;t.getSurfaceNormal(e.position,this._normal),this._dir.copy(e.position).sub(t.group.position).normalize(),e.position.addScaledVector(this._dir,e.radius-n+.2);const a=e.velocity.dot(this._normal);if(a<0){const o=Math.sqrt(Math.max(0,e.velocity.lengthSq()-a*a));if(i&&-a<14&&o<24){e.velocity.set(0,0,0);return}if(e.velocity.addScaledVector(this._normal,-a*1.3),i&&e.autolanding)return;const c=-a;if(c>26){const l=(c-26)*.55,h=e.applyDamage(l);i&&(s.events.emit("player:hit",{damage:l}),s.events.emit("camera:shake",Qe(c/120,.2,.9)),s.audio.playNoise({duration:.5,gain:.55,filterFreq:800,filterEnd:70})),h.destroyed&&s.events.emit("ship:destroyed",{ship:e,byPlayer:!1})}else i&&c>6&&(s.events.emit("camera:shake",.12),s.audio.playNoise({duration:.2,gain:.2,filterFreq:500,filterEnd:100}))}}_updateSystemTransit(e){const t=this.game.starSystems;if(!t||t.length<2||(this._transitTimer=(this._transitTimer??0)-e,this._transitTimer>0))return;this._transitTimer=1;const n=this.game.player.position;let i=t[0],s=1/0;for(const a of t){const o=a.render.distanceToSquared(n);o<s&&(s=o,i=a)}if(!this._currentSystem){this._currentSystem=i;return}i!==this._currentSystem&&s<this._currentSystem.render.distanceToSquared(n)*.64&&(this.game.events.emit("system:entered",{name:i.name,from:this._currentSystem.name}),this._currentSystem=i)}_updateEnemies(e){const t=this.game.enemies;if(t){for(const n of[...t.enemies])if(n.alive)for(const i of this.planets){if(i.getAltitudeSpherical(n.position)>i.descriptor.relief*2+60)continue;const a=i.getAltitude(n.position);a<n.radius&&this._resolveGroundHit(n,i,a,!1)}}}_updateWind(e,t){const n=this.game.audio;if(!n.ready||!this._wind&&(this._wind=n.createLoop({bus:"ambient",filterFreq:400,gain:0}),!this._wind))return;const i=n.time,s=e>.01?Qe(e*Qe(t/240,0,1.2),0,1)*.5:0;this._wind.gain.gain.setTargetAtTime(s,i,.25),this._wind.filter.frequency.setTargetAtTime(300+Qe(t,0,900)*4,i,.25)}}const ZM=new b;function JM(r="veridian-prime"){return new qt(r),{seed:r,name:"Veridian Prime",archetype:"terran",radius:3200,relief:130,gravity:26,hasOcean:!0,oceanDepth:90,oceanColor:new X(.03,.16,.24),hasAtmosphere:!0,atmosphereHeight:340,scatterColor:new b(.18,.4,.85),hazeColor:new X(.5,.68,.9),hazeDensity:1,axialTilt:.35,terrain:{continentFreq:1.1,continentOctaves:4,seaLevelBias:.06,hillFreq:5,hillAmp:.22,mountainFreq:3.2,mountainOctaves:5,mountainAmp:1,mountainMaskFreq:1.7,plateauFreq:2.6,plateauAmp:.25,plateauSteps:4,canyonFreq:2.4,canyonDepth:.35,detailFreq:46,detailAmp:.045,craterCount:0,craterMaxRadius:0},palette:{shallow:new X(.13,.38,.42),beach:new X(.62,.56,.4),low:new X(.22,.4,.19),mid:new X(.13,.28,.13),high:new X(.42,.38,.34),steep:new X(.3,.27,.25),cap:new X(.92,.94,.97),capThreshold:.62},clouds:{coverage:.48,color:new X(1,1,1),speed:.004}}}function eS(r){const e=[],{craterCount:t,craterMaxRadius:n}=r.terrain;if(!t)return e;const i=new qt(`${r.seed}:craters`);for(let s=0;s<t;s++){const[a,o,c]=i.unitVector();e.push({dir:new b(a,o,c),angRadius:i.range(.015,n),depth:i.range(.25,1)})}return e}function tS(r){const e=r.terrain,t=r.relief,n=r.oceanDepth,i=new pn(`${r.seed}:continent`),s=new pn(`${r.seed}:hill`),a=new pn(`${r.seed}:mountain`),o=new pn(`${r.seed}:mask`),c=new pn(`${r.seed}:plateau`),l=new pn(`${r.seed}:canyon`),h=new pn(`${r.seed}:detail`),u=new pn(`${r.seed}:biome`),d=eS(r);function f(S,M,C){const U=i.fbm(S*e.continentFreq,M*e.continentFreq,C*e.continentFreq,e.continentOctaves)+e.seaLevelBias,F=wt(-.12,.22,U);let I=Ht(-n,0,Math.min(1,F*1.6));if(F>.02){const B=e.hillStyle==="dunes"?s.billow(S*e.hillFreq,M*e.hillFreq,C*e.hillFreq,3)*.9-.2:s.fbm(S*e.hillFreq,M*e.hillFreq,C*e.hillFreq,4);I+=B*e.hillAmp*t*F;const z=wt(.1,.55,o.fbm(S*e.mountainMaskFreq,M*e.mountainMaskFreq,C*e.mountainMaskFreq,3));if(z>.01){const V=a.ridged(S*e.mountainFreq,M*e.mountainFreq,C*e.mountainFreq,e.mountainOctaves);I+=V*z*F*e.mountainAmp*t}if(e.plateauAmp>0){const V=c.fbm(S*e.plateauFreq,M*e.plateauFreq,C*e.plateauFreq,3)*.5+.5,H=nS(V,e.plateauSteps);I+=H*e.plateauAmp*t*F}if(e.canyonDepth>0){const V=l.ridged(S*e.canyonFreq,M*e.canyonFreq,C*e.canyonFreq,4),H=wt(.72,.95,V);I-=H*e.canyonDepth*t*F}}for(let B=0;B<d.length;B++){const z=d[B],V=S-z.dir.x,H=M-z.dir.y,J=C-z.dir.z,re=Math.sqrt(V*V+H*H+J*J)/z.angRadius;if(re<1.6){const ye=z.depth*t*.5;re<1&&(I-=(1-re*re)*ye);const Ie=(re-1)/.22,W=Math.exp(-(Ie*Ie));I+=W*ye*.35}}return I+=h.fbm(S*e.detailFreq,M*e.detailFreq,C*e.detailFreq,3)*e.detailAmp*t,I}const m=new b,_=new b,g=new b,p=new b,y=new b;function x(S,M,C){const U=M/r.radius;p.set(-S.z,0,S.x),p.lengthSq()<1e-6&&p.set(1,0,0),p.normalize(),y.crossVectors(S,p);const F=f(S.x,S.y,S.z);m.copy(S).addScaledVector(p,U).normalize();const I=f(m.x,m.y,m.z);_.copy(S).addScaledVector(y,U).normalize();const B=f(_.x,_.y,_.z),z=r.radius+F;return g.copy(S).multiplyScalar(z),m.multiplyScalar(r.radius+I).sub(g),_.multiplyScalar(r.radius+B).sub(g),C.crossVectors(m,_).normalize()}const v=new X,P=new X(1853988),A=new X(2366738),E=r.archetype==="terran"||r.archetype==="ocean";function L(S,M,C,U,F){const I=r.palette,B=Qe(M/t,-1,1),z=Math.abs(S.dot(U)),V=u.noise3(S.x*24,S.y*24,S.z*24)*.06;if(B<.005)F.copy(I.shallow).multiplyScalar(Qe(1+M/n,.25,1));else if(B<.05)F.copy(I.beach);else{const re=wt(.08,.34,B+V),ye=wt(.3,.62,B+V);F.copy(I.low).lerp(I.mid,re).lerp(I.high,ye)}if(E&&B>.03){const re=wt(.15,.6,u.noise3(S.x*7+41,S.y*7+41,S.z*7+41)),ye=wt(.03,.09,B)*(1-wt(.38,.58,B));F.lerp(P,re*ye*.7),F.lerp(A,re*ye*.38);const Ie=u.noise3(S.x*680+7,S.y*680+7,S.z*680+7)*.6+u.noise3(S.x*2900+3,S.y*2900+3,S.z*2900+3)*.4;F.multiplyScalar((.92+Ie*.11)*(1-ye*.24))}const H=wt(.55,.8,C);F.lerp(I.steep,H*.85);const J=I.capThreshold-B*.28,ie=Math.max(wt(J,J+.09,z),wt(.68,.85,B+V))*(1-H*.7);return B>.005&&F.lerp(v.copy(I.cap),ie),F}return{height:f,normal:x,color:L,craters:d}}function nS(r,e){const t=r*e,n=Math.floor(t),i=t-n,s=wt(.7,1,i);return(n+s)/e}const bf=[{n:new b(1,0,0),u:new b(0,0,-1),v:new b(0,1,0)},{n:new b(-1,0,0),u:new b(0,0,1),v:new b(0,1,0)},{n:new b(0,1,0),u:new b(1,0,0),v:new b(0,0,-1)},{n:new b(0,-1,0),u:new b(1,0,0),v:new b(0,0,1)},{n:new b(0,0,1),u:new b(1,0,0),v:new b(0,1,0)},{n:new b(0,0,-1),u:new b(-1,0,0),v:new b(0,1,0)}],Xt=new b;function yf(r,e,t,n){const i=bf[r],s=e*2-1,a=t*2-1;return n.copy(i.n).addScaledVector(i.u,s).addScaledVector(i.v,a),n.normalize()}class os{constructor(e,t,n,i,s,a){this.tree=e,this.face=t,this.level=n,this.u0=i,this.v0=s,this.size=a,this.centerDir=yf(t,i+a/2,s+a/2,new b);const o=e.sampler.height(this.centerDir.x,this.centerDir.y,this.centerDir.z);this.centerPos=this.centerDir.clone().multiplyScalar(e.radius+o),this.worldSize=e.radius*(Math.PI/2)*a,this.mesh=null,this.children=null,this.queued=!1,this.lastWantedFrame=-1,this.dead=!1}get meshReady(){return this.mesh!==null}createChildren(){const e=this.size/2;this.children=[new os(this.tree,this.face,this.level+1,this.u0,this.v0,e),new os(this.tree,this.face,this.level+1,this.u0+e,this.v0,e),new os(this.tree,this.face,this.level+1,this.u0,this.v0+e,e),new os(this.tree,this.face,this.level+1,this.u0+e,this.v0+e,e)]}releaseChildren(){if(this.children){for(const e of this.children)e.releaseChildren(),e.releaseMesh(),e.dead=!0;this.children=null}}releaseMesh(){this.mesh&&(this.tree.group.remove(this.mesh),this.tree.geometryPool.push(this.mesh.geometry),this.mesh=null)}}class iS{constructor({radius:e,sampler:t,material:n,up:i,resolution:s=17,maxDepth:a=8,splitFactor:o=3,buildBudgetMs:c=3.5}){this.radius=e,this.sampler=t,this.material=n,this.up=i,this.resolution=s,this.maxDepth=a,this.splitFactor=o,this.buildBudgetMs=c,this.group=new Xe,this.roots=bf.map((h,u)=>new os(this,u,0,0,0,1)),this.queue=[],this.geometryPool=[],this.frame=0,this.sharedIndex=sS(s);const l=s+2;this._heights=new Float32Array(l*l),this._dirs=new Float32Array(l*l*3),this._positions=new Float32Array(l*l*3),this._camLocal=new b,this._scratchColor=new X,this._scratchNormal=new b,this._va=new b,this._vb=new b}update(e){this.frame++,this._camLocal.copy(e);for(const t of this.roots)this._visit(t);this._processQueue()}_visit(e){e.lastWantedFrame=this.frame;const t=this._camLocal.distanceTo(e.centerPos);if(e.level<this.maxDepth&&t<e.worldSize*this.splitFactor)if(e.children||e.createChildren(),e.children.every(s=>s.meshReady||s.children)){e.mesh&&(e.mesh.visible=!1);for(const s of e.children)this._visit(s)}else{this._ensureMesh(e),e.mesh&&(e.mesh.visible=!0);for(const s of e.children)s.lastWantedFrame=this.frame,this._ensureMesh(s)}else if(this._ensureMesh(e),e.mesh)e.mesh.visible=!0,e.releaseChildren();else if(e.children)for(const i of e.children)this._visit(i)}_ensureMesh(e){e.mesh||e.queued||(e.queued=!0,this.queue.push(e))}_processQueue(){if(this.queue.length===0)return;this.queue.sort((n,i)=>{const s=this._camLocal.distanceTo(n.centerPos)/n.worldSize,a=this._camLocal.distanceTo(i.centerPos)/i.worldSize;return s-a});const e=performance.now();let t=0;for(;this.queue.length>0&&!(t>0&&performance.now()-e>this.buildBudgetMs);){const n=this.queue.shift();n.queued=!1,!(n.dead||n.lastWantedFrame<this.frame-1)&&(this._buildPatch(n),t++)}}_buildPatch(e){const t=this.resolution,n=t+2,{sampler:i,radius:s}=this,a=e.size/(t-1),o=this._heights,c=this._dirs;for(let I=0;I<n;I++){const B=e.v0+(I-1)*a;for(let z=0;z<n;z++){const V=e.u0+(z-1)*a;yf(e.face,V,B,Xt);const H=I*n+z;c[H*3]=Xt.x,c[H*3+1]=Xt.y,c[H*3+2]=Xt.z,o[H]=i.height(Xt.x,Xt.y,Xt.z)}}const l=this._positions;for(let I=0;I<n*n;I++){const B=s+o[I];l[I*3]=c[I*3]*B,l[I*3+1]=c[I*3+1]*B,l[I*3+2]=c[I*3+2]*B}const h=t*t+t*4;let u=this.geometryPool.pop();u||(u=new vt,u.setAttribute("position",new lt(new Float32Array(h*3),3)),u.setAttribute("normal",new lt(new Float32Array(h*3),3)),u.setAttribute("color",new lt(new Float32Array(h*3),3)),u.setIndex(this.sharedIndex),u.boundingSphere=new An);const d=u.getAttribute("position"),f=u.getAttribute("normal"),m=u.getAttribute("color"),_=e.centerPos;let g=1/0,p=1/0,y=1/0,x=-1/0,v=-1/0,P=-1/0;const A=this._scratchNormal,E=this._scratchColor,L=this._va,S=this._vb;for(let I=0;I<t;I++)for(let B=0;B<t;B++){const z=(I+1)*n+(B+1),V=I*t+B,H=l[z*3]-_.x,J=l[z*3+1]-_.y,ie=l[z*3+2]-_.z;d.setXYZ(V,H,J,ie),H<g&&(g=H),H>x&&(x=H),J<p&&(p=J),J>v&&(v=J),ie<y&&(y=ie),ie>P&&(P=ie);const re=z-1,ye=z+1,Ie=z-n,W=z+n;L.set(l[ye*3]-l[re*3],l[ye*3+1]-l[re*3+1],l[ye*3+2]-l[re*3+2]),S.set(l[W*3]-l[Ie*3],l[W*3+1]-l[Ie*3+1],l[W*3+2]-l[Ie*3+2]),A.crossVectors(L,S).normalize(),Xt.set(c[z*3],c[z*3+1],c[z*3+2]),A.dot(Xt)<0&&A.negate(),f.setXYZ(V,A.x,A.y,A.z);const te=1-Math.max(0,A.dot(Xt));i.color(Xt,o[z],te,this.up,E),m.setXYZ(V,E.r,E.g,E.b)}const M=Math.max(2,e.worldSize*.06);let C=t*t;const U=(I,B)=>{const z=(B+1)*n+(I+1),V=B*t+I;Xt.set(c[z*3],c[z*3+1],c[z*3+2]),d.setXYZ(C,d.getX(V)-Xt.x*M,d.getY(V)-Xt.y*M,d.getZ(V)-Xt.z*M),f.setXYZ(C,f.getX(V),f.getY(V),f.getZ(V)),m.setXYZ(C,m.getX(V),m.getY(V),m.getZ(V)),C++};for(let I=0;I<t;I++)U(I,0);for(let I=0;I<t;I++)U(I,t-1);for(let I=0;I<t;I++)U(0,I);for(let I=0;I<t;I++)U(t-1,I);d.needsUpdate=!0,f.needsUpdate=!0,m.needsUpdate=!0,u.boundingSphere.center.set((g+x)/2,(p+v)/2,(y+P)/2),u.boundingSphere.radius=Math.hypot(x-g,v-p,P-y)/2+M;const F=e.mesh??new pe(u,this.material);F.geometry=u,F.position.copy(_),F.receiveShadow=!0,e.mesh=F,this.group.add(F)}get patchCount(){return this.group.children.length}}function sS(r){const e=[];for(let c=0;c<r-1;c++)for(let l=0;l<r-1;l++){const h=c*r+l,u=h+1,d=h+r,f=d+1;e.push(h,u,d,u,f,d)}const t=r*r,n=c=>c,i=c=>(r-1)*r+c,s=c=>c*r,a=c=>c*r+(r-1),o=[{edge:n,offset:t},{edge:i,offset:t+r},{edge:s,offset:t+r*2},{edge:a,offset:t+r*3}];for(const{edge:c,offset:l}of o)for(let h=0;h<r-1;h++){const u=c(h),d=c(h+1),f=l+h,m=l+h+1;e.push(u,d,f,f,d,m),e.push(u,f,d,d,f,m)}return new lt(new Uint16Array(e),1)}const rS=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  varying vec3 vWorldPos;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
    #include <logdepthbuf_vertex>
  }
`,aS=`
  #include <common>
  #include <logdepthbuf_pars_fragment>
  uniform vec3 uPlanetCenter;
  uniform float uPlanetRadius;
  uniform float uAtmoRadius;
  uniform vec3 uSunDir;        // direction FROM planet TOWARD the sun
  uniform vec3 uScatter;       // per-channel scattering coefficients
  uniform float uIntensity;
  varying vec3 vWorldPos;

  // Ray-sphere intersection; returns (tNear, tFar) or (-1, -1) on miss.
  vec2 raySphere(vec3 ro, vec3 rd, vec3 center, float radius) {
    vec3 oc = ro - center;
    float b = dot(oc, rd);
    float c = dot(oc, oc) - radius * radius;
    float disc = b * b - c;
    if (disc < 0.0) return vec2(-1.0);
    float s = sqrt(disc);
    return vec2(-b - s, -b + s);
  }

  void main() {
    #include <logdepthbuf_fragment>

    vec3 ro = cameraPosition;
    vec3 rd = normalize(vWorldPos - ro);

    vec2 tAtmo = raySphere(ro, rd, uPlanetCenter, uAtmoRadius);
    if (tAtmo.y < 0.0) discard;
    float tNear = max(tAtmo.x, 0.0);
    float tFar = tAtmo.y;

    // Stop the march at the ground.
    vec2 tGround = raySphere(ro, rd, uPlanetCenter, uPlanetRadius);
    if (tGround.x > 0.0) tFar = min(tFar, tGround.x);
    if (tFar <= tNear) discard;

    float thickness = uAtmoRadius - uPlanetRadius;
    float scaleH = thickness * 0.30; // density e-folding height

    const int STEPS = 8;
    float stepLen = (tFar - tNear) / float(STEPS);
    vec3 p = ro + rd * (tNear + stepLen * 0.5);

    vec3 inscatter = vec3(0.0);
    float viewDepth = 0.0;

    for (int i = 0; i < STEPS; i++) {
      float h = length(p - uPlanetCenter) - uPlanetRadius;
      float density = exp(-max(h, 0.0) / scaleH);
      float segment = density * stepLen / thickness;
      viewDepth += segment;

      vec3 up = normalize(p - uPlanetCenter);
      float sunHeight = dot(up, uSunDir);
      // Twilight band: light dies smoothly past the terminator.
      float sunVis = smoothstep(-0.30, 0.12, sunHeight);
      // Approximate optical depth toward the sun: long path at grazing
      // angles → per-channel extinction → red sunsets for free.
      float sunPath = density * (1.15 - sunHeight) * 2.2;
      vec3 sunAtten = exp(-uScatter * sunPath * 3.0);

      inscatter += sunVis * sunAtten * segment;
      p += rd * stepLen;
    }

    // Rayleigh-ish phase: slightly brighter looking toward/away from sun.
    float cosTheta = dot(rd, uSunDir);
    float phase = 0.72 + 0.35 * cosTheta * cosTheta;

    // View-path extinction keeps the far limb from over-saturating.
    vec3 viewAtten = exp(-uScatter * viewDepth * 1.4);

    vec3 color = uScatter * inscatter * phase * viewAtten * uIntensity * 3.2;
    gl_FragColor = vec4(color, 1.0);
  }
`;class oS{constructor(e,t,n){const i=e.radius+e.atmosphereHeight;this.material=new Tt({vertexShader:rS,fragmentShader:aS,uniforms:{uPlanetCenter:{value:t},uPlanetRadius:{value:e.radius},uAtmoRadius:{value:i},uSunDir:{value:n},uScatter:{value:e.scatterColor},uIntensity:{value:.75}},side:Gt,transparent:!0,blending:Ut,depthWrite:!1}),this.mesh=new pe(new rn(i,48,32),this.material),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}}const cS=`
  vec3 mod289(vec3 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0/289.0)) * 289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`,lS=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  varying vec3 vObjDir;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;
  void main() {
    vObjDir = normalize(position);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
    #include <logdepthbuf_vertex>
  }
`,hS=`
  #include <common>
  #include <logdepthbuf_pars_fragment>
  ${cS}
  uniform vec3 uSunDir;
  uniform vec3 uColor;
  uniform float uCoverage;
  uniform float uTime;
  varying vec3 vObjDir;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  void main() {
    #include <logdepthbuf_fragment>

    // 4-octave fBm on the shell direction, drifting slowly.
    vec3 p = vObjDir * 3.4 + vec3(uTime * 0.5, 0.0, uTime * 0.3);
    float n = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      n += snoise(p) * amp;
      p *= 2.15;
      amp *= 0.5;
    }
    n = n * 0.5 + 0.5;

    float threshold = 1.0 - uCoverage;
    float alpha = smoothstep(threshold, threshold + 0.22, n);

    // Sun lighting with soft wrap; night clouds go dark.
    float light = clamp(dot(vWorldNormal, uSunDir) * 0.6 + 0.45, 0.03, 1.0);

    // Fade at the silhouette so the shell edge doesn't draw a hard ring.
    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    float rim = abs(dot(viewDir, vWorldNormal));
    alpha *= smoothstep(0.06, 0.35, rim);

    gl_FragColor = vec4(uColor * light * 0.85, alpha * 0.7); // softened per playtest
  }
`;class uS{constructor(e,t){const n=e.radius*1.035+e.relief;this.speed=e.clouds.speed,this.material=new Tt({vertexShader:lS,fragmentShader:hS,uniforms:{uSunDir:{value:t},uColor:{value:e.clouds.color},uCoverage:{value:e.clouds.coverage},uTime:{value:0}},transparent:!0,depthWrite:!1,side:Nt}),this.mesh=new pe(new rn(n,48,32),this.material),this.mesh.renderOrder=1}update(e,t){this.material.uniforms.uTime.value=t*this.speed,this.mesh.rotation.y+=this.speed*.6*e}}function Ma(r,e){r.onBeforeCompile=t=>{t.uniforms.uHazeColor=e.uHazeColor,t.uniforms.uHazeDensity=e.uHazeDensity,t.uniforms.uPlanetCenter=e.uPlanetCenter,t.uniforms.uSunDirPlanet=e.uSunDirPlanet,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vHazeWorldPos;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
        vHazeWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`),t.fragmentShader=t.fragmentShader.replace("#include <common>",`#include <common>
        varying vec3 vHazeWorldPos;
        uniform vec3 uHazeColor;
        uniform float uHazeDensity;
        uniform vec3 uPlanetCenter;
        uniform vec3 uSunDirPlanet;`).replace("#include <dithering_fragment>",`{
          float hazeDist = distance(vHazeWorldPos, cameraPosition);
          float haze = 1.0 - exp(-hazeDist * uHazeDensity);
          // Day factor at the fragment: haze glows on the day side, goes
          // dark across the terminator, with a warm band in between.
          vec3 up = normalize(vHazeWorldPos - uPlanetCenter);
          float day = dot(up, uSunDirPlanet);
          float dayFactor = clamp(day * 1.6 + 0.5, 0.0, 1.0);
          vec3 sunsetTint = vec3(0.9, 0.45, 0.22);
          float sunsetBand = smoothstep(0.35, 0.0, abs(day - 0.05)) * 0.85;
          vec3 hazeTint = mix(uHazeColor, sunsetTint, sunsetBand) * dayFactor;
          // Cap so terrain never fully dissolves into the sky color.
          gl_FragColor.rgb = mix(gl_FragColor.rgb, hazeTint, clamp(haze, 0.0, 0.88));
        }
        #include <dithering_fragment>`)},r.customProgramCacheKey=()=>"atmospheric-haze"}class Oo{constructor(e,t,n){this.game=e,this.descriptor=t,this.radius=t.radius,this.group=new Xe,this.group.position.copy(n).sub(e.origin.offset),e.engine.scene.add(this.group),this.up=new b(Math.sin(t.axialTilt),Math.cos(t.axialTilt),0).normalize(),this.sampler=tS(t),this.sunDir=new b(0,1,0),this.spinAngle=0,this.spinRate=Math.PI*2/(540+t.radius%7*60),this.hazeUniforms={uHazeColor:{value:t.hazeColor},uHazeDensity:{value:0},uPlanetCenter:{value:this.group.position},uSunDirPlanet:{value:this.sunDir}};const i=new Mt({vertexColors:!0,roughness:.94,metalness:0});if(t.hasAtmosphere&&Ma(i,this.hazeUniforms),this.terrain=new iS({radius:this.radius,sampler:this.sampler,material:i,up:this.up}),this.group.add(this.terrain.group),this.ocean=null,this.oceanLow=null,t.hasOcean){const s=new Mt({color:t.oceanColor,roughness:t.oceanRoughness??.12,metalness:0,transparent:!0,opacity:.985,envMapIntensity:1.2,bumpMap:dS(),bumpScale:.6});t.hasAtmosphere&&Ma(s,this.hazeUniforms),this.ocean=new pe(new rn(this.radius+.5,160,110),s),this.ocean.receiveShadow=!0,this.ocean.visible=!1,this.oceanLow=new pe(new rn(this.radius+.5,48,32),s),this.group.add(this.ocean,this.oceanLow)}this.atmosphere=null,this.clouds=null,t.hasAtmosphere&&(this.atmosphere=new oS(t,this.group.position,this.sunDir),this.group.add(this.atmosphere.mesh),t.clouds&&(this.clouds=new uS(t,this.sunDir),this.group.add(this.clouds.mesh))),e.obstacles.push({position:this.group.position,radius:this.radius+t.relief*2,planet:this}),e.origin.onShift(s=>{this.group.position.sub(s)}),this._local=new b,this._dir=new b}get influenceRadius(){return this.radius+(this.descriptor.hasAtmosphere?this.descriptor.atmosphereHeight:this.descriptor.relief)}getAltitude(e){this._local.copy(e).sub(this.group.position);const t=this._local.length();if(t>this.radius+this.descriptor.relief+600)return t-this.radius;this._dir.copy(this._local).divideScalar(t);let n=this.sampler.height(this._dir.x,this._dir.y,this._dir.z);return this.descriptor.hasOcean&&(n=Math.max(n,.5)),t-(this.radius+n)}getSurfaceNormal(e,t){return this._local.copy(e).sub(this.group.position),this._dir.copy(this._local).normalize(),this.descriptor.hasOcean&&this.sampler.height(this._dir.x,this._dir.y,this._dir.z)<.5?t.copy(this._dir):this.sampler.normal(this._dir,3,t)}update(e,t,n,i){if(this.spinAngle=(this.spinAngle+this.spinRate*e)%(Math.PI*2),this.sunDir.copy(i).sub(this.group.position).normalize().applyAxisAngle(this.up,this.spinAngle),this._local.copy(n).sub(this.group.position),this.terrain.update(this._local),this.ocean){const s=this.ocean.material.bumpMap;s&&(s.offset.x=t*.012%1,s.offset.y=t*.007%1)}if(this.clouds&&this.clouds.update(e,t),this.ocean){const s=this._local.lengthSq()<(this.radius*1.6)**2;this.ocean.visible!==s&&(this.ocean.visible=s,this.oceanLow.visible=!s)}if(this.descriptor.hasAtmosphere){const s=Math.max(0,this._local.length()-this.radius),a=this.descriptor.atmosphereHeight*.85,o=15e-5*this.descriptor.hazeDensity*Math.exp(-s/a);this.hazeUniforms.uHazeDensity.value=Math.max(o,2e-6)}}getAtmosphereDensity(e){if(!this.descriptor.hasAtmosphere)return 0;const t=this.getAltitudeSpherical(e);return t>this.descriptor.atmosphereHeight*1.5?0:Math.exp(-Math.max(0,t)/(this.descriptor.atmosphereHeight*.35))}getAltitudeSpherical(e){return this._local.copy(e).sub(this.group.position).length()-this.radius}}let Ei=null;function dS(){if(Ei)return Ei;const r=128,e=document.createElement("canvas");e.width=e.height=r;const t=e.getContext("2d"),n=t.createImageData(r,r);for(let i=0;i<r;i++)for(let s=0;s<r;s++){const a=s/r*Math.PI*2,o=i/r*Math.PI*2,c=Math.sin(a*3+Math.sin(o*2)*1.4)+Math.sin(o*4+Math.sin(a*3)*1.2)+Math.sin((a+o)*5)*.5,l=Math.round(128+c*34),h=(i*r+s)*4;n.data[h]=n.data[h+1]=n.data[h+2]=l,n.data[h+3]=255}return t.putImageData(n,0,0),Ei=new Oi(e),Ei.wrapS=Ei.wrapT=Ii,Ei.repeat.set(60,40),Ei}class Bu{constructor(e,{center:t,radius:n,count:i,seed:s,shape:a="cluster"}){this.game=e,this.center=t.clone(),this.radius=n;const o=new qt(`asteroids:${s}`);this.group=new Xe,this.group.position.copy(this.center);const c=[];for(let p=0;p<3;p++)c.push(fS(`${s}:rock${p}`,1+p));const l=new Mt({color:9077111,roughness:.95,metalness:.06,flatShading:!0});this.rocks=[];const h=Math.ceil(i/c.length),u=new Ne,d=new ht,f=new Wt,m=new b,_=new b;this.meshes=c.map(p=>{const y=new va(p,l,h);y.instanceMatrix.setUsage(vp),u.makeScale(0,0,0);for(let x=0;x<h;x++)y.setMatrixAt(x,u);return this.group.add(y),y});for(let p=0;p<i;p++){if(a==="belt"){const A=o.range(0,Math.PI*2),E=n*(.75+o.gaussian()*.08);_.set(Math.cos(A)*E,o.gaussian()*n*.05,Math.sin(A)*E)}else _.set(o.gaussian(),o.gaussian()*.6,o.gaussian()).multiplyScalar(n*.34);const y=o.range(3,9)*(o.chance(.12)?o.range(2,4.5):1);f.set(o.range(0,Math.PI*2),o.range(0,Math.PI*2),o.range(0,Math.PI*2)),d.setFromEuler(f),m.setScalar(y),u.compose(_,d,m);const x=this.meshes[p%this.meshes.length],v=Math.floor(p/this.meshes.length);x.setMatrixAt(v,u);const P=new b(o.range(-1,1),o.range(-1,1),o.range(-1,1));P.lengthSq()<1e-4&&P.set(0,1,0),P.normalize(),this.rocks.push({x:_.x,y:_.y,z:_.z,r:y*1.05,hp:55+y*16,mesh:x,slot:v,dead:!1,q:d.clone(),scale:y,axis:P,rate:o.range(.06,.45)})}for(const p of this.meshes)p.instanceMatrix.needsUpdate=!0,p.computeBoundingSphere();this.cellSize=96,this.grid=new Map,this.rocks.forEach((p,y)=>{const x=Math.floor((p.x-p.r)/this.cellSize),v=Math.floor((p.x+p.r)/this.cellSize),P=Math.floor((p.y-p.r)/this.cellSize),A=Math.floor((p.y+p.r)/this.cellSize),E=Math.floor((p.z-p.r)/this.cellSize),L=Math.floor((p.z+p.r)/this.cellSize);for(let S=x;S<=v;S++)for(let M=P;M<=A;M++)for(let C=E;C<=L;C++){const U=`${S},${M},${C}`;let F=this.grid.get(U);F||(F=[],this.grid.set(U,F)),F.push(y)}}),e.engine.scene.add(this.group),e.origin.onShift(p=>{this.center.sub(p),this.group.position.copy(this.center)}),this._local=new b,this._normal=new b,this._playerCooldown=0,this._zeroMatrix=new Ne().makeScale(0,0,0),this._tumbleCursor=0,this._tumbleQ=new ht,this._tumbleM=new Ne,this._tumbleP=new b,this._tumbleS=new b,this.drifters=[];const g=Math.min(10,Math.floor((this.rocks.length||0)/18));for(let p=0;p<g;p++){const y=o.range(6,14),x=new pe(c[p%c.length],l);x.scale.setScalar(y/1.05);const v={x:o.gaussian()*n*.3,y:o.gaussian()*n*.15,z:o.gaussian()*n*.3,vx:o.range(-7,7),vy:o.range(-3,3),vz:o.range(-7,7),rx:o.range(-.4,.4),ry:o.range(-.4,.4),r:y,hp:55+y*16,mesh:x,drifter:!0,dead:!1};x.position.set(v.x,v.y,v.z),this.group.add(x),this.drifters.push(v)}}sphereHit(e,t){if(this._local.copy(e).sub(this.group.position),this._local.lengthSq()>(this.radius+200)**2)return null;const n=Math.floor((this._local.x-t)/this.cellSize),i=Math.floor((this._local.x+t)/this.cellSize),s=Math.floor((this._local.y-t)/this.cellSize),a=Math.floor((this._local.y+t)/this.cellSize),o=Math.floor((this._local.z-t)/this.cellSize),c=Math.floor((this._local.z+t)/this.cellSize);for(let l=n;l<=i;l++)for(let h=s;h<=a;h++)for(let u=o;u<=c;u++){const d=this.grid.get(`${l},${h},${u}`);if(d)for(const f of d){const m=this.rocks[f];if(m.dead)continue;const _=this._local.x-m.x,g=this._local.y-m.y,p=this._local.z-m.z,y=m.r+t;if(_*_+g*g+p*p<y*y)return m}}for(const l of this.drifters){if(l.dead)continue;const h=this._local.x-l.x,u=this._local.y-l.y,d=this._local.z-l.z,f=l.r+t;if(h*h+u*u+d*d<f*f)return l}return null}damageRock(e,t,n,i){const s=this.game;s.explosions&&s.explosions.spawn(n,.28),i&&s.pickups&&Math.random()<.14&&s.pickups.spawnBurst(n,1),e.hp-=t,!(e.hp>0||e.dead)&&(e.dead=!0,e.drifter?this.group.remove(e.mesh):(e.mesh.setMatrixAt(e.slot,this._zeroMatrix),e.mesh.instanceMatrix.needsUpdate=!0),s.explosions&&s.explosions.spawn(n,.9),i&&s.pickups&&s.pickups.spawnBurst(n,2+Math.round(e.r/6)),s.audio?.playNoise?.({duration:.4,gain:.3,filterFreq:500,filterEnd:70}))}update(e){const t=this.game.player?.position;if(t&&this.rocks.length){const l=this._local.copy(t).sub(this.group.position).lengthSq(),h=this.radius+5e3;if(l<h*h){const u=Math.ceil(this.rocks.length/3),d=e*3;for(let f=0;f<u;f++){this._tumbleCursor=(this._tumbleCursor+1)%this.rocks.length;const m=this.rocks[this._tumbleCursor];m.dead||(this._tumbleQ.setFromAxisAngle(m.axis,m.rate*d),m.q.premultiply(this._tumbleQ).normalize(),this._tumbleP.set(m.x,m.y,m.z),this._tumbleS.setScalar(m.scale),this._tumbleM.compose(this._tumbleP,m.q,this._tumbleS),m.mesh.setMatrixAt(m.slot,this._tumbleM),m.mesh.instanceMatrix.needsUpdate=!0)}}}for(const l of this.drifters)l.dead||(l.x+=l.vx*e,l.y+=l.vy*e,l.z+=l.vz*e,l.x*l.x+l.y*l.y+l.z*l.z>this.radius*this.radius&&(l.vx=-l.vx,l.vy=-l.vy,l.vz=-l.vz),l.mesh.position.set(l.x,l.y,l.z),l.mesh.rotation.x+=l.rx*e,l.mesh.rotation.y+=l.ry*e);this._playerCooldown-=e;const n=this.game.player;if(!n||!n.alive||this._playerCooldown>0)return;const i=this.sphereHit(n.position,n.radius);if(!i)return;this._playerCooldown=.5;const s=n.speed,a=Qe(s*.1,6,35),o=n.applyDamage(a);n.shieldFx&&n.shieldFx.flash(n.position,1),this._normal.copy(n.position).sub(this.group.position).sub(this._local.set(i.x,i.y,i.z)).normalize();const c=n.velocity.dot(this._normal);c<0&&n.velocity.addScaledVector(this._normal,-c*1.6),n.position.addScaledVector(this._normal,2),this.game.events.emit("player:hit",{damage:a}),this.game.events.emit("camera:shake",.45),this.game.audio.playNoise({duration:.5,gain:.5,filterFreq:700,filterEnd:90}),o.destroyed&&this.game.events.emit("ship:destroyed",{ship:n,byPlayer:!1})}}function fS(r,e){const t=new pn(r),n=new br(1,Math.min(2,e)),i=n.getAttribute("position"),s=new b;for(let a=0;a<i.count;a++){s.fromBufferAttribute(i,a);const o=t.fbm(s.x*1.3,s.y*1.3,s.z*1.3,3);s.multiplyScalar(1+o*.42),i.setXYZ(a,s.x,s.y,s.z)}return n.computeVertexNormals(),n}const pS=["K","V","Th","N","Z","S","M","R","D","L","X","Or","Az","El","Ur"],mS=["a","e","i","o","u","ae","ia","ei"],gS=["n","r","s","th","x","l","m","nd","rr",""],_S=["Prime","Minor","II","III","IV","V","IX",""];function vS(r){let e=r.pick(pS);const t=r.int(1,2);for(let i=0;i<t;i++)e+=r.pick(mS),e+=i<t-1?r.pick(["r","l","n","v","th","z"]):r.pick(gS);e=e.charAt(0).toUpperCase()+e.slice(1);const n=r.pick(_S);return n?`${e} ${n}`:e}function bS(r,e){const t=["Alpha","Beta","Gamma","Delta","Epsilon","Sigma","Tau","Omega"],n=r.int(2,89);switch(e){case"station":return`${r.pick(t)} Station ${n}`;case"satellite":return`Relay ${r.pick(t)}-${n}`;case"wreck":return`Wreck of the ${r.pick(["Meridian","Cormorant","Halcyon","Vagrant","Auriga","Pallas"])}`;case"anomaly":return`Anomaly ${r.pick(t)}-${n}`;default:return`Site ${n}`}}const yS=["ocean","ice","desert","volcanic","rocky","terran","ice","desert","terran","ocean","volcanic","rocky"];function xS(r,e){const t=new qt(`${Dn}:layout`);e.addPlanet(new Oo(r,JM(),new b(11200,1600,37500)));const n=Math.PI*(3-Math.sqrt(5)),i=t.range(0,Math.PI*2);yS.forEach((o,c)=>{const l=55e3+c/7*18e4*t.range(.92,1.08),h=i+n*(c+1),u=t.gaussian()*.09,d=new b(Math.cos(h)*l,Math.sin(u)*l*.35,Math.sin(h)*l),f=Hu(`${Dn}:planet:${c}`,o);e.addPlanet(new Oo(r,f,d))}),r.starSystems=[{name:"Solari",center:new b(0,0,0),render:new b(0,0,0).sub(r.origin.offset)}],[{name:"Meridian Reach",dir:new b(.83,.1,-.55)},{name:"Karyx Expanse",dir:new b(-.62,-.08,-.78)}].forEach((o,c)=>{const l=o.dir.clone().normalize().multiplyScalar(15e5),h={name:o.name,center:l,render:l.clone().sub(r.origin.offset)};r.starSystems.push(h);const u=new qt(`${Dn}:system:${c+1}`),d=u.range(0,Math.PI*2);["terran","ocean","ice","desert","volcanic","rocky","terran","ocean"].forEach((m,_)=>{const g=55e3+_/7*17e4*u.range(.92,1.08),p=d+n*(_+1),y=u.gaussian()*.09,x=new b(Math.cos(p)*g,Math.sin(y)*g*.35,Math.sin(p)*g).add(l),v=Hu(`${Dn}:system:${c+1}:planet:${_}`,m),P=new Oo(r,v,x);P.starRender=h.render,e.addPlanet(P)})}),r.origin.onShift(o=>{for(const c of r.starSystems)c.render.sub(o)});const a=[];a.push(new Bu(r,{center:Na.clone().add(new b(3400,300,-2600)),radius:1500,count:320,seed:`${Dn}:field:inner`,shape:"cluster"}));for(let o=0;o<2;o++){const c=t.range(0,Math.PI*2),l=t.range(8e4,19e4);a.push(new Bu(r,{center:new b(Math.cos(c)*l,t.gaussian()*4e3,Math.sin(c)*l),radius:t.range(2600,4200),count:420,seed:`${Dn}:field:${o}`,shape:t.chance(.5)?"belt":"cluster"}))}for(const o of a)r.asteroidFields.push(o),r.addSystem(`asteroids:${a.indexOf(o)}`,o)}function Hu(r,e){const t=new qt(r),n=vS(t),i=t.range(1900,4600),s={seed:r,name:n,archetype:e,radius:i,relief:i*t.range(.03,.05),gravity:14+i/4600*18*t.range(.85,1.15),hasOcean:!1,oceanDepth:i*.025,oceanColor:new X(.03,.16,.24),oceanRoughness:.12,hasAtmosphere:!0,atmosphereHeight:i*t.range(.09,.13),scatterColor:new b(.18,.4,.85),hazeColor:new X(.5,.68,.9),hazeDensity:1,axialTilt:t.range(-.6,.6),terrain:{continentFreq:t.range(.9,1.6),continentOctaves:4,seaLevelBias:t.range(-.05,.12),hillFreq:t.range(3.5,6.5),hillAmp:t.range(.15,.3),hillStyle:"rolling",mountainFreq:t.range(2.4,4.2),mountainOctaves:5,mountainAmp:t.range(.7,1.15),mountainMaskFreq:t.range(1.3,2.2),plateauFreq:t.range(2,3.4),plateauAmp:t.range(0,.35),plateauSteps:t.int(3,5),canyonFreq:t.range(1.8,3),canyonDepth:t.range(.1,.45),detailFreq:t.range(36,60),detailAmp:t.range(.03,.07),craterCount:0,craterMaxRadius:.06},palette:null,clouds:null},a=(o,c,l,h=.05)=>new X(Math.max(0,o+t.range(-h,h)),Math.max(0,c+t.range(-h,h)),Math.max(0,l+t.range(-h,h)));switch(e){case"terran":{s.hasOcean=!0,s.terrain.seaLevelBias=t.range(0,.1),s.palette={shallow:a(.13,.38,.42),beach:a(.62,.56,.4),low:a(.2,.4,.17,.08),mid:a(.12,.28,.12,.06),high:a(.42,.38,.34),steep:a(.3,.27,.25),cap:new X(.92,.94,.97),capThreshold:t.range(.55,.75)},s.clouds={coverage:t.range(.4,.55),color:new X(1,1,1),speed:.004};break}case"ocean":{s.hasOcean=!0,s.terrain.seaLevelBias=t.range(-.3,-.16),s.terrain.mountainAmp*=.7,s.oceanColor=a(.02,.12,.28),s.oceanDepth=i*.035,s.scatterColor.set(.15,.35,.9),s.hazeColor=new X(.45,.65,.95),s.palette={shallow:a(.1,.42,.48),beach:a(.72,.68,.52),low:a(.3,.46,.25),mid:a(.2,.34,.18),high:a(.45,.42,.38),steep:a(.32,.3,.28),cap:new X(.92,.94,.97),capThreshold:t.range(.6,.8)},s.clouds={coverage:t.range(.5,.65),color:new X(1,1,1),speed:.006};break}case"ice":{s.hasOcean=!0,s.oceanColor=a(.55,.68,.78),s.oceanRoughness=.45,s.terrain.seaLevelBias=t.range(-.1,.05),s.terrain.craterCount=t.int(6,16),s.gravity*=.85,s.scatterColor.set(.3,.5,.8),s.hazeColor=new X(.62,.72,.88),s.hazeDensity=.6,s.atmosphereHeight*=.8,s.palette={shallow:a(.5,.62,.72),beach:a(.7,.78,.85),low:a(.75,.82,.9),mid:a(.62,.7,.82),high:a(.5,.55,.66),steep:a(.36,.42,.55),cap:new X(.95,.97,1),capThreshold:.2},s.clouds=t.chance(.6)?{coverage:t.range(.25,.4),color:new X(.95,.97,1),speed:.008}:null;break}case"desert":{s.hasOcean=!1,s.terrain.hillStyle="dunes",s.terrain.hillFreq=t.range(6,10),s.terrain.hillAmp=t.range(.18,.3),s.terrain.canyonDepth=t.range(.35,.6),s.terrain.plateauAmp=t.range(.25,.45),s.terrain.craterCount=t.int(3,10),s.scatterColor.set(.55,.38,.18),s.hazeColor=new X(.85,.62,.38),s.hazeDensity=.85,s.palette={shallow:a(.45,.3,.18),beach:a(.72,.55,.32),low:a(.76,.58,.34,.08),mid:a(.65,.44,.26),high:a(.5,.32,.2),steep:a(.38,.24,.16),cap:a(.8,.68,.55),capThreshold:.95},s.clouds=t.chance(.35)?{coverage:t.range(.12,.25),color:new X(.9,.8,.65),speed:.01}:null;break}case"volcanic":{s.hasOcean=!0,s.oceanColor=new X(2.4,.5,.08),s.oceanRoughness=.55,s.oceanDepth=i*.02,s.terrain.seaLevelBias=t.range(-.16,-.06),s.terrain.mountainAmp*=1.25,s.terrain.detailAmp*=1.6,s.gravity*=1.1,s.scatterColor.set(.5,.22,.1),s.hazeColor=new X(.55,.28,.16),s.hazeDensity=1.4,s.palette={shallow:new X(1.4,.35,.05),beach:a(.25,.14,.1),low:a(.2,.15,.13),mid:a(.16,.12,.11),high:a(.3,.22,.18),steep:a(.1,.08,.08),cap:a(.35,.3,.28),capThreshold:.97},s.clouds={coverage:t.range(.3,.5),color:new X(.32,.26,.24),speed:.012};break}case"rocky":default:{s.hasOcean=!1,s.hasAtmosphere=!1,s.terrain.craterCount=t.int(22,40),s.terrain.craterMaxRadius=.09,s.terrain.canyonDepth*=.5,s.terrain.detailAmp*=1.4,s.gravity*=.7;const o=t.range(.35,.55);s.palette={shallow:new X(o*.5,o*.48,o*.46),beach:new X(o*.8,o*.76,o*.72),low:new X(o,o*.95,o*.88),mid:new X(o*.85,o*.8,o*.75),high:new X(o*1.15,o*1.1,o*1.05),steep:new X(o*.6,o*.57,o*.54),cap:new X(o*1.2,o*1.18,o*1.16),capThreshold:.98},s.clouds=null;break}}return s}const Jt=[{id:"gray",name:"Common Ore",value:1,weight:60,color:10134443,emissive:.15},{id:"green",name:"Verdite",value:2,weight:30,color:5232250,emissive:.5},{id:"blue",name:"Cobalt Cryst",value:10,weight:9,color:4892927,emissive:.8},{id:"red",name:"Pyronite",value:20,weight:5.5,color:16734792,emissive:1},{id:"purple",name:"Void Amethyst",value:50,weight:3,color:12086527,emissive:1.3},{id:"white",name:"Lumen Shard",value:100,weight:1.4,color:15922943,emissive:1.8},{id:"gold",name:"Aurum Core",value:500,weight:.6,color:16764746,emissive:2.2}],MS=Object.fromEntries(Jt.map(r=>[r.id,r])),SS=Jt.map(r=>r.id);Jt.reduce((r,e)=>r+e.weight,0);const wS=Object.fromEntries(Jt.map(r=>[r.id,new X(r.color)]));function TS(r,e=1){let t=0;const n=Jt.map((s,a)=>{const o=s.weight*(e===1?1:Math.pow(e,a/Jt.length));return t+=o,o});let i=r()*t;for(let s=0;s<Jt.length;s++)if(i-=n[s],i<=0)return Jt[s];return Jt[0]}function ES(r){return MS[r]?.value??0}const zc={fir:{url:"models-glb/trees/fir.glb",heights:[13,23],trunkR:.45,wind:{sway:.35,flutter:.1}},island1:{url:"models-glb/trees/island1.glb",heights:[6.5,11],trunkR:.28,wind:{sway:.28,flutter:.08}},island2:{url:"models-glb/trees/island2.glb",heights:[5,8.5],trunkR:.25,wind:{sway:.24,flutter:.08}},bush:{url:"models-glb/trees/island2.glb",heights:[1.4,2.8],trunkR:0,wind:{sway:.05,flutter:.08},sink:.12,wide:[1,1.3]},jacaranda:{url:"models-glb/trees/jacaranda.glb",heights:[14,20],trunkR:.7,wind:{sway:.45,flutter:.1}},hero:{url:"models-glb/trees/hero.glb",heights:[7.2,8.4],trunkR:.42,wind:{sway:.16,flutter:.05},optional:!0},quiver:{url:"models-glb/trees/quiver.glb",heights:[3.2,5.5],trunkR:.12,wind:{sway:.1,flutter:.03}},snag:{url:"models-glb/trees/snag.glb",heights:[4,7],trunkR:.1,wind:{sway:.06,flutter:0}},log:{url:"models-glb/trees/log.glb",heights:[.25,.4],trunkR:0,wind:{sway:0,flutter:0}},stump:{url:"models-glb/trees/stump.glb",heights:[.5,.75],trunkR:.5,wind:{sway:0,flutter:0}},fern:{url:"models-glb/trees/fern.glb",heights:[.35,.7],trunkR:0,wind:{sway:0,flutter:.06},sink:.18,wide:[1.1,1.5]},grass:{url:"models-glb/trees/grass.glb",heights:[.65,1.2],trunkR:0,wind:{sway:0,flutter:.09},sink:.3,wide:[1.9,2.6]}},AS=["leaves","twig","fern","grass"],RS=r=>new Promise(e=>setTimeout(e,r));function CS(r,e){let t;const n=new Promise((i,s)=>{t=setTimeout(()=>s(new Error(`timeout after ${e}ms`)),e)});return Promise.race([r,n]).finally(()=>clearTimeout(t))}class PS{constructor(){this.ready=!1,this._promise=null,this.windUniforms={uWindTime:{value:0}},this.hazeUniforms={uHazeColor:{value:new X(.5,.7,.9)},uHazeDensity:{value:0},uPlanetCenter:{value:new b},uSunDirPlanet:{value:new b(0,1,0)}},this._planet=null,this.species={}}load(){if(this._promise)return this._promise;const e=new of;e.setMeshoptDecoder(hf);const t=Object.entries(zc),n=t.filter(([,d])=>!d.optional),i=t.filter(([,d])=>d.optional),s=Math.min(6,n.length);let a=0,o=!1,c;const l=new Promise(d=>{c=d}),h=()=>{o||(o=!0,this._makeAoDisc(),this.ready=!0,c())},u=async(d,f,m)=>{const _=f.optional?25e3:1e4;for(let g=0;g<3;g++)try{const p=await CS(e.loadAsync(f.url),_);this.species[d]=this._prepare(d,f,p.scene),m&&++a>=s&&h();return}catch(p){const y=/timeout/.test(p?.message||"");if(y||g===2){y||console.warn(`[forest] ${d} failed after retries — skipped`,p);return}await RS(500*(g+1))}};for(const[d,f]of i)u(d,f,!1);return Promise.allSettled(n.map(([d,f])=>u(d,f,!0))).then(h),this._promise=l,this._promise}_makeAoDisc(){const e=document.createElement("canvas");e.width=e.height=128;const t=e.getContext("2d"),n=t.createRadialGradient(64,64,6,64,64,64);n.addColorStop(0,"rgba(255,255,255,0.95)"),n.addColorStop(.55,"rgba(255,255,255,0.5)"),n.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=n,t.fillRect(0,0,128,128),this.aoDiscGeo=new Ca(1,20).rotateX(-Math.PI/2),this.aoDiscMat=new xt({color:395018,alphaMap:new Oi(e),transparent:!0,opacity:.32,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}_prepare(e,t,n){n.updateMatrixWorld(!0);const i=[],s=[],a=new on,o=new Map;n.traverse(h=>{if(!h.isMesh)return;const u=h.name==="LOD1"||h.parent?.name==="LOD1";let d=h.geometry;const f=h.matrixWorld;if(f.determinant()!==1||f.elements[12]||f.elements[13]||f.elements[14]){d=d.clone();const _=d.getAttribute("position");if(_.normalized||!(_.array instanceof Float32Array)){const g=new Float32Array(_.count*3);for(let p=0;p<_.count;p++)g[p*3]=_.getX(p),g[p*3+1]=_.getY(p),g[p*3+2]=_.getZ(p);d.setAttribute("position",new lt(g,3))}d.applyMatrix4(f),d.computeBoundingSphere()}u||a.expandByObject(h);let m=o.get(h.material);if(!m){m=h.material;const _=AS.some(g=>(m.name||"").toLowerCase().includes(g));m.side=Nt,m.envMapIntensity=.3,e==="grass"&&m.color.setHex(5603386),_&&(m.name||"").includes("jacaranda")&&m.color.setRGB(.72,.95,.58),m.transparent&&(m.transparent=!1,m.alphaTest=Math.max(m.alphaTest,.4),m.depthWrite=!0),m.userData.leaf=_,o.set(h.material,m)}(u?s:i).push({geometry:d,material:m,leaf:m.userData.leaf})});const c=Math.max(a.max.y-a.min.y,.001),l=a.min.y;for(const h of new Set([...i,...s].map(u=>u.material)))this._patchMaterial(h,t,c);return{parts0:i,parts1:s,nativeH:c,baseY:l}}_patchMaterial(e,t,n){Ma(e,this.hazeUniforms);const i=e.onBeforeCompile,s=!!e.userData.leaf,a=t.wind.sway.toFixed(3),o=(s?t.wind.flutter:0).toFixed(3),c=n.toFixed(3);e.onBeforeCompile=l=>{l.uniforms.uWindTime=this.windUniforms.uWindTime,l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
uniform float uWindTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        {
          vec3 wInstPos = vec3(0.0);
          #ifdef USE_INSTANCING
            wInstPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
          #endif
          float wPhase = wInstPos.x * 0.317 + wInstPos.z * 0.471 + wInstPos.y * 0.181;
          float wH = clamp(transformed.y / ${c}, 0.0, 1.0);
          float wSway = ${a} * wH * wH
            * (sin(uWindTime * 0.9 + wPhase) + 0.55 * sin(uWindTime * 1.63 + wPhase * 1.7));
          transformed.x += wSway;
          transformed.z += wSway * 0.62;
          ${o!=="0.000"?`
          float wFl = ${o} * (0.35 + 0.65 * wH)
            * sin(uWindTime * 3.9 + wPhase * 2.3 + transformed.x * 1.9 + transformed.y * 1.3);
          transformed += objectNormal * wFl;`:""}
        }`),i(l),l.vertexShader=l.vertexShader.replace("vHazeWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;",`vec4 hazeWP = vec4(transformed, 1.0);
        #ifdef USE_INSTANCING
          hazeWP = instanceMatrix * hazeWP;
        #endif
        vHazeWorldPos = (modelMatrix * hazeWP).xyz;`),s&&(l.fragmentShader=l.fragmentShader.replace("vec3 sunsetTint = vec3(0.9, 0.45, 0.22);",`gl_FragColor.rgb += diffuseColor.rgb * (0.5 * dayFactor);
          vec3 sunsetTint = vec3(0.9, 0.45, 0.22);`))},e.customProgramCacheKey=()=>`foliage:${c}:${a}:${o}:${s}`,e.needsUpdate=!0}ensureImpostors(e){if(this._impostorsReady)return;this._impostorsReady=!0,this.impostorGeo=LS();const t=new el,n=new gr,i=e.getRenderTarget(),s=e.toneMapping,a=new X;e.getClearColor(a);const o=e.getClearAlpha();e.toneMapping=Zn,e.setClearColor(0,0);for(const c of["fir","island1","island2","jacaranda","quiver","snag"]){const l=this.species[c];if(!l)continue;const h=new Xe,u=[];for(const y of l.parts0){const x=new xt({map:y.material.map??null,color:6056788,alphaTest:.12,side:Nt});u.push(x),h.add(new pe(y.geometry,x))}t.add(h);const d=new on().setFromObject(h),f=d.getSize(new b),m=Math.max(f.x,f.z);n.left=-m/2,n.right=m/2,n.top=d.max.y,n.bottom=d.min.y,n.near=.1,n.far=m*4,n.position.set(0,0,m*2),n.lookAt(0,0,0),n.updateProjectionMatrix();const _=new an(512,512,{depthBuffer:!0});_.texture.generateMipmaps=!0,_.texture.minFilter=In,e.setRenderTarget(_),e.clear(),e.render(t,n);const g=new xt({map:_.texture,color:12370612,alphaTest:.24,side:Nt});Ma(g,this.hazeUniforms);const p=g.onBeforeCompile;g.onBeforeCompile=y=>{p(y),y.vertexShader=y.vertexShader.replace("vHazeWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;",`vec4 hazeWP = vec4(transformed, 1.0);
          #ifdef USE_INSTANCING
            hazeWP = instanceMatrix * hazeWP;
          #endif
          vHazeWorldPos = (modelMatrix * hazeWP).xyz;`),y.fragmentShader=y.fragmentShader.replace("vec3 sunsetTint = vec3(0.9, 0.45, 0.22);",`gl_FragColor.rgb *= (0.22 + 0.85 * dayFactor);
          vec3 sunsetTint = vec3(0.9, 0.45, 0.22);`)},g.customProgramCacheKey=()=>"impostor-day-haze",l.impostor={material:g,aspect:m/f.y},t.remove(h),u.forEach(y=>y.dispose())}e.setRenderTarget(i),e.toneMapping=s,e.setClearColor(a,o)}bindPlanet(e){this._planet=e}update(e){this.windUniforms.uWindTime.value+=e;const t=this._planet;if(t){const n=t.hazeUniforms;this.hazeUniforms.uHazeColor.value.copy(n.uHazeColor.value),this.hazeUniforms.uHazeDensity.value=n.uHazeDensity.value,this.hazeUniforms.uPlanetCenter.value.copy(n.uPlanetCenter.value),this.hazeUniforms.uSunDirPlanet.value.copy(n.uSunDirPlanet.value)}}}function LS(){const r=[],e=[],t=[],n=(s,a)=>{const o=-a,c=s,l=[[-.5*o,0,-.5*c,0,0],[.5*o,0,.5*c,1,0],[.5*o,1,.5*c,1,1],[-.5*o,0,-.5*c,0,0],[.5*o,1,.5*c,1,1],[-.5*o,1,-.5*c,0,1]];for(const[h,u,d,f,m]of l)r.push(h,u,d),e.push(s,0,a),t.push(f,m)};n(0,1),n(1,0);const i=new vt;return i.setAttribute("position",new nt(r,3)),i.setAttribute("normal",new nt(e,3)),i.setAttribute("uv",new nt(t,2)),i}let ko=null;function Qs(){return ko||(ko=new PS),ko}const aa=420,DS=60,dn=6,IS=150,Gu={terran:{pFloor:.29,pMask:.71,hero:!0,undergrowth:!0,mix:[{id:"fir",w:24,minH01:.15},{id:"island1",w:30,maxH01:.36},{id:"island2",w:23,maxH01:.32},{id:"jacaranda",w:9,maxH01:.28},{id:"quiver",w:4,shoreOnly:!0},{id:"snag",w:4},{id:"log",w:4},{id:"stump",w:2}]},ocean:{pFloor:.25,pMask:.7,hero:!0,undergrowth:!0,mix:[{id:"fir",w:16,minH01:.18},{id:"island1",w:32,maxH01:.36},{id:"island2",w:26,maxH01:.32},{id:"jacaranda",w:8,maxH01:.28},{id:"quiver",w:6,shoreOnly:!0},{id:"snag",w:4},{id:"log",w:4},{id:"stump",w:2}]},ice:{pFloor:.14,pMask:0,hero:!1,undergrowth:!1,leafTint:[.82,.92,1.1],barkTint:[.9,.95,1.05],mix:[{id:"fir",w:68},{id:"snag",w:22},{id:"log",w:10}]},desert:{pFloor:.055,pMask:0,hero:!1,undergrowth:!1,mix:[{id:"quiver",w:58},{id:"snag",w:26},{id:"log",w:16}]},volcanic:{pFloor:.04,pMask:0,hero:!1,undergrowth:!1,leafTint:[.8,.76,.72],barkTint:[.72,.7,.68],mix:[{id:"snag",w:48},{id:"log",w:30},{id:"quiver",w:22}]},rocky:{pFloor:.03,pMask:0,hero:!1,undergrowth:!1,mix:[{id:"quiver",w:40},{id:"snag",w:35},{id:"log",w:25}]}};function Vu(r,e,t,n){let i=Math.imul(r,374761393)+Math.imul(e,668265263)+Math.imul(t,1274126177)+n|0;return i=Math.imul(i^i>>>13,1103515245),(i^i>>>16)>>>0}function Wu(r){let e=r|0;return()=>{e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function FS(r){let e=2166136261;for(let t=0;t<r.length;t++)e=Math.imul(e^r.charCodeAt(t),16777619);return e|0}class Bc{constructor(e,t,n,i="full"){this.game=e,this.planet=t,this._mode=i,this.center=t.group.position;const s=e.engine.isMobile;this._ring0=s?36:50,this._ring1=s?95:130,this._flightRing1=s?80:120,this._stray=this._ring0-10,this.rocks=[],this.colliders=[],this._group=new Xe,t.group.add(this._group),this._rockMats=Jt.map(a=>new Mt({color:a.color,emissive:wS[a.id].clone().multiplyScalar(a.emissive*.4),roughness:.7,metalness:.15,flatShading:!0})),this._rockGeo=new ol(1,0),this._forestMeshes=[],this._disposed=!1,this._heroPlaced=!1,this._buildRocks(n),this._rockColliderCount=this.colliders.length,this._buildForest(n),this._buildWildlife(n),this._tmp=new b,this._wUp=new b,this._wT1=new b,this._wT2=new b,this._wQuat=new ht,this._yawQ=new ht}_isLand(e){const t=e.distanceTo(this.center)-this.planet.radius;return!this.planet.descriptor.hasOcean||t>1}_sampleSurface(e,t,n){const i=this._up0||(this._up0=new b);i.copy(e).sub(this.center).normalize();const s=this._t1||(this._t1=new b),a=this._t2||(this._t2=new b);s.set(0,1,0),Math.abs(i.dot(s))>.9&&s.set(1,0,0),s.crossVectors(i,s).normalize(),a.crossVectors(i,s).normalize();const o=Math.random()*Math.PI*2,c=t+Math.sqrt(Math.random())*(n-t),l=new b().copy(e).addScaledVector(s,Math.cos(o)*c).addScaledVector(a,Math.sin(o)*c),h=this.planet.getAltitude(l),u=this._tmpDir||(this._tmpDir=new b);return u.copy(l).sub(this.center).normalize(),l.addScaledVector(u,-h),this._isLand(l)?{point:l,up:u.clone()}:null}_standMatrix(e,t,n,i){const s=this._q||(this._q=new ht);s.setFromUnitVectors(Xs,t);const a=this._spin||(this._spin=new ht);a.setFromAxisAngle(t,Math.random()*Math.PI*2),s.premultiply(a);const o=this._lp||(this._lp=new b);return o.copy(e).sub(this.center),i.compose(o,s,n),o}_buildRocks(e){const t=new b,n=new Ne;for(let i=0;i<DS;i++){const s=this._sampleSurface(e,8,aa);if(!s)continue;const a=TS(Math.random),o=.7+Math.random()*1.3,c=new pe(this._rockGeo,this._rockMats[Jt.indexOf(a)]);t.set(o,o*(.7+Math.random()*.5),o);const l=this._standMatrix(s.point,s.up,t,n);c.applyMatrix4(n),c.position.copy(l).addScaledVector(s.up,-o*.25),c.castShadow=!0,this._group.add(c);const h={local:l.clone(),r:o*1.15};this.colliders.push(h),this.rocks.push({mesh:c,rarity:a,localPos:l.clone(),collider:h})}}_slopeAt(e,t,n,i){const s=this.planet.radius,a=2.5,o=this._slopeDir||(this._slopeDir=new b);o.copy(e).multiplyScalar(s).addScaledVector(n,a).normalize();const c=this.planet.sampler.height(o.x,o.y,o.z);o.copy(e).multiplyScalar(s).addScaledVector(i,a).normalize();const l=this.planet.sampler.height(o.x,o.y,o.z);return Math.hypot(c-t,l-t)/a}_buildForest(e){const t=this.planet.descriptor;if(!t.hasAtmosphere)return;const n=Gu[t.archetype]??Gu.rocky,i=Qs();if(!i.ready){const E=e.clone();i.load().then(()=>{this._disposed||this._buildForest(E)});return}i.bindPlanet(this.planet),i.ensureImpostors(this.game.engine.renderer),this._centerLocal=e.clone().sub(this.center),this._plan=n;const s=this.planet,a=s.radius,o=this._biomeNoise||(this._biomeNoise=new pn(`${t.seed}:biome`)),c=FS(t.seed??t.name),l=t.archetype==="terran"||t.archetype==="ocean",h=t.hasOcean&&(t.archetype==="desert"||t.archetype==="terran"||t.archetype==="volcanic"),u=n.mix.reduce((E,L)=>E+L.w,0),d=n.barkTint??[1,1,1],f=n.leafTint??[1,1,1],m=this._centerLocal.clone().normalize(),_=new b(0,1,0);Math.abs(m.dot(_))>.9&&_.set(1,0,0),_.crossVectors(m,_).normalize();const g=new b().crossVectors(m,_).normalize(),p=new Map;this._aoRecs=[];const y=new Set,x=new b,v=new b,P=new b,A=Math.ceil(aa/dn);for(let E=-A;E<=A;E++)for(let L=-A;L<=A;L++){const S=Math.hypot(E,L)*dn;if(S>aa||S<7)continue;x.copy(this._centerLocal).addScaledVector(_,E*dn).addScaledVector(g,L*dn);const M=Math.round(x.x/dn),C=Math.round(x.y/dn),U=Math.round(x.z/dn),F=`${M},${C},${U}`;if(y.has(F))continue;y.add(F);const I=Wu(Vu(M,C,U,c));x.set(M*dn,C*dn,U*dn).addScaledVector(_,(I()-.5)*dn*.9).addScaledVector(g,(I()-.5)*dn*.9),v.copy(x).normalize();const B=s.sampler.height(v.x,v.y,v.z);if(t.hasOcean&&B<=1)continue;const z=Math.max(0,Math.min(1,B/t.relief)),V=h&&B>=1&&B<=5.5;let H=n.pFloor;if(l&&n.pMask>0){const Ie=wt(.15,.6,o.noise3(v.x*7+41,v.y*7+41,v.z*7+41)),W=wt(.03,.09,z)*(1-wt(.38,.58,z));H+=n.pMask*Ie*W}if(I()>H)continue;let J=null;for(let Ie=0;Ie<4&&!J;Ie++){let W=I()*u,te=n.mix[n.mix.length-1];for(const ve of n.mix)if(W-=ve.w,W<=0){te=ve;break}te.shoreOnly&&!V||te.minH01!==void 0&&z<te.minH01||te.maxH01!==void 0&&z>te.maxH01||(J=te)}if(!J)continue;const ie=i.species[J.id];if(!ie)continue;const re=this._slopeAt(v,B,_,g);if(re>.55)continue;P.copy(v).multiplyScalar(a+B);const ye=this._mode==="flight"?S<=this._flightRing1?1:2:S<=this._ring0?0:S<=this._ring1?1:2;ye===2&&!ie.impostor||this._placeTree(J.id,P,v,ye,I,p,d,f,re,0)}if(n.undergrowth&&this._mode==="full"){const E=this.game.engine.isMobile;this._buildUndergrowth("bush",5.2,130,this._ring0,.3,.38,c+303,_,g,o,p,d,f),this._buildUndergrowth("fern",8,130,45,.55,.2,c+101,_,g,o,p,d,f),this._buildUndergrowth("grass",3,E?130:200,200,.03,.97,c+202,_,g,o,p,d,f,E?34:48,2.6,.6,.85)}if(n.hero&&this._mode==="full"&&i.species.hero&&!this._heroPlaced&&this._placeHero(i,e),this._aoRecs.length&&i.aoDiscGeo){const E=new va(i.aoDiscGeo,i.aoDiscMat,this._aoRecs.length);for(let L=0;L<this._aoRecs.length;L++)E.setMatrixAt(L,this._aoRecs[L]);E.castShadow=!1,E.receiveShadow=!1,E.frustumCulled=!1,E.renderOrder=2,this._group.add(E),this._forestMeshes.push(E)}for(const[E,L]of p){const S=i.species[E],M=S.parts1.length?S.parts1:S.parts0;this._bakeRing(S.parts0,L.recs0,E!=="grass"&&E!=="fern"),this._bakeRing(M,L.recs1,!1),L.recs2.length&&S.impostor&&this._bakeRing([{geometry:i.impostorGeo,material:S.impostor.material,leaf:!0}],L.recs2,!1)}}_buildUndergrowth(e,t,n,i,s,a,o,c,l,h,u,d,f,m=1,_=0,g=.38,p=.58){if(!Qs().species[e])return;const x=this.planet,v=x.descriptor,P=new b,A=new b,E=new b,L=new b,S=new Set,M=new Map,C=e==="grass"?.85:.55,U=Math.ceil(n/t);for(let F=-U;F<=U;F++)for(let I=-U;I<=U;I++){const B=Math.hypot(F,I)*t;if(B>n||B<3)continue;P.copy(this._centerLocal).addScaledVector(c,F*t).addScaledVector(l,I*t);const z=Math.round(P.x/t),V=Math.round(P.y/t),H=Math.round(P.z/t),J=`${z},${V},${H}`;if(S.has(J))continue;S.add(J);const ie=Wu(Vu(z,V,H,o));P.set(z*t,V*t,H*t).addScaledVector(c,(ie()-.5)*t*1.4).addScaledVector(l,(ie()-.5)*t*1.4),E.copy(P).normalize();const re=x.sampler.height(E.x,E.y,E.z);if(v.hasOcean&&re<=1)continue;const ye=Math.max(0,Math.min(1,re/v.relief)),Ie=wt(.15,.6,h.noise3(E.x*7+41,E.y*7+41,E.z*7+41)),W=wt(.03,.09,ye)*(1-wt(g,p,ye));if(ie()>(a+s*Ie)*W)continue;const te=`${Math.round(z*t/8)},${Math.round(V*t/8)},${Math.round(H*t/8)}`;let ve=M.get(te);if(ve===void 0&&(ve=this._slopeAt(E,re,c,l),M.set(te,ve)),ve>C)continue;const he=B<=i?0:1,De=m===1?1:B<95?m:B<150?Math.max(2,Math.round(m/3)):2;for(let ke=0;ke<De;ke++){const Fe=(ie()-.5)*2*_,Ye=(ie()-.5)*2*_;A.copy(P).addScaledVector(c,Fe).addScaledVector(l,Ye),E.copy(A).normalize(),L.copy(E).multiplyScalar(x.radius+re),this._placeTree(e,L,E,he,ie,u,d,f,ve,Math.hypot(Fe,Ye))}}}_placeTree(e,t,n,i,s,a,o,c,l=0,h=0){const d=Qs().species[e],f=zc[e],m=f.heights[0]+s()*(f.heights[1]-f.heights[0]),_=m/d.nativeH,g=this._q2||(this._q2=new ht),p=this._spin2||(this._spin2=new ht);g.setFromUnitVectors(Xs,n),p.setFromAxisAngle(n,s()*Math.PI*2),g.premultiply(p);const y=this._scaleV||(this._scaleV=new b);if(i===2)y.set(m*(d.impostor?.aspect??1),m,m*(d.impostor?.aspect??1));else if(f.wide){const F=_*(f.wide[0]+s()*(f.wide[1]-f.wide[0]));y.set(F,_,F)}else y.setScalar(_);const x=Math.min(2,Math.max(.4,m*.1));let v=(f.sink??.06*Math.sqrt(m))+l*(x+h*.6)+(i===1?.3:i===2?.9:0);f.sink!==void 0&&(v=Math.min(v,m*.5));const P=t.clone().addScaledVector(n,-v),A=new Ne().compose(P,g,y),E=.88+s()*.17,L=new X(o[0]*E,o[1]*E,o[2]*E),S=.8+s()*.35,M=s()*.14,C=new X(c[0]*S*(.94+M),c[1]*S*(1+M*.5),c[2]*S*(.86-M*.3));let U=a.get(e);if(U||(U={recs0:[],recs1:[],recs2:[]},a.set(e,U)),(i===0?U.recs0:i===1?U.recs1:U.recs2).push({mat4:A,barkTint:L,leafTint:C}),f.trunkR>0&&i<2&&this.colliders.push({local:t.clone(),r:f.trunkR*_}),i<2&&(f.trunkR>0||e==="bush"||e==="log")){const F=e==="bush"?m*.8:e==="log"?1.3:Math.max(1.3,m*.16),I=this._discQ||(this._discQ=new ht);I.setFromUnitVectors(Xs,n);const B=this._discS||(this._discS=new b);B.set(F,1,F),this._aoRecs.push(new Ne().compose(t.clone().addScaledVector(n,.12+l*.3),I,B))}}_bakeRing(e,t,n){if(t.length)for(const i of e){const s=new va(i.geometry,i.material,t.length);for(let a=0;a<t.length;a++)s.setMatrixAt(a,t[a].mat4),s.setColorAt(a,i.leaf?t[a].leafTint:t[a].barkTint);s.castShadow=n,s.receiveShadow=!0,s.frustumCulled=!1,this._group.add(s),this._forestMeshes.push(s)}}_placeHero(e,t){const n=e.species.hero,i=zc.hero;for(let s=0;s<20;s++){const a=this._sampleSurface(t,18,42);if(!a)continue;const o=a.point.clone().sub(this.center).normalize(),c=a.point.distanceTo(this.center)-this.planet.radius,l=this._slopeAt(o,c,this._t1,this._t2);if(l>.3&&s<15)continue;const h=i.heights[0]+Math.random()*(i.heights[1]-i.heights[0]),u=h/n.nativeH,d=_=>{const g=new Xe;for(const p of _){const y=new pe(p.geometry,p.material);y.castShadow=!0,y.receiveShadow=!0,g.add(y)}return g},f=new Yv;f.addLevel(d(n.parts0),0),n.parts1.length&&f.addLevel(d(n.parts1),IS);const m=a.point.clone().sub(this.center);f.position.copy(m).addScaledVector(a.up,-(.12+l*h*.12)),f.quaternion.setFromUnitVectors(Xs,a.up),f.rotateY(Math.random()*Math.PI*2),f.scale.setScalar(u),this._group.add(f),this._heroMesh=f,this._heroPlaced=!0,this._heroCollider={local:m.clone(),r:i.trunkR*u},this.colliders.push(this._heroCollider);return}}_recenterForest(e){for(const t of this._forestMeshes)this._group.remove(t),t.isInstancedMesh&&t.dispose();this._forestMeshes.length=0,this.colliders.length=this._rockColliderCount,this._heroCollider&&this.colliders.push(this._heroCollider),this._buildForest(e)}setFullDetail(e){this._mode==="full"||this._disposed||(this._mode="full",this._recenterForest(e))}_buildWildlife(e){if(this.critters=[],this.birds=[],!this.planet.descriptor.hasAtmosphere)return;const t=new gt(.7,.55,1.3),n=new gt(.4,.4,.5),i=new Mt({color:9072461,roughness:.9,flatShading:!0});this._critterAssets=[t,n,i];for(let c=0;c<40&&this.critters.length<10;c++){const l=this._sampleSurface(e,20,aa*.8);if(!l)continue;const h=new Xe,u=new pe(t,i);u.position.y=.6;const d=new pe(n,i);d.position.set(0,.95,-.75),h.add(u,d);const f=l.point.clone().sub(this.center);h.position.copy(f),this._group.add(h),this.critters.push({mesh:h,local:f,heading:Math.random()*Math.PI*2,speed:1.2+Math.random()*1.4,panic:0,turnTimer:Math.random()*3})}const s=new _r(.35,1.1,4);s.rotateX(Math.PI/2);const a=new Mt({color:3817290,roughness:.8,flatShading:!0});this._birdAssets=[s,a];const o=e.clone().sub(this.center);for(let c=0;c<6;c++){const l=new pe(s,a);this._group.add(l),this.birds.push({mesh:l,centerLocal:o,phase:Math.random()*Math.PI*2,r:40+Math.random()*90,h:30+Math.random()*35,speed:.25+Math.random()*.3})}}update(e,t=null){Qs().update(e),t&&this._centerLocal&&(this._tmp.copy(t).sub(this.center),this._tmp.distanceTo(this._centerLocal)>this._stray&&this._recenterForest(t));const n=this.planet.radius;for(const i of this.critters??[]){if(i.turnTimer-=e,i.turnTimer<=0&&(i.turnTimer=1.5+Math.random()*3,i.headingTarget=(i.headingTarget??i.heading)+(Math.random()-.5)*1.6),i.headingTarget!==void 0){let c=i.headingTarget-i.heading;for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;i.heading+=c*Math.min(1,e*2.5)}this._wUp.copy(i.local).normalize(),this._wT1.set(0,1,0),Math.abs(this._wUp.dot(this._wT1))>.9&&this._wT1.set(1,0,0),this._wT1.crossVectors(this._wUp,this._wT1).normalize(),this._wT2.crossVectors(this._wUp,this._wT1).normalize(),t&&(this._tmp.copy(t).sub(this.center),this._tmp.distanceTo(i.local)<16&&(this._tmp.subVectors(i.local,this._tmp),i.heading=Math.atan2(this._tmp.dot(this._wT2),this._tmp.dot(this._wT1)),i.headingTarget=i.heading,i.panic=2.2)),i.panic=Math.max(0,i.panic-e);const s=i.speed*(i.panic>0?3:1);this._tmp.copy(this._wT1).multiplyScalar(Math.cos(i.heading)).addScaledVector(this._wT2,Math.sin(i.heading)),i.local.addScaledVector(this._tmp,s*e),this._wUp.copy(i.local).normalize();const a=this.planet.sampler.height(this._wUp.x,this._wUp.y,this._wUp.z);i.local.copy(this._wUp).multiplyScalar(n+Math.max(a,.5)),i.mesh.position.copy(i.local),this._wQuat.setFromUnitVectors(Xs,this._wUp);const o=-i.heading+Math.PI/2;this._yawQ.setFromAxisAngle(this._wUp,o),i.mesh.quaternion.copy(this._wQuat).premultiply(this._yawQ)}for(const i of this.birds??[])i.phase+=i.speed*e,this._wUp.copy(i.centerLocal).normalize(),this._wT1.set(0,1,0),Math.abs(this._wUp.dot(this._wT1))>.9&&this._wT1.set(1,0,0),this._wT1.crossVectors(this._wUp,this._wT1).normalize(),this._wT2.crossVectors(this._wUp,this._wT1).normalize(),i.mesh.position.copy(i.centerLocal).addScaledVector(this._wUp,i.h).addScaledVector(this._wT1,Math.cos(i.phase)*i.r).addScaledVector(this._wT2,Math.sin(i.phase)*i.r),this._tmp.copy(this._wT1).multiplyScalar(-Math.sin(i.phase)).addScaledVector(this._wT2,Math.cos(i.phase)).normalize(),this._wQuat.setFromUnitVectors(NS,this._tmp),i.mesh.quaternion.copy(this._wQuat)}nearestRock(e,t){let n=null,i=t;for(const s of this.rocks){this._tmp.copy(this.center).add(s.localPos);const a=this._tmp.distanceTo(e);a<i&&(i=a,n=s)}return n?{rock:n,dist:i}:null}removeRock(e){const t=this.rocks.indexOf(e);t!==-1&&(this._group.remove(e.mesh),this.rocks.splice(t,1),e.collider&&(e.collider.dead=!0))}dispose(){this._disposed=!0,this.planet.group.remove(this._group);for(const e of this.rocks)this._group.remove(e.mesh);this.rocks.length=0,this._rockGeo.dispose(),this._rockMats.forEach(e=>e.dispose());for(const e of this._forestMeshes)e.isInstancedMesh&&e.dispose();this._forestMeshes.length=0,this._critterAssets&&this._critterAssets.forEach(e=>e.dispose()),this._birdAssets&&this._birdAssets.forEach(e=>e.dispose())}}const Xs=new b(0,1,0),NS=new b(0,0,1),qu=1.75,US=17,OS=1.9,kS=11,zS=24,BS=8,HS=22,GS=.45,VS=2.1,WS=1.8,qS=6.5,jS=12;class XS{constructor(e){this.game=e,this.avatar={position:new b,forward:new b(0,0,-1),up:new b(0,1,0),pitch:0,vVel:0,grounded:!1},this.planet=null,this.scatter=null,this._active=!1,this.air=1,this.swimming=!1,this.eyeUnder=!1,this.oreBag=null,this._push=new b,this._local2=new b,this._swim=new b,this._right=new b,this._move=new b,this._eye=new b,this._look=new b,this._lookTarget=new b,this._tmp=new b,this._prompt="",e.onfoot=this,e.origin.onShift(t=>{this.avatar.position.sub(t)})}get active(){return this._active}get carrying(){let e=0;const t=this.game.player?.inventory||{};for(const n in t)e+=t[n];return e}update(e){const t=this.game,n=t.input.consumeInteract();if(!this._active){const c=t.universe?.playerContext;c&&c.grounded?(this._emitPrompt("Press E — Disembark"),n&&this._disembark(c.groundedPlanet)):this._prompt&&this._emitPrompt("");return}this._walk(e),this.scatter?.update(e,this.avatar.position),this._updateBreath(e);let i=!1;if(this.oreBag&&this.oreBag.planet===this.planet){const c=this.oreBag;c.phase+=e,c.mesh.position.copy(c.local).addScaledVector(c.up,Math.sin(c.phase*1.6)*.3),c.mesh.rotation.y+=e*.8,this._tmp.copy(c.local).add(this.planet.group.position),i=this._tmp.distanceTo(this.avatar.position)<9}const s=this.scatter?.nearestRock(this.avatar.position,qS),a=t.player,o=this._tmp.copy(a.position).distanceTo(this.avatar.position);i?(this._emitPrompt("Press E — Recover your ore"),n&&this._recoverBag()):s?(this._emitPrompt(`Press E — Mine ${s.rock.rarity.name}`),n&&this._mine(s.rock)):o<jS?(this._emitPrompt("Press E — Board Ship"),n&&this._board()):this._emitPrompt(""),this._updateCamera(e)}_updateBreath(e){this.eyeUnder?this.air=Math.max(0,this.air-e/HS):this.air=Math.min(1,this.air+e/2.5),(this._sentUnder!==this.eyeUnder||Math.abs(this.air-(this._sentAir??-1))>.01)&&(this._sentUnder=this.eyeUnder,this._sentAir=this.air,this.game.events.emit("onfoot:air",{air01:this.air,under:this.eyeUnder})),this.air<=0&&this._drown()}_drown(){const e=this.game,t=e.player,n=this.avatar,i=this.planet,s=t.inventory;if(Object.keys(s).some(o=>s[o]>0)){const o=i.group.position,c=this._tmp.copy(n.position).sub(o).normalize().clone(),l=c.clone().multiplyScalar(i.radius+.9),h=new pe(new Da(.9,0),new Mt({color:16764746,emissive:new X(1.6,1.1,.25),roughness:.4}));h.position.copy(l),i.group.add(h),this.oreBag&&this.oreBag.planet.group.remove(this.oreBag.mesh),this.oreBag={planet:i,local:l,up:c,mesh:h,items:{...s},phase:0},t.inventory={}}n.position.copy(t.position),n.up.copy(n.position).sub(i.group.position).normalize();const a=i.getAltitude(n.position);n.position.addScaledVector(n.up,-a+.05),n.vVel=0,this.air=1,this.eyeUnder=!1,e.events.emit("onfoot:drowned"),e.events.emit("onfoot:air",{air01:1,under:!1}),e.audio?.playNoise?.({duration:.7,gain:.4,filterFreq:300,filterEnd:60})}_recoverBag(){const e=this.game,t=this.oreBag;if(!t)return;const n=e.player.inventory;for(const i in t.items)n[i]=(n[i]||0)+t.items[i];t.planet.group.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose(),this.oreBag=null,e.audio?.playTone?.({type:"triangle",freq:620,freqEnd:980,duration:.25,gain:.22}),e.events.emit("pickup:collected",{rarity:"recovered"})}_disembark(e){const t=this.game,n=t.player;if(!e)return;const i=this.avatar;i.position.copy(n.position),i.up.copy(i.position).sub(e.group.position).normalize();const s=e.getAltitude(i.position);i.position.addScaledVector(i.up,-s+.05),n.getForward(i.forward),i.forward.addScaledVector(i.up,-i.forward.dot(i.up)).normalize(),i.pitch=0,i.vVel=0,i.grounded=!0,this.planet=e;const a=t.approach?.adopt?.()??null;this.scatter=a||new Bc(t,e,i.position),a&&a.setFullDetail(i.position),this._active=!0,t.mode="onfoot",t.input.mode="foot",t.rebaseAnchor=i.position,t.events.emit("onfoot:entered",e),t.audio?.playTone?.({type:"sine",freq:320,freqEnd:220,duration:.25,gain:.16})}_board(){const e=this.game;this._active=!1,e.mode="flight",e.input.mode="flight",e.rebaseAnchor=null,this._emitPrompt(""),this.scatter&&(this.scatter.dispose(),this.scatter=null),this.planet=null,e.events.emit("onfoot:left"),e.audio?.playTone?.({type:"sine",freq:220,freqEnd:360,duration:.25,gain:.16})}_mine(e){const t=this.game,n=t.player.inventory,i=e.rarity.id;n[i]=(n[i]||0)+1,this.scatter.removeRock(e);const s=500+Math.min(e.rarity.value,500)*1.2;t.audio?.playTone?.({type:"triangle",freq:s,freqEnd:s*1.5,duration:.16,gain:.2}),t.events.emit("pickup:collected",{rarity:i}),t.events.emit("onfoot:mined",{rarity:e.rarity})}_walk(e){const t=this.avatar,n=this.planet,i=n.group.position,s=this.game.input.walk;t.up.copy(t.position).sub(i).normalize(),s.lookX&&(this._tmp.copy(t.forward).applyAxisAngle(t.up,-s.lookX*VS*e),t.forward.copy(this._tmp)),t.forward.addScaledVector(t.up,-t.forward.dot(t.up)),t.forward.lengthSq()<1e-6&&t.forward.set(0,0,-1),t.forward.normalize(),t.pitch=Qe(t.pitch-s.lookY*WS*e,-1.35,1.35),this._right.crossVectors(t.forward,t.up).normalize();const a=n.descriptor.hasOcean,o=n.radius+.5;let c=this._tmp.copy(t.position).sub(i).length();if(this.swimming=a&&c<=o+.05,this.swimming)this._swim.copy(t.forward).applyAxisAngle(this._right,t.pitch).normalize(),this._move.set(0,0,0).addScaledVector(this._swim,s.moveZ).addScaledVector(this._right,s.moveX*.7),this._move.lengthSq()>1&&this._move.normalize(),t.position.addScaledVector(this._move,BS*e),t.vVel+=(-1.4-t.vVel)*Math.min(1,e*2.2),s.jump&&(t.vVel=6),t.position.addScaledVector(t.up,t.vVel*e),c=this._tmp.copy(t.position).sub(i).length(),c>o&&(t.position.addScaledVector(t.up,o-c),t.vVel>0&&(t.vVel=0));else{this._move.set(0,0,0).addScaledVector(t.forward,s.moveZ).addScaledVector(this._right,s.moveX),this._move.lengthSq()>1&&this._move.normalize();const m=US*(s.sprint?OS:1);t.position.addScaledVector(this._move,m*e),t.vVel-=zS*e,t.position.addScaledVector(t.up,t.vVel*e)}const l=this.scatter?.colliders;if(l){this._local2.copy(t.position).sub(i);for(const m of l){if(m.dead)continue;this._push.copy(this._local2).sub(m.local);const _=this._push.dot(t.up);if(Math.abs(_)>10)continue;this._push.addScaledVector(t.up,-_);const g=this._push.length(),p=m.r+GS;g<p&&g>1e-4&&(t.position.addScaledVector(this._push.divideScalar(g),p-g),this._local2.copy(t.position).sub(i))}}this._tmp.copy(t.position).sub(i);const h=this._tmp.length();this._tmp.divideScalar(h);const u=n.sampler.height(this._tmp.x,this._tmp.y,this._tmp.z),d=n.radius+u;h<=d?(t.position.addScaledVector(t.up,d-h),t.grounded=!0,t.vVel=0,s.jump&&!this.swimming&&(t.vVel=kS)):t.grounded=!1;const f=this._tmp.copy(t.position).sub(i).length()+qu;this.eyeUnder=this.swimming&&a&&f<o-.1}_updateCamera(e){const t=this.game.engine.camera,n=this.avatar;this._eye.copy(n.position).addScaledVector(n.up,qu),this._look.copy(n.forward).applyAxisAngle(this._right,n.pitch).normalize(),this._lookTarget.copy(this._eye).add(this._look),t.position.copy(this._eye),t.up.copy(n.up),t.lookAt(this._lookTarget);const i=72;Math.abs(t.fov-i)>.1&&(t.fov=Ht(t.fov,i,Dt(6,e)),t.updateProjectionMatrix())}_emitPrompt(e){e!==this._prompt&&(this._prompt=e,this.game.events.emit("onfoot:prompt",e))}}const zo=.9,YS=42e3,KS=520,$S=.985;class QS{constructor(e){this.game=e,this.state="idle",this.timer=0,this.cruiseSpeed=0,this.targetIndex=0,this._fwd=new b,this._toPlanet=new b,e.warp=this}get engaged(){return this.state==="cruise"}get destinations(){const e=this.game.universe?.planets??[],t=this.game.leviathan?.navTarget;return t?[...e,t]:e}get target(){const e=this.destinations;return e.length===0?null:(this.targetIndex%=e.length,e[this.targetIndex])}get targetDistance(){const e=this.target;return e?this.game.player.position.distanceTo(e.group.position)-e.radius:1/0}get charge01(){return this.state==="charging"?1-this.timer/zo:0}canEngage(){const e=this.game;if(e.mode!=="flight"||!e.player?.alive||e.player.autolanding)return!1;const t=e.universe?.playerContext;return!(t&&(t.inAtmosphere||t.grounded))}cycleTarget(){const e=this.destinations;e.length!==0&&(this.targetIndex=(this.targetIndex+1)%e.length,this.game.events.emit("warp:target",this.target),this.game.audio?.playTone?.({type:"sine",freq:700,freqEnd:900,duration:.08,gain:.1}))}toggle(){if(this.state==="idle"){if(!this.canEngage()){this.game.audio?.playTone?.({type:"square",freq:160,freqEnd:110,duration:.16,gain:.1});return}this.state="charging",this.timer=zo,this.game.events.emit("warp:charging"),this.game.audio?.playTone?.({type:"sawtooth",freq:120,freqEnd:900,duration:zo,gain:.14})}else this._drop("manual")}update(e){const t=this.game,n=t.player;if(t.mode==="flight"&&(t.input.consumeWarpCycle()&&this.cycleTarget(),t.input.consumeWarp()&&this.toggle()),this.state==="charging"){if(this.timer-=e,t.events.emit("camera:shake",.03),!this.canEngage()){this.state="idle",t.events.emit("warp:aborted");return}this.timer<=0&&(this.state="cruise",this.cruiseSpeed=Math.max(n.speed,900),t.events.emit("warp:engaged"),t.events.emit("camera:shake",.35),t.audio?.playTone?.({type:"sine",freq:300,freqEnd:1400,duration:.5,gain:.2}));return}if(this.state!=="cruise")return;if(!n.alive||t.mode!=="flight"){this._drop("state");return}const i=t.universe?.playerContext;if(i&&i.inAtmosphere){this._drop("atmosphere");return}this.cruiseSpeed=Ht(this.cruiseSpeed,YS,1-Math.exp(-1.1*e)),n.getForward(this._fwd);const s=this.target;if(s&&(this._toPlanet.copy(s.group.position).sub(n.position).normalize(),this._fwd.dot(this._toPlanet)>$S)){this._fwd.lerp(this._toPlanet,Dt(2.5,e)).normalize();const a=JS.setFromUnitVectors(ZS,this._fwd);n.quaternion.slerp(a,Dt(1.5,e))}n.velocity.copy(this._fwd).multiplyScalar(this.cruiseSpeed);for(const a of this.destinations){this._toPlanet.copy(a.group.position).sub(n.position);const o=this._toPlanet.length(),c=a.influenceRadius*1.6+this.cruiseSpeed*.22;if(o<c&&this._toPlanet.normalize().dot(this._fwd)>.9){this._drop("arrival",a);return}}t.events.emit("camera:shake",.012)}_drop(e,t=null){const n=this.game,i=n.player;this.state="idle",this.cruiseSpeed=0,i.getForward(this._fwd),i.velocity.copy(this._fwd).multiplyScalar(KS),n.events.emit("warp:dropped",{reason:e,planet:t}),n.events.emit("camera:shake",.4),n.audio?.playTone?.({type:"sine",freq:1200,freqEnd:260,duration:.5,gain:.2})}}const ZS=new b(0,0,-1),JS=new ht,ju=3200,Bo=.5;class ew{constructor(e){this.game=e,this.active=!1,this._radial=new b,this._desired=new b,this._fwdT=new b,this._m=new Ne,this._q=new ht,this._hint="",e.landing=this,e.events.on("player:died",()=>this._disengage(!1))}get tooLarge(){return!!this.game.player?.statMult?.noLanding}get eligible(){const e=this.game,t=e.universe?.playerContext;return e.mode==="flight"&&e.player?.alive&&!e.warp?.engaged&&!this.tooLarge&&!!t?.planet&&!t.grounded&&t.altitude<ju}get blockedBySize(){const e=this.game,t=e.universe?.playerContext;return this.tooLarge&&e.mode==="flight"&&e.player?.alive&&!e.warp?.engaged&&!!t?.planet&&t.altitude<ju*2}update(e){const t=this.game,n=t.player;t.input.consumeLand()&&(this.active?this._disengage(!0):this.eligible?this._engage():t.audio?.playTone?.({type:"square",freq:160,freqEnd:110,duration:.14,gain:.1}));const i=this.active?"AUTO-LAND ENGAGED — L to cancel":this.eligible?"Press L — Auto-Land":this.blockedBySize?"FLAGSHIP TOO LARGE TO LAND — switch ships (T → Ships)":"";if(i!==this._hint&&(this._hint=i,t.events.emit("landing:hint",i)),!this.active)return;const s=t.universe?.playerContext;if(!s?.planet||!n.alive){this._disengage(!1);return}const a=t.input.state;if(Math.abs(a.throttle)>Bo||Math.abs(a.pitch)>Bo||Math.abs(a.yaw)>Bo){this._disengage(!0);return}const o=s.planet,c=s.altitude;this._radial.copy(n.position).sub(o.group.position).normalize();const l=n.velocity.dot(this._radial),h=Qe(c*.6,6,120);this._desired.copy(n.velocity).addScaledVector(this._radial,-l).multiplyScalar(Math.exp(-1.6*e)),this._desired.addScaledVector(this._radial,-h),n.velocity.lerp(this._desired,1-Math.exp(-3.2*e)),n.getForward(this._fwdT),this._fwdT.addScaledVector(this._radial,-this._fwdT.dot(this._radial)),this._fwdT.lengthSq()<1e-5&&this._fwdT.set(1,0,0).cross(this._radial),this._fwdT.normalize(),this._m.lookAt(tw,this._fwdT,this._radial),this._q.setFromRotationMatrix(this._m),n.quaternion.slerp(this._q,Dt(2.4,e)),c<=n.radius+.8&&n.speed<14&&(n.velocity.set(0,0,0),this._disengage(!1),t.events.emit("player:autolanded",o),t.events.emit("camera:shake",.1),t.audio?.playNoise?.({duration:.3,gain:.25,filterFreq:420,filterEnd:90}))}_engage(){this.active=!0,this.game.player.autolanding=!0,this.game.events.emit("landing:engaged"),this.game.audio?.playTone?.({type:"sine",freq:520,freqEnd:390,duration:.25,gain:.16})}_disengage(e){!this.active&&!this.game.player?.autolanding||(this.active=!1,this.game.player&&(this.game.player.autolanding=!1),this.game.events.emit("landing:disengaged",e))}}const tw=new b,nw=1500,iw=2200,sw=300;class rw{constructor(e){this.game=e,this.scatter=null,this.planet=null,this._center=new b,this._dir=new b,this._point=new b,e.approach=this}update(e){const t=this.game;if(t.mode!=="flight")return;this.scatter?.update(e??.016,null);const n=t.universe?.playerContext,i=n?.planet,s=t.player;if(this.scatter&&(!i||i!==this.planet||n.altitude>iw)){this.scatter.dispose(),this.scatter=null,this.planet=null;return}if(!i||n.altitude>nw||!s?.alive)return;this._dir.copy(s.position).sub(i.group.position).normalize(),this._point.copy(i.group.position).addScaledVector(this._dir,i.radius);const a=i.getAltitude(this._point);this._point.addScaledVector(this._dir,-a),this.scatter?this._point.distanceTo(this._center)>sw&&(this.scatter.dispose(),this.scatter=new Bc(t,i,this._point,"flight"),this._center.copy(this._point)):(this.scatter=new Bc(t,i,this._point,"flight"),this.planet=i,this._center.copy(this._point))}adopt(){const e=this.scatter;return this.scatter=null,this.planet=null,e}}const aw=3;class ow{constructor(e){this.game=e,this.sites=[],this._tmp=new b;const t=new qt(`${Dn}:civilizations`),n=["Haven Reach","Port Meridian","New Solace","Kestrel Landing"],i=(e.universe?.planets??[]).filter(s=>s.descriptor.hasAtmosphere);for(let s=0;s<Math.min(3,i.length);s++){const a=i[Math.floor(t.range(0,i.length))%i.length];if(this.sites.some(h=>h.planet===a))continue;const[o,c,l]=t.unitVector();this.sites.push({planet:a,dir:new b(o,c,l).normalize(),name:n[s%n.length],built:null,discovered:!1})}}update(){const e=this.game.player;if(e)for(const t of this.sites){const n=t.planet,i=this._tmp.copy(e.position).sub(n.group.position).length();!t.built&&i<n.radius*aw&&(t.built=cw(n,t.dir),n.group.add(t.built)),t.built&&!t.discovered&&(this._tmp.copy(t.dir).multiplyScalar(n.radius).add(n.group.position),e.position.distanceTo(this._tmp)<n.radius*.5&&(t.discovered=!0,this.game.events.emit("poi:discovered",{site:t,title:"Civilization Discovered",subtitle:`${t.name} — ${n.descriptor.name}`})))}}}function cw(r,e){const t=new Xe,n=new qt(`${Dn}:town:${r.descriptor.name}`),i=new gt(1,1,1),s=new Mt({color:10134704,roughness:.85,flatShading:!0}),a=new Mt({color:5923954,roughness:.7,flatShading:!0,emissive:new X(1.6,1.2,.5),emissiveIntensity:.5}),o=e.clone(),c=new b(0,1,0);Math.abs(o.dot(c))>.9&&c.set(1,0,0),c.crossVectors(o,c).normalize();const l=new b().crossVectors(o,c).normalize(),h=12+Math.floor(n.range(0,5)),u=new b,d=new b;for(let _=0;_<h;_++){const g=(_%4-1.5)*34+n.range(-8,8),p=(Math.floor(_/4)-1.5)*34+n.range(-8,8);u.copy(e).multiplyScalar(r.radius).addScaledVector(c,g).addScaledVector(l,p),d.copy(u).normalize();const y=r.sampler.height(d.x,d.y,d.z);if(r.descriptor.hasOcean&&y<1)continue;u.copy(d).multiplyScalar(r.radius+y);const x=n.range(4,15),v=new pe(i,n.chance(.6)?a:s);v.scale.set(n.range(5,10),x,n.range(5,10)),v.position.copy(u).addScaledVector(d,x*.45),v.quaternion.setFromUnitVectors(Xu,d),v.castShadow=!0,t.add(v)}const f=new pe(new ii(.4,.6,26,5),a);d.copy(e);const m=r.sampler.height(d.x,d.y,d.z);return f.position.copy(d).multiplyScalar(r.radius+Math.max(m,1)+13),f.quaternion.setFromUnitVectors(Xu,d),t.add(f),t}const Xu=new b(0,1,0),Sa=new Mt({color:5923694,metalness:.7,roughness:.45,flatShading:!0}),Hc=new Mt({color:2896184,metalness:.55,roughness:.6,flatShading:!0}),xf=new Mt({color:1319998,metalness:.85,roughness:.3,flatShading:!0}),Yu=new Mt({color:3816770,metalness:.5,roughness:.8,flatShading:!0});function wa(r=new X(4,.6,.5)){const e=new Fn(new ni({map:mr(64,2.6),color:r,transparent:!0,blending:Ut,depthWrite:!1}));return e.scale.setScalar(6),e}function lw(){const r=new Xe,e=new pe(new ii(16,16,52,8),Sa);r.add(e);const t=new pe(new Ia(58,7,8,24),Sa);t.rotation.x=Math.PI/2,r.add(t);for(let s=0;s<4;s++){const a=new pe(new gt(3.4,3.4,52),Hc),o=s/4*Math.PI*2;a.position.set(Math.cos(o)*29,0,Math.sin(o)*29),a.lookAt(Math.cos(o)*100,0,Math.sin(o)*100),r.add(a)}for(const s of[-1,1]){const a=new pe(new gt(44,.8,18),xf);a.position.set(0,s*34,0),a.rotation.z=s*.18,r.add(a);const o=new pe(new ii(1,1,14,6),Hc);o.position.set(0,s*28,0),r.add(o)}const n=wa();n.position.set(0,30,0);const i=wa(new X(.5,2.4,3.2));return i.position.set(58,0,0),r.add(n,i),{group:r,radius:78,animate(s,a){r.rotation.y+=s*.02;const o=(Math.sin(a*2.2)*.5+.5)*.9+.1;n.material.opacity=o,i.material.opacity=1.1-o}}}function hw(){const r=new Xe,e=kc("heavy");e.group.traverse(t=>{t.isMesh&&(t.material=Yu)}),e.group.scale.setScalar(2.6),e.group.rotation.set(.5,1.2,2.4),r.add(e.group);for(let t=0;t<5;t++){const n=new pe(new gt(2+Math.random()*6,.6,3+Math.random()*4),Yu);n.position.set((Math.random()-.5)*44,(Math.random()-.5)*30,(Math.random()-.5)*44),n.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3),r.add(n)}return{group:r,radius:30,animate(t){r.rotation.x+=t*.015,r.rotation.z+=t*.01}}}function uw(){const r=new Xe,e=new pe(new gt(4,4,6),Sa);r.add(e);const t=new pe(new rn(3.4,10,6,0,Math.PI*2,0,1.1),Hc);t.position.set(0,0,-4.6),t.rotation.x=Math.PI,r.add(t);for(const i of[-1,1]){const s=new pe(new gt(14,.3,4.4),xf);s.position.x=i*9,r.add(s)}const n=wa(new X(3.2,2.4,.5));return n.position.set(0,3.4,0),n.scale.setScalar(3),r.add(n),{group:r,radius:12,animate(i,s){r.rotation.y+=i*.12,n.material.opacity=Math.sin(s*3.5)>.4?1:.06}}}function dw(){const r=new Xe,e=new xt({color:new X(1.4,3.6,3)}),t=new pe(new br(6,1),e);r.add(t);const n=new Mt({color:1845811,metalness:.9,roughness:.25,emissive:new X(.1,.5,.45),flatShading:!0}),i=[];for(let a=0;a<3;a++){const o=new pe(new Ia(14+a*7,.9,6,40),n);o.rotation.set(Math.random()*3,Math.random()*3,0),i.push(o),r.add(o)}const s=wa(new X(.5,1.8,1.6));return s.scale.setScalar(48),r.add(s),{group:r,radius:32,animate(a,o){i[0].rotation.x+=a*.7,i[1].rotation.y+=a*.55,i[2].rotation.z+=a*.42;const c=.75+Math.sin(o*1.7)*.35;t.scale.setScalar(c),s.material.opacity=.35+c*.3}}}function fw(){const r=new Xe,e=new pe(new gt(7,7,12),Sa);r.add(e);const t=new pe(new gt(7.3,1.2,12.3),new xt({color:new X(3.2,2.2,.4)}));return r.add(t),{group:r,radius:10,animate(n){r.rotation.y+=n*.2,r.rotation.x+=n*.07}}}const pw={station:lw,wreck:hw,satellite:uw,anomaly:dw,cache:fw},Ku=6e3,$u=12e3,Qu=300;class mw{constructor(e){wl(this,"_normal",new b);this.game=e,this.sites=[],this._generate(),e.origin.onShift(t=>{for(const n of this.sites)n.position.sub(t),n.built&&n.inScene&&n.built.group.position.sub(t)})}_generate(){const e=this.game,t=new qt(`${Dn}:poi`),n=e.universe.planets,i=(o,c,l,h=null)=>{this.sites.push({id:`${o}:${this.sites.length}`,kind:o,name:bS(t,o),position:c,reward:l,orbit:h,discovered:!1,signalSent:!1,built:null,inScene:!1})};for(let o=0;o<2;o++){const c=t.range(0,Math.PI*2),l=t.range(4e4,15e4);i("station",new b(Math.cos(c)*l,t.gaussian()*5e3,Math.sin(c)*l),{resources:30})}for(let o=0;o<3;o++){const c=t.pick(n),[l,h,u]=t.unitVector(),d=new b(l,h,u).multiplyScalar(c.radius*t.range(2,4));i("wreck",c.group.position.clone().add(d),{resources:18})}const s=n.filter(o=>o.descriptor.hasAtmosphere).slice(0,4);for(const o of s)i("satellite",o.group.position.clone().add(new b(o.radius*1.7,0,0)),{resources:10},{planet:o,radius:o.radius*t.range(1.5,1.9),speed:t.range(.008,.02),phase:t.range(0,Math.PI*2),incline:t.range(-.4,.4)});const a=["engine","shield","weapon"];for(let o=0;o<3;o++){const c=t.range(0,Math.PI*2),l=t.range(9e4,22e4);i("anomaly",new b(Math.cos(c)*l,t.gaussian()*9e3,Math.sin(c)*l),{upgrade:a[o%a.length]})}for(const o of e.asteroidFields.slice(1)){const[c,l,h]=t.unitVector();i("cache",o.center.clone().add(new b(c,l,h).multiplyScalar(o.radius*.3)),{resources:24})}}restoreDiscovered(e){for(const t of this.sites)e.includes(t.id)&&(t.discovered=!0,t.signalSent=!0)}update(e,t){const n=this.game,i=n.player;if(i)for(const s of this.sites){if(s.orbit){const o=s.orbit,c=o.phase+t*o.speed;s.position.set(Math.cos(c)*o.radius,Math.sin(c*.7)*o.radius*Math.sin(o.incline)*.4,Math.sin(c)*o.radius).add(o.planet.group.position)}const a=s.position.distanceToSquared(i.position);a<$u*$u?(s.built||(s.built=pw[s.kind]()),s.inScene||(s.inScene=!0,this.game.engine.scene.add(s.built.group)),s.built.group.position.copy(s.position),s.built.animate(e,t)):s.inScene&&(s.inScene=!1,this.game.engine.scene.remove(s.built.group)),!s.signalSent&&a<Ku*Ku&&(s.signalSent=!0,n.events.emit("poi:signal",s),n.audio.playTone({type:"sine",freq:1180,freqEnd:880,duration:.5,gain:.16}),n.audio.playTone({type:"sine",freq:1770,freqEnd:1320,duration:.5,gain:.08})),!s.discovered&&a<Qu*Qu&&this._discover(s),s.inScene&&(s.kind==="station"||s.kind==="wreck")&&this._collide(s,i)}}_discover(e){const t=this.game;e.discovered=!0;let n;if(e.reward.upgrade){const i=t.player;i.upgrades[e.reward.upgrade]+=.12,n=`${e.reward.upgrade} systems enhanced`}else t.pickups.spawnBurst(e.position,e.reward.resources),n="salvage released";t.events.emit("poi:discovered",{site:e,title:e.name,subtitle:`${n}`}),t.audio.playTone({type:"sine",freq:523,duration:.7,gain:.22}),t.audio.playTone({type:"sine",freq:784,duration:.9,gain:.18,attack:.15})}_collide(e,t){const n=e.built.radius+t.radius,i=e.position.distanceToSquared(t.position);if(i>=n*n||i<1e-6)return;const s=Math.sqrt(i),a=this._normal.copy(t.position).sub(e.position).divideScalar(s);t.position.addScaledVector(a,n-s+.5);const o=t.velocity.dot(a);if(o<0){t.velocity.addScaledVector(a,-o*1.5);const c=-o;if(c>20){const l=Qe((c-20)*.4,4,30),h=t.applyDamage(l);this.game.events.emit("player:hit",{damage:l}),this.game.events.emit("camera:shake",.4),this.game.audio.playNoise({duration:.4,gain:.4,filterFreq:800,filterEnd:100}),h.destroyed&&this.game.events.emit("ship:destroyed",{ship:t,byPlayer:!1})}}}}const oa="starfall-frontier-save-v1",gw=5;class _w{read(e){try{return localStorage.getItem(e)}catch{return null}}write(e,t){try{return localStorage.setItem(e,t),!0}catch{return!1}}}class vw{constructor(e,t=new _w){this.game=e,this.adapter=t,this._pending=null,this._rev=0;const n=["poi:discovered","enemy:killed","player:respawned","pickup:collected","shop:purchase","crew:changed","ship:changed","onfoot:left","fleet:ship-lost","mission:completed"];for(const i of n)e.events.on(i,()=>this.requestSave());window.addEventListener("visibilitychange",()=>{document.hidden&&this.flush()}),window.addEventListener("pagehide",()=>this.flush())}load(){let e;try{e=JSON.parse(this.adapter.read(oa)??"null")}catch{e=null}if(!e)return;const t=this.game.player;if(typeof e.rev=="number"&&(this._rev=e.rev),typeof e.resources=="number"&&(t.resources=e.resources),typeof e.credits=="number"&&(t.credits=e.credits),e.inventory&&typeof e.inventory=="object"){t.inventory={};for(const i of SS)typeof e.inventory[i]=="number"&&(t.inventory[i]=e.inventory[i])}if(Array.isArray(e.crew)&&this.game.crew&&this.game.crew.restore(e.crew),e.ships&&Array.isArray(e.ships.owned)){const i=e.ships.owned.filter(a=>Vt[a]);t.ships.owned=i.length?i:["starter"];const s=Vt[e.ships.active]&&t.ships.owned.includes(e.ships.active)?e.ships.active:t.ships.owned[0];t.setShip(s)}if(e.hangarStock&&typeof e.hangarStock=="object")for(const i of["fighter","gunner"])typeof e.hangarStock[i]=="number"&&(t.hangarStock[i]=Math.max(0,Math.floor(e.hangarStock[i])));if(e.upgrades&&typeof e.upgrades=="object"){const i=["engine","shield","weapon"];if(typeof e.upgrades.engine=="number"){const s=t.upgradesFor(t.ships.active);for(const a of i)typeof e.upgrades[a]=="number"&&(s[a]=e.upgrades[a])}else for(const[s,a]of Object.entries(e.upgrades)){if(!Vt[s]||!a||typeof a!="object")continue;const o=t.upgradesFor(s);for(const c of i)typeof a[c]=="number"&&(o[c]=a[c])}t.upgrades=t.upgradesFor(t.ships.active)}(e.version??0)>=5&&typeof e.xp=="number"&&this.game.progression&&this.game.progression.setXp(e.xp),typeof e.missionIndex=="number"&&this.game.missions&&(this.game.missions.index=Math.max(0,Math.floor(e.missionIndex)));const n=Array.isArray(e.discoveredSites)?e.discoveredSites:Array.isArray(e.discovered)?e.discovered:null;n&&this.game.poi&&this.game.poi.restoreDiscovered(n)}serialize(){const e=this.game.player;return{version:gw,rev:++this._rev,savedAt:Date.now(),resources:e.resources,credits:e.credits,inventory:{...e.inventory},upgrades:e.upgradesByShip,crew:this.game.crew?this.game.crew.roster.map(t=>({role:t.role,name:t.name,stars:t.stars})):[],ships:{owned:[...e.ships.owned],active:e.ships.active},hangarStock:{...e.hangarStock},xp:this.game.progression?.xp??0,missionIndex:this.game.missions?.index??0,discoveredSites:this.game.poi?this.game.poi.sites.filter(t=>t.discovered).map(t=>t.id):[]}}requestSave(){this._pending||(this._pending=setTimeout(()=>{this._pending=null,this._write()},1500))}flush(){this._pending&&(clearTimeout(this._pending),this._pending=null),this._write()}_write(){this.game.player&&(this.game.creative||this.adapter.write(oa,JSON.stringify(this.serialize())))}reset(){this._pending&&(clearTimeout(this._pending),this._pending=null);try{this.adapter.write(oa,""),window.localStorage?.removeItem(oa)}catch{}}}function sr(r){return Math.round(28*Math.pow(Math.max(0,r-1),1.8))}function bw(r){const e=Math.max(0,r);let t=Math.max(1,Math.floor(Math.pow(e/28,1/1.8))+1);for(;sr(t+1)<=e;)t+=1;for(;t>1&&sr(t)>e;)t-=1;return t}class yw{constructor(e){this.game=e,e.progression=this,this.xp=0,this.level=1,e.events.on("combat:reward",({credits:t})=>{t>0&&this.addXp(8*Math.sqrt(t))}),e.events.on("mission:completed",({reward:t})=>{t>0&&this.addXp(6*Math.sqrt(t))}),e.events.on("ore:sold",({credits:t})=>{t>0&&this.addXp(2*Math.sqrt(t))})}update(){}addXp(e){if(e>0)for(this.xp+=Math.round(e);this.xp>=sr(this.level+1);)this.level+=1,this.game.events.emit("level:up",{level:this.level})}setXp(e){this.xp=Math.max(0,Math.round(e||0)),this.level=bw(this.xp)}levelProgress(){const e=sr(this.level),t=sr(this.level+1);return Math.min(1,(this.xp-e)/Math.max(1,t-e))}}class xw{constructor(e){this.game=e,this.initialized=!1,this.nodes=null,e.events.on("player:boost-start",()=>this._onBoostStart())}_init(){const e=this.game.audio;if(!e.ready)return;const t=e.ctx,n=t.createOscillator();n.type="sawtooth",n.frequency.value=52;const i=t.createOscillator();i.type="sawtooth",i.frequency.value=52*1.006;const s=t.createOscillator();s.type="sine",s.frequency.value=30;const a=t.createGain();a.gain.value=0;const o=t.createGain();o.gain.value=0;const c=t.createBiquadFilter();c.type="lowpass",c.frequency.value=220,c.Q.value=1.2,n.connect(a),i.connect(a),a.connect(c),s.connect(o),o.connect(e.buses.engine),c.connect(e.buses.engine),n.start(),i.start(),s.start();const l=e.createLoop({bus:"engine",filterFreq:500,gain:0});this.nodes={saw1:n,saw2:i,sub:s,oscGain:a,subGain:o,filter:c,wash:l},this.initialized=!0}_onBoostStart(){this.game.audio.playNoise({duration:.7,gain:.5,filterFreq:600,filterEnd:5200,attack:.04,bus:"engine"})}update(e){const t=this.game.audio;if(!t.ready||(this.initialized||this._init(),!this.nodes))return;const n=this.game.player;if(!n||!n.alive){this._setLevels(0,0,0,e);return}const i=Qe(Math.abs(this.game.input.state.throttle),0,1),s=Qe(n.speed/(240*Math.max(1,n.envSpeedScale)),0,1),a=n.boostActive?1:0,o=t.time,c=.08,l=46+s*74+a*26;this.nodes.saw1.frequency.setTargetAtTime(l,o,c),this.nodes.saw2.frequency.setTargetAtTime(l*1.006,o,c),this.nodes.sub.frequency.setTargetAtTime(24+s*30,o,c);const h=200+i*1500+a*1600;this.nodes.filter.frequency.setTargetAtTime(h,o,c),this._setLevels(.05+i*.16+a*.12,.1+i*.12+s*.06,i*.09+a*.15+s*.04,e)}_setLevels(e,t,n,i){const s=this.game.audio.time;this.nodes.oscGain.gain.setTargetAtTime(e,s,.09),this.nodes.subGain.gain.setTargetAtTime(t,s,.09),this.nodes.wash&&(this.nodes.wash.gain.gain.setTargetAtTime(n,s,.12),this.nodes.wash.filter.frequency.setTargetAtTime(400+n*5200,s,.12))}}const Ho=[[110,164.81,261.63],[98,146.83,246.94],[87.31,130.81,220],[110,174.61,261.63]],Mw=[440,523.25,587.33,659.25,783.99];class Sw{constructor(e){this.game=e,this.rng=new qt("music"),this.initialized=!1,this.chordIndex=0,this._chordTimer=8,this._melodyTimer=5}_init(){const e=this.game.audio,t=e.ctx;this.voices=[];for(let n=0;n<3;n++){const i=t.createOscillator();i.type="triangle";const s=t.createOscillator();s.type="sine",s.detune.value=7;const a=t.createGain();a.gain.value=0,i.connect(a),s.connect(a),a.connect(e.buses.music),i.start(),s.start(),this.voices.push({oscA:i,oscB:s,gain:a})}this.delay=t.createDelay(2),this.delay.delayTime.value=.65,this.feedback=t.createGain(),this.feedback.gain.value=.42,this.delay.connect(this.feedback),this.feedback.connect(this.delay),this.delay.connect(e.buses.music),this.drone=t.createOscillator(),this.drone.type="sawtooth",this.drone.frequency.value=55,this.droneFilter=t.createBiquadFilter(),this.droneFilter.type="lowpass",this.droneFilter.frequency.value=220,this.droneLfo=t.createOscillator(),this.droneLfo.frequency.value=2.2,this.droneLfoGain=t.createGain(),this.droneLfoGain.gain.value=.06,this.droneGain=t.createGain(),this.droneGain.gain.value=0,this.drone.connect(this.droneFilter),this.droneFilter.connect(this.droneGain),this.droneLfo.connect(this.droneLfoGain),this.droneLfoGain.connect(this.droneGain.gain),this.droneGain.connect(e.buses.music),this.drone.start(),this.droneLfo.start(),this._applyChord(0,.1),this.initialized=!0}_applyChord(e,t){const n=this.game.audio,i=Ho[e],s=n.time;this.voices.forEach((a,o)=>{a.oscA.frequency.setTargetAtTime(i[o],s,t),a.oscB.frequency.setTargetAtTime(i[o]*2.005,s,t);const c=.05+.02*Math.sin(e*2.1+o*1.7);a.gain.gain.setTargetAtTime(c,s,t)})}_playMelodyNote(){const e=this.game.audio,t=e.ctx,n=e.time,i=this.rng.pick(Mw),s=t.createOscillator();s.type="sine",s.frequency.value=i;const a=t.createGain();a.gain.setValueAtTime(0,n),a.gain.linearRampToValueAtTime(.06,n+.4),a.gain.exponentialRampToValueAtTime(.001,n+3.2),s.connect(a),a.connect(e.buses.music),a.connect(this.delay),s.start(n),s.stop(n+3.4),s.onended=()=>{s.disconnect(),a.disconnect()}}update(e){const t=this.game.audio;if(!t.ready)return;this.initialized||this._init(),this._chordTimer-=e,this._chordTimer<=0&&(this._chordTimer=18+this.rng.range(0,8),this.chordIndex=(this.chordIndex+(this.rng.chance(.5)?1:Ho.length-1))%Ho.length,this._applyChord(this.chordIndex,6)),this._melodyTimer-=e,this._melodyTimer<=0&&(this._melodyTimer=7+this.rng.range(0,9),this._inCombat()||this._playMelodyNote());const n=t.time;this.droneGain.gain.setTargetAtTime(this._inCombat()?.085:0,n,1.2);const i=this.game.universe?.playerContext.density??0;t.buses.music.gain.setTargetAtTime(.5-i*.25,n,.5)}_inCombat(){const e=this.game.enemies,t=this.game.player;if(!e||!t)return!1;for(const n of e.enemies)if((n.state==="chase"||n.state==="attack")&&n.position.distanceTo(t.position)<2200)return!0;return!1}}class ww{constructor(e){this.game=e;const t=document.getElementById("ui-root");this.el=document.createElement("div"),this.el.className="hud",this.el.innerHTML=`
      <div class="hud-status hud-panel">
        <div class="row">
          <div class="row-head"><span class="hud-label">Hull</span><span class="hud-value" data-el="hullText">100</span></div>
          <div class="hud-bar"><div class="fill hull" data-el="hullBar"></div></div>
        </div>
        <div class="row">
          <div class="row-head"><span class="hud-label">Shield</span><span class="hud-value" data-el="shieldText">100</span></div>
          <div class="hud-bar"><div class="fill shield" data-el="shieldBar"></div></div>
        </div>
      </div>

      <div class="hud-location">
        <div class="place" data-el="place">Deep Space</div>
        <div class="sub" data-el="placeSub"></div>
        <div class="credits">&#9672; <span data-el="credits">0</span> cr</div>
        <div class="credits">&#9650; LV <span data-el="level">1</span></div>
        <div class="resources">&#9671; <span data-el="resources">0</span></div>
        <div class="cargo" data-el="cargo"></div>
        <div class="fleet" data-el="fleet"></div>
        <div class="contacts" data-el="contacts"></div>
      </div>

      <div class="hud-flight">
        <div class="speed"><span data-el="speed">0</span> <small>m/s</small></div>
        <div class="alt" data-el="alt"></div>
      </div>

      <div class="hud-meters">
        <div class="meter">
          <div class="meter-head"><span class="hud-label">Boost</span></div>
          <div class="hud-bar"><div class="fill boost" data-el="boostBar"></div></div>
        </div>
        <div class="meter">
          <div class="meter-head"><span class="hud-label">Weapons</span></div>
          <div class="hud-bar"><div class="fill heat" data-el="heatBar"></div></div>
        </div>
      </div>

      <div class="hud-crosshair">
        <span class="side-l"></span><span class="side-r"></span><span class="dot"></span>
      </div>
      <div class="hud-hitmarker" data-el="hitmarker"><span></span><span></span><span></span><span></span></div>

      <div class="hud-banner" data-el="banner">
        <div class="title" data-el="bannerTitle"></div>
        <div class="subtitle" data-el="bannerSub"></div>
      </div>
      <div class="hud-alert" data-el="alert"></div>
      <div class="hud-prompt" data-el="prompt"></div>
      <div class="hud-warp" data-el="warp"></div>
      <div class="hud-landhint" data-el="landHint"></div>

      <canvas class="hud-radar" data-el="radar" width="236" height="236"></canvas>

      <div class="damage-vignette" data-el="vignette"></div>
      <div class="entry-glow" data-el="entryGlow"></div>
      <div class="underwater" data-el="underwater"></div>
      <div class="air-meter" data-el="airMeter"></div>
      <div class="reinforce-popup fleetcall-popup" data-el="fleetcallPopup">
        <div class="rp-title">Summon Your Fleet</div>
        <div class="rp-sub">Pick the ships that answer (max 50 total)</div>
        <div class="fc-rows" data-el="fleetcallRows"></div>
        <div class="rp-sub" data-el="fleetcallTotal">0 / 50 ships</div>
        <div class="rp-row">
          <button class="rp-btn primary" data-el="fleetcallGo">Summon</button>
          <button class="rp-btn" data-el="fleetcallCancel">Cancel</button>
        </div>
      </div>
      <div class="reinforce-popup" data-el="reinforcePopup">
        <div class="rp-title">Call Reinforcements</div>
        <div class="rp-sub">How many allied ships should answer? (1–40)</div>
        <input type="number" min="1" max="40" value="10" data-el="reinforceCount">
        <div class="rp-row">
          <button class="rp-btn primary" data-el="reinforceGo">Call them in</button>
          <button class="rp-btn" data-el="reinforceCancel">Cancel</button>
        </div>
      </div>
      <div class="hud-debug" data-el="debug"></div>
    `,t.appendChild(this.el),this.refs={};for(const l of this.el.querySelectorAll("[data-el]"))this.refs[l.dataset.el]=l;this._last={},this._bannerTimer=0,this._vignette=0,this._entryGlow=0,this._radial=new b,this.debugEnabled=new URLSearchParams(location.search).has("debug"),this.debugEnabled||(this.refs.debug.style.display="none"),e.events.on("player:hit",()=>{this._vignette=Math.min(1,this._vignette+.55)}),e.events.on("combat:hit-confirmed",l=>this._popHitmarker(l?.killed)),e.events.on("poi:discovered",l=>this.showBanner(l.title,l.subtitle)),e.events.on("poi:signal",()=>{this.showBanner("Unknown Signal Detected","investigate nearby coordinates",3.5)}),e.events.on("combat:contact",({count:l})=>{this.showBanner("Hostile Contacts",`${l} signatures approaching`,3)}),e.events.on("leviathan:contact",()=>{this.showBanner("⚠ OBSIDIAN LEVIATHAN ⚠","enemy fortress — its garrison is endless",5)}),e.events.on("leviathan:destroyed",()=>{this.showBanner("★ THE LEVIATHAN HAS FALLEN ★","the enemy hub is destroyed",6)}),e.events.on("combat:reward",({credits:l,name:h})=>{l>0&&this.showBanner(`+${l} cr`,`${h} destroyed`,1.6)}),this._missileWarn=!1,e.events.on("missile:incoming",()=>{this._missileWarn=!0,e.audio?.playTone?.({type:"square",freq:880,freqEnd:880,duration:.12,gain:.16})}),e.events.on("missile:cleared",()=>{this._missileWarn=!1}),e.events.on("missile:destroyed",()=>{this.showBanner("Missile Intercepted","",1.2)}),e.events.on("fleet:launched",l=>this.showBanner("Attack Ships Deployed",`${l} craft launched — Deploy/G again to recall · Focus/V directs fire`,2.8)),e.events.on("ship:changed",l=>{(l?.hangar??0)>0&&this.showBanner("Fleet Ready","press G — your ships deploy as a protective fleet around you",3.6)}),e.events.on("game:started",()=>{(e.player?.statMult?.hangar??0)>0&&this.showBanner("Fleet Ready","press G — your ships deploy as a protective fleet around you",3.6)});const n=[["aethelred","SF-200 Aethelred",1],["carrier","SF-110 Vanguard",3],["battleship","SF-85 Dreadnought",5],["sovereign","SF-100 Sovereign",20],["battlecruiser","SF-70 Bastion",20],["frigate","SF-50 Aegis",20],["explorer","SF-20 Gunship",25],["starter","SF-10 Sentinel",50]];this.refs.fleetcallRows.innerHTML=n.map(([l,h,u])=>`
      <label class="fc-row"><span>${h} <small>(max ${u})</small></span>
        <input type="number" min="0" max="${u}" value="0" data-fleet="${l}" data-max="${u}">
      </label>`).join("");const i=[...this.refs.fleetcallRows.querySelectorAll("input")],s=()=>i.reduce((l,h)=>{const u=parseInt(h.dataset.max,10),d=Math.max(0,Math.min(u,parseInt(h.value,10)||0));return l+d},0),a=()=>{const l=s();this.refs.fleetcallTotal.textContent=`${l} / 50 ships${l>50?" — TOO MANY":""}`,this.refs.fleetcallTotal.style.color=l>50?"#ff5d6c":""};for(const l of i)l.addEventListener("input",a);e.events.on("fleetcall:prompt",()=>{this.refs.fleetcallPopup.classList.add("visible"),e.paused=!0,a()});const o=()=>{this.refs.fleetcallPopup.classList.remove("visible"),e.paused=!1};this.refs.fleetcallGo.addEventListener("pointerdown",l=>{l.preventDefault();const h=[];let u=50;for(const d of i){const f=parseInt(d.dataset.max,10);let m=Math.max(0,Math.min(f,parseInt(d.value,10)||0));m=Math.min(m,u),u-=m;for(let _=0;_<m;_++)h.push(d.dataset.fleet)}if(!h.length){o();return}o(),e.events.emit("fleetcall:call",{variants:h}),this.showBanner("Fleet Answering",`${h.length} ships jumping to your position`,3.2)}),this.refs.fleetcallCancel.addEventListener("pointerdown",l=>{l.preventDefault(),o()}),e.events.on("reinforce:prompt",()=>{this.refs.reinforcePopup.classList.add("visible"),e.paused=!0,setTimeout(()=>this.refs.reinforceCount.focus(),50)});const c=()=>{this.refs.reinforcePopup.classList.remove("visible"),e.paused=!1};this.refs.reinforceGo.addEventListener("pointerdown",l=>{l.preventDefault();const h=Math.max(1,Math.min(40,parseInt(this.refs.reinforceCount.value,10)||10));c(),e.events.emit("reinforce:call",{count:h}),this.showBanner("Reinforcements Inbound",`${h} allied ships answering your call`,3)}),this.refs.reinforceCancel.addEventListener("pointerdown",l=>{l.preventDefault(),c()}),e.events.on("mission:allcomplete",()=>{this.showBanner("★ ALL 75 MISSIONS COMPLETE ★","a legend of the frontier",6)}),e.events.on("level:up",({level:l})=>{const h=pr.find(u=>u.unlockLevel===l);h?this.showBanner(`★ LEVEL ${l} — ${h.name.toUpperCase()} UNLOCKED ★`,"now available in the Ships tab",6):this.showBanner(`LEVEL ${l}`,"combat, missions and ore sales earn XP",2.5)}),e.events.on("mission:progress",({left:l,total:h})=>{this.showBanner("Mission Progress",`${h-l}/${h} targets destroyed`,1.6)}),e.events.on("system:entered",({name:l,from:h})=>{this.showBanner(`Entering the ${l} System`,`leaving ${h} behind — new worlds ahead`,4.5)}),e.events.on("mission:started",l=>{this.showBanner(`Mission ${l.index+1}`,`${l.label} — it just warped in ahead of you!`,3.6)}),e.events.on("mission:completed",({reward:l,label:h})=>{this.showBanner(`Mission Complete · +${l} cr`,h,3.4)}),e.events.on("mission:lost",()=>{this.showBanner("Mission Target Lost","restart it from the Exchange (T → Missions)",3)}),e.events.on("nav:toggled",l=>{this.showBanner(l?"Navigation Markers Hidden":"Navigation Markers Shown","press N to toggle",1.6)}),e.events.on("onfoot:air",({air01:l,under:h})=>{this.refs.underwater.classList.toggle("visible",h);const u=this.refs.airMeter;if(!h&&l>=1)u.classList.remove("visible");else{u.classList.add("visible");const d=8,f=Math.ceil(l*d);let m="";for(let _=0;_<d;_++)m+=`<span class="bubble${_<f?" full":""}"></span>`;u.innerHTML=m}}),e.events.on("onfoot:drowned",()=>{this.showBanner("You Drowned","your ore floats where you sank — swim back for the amber marker",4)}),e.events.on("onfoot:left",()=>{this.refs.underwater.classList.remove("visible"),this.refs.airMeter.classList.remove("visible")}),e.events.on("fleet:focus",l=>this.showBanner("Fleet: Focus Fire",`wing attacking Lv${l.stats?.level??"?"} ${l.stats?.displayName??"hostile"}`,2.4)),e.events.on("fleet:free",()=>this.showBanner("Fleet: Free Engage","wing hunting on its own",2)),e.events.on("fleet:no-wing",()=>this.showBanner("No Wing Deployed","press Deploy (G) to launch attack ships first",2.2)),e.events.on("fleet:recalled",()=>this.showBanner("Attack Ships Recalled","wing docked",1.8)),e.events.on("fleet:ship-lost",()=>this.showBanner("Attack Ship Down","a fighter was destroyed",2)),e.events.on("fleet:denied",()=>this.showBanner("No Hangar","only a Dreadnought or Carrier can deploy attack ships",2.4)),e.events.on("fleet:empty",()=>this.showBanner("Hangar Empty","buy attack craft at the Exchange — press T, Hangar tab",3)),e.events.on("onfoot:prompt",l=>this.setPrompt(l)),e.events.on("landing:hint",l=>{this.refs.landHint.textContent=l,this.refs.landHint.classList.toggle("visible",l.length>0)}),e.events.on("player:autolanded",l=>{this.showBanner("Touchdown",`${l.descriptor.name} — press E to disembark`,2.5)}),e.events.on("warp:dropped",({reason:l,planet:h})=>{l==="arrival"&&h&&this.showBanner("Hyperdrive Drop",`Arriving at ${h.descriptor.name}`,2)}),e.events.on("onfoot:entered",l=>{this.showBanner("Disembarked",`Exploring ${l.descriptor.name} on foot`,2.5)}),e.events.on("onfoot:left",()=>{this.setPrompt(""),this.showBanner("Aboard","Systems nominal",1.8)})}_setText(e,t){this._last[e]!==t&&(this._last[e]=t,this.refs[e].textContent=t)}_setBar(e,t){const n=Math.max(0,Math.min(1,t)),i=Math.round(n*200)/200;this._last[e]!==i&&(this._last[e]=i,this.refs[e].style.transform=`scaleX(${i})`)}_popHitmarker(e){const t=this.refs.hitmarker;t.classList.remove("pop"),t.classList.toggle("kill",!!e),t.offsetWidth,t.classList.add("pop")}showBanner(e,t="",n=4){this.refs.bannerTitle.textContent=e,this.refs.bannerSub.textContent=t,this.refs.banner.classList.add("visible"),this._bannerTimer=n}setAlert(e){this._last.alertText!==e&&(this._last.alertText=e,this.refs.alert.textContent=e,this.refs.alert.classList.toggle("active",e.length>0))}setPrompt(e){this._last.promptText!==e&&(this._last.promptText=e,this.refs.prompt.textContent=e,this.refs.prompt.classList.toggle("visible",e.length>0))}update(e){const t=this.game.player;if(!t)return;this._setText("speed",String(Math.round(t.speed))),this._setText("hullText",String(Math.ceil(t.hull))),this._setText("shieldText",String(Math.ceil(t.shield))),this._setText("resources",String(t.resources)),this._setText("credits",this.game.creative?"∞":String(t.credits)),this._setText("level",String(this.game.progression?.level??1));const n=this.game.mode==="onfoot",i=this.game.onfoot?this.game.onfoot.carrying:0;this._setText("cargo",i>0?`▰ ${i} ore`:"");const s=this.game.fleet?.escorts.length??0;this._setText("fleet",s>0?`⬡ wing ${s}`:""),this._setBar("hullBar",t.hull01),this._setBar("shieldBar",t.shield01),this._setBar("boostBar",t.boost01);const a=this.game.weapons;this._setBar("heatBar",a?1-a.playerHeat01:1);const c=this.game.universe?.playerContext;n&&this.game.onfoot?.planet?(this._setText("place",this.game.onfoot.planet.descriptor.name),this._setText("placeSub","On Foot"),this._setText("alt","")):c&&c.planet?(this._setText("place",c.planet.descriptor.name),this._setText("placeSub",c.inAtmosphere?"Atmosphere":"Orbital Space"),this._setText("alt",`ALT ${Zu(c.altitude)}`)):(this._setText("place","Deep Space"),this._setText("placeSub",""),this._setText("alt",""));let l=0;if(this.game.enemies)for(const m of this.game.enemies.enemies)m.position.distanceTo(t.position)<3500&&l++;this._setText("contacts",l>0?`▲ ${l} hostile${l>1?"s":""}`:"");let h="";const u=this.game.weapons?.incoming?.length||0;this._missileWarn&&u>0&&t.alive&&(h=u>1?`⚠ ${u} Missiles — press C`:"⚠ Missile Incoming — press C"),!h&&c&&c.planet&&t.alive&&c.altitude<380&&(this._radial.copy(t.position).sub(c.planet.group.position).normalize(),t.velocity.dot(this._radial)<-70&&(h="Terrain — Pull Up")),!h&&t.alive&&t.shield<=0&&t.hull01<.6&&(h=t.hull01<.3?"Hull Critical":"Shields Down"),this.setAlert(h);const d=this.game.warp;if(!n&&d&&d.target){const m=d.target.descriptor.name;if(d.state==="charging")this._setText("warp",`⟢ HYPERDRIVE CHARGING ${Math.round(d.charge01*100)}%`);else if(d.engaged)this._setText("warp",`⟢ HYPERDRIVE ${(t.speed/1e3).toFixed(1)} km/s — steer with the nose · [J] drop`);else{const _=Math.max(0,d.targetDistance);this._setText("warp",`◎ ${m} · ${Zu(_)} · [J] hyperdrive · [B] next planet`)}}else this._setText("warp","");this._bannerTimer>0&&(this._bannerTimer-=e,this._bannerTimer<=0&&this.refs.banner.classList.remove("visible")),this._vignette>.005?(this._vignette*=Math.exp(-2.4*e),this.refs.vignette.style.opacity=this._vignette.toFixed(3)):this._last.vignetteZero!==!0&&(this.refs.vignette.style.opacity="0"),this._last.vignetteZero=this._vignette<=.005;const f=this.game.entryHeat||0;if(Math.abs(f-this._entryGlow)>.01&&(this._entryGlow=f,this.refs.entryGlow.style.opacity=f.toFixed(3)),this.debugEnabled){const m=this.game.quality;this.refs.debug.textContent=`fps ${m.fps.toFixed(0)}  scale ${m.scale.toFixed(2)}  draws ${this.game.engine.renderer.info.render.calls}  tris ${(this.game.engine.renderer.info.render.triangles/1e3).toFixed(0)}k`}}}function Zu(r){return r>=1e4?`${(r/1e3).toFixed(0)} km`:r>=1e3?`${(r/1e3).toFixed(1)} km`:`${Math.round(r)} m`}const Go=3200,Tw=4e4,Ew={terran:"#5fae6b",ocean:"#4f8fd0",ice:"#a8c6e0",desert:"#cf9a55",volcanic:"#d05a3a",rocky:"#9a938c"},Aw={scout:2.4,fighter:2.8,heavy:3.6,cruiser:4.6,destroyer:6.5,warship:5.4,redcarrier:6.2};class Rw{constructor(e,t){this.game=e,this.canvas=t,this.ctx=t.getContext("2d"),this._accumulator=0,this._quatInv=null,this._local=null}update(e,t){if(this._accumulator+=e,this._accumulator<.05)return;this._accumulator=0;const n=this.game,i=n.player;if(!i)return;this._quatInv||(this._quatInv=i.quaternion.clone(),this._local=i.position.clone()),this._quatInv.copy(i.quaternion).invert();const s=this.ctx,a=this.canvas.width,o=a/2;s.clearRect(0,0,a,a),s.strokeStyle="rgba(134, 231, 255, 0.18)",s.lineWidth=1;for(const l of[.33,.66,.98])s.beginPath(),s.arc(o,o,o*l,0,Math.PI*2),s.stroke();s.beginPath(),s.moveTo(o,4),s.lineTo(o,a-4),s.moveTo(4,o),s.lineTo(a-4,o),s.stroke(),s.fillStyle="rgba(134, 231, 255, 0.3)",s.beginPath(),s.moveTo(o,10),s.lineTo(o-5,20),s.lineTo(o+5,20),s.fill();for(const l of n.universe?.planets??[]){this._toLocal(l.group.position,i);const h=Math.hypot(this._local.x,this._local.y,this._local.z);if(h-l.radius>Tw)continue;const u=Math.atan2(this._local.x,-this._local.z),d=Ew[l.descriptor.archetype]??"#888";s.strokeStyle=d,s.lineWidth=3.4;const f=Math.min(.7,Math.atan2(l.radius,h)*1.4+.06);s.beginPath(),s.arc(o,o,o-3,u-Math.PI/2-f,u-Math.PI/2+f),s.stroke()}const c=.55+Math.sin(t*5)*.45;for(const l of n.poi?.sites??[]){if(!l.signalSent)continue;this._toLocal(l.position,i);const h=l.discovered?.4:c;this._blip(s,o,`rgba(134, 231, 255, ${h.toFixed(2)})`,2.6,!0)}for(const l of n.enemies?.enemies??[]){if(l.stats?.apex)continue;this._toLocal(l.position,i);const h=Aw[l.type]??2.6;this._blip(s,o,"rgba(255, 93, 108, 0.95)",h,!1)}for(const l of n.enemies?.enemies??[]){if(!l.stats?.apex)continue;this._toLocal(l.position,i);const h=Math.hypot(this._local.x,this._local.y,this._local.z),u=Math.atan2(this._local.x,-this._local.z),d=.75+Math.sin(t*2.2)*.25;s.strokeStyle=`rgba(255, 47, 63, ${d.toFixed(2)})`,s.lineWidth=5;const f=Math.min(.6,Math.atan2(2600,Math.max(h,1))*1.4+.09);s.beginPath(),s.arc(o,o,o-3,u-Math.PI/2-f,u-Math.PI/2+f),s.stroke()}for(const l of n.fleet?.escorts??[])this._toLocal(l.position,i),this._blip(s,o,"rgba(143, 225, 176, 0.95)",2.6,!1);for(const l of n.traffic?.ships??[])this._toLocal(l.position,i),this._blip(s,o,"rgba(96, 170, 255, 0.9)",2.6,!1);s.fillStyle="#cfeeff",s.beginPath(),s.arc(o,o,2.4,0,Math.PI*2),s.fill()}_toLocal(e,t){this._local.copy(e).sub(t.position).applyQuaternion(this._quatInv)}_blip(e,t,n,i,s){let a=this._local.x/Go,o=-this._local.z/Go;const c=Math.hypot(a,o),l=c>.95;l&&(a=a/c*.95,o=o/c*.95);const h=t+a*t,u=t-o*t;if(e.fillStyle=n,e.strokeStyle=n,!l){const d=Math.max(-14,Math.min(14,this._local.y/Go*40));Math.abs(d)>2&&(e.lineWidth=1,e.beginPath(),e.moveTo(h,u),e.lineTo(h,u+d),e.stroke())}e.beginPath(),s?(e.save(),e.translate(h,u),e.rotate(Math.PI/4),e.fillRect(-i,-i,i*2,i*2),e.restore()):(e.arc(h,u,i,0,Math.PI*2),e.fill())}}const Cw=12e3,Pw=6e3,Ju=2600;class Lw{constructor(e){this.game=e;const t=document.getElementById("ui-root");this.canvas=document.createElement("canvas"),this.canvas.className="hud-targets",t.insertBefore(this.canvas,t.firstChild),this.ctx=this.canvas.getContext("2d"),this._resize=this._resize.bind(this),window.addEventListener("resize",this._resize),this._resize(),window.addEventListener("keydown",n=>{n.code!=="KeyN"||n.repeat||n.ctrlKey||n.metaKey||(e.navHidden=!e.navHidden,e.events.emit("nav:toggled",e.navHidden))}),this._v=new b,this._fwd=new b,this._toObj=new b}_resize(){this.w=window.innerWidth,this.h=window.innerHeight,this.canvas.width=this.w,this.canvas.height=this.h}update(e,t){const n=this.ctx;n.clearRect(0,0,this.w,this.h);const i=this.game,s=i.player;if(i.paused||!s||!s.alive)return;if(i.mode==="onfoot"){const d=i.engine.camera,f=this._screen(s.position,d),m="rgba(134,231,255,0.9)";if(f.onScreen){n.strokeStyle=m,n.lineWidth=1.4,n.beginPath(),n.arc(f.x,f.y,10+2*Math.sin(t*3),0,Math.PI*2),n.stroke();const g=s.position.distanceTo(d.position);this._label(n,f.x,f.y-18,`YOUR SHIP · ${Math.round(g)} m`,m,0)}else this._drawArrow(n,f.x,f.y,m),this._label(n,this.w/2,34,"⬥ ship is off-screen — follow the arrow",m,0);const _=i.onfoot?.oreBag;if(_&&_.planet===i.onfoot.planet){this._toObj.copy(_.local).add(_.planet.group.position);const g=this._screen(this._toObj,d),p="rgba(255,205,90,0.95)";if(g.onScreen){n.strokeStyle=p,n.lineWidth=1.6,n.beginPath(),n.arc(g.x,g.y,9+2.5*Math.sin(t*4),0,Math.PI*2),n.stroke();const y=this._toObj.distanceTo(d.position);this._label(n,g.x,g.y-16,`YOUR ORE · ${Math.round(y)} m`,p,0)}else this._drawArrow(n,g.x,g.y,p)}return}if(i.mode!=="flight")return;const a=i.engine.camera;a.getWorldDirection(this._fwd);const o=this.h/2/Math.tan(a.fov*Math.PI/180/2),c=i.weapons?.assistTarget??null;for(const d of i.enemies?.enemies??[]){d.hitFlash>0&&(d.hitFlash-=e);const f=d.position.distanceTo(a.position);if(f>Cw||d.stats?.apex&&f>Ju)continue;const m=this._screen(d.position,a);m.onScreen?this._drawBox(n,m.x,m.y,d,f,o,t,d===c):this._drawArrow(n,m.x,m.y,"rgba(255,90,105,0.9)")}for(const d of this._friendlies()){const f=d.position.distanceTo(a.position);if(f>Pw)continue;const m=this._screen(d.position,a);m.onScreen&&this._drawFriendlyBox(n,m.x,m.y,d,f,o)}const l=i.input.mouse;if(l.active&&!i.input.touchActive){const d=c?"rgba(255,120,130,0.95)":"rgba(134,231,255,0.85)";n.strokeStyle=d,n.fillStyle=d,n.lineWidth=1.4,n.beginPath(),n.arc(l.px,l.py,c?11:8,0,Math.PI*2),n.stroke(),n.beginPath(),n.arc(l.px,l.py,1.6,0,Math.PI*2),n.fill()}for(const d of i.weapons?.incoming??[]){const f=this._screen(d.mesh.position,a);f.onScreen?this._drawMissileMark(n,f.x,f.y,t):this._drawArrow(n,f.x,f.y,"rgba(255,170,60,0.95)")}const h=i.leviathan?.hub;if(h?.alive&&!i.navHidden){const d=h.position.distanceTo(a.position);if(d>Ju){const f=this._screen(h.position,a),m="rgba(255,86,100,0.95)",_=`☠ LEVIATHAN ${d>2e3?Math.round(d/1e3)+" km":Math.round(d)+" m"}`;if(!f.onScreen)this._drawArrow(n,f.x,f.y,m),this._label(n,f.x,f.y,_,m,16);else{n.strokeStyle=m,n.lineWidth=1.4;const g=10+2*Math.sin(t*3);n.beginPath(),n.moveTo(f.x,f.y-g),n.lineTo(f.x+g,f.y),n.lineTo(f.x,f.y+g),n.lineTo(f.x-g,f.y),n.closePath(),n.stroke(),this._label(n,f.x,f.y-20,_,m,0)}}}const u=i.warp;if(u&&u.target&&!i.navHidden){const d=this._screen(u.target.group.position,a),f="rgba(134,231,255,0.95)";d.onScreen?(n.strokeStyle=f,n.lineWidth=1.4,n.beginPath(),n.arc(d.x,d.y,12+2*Math.sin(t*3),0,Math.PI*2),n.stroke(),this._label(n,d.x,d.y-20,u.target.descriptor.name,f,0)):(this._drawArrow(n,d.x,d.y,f),this._label(n,d.x,d.y,u.target.descriptor.name,f,16))}}*_friendlies(){for(const e of this.game.fleet?.escorts??[])e.alive&&(yield e);for(const e of this.game.traffic?.ships??[])yield e}_drawFriendlyBox(e,t,n,i,s,a){const o=Math.max(10,Math.min(160,i.radius/s*a*1.7));e.strokeStyle="rgba(96,170,255,0.85)",e.lineWidth=1.4;const c=o*.4;for(const[l,h]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const u=t+l*o,d=n+h*o;e.beginPath(),e.moveTo(u,d-h*c),e.lineTo(u,d),e.lineTo(u-l*c,d),e.stroke()}if(s<3200){const l=i.isEscort?i.role==="scout"?"SCOUT":"GUARD":(i.callsign??"ALLY").toUpperCase();e.font="10px ui-monospace, monospace",e.fillStyle="rgba(140,195,255,0.9)",e.textAlign="center",e.fillText(l,t,n-o-6)}}_label(e,t,n,i,s,a){e.font="11px ui-monospace, monospace",e.fillStyle=s,e.textAlign="center",e.fillText(i,t,n+a)}_screen(e,t){this._v.copy(e).project(t);let n=this._v.x,i=this._v.y;const s=this._v.z>1;if(s&&(n=-n,i=-i),!s&&n>=-1&&n<=1&&i>=-1&&i<=1)return{onScreen:!0,x:(n*.5+.5)*this.w,y:(-i*.5+.5)*this.h};const o=.92,c=Math.max(Math.abs(n),Math.abs(i),.001);return n=n/c*o,i=i/c*o,{onScreen:!1,x:(n*.5+.5)*this.w,y:(-i*.5+.5)*this.h}}_drawBox(e,t,n,i,s,a,o,c=!1){const l=Math.max(14,Math.min(240,i.radius/s*a*1.7)),h=i.type==="destroyer"||i.stats?.apex,u=h?.6+.4*Math.sin(o*6):1,d=(i.hitFlash??0)>0;e.strokeStyle=d?"rgba(255,245,235,1)":c?"rgba(255,150,160,1)":`rgba(255,90,105,${(.9*u).toFixed(2)})`,e.lineWidth=d?3.2:c?2.6:h?2.4:1.6;const f=l*.4;for(const[p,y]of[[-1,-1],[1,-1],[-1,1],[1,1]]){const x=t+p*l,v=n+y*l;e.beginPath(),e.moveTo(x,v-y*f),e.lineTo(x,v),e.lineTo(x-p*f,v),e.stroke()}const m=`Lv${i.stats.level} ${i.stats.displayName}`;e.font="11px ui-monospace, monospace",e.fillStyle=`rgba(255,140,150,${(.95*u).toFixed(2)})`,e.textAlign="center",e.fillText(m,t,n-l-8);const _=Math.max(30,l*1.4),g=Math.max(0,i.hull/i.hullMax);e.fillStyle="rgba(255,90,105,0.25)",e.fillRect(t-_/2,n-l-5,_,3),e.fillStyle="rgba(255,90,105,0.9)",e.fillRect(t-_/2,n-l-5,_*g,3)}_drawMissileMark(e,t,n,i){const s=8+2*Math.sin(i*12);e.strokeStyle="rgba(255,170,60,0.95)",e.lineWidth=2,e.beginPath(),e.moveTo(t,n-s),e.lineTo(t+s,n),e.lineTo(t,n+s),e.lineTo(t-s,n),e.closePath(),e.stroke()}_drawArrow(e,t,n,i){const s=this.w/2,a=this.h/2,o=Math.atan2(n-a,t-s);e.save(),e.translate(t,n),e.rotate(o),e.fillStyle=i,e.beginPath(),e.moveTo(14,0),e.lineTo(-9,-8),e.lineTo(-9,8),e.closePath(),e.fill(),e.restore()}}const Vo=.15,Dw=[{key:"engine",label:"Engines",blurb:"Thrust + top speed"},{key:"weapon",label:"Weapons",blurb:"Laser damage"},{key:"shield",label:"Shields",blurb:"Shield capacity + regen"}];class Iw{constructor(e){this.game=e,this.isOpen=!1,this.tab="sell",this.recruits=[];const t=document.getElementById("ui-root");this.fab=document.createElement("button"),this.fab.className="trade-fab",this.fab.textContent="⛃ Trade",this.fab.addEventListener("pointerdown",n=>{n.preventDefault(),this.open()}),t.appendChild(this.fab),this._setFab(!1),this.el=document.createElement("div"),this.el.className="shop-screen hidden",this.el.innerHTML=`
      <div class="shop-panel">
        <div class="shop-head">
          <div class="shop-title">Outpost Exchange</div>
          <div class="shop-credits">◈ <span data-el="shopCredits">0</span> cr</div>
          <button class="shop-close" data-el="shopClose">✕</button>
        </div>
        <div class="shop-tabs">
          <button class="shop-tab" data-tab="sell">Sell Ore</button>
          <button class="shop-tab" data-tab="upgrades">Upgrades</button>
          <button class="shop-tab" data-tab="ships">Ships</button>
          <button class="shop-tab" data-tab="missions">Missions</button>
          <button class="shop-tab" data-tab="hangar">Hangar</button>
          <button class="shop-tab" data-tab="crew">Crew</button>
          <button class="shop-tab" data-tab="repair">Repair</button>
        </div>
        <div class="shop-body" data-el="shopBody"></div>
      </div>
    `,t.appendChild(this.el),this.refs={};for(const n of this.el.querySelectorAll("[data-el]"))this.refs[n.dataset.el]=n;this.refs.shopClose.addEventListener("pointerdown",n=>{n.preventDefault(),this.close()});for(const n of this.el.querySelectorAll(".shop-tab"))n.addEventListener("pointerdown",i=>{i.preventDefault(),this.tab=n.dataset.tab,this._render()});this.refs.shopBody.addEventListener("pointerdown",n=>{const i=n.target.closest("[data-action]");i&&(n.preventDefault(),this._action(i.dataset.action,i.dataset.arg))}),this._onKey=n=>{n.code==="Escape"&&this.close()},e.events.on("game:started",()=>this._setFab(!0)),e.events.on("player:died",()=>this._setFab(!1)),e.events.on("player:respawned",()=>this._setFab(!0)),e.events.on("shop:open",()=>this.open())}update(){this.isOpen||this.game.input.consumeTrade()&&this.open()}open(){this.isOpen||this.game.paused||(this.recruits.length===0&&this._refillRecruits(),this.isOpen=!0,this.game.paused=!0,this._setFab(!1),this.el.classList.remove("hidden"),window.addEventListener("keydown",this._onKey),this.game.audio?.playTone?.({type:"sine",freq:440,freqEnd:620,duration:.16,gain:.14}),this._render())}close(){this.isOpen&&(this.isOpen=!1,this.game.paused=!1,this._setFab(!0),this.el.classList.add("hidden"),window.removeEventListener("keydown",this._onKey),this.game.audio?.playTone?.({type:"sine",freq:620,freqEnd:440,duration:.16,gain:.12}),this.game.events.emit("shop:closed"))}_setFab(e){this.fab.classList.toggle("visible",e)}_render(){const e=this.game.player;this.refs.shopCredits.textContent=this.game.creative?"∞":String(e.credits);for(const t of this.el.querySelectorAll(".shop-tab"))t.classList.toggle("active",t.dataset.tab===this.tab);this.tab==="sell"?this.refs.shopBody.innerHTML=this._renderSell():this.tab==="upgrades"?this.refs.shopBody.innerHTML=this._renderUpgrades():this.tab==="ships"?this.refs.shopBody.innerHTML=this._renderShips():this.tab==="missions"?this.refs.shopBody.innerHTML=this._renderMissions():this.tab==="hangar"?this.refs.shopBody.innerHTML=this._renderHangar():this.tab==="crew"?this.refs.shopBody.innerHTML=this._renderCrew():this.refs.shopBody.innerHTML=this._renderRepair()}_shipFeatures(e){const t=[`Level ${e.level}`,`hull ×${e.hull}`,`shield ×${e.shield}`,`engine ×${e.engine}`,`crew ${e.crew}`];return e.weapon&&t.push(`gun ×${e.weapon}`),e.turrets&&t.push(`${e.turrets} gunner turrets`),e.hangar&&t.push(`hangar for ${e.hangar} fighters`),e.gunnerHangar&&t.push(`+${e.gunnerHangar} gunner-ship bays`),e.reinforce&&t.push("SPECIAL: press G to call 1-40 allied reinforcements"),e.noLanding&&t.push("too large to land"),e.fleetCall&&t.push("SPECIAL: press G to summon a hand-picked fleet (up to 50 ships)"),e.unlockLevel>1&&t.push(`unlocks at level ${e.unlockLevel}`),t.join(" · ")}_renderShips(){const e=this.game.player,t=this.game.progression?.level??1;return[...pr].sort((i,s)=>i.unlockLevel-s.unlockLevel).map(i=>{const s=e.ships.owned.includes(i.id),a=e.ships.active===i.id,o=this._afford(i.cost);if(i.unlockLevel>t&&!s&&!this.game.creative){const l=Math.round(t/i.unlockLevel*100);return`
      <div class="shop-row locked" title="${this._shipFeatures(i)}">
        <span class="shop-row-name">🔒 ${i.name}</span>
        <span class="shop-row-meta">unlocks at level ${i.unlockLevel}
          <span class="ship-progress"><span class="ship-progress-fill" style="width:${l}%"></span></span>
          you are level ${t}
        </span>
        <button class="shop-btn disabled">Locked</button>
      </div>`}const c=a?'<button class="shop-btn disabled">Active</button>':s?`<button class="shop-btn" data-action="selectShip" data-arg="${i.id}">Select</button>`:`<button class="shop-btn ${o?"primary":"disabled"}" data-action="buyShip" data-arg="${i.id}">Buy · ${i.cost} cr</button>`;return`
        <div class="shop-row" title="${this._shipFeatures(i)}">
          <span class="shop-row-name">${i.name} <small>Lv ${i.level}</small></span>
          <span class="shop-row-meta">hull ×${i.hull} · shd ×${i.shield} · crew ${i.crew}${i.turrets?` · ⌖${i.turrets} turrets`:""}${i.hangar?` · ⬡${i.hangar} hangar`:""}</span>
          ${c}
        </div>`}).join("")}_renderSell(){const e=this.game.player.inventory,t=Jt.filter(i=>(e[i.id]||0)>0).map(i=>{const s=e[i.id],a=s*i.value;return`
        <div class="shop-row">
          <span class="ore-dot" style="background:#${i.color.toString(16).padStart(6,"0")}"></span>
          <span class="shop-row-name">${i.name}</span>
          <span class="shop-row-meta">×${s} · ${i.value} cr ea</span>
          <button class="shop-btn" data-action="sell" data-arg="${i.id}">Sell ${a} cr</button>
        </div>`}).join(""),n=Jt.reduce((i,s)=>i+(e[s.id]||0)*s.value,0);return t?t+`
      <div class="shop-row shop-total">
        <span class="shop-row-name">Sell Everything</span>
        <span class="shop-row-meta"></span>
        <button class="shop-btn primary" data-action="sellAll" data-arg="">Sell All · ${n} cr</button>
      </div>`:'<div class="shop-empty">No ore in the hold. Land on a planet, disembark (E) and mine.</div>'}_renderUpgrades(){const e=this.game.player;return Dw.map(t=>{const n=e.upgrades[t.key],i=Math.round((n-1)/Vo),s=this._upgradeCost(i),a=this._afford(s);return`
        <div class="shop-row">
          <span class="shop-row-name">${t.label} <small>Lv ${i}</small></span>
          <span class="shop-row-meta">${t.blurb} · ×${n.toFixed(2)}</span>
          <button class="shop-btn ${a?"":"disabled"}" data-action="upgrade" data-arg="${t.key}">
            ${a?`Upgrade · ${s} cr`:`${s} cr`}
          </button>
        </div>`}).join("")}_refillRecruits(){this.recruits=Array.from({length:4},()=>vf.makeRecruit())}_stars(e){return"★".repeat(e)+'<span style="opacity:.3">'+"★".repeat(5-e)+"</span>"}_renderCrew(){const e=this.game.crew,t=e?e.roster:[],n=e?e.capacity:0,i=t.length?t.map(o=>`
        <div class="shop-row">
          <span class="shop-row-name">${ed(o.role)} <small>${o.name}</small></span>
          <span class="shop-row-meta">${this._stars(o.stars)}</span>
          <button class="shop-btn" data-action="fireCrew" data-arg="${o.id}">Dismiss</button>
        </div>`).join(""):'<div class="shop-empty">No crew aboard. Hire an Engineer to auto-repair, or a Gunner to auto-fire.</div>',s=t.length>=n,a=this.recruits.map((o,c)=>{const l=Pu(o.stars),h=this._afford(l)&&!s;return`
        <div class="shop-row">
          <span class="shop-row-name">${ed(o.role)} <small>${o.name}</small></span>
          <span class="shop-row-meta">${this._stars(o.stars)}</span>
          <button class="shop-btn ${h?"":"disabled"}" data-action="hireCrew" data-arg="${c}">
            ${s?"Full":`Hire · ${l} cr`}
          </button>
        </div>`}).join("");return`<div class="shop-section">Aboard (${t.length}/${n})</div>${i}
      <div class="shop-section">Available Recruits</div>${a}`}_renderMissions(){const e=this.game.missions;return e?e.completedAll?'<div class="shop-empty">All contracts complete, commander. More coming soon.</div>':e.ladder.map((t,n)=>{const i=n<e.index,s=n===e.index,a=s&&!!e.active,o=s&&e.wrongShip(),c=i?'<button class="shop-btn disabled">Complete ✓</button>':a?'<button class="shop-btn disabled">In progress…</button>':o?'<button class="shop-btn disabled">Requires SF-10 Sentinel</button>':s?'<button class="shop-btn primary" data-action="startMission" data-arg="">Start Mission</button>':'<button class="shop-btn disabled">Locked</button>';return`
      <div class="shop-row">
        <span class="shop-row-name">Mission ${n+1}</span>
        <span class="shop-row-meta">${t.label} · reward ${t.reward} cr</span>
        ${c}
      </div>`}).join(""):'<div class="shop-empty">No contracts available.</div>'}_renderHangar(){const e=this.game.player,t=e.hangarStock,n=e.statMult?.hangar??0,i=e.statMult?.gunnerHangar??0,s=[{key:"fighter",name:"Attack Fighter",desc:"light hangar craft (Sentinel hull)",cost:60,cap:n,action:"buyFighter"},{key:"gunner",name:"Gunner Ship",desc:"heavy escort (Aegis hull, 1.5× gun)",cost:240,cap:i,action:"buyGunner"}];return(n<=0?'<div class="shop-empty">Fly a carrier-class ship (Dreadnought, Vanguard or Aethelred) to launch these. You can still stock up now.</div>':"")+s.map(o=>{const c=o.cap>0?o.cap:o.key==="fighter"?15:5,l=t[o.key]??0,h=l>=c,u=this._afford(o.cost),d=h?'<button class="shop-btn disabled">Slots full</button>':`<button class="shop-btn ${u?"primary":"disabled"}" data-action="${o.action}" data-arg="">Buy · ${o.cost} cr</button>`;return`
      <div class="shop-row">
        <span class="shop-row-name">${o.name}</span>
        <span class="shop-row-meta">${o.desc} · ${l}/${c} slots</span>
        ${d}
      </div>`}).join("")}_buyHangarCraft(e,t,n){const s=this.game.player.hangarStock;if((s[e]??0)>=n){this._deny();return}if(!this._afford(t)){this._deny();return}this._spend(t),s[e]=(s[e]??0)+1,this._chime(),this.game.events.emit("shop:purchase")}_renderRepair(){const e=this.game.player,t=Math.ceil(e.hullMax-e.hull),n=Math.ceil(t*.8);if(t<=0)return'<div class="shop-empty">Hull is at full integrity.</div>';const i=this._afford(n);return`
      <div class="shop-row">
        <span class="shop-row-name">Hull Repair</span>
        <span class="shop-row-meta">${Math.ceil(e.hull)}/${e.hullMax} · ${t} dmg</span>
        <button class="shop-btn ${i?"":"disabled"}" data-action="repair" data-arg="">
          ${i?`Repair · ${n} cr`:`${n} cr`}
        </button>
      </div>`}_upgradeCost(e){return 40+e*35}_afford(e){return this.game.creative||this.game.player.credits>=e}_spend(e){this.game.creative||(this.game.player.credits-=e)}_action(e,t){this.game.player,e==="sell"?this._sell(t):e==="sellAll"?this._sellAll():e==="upgrade"?this._upgrade(t):e==="repair"?this._repair():e==="hireCrew"?this._hireCrew(Number(t)):e==="fireCrew"?this._fireCrew(Number(t)):e==="buyShip"?this._buyShip(t):e==="startMission"?this.game.missions?.start()?this.close():this._deny():e==="buyFighter"?this._buyHangarCraft("fighter",60,this.game.player.statMult?.hangar>0?this.game.player.statMult.hangar:15):e==="buyGunner"?this._buyHangarCraft("gunner",240,this.game.player.statMult?.gunnerHangar>0?this.game.player.statMult.gunnerHangar:5):e==="selectShip"&&this._selectShip(t),this._render()}_buyShip(e){const t=this.game.player,n=pr.find(i=>i.id===e);if(!(!n||t.ships.owned.includes(e))){if(n.unlockLevel>(this.game.progression?.level??1)&&!this.game.creative){this._deny();return}if(!this._afford(n.cost)){this._deny();return}this._spend(n.cost),t.ships.owned.push(e),t.setShip(e),this._chime(),this.game.events.emit("shop:purchase")}}_selectShip(e){const t=this.game.player;if(!t.ships.owned.includes(e)){this._deny();return}t.setShip(e),this._chime(),this.game.events.emit("shop:purchase")}_hireCrew(e){const t=this.game.crew,n=this.recruits[e];if(!t||!n)return;const i=Pu(n.stars);if(!this._afford(i)||t.roster.length>=t.capacity){this._deny();return}if(!t.hire(n)){this._deny();return}this._spend(i),this.recruits.splice(e,1),this.recruits.length<2&&this._refillRecruits(),this._chime(),this.game.events.emit("shop:purchase")}_fireCrew(e){this.game.crew&&(this.game.crew.fire(e),this._chime(),this.game.events.emit("crew:changed"))}_sell(e){const t=this.game.player,n=t.inventory[e]||0;if(n<=0)return;const i=n*ES(e);t.credits+=i,t.inventory[e]=0,this._chime(),this.game.events.emit("ore:sold",{credits:i}),this.game.events.emit("shop:purchase")}_sellAll(){const e=this.game.player;let t=0;for(const n of Jt){const i=e.inventory[n.id]||0;t+=i*n.value,e.inventory[n.id]=0}t<=0||(e.credits+=t,this._chime(),this.game.events.emit("ore:sold",{credits:t}),this.game.events.emit("shop:purchase"))}_upgrade(e){const t=this.game.player,n=Math.round((t.upgrades[e]-1)/Vo),i=this._upgradeCost(n);if(!this._afford(i)){this._deny();return}this._spend(i),t.upgrades[e]+=Vo,e==="shield"&&t.applyUpgrades(),this._chime(),this.game.events.emit("shop:purchase"),this.game.events.emit("ship:changed")}_repair(){const e=this.game.player,t=Math.ceil(e.hullMax-e.hull),n=Math.ceil(t*.8);if(t<=0||!this._afford(n)){this._deny();return}this._spend(n),e.hull=e.hullMax,this._chime(),this.game.events.emit("shop:purchase")}_chime(){this.game.audio?.playTone?.({type:"triangle",freq:660,freqEnd:990,duration:.14,gain:.16})}_deny(){this.game.audio?.playTone?.({type:"square",freq:180,freqEnd:120,duration:.16,gain:.12})}}function ed(r){return r==="engineer"?"Engineer":r==="gunner"?"Gunner":r}class Fw{constructor(e){this.game=e,this.input=e.input;const t=document.getElementById("ui-root");this.layer=document.createElement("div"),this.layer.className="touch-layer",this.layer.innerHTML=`
      <div class="touch-zone left" data-zone="steer"></div>
      <div class="touch-zone right" data-zone="thrust"></div>
      <div class="touch-stick" data-stick="steer"><div class="knob"></div></div>
      <div class="touch-stick" data-stick="thrust"><div class="knob"></div></div>
      <button class="touch-btn fire" data-btn="fire">Fire</button>
      <button class="touch-btn boost" data-btn="boost">Boost</button>
      <button class="touch-btn counter" data-btn="counter">Defend</button>
      <button class="touch-btn navcycle" data-btn="navcycle">Nav ▸</button>
      <button class="touch-btn warp" data-btn="warp">Warp</button>
      <button class="touch-btn land" data-btn="land">Land</button>
      <button class="touch-btn fleet" data-btn="fleet">Deploy</button>
      <button class="touch-btn focus" data-btn="focus">Focus</button>
      <button class="touch-btn interact" data-btn="interact">Use</button>
      <button class="touch-btn jump" data-btn="jump">Jump</button>
    `,t.appendChild(this.layer),e.events.on("onfoot:entered",()=>this.layer.classList.add("foot")),e.events.on("onfoot:left",()=>this.layer.classList.remove("foot")),this.sticks={steer:{zone:this.layer.querySelector('[data-zone="steer"]'),el:this.layer.querySelector('[data-stick="steer"]'),knob:this.layer.querySelector('[data-stick="steer"] .knob'),pointerId:null,cx:0,cy:0},thrust:{zone:this.layer.querySelector('[data-zone="thrust"]'),el:this.layer.querySelector('[data-stick="thrust"]'),knob:this.layer.querySelector('[data-stick="thrust"] .knob'),pointerId:null,cx:0,cy:0}},this.stickRadius=46,window.addEventListener("pointerdown",n=>{n.pointerType==="touch"&&this.layer.classList.add("enabled")},{once:!1});for(const n of["steer","thrust"]){const i=this.sticks[n];i.zone.addEventListener("pointerdown",s=>this._stickDown(n,s)),i.zone.addEventListener("pointermove",s=>this._stickMove(n,s)),i.zone.addEventListener("pointerup",s=>this._stickUp(n,s)),i.zone.addEventListener("pointercancel",s=>this._stickUp(n,s))}for(const n of["fire","boost","jump"]){const i=this.layer.querySelector(`[data-btn="${n}"]`),s=a=>{this.input.virtual[n]=a,i.classList.toggle("held",a)};i.addEventListener("pointerdown",a=>{a.preventDefault(),i.setPointerCapture(a.pointerId),s(!0)}),i.addEventListener("pointerup",()=>s(!1)),i.addEventListener("pointercancel",()=>s(!1)),i.addEventListener("contextmenu",a=>a.preventDefault())}for(const[n,i]of[["interact","interactQueued"],["counter","counterQueued"],["warp","warpQueued"],["navcycle","warpCycleQueued"],["land","landQueued"],["fleet","fleetQueued"],["focus","fleetFocusQueued"]]){const s=this.layer.querySelector(`[data-btn="${n}"]`);s.addEventListener("pointerdown",o=>{o.preventDefault(),this.input[i]=!0,s.classList.add("held")});const a=()=>s.classList.remove("held");s.addEventListener("pointerup",a),s.addEventListener("pointercancel",a),s.addEventListener("contextmenu",o=>o.preventDefault())}}_stickDown(e,t){if(t.pointerType!=="touch")return;const n=this.sticks[e];n.pointerId===null&&(n.pointerId=t.pointerId,n.zone.setPointerCapture(t.pointerId),n.cx=t.clientX,n.cy=t.clientY,n.el.style.left=`${t.clientX-55}px`,n.el.style.top=`${t.clientY-55}px`,n.el.classList.add("visible"),this._applyStick(e,0,0))}_stickMove(e,t){const n=this.sticks[e];if(n.pointerId!==t.pointerId)return;let i=(t.clientX-n.cx)/this.stickRadius,s=(t.clientY-n.cy)/this.stickRadius;const a=Math.hypot(i,s);a>1&&(i/=a,s/=a),this._applyStick(e,i,s),n.knob.style.transform=`translate(${i*this.stickRadius}px, ${s*this.stickRadius}px)`}_stickUp(e,t){const n=this.sticks[e];n.pointerId===t.pointerId&&(n.pointerId=null,n.el.classList.remove("visible"),n.knob.style.transform="translate(0, 0)",this._releaseStick(e))}_applyStick(e,t,n){const i=this.input.virtual,s=this.game.mode==="onfoot";e==="steer"?s?(i.walk.x=t,i.walk.y=n,i.walk.active=!0):(i.steer.x=t,i.steer.y=n,i.steer.active=!0):s?(i.look.x=t,i.look.y=n,i.look.active=!0):(i.throttle.value=-n,i.throttle.active=!0,i.roll.value=t,i.roll.active=!0)}_releaseStick(e){const t=this.input.virtual;e==="steer"?(t.steer.x=0,t.steer.y=0,t.steer.active=!1,t.walk.x=0,t.walk.y=0,t.walk.active=!1):(t.throttle.value=0,t.throttle.active=!1,t.roll.value=0,t.roll.active=!1,t.look.x=0,t.look.y=0,t.look.active=!1)}}class Nw{constructor(e){this.game=e,this.root=document.getElementById("ui-root"),this._buildStartScreen(),e.events.on("player:died",()=>{setTimeout(()=>this._buildDeathScreen(),1600)})}_controlsHint(){return navigator.maxTouchPoints>0?"LEFT STICK steer &nbsp;·&nbsp; RIGHT STICK throttle / roll<br>FIRE and BOOST buttons":"MOUSE steer &nbsp;·&nbsp; W/S throttle &nbsp;·&nbsp; A/D roll &nbsp;·&nbsp; Q/E strafe<br>SHIFT boost &nbsp;·&nbsp; SPACE / CLICK fire &nbsp;·&nbsp; X brake"}_buildStartScreen(){const e=document.createElement("div");e.className="screen",e.innerHTML=`
      <div class="game-title">Starfall Frontier</div>
      <div class="tagline">Explore &nbsp;·&nbsp; Discover &nbsp;·&nbsp; Survive</div>
      <div class="mode-choose">
        <button class="mode-btn" data-mode="survival">
          <span class="mode-name">▶ &nbsp;Survival</span>
          <span class="mode-desc">Mine, trade and earn credits — the full game</span>
        </button>
        <button class="mode-btn creative" data-mode="creative">
          <span class="mode-name">✦ &nbsp;Creative</span>
          <span class="mode-desc">Unlimited credits — buy any ship or upgrade for free</span>
        </button>
      </div>
      <div class="controls-hint">${this._controlsHint()}</div>
      <div class="model-loading" data-el="modelLoading">
        <span class="ml-text">LOADING SHIP MODELS…</span>
        <span class="ml-bar"><span class="ml-fill"></span></span>
      </div>
      <div class="reset-save">Reset progress</div>
      <div class="build-tag">BUILD 40 — paced progression: XP is sqrt-scaled, level 10 unlocks the SF-20 only</div>
    `,this.root.appendChild(e);let t=!1,n=!1;const i=e.querySelector('[data-el="modelLoading"]'),s=i.querySelector(".ml-fill"),a=i.querySelector(".ml-text"),o=cx();let c=0;for(const d of e.querySelectorAll(".mode-btn"))d.classList.add("waiting");ff(()=>{c=Math.min(o,c+1),a.textContent=`LOADING SHIP MODELS ${c}/${o}`,s.style.width=`${Math.round(c/o*100)}%`}),mf().then(()=>{n=!0,i.classList.add("done"),a.textContent="ALL SHIPS READY",s.style.width="100%";for(const d of e.querySelectorAll(".mode-btn"))d.classList.remove("waiting")});const l=d=>{t||!n||(t=!0,window.removeEventListener("keydown",h),this.game.creative=d,this.game.audio.unlock(),this.game.paused=!1,this.game.events.emit("game:started"),e.classList.add("hidden"),setTimeout(()=>e.remove(),700))},h=d=>{d.code==="Enter"||d.code==="Space"?l(!1):d.code==="KeyC"&&l(!0)};for(const d of e.querySelectorAll(".mode-btn"))d.addEventListener("pointerdown",f=>{f.preventDefault(),l(d.dataset.mode!=="survival")});window.addEventListener("keydown",h);const u=e.querySelector(".reset-save");u.addEventListener("pointerdown",d=>{if(d.preventDefault(),d.stopPropagation(),!u.dataset.armed){u.dataset.armed="1",u.textContent="Tap again to erase ALL progress",setTimeout(()=>{u.dataset.armed="",u.textContent="Reset progress"},3e3);return}this.game.save?.reset(),window.location.reload()})}_buildDeathScreen(){const e=document.createElement("div");e.className="screen",e.innerHTML=`
      <div class="death-title">Ship Destroyed</div>
      <div class="tagline">Salvage teams recovered part of your cargo</div>
      <div class="prompt">Tap to Redeploy</div>
    `,this.root.appendChild(e),e.addEventListener("pointerdown",()=>{this.game.events.emit("player:respawn-requested"),e.classList.add("hidden"),setTimeout(()=>e.remove(),700)},{once:!0})}}const Uw=document.getElementById("game-canvas"),le=new Ay(Uw),Ow=le.engine.scene,kw=sf.clone().sub(Na).normalize();Ow.environment=$M(le.engine.renderer,kw);const Ui=new Ex(le);Ui.position.copy(Na);Ui.quaternion.setFromUnitVectors(new b(0,0,-1),new b(.75,.05,-.66).normalize());le.player=Ui;le.addSystem("player",Ui);const pl=new QM(le);le.universe=pl;xS(le,pl);le.addSystem("universe",pl);le.addSystem("progression",new yw(le));le.addSystem("onfoot",new XS(le));le.addSystem("warp",new QS(le));le.addSystem("landing",new ew(le));le.addSystem("approach",new rw(le));le.addSystem("settlements",new ow(le));const Mf=new mw(le);le.poi=Mf;le.addSystem("poi",Mf);le.addSystem("director",new Nx(le));const ml=new Cx(le);le.enemies=ml;le.addSystem("enemies",ml);const Sf=new Bx(le);le.apexSystem=Sf;le.addSystem("apex",Sf);le.leviathan=le.addSystem("leviathan",new $x(le));const wf=new tM(le);le.reinforcements=wf;le.addSystem("reinforcements",wf);le.addSystem("traffic",new aM(le));const Tf=new yM(le);le.weapons=Tf;le.addSystem("weapons",Tf);le.addSystem("combat",new wM(le));le.addSystem("crew",new vf(le));le.addSystem("fleet",new FM(le));le.addSystem("missions",new UM(le));const Ef=new HM(le);le.explosions=Ef;le.addSystem("explosions",Ef);const Af=new zM(le);le.pickups=Af;le.addSystem("pickups",Af);const Rf=new VM(le);le.sun=Rf;le.addSystem("sun",Rf);const zw=new GM(le);le.addSystem("camera",zw);le.addSystem("starfield",new jM(le));le.addSystem("nebulas",new XM(le));le.addSystem("ship-sounds",new xw(le));le.addSystem("music",new Sw(le));const Cf=new ww(le);le.addSystem("hud",Cf);le.addSystem("radar",new Rw(le,Cf.refs.radar));le.addSystem("targets",new Lw(le));le.addSystem("shop",new Iw(le));new Fw(le);new Nw(le);document.addEventListener("visibilitychange",()=>{const r=le.audio.ctx;r&&(document.hidden?r.suspend():r.resume())});const Pf=new vw(le);le.save=Pf;Pf.load();Ui.applyUpgrades();mf();ff(r=>{Vt[Ui.ships.active]?.model===r&&Ui.refreshShip(),ml.refreshModels()});Qs().load();le.start();window.__game=le;
