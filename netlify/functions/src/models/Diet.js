const { STRING } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('diet', {
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
        this.setDataValue("name", value.toLowerCase());
      },
      validate:{
        len:[3, 30]
      }
    },
    description:{
      type:STRING,
      validate:{
        len:[0, 100]
      }
    }
  },{
    timestamps:false
  });
};