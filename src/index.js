import { setFilters } from './filters'
import { createTodo, loadTodos} from './todos'
import {renderTodos} from './views'
// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary
// --

renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const trimTodo = e.target.elements.text.value.trim()
    if(trimTodo.length > 0){
        createTodo(trimTodo)
        renderTodos()
        e.target.elements.text.value = ''
    } 
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})


// Watcher for local storage

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})

// Add necessary imports

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler

// Bonus: Add a watcher for local storage