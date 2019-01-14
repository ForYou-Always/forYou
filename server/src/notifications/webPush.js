const webPush = require('web-push');

/*const vapidKeys = webPush.generateVAPIDKeys();
const { publicKey, privateKey } = vapidKeys;*/

const publicKey = "BLl0WCuUk_v1onw7estGTyN2Fpg7KIquZVOPRcSXvRiFMoawvQBCEeCSqFChU1Yetq5jv0-W_XeSbL6zPBJ9v4A";
const privateKey = "C273JJ-Tgf7wZJB6UUieZPw86cDrJB11tXVxV-tCrkA";

webPush.setVapidDetails('mailto:uvvm.vairavan6@gmail.com', publicKey, privateKey);

console.log('publicKey',publicKey);
console.log('privateKey',privateKey);

module.exports= webPush;