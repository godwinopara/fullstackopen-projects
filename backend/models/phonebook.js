const mongoose = require("mongoose");

const url = `mongodb+srv://godwinopara62:godon2009@cluster0.ybrj36b.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose
	.connect(url)
	.then((result) => {
		console.log("connected to MongoDB");
	})
	.catch((error) => {
		console.log(`error connecting to DB ${error}`);
	});

const phoneBookSchema = mongoose.Schema({ name: String, number: String });

phoneBookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("PhoneBook", phoneBookSchema);
