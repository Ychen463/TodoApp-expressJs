import Todo from "../models/todoModel.js";

export const getAlltodos = (req, res) =>{
    try {
        const todos = Todo.findAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createTodo = (req, res)=>{
    try {
        const newTodo = req.body; 
        newTodo.time = new Date().toISOString();
        Todo.create(newTodo);
        res.status(201).json({ message: 'Todo created successfully', newTodo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const updateTodoStatus = (req,res) =>{
    const { id, status } = req.body;
    Todo.update(id,  status );
    if (res) { 
        return res.status(200).json({ message: 'Todo updated successfully' });
    } else {
        return res.status(404).json({ message: 'Todo not found' });
    }
}

export const deleteTodo = (req, res)=>{
    const {id} = req.body;
    
    Todo.delete(id);
    if (res) { 
        return res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
        return res.status(404).json({ message: 'Todo deleted failed' });
    }
}

export default { getAlltodos, createTodo, updateTodoStatus, deleteTodo };
