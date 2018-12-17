const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { authentication } = require('../../server-properties');

const allowedPathsDoor = ["door", ".png", ".jpg", ".jpeg", ".css"];

const validateSession = async (req, res, next) => {
  const { secret, tokenName} = authentication;
  let isNotValid = false;
  const { cookies } = req;

  if(!cookies || !isNeedtoCheckToken(req.headers)){
    next();
    return;
  }
  
  console.log('Going to validate Tokens');

  const cookieJWT = cookies[tokenName];
  await jwt.verify(cookieJWT, 'secret', (err, decoded) => {
    if(err){
      //Response must be sent with info to redirect to login page.
//    res.redirect('home.html');
      
      res.status(403).send({ error: true, customError: 'Session timed-out. Please login again' })
      
//      next({ customError: 'Session timed-out. Please login again'});
      return;
    } else {
      next();
    }
    
  });
}

const isNeedtoCheckToken = (headers) => {
  const { referer } = headers;

  for(const path of allowedPathsDoor){
    if(referer.indexOf(path) != -1){
      return false;
    }
  }
  
  
  return true;
}

module.exports={
    validateSession
}