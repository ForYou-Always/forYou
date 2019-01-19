const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { authentication } = require('../../server-properties');

const loginRedirect = "/door.html#/login";
const homeRedirect = "/home.html#/home";

const doorPath = ["door"];
const staticCodeFiles = [".html",".css",".js"];
const staticImageFiles = [".jpg",".jpeg",".png"];
const doorRoutes = ['signin', 'singup', 'forgot', 'reset', 'authenticate'];

async function validateSession(req, res, next) {
  const { cookies } = req;
  const { tokenName} = authentication;

  const iscookiesExists = !!cookies[tokenName];

  if(iscookiesExists){
//    console.log('session',req.url);
    await validateToken(req, res, next);
  } else {
    await redirectDoor(req, res, next);
  }
}

validateToken = async (req, res, next) => {
  const { cookies, url } = req;
  const { secret, tokenName} = authentication;
  const cookieJWT = cookies[tokenName];

  jwt.verify(cookieJWT, secret, (err, decoded) => {
    if(err){
      res.clearCookie(tokenName).redirect(loginRedirect);
    } else {

      if(url===`/`){
        res.redirect(homeRedirect);
        return;
      }
      
      const isDoorPath = analyzeUrlPath(doorPath, url);
      if(isDoorPath){
        res.redirect(homeRedirect);
        return;
      }
      
      if(isDoorPath){
        res.redirect(homeRedirect);
        return;
      }
      
      const isDoorRoutes = analyzeUrlPath(["signin","forgot","reset"], url);
      if(isDoorRoutes){
        next({ customError: 'Already Signed in'})
        return;
      }
//      console.log('--------------success-',req.url);
      next();
    }
  });
}

redirectDoor = async (req, res, next) => {
  const { url } = req;
  const isDoorPath = analyzeUrlPath(doorPath, url);
  const isDoorRoutes = analyzeUrlPath(doorRoutes, url);
  const isImages = analyzeUrlPath(staticImageFiles, url);
  const isCodefiles = analyzeUrlPath(staticCodeFiles, url);

  if(isImages){
    next();
    return;
  }

  if(isCodefiles){
    if(isDoorPath){
      next();
      return;
    }
    res.redirect(loginRedirect);
  }

  if(isDoorRoutes){
    next();
    return;
  }
  res.redirect(loginRedirect);
}

analyzeUrlPath = (fileTypes, url) => {
  for(const path of fileTypes){
    if(url.indexOf(path) != -1){
      return true;
    }
  }
  return false;
}

module.exports={
    validateSession
}