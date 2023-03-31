const mongoose = require('mongoose')
    const url = "mongodb://localhost:27017/dbManagerStore";
// const url = "mongodb://localhost:27017/baitapManager";



async function connect() {
    try {
        mongoose.connect(url)
            .then(() => console.log('Connected!'));
    } catch (error) {
        console.log('false');
    }
}
module.exports = { connect };