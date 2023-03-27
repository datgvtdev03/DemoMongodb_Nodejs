const express = require('express');
const userModel = require('../models/user');
const app = express();

// add data
app.post('/user', async(req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/danhsachuser', async(req, res) => {
  const user = await userModel.find({});
  try {
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.patch('/user/:id', async(req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body);
    await userModel.save()
    res.send(user)
  } catch (err) {
    res.status(500).send(err);
  }
})

app.delete('/user/:id', async(req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id, req.body);
    if(!user) {
      res.status(404).send("Khong co user de xoa");
    } else {
      res.status(200).send("Xoa thanh cong")
    }
  } catch (err) {
    res.status(500).send(err);
  }
})
module.exports = app;