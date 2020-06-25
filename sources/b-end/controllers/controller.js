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
        console.log(`Totl deleted: ${data}`);
        res.redirect('/ide');
      })
      .catch(err => {
        res.send(err);
      });
  }
}

module.exports = Controller;