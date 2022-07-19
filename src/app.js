const express =require("express");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
const hbs=require("hbs"); 
const Register=require("./models/register");

require("./db/conn");
const port=process.env.PORT || 8000;
const static_path=path.join(__dirname, "../public");
const templetes_path=path.join(__dirname, "../templates/views");
const partials_path=path.join(__dirname, "../templates/partials");


    app.use(express.static(static_path)); // through this line our app will use static folder
    app.set("view engine" , "hbs"); // setting app on view engine
    app.set("views" , templetes_path); // telling the app to use folder as views
    hbs.registerPartials(partials_path); //to set app on partials
    app.use(express.json()); // to use data comming from post man inthe form json
    app.use(express.urlencoded({extended:false})) // to use document elements data

    app.get("/" ,(req ,res ) => {
        res.render("index")
    });

// get request on register page
    app.get("/register" ,(req ,res ) => {
        res.render("register")
    });
// post request om register page
    app.post("/register" , async (req ,res ) => {
        try{
            const password=req.body.password;
            const confirmPassword=req.body.confirmPassword;

            if(password===confirmPassword){
                
            const registerEmp= new Register({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                gender:req.body.gender,
                phoneNumber:req.body.phoneNumber,
                password:req.body.password,
                confirmPassword:req.body.confirmPassword,
                answer:req.body.empAnswer
            });

            const result= await registerEmp.save();
            console.log(result);
            res.status(201).render("index");
            }else{
                res.send("confirm password is not matching");
            }

        }catch(e){
            res.status(400).send(e)
        }
    });
// vedio 11
    // get request on login
    app.get("/login" ,(req ,res ) => {
        res.render("login")
    });
// post request on login
        app.post("/login" ,async (req ,res ) => {
         try{
          const email= req.body.email;
          const password= req.body.password;
        //   console.log(`email:${email} ....  password:${password}`)
        const useremail=await Register.findOne({email:email});

        if(useremail.password===password){
          res.status(201).render("profile")
        }else{
            res.send("email or password are not matchig")
        }
         }catch(e){
        res.status(400).send("invalid email")
         }
        });


        // listening server
    app.listen(port ,()=>{
     console.log(`sevrer is running at port no ${port}`)
    });