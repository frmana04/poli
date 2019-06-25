import values from './values';

const operations = {

    checkUsername : (userName) =>

        values.USERNAME_REGEX.test(userName),



    checkEmail : (email) =>

        values.EMAIL_REGEX.test(email),



    checkPassword : (password) =>

        values.EMAIL_REGEX.test(password),



    checkConfirmPassword : (password, confirmPassword) =>

        password === confirmPassword
}


export default {

    checkAll : (userName, email, password,{pass,confirmPassword} ) =>

        Object.values(operations).map ( (operation,index) => operation(arguments[index]))

}