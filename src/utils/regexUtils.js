const checkEmailFormat = (email) => {
    let regex = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
    return regex.test(email);
}

const checkPasswordFormat = (password) => {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.?!@#$%^&*])[A-Za-z\d.?!@#$%^&*]{8,20}$/;
    return regex.test(password);
}

const comparePassword = (password, passwordCheck) => {
    return password === passwordCheck
}

export {
    checkEmailFormat,
    checkPasswordFormat,
    comparePassword
}