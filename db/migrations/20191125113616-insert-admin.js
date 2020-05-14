module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query('SELECT * FROM "admin" WHERE email = ? ', {
        replacements: ["admin@gmail.com"],
        type: queryInterface.sequelize.QueryTypes.SELECT,
      })
      .then(users => {
        if (Object.keys(users).length === 0) {
          return queryInterface.bulkInsert(
            "admin",
            [
              {
                email: "admin@gmail.com",
                first_name: "admin",
                last_name: "admin",
                password:
                  "$2b$08$Udju1zocf.hutmCppnkuIOcJBXapXV6TmH6L2ol75ltmKmrZ.f5C2",
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            {}
          );
        }
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("admin");
  },
};
