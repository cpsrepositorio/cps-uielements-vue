import{w as v,a as g}from"./index.c1377b41.js";import"./iframe.83217c2f.js";import"./make-decorator.2bd327bd.js";var w=[v];function c(r,e){return T(r)||m(r,e)||d(r,e)||A()}function A(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function d(r,e){if(!!r){if(typeof r=="string")return y(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return y(r,e)}}function y(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function m(r,e){var t=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(t!=null){var n=[],a=!0,f=!1,s,i;try{for(t=t.call(r);!(a=(s=t.next()).done)&&(n.push(s.value),!(e&&n.length===e));a=!0);}catch(o){f=!0,i=o}finally{try{!a&&t.return!=null&&t.return()}finally{if(f)throw i}}return n}}function T(r){if(Array.isArray(r))return r}var p=function(e,t){return typeof t[e]>"u"&&!(e in t)},b=function(e){var t=e.initialArgs,n=e.argTypes,a=e.parameters.actions;if(!a||a.disable||!a.argTypesRegex||!n)return{};var f=new RegExp(a.argTypesRegex),s=Object.entries(n).filter(function(i){var o=c(i,1),u=o[0];return!!f.test(u)});return s.reduce(function(i,o){var u=c(o,2),l=u[0];return u[1],p(l,t)&&(i[l]=g(l)),i},{})},_=function(e){var t=e.initialArgs,n=e.argTypes,a=e.parameters.actions;if(a!=null&&a.disable||!n)return{};var f=Object.entries(n).filter(function(s){var i=c(s,2);i[0];var o=i[1];return!!o.action});return f.reduce(function(s,i){var o=c(i,2),u=o[0],l=o[1];return p(u,t)&&(s[u]=g(typeof l.action=="string"?l.action:u)),s},{})},j=[_,b];export{j as argsEnhancers,w as decorators};
//# sourceMappingURL=preview.061472cb.js.map
