class HttpError extends Error {
  constructor(message, status) {
    super();
    this.name = 'HttpError';
    this.message = message;
    this.status = status;
    Error.captureStackTrace(HttpError);
  }
}

class MessageError extends Error {
  constructor(message) {
    super();
    this.name = 'MessageError';
    this.message = message;
    Error.captureStackTrace(MessageError);
  }
}

exports.HttpError = HttpError;
exports.MessageError = MessageError;