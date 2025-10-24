// app.js
class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.init();
    }

    init() {
        this.renderTodos();
        this.setupEventListeners();
    }

    setupEventListeners() {
        const input = document.getElementById('todoInput');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (text === '') {
            alert('请输入任务内容！');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.todos.push(todo);
        this.saveToLocalStorage();
        this.renderTodos();
        
        input.value = '';
        input.focus();
    }

    deleteTodo(id) {
        if (confirm('确定要删除这个任务吗？')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToLocalStorage();
            this.renderTodos();
        }
    }

    toggleTodo(id) {
        this.todos = this.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.saveToLocalStorage();
        this.renderTodos();
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        todoList.innerHTML = '';

        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" 
                       ${todo.completed ? 'checked' : ''} 
                       onchange="app.toggleTodo(${todo.id})">
                <span class="todo-text">${todo.text}</span>
                <small style="color: #999; margin: 0 10px;">${todo.createdAt}</small>
                <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">删除</button>
            `;
            todoList.appendChild(li);
        });

        this.updateStats();
    }

    updateStats() {
        const totalCount = document.getElementById('totalCount');
        const completedCount = document.getElementById('completedCount');

        totalCount.textContent = this.todos.length;
        completedCount.textContent = this.todos.filter(todo => todo.completed).length;
    }

    saveToLocalStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // 故意制造错误的方法 - 用于后面的回滚练习
    introduceBug() {
        // 这个函数会破坏应用的正常功能
        this.todos = null; // 错误的赋值
        localStorage.removeItem('todos'); // 错误地清除数据
    }
}

// 初始化应用
const app = new TodoApp();

// 全局函数，供HTML按钮调用
function addTodo() {
    app.addTodo();
}