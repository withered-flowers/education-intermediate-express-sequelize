'use strict';
let dummy = require('../../b-end/data/dummy.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    dummy = dummy.map(elem => {
      // Jangan lupa dipetakan karena dalam tabel Identities dibutuhkan 
      // 2 tambahan kolom ini
      elem.createdAt = new Date();
      elem.updatedAt = new Date();

      return elem;
    });

    return queryInterface.bulkInsert(
      'Identities', 
      dummy, 
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Identities', null, {});
  }
};
