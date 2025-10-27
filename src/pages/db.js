const mongoose = require("mongoose");

// Replace <password> with your actual database user password
// Replace <dbname> with the name of your database
const uri =
  "mongodb+srv://<Vinith_Richard>:<Vinith_Richard@12345>@cluster0.6imvp5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

const MongoDB = new mongoose.Schema({
  // firstName: String,
  // lastName: String
  //gender: String,
  // email:String,
  // salary:Number
});

const Item = mongoose.model("employees", MongoDB);

async function getItems() {
  try {
    //const article = await Item.create({
    //	  firstName: 'Awesome Post!',
    //	  lastName: 'awesome-post',
    //	  gender: 'male',
    //	  email: 'wesome-post@abc.com',
    //	  salary: 5000
    //	});
    //	console.log('Created article:', article);

    const items = await Item.find({}); // Finds all documents
    console.log("Retrieved items:", items);
    return items;
  } catch (err) {
    console.error("Error retrieving items:", err);
  }
}

getItems();
