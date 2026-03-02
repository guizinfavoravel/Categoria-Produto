import { Router } from 'express';
const produtoRoutes = Router();
import produtoController from '../controller/produtocontroller.js';

produtoRoutes.get('/produtos/:id', produtoController.selecionarPorId);
produtoRoutes.post('/produtos', produtoController.inserirProduto);
produtoRoutes.put('/produtos/:id', produtoController.alterarProduto);
produtoRoutes.delete('/produtos/:id', produtoController.excluirProduto);

export default produtoRoutes