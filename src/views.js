import {getFilters} from './filters'
import {getTodos, toggleTodo, removeTodo} from './todos'

// renderTodos
// Arguments: none
// Return value: none
// Render application todos based on filters

const renderTodos = () => {
    const filters = getFilters()
    const todoArray = getTodos()
    console.log(todoArray)
    const filteredTodos = todoArray.filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed
        
        return searchTextMatch && hideCompletedMatch
    })
    const todosEl =document.querySelector('#todos')

    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)

    todosEl.innerHTML = ''
    todosEl.appendChild(generateSummaryDOM(incompleteTodos))

    if(filteredTodos.length > 0){
        filteredTodos.forEach((todo) => {
            todosEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyTodoMsg = document.createElement('p')
        emptyTodoMsg.classList.add('empty-message')
        emptyTodoMsg.textContent = 'No To-Dos to show'
        todosEl.appendChild(emptyTodoMsg)
    }
}

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    // Setup todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // Setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)
    

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    if (incompleteTodos.length > 1){
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    } else if (incompleteTodos.length === 1){
        summary.textContent = `You have only ${incompleteTodos.length} todo left`
    } else if(incompleteTodos.length === 0){
        summary.textContent = `You don't have any todo left`
    }
    return summary
}

export { generateTodoDOM, generateSummaryDOM, renderTodos}

// Make sure to set up the exports