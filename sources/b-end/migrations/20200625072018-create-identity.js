'use strict';
module.exports = {
  // Awalnya di sini ada async bukan ?
  // kita akan mengubah nya dengan cara 
  // membuang keyword async tersebut
  up: (queryInterface, Sequelize) => {
    // Kemudian di sini harusnya ada await bukan?
    // kita akan mengganti keyword await tersebut
    // menjadi return.
    // Hal ini dapat terjadi karena 
    // queryInterface.createTable sudah bersifat Promise.
    return queryInterface.createTable('Identities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  // sama dengan yang ada di up tadi, 
  // keyword asyncnya dibuang
  // dan await nya diganti return.
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Identities');
  }
};