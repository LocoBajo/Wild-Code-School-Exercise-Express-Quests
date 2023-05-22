const Joi = require("joi");

const validateMovie = (req, res, next) => {

    const { title, director, year, color, duration } = req.body;
    const errors = []

 /*  if (title == null) {
    errors.push(`"title"`)}
        else if (title.length > 255) {
            res.status(422).send(`Should contain less than 255 characters`);
        }

  if (director == null) {
    errors.push(`"director"`)
  }

  if (year == null) {
    errors.push(`"year"`)
  }

  if (color == null) {
    errors.push(`"color"`)
  }

  if (duration == null) {
    errors.push(`"duration"`)
  }

  if (errors.length == 1) {

    res.status(422).send(`The field ${errors.join("")} is required`);
  } 
  
  if (errors.length > 1) {
    res.status(422).send(`The fields ${errors.join(" and ")} are required`)
  }
  else {

    next(); */

    if (title == null) {

        errors.push({ field: "title", message: "This field is required" });
    
      }
      else if (title.length >= 255) {

        errors.push({ field: "title", message: "Should contain less than 255 characters" });
      }
    
      if (director == null) {
    
        errors.push({ field: "director", message: "This field is required" });
    
      }
    
      if (year == null) {
    
        errors.push({ field: "year", message: "This field is required" });
    
      }
    
      if (color == null) {
    
        errors.push({ field: "color", message: "This field is required" });
    
      }
    
      if (duration == null) {
    
        errors.push({ field: "duration", message: "This field is required" });
    
      }
    
     
    
      if (errors.length) {
    
        res.status(422).json({ validationErrors: errors });
    
      } else {
    
        next();
    
      }

  }// validate req.body then call next() if everything is ok
  ;


const userSchema = Joi.object({

  email: Joi.string().email().max(255).required(),

  firstname: Joi.string().max(255).required(),

  lastname: Joi.string().max(255).required(),

  city: Joi.string().max(255).required(), 

  language: Joi.string().max(255).required(),

});


const validateUser = (req, res, next) => {

  const { firstname, lastname, email, city, language } = req.body;


  const { error } = userSchema.validate(

    { firstname, lastname, email, city, language },

    { abortEarly: false }

  );


  if (error) {

    res.status(422).json({ validationErrors: error.details });

  } else {

    next();

  }

};
  
  module.exports = {
  
    validateMovie,
    validateUser
  
  };