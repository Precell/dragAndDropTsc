// Componet Base Class
export default class Component {
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
//# sourceMappingURL=base-component.js.map