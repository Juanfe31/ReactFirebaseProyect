import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";

const bancarizadosCollectionRef = collection(db, "bancarizados");
const storage = getStorage();

const getBancarizados = async () => {
  try {
    const data = await getDocs(bancarizadosCollectionRef);
    const bancarizados = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return bancarizados;
  } catch (error) {
    console.log(error);
  }
};

const getBancarizado = async (id) => {
  const bancarizadoRef = doc(db, "bancarizados", id);
  try {
    const bancarizadoDoc = await getDoc(bancarizadoRef);
    if (bancarizadoDoc.exists()) {
      const bancarizado = bancarizadoDoc.data();
      return bancarizado;
    } else {
      console.log("problemmmas :c");
    }
  } catch (error) {
    console.log(error);
  }
};

const createBancarizado = async (tipo_doc, documento, nro_cuenta) => {
  try {
    await addDoc(bancarizadosCollectionRef, {
      documento: documento,
      tipo_doc: tipo_doc,
      nro_cuenta: nro_cuenta,
    });
    //alerta y limpiar campos
    Swal.fire({
      icon: "success",
      title: "Ingreso exitoso",
      text: "¡El usuario ha sido registrado!",
    }).then((result) => {
      window.location.reload(false);
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteBanzarizado = async (id) => {
  const bancarizadoDoc = doc(db, "bancarizados", id);
  try {
    await deleteDoc(bancarizadoDoc);
  } catch (error) {
    console.log(error);
  }
};

const updateBancarizado = async (
  id,
  bancarizado,
  newtipo_doc,
  newdocumento,
  newnro_cuenta,
  newcertificado
) => {
  const bancarizadoDoc = doc(db, "bancarizados", id);
  try {
    const newInfo = {
      documento:
        newdocumento === undefined ? bancarizado.documento : newdocumento,
      tipo_doc: newtipo_doc === undefined ? bancarizado.tipo_doc : newtipo_doc,
      nro_cuenta:
        newnro_cuenta === undefined ? bancarizado.nro_cuenta : newnro_cuenta,
    };
    await updateDoc(bancarizadoDoc, newInfo);
  } catch (error) {
    console.log(error);
  }
};

const uploadFileBancarizado = async (file, routeName) => {
  const storageRef = ref(storage, "docRecuperadores/" + routeName);
  uploadBytes(storageRef, file);
  Swal.fire({
    icon: "success",
    title: "Ingreso exitoso",
    text: "¡El recuperador ha sido registrado!",
  }).then((result)=>{
    window.location.reload(false);
  });
};

export {
  getBancarizados,
  createBancarizado,
  getBancarizado,
  deleteBanzarizado,
  updateBancarizado,
  uploadFileBancarizado,
};
