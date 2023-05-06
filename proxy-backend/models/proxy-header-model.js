const Sequelize = require('sequelize');
const sequelize = require('../connection');
const ProxyHeaderModel = sequelize.define(
    'proxyheader',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        number: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        dischargeDater: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        endDate : {
            type: Sequelize.DATE,
            allowNull: false,
        },
        individualId: {
            type:Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
        },
        organizationId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            foreignKey: true,
        }
        },
        {
            timestamps: false,
        }
        );
        module.exports = ProxyHeaderModel;