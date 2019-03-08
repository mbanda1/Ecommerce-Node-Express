const crypto = require('crypto')
const SaltLength = 11

class MainEnypter {
  constructor () {
    this.createHash = this.createHash.bind(this)
    this.validateHash = this.validateHash.bind(this)
    this.generateSalt = this.generateSalt.bind(this)
    this.sha512 = this.sha512.bind(this)
    this.validate = this.validate.bind(this)
  }

  createHash (password) {
    let salt = this.generateSalt(SaltLength)
    let hash = this.sha512(password, salt)
    return hash
  }

  validateHash (hash, password) {
    let salt = hash.salt
    let validHash = this.sha512(password, salt)
    return hash.passwordHash === validHash.passwordHash
  }

  generateSalt (length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
    /** return required number of characters */
  }

  sha512 (password, salt) {
    let hash = crypto.createHmac('sha512', salt)
    hash.update(password)
    let value = hash.digest('hex')
    return {
      salt: salt,
      passwordHash: value
    }
  }

  validate (storedPass, supliedPass) {
    if (storedPass.passwordHash) {
      return this.validateHash(storedPass, supliedPass)
    } else return crypto.createHash('sha256').update(supliedPass).digest().toString('hex') === storedPass
  }
}

module.exports = new MainEnypter()
