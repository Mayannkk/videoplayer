/**
 * @file asyncHandler.js
 * @description A utility function to handle asynchronous route handlers in Express.
 * It simplifies error handling by wrapping async functions.
 * It catches errors and sends a standardized response.
 * futhermore, you can read about it here: https://chatgpt.com/c/686b9525-6d84-8009-bbc8-ffe893c594a5
 */

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
export { asyncHandler };

/**
 * @description An alternative implementation of asyncHandler that uses async/await syntax.
 * This version is more explicit and easier to read, especially for those familiar with async/await.
const asyncHandler = (fn = async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
});
*/
