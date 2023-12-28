const express = require('express');
const app = express();
const conn = require('./config/db');

app.use(express.json());

app.get('/get-mahasiswa', function (req, res) {
  const queryStr = 'SELECT * FROM mahasiswa WHERE deleted_at IS NULL';
  conn.query(queryStr, (err, results) => {
    if (err) {
      res.error(err.sqlMessage, res);
    } else {
      res.status(200).json({
        success: true,
        message: 'Sukses menampilkan data',
        data: results,
      });
    }
  });
});

app.get('/get-mahasiswa-by-id', function (req, res) {
  const param = req.query;
  const id = param.id;

  const queryStr = 'SELECT * FROM mahasiswa WHERE deleted_at IS NULL AND id = ?';
  const values = [id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        succes: true,
        message: 'Sukses menampilkan data',
        data: results,
      });
    }
  });
});

app.post('/store-mahasiswa', function (req, res) {
  const param = req.body;
  const nama = param.nama;
  const email = param.email;
  const date_of_birth = param.date_of_birth;
  const queryStr = 'INSERT INTO mahasiswa (nama, email, date_of_birth) VALUES (?, ?, ?)';
  const values = [nama, email, date_of_birth];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        success: true,
        message: 'Sukses menyimpan data',
        data: results,
      });
    }
  });
});

app.post('/update-mahasiswa', function (req, res) {
  const param = req.body;
  const id = param.id;
  const nama = param.nama;
  const email = param.email;
  const date_of_birth = param.date_of_birth;
  const queryStr = 'UPDATE mahasiswa SET nama = ?, email = ?, date_of_birth = ? WHERE id = ? AND deleted_at IS NULL';
  const values = [nama, email, date_of_birth, id];
  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        success: true,
        message: 'Sukses mengubah data',
        data: results,
      });
    }
  });
});

app.post('/delete-mahasiswa', function (req, res) {
  const param = req.body;
  const id = param.id;
  const now = new Date();

  const queryStr = 'UPDATE mahasiswa SET deleted_at = ? WHERE id = ?';
  const values = [now, id];

  conn.query(queryStr, values, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        succes: false,
        message: err.sqlMessage,
        data: null,
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'Sukses menghapus data',
        data: results,
      });
    }
  });
});

app.listen(3000);
