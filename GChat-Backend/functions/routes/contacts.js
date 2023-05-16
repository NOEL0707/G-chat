const { getUser } = require("../utils/getUser");
const router = require("express").Router();
var admin = require("firebase-admin");
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
//route to add a particular contact
router.post('/addContact', async (req, res) => {
  //database connection with contacts collection
    const db = admin.firestore();
    const contactsRef = db.collection('Contacts');
    var contactFound=true;
  
    const newContact = {
      uid: req.body.uid,
      contactuid:req.body.contactuid,
      closedAt:admin.firestore.FieldValue.serverTimestamp()
    };
    //finding if contact already exists
    try {
      const snapshot = await contactsRef.where('uid', '==', req.body.uid ).where('contactuid', '==', req.body.contactuid).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        contactFound = false;
      }
    } catch (error) {
      console.error('Error getting user documents:', error);
    }
    //add contact if not already added
    if(!contactFound){
      try {
        const docRef = await contactsRef.add(newContact);
        console.log('New user document added with ID:', docRef.id);
      } catch (error) {
        console.error('Error adding new user document:', error);
      }
    }
    res.status(200).send({"result":'Contact Added Successfully'});
  })
  //router to get all contacts of a uid
  router.get('/getContacts/:uid', async (req, res) => {
    const db = admin.firestore();
    const contactsRef = db.collection('Contacts');
    const messagesRef = db.collection('Messages');

    const uid=req.params.uid;
    try {
      var result=[];
      var snapshot = await contactsRef.where('uid', '==',uid ).get();
      if (snapshot.empty) console.log('No  Contacts.');
      else {
        for (const doc of snapshot.docs) {
            // console.log(doc.data())
            const res= await getUser(doc.data().contactuid)
            result.push(res);  
        }
      }
      // console.log(result);
      try {
        var newResult=[];
        for (const contact of result) {
          snapshot = await messagesRef.orderBy('sentAt',"desc").where('from', 'in', [uid,contact.uid]).where('to', 'in', [uid,contact.uid]).get()
          if (snapshot.empty) {
            console.log('No messages.');
          }
          else {
            var sorted=snapshot.docs.sort((a, b) => new Date(a.data().sentAt._seconds * 1000 + a.data().sentAt._nanoseconds / 1000000)-
            new Date(b.data().sentAt_seconds * 1000 + b.data().sentAt._nanoseconds / 1000000))
            for (const element of sorted) {
              if(uid==contact.uid){
                if(element.data().from==element.data().to){
                  var obj={...contact,msg:element.data().msg,sentAt:element.data().sentAt};
                  newResult.push(obj);
                  break;
                }
              }
              else{
                if(element.data().from!=element.data().to){
                  var obj={...contact,msg:element.data().msg,sentAt:element.data().sentAt};
                  newResult.push(obj);
                  break;
                }
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
      res.status(200).send({"result":newResult});
      return;
    } catch (error) {
      console.error('Error getting user documents:', error);
    }
    res.status(500).send({"result":'Error getting contacts'});
  })
  //route to get all messages of two contacts.
  router.get('/getMessages/:from/:to',async(req,res)=>{
    const fromuid=req.params.from;
    const touid=req.params.to;
    console.log('getting messages :',fromuid,touid);

    const db = admin.firestore();
    const messagesRef = db.collection('Messages');  
    try {
        var result=[];
        var snapshot;
        snapshot = await messagesRef.where('from', 'in', [fromuid, touid]).where('to', 'in', [fromuid, touid]).get()
        
        if (snapshot.empty) {
        console.log('No messages.');
        }
        else {
            for (const doc of snapshot.docs) {
                // console.log(doc.data())
                if(fromuid==touid ){
                    if(doc.data().from==doc.data().to){
                        result.push(doc.data());  
                    }
                }
                else if(fromuid!=touid){
                    if(doc.data().from!=doc.data().to){
                        result.push(doc.data());  
                    }
                }
            }
        }
    // console.log(result);
        res.status(200).send({"result":result});
    } catch (error) {
        console.error('Error messages', error);
    }
  
  })

module.exports = router;
