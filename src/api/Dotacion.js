import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const dotacionCollectionRef = collection(db, "dotaciones");

const getDotaciones = async () => {
    try {
        const data = await getDocs(dotacionCollectionRef);
        const dotaciones = data.docs.map((doc)=> {
            return (
                { ...doc.data(), id: doc.id }
            )
        })
        return dotaciones;
    } catch (error) {
        console.log(error);
    }
};

const getDotacion = async (id) => {
    const dotacionRef = doc(db, "dotaciones", id);
    try {
        const dotacionDoc = await getDoc(dotacionRef);
        if (dotacionDoc.exists()) {
            const dotacion = (dotacionDoc.data());
            return dotacion;
        } else {
            console.log("problemmmas :c");
        }
    } catch (error) {
        console.log(error);
    }
}

const createDotacion = async (tipoDoc,documento,chaleco, carnet, cantidadChaleco, cantidadCarnet, fechaChaleco, fechaCarnet) => {
    try {
      await addDoc(dotacionCollectionRef, {
        tipo_doc: tipoDoc,
        documento: documento,
        chaleco: chaleco,
        carnet: carnet,
        cantidadChaleco: cantidadChaleco, 
        cantidadCarnet: cantidadCarnet,
        fechaChaleco: fechaChaleco,
        fechaCarnet: fechaCarnet
      });
      //alerta y limpiar campos
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: '¡La dotación ha sido registrada!'
      }).then((result)=>{
        window.location.reload(false);
      });

    } catch (error) {
      console.log(error);
    }
  };

  const deleteDotacion = async(id) => {
    const dotacionDoc = doc(db, "dotaciones", id);
    try {
        await deleteDoc(dotacionDoc);
    } catch (error) {
        console.log(error);
    }
}

// aqui la dotacion pasa como una referencia a lo anterior 
const updateDotacion = async (id , dotacion ,chaleco, carnet, cantidadChaleco, cantidadCarnet, fechaChaleco, fechaCarnet) => {
    const dotacionDoc = doc(db, "dotaciones", id);
    try {
        const newInfo = {
            chaleco: (chaleco === undefined ? dotacion.chaleco : chaleco),
            carnet: (carnet === undefined ? dotacion.carnet : carnet),
            cantidadCarnet: (cantidadCarnet === undefined ? dotacion.cantidadCarnet : cantidadCarnet), 
            cantidadChaleco: (cantidadChaleco === undefined ? dotacion.cantidadChaleco : cantidadChaleco), 
            fechaChaleco: (fechaChaleco === undefined ? dotacion.fechaChaleco : fechaChaleco), 
            fechaCarnet: (fechaCarnet === undefined ? dotacion.fechaCarnet : fechaCarnet)
        };
        await updateDoc(dotacionDoc, newInfo);
        Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa',
            text: '¡La dotación ha sido actualizada!'
          }).then((result)=>{
            window.location.reload(false);
          });
    } catch (error) {
        console.log(error);
    }
    

}



export {getDotaciones, createDotacion, getDotacion, deleteDotacion, updateDotacion}