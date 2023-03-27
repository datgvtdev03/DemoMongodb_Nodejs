const express = require('express');
const baitapModel = require('../models/baitap');
const app = express();

// add data
app.post('/baitap', async(req, res) => {
  const baitap = new baitapModel(req.body);
  try {
    await baitap.save();
    res.send(baitap);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.get('/listbaitap', async(req, res) => {
  const baitap = await baitapModel.find({});
  try {
    res.send(baitap);
  } catch (err) {
    res.status(500).send(err);
  }
})

app.patch('/baitap/:id', async(req, res) => {
  try {
    const baitap = await baitapModel.findByIdAndUpdate(req.params.id, req.body);
    await userModel.save()
    res.send(baitap)
  } catch (err) {
    res.status(500).send(err);
  }
})

app.delete('/baitap/:id', async(req, res) => {
  try {
    const baitap = await baitapModel.findByIdAndDelete(req.params.id, req.body);
    if(!baitap) {
      res.status(404).send("Khong co bai tap de xoa");
    } else {
      res.status(200).send("Xoa thanh cong")
    }
  } catch (err) {
    res.status(500).send(err);
  }
})
module.exports = app;