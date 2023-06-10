const mongoose = require("mongoose");

const phoneBookSchema = mongoose.Schema({ name: String, number: String });

phoneBookSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model("PhoneBook", phoneBookSchema);
