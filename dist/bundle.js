(()=>{"use strict";class e{constructor(e,t,n,r){this.templateEl=document.getElementById(e),this.hostEl=document.getElementById(t);const s=document.importNode(this.templateEl.content,!0);this.element=s.firstElementChild,console.log(this.element),r&&(this.element.id=r),this.attach(n)}attach(e){this.hostEl.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}function t(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minLength&&"string"==typeof e.value&&(t=t&&e.value.length>=e.minLength),null!=e.maxLength&&"string"==typeof e.value&&(t=t&&e.value.length<=e.maxLength),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>=e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<=e.max),t}function n(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var r;!function(e){e[e.Active=0]="Active",e[e.Finished=1]="Finished"}(r||(r={}));class s{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class i{constructor(){this.listeners=[]}addListener(e){this.listeners.push(e)}}class l extends i{constructor(){super(),this.projects=[]}static getInstance(){return this.instance||(this.instance=new l),this.instance}addProject(e,t,n){const i=new s(Math.random().toString(),e,t,n,r.Active);this.projects.push(i),this.updateListeners()}moveProject(e,t){const n=this.projects.find((t=>t.id===e));n&&n.status!==t&&(n.status=t,this.updateListeners())}updateListeners(){for(const e of this.listeners)e(this.projects.slice())}}const o=l.getInstance();class a extends e{constructor(){super("project-input","app",!0,"user-input"),this.titleElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.configure()}configure(){this.element.addEventListener("submit",(e=>this.submitHandler(e)))}renderContent(){}gatherUserInput(){const e=this.titleElement.value,n=this.descriptionInputElement.value,r=this.peopleInputElement.value,s={value:n,required:!0,minLength:5},i={value:+r,required:!0,min:1,max:5};return t({value:e,required:!0})&&t(s)&&t(i)?[e,n,+r]:void alert("Invalid Input, please try again")}clearInputs(){this.titleElement.value="",this.descriptionInputElement.value="",this.peopleInputElement.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,n,r]=t;console.log(e,n,r),o.addProject(e,n,r)}this.clearInputs(),console.log(this.titleElement.value)}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([n],a.prototype,"configure",null);class c extends e{get persons(){return 1===this.project.people?"1 person":`${this.project.people} persons`}constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.renderContent()}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){console.log("DragEnd")}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}renderContent(){this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.persons+" assigned.",this.element.querySelector("p").textContent=this.project.description}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([n],c.prototype,"dragStartHandler",null);var d=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class p extends e{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],this.configure(),this.renderContent()}dragOverHandler(e){e.dataTransfer&&"text/plain"===e.dataTransfer.types[0]&&(e.preventDefault(),this.element.querySelector("ul").classList.add("droppable"))}dropHandler(e){const t=e.dataTransfer.getData("text/plain");o.moveProject(t,"active"===this.type?r.Active:r.Finished)}dragLeaveHandler(e){this.element.querySelector("ul").classList.remove("droppable")}configure(){this.element.addEventListener("dragover",this.dragOverHandler),this.element.addEventListener("dragleave",this.dragLeaveHandler),this.element.addEventListener("drop",this.dropHandler),o.addListener((e=>{const t=e.filter((e=>"active"===this.type?e.status===r.Active:e.status===r.Finished));this.assignedProjects=t,this.renderProjects()}))}renderContent(){const e=`${this.type}-project-id`;this.element.querySelector("ul").id=e,this.element.querySelector("h2").textContent=this.type.toUpperCase()+" Project"}renderProjects(){document.getElementById(`${this.type}-project-id`).innerHTML="";for(const e of this.assignedProjects)new c(this.element.querySelector("ul").id,e)}}d([n],p.prototype,"dragOverHandler",null),d([n],p.prototype,"dropHandler",null),d([n],p.prototype,"dragLeaveHandler",null),new a,new p("active"),new p("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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S1EsUUFBUThELGNBQWMsTUFBTzFELEdBQUkwRyxFQUs5RCxFQXpEQSxHQURDMUYsRyxvQ0FVRCxHQURDQSxHLGdDQU9ELEdBRENBLEcscUNDNUJMLElBQUl3QyxFQUNKLElBQUkrQixFQUFZLFVBQ2hCLElBQUlBLEVBQVksVyIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHR0dXQvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0dHV0Ly4vc3JjL3V0aWwvdmFsaWRhdGlvbi50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0dHV0Ly4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdHR1dC8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0dHV0Ly4vc3JjL3N0YXRlL3Byb2plY3Qtc3RhdGUudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdHR1dC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdHR1dC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaXRlbS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0dHV0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovL3R5cGVzY3JpcHR0dXQvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvbXBvbmV0IEJhc2UgQ2xhc3NcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xyXG4gIHRlbXBsYXRlRWw6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgaG9zdEVsOiBUO1xyXG4gIGVsZW1lbnQ6IFU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgdGVtbGF0ZUlkOiBzdHJpbmcsXHJcbiAgICBIb3N0RWxlbWVudElkOiBzdHJpbmcsXHJcbiAgICBpbnNlcnRBdFN0YXJ0OiBib29sZWFuLFxyXG4gICAgbmV3RWxlbWVudElkPzogc3RyaW5nLFxyXG4gICkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXHJcbiAgICAgIHRlbWxhdGVJZFxyXG4gICAgKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudFxyXG4gICAgdGhpcy5ob3N0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChIb3N0RWxlbWVudElkKSEgYXMgVDtcclxuXHJcbiAgICBjb25zdCBpbXBvcnRlZE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbC5jb250ZW50LCB0cnVlKTtcclxuXHJcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZWxlbWVudCk7XHJcbiAgICBpZiAobmV3RWxlbWVudElkKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF0dGFjaChpbnNlcnRBdFN0YXJ0KVxyXG4gIH1cclxuXHJcblxyXG5cclxuICBwcml2YXRlIGF0dGFjaChpbnNlcnRBdEJlZ2lubmluZzogYm9vbGVhbikge1xyXG4gICAgLy8gdGhpcy5ob3N0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KGluc2VydEF0QmVnaW5uaW5nID8gJ2FmdGVyYmVnaW5uaW5nJyA6ICdiZWZvcmVlbmQnLCB0aGlzLmVsZW1lbnQpO1xyXG4gICAgdGhpcy5ob3N0RWwuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KGluc2VydEF0QmVnaW5uaW5nID8gXCJhZnRlcmJlZ2luXCIgOiBcImJlZm9yZWVuZFwiLCB0aGlzLmVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xyXG59XHJcblxyXG4iLCJcclxuLy8gVmFsaWRhdGlvblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRhYmxlIHtcclxuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgICBtaW5MZW5ndGg/OiBudW1iZXI7XHJcbiAgICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbiAgICBtaW4/OiBudW1iZXI7XHJcbiAgICBtYXg/OiBudW1iZXI7XHJcbiAgfVxyXG4gIFxyXG4gIGV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0YWJsZUlucHV0OiBWYWxpZGF0YWJsZSkge1xyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG4gICAgaWYgKHZhbGlkYXRhYmxlSW5wdXQucmVxdWlyZWQpIHtcclxuICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDA7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoICE9IG51bGwgJiZcclxuICAgICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCJcclxuICAgICkge1xyXG4gICAgICBpc1ZhbGlkID1cclxuICAgICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoID49IHZhbGlkYXRhYmxlSW5wdXQubWluTGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aCAhPSBudWxsICYmXHJcbiAgICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcInN0cmluZ1wiXHJcbiAgICApIHtcclxuICAgICAgaXNWYWxpZCA9XHJcbiAgICAgICAgaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLmxlbmd0aCA8PSB2YWxpZGF0YWJsZUlucHV0Lm1heExlbmd0aDtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdmFsaWRhdGFibGVJbnB1dC5taW4gIT0gbnVsbCAmJlxyXG4gICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIlxyXG4gICAgKSB7XHJcbiAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPj0gdmFsaWRhdGFibGVJbnB1dC5taW47XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHZhbGlkYXRhYmxlSW5wdXQubWF4ICE9IG51bGwgJiZcclxuICAgICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwibnVtYmVyXCJcclxuICAgICkge1xyXG4gICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGlzVmFsaWQ7XHJcbiAgfVxyXG4gIFxyXG4iLCIvLyBBdXRvYmluZCBEZWNvcmF0b3JcclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKF86IGFueSwgXzI6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgICBjb25zdCBhZGpEZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgICAgZ2V0KCkge1xyXG4gICAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHJldHVybiBib3VuZEZuO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICBcclxuICAgIHJldHVybiBhZGpEZXNjcmlwdG9yO1xyXG4gIH1cclxuIiwiXHJcbiAgICBleHBvcnQgZW51bSBQcm9qZWN0U3RhdHVzIHtcclxuICAgICAgICBBY3RpdmUsXHJcbiAgICAgICAgRmluaXNoZWQsXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFByb2plY3Qge1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgICAgICBwdWJsaWMgaWQ6IHN0cmluZyxcclxuICAgICAgICAgICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgICAgICAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXHJcbiAgICAgICAgICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcclxuICAgICAgICApIHsgfVxyXG4gICAgfVxyXG5cclxuXHJcbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcclxuXHJcbi8vIFByb2plY3QgU3RhdGUgTWFuYWdlbWVudFxyXG50eXBlIExpc3RlbmVyPFQ+ID0gKGl0ZW1zOiBUW10pID0+IHZvaWQ7XHJcblxyXG5jbGFzcyBTdGF0ZTxUPntcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XHJcbiAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RTdGF0ZSBleHRlbmRzIFN0YXRlPFByb2plY3Q+e1xyXG5cclxuICBwcml2YXRlIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xyXG5cclxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgc3VwZXIoKVxyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuXHJcbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBudW1PZlBlb3BsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBudW1PZlBlb3BsZSxcclxuICAgICAgUHJvamVjdFN0YXR1cy5BY3RpdmVcclxuICAgICk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgXHJcbiAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpXHJcbiAgfVxyXG5cclxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgbmV3U3RhdHVzOiBQcm9qZWN0U3RhdHVzKXtcclxuICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLnByb2plY3RzLmZpbmQocHJqID0+IHByai5pZCA9PT0gcHJvamVjdElkKVxyXG4gICAgaWYgKHByb2plY3QgJiYgcHJvamVjdC5zdGF0dXMgIT09IG5ld1N0YXR1cykge1xyXG4gICAgICBwcm9qZWN0LnN0YXR1cyA9IG5ld1N0YXR1c1xyXG4gICAgICB0aGlzLnVwZGF0ZUxpc3RlbmVycygpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHVwZGF0ZUxpc3RlbmVycygpe1xyXG4gICAgZm9yIChjb25zdCBsaXN0bmVyRm4gb2YgdGhpcy5saXN0ZW5lcnMpIHtcclxuICAgICAgbGlzdG5lckZuKHRoaXMucHJvamVjdHMuc2xpY2UoKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XHJcbiAgICBcclxuIiwiaW1wb3J0IENtcCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgKiBhcyBWYWxpZGF0aW9uIGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb25cIjsgXHJcbmltcG9ydCB7IGF1dG9iaW5kIGFzIEF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlL3Byb2plY3Qtc3RhdGVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ21wPEhUTUxEaXZFbGVtZW50LCBIVE1MRGl2RWxlbWVudD4ge1xyXG4gICAgdGl0bGVFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwZW9wbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJwcm9qZWN0LWlucHV0XCIsICdhcHAnLCB0cnVlLCBcInVzZXItaW5wdXRcIilcclxuXHJcblxyXG4gICAgICAgIHRoaXMudGl0bGVFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiI3RpdGxlXCJcclxuICAgICAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICBcIiNkZXNjcmlwdGlvblwiXHJcbiAgICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiI3Blb3BsZVwiXHJcbiAgICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBBdXRvYmluZFxyXG4gICAgY29uZmlndXJlKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT5cclxuICAgICAgICAgICAgdGhpcy5zdWJtaXRIYW5kbGVyKGV2ZW50KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgICAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGVudGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgdGl0bGVWYWxpZGF0YWJsZTogVmFsaWRhdGlvbi5WYWxpZGF0YWJsZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IGVudGVyZWRUaXRsZSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiA1LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcGVvcGxlVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiArZW50ZXJlZFBlb3BsZSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogMSxcclxuICAgICAgICAgICAgbWF4OiA1LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUodGl0bGVWYWxpZGF0YWJsZSkgfHxcclxuICAgICAgICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0YWJsZSkgfHxcclxuICAgICAgICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUocGVvcGxlVmFsaWRhdGFibGUpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiSW52YWxpZCBJbnB1dCwgcGxlYXNlIHRyeSBhZ2FpblwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbZW50ZXJlZFRpdGxlLCBlbnRlcmVkRGVzY3JpcHRpb24sICtlbnRlcmVkUGVvcGxlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcclxuICAgICAgICB0aGlzLnRpdGxlRWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICAgICAgICBjb25zdCBbdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGVdID0gdXNlcklucHV0O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSk7XHJcbiAgICAgICAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhcklucHV0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGl0bGVFbGVtZW50LnZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vbW9kZWxzL2RyYWctZHJvcCdcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuLy8gaW1wb3J0IENtcCBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SXRlbSBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdnYWJsZSB7XHJcbiAgICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XHJcbiAgICBnZXQgcGVyc29ucygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJzEgcGVyc29uJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZXJzb25zYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICAgICAgc3VwZXIoXCJzaW5nbGUtcHJvamVjdFwiLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKVxyXG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KClcclxuICAgIH1cclxuICAgIEBhdXRvYmluZFxyXG4gICAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKVxyXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJ1xyXG4gICAgfVxyXG4gICAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RyYWdFbmQnKTtcclxuXHJcbiAgICB9XHJcbiAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcilcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzJykhLnRleHRDb250ZW50ID0gdGhpcy5wZXJzb25zICsgJyBhc3NpZ25lZC4nXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb25cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcclxuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tIFwiLi9wcm9qZWN0LWl0ZW1cIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcclxuICAgIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogXCJhY3RpdmVcIiB8IFwiZmluaXNoZWRcIikge1xyXG4gICAgICAgIHN1cGVyKCdwcm9qZWN0LWxpc3QnLCAnYXBwJywgZmFsc2UsIGAke3R5cGV9LXByb2plY3RzYClcclxuICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQGF1dG9iaW5kXHJcbiAgICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XHJcbiAgICAgICAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAYXV0b2JpbmRcclxuICAgIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChwcmpJZCwgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZClcclxuICAgIH1cclxuXHJcbiAgICBAYXV0b2JpbmRcclxuICAgIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcilcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcilcclxuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZhbnRQcm9qZWN0cztcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0LWlkYDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCA9IGxpc3RJZDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgIHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgXCIgUHJvamVjdFwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclByb2plY3RzKCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICAgICAgICBgJHt0aGlzLnR5cGV9LXByb2plY3QtaWRgXHJcbiAgICAgICAgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgICAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcblxyXG4gICAgICAgICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkLCBwcmpJdGVtKVxyXG4gICAgICAgICAgICAvLyBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICAgICAgLy8gbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwcmpJdGVtLnRpdGxlO1xyXG4gICAgICAgICAgICAvLyBsaXN0RWwuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59IiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0XCI7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3RcIjtcclxuXHJcbm5ldyBQcm9qZWN0SW5wdXQoKTtcclxubmV3IFByb2plY3RMaXN0KFwiYWN0aXZlXCIpO1xyXG5uZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcclxuXHJcblxyXG4iXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiY29uc3RydWN0b3IiLCJ0ZW1sYXRlSWQiLCJIb3N0RWxlbWVudElkIiwiaW5zZXJ0QXRTdGFydCIsIm5ld0VsZW1lbnRJZCIsInRoaXMiLCJ0ZW1wbGF0ZUVsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImhvc3RFbCIsImltcG9ydGVkTm9kZSIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiZWxlbWVudCIsImZpcnN0RWxlbWVudENoaWxkIiwiY29uc29sZSIsImxvZyIsImlkIiwiYXR0YWNoIiwiaW5zZXJ0QXRCZWdpbm5pbmciLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJ2YWxpZGF0ZSIsInZhbGlkYXRhYmxlSW5wdXQiLCJpc1ZhbGlkIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInRvU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsIm1pbkxlbmd0aCIsIm1heExlbmd0aCIsIm1pbiIsIm1heCIsImF1dG9iaW5kIiwiXyIsIl8yIiwiZGVzY3JpcHRvciIsIm9yaWdpbmFsTWV0aG9kIiwiY29uZmlndXJhYmxlIiwiZ2V0IiwiYmluZCIsIlByb2plY3RTdGF0dXMiLCJQcm9qZWN0IiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInBlb3BsZSIsInN0YXR1cyIsIlN0YXRlIiwibGlzdGVuZXJzIiwiYWRkTGlzdGVuZXIiLCJsaXN0ZW5lckZuIiwicHVzaCIsIlByb2plY3RTdGF0ZSIsInN1cGVyIiwicHJvamVjdHMiLCJnZXRJbnN0YW5jZSIsImluc3RhbmNlIiwiYWRkUHJvamVjdCIsIm51bU9mUGVvcGxlIiwibmV3UHJvamVjdCIsIk1hdGgiLCJyYW5kb20iLCJBY3RpdmUiLCJ1cGRhdGVMaXN0ZW5lcnMiLCJtb3ZlUHJvamVjdCIsInByb2plY3RJZCIsIm5ld1N0YXR1cyIsInByb2plY3QiLCJmaW5kIiwicHJqIiwibGlzdG5lckZuIiwic2xpY2UiLCJwcm9qZWN0U3RhdGUiLCJQcm9qZWN0SW5wdXQiLCJ0aXRsZUVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQiLCJwZW9wbGVJbnB1dEVsZW1lbnQiLCJjb25maWd1cmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJzdWJtaXRIYW5kbGVyIiwicmVuZGVyQ29udGVudCIsImdhdGhlclVzZXJJbnB1dCIsImVudGVyZWRUaXRsZSIsImVudGVyZWREZXNjcmlwdGlvbiIsImVudGVyZWRQZW9wbGUiLCJkZXNjcmlwdGlvblZhbGlkYXRhYmxlIiwicGVvcGxlVmFsaWRhdGFibGUiLCJhbGVydCIsImNsZWFySW5wdXRzIiwicHJldmVudERlZmF1bHQiLCJ1c2VySW5wdXQiLCJBcnJheSIsImlzQXJyYXkiLCJQcm9qZWN0SXRlbSIsInBlcnNvbnMiLCJob3N0SWQiLCJkcmFnU3RhcnRIYW5kbGVyIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsImVmZmVjdEFsbG93ZWQiLCJkcmFnRW5kSGFuZGxlciIsInRleHRDb250ZW50IiwiUHJvamVjdExpc3QiLCJ0eXBlIiwiYXNzaWduZWRQcm9qZWN0cyIsImRyYWdPdmVySGFuZGxlciIsInR5cGVzIiwiY2xhc3NMaXN0IiwiYWRkIiwiZHJvcEhhbmRsZXIiLCJwcmpJZCIsImdldERhdGEiLCJGaW5pc2hlZCIsImRyYWdMZWF2ZUhhbmRsZXIiLCJyZW1vdmUiLCJyZWxldmFudFByb2plY3RzIiwiZmlsdGVyIiwicmVuZGVyUHJvamVjdHMiLCJsaXN0SWQiLCJ0b1VwcGVyQ2FzZSIsImlubmVySFRNTCIsInByakl0ZW0iXSwic291cmNlUm9vdCI6IiJ9