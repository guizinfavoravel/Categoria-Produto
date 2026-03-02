import express from 'express';
import CategoriaController from '../controller/categoriacontroller.js';
const categoriaRoutes = express.Router();
const { produtoController } = import('../controller/produtocontroller.js');

categoriaRoutes.get('/categoria/:id', CategoriaController.listarPorId);
categoriaRoutes.post('/categoria', CategoriaController.inserirCategoria);
categoriaRoutes.put('/categoria/:id', CategoriaController.atualizarCategoria);
categoriaRoutes.delete('/categoria/:id', CategoriaController.excluirCategoria);

export default categoriaRoutes;