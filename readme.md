## Table of Content
1. [Recap Express](#recap-express)
1. [Recap Sequelize](#recap-sequelize)
1. [Let's Make the App](#lets-make-the-app)
1. [References](#references)

## Recap Express
Express merupakan framework minimal untuk pembuatan web pada nodejs yang sangat 
populer. Dengan menggunakan express ini kita bisa membuat REST API dengan 
sangat cepat ataupun kita bisa membuat aplikasi web Server Side Rendering 
dengan menggunakan template engine tertentu, seperti *pug*, *ejs*, dan lain 
lain.

## Recap Sequelize
Sequelize merupakan ORM (Object Relational Mapper) berbasis *promise* untuk 
PostgreSQL, MariaDB, MySQL, SQLite, dan MSSQL. dengan menggunakan `Sequelize` 
ini, kita nantinya tidak perlu lagi menuliskan query sederhana lagi pada SQL 
kita, karena akan dihandle dengan berbagai method yang sudah disediakan oleh 
`Sequelize`.

Pada pembelajaran kali ini kita akan membuat sebuah aplikasi yang akan 
menggunakan:
* `express` sebagai web framework kita.
* `ejs` sebagai templating engine tampilan.
* `postgres` sebagai database SQL penampung data.
* `sequelize` sebagai ORM untuk mempermudah dalam penulisan query.

## Let's Make the App
Sudah cukup teorinya bukan?

Sekarang mari kita mencoba untuk membuat aplikasinya !

Requirement dari aplikasi ini adalah:
* Diberikan sebuah database pada `postgresql` dengan nama `development`
* Dengan diberikan sebuah data `data/dummy.json`, buatlah sebuah tabel dengan 
  nama `Identities` pada database yang dibuat.
* Tabel `Identities` akan memiliki kolom yang dapat dilihat pada 
  [Tabel 1](#tabel-1)

* Buatlah sebuah aplikasi web sederhana yang akan memiliki endpoint yang dapat
  dilihat pada [Tabel 2](#tabel-2)

#### Tabel 1
| Kolom    | Tipe         | Deskripsi   |
| -------- | ------------ | ----------- |
| id       | SERIAL       | PRIMARY KEY |
| name     | VARCHAR(255) | NOT NULL    |
| jobTitle | VARCHAR(255) | NOT NULL    |
| phone    | VARCHAR(255) | NOT NULL    |
| address  | VARCHAR(255) | NOT NULL    |

#### Tabel 2
| Endpoint       | Description                            |
| -------------- | -------------------------------------- |
| GET /          | Menampilkan list semua `Identities`    |
| GET /add       | Menampilkan form penambah `Identities` |
| POST /add      | Menghandle form penambah `Identities`  |
| -------------- | -------------------------------------- |
| GET /edit/:id  | Menampilkan edit form `Identities`     |
| POST /edit/:id | Menghandle edit form `Identities`      |
| GET /del/:id   | Menghandle delete `Identities`         |

Jadi setelah melihat requirement seperti, apa sajakah yang harus kita lakukan?

### Langkah 1 - Inisialisasi & Install module yang dibutuhkan terlebih dahulu
Pertama-tama kita harus menginisialisasi folder dan module yang dibutuhkan
dengan cara:
* Melakukan `npm init -y`
* Menginstall module yang dibutuhkan `express`, `ejs`, `pg`, dan `sequelize`
  dengan `npm install express ejs pg sequelize`
* Menginstall module yang dibutuhkan pada saat `development` yaitu `nodemon`
  dan `sequelize-cli` dengan `npm install -D nodemon sequelize-cli`

Maka setelah ini bentuk foldernya akan menjadi seperti ini:
```
.
├── data
│   └── dummy.json
├── node_modules
│   └── ...
├── package.json
└── package-lock.json
```

### Langkah 2 - Inisialisasi dan Konfigurasi sequelize
Selanjutnya setelah kita melakukan inisialisasi dan konfigurasi `sequelize` 
dengan cara:
* Inisialisasi sequelize dengan `npx sequelize-cli init`
* Setelah perintah di atas diketik, maka akan terbentuk folder:
    * `config`, yang digunakan untuk menyimpan konfigurasi database
    * `migrations`, yang digunakan untuk membuat atau mengubah tabel pada 
       database
    * `models`, yang digunakan untuk membuat Model representasi tabel data
    * `seeders`, yang digunakan untuk memasukkan data awal.
* Mengedit file konfigurasi pada `config/config.json` dengan memasukkan 
  credential yang tepat, dan `dialect` yang diubah ke `postgres`
* Setelah melakukan konfigurasi di atas, dengan menggunakan GUI / CLI untuk 
  `postgresql` buatlah database dengan nama `development`. 

### Langkah 3 - Membuat tabel Identities
Selanjutnya adalah kita akan membuat model `Identity` dengan tabel `Identities`
sekaligus dengan menggunakan `sequelize`. Caranya adalah dengan:
* Melihat ulang terlebih dahulu struktur tabel yang dibutuhkan, perhatikan 
  bahwa pada struktur tabel memiliki `id`, namun pada saat kita menggunakan
  `sequelize` kita tidak perlu menuliskan hal tersebut, karena akan dibuat
  secara otomatis. Sehingga berdasarkan info ini, maka pada tabel `Identities`,
  yang butuh dibuat adalah `name`, `jobTitle`, `phone`, dan `address`.
* Harus diingat juga ketika membuat model dan tables / migrations, perhatikan
  bahwa nama pada Model = `Singular` dan nama table = `Plurals`.
  `Jangan sampai terbalik yah !`
* Sehingga, berdasarkan data ini, maka yang harus diketik adalah 
  `npx sequelize-cli model:generate --name Identity --attributes \
   name:String,jobTitle:String,phone:String,address:String`
* Setelah perintah di atas diketik, maka akan terbentuk sebuah file pada 
  folder `models` dan sebuah file pada folder `migrations`
* Selanjutnya, kita akan menjalankan perintah untuk membuat tabel ini dengan 
  menjalankan perintah `npx sequelize-cli db:migrate`
* Setelah menjalankan perintah ini, maka dapat dilihat pada postgresql bahwa 
  tabel `Identities` sudah terbentuk.

### Langkah 4 - Membuat seeder
Selanjutnya, setelah tabel terbentuk, kita akan memasukkan data yang kita
miliki dalam `data/dummy.json` menjadi data dalam tabel kita, oleh karena itu
langkah-langkahnya adalah:
* Membuat file seed dengan cara mengetik perintah 
  `npx sequelize-cli seed:generate --name seed-identities`
* Setelah mengetik perintah di atas, maka akan terbentuk file baru dengan nama
  `seeders/<timestamp>-seed-identities.js`, buka file tersebut dan kita akan 
  mengedit file tersebut. Kode yang akan ditulis dapat dilihat pada 
  [Code 01](#code-01)
* Setelah menuliskan kode tersebut, kita akan melakukan *seeding* dengan cara 
  mengetik `npx sequelize db:seed:all`

#### Code 01
```javascript
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
```

```javascript
'use strict';
// 01.
// Cara untuk melakukan fs.readFileSync + parse data dengan cepat
let dummy = require('../../b-end/data/dummy.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
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

  down: (queryInterface, Sequelize) => {
    // Ceritanya, kalau ada up (kita melakukan)
    // down (kita mereverse apa yang kita lakukan)
    // Kita gunakan 
    // return queryInterface.bulkDelete('NamaTabel', arrayObj, opt)
    return queryInterface.bulkDelete('Identities', null, {});
  }
};
```

### Langkah 5 - Membuat app.js dan MVC


## References
