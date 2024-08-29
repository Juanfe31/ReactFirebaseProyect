import { addDoc, collection, doc, getDocs, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Swal from "sweetalert2";

const recuperadorCollectionRef = collection(db, "recuperadores");
const storage = getStorage();

const getRecuperadores = async () => {
  try {
    const data = await getDocs(recuperadorCollectionRef);
    const recuperadores = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return recuperadores;
  } catch (error) {
    console.log(error);
  }
};

const getRecuperador = async (id) => {
  const recuperadorRef = doc(db, "recuperadores", id);
  try {
    const recuperadorDoc = await getDoc(recuperadorRef);
    if (recuperadorDoc.exists()) {
      const recuperador = recuperadorDoc.data();
      return recuperador;
    } else {
      console.log("problemmmas :c");
    }
  } catch (error) {
    console.log(error);
  }
};

const createRecuperador = async (
  bodega,
  fecha_registro,
  nombre_beneficiario,
  tipo_doc,
  documento,
  fecha_expedicion,
  lugar_expedicion,
  sexo,
  fecha_nacimiento,
  lugar_nacimiento,
  nacionalidad,
  RH,
  direccion,
  departamento,
  municipio,
  comuna,
  barrio,
  telefono,
  SISBEN,
  posee_eps,
  EPS,
  otro_salud,
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
  codigoMicroRuta,
  descripcionMicroRuta,
  pertenece_otra,
  otra_org,
  boolSisben,
  boolEps,
  tallaChaleco,
  observaciones,
  docsPendientes, 
  eca
) => {
  try {
    await addDoc(recuperadorCollectionRef, {
      bodega: bodega,
      fecha_registro: fecha_registro,
      nombre_beneficiario: nombre_beneficiario,
      tipo_doc: tipo_doc,
      documento: documento,
      fecha_expedicion: fecha_expedicion,
      lugar_expedicion: lugar_expedicion,
      sexo: sexo,
      fecha_nacimiento: fecha_nacimiento,
      lugar_nacimiento: lugar_nacimiento,
      nacionalidad: nacionalidad,
      RH: RH,
      direccion: direccion,
      departamento: departamento,
      municipio: municipio,
      comuna: comuna,
      barrio: barrio,
      telefono: telefono,
      SISBEN: SISBEN,
      posee_eps: posee_eps,
      EPS: EPS,
      otro_salud: otro_salud,
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
      codigoMicroRuta:codigoMicroRuta,
      descripcionMicroRuta:descripcionMicroRuta,
      pertenece_otra: pertenece_otra,
      otra_org: otra_org,
      boolSisben: boolSisben,
      boolEps: boolEps,
      tallaChaleco: tallaChaleco,
      observaciones: observaciones,
      docsPendientes: docsPendientes,
      bancarizadoPendiente : true,
      eca:eca,
    });
    Swal.fire({
      icon: "success",
      title: "Ingreso exitoso",
      text: "¡El recuperador Documentado ha sido registrado!",
    }).then((result)=>{
      window.location.reload(true);
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const createRecuperadorWithoutReload = async (
  bodega,
  fecha_registro,
  nombre_beneficiario,
  tipo_doc,
  documento,
  fecha_expedicion,
  lugar_expedicion,
  sexo,
  fecha_nacimiento,
  lugar_nacimiento,
  nacionalidad,
  RH,
  direccion,
  departamento,
  municipio,
  comuna,
  barrio,
  telefono,
  SISBEN,
  posee_eps,
  EPS,
  otro_salud,
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
  codigoMicroRuta,
  descripcionMicroRuta,
  pertenece_otra,
  otra_org,
  boolSisben,
  boolEps,
  tallaChaleco,
  observaciones,
  docsPendientes,
  eca,
) => {
  try {
    await addDoc(recuperadorCollectionRef, {
      bodega: bodega,
      fecha_registro: fecha_registro,
      nombre_beneficiario: nombre_beneficiario,
      tipo_doc: tipo_doc,
      documento: documento,
      fecha_expedicion: fecha_expedicion,
      lugar_expedicion: lugar_expedicion,
      sexo: sexo,
      fecha_nacimiento: fecha_nacimiento,
      lugar_nacimiento: lugar_nacimiento,
      nacionalidad: nacionalidad,
      RH: RH,
      direccion: direccion,
      departamento: departamento,
      municipio: municipio,
      comuna: comuna,
      barrio: barrio,
      telefono: telefono,
      SISBEN: SISBEN,
      posee_eps: posee_eps,
      EPS: EPS,
      otro_salud: otro_salud,
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
      codigoMicroRuta:codigoMicroRuta,
      descripcionMicroRuta:descripcionMicroRuta,
      pertenece_otra: pertenece_otra,
      otra_org: otra_org,
      boolSisben: boolSisben,
      boolEps: boolEps,
      tallaChaleco: tallaChaleco,
      observaciones: observaciones,
      docsPendientes: docsPendientes,
      bancarizadoPendiente : true,
      eca:eca,
    });
    Swal.fire({
      icon: "success",
      title: "Ingreso exitoso",
      text: "¡El recuperador Documentado ha sido registrado!",
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

  const deleteRecuperador = async(id) => {
    const recuperadorDoc = doc(db, "recuperadores", id);
    try {
        await deleteDoc(recuperadorDoc);
    } catch (error) {
        console.log(error);
    }
};


const updateRecuperador = async (
  id,
  recuperador,
  newbodega,
  newfecha_registro,
  newnombre_beneficiario,
  newtipo_doc,
  newdocumento,
  newfecha_expedicion,
  newlugar_expedicion,
  newsexo,
  newfecha_nacimiento,
  newlugar_nacimiento,
  newnacionalidad,
  newRH,
  newdireccion,
  newdepartamento,
  newmunicipio,
  newcomuna,
  newbarrio,
  newtelefono,
  newSISBEN,
  newposee_eps,
  newEPS,
  newotro_salud,
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
  newboolSisben,
  newboolEps,
  newtallaChaleco,
  newobservaciones,
  newdocsPendientes
) => {
  try {
    const recuperadorDoc = doc(db, "recuperadores", id);
    const newInfo =  {
      bodega: (newbodega === undefined ? recuperador.bodega : newbodega) ,
      fecha_registro: (newfecha_registro === undefined ? recuperador.fecha_registro : newfecha_registro) ,
      nombre_beneficiario: (newnombre_beneficiario === undefined  ? recuperador.nombre_beneficiario : newnombre_beneficiario) ,
      tipo_doc: (newtipo_doc === undefined ? recuperador.tipo_doc : newtipo_doc) ,
      documento: (newdocumento === undefined ? recuperador.documento : newdocumento) ,
      fecha_expedicion: (newfecha_expedicion === undefined ? recuperador.fecha_expedicion : newfecha_expedicion)  ,
      lugar_expedicion: (newlugar_expedicion === undefined ? recuperador.lugar_expedicion : newlugar_expedicion) ,
      sexo: (newsexo === undefined ? recuperador.sexo : newsexo) ,
      fecha_nacimiento: (newfecha_nacimiento === undefined ? recuperador.fecha_nacimiento : newfecha_nacimiento)  ,
      lugar_nacimiento: (newlugar_nacimiento === undefined ? recuperador.lugar_nacimiento :  newlugar_nacimiento),
      nacionalidad: (newnacionalidad === undefined ? recuperador.nacionalidad :  newnacionalidad) ,
      RH: (newRH === undefined ? recuperador.RH : newRH) ,
      direccion: (newdireccion === undefined ? recuperador.direccion : newdireccion) ,
      departamento: (newdepartamento === undefined ? recuperador.departamento : newdepartamento) ,
      municipio: (newmunicipio === undefined ? recuperador.municipio :  newmunicipio) ,
      comuna: (newcomuna === undefined ? recuperador.comuna: newcomuna)  ,
      barrio: (newbarrio === undefined ? recuperador.barrio : newbarrio) ,
      telefono: (newtelefono === undefined ? recuperador.telefono :  newtelefono),
      SISBEN: (newSISBEN === undefined ? recuperador.SISBEN : newSISBEN) ,
      posee_eps: (newposee_eps === undefined ? recuperador.posee_eps :  newposee_eps) ,
      EPS: (newEPS === undefined ? recuperador.EPS : newEPS) ,
      otro_salud: (newotro_salud === undefined ? recuperador.otro_salud : newotro_salud) ,
      tipo_vivienda: (newtipo_vivienda === undefined ? recuperador.tipo_vivienda :  newtipo_vivienda),
      escolaridad: (newescolaridad === undefined ? recuperador.escolaridad : newescolaridad) ,
      estado_civil: (newestado_civil === undefined ? recuperador.estado_civil : newestado_civil) ,
      nroasociados: (newnroasociados === undefined ? recuperador.nroasociados : newnroasociados),
      asociados: (newasociados === undefined ? recuperador.asociados : newasociados) ,
      dias_dedicados: (newdias_dedicados === undefined ? recuperador.dias_dedicados : newdias_dedicados) ,
      nombresdias_dedicados: (newnombresdias_dedicados === undefined ? recuperador.nombresdias_dedicados :  newnombresdias_dedicados),
      tiempo_reciclaje: (newtiempo_reciclaje === undefined ? recuperador.tiempo_reciclaje :  newtiempo_reciclaje),
      horarios: (newhorarios === undefined ? recuperador.horarios : newhorarios) ,
      municipio_recoleccion: (newmunicipioRecoleccion === undefined ? recuperador.municipio_recoleccion : newmunicipioRecoleccion) ,
      macroRuta: (newmacroRuta === undefined ? recuperador.macroRuta : newmacroRuta) ,
      inicioMicroRuta: (newinicioMicroRuta === undefined ? recuperador.inicioMicroRuta :  newinicioMicroRuta),
      finMicroRuta: (newfinMicroRuta === undefined ? recuperador.finMicroRuta : newfinMicroRuta) ,
      codigoMicroRuta: (newcodigoMicroRuta === undefined ? recuperador.codigoMicroRuta : newcodigoMicroRuta) ,
      descripcionMicroRuta: (newdescripcionMicroRuta === undefined ? recuperador.descripcionMicroRuta :  newdescripcionMicroRuta),
      pertenece_otra: (newpertenece_otra === undefined ? recuperador.pertenece_otra :  newpertenece_otra),
      otra_org: (newotra_org === undefined ? recuperador.otra_org : newotra_org) ,
      boolSisben: (newboolSisben === undefined ? recuperador.boolSisben :  newboolSisben),
      boolEps: (newboolEps === undefined ? recuperador.boolEps : newboolEps) ,
      tallaChaleco: (newtallaChaleco === undefined ? recuperador.tallaChaleco : newtallaChaleco) ,
      observaciones: (newobservaciones === undefined ? recuperador.observaciones : newobservaciones) ,
      docsPendientes: (newdocsPendientes === undefined ? recuperador.docsPendientes : newdocsPendientes)
    };
    await updateDoc(recuperadorDoc, newInfo);
    Swal.fire({
      icon: "success",
      title: "Actualización exitosa",
      text: "¡La información ha sido actualizada de forma correcta!",
    }).then((result)=>{
      window.location.reload(false);
    });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

const updateBancarizado = async(id, recuperador, cuenta) => {
  const recuperadorDoc = doc(db, "recuperadores", id);
  const newInfo = {
    // cuenta_bancaria : (cuenta === undefined ? recuperador.cuenta_bancaria : cuenta)
    cuenta_bancaria : cuenta,
    bancarizadoPendiente : false,
  };
  try {
      await await updateDoc(recuperadorDoc, newInfo);
  } catch (error) {
      console.log(error);
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
  getRecuperador,
  getRecuperadores,
  createRecuperador,
  createRecuperadorWithoutReload,
  updateRecuperador,
  deleteRecuperador,
  updateBancarizado,
  uploadFileFoto,
  uploadFileCopiaCC,
  uploadFileCopiaServicios
};

