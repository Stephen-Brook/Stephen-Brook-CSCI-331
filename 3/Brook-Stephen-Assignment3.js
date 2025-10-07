function isStrongPassword(password) {
    if (password.length < 8) {
        console.log("No good. Password must be at least 8 characters long.")
        return false;
    }
    if (password.includes("password")) {
        console.log("No good. Password cannot contain the word \"password\"");
        return false;
    }
    if (password.includes("1234")) {
        console.log("No good. Password cannot contain 1234.");
        return false;
    }
    let digit = false;
    for (let i = 0; i < password.length; i++) {
        let c = password.charCodeAt(i);
        if (c >= 48 && c <= 57) { // between '0' and '9'
            digit = true;
            break;
        }
    }
    if (!digit) {
        console.log("No good. Password must contain at least one number.");
        return false;
    }
    console.log("Good password!");
    return true;
}

isStrongPassword("qwerty1");
isStrongPassword("qwertypassword1");
isStrongPassword("qwertyABC");
isStrongPassword("qwerty1234");
isStrongPassword("qwerty123");

