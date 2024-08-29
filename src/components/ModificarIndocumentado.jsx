import React from 'react'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { createRecuperadorWithoutReload, uploadFileFoto, uploadFileCopiaCC, uploadFileCopiaServicios, getRecuperador, updateRecuperador } from '../api/Recuperador';
import { deleteIndocumentado, getIndocumentado, updateIndocumentado } from '../api/Indocumentado';
import { getNombresEcas } from "../api/Eca";
import '../assets/css/ingresarUsuario.css';
import '../assets/css/ingresarRecuperador.css';
import Swal from 'sweetalert2';
// select
import Select from 'react-select';
// get docs from the web
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// query por si el recuperador existe
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';


export default function ModificarIndocumentado() {


    const [indocumentado, setIndocumentado] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState(location.state.id);
    const [read, setRead] = useState(location.state.read);

    const storage = getStorage();
    const [documento, setDoc] = useState({ valor: location.state.documento, rojo: "" });

    const refenciaBancaria = ref(storage, 'docRecuperadores/' + documento.valor + '/CertificadoBancario_' + documento.valor);
    const refenciaFoto = ref(storage, 'docRecuperadores/' + documento.valor + '/foto_' + documento.valor);
    const refenciaServicios = ref(storage, 'docRecuperadores/' + documento.valor + '/copiaServicios_' + documento.valor);
    const refenciaCedula = ref(storage, 'docRecuperadores/' + documento.valor + '/copiaCC_' + documento.valor);


    const [certificadoBancario, setCertificadoBancario] = useState("");
    const [showBancario, setShowBancario] = useState(false);

    const [certificadoCedula, setCertificadoCedula] = useState("");
    const [showCedula, setShowCedula] = useState(false);

    const [copiaServicios, setCopiaServicios] = useState("");
    const [showServicios, setShowServicios] = useState(false);

    const [copiaFoto, setCopiaFoto] = useState("");
    const [showFoto, setShowFoto] = useState(true);

    // useEffect(() => {


    const [bodega, setTipoBodega] = useState({ valor: location.state.bodega, rojo: "" });
    const [fecha_registro, setFechaRegistro] = useState({ valor: "", rojo: "" });
    const [nombre_beneficiario, setNombreBeneficiario] = useState({ valor: "", rojo: "" });

    const [tipo_doc, setTipoDoc] = useState({ valor: "", rojo: "" });
    // const [documento, setDoc] = useState({ valor: "", rojo: "" });
    const [fecha_expedicion, setFechaExpedicion] = useState({ valor: "", rojo: "" })
    const [lugar_expedicion, setLugarExpedicion] = useState({ valor: "", rojo: "" })

    const [sexo, setSexo] = useState({ valor: "", rojo: "" })

    const [fecha_nacimiento, setFechaNacimiento] = useState({ valor: "", rojo: "" });
    const [lugar_nacimiento, setLugarNacimiento] = useState({ valor: "", rojo: "" });
    const [nacionalidad, setNacionalidad] = useState({ valor: "", rojo: "" });

    const [RH, setRH] = useState({ valor: "", rojo: "" });

    const [direccion, setDireccion] = useState({ valor: "", rojo: "" });
    const [departamento, setDepartamento] = useState({ valor: "", rojo: "" });
    const [municipio, setMunicipio] = useState({ valor: "", rojo: "" });
    const [comuna, setComuna] = useState({ valor: "", rojo: "" });
    const [barrio, setBarrio] = useState({ valor: "", rojo: "" });
    const [telefono, setTelefono] = useState({ valor: "", rojo: "" });

    const [SISBEN, setSISBEN] = useState({ valor: "", rojo: "" });

    const [posee_eps, setPoseeEPS] = useState({ valor: "", rojo: "" });
    const [EPS, setEPS] = useState({ valor: "", rojo: "" });
    const [EPSdis, setDisEPS] = useState('');

    const [otro_salud, setOtroSalud] = useState({ valor: "", rojo: "" });

    const [tipo_vivienda, setTipoVivienda] = useState({ valor: "", rojo: "" });
    const [escolaridad, setEscolaridad] = useState({ valor: "", rojo: "" });
    const [estado_civil, setEstadoCivil] = useState({ valor: "", rojo: "" });

    const [colorNombres, setColorNombres] = useState("")

    //recordar cuadrar lo de las personas asociadas!!!!!!!!!!!!!

    const [dias_dedicados, setDiasDedicados] = useState([]);
    const [nombredias_dedicados, setNombreDiasDedicados] = useState([]);
    const [colordias_dedicados, setColorDiasDedicados] = useState("");
    const [tiempo_reciclaje, setTiempoReciclaje] = useState({ valor: "", rojo: "" });
    const [horarios, setHorarios] = useState({ valor: "", rojo: "" });


    const [municipioRuta, setMunicipioRuta] = useState({ valor: "", rojo: "" });
    const [macroruta, setMacroruta] = useState({ valor: "", rojo: "" });
    const [inicioMicroRuta, setInicioMicroRuta] = useState({ valor: "", rojo: "" });
    const [finMicroRuta, setFinMicroRuta] = useState({ valor: "", rojo: "" });
    const [descripcionMicroRuta, setDescripcionMicroRuta] = useState({ valor: "", rojo: "" });
    const [codigoMicroRuta, setCodigoMicroRuta] = useState({ valor: "", rojo: "" });
    const [boolComunaB, setBoolComunaB] = useState(true);
    const [boolComunaM, setBoolComunaM] = useState(true);

    const [pertenece_otra, setPerteneceOtra] = useState({ valor: "", rojo: "" });

    const [otra_org, setOtraOrg] = useState({ valor: "", rojo: "" });
    const [disOtra, setDisOtra] = useState(false);

    const [boolSisben, setBoolSisben] = useState({ valor: undefined, rojo: "" });
    const [boolEps, setBoolEps] = useState({ valor: undefined, rojo: "" });
    const [tallaChaleco, setTalla] = useState({ valor: "", rojo: "" });


    const [observaciones, setObservaciones] = useState({ valor: "", rojo: "" });


    //Subir los archivos
    const [selectedFileFoto, setSelectedFileFoto] = useState({ valor: "", rojo: "" });
    const [selectedFileCopiaCC, setSelectedFileCopiaCC] = useState({ valor: "", rojo: "" });
    const [selectedFileCuentaServicios, setSelectedFileCuentaServicios] = useState({ valor: "", rojo: "" });

    const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);

    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();

    // select
    const [nombreEcas, setNombreEcas] = useState([]);

    // documentos pendientes
    const [boolDocumentosPendientes, setBoolDocumentosPendientes] = useState(false);

    // campos ocultas para indocumentado
    const [hide, setHide] = useState(true);
    const [show, setShow] = useState(false);

    // todo esto es para el numero de personas familiares
    const [numAsociados, setNumAsociados] = useState(0);
    const [nomAsociados, setNombresAsociados] = useState(Array(numAsociados).fill(""));
    // todo esto es para el numero de personas familiares
    // const [numRutas, setNumRutas] = useState(0);
    // const [nomRutas, setNombreRutas] = useState(Array(numRutas).fill(""));

    const [codigoId, setCodigoId] = useState("");


    // class verificaciones
    const [classNombre, setClassNombre] = useState("form-control");
    const [classDocumento, setClassDocumento] = useState("form-control");
    const [classLugarExpedicion, setClassLugarExpedicion] = useState("form-control");
    const [classLugarNacimiento, setClassLugarNacimiento] = useState("form-control");
    const [classNacionalidad, setClassNacionalidad] = useState("form-control");
    const [classDireccion, setClassDireccion] = useState("form-control");
    const [classDepartamento, setClassDepartamento] = useState("form-control");
    const [classMunicipio, setClassMunicipio] = useState("form-control");
    const [classComuna, setClassComuna] = useState("form-control");
    const [classBarrio, setClassBarrio] = useState("form-control");
    const [classTelefono, setClassTelefono] = useState("form-control");
    const [classEps, setClassEps] = useState("form-control");
    const [classOtroSalud, setClassOtroSalud] = useState("form-control");
    const [classTiempoDedicado, setClassTiempoDedicado] = useState("form-control");
    const [classHorarios, setClassHorarios] = useState("form-control");
    const [classInicioRuta, setClassInicioRuta] = useState("form-control");
    const [classFinRuta, setClassFinRuta] = useState("form-control");
    const [classObservaciones, setClassObservaciones] = useState("form-control");
    const [classDescripcion, setClassDescripcion] = useState("form-control");

    useEffect(() => {
        const getIndocumentadoF = async () => {
            const getIndocumentadoAPI = await getIndocumentado(id);
            setIndocumentado(getIndocumentadoAPI);
        }
        getIndocumentadoF();

        const fetchEcas = async () => {
            const TodasLasEcas = await getNombresEcas();
            setNombreEcas(TodasLasEcas);
        }
        fetchEcas();

    }, [])

    useEffect(() => {
        const getRecuperadorF = async () => {
            setTipoBodega({ valor: indocumentado.bodega, rojo: "" })
            setFechaRegistro({ valor: indocumentado.fecha_registro, rojo: "" })
            setNombreBeneficiario({ valor: indocumentado.nombre_beneficiario, rojo: "" })
            // setTipoDoc({ valor: indocumentado.tipo_doc, rojo: "" })
            // setDoc({ valor: indocumentado.documento, rojo: "" })
            // setFechaExpedicion({ valor: indocumentado.fecha_expedicion, rojo: "" })
            // setLugarExpedicion({ valor: indocumentado.lugar_expedicion, rojo: "" })
            setSexo({ valor: indocumentado.sexo, rojo: "" })
            setFechaNacimiento({ valor: indocumentado.fecha_nacimiento, rojo: "" })
            setLugarNacimiento({ valor: indocumentado.lugar_nacimiento, rojo: "" })
            setNacionalidad({ valor: indocumentado.nacionalidad, rojo: "" })
            setRH({ valor: indocumentado.RH, rojo: "" })
            setDireccion({ valor: indocumentado.direccion, rojo: "" })
            setDepartamento({ valor: indocumentado.departamento, rojo: "" })
            setMunicipio({ valor: indocumentado.municipio, rojo: "" })
            setComuna({ valor: indocumentado.comuna, rojo: "" })
            setBarrio({ valor: indocumentado.barrio, rojo: "" })
            setTelefono({ valor: indocumentado.telefono, rojo: "" })
            // setSISBEN({ valor: indocumentado.SISBEN, rojo: "" })
            // setPoseeEPS({ valor: indocumentado.posee_eps, rojo: "" })
            // setEPS({ valor: indocumentado.EPS, rojo: "" })
            // setDisEPS({ valor: "", rojo: "" })
            // setOtroSalud({ valor: indocumentado.otro_salud, rojo: "" })
            setTipoVivienda({ valor: indocumentado.tipo_vivienda, rojo: "" })
            setEscolaridad({ valor: indocumentado.escolaridad, rojo: "" })
            setEstadoCivil({ valor: indocumentado.estado_civil, rojo: "" })
            // setColorNombres({ valor: "", rojo: "" })
            setDiasDedicados(indocumentado.dias_dedicados)
            // setColorDiasDedicados({ valor: "", rojo: "" })
            setTiempoReciclaje({ valor: indocumentado.tiempo_reciclaje, rojo: "" })
            setHorarios({ valor: indocumentado.horarios, rojo: "" })
            setMacroruta({ valor: indocumentado.macroRuta, rojo: "" })
            setInicioMicroRuta({ valor: indocumentado.inicioMicroRuta, rojo: "" })
            setFinMicroRuta({ valor: indocumentado.finMicroRuta, rojo: "" })
            setDescripcionMicroRuta({ valor: indocumentado.descripcionMicroRuta, rojo: "" })
            // setCodigoMicroRuta({ valor: indocumentado.codigoMicroRuta, rojo: "" })
            setPerteneceOtra({ valor: indocumentado.pertenece_otra, rojo: "" })
            setOtraOrg({ valor: indocumentado.otra_org, rojo: "" })
            // setDisOtra({ valor: "", rojo: "" })
            // setBoolSisben({ valor: indocumentado.boolSisben, rojo: "" })
            // setBoolEps({ valor: indocumentado.boolEps, rojo: "" })
            setTalla({ valor: indocumentado.tallaChaleco, rojo: "" })
            setObservaciones({ valor: indocumentado.observaciones, rojo: "" })
            setMunicipioRuta({ valor: indocumentado.municipio_recoleccion, rojo: "" })
            setSelectedFileFoto({ valor: "", rojo: "" })
            // setSelectedFileCopiaCC({ valor: "", rojo: "" })
            // setSelectedFileCuentaServicios({ valor: "", rojo: "" })
            // setNombresAsociados(indocumentado.asociados);
            // setNumAsociados(indocumentado.nroasociados);
            setCodigoId(indocumentado.codigoId)

            if (indocumentado.posee_eps === "si") {
                setDisEPS(false);
            }
            if (indocumentado.pertenece_otra === "si") {
                setDisOtra(false);
            }
            if (indocumentado.municipio_recoleccion === "Medellín") {
                setBoolComunaM(false);
                setBoolComunaB(true);
            }
            if (indocumentado.municipio_recoleccion === "Bello") {
                setBoolComunaB(false);
                setBoolComunaM(true);
            }
        }
        getRecuperadorF();


    }, [
        indocumentado.EPS, indocumentado.RH, indocumentado.SISBEN, indocumentado.asociados, indocumentado.barrio, indocumentado.bodega, indocumentado.boolEps, indocumentado.boolSisben, indocumentado.codigoMicroRuta, indocumentado.comuna, indocumentado.departamento, indocumentado.descripcionMicroRuta, indocumentado.dias_dedicados, indocumentado.direccion, indocumentado.documento, indocumentado.escolaridad, indocumentado.estado_civil, indocumentado.fecha_expedicion, indocumentado.fecha_nacimiento, indocumentado.fecha_registro, indocumentado.finMicroRuta, indocumentado.horarios, indocumentado.inicioMicroRuta, indocumentado.lugar_expedicion, indocumentado.lugar_nacimiento, indocumentado.macroRuta, indocumentado.municipio, indocumentado.municipio_recoleccion, indocumentado.nacionalidad, indocumentado.nombre_beneficiario, indocumentado.nroasociados, indocumentado.observaciones, indocumentado.otra_org, indocumentado.otro_salud, indocumentado.pertenece_otra, indocumentado.posee_eps, indocumentado.sexo, indocumentado.tallaChaleco, indocumentado.telefono, indocumentado.tiempo_reciclaje, indocumentado.tipo_doc, indocumentado.tipo_vivienda
    ]);

    const handleNombre = (e) => {
        if (e.target.value.length < 4) {
            setClassNombre("form-control is-invalid")
        } else {
            setClassNombre("form-control is-valid")
        }
        setNombreBeneficiario({ valor: e.target.value, rojo: '' });
    }

    const handleDocumento = (e) => {
        if (e.target.value.length < 4) {
            setClassDocumento("form-control is-invalid")
        } else {
            setClassDocumento("form-control is-valid")
        }
        setDoc({ valor: e.target.value, rojo: '' });
    }

    const handleLugarExpedicion = (e) => {
        if (e.target.value.length < 4) {
            setClassLugarExpedicion("form-control is-invalid")
        } else {
            setClassLugarExpedicion("form-control is-valid")
        }
        setLugarExpedicion({ valor: e.target.value, rojo: '' })
    }

    const handleLugarNacimiento = (e) => {
        if (e.target.value.length < 4) {
            setClassLugarNacimiento("form-control is-invalid")
        } else {
            setClassLugarNacimiento("form-control is-valid")
        }
        setLugarNacimiento({ valor: e.target.value, rojo: '' })
    }

    const handleNacionalidad = (e) => {
        if (e.target.value.length < 4) {
            setClassNacionalidad("form-control is-invalid")
        } else {
            setClassNacionalidad("form-control is-valid")
        }
        setNacionalidad({ valor: e.target.value, rojo: '' })
    }

    const handleDireccion = (e) => {
        if (e.target.value.length < 4) {
            setClassDireccion("form-control is-invalid")
        } else {
            setClassDireccion("form-control is-valid")
        }
        setDireccion({ valor: e.target.value, rojo: '' })
    }

    const handleDepartamento = (e) => {
        if (e.target.value.length < 4) {
            setClassDepartamento("form-control is-invalid")
        } else {
            setClassDepartamento("form-control is-valid")
        }
        setDepartamento({ valor: e.target.value, rojo: '' })
    }

    const handleMunicipio = (e) => {
        if (e.target.value.length < 4) {
            setClassMunicipio("form-control is-invalid")
        } else {
            setClassMunicipio("form-control is-valid")
        }
        setMunicipio({ valor: e.target.value, rojo: '' })
    }

    const handleComuna = (e) => {
        if (e.target.value.length < 4) {
            setClassComuna("form-control is-invalid")
        } else {
            setClassComuna("form-control is-valid")
        }
        setComuna({ valor: e.target.value, rojo: '' })
    }

    const handleBarrio = (e) => {
        if (e.target.value.length < 4) {
            setClassBarrio("form-control is-invalid")
        } else {
            setClassBarrio("form-control is-valid")
        }
        setBarrio({ valor: e.target.value, rojo: '' })
    }
    const handleTelefono = (e) => {
        if (e.target.value.length < 4) {
            setClassTelefono("form-control is-invalid")
        } else {
            setClassTelefono("form-control is-valid")
        }
        setTelefono({ valor: e.target.value, rojo: '' })
    }
    const handleEps = (e) => {
        if (e.target.value.length < 4) {
            setClassEps("form-control is-invalid")
        } else {
            setClassEps("form-control is-valid")
        }
        setEPS({ valor: e.target.value, rojo: '' })
    }
    const handleOtroSalud = (e) => {
        if (e.target.value.length < 4) {
            setClassOtroSalud("form-control is-invalid")
        } else {
            setClassOtroSalud("form-control is-valid")
        }
        setOtroSalud({ valor: e.target.value, rojo: '' })
    }
    const handleTiempoDedicado = (e) => {
        if (e.target.value.length < 4) {
            setClassTiempoDedicado("form-control is-invalid")
        } else {
            setClassTiempoDedicado("form-control is-valid")
        }
        setTiempoReciclaje({ valor: e.target.value, rojo: '' })
    }
    const handleHorarios = (e) => {
        if (e.target.value.length < 4) {
            setClassHorarios("form-control is-invalid")
        } else {
            setClassHorarios("form-control is-valid")
        }
        setHorarios({ valor: e.target.value, rojo: '' })
    }
    const handleInicioRuta = (e) => {
        if (e.target.value.length < 4) {
            setClassInicioRuta("form-control is-invalid")
        } else {
            setClassInicioRuta("form-control is-valid")
        }
        setInicioMicroRuta({ valor: e.target.value, rojo: "" })
    }
    const handleFinRuta = (e) => {
        if (e.target.value.length < 4) {
            setClassFinRuta("form-control is-invalid")
        } else {
            setClassFinRuta("form-control is-valid")
        }
        setFinMicroRuta({ valor: e.target.value, rojo: "" })
    }
    const handleObservaciones = (e) => {
        if (e.target.value.length < 4) {
            setClassObservaciones("form-control is-invalid")
        } else {
            setClassObservaciones("form-control is-valid")
        }
        setObservaciones({ valor: e.target.value, rojo: '' })
    }
    const handleDescripcion = (e) => {
        if (e.target.value.length < 4) {
            setClassDescripcion("form-control is-invalid")
        } else {
            setClassDescripcion("form-control is-valid")
        }
        setDescripcionMicroRuta({ valor: e.target.value, rojo: "" })
    }

    const verficarRecuperador = async (id) => {
        const recuperadorCollectionRef = collection(db, "recuperadores");
        const q = query(recuperadorCollectionRef, where("documento", "==", id), where("tipo_doc", "==", tipo_doc.valor));
        const querySnapshot = await getDocs(q);
        const temporal = querySnapshot.docs.map((doc) => {
            return (doc.id)
        });
        return temporal;
    }

    const navegarConsultarIndocumentado = async () => {
        await navigate("../app/consultarindocumentado");
    }

    const crearDocumentado = async () => {
        setBtnIngresoDisable(true);
        await createRecuperadorWithoutReload(bodega.valor, fecha_registro.valor, nombre_beneficiario.valor, tipo_doc.valor, documento.valor, fecha_expedicion.valor, lugar_expedicion.valor, sexo.valor, fecha_nacimiento.valor, lugar_nacimiento.valor, nacionalidad.valor, RH.valor, direccion.valor, departamento.valor, municipio.valor, comuna.valor, barrio.valor, telefono.valor, SISBEN.valor, posee_eps.valor, EPS.valor, otro_salud.valor, tipo_vivienda.valor, escolaridad.valor, estado_civil.valor, nomAsociados, numAsociados, dias_dedicados, nombredias_dedicados, tiempo_reciclaje.valor, horarios.valor, municipioRuta.valor, macroruta.valor, inicioMicroRuta.valor, finMicroRuta.valor, codigoMicroRuta.valor, descripcionMicroRuta.valor, pertenece_otra.valor, otra_org.valor, boolSisben.valor, boolEps.valor, tallaChaleco.valor, observaciones.valor, boolDocumentosPendientes);
        // borra la info del indocumentado, cuando este pasa a ser documentado
        await deleteIndocumentado(id);
        await navegarConsultarIndocumentado();
    };

    const intermedia = async () => {
        if (documento.valor === undefined) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Complete los campos",
            });
        } else if (tipo_doc.valor === undefined) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Complete los campos",
            });
        } else {
            await verficarRecuperador(documento.valor).then((dato) => {
                if (dato.length >= 1) {
                    Swal.fire({
                        icon: "error",
                        title: "Documento ya existe",
                        text: "El recuperador con el documento " + tipo_doc.valor + " " + documento.valor + " ya existe",
                    });
                } else {
                    verificarDocumentado()
                }
            })
        }


    }



    const verificarDocumentado = async () => {

        const inputs = [
            { value: bodega.valor, set: setTipoBodega },
            { value: fecha_registro.valor, set: setFechaRegistro },
            { value: nombre_beneficiario.valor, set: setNombreBeneficiario },
            { value: tipo_doc.valor, set: setTipoDoc },
            { value: documento.valor, set: setDoc },
            { value: fecha_expedicion.valor, set: setFechaExpedicion },
            { value: lugar_expedicion.valor, set: setLugarExpedicion },
            { value: sexo.valor, set: setSexo },
            { value: fecha_nacimiento.valor, set: setFechaNacimiento },
            { value: lugar_nacimiento.valor, set: setLugarNacimiento },
            { value: nacionalidad.valor, set: setNacionalidad },
            { value: RH.valor, set: setRH },
            { value: direccion.valor, set: setDireccion },
            { value: departamento.valor, set: setDepartamento },
            { value: municipio.valor, set: setMunicipio },
            { value: comuna.valor, set: setComuna },
            { value: barrio.valor, set: setBarrio },
            { value: telefono.valor, set: setTelefono },
            { value: SISBEN.valor, set: setSISBEN },
            { value: posee_eps.valor, set: setPoseeEPS },
            { value: otro_salud.valor, set: setOtroSalud },
            { value: tipo_vivienda.valor, set: setTipoVivienda },
            { value: escolaridad.valor, set: setEscolaridad },
            { value: estado_civil.valor, set: setEstadoCivil },
            { value: tiempo_reciclaje.valor, set: setTiempoReciclaje },
            { value: horarios.valor, set: setHorarios },
            { value: macroruta.valor, set: setMacroruta },
            { value: pertenece_otra.valor, set: setPerteneceOtra },
            { value: boolSisben.valor, set: setBoolSisben },
            { value: boolEps.valor, set: setBoolEps },
            { value: tallaChaleco.valor, set: setTalla },
            { value: observaciones.valor, set: setObservaciones },
            { value: municipioRuta.valor, set: setMunicipioRuta },
            { value: inicioMicroRuta.valor, set: setInicioMicroRuta },
            { value: finMicroRuta.valor, set: setFinMicroRuta },
            { value: descripcionMicroRuta.valor, set: setDescripcionMicroRuta }
        ];


        let hasEmptyInputs = false;
        let hasEmptyFiles = false;
        let hasEmptyFoto = false;
        let hasEmptyCc = false;
        let hasEmptyServicios = false;
        let valid = true;
        for (const input of inputs) {
            if (input.value === '' || input.value === 'mm/dd/yyyy') {
                input.set({ valor: input.value, rojo: '1px ridge red' });
                hasEmptyInputs = true;
            }
        }
        if (pertenece_otra.valor === '') {
            hasEmptyInputs = true;
            setPerteneceOtra({ valor: pertenece_otra.valor, rojo: 'red' });
        }
        if (boolSisben.valor === '') {
            hasEmptyInputs = true;
            setBoolSisben({ valor: boolSisben.valor, rojo: 'red' });
        }
        if (boolEps.valor === '') {
            hasEmptyInputs = true;
            setBoolEps({ valor: boolEps.valor, rojo: 'red' });
        }

        if (nomAsociados.includes("")) {
            hasEmptyInputs = true;
            setColorNombres('1px ridge red')
        }

        if (pertenece_otra.valor === 'si' && otra_org.valor === '') {
            hasEmptyInputs = true;
            setOtraOrg({ valor: otra_org.valor, rojo: '1px ridge red' });
        }

        if (posee_eps.valor === 'si' && EPS.valor === '') {
            hasEmptyInputs = true;
            setEPS({ valor: EPS.valor, rojo: '1px ridge red' });
        }


        if (dias_dedicados.length === 0) {
            hasEmptyInputs = true;
            setColorDiasDedicados('red');
        }

        if (selectedFileFoto.valor === "") {
            setBoolDocumentosPendientes(true);
            setSelectedFileFoto({ valor: "", rojo: '1px ridge red' });
            hasEmptyFiles = true;
            hasEmptyFoto = true;
        }
        if (selectedFileCopiaCC.valor === "") {
            setBoolDocumentosPendientes(true);
            setSelectedFileCopiaCC({ valor: "", rojo: '1px ridge red' });
            hasEmptyFiles = true;
            hasEmptyCc = true;
        }
        if (selectedFileCuentaServicios.valor === "") {
            setBoolDocumentosPendientes(true);
            setSelectedFileCuentaServicios({ valor: "", rojo: '1px ridge red' });
            hasEmptyFiles = true;
            hasEmptyServicios = true;
        }


        if (hasEmptyInputs) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Complete los campos",
            });
        } else if (hasEmptyFiles) {
            Swal.fire({
                title: 'Subir con Documentos Faltantes',
                text: "No se ha subido algún documento requerido(Foto,Copia CC,Cuenta servicios)",
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: 'Aceptar',
                denyButtonText: 'Cancelar',
                reverseButtons: true
            }).then((result) => {
                // if (result.isConfirmed) {
                //     setBtnIngresoDisable(true);
                //     crearDocumentado();
                //     if (!hasEmptyFoto) {
                //         uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
                //     }
                //     if (!hasEmptyCc) {
                //         uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor);
                //     }
                //     if (!hasEmptyServicios) {
                //         uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
                //     }
                //     // prueba();
                // }
            })
        }
        else {


            if (documento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un documento valido, minima longitud: 4',
                });
            }
            if (nombre_beneficiario.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un nombre valido, minima longitud: 4',
                });
            }
            if (lugar_nacimiento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un lugar de nacimiento valido, minima longitud: 4',
                });
            }
            if (lugar_expedicion.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un lugar de expedicion valido, minima longitud: 4',
                });
            }
            if (nacionalidad.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una nacionalidad valida, minima longitud: 4',
                });
            }
            if (direccion.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una dirección valida, minima longitud: 4',
                });
            }
            if (departamento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un departamento valido, minima longitud: 4',
                });
            }
            if (municipio.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un municipio valido, minima longitud: 4',
                });
            }
            if (comuna.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una comuna valida, minima longitud: 4',
                });
            }
            if (barrio.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un barrio valido, minima longitud: 4',
                });
            }
            if (telefono.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un telefono valido, minima longitud: 4',
                });
            }
            if (EPS.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una Eps valida, minima longitud: 4',
                });
            }
            if (otro_salud.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese "Otra Salud" valida, minima longitud: 4',
                });
            }
            if (tiempo_reciclaje.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un tiempo de reciclaje valido, minima longitud: 4',
                });
            }
            if (horarios.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un horario valido, minima longitud: 4',
                });
            }
            if (inicioMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un incio de ruta valido, minima longitud: 4',
                });
            }
            if (finMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un fin de ruta valido, minima longitud: 4',
                });
            }
            if (observaciones.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese observaciones validas, minima longitud: 4',
                });
            }
            if (descripcionMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una descripcion valida, minima longitud: 4',
                });
            }


            if (valid) {
                setBtnIngresoDisable(true);
                crearDocumentado();
                uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
                uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor)
                uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
            }

        }
    };


    getDownloadURL(refenciaFoto)
        .then((url) => {
            setCopiaFoto(url);
            setShowFoto(true);
        }).catch((error) => {
            setShowFoto(false);
        });


    const handleCheckboxChange = (event, number) => {
        setColorDiasDedicados('');
        const { value } = event.target;
        const newArray = [...dias_dedicados];
        if (event.target.checked) {
            newArray[number] = true;
            setNombreDiasDedicados((prevSelectedDays) => [...prevSelectedDays, value]);
        } else {
            newArray[number] = false;
            setNombreDiasDedicados((prevSelectedDays) =>
                prevSelectedDays.filter((day) => day !== value)
            );
        }
        setDiasDedicados(newArray);
    };


    const handleNumInputsChange = (event) => {
        const num = parseInt(event.target.value) || 0;
        setColorNombres('');
        if (num > 10) {
            setNumAsociados(10);
        } else {
            setNumAsociados(num);
        }
        setNombresAsociados(Array(num).fill(""));
    };

    // const changeNumRutas = (opcion) => {
    //     setColorNombres('');
    //     if (opcion === "up") {
    //         if (numRutas >= 10) {
    //             setNumRutas(10);
    //         } else {
    //             setNumRutas(numRutas + 1);
    //         }
    //     } else if (opcion === "down") {
    //         if (numRutas <= 0) {
    //             setNumRutas(0);
    //         } else {
    //             setNumRutas(numRutas - 1);
    //         }
    //     }
    //     setNombreRutas(Array(numRutas).fill(""));
    // };

    const handleInputChange = (event, index) => {
        const newInputValues = [...nomAsociados];
        newInputValues[index] = event.target.value;
        setNombresAsociados(newInputValues);
    };

    // const handleInputRutas = (event, index) => {
    //     const newInputValueRutas = [...nomRutas];
    //     newInputValueRutas[index] = event.target.value;
    //     setNombreRutas(newInputValueRutas);
    // };

    const inputFields = [];
    for (let i = 0; i < numAsociados; i++) {
        inputFields.push(
            <input
                key={i}
                type="text"
                value={nomAsociados[i]}
                onChange={(e) => {
                    handleInputChange(e, i);
                    setColorNombres('');
                }}
                className='form-control my-1'
                style={{ border: colorNombres }}
            />
        );
    }

    // const inputRutas = [];
    // for (let i = 0; i < numRutas; i++) {
    //     inputRutas.push(
    //         <input
    //             key={"rutas" + i}
    //             type="text"
    //             value={nomRutas[i]}
    //             onChange={(e) => {
    //                 handleInputRutas(e, i);
    //                 setColorNombres('');
    //             }}
    //             className='col-8 my-1'
    //             style={{ border: colorNombres }}
    //         />
    //     );
    // }

    const opcionesBodega = nombreEcas.map((eca) => (
        { ...{ value: eca[0], label: eca[0] } }

    ))


    const actualizarIndocumentado = async () => {
        setBtnIngresoDisable(true);
        await updateIndocumentado(id, indocumentado, bodega.valor, fecha_registro.valor, nombre_beneficiario.valor,
            // tipo_doc.valor, documento.valor, fecha_expedicion.valor, lugar_expedicion.valor, 
            sexo.valor,
            // fecha_nacimiento.valor, 
            lugar_nacimiento.valor, nacionalidad.valor, RH.valor, direccion.valor, departamento.valor, municipio.valor, comuna.valor, barrio.valor, telefono.valor,
            // SISBEN.valor, posee_eps.valor, EPS.valor, otro_salud.valor, 
            tipo_vivienda.valor, escolaridad.valor, estado_civil.valor, nomAsociados, numAsociados, dias_dedicados, nombredias_dedicados, tiempo_reciclaje.valor, horarios.valor, municipioRuta.valor, macroruta.valor, inicioMicroRuta.valor, finMicroRuta.valor,
            codigoMicroRuta.valor, descripcionMicroRuta.valor, pertenece_otra.valor, otra_org.valor,
            // boolSisben.valor, boolEps.valor,
            tallaChaleco.valor, observaciones.valor
            // boolDocumentosPendientes
        );


    };

    const verificarIndocumentado = () => {
        const inputs = [
            { value: bodega.valor, set: setTipoBodega },
            { value: fecha_registro.valor, set: setFechaRegistro },
            { value: nombre_beneficiario.valor, set: setNombreBeneficiario },
            // { value: tipo_doc.valor, set: setTipoDoc },
            // { value: documento.valor, set: setDoc },
            // { value: fecha_expedicion.valor, set: setFechaExpedicion },
            // { value: lugar_expedicion.valor, set: setLugarExpedicion },
            { value: sexo.valor, set: setSexo },
            { value: fecha_nacimiento.valor, set: setFechaNacimiento },
            { value: lugar_nacimiento.valor, set: setLugarNacimiento },
            { value: nacionalidad.valor, set: setNacionalidad },
            { value: RH.valor, set: setRH },
            { value: direccion.valor, set: setDireccion },
            { value: departamento.valor, set: setDepartamento },
            { value: municipio.valor, set: setMunicipio },
            { value: comuna.valor, set: setComuna },
            { value: barrio.valor, set: setBarrio },
            { value: telefono.valor, set: setTelefono },
            // { value: SISBEN.valor, set: setSISBEN },
            // { value: posee_eps.valor, set: setPoseeEPS },
            // { value: otro_salud.valor, set: setOtroSalud },
            { value: tipo_vivienda.valor, set: setTipoVivienda },
            { value: escolaridad.valor, set: setEscolaridad },
            { value: estado_civil.valor, set: setEstadoCivil },
            { value: tiempo_reciclaje.valor, set: setTiempoReciclaje },
            { value: horarios.valor, set: setHorarios },
            { value: macroruta.valor, set: setMacroruta },
            { value: pertenece_otra.valor, set: setPerteneceOtra },
            // { value: boolSisben.valor, set: setBoolSisben },
            // { value: boolEps.valor, set: setBoolEps },
            { value: tallaChaleco.valor, set: setTalla },
            { value: observaciones.valor, set: setObservaciones },
            { value: inicioMicroRuta.valor, set: setInicioMicroRuta },
            { value: finMicroRuta.valor, set: setFinMicroRuta },
            { value: descripcionMicroRuta.valor, set: setDescripcionMicroRuta }
        ];

        let hasEmptyInputs = false;
        let hasEmptyFiles = false;
        let hasEmptyFoto = false;
        let valid = true;
        for (const input of inputs) {
            if (input.value === '' || input.value === 'mm/dd/yyyy') {
                input.set({ valor: input.value, rojo: '1px ridge red' });
                hasEmptyInputs = true;
            }
        }
        if (pertenece_otra.valor === '') {
            hasEmptyInputs = true;
            setPerteneceOtra({ valor: pertenece_otra.valor, rojo: 'red' });
        }
        if (boolSisben.valor === '') {
            hasEmptyInputs = true;
            setBoolSisben({ valor: boolSisben.valor, rojo: 'red' });
        }
        if (boolEps.valor === '') {
            hasEmptyInputs = true;
            setBoolEps({ valor: boolEps.valor, rojo: 'red' });
        }

        if (nomAsociados.includes("")) {
            hasEmptyInputs = true;
            setColorNombres('1px ridge red')
        }

        if (pertenece_otra.valor === 'si' && otra_org.valor === '') {
            hasEmptyInputs = true;
            setOtraOrg({ valor: otra_org.valor, rojo: '1px ridge red' });
        }

        if (posee_eps.valor === 'si' && EPS.valor === '') {
            hasEmptyInputs = true;
            setEPS({ valor: EPS.valor, rojo: '1px ridge red' });
        }


        if (dias_dedicados.length === 0) {
            hasEmptyInputs = true;
            setColorDiasDedicados('red');
        }

        if (selectedFileFoto.valor === "") {
            setBoolDocumentosPendientes(true);
            setSelectedFileFoto({ valor: "", rojo: '1px ridge red' });
            hasEmptyFiles = true;
            hasEmptyFoto = true;
        }

        if (hasEmptyInputs) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Complete los campos",
            });
        } else if (hasEmptyFiles) {
            if (nombre_beneficiario.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un nombre valido, minima longitud: 4',
                });
            }
            if (lugar_nacimiento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un lugar de nacimiento valido, minima longitud: 4',
                });
            }
            if (nacionalidad.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una nacionalidad valida, minima longitud: 4',
                });
            }
            if (direccion.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una dirección valida, minima longitud: 4',
                });
            }
            if (departamento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un departamento valido, minima longitud: 4',
                });
            }
            if (municipio.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un municipio valido, minima longitud: 4',
                });
            }
            if (comuna.valor.length < 1) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una comuna valida, minima longitud: 4',
                });
            }
            if (barrio.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un barrio valido, minima longitud: 4',
                });
            }
            if (telefono.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un telefono valido, minima longitud: 4',
                });
            }
            if (tiempo_reciclaje.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un tiempo de reciclaje valido, minima longitud: 4',
                });
            }
            if (horarios.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un horario valido, minima longitud: 4',
                });
            }
            if (inicioMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un incio de ruta valido, minima longitud: 4',
                });
            }
            if (finMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un fin de ruta valido, minima longitud: 4',
                });
            }
            if (observaciones.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese observaciones validas, minima longitud: 4',
                });
            }
            if (descripcionMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una descripcion valida, minima longitud: 4',
                });
            }
            if (valid) {
                Swal.fire({
                    title: 'Subir con Documentos Faltantes',
                    text: "No se ha subido algún documento requerido(Foto,Copia CC,Cuenta servicios) \n ¿Subir recuperador sin documento completos?",
                    icon: 'warning',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        setBtnIngresoDisable(true);
                        actualizarIndocumentado();
                        // if (!hasEmptyFoto) {
                        //     uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
                        // }
                        // if (!hasEmptyCc) {
                        //     uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor);
                        // }
                        // if (!hasEmptyServicios) {
                        //     uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
                        // }
                    }
                })
            }
        }
        else {
            if (nombre_beneficiario.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un nombre valido, minima longitud: 4',
                });
            }
            if (lugar_nacimiento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un lugar de nacimiento valido, minima longitud: 4',
                });
            }
            if (nacionalidad.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una nacionalidad valida, minima longitud: 4',
                });
            }
            if (direccion.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una dirección valida, minima longitud: 4',
                });
            }
            if (departamento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un departamento valido, minima longitud: 4',
                });
            }
            if (municipio.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un municipio valido, minima longitud: 4',
                });
            }
            if (comuna.valor.length < 1) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una comuna valida, minima longitud: 4',
                });
            }
            if (barrio.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un barrio valido, minima longitud: 4',
                });
            }
            if (telefono.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un telefono valido, minima longitud: 4',
                });
            }
            if (tiempo_reciclaje.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un tiempo de reciclaje valido, minima longitud: 4',
                });
            }
            if (horarios.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un horario valido, minima longitud: 4',
                });
            }
            if (inicioMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un incio de ruta valido, minima longitud: 4',
                });
            }
            if (finMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un fin de ruta valido, minima longitud: 4',
                });
            }
            if (observaciones.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese observaciones validas, minima longitud: 4',
                });
            }
            if (descripcionMicroRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una descripcion valida, minima longitud: 4',
                });
            }
            if (valid) {
                setBtnIngresoDisable(true);
                actualizarIndocumentado();
            }
            // uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor)
            // uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor)
            // uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor)
        }
    };


    return (
        <div className='container-fluid contenido-ingresar-usuario'>
            <div className='row'>
                <div className='header'>
                    <h1>Editar indocumentado</h1>
                </div>
            </div>




            <div className='formulario-ingresar-usuario'>
                <form action="">
                    <div className='row justify-content-center my-md-3 campo-bodega '>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-3 lbl-registro-recuperador' htmlFor='bodega'>Bodega</label>
                        <Select type="text" isDisabled={read} className="col-xl-3 col-md-5 col-sm-5 col-10 " options={opcionesBodega} defaultValue={{ value: location.state.bodega, label: location.state.bodega }} onChange={(e) => { setTipoBodega(e.value) }}></Select>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-fecha-registro'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador text-truncate' htmlFor='fecha-registro'>Fecha registro</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className='form-control' type="date" id='fecha-registro' defaultValue={fecha_registro.valor} onChange={e => { setFechaRegistro({ valor: e.target.value, rojo: '' }) }} style={{ border: fecha_registro.rojo }} readOnly={read} />
                        </div>
                    </div>

                    <div className='row campo-nombre-recuperador mb-md-4 justify-content-center'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10  lbl-registro-recuperador ' htmlFor='nombre-recuperador'>Nombre del beneficiario</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classNombre} type='text' id='nombre-recuperador' onChange={e => { handleNombre(e) }} defaultValue={nombre_beneficiario.valor} style={{ border: nombre_beneficiario.rojo }} readOnly={read} />
                            <div id="nombre-recuperador" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <div className='row campo-codigo-indocumentado mb-md-4 justify-content-center'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10  lbl-registro-recuperador ' htmlFor='codigo-indocumentado'>Codigo de ID</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className='form-control' type='text' id='codigo-indocumentado' defaultValue={codigoId} style={{ border: nombre_beneficiario.rojo }} readOnly={true} />
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-documento' hidden={hide}>
                        <div className='col-xl-6 col-md-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="tipo">Tipo documento</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <select className='form-select' name='tipo-documento' id='tipo' onChange={e => { setTipoDoc({ valor: e.target.value, rojo: '' }) }} value={tipo_doc.valor} style={{ border: tipo_doc.rojo }} disabled={read}>
                                        <option value=''>Selecciona...</option>
                                        <option value='cc'>Cedula de ciudadanía</option>
                                        <option value='ce'>Cedula de extranjería</option>
                                        <option value='pas'>Pasaporte</option>
                                        <option value='ti'>Tarjeta de identidad</option>
                                        <option value='rc'>Registro civil</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className='col-xl-6 col-md-12 col-12' hidden={hide}>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="nro-di">Numero documento</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10 '>
                                    <input className={classDocumento} type="text" id="nro-id" onChange={e => { handleDocumento(e) }} defaultValue={documento.valor} style={{ border: documento.rojo }} readOnly={read} />
                                    <div id="nro-id" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center mb-md-4 id-expedicion' hidden={hide}>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='fecha-expedicion'>Fecha de expedición</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className='form-control' type='date' id='fecha-expedicion' onChange={e => { setFechaExpedicion({ valor: e.target.value, rojo: '' }) }} defaultValue={fecha_expedicion.valor} style={{ border: fecha_expedicion.rojo }} readOnly={read} />
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='lugar-expedicion'>Lugar de expedición</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classLugarExpedicion} id='lugar-expedicion' onChange={e => { handleLugarExpedicion(e) }} defaultValue={lugar_expedicion.valor} style={{ border: lugar_expedicion.rojo }} readOnly={read} />
                                    <div id="lugar-expedicion" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row justify-content-center my-md-4 campo-sexo'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-sexo'>Sexo</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <select className='form-select' type='text' id='ingreso-sexo' onChange={e => { setSexo({ valor: e.target.value, rojo: '' }) }} value={sexo.valor} style={{ border: sexo.rojo }} disabled={read}>
                                <option value=''>Selecciona...</option>
                                <option value='m'>Masculino</option>
                                <option value='f'>Femenino</option>
                                <option value='o'>Otro</option>
                            </select>
                        </div>
                    </div>


                    <div className='row justify-content-center my-md-3 campo-nacimiento'>
                        <div className='col-xl-6 col-md-12 col-12' hidden={hide}>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='fecha-nacimiento-recuperador'>Fecha de nacimiento</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10' >
                                    <input className='form-control' type='date' id='fecha-nacimiento-recuperador' onChange={e => { setFechaNacimiento({ valor: e.target.value, rojo: '' }) }} defaultValue={fecha_nacimiento.valor} style={{ border: fecha_nacimiento.rojo }} readOnly={read} />
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-lugar-nacimiento'>Lugar de nacimiento</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classLugarNacimiento} type='text' id='ingreso-lugar-nacimiento' onChange={e => { handleLugarNacimiento(e) }} defaultValue={lugar_nacimiento.valor} style={{ border: lugar_nacimiento.rojo }} readOnly={read} />
                                    <div id="ingreso-lugar-nacimiento" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row justify-content-center mb-md-4 campo-nacio-rh'>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-nacionalidad'>Nacionalidad</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classNacionalidad} type='text' id='ingreso-nacionalidad' onChange={e => { handleNacionalidad(e) }} defaultValue={nacionalidad.valor} style={{ border: nacionalidad.rojo }} readOnly={read} />
                                    <div id="ingreso-nacionalidad" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='rh'>RH</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <select className='form-select' name='select' id='rh' value={RH.valor} onChange={e => { setRH({ valor: e.target.value, rojo: '' }) }} style={{ border: RH.rojo }} disabled={read}>
                                        <option value=''>Selecciona...</option>
                                        <option value='aPos'>A+</option>
                                        <option value='bPos'>B+</option>
                                        <option value='abPos'>AB+</option>
                                        <option value='oPos'>O+</option>
                                        <option value='aNeg'>A-</option>
                                        <option value='bNeg'>B-</option>
                                        <option value='abNeg'>AB-</option>
                                        <option value='oNeg'>O-</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row justify-content-center mb-md-4 campo-direccion'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-direccion'>Dirección</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classDireccion} type='text' id='ingreso-direccion' onChange={e => { handleDireccion(e) }} defaultValue={direccion.valor} style={{ border: direccion.rojo }} readOnly={read} />
                            <div id="ingreso-direccion" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-departamento-municipio'>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-departamento'>Departamento</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classDepartamento} type='text' id='ingreso-departamento' onChange={e => { handleDepartamento(e) }} defaultValue={departamento.valor} style={{ border: departamento.rojo }} readOnly={read} />
                                    <div id="ingreso-departamento" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-municipio'>Municipio</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classMunicipio} type='text' id='ingreso-municipio' onChange={e => { handleMunicipio(e) }} defaultValue={municipio.valor} style={{ border: municipio.rojo }} readOnly={read} />
                                    <div id="ingreso-municipio" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>

                    {/* las comunas van a se una selección o un texto para ingresar?? */}
                    <div className='row justify-content-center mb-md-4 campo-comuna-barrio'>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-comuna'>Comuna</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classComuna} type='text' id='ingreso-comuna' onChange={e => { handleComuna(e) }} defaultValue={comuna.valor} style={{ border: comuna.rojo }} readOnly={read} />
                                    <div id="ingreso-comuna" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-barrio'>Barrio</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classBarrio} type='text' id='ingreso-barrio' onChange={e => { handleBarrio(e) }} defaultValue={barrio.valor} style={{ border: barrio.rojo }} readOnly={read} />
                                    <div id="ingreso-barrio" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='row justify-content-center my-md-3 campo-telefono'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-telefono'>Telefono</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classTelefono} type='text' id='ingreso-telefono' onChange={e => { handleTelefono(e) }} defaultValue={telefono.valor} style={{ border: telefono.rojo }} readOnly={read} />
                            <div id="ingreso-telefono" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>
                    {/* vamos a poner celular ?? */}
                    <div>
                        <hr className='my-xl-5' />
                    </div>

                    <div className='row justify-content-center mb-md-4 campo-sisben' hidden={hide}>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-sisben'>SISBÉN</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <select className='form-select' type='text' id='ingreso-sisben' onChange={e => { setSISBEN({ valor: e.target.value, rojo: '' }) }} value={SISBEN.valor} style={{ border: SISBEN.rojo }} disabled={read}>
                                <option value=''>Selecciona...</option>
                                <option value='no'>No tiene</option>
                                <option value='a'>Clase A</option>
                                <option value='b'>Clase B</option>
                                <option value='c'>Clase C</option>
                                <option value='d'>Clase D</option>
                            </select>
                        </div>
                    </div>

                    <div className='row justify-content-center mb-md-4 campo-eps' hidden={hide}>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='posee-eps'>Posee EPS</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <select className='form-select' name='select' id='posee-eps' onChange={e => {
                                        setPoseeEPS({ valor: e.target.value, rojo: '' });
                                        if (e.target.value === "si") {
                                            setDisEPS(false);
                                            setEPS({ valor: "", rojo: "" });
                                        } else {
                                            setDisEPS(true);
                                            setEPS({ valor: "", rojo: "" });
                                        }
                                    }} value={posee_eps.valor} style={{ border: posee_eps.rojo }} disabled={read}>
                                        <option value=''>Selecciona...</option>
                                        <option value='si'>Si</option>
                                        <option value='no'>No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-eps'>EPS</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <input className={classEps} type='text' id='ingreso-eps' disabled={EPSdis} value={EPS.valor} onChange={e => { handleEps(e) }} style={{ border: EPS.rojo }} readOnly={read} />
                                    <div id="ingreso-eps" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className='row justify-content-center my-md-3 campo-otro-salud' hidden={hide}>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-otro-salud'>Otro sistema de salud</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classOtroSalud} type='text' id='ingreso-otro-salud' onChange={e => { handleOtroSalud(e) }} defaultValue={otro_salud.valor} style={{ border: otro_salud.rojo }} readOnly={read} />
                            <div id="ingreso-otro-salud" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-tipo-vivienda'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='tipo-vivienda'>Tipo de vivienda</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <select className='form-select' name='select' id='tipo-vivienda' onChange={e => { setTipoVivienda({ valor: e.target.value, rojo: '' }) }} value={tipo_vivienda.valor} style={{ border: tipo_vivienda.rojo }} disabled={read}>
                                <option value=''>Selecciona...</option>
                                <option value='propia'>Propia</option>
                                <option value='arrendada'>Arrendada</option>
                                <option value='familiar'>Familiar</option>
                                <option value='na'>NA</option>
                            </select>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-4 campo-escolaridad-estadocivil'>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-escolaridad'>Escolaridad</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <select className='form-select' name='select' id='ingreso-escolaridad' onChange={e => { setEscolaridad({ valor: e.target.value, rojo: '' }) }} value={escolaridad.valor} style={{ border: escolaridad.rojo }} disabled={read}>
                                        <option value=''>Selecciona...</option>
                                        <option value='nan'>Ninguna</option>
                                        <option value='basicaprimaria'>Basica primaria</option>
                                        <option value='basicasecundaria'>Basica secundaria</option>
                                        <option value='educacionmedia'>Educación media</option>
                                        <option value='tecnicaprofesional'>Técnica profesional</option>
                                        <option value='educaciontecnologica'>Educación tecnologica</option>
                                        <option value='educacionuniversitaira'>Educación universitaria</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-6 col-md-12 col-12'>
                            <div className='row justify-content-center my-2'>
                                <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-estado-civil'>Estado civil</label>
                                <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                    <select className='form-select' name='select' id='ingreso-estado-civil' onChange={e => { setEstadoCivil({ valor: e.target.value, rojo: '' }) }} value={estado_civil.valor} style={{ border: estado_civil.rojo }} disabled={read}>
                                        <option value=''>Selecciona...</option>
                                        <option value='solt'>Solter@</option>
                                        <option value='casado'>Casad@</option>
                                        <option value='unionlibre'>Union Libre</option>
                                        <option value='divorciado'>Divorciad@</option>
                                        <option value='viudo'>Viudo@</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* La puse como opcion, en mockup esta texto */}

                    <div className='row justify-content-center my-md-3 campo-personas-cargo'>
                        <label className='col-xl-4 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-nro-personas-cargo'>Nro. Personas a cargo</label>
                        <div className='col-xl-4 col-md-5 col-sm-5 col-10'>
                            <input className='form-control' type='number' id='ingreso-nro-personas-cargo'
                                min="0"
                                max="10"
                                value={numAsociados}
                                onChange={handleNumInputsChange}
                                readOnly={read} />
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-nombre-personas-cargo'>
                        <label className='col-xl-12 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor=''>Nombres personas a cargo</label>
                        <div className='col-8 my-1' id="input_fields">{inputFields}</div>
                    </div>

                    <hr className='my-xl-5' />
                    <div className='row justify-content-center my-md-3 campo-dias-actividad'>
                        <label className='lbl-registro-recuperador' htmlFor='ingreso-dias-actividad' style={{ color: colordias_dedicados }}>Días dedicados a la actividad</label>
                        <div className="weekDays-selector">
                            <input type="checkbox" id="weekday-mon" className="weekday" value="lunes" onChange={(e) => { handleCheckboxChange(e, 0) }} />
                            <label htmlFor="weekday-mon" className='mx-1'>L</label>
                            <input type="checkbox" id="weekday-tue" className="weekday" value="martes" onChange={(e) => { handleCheckboxChange(e, 1) }} />
                            <label htmlFor="weekday-tue" className='mx-1'>M</label>
                            <input type="checkbox" id="weekday-wed" className="weekday" value="miercoles" onChange={(e) => { handleCheckboxChange(e, 2) }} />
                            <label htmlFor="weekday-wed" className='mx-1'>M</label>
                            <input type="checkbox" id="weekday-thu" className="weekday" value="jueves" onChange={(e) => { handleCheckboxChange(e, 3) }} />
                            <label htmlFor="weekday-thu" className='mx-1'>J</label>
                            <input type="checkbox" id="weekday-fri" className="weekday" value="viernes" onChange={(e) => { handleCheckboxChange(e, 4) }} />
                            <label htmlFor="weekday-fri" className='mx-1'>V</label>
                            <input type="checkbox" id="weekday-sat" className="weekday" value="sabado" onChange={(e) => { handleCheckboxChange(e, 5) }} />
                            <label htmlFor="weekday-sat" className='mx-1'>S</label>
                            <input type="checkbox" id="weekday-sun" className="weekday" value="domingo" onChange={(e) => { handleCheckboxChange(e, 6) }} />
                            <label htmlFor="weekday-sun" className='mx-1'>D</label>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-tiempo-reciclaje'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-tiempo-actividad'>Tiempo dedicado al reciclaje</label>
                        <div className='col-xl-3 col-md-5 col-sm-4 col-10'>
                            <input className={classTiempoDedicado} type='text' id='ingreso-tiempo-actividad' onChange={e => { handleTiempoDedicado(e) }} defaultValue={tiempo_reciclaje.valor} style={{ border: tiempo_reciclaje.rojo }} readOnly={read} />
                            <div id="ingreso-tiempo-actividad" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-horarios'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-horario'>Horarios</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classHorarios} type='text' id='ingreso-horario' onChange={e => { handleHorarios(e) }} defaultValue={horarios.valor} style={{ border: horarios.rojo }} readOnly={read} />
                            <div id="ingreso-horario" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-rutas-recoleccion'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-ruta'>Municipio de Recoleccion</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-12'>
                            <select className='form-select' name='select' value={municipioRuta.valor} id='ingreso-ruta-chaleco' onChange={e => {
                                setMunicipioRuta({ valor: e.target.value, rojo: '' })
                                if (e.target.value === "Medellín") {
                                    setBoolComunaM(false);
                                    setBoolComunaB(true);
                                } else if (e.target.value === "Bello") {
                                    setBoolComunaB(false);
                                    setBoolComunaM(true);
                                } else {
                                    setBoolComunaM(true);
                                    setBoolComunaB(true);
                                }
                            }}
                                style={{ border: municipioRuta.rojo }}
                                disabled={read}>
                                <option value=''>Selecciona...</option>
                                <option value="Medellín">Medellín</option>
                                <option value="Bello">Bello</option>
                            </select>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-macrorutas-recoleccion'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-ruta'>Macro-ruta de recolección</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-12'>
                            <select className='form-select' name='select' id='ingreso-ruta-chaleco' onChange={e => { setMacroruta({ valor: e.target.value, rojo: '' }) }} value={macroruta.valor} style={{ border: macroruta.rojo }} hidden={boolComunaM} disabled={read}>
                                <option value="">Seleccionar...</option>
                                <option value="Macro-ruta No.00001M Comuna 1 Popular">1 - Popular</option>
                                <option value="Macro-ruta No.00002M Comuna 2 Santa Cruz">2 - Santa Cruz</option>
                                <option value="Macro-ruta No.00003M Comuna 3 Manrique">3 - Manrique</option>
                                <option value="Macro-ruta No.00004M Comuna 4 Aranjuez">4 - Aranjuez</option>
                                <option value="Macro-ruta No.00005M Comuna 5 Castilla">5 - Castilla</option>
                                <option value="Macro-ruta No.00006M Comuna 6 Doce de Octubre de Octubre">6 - Doce de Octubre</option>
                                <option value="Macro-ruta No.00007M Comuna 7 Robledo">7 - Robledo</option>
                                <option value="Macro-ruta No.00008M Comuna 8 Villa Hermosa Hermosa">8 - Villa Hermosa</option>
                                <option value="Macro-ruta No.00009M Comuna 9 Buenos aires Aires">9 - Buenos Aires</option>
                                <option value="Macro-ruta No.00010M Comuna 10 la Candelaria Candelaria">10 - La Candelaria</option>
                                <option value="Macro-ruta No.00011M Comuna 11 Laureles">11 - Laureles</option>
                                <option value="Macro-ruta No.00012M Comuna 12 La América América">12 - La América</option>
                                <option value="Macro-ruta No.00013M Comuna 13 San Javier Javier">13 - San Javier</option>
                                <option value="Macro-ruta No.00014M Comuna 14 El poblado Poblado">14 - El Poblado</option>
                                <option value="Macro-ruta No.00015M Comuna 15 El Guayabal Guayabal">15 - El Guayabal</option>
                                <option value="Macro-ruta No.00016M Comuna 16 Belen">16 - Belen</option>
                            </select>
                            <select className='form-select' name='select' id='ingreso-ruta-chaleco' onChange={e => { setMacroruta({ valor: e.target.value, rojo: '' }) }} value={macroruta.valor} style={{ border: macroruta.rojo }} hidden={boolComunaB} disabled={read}>
                                <option value="">Seleccionar...</option>
                                <option value="Macro-ruta No.00001B Comuna 1 Paris y 2 La Madera">1 Paris y 2 La Madera</option>
                                <option value="Macro-ruta No.00002B Comuna 3 Santa Ana  y 4 Suarez">3 Santa Ana  y 4 Suarez</option>
                                <option value="Macro-ruta No.00003B Comuna 5 La cumbre y 6 Bellavista">5 La cumbre y 6 Bellavista</option>
                                <option value="Macro-ruta No.00004B Comuna 7 Altos de Niquia y 8 Niquia">7 Altos de Niquia y 8 Niquia</option>
                                <option value="Macro-ruta No.00005B Comuna 9 Fontidueño y 10 Acevedo">9 Fontidueño y 10 Acevedo</option>
                            </select>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-inicio-rutas'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='inicio-ruta'>Inicio ruta</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classInicioRuta} type="text" name="" id="inicio-ruta" defaultValue={inicioMicroRuta.valor} onChange={(e) => { handleInicioRuta(e) }} style={{ border: inicioMicroRuta.rojo }} readOnly={read} />
                            <div id="inicio-ruta" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-fin-rutas'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="fin-ruta">Fin ruta</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classFinRuta} type="text" name="" id="fin-ruta" defaultValue={finMicroRuta.valor} onChange={(e) => { handleFinRuta(e) }} style={{ border: finMicroRuta.rojo }} readOnly={read} />
                            <div id="fin-ruta" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 codigo-rutas'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="codigo-ruta">Codigo micro-ruta</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className='form-control' type="text" name="" id="codigo-ruta" defaultValue={codigoMicroRuta.valor} onChange={(e) => { setCodigoMicroRuta({ valor: e.target.value, rojo: "" }) }} style={{ border: codigoMicroRuta.rojo }} readOnly={read} />
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-descripcion-ruta'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='decripcion-ruta'>Descripcion ruta</label>
                        <textarea className={classDescripcion} name="" id="decripcion-ruta" cols="30" rows="10" onChange={(e) => { handleDescripcion(e) }} defaultValue={descripcionMicroRuta.valor} style={{ border: descripcionMicroRuta.rojo }} readOnly={read} />
                        <div id="decripcion-ruta" className="invalid-feedback">
                            Min. 4 letras
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-otra-organizacion'>
                        <label className='col-xl-4 lbl-registro-recuperador' htmlFor=''>Pertenece a alguna otra organización</label>
                        <div className=' col-xl-3'>
                            <div className='col-xl-6 '>
                                <label className='col-xl-3' htmlFor='si' style={{ color: pertenece_otra.rojo }} >Si</label>
                                <input className='col-xl-3' type='radio' name='tipo-usuario' value='si' id='si' checked={pertenece_otra.valor === "si"} onChange={e => {
                                    setPerteneceOtra({ valor: e.target.value, rojo: '' });
                                    // if (e.target.value === "si") {
                                    setDisOtra(false);
                                    setOtraOrg({ valor: "", rojo: "" });
                                    // } 
                                }} disabled={read} />
                            </div>
                            <div className='col-xl-6 '>
                                <label className='col-xl-3' htmlFor='no' style={{ color: pertenece_otra.rojo }}>No</label>
                                <input className='col-xl-3' type='radio' name='tipo-usuario' value='no' id='no' checked={pertenece_otra.valor === "no"} onChange={e => {
                                    setPerteneceOtra({ valor: e.target.value, rojo: '' });
                                    setDisOtra(true);
                                    setOtraOrg({ valor: "", rojo: "" });
                                }}
                                    disabled={read} />
                            </div>
                        </div>

                    </div>

                    <div className='row justify-content-center my-md-3 campo-nombre-otra-organizacion'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-otra-organización'>¿A cuál?</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className='form-control' type='text' id='ingreso-otra-organización' disabled={disOtra} value={otra_org.valor} onChange={e => { setOtraOrg({ valor: e.target.value, rojo: '' }) }} style={{ border: otra_org.rojo }} readOnly={read} />
                        </div>
                    </div>
                    <div className='row justify-content-center my-md-3 campo-observaciones'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-observaciones'>Observaciones</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                            <input className={classObservaciones} type='text' id='ingreso-observaciones' onChange={e => { handleObservaciones(e) }} defaultValue={observaciones.valor} style={{ border: observaciones.rojo }} readOnly={read} />
                            <div id="ingreso-observaciones" className="invalid-feedback">
                                Min. 4 letras
                            </div>
                        </div>
                    </div>

                    <hr className='my-xl-5' />

                    <div className='row justify-content-center'>
                        <div className='col-12'>
                            <h3>Requisitos</h3>
                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-foto-carnet'>
                        <label className='col-xl-12 col-md-12 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Foto para el carnet</label>
                        <a className='col-xl-12 col-md-12 col-sm-12 col-12' target='_blank' rel="noreferrer" href={copiaFoto} width="800px" height="2100px" hidden={!showFoto}> Copia Foto</a>
                        <p style={{ color: 'red' }} hidden={showFoto}>Documento pendiente</p>
                        <input className='col-xl-6 col-md-6 col-sm-12 col-12' type="file"
                            onChange={(e) => setSelectedFileFoto(e.target.files[0])}
                            style={{ border: selectedFileFoto.rojo }}
                        />
                    </div>

                    <div className='row justify-content-center my-md-3 campo-copia-cedula' hidden={hide}>
                        <label className='col-xl-12 col-md-12 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Copia cedula 150%</label>
                        <a className='col-xl-12 col-md-12 col-sm-12 col-12' target='_blank' rel="noreferrer" href={certificadoCedula} width="800px" height="2100px" hidden={!showCedula}> Copia Cedula</a>
                        <p style={{ color: 'red' }} hidden={showCedula}>Documento pendiente</p>
                        <input className='col-xl-6 col-md-6 col-sm-12 col-12' type="file"
                            onChange={(e) => setSelectedFileCopiaCC(e.target.files[0])}
                            style={{ border: selectedFileCopiaCC.rojo }}
                        />
                    </div>

                    <div className='row justify-content-center my-md-3 campo-cuenta-servicios' hidden={hide}>
                        <label className='col-xl-12 col-md-12 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Cuenta de servicios</label>
                        <a className='col-xl-12 col-md-12 col-sm-12 col-12' target='_blank' rel="noreferrer" href={copiaServicios} width="800px" height="2100px" hidden={!showServicios}> Copia Servicios</a>
                        <p style={{ color: 'red' }} hidden={showServicios}>Documento pendiente</p>
                        <input className='col-xl-6 col-md-6 col-sm-12 col-12' type="file" placeholder="Choose a file"
                            onChange={(e) => setSelectedFileCuentaServicios(e.target.files[0])}
                            style={{ border: selectedFileCuentaServicios.rojo }}
                        />
                    </div>

                    <div className='row justify-content-center my-md-3 campo-opcion-sisben' hidden={hide}>
                        <label className='col-xl-2 lbl-registro-recuperador' htmlFor=''>SISBÉN</label>
                        <div className=' col-xl-3'>
                            <div className='col-xl-6' >
                                <label className='col-xl-3' htmlFor='si' style={{ color: boolSisben.rojo }}>Si</label>
                                <input className='col-xl-3' type='radio' name='sisbencheck' value='si' id='si' checked={boolSisben.valor === "si"} onChange={e => { setBoolSisben({ valor: e.target.value, rojo: '' }) }} disabled={read} />
                            </div>

                            {/* vamos a tener mas tipo de usuarios? */}
                            <div className='col-xl-6'>
                                <label className='col-xl-3' htmlFor='no' style={{ color: boolSisben.rojo }} >No</label>
                                <input className='col-xl-3' type='radio' name='sisbencheck' value='no' id='no' checked={boolSisben.valor === "no"} onChange={e => { setBoolSisben({ valor: e.target.value, rojo: '' }) }} disabled={read} />
                            </div>
                        </div>

                    </div>

                    <div className='row justify-content-center my-md-3 campo-opcion-eps' hidden={hide}>
                        <label className='col-xl-2 lbl-registro-recuperador' htmlFor=''>EPS</label>
                        <div className='col-xl-3'>
                            <div className='col-xl-6'>
                                <label className='col-xl-3' htmlFor='si' style={{ color: boolEps.rojo }}>Si</label>
                                <input className='col-xl-3' type='radio' name='epscheck' value='si' id='si' checked={boolEps.valor === "si"} onChange={e => { setBoolEps({ valor: e.target.value, rojo: '' }) }} disabled={read} />
                            </div>
                            <div className='col-xl-6'>
                                <label className='col-xl-3' htmlFor='no' style={{ color: boolEps.rojo }}>No</label>
                                <input className='col-xl-3' type='radio' name='epscheck' value='no' id='no' checked={boolEps.valor === "no"} onChange={e => { setBoolEps({ valor: e.target.value, rojo: '' }) }} disabled={read} />
                            </div>

                        </div>
                    </div>

                    <div className='row justify-content-center my-md-3 campo-talla-chaleco'>
                        <label className='col-xl-3 col-md-5 col-sm-4 col-12 lbl-registro-recuperador' htmlFor="ingreso-talla-chaleco">Talla del chaleco</label>
                        <div className='col-xl-3 col-md-5 col-sm-5 col-12'>
                            <select className='form-select' name='select' id='ingreso-talla-chaleco' onChange={e => { setTalla({ valor: e.target.value, rojo: '' }) }} value={tallaChaleco.valor} style={{ border: tallaChaleco.rojo }} disabled={read}>
                                <option value='no'>Selecciona...</option>
                                <option value='xs'>XS</option>
                                <option value='s'>S</option>
                                <option value='m'>M</option>
                                <option value='l'>L</option>
                                <option value='xl'>XL</option>
                                <option value='xll'>XXL</option>
                            </select>
                        </div>
                    </div>


                    <div className='row justify-content-center my-md-3 campo-firma'>
                        <label className='lbl-registro-recuperador' htmlFor="">Firma recuperador</label>
                        <div className="firma">
                            <SignatureCanvas penColor='black'
                                canvasProps={{ className: 'padFirma' }}
                                ref={sigCanvas}
                            />
                        </div>
                        <button className="botonRecuperador btn-ingresar-usuario w-40" onClick={clear} type="button">Rehacer</button>
                    </div>
                    <button className="botonRecuperador enviar btn-ingresar-usuario" hidden={!hide} onClick={() => { verificarIndocumentado(); }} type="button">Actualizar</button>
                    <button className="botonRecuperador enviar btn-ingresar-usuario" hidden={!hide} onClick={() => { setHide(false); }} type="button">Convertir a Documentado</button>

                </form>

                <div className='row justify-content-center'>
                    {/* <div className='col-3'> */}
                    <button className="botonRecuperador enviar btn-ingresar-usuario col-4" onClick={() => { intermedia(); }} type="button" hidden={hide}>Crear Documentado</button>
                    {/* </div> */}
                </div>

            </div>
        </div>
    )
}
