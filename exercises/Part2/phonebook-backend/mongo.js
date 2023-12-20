const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'please provide a password as an argument. Example: node mongo.js yourpassword'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://umarber:${password}@cluster0.kfedf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log('phonebook: ', person.name, person.number);
    });
    mongoose.connection.close();
  });
}
if (process.argv.length > 3) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(() => {
    console.log(`added ${name} number ${number} to the phonebook`);
    mongoose.connection.close();
  });
}
