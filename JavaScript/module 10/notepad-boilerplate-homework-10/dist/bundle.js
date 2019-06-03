!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=12)}([function(t,e,r){"use strict";var n,o,i,a=r(5),s="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";function c(){i=!1}function u(t){if(t){if(t!==n){if(t.length!==s.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter(function(t,e,r){return e!==r.lastIndexOf(t)});if(e.length)throw new Error("Custom alphabet for shortid must be "+s.length+" unique characters. These characters were not unique: "+e.join(", "));n=t,c()}}else n!==s&&(n=s,c())}function l(){return i||(i=function(){n||u(s);for(var t,e=n.split(""),r=[],o=a.nextValue();e.length>0;)o=a.nextValue(),t=Math.floor(o*e.length),r.push(e.splice(t,1)[0]);return r.join("")}())}t.exports={get:function(){return n||s},characters:function(t){return u(t),n},seed:function(t){a.seed(t),o!==t&&(c(),o=t)},lookup:function(t){return l()[t]},shuffled:l}},function(t){t.exports=[{id:"XWaQXcbk0",title:"JavaScript essentials",body:"Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc",priority:2},{id:"pkXzyRp1P",title:"Refresh HTML and CSS",body:"Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.",priority:1},{id:"QMom9q4Ku",title:"Get comfy with Frontend frameworks",body:"First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.",priority:1},{id:"k2k0UrjZG",title:"Winter clothes",body:"Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",priority:0}]},function(t,e,r){},function(t,e,r){"use strict";t.exports=r(4)},function(t,e,r){"use strict";var n=r(0),o=r(6),i=r(10),a=r(11)||0;function s(){return o(a)}t.exports=s,t.exports.generate=s,t.exports.seed=function(e){return n.seed(e),t.exports},t.exports.worker=function(e){return a=e,t.exports},t.exports.characters=function(t){return void 0!==t&&n.characters(t),n.shuffled()},t.exports.isValid=i},function(t,e,r){"use strict";var n=1;t.exports={nextValue:function(){return(n=(9301*n+49297)%233280)/233280},seed:function(t){n=t}}},function(t,e,r){"use strict";var n,o,i=r(7),a=(r(0),1459707606518),s=6;t.exports=function(t){var e="",r=Math.floor(.001*(Date.now()-a));return r===o?n++:(n=0,o=r),e+=i(s),e+=i(t),n>0&&(e+=i(n)),e+=i(r)}},function(t,e,r){"use strict";var n=r(0),o=r(8),i=r(9);t.exports=function(t){for(var e,r=0,a="";!e;)a+=i(o,n.get(),1),e=t<Math.pow(16,r+1),r++;return a}},function(t,e,r){"use strict";var n,o="object"==typeof window&&(window.crypto||window.msCrypto);n=o&&o.getRandomValues?function(t){return o.getRandomValues(new Uint8Array(t))}:function(t){for(var e=[],r=0;r<t;r++)e.push(Math.floor(256*Math.random()));return e},t.exports=n},function(t,e){t.exports=function(t,e,r){var n=(2<<Math.log(e.length-1)/Math.LN2)-1,o=Math.ceil(1.6*n*r/e.length);r=+r;for(var i="";;)for(var a=t(o),s=0;s<o;s++){var c=a[s]&n;if(e[c]&&(i+=e[c]).length===r)return i}}},function(t,e,r){"use strict";var n=r(0);t.exports=function(t){return!(!t||"string"!=typeof t||t.length<6||new RegExp("[^"+n.get().replace(/[|\\{}()[\]^$+*?.-]/g,"\\$&")+"]").test(t))}},function(t,e,r){"use strict";t.exports=0},function(t,e,r){"use strict";r.r(e);r(2);var n=0,o="edit",i="delete",a="expand_more",s="expand_less",c="delete-note",u="edit-note",l="increase-priority",d="decrease-priority",f=r(1);function y(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var p,v,m,h=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._notes=e}var e,r,n;return e=t,(r=[{key:"findNoteById",value:function(t){var e=!0,r=!1,n=void 0;try{for(var o,i=this._notes[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){var a=o.value;if(a.id===t)return a}}catch(t){r=!0,n=t}finally{try{e||null==i.return||i.return()}finally{if(r)throw n}}}},{key:"saveNote",value:function(t){return this._notes.push(t),t}},{key:"deleteNote",value:function(t){this.findNoteById(t)&&this._notes.splice(this._notes.indexOf(this.findNoteById(t)),1)}},{key:"updateNoteContent",value:function(t,e){var r=this.findNoteById(t);if(r)return Object.assign(r,e)}},{key:"updateNotePriority",value:function(t,e){var r=this.findNoteById(t);if(r)return r.priority=e,r}},{key:"filterNotesByQuery",value:function(t){var e=[],r=!0,n=!1,o=void 0;try{for(var i,a=this.notes[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var s=i.value,c=s.title,u=s.body;"".concat(c," ").concat(u).toLowerCase().includes(t.toLowerCase())&&e.push(s)}}catch(t){n=!0,o=t}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}return e}},{key:"filterNotesByPriority",value:function(t){var e=[],r=!0,n=!1,o=void 0;try{for(var i,a=this._notes[Symbol.iterator]();!(r=(i=a.next()).done);r=!0){var s=i.value;t===s.priority&&e.push(s)}}catch(t){n=!0,o=t}finally{try{r||null==a.return||a.return()}finally{if(n)throw o}}return e}},{key:"notes",get:function(){return this._notes}}])&&y(e.prototype,r),n&&y(e,n),t}();function g(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}m={LOW:0,NORMAL:1,HIGH:2},(v="Priority")in(p=h)?Object.defineProperty(p,v,{value:m,enumerable:!0,configurable:!0,writable:!0}):p[v]=m;var b=function(t){var e=t.id,r=(t.title,t.body,t.priority,document.createElement("li"));r.classList.add("note-list__item"),r.dataset.id=e;var n=document.createElement("div");return n.classList.add("note"),n.append(w(t),S(t)),r.append(n),r},w=function(t){t.id;var e=t.title,r=t.body,n=(t.priority,document.createElement("div"));n.classList.add("note__content");var o=document.createElement("h2");o.classList.add("note__title"),o.textContent=e;var i=document.createElement("p");return i.classList.add("note__body"),i.textContent=r,n.append(o,i),n},x=function(t,e){var r=document.createElement("button");r.classList.add("action"),r.dataset.action=t;var n=document.createElement("i");return n.classList.add("material-icons"),n.classList.add("action__icon"),n.textContent=e,r.append(n),r},S=function(t){t.id,t.title,t.body;var e=t.priority,r=document.createElement("footer");r.classList.add("note__footer");var n=document.createElement("section");n.classList.add("note__section");var f=document.createElement("span");f.classList.add("note__priority"),f.textContent=e;var y=document.createElement("section");return y.classList.add("note__section"),n.append(x(d,a),x(l,s),f),y.append(x(u,o),x(c,i)),r.append(n,y),r},k=function(t,e){var r=e.map(function(t){return b(t)});t.innerHTML="",t.append.apply(t,g(r))},j=r(3),E=new h(f),M={list:document.querySelector("ul.note-list"),form:document.querySelector(".note-editor"),filter:document.querySelector(".search-form"),title:document.querySelector('input[name="note_title"]'),textarea:document.querySelector('textarea[name="note_body"]'),buttonDelete:document.querySelector('button[data-action="delete-note"]')};console.log("Все текущие заметки: ",E.notes);k(M.list,f),M.form.addEventListener("submit",function(t){t.preventDefault();var e=M.title.value,r=M.textarea.value,o={id:j.generate(),title:e,body:r,priority:n};if(!o.title||!o.body)return alert("Необходимо заполнить все поля!");var i,a,s=E.saveNote(o);i=M.list,a=b(s),i.appendChild(a),t.currentTarget.reset()}),M.list.addEventListener("click",function(t){var e;t.preventDefault(),"delete-note"===t.target.parentNode.dataset.action&&(e=t.target.closest("li"),E.deleteNote(e.dataset.id),e.remove())}),M.filter.addEventListener("input",function(t){var e=E.filterNotesByQuery(t.target.value);k(M.list,e)})}]);
//# sourceMappingURL=bundle.js.map