import pool from "../config/db.js";

const produtoModel = {

    selecionarPorId: async (pID) => {
        const sql = 'SELECT * FROM produtos WHERE idProduto = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    },

  inserirProduto: async (nome, preco, vincula,idCategoria) => {
    const sql = `
        INSERT INTO produtos 
        (nomeProduto, valorProduto, vinculoImagem,idCategoria)
        VALUES (?, ?, ?,?);
    `;

    const [result] = await pool.query(sql, [nome, preco, vincula,idCategoria]);
    return result;
    },

    alterarProduto: async (pId, nome, preco) => {  
        const connection = await pool.getConnection();    

        try {
            await connection.beginTransaction();

            const sql = `
                UPDATE produtos SET nomeProduto = ?, valorProduto = ?WHERE idProduto = ?
            `;

            const values = [nome, preco, pId];

            const [rowsProduto] = await connection.query(sql, values);

            await connection.commit();
            return rowsProduto;

        } catch (error) {
            await connection.rollback();
            throw error;

        } finally {
            connection.release();
        }
    },

    excluirProduto: async (pID) => {
        const sql = 'DELETE FROM produtos WHERE idProduto = ?;';
        const values = [pID];
        const [rows] = await pool.query(sql, values);
        return rows;
    }
};

export default produtoModel ;