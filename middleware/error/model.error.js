class ModelsError extends Error {
    constructor(message, detail, statusCode) {
      super(message)
      this.name = this.constructor.name
  
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor)
  
      // Assigning default message if none is given
      this.message = message || 'Bad Gateway'
      this.detail = detail || 'Data retrieval/update error'
  
      // Using 502 as default value if none is specified.
      this.status = statusCode || 502
    }
  }

  module.exports = ModelsError