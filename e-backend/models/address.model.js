module.exports = (db, Sequelize) => {
    let Addresses = db.define('addresses', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        addressLine1: {
            type: Sequelize.STRING(100)
        },
        addressLine2: {
            type: Sequelize.STRING(100)
        },
        city: {
            type: Sequelize.STRING(50)
        },
        state: {
            type: Sequelize.STRING(50)
        },
        country: {
            type: Sequelize.STRING(50)
        },
        zipCode: {
            type: Sequelize.STRING(10)
        },
        mobileNumber: {
            type: Sequelize.STRING(15)
        },
        landmark: {
            type: Sequelize.STRING(100)
        },
        addressType: {
            type: Sequelize.STRING(100)
        },
        otherAddressLine: {
            type: Sequelize.STRING(100)
        },
    }, {
        tableName: 'addresses',
        alter: true
    });

    return Addresses;
};