const firebaseConfig = {
    apiKey: "AIzaSyC1ppTDQDLL6EIjNbc5sDC6a_zV9yi1fus",
    authDomain: "js-training-15f55.firebaseapp.com",
    projectId: "js-training-15f55",
    storageBucket: "js-training-15f55.appspot.com",
    messagingSenderId: "622726513938",
    appId: "1:622726513938:web:714c56617a52aac7841fcb",
    measurementId: "G-8V45QS3X5Z"
  };
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function Insert(collectionName, json) {
    try {
        await db.collection(collectionName).doc().set(json);
        return true;
    } catch (exception) {
        return false;
    }
}

async function Update(collectionName, documentId, json) {
    try {
        await db.collection(collectionName).doc(documentId).update(json);
        return true;
    }
    catch (exception) {
        return false;
    }
}

async function DeleteById(collectionName, documentId) {
    try {
        await db.collection(collectionName).doc(documentId).delete();
        return true;
    }
    catch (exception) {
        return false;
    }
}

async function DeleteByCondition(collectionName, condition) {
    try {
        var delete_items_list = await db.collection(collectionName).where(condition[0], condition[1], condition[2]);
        var querySnapshot = await delete_items_list.get();
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
        return true;
    }
    catch (exception) {
        return false
    }
}

async function getItemByID(collectionName, documentId) {
    try {
        var item = await firebase.firestore().collection(collectionName).doc(documentId).get();
        item = item.data();
        return item;
    }
    catch (exception) {
        return null;
    }
}

async function getItemByFilter(collectionName,condition){
    try{
        var items = await db.collection(collectionName).where(condition[0], condition[1], condition[2]).get();
        var array = [];
        items.docs.map((doc)=>{
            array.push(doc.data());
        });
        return array;
    }
    catch(exception){
        return null;
    }
}

async function getAllItems(collectionName){
    try{
        var items = await db.collection(collectionName).get();
        var array = [];
        items.docs.map((doc)=>{
            array.push(doc.data());
        });
        return array;
    }
    catch(exception){
        return null;
    }
}

function UploadFile(name, file) {
    var storageRef = firebase.storage().ref('file/' + name);
    var task = storageRef.put(file);
    
    return task;
    
}