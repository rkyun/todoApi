const bcrypt = require('bcryptjs');



var password = "123456";

// bcrypt.genSalt(10, (err, salt)=>{
//     bcrypt.hash(password, salt, (err, hash)=>{
//         console.log(hash);
//     })
// });

var hashed='$2a$10$5LR8YcBI2Smg9CCOpgOwjuWzjNAwVFPQ3W5FDdF4uzUdIEEF5o.V2';
bcrypt.compare(password, hashed, (err, res)=>{
    console.log(res);
});

