import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";

const pqrsCollectionRef = collection(db, "pqrs");
const storage = getStorage();

const uploadFilePQRS = async(file,routeName)=>{
    const storageRef = ref(storage, 'DocPqrs/' + routeName);
    uploadBytes(storageRef, file);
}

const getPQRSs = async () => {
    try {
        const data = await getDocs(pqrsCollectionRef);
        const pqrs = data.docs.map((doc)=> {
            return (
                { ...doc.data(), id: doc.id }
            )
        })
        return pqrs;
    } catch (error) {
        console.log(error);
    }
};

const getPQRS = async (id) => {
    const pqrsRef = doc(db, "pqrs", id);
    try {
        const pqrsDoc = await getDoc(pqrsRef);
        if (pqrsDoc.exists()) {
            const usuario = (pqrsDoc.data());
            return usuario;
        } else {
            console.log("problemmmas :c");
        }
    } catch (error) {
        console.log(error);
    }
}

const createPQRS = async (origen_pqrs,tipo_pqrs,tipo_doc,documento,nombre,direccion,telefono,cuidad,correo,descripcion, fecha_final, fecha_inicial) => {
    try {
      await addDoc(pqrsCollectionRef, {
        documento: documento,
        nombre: nombre,
        origen_pqrs: origen_pqrs,
        tipo_pqrs: tipo_pqrs,
        direccion: direccion,
        tipo_doc: tipo_doc,
        telefono: telefono,
        cuidad: cuidad,
        correo: correo,
        descripcion: descripcion,
        fecha_final: fecha_final,
        fecha_inicial: fecha_inicial,
        resuelta: false
      });
      //alerta y limpiar campos
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: '¡La PQSR ha sido registrada!'
      }).then((result)=>{
        window.location.reload(false);
      });

    } catch (error) {
      console.log(error);
    }
  };

  const deletePQRS = async(id) => {
    const pqrsDoc = doc(db, "pqrs", id);
    try {
        await deleteDoc(pqrsDoc);
    } catch (error) {
        console.log(error);
    }
}

//esto si??
const updatePQRS = async (id , datos,newdocumento, newnombre, neworigenpqrs, newtipopqrs, newdireccion, newtipo_doc, newtelefono, newcuidad, newcorreo, newdescripcion, newfechainicial, newfechafinal) => {
    const pqrsDoc = doc(db, "pqrs", id);
    try {
        const newInfo = {
            documento: (newdocumento === undefined ? datos.documento : newdocumento),
            nombre: (newnombre === undefined ? datos.nombre : newnombre),
            origen_pqrs: (neworigenpqrs === undefined ? datos.origen_pqrs : neworigenpqrs),
            tipo_pqrs: (newtipopqrs === undefined ? datos.tipo_pqrs : newtipopqrs),
            direccion: (newdireccion === undefined ? datos.tipo_pqrs : newdireccion),
            tipo_doc: (newtipo_doc=== undefined ? datos.tipo_doc : newtipo_doc),
            telefono:(newtelefono===undefined? datos.telefono: newtelefono),
            cuidad:(newcuidad===undefined? datos.cuidad: newcuidad),
            correo: (newcorreo === undefined ? datos.correo : newcorreo),
            descripcion: (newdescripcion===undefined? datos.descripcion: newdescripcion),
            fecha_inicial: (newfechainicial===undefined? datos.fecha_inicial: newfechainicial),
            fecha_final:(newfechafinal===undefined? datos.fecha_final: newfechafinal)
        };
        await updateDoc(pqrsDoc, newInfo);
    } catch (error) {
        console.log(error);
    }
}

const uploadPQRS = async (id)=>{
    const pqrsDoc = doc(db, "pqrs", id);
    try{
        const newInfo={
            resuelta: (true)
        };
        await updateDoc(pqrsDoc, newInfo);
    }catch(error){
        console.log(error);
    }

}

const deleteUploadPQRS = async (id)=>{
    const pqrsDoc = doc(db, "pqrs", id);
    try{
        const newInfo={
            resuelta: (false)
        };
        await updateDoc(pqrsDoc, newInfo);
        const storage = getStorage();
        const desertRef = ref(storage, 'DocPqrs/'+id);

        await deleteObject(desertRef).then(() => {
  // File deleted successfully
            }).catch((error) => {
                console.log(error)
        });

    }catch(error){
        console.log(error);
    }

}


export {getPQRSs, createPQRS, getPQRS, deletePQRS, updatePQRS, uploadPQRS, uploadFilePQRS, deleteUploadPQRS}
