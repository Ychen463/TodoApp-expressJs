import fs from 'fs';


const filePath = "./data/todo.json";
class Todo {
    constructor(id, title, description, dueDate, status){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
    static findAll(){
        const todos = JSON.parse(fs.readFileSync(filePath, 'utf8')).todos;
        return todos;
    }
    static create(newTodo){
        
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        newTodo.id = data.todos[data.todos.length - 1].id + 1;
        data.todos.push(newTodo);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    }
    static findById(id) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const todo = data.todos.find(todo => todo.id === id);
        return todo;
    }
    static update(id, newStatus) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const todos = data.todos.map(todo => {
            if (todo.id === id) {
                todo.status = newStatus; 
                return todo; 
            }
            return todo;
        });
        fs.writeFileSync(filePath, JSON.stringify({ todos }, null, 2), 'utf8');
    }
    
    static delete(id) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const todos = data.todos.filter(todo => todo.id !== id);
        fs.writeFileSync(filePath, JSON.stringify({ todos }, null, 2), 'utf8');
    }

}
export default Todo;
