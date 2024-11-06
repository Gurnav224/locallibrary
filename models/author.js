
const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const { Schema } = mongoose;


const authorSchema = new Schema({
    first_name:{
        type:String,
        required:true,
        maxLength:100
    },
    family_name:{
        type:String,
        required:true,
        maxLength:100
    },
    date_of_birth:{
        type:Date
    },
    date_of_death:{
        type:Date
    }
})

authorSchema.virtual('name').get(function(){

    let fullname = "";

    if(this.first_name && this.family_name){
        fullname = `${this.first_name}, ${this.family_name}`
    }

    return fullname
})


authorSchema.virtual('url').get(function(){
    return `/catalog/author/${this._id}`
})

authorSchema.virtual('date_of_birth_formatted').get(function(){
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
})

authorSchema.virtual('date_of_death_formatted').get(function(){
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
})

// Virtual for lifespan (formatted)
authorSchema.virtual("lifespan").get(function () {
    const birthDate = this.date_of_birth ? this.date_of_birth.toLocaleDateString('en-US') : 'Unknown';
    const deathDate = this.date_of_death ? this.date_of_death.toLocaleDateString('en-US') : 'Present';
  
    return `${birthDate} - ${deathDate}`;
  });

module.exports = mongoose.model('Author',authorSchema)