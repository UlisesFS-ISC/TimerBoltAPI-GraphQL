var jwt = require('jsonwebtoken');
var superSecret = 'blundell';


 function validateToken(token) {
     // decode token
     console.log(token);
     if (token) {
         // verifies secret and checks exp
         jwt.verify(token, 'blundell', function (err, decoded) {
             if (err) {
                 throw err;
             } else {
                 // set the data to be used
                 return {
                     name: decoded._doc.name,
                     email: decoded._doc.email,
                     body: decoded
                 }
             }
         });
     } else {
         throw new Error("Token was not provided");
     }
 };

function comparePasswords(password, name, user){
    var result = {};
    user.comparePassword(password, name, function (err, isMatch) {
        if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user, 'blundell');
            // return the information including token as JSON
            result = token;
            jwt.verify(token, 'blundell', function (err, decoded) {
                if (err) {
                    throw err;
                } else {
                    // set the data to be used
                    console.log(decoded._doc.name);
                    return {
                        name: decoded._doc.name,
                        email: decoded._doc.email,
                        body: decoded
                    }
                }
            });
        } else {
            throw new Error("Authentication failed. Wrong password.");
        }
    });
    return result;
};

 module.exports = {
     comparePasswords,
     validateToken
 };