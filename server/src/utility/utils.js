const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { authentication } = require('../../server-properties');

const staticFiles = [".png", ".jpg", ".jpeg", ".css"];
const doorPath = ["door","login", "signin"];

const validateSession = async (req, res, next) => {
  const { secret, tokenName} = authentication;
  let isNotValid = false;
  const { cookies } = req;
  
  const isLoginPage = checkIfLoginPages(req.url);
  
  console.log(req.url, isLoginPage);
  if(!cookies[tokenName]){
    isLoginPage? next(): res.redirect('/door.html');
    return;
  }
  
  console.log('Going to validate Tokens');
  
  if(!isNeedtoCheckToken(req.url)){
    next();
    return;
  }

  const cookieJWT = cookies[tokenName];
  await jwt.verify(cookieJWT, secret, (err, decoded) => {
    if(err){
      if(isLoginPage){
        next();
        return
      }
      res.status(403).send({ error: true, customError: 'Session timed-out. Please login again' })
      return;
    } else {
      console.log('-------------->');
//      console.log('--->',req,'----------->');
      console.log('-------------->',isLoginPage);

      if(isLoginPage){
//        res.redirect(`http://${req.headers.host}/home.html`);
//        res.status(302).send({ sessionExists: true, redirectUrl: 'home.html' })
        res.redirect(`/home.html#`);
        return;
      } else {
        next();
      }
    }
  });
}

const isNeedtoCheckToken = (referer) => {
//  const { referer } = headers;
  for(const path of staticFiles){
    if(referer.indexOf(path) != -1){
      return false;
    }
  }
  return true;
}

const checkIfLoginPages = (referer) => {
//  const { referer } = headers;
  if(referer==="/"){
    return true;
  }
  
  for(const path of doorPath){
    if(referer && referer.indexOf(path) != -1){
      return true;
    }
  }
  return false;
}

module.exports={
    validateSession
}