module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        "user",
        {
          first_name: DataTypes.STRING,
          last_name: DataTypes.STRING,
          phone: DataTypes.INTEGER,
          email: DataTypes.STRING
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    return user;
};
