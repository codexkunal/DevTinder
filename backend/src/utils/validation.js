const validator = require("validator")

const validateUserData = (req) => {
      
//    const data =  JSON.parse(req.body)
//    console.log(req)
console.log('esnfklksdnglsdglsdng');

    const { firstName, lastName, email, password } = req
console.log(firstName, lastName, email, password);

    if(!firstName || !lastName){
        throw new Error("Please provide first Name and Last Name")
    }else if(!validator.isEmail(email)){
        throw new Error("Please Provide proper Email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please provide Strong Password")
    }
 console.log("returnig to the signup api");
 
    return { firstName, lastName, email, password }
}

const validateProfileUpdateDate = (data)=>{
    
    const FieldsAllowedToEdit = [
      "firstName", "lastName", "age", "skills", "gender", "about", "profileUrl",
      "title", "location", "github", "linkedin", "portfolio",
      "interests", "languages", "projects"
    ]
   

   const isAllowed =  Object.keys(data).every((key)=>FieldsAllowedToEdit.includes(key))

   return isAllowed
    
}

module.exports = {validateUserData,validateProfileUpdateDate}