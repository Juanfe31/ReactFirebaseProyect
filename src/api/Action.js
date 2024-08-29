import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const actionCollectionRef = collection(db, "actions");

const getActions = async () => {
    try {
        const data = await getDocs(actionCollectionRef);
        const actions = data.docs.map((doc)=> {
            return (
                { ...doc.data(), id: doc.id }
            )
        })
        return actions;
    } catch (error) {
        console.log(error);
    }
};

const getAction = async (id) => {
    const actionRef = doc(db, "actions", id);
    try {
        const actionDoc = await getDoc(actionRef);
        if (actionDoc.exists()) {
            const action = (actionDoc.data());
            return action;
        } else {
            console.log("problemmmas :c");
        }
    } catch (error) {
        console.log(error);
    }
}




export {getActions, getAction}
