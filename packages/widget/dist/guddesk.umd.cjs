(function(U,h){typeof exports=="object"&&typeof module<"u"?module.exports=h():typeof define=="function"&&define.amd?define(h):(U=typeof globalThis<"u"?globalThis:U||self,U.GudDesk=h())})(this,(function(){"use strict";var U,h,We,je,F,qe,Be,Ge,Ve,we,ke,$e,se={},le=[],Dt=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,ae=Array.isArray;function D(t,e){for(var n in e)t[n]=e[n];return t}function Se(t){t&&t.parentNode&&t.parentNode.removeChild(t)}function Ke(t,e,n){var i,r,o,l={};for(o in e)o=="key"?i=e[o]:o=="ref"?r=e[o]:l[o]=e[o];if(arguments.length>2&&(l.children=arguments.length>3?U.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(o in t.defaultProps)l[o]===void 0&&(l[o]=t.defaultProps[o]);return ce(t,l,i,r,null)}function ce(t,e,n,i,r){var o={type:t,props:e,key:n,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:r??++We,__i:-1,__u:0};return r==null&&h.vnode!=null&&h.vnode(o),o}function z(t){return t.children}function Z(t,e){this.props=t,this.context=e}function q(t,e){if(e==null)return t.__?q(t.__,t.__i+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?q(t):null}function Mt(t){if(t.__P&&t.__d){var e=t.__v,n=e.__e,i=[],r=[],o=D({},e);o.__v=e.__v+1,h.vnode&&h.vnode(o),Te(t.__P,o,e,t.__n,t.__P.namespaceURI,32&e.__u?[n]:null,i,n??q(e),!!(32&e.__u),r),o.__v=e.__v,o.__.__k[o.__i]=o,tt(i,o,r),e.__e=e.__=null,o.__e!=n&&Je(o)}}function Je(t){if((t=t.__)!=null&&t.__c!=null)return t.__e=t.__c.base=null,t.__k.some(function(e){if(e!=null&&e.__e!=null)return t.__e=t.__c.base=e.__e}),Je(t)}function Ye(t){(!t.__d&&(t.__d=!0)&&F.push(t)&&!ue.__r++||qe!=h.debounceRendering)&&((qe=h.debounceRendering)||Be)(ue)}function ue(){for(var t,e=1;F.length;)F.length>e&&F.sort(Ge),t=F.shift(),e=F.length,Mt(t);ue.__r=0}function Ze(t,e,n,i,r,o,l,a,f,c,d){var s,p,_,g,b,$,m,y=i&&i.__k||le,L=e.length;for(f=Ut(n,e,y,f,L),s=0;s<L;s++)(_=n.__k[s])!=null&&(p=_.__i!=-1&&y[_.__i]||se,_.__i=s,$=Te(t,_,p,r,o,l,a,f,c,d),g=_.__e,_.ref&&p.ref!=_.ref&&(p.ref&&Ce(p.ref,null,_),d.push(_.ref,_.__c||g,_)),b==null&&g!=null&&(b=g),(m=!!(4&_.__u))||p.__k===_.__k?f=Qe(_,f,t,m):typeof _.type=="function"&&$!==void 0?f=$:g&&(f=g.nextSibling),_.__u&=-7);return n.__e=b,f}function Ut(t,e,n,i,r){var o,l,a,f,c,d=n.length,s=d,p=0;for(t.__k=new Array(r),o=0;o<r;o++)(l=e[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l=="string"||typeof l=="number"||typeof l=="bigint"||l.constructor==String?l=t.__k[o]=ce(null,l,null,null,null):ae(l)?l=t.__k[o]=ce(z,{children:l},null,null,null):l.constructor===void 0&&l.__b>0?l=t.__k[o]=ce(l.type,l.props,l.key,l.ref?l.ref:null,l.__v):t.__k[o]=l,f=o+p,l.__=t,l.__b=t.__b+1,a=null,(c=l.__i=zt(l,n,f,s))!=-1&&(s--,(a=n[c])&&(a.__u|=2)),a==null||a.__v==null?(c==-1&&(r>d?p--:r<d&&p++),typeof l.type!="function"&&(l.__u|=4)):c!=f&&(c==f-1?p--:c==f+1?p++:(c>f?p--:p++,l.__u|=4))):t.__k[o]=null;if(s)for(o=0;o<d;o++)(a=n[o])!=null&&(2&a.__u)==0&&(a.__e==i&&(i=q(a)),it(a,a));return i}function Qe(t,e,n,i){var r,o;if(typeof t.type=="function"){for(r=t.__k,o=0;r&&o<r.length;o++)r[o]&&(r[o].__=t,e=Qe(r[o],e,n,i));return e}t.__e!=e&&(i&&(e&&t.type&&!e.parentNode&&(e=q(t)),n.insertBefore(t.__e,e||null)),e=t.__e);do e=e&&e.nextSibling;while(e!=null&&e.nodeType==8);return e}function zt(t,e,n,i){var r,o,l,a=t.key,f=t.type,c=e[n],d=c!=null&&(2&c.__u)==0;if(c===null&&a==null||d&&a==c.key&&f==c.type)return n;if(i>(d?1:0)){for(r=n-1,o=n+1;r>=0||o<e.length;)if((c=e[l=r>=0?r--:o++])!=null&&(2&c.__u)==0&&a==c.key&&f==c.type)return l}return-1}function Xe(t,e,n){e[0]=="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||Dt.test(e)?n:n+"px"}function fe(t,e,n,i,r){var o,l;e:if(e=="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof i=="string"&&(t.style.cssText=i=""),i)for(e in i)n&&e in n||Xe(t.style,e,"");if(n)for(e in n)i&&n[e]==i[e]||Xe(t.style,e,n[e])}else if(e[0]=="o"&&e[1]=="n")o=e!=(e=e.replace(Ve,"$1")),l=e.toLowerCase(),e=l in t||e=="onFocusOut"||e=="onFocusIn"?l.slice(2):e.slice(2),t.l||(t.l={}),t.l[e+o]=n,n?i?n.u=i.u:(n.u=we,t.addEventListener(e,o?$e:ke,o)):t.removeEventListener(e,o?$e:ke,o);else{if(r=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!="-"?t.removeAttribute(e):t.setAttribute(e,e=="popover"&&n==1?"":n))}}function et(t){return function(e){if(this.l){var n=this.l[e.type+t];if(e.t==null)e.t=we++;else if(e.t<n.u)return;return n(h.event?h.event(e):e)}}}function Te(t,e,n,i,r,o,l,a,f,c){var d,s,p,_,g,b,$,m,y,L,j,re,At,xe,Fe,A=e.type;if(e.constructor!==void 0)return null;128&n.__u&&(f=!!(32&n.__u),o=[a=e.__e=n.__e]),(d=h.__b)&&d(e);e:if(typeof A=="function")try{if(m=e.props,y="prototype"in A&&A.prototype.render,L=(d=A.contextType)&&i[d.__c],j=d?L?L.props.value:d.__:i,n.__c?$=(s=e.__c=n.__c).__=s.__E:(y?e.__c=s=new A(m,j):(e.__c=s=new Z(m,j),s.constructor=A,s.render=Rt),L&&L.sub(s),s.state||(s.state={}),s.__n=i,p=s.__d=!0,s.__h=[],s._sb=[]),y&&s.__s==null&&(s.__s=s.state),y&&A.getDerivedStateFromProps!=null&&(s.__s==s.state&&(s.__s=D({},s.__s)),D(s.__s,A.getDerivedStateFromProps(m,s.__s))),_=s.props,g=s.state,s.__v=e,p)y&&A.getDerivedStateFromProps==null&&s.componentWillMount!=null&&s.componentWillMount(),y&&s.componentDidMount!=null&&s.__h.push(s.componentDidMount);else{if(y&&A.getDerivedStateFromProps==null&&m!==_&&s.componentWillReceiveProps!=null&&s.componentWillReceiveProps(m,j),e.__v==n.__v||!s.__e&&s.shouldComponentUpdate!=null&&s.shouldComponentUpdate(m,s.__s,j)===!1){e.__v!=n.__v&&(s.props=m,s.state=s.__s,s.__d=!1),e.__e=n.__e,e.__k=n.__k,e.__k.some(function(Y){Y&&(Y.__=e)}),le.push.apply(s.__h,s._sb),s._sb=[],s.__h.length&&l.push(s);break e}s.componentWillUpdate!=null&&s.componentWillUpdate(m,s.__s,j),y&&s.componentDidUpdate!=null&&s.__h.push(function(){s.componentDidUpdate(_,g,b)})}if(s.context=j,s.props=m,s.__P=t,s.__e=!1,re=h.__r,At=0,y)s.state=s.__s,s.__d=!1,re&&re(e),d=s.render(s.props,s.state,s.context),le.push.apply(s.__h,s._sb),s._sb=[];else do s.__d=!1,re&&re(e),d=s.render(s.props,s.state,s.context),s.state=s.__s;while(s.__d&&++At<25);s.state=s.__s,s.getChildContext!=null&&(i=D(D({},i),s.getChildContext())),y&&!p&&s.getSnapshotBeforeUpdate!=null&&(b=s.getSnapshotBeforeUpdate(_,g)),xe=d!=null&&d.type===z&&d.key==null?nt(d.props.children):d,a=Ze(t,ae(xe)?xe:[xe],e,n,i,r,o,l,a,f,c),s.base=e.__e,e.__u&=-161,s.__h.length&&l.push(s),$&&(s.__E=s.__=null)}catch(Y){if(e.__v=null,f||o!=null)if(Y.then){for(e.__u|=f?160:128;a&&a.nodeType==8&&a.nextSibling;)a=a.nextSibling;o[o.indexOf(a)]=null,e.__e=a}else{for(Fe=o.length;Fe--;)Se(o[Fe]);Ie(e)}else e.__e=n.__e,e.__k=n.__k,Y.then||Ie(e);h.__e(Y,e,n)}else o==null&&e.__v==n.__v?(e.__k=n.__k,e.__e=n.__e):a=e.__e=Ht(n.__e,e,n,i,r,o,l,f,c);return(d=h.diffed)&&d(e),128&e.__u?void 0:a}function Ie(t){t&&(t.__c&&(t.__c.__e=!0),t.__k&&t.__k.some(Ie))}function tt(t,e,n){for(var i=0;i<n.length;i++)Ce(n[i],n[++i],n[++i]);h.__c&&h.__c(e,t),t.some(function(r){try{t=r.__h,r.__h=[],t.some(function(o){o.call(r)})}catch(o){h.__e(o,r.__v)}})}function nt(t){return typeof t!="object"||t==null||t.__b>0?t:ae(t)?t.map(nt):D({},t)}function Ht(t,e,n,i,r,o,l,a,f){var c,d,s,p,_,g,b,$=n.props||se,m=e.props,y=e.type;if(y=="svg"?r="http://www.w3.org/2000/svg":y=="math"?r="http://www.w3.org/1998/Math/MathML":r||(r="http://www.w3.org/1999/xhtml"),o!=null){for(c=0;c<o.length;c++)if((_=o[c])&&"setAttribute"in _==!!y&&(y?_.localName==y:_.nodeType==3)){t=_,o[c]=null;break}}if(t==null){if(y==null)return document.createTextNode(m);t=document.createElementNS(r,y,m.is&&m),a&&(h.__m&&h.__m(e,o),a=!1),o=null}if(y==null)$===m||a&&t.data==m||(t.data=m);else{if(o=o&&U.call(t.childNodes),!a&&o!=null)for($={},c=0;c<t.attributes.length;c++)$[(_=t.attributes[c]).name]=_.value;for(c in $)_=$[c],c=="dangerouslySetInnerHTML"?s=_:c=="children"||c in m||c=="value"&&"defaultValue"in m||c=="checked"&&"defaultChecked"in m||fe(t,c,null,_,r);for(c in m)_=m[c],c=="children"?p=_:c=="dangerouslySetInnerHTML"?d=_:c=="value"?g=_:c=="checked"?b=_:a&&typeof _!="function"||$[c]===_||fe(t,c,_,$[c],r);if(d)a||s&&(d.__html==s.__html||d.__html==t.innerHTML)||(t.innerHTML=d.__html),e.__k=[];else if(s&&(t.innerHTML=""),Ze(e.type=="template"?t.content:t,ae(p)?p:[p],e,n,i,y=="foreignObject"?"http://www.w3.org/1999/xhtml":r,o,l,o?o[0]:n.__k&&q(n,0),a,f),o!=null)for(c=o.length;c--;)Se(o[c]);a||(c="value",y=="progress"&&g==null?t.removeAttribute("value"):g!=null&&(g!==t[c]||y=="progress"&&!g||y=="option"&&g!=$[c])&&fe(t,c,g,$[c],r),c="checked",b!=null&&b!=t[c]&&fe(t,c,b,$[c],r))}return t}function Ce(t,e,n){try{if(typeof t=="function"){var i=typeof t.__u=="function";i&&t.__u(),i&&e==null||(t.__u=t(e))}else t.current=e}catch(r){h.__e(r,n)}}function it(t,e,n){var i,r;if(h.unmount&&h.unmount(t),(i=t.ref)&&(i.current&&i.current!=t.__e||Ce(i,null,e)),(i=t.__c)!=null){if(i.componentWillUnmount)try{i.componentWillUnmount()}catch(o){h.__e(o,e)}i.base=i.__P=null}if(i=t.__k)for(r=0;r<i.length;r++)i[r]&&it(i[r],e,n||typeof t.type!="function");n||Se(t.__e),t.__c=t.__=t.__e=void 0}function Rt(t,e,n){return this.constructor(t,n)}function ot(t,e,n){var i,r,o,l;e==document&&(e=document.documentElement),h.__&&h.__(t,e),r=(i=!1)?null:e.__k,o=[],l=[],Te(e,t=e.__k=Ke(z,null,[t]),r||se,se,e.namespaceURI,r?null:e.firstChild?U.call(e.childNodes):null,o,r?r.__e:e.firstChild,i,l),tt(o,t,l)}U=le.slice,h={__e:function(t,e,n,i){for(var r,o,l;e=e.__;)if((r=e.__c)&&!r.__)try{if((o=r.constructor)&&o.getDerivedStateFromError!=null&&(r.setState(o.getDerivedStateFromError(t)),l=r.__d),r.componentDidCatch!=null&&(r.componentDidCatch(t,i||{}),l=r.__d),l)return r.__E=r}catch(a){t=a}throw t}},We=0,je=function(t){return t!=null&&t.constructor===void 0},Z.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!=this.state?this.__s:this.__s=D({},this.state),typeof t=="function"&&(t=t(D({},n),this.props)),t&&D(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),Ye(this))},Z.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),Ye(this))},Z.prototype.render=z,F=[],Be=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,Ge=function(t,e){return t.__v.__b-e.__v.__b},ue.__r=0,Ve=/(PointerCapture)$|Capture$/i,we=0,ke=et(!1),$e=et(!0);var Lt=0;function u(t,e,n,i,r,o){e||(e={});var l,a,f=e;if("ref"in f)for(a in f={},e)a=="ref"?l=e[a]:f[a]=e[a];var c={type:t,props:f,key:n,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Lt,__i:-1,__u:0,__source:r,__self:o};if(typeof t=="function"&&(l=t.defaultProps))for(a in l)f[a]===void 0&&(f[a]=l[a]);return h.vnode&&h.vnode(c),c}var Q,x,Ne,rt,_e=0,st=[],w=h,lt=w.__b,at=w.__r,ct=w.diffed,ut=w.__c,ft=w.unmount,_t=w.__;function Ee(t,e){w.__h&&w.__h(x,t,_e||e),_e=0;var n=x.__H||(x.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({}),n.__[t]}function M(t){return _e=1,Ft(ht,t)}function Ft(t,e,n){var i=Ee(Q++,2);if(i.t=t,!i.__c&&(i.__=[ht(void 0,e),function(a){var f=i.__N?i.__N[0]:i.__[0],c=i.t(f,a);f!==c&&(i.__N=[c,i.__[1]],i.__c.setState({}))}],i.__c=x,!x.__f)){var r=function(a,f,c){if(!i.__c.__H)return!0;var d=i.__c.__H.__.filter(function(p){return p.__c});if(d.every(function(p){return!p.__N}))return!o||o.call(this,a,f,c);var s=i.__c.props!==a;return d.some(function(p){if(p.__N){var _=p.__[0];p.__=p.__N,p.__N=void 0,_!==p.__[0]&&(s=!0)}}),o&&o.call(this,a,f,c)||s};x.__f=!0;var o=x.shouldComponentUpdate,l=x.componentWillUpdate;x.componentWillUpdate=function(a,f,c){if(this.__e){var d=o;o=void 0,r(a,f,c),o=d}l&&l.call(this,a,f,c)},x.shouldComponentUpdate=r}return i.__N||i.__}function X(t,e){var n=Ee(Q++,3);!w.__s&&pt(n.__H,e)&&(n.__=t,n.u=e,x.__H.__h.push(n))}function B(t){return _e=5,Pe(function(){return{current:t}},[])}function Pe(t,e){var n=Ee(Q++,7);return pt(n.__H,e)&&(n.__=t(),n.__H=e,n.__h=t),n.__}function Wt(){for(var t;t=st.shift();){var e=t.__H;if(t.__P&&e)try{e.__h.some(de),e.__h.some(Oe),e.__h=[]}catch(n){e.__h=[],w.__e(n,t.__v)}}}w.__b=function(t){x=null,lt&&lt(t)},w.__=function(t,e){t&&e.__k&&e.__k.__m&&(t.__m=e.__k.__m),_t&&_t(t,e)},w.__r=function(t){at&&at(t),Q=0;var e=(x=t.__c).__H;e&&(Ne===x?(e.__h=[],x.__h=[],e.__.some(function(n){n.__N&&(n.__=n.__N),n.u=n.__N=void 0})):(e.__h.some(de),e.__h.some(Oe),e.__h=[],Q=0)),Ne=x},w.diffed=function(t){ct&&ct(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(st.push(e)!==1&&rt===w.requestAnimationFrame||((rt=w.requestAnimationFrame)||jt)(Wt)),e.__H.__.some(function(n){n.u&&(n.__H=n.u),n.u=void 0})),Ne=x=null},w.__c=function(t,e){e.some(function(n){try{n.__h.some(de),n.__h=n.__h.filter(function(i){return!i.__||Oe(i)})}catch(i){e.some(function(r){r.__h&&(r.__h=[])}),e=[],w.__e(i,n.__v)}}),ut&&ut(t,e)},w.unmount=function(t){ft&&ft(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.some(function(i){try{de(i)}catch(r){e=r}}),n.__H=void 0,e&&w.__e(e,n.__v))};var dt=typeof requestAnimationFrame=="function";function jt(t){var e,n=function(){clearTimeout(i),dt&&cancelAnimationFrame(e),setTimeout(t)},i=setTimeout(n,35);dt&&(e=requestAnimationFrame(n))}function de(t){var e=x,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),x=e}function Oe(t){var e=x;t.__c=t.__(),x=e}function pt(t,e){return!t||t.length!==e.length||e.some(function(n,i){return n!==t[i]})}function ht(t,e){return typeof e=="function"?e(t):e}var qt=Symbol.for("preact-signals");function pe(){if(H>1)H--;else{for(var t,e=!1;ee!==void 0;){var n=ee;for(ee=void 0,Ae++;n!==void 0;){var i=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&gt(n))try{n.c()}catch(r){e||(t=r,e=!0)}n=i}}if(Ae=0,H--,e)throw t}}function Bt(t){if(H>0)return t();H++;try{return t()}finally{pe()}}var v=void 0;function vt(t){var e=v;v=void 0;try{return t()}finally{v=e}}var ee=void 0,H=0,Ae=0,he=0;function mt(t){if(v!==void 0){var e=t.n;if(e===void 0||e.t!==v)return e={i:0,S:t,p:v.s,n:void 0,t:v,e:void 0,x:void 0,r:e},v.s!==void 0&&(v.s.n=e),v.s=e,t.n=e,32&v.f&&t.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=v.s,e.n=void 0,v.s.n=e,v.s=e),e}}function S(t,e){this.v=t,this.i=0,this.n=void 0,this.t=void 0,this.W=e?.watched,this.Z=e?.unwatched,this.name=e?.name}S.prototype.brand=qt,S.prototype.h=function(){return!0},S.prototype.S=function(t){var e=this,n=this.t;n!==t&&t.e===void 0&&(t.x=n,this.t=t,n!==void 0?n.e=t:vt(function(){var i;(i=e.W)==null||i.call(e)}))},S.prototype.U=function(t){var e=this;if(this.t!==void 0){var n=t.e,i=t.x;n!==void 0&&(n.x=i,t.e=void 0),i!==void 0&&(i.e=n,t.x=void 0),t===this.t&&(this.t=i,i===void 0&&vt(function(){var r;(r=e.Z)==null||r.call(e)}))}},S.prototype.subscribe=function(t){var e=this;return te(function(){var n=e.value,i=v;v=void 0;try{t(n)}finally{v=i}},{name:"sub"})},S.prototype.valueOf=function(){return this.value},S.prototype.toString=function(){return this.value+""},S.prototype.toJSON=function(){return this.value},S.prototype.peek=function(){var t=v;v=void 0;try{return this.value}finally{v=t}},Object.defineProperty(S.prototype,"value",{get:function(){var t=mt(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(t!==this.v){if(Ae>100)throw new Error("Cycle detected");this.v=t,this.i++,he++,H++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{pe()}}}});function I(t,e){return new S(t,e)}function gt(t){for(var e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function yt(t){for(var e=t.s;e!==void 0;e=e.n){var n=e.S.n;if(n!==void 0&&(e.r=n),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function bt(t){for(var e=t.s,n=void 0;e!==void 0;){var i=e.p;e.i===-1?(e.S.U(e),i!==void 0&&(i.n=e.n),e.n!==void 0&&(e.n.p=i)):n=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=i}t.s=n}function W(t,e){S.call(this,void 0),this.x=t,this.s=void 0,this.g=he-1,this.f=4,this.W=e?.watched,this.Z=e?.unwatched,this.name=e?.name}W.prototype=new S,W.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===he))return!0;if(this.g=he,this.f|=1,this.i>0&&!gt(this))return this.f&=-2,!0;var t=v;try{yt(this),v=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return v=t,bt(this),this.f&=-2,!0},W.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}S.prototype.S.call(this,t)},W.prototype.U=function(t){if(this.t!==void 0&&(S.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}},W.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}},Object.defineProperty(W.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var t=mt(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function ve(t,e){return new W(t,e)}function xt(t){var e=t.u;if(t.u=void 0,typeof e=="function"){H++;var n=v;v=void 0;try{e()}catch(i){throw t.f&=-2,t.f|=8,De(t),i}finally{v=n,pe()}}}function De(t){for(var e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,xt(t)}function Gt(t){if(v!==this)throw new Error("Out-of-order effect");bt(this),v=t,this.f&=-2,8&this.f&&De(this),pe()}function G(t,e){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=e?.name}G.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}},G.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,xt(this),yt(this),H++;var t=v;return v=this,Gt.bind(this,t)},G.prototype.N=function(){2&this.f||(this.f|=2,this.o=ee,ee=this)},G.prototype.d=function(){this.f|=8,1&this.f||De(this)},G.prototype.dispose=function(){this.d()};function te(t,e){var n=new G(t,e);try{n.c()}catch(r){throw n.d(),r}var i=n.d.bind(n);return i[Symbol.dispose]=i,i}var wt,me,Vt=typeof window<"u"&&!!window.__PREACT_SIGNALS_DEVTOOLS__,kt=[];te(function(){wt=this.N})();function V(t,e){h[t]=e.bind(null,h[t]||function(){})}function ge(t){if(me){var e=me;me=void 0,e()}me=t&&t.S()}function $t(t){var e=this,n=t.data,i=Jt(n);i.value=n;var r=Pe(function(){for(var a=e,f=e.__v;f=f.__;)if(f.__c){f.__c.__$f|=4;break}var c=ve(function(){var _=i.value.value;return _===0?0:_===!0?"":_||""}),d=ve(function(){return!Array.isArray(c.value)&&!je(c.value)}),s=te(function(){if(this.N=St,d.value){var _=c.value;a.__v&&a.__v.__e&&a.__v.__e.nodeType===3&&(a.__v.__e.data=_)}}),p=e.__$u.d;return e.__$u.d=function(){s(),p.call(this)},[d,c]},[]),o=r[0],l=r[1];return o.value?l.peek():l.value}$t.displayName="ReactiveTextNode",Object.defineProperties(S.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:$t},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}}),V("__b",function(t,e){if(typeof e.type=="string"){var n,i=e.props;for(var r in i)if(r!=="children"){var o=i[r];o instanceof S&&(n||(e.__np=n={}),n[r]=o,i[r]=o.peek())}}t(e)}),V("__r",function(t,e){if(t(e),e.type!==z){ge();var n,i=e.__c;i&&(i.__$f&=-2,(n=i.__$u)===void 0&&(i.__$u=n=(function(r,o){var l;return te(function(){l=this},{name:o}),l.c=r,l})(function(){var r;Vt&&((r=n.y)==null||r.call(n)),i.__$f|=1,i.setState({})},typeof e.type=="function"?e.type.displayName||e.type.name:""))),ge(n)}}),V("__e",function(t,e,n,i){ge(),t(e,n,i)}),V("diffed",function(t,e){ge();var n;if(typeof e.type=="string"&&(n=e.__e)){var i=e.__np,r=e.props;if(i){var o=n.U;if(o)for(var l in o){var a=o[l];a!==void 0&&!(l in i)&&(a.d(),o[l]=void 0)}else o={},n.U=o;for(var f in i){var c=o[f],d=i[f];c===void 0?(c=Kt(n,f,d),o[f]=c):c.o(d,r)}for(var s in i)r[s]=i[s]}}t(e)});function Kt(t,e,n,i){var r=e in t&&t.ownerSVGElement===void 0,o=I(n),l=n.peek();return{o:function(a,f){o.value=a,l=a.peek()},d:te(function(){this.N=St;var a=o.value.value;l!==a?(l=void 0,r?t[e]=a:a!=null&&(a!==!1||e[4]==="-")?t.setAttribute(e,a):t.removeAttribute(e)):l=void 0})}}V("unmount",function(t,e){if(typeof e.type=="string"){var n=e.__e;if(n){var i=n.U;if(i){n.U=void 0;for(var r in i){var o=i[r];o&&o.d()}}}e.__np=void 0}else{var l=e.__c;if(l){var a=l.__$u;a&&(l.__$u=void 0,a.d())}}t(e)}),V("__h",function(t,e,n,i){(i<3||i===9)&&(e.__$f|=2),t(e,n,i)}),Z.prototype.shouldComponentUpdate=function(t,e){if(this.__R)return!0;var n=this.__$u,i=n&&n.s!==void 0;for(var r in e)return!0;if(this.__f||typeof this.u=="boolean"&&this.u===!0){var o=2&this.__$f;if(!(i||o||4&this.__$f)||1&this.__$f)return!0}else if(!(i||4&this.__$f)||3&this.__$f)return!0;for(var l in t)if(l!=="__source"&&t[l]!==this.props[l])return!0;for(var a in this.props)if(!(a in t))return!0;return!1};function Jt(t,e){return Pe(function(){return I(t,e)},[])}var Yt=function(t){queueMicrotask(function(){queueMicrotask(t)})};function Zt(){Bt(function(){for(var t;t=kt.shift();)wt.call(t)})}function St(){kt.push(this)===1&&(h.requestAnimationFrame||Yt)(Zt)}const C=I(!1),Tt=I(!1),T=I([]),k=I(null),K=I(null),E=I(null),R=I(null),ne=I(""),ye=I(!1),be=I(!1),N=I({primaryColor:"#3ECF8E",position:"bottom-right",welcomeMessage:"Hi! How can we help you?",workspaceName:null,showBranding:!0,requireEmail:!1,pusherKey:null,pusherCluster:null,offlineFormTimeout:null}),Qt=ve(()=>N.value.requireEmail&&!R.value&&!k.value),Xt=ve(()=>!!k.value),It="guddesk_state";function Me(){try{localStorage.setItem(It,JSON.stringify({conversationId:k.value,visitorId:K.value,visitorToken:E.value,visitorEmail:R.value}))}catch{}}function en(){try{const t=localStorage.getItem(It);if(!t)return;const e=JSON.parse(t);e.conversationId&&(k.value=e.conversationId),e.visitorId&&(K.value=e.visitorId),e.visitorToken&&(E.value=e.visitorToken),e.visitorEmail&&(R.value=e.visitorEmail)}catch{}}let ie="",Ct="";function tn(t,e){ie=t,Ct=e.replace(/\/$/,"")}async function J(t,e={}){const n={"Content-Type":"application/json",...e.headers};E.value&&(n["x-visitor-token"]=E.value);const i=await fetch(`${Ct}${t}`,{...e,headers:n});if(!i.ok){const r=await i.json().catch(()=>({error:"Request failed"}));throw new Error(r.error||"Request failed")}return i.json()}async function nn(){const t=await J(`/api/widget/config?appId=${encodeURIComponent(ie)}`);N.value=t}async function on(){if(E.value&&K.value)return;const t=await J("/api/widget/auth",{method:"POST",body:JSON.stringify({appId:ie})});K.value=t.visitorId,E.value=t.visitorToken,Me()}async function Ue(t){const e=await J("/api/widget/visitors",{method:"POST",body:JSON.stringify({appId:ie,visitorToken:E.value,externalId:t.userId,name:t.name,email:t.email,metadata:t.metadata})});K.value=e.visitorId,E.value=e.visitorToken,t.email&&(R.value=t.email),Me()}let rn=0;function Nt(t){const e=`_opt_${++rn}`,n={id:e,body:t,type:"VISITOR",senderName:null,createdAt:new Date().toISOString(),_sending:!0};return T.value=[...T.value,n],e}function ze(t,e){e?T.value=T.value.map(n=>n.id===t?e:n):T.value=T.value.map(n=>n.id===t?{...n,_sending:!1}:n)}async function sn(t){const e=Nt(t);try{const n=await J("/api/widget/conversations",{method:"POST",body:JSON.stringify({appId:ie,visitorToken:E.value,message:t,visitorName:null,visitorEmail:R.value})});k.value=n.conversationId,K.value=n.visitorId,E.value=n.visitorToken,T.value=n.messages,Me()}catch{ze(e,null)}}async function ln(t){if(!k.value)return sn(t);const e=Nt(t);try{const n=await J(`/api/widget/conversations/${k.value}/messages`,{method:"POST",body:JSON.stringify({message:t})});ze(e,n)}catch{ze(e,null)}}async function He(){if(!k.value)return;const t=await J(`/api/widget/conversations/${k.value}/messages`);T.value=t.messages}let O=null,P=null;async function an(t,e,n){const{default:i}=await import("pusher-js");return O=new i(t,{cluster:e,channelAuthorization:{endpoint:n,transport:"ajax",headers:{"x-visitor-token":E.value??""}}}),O}function Et(){if(!O||!k.value)return;P&&(P.unbind_all(),O.unsubscribe(P.name));const t=`presence-visitor-${k.value}`;P=O.subscribe(t),P.bind("message:created",e=>{T.value.some(n=>n.id===e.id)||(T.value=[...T.value,e])}),P.bind("typing:start",()=>{ye.value=!0}),P.bind("typing:stop",()=>{ye.value=!1})}function Re(){return!!O}function cn(){P&&(P.unbind_all(),O?.unsubscribe(P.name),P=null),O&&(O.disconnect(),O=null)}function un(t,e){const n=e==="bottom-right";return`
    :host {
      all: initial;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: #1f2937;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    .fc-container {
      position: fixed;
      bottom: 20px;
      ${n?"right: 20px;":"left: 20px;"}
      z-index: 2147483647;
      display: flex;
      flex-direction: column;
      align-items: ${n?"flex-end":"flex-start"};
    }

    .fc-bubble {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: ${t};
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .fc-bubble:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 20px rgba(0,0,0,0.2);
    }

    .fc-window {
      width: 370px;
      max-height: 520px;
      border-radius: 16px;
      overflow: hidden;
      background: white;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;
      animation: fc-slide-up 0.25s ease-out;
    }

    @keyframes fc-slide-up {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fc-header {
      background: ${t};
      color: white;
      padding: 16px;
    }
    .fc-header-title {
      font-size: 15px;
      font-weight: 600;
    }
    .fc-header-subtitle {
      font-size: 12px;
      opacity: 0.85;
      margin-top: 2px;
    }
    .fc-header-close {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      opacity: 0.8;
      padding: 4px;
    }
    .fc-header-close:hover { opacity: 1; }

    .fc-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-height: 200px;
      max-height: 320px;
    }

    .fc-msg-row {
      display: flex;
      flex-direction: column;
    }
    .fc-msg-row-visitor {
      align-items: flex-end;
    }
    .fc-msg-row-agent {
      align-items: flex-start;
    }

    .fc-msg {
      max-width: 80%;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.4;
      word-wrap: break-word;
    }
    .fc-msg-visitor {
      background: ${t};
      color: white;
      border-bottom-right-radius: 4px;
    }
    .fc-msg-agent {
      background: #f3f4f6;
      color: #1f2937;
      border-bottom-left-radius: 4px;
    }
    .fc-msg-sender {
      font-size: 11px;
      color: #6b7280;
      margin-bottom: 2px;
    }
    .fc-msg-time {
      font-size: 10px;
      opacity: 0.6;
      margin-top: 2px;
    }
    .fc-msg-sending {
      opacity: 0.7;
    }
    .fc-sending-indicator {
      display: inline-flex;
      gap: 2px;
      align-items: center;
    }
    .fc-sending-dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.5;
      animation: fc-sending-pulse 1s infinite;
    }
    .fc-sending-dot:nth-child(2) { animation-delay: 0.15s; }
    .fc-sending-dot:nth-child(3) { animation-delay: 0.3s; }
    @keyframes fc-sending-pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }

    .fc-typing {
      align-self: flex-start;
      padding: 8px 12px;
      background: #f3f4f6;
      border-radius: 12px;
      font-size: 13px;
      color: #6b7280;
    }
    .fc-typing-dots span {
      animation: fc-blink 1.4s infinite both;
    }
    .fc-typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .fc-typing-dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes fc-blink {
      0%, 80%, 100% { opacity: 0.3; }
      40% { opacity: 1; }
    }

    .fc-input-area {
      border-top: 1px solid #e5e7eb;
      padding: 12px;
      display: flex;
      gap: 8px;
      align-items: flex-end;
    }
    .fc-input {
      flex: 1;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
      resize: none;
      min-height: 36px;
      max-height: 80px;
      line-height: 1.4;
    }
    .fc-input:focus {
      border-color: ${t};
    }
    .fc-send-btn {
      background: ${t};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      white-space: nowrap;
    }
    .fc-send-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .fc-branding {
      text-align: center;
      padding: 6px;
      font-size: 10px;
      color: #9ca3af;
      border-top: 1px solid #f3f4f6;
    }
    .fc-branding a {
      color: #6b7280;
      text-decoration: none;
    }
    .fc-branding a:hover { text-decoration: underline; }

    .fc-prechat {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .fc-prechat label {
      font-size: 13px;
      font-weight: 500;
      color: #374151;
    }
    .fc-prechat input {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
    }
    .fc-prechat input:focus {
      border-color: ${t};
    }
    .fc-prechat button {
      background: ${t};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
    }

    .fc-offline-form {
      padding: 16px;
      animation: fc-slide-up 0.2s ease-out;
    }
    .fc-offline-header {
      margin-bottom: 12px;
    }
    .fc-offline-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }
    .fc-offline-subtitle {
      font-size: 12px;
      color: #6b7280;
      margin-top: 2px;
    }
    .fc-offline-fields {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .fc-offline-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .fc-offline-field label {
      font-size: 12px;
      font-weight: 500;
      color: #374151;
    }
    .fc-offline-field input,
    .fc-offline-field textarea {
      width: 100%;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 12px;
      font-size: 13px;
      font-family: inherit;
      outline: none;
      resize: none;
    }
    .fc-offline-field input:focus,
    .fc-offline-field textarea:focus {
      border-color: ${t};
    }
    .fc-offline-error {
      font-size: 12px;
      color: #ef4444;
    }
    .fc-offline-submit {
      background: ${t};
      color: white;
      border: none;
      border-radius: 8px;
      padding: 10px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
    }
    .fc-offline-submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .fc-offline-dismiss {
      background: none;
      border: none;
      color: #6b7280;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      padding: 6px;
      width: 100%;
    }
    .fc-offline-dismiss:hover {
      color: #374151;
    }
    .fc-offline-success {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 20px 0;
      gap: 8px;
    }
    .fc-offline-success-title {
      font-size: 14px;
      font-weight: 600;
      color: #1f2937;
    }
    .fc-offline-success-text {
      font-size: 12px;
      color: #6b7280;
      line-height: 1.4;
    }
    .fc-offline-success-text strong {
      color: #374151;
    }

    @media (max-width: 440px) {
      .fc-window {
        width: calc(100vw - 24px);
        max-height: calc(100vh - 100px);
        border-radius: 12px;
      }
      .fc-container {
        bottom: 12px;
        ${n?"right: 12px;":"left: 12px;"}
      }
    }
  `}const fn='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',_n='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',dn='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';function pn(){return u("div",{class:"fc-header",style:{position:"relative"},children:[u("div",{class:"fc-header-title",children:N.value.workspaceName||"Support"}),u("div",{class:"fc-header-subtitle",children:"We typically reply in a few minutes"}),u("button",{class:"fc-header-close",onClick:()=>C.value=!1,"aria-label":"Close chat",dangerouslySetInnerHTML:{__html:_n}})]})}function hn(t){try{return new Date(t).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}catch{return""}}function Pt(){const t=B(null);return X(()=>{t.current?.scrollIntoView({behavior:"smooth"})},[T.value.length,ye.value]),Xt.value?u("div",{class:"fc-messages",children:[T.value.map(e=>u("div",{class:`fc-msg-row ${e.type==="VISITOR"?"fc-msg-row-visitor":"fc-msg-row-agent"}`,children:[e.type!=="VISITOR"&&e.senderName&&u("div",{class:"fc-msg-sender",children:e.senderName}),u("div",{class:`fc-msg ${e.type==="VISITOR"?"fc-msg-visitor":"fc-msg-agent"}${e._sending?" fc-msg-sending":""}`,children:[e.body,u("div",{class:"fc-msg-time",children:e._sending?u("span",{class:"fc-sending-indicator",children:[u("span",{class:"fc-sending-dot"}),u("span",{class:"fc-sending-dot"}),u("span",{class:"fc-sending-dot"})]}):hn(e.createdAt)})]})]},e.id)),ye.value&&u("div",{class:"fc-typing",children:u("span",{class:"fc-typing-dots",children:[u("span",{children:"."}),u("span",{children:"."}),u("span",{children:"."})]})}),u("div",{ref:t})]}):u("div",{class:"fc-messages",children:u("div",{class:"fc-msg fc-msg-agent",children:N.value.welcomeMessage})})}function vn(){const t=B(null);async function e(){const i=ne.value.trim();!i||Tt.value||(ne.value="",await ln(i),t.current?.focus())}function n(i){i.key==="Enter"&&!i.shiftKey&&(i.preventDefault(),e())}return u("div",{class:"fc-input-area",children:[u("textarea",{ref:t,class:"fc-input",rows:1,placeholder:"Type a message...",value:ne.value,onInput:i=>{ne.value=i.target.value},onKeyDown:n}),u("button",{class:"fc-send-btn",onClick:e,disabled:!ne.value.trim()||Tt.value,children:"Send"})]})}function mn(){const[t,e]=M(""),[n,i]=M(""),[r,o]=M(!1);async function l(a){a.preventDefault();const f=t.trim();if(!f||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f)){i("Please enter a valid email address.");return}o(!0),i("");try{await Ue({email:f}),R.value=f}catch{i("Something went wrong. Please try again.")}finally{o(!1)}}return u("form",{class:"fc-prechat",onSubmit:l,children:[u("label",{children:"Enter your email to start chatting"}),u("input",{type:"email",placeholder:"you@example.com",value:t,onInput:a=>e(a.target.value),required:!0}),n&&u("div",{style:{color:"#ef4444",fontSize:"12px"},children:n}),u("button",{type:"submit",disabled:r,children:r?"...":"Start Chat"})]})}function gn(){const[t,e]=M(""),[n,i]=M(R.value??""),[r,o]=M(""),[l,a]=M(!1),[f,c]=M(!1),[d,s]=M("");async function p(g){g.preventDefault();const b=n.trim();if(!b||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b)){s("Please enter a valid email address.");return}c(!0),s("");try{await Ue({email:b,name:t.trim()||void 0}),R.value=b,a(!0)}catch{s("Something went wrong. Please try again.")}finally{c(!1)}}function _(){be.value=!1}return l?u("div",{class:"fc-offline-form",children:u("div",{class:"fc-offline-success",children:[u("svg",{width:"32",height:"32",viewBox:"0 0 24 24",fill:"none",stroke:N.value.primaryColor,"stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",children:[u("path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"}),u("polyline",{points:"22 4 12 14.01 9 11.01"})]}),u("p",{class:"fc-offline-success-title",children:"Thanks! We'll be in touch."}),u("p",{class:"fc-offline-success-text",children:["We'll get back to you at ",u("strong",{children:n})," as soon as possible."]}),u("button",{class:"fc-offline-dismiss",onClick:_,children:"Continue chatting"})]})}):u("div",{class:"fc-offline-form",children:[u("div",{class:"fc-offline-header",children:[u("p",{class:"fc-offline-title",children:"We're not available right now"}),u("p",{class:"fc-offline-subtitle",children:"Leave your details and we'll get back to you."})]}),u("form",{class:"fc-offline-fields",onSubmit:p,children:[u("div",{class:"fc-offline-field",children:[u("label",{children:"Name"}),u("input",{type:"text",placeholder:"Your name",value:t,onInput:g=>e(g.target.value)})]}),u("div",{class:"fc-offline-field",children:[u("label",{children:"Email *"}),u("input",{type:"email",placeholder:"you@example.com",value:n,onInput:g=>i(g.target.value),required:!0})]}),u("div",{class:"fc-offline-field",children:[u("label",{children:"Message"}),u("textarea",{placeholder:"Anything else you'd like us to know?",rows:3,value:r,onInput:g=>o(g.target.value)})]}),d&&u("div",{class:"fc-offline-error",children:d}),u("button",{type:"submit",class:"fc-offline-submit",disabled:f,children:f?"Sending...":"Leave a message"}),u("button",{type:"button",class:"fc-offline-dismiss",onClick:_,children:"Continue chatting"})]})]})}function yn(){return u("div",{class:"fc-window",children:[u(pn,{}),Qt.value?u(mn,{}):be.value?u(z,{children:[u(Pt,{}),u(gn,{})]}):u(z,{children:[u(Pt,{}),u(vn,{})]}),N.value.showBranding&&u("div",{class:"fc-branding",children:["Powered by"," ",u("a",{href:"https://guddesk.com",target:"_blank",rel:"noopener",children:"GudDesk"})]})]})}function bn(){return u("button",{class:"fc-bubble",onClick:()=>C.value=!C.value,"aria-label":C.value?"Close chat":"Open chat",dangerouslySetInnerHTML:{__html:C.value?dn:fn}})}const xn=4e3;function wn({appId:t,baseUrl:e,pusherKey:n,pusherCluster:i}){const r=B(null),o=B(!1),l=B(null),a=B(0);function f(){c(),r.current=setInterval(()=>{k.value&&C.value&&He().catch(()=>{})},xn)}function c(){r.current&&(clearInterval(r.current),r.current=null)}async function d(s,p){if(!o.current){o.current=!0;try{await an(s,p,`${e}/api/pusher/auth`),k.value&&Et(),c()}catch{o.current=!1,f()}}}return X(()=>(en(),tn(t,e),Promise.all([nn().catch(()=>{}),on().catch(()=>{})]).then(()=>{k.value&&He().catch(()=>{});const s=n||N.value.pusherKey,p=i||N.value.pusherCluster;s&&p?d(s,p):f()}),()=>{cn(),c()}),[]),X(()=>{k.value&&(Re()?Et():r.current||f())},[k.value]),X(()=>{C.value&&k.value&&!Re()?(He().catch(()=>{}),f()):!C.value&&!Re()&&c()},[C.value]),X(()=>{const s=N.value.offlineFormTimeout;if(!s||!k.value)return;const p=T.value,_=p.filter(b=>b.type==="VISITOR").length;if(p.some(b=>b.type==="AGENT"||b.type==="BOT")){be.value=!1,l.current&&(clearTimeout(l.current),l.current=null),a.current=_;return}return _>a.current&&(a.current=_,l.current&&clearTimeout(l.current),l.current=setTimeout(()=>{T.value.some(m=>m.type==="AGENT"||m.type==="BOT")||(be.value=!0)},s*60*1e3)),()=>{l.current&&(clearTimeout(l.current),l.current=null)}},[T.value,k.value,N.value.offlineFormTimeout]),u(z,{children:[u("style",{children:un(N.value.primaryColor,N.value.position)}),u("div",{class:"fc-container",children:[C.value&&u(yn,{}),u(bn,{})]})]})}let oe=null;function kn(){const t=document.querySelectorAll("script[src]");for(let e=t.length-1;e>=0;e--){const n=t[e].src;if(n.includes("guddesk")||n.includes("widget"))try{return new URL(n).origin}catch{}}return window.location.origin}function Le(t){if(oe)return;const e=t.appId;if(!e){console.error("[GudDesk] Missing appId in GudDeskSettings");return}const n=t.baseUrl||kn(),i=document.createElement("div");i.id="guddesk-widget",document.body.appendChild(i),oe=i.attachShadow({mode:"open"}),ot(Ke(wn,{appId:e,baseUrl:n,pusherKey:t.pusherKey,pusherCluster:t.pusherCluster}),oe)}function $n(){const t=document.getElementById("guddesk-widget");t&&(ot(null,oe),t.remove(),oe=null)}const Ot={init:Le,identify:t=>Ue(t),open:()=>{C.value=!0},close:()=>{C.value=!1},destroy:$n};return window.GudDesk=Ot,window.GudDeskSettings&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Le(window.GudDeskSettings)):Le(window.GudDeskSettings)),Ot}));
