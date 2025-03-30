const validator = require("validator")

const validateUserData = (req) => {
      
//    const data =  JSON.parse(req.body)
   console.log(req)

    const { firstName, lastName, email, password } = req

    if(!firstName || !lastName){
        throw new Error("Please provide first Name and Last Name")
    }else if(!validator.isEmail(email)){
        throw new Error("Please Provide proper Email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please provide Strong Password")
    }

    return { firstName, lastName, email, password }
}

const validateProfileUpdateDate = (data)=>{
    
    const FieldsAllowedToEdit = ["firstName", "lastName", "age", "skills", "gender", "about", "profileUrl"]
   

   const isAllowed =  Object.keys(data).every((key)=>FieldsAllowedToEdit.includes(key))

   return isAllowed
    
}

module.exports = {validateUserData,validateProfileUpdateDate}