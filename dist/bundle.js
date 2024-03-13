/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
// Componet Base Class
class Component {
    constructor(temlateId, HostElementId, insertAtStart, newElementId) {
        this.templateEl = document.getElementById(temlateId);
        this.hostEl = document.getElementById(HostElementId);
        const importedNode = document.importNode(this.templateEl.content, true);
        this.element = importedNode.firstElementChild;
        console.log(this.element);
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        // this.hostEl.insertAdjacentElement(insertAtBeginning ? 'afterbeginning' : 'beforeend', this.element);
        this.hostEl.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectInput: () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _util_validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/validation */ "./src/util/validation.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super("project-input", 'app', true, "user-input");
        this.titleElement = this.element.querySelector("#title");
        this.descriptionInputElement = this.element.querySelector("#description");
        this.peopleInputElement = this.element.querySelector("#people");
        this.configure();
    }
    configure() {
        this.element.addEventListener("submit", (event) => this.submitHandler(event));
    }
    renderContent() {
    }
    gatherUserInput() {
        const enteredTitle = this.titleElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(titleValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(descriptionValidatable) ||
            !_util_validation__WEBPACK_IMPORTED_MODULE_1__.validate(peopleValidatable)) {
            alert("Invalid Input, please try again");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            _state_project_state__WEBPACK_IMPORTED_MODULE_3__.projectState.addProject(title, description, people);
        }
        this.clearInputs();
        console.log(this.titleElement.value);
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_2__.autobind
], ProjectInput.prototype, "configure", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectItem: () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import Cmp from './base-component';
class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_1__["default"] {
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        }
        else {
            return `${this.project.people} persons`;
        }
    }
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('DragEnd');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned.';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectList: () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project-state */ "./src/state/project-state.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_4__["default"] {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const prjId = event.dataTransfer.getData('text/plain');
        _state_project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.moveProject(prjId, this.type === 'active' ? _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        _state_project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addListener((projects) => {
            const relevantProjects = projects.filter((prj) => {
                if (this.type === "active") {
                    return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active;
                }
                return prj.status === _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-project-id`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " Project";
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-id`);
        listEl.innerHTML = "";
        for (const prjItem of this.assignedProjects) {
            new _project_item__WEBPACK_IMPORTED_MODULE_3__.ProjectItem(this.element.querySelector('ul').id, prjItem);
            // const listItem = document.createElement("li");
            // listItem.textContent = prjItem.title;
            // listEl.appendChild(listItem);
        }
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autobind: () => (/* binding */ autobind)
/* harmony export */ });
// Autobind Decorator
function autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Project: () => (/* binding */ Project),
/* harmony export */   ProjectStatus: () => (/* binding */ ProjectStatus)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/state/project-state.ts":
/*!************************************!*\
  !*** ./src/state/project-state.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectState: () => (/* binding */ ProjectState),
/* harmony export */   projectState: () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, numOfPeople) {
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, numOfPeople, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listnerFn of this.listeners) {
            listnerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/util/validation.ts":
/*!********************************!*\
  !*** ./src/util/validation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validate: () => (/* binding */ validate)
/* harmony export */ });
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("active");
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList("finished");
console.log('hi');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsQ0FBQztBQUMxQixJQUFJLGlFQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7QUFHNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R5cGVzY3JpcHR0dXQvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0dHV0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0dHV0Ly4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHR0dXQvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdHR1dC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHR0dXQvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdHR1dC8uL3NyYy9zdGF0ZS9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHR0dXQvLi9zcmMvdXRpbC92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHR0dXQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdHR1dC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdHR1dC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3R5cGVzY3JpcHR0dXQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0dHV0Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb21wb25ldCBCYXNlIENsYXNzXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICB0ZW1wbGF0ZUVsOiBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gIGhvc3RFbDogVDtcclxuICBlbGVtZW50OiBVO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHRlbWxhdGVJZDogc3RyaW5nLFxyXG4gICAgSG9zdEVsZW1lbnRJZDogc3RyaW5nLFxyXG4gICAgaW5zZXJ0QXRTdGFydDogYm9vbGVhbixcclxuICAgIG5ld0VsZW1lbnRJZD86IHN0cmluZyxcclxuICApIHtcclxuICAgIHRoaXMudGVtcGxhdGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICB0ZW1sYXRlSWRcclxuICAgICkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnRcclxuICAgIHRoaXMuaG9zdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoSG9zdEVsZW1lbnRJZCkhIGFzIFQ7XHJcblxyXG4gICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlRWwuY29udGVudCwgdHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmVsZW1lbnQpO1xyXG4gICAgaWYgKG5ld0VsZW1lbnRJZCkge1xyXG4gICAgICB0aGlzLmVsZW1lbnQuaWQgPSBuZXdFbGVtZW50SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hdHRhY2goaW5zZXJ0QXRTdGFydClcclxuICB9XHJcblxyXG5cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2goaW5zZXJ0QXRCZWdpbm5pbmc6IGJvb2xlYW4pIHtcclxuICAgIC8vIHRoaXMuaG9zdEVsLmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRBdEJlZ2lubmluZyA/ICdhZnRlcmJlZ2lubmluZycgOiAnYmVmb3JlZW5kJywgdGhpcy5lbGVtZW50KTtcclxuICAgIHRoaXMuaG9zdEVsLmluc2VydEFkamFjZW50RWxlbWVudChpbnNlcnRBdEJlZ2lubmluZyA/IFwiYWZ0ZXJiZWdpblwiIDogXCJiZWZvcmVlbmRcIiwgdGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xyXG4gIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcclxufVxyXG5cclxuIiwiaW1wb3J0IENtcCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5pbXBvcnQgKiBhcyBWYWxpZGF0aW9uIGZyb20gXCIuLi91dGlsL3ZhbGlkYXRpb25cIjsgXHJcbmltcG9ydCB7IGF1dG9iaW5kIGFzIEF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSBcIi4uL3N0YXRlL3Byb2plY3Qtc3RhdGVcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdElucHV0IGV4dGVuZHMgQ21wPEhUTUxEaXZFbGVtZW50LCBIVE1MRGl2RWxlbWVudD4ge1xyXG4gICAgdGl0bGVFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICBwZW9wbGVJbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoXCJwcm9qZWN0LWlucHV0XCIsICdhcHAnLCB0cnVlLCBcInVzZXItaW5wdXRcIilcclxuXHJcblxyXG4gICAgICAgIHRoaXMudGl0bGVFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiI3RpdGxlXCJcclxuICAgICAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgICBcIiNkZXNjcmlwdGlvblwiXHJcbiAgICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG4gICAgICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50ID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICAgIFwiI3Blb3BsZVwiXHJcbiAgICAgICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIEBBdXRvYmluZFxyXG4gICAgY29uZmlndXJlKCkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChldmVudCkgPT5cclxuICAgICAgICAgICAgdGhpcy5zdWJtaXRIYW5kbGVyKGV2ZW50KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQ29udGVudCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgICAgICBjb25zdCBlbnRlcmVkVGl0bGUgPSB0aGlzLnRpdGxlRWxlbWVudC52YWx1ZTtcclxuICAgICAgICBjb25zdCBlbnRlcmVkRGVzY3JpcHRpb24gPSB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGVudGVyZWRQZW9wbGUgPSB0aGlzLnBlb3BsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgdGl0bGVWYWxpZGF0YWJsZTogVmFsaWRhdGlvbi5WYWxpZGF0YWJsZSA9IHtcclxuICAgICAgICAgICAgdmFsdWU6IGVudGVyZWRUaXRsZSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBkZXNjcmlwdGlvblZhbGlkYXRhYmxlOiBWYWxpZGF0aW9uLlZhbGlkYXRhYmxlID0ge1xyXG4gICAgICAgICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiA1LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgcGVvcGxlVmFsaWRhdGFibGU6IFZhbGlkYXRpb24uVmFsaWRhdGFibGUgPSB7XHJcbiAgICAgICAgICAgIHZhbHVlOiArZW50ZXJlZFBlb3BsZSxcclxuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIG1pbjogMSxcclxuICAgICAgICAgICAgbWF4OiA1LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChcclxuICAgICAgICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUodGl0bGVWYWxpZGF0YWJsZSkgfHxcclxuICAgICAgICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUoZGVzY3JpcHRpb25WYWxpZGF0YWJsZSkgfHxcclxuICAgICAgICAgICAgIVZhbGlkYXRpb24udmFsaWRhdGUocGVvcGxlVmFsaWRhdGFibGUpXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiSW52YWxpZCBJbnB1dCwgcGxlYXNlIHRyeSBhZ2FpblwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbZW50ZXJlZFRpdGxlLCBlbnRlcmVkRGVzY3JpcHRpb24sICtlbnRlcmVkUGVvcGxlXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhcklucHV0cygpIHtcclxuICAgICAgICB0aGlzLnRpdGxlRWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQudmFsdWUgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3VibWl0SGFuZGxlcihldmVudDogRXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJJbnB1dCA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XHJcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICAgICAgICBjb25zdCBbdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGVdID0gdXNlcklucHV0O1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSk7XHJcbiAgICAgICAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhcklucHV0cygpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudGl0bGVFbGVtZW50LnZhbHVlKTtcclxuICAgIH1cclxuXHJcblxyXG59XHJcblxyXG5cclxuIiwiaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vbW9kZWxzL2RyYWctZHJvcCdcclxuaW1wb3J0IHsgUHJvamVjdCB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuLy8gaW1wb3J0IENtcCBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SXRlbSBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PiBpbXBsZW1lbnRzIERyYWdnYWJsZSB7XHJcbiAgICBwcml2YXRlIHByb2plY3Q6IFByb2plY3Q7XHJcbiAgICBnZXQgcGVyc29ucygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gJzEgcGVyc29uJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBwZXJzb25zYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcm9qZWN0OiBQcm9qZWN0KSB7XHJcbiAgICAgICAgc3VwZXIoXCJzaW5nbGUtcHJvamVjdFwiLCBob3N0SWQsIGZhbHNlLCBwcm9qZWN0LmlkKVxyXG4gICAgICAgIHRoaXMucHJvamVjdCA9IHByb2plY3RcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KClcclxuICAgIH1cclxuICAgIEBhdXRvYmluZFxyXG4gICAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5zZXREYXRhKCd0ZXh0L3BsYWluJywgdGhpcy5wcm9qZWN0LmlkKVxyXG4gICAgICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuZWZmZWN0QWxsb3dlZCA9ICdtb3ZlJ1xyXG4gICAgfVxyXG4gICAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0RyYWdFbmQnKTtcclxuXHJcbiAgICB9XHJcbiAgICBjb25maWd1cmUoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcilcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gzJykhLnRleHRDb250ZW50ID0gdGhpcy5wZXJzb25zICsgJyBhc3NpZ25lZC4nXHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb25cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vbW9kZWxzL3Byb2plY3RcIjtcclxuaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBEcmFnVGFyZ2V0IH0gZnJvbSBcIi4uL21vZGVscy9kcmFnLWRyb3BcIjtcclxuaW1wb3J0IHsgUHJvamVjdEl0ZW0gfSBmcm9tIFwiLi9wcm9qZWN0LWl0ZW1cIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlLWNvbXBvbmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RMaXN0IGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD4gaW1wbGVtZW50cyBEcmFnVGFyZ2V0IHtcclxuICAgIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogXCJhY3RpdmVcIiB8IFwiZmluaXNoZWRcIikge1xyXG4gICAgICAgIHN1cGVyKCdwcm9qZWN0LWxpc3QnLCAnYXBwJywgZmFsc2UsIGAke3R5cGV9LXByb2plY3RzYClcclxuICAgICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbmZpZ3VyZSgpXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgQGF1dG9iaW5kXHJcbiAgICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdID09PSAndGV4dC9wbGFpbicpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICAgICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XHJcbiAgICAgICAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBAYXV0b2JpbmRcclxuICAgIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBwcmpJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChwcmpJZCwgdGhpcy50eXBlID09PSAnYWN0aXZlJyA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZClcclxuICAgIH1cclxuXHJcbiAgICBAYXV0b2JpbmRcclxuICAgIGRyYWdMZWF2ZUhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbmZpZ3VyZSgpIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcilcclxuICAgICAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgdGhpcy5kcmFnTGVhdmVIYW5kbGVyKVxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgdGhpcy5kcm9wSGFuZGxlcilcclxuICAgICAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVsZXZhbnRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByai5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBwcmouc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcmVsZXZhbnRQcm9qZWN0cztcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJQcm9qZWN0cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICAgICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0LWlkYDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5pZCA9IGxpc3RJZDtcclxuICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpIS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgIHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgXCIgUHJvamVjdFwiO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIHJlbmRlclByb2plY3RzKCkge1xyXG4gICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICAgICAgICBgJHt0aGlzLnR5cGV9LXByb2plY3QtaWRgXHJcbiAgICAgICAgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgICAgICBsaXN0RWwuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBmb3IgKGNvbnN0IHByakl0ZW0gb2YgdGhpcy5hc3NpZ25lZFByb2plY3RzKSB7XHJcblxyXG4gICAgICAgICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkLCBwcmpJdGVtKVxyXG4gICAgICAgICAgICAvLyBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcclxuICAgICAgICAgICAgLy8gbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwcmpJdGVtLnRpdGxlO1xyXG4gICAgICAgICAgICAvLyBsaXN0RWwuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59IiwiLy8gQXV0b2JpbmQgRGVjb3JhdG9yXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvYmluZChfOiBhbnksIF8yOiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xyXG4gICAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gICAgY29uc3QgYWRqRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICAgIGdldCgpIHtcclxuICAgICAgICBjb25zdCBib3VuZEZuID0gb3JpZ2luYWxNZXRob2QuYmluZCh0aGlzKTtcclxuICAgICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgXHJcbiAgICByZXR1cm4gYWRqRGVzY3JpcHRvcjtcclxuICB9XHJcbiIsIlxyXG4gICAgZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XHJcbiAgICAgICAgQWN0aXZlLFxyXG4gICAgICAgIEZpbmlzaGVkLFxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcclxuICAgICAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICAgICAgcHVibGljIGlkOiBzdHJpbmcsXHJcbiAgICAgICAgICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxyXG4gICAgICAgICAgICBwdWJsaWMgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgICAgICAgICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxyXG4gICAgICAgICAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXHJcbiAgICAgICAgKSB7IH1cclxuICAgIH1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSBcIi4uL21vZGVscy9wcm9qZWN0XCI7XHJcblxyXG4vLyBQcm9qZWN0IFN0YXRlIE1hbmFnZW1lbnRcclxudHlwZSBMaXN0ZW5lcjxUPiA9IChpdGVtczogVFtdKSA9PiB2b2lkO1xyXG5cclxuY2xhc3MgU3RhdGU8VD57XHJcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xyXG4gIGFkZExpc3RlbmVyKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PntcclxuXHJcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFByb2plY3RTdGF0ZTtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKClcclxuICB9XHJcblxyXG4gIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcclxuICAgIGlmICh0aGlzLmluc3RhbmNlKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKTtcclxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG4gIH1cclxuXHJcblxyXG4gIGFkZFByb2plY3QodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgbnVtT2ZQZW9wbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdCA9IG5ldyBQcm9qZWN0KFxyXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgbnVtT2ZQZW9wbGUsXHJcbiAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIFxyXG4gICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKVxyXG4gIH1cclxuXHJcbiAgbW92ZVByb2plY3QocHJvamVjdElkOiBzdHJpbmcsIG5ld1N0YXR1czogUHJvamVjdFN0YXR1cyl7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5wcm9qZWN0cy5maW5kKHByaiA9PiBwcmouaWQgPT09IHByb2plY3RJZClcclxuICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBuZXdTdGF0dXMpIHtcclxuICAgICAgcHJvamVjdC5zdGF0dXMgPSBuZXdTdGF0dXNcclxuICAgICAgdGhpcy51cGRhdGVMaXN0ZW5lcnMoKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVMaXN0ZW5lcnMoKXtcclxuICAgIGZvciAoY29uc3QgbGlzdG5lckZuIG9mIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgIGxpc3RuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHByb2plY3RTdGF0ZSA9IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgXHJcbiIsIlxyXG4vLyBWYWxpZGF0aW9uXHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xyXG4gICAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlcXVpcmVkPzogYm9vbGVhbjtcclxuICAgIG1pbkxlbmd0aD86IG51bWJlcjtcclxuICAgIG1heExlbmd0aD86IG51bWJlcjtcclxuICAgIG1pbj86IG51bWJlcjtcclxuICAgIG1heD86IG51bWJlcjtcclxuICB9XHJcbiAgXHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKHZhbGlkYXRhYmxlSW5wdXQ6IFZhbGlkYXRhYmxlKSB7XHJcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcbiAgICBpZiAodmFsaWRhdGFibGVJbnB1dC5yZXF1aXJlZCkge1xyXG4gICAgICBpc1ZhbGlkID0gaXNWYWxpZCAmJiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJlxyXG4gICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJzdHJpbmdcIlxyXG4gICAgKSB7XHJcbiAgICAgIGlzVmFsaWQgPVxyXG4gICAgICAgIGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZS5sZW5ndGggPj0gdmFsaWRhdGFibGVJbnB1dC5taW5MZW5ndGg7XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoICE9IG51bGwgJiZcclxuICAgICAgdHlwZW9mIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPT09IFwic3RyaW5nXCJcclxuICAgICkge1xyXG4gICAgICBpc1ZhbGlkID1cclxuICAgICAgICBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUubGVuZ3RoIDw9IHZhbGlkYXRhYmxlSW5wdXQubWF4TGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgaWYgKFxyXG4gICAgICB2YWxpZGF0YWJsZUlucHV0Lm1pbiAhPSBudWxsICYmXHJcbiAgICAgIHR5cGVvZiB2YWxpZGF0YWJsZUlucHV0LnZhbHVlID09PSBcIm51bWJlclwiXHJcbiAgICApIHtcclxuICAgICAgaXNWYWxpZCA9IGlzVmFsaWQgJiYgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA+PSB2YWxpZGF0YWJsZUlucHV0Lm1pbjtcclxuICAgIH1cclxuICAgIGlmIChcclxuICAgICAgdmFsaWRhdGFibGVJbnB1dC5tYXggIT0gbnVsbCAmJlxyXG4gICAgICB0eXBlb2YgdmFsaWRhdGFibGVJbnB1dC52YWx1ZSA9PT0gXCJudW1iZXJcIlxyXG4gICAgKSB7XHJcbiAgICAgIGlzVmFsaWQgPSBpc1ZhbGlkICYmIHZhbGlkYXRhYmxlSW5wdXQudmFsdWUgPD0gdmFsaWRhdGFibGVJbnB1dC5tYXg7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaXNWYWxpZDtcclxuICB9XHJcbiAgXHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWlucHV0XCI7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3RcIjtcclxuXHJcbm5ldyBQcm9qZWN0SW5wdXQoKTtcclxubmV3IFByb2plY3RMaXN0KFwiYWN0aXZlXCIpO1xyXG5uZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcclxuXHJcblxyXG5jb25zb2xlLmxvZygnaGknKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9