const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { insertMany } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
 .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  //iteration 2
  Recipe.create({
    title: 'Cereal',
    level: 'Easy Peasy',
    ingredients: ['musli', 'milk'],
    cuisine: 'Global',
    dishType: 'breakfast',
    duration: 2,
    creator: 'anyone',
  }).then(() => {
    console.log('recipe added')
  });

  Recipe.insertMany(data)
  .then((data) => data.forEach((recipe) => console.log(recipe.title)))
  .catch((err) => console.log(err));

  mongoose.set('useFindAndModify', false);

  Recipe.findOneAndUpdate({name: 'Carrot Cake'}, {level: 'Chef'})
  .then(() => {
    console.log('recipe updated');
  });

  Recipe.deleteOne({name: 'Carrot Cake'})
    .then(() => {
      console.log('carrot cake deleted');

        mongoose.connection.close();
    });