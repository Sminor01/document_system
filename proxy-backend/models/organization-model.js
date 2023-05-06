const Sequelize = require('sequelize');
const sequelize = require('../connection');

const OrganizationModel = sequelize.define(
    'organization',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        inn: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        yr_add: {
            type: Sequelize.STRING(75),
            allowNull: false,
        },
        home_add: {
            type: Sequelize.STRING(75),
            allowNull: false,
        },
        kpp: {
            type: Sequelize.STRING(9),
            allowNull: false,
        },
        ras_chet: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        kor_chet: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        bik: {
            type: Sequelize.STRING(9),
            allowNull: false,
        },
        
    },
    {
        timestamps: false,
    }
);

module.exports = OrganizationModel;