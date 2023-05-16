var admin = require("firebase-admin");
//function to get the user with provided uid.
async function getUser(uid){
    const db = admin.firestore();
    const usersRef = db.collection('Users');
    var result=[];
    try {
        const snapshot = await usersRef.where('uid', '==', uid).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
        }
        else{
            snapshot.forEach(doc => {
                result.push(doc.data())
            });
        }
    } catch (error) {
        console.error('Error getting user documents:', error);
    }
    return result[0];
}
module.exports={getUser}