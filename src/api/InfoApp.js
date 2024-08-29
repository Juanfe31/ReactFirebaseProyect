import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';


const getInfo = async (id) => {
    const infoRef = doc(db, "infoApp", "general");
    try {
        const infoDoc = await getDoc(infoRef);
        if (infoDoc.exists()) {
            const info = (infoDoc.data());
            return info;
        } else {
            console.log("problemmmas :c");
        }
    } catch (error) {
        console.log(error);
    }
}




const updateInfoIndocumentados = async ( info, newCantIndocumentados) => {
    const infoDoc = doc(db, "infoApp", "general");
    try {
        const newInfo = {
            cantIndocumentados: (newCantIndocumentados === undefined ? info.documento : newCantIndocumentados),
        };
        await updateDoc(infoDoc, newInfo);
    } catch (error) {
        console.log(error);
    }
}

const updateInfoReportesDigitales = async ( info, newCantReportes) => {
    const infoDoc = doc(db, "infoApp", "general");
    try {
        const newInfo = {
            cantReportesDigitales: (newCantReportes === undefined ? info.cantReportesDigitales : newCantReportes),
        };
        await updateDoc(infoDoc, newInfo);
    } catch (error) {
        console.log(error);
    }
}




export { getInfo, updateInfoIndocumentados, updateInfoReportesDigitales}
