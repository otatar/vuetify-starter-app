export default function(value) {
    const isLength8 = value.length > 7;
    const containsUppercase = /[A-Z]/.test(value)
    const containsLowercase = /[a-z]/.test(value)
    const containsNumber = /[0-9]/.test(value)
    const containsSpecial = /[#?!@$%^&*-.,]/.test(value)
    return isLength8 && containsUppercase && containsLowercase && containsNumber && containsSpecial

}