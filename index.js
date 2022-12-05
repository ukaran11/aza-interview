// registration of user
// firstname, lastname, email and phone

const express = require('express');
const { uuid } = require('uuidv4');
const validator = require('validator');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser());
app.use(express.urlencoded())
const users = [];

app.post('/user', (req, res) => {
    const userNameVlidationReg = /^[a-zA-Z ]{2,30}$/;
    const userPhoneValidReg = /^\d{10}$/;
    let user = req.body;
    console.log('req.body', req.body);
    console.log('user', user);
    const failedValidations = [];
    if(user === {}){
            failedValidations.push({
                "field":"firstname",
                "message":"firstname is mandatory"
            })
   =
            failedValidations.push({
                "field":"lastName",
                "message":"lastName is mandatory"
              })
          

            failedValidations.push({
                "field":"email",
                "message":"email is mandatory"
            })
            failedValidations.push({
                "field":"phone",
                "message":"phone is mandatory"
              })
            res.status(400).json({
            "message": "validation failed",
            "status": 400,
            "data": failedValidations
            })
    }
    if(user) {
        if(!user.firstName){
            failedValidations.push({
                "field":"firstname",
                "message":"firstname is mandatory"
            })
        }
        if(!user.lastName){
            failedValidations.push({
                "field":"lastName",
                "message":"lastName is mandatory"
            })
        }
        if(!user.email){
            failedValidations.push({
                "field":"email",
                "message":"email is mandatory"
            })
        }
        if(!user.phone){
            failedValidations.push({
                "field":"phone",
                "message":"phone is mandatory"
            })
        }

        if(user.email && !validator.isEmail(user.email)){
            failedValidations.push({
                "field":"email",
                "message":"Not a valid email"
              })
        }
        console.log(!userPhoneValidReg.test(user.phone));
        if(user.phone && !userPhoneValidReg.test(user.phone)){
            failedValidations.push({
                "field":"phone",
                "message":"Not a valid mobile number"
              })
        }
        if(!userNameVlidationReg.test(user.firstName) || !userNameVlidationReg.test(user.lastName)) {
            failedValidations.push({
                "field":"firstname",
                "message":"Username is not in correct format"
              })
        }
        if(failedValidations.length) {
            res.status(400).json({
                "message": "validation failed",
                "status": 400,
                "data": failedValidations
            })
        } else{
            user.id = uuid();
            users.push(user);
            console.log(user)
            res.status(201).json({'msg': 'User Created', 'data': user});
        }      
    }
   
});

app.get('/user', (req, res) => {
    console.log(res);
    res.status(200).json({'msg': 'User Created', 'data': users});
})


app.listen(8080, () => {
    console.log('Listening on port 8080')
})
