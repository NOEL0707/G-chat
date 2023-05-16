const router = require("express").Router();
var admin = require("firebase-admin");
//function to add new user
router.post('/addUser', async (req, res) => {
  //connecting to db
    const db = admin.firestore();
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      photoURL: req.body.photoURL,
      uid:req.body.uid
    };
    const usersRef = db.collection('Users');
    var userFound=true;
    //finding if user already esists
    try {
      const snapshot = await usersRef.where('uid', '==', req.body.uid).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        userFound = false;
      }
    } catch (error) {
      console.error('Error getting user documents:', error);
      res.status(500).send({"result":'Internal Server Error'});
      return;
    }
    // if user not found then add him
    if(!userFound){
      try {
        const docRef = await usersRef.add(newUser);
        console.log('New user document added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding new user document:', error);
        res.status(500).send({"result":'Internal Server Error'});
        return;
      }
  
    }
    res.status(200).send({"result":'Added Successfully'});
  })
  //route to get all the existing users
  router.get('/getUsers', async (req, res) => {
    //connecting to database
    const db = admin.firestore();
    const usersRef = db.collection('Users');
    //getting all users
    try {
      var result=[];
      //query to get all users
      const snapshot = await usersRef.get();
      if (snapshot.empty) {
        console.log('No matching documents.');
      }
      else {
        snapshot.forEach(doc => {
          result.push(doc.data())
        });
      }
      // console.log(result);
      res.status(200).send({"result":result});
      return;
    } catch (error) {
      console.error('Error getting user documents:', error);
    }
    res.status(500).send({"result":'error getting users'});
  
  })


module.exports = router;
