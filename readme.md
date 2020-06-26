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
|----------|--------------|-------------|
| id       | SERIAL       | PRIMARY KEY |
| name     | VARCHAR(255) | NOT NULL    |
| jobTitle | VARCHAR(255) | NOT NULL    |
| phone    | VARCHAR(255) | NOT NULL    |
| address  | VARCHAR(255) | NOT NULL    |

#### Tabel 2

| Endpoint           | Deskripsi                              |
|--------------------|----------------------------------------|
| GET /              | Menampilkan "hello world"              |
| GET /ide           | Menampilkan form penambah `Identities` |
| GET /ide/add       | Menampilkan form penambah `Identities` |
| POST /ide/add      | Menghandle form penambah `Identities`  |
| GET /ide/edit/:id  | Menampilkan edit form `Identities`     |
| POST /ide/edit/:id | Menghandle edit form `Identities`      |
| GET /ide/del/:id   | Menghandle delete `Identities`         |

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
  folder `models` dan sebuah file pada folder `migrations`, coba lihat file
  pad `models` dan `migrations`  untuk mengetahui lebih lanjut bagaimaan kode
  dibuat.
* Dikarenakan kita di sini masih ingin menggunakan `promise` instead of
  `async / await`, maka kita akan melakukan edit pada file `migrations` yang
  baru dibuat oleh `sequelize`, contoh perubahan untuk mengubah `async / await`
  menjadi `promise` dapat dilihat pada [Code 00](#code-00)
* Selanjutnya, kita akan menjalankan perintah untuk membuat tabel ini dengan 
  menjalankan perintah `npx sequelize-cli db:migrate`
* Setelah menjalankan perintah ini, maka dapat dilihat pada postgresql bahwa 
  tabel `Identities` sudah terbentuk.

#### Code 00
```javascript
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
      ...
    });
  },

  // sama dengan yang ada di up tadi, 
  // keyword asyncnya dibuang
  // dan await nya diganti return.
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Identities');
  }
};
```

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
// Jangan lupa fs karena kita mau baca json
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // 02.
    // Di sini kita akan membaca filenya terlebih dahulu
    // Ingat bahwa pada sequelize semua tabel akan memiliki 2 kolom tambahan
    // createdAt dan updatedAt
    // sehingga kita harus memasukkan data tersebut.

    let dummy = JSON.parse(fs.readFileSync('./data/dummy.json', 'utf8'));

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

### Langkah 5 - Membuat app.js, routes, dan Controller
Sebelumnya, kita akan membuat sebuah folder bernama `controllers` terlebih
dahulu dan membuat sebuah file `controllers/controller.js` yang masih kosong.

Selanjutnya kita akan membuat app.js beserta routesnya terlebih dahulu.

Pada file `app.js` kita akan menuliskan kode untuk:
* Menjalankan express
* Menggunakan view engine ejs
* Menggunakan body-parser / express.urlencoded
* Membuat router express mengarah ke `routes/index.js`

Sehingga pada file `app.js`, akan terbentuk kode sebagai berikut
```javascript
const express = require('express');
const app = express();

const PORT = 3000;

// Jangan lupa import routes/index.js
// Abaikan bila error pada saat pembuatan pertama
const indexRoutes = require('./routes/index.js');

// set view engine
app.set('view engine', 'ejs');
// gunakan middleware bodyParser
app.use(express.urlencoded({ extended: true }));

// Menggunakan routes dari routes/index.js
// Abaikan bila error pada saat pembuatan pertama karena file dan
// folder belum terbentuk
app.use('/', indexRoutes);

// Jalankan express
app.listen(PORT, () => {
  console.log(`Aplikasi jalan di PORT ${PORT}`);
})
```

Selanjutnya kita akan mendefinisikan routes dan seluruh endpoint yang ada, 
hal ini akan kita definisikan dalam 2 file, yaitu:
* `routes/identities.js` yang berisi semua yang berhubungan dengan resource
  `ide/` dan
* `routes/index.js` yang berisi penampung semuanya.

Berdasarkan penjelasan di atas, maka selanjutnya adalah kita akan:
* Membuat folder `routes`
* Membuat file `routes/identities.js`
* Membuat file `routes/index.js`

Maka pada file `routes/identities.js`, kita juga akan mendefinisikan beberapa
method yang dibutuhkan sebagai method `Controller` untuk setiap endpoint yang
ada.

```javascript
const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js);

// Semua router endpoint yang ada hub dengan /ide
// ditaruh di sini
router.get('/', Controller.getIdentityRootHandler);
router.get('/add', Controller.getIdentityAddHandler);
router.post('/add', Controller.postIdentityAddHandler);
router.get('/edit/:id', Controller.getIdentityEditHandler);
router.post('/edit/:id', Controller.postIdentityEditHandler);
router.get('/del/:id', Controller.getIdentityDelHandler);

module.exports = router;
```

Dicatat bahwa pada `routes/identities.js` ini akan memangil file 
`controllers/controller.js` dan memiliki 6 method yang harus didefiniskan 
nanti:
* getIdentityRootHandler
* getIdentityAddHandler
* postIdentityAddHandler
* getIdentityEditHandler
* postIdentityEditHandler
* getIdentityDelHandler

Selanjutnya kita akan berpindah pada file `routes/index.js` dan mendefinisikan
seluruh rute utama yang harus ada.

Kode untuk `routes/index.js` adalah sebagai berikut:
```javascript
const express = require('express');
const router = express.Router();

const Controller = require('../controllers/controller.js');
const identityRoutes = require('./identities.js');

// Semua route akan dihandle oleh si index ini
router.get('/', Controller.getRootHandler);
router.use('/ide', identityRoutes);

module.exports = router;
```

Dicatat lagi bahwa pada `routes/index.js` ini akan memanggil file 
`controllers/controller.js` dan memiliki 1 method tambahan yang harus 
didefiniskan nanti:
* getRootHandler

Sehingga total akan ada 7 method yang harus didefine pada 
`controllers/controller.js`.

Setelah semua rute didefinisikan dan `app.js` selesai dibuat, maka saatnya 
kita berpindah ke bagian `otak` nya, yaitu `controllers.controller.js` dan
mendefinisikan ke-7-method yang dibuat.

Diingat bahwa karena kita sudah menggunakan `sequelize`, maka untuk bagian
`models` sudah di-generate, kita tinggal menggunakannya saja !

WARNING:  
Untuk mempercepat proses pembelajaran, maka untuk `views` nya sudah 
disediakan template dan sudah disebutkan variabel apa yang dibutuhkan.
Diingat pada dunia nyata `views` ini harus dibuat sendiri yah !

```javascript
const { Identity } = require('../models/index.js');

class Controller {
  static getRootHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama 
    //`views/home.ejs`
    
    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    res.render('home', {
      title: "Home"
    });
  }

  static getIdentityRootHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama
    // views/ide-list.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    //    dataIdentities, untuk menaruh data yang didapat dari model
    //      dalam bentuk tabel
    Identity.findAll()
      .then(data => {
        res.render('ide-list', {
          title: "Identity - List",
          dataIdentities: data
        })
      })
      .catch(err => {
        res.send(err);
      });
  }
  
  static getIdentityAddHandler(req, res) {
    // Di sini kita akan me-render sebuah views bernama
    // views/ide-add.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    res.render('ide-add', {
      title: "Identity - Add"
    });
  }

  static postIdentityAddHandler(req, res) {
    // Di sini kita akan menerima inputan form dari 
    // views/ide-add.ejs

    // paramater yang diterima adalah
    // req.body.acc_name
    // req.body.acc_jobTitle
    // req.body.acc_phone
    // req.body.acc_address
    const inputBody = req.body;

    let objIdentity = {
      name: inputBody.acc_name,
      jobTitle: inputBody.acc_jobTitle,
      phone: inputBody.acc_phone,
      address: inputBody.acc_address
    };

    Identity.create(objIdentity)
      .then(data => {
        console.log(`Data with id ${data.id} has been added !`);
        res.redirect('/ide');
      })
      .catch(err => {
        res.send(err);
      });
  }

  static getIdentityEditHandler(req, res) {
    // Di sini kita akan menerima inputan dari 
    // parameter di endpoint dan 
    // Kemudian akan melakukan pencarian spesifik dari tabel
    // dan melemparkannya ke views/ide-edit.ejs

    // view ini membutuhkan parameter
    //    title, untuk menaruh judul
    //    dataIdentity, untuk menerima data identitas dari 
    //      hasil pencarian
    const idInput = req.params.id;

    Identity.findOne({
      where: {
        id: idInput
      }
    })
      .then(data => {
        res.render('ide-edit', {
          title: "Identity - Edit",
          dataIdentity: data
        })
      })
      .catch(err => {
        res.send(err);
      });
  }

  static postIdentityEditHandler(req, res) {
    // Di sini kita akan menerima inputan dari 
    // parameter di endpoint dan 
    // form dari views/ide-edit.ejs

    // paramater yang diterima adalah
    // req.body.acc_name
    // req.body.acc_jobTitle
    // req.body.acc_phone
    // req.body.acc_address
    const inputBody = req.body;

    let objIdentity = {
      name: inputBody.acc_name,
      jobTitle: inputBody.acc_jobTitle,
      phone: inputBody.acc_phone,
      address: inputBody.acc_address
    };

    Identity.update(objIdentity, {
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        console.log(`Data with id ${data.id} has been updated !`);
        res.redirect('/ide');
      })
      .catch(err => {
        res.send(err);
      });
  }

  static getIdentityDelHandler(req, res) {
    // Di sini kita akan menerima inputan dari 
    // parameter di endpoint
    Identity.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(data => {
        console.log(`Data with id ${data.id} has been deleted !`);
        res.redirect('/ide');
      })
      .catch(err => {
        res.send(err);
      });
  }
}

module.exports = Controller;
```

Sampai di tahap ini, artinya aplikasi kita sudah selesai dan siap dijalankan.

### Langkah 6 - Jalankan Aplikasi
Mari kita jalankan aplikasi kita dengan mengetik `npx nodemon app.js`

Selamat ! sampai di sini artinya kita sudah berhasil membuat aplikasi dengan
menggunakan express dan sequelize dan sudah berhasil melakukan CRUD sederhana !

## References
* [Sequelize Documentation](https://sequelize.org/v5/)
* [Sequelize API Ref](https://sequelize.org/v5/identifiers.html)
