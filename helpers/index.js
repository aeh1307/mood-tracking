import jwtDecode from 'jwt-decode';
let cookieparser = require('cookieparser');

export function getUserFromCookie(req){
  if(process.server && process.static) return;
  if(req.headers.cookie){
    const parsed = cookieparser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.__session;
    if(!accessTokenCookie) return;

    const decodedToken = jwtDecode(accessTokenCookie);
    if(!decodedToken) return;

    return decodedToken;
  }
}
