import express from 'express';
import todoControllers from '../controllers/todoControllers.js';

const router = express.Router();

router
    .route('/todos')
    .get(todoControllers.getAlltodos)
    .post(todoControllers.createTodo)
router
    .route('/todo')
    .put(todoControllers.updateTodoStatus)
    .delete(todoControllers.deleteTodo);

export default router;