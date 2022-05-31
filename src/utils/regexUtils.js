const checkEmailFormat = (email) => {
    let regex = /^([\w\.\_\-])*[a-zA-Z0-9]+([\w\.\_\-])*([a-zA-Z0-9])+([\w\.\_\-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
    return regex.test(email);
}

const comparePassword = (password, passwordCheck) => {
    return password === passwordCheck
}

export {
    checkEmailFormat,
    comparePassword
}