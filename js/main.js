var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addItem);
var deleteBtns = document.getElementsByClassName('deleteBtn');
[...deleteBtns].forEach(b => b.addEventListener('click', deleteItem));
var checkboxInputs = document.getElementsByClassName('checkbox-input');
[...checkboxInputs].forEach(c => c.addEventListener('change', checkItem));
var clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', clearItems);

function addItem() {
  var inputVal = document.getElementById('todo').value;
  if(inputVal)
  {
    var checkboxDiv = document.getElementById('checkbox-div');
    var checkboxItem = document.createElement('div');
    checkboxItem.classList.add('checkbox-item');

    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'item');
    input.classList.add('checkbox-input');
    input.addEventListener('change', checkItem);

    var text = document.createElement('span');
    text.classList.add('text');
    text.innerHTML = inputVal;

    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('deleteBtn');
    button.innerHTML = 'X';
    button.addEventListener('click', deleteItem);

    checkboxItem.appendChild(input);
    checkboxItem.appendChild(text);
    checkboxItem.appendChild(button);
    checkboxDiv.appendChild(checkboxItem);

    var error = document.getElementById('error');

    if(error.innerHTML != "")
    {
      error.innerHTML = "";
    }
  }
  else
  {
    var error = document.getElementById('error');
    if(error.innerHTML == "")
    {
      error.innerHTML = "The input is empty!!";
    }
  }
}

function deleteItem() {
  this.parentElement.remove();
}

function checkItem() {
  var array = this.parentElement.children;
  var text = [...array].filter(item => item.classList.contains('text'));
  if(this.checked) {
    text[0].classList.add('line-through');
  }
  else {
    text[0].classList.remove('line-through');
  }
}

function clearItems() {
  var checkboxDiv = document.getElementById('checkbox-div');
  [...checkboxDiv.children].forEach(c => c.remove());
}
