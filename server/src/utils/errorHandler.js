module.exports = (res, error, status) => {
  console.log(status);
  res.status(status || 500).json({
    error: true,
    message: (error.message || error)
  })
}
