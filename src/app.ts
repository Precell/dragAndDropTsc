// Autobind Decorator
function autobind(_:any, _2: string, descriptor: PropertyDescriptor) {
   const originalMethod = descriptor.value;
   const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get(){
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
   }

   return adjDescriptor
}
// Project Input Class
class ProjectInput {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLFormElement;
  titleElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateEl = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    console.log(this.element);
    
    this.element.id = "user-input";
    this.titleElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure()
    this.attach();
  }

  private submitHandler(event: Event){
    event.preventDefault();
    console.log(this.titleElement.value);
    
  }
  
  @autobind
  private configure(){
    this.element.addEventListener('submit', this.submitHandler)
  }
  private attach() {
    this.hostEl.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
