const logger = (req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(
    `[${currentTime}] ${req.method} request to ${req.protocol}://${req.host}${req.url}`
  );
  next();
};

export default logger;
