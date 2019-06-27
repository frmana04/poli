import values from './values';

const operations = {

    checkUsername : (userName) =>

        values.USERNAME_REGEX.test(userName),


    checkEmail : (email) =>

        values.EMAIL_REGEX.test(email),


    checkPassword : (password) =>

        values.PASSWORD_REGEX.test(password),


    checkConfirmPassword : ({password, confirmPassword}) =>

        password === confirmPassword
}


export default {

    checkAll: function  (userName, email, password,{pass,confirmPassword} ){
   
        const argv=arguments; 
        
        return Object.values(operations).map ( (operation,index) =>    
       
           operation(argv[index])
        
        )}

}