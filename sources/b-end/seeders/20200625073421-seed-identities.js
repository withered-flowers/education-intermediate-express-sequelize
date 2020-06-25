'use strict';
// 01.
// Cara untuk melakukan fs.readFileSync + parse data dengan cepat
let dummy = require('../data/dummy.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 02.
    // Di sini kita akan membaca filenya terlebih dahulu
    // Ingat bahwa pada sequelize semua tabel akan memiliki 2 kolom tambahan
    // createdAt dan updatedAt
    // sehingga kita harus memasukkan data tersebut.

    dummy = dummy.map(elem => {
      // Jangan lupa dipetakan karena dalam tabel Identities dibutuhkan 
      // 2 tambahan kolom ini
      elem.createdAt = new Date();
      elem.updatedAt = new Date();

      return elem;
    })

    // 03. 
    // Masukkan data ke dalam tabel Identities
    // Kita gunakan 
    // return queryInterface.bulkInsert('NamaTabel', arrayObj, opt)
    return queryInterface.bulkInsert(
      'Identities', 
      dummy, 
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Ceritanya, kalau ada up (kita melakukan)
    // down (kita mereverse apa yang kita lakukan)
    // Kita gunakan 
    // return queryInterface.bulkDelete('NamaTabel', arrayObj, opt)
    return queryInterface.bulkDelete('Identities', null, {});
  }
};
