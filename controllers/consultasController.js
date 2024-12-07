const db = require('../config/db');

module.exports = {
    createConsulta: async (req, res) => {
        const { titulo_consulta, descricao_consulta } = req.body;

        if (!titulo_consulta || !descricao_consulta) {
            return res.status(400).json({ error: 'Título e descrição são obrigatórios' });
        }

        try {
            const sql = 'INSERT INTO consultas (titulo_consulta, descricao_consulta) VALUES (?, ?)';
            const [result] = await db.execute(sql, [titulo_consulta, descricao_consulta]);
            
            return res.status(201).json({ 
                message: 'Consulta criada com sucesso', 
                id: result.insertId 
            });
        } catch (err) {
            console.error('Erro ao inserir consulta:', err);
            return res.status(500).json({ error: 'Erro no servidor' });
        }
    }
};








