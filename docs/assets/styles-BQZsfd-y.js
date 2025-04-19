import{g as ne,w as re,r as oe,h as ae,d as le,i as ce,j as ie,k as ue}from"./index-Dh27MN8o.js";var A={d:(e,t)=>{for(var n in t)A.o(t,n)&&!A.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},_={};function H(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,l=new Array(t);n<t;n++)l[n]=e[n];return l}function G(e,t){if(e){if(typeof e=="string")return H(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set"?Array.from(e):n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?H(e,t):void 0}}function E(e){return function(t){if(Array.isArray(t))return H(t)}(e)||function(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}(e)||G(e)||function(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}A.d(_,{Z:()=>fe});const o=(Z={computed:()=>ue,createTextVNode:()=>ie,createVNode:()=>ce,defineComponent:()=>le,reactive:()=>ae,ref:()=>oe,watch:()=>re,watchEffect:()=>ne},K={},A.d(K,Z),K),se=(0,o.defineComponent)({props:{data:{required:!0,type:String},onClick:Function},render:function(){var e=this.data,t=this.onClick;return(0,o.createVNode)("span",{class:"vjs-tree-brackets",onClick:t},[e])}}),de=(0,o.defineComponent)({emits:["change","update:modelValue"],props:{checked:{type:Boolean,default:!1},isMultiple:Boolean,onChange:Function},setup:function(e,t){var n=t.emit;return{uiType:(0,o.computed)(function(){return e.isMultiple?"checkbox":"radio"}),model:(0,o.computed)({get:function(){return e.checked},set:function(l){return n("update:modelValue",l)}})}},render:function(){var e=this.uiType,t=this.model,n=this.$emit;return(0,o.createVNode)("label",{class:["vjs-check-controller",t?"is-checked":""],onClick:function(l){return l.stopPropagation()}},[(0,o.createVNode)("span",{class:"vjs-check-controller-inner is-".concat(e)},null),(0,o.createVNode)("input",{checked:t,class:"vjs-check-controller-original is-".concat(e),type:e,onChange:function(){return n("change",t)}},null)])}}),pe=(0,o.defineComponent)({props:{nodeType:{required:!0,type:String},onClick:Function},render:function(){var e=this.nodeType,t=this.onClick,n=e==="objectStart"||e==="arrayStart";return n||e==="objectCollapsed"||e==="arrayCollapsed"?(0,o.createVNode)("span",{class:"vjs-carets vjs-carets-".concat(n?"open":"close"),onClick:t},[(0,o.createVNode)("svg",{viewBox:"0 0 1024 1024",focusable:"false","data-icon":"caret-down",width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},[(0,o.createVNode)("path",{d:"M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"},null)])]):null}});var Z,K;function M(e){return M=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},M(e)}function X(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function O(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"root",n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,l=arguments.length>3?arguments[3]:void 0,p=l||{},y=p.key,C=p.index,d=p.type,b=d===void 0?"content":d,f=p.showComma,N=f!==void 0&&f,w=p.length,S=w===void 0?1:w,V=X(e);if(V==="array"){var T=$(e.map(function(v,u,r){return O(v,"".concat(t,"[").concat(u,"]"),n+1,{index:u,showComma:u!==r.length-1,length:S,type:b})}));return[O("[",t,n,{showComma:!1,key:y,length:e.length,type:"arrayStart"})[0]].concat(T,O("]",t,n,{showComma:N,length:e.length,type:"arrayEnd"})[0])}if(V==="object"){var j=Object.keys(e),x=$(j.map(function(v,u,r){return O(e[v],/^[a-zA-Z_]\w*$/.test(v)?"".concat(t,".").concat(v):"".concat(t,'["').concat(v,'"]'),n+1,{key:v,showComma:u!==r.length-1,length:S,type:b})}));return[O("{",t,n,{showComma:!1,key:y,index:C,length:j.length,type:"objectStart"})[0]].concat(x,O("}",t,n,{showComma:N,length:j.length,type:"objectEnd"})[0])}return[{content:e,level:n,key:y,index:C,path:t,showComma:N,length:S,type:b}]}function $(e){if(typeof Array.prototype.flat=="function")return e.flat();for(var t=E(e),n=[];t.length;){var l=t.shift();Array.isArray(l)?t.unshift.apply(t,E(l)):n.push(l)}return n}function Q(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:new WeakMap;if(e==null)return e;if(e instanceof Date)return new Date(e);if(e instanceof RegExp)return new RegExp(e);if(M(e)!=="object")return e;if(t.get(e))return t.get(e);if(Array.isArray(e)){var n=e.map(function(y){return Q(y,t)});return t.set(e,n),n}var l={};for(var p in e)l[p]=Q(e[p],t);return t.set(e,l),l}function W(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter(function(p){return Object.getOwnPropertyDescriptor(e,p).enumerable})),n.push.apply(n,l)}return n}function J(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?W(Object(n),!0).forEach(function(l){D(e,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):W(Object(n)).forEach(function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(n,l))})}return e}var ee={showLength:{type:Boolean,default:!1},showDoubleQuotes:{type:Boolean,default:!0},renderNodeKey:Function,renderNodeValue:Function,selectableType:String,showSelectController:{type:Boolean,default:!1},showLine:{type:Boolean,default:!0},showLineNumber:{type:Boolean,default:!1},selectOnClickNode:{type:Boolean,default:!0},nodeSelectable:{type:Function,default:function(){return!0}},highlightSelectedNode:{type:Boolean,default:!0},showIcon:{type:Boolean,default:!1},theme:{type:String,default:"light"},showKeyValueSpace:{type:Boolean,default:!0},editable:{type:Boolean,default:!1},editableTrigger:{type:String,default:"click"},onNodeClick:{type:Function},onBracketsClick:{type:Function},onIconClick:{type:Function},onValueChange:{type:Function}};const he=(0,o.defineComponent)({name:"TreeNode",props:J(J({},ee),{},{node:{type:Object,required:!0},collapsed:Boolean,checked:Boolean,style:Object,onSelectedChange:{type:Function}}),emits:["nodeClick","bracketsClick","iconClick","selectedChange","valueChange"],setup:function(e,t){var n=t.emit,l=(0,o.computed)(function(){return X(e.node.content)}),p=(0,o.computed)(function(){return"vjs-value vjs-value-".concat(l.value)}),y=(0,o.computed)(function(){return e.showDoubleQuotes?'"'.concat(e.node.key,'"'):e.node.key}),C=(0,o.computed)(function(){return e.selectableType==="multiple"}),d=(0,o.computed)(function(){return e.selectableType==="single"}),b=(0,o.computed)(function(){return e.nodeSelectable(e.node)&&(C.value||d.value)}),f=(0,o.reactive)({editing:!1}),N=function(u){var r,a,c=(a=(r=u.target)===null||r===void 0?void 0:r.value)==="null"?null:a==="undefined"?void 0:a==="true"||a!=="false"&&(a[0]+a[a.length-1]==='""'||a[0]+a[a.length-1]==="''"?a.slice(1,-1):typeof Number(a)=="number"&&!isNaN(Number(a))||a==="NaN"?Number(a):a);n("valueChange",c,e.node.path)},w=(0,o.computed)(function(){var u,r=(u=e.node)===null||u===void 0?void 0:u.content;return r===null?r="null":r===void 0&&(r="undefined"),l.value==="string"?'"'.concat(r,'"'):r+""}),S=function(){var u=e.renderNodeValue;return u?u({node:e.node,defaultValue:w.value}):w.value},V=function(){n("bracketsClick",!e.collapsed,e.node)},T=function(){n("iconClick",!e.collapsed,e.node)},j=function(){n("selectedChange",e.node)},x=function(){n("nodeClick",e.node),b.value&&e.selectOnClickNode&&n("selectedChange",e.node)},v=function(u){if(e.editable&&!f.editing){f.editing=!0;var r=function a(c){var i;c.target!==u.target&&((i=c.target)===null||i===void 0?void 0:i.parentElement)!==u.target&&(f.editing=!1,document.removeEventListener("click",a))};document.removeEventListener("click",r),document.addEventListener("click",r)}};return function(){var u,r=e.node;return(0,o.createVNode)("div",{class:{"vjs-tree-node":!0,"has-selector":e.showSelectController,"has-carets":e.showIcon,"is-highlight":e.highlightSelectedNode&&e.checked,dark:e.theme==="dark"},onClick:x,style:e.style},[e.showLineNumber&&(0,o.createVNode)("span",{class:"vjs-node-index"},[r.id+1]),e.showSelectController&&b.value&&r.type!=="objectEnd"&&r.type!=="arrayEnd"&&(0,o.createVNode)(de,{isMultiple:C.value,checked:e.checked,onChange:j},null),(0,o.createVNode)("div",{class:"vjs-indent"},[Array.from(Array(r.level)).map(function(a,c){return(0,o.createVNode)("div",{key:c,class:{"vjs-indent-unit":!0,"has-line":e.showLine}},null)}),e.showIcon&&(0,o.createVNode)(pe,{nodeType:r.type,onClick:T},null)]),r.key&&(0,o.createVNode)("span",{class:"vjs-key"},[(u=e.renderNodeKey,u?u({node:e.node,defaultKey:y.value||""}):y.value),(0,o.createVNode)("span",{class:"vjs-colon"},[":".concat(e.showKeyValueSpace?" ":"")])]),(0,o.createVNode)("span",null,[r.type!=="content"&&r.content?(0,o.createVNode)(se,{data:r.content.toString(),onClick:V},null):(0,o.createVNode)("span",{class:p.value,onClick:!e.editable||e.editableTrigger&&e.editableTrigger!=="click"?void 0:v,onDblclick:e.editable&&e.editableTrigger==="dblclick"?v:void 0},[e.editable&&f.editing?(0,o.createVNode)("input",{value:w.value,onChange:N,style:{padding:"3px 8px",border:"1px solid #eee",boxShadow:"none",boxSizing:"border-box",borderRadius:5,fontFamily:"inherit"}},null):S()]),r.showComma&&(0,o.createVNode)("span",null,[","]),e.showLength&&e.collapsed&&(0,o.createVNode)("span",{class:"vjs-comment"},[(0,o.createTextVNode)(" // "),r.length,(0,o.createTextVNode)(" items ")])])])}}});function U(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter(function(p){return Object.getOwnPropertyDescriptor(e,p).enumerable})),n.push.apply(n,l)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?U(Object(n),!0).forEach(function(l){D(e,l,n[l])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):U(Object(n)).forEach(function(l){Object.defineProperty(e,l,Object.getOwnPropertyDescriptor(n,l))})}return e}const fe=(0,o.defineComponent)({name:"Tree",props:g(g({},ee),{},{data:{type:[String,Number,Boolean,Array,Object],default:null},collapsedNodeLength:{type:Number,default:1/0},deep:{type:Number,default:1/0},pathCollapsible:{type:Function,default:function(){return!1}},rootPath:{type:String,default:"root"},virtual:{type:Boolean,default:!1},height:{type:Number,default:400},itemHeight:{type:Number,default:20},selectedValue:{type:[String,Array],default:function(){return""}},collapsedOnClickBrackets:{type:Boolean,default:!0},style:Object,onSelectedChange:{type:Function},theme:{type:String,default:"light"}}),slots:["renderNodeKey","renderNodeValue"],emits:["nodeClick","bracketsClick","iconClick","selectedChange","update:selectedValue","update:data"],setup:function(e,t){var n=t.emit,l=t.slots,p=(0,o.ref)(),y=(0,o.computed)(function(){return O(e.data,e.rootPath)}),C=function(r,a){return y.value.reduce(function(c,i){var s,h=i.level>=r||i.length>=a,m=(s=e.pathCollapsible)===null||s===void 0?void 0:s.call(e,i);return i.type!=="objectStart"&&i.type!=="arrayStart"||!h&&!m?c:g(g({},c),{},D({},i.path,1))},{})},d=(0,o.reactive)({translateY:0,visibleData:null,hiddenPaths:C(e.deep,e.collapsedNodeLength)}),b=(0,o.computed)(function(){for(var r=null,a=[],c=y.value.length,i=0;i<c;i++){var s=g(g({},y.value[i]),{},{id:i}),h=d.hiddenPaths[s.path];if(r&&r.path===s.path){var m=r.type==="objectStart",B=g(g(g({},s),r),{},{showComma:s.showComma,content:m?"{...}":"[...]",type:m?"objectCollapsed":"arrayCollapsed"});r=null,a.push(B)}else{if(h&&!r){r=s;continue}if(r)continue;a.push(s)}}return a}),f=(0,o.computed)(function(){var r=e.selectedValue;return r&&e.selectableType==="multiple"&&Array.isArray(r)?r:[r]}),N=(0,o.computed)(function(){return!e.selectableType||e.selectOnClickNode||e.showSelectController?"":"When selectableType is not null, selectOnClickNode and showSelectController cannot be false at the same time, because this will cause the selection to fail."}),w=function(){var r=b.value;if(e.virtual){var a,c=e.height/e.itemHeight,i=((a=p.value)===null||a===void 0?void 0:a.scrollTop)||0,s=Math.floor(i/e.itemHeight),h=s<0?0:s+c>r.length?r.length-c:s;h<0&&(h=0);var m=h+c;d.translateY=h*e.itemHeight,d.visibleData=r.filter(function(B,L){return L>=h&&L<m})}else d.visibleData=r},S=function(){w()},V=function(r){var a,c,i=r.path,s=e.selectableType;if(s==="multiple"){var h=f.value.findIndex(function(k){return k===i}),m=E(f.value);h!==-1?m.splice(h,1):m.push(i),n("update:selectedValue",m),n("selectedChange",m,E(f.value))}else if(s==="single"&&f.value[0]!==i){var B=(a=f.value,c=1,function(k){if(Array.isArray(k))return k}(a)||function(k,Y){var P=k==null?null:typeof Symbol<"u"&&k[Symbol.iterator]||k["@@iterator"];if(P!=null){var q,z,F=[],I=!0,R=!1;try{for(P=P.call(k);!(I=(q=P.next()).done)&&(F.push(q.value),!Y||F.length!==Y);I=!0);}catch(te){R=!0,z=te}finally{try{I||P.return==null||P.return()}finally{if(R)throw z}}return F}}(a,c)||G(a,c)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}())[0],L=i;n("update:selectedValue",L),n("selectedChange",L,B)}},T=function(r){n("nodeClick",r)},j=function(r,a){if(r)d.hiddenPaths=g(g({},d.hiddenPaths),{},D({},a,1));else{var c=g({},d.hiddenPaths);delete c[a],d.hiddenPaths=c}},x=function(r,a){e.collapsedOnClickBrackets&&j(r,a.path),n("bracketsClick",r,a)},v=function(r,a){j(r,a.path),n("iconClick",r,a)},u=function(r,a){var c=Q(e.data),i=e.rootPath;new Function("data","val","data".concat(a.slice(i.length),"=val"))(c,r),n("update:data",c)};return(0,o.watchEffect)(function(){N.value&&function(r){throw new Error("[VueJSONPretty] ".concat(r))}(N.value)}),(0,o.watchEffect)(function(){b.value&&w()}),(0,o.watch)(function(){return e.deep},function(r){r&&(d.hiddenPaths=C(r,e.collapsedNodeLength))}),(0,o.watch)(function(){return e.collapsedNodeLength},function(r){r&&(d.hiddenPaths=C(e.deep,r))}),function(){var r,a,c=(r=e.renderNodeKey)!==null&&r!==void 0?r:l.renderNodeKey,i=(a=e.renderNodeValue)!==null&&a!==void 0?a:l.renderNodeValue,s=d.visibleData&&d.visibleData.map(function(h){return(0,o.createVNode)(he,{key:h.id,node:h,collapsed:!!d.hiddenPaths[h.path],theme:e.theme,showDoubleQuotes:e.showDoubleQuotes,showLength:e.showLength,checked:f.value.includes(h.path),selectableType:e.selectableType,showLine:e.showLine,showLineNumber:e.showLineNumber,showSelectController:e.showSelectController,selectOnClickNode:e.selectOnClickNode,nodeSelectable:e.nodeSelectable,highlightSelectedNode:e.highlightSelectedNode,editable:e.editable,editableTrigger:e.editableTrigger,showIcon:e.showIcon,showKeyValueSpace:e.showKeyValueSpace,renderNodeKey:c,renderNodeValue:i,onNodeClick:T,onBracketsClick:x,onIconClick:v,onSelectedChange:V,onValueChange:u,style:e.itemHeight&&e.itemHeight!==20?{lineHeight:"".concat(e.itemHeight,"px")}:{}},null)});return(0,o.createVNode)("div",{ref:p,class:{"vjs-tree":!0,"is-virtual":e.virtual,dark:e.theme==="dark"},onScroll:e.virtual?S:void 0,style:e.showLineNumber?g({paddingLeft:"".concat(12*Number(y.value.length.toString().length),"px")},e.style):e.style},[e.virtual?(0,o.createVNode)("div",{class:"vjs-tree-list",style:{height:"".concat(e.height,"px")}},[(0,o.createVNode)("div",{class:"vjs-tree-list-holder",style:{height:"".concat(b.value.length*e.itemHeight,"px")}},[(0,o.createVNode)("div",{class:"vjs-tree-list-holder-inner",style:{transform:"translateY(".concat(d.translateY,"px)")}},[s])])]):s])}}});var ge=_.Z;export{ge as S};
