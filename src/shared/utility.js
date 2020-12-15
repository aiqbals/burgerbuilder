//refactoring -- for optimization

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid; //trim is used to remove anywhite space at the begining
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid; //trim is used to remove anywhite space at the begining
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid; //trim is used to remove anywhite space at the begining
    }
    if (rules.isEmail) {
        //const pattern = "";
        //isValid = pattern.test(value) && isValid; //trim is used to remove anywhite space at the begining
    }
    if (rules.isNumeric) {
        //const pattern = ;
        //isValid = pattern.test(value) && isValid; //trim is used to remove anywhite space at the begining
    }
    return isValid;
}