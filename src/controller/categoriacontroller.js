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

  listarPorId: async (req, res) => {
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
  inserirCategoria: async (req, res) => {
    try {
        const descricao = req.body.descricaoCategoria;

        const idGerado = await categoriaModel.inserirCategoria(descricao);

        res.status(201).json({
            mensagem: "Categoria cadastrada com sucesso",
            idCategoria: idGerado
        });

    } catch (error) {
        res.status(500).json({ erro: "Erro ao cadastrar categoria", detalhe: error });
    }
  },

  atualizarCategoria: async (req, res) => {
    try {
      const dados = {
        idCategoria: req.params.id,
        descricaoCategoria: req.body.descricaoCategoria
      };

      const linhasAfetadas = await categoriaModel.atualizarCategoria(dados);

      if (linhasAfetadas === 0) {
        return res.status(404).json({ mensagem: "Categoria não encontrada" });
      }

      res.json({ mensagem: "Categoria atualizada com sucesso" });

    } catch (error) {
      res.status(500).json({ erro: "Erro ao atualizar categoria", detalhe: error });
    }
  },

  excluirCategoria: async (req, res) => {
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

export default CategoriaController;