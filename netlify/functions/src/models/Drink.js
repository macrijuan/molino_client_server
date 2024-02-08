const { STRING, ARRAY, BOOLEAN, TEXT, INTEGER, ENUM } = require('sequelize');
const {arrayValidator} = require("../models_validations.js");
const { dobleSpaceEraser }=require("../formatter.js");

module.exports = (sequelize) => {
  return sequelize.define('drink', {
    // id:{
    //   type: UUID,
    //   primaryKey:true,
    //   allowNull: false,
    //   defaultValue:UUIDV4
    // },
    name: {
      type: STRING,
      allowNull: false,
      set(value){
        this.setDataValue("name", value = dobleSpaceEraser(value));
        this.setDataValue("name", value = value.toLowerCase());
      },
      validate:{
        len:[3,30]
      }
    },

    ingredients:{
      type: ARRAY(STRING),
      set(value){
        if(value){
          this.setDataValue("ingredients", value = dobleSpaceEraser(value));
          this.setDataValue("ingredients", value = value.map(i=>i.toLowerCase()));
        };
      },
      validate:{
        arrValidation:function(value){arrayValidator(value, "Ingredient", 1, 30)}
      }
    },

    volumen:{
      type: STRING,
      allowNull:false,
      validate:{
        len:[6,8]
      }
    },
    
    description:{
      type: STRING,
      set(value){
        this.setDataValue("description", value = dobleSpaceEraser(value));
      },
      validate:{
        len:[0, 500]
      }
    },

    image:{
      type:TEXT,
      validate:{
        len:[0,10000],
        isString:function(value){if(typeof value !== "string") throw new Error("Wrong data type.")}
      }
    },

    taste:{
      type:ENUM('sweet', 'sour', 'bittersweet', 'bitter'),
      allowNull:false
    },

    price:{
      type:INTEGER,
      allowNull:false,
      validate:{
        max:100000,
        min:0
      }
    },

    alcoholic:{
      type:BOOLEAN,
      defaultValue:false
    },

    available:{
      type:BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
  },{
    timestamps:false
  });
};