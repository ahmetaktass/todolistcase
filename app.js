//modal
const modalOpen = document.querySelector('.openModalBtn')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.closeModalBtn')

modalOpen.addEventListener('click', () => {
  modal.style.display = 'flex'
})

modalClose.addEventListener('click', () => {
  modal.style.display = 'none'
})

//todoform
const form = document.querySelector('.todo_form')
const input = document.querySelector('.todo_input')
const input_date = document.querySelector('.todo_input_date')

const todo_container = document.querySelector('.todo_container')

const startConf = () => {
  // baslangic ayarlari
  const todos = JSON.parse(localStorage.getItem('todos')) || {}

  for (let date in todos) {
    todos[date].forEach((todo) => {
      addHTML(todo)
    })
  }
}

const addTodo = (e) => {
  e.preventDefault()

  const inputVal = input.value

  if (inputVal == '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    input.style.border = '1px solid tomato'
    setTimeout(() => {
      input.style.borderColor = 'transparent'
    }, 2500)
    return false
  }
  const dateVal = input_date.value

  if (dateVal == '') {
    // boş değer girilmeye çalışıyor ise hata veriyoruz
    input_date.style.border = '1px solid tomato'
    setTimeout(() => {
      input.style.borderColor = 'transparent'
    }, 2500)
    return false
  }

  const todos = JSON.parse(localStorage.getItem('todos')) || {}

  if (!Array.isArray(todos[dateVal])) todos[dateVal] = []

  const todo = {
    text: inputVal,
    isCompleted: false,
    date: dateVal,
  }

  todos[dateVal].push(todo)

  localStorage.setItem('todos', JSON.stringify(todos))

  addHTML(todo)

  form.reset()
}


const deleteTodo = (e) => {
  const todo = e.target.parentElement.parentElement
  const text = todo.firstChild.children[1].textContent

  const todos = JSON.parse(localStorage.getItem('todos')) || {}


  for (let date in todos) {
    todos[date] = todos[date].filter((td) => td.text != text)
  }

  localStorage.setItem('todos', JSON.stringify(todos))

  todo.remove()
}

const completeTodo = (e) => {
  const todo = e.target.parentElement.parentElement
  const text = todo.firstChild.children[1].textContent

  const todos = JSON.parse(localStorage.getItem('todos')) || {}
  for (let date in todos) {
  todos[date].forEach((td) => {
    if (td.text === text) td.isCompleted = !td.isCompleted
  })
}
  localStorage.setItem('todos', JSON.stringify(todos))
}

const saveTodo = (e) => {
  const todo = e.target.parentElement.parentElement
  const prevText = todo.firstChild.children[1].textContent // değiştirilmeden önceki değer
  const newText = todo.firstChild.children[2].value // editlerken girdiğimiz yeni değer


  const todos = JSON.parse(localStorage.getItem('todos')) || {}

  for (let date in todos) {
    todos[date].forEach((td) => {
      if (td.text === prevText) 
        td.text = newText

    })
  }

  localStorage.setItem('todos', JSON.stringify(todos))

  todo.firstChild.children[1].textContent = newText // HTML üzerindeki değerini de değiştiriyoruz

  todo.classList.remove('-edited') // verdiğimiz classı kaldırıyoruz
}

const editTodo = (e) => {
  const todo = e.target.parentElement.parentElement
  todo.classList.add('-edited')
}
const dateFormat = (d) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayIndex = d.getDay()
  const dayName = days[dayIndex]
  const monthIndex = d.getMonth()
  const monthName = months[monthIndex]

  return `${dayName}, ${monthName} ${d.getDate()}`
}
const addHTML = (todo) => {
  let dateDiv = document.getElementById(todo.date)
  if (!dateDiv) {
    dateDiv = document.createElement('div')
    dateDiv.id = todo.date
    dateDiv.classList.add('todoDate')

    const icon = document.createElement('img')
    icon.src = './src/icon/takvim.svg'

    const h1 = document.createElement('span')
    h1.textContent = dateFormat(new Date(todo.date))

    dateDiv.appendChild(icon)
    dateDiv.appendChild(h1)
    todo_container.appendChild(dateDiv)
  }

  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  const todoLeft = document.createElement('div')
  todoLeft.classList.add('todo_left')

  const editInput = document.createElement('input')
  editInput.classList.add('todo_editInput')
  editInput.defaultValue = todo.text

  const todoCb = document.createElement('input')
  todoCb.type = 'checkbox'
  todoCb.checked = todo.isCompleted
  todoCb.classList.add('todo_cb')
  todoCb.addEventListener('click', completeTodo) // direkt olustururken veriyoruz event listenerlari

  const todoText = document.createElement('span')
  todoText.classList.add('todo_text')
  todoText.textContent = todo.text

  todoLeft.appendChild(todoCb)
  todoLeft.appendChild(todoText)
  todoLeft.appendChild(editInput)

  const todoRight = document.createElement('div')
  todoRight.classList.add('todo_right')

  const editBtn = document.createElement('button')
  editBtn.classList.add('todo_edit')
  editBtn.addEventListener('click', editTodo) // direkt olustururken veriyoruz event listenerlari

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('todo_delete')
  deleteBtn.addEventListener('click', deleteTodo) // direkt olustururken veriyoruz event listenerlari

  const saveBtn = document.createElement('button')
  saveBtn.classList.add('todo_save')
  saveBtn.textContent = 'Save'
  saveBtn.addEventListener('click', saveTodo)

  todoRight.appendChild(editBtn)
  todoRight.appendChild(deleteBtn)

  todoRight.appendChild(saveBtn)

  todoDiv.appendChild(todoLeft)
  todoDiv.appendChild(todoRight)

  dateDiv.appendChild(todoDiv)
}

startConf()

form.addEventListener('submit', addTodo)
