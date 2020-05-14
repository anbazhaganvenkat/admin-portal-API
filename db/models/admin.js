module.exports = (sequelize, DataTypes) => {
    const admin = sequelize.define(
        "admin",
        {
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            session_id: DataTypes.STRING,
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
        },
        {
            freezeTableName: true,
            paranoid: true,
        }
    );
    return admin;
};
