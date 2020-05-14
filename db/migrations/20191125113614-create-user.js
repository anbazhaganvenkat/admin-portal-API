module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("user", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
              type: Sequelize.STRING,
            },
            last_name: {
              type: Sequelize.STRING,
            },
            email: {
              type: Sequelize.STRING,
            },
            phone: {
              type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            deletedAt: {
                allowNull: true,
                type: Sequelize.DATE,
                default: null
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("user");
    },
};
