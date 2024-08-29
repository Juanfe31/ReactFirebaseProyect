import React from 'react'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { getBodegas } from "../api/Bodega";
import { getEcaByNombreBodega } from '../api/Bodega';
import SignatureCanvas from 'react-signature-canvas';
import { createIndocumentado } from "../api/Indocumentado";
import { createRecuperador, uploadFileFoto, uploadFileCopiaCC, uploadFileCopiaServicios } from '../api/Recuperador';
import { getInfo, updateInfoIndocumentados } from '../api/InfoApp';
import '../assets/css/ingresarUsuario.css';
import '../assets/css/ingresarRecuperador.css';
import Swal from 'sweetalert2';
// select
import Select from 'react-select'
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import MyContext from './context';
import { useContext } from 'react';

export default function IngresarRecuperador() {

    const { setUsuarioGlobal } = useContext(MyContext);

    const [bodega, setTipoBodega] = useState({ valor: "", rojo: "" });
    const [fecha_registro, setFechaRegistro] = useState({ valor: new Date().toISOString().substring(0, 10), rojo: "" });
    const [nombre_beneficiario, setNombreBeneficiario] = useState({ valor: "", rojo: "" });

    const [tipo_doc, setTipoDoc] = useState({ valor: "", rojo: "" });
    const [documento, setDoc] = useState({ valor: "", rojo: "" });
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
    const [EPSdis, setDisEPS] = useState(false);

    const [otro_salud, setOtroSalud] = useState({ valor: "", rojo: "" });

    const [tipo_vivienda, setTipoVivienda] = useState({ valor: "", rojo: "" });
    const [escolaridad, setEscolaridad] = useState({ valor: "", rojo: "" });
    const [estado_civil, setEstadoCivil] = useState({ valor: "", rojo: "" });

    const [colorNombres, setColorNombres] = useState("")


    const [dias_dedicados, setDiasDedicados] = useState([false, false, false, false, false, false, false]);
    const [nombredias_dedicados, setNombreDiasDedicados] = useState([]);
    const [colordias_dedicados, setColorDiasDedicados] = useState("");
    const [tiempo_reciclaje, setTiempoReciclaje] = useState({ valor: "", rojo: "" });
    const [horarios, setHorarios] = useState({ valor: "", rojo: "" });

    const [municipioRuta, setMunicipioRuta] = useState({ valor: "", rojo: "" });
    const [macroruta, setMacroruta] = useState({ valor: "", rojo: "" });
    const [inicioRuta, setInicioRuta] = useState({ valor: "", rojo: "" });
    const [finRuta, setFinRuta] = useState({ valor: "", rojo: "" });
    const [descripcionMicroRuta, setDescripcionMicroRuta] = useState({ valor: "", rojo: "" });
    const [codigoMicroRuta, setCodigoMicroRuta] = useState({ valor: "", rojo: "" });
    const [boolComunaB, setBoolComunaB] = useState(true);
    const [boolComunaM, setBoolComunaM] = useState(true);

    const [pertenece_otra, setPerteneceOtra] = useState({ valor: "", rojo: "" });

    const [otra_org, setOtraOrg] = useState({ valor: "", rojo: "" });
    const [disOtra, setDisOtra] = useState(false);

    const [boolSisben, setBoolSisben] = useState({ valor: "", rojo: "" });
    const [boolEps, setBoolEps] = useState({ valor: "", rojo: "" });
    const [tallaChaleco, setTalla] = useState({ valor: "", rojo: "" });


    const [observaciones, setObservaciones] = useState({ valor: "", rojo: "" });

    //Subir los archivos
    const [selectedFileFoto, setSelectedFileFoto] = useState({ valor: "", rojo: "" });
    const [selectedFileCopiaCC, setSelectedFileCopiaCC] = useState({ valor: "", rojo: "" });
    const [selectedFileCuentaServicios, setSelectedFileCuentaServicios] = useState({ valor: "", rojo: "" });

    const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);

    // select
    const [bodegas, setBodegas] = useState([]);


    // documentos pendientes
    const [boolDocumentosPendientes, setBoolDocumentosPendientes] = useState(false);

    // campos ocultas para indocumentado
    const [hide, setHide] = useState(false);
    const [show, setShow] = useState(false);

    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();

    // cantidad de indocumentados creados
    const [info, setInfo] = useState([]);
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
        if (posee_eps.valor === 'no' || posee_eps.valor === '') {
            setEPS({ valor: '', rojo: '' })
            setDisEPS(true);
        } else {
            setEPS({ valor: EPS.valor, rojo: '' })
            setDisEPS('');
        }
            const fetchBodegas = async () => {
              const TodasLasBodegas = await getBodegas();
              setBodegas(TodasLasBodegas);
            }
            fetchBodegas();
         
    
        const getCantIndocumentadoF = async () => {
            const getCantidadIndocumentadosAPI = await getInfo();
            setInfo(getCantidadIndocumentadosAPI);
        }
        getCantIndocumentadoF();
    }, [posee_eps]);

    useEffect(() => {
        if (pertenece_otra.valor === 'no' || pertenece_otra.valor === '') {
            setOtraOrg({ valor: '', rojo: '' })
            setDisOtra(true);
        } else {
            setOtraOrg({ valor: otra_org.valor, rojo: '' })
            setDisOtra('');
        }
    }, [pertenece_otra]);

    const verficarRecuperador = async (id) => {
        const recuperadorCollectionRef = collection(db, "recuperadores");
        const q = query(recuperadorCollectionRef, where("documento", "==", id), where("tipo_doc", "==", tipo_doc.valor));
        const querySnapshot = await getDocs(q);
        const temporal = querySnapshot.docs.map((doc) => {
            return (doc.id)
        });
        return temporal;
    }

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



    const opcionesBodega = bodegas.map((bodega) => (
        { ...{ value: bodega.nombre_bodega, label: bodega.nombre_bodega } }

    ))

    // todo esto es para el numero de personas familiares
    const [numAsociados, setNumAsociados] = useState(0);
    const [nomAsociados, setNombresAsociados] = useState(Array(numAsociados).fill(""));
    // todo esto es para el numero de personas familiares
    // const [numRutas, setNumRutas] = useState(0);
    // const [nomRutas, setNombreRutas] = useState(Array(numRutas).fill(""));

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



    const handleInputAsociados = (event, index) => {
        const newInputValueAsociados = [...nomAsociados];
        newInputValueAsociados[index] = event.target.value;
        setNombresAsociados(newInputValueAsociados);
    };


    const inputFields = [];
    for (let i = 0; i < numAsociados; i++) {
        inputFields.push(
            <input
                key={"familia" + i}
                type="text"
                value={nomAsociados[i]}
                onChange={(e) => {
                    handleInputAsociados(e, i);
                    setColorNombres('');
                }}
                className='form-control my-1'
                style={{ border: colorNombres }}
            />
        );
    }

    const handleNombre = (e) => {
        if (e.target.value.length < 4) {
            setClassNombre("form-control is-invalid")
        } else {
            setClassNombre("form-control is-valid")
        }
        setNombreBeneficiario({ valor: e.target.value, rojo: '' });
    }

    const handleDocumento = (e) => {
        const regex = /^[a-zA-Z0-9]+$/;
        const value = e.target.value;
            if (!regex.test(value) || value.toString().length < 4) {
                setClassDocumento('form-control is-invalid')
            } else {
                setClassDocumento('form-control is-valid')
            }
            setDoc({ valor: value, rojo: '' })
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
        if (e.target.value.length < 1) {
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
        setInicioRuta({ valor: e.target.value, rojo: "" })
    }
    const handleFinRuta = (e) => {
        if (e.target.value.length < 4) {
            setClassFinRuta("form-control is-invalid")
        } else {
            setClassFinRuta("form-control is-valid")
        }
        setFinRuta({ valor: e.target.value, rojo: "" })
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


    const crearIndocumentado = async () => {
        setBtnIngresoDisable(true);
        setUsuarioGlobal(prevUsuario => ({
            ...prevUsuario,
            activo: true
          }));
        await createIndocumentado(bodega.valor, fecha_registro.valor, nombre_beneficiario.valor,
            // tipo_doc.valor, documento.valor, fecha_expedicion.valor, lugar_expedicion.valor, 
            sexo.valor,
            // fecha_nacimiento.valor, 
            lugar_nacimiento.valor, nacionalidad.valor, RH.valor, direccion.valor, departamento.valor, municipio.valor, comuna.valor, barrio.valor, telefono.valor,
            // SISBEN.valor, posee_eps.valor, EPS.valor, otro_salud.valor, 
            tipo_vivienda.valor, escolaridad.valor, estado_civil.valor, nomAsociados, numAsociados, dias_dedicados, nombredias_dedicados, tiempo_reciclaje.valor, horarios.valor, municipioRuta.valor, macroruta.valor, inicioRuta.valor, finRuta.valor,
            // codigoMicroRuta.valor, 
            descripcionMicroRuta.valor, pertenece_otra.valor, otra_org.valor,
            // boolSisben.valor, boolEps.valor,
            tallaChaleco.valor, observaciones.valor, codigoId, (await getEcaByNombreBodega(bodega.valor)||"hohla")
            // boolDocumentosPendientes
        );
        updateInfoIndocumentados(info, info.cantIndocumentados + 1);
    };


    const verificarIndocumentado = async () => {
        const inputs = [
            { value: bodega.valor, set: setTipoBodega },
            { value: fecha_registro.valor, set: setFechaRegistro },
            { value: nombre_beneficiario.valor, set: setNombreBeneficiario },
            // { value: tipo_doc.valor, set: setTipoDoc },
            // { value: documento.valor, set: setDoc },
            // { value: fecha_expedicion.valor, set: setFechaExpedicion },
            // { value: lugar_expedicion.valor, set: setLugarExpedicion },
            { value: sexo.valor, set: setSexo },
            // { value: fecha_nacimiento.valor, set: setFechaNacimiento },
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
            { value: municipioRuta.valor, set: setMunicipioRuta },
            { value: inicioRuta.valor, set: setInicioRuta },
            { value: finRuta.valor, set: setFinRuta },
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
        // if (boolSisben.valor === '') {
        //     hasEmptyInputs = true;
        //     setBoolSisben({ valor: boolSisben.valor, rojo: 'red' });
        // }
        // if (boolEps.valor === '') {
        //     hasEmptyInputs = true;
        //     setBoolEps({ valor: boolEps.valor, rojo: 'red' });
        // }

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

        // if (selectedFileFoto.valor === "") {
        //     setBoolDocumentosPendientes(true);
        //     setSelectedFileFoto({ valor: "", rojo: '1px ridge red' });
        //     hasEmptyFiles = true;
        //     hasEmptyFoto = true;
        // }
        // if (selectedFileCopiaCC.valor === "") {
        //     setBoolDocumentosPendientes(true);
        //     setSelectedFileCopiaCC({ valor: "", rojo: '1px ridge red' });
        //     hasEmptyFiles = true;
        //     hasEmptyCc = true;
        // }
        // if (selectedFileCuentaServicios.valor === "") {
        //     setBoolDocumentosPendientes(true);
        //     setSelectedFileCuentaServicios({ valor: "", rojo: '1px ridge red' });
        //     hasEmptyFiles = true;
        //     hasEmptyServicios = true;
        // }


        if (hasEmptyInputs) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Complete los campos",
            });
        }
        // else if (hasEmptyFiles) {
        //     Swal.fire({
        //         title: 'Subir con Documentos Faltantes',
        //         text: "No se ha subido algún documento requerido(Foto,Copia CC,Cuenta servicios)\n¿Subir recuperador sin documento completos?",
        //         icon: 'warning',
        //         showDenyButton: true,
        //         confirmButtonText: 'Aceptar',
        //         denyButtonText: 'Cancelar',
        //         reverseButtons: true
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             setBtnIngresoDisable(true);
        //             crearIndocumentado();
        //             // if (!hasEmptyFoto) {
        //             //     uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
        //             // }
        //             // if (!hasEmptyCc) {
        //             //     uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor);
        //             // }
        //             // if (!hasEmptyServicios) {
        //             //     uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
        //             // }
        //         }
        //     })
        // }
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
            if (inicioRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un incio de ruta valido, minima longitud: 4',
                });
            }
            if (finRuta.valor.length < 4) {
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
                crearIndocumentado();
            }
            // uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
            // uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor)
            // uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
        }
    };

    const crearDocumentado = async (pendiente) => {
        setBtnIngresoDisable(true);
        setUsuarioGlobal(prevUsuario => ({
            ...prevUsuario,
            activo: true
          }));
        await createRecuperador(bodega.valor, fecha_registro.valor, nombre_beneficiario.valor, tipo_doc.valor, documento.valor, fecha_expedicion.valor, lugar_expedicion.valor, sexo.valor, fecha_nacimiento.valor, lugar_nacimiento.valor, nacionalidad.valor, RH.valor, direccion.valor, departamento.valor, municipio.valor, comuna.valor, barrio.valor, telefono.valor, SISBEN.valor, posee_eps.valor, EPS.valor, otro_salud.valor, tipo_vivienda.valor, escolaridad.valor, estado_civil.valor, nomAsociados, numAsociados, dias_dedicados, nombredias_dedicados, tiempo_reciclaje.valor, horarios.valor, municipioRuta.valor, macroruta.valor, inicioRuta.valor, finRuta.valor, codigoMicroRuta.valor, descripcionMicroRuta.valor, pertenece_otra.valor, otra_org.valor, boolSisben.valor, boolEps.valor, tallaChaleco.valor, observaciones.valor, pendiente,await getEcaByNombreBodega(bodega.valor));

    };

    const generarCodigoIndocumentado = () => {
        let numero = info.cantIndocumentados;
        return "I-" + (numero + 1);
    }


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
            setBtnIngresoDisable(true)
            await verficarRecuperador(documento.valor).then((dato) => {
                if (dato.length >= 1) {
                    Swal.fire({
                        icon: "error",
                        title: "Documento ya existe",
                        text: "El recuperador con el documento " + tipo_doc.valor + " " + documento.valor + " ya existe",
                    });
                    setBtnIngresoDisable(false)
                } else {
                    verificarDocumentado()
                    setBtnIngresoDisable(false)
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
            { value: inicioRuta.valor, set: setInicioRuta },
            { value: finRuta.valor, set: setFinRuta },
            { value: descripcionMicroRuta.valor, set: setDescripcionMicroRuta }
        ];


        let hasEmptyInputs = false;
        let hasEmptyFiles = false;
        let hasEmptyFoto = false;
        let hasEmptyCc = false;
        let hasEmptyServicios = false;
        let valid = true;
        let regex = /^[a-zA-Z0-9]+$/;

        for (const input of inputs) {
            if (input.value === '' || input.value === 'mm/dd/yyyy') {
                input.set({ valor: input.value, rojo: '1px ridge red' });
                hasEmptyInputs = true;
                valid = false;
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
            setBoolDocumentosPendientes(true);

            if (posee_eps.valor === "si") {
                if (EPS.valor.length < 4) {
                    valid = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ingrese una Eps valida, minima longitud: 4',
                    });
                }
            } else {
                valid = true;
            }

            if (!regex.test(documento.valor) || documento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un documento valido, minima longitud: 4, sin caracteres especiales como: .,-@?/()',
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
            if (comuna.valor.length < 1) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una comuna valida, minima longitud: 1',
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
            if (inicioRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un incio de ruta valido, minima longitud: 4',
                });
            }
            if (finRuta.valor.length < 4) {
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
                    text: "No se ha subido algún documento requerido(Foto,Copia CC,Cuenta servicios)\n¿Subir recuperador sin documento completos?",
                    icon: 'warning',
                    showDenyButton: true,
                    confirmButtonText: 'Aceptar',
                    denyButtonText: 'Cancelar',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        setBtnIngresoDisable(true);
                        crearDocumentado(true);
                        if (!hasEmptyFoto) {
                            uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
                        }
                        if (!hasEmptyCc) {
                            uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor);
                        }
                        if (!hasEmptyServicios) {
                            uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
                        }
                    }
                })
            }
        }
        else {
            
            if (posee_eps.valor === 'si') {
                if (EPS.valor.length < 4) {
                    valid = false;
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ingrese una Eps valida, minima longitud: 4',
                    });
                }
            } else {
                valid = true;
            }
            if (!regex.test(documento.valor) || documento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un documento valido, minima longitud: 4, sin caracteres especiales como: .,-@?/()'   ,
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
            if (inicioRuta.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un incio de ruta valido, minima longitud: 4',
                });
            }
            if (finRuta.valor.length < 4) {
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
                // setBoolDocumentosPendientes(false);
                crearDocumentado(false);
                uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
                uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor)
                uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
            }
        }
    };


    return (
        <div className='container-fluid contenido-ingresar-usuario'>
            <div className='row'>
                <div className='header'>
                    <h1>Ingreso nuevo recuperador</h1>
                </div>
            </div>


            <div className='row justify-content-center my-4'>
                <input className='col-xl-3 col-md-4 col-sm-4 col-10 mx-4 ' type="button" value="Documentado" onClick={(e) => { setHide(false); setShow(true); }} />
                <input className='col-xl-3 col-md-4 col-sm-4 col-10 mx-4' type="button" value="Indocumentado" onClick={(e) => { setHide(true); setShow(true); setCodigoId(generarCodigoIndocumentado()) }} />
            </div>

            {show &&
                <div className='formulario-ingresar-usuario'>
                    <form action="">
                        <div className='row justify-content-center my-md-3 campo-bodega '>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-3 lbl-registro-recuperador' htmlFor='bodega'>Bodega</label>
                            <Select type="text" className="col-xl-3 col-md-5 col-sm-5 col-10 " options={opcionesBodega} onChange={(e) => { setTipoBodega({ valor: e.value, rojo: '' }) }}></Select>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-fecha-registro'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador text-truncate' htmlFor='fecha-registro'>Fecha registro</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className='form-control' type="date" id='fecha-registro' onChange={e => { setFechaRegistro({ valor: e.target.value, rojo: '' }) }} style={{ border: fecha_registro.rojo }} defaultValue={fecha_registro.valor} />
                            </div>
                        </div>

                        <div className='row campo-nombre-rec uperador mb-md-4 justify-content-center'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10  lbl-registro-recuperador ' htmlFor='nombre-recuperador'>Nombre Completo</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classNombre} type='text' id='nombre-recuperador' onChange={e => { handleNombre(e) }} style={{ border: nombre_beneficiario.rojo }} />
                                <div id="nombre" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-documento' hidden={hide}>
                            <div className='col-xl-6 col-md-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="tipo">Tipo documento</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <select className='form-select' name='tipo-documento' id='tipo' onChange={e => { setTipoDoc({ valor: e.target.value, rojo: '' }) }} style={{ border: tipo_doc.rojo }}>
                                            <option value=''>Selecciona...</option>
                                            <option value='cc'>Cedula de ciudadanía</option>
                                            <option value='ce'>Cedula de extranjería</option>
                                            <option value='pas'>Pasaporte</option>
                                            <option value='ti'>Tarjeta de identidad</option>
                                            <option value='rc'>Registro civil</option>
                                            <option value='nit'>NIT</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="nro-di">Numero documento</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10 '>
                                        <input className={classDocumento} type="text" id="nro-id" onChange={e => { handleDocumento(e) }} style={{ border: documento.rojo }} value={documento.valor} />
                                        <div id="documento" className="invalid-feedback">
                                            No caracteres especiales: .@?- 
                                        </div>
                                        <div id="documento" className="invalid-feedback">
                                            Min. 4 caracteres
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
                                        <input className='form-control' type='date' id='fecha-expedicion' onChange={e => { setFechaExpedicion({ valor: e.target.value, rojo: '' }) }} style={{ border: fecha_expedicion.rojo }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='lugar-expedicion'>Lugar de expedición</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className={classLugarExpedicion} id='lugar-expedicion' onChange={e => { handleLugarExpedicion(e) }} style={{ border: lugar_expedicion.rojo }} />
                                        <div id="lugar_expedicion" className="invalid-feedback">
                                            Min. 4 letras
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className='row justify-content-center my-md-4 campo-sexo'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-sexo'>Sexo</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <select className='form-select' type='text' id='ingreso-sexo' onChange={e => { setSexo({ valor: e.target.value, rojo: '' }) }} style={{ border: sexo.rojo }}>
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
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className='form-control' type='date' id='fecha-nacimiento-recuperador' onChange={e => { setFechaNacimiento({ valor: e.target.value, rojo: '' }) }} style={{ border: fecha_nacimiento.rojo }} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-lugar-nacimiento'>Lugar de nacimiento</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className={classLugarNacimiento} type='text' id='ingreso-lugar-nacimiento' onChange={e => { handleLugarNacimiento(e) }} style={{ border: lugar_nacimiento.rojo }} />
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
                                        <input className={classNacionalidad} type='text' id='ingreso-nacionalidad' onChange={e => { handleNacionalidad(e) }} style={{ border: nacionalidad.rojo }} />
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
                                        <select className='form-select' name='select' id='rh' onChange={e => { setRH({ valor: e.target.value, rojo: '' }) }} style={{ border: RH.rojo }}>
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
                                <input className={classDireccion} type='text' id='ingreso-direccion' onChange={e => { handleDireccion(e) }} style={{ border: direccion.rojo }} />
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
                                        <input className={classDepartamento} type='text' id='ingreso-departamento' onChange={e => { handleDepartamento(e) }} style={{ border: departamento.rojo }} />
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
                                        <input className={classMunicipio} type='text' id='ingreso-municipio' onChange={e => { handleMunicipio(e) }} style={{ border: municipio.rojo }} />
                                        <div id="ingreso-municipio" className="invalid-feedback">
                                            Min. 4 letras
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* las comunas van a se una selección o un texto para ingresar?? */}
                        <div className='row justify-content-center mb-md-4 campo-comuna-barrio'>
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-comuna'>Comuna</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className={classComuna} type='text' id='ingreso-comuna' onChange={e => { handleComuna(e) }} style={{ border: comuna.rojo }} />
                                        <div id="ingreso-comuna" className="invalid-feedback">
                                            Min. 1 letra o numero
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-barrio'>Barrio</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className={classBarrio} type='text' id='ingreso-barrio' onChange={e => { handleBarrio(e) }} style={{ border: barrio.rojo }} />
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
                                <input className={classTelefono} type='text' id='ingreso-telefono' onChange={e => { handleTelefono(e) }} style={{ border: telefono.rojo }} />
                                <div id="ingreso-telefono" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>
                        {/* vamos a poner celular ?? */}
                        <hr className='my-xl-5' />

                        <div className='row justify-content-center mb-md-4 campo-sisben' hidden={hide}>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-sisben'>SISBÉN</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <select className='form-select' type='text' id='ingreso-sisben' onChange={e => { setSISBEN({ valor: e.target.value, rojo: '' }) }} style={{ border: SISBEN.rojo }}>
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
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10' >
                                        <select className='form-select' name='select' id='posee-eps' onChange={e => { setPoseeEPS({ valor: e.target.value, rojo: '' }) }} style={{ border: posee_eps.rojo }}>
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
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10' >
                                        <input className={classEps} type='text' id='ingreso-eps' disabled={EPSdis} value={EPS.valor} onChange={e => { handleEps(e) }} style={{ border: EPS.rojo }} />
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
                                <input className={classOtroSalud} type='text' id='ingreso-otro-salud' onChange={e => { handleOtroSalud(e) }} style={{ border: otro_salud.rojo }} />
                                <div id="ingreso-otro-salud" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-tipo-vivienda'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='tipo-vivienda'>Tipo de vivienda</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <select className='form-select' name='select' id='tipo-vivienda' onChange={e => { setTipoVivienda({ valor: e.target.value, rojo: '' }) }} style={{ border: tipo_vivienda.rojo }}>
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
                                        <select className='form-select' name='select' id='ingreso-escolaridad' onChange={e => { setEscolaridad({ valor: e.target.value, rojo: '' }) }} style={{ border: escolaridad.rojo }} >
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
                                        <select className='form-select' name='select' id='ingreso-estado-civil' onChange={e => { setEstadoCivil({ valor: e.target.value, rojo: '' }) }} style={{ border: estado_civil.rojo }}>
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
                            <label className='col-xl-4 col-md-4 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-nro-personas-cargo'>Nro. Personas a cargo</label>
                            <div className='col-xl-3 col-md-4 col-sm-5 col-10'>
                                <input className='form-control' type='number' id='ingreso-nro-personas-cargo'
                                    min="0"
                                    max="10"
                                    value={numAsociados}
                                    onChange={handleNumInputsChange} />
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
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classTiempoDedicado} type='text' id='ingreso-tiempo-actividad' onChange={e => { handleTiempoDedicado(e) }} style={{ border: tiempo_reciclaje.rojo }} />
                                <div id="ingreso-tiempo-actividad" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-horarios'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-horario'>Horarios</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classHorarios} type='text' id='ingreso-horario' onChange={e => { handleHorarios(e) }} style={{ border: horarios.rojo }} />
                                <div id="ingreso-horario" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-rutas-recoleccion'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-ruta'>Municipio de Recoleccion</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-12'>
                                <select className='form-select' name='select' id='ingreso-ruta-chaleco' onChange={e => {
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
                                    style={{ border: macroruta.rojo }}>
                                    <option value=''>Selecciona...</option>
                                    <option value="Medellín">Medellín</option>
                                    <option value="Bello">Bello</option>
                                </select>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-macrorutas-recoleccion'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-ruta'>Macro-ruta de recolección</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-12'>
                                <select className='form-select' name='select' id='ingreso-ruta-chaleco' onChange={e => { setMacroruta({ valor: e.target.value, rojo: '' }) }} style={{ border: macroruta.rojo }} hidden={boolComunaM}>
                                    <option value="">Seleccionar...</option>
                                    <option value="Comuna 1 Popular">1 - Popular</option>
                                    <option value="Comuna 2 Santa Cruz">2 - Santa Cruz</option>
                                    <option value="Comuna 3 Manrique">3 - Manrique</option>
                                    <option value="Comuna 4 Aranjuez">4 - Aranjuez</option>
                                    <option value="Comuna 5 Castilla">5 - Castilla</option>
                                    <option value="Comuna 6 Doce de Octubre">6 - Doce de Octubre</option>
                                    <option value="Comuna 7 Robledo">7 - Robledo</option>
                                    <option value="Comuna 8 Villa Hermosa">8 - Villa Hermosa</option>
                                    <option value="Comuna 9 Buenos Aires">9 - Buenos Aires</option>
                                    <option value="Comuna 10 La Candelaria">10 - La Candelaria</option>
                                    <option value="Comuna 11 Laureles">11 - Laureles</option>
                                    <option value="Comuna 12 La América">12 - La América</option>
                                    <option value="Comuna 13 San Javier">13 - San Javier</option>
                                    <option value="Comuna 14 El poblado">14 - El Poblado</option>
                                    <option value="Comuna 15 El Guayabal">15 - El Guayabal</option>
                                    <option value="Comuna 16 Belen">16 - Belen</option>
                                </select>
                                <select className='form-select' name='select' id='ingreso-ruta-chaleco' onChange={e => { setMacroruta({ valor: e.target.value, rojo: '' }) }} style={{ border: macroruta.rojo }} hidden={boolComunaB}>
                                    <option value="">Seleccionar...</option>
                                    <option value="Comuna 1 Paris y 2 La Madera">1 Paris y 2 La Madera</option>
                                    <option value="Comuna 3 Santa Ana  y 4 Suarez">3 Santa Ana  y 4 Suarez</option>
                                    <option value="Comuna 5 La cumbre y 6 Bellavista">5 La cumbre y 6 Bellavista</option>
                                    <option value="Comuna 7 Altos de Niquia y 8 Niquia">7 Altos de Niquia y 8 Niquia</option>
                                    <option value="Comuna 9 Fontidueño y 10 Acevedo">9 Fontidueño y 10 Acevedo</option>
                                </select>
                            </div>

                        </div>

                        <div className='row justify-content-center my-md-3 campo-inicio-rutas'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='inicio-ruta'>Inicio ruta</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classInicioRuta} type="text" name="" id="inicio-ruta" onChange={(e) => { handleInicioRuta(e) }} style={{ border: inicioRuta.rojo }} />
                                <div id="inicio-ruta" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-fin-rutas'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="fin-ruta">Fin ruta</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classFinRuta} type="text" name="" id="fin-ruta" onChange={(e) => { handleFinRuta(e) }} style={{ border: finRuta.rojo }} />
                                <div id="fin-ruta" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 codigo-rutas' hidden={hide}>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="codigo-ruta">Codigo micro-ruta</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className='form-control' type="text" name="" id="codigo-ruta" onChange={(e) => { setCodigoMicroRuta({ valor: e.target.value, rojo: "" }) }} style={{ border: codigoMicroRuta.rojo }} />
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-descripcion-ruta'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='decripcion-ruta'>Descripcion ruta</label>
                            <textarea className={classDescripcion} name="" id="decripcion-ruta" cols="30" rows="10" onChange={(e) => { handleDescripcion(e) }} style={{ border: descripcionMicroRuta.rojo }} />
                            {/* <div id="input_fields">{inputRutas}</div>
                        <div>
                            <FaPlus className='mx-3' onClick={()=>{changeNumRutas("up")}}/>
                            <FaMinus className='mx-3' onClick={()=>{changeNumRutas("down")}}/>
                        </div> */}

                        </div>

                        <div className='row justify-content-center my-md-3 campo-otra-organizacion'>
                            <label className='col-xl-4 lbl-registro-recuperador' htmlFor=''>Pertenece a alguna otra organización</label>
                            <div className=' col-xl-3'>
                                <div className='col-xl-6 '>
                                    <label className='col-xl-3' htmlFor='si' style={{ color: pertenece_otra.rojo }}>Si</label>
                                    <input className='col-xl-3' type='radio' name='tipo-usuario' value='si' id='si' onChange={e => { setPerteneceOtra({ valor: e.target.value, rojo: '' }) }} />
                                </div>
                                <div className='col-xl-6 '>
                                    <label className='col-xl-3' htmlFor='no' style={{ color: pertenece_otra.rojo }}>No</label>
                                    <input className='col-xl-3' type='radio' name='tipo-usuario' value='no' id='no' onChange={e => { setPerteneceOtra({ valor: e.target.value, rojo: '' }) }} />
                                </div>
                            </div>
                            {/* vamos a tener mas tipo de usuarios? */}

                        </div>



                        <div className='row justify-content-center my-md-3 campo-nombre-otra-organizacion'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-otra-organización'>¿A cuál?</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className='form-control' type='text' id='ingreso-otra-organización' disabled={disOtra} value={otra_org.valor} onChange={e => { setOtraOrg({ valor: e.target.value, rojo: '' }) }} style={{ border: otra_org.rojo }} />
                            </div>
                        </div>
                        <div className='row justify-content-center my-md-3 campo-observaciones'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-observaciones'>Observaciones</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classObservaciones} type='text' id='ingreso-observaciones' onChange={e => { handleObservaciones(e) }} style={{ border: observaciones.rojo }} />
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
                        <div className='row justify-content-center my-md-3 campo-foto-carnet' >
                            <label className='col-xl-3 col-md-6 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Foto para el carnet</label>
                            <input className='col-xl-3 col-md-6 col-sm-12 col-12' type="file"
                            accept="application/pdf,image/jpeg"
                                onChange={(e) => setSelectedFileFoto({ valor: e.target.files[0], rojo: "" })}
                                style={{ border: selectedFileFoto.rojo }}
                            />
                        </div>

                        <div className='row justify-content-center my-md-3 campo-copia-cedula' hidden={hide}>
                            <label className='col-xl-3 col-md-6 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Copia cedula 150%</label>
                            <input className='col-xl-3 col-md-6 col-sm-12 col-12' type="file"
                            accept="application/pdf,image/jpeg"
                                onChange={(e) => setSelectedFileCopiaCC({ valor: e.target.files[0], rojo: "" })}
                                style={{ border: selectedFileCopiaCC.rojo }}
                            />
                        </div>

                        <div className='row justify-content-center my-md-3 campo-cuenta-servicios' hidden={hide}>
                            <label className='col-xl-3 col-md-6 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Cuenta de servicios</label>
                            <input className='col-xl-3 col-md-6 col-sm-12 col-12' type="file" placeholder="Choose a file"
                                accept="application/pdf,image/jpeg"
                                onChange={(e) => setSelectedFileCuentaServicios({ valor: e.target.files[0], rojo: "" })}
                                style={{ border: selectedFileCuentaServicios.rojo }}
                            />
                        </div>

                        <div className='row justify-content-center my-md-3 campo-opcion-sisben' hidden={hide}>
                            <label className='col-xl-2 lbl-registro-recuperador' htmlFor=''>SISBÉN</label>
                            <div className=' col-xl-3'>
                                <div className='col-xl-6' >
                                    <label className='col-xl-3' htmlFor='si' style={{ color: boolSisben.rojo }}>Si</label>
                                    <input className='col-xl-3' type='radio' name='sisbencheck' value='si' id='si' onChange={e => { setBoolSisben({ valor: e.target.value, rojo: '' }) }} />
                                </div>

                                {/* vamos a tener mas tipo de usuarios? */}
                                <div className='col-xl-6'>
                                    <label className='col-xl-3' htmlFor='no' style={{ color: boolSisben.rojo }} >No</label>
                                    <input className='col-xl-3' type='radio' name='sisbencheck' value='no' id='no' onChange={e => { setBoolSisben({ valor: e.target.value, rojo: '' }) }} />
                                </div>
                            </div>

                        </div>

                        <div className='row justify-content-center my-md-3 campo-opcion-eps' hidden={hide}>
                            <label className='col-xl-2 lbl-registro-recuperador' htmlFor=''>EPS</label>
                            <div className='col-xl-3'>
                                <div className='col-xl-6'>
                                    <label className='col-xl-3' htmlFor='si' style={{ color: boolEps.rojo }}>Si</label>
                                    <input className='col-xl-3' type='radio' name='epscheck' value='si' id='si' onChange={e => { setBoolEps({ valor: e.target.value, rojo: '' }) }} />
                                </div>
                                <div className='col-xl-6'>
                                    <label className='col-xl-3' htmlFor='no' style={{ color: boolEps.rojo }}>No</label>
                                    <input className='col-xl-3' type='radio' name='epscheck' value='no' id='no' onChange={e => { setBoolEps({ valor: e.target.value, rojo: '' }) }} />
                                </div>

                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-talla-chaleco'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-12 lbl-registro-recuperador' htmlFor="ingreso-talla-chaleco">Talla del chaleco</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-12'>
                                <select className='form-select' name='select' id='ingreso-talla-chaleco' onChange={e => { setTalla({ valor: e.target.value, rojo: '' }) }} style={{ border: tallaChaleco.rojo }}>
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
                        <button className="botonRecuperador enviar btn-ingresar-usuario" onClick={() => { intermedia() }} type="button" hidden={hide} disabled={btnIngresoDisable}>Guardar Documentado</button>
                        <button className="botonRecuperador enviar btn-ingresar-usuario" onClick={() => { verificarIndocumentado() }} type="button" hidden={!hide} disabled={btnIngresoDisable}  >Guardar Indocumentado</button>

                    </form>

                </div>
            }
        </div>
    )
}
