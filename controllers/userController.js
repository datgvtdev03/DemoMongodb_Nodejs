const express = require('express');
const userModel = require('../models/user');
const app = express();

app.get('/', (req, res) => {
    res.render('users/addUser', {
        viewTitle: "USER INFORMATION"
    })
})

// add data
app.post('/add', async(req, res) => {
    console.log("co gia tri: ", req.body);
    if (req.body.id == "") {
        //add 
        addUser(req, res);
    } else {
        //sua
        updateUser(req, res);
    }
})

function addUser(req, res) {
    const user = new userModel(req.body);
    try {
        user.save();
        res.render('users/addUser', {
            viewTitle: "Thêm thành viên"
        })
    } catch (err) {
        res.status(500).send(err);
    }
}

function updateUser(req, res) {
    userModel.findByIdAndUpdate({ _id: req.body.id }, req.body, { new: true })
        .then(updateUser => {
            console.log('Updated user:', updateUser);
            res.redirect('/user/list')
        })
        .catch(err => {
            console.error('Error updating user:', err);
        })
}


app.get('/list', async(req, res) => {
    userModel.find({}).then(users => {
        res.render('users/view-users', {
            users: users.map(user => user.toJSON())
        })
    })
})

app.get('/edit/:id', async(req, res) => {
    await userModel.findById(req.params.id).then(user => {
            res.render('users/addUser', {
                user: user.toJSON(),
                viewTitle: "Sửa thành viên"
            })
            console.log("Data: ", user);
        })
        .catch(err => {
            console.error("err: ", err);
        })
})


app.get('/delete/:id', async(req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id, req.body);
        if (!user) {
            res.status(404).send("Khong co user de xoa");
        } else {
            res.redirect('/user/list')
        }
    } catch (err) {
        res.status(500).send(err);
    }
})


module.exports = app;