

// Add firebaseConfig object here
const firebaseConfig = {
    
};
firebase.initializeApp(firebaseConfig);



const DBRef = firebase.database().ref();
async function Insert(tableName, json) {
    const ListName = DBRef.child(tableName);
    ListName.push(json);
}

async function getAllItem(tableName) {
    const ListName = await DBRef.child(tableName);
    var snapshot = await ListName.once('value');
    const value = snapshot.val();
    var array = [];
    for (var key in value) {
        if (value.hasOwnProperty(key)) {
            array.push({ key: key, value: value[key] })
        }
    }
    return array;
}

function UpdateItem(tableName, id, json) {
    firebase.database().ref(tableName + '/' + id).set(json);
}

function DeleteItem(tableName, id) {
    const item = DBRef.child(tableName + "/" + id);
    item.remove();
}

async function getItemById(tableName, id) {
    const ListName = await DBRef.child(tableName + "/" + id);
    var snapshot = await ListName.once('value');
    const value = snapshot.val();
    return value;
}


function UploadFile(name, file) {
    var storageRef = firebase.storage().ref('file/' + name);
    var task = storageRef.put(file);
    
    return task;
    
}