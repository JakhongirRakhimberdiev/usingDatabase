const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/myData', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB...');
    })
    .catch((err) => {
        console.error('Something went wrong while connecting to MongoDB...', err);
    });

const bookSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        tags: [String],
        isPublished: Boolean,
        price: Number,
        date: {type: Date, default: Date.now}
    }
);
const Book = mongoose.model('Book', bookSchema);

async function createBook() {
    const book = new Book(
        {
            name: "Web-development asoslari",
            author: "Saidbek Arislanov",
            tags: ["HTML", "CSS", "JS"],
            isPublished: true,
            price: 8
        }
    );

    await book.save()
        .then(() => {
            console.log('Data saved!');
        })
        .catch((err) => {
            console.error('Something went wrong while saving data', err)
        });
}

async function getBook() {

    const pageNumber = 3;

    const books = await Book.find()
        .limit(pageNumber)
        .sort({ name: 1 })
        .select({ _id: 0 })
    //.count()
    console.log(books);
}

createBook();



