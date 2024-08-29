import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc,query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes} from "firebase/storage";
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const userCollectionRef = collection(db, "bodegas");
const storage = getStorage();


const getBodegas = async () => {
  try {
      const data = await getDocs(userCollectionRef);
      const bodegas = data.docs.map((doc)=> {
          return (
              { ...doc.data(), id: doc.id }
          )
      })
      return bodegas;
  } catch (error) {
      console.log(error);
  }
};

const getEcaByNombreBodega = async (nombreBodega) => {
  const bodegasRef = collection(db, "bodegas");
  const q = query(bodegasRef, where("nombre_bodega", "==", nombreBodega));
  try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
          const bodegaDoc = querySnapshot.docs[0];
          const bodega = bodegaDoc.data();
          console.log(bodega.nombre_eca)
          return bodega.nombre_eca;
      } else {
          console.log("Bodega not found");
      }
  } catch (error) {
      console.log(error);
  }
}

const createBodega = async (documento,nombre_representante, nombre_bodega,municipio,direccion,nombre_eca,activa) => {

    try {
      await addDoc(userCollectionRef, {
        documento: documento,
        nombre_representante: nombre_representante,
        nombre_bodega:nombre_bodega,
        municipio: municipio,
        direccion: direccion,
        nombre_eca: nombre_eca,
        activa:activa,
      });
      //alerta y limpiar campos
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: '¡La Bodega ha sido registrada en el sistema!'
      }).then((result)=>{
        window.location.reload(false);
      });

    } catch (error) {
      console.log(error);
    }
  };

  const deleteBodega = async(id) => {
    const bodegaDoc = doc(db, "bodegas", id);
    try {
        await deleteDoc(bodegaDoc);
    } catch (error) {
        console.log(error);
    }
}

const updateBodega = async (id , bodega,newdocumento, newnombre_representante, newnombre_bodega, newmunicipio, newdireccion) => {
    const bodegaDoc = doc(db, "bodegas", id);
    try {
        const newInfo = {
            documento: (newdocumento === undefined ? bodega.documento : newdocumento),
            nombre_representante: (newnombre_representante === undefined ? bodega.nombre_representante : newnombre_representante),
            nombre_bodega: (newnombre_bodega === undefined ? bodega.nombre_bodega : newnombre_bodega),
            municipio: (newmunicipio === undefined ? bodega.municipio : newmunicipio),
            direccion: (newdireccion === undefined ? bodega.direccion : newdireccion)
        };
        await updateDoc(bodegaDoc, newInfo);
    } catch (error) {
        console.log(error);
    }
}

const uploadFileBodega = async(file,routeName)=>{
    
    //https://firebase.google.com/docs/storage/web/upload-files?authuser=0&hl=es-419
    const storageRef = ref(storage, 'docBodegas/' + routeName);
    uploadBytes(storageRef, file);    
}

export{createBodega,updateBodega,deleteBodega,uploadFileBodega,getBodegas,getEcaByNombreBodega}