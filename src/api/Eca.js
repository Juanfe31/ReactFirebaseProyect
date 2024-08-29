import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc,query, where} from 'firebase/firestore';
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const userCollectionRef = collection(db, "ecas");
const storage = getStorage();

const getEcas = async () => {
    try {
        const data = await getDocs(userCollectionRef);
        const ecas = data.docs.map((doc)=> {
            return (
                { ...doc.data(), id: doc.id }
            )
        })
        return ecas;
    } catch (error) {
        console.log(error);
    }
};

const getNombresEcas = async () => {
    try {
        const data = await getDocs(userCollectionRef);
        const nombreEcas = data.docs.map((doc)=> {
            return (
                {...[doc.data().nombre_eca]}
            )
        })
        //console.log(nombreEcas)
        return nombreEcas;
    } catch (error) {
        console.log(error);
    }
};

const getEca = async (id) => {
    const ecaRef = doc(db, "ecas", id);
    try {
        const ecaDoc = await getDoc(ecaRef);
        if (ecaDoc.exists()) {
            const eca = (ecaDoc.data());
            return eca;
        } else {
            console.log("problemmmas :c");
        }
    } catch (error) {
        console.log(error);
    }
}

const getNUECAbyNombreEca = async (nombre_eca) => {
    const ecasRef = collection(db, "ecas");
    const q = query(ecasRef, where("nombre_eca", "==", nombre_eca));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const ecaDoc = querySnapshot.docs[0];
            const eca = ecaDoc.data();
            return eca.nueca;
        } else {
            console.log("eca not found");
        }
    } catch (error) {
        console.log(error);
    }
}

const createEca = async (documento,nombre_representante, nombre_eca,municipio,direccion,nueca,macrorutas,activa) => {
    try {
      await addDoc(userCollectionRef, {
        documento: documento,
        nombre_representante: nombre_representante,
        nombre_eca: nombre_eca,
        municipio: municipio,
        direccion: direccion,
        nueca:nueca,
        macrorutas:macrorutas,
        activa:activa,
      });
      //alerta y limpiar campos
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: '¡La ECA ha sido registrada en el sistema!'
      }).then((result)=>{
        window.location.reload(false);
      });

    } catch (error) {
      console.log(error);
    }
  };

  const deleteEca = async(id) => {
    const ecaDoc = doc(db, "ecas", id);
    try {
        await deleteDoc(ecaDoc);
    } catch (error) {
        console.log(error);
    }
}

const updateEca = async (id , eca,newdocumento, newnombre_representante, newnombre_eca, newmunicipio, newdireccion) => {
    const ecaDoc = doc(db, "ecas", id);
    try {
        const newInfo = {
            documento: (newdocumento === undefined ? eca.documento : newdocumento),
            nombre_representante: (newnombre_representante === undefined ? eca.nombre_representante : newnombre_representante),
            nombre_eca: (newnombre_eca === undefined ? eca.nombre_eca : newnombre_eca),
            municipio: (newmunicipio === undefined ? eca.municipio : newmunicipio),
            direccion: (newdireccion === undefined ? eca.direccion : newdireccion)
        };
        await updateDoc(ecaDoc, newInfo);
    } catch (error) {
        console.log(error);
    }
}

const uploadFileECA = async(file,routeName)=>{
    
    //https://firebase.google.com/docs/storage/web/upload-files?authuser=0&hl=es-419
    const storageRef = ref(storage, 'docEcas/' + routeName);
    uploadBytes(storageRef, file);    
}




export {getEcas, createEca, getEca, deleteEca, updateEca,uploadFileECA,getNombresEcas,getNUECAbyNombreEca}
