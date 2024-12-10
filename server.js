import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = 'mongodb://127.0.0.1:27017/books';  // connection to databank
mongoose.connect(mongoUrl)

  .then(() => {
    console.log('MongoDB succesfully connected!');
  })
  .catch((error) => {
    console.error('Error to connect with MongoDB:', error);
  });

const Author = mongoose.model('Author', {
  name: String
});

// if (process.env.RESET_DATABASE) {
  console.log('Resetting database!');

  const seedDatabase = async () => {
    await Author.deleteMany();

    const tolkien = new Author({ name: 'J.R.R Tolkien' });
    await tolkien.save();

    const rowling = new Author({ name: 'J.K. Rowling' });
    await rowling.save();
  };

  seedDatabase();
// }

const port = process.env.PORT || 8080;
const app = express();

// Middlewares for CORS and JSON-Parsing
app.use(cors());
app.use(bodyParser.json());

// Start route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route to get authors
app.get('/authors', async (req, res) => {
  try {
    const authors = await Author.find();
    console.log(authors);
    res.json(authors);
  } catch (error) {
    console.error('Error retrieving authors:', error);
    res.status(500).send('Server error');
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// // const Book = mongoose.model('Book', {
// //   title: String,
// //   author: {
// //     type: mongoose.Schema.Types.ObjectId,
// //     ref: 'Author'
// //   }
// // })

//   //   await new Book({ title: "Harry Potter and the Philosopher's Stone", author: rowling }).save()
//   //   await new Book({ title: "Harry Potter and the Chamber of Secrets", author: rowling }).save()
//   //   await new Book({ title: "Harry Potter and the Prisoner of Azkaban", author: rowling }).save()
//   //   await new Book({ title: "Harry Potter and the Goblet of Fire", author: rowling }).save()
//   //   await new Book({ title: "Harry Potter and the Order of the Phoenix", author: rowling }).save()
//   //   await new Book({ title: "Harry Potter and the Half-Blood Prince", author: rowling }).save()
//   //   await new Book({ title: "Harry Potter and the Deathly Hallows", author: rowling }).save()
//   //   await new Book({ title: "The Lord of the Rings", author: tolkien }).save()
//   //   await new Book({ title: "The Hobbit", author: tolkien }).save()
//   }




// // app.get('/authors/:id', async (req, res) => {
// //   const author = await Author.findById(req.params.id)
// //   if (author) {
// //     res.json(author)
// //   } else {
// //     res.status(404).json({ error: 'Author not found' })
// //   }
// // })

// // app.get('/authors/:id/books', async (req, res) => {
// //   const author = await Author.findById(req.params.id)
// //   if (author) {
// //     const books = await Book.find({ 
// //       author: mongoose.Types.ObjectId.createFromHexString(author.id) 
// //     }) 
// //     res.json(books)
// //   } else {
// //     res.status(404).json({ error: 'Author not found' })
// //   }
// // })

// // app.get('/books', async (req, res) => {
// //   const books = await Book.find().populate('author')
// //   res.json(books)
// // })




// // Here comes the animal example from the codealong on disco
// // const mongoUrl = process.env.MONGO.URL || "mongodb://localhost/animals"
// // mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
// // mongoose.Promise = Promise

// // const Animal = mongoose.model('Animal', {
// //   name: String,
// //   age: Number,
// //   isFurry: Boolean,
// // })

// // AnimationPlaybackEvent.deleteMany().then(() => {
//   // new Animal({name: 'Alfons', age: 2, isFurry: true}).save()
// // new Animal({name: 'Lucy', age: 5, isFurry: true}).save()
// // new Animal({name: 'Goldy the goldfish', age: 1, isFurry: false}).save()
// // })

// // Start defining your routes here
// // app.get('/', (req, res) => {
// //   AnimationPlaybackEvent.find().then(animals => {
// //     res.json(animals)
// //   })
// // })

// // addProposalSyntaxPlugins.get('/:name', (req, res) => {
// //   if(animal) {
// //     res.json(animal)
// //   } else {
// //     res.status(404).json({error: 'Not found'})
// //   }
// // })