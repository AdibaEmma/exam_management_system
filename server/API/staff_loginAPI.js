require("../../index");
const db = require("../db_connection/mongodb");
const staff =  ("../Schemas/staff_signup");


let staff_login = (req,res,next) => {
    staff.find({staff_name: req.body.staff_name})
    .exec()
    .then(results => {
        if(results.length < 1){
            res.json({
                message: "invalid username or password"
            })
        }
        else{
            bcrypt.compare(req.body.password, results[0].password, (err,valid)=>{
                console.log(results.password);
                if(err){
                    res.json({
                        message: "an error occured"
                    })
                }
                else if(valid === true){
                    let token =jwt.sign({
                        staff_name: results.staff_name,
                        userId: results._id
                    },
                    "dbkdbkqrjgrvgcwtkrnhrigukbqk",
                    {
                        expiresIn: "24h"
                    });
                    res.json({
                        message:  "Authentication succesfull",
                        token: token
                    })
                }
                else{
                    res.json({
                        message: "Authentication failed"
                    })
                }
            })
        }
    })
    .catch(err =>{
        res.json({error: "an error occured"})
    })
}

module.exports = {
    staff_login: staff_login
}