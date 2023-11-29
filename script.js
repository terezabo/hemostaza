const items = document.querySelectorAll('.draggable');
items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

const boxes = document.querySelectorAll('.box');
boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});



function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => {
    e.target.classList.add('hide');
  }, 0);
}

function dragEnd(e) {
  e.target.classList.remove('hide');
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}



function drop(e) {
  e.preventDefault();
  e.target.classList.remove('drag-over');

  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);

  if (id === e.target.id) {
    e.target.appendChild(draggable);
    draggable.classList.remove('hide');
    draggable.classList.add('draggable_drop');
    e.target.classList.add("correct");

    setTimeout(() => {
      e.target.classList.remove('correct');
      e.target.classList.add('done');
    }, 1000);
    done();


  } else {
    draggable.classList.remove('hide');
    draggable.classList.add('draggable_drop');

    e.target.appendChild(draggable);
    setTimeout(() => {
      document.querySelector('.factors').appendChild(draggable);
      draggable.classList.remove('draggable_drop');
      e.target.classList.remove('false');
    }, 1000);


    e.target.classList.add("false");
    setTimeout(() => {
      e.target.classList.remove('false');
    }, 1000);

  }
}

function done() {
  const factors = document.querySelector('.factors');
  if (factors.childElementCount===1){
    factors.innerHTML = '';
    const h4 = document.createElement('h4');
    h4.innerHTML='Well done!';
    const p = document.createElement('p');
    p.innerHTML='Ještě tak stokrát, aby to v té hlavě zůstalo.';
    const button = document.createElement('button');
    button.textContent = 'No jo, co se dá dělat';
    button.onclick = tryAgain;
    factors.append(h4, p, button);
  }
}

function tryAgain() {
  location.reload(true);

}