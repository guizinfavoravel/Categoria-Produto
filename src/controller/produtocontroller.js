import produtoModel from '../models/produto.model.js';

const produtoController = {
    selecionarPorId: async (req, res) => {
        try {
            const id = req.params.id;
            const resultado = await produtoModel.selecionarPorId(id);

            if (resultado.length === 0) {
                return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json(resultado[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar produto" });
        }
    },
    inserirProduto: async (req, res) => {
        try {
        const { nome, preco, vincula, idCategoria } = req.body;
const resultado = await produtoModel.inserirProduto(nome, preco, vincula,idCategoria);

            return res.status(201).json({ message: "Produto inserido com sucesso", resultado });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao inserir produto", error });
        }
    },
    alterarProduto: async (req, res) => {
        try {
            const id = req.params.id;
            const { nome, descricao, preco } = req.body;

            const resultado = await produtoModel.alterarProduto(id, nome, descricao, preco);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: "Produto não encontrado para atualizar" });
            }

            return res.status(200).json({ message: "Produto atualizado com sucesso" });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar produto", error });
        }
    },
    excluirProduto: async (req, res) => {
        try {
            const id = req.params.id;

            const resultado = await produtoModel.excluirProduto(id);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ message: "Produto não encontrado para excluir" });
            }
            return res.status(200).json({ message: "Produto excluído com sucesso" });

        } catch (error) {
            if (error.errno === 1451) {
                return res.status(400).json({ message: "Existe uma entrega relacionada ao produto" })
            }
            console.error(error);
            return res.status(500).json({ message: "Erro ao excluir produto", error });
        }
    }

}

export default produtoController;