import categoriaModel from "../models/categoria.model.js"

const CategoriaController = {
    
    async listarTodos(req, res) {
        try {
            const categorias = await categoriaModel.selecionarTodos();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao buscar categorias", detalhe: error });
        }
    },

    async listarPorId(req, res) {
        try {
            const id = req.params.id;
            const categoria = await categoriaModel.selecionarPorId(id);

            if (categoria.length === 0) {
                return res.status(404).json({ mensagem: "Categoria não encontrada" });
            }

            res.json(categoria[0]);
        } catch (error) {
            res.status(500).json({ erro: "Erro ao buscar categoria", detalhe: error });
        }
    },

    async inserirCategoria(req, res) {
        try {
            const descricao = req.body.descricaoCategoria;

            if (!descricao) {
                return res.status(400).json({ mensagem: "descricaoCategoria é obrigatória" });
            }

            const idGerado = await categoriaModel.inserirCategoria(descricao);
            console.log(idGerado)

            res.status(201).json({
                mensagem: "Categoria cadastrada com sucesso",
                idCategoria: idGerado
            });

        } catch (error) {
            res.status(500).json({ erro: "Erro ao cadastrar categoria", detalhe: error });
        }
    },

    async atualizarCategoria(req, res) {
        try {
            const id = req.params.id;
            const descricao = req.body.descricaoCategoria;

            const linhasAfetadas = await categoriaModel.alterarCategoria(id, descricao);

            if (linhasAfetadas === 0) {
                return res.status(404).json({ mensagem: "Categoria não encontrada" });
            }

            res.json({ mensagem: "Categoria atualizada com sucesso" });

        } catch (error) {
            res.status(500).json({ erro: "Erro ao atualizar categoria", detalhe: error });
        }
    },

    async excluirCategoria(req, res) {
        try {
            const id = req.params.id;

            const linhasAfetadas = await categoriaModel.excluirCategoria(id);

            if (linhasAfetadas === 0) {
                return res.status(404).json({ mensagem: "Categoria não encontrada" });
            }

            res.json({ mensagem: "Categoria excluída com sucesso" });

        } catch (error) {
            res.status(500).json({ erro: "Erro ao excluir categoria", detalhe: error });
        }
    }
}
export default CategoriaController