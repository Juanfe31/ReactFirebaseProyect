import React from 'react'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { uploadFileFoto, uploadFileCopiaCC, uploadFileCopiaServicios, getRecuperador, updateRecuperador } from '../api/Recuperador';
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
// imprimir
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
// icon
import { FaPrint } from "react-icons/fa";
import Loading from "./Loading";
import MyContext from './context';
import { useContext } from 'react';


export default function Modificarrecuperador() {

    const { setUsuarioGlobal } = useContext(MyContext);

    const [isLoading, setIsLoading] = useState(false);


    const [recuperador, setRecuperador] = useState([]);
    const location = useLocation();
    const [id, setId] = useState(location.state.id);
    const [read, setRead] = useState(location.state.read);

    const storage = getStorage();
    const [documento, setDoc] = useState({ valor: location.state.documento, rojo: "" });

    const refenciaBancaria = ref(storage, 'docRecuperadores/' + documento.valor + '/CertificadoBancario_' + documento.valor);
    const refenciaFoto = ref(storage, 'docRecuperadores/' + documento.valor + '/foto_' + documento.valor);
    const refenciaServicios = ref(storage, 'docRecuperadores/' + documento.valor + '/copiaServicios_' + documento.valor);
    const refenciaCedula = ref(storage, 'docRecuperadores/' + documento.valor + '/copiaCC_' + documento.valor);


    const [certificadoBancario, setCertificadoBancario] = useState("");
    const [showBancario, setShowBancario] = useState(true);

    const [certificadoCedula, setCertificadoCedula] = useState("");
    const [showCedula, setShowCedula] = useState(true);

    const [copiaServicios, setCopiaServicios] = useState("");
    const [showServicios, setShowServicios] = useState(true);

    const [copiaFoto, setCopiaFoto] = useState("");
    const [showFoto, setShowFoto] = useState(true);


    const [bodega, setTipoBodega] = useState({ valor: location.state.bodega, rojo: "" });
    const [fecha_registro, setFechaRegistro] = useState({ valor: "", rojo: "" });
    const [nombre_beneficiario, setNombreBeneficiario] = useState({ valor: "", rojo: "" });

    const [tipo_doc, setTipoDoc] = useState({ valor: "", rojo: "" });

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

    const [colorNombres, setColorNombres] = useState("");

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


    const [selectedFileFoto, setSelectedFileFoto] = useState({ valor: "", rojo: "" });
    const [selectedFileCopiaCC, setSelectedFileCopiaCC] = useState({ valor: "", rojo: "" });
    const [selectedFileCuentaServicios, setSelectedFileCuentaServicios] = useState({ valor: "", rojo: "" });

    const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);

    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();

    // select
    const [nombreEcas, setNombreEcas] = useState([]);

    // navegar
    const navigate = useNavigate();

    // documentos pendientes
    const [boolDocumentosPendientes, setBoolDocumentosPendientes] = useState(false);


    const [numAsociados, setNumAsociados] = useState(0);
    const [nomAsociados, setNombresAsociados] = useState(Array(numAsociados).fill(""));


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

    //imprimir
    const componentPDF = useRef();
    const componentPDF2 = useRef();

    // labels for mobile
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const generatePDF = async () => {

        const imageUrl = copiaFoto;
        let base64data = "";
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                var reader = new window.FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    base64data = reader.result;
                }

            })
            .catch(error => {
                console.error('Error fetching the image:', error);
            });

        const element = componentPDF.current;
        const canvas = await html2canvas(element, { useCORS: true, allowTaint: true });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

        const element2 = componentPDF2.current;
        const canvas2 = await html2canvas(element2, { useCORS: true, allowTaint: true });
        const data2 = canvas2.toDataURL('image/png');

        const imgProperties2 = pdf.getImageProperties(data2);
        const pdfWidth2 = pdf.internal.pageSize.getWidth();
        const pdfHeight2 = (imgProperties2.height * pdfWidth2) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 10, pdfWidth, pdfHeight);
        pdf.addPage();
        pdf.addImage(data2, 'PNG', 0, 10, pdfWidth2, pdfHeight2);
        pdf.save('print.pdf');
    };

    // trigger imprimir
    const triggerImprimir = async () => {
        // const h = await setShow4(false);
        setIsLoading(true);
        try {
        const i = await generatePDF();
        } catch (error) {

        } finally {
          setIsLoading(false);
        }
        // setShow4(true);
    }

    useEffect(() => {
        const getRecuperadorF = async () => {
            const getRecuperadorAPI = await getRecuperador(id);
            setRecuperador(getRecuperadorAPI);
        }
        getRecuperadorF();

        const fetchEcas = async () => {
            const TodasLasEcas = await getNombresEcas();
            setNombreEcas(TodasLasEcas);
        }
        fetchEcas();


        getDownloadURL(refenciaCedula)
            .then((url) => {
                setCertificadoCedula(url);
                setShowCedula(true);
            }).catch((error) => {
                setShowCedula(false);
            });

        getDownloadURL(refenciaFoto)
            .then((url) => {
                setCopiaFoto(url);
                setShowFoto(true);
            }).catch((error) => {
                setShowFoto(false);
            });


        getDownloadURL(refenciaServicios)
            .then((url) => {
                setCopiaServicios(url);
                setShowServicios(true);
            }).catch((error) => {
                setShowServicios(false);
            });

        getDownloadURL(refenciaBancaria)
            .then((url) => {
                setCertificadoBancario(url);
                setShowBancario(true);
            }).catch((error) => {
                setShowBancario(false);
            });
    }, [])

    useEffect(() => {
        const getRecuperadorF = async () => {
            setTipoBodega({ valor: recuperador.bodega, rojo: "" })
            setFechaRegistro({ valor: recuperador.fecha_registro, rojo: "" })
            setNombreBeneficiario({ valor: recuperador.nombre_beneficiario, rojo: "" })
            setTipoDoc({ valor: recuperador.tipo_doc, rojo: "" })
            setDoc({ valor: recuperador.documento, rojo: "" })
            setFechaExpedicion({ valor: recuperador.fecha_expedicion, rojo: "" })
            setLugarExpedicion({ valor: recuperador.lugar_expedicion, rojo: "" })
            setSexo({ valor: recuperador.sexo, rojo: "" })
            setFechaNacimiento({ valor: recuperador.fecha_nacimiento, rojo: "" })
            setLugarNacimiento({ valor: recuperador.lugar_nacimiento, rojo: "" })
            setNacionalidad({ valor: recuperador.nacionalidad, rojo: "" })
            setRH({ valor: recuperador.RH, rojo: "" })
            setDireccion({ valor: recuperador.direccion, rojo: "" })
            setDepartamento({ valor: recuperador.departamento, rojo: "" })
            setMunicipio({ valor: recuperador.municipio, rojo: "" })
            setComuna({ valor: recuperador.comuna, rojo: "" })
            setBarrio({ valor: recuperador.barrio, rojo: "" })
            setTelefono({ valor: recuperador.telefono, rojo: "" })
            setSISBEN({ valor: recuperador.SISBEN, rojo: "" })
            setPoseeEPS({ valor: recuperador.posee_eps, rojo: "" })
            setEPS({ valor: recuperador.EPS, rojo: "" })
            setDisEPS({ valor: "", rojo: "" })
            setOtroSalud({ valor: recuperador.otro_salud, rojo: "" })
            setTipoVivienda({ valor: recuperador.tipo_vivienda, rojo: "" })
            setEscolaridad({ valor: recuperador.escolaridad, rojo: "" })
            setEstadoCivil({ valor: recuperador.estado_civil, rojo: "" })
            setColorNombres({ valor: "", rojo: "" })
            setDiasDedicados(recuperador.dias_dedicados)
            setColorDiasDedicados({ valor: "", rojo: "" })
            setTiempoReciclaje({ valor: recuperador.tiempo_reciclaje, rojo: "" })
            setHorarios({ valor: recuperador.horarios, rojo: "" })
            setMacroruta({ valor: recuperador.macroRuta, rojo: "" })
            setInicioMicroRuta({ valor: recuperador.inicioMicroRuta, rojo: "" })
            setFinMicroRuta({ valor: recuperador.finMicroRuta, rojo: "" })
            setDescripcionMicroRuta({ valor: recuperador.descripcionMicroRuta, rojo: "" })
            setCodigoMicroRuta({ valor: recuperador.codigoMicroRuta, rojo: "" })
            setPerteneceOtra({ valor: recuperador.pertenece_otra, rojo: "" })
            setOtraOrg({ valor: recuperador.otra_org, rojo: "" })
            setDisOtra({ valor: "", rojo: "" })
            setBoolSisben({ valor: recuperador.boolSisben, rojo: "" })
            setBoolEps({ valor: recuperador.boolEps, rojo: "" })
            setTalla({ valor: recuperador.tallaChaleco, rojo: "" })
            setObservaciones({ valor: recuperador.observaciones, rojo: "" })
            setMunicipioRuta({ valor: recuperador.municipio_recoleccion, rojo: "" })
            setNombresAsociados(recuperador.asociados);
            setNumAsociados(recuperador.nroasociados);
            setBoolDocumentosPendientes(recuperador.docsPendientes);

            if (recuperador.posee_eps === "si") {
                setDisEPS(false);
            }
            if (recuperador.pertenece_otra === "si") {
                setDisOtra(false);
            }
            if (recuperador.municipio_recoleccion === "Medellín") {
                setBoolComunaM(false);
                setBoolComunaB(true);
            }
            if (recuperador.municipio_recoleccion === "Bello") {
                setBoolComunaB(false);
                setBoolComunaM(true);
            }
        }
        getRecuperadorF();


    }, [recuperador.EPS, recuperador.RH, recuperador.SISBEN, recuperador.asociados, recuperador.barrio, recuperador.bodega, recuperador.boolEps, recuperador.boolSisben, recuperador.codigoMicroRuta, recuperador.comuna, recuperador.departamento, recuperador.descripcionMicroRuta, recuperador.dias_dedicados, recuperador.direccion, recuperador.docsPendientes, recuperador.documento, recuperador.escolaridad, recuperador.estado_civil, recuperador.fecha_expedicion, recuperador.fecha_nacimiento, recuperador.fecha_registro, recuperador.finMicroRuta, recuperador.horarios, recuperador.inicioMicroRuta, recuperador.lugar_expedicion, recuperador.lugar_nacimiento, recuperador.macroRuta, recuperador.municipio, recuperador.municipio_recoleccion, recuperador.nacionalidad, recuperador.nombre_beneficiario, recuperador.nroasociados, recuperador.observaciones, recuperador.otra_org, recuperador.otro_salud, recuperador.pertenece_otra, recuperador.posee_eps, recuperador.sexo, recuperador.tallaChaleco, recuperador.telefono, recuperador.tiempo_reciclaje, recuperador.tipo_doc, recuperador.tipo_vivienda]);


    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const shouldShowButton = windowWidth > 768; 


    const verficarRecuperador = async (id) => {
        const recuperadorCollectionRef = collection(db, "recuperadores");
        const q = query(recuperadorCollectionRef, where("documento", "==", id), where("tipo_doc", "==", tipo_doc.valor));
        const querySnapshot = await getDocs(q);
        const temporal = querySnapshot.docs.map((doc) => {
            return (doc.id)
        });
        return temporal;
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
            if (documento.valor !== location.state.documento) {
                await verficarRecuperador(documento.valor).then((dato) => {
                    if (dato.length >= 1) {
                        Swal.fire({
                            icon: "error",
                            title: "Documento ya existe",
                            text: "El recuperador con el documento " + tipo_doc.valor + " " + documento.valor + " ya existe",
                        });
                    } else {
                        verificar()
                    }
                })
            } else {
                verificar();
            }
        }
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

    const handleInputChange = (event, index) => {
        const newInputValues = [...nomAsociados];
        newInputValues[index] = event.target.value;
        setNombresAsociados(newInputValues);
    };



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



    const opcionesBodega = nombreEcas.map((eca) => (
        { ...{ value: eca[0], label: eca[0] } }

    ))

    const actualizar = async (pendiente) => {
        setBtnIngresoDisable(true);
        setUsuarioGlobal(prevUsuario => ({
            ...prevUsuario,
            activo: true
          }));
        await updateRecuperador(id, recuperador, bodega.valor, fecha_registro.valor, nombre_beneficiario.valor, tipo_doc.valor, documento.valor, fecha_expedicion.valor, lugar_expedicion.valor, sexo.valor, fecha_nacimiento.valor, lugar_nacimiento.valor, nacionalidad.valor, RH.valor, direccion.valor, departamento.valor, municipio.valor, comuna.valor, barrio.valor, telefono.valor, SISBEN.valor, posee_eps.valor, EPS.valor, otro_salud.valor, tipo_vivienda.valor, escolaridad.valor, estado_civil.valor, nomAsociados, numAsociados, dias_dedicados, nombredias_dedicados, tiempo_reciclaje.valor, horarios.valor, municipioRuta.valor, macroruta.valor, inicioMicroRuta.valor, finMicroRuta.valor, codigoMicroRuta.valor, descripcionMicroRuta.valor, pertenece_otra.valor, otra_org.valor, boolSisben.valor, boolEps.valor, tallaChaleco.valor, observaciones.valor, pendiente);
        window.scrollTo(0, 0);
    };

    const verificar = () => {

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


        if (selectedFileFoto.valor === "" && !showFoto) {
            setBoolDocumentosPendientes(true);
            setSelectedFileFoto({ valor: "", rojo: '1px ridge red' });
            hasEmptyFiles = true;
            hasEmptyFoto = true;
        }
        if (selectedFileCopiaCC.valor === "" && !showCedula) {
            setBoolDocumentosPendientes(true);
            setSelectedFileCopiaCC({ valor: "", rojo: '1px ridge red' });
            hasEmptyFiles = true;
            hasEmptyCc = true;
        }
        if (selectedFileCuentaServicios.valor === "" && !showServicios) {
            setBoolDocumentosPendientes(true);
            setSelectedFileCuentaServicios({ valor: "", rojo: '1px ridge red' });
            hasEmptyFiles = true;
            hasEmptyServicios = true;
        }

        if ((selectedFileCopiaCC.valor !== "" || showCedula) && (selectedFileCuentaServicios.valor !== "" || showServicios) && (selectedFileFoto.valor !== "" || showFoto)) {
            setBoolDocumentosPendientes(false);
        }

        if (hasEmptyInputs) {

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
                    icon: "error",
                    title: "Error",
                    text: "Complete los campos",
                });
            } else if (hasEmptyFiles) {
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
                        actualizar(true);

                        if (!hasEmptyFoto && selectedFileFoto.valor !== "") {
                            uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor);
                        }
                        if (!hasEmptyCc && selectedFileCopiaCC.valor !== "") {
                            uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor);
                        }
                        if (!hasEmptyServicios && selectedFileCuentaServicios.valor !== "") {
                            uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor);
                        }

                    }
                })
            }
        }
        else {
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
                actualizar(false);
                if (selectedFileFoto.valor !== "") {
                    uploadFileFoto(selectedFileFoto.valor, documento.valor + "/foto_" + documento.valor)
                }
                if (selectedFileCopiaCC.valor !== "") {
                    uploadFileCopiaCC(selectedFileCopiaCC.valor, documento.valor + "/copiaCC_" + documento.valor)
                }
                if (selectedFileCuentaServicios.valor !== "") {
                    uploadFileCopiaServicios(selectedFileCuentaServicios.valor, documento.valor + "/copiaServicios_" + documento.valor)
                }
            }
        }
    };


    return (
        <div className='container-fluid contenido-ingresar-usuario'>
            <div className='row'>
                <div className='header'>
                    <h1>Editar recuperador</h1>
                </div>
            </div>


            <div className='formulario-ingresar-usuario' >
                <form action="">
                    {/* div hasta cuenta bancaria */}
                    <div className='row justify-content-end' hidden={!shouldShowButton }>
                        <div className='col-2 mx-5' onClick={() => { triggerImprimir(); }}>
                            
                        {isLoading ?(
                        <Loading/>
                        ):<FaPrint size="1.4rem" />
                        }
                        </div>
                    </div>
                    <div ref={componentPDF}>
                        <div className='row justify-content-center'>
                            <img className="col-3" src={copiaFoto} title='foto' />

                        </div>
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
                        <div className='row campo-nombre-rec uperador mb-md-4 justify-content-center'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10  lbl-registro-recuperador ' htmlFor='nombre-recuperador'>Nombre completo</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classNombre} type='text' id='nombre-recuperador' onChange={e => { handleNombre(e) }} onKeyDown={e => { handleNombre(e) }} defaultValue={nombre_beneficiario.valor} style={{ border: nombre_beneficiario.rojo }} readOnly={read} />
                                <div id="nombre-recuperador" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center my-md-3 campo-documento'>
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
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="nro-di">Numero documento</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10 '>
                                        <input className={classDocumento} type="text" id="nro-id" onChange={e => { handleDocumento(e) }} onKeyDown={e => { handleDocumento(e) }} defaultValue={documento.valor} style={{ border: documento.rojo }} readOnly={read} />
                                        <div id="nro-id" className="invalid-feedback">
                                            Min. 4 letras
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-center mb-md-4 id-expedicion'>
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
                                        <input className={classLugarExpedicion} id='lugar-expedicion' onChange={e => { handleLugarExpedicion(e) }} onKeyDown={e => { handleLugarExpedicion(e) }} defaultValue={lugar_expedicion.valor} style={{ border: lugar_expedicion.rojo }} readOnly={read} />
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
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='fecha-nacimiento-recuperador'>Fecha de nacimiento</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className='form-control' type='date' id='fecha-nacimiento-recuperador' onChange={e => { setFechaNacimiento({ valor: e.target.value, rojo: '' }) }} defaultValue={fecha_nacimiento.valor} style={{ border: fecha_nacimiento.rojo }} readOnly={read} />
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-lugar-nacimiento'>Lugar de nacimiento</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className={classLugarNacimiento} type='text' id='ingreso-lugar-nacimiento' onChange={e => { handleLugarNacimiento(e) }} onKeyDown={e => { handleLugarNacimiento(e) }} defaultValue={lugar_nacimiento.valor} style={{ border: lugar_nacimiento.rojo }} readOnly={read} />
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
                                        <input className={classNacionalidad} type='text' id='ingreso-nacionalidad' onChange={e => { handleNacionalidad(e) }} onKeyDown={e => { handleNacionalidad(e) }} defaultValue={nacionalidad.valor} style={{ border: nacionalidad.rojo }} readOnly={read} />
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
                                <input className={classDireccion} type='text' id='ingreso-direccion' onChange={e => { handleDireccion(e) }} onKeyDown={e => { handleDireccion(e) }} defaultValue={direccion.valor} style={{ border: direccion.rojo }} readOnly={read} />
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
                                        <input className={classDepartamento} type='text' id='ingreso-departamento' onChange={e => { handleDepartamento(e) }} onKeyDown={e => { handleDepartamento(e) }} defaultValue={departamento.valor} style={{ border: departamento.rojo }} readOnly={read} />
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
                                        <input className={classMunicipio} type='text' id='ingreso-municipio' onChange={e => { handleMunicipio(e) }} onKeyDown={e => { handleMunicipio(e) }} defaultValue={municipio.valor} style={{ border: municipio.rojo }} readOnly={read} />
                                        <div id="ingreso-municipio" className="invalid-feedback">
                                            Min. 4 letras
                                        </div>
                                    </div>
                                </div>
                                <div></div></div>
                        </div>
                        {/* las comunas van a se una selección o un texto para ingresar?? */}
                        <div className='row justify-content-center mb-md-4 campo-comuna-barrio'>
                            <div className='col-xl-6 col-md-12 col-12'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-comuna'>Comuna</label>
                                    <div className='col-xl-6 col-md-5 col-sm-5 col-10'>
                                        <input className={classComuna} type='text' id='ingreso-comuna' onChange={e => { handleComuna(e) }} onKeyDown={e => { handleComuna(e) }} defaultValue={comuna.valor} style={{ border: comuna.rojo }} readOnly={read} />
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
                                        <input className={classBarrio} type='text' id='ingreso-barrio' onChange={e => { handleBarrio(e) }} onKeyDown={e => { handleBarrio(e) }} defaultValue={barrio.valor} style={{ border: barrio.rojo }} readOnly={read} />
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
                                <input className={classTelefono} type='text' id='ingreso-telefono' onChange={e => { handleTelefono(e) }} onKeyDown={e => { handleTelefono(e) }} defaultValue={telefono.valor} style={{ border: telefono.rojo }} readOnly={read} />
                                <div id="ingreso-telefono" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>
                        {/* vamos a poner celular ?? */}
                        <div className='row justify-content-center my-md-3 campo-cuenta_bancaria'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-cuenta_bancaria'>Cuenta Bancaria</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className='form-control' type='text' id='ingreso-cuenta_bancaria' defaultValue={recuperador.cuenta_bancaria} readOnly={true} />
                            </div>
                            <a target='_blank' rel="noreferrer" href={certificadoBancario} width="800px" height="2100px" hidden={!showBancario}> Certificado Bancario</a>
                        </div>
                    </div>



                    <hr className='my-xl-5' />

                    <div ref={componentPDF2}>
                        <div className='row justify-content-center mb-md-4 campo-sisben'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-sisben'>SISBÉN</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10' >
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

                        <div className='row justify-content-center mb-md-4 campo-eps'>
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
                                        <input className={classEps} type='text' id='ingreso-eps' disabled={EPSdis} value={EPS.valor} onChange={e => { handleEps(e) }} onKeyDown={e => { handleEps(e) }} style={{ border: EPS.rojo }} readOnly={read} />
                                        <div id="ingreso-eps" className="invalid-feedback">
                                            Min. 4 letras
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div className='row justify-content-center my-md-3 campo-otro-salud'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-otro-salud'>Otro sistema de salud</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classOtroSalud} type='text' id='ingreso-otro-salud' onChange={e => { handleOtroSalud(e) }} onKeyDown={e => { handleOtroSalud(e) }} defaultValue={otro_salud.valor} style={{ border: otro_salud.rojo }} readOnly={read} />
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
                            <label className='col-xl-4 col-md-4 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-nro-personas-cargo'>Nro. Personas a cargo</label>
                            <div className='col-xl-4 col-md-4 col-sm-5 col-10' >
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
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classTiempoDedicado} type='text' id='ingreso-tiempo-actividad' onChange={e => { handleTiempoDedicado(e) }} onKeyDown={e => { handleTiempoDedicado(e) }} defaultValue={tiempo_reciclaje.valor} style={{ border: tiempo_reciclaje.rojo }} readOnly={read} />
                                <div id="ingreso-tiempo-actividad" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-horarios'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor='ingreso-horario'>Horarios</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10'>
                                <input className={classHorarios} type='text' id='ingreso-horario' onChange={e => { handleHorarios(e) }} onKeyDown={e => { handleHorarios(e) }} defaultValue={horarios.valor} style={{ border: horarios.rojo }} readOnly={read} />
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
                                <select className='form-select' name='select' id='ingreso-ruta-chaleco' onChange={e => { setMacroruta({ valor: e.target.value, rojo: '' }) }} value={macroruta.valor} style={{ border: macroruta.rojo }} hidden={boolComunaB} disabled={read}>
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
                                <input className={classInicioRuta} type="text" name="" id="inicio-ruta" defaultValue={inicioMicroRuta.valor} onChange={(e) => { handleInicioRuta(e) }} onKeyDown={(e) => { handleInicioRuta(e) }} style={{ border: inicioMicroRuta.rojo }} readOnly={read} />
                                <div id="inicio-ruta" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center my-md-3 campo-fin-rutas'>
                            <label className='col-xl-3 col-md-5 col-sm-4 col-10 lbl-registro-recuperador' htmlFor="fin-ruta">Fin ruta</label>
                            <div className='col-xl-3 col-md-5 col-sm-5 col-10' >
                                <input className={classFinRuta} type="text" name="" id="fin-ruta" defaultValue={finMicroRuta.valor} onChange={(e) => { handleFinRuta(e) }} onKeyDown={(e) => { handleFinRuta(e) }} style={{ border: finMicroRuta.rojo }} readOnly={read} />
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
                            <textarea className={classDescripcion} name="" id="decripcion-ruta" cols="30" rows="3" onChange={(e) => { handleDescripcion(e) }} onKeyDown={(e) => { handleDescripcion(e) }} defaultValue={descripcionMicroRuta.valor} style={{ border: descripcionMicroRuta.rojo }} readOnly={read} />
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
                                <input className={classObservaciones} type='text' id='ingreso-observaciones' onChange={e => { handleObservaciones(e) }} onKeyDown={e => { handleObservaciones(e) }} defaultValue={observaciones.valor} style={{ border: observaciones.rojo }} readOnly={read} />
                                <div id="ingreso-observaciones" className="invalid-feedback">
                                    Min. 4 letras
                                </div>
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
                            accept="application/pdf,image/jpeg"
                            onChange={(e) => setSelectedFileFoto({ valor: e.target.files[0], rojo: "" })}
                            style={{ border: selectedFileFoto.rojo }}
                            hidden={read}
                        />
                    </div>

                    <div className='row justify-content-center my-md-3 campo-copia-cedula'>
                        <label className='col-xl-12 col-md-12 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Copia cedula 150%</label>
                        <a className='col-xl-12 col-md-12 col-sm-12 col-12' target='_blank' rel="noreferrer" href={certificadoCedula} width="800px" height="2100px" hidden={!showCedula}> Copia Cedula</a>
                        <p style={{ color: 'red' }} hidden={showCedula}>Documento pendiente</p>
                        <input className='col-xl-6 col-md-6 col-sm-12 col-12' type="file"
                            accept="application/pdf,image/jpeg"
                            onChange={(e) => setSelectedFileCopiaCC({ valor: e.target.files[0], rojo: "" })}
                            style={{ border: selectedFileCopiaCC.rojo }}
                            hidden={read}
                        />
                    </div>

                    <div className='row justify-content-center my-md-3 campo-cuenta-servicios'>
                        <label className='col-xl-12 col-md-12 col-sm-12 col-12 lbl-registro-recuperador' htmlFor="">Cuenta de servicios</label>
                        <a className='col-xl-12 col-md-12 col-sm-12 col-12' target='_blank' rel="noreferrer" href={copiaServicios} width="800px" height="2100px" hidden={!showServicios}> Copia Servicios</a>
                        <p style={{ color: 'red' }} hidden={showServicios}>Documento pendiente</p>
                        <input className='col-xl-6 col-md-6 col-sm-12 col-12' type="file" placeholder="Choose a file"
                            accept="application/pdf,image/jpeg"
                            onChange={(e) => setSelectedFileCuentaServicios({ valor: e.target.files[0], rojo: "" })}
                            style={{ border: selectedFileCuentaServicios.rojo }}
                            hidden={read}
                        />
                    </div>

                    <div className='row justify-content-center my-md-3 campo-opcion-sisben'>
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

                    <div className='row justify-content-center my-md-3 campo-opcion-eps'>
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
                    <div className="row tablaMateriales justify-content-center">
                        <button className="botonReporte col-md-5 col-12 " onClick={() => { intermedia() }} type="button" hidden={read}>Actualizar</button>
                        <button className="botonReporte col-md-5 col-12" type="button" onClick={() => { navigate('../app/consultarrecuperador'); }} disabled={btnIngresoDisable}>Volver</button>
                    </div>


                </form>

            </div>
        </div>
    )
}
