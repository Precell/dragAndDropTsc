// Componet Base Class

export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    temlateId: string,
    HostElementId: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateEl = document.getElementById(
      temlateId
    )! as HTMLTemplateElement
    this.hostEl = document.getElementById(HostElementId)! as T;

    const importedNode = document.importNode(this.templateEl.content, true);

    this.element = importedNode.firstElementChild as U;
    console.log(this.element);
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart)
  }



  private attach(insertAtBeginning: boolean) {
    // this.hostEl.insertAdjacentElement(insertAtBeginning ? 'afterbeginning' : 'beforeend', this.element);
    this.hostEl.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void;
  abstract renderContent(): void;
}

