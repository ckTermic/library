let count = 1;
const requestLogger = (req, res, next) => {
  console.log(
    `[${count}] A request was initiated with Method: ${req.method} at Path: ${req.path} with body ${req.body}`
  );
  console.log("_________");
  count = count + 1;
  next();
};

const serverError = (req, res) => {
  res.status(404).json({ error: "resources not found at this address" });
};

const internalError = (req, res) => {
  res.status(500).json({
    error:
      "Oops... something happend with the server, try refreshing the browser",
  });
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(error);
};

module.exports = { requestLogger, serverError, internalError, errorHandler };
