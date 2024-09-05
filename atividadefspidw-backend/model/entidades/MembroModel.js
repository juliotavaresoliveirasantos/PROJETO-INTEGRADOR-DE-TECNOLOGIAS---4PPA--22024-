const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database'); // Certifique-se de que o caminho para o arquivo de configuração do banco está correto.

const Membro = sequelize.define('Membro', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    funcao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataEntrada: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'membros',
    timestamps: true // Isso cria as colunas createdAt e updatedAt automaticamente
});

// Certifique-se de que o sequelize.sync() ou o gerenciamento de migrações está sendo chamado corretamente em outro lugar no seu projeto.

module.exports = Membro;
