import express from 'express';
import CategoriaController from '../controller/categoriacontroller.js';
const categoriaRoutes = express();
const { produtoController } = import('../controller/produtocontroller.js');

categoriaRoutes.get('/categoria/:id', CategoriaController.selecionarPorId);
categoriaRoutes.post('/categoria', CategoriaController.inserirProduto);
categoriaRoutes.put('/categoria/:id', CategoriaController.alterarProduto);
categoriaRoutes.delete('/categoria/:id', CategoriaController.excluirProduto);

export default categoriaRoutes;