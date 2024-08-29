import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const reporteCollectionRef = collection(db, "reportes");
const storage = getStorage();

const getReportes = async () => {
  try {
    const data = await getDocs(reporteCollectionRef);
    const reportes = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return reportes;
  } catch (error) {
    console.log(error);
  }
};

const getReportesBodegaFecha = async (nBodega,periodo) => {
  try {
    const data = await getDocs(reporteCollectionRef);

    const reportes = data.docs.filter((doc) =>(doc.data().bodega===nBodega && doc.data().fecha.substring(0,7)===periodo && !doc.data().usado_prefactura)).map((doc) => {
    
      return { ...doc.data(), id: doc.id };
    });
    return reportes;
  } catch (error) {
    console.log(error);
  }
};

const getReportesPeriodo = async (periodo) => {
  try {
    const data = await getDocs(reporteCollectionRef);

    const reportes = data.docs.filter((doc) =>(doc.data().fecha.substring(0,7)===periodo)).map((doc) => {
    
      return { ...doc.data(), id: doc.id };
    });
    return reportes;
  } catch (error) {
    console.log(error);
  }
};

const getReporte = async (id) => {
  const reporteRef = doc(db, "reportes", id);
  try {
    const reporteDoc = await getDoc(reporteRef);
    if (reporteDoc.exists()) {
      const reporte = reporteDoc.data();
      return reporte;
    } else {
      console.log("problemmmas :c");
    }
  } catch (error) {
    console.log(error);
  }
};

const createReporte = async (
  recuperador,
  nroReporte,
  bodega,
  fecha,
  nombre,
  cedula,
  codigoId,
  aluminio_cant,
  aluminio_valorUnitario,
  chatarra_cant,
  chatarra_valorUnitario,
  cobre_cant,
  cobre_valorUnitario,
  bronce_cant,
  bronce_valorUnitario,
  antimonio_cant,
  antimonio_valorUnitario,
  acero_cant,
  acero_valorUnitario,
  otrosMetales_cant,
  otrosMetales_valorUnitario,
  archivo_cant,
  archivo_valorUnitario,
  carton_cant,
  carton_valorUnitario,
  chuevos_cant,
  chuevos_valorUnitario,
  periodico_cant,
  periodico_valorUnitario,
  plegadiza_cant,
  plegadiza_valorUnitario,
  tetrapack_cant,
  tetrapack_valorUnitario,
  plastificado_cant,
  plastificado_valorUnitario,
  kraf_cant,
  kraf_valorUnitario,
  otrosPapeles_cant,
  otrosPapeles_valorUnitario,
  acrilico_cant,
  acrilico_valorUnitario,
  pasta_cant,
  pasta_valorUnitario,
  pet_cant,
  pet_valorUnitario,
  pvc_cant,
  pvc_valorUnitario,
  plasticoBlanco_cant,
  plasticoBlanco_valorUnitario,
  polietileno_cant,
  polietileno_valorUnitario,
  soplado_cant,
  soplado_valorUnitario,
  polipropileno_cant,
  polipropileno_valorUnitario,
  otrosPlasticos_cant,
  otrosPlasticos_valorUnitario,
  otrosVidrios_cant,
  otrosVidrios_valorUnitario,
  otrosTextiles_cant,
  otrosTextiles_valorUnitario,
  otrosMaderables_cant,
  otrosMaderables_valorUnitario,
  otros_cant,
  otros_valorUnitario,
  placaVehiculo,
  eca,
) => {
  try {
    await addDoc(reporteCollectionRef, {
      nro_reporte: nroReporte,
      recuperador: doc(db, "recuperadores", recuperador),
      // bodega: doc(db, "eca", bodega),
      bodega: bodega,
      fecha: fecha,
      nombre: nombre,
      documento: cedula,
      codigoId: codigoId,
      aluminio_cant: aluminio_cant,
      aluminio_valorUnitario: aluminio_valorUnitario,
      chatarra_cant: chatarra_cant,
      chatarra_valorUnitario: chatarra_valorUnitario,
      cobre_cant: cobre_cant,
      cobre_valorUnitario: cobre_valorUnitario,
      bronce_cant: bronce_cant,
      bronce_valorUnitario: bronce_valorUnitario,
      antimonio_cant:antimonio_cant,
      antimonio_valorUnitario:antimonio_valorUnitario,
      acero_cant: acero_cant,
      acero_valorUnitario: acero_valorUnitario,
      otrosMetales_cant: otrosMetales_cant,
      otrosMetales_valorUnitario: otrosMetales_valorUnitario,
      archivo_cant: archivo_cant,
      archivo_valorUnitario: archivo_valorUnitario,
      carton_cant: carton_cant,
      carton_valorUnitario: carton_valorUnitario,
      chuevos_cant: chuevos_cant,
      chuevos_valorUnitario: chuevos_valorUnitario,
      periodico_cant: periodico_cant,
      periodico_valorUnitario: periodico_valorUnitario,
      plegadiza_cant: plegadiza_cant,
      plegadiza_valorUnitario: plegadiza_valorUnitario,
      tetrapack_cant: tetrapack_cant,
      tetrapack_valorUnitario: tetrapack_valorUnitario,
      plastificado_cant:plastificado_cant,
      plastificado_valorUnitario:plastificado_valorUnitario,
      kraf_cant:kraf_cant,
      kraf_valorUnitario:kraf_valorUnitario,
      otrosPapeles_cant: otrosPapeles_cant,
      otrosPapeles_valorUnitario: otrosPapeles_valorUnitario,
      acrilico_cant:acrilico_cant,
      acrilico_valorUnitario:acrilico_valorUnitario,
      pasta_cant: pasta_cant,
      pasta_valorUnitario: pasta_valorUnitario,
      pet_cant: pet_cant,
      pet_valorUnitario: pet_valorUnitario,
      pvc_cant: pvc_cant,
      pvc_valorUnitario: pvc_valorUnitario,
      plasticoBlanco_cant:plasticoBlanco_cant,
      plasticoBlanco_valorUnitario:plasticoBlanco_valorUnitario,
      polietileno_cant:polietileno_cant,
      polietileno_valorUnitario:polietileno_valorUnitario,
      soplado_cant:soplado_cant,
      soplado_valorUnitario:soplado_valorUnitario,
      polipropileno_cant:polipropileno_cant,
      polipropileno_valorUnitario:polipropileno_valorUnitario,
      otrosPlasticos_cant: otrosPlasticos_cant,
      otrosPlasticos_valorUnitario: otrosPlasticos_valorUnitario,
      otrosVidrios_cant:otrosVidrios_cant,
      otrosVidrios_valorUnitario:otrosVidrios_valorUnitario,
      otrosTextiles_cant:otrosTextiles_cant,
      otrosTextiles_valorUnitario:otrosTextiles_valorUnitario,
      otrosMaderables_cant:otrosMaderables_cant,
      otrosMaderables_valorUnitario:otrosMaderables_valorUnitario,
      otros_cant:otros_cant,
      otros_valorUnitario:otros_valorUnitario,
      usado_prefactura:false,
      placaVehiculo:placaVehiculo,
      eca:eca,
    });
    //alerta y limpiar campos
    Swal.fire({
      icon: "success",
      title: "Ingreso exitoso",
      text: "¡El reporte ha sido registrado!",
    }).then((result) => {
      window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteReporte = async (id) => {
  const reporteDoc = doc(db, "reportes", id);
  try {
    await deleteDoc(reporteDoc);
  } catch (error) {
    console.log(error);
  }
};

// organizar el update sgun los campos
const updateReporte = async (
  reporte,
  id,
  bodega,
  fecha,
  aluminio_cant,
  aluminio_valorUnitario,
  chatarra_cant,
  chatarra_valorUnitario,
  cobre_cant,
  cobre_valorUnitario,
  bronce_cant,
  bronce_valorUnitario,
  antimonio_cant,
  antimonio_valorUnitario,
  acero_cant,
  acero_valorUnitario,
  otrosMetales_cant,
  otrosMetales_valorUnitario,
  archivo_cant,
  archivo_valorUnitario,
  carton_cant,
  carton_valorUnitario,
  chuevos_cant,
  chuevos_valorUnitario,
  periodico_cant,
  periodico_valorUnitario,
  plegadiza_cant,
  plegadiza_valorUnitario,
  tetrapack_cant,
  tetrapack_valorUnitario,
  plastificado_cant,
  plastificado_valorUnitario,
  kraf_cant,
  kraf_valorUnitario,
  otrosPapeles_cant,
  otrosPapeles_valorUnitario,
  acrilico_cant,
  acrilico_valorUnitario,
  pasta_cant,
  pasta_valorUnitario,
  pet_cant,
  pet_valorUnitario,
  pvc_cant,
  pvc_valorUnitario,
  plasticoBlanco_cant,
  plasticoBlanco_valorUnitario,
  polietileno_cant,
  polietileno_valorUnitario,
  soplado_cant,
  soplado_valorUnitario,
  polipropileno_cant,
  polipropileno_valorUnitario,
  otrosPlasticos_cant,
  otrosPlasticos_valorUnitario,
  otrosVidrios_cant,
  otrosVidrios_valorUnitario,
  otrosTextiles_cant,
  otrosTextiles_valorUnitario,
  otrosMaderables_cant,
  otrosMaderables_valorUnitario,
  otros_cant,
  otros_valorUnitario,
  eca,
) => {
  const reporteDoc = doc(db, "reportes", id);
  try {
    const newInfo = {
      // documento: (newdocumento === undefined ? usuario.documento : newdocumento),
      // nombre: (newnombre === undefined ? usuario.nombre : newnombre),
      // nombre_usuario: (newuserName === undefined ? usuario.nombre_usuario : newuserName),
      // correo: (newcorreo === undefined ? usuario.correo : newcorreo),
      // password: (newpassword === undefined ? usuario.password : newpassword),
      // tipo_doc: (newtipo_doc=== undefined ? usuario.tipo_doc : newtipo_doc),
      // tipo_usuario: (newtipo_usuario === undefined ? usuario.tipo_usuario : newtipo_usuario)
      bodega: bodega,
      fecha: fecha,
      aluminio_cant: aluminio_cant,
      aluminio_valorUnitario: aluminio_valorUnitario,
      chatarra_cant: chatarra_cant,
      chatarra_valorUnitario: chatarra_valorUnitario,
      cobre_cant: cobre_cant,
      cobre_valorUnitario: cobre_valorUnitario,
      bronce_cant: bronce_cant,
      bronce_valorUnitario: bronce_valorUnitario,
      antimonio_cant:antimonio_cant,
      antimonio_valorUnitario:antimonio_valorUnitario,
      acero_cant: acero_cant,
      acero_valorUnitario: acero_valorUnitario,
      otrosMetales_cant: otrosMetales_cant,
      otrosMetales_valorUnitario: otrosMetales_valorUnitario,
      archivo_cant: archivo_cant,
      archivo_valorUnitario: archivo_valorUnitario,
      carton_cant: carton_cant,
      carton_valorUnitario: carton_valorUnitario,
      chuevos_cant: chuevos_cant,
      chuevos_valorUnitario: chuevos_valorUnitario,
      periodico_cant: periodico_cant,
      periodico_valorUnitario: periodico_valorUnitario,
      plegadiza_cant: plegadiza_cant,
      plegadiza_valorUnitario: plegadiza_valorUnitario,
      tetrapack_cant: tetrapack_cant,
      tetrapack_valorUnitario: tetrapack_valorUnitario,
      plastificado_cant:plastificado_cant,
      plastificado_valorUnitario:plastificado_valorUnitario,
      kraf_cant:kraf_cant,
      kraf_valorUnitario:kraf_valorUnitario,
      otrosPapeles_cant: otrosPapeles_cant,
      otrosPapeles_valorUnitario: otrosPapeles_valorUnitario,
      acrilico_cant:acrilico_cant,
      acrilico_valorUnitario:acrilico_valorUnitario,
      pasta_cant: pasta_cant,
      pasta_valorUnitario: pasta_valorUnitario,
      pet_cant: pet_cant,
      pet_valorUnitario: pet_valorUnitario,
      pvc_cant: pvc_cant,
      pvc_valorUnitario: pvc_valorUnitario,
      plasticoBlanco_cant:plasticoBlanco_cant,
      plasticoBlanco_valorUnitario:plasticoBlanco_valorUnitario,
      polietileno_cant:polietileno_cant,
      polietileno_valorUnitario:polietileno_valorUnitario,
      soplado_cant:soplado_cant,
      soplado_valorUnitario:soplado_valorUnitario,
      polipropileno_cant:polipropileno_cant,
      polipropileno_valorUnitario:polipropileno_valorUnitario,
      otrosPlasticos_cant: otrosPlasticos_cant,
      otrosPlasticos_valorUnitario: otrosPlasticos_valorUnitario,
      otrosVidrios_cant:otrosVidrios_cant,
      otrosVidrios_valorUnitario:otrosVidrios_valorUnitario,
      otrosTextiles_cant:otrosTextiles_cant,
      otrosTextiles_valorUnitario:otrosTextiles_valorUnitario,
      otrosMaderables_cant:otrosMaderables_cant,
      otrosMaderables_valorUnitario:otrosMaderables_valorUnitario,
      otros_cant:otros_cant,
      otros_valorUnitario:otros_valorUnitario,
      eca:eca,
    };
    await updateDoc(reporteDoc, newInfo);
    Swal.fire({
      icon: "success",
      title: "Actualizacion exitosa",
      text: "¡El reporte ha sido actualizado!",
    }).then((result) => {
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadFileReporte = async(file,routeName)=>{
    const storageRef = ref(storage, 'docReportes/' + routeName);
    uploadBytes(storageRef, file);    
}



export {getReportes, createReporte, getReporte, deleteReporte, updateReporte,uploadFileReporte,getReportesBodegaFecha,getReportesPeriodo}
