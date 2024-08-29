import { addDoc, collection, doc, getDocs, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const indocumentadoCollectionRef = collection(db, "indocumentados");
const storage = getStorage();


const getIndocumentados = async () => {
  try {
    const data = await getDocs(indocumentadoCollectionRef);
    const indocumentados = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return indocumentados;
  } catch (error) {
    console.log(error);
  }
};

const getIndocumentado = async (id) => {
  const indocumentadoRef = doc(db, "indocumentados", id);
  try {
    const indocumentadoDoc = await getDoc(indocumentadoRef);
    if (indocumentadoDoc.exists()) {
      const indocumentado = indocumentadoDoc.data();
      return indocumentado;
    } else {
      console.log("problemmmas :c");
    }
  } catch (error) {
    console.log(error);
  }
};

const createIndocumentado = async (
  bodega,
  fecha_registro,
  nombre_beneficiario,
  // tipo_doc,
  // documento,
  // fecha_expedicion,
  // lugar_expedicion,
  sexo,
  // fecha_nacimiento,
  lugar_nacimiento,
  nacionalidad,
  RH,
  direccion,
  departamento,
  municipio,
  comuna,
  barrio,
  telefono,
  // SISBEN,
  // posee_eps,
  // EPS,
  // otro_salud,
  tipo_vivienda,
  escolaridad,
  estado_civil,
  asociados,
  nroasociados,
  dias_dedicados,
  nombresdias_dedicados,
  tiempo_reciclaje,
  horarios,
  municipioRecoleccion,
  macroRuta,
  inicioMicroRuta,
  finMicroRuta,
  // codigoMicroRuta,
  descripcionMicroRuta,
  pertenece_otra,
  otra_org,
  // boolSisben,
  // boolEps,
  tallaChaleco,
  observaciones,
  codigoId,
  // docsPendientes
  eca,
) => {
  try {
    await addDoc(indocumentadoCollectionRef, {
      bodega: bodega,
      fecha_registro: fecha_registro,
      nombre_beneficiario: nombre_beneficiario,
      // tipo_doc: tipo_doc,
      // documento: documento,
      // fecha_expedicion: fecha_expedicion,
      // lugar_expedicion: lugar_expedicion,
      sexo: sexo,
      // fecha_nacimiento: fecha_nacimiento,
      lugar_nacimiento: lugar_nacimiento,
      nacionalidad: nacionalidad,
      RH: RH,
      direccion: direccion,
      departamento: departamento,
      municipio: municipio,
      comuna: comuna,
      barrio: barrio,
      telefono: telefono,
      // SISBEN: SISBEN,
      // posee_eps: posee_eps,
      // EPS: EPS,
      // otro_salud: otro_salud,
      tipo_vivienda: tipo_vivienda,
      escolaridad: escolaridad,
      estado_civil: estado_civil,
      nroasociados:nroasociados,
      asociados:asociados,
      dias_dedicados: dias_dedicados,
      nombresdias_dedicados: nombresdias_dedicados,
      tiempo_reciclaje: tiempo_reciclaje,
      horarios: horarios,
      municipio_recoleccion:municipioRecoleccion,
      macroRuta: macroRuta,
      inicioMicroRuta:inicioMicroRuta,
      finMicroRuta:finMicroRuta,
      // codigoMicroRuta:codigoMicroRuta,
      descripcionMicroRuta:descripcionMicroRuta,
      pertenece_otra: pertenece_otra,
      otra_org: otra_org,
      // boolSisben: boolSisben,
      // boolEps: boolEps,
      tallaChaleco: tallaChaleco,
      observaciones: observaciones,
      codigoId : codigoId
      // docsPendientes: docsPendientes,
      ,eca:eca,
    });
    Swal.fire({
      icon: "success",
      title: "Ingreso exitoso",
      text: "¡El recuperador Indocumentado ha sido registrado!",
    }).then((result)=>{
      window.location.reload(false);
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

  const deleteIndocumentado = async(id) => {
    const indocumentadoDoc = doc(db, "indocumentados", id);
    try {
        await deleteDoc(indocumentadoDoc);
    } catch (error) {
        console.log(error);
    }
};


const updateIndocumentado = async (
  id,
  indocumentado,
  newbodega,
  newfecha_registro,
  newnombre_beneficiario,
  // newtipo_doc,
  // newdocumento,
  // newfecha_expedicion,
  // newlugar_expedicion,
  newsexo,
  // newfecha_nacimiento,
  newlugar_nacimiento,
  newnacionalidad,
  newRH,
  newdireccion,
  newdepartamento,
  newmunicipio,
  newcomuna,
  newbarrio,
  newtelefono,
  // newSISBEN,
  // newposee_eps,
  // newEPS,
  // newotro_salud,
  newtipo_vivienda,
  newescolaridad,
  newestado_civil,
  newasociados,
  newnroasociados,
  newdias_dedicados,
  newnombresdias_dedicados,
  newtiempo_reciclaje,
  newhorarios,
  newmunicipioRecoleccion,
  newmacroRuta,
  newinicioMicroRuta,
  newfinMicroRuta,
  newcodigoMicroRuta,
  newdescripcionMicroRuta,
  newpertenece_otra,
  newotra_org,
  // newboolSisben,
  // newboolEps,
  newtallaChaleco,
  newobservaciones,
  eca,
  // newdocsPendientes
) => {
  try {
    const indocumentadoDoc = doc(db, "indocumentados", id);
    const newInfo =  {
      bodega: (newbodega === undefined ? indocumentado.bodega : newbodega) ,
      fecha_registro: (newfecha_registro === undefined ? indocumentado.fecha_registro : newfecha_registro) ,
      nombre_beneficiario: (newnombre_beneficiario === undefined  ? indocumentado.nombre_beneficiario : newnombre_beneficiario) ,
      // tipo_doc: (newtipo_doc === undefined ? indocumentado.tipo_doc : newtipo_doc) ,
      // documento: (newdocumento === undefined ? indocumentado.documento : newdocumento) ,
      // fecha_expedicion: (newfecha_expedicion === undefined ? indocumentado.fecha_expedicion : newfecha_expedicion)  ,
      // lugar_expedicion: (newlugar_expedicion === undefined ? indocumentado.lugar_expedicion : newlugar_expedicion) ,
      sexo: (newsexo === undefined ? indocumentado.sexo : newsexo) ,
      // fecha_nacimiento: (newfecha_nacimiento === undefined ? indocumentado.fecha_nacimiento : newfecha_nacimiento)  ,
      lugar_nacimiento: (newlugar_nacimiento === undefined ? indocumentado.lugar_nacimiento :  newlugar_nacimiento),
      nacionalidad: (newnacionalidad === undefined ? indocumentado.nacionalidad :  newnacionalidad) ,
      RH: (newRH === undefined ? indocumentado.RH : newRH) ,
      direccion: (newdireccion === undefined ? indocumentado.direccion : newdireccion) ,
      departamento: (newdepartamento === undefined ? indocumentado.departamento : newdepartamento) ,
      municipio: (newmunicipio === undefined ? indocumentado.municipio :  newmunicipio) ,
      comuna: (newcomuna === undefined ? indocumentado.comuna: newcomuna)  ,
      barrio: (newbarrio === undefined ? indocumentado.barrio : newbarrio) ,
      telefono: (newtelefono === undefined ? indocumentado.telefono :  newtelefono),
      // SISBEN: (newSISBEN === undefined ? indocumentado.SISBEN : newSISBEN) ,
      // posee_eps: (newposee_eps === undefined ? indocumentado.posee_eps :  newposee_eps) ,
      // EPS: (newEPS === undefined ? indocumentado.EPS : newEPS) ,
      // otro_salud: (newotro_salud === undefined ? indocumentado.otro_salud : newotro_salud) ,
      tipo_vivienda: (newtipo_vivienda === undefined ? indocumentado.tipo_vivienda :  newtipo_vivienda),
      escolaridad: (newescolaridad === undefined ? indocumentado.escolaridad : newescolaridad) ,
      estado_civil: (newestado_civil === undefined ? indocumentado.estado_civil : newestado_civil) ,
      nroasociados: (newnroasociados === undefined ? indocumentado.nroasociados : newnroasociados),
      asociados: (newasociados === undefined ? indocumentado.asociados : newasociados) ,
      dias_dedicados: (newdias_dedicados === undefined ? indocumentado.dias_dedicados : newdias_dedicados) ,
      nombresdias_dedicados: (newnombresdias_dedicados === undefined ? indocumentado.nombresdias_dedicados :  newnombresdias_dedicados),
      tiempo_reciclaje: (newtiempo_reciclaje === undefined ? indocumentado.tiempo_reciclaje :  newtiempo_reciclaje),
      horarios: (newhorarios === undefined ? indocumentado.horarios : newhorarios) ,
      municipio_recoleccion: (newmunicipioRecoleccion === undefined ? indocumentado.municipio_recoleccion : newmunicipioRecoleccion) ,
      macroRuta: (newmacroRuta === undefined ? indocumentado.macroRuta : newmacroRuta) ,
      inicioMicroRuta: (newinicioMicroRuta === undefined ? indocumentado.inicioMicroRuta :  newinicioMicroRuta),
      finMicroRuta: (newfinMicroRuta === undefined ? indocumentado.finMicroRuta : newfinMicroRuta) ,
      codigoMicroRuta: (newcodigoMicroRuta === undefined ? indocumentado.codigoMicroRuta : newcodigoMicroRuta) ,
      descripcionMicroRuta: (newdescripcionMicroRuta === undefined ? indocumentado.descripcionMicroRuta :  newdescripcionMicroRuta),
      pertenece_otra: (newpertenece_otra === undefined ? indocumentado.pertenece_otra :  newpertenece_otra),
      otra_org: (newotra_org === undefined ? indocumentado.otra_org : newotra_org) ,
      // boolSisben: (newboolSisben === undefined ? indocumentado.boolSisben :  newboolSisben),
      // boolEps: (newboolEps === undefined ? indocumentado.boolEps : newboolEps) ,
      tallaChaleco: (newtallaChaleco === undefined ? indocumentado.tallaChaleco : newtallaChaleco) ,
      observaciones: (newobservaciones === undefined ? indocumentado.observaciones : newobservaciones) ,
      // docsPendientes: (newdocsPendientes === undefined ? indocumentado.docsPendientes : newdocsPendientes)
    };
    await updateDoc(indocumentadoDoc, newInfo);
    Swal.fire({
      icon: "success",
      title: "Actualización exitosa",
      text: "¡La información ha sido actualizada de forma correcta!",
    }).then((result)=>{
      
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};


  const uploadFileFoto = async(file,routeName)=>{
    const metadata = {
      contentType: "image/jpeg" || "application/pdf",
    };
  
    const storageRef = ref(storage, "docRecuperadores/" + routeName, metadata);
    uploadBytes(storageRef, file);
  };

  const uploadFileCopiaCC = async(file,routeName)=>{
    const metadata = {
      contentType: "image/jpeg" || "application/pdf",
    };
  
    const storageRef = ref(storage, "docRecuperadores/" + routeName, metadata);
    uploadBytes(storageRef, file);
  };

  const uploadFileCopiaServicios = async(file,routeName)=>{
    const metadata = {
      contentType: "image/jpeg" || "application/pdf",
    };
  
    const storageRef = ref(storage, "docRecuperadores/" + routeName, metadata);
    uploadBytes(storageRef, file);
  };

export {
  getIndocumentado,
  getIndocumentados,
  createIndocumentado,
  updateIndocumentado,
  deleteIndocumentado
};

