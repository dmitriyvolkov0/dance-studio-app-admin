export function emailValidate(email){
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(email) === false) {
        return true
    }else{
        return false;
    }
}

export function phoneValidate(phone){
    var reg = /\d{4}\d{3}\d{2}\d{2}/;
    if(reg.test(phone) === false) {
        return false;
    }else{
        return true
    }
}