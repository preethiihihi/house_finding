const express=require('express');
const bodyParser=require('body-parser')
const mongoose= require('mongoose');
const cors=require('cors');


app=express()

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));

const uri ='mongodb+srv://cp932004:JYPY2eR5lv8KG3UA@cluster0.ubnldgz.mongodb.net/dashboard?retryWrites=true&w=majority'
;

const connectparams={
     useNewUrlParser:true,
     useUnifiedTopology:true,
}

const Users=mongoose.model('Users',{
     username: String,
     password:String,
     chats : Array,
});

const Houses=mongoose.model('Houses',{
  user: String,
  location:String,
  title: String,
  discription: String,
  rate: Number
});

const Chats=mongoose.model('Chats',{
     user1: String,
     user2:String,
     message: String,
})
 
app.use(cors());

mongoose.connect(uri,connectparams).then(()=>{
     console.log("connected sussecful");
}).catch((err)=>{
     console.log("error",err);
});

app.post('/login',async (req, res)=>{
     const usernam = req.body.user;
     const pass = req.body.passw;
     const user = await Users.findOne({ username: usernam });
     if (!user) {
         return res.json({ msg: 'User not found. Please register.' });
     }
     if (user.password !== pass) {
         return res.json({ msg: 'Incorrect password.' });
     }
     res.json({ msg: true });
     
});

app.post('/register',(req,res)=>{
     const usern=req.body.user;
     const pass=req.body.passw;
     Users.findOne({ username: usern })
     .then(existingUser => {
       if (existingUser) {
         return res.json({ msg: "User already exists" });
       } else {
         return Users.create({ username: usern, password: pass });
       }
     })
     .then(() => {
       res.json({ msg: "User created successfully" });
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ msg: "Internal server error" });
     });
})

app.get('/get/home',(req,res)=>{
    Houses.find()
    .then(result=>res.json(result))
    .catch(err=>console.log(err));
})

app.post('/addhome',(req,res)=>{
     const data=req.body;
     Houses.create({
          user: data.user,
          title:data.title,
          discription: data.discription,
          location: data.location,
          rate:data.rate
     })
})

app.get('/chats/with/:userp',(req,res)=>{
     const userp=req.params.userp;
    
     Users.find({username:userp})
     .then((result)=>{ res.json({ chats: result[0].chats });})
     .catch((err)=>{console.log(err)});
})

app.get('/with/:user1/:user2',(req,res)=>{
     const u1=req.params.user1;
     const u2=req.params.user2;
     Chats.aggregate([
          {
            $match: {
              $or: [
                { $and: [{ user1: u1 }, { user2: u2 }] },
                { $and: [{ user1: u2 }, { user2: u1 }] }
              ]
            }
          }
        ]).then((result)=>{res.json({"results":result})})
        .catch((err)=>console.log(err));

})

app.post('/home/mine',(req,res)=>{
     const user=req.body.user;
    
     Houses.find({user:user})
     .then((result)=>{ res.json(result);})
     .catch((err)=>console.log(err));
})
app.post('/deletehome',(req,res)=>{
     const id=req.body.id;
     Houses.findOneAndDelete({_id:id})
     .then(()=>{res.json({"sucess":true})})
     .catch((err)=>{console.log(err)})
})
app.post('/chats/create',(req,res)=>{
     const add= req.body.add;
     const usr=req.body.user2;
     
     if(add==1){
       
          Users.findOneAndUpdate({username:req.body.user1},
               { $addToSet: { chats: usr } },
               {new : true}
               )
    
    .catch(error => {
        console.error("Error updating user:", error);
    }); 
    Users.findOneAndUpdate({username:req.body.user2},
     { $addToSet: { chats: req.body.user1 } },
     {new : true}
     )

.catch(error => {
console.error("Error updating user:", error);
}); 
     }
     Chats.create({user1:req.body.user1, user2:req.body.user2, message:req.body.message})
     .then((result)=>{res.json({status:"ok"})})
     .catch((err)=>console.log(err));
})

app.listen(1290, (err)=>{
     if(err){console.log("error",err)}
     else{console.log("listening on port 1290")}
})