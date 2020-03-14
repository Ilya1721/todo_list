var addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addItem);
var deleteBtns = document.getElementsByClassName('deleteBtn');
[...deleteBtns].forEach(b => b.addEventListener('click', deleteItem));
var checkboxInputs = document.getElementsByClassName('checkbox-input');
[...checkboxInputs].forEach(c => c.addEventListener('change', checkItem));
var clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', clearItems);
var saveBtn = document.getElementById('saveBtn');
saveBtn.addEventListener('click', saveItems);
window.addEventListener("load", onLoad);
var localStorage = window.localStorage;

function addItem() {
  var mainInput = document.getElementById('todo');
  var inputVal = mainInput.value;
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
    mainInput.value = "";

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
  if(confirm("Are you sure? All items will be deleted!!"))
  {
    var checkboxDiv = document.getElementById('checkbox-div');
    [...checkboxDiv.children].forEach(c => c.remove());
    localStorage.clear();
  }
}

function onLoad() {
  var localStorageItems = JSON.parse(localStorage.getItem('todoItems'));
  var length;
  if(localStorageItems == null)
  {
      length = 0;
  }
  else
  {
    var length = localStorageItems.length;
  }

  var checkboxDiv = document.getElementById('checkbox-div');

  for(var i = 0; i < length; i++) {
    var checkboxItem = document.createElement('div');
    checkboxItem.classList.add('checkbox-item');

    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', 'item');
    input.classList.add('checkbox-input');
    input.addEventListener('change', checkItem);

    var text = document.createElement('span');
    text.classList.add('text');
    if(localStorageItems[i].checked) {
      text.classList.add('line-through');
    }
    text.innerHTML = localStorageItems[i].name;
    input.checked = localStorageItems[i].checked;

    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('deleteBtn');
    button.innerHTML = 'X';
    button.addEventListener('click', deleteItem);

    checkboxItem.appendChild(input);
    checkboxItem.appendChild(text);
    checkboxItem.appendChild(button);
    checkboxDiv.appendChild(checkboxItem);
  }
}

function saveItems() {
  var items = document.getElementsByClassName("checkbox-input");
  if(items.length > 0)
  {
    var itemTexts = document.getElementsByClassName("text");
    var newItems = [];
    for(var i = 0; i < items.length; i++) {
      newItems.push({
        name: itemTexts[i].innerHTML,
        checked: items[i].checked
      });
      localStorage.setItem('todoItems', JSON.stringify(newItems));
    }
  }
  else {
    localStorage.clear();
  }
}
