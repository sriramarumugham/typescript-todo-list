import { v4 as uuidV4 } from 'uuid';


type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};


const list = document.querySelector<HTMLUListElement>('#list');

const form =
  document.getElementById('new-task-form') as HTMLFormElement | null;

const input = document.querySelector<HTMLInputElement>('#new-task-title');


const tasks: Task[] =loadTask();
tasks.forEach(addListItem);
saveTasks();


form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  
  tasks.push(newTask);

  addListItem(newTask);
  
  saveTasks();

  input.value='';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.checked=task.completed;
  checkBox.addEventListener('change', () => {
    task.completed = checkBox.checked;
    saveTasks();
  });
  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item);
}



function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTask(): Task[] {
  let JSONtasks = localStorage.getItem('TASKS');
  if (JSONtasks == null) return [];

  return JSON.parse(JSONtasks);
}