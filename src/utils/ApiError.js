class ApiError extends Error {
  constructor(
    message = 'An error occurred while processing your request.',
    statusCode,
    errors = [],
    stack = ''
  ) {
    super(this.message);
    this.statusCode = statusCode || 500;
    this.errors = errors;
    this.message = message;
    this.success = false;
    this.stack = stack;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constuctor);
    }
  }
}

export { ApiError };
