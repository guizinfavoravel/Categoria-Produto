import pool from '../config/produtomulter.js';

const categoriaModel = {

    selecionarTodos: async () => {
        const sql = 'SELECT * FROM categoria;';
        const [rows] = await pool.query(sql);
        return rows;
    },

    selecionarPorId: async (pID) => {
        const sql = 'SELECT * FROM categoria WHERE idCategoria = ?;';
        const [rows] = await pool.query(sql, [pID]);
        return rows;
    },

    inserirCategoria: async (descricao) => {
        const sql = `
            INSERT INTO categoria (descricaoCategoria, dataCad)
            VALUES (?, NOW());
        `;
        const [rows] = await pool.query(sql, [descricao]);
        return rows.insertId;  
    },

    alterarCategoria: async (idCategoria, descricao) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const sql = `
                UPDATE categoria 
                SET descricaoCategoria = ?, dataCad = NOW()
                WHERE idCategoria = ?
            `;

            const [resultado] = await connection.query(sql, [descricao, idCategoria]);

            await connection.commit();
            return resultado.affectedRows;

        } catch (error) {
            await connection.rollback();
            throw error;

        } finally {
            connection.release();
        }
    },

    excluirCategoria: async (pID) => {
        const sql = 'DELETE FROM categoria WHERE idCategoria = ?;';
        const [rows] = await pool.query(sql, [pID]);
        return rows.affectedRows;
    }
};

export default categoriaModel;