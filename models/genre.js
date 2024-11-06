const mongoose = require("mongoose");

const { Schema } = mongoose;

const GenreSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// Virtual for genre's URL
GenreSchema.virtual("url").get(function () {
    return `/catalog/genre/${this._id}`;
  });



module.exports = mongoose.model("Genre", GenreSchema);
