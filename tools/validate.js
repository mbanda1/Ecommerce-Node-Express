
let ops = {

  validatePhone: function (phone) {
    var re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    return re.test(String(phone).toLowerCase())
  }

}

module.exports = ops
