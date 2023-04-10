const submitButton = document.getElementById("submitButton");
submitButton.disabled = true;

var usernameIsGood = false;
var passwordIsGood = false;
var confirmPasswordIsGood = false;
var emailIsGood = false;
var userPassword;

function checkUsername(username) {
    var x = username;
    var charCheck = (/[a-zA-Z]/).test( x.charAt(0) );
    

    if( x.length < 3 && charCheck == false) {
        document.getElementById("usernameIsValid").innerHTML = "Your username needs to start with a character and have three or more alphanumeric characters.";
        usernameIsGood = false;
        checkAllRequirements();
    } else if( x.length > 3 && charCheck == false ) {
        document.getElementById("usernameIsValid").innerHTML = "Your username needs to start with a character.";
        usernameIsGood = false;
        checkAllRequirements();
    } else if( x.length < 3 && charCheck == true) {
        document.getElementById("usernameIsValid").innerHTML = "Your username needs to have three or more alphanumeric characters.";
        usernameIsGood = false;
        checkAllRequirements();
    } else if(x.length >= 3 && charCheck == true) {
        document.getElementById("usernameIsValid").innerHTML = "Your username is valid.";
        usernameIsGood = true;
        checkAllRequirements();
    }   
};

function checkPassword(password) {
    var x = password;
    var specialCheck = false;
    const specialCheckRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    var numberCheck = false;
    const numberCheckRegex = /[0-9]/;
    var uppercaseCheck = false;
    const isUpperRegex = /[A-Z]/;

    if(x.length >= 8 ) {

        if( (specialCheckRegex).test(x) == true ) {
            specialCheck = true;
        }

        if( (numberCheckRegex).test(x) == true ) {
            numberCheck = true;
        } 

        if( (isUpperRegex).test(x) == true ){
            uppercaseCheck = true;
        } 

        if(specialCheck == true && numberCheck == true && uppercaseCheck == true) {
            document.getElementById("passwordIsValid").innerHTML = "Your password is valid.";
            userPassword = password;
            //console.log(userPassword);
            passwordIsGood = true;
            checkAllRequirements();

        } else if( specialCheck == true && numberCheck == true && uppercaseCheck == false) {
            document.getElementById("passwordIsValid").innerHTML = "Your password needs to include at least one upper case letter.";
            passwordIsGood = false;
            checkAllRequirements();
            
        } else if( specialCheck == true && numberCheck == false && uppercaseCheck == false ) {
            document.getElementById("passwordIsValid").innerHTML = "Your password needs to include at least one upper case letter and one number.";
            passwordIsGood = false;
            checkAllRequirements();

        } else if( specialCheck == false && numberCheck == false && uppercaseCheck == false ) {
            document.getElementById("passwordIsValid").innerHTML = "Your password needs to include at least one of the following special characters:/ * - + ! @ # $ ^ & ~ [ ] , one upper case letter, and one number.";
            passwordIsGood = false;
            checkAllRequirements();

        } else if( specialCheck == false && numberCheck == true && uppercaseCheck == true ) {
            document.getElementById("passwordIsValid").innerHTML = "Your password needs to include at least one of the following special characters:/ * - + ! @ # $ ^ & ~ [ ] ."
            passwordIsGood = false;
            checkAllRequirements();

        } else if( specialCheck == false && numberCheck == true && uppercaseCheck == false ) {
            document.getElementById("passwordIsValid").innerHTML = "Your password needs to include at least one of the following special characters:/ * - + ! @ # $ ^ & ~ [ ] and one upper case letter."
            passwordIsGood = false;
            checkAllRequirements();

        } else if( specialCheck == false && numberCheck == false && uppercaseCheck == true ) {
            document.getElementById("passwordIsValid").innerHTML = "Your password needs to include at least one of the following special characters:/ * - + ! @ # $ ^ & ~ [ ] and one number."
            passwordIsGood = false;
            checkAllRequirements();

        }

    } else {
        document.getElementById("passwordIsValid").innerHTML = "Your password needs to include at least one of the follow special characters:/ * - + ! @ # $ ^ & ~ [ ] , one upper case letter, one number, and be 8 or more characters long.";
        passwordIsGood = false;
        checkAllRequirements();

    }
    

}

function checkConfirmPassword(confirmPassword) {
    var x = confirmPassword;

    if(userPassword == confirmPassword) {
        document.getElementById("confirmPasswordIsValid").innerHTML = "Your password matches.";
        confirmPasswordIsGood = true;
        checkAllRequirements();

    } else {
        document.getElementById("confirmPasswordIsValid").innerHTML = "Your password doesn't match."
        confirmPasswordIsGood = false;
        checkAllRequirements();

    }



}

function checkAllRequirements() {
    //console.log(usernameIsGood + " " + passwordIsGood + " " + " " + confirmPasswordIsGood);
    if(usernameIsGood == true && passwordIsGood == true && confirmPasswordIsGood == true) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }

}