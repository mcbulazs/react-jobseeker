const props = {
    salaryFrom: 1000,
    salaryTo: null,
    xd: "csa"
}
const s = Object.keys(props).map((key) => {
    if (!props[key]) {
        return ''
    }     
    return `${key}=${props[key]}`
})
console.log(s.filter((s)=>s!="").join('&'))