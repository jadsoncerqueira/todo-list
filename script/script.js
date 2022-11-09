window.onload = () => {
  if(!localStorage.getItem('tarefas')) {
    localStorage.setItem('tarefas', JSON.stringify([]));
  }
}

const btn = document.querySelector('#btn-add');


const getTarefas = () => {
  return JSON.parse(localStorage.getItem('tarefas'));
};
const setTarefas = (tarefas) => {
  return localStorage.setItem('tarefas', JSON.stringify(tarefas));
};


const marcaTarefa = ({ target }) => {
  const el = target.parentElement.childNodes[1];
  el.classList.toggle('riscado');

  const tarefas = getTarefas();
  tarefas.forEach((ele) => {
    if (ele.name === el.innerText) {
      if (ele.check) {
        ele.check = false;
      } else {
        ele.check = true;
      }
    }
  });

  setTarefas(tarefas);
}

const apagaTarefa = ({ target }) => {
    const el = target.parentElement.childNodes[1];
  
    const tarefas = getTarefas();
    tarefas.forEach((ele, index) => {
      if (ele.name === el.innerText) {
        tarefas.splice(index, 1)
      }
    });

    const el2 = target.parentElement.parentElement;
    el2.removeChild(target.parentElement);
  
    setTarefas(tarefas);
  }
  

const factory = (element, areaTarefas, check) => {
    const div = document.createElement('div');
    div.className = 'tarefa';
    const span = document.createElement('span');

    const box = document.createElement('INPUT');
    box.setAttribute('type', 'checkbox');
    box.checked = check;
    box.className = 'box';
    box.addEventListener('click', marcaTarefa);
    

    const butt = document.createElement('button');
    butt.innerText = 'x';
    butt.className = 'exluir'
    butt.addEventListener('click', apagaTarefa);

    span.innerHTML = element
    span.className = check && 'riscado';
    span.classList.add('name')

    div.appendChild(box);

    div.appendChild(span);

    div.appendChild(butt);
    areaTarefas.appendChild(div);
};


const caregandoTarefas = () => {
  const tarefas = getTarefas() || [];
  const areaTarefas = document.querySelector('#tarefas');
  tarefas.forEach((element) => {
    factory(element.name, areaTarefas, element.check);
  });
};


caregandoTarefas();



const addTarefa = () => {
  const tarefa = document.querySelector('#campo-tarefa');
  const areaTarefas = document.querySelector('#tarefas');

  let tarefas = getTarefas();
  tarefas = [...tarefas,{ name: tarefa.value, check: false }];
  setTarefas(tarefas);
  factory(tarefa.value, areaTarefas, false)
  tarefa.value = '';
};


btn.addEventListener('click', addTarefa);
