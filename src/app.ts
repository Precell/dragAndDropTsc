// Project State Management

class ProjectState {
  private listeners: any[] = []

  private projects: any[] = [];
  private static instance: ProjectState;

  private constructor(){

  }

  static getInstance(){
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance
  }

  addListener(listenerFn: Function){
    this.listeners.push(listenerFn)
  }

  addProject(title: string, description: string, numOfPeople: number){
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description:description,
      numOfPeople: numOfPeople
    }
    this.projects.push(newProject)

    for(const listnerFn of this.listeners){
      listnerFn(this.projects.slice())
    }
  }
}

const projectState = ProjectState.getInstance()

// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?:number;
  max?: number
}

function validate(validatableInput:Validatable) {
  let isValid = true
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }
  return isValid
}


// Autobind Decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

// ProjectList Class
class ProjectList {
  templateEl: HTMLTemplateElement;
  hostEl: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[]

  constructor(private type: 'active' | 'finished') {
    this.templateEl = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostEl = document.getElementById("app")! as HTMLDivElement;
    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.assignedProjects = []
    console.log(this.element);
    this.element.id = `${this.type}-projects`;
    
    projectState.addListener((projects: any[])=>{
      this.assignedProjects = projects
      this.renderProjects()
    })
    
    this.attach()
    this.renderContent()
  }

  private renderProjects (){
    const listEl = document.getElementById(`${this.type}-project-id`)! as HTMLUListElement;
    for(const prjItem of this.assignedProjects){
      const listItem = document.createElement('li');
      listItem.textContent = prjItem.title
      listEl.appendChild(listItem)
    }
  }

  private renderContent(){
    const listId = `${this.type}-project-id`;
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' Project'
  }
  private attach() {
    this.hostEl.insertAdjacentElement("beforeend", this.element);
  }
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
    this.titleElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    }
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength:5
    }
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min:1,
      max:5
    }


    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid Input, please try again');
      return;
    } else{
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs(){
    this.titleElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }
  
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput
      console.log(title,description,people);
      projectState.addProject(title, description, people)
      
    }
    this.clearInputs()
    console.log(this.titleElement.value);
  }

  @autobind
  private configure() {
    this.element.addEventListener("submit", (event) =>this.submitHandler(event));
  }
  private attach() {
    this.hostEl.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')