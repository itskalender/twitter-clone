class AppError extends Error {
  constructor(status, message) {
    super(message);

    this.isOperational  = true;
    this.status         = status;
    this.code           = String(status).startsWith('4') ? 1 : 2;
  }
}

module.exports = AppError;