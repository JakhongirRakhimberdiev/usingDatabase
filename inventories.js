const mongoose = require('mongoose');

mongoose.connect('mongodb:localhost/myData')
    .then(() => {
        console.log('Connected to MongoDB...')
    })
    .catch((err) => {
        console.log('Something went wrong while connecting to MongoDB...', err)
    });

const inventorySchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    gender: String,
    age: Number,
    number: String
});

const Inventory = mongoose.model('Inventory', inventorySchema);

async function getInventoryItems1() {
    return await Inventory
        .find({ gender: "female" })
        .sort({ firstName: 1 })
        .select({ firstName: 1, lastName: 1, age: 1, _id: 0 })
}


async function getInventoryItems2() {
    return await Inventory
        .find()
        .or([{ age: { $lte: 50 } }, { firstName: /.*l.*/i }])
        .sort({ age: -1 });
}

async function run() {
    const items = await getInventoryItems2();
    console.log(items);
}

run();
