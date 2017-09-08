module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true

        },

        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true

        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            notEmpty: true

        },

        street: {
          type: DataTypes.STRING,
          allowNull: false,
          notEmpty: true
        },

        city: {
          type: DataTypes.STRING,
          allowNull: false,
          notEmpty: true
        },

        state: {
          type: DataTypes.STRING,
          allowNull: false,
          notEmpty: true
        },

        zipcode: {
          type: DataTypes.STRING,
          allowNull: false,
          notEmpty: true
        },

        full_address: {
            type: DataTypes.TEXT,
            allowNull: false,
            notEmpty: true

        }


    });

    return User
};
