const express = require('express')
const dbHandler = require('./dbHandler')
require('dotenv').config()
const server = express()

server.use(express.json())
server.use(express.static('public'))

const PORT = process.env.PORT

dbHandler.table.sync({alter:true})



server.post('/register', async (req, res) => {
    const oneuser = await dbHandler.table.findOne({
        where: {
            username: req.body.registerUsername
        }
    })
    if(oneuser){
        res.status(403).json({'message':'Már létezik ilyen felhasználó'})
    }
    else{
        await dbHandler.table.create({
            username:req.body.registerUsername,
            jelszo:req.body.registerPassword    
        })
        res.status(200).json({'message':'Sikeres regisztráció'})
    }
    res.end()
})




server.post('/login', async(req,res)=>{
    const oneuser = await dbHandler.table.findOne({ 
        where:{
            username:req.body.loginUsername,
            jelszo:req.body.loginPassword
        }
    })
    if(oneuser){
        const tkn = JWT.sign({'username':oneuser.username},process.env.TOKEN,{expiresIn:'1h'})
        res.status(200).json({'token':tkn, 'message':'Sikeres login'}) 
    }
    else{
        res.status(401).json({'message':'sikertelen login'}) 
    }
})




server.get('/profil', Auth(), async (req, res) => {
    const user = await dbHandler.table.findOne({
        where: { username: req.username }
    });

    if (user) {
        res.json({ 
            'username': user.username
        });
    } else {
        res.status(404).json({ 'message': 'Felhasználó nem található' });
    }
    res.end();
});


server.listen(PORT, ()=>{console.log('Running on ' + PORT)})