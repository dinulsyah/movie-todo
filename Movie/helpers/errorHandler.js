module.exports = function(err, req, res, next) {
    console.log('ini adalah errornya' , err);
    console.log(err.code)
    if (err.code == 404) {
      res.status(404).json({
        message: 'Resource not found',
      });
    } 
    else {
      const status = err.status || 500
      const msg = err.message || 'Internal Server Error'
      res.status(status).json({
        message: msg,
      });
    }
  }