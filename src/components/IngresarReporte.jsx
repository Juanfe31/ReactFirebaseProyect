import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { getRecuperador } from '../api/Recuperador';
import { getIndocumentado } from '../api/Indocumentado';
import "../assets/css/ingresarReporte.css";
import '../assets/css/ingresarUsuario.css';
import Swal from 'sweetalert2';
import { createReporte, uploadFileReporte } from "../api/Reporte"
import { getBodegas, getEcaByNombreBodega } from "../api/Bodega";
import { getVehiculosCapacidad } from "../api/Vehiculo";
import { getInfo, updateInfoReportesDigitales } from '../api/InfoApp';
import Select from 'react-select'


export default function IngresarReporte() {

  const [documento, setDocumento] = useState("");
  const [indocumentado, setIndocumentado] = useState("");
  const [show, toggleShow] = useState(false);
  const [recuperador, setRecuperador] = useState({});

  const [nroReporte, setNroReporte] = useState("digital");
  const [bodega, setBodega] = useState("");
  const [fecha, setFecha] = useState("");

  const [material, setMaterial] = useState("");
  const [listaMateriales, setListaMateriales] = useState([]);

  const [aluminio_cant, setAluminio_cant] = useState(0);
  const [aluminio_valorUnitario, setAluminio_valorUnitario] = useState(0);
  const [chatarra_cant, setChatarra_cant] = useState(0);
  const [chatarra_valorUnitario, setChatarra_valorUnitario] = useState(0);
  const [cobre_cant, setCobre_cant] = useState(0);
  const [cobre_valorUnitario, setCobre_valorUnitario] = useState(0);
  const [bronce_cant, setBronce_cant] = useState(0);
  const [bronce_valorUnitario, setBronce_valorUnitario] = useState(0);
  const [antimonio_cant, setAntimonio_cant] = useState(0);
  const [antimonio_valorUnitario, setAntimonio_valorUnitario] = useState(0);
  const [acero_cant, setAcero_cant] = useState(0);
  const [acero_valorUnitario, setAcero_valorUnitario] = useState(0);
  const [otrosMetales_cant, setOtrosMetales_cant] = useState(0);
  const [otrosMetales_valorUnitario, setOtrosMetales_valorUnitario] = useState(0);
  const [archivo_cant, setArchivo_cant] = useState(0);
  const [archivo_valorUnitario, setArchivo_valorUnitario] = useState(0);
  const [carton_cant, setCarton_cant] = useState(0);
  const [carton_valorUnitario, setCarton_valorUnitario] = useState(0);
  const [chuevos_cant, setChuevos_cant] = useState(0);
  const [chuevos_valorUnitario, setChuevos_valorUnitario] = useState(0);
  const [periodico_cant, setPeriodico_cant] = useState(0);
  const [periodico_valorUnitario, setPeriodico_valorUnitario] = useState(0);
  const [plegadiza_cant, setPlegadiza_cant] = useState(0);
  const [plegadiza_valorUnitario, setPlegadiza_valorUnitario] = useState(0);
  const [tetrapack_cant, setTetrapack_cant] = useState(0);
  const [tetrapack_valorUnitario, setTetrapack_valorUnitario] = useState(0);
  const [plastificado_cant, setPlastificado_cant] = useState(0);
  const [plastificado_valorUnitario, setPlastificado_valorUnitario] = useState(0);
  const [kraf_cant, setKraf_cant] = useState(0);
  const [kraf_valorUnitario, setKraf_valorUnitario] = useState(0);
  const [otrosPapeles_cant, setOtrosPapeles_cant] = useState(0);
  const [otrosPapeles_valorUnitario, setOtrosPapeles_valorUnitario] = useState(0);
  const [acrilico_cant, setAcrilico_cant] = useState(0);
  const [acrilico_valorUnitario, setAcrilico_valorUnitario] = useState(0);
  const [pasta_cant, setPasta_cant] = useState(0);
  const [pasta_valorUnitario, setPasta_valorUnitario] = useState(0);
  const [pet_cant, setPet_cant] = useState(0);
  const [pet_valorUnitario, setPet_valorUnitario] = useState(0);
  const [pvc_cant, setPvc_cant] = useState(0);
  const [pvc_valorUnitario, setPvc_valorUnitario] = useState(0);
  const [plasticoBlanco_cant, setPlasticoBlanco_cant] = useState(0);
  const [plasticoBlanco_valorUnitario, setPlasticoBlanco_valorUnitario] = useState(0);
  const [polietileno_cant, setPolietileno_cant] = useState(0);
  const [polietileno_valorUnitario, setPolietileno_valorUnitario] = useState(0);
  const [soplado_cant, setSoplado_cant] = useState(0);
  const [soplado_valorUnitario, setSoplado_valorUnitario] = useState(0);
  const [polipropileno_cant, setPolipropileno_cant] = useState(0);
  const [polipropileno_valorUnitario, setPolipropileno_valorUnitario] = useState(0);
  const [otrosPlasticos_cant, setOtrosPlasticos_cant] = useState(0);
  const [otrosPlasticos_valorUnitario, setOtrosPlasticos_valorUnitario] = useState(0);
  const [otrosVidrios_cant, setOtrosVidrios_cant] = useState(0);
  const [otrosVidrios_valorUnitario, setOtrosVidrios_valorUnitario] = useState(0);
  const [otrosTextiles_cant, setOtrosTextiles_cant] = useState(0);
  const [otrosTextiles_valorUnitario, setOtrosTextiles_valorUnitario] = useState(0);
  const [otrosMaderables_cant, setOtrosMaderables_cant] = useState(0);
  const [otrosMaderables_valorUnitario, setOtrosMaderables_valorUnitario] = useState(0);
  const [otros_cant, setOtros_cant] = useState(0);
  const [otros_valorUnitario, setOtros_valorUnitario] = useState(0);

  //Subir reporte
  const [selectedFileReporte, setSelectedFileReporte] = useState("");

  const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);

  //Vehiculos
  const [selectedVehiculo, setSelectedVehiculo] = useState("Ninguno");

  //Get todas las ecas
  const [bodegas, setBodegas] = useState([]);

  //clases 
  const [classNroReport, setClassNroReporte] = useState('form-control')
  const [classDocumento, setClassDocumento] = useState('form-control')
  const [classIndocumentado, setClassIndocumentado] = useState('form-control')

  // hide document
  const [showDoc, setShowDoc] = useState(false);
  const [isFisico, setIsFisico] = useState(false);

  // checkbox selected
  const [checkTodos, setCheckTodos] = useState(false);
  const [checkComunes, setCheckComunes] = useState(false);

  // labels for mobile
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // cantidad de indocumentados creados
  const [info, setInfo] = useState([]);
  const [deshabilitarCampo, setDeshabilitarCampo] = useState(false);

  const handleDocumento = (e) => {
    const regex = /^[a-zA-Z0-9]+$/;
    const value = e.target.value;
    if (!regex.test(value) || value.toString().length < 4) {
      setClassDocumento('form-control is-invalid')
    } else {
      setClassDocumento('form-control is-valid')
    }
    setDocumento(value);
    setIndocumentado("");
    setClassIndocumentado('form-control');
    setShowDoc(false);
  }

  const handleIndocumentado = (e) => {
    const regex = /^i-\d+$/i;
    const value = e.target.value;
    if (!regex.test(value)) {
      setClassIndocumentado('form-control is-invalid')
    } else {
      setClassIndocumentado('form-control is-valid')
    }
    setIndocumentado(value);
    setDocumento("");
    setClassDocumento('form-control');
    setShowDoc(true);
  }

  useEffect(() => {

    const fetchBodegas = async () => {
      const TodasLasBodegas = await getBodegas();
      setBodegas(TodasLasBodegas);
    }
    fetchBodegas();
  }, [])

  // saber el size de la pantalla
  useEffect(() => {
    // Update windowWidth when the window is resized
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const getCantIndocumentadoF = async () => {
      const getCantidadIndocumentadosAPI = await getInfo();
      setInfo(getCantidadIndocumentadosAPI);
    }
    getCantIndocumentadoF();
  }, [])

  // getCantIndocumentadoF();

  const shouldShowButton = windowWidth > 768; // Adjust the breakpoint as needed

  const opcionesBodega = bodegas.map((bodega) => (
    { ...{ value: bodega.nombre_bodega, label: bodega.nombre_bodega } }

  ))

  const handleNroReporte = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const regex = /^[0-9]+$/;

    if (!regex.test(e.target.value)) {
      setClassNroReporte('form-control is-invalid')
    } else {
      setClassNroReporte('form-control is-valid')
    }
    setNroReporte(value);
  }

  const crear = async () => {
    createReporte(recuperador.id, nroReporte, bodega, fecha, recuperador.nombre_beneficiario, (recuperador.documento || ""), indocumentado, aluminio_cant, aluminio_valorUnitario,
      chatarra_cant, chatarra_valorUnitario, cobre_cant, cobre_valorUnitario, bronce_cant, bronce_valorUnitario, antimonio_cant, antimonio_valorUnitario,
      acero_cant, acero_valorUnitario, otrosMetales_cant, otrosMetales_valorUnitario, archivo_cant, archivo_valorUnitario,
      carton_cant, carton_valorUnitario, chuevos_cant, chuevos_valorUnitario, periodico_cant, periodico_valorUnitario,
      plegadiza_cant, plegadiza_valorUnitario, tetrapack_cant, tetrapack_valorUnitario, plastificado_cant, plastificado_valorUnitario, kraf_cant, kraf_valorUnitario,
      otrosPapeles_cant, otrosPapeles_valorUnitario, acrilico_cant, acrilico_valorUnitario, pasta_cant, pasta_valorUnitario, pet_cant, pet_valorUnitario,
      pvc_cant, pvc_valorUnitario, plasticoBlanco_cant, plasticoBlanco_valorUnitario, polietileno_cant, polietileno_valorUnitario,
      soplado_cant, soplado_valorUnitario, polipropileno_cant, polipropileno_valorUnitario,
      otrosPlasticos_cant, otrosPlasticos_valorUnitario, otrosVidrios_cant, otrosVidrios_valorUnitario, otrosTextiles_cant,
      otrosTextiles_valorUnitario, otrosMaderables_cant, otrosMaderables_valorUnitario, otros_cant, otros_valorUnitario, selectedVehiculo, await getEcaByNombreBodega(bodega)
    );
    updateInfoReportesDigitales(info, info.cantReportesDigitales + 1);
  }

  const verficarRecuperador = async (id) => {
    const recuperadorCollectionRef = collection(db, "recuperadores");
    const q = query(recuperadorCollectionRef, where("documento", "==", id));
    const querySnapshot = await getDocs(q);
    const temporal = querySnapshot.docs.map((doc) => {
      return (doc.id)
    });
    return temporal;
  }

  const verificarIndocumentado = async (id) => {
    const recuperadorCollectionRef = collection(db, "indocumentados");
    const q = query(recuperadorCollectionRef, where("codigoId", "==", id.toUpperCase()));
    const querySnapshot = await getDocs(q);
    const temporal = querySnapshot.docs.map((doc) => {
      return (doc.id)
    });
    return temporal;
  }

  const verficarReporte = async (id) => {
    const reporteCollectionRef = collection(db, "reportes");
    const q = query(reporteCollectionRef, where("nro_reporte", "==", id));
    const querySnapshot = await getDocs(q);
    const temporal = querySnapshot.docs.map((doc) => {
      return (doc.id)
    });
    return temporal;
  }
  const agregarMaterial = async (id) => {
    if (listaMateriales.includes(id)) {
      Swal.fire({
        icon: 'error',
        title: 'Material ya ingresado',
        text: '¡El material ya se encuentra en la tabla!'
      });
    } else if (!(id === 101 || id === 102 || id === 103 || id === 104 || id === 105 || id === 106 || id === 199 ||
      id === 201 || id === 202 || id === 203 || id === 204 || id === 205 || id === 206 || id === 207 || id === 208 || id === 299 ||
      id === 301 || id === 302 || id === 303 || id === 304 || id === 305 || id === 306 || id === 307 || id === 308 || id === 399 ||
      id === 499 || id === 599 || id === 699)) {
      Swal.fire({
        icon: 'error',
        title: 'Código desconocido',
        text: '¡El código ingresado no corresponde a un material!'
      });
    } else {
      setListaMateriales([...listaMateriales, id])
    }
  }
  //101,102,103,104,105,106,199,201,202,203,204,205,206,299,302,303,304,399,499

  const verificar = async () => {
    if (bodega === "" || fecha === null || fecha === '' || isNaN(aluminio_cant) || isNaN(aluminio_valorUnitario)
      || isNaN(chatarra_cant) || isNaN(chatarra_valorUnitario) || isNaN(cobre_cant) || isNaN(cobre_valorUnitario)
      || isNaN(bronce_cant) || isNaN(bronce_valorUnitario) || isNaN(antimonio_cant) || isNaN(antimonio_valorUnitario) || isNaN(acero_cant) || isNaN(acero_valorUnitario)
      || isNaN(otrosMetales_cant) || isNaN(otrosMetales_valorUnitario) || isNaN(archivo_cant) || isNaN(archivo_valorUnitario)
      || isNaN(carton_cant) || isNaN(carton_valorUnitario) || isNaN(chuevos_cant) || isNaN(chuevos_valorUnitario)
      || isNaN(periodico_cant) || isNaN(periodico_valorUnitario) || isNaN(plegadiza_cant) || isNaN(plegadiza_valorUnitario)
      || isNaN(tetrapack_cant) || isNaN(tetrapack_valorUnitario) || isNaN(plastificado_cant) || isNaN(plastificado_valorUnitario) || isNaN(kraf_cant) || isNaN(kraf_valorUnitario)
      || isNaN(otrosPapeles_cant) || isNaN(otrosPapeles_valorUnitario) || isNaN(acrilico_cant) || isNaN(acrilico_valorUnitario)
      || isNaN(pasta_cant) || isNaN(pasta_valorUnitario) || isNaN(pet_cant) || isNaN(pet_valorUnitario)
      || isNaN(pvc_cant) || isNaN(pvc_valorUnitario) || isNaN(plasticoBlanco_cant) || isNaN(plasticoBlanco_valorUnitario)
      || isNaN(polietileno_cant) || isNaN(polietileno_valorUnitario) || isNaN(soplado_cant) || isNaN(soplado_valorUnitario)
      || isNaN(polipropileno_cant) || isNaN(polipropileno_valorUnitario) || isNaN(otrosPlasticos_cant) || isNaN(otrosPlasticos_valorUnitario)
      || isNaN(otrosVidrios_cant) || isNaN(otrosVidrios_valorUnitario) || isNaN(otrosTextiles_cant) || isNaN(otrosTextiles_valorUnitario)
      || isNaN(otrosMaderables_cant) || isNaN(otrosMaderables_valorUnitario) || isNaN(otros_cant) || isNaN(otros_valorUnitario)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete los campos'
      })
    } else if (selectedVehiculo === "Ninguno") {
      Swal.fire({
        icon: 'error',
        title: 'Ningun vehículo seleccionado',
        text: 'Por favor, elija un vehiculo'
      })
    } else {
      Swal.fire({
        title: 'Verifique con el reporte físico',
        text: "Total : " + document.getElementById('cantidadTotal').value + " Kg, con un valor total de $" + document.getElementById('valorTotal').value,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Regresar',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          if (selectedFileReporte === "") {
            Swal.fire({
              title: 'Falta archivo físico',
              text: "No se ha subido el reporte escaneado",
              icon: 'warning',
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ingresar sin reporte físico',
              cancelButtonText: 'Regresar',
              showCancelButton: true
            }).then((result) => {
              if (result.isConfirmed) {
                setBtnIngresoDisable(true);
                if (!isFisico) {
                  getCantReportesF();
                  setNroReporte(info.cantReportesDigitales)
                }
                crear();
              }
            })
          } else {
            setBtnIngresoDisable(true);
            if (!isFisico) {
              getCantReportesF();
              setNroReporte(info.cantReportesDigitales)
            }
            crear();
            uploadFileReporte(selectedFileReporte, nroReporte)
          }

        }
      })

    }
  }
  const handleChangeIsFisico = (e) => {
    if (e.target.checked) {
      setIsFisico(true);
      setNroReporte("");
    } else {
      setIsFisico(false);
      setNroReporte("digital");
    }
  };


  const getCantReportesF = async () => {
    const getCantidadReportesAPI = await getInfo();
    setInfo(getCantidadReportesAPI);
  }

  const callback = async (id, codigo, nroReporte) => {
    if (id === "" && codigo === "") {
      toggleShow(false);
      setRecuperador({
        nombre: "",
        documento: ""
      });
      Swal.fire({
        icon: 'error',
        title: 'Ingrese documento o codigo',
        text: '¡No ha ingresado un documento!'
      });
      setDeshabilitarCampo(false);
    } else if (nroReporte === "") {
      toggleShow(false);
      setRecuperador({
        nombre: "",
        documento: ""
      });
      Swal.fire({
        icon: 'error',
        title: 'Ingrese # Reporte',
        text: '¡No ha ingresado un # de reporte!'
      });
      setDeshabilitarCampo(false);
    } else if (codigo !== "") {
      const valor = verificarIndocumentado(codigo);
      const repo = verficarReporte(nroReporte);
      valor.then((data) => {
        if (data.length >= 1) {
          setNroReporte("D-" + (info.cantReportesDigitales + 1));
          valor.then((data) => getIndocumentado(data[0]).then((dat) => { setRecuperador({ ...dat, id: data[0] }); }));
          repo.then((info) => {
            if (info.length === 1) {
              Swal.fire({
                icon: 'error',
                title: 'Reporte ya registrado',
                text: '¡El reporte con ese numero ya se encuentra registrado!'
              });
              setDeshabilitarCampo(false);
            } else {
              toggleShow(true);
            }
          })
        } else {
          toggleShow(false);
          setRecuperador({
            nombre: "",
            documento: ""
          });
          Swal.fire({
            icon: 'error',
            title: 'No encontrado',
            text: '¡El documento no se encuentra registrado!'
          });
          setDeshabilitarCampo(false);
        }
      });
    } else {
      const valor = verficarRecuperador(id);
      const repo = verficarReporte(nroReporte);
      valor.then((data) => {
        if (data.length >= 1) {
          valor.then((data) => getRecuperador(data[0]).then((dat) => { setRecuperador({ ...dat, id: data[0] }); }));
          repo.then((info) => {
            if (info.length === 1) {
              Swal.fire({
                icon: 'error',
                title: 'Reporte ya registrado',
                text: '¡El reporte con ese numero ya se encuentra registrado!'
              });
              setDeshabilitarCampo(false);
            } else {
              toggleShow(true);
            }
          })
        } else {
          toggleShow(false);
          setRecuperador({
            nombre: "",
            documento: ""
          });
          Swal.fire({
            icon: 'error',
            title: 'No encontrado',
            text: '¡El documento no se encuentra registrado!'
          });
          setDeshabilitarCampo(false);
        }
      });
    }

  }

  const handleMaterialesReporte = async (togg) => {
    setCheckComunes(true)
    setCheckTodos(false)
    if (togg) {
      setListaMateriales([101, 102, 103, 104, 106, 199, 201, 202, 203, 204, 205, 206, 299, 302, 303, 304, 399, 499])
    } else {
      setListaMateriales([])
    }
  }

  const handleTodosLosMateriales = async (togg) => {
    setCheckComunes(false)
    setCheckTodos(true)
    if (togg) {
      setListaMateriales([101, 102, 103, 104, 105, 106, 199, 201, 202, 203, 204, 205, 206, 207, 208, 299, 301, 302, 303, 304, 305, 306, 307, 308, 399, 499, 599, 699])
    } else {
      setListaMateriales([])
    }
  }

  const elegirVehiculo = async () => {
    const vehiculos = await getVehiculosCapacidad(document.getElementById('cantidadTotal').value);
    Swal.fire({
      title: 'Elija el vehiculo',
      width: window.innerWidth < 1200 ? '100%' : '70%',
      showCloseButton: true,
      showCancelButton: true,
      reverseButtons: true,
      html: `
        <label class="swal2-select" >Placa - Tipo vehiculo - Capacidad (T) </label>
        <select class="swal2-select swal2-input" name="tipo-user" id="swal-inputVehiculo">
        <option value="Seleccionar">Seleccionar...</option>
            ${vehiculos
          .map(
            (vehiculo, index) =>
              `<option key=${index} value=${vehiculo.placa}>${vehiculo.placa + " - " + vehiculo.tipo_vehiculo + " - " + vehiculo.capacidadT}</option>
                  `
          )
          .join('')}
          </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-inputVehiculo').value,
        ]
      }
    }).then((result) => {
      setSelectedVehiculo(result.value[0])
    })

  }

  return (
    <div className="container-fluid contenido-ingresar-usuario lbl-general">
      <div className="row header">
        <h1>Registrar reporte</h1>
      </div>

      <form className="formReporte">
        <div className="row">

          <div className="col-md-6 col-12 justify-content-center divCedula pt-3">
            <div className="row justify-content-center">
              <label className="col-md-6 col-12">Número de documento</label>
              <div className="col-md-5 col-8">
                <input type="text" className={classDocumento} onChange={e => { handleDocumento(e) }} value={documento} readOnly={deshabilitarCampo} />
                <div id="documento" className="invalid-feedback">
                  No caracteres especiales: .@?-
                </div>
                <div id="documento" className="invalid-feedback">
                  Min. 4 caracteres
                </div>
              </div>
            </div>
            <div className="row pt-md-4 pt-1 justify-content-center">
              <label className="col-md-6 col-12">Codigo Indocumentado</label>
              <div className="col-md-5 col-8 ">
                <input type="text" className={classIndocumentado} placeholder="Ej: I-#, i-#" onChange={e => { handleIndocumentado(e) }} value={indocumentado} readOnly={deshabilitarCampo}/>
                <div id="cuenta" className="invalid-feedback">
                  Ingrese codigo formato: I-# o i-#
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-12 justify-content-center divCedula my-auto ">
            <div className="row justify-content-center">
              <div className="col-10">
                <input type="checkbox" name="" id="" className="mx-1" onChange={(e) => { handleChangeIsFisico(e) }} disabled={deshabilitarCampo}/>
                <label htmlFor=""> Fisico</label>
              </div>
            </div>
            <div hidden={!isFisico}>
              <label>Número del reporte</label>
              <div className="col-8 mx-auto">
                <input type="text" className={classNroReport} onChange={e => { handleNroReporte(e) }} value={nroReporte} readOnly={deshabilitarCampo}/>
                <div id="cuenta" className="invalid-feedback">
                  Ingrese solo numeros
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2 col-12 divCedula my-auto">
            <button type="button" className="botonReporte btn-ingresar-usuario" onClick={() => {
              callback(documento, indocumentado, nroReporte);
              getCantReportesF();
              if (!isFisico) {
                setNroReporte("D-"+ (info.cantReportesDigitales+1))
              }
              setDeshabilitarCampo(true);
            }}>
              Verificar
            </button>
          </div>
        </div>
      </form>
      <hr />

      {show &&
        <div className="row hide" >
          <form className="formReporte">

            <div className="row justify-content-center">

              <div className="col-md-4 col-12 text-center">
                <div className='row justify-content-center my-2'>
                  <label className="col-10">Documento</label>
                  <div className="col-10">
                    <input type="text" className="form-control " value={recuperador.documento} readOnly hidden={showDoc} style={{ textAlign: 'center' }} />
                    <input type="text" className="form-control " value={recuperador.codigoId} readOnly hidden={!showDoc} style={{ textAlign: 'center' }} />
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-12 text-center">
                <div className='row justify-content-center my-2'>
                  <label className="col-10">Nombre</label>
                  <div className="col-10">
                    <input type="text" className="form-control " value={recuperador.nombre_beneficiario} readOnly style={{ textAlign: 'center' }} />
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 text-center " >
                <div className='row justify-content-center my-2'>
                  <label className="col-10">N°reporte</label>
                  <div className="col-10">
                    <input type="text" className="form-control " value={nroReporte} readOnly style={{ textAlign: 'center' }} />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="row tablaMateriales justify-content-center"
            >
              <div className="col-md-6 col-12 divTablaMateriales">
                <div className="row justify-content-center">
                  <h5>Bodega</h5>
                  <Select type="text" className="col-md-8 col-10 " options={opcionesBodega} onChange={(e) => (setBodega(e.value))}>
                  </Select>
                </div>
              </div>

              <div className="col-md-6 col-12 divTablaMateriales ">
                <div className="row justify-content-center">
                  <h5>Fecha</h5>
                  <div className="col-10 ">
                    <input
                      type="date"
                      className="form-control"
                      onChange={e => { setFecha(e.target.value) }}
                    />
                  </div>
                </div>
              </div>
            </div>


            <hr />
            <div className="row tablaMateriales">
              <h2
                style={{ textAlign: "center", fontWeight: "750", paddingTop: "2%" }}
              >
                Información del reporte de venta
              </h2>
              <div className="col-12 divTablaMateriales">
                <label style={{ margin: 5 }}>Ingrese el código del material</label>
                <input type="number" className="formatoInput" style={{ margin: 5 }} placeholder="Ej: 101" onChange={(e) => setMaterial(e.target.valueAsNumber)} value={material}></input>
                <button type="button" className="botonReporte" style={{ margin: 5 }} onClick={() => (agregarMaterial(material))}>
                  Agregar
                </button>
              </div>

              <div className="col-6 divTablaMateriales">
                <input type="checkbox" checked={checkComunes} onChange={e => { handleMaterialesReporte(e.target.checked) }}></input>
                <label style={{ margin: 5, fontSize: "small" }}>Mostrar los materiales del reporte de COCJANT</label>
              </div>
              <div className="col-6 divTablaMateriales">
                <input type="checkbox" checked={checkTodos} onChange={e => { handleTodosLosMateriales(e.target.checked) }}></input>
                <label style={{ margin: 5, fontSize: "small" }}>Mostrar todos los materiales</label>
              </div>

              <div className="col-md-3 col-12 divTablaMateriales">
                <h3>Código</h3>
              </div>

              <div className="col-md-3 col-12 divTablaMateriales">
                <h3>Cantidad (kg)</h3>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h3>Valor unitario(COP)</h3>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h3>Valor parcial(COP)</h3>
              </div>
            </div>
            <hr />

            {/*Aluminio  */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(101) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>101 Aluminio</h4>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={aluminio_cant}
                  type="number"
                  className="formatoInput"
                  id="cant101"
                  required
                  min={0}
                  onChange={e => { setAluminio_cant(e.target.valueAsNumber) }}
                />
              </div>
              <div className="col-md-3 col-12 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={aluminio_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val101"
                  required
                  min={0}
                  onChange={e => { setAluminio_valorUnitario(e.target.valueAsNumber) }}
                  step=".01"
                />
              </div>
              <div className="col-md-3 col-12 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={aluminio_cant * aluminio_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* Chatarra   */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(102) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>102 Chatarra</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={chatarra_cant}
                  type="number"
                  className="formatoInput"
                  id="cant102"
                  required
                  min={0}
                  onChange={e => { setChatarra_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={chatarra_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val102"
                  required
                  min={0}
                  onChange={e => { setChatarra_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={chatarra_cant * chatarra_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/*cobre  */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(103) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>103 Cobre</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={cobre_cant}
                  type="number"
                  className="formatoInput"
                  id="cant103"
                  required
                  min={0}
                  onChange={e => { setCobre_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={cobre_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val103"
                  required
                  min={0}
                  onChange={e => { setCobre_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={cobre_cant * cobre_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* bronce */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(104) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>104 Bronce</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={bronce_cant}
                  type="number"
                  className="formatoInput"
                  id="cant104"
                  required
                  min={0}
                  onChange={e => { setBronce_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={bronce_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val104"
                  required
                  min={0}
                  onChange={e => { setBronce_valorUnitario(e.target.valueAsNumber) }}
                ></input>

              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={bronce_cant * bronce_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            {/* antimonio*/}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(105) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>105 Antimonio</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={antimonio_cant}
                  type="number"
                  className="formatoInput"
                  id="cant105"
                  required
                  min={0}
                  onChange={e => { setAntimonio_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={antimonio_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val105"
                  required
                  min={0}
                  onChange={e => { setAntimonio_valorUnitario(e.target.valueAsNumber) }}
                ></input>

              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={antimonio_cant * antimonio_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            {/* Acero */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(106) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>106 Acero</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={acero_cant}
                  type="number"
                  className="formatoInput"
                  id="cant106"
                  required
                  min={0}
                  onChange={e => { setAcero_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={acero_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val106"
                  required
                  min={0}
                  onChange={e => { setAcero_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={acero_cant * acero_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* Otros Metales */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(199) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>199 Otros metales</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={otrosMetales_cant}
                  type="number"
                  className="formatoInput"
                  id="cant199"
                  required
                  min={0}
                  onChange={e => { setOtrosMetales_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={otrosMetales_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val199"
                  required
                  min={0}
                  onChange={e => { setOtrosMetales_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={otrosMetales_cant * otrosMetales_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* Archivo */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(201) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>201 Archivo</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={archivo_cant}
                  type="number"
                  className="formatoInput"
                  id="cant201"
                  required
                  min={0}
                  onChange={e => { setArchivo_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={archivo_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val201"
                  required
                  min={0}
                  onChange={e => { setArchivo_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={archivo_cant * archivo_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* carton */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(202) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>202 Cartón</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={carton_cant}
                  type="number"
                  className="formatoInput"
                  id="cant202"
                  required
                  min={0}
                  onChange={e => { setCarton_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={carton_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val202"
                  required
                  min={0}
                  onChange={e => { setCarton_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={carton_cant * carton_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* cubetas de huevo */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(203) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>203 Cubeta huevos</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={chuevos_cant}
                  type="number"
                  className="formatoInput"
                  id="cant203"
                  required
                  min={0}
                  onChange={e => { setChuevos_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={chuevos_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val203"
                  required
                  min={0}
                  onChange={e => { setChuevos_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={chuevos_cant * chuevos_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales" hidden={listaMateriales.includes(204) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>204 Periódico</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={periodico_cant}
                  type="number"
                  className="formatoInput"
                  id="cant204"
                  required
                  min={0}
                  onChange={e => { setPeriodico_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={periodico_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val204"
                  required
                  min={0}
                  onChange={e => { setPeriodico_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={periodico_cant * periodico_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales" hidden={listaMateriales.includes(205) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>205 Plegadiza</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={plegadiza_cant}
                  type="number"
                  className="formatoInput"
                  id="cant205"
                  required
                  min={0}
                  onChange={e => { setPlegadiza_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={plegadiza_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val205"
                  required
                  min={0}
                  onChange={e => { setPlegadiza_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={plegadiza_cant * plegadiza_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales" hidden={listaMateriales.includes(206) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>206 Tetrapack</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={tetrapack_cant}
                  type="number"
                  className="formatoInput"
                  id="cant206"
                  required
                  min={0}
                  onChange={e => { setTetrapack_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={tetrapack_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val206"
                  required
                  min={0}
                  onChange={e => { setTetrapack_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={tetrapack_cant * tetrapack_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* plastificado */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(207) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>207 Plastificado</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={plastificado_cant}
                  type="number"
                  className="formatoInput"
                  id="cant207"
                  required
                  min={0}
                  onChange={e => { setPlastificado_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={plastificado_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val207"
                  required
                  min={0}
                  onChange={e => { setPlastificado_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={plastificado_cant * plastificado_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* kraf */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(208) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>208 KRAF</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={kraf_cant}
                  type="number"
                  className="formatoInput"
                  id="cant208"
                  required
                  min={0}
                  onChange={e => { setKraf_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={kraf_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val208"
                  required
                  min={0}
                  onChange={e => { setKraf_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={kraf_cant * kraf_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>



            <div className="row tablaMateriales" hidden={listaMateriales.includes(299) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>299 Otros papeles</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={otrosPapeles_cant}
                  type="number"
                  className="formatoInput"
                  id="cant299"
                  required
                  min={0}
                  onChange={e => { setOtrosPapeles_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={otrosPapeles_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val299"
                  required
                  min={0}
                  onChange={e => { setOtrosPapeles_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={otrosPapeles_cant * otrosPapeles_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* acrilicos */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(301) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>301 Acrílico</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={acrilico_cant}
                  type="number"
                  className="formatoInput"
                  id="cant301"
                  required
                  min={0}
                  onChange={e => { setAcrilico_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={acrilico_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val301"
                  required
                  min={0}
                  onChange={e => { setAcrilico_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={acrilico_cant * acrilico_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>



            <div className="row tablaMateriales" hidden={listaMateriales.includes(302) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>302 Pasta</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={pasta_cant}
                  type="number"
                  className="formatoInput"
                  id="cant302"
                  required
                  min={0}
                  onChange={e => { setPasta_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={pasta_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val302"
                  required
                  min={0}
                  onChange={e => { setPasta_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={pasta_cant * pasta_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales" hidden={listaMateriales.includes(303) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>303 PET</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={pet_cant}
                  type="number"
                  className="formatoInput"
                  id="cant303"
                  required
                  min={0}
                  onChange={e => { setPet_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={pet_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val303"
                  required
                  min={0}
                  onChange={e => { setPet_valorUnitario(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={pet_cant * pet_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales" hidden={listaMateriales.includes(304) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>304 PVC</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={pvc_cant}
                  type="number"
                  className="formatoInput"
                  id="cant304"
                  required
                  min={0}
                  onChange={e => { setPvc_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={pvc_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val304"
                  required
                  min={0}
                  onChange={e => { setPvc_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={pvc_cant * pvc_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* plastico blanco */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(305) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>305 Plástico Blanco</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={plasticoBlanco_cant}
                  type="number"
                  className="formatoInput"
                  id="cant305"
                  required
                  min={0}
                  onChange={e => { setPlasticoBlanco_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={plasticoBlanco_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val305"
                  required
                  min={0}
                  onChange={e => { setPlasticoBlanco_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={plasticoBlanco_cant * plasticoBlanco_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* polietileno */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(306) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>306 Polietileno</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={polietileno_cant}
                  type="number"
                  className="formatoInput"
                  id="cant306"
                  required
                  min={0}
                  onChange={e => { setPolietileno_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={polietileno_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val306"
                  required
                  min={0}
                  onChange={e => { setPolietileno_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={polietileno_cant * polietileno_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* soplado */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(307) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>307 Soplado</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={soplado_cant}
                  type="number"
                  className="formatoInput"
                  id="cant307"
                  required
                  min={0}
                  onChange={e => { setSoplado_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={soplado_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val307"
                  required
                  min={0}
                  onChange={e => { setSoplado_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={soplado_cant * soplado_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* polipropileno */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(308) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>308 Polipropileno</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={polipropileno_cant}
                  type="number"
                  className="formatoInput"
                  id="cant308"
                  required
                  min={0}
                  onChange={e => { setPolipropileno_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={polipropileno_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val308"
                  required
                  min={0}
                  onChange={e => { setPolipropileno_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={polipropileno_cant * polipropileno_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales" hidden={listaMateriales.includes(399) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>399 Otros plásticos</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={otrosPlasticos_cant}
                  type="number"
                  className="formatoInput"
                  id="cant399"
                  required
                  min={0}
                  onChange={e => { setOtrosPlasticos_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={otrosPlasticos_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val399"
                  required
                  min={0}
                  onChange={e => { setOtrosPlasticos_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={otrosPlasticos_cant * otrosPlasticos_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales" hidden={listaMateriales.includes(499) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>499 Otros Vidrios</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={otrosVidrios_cant}
                  type="number"
                  className="formatoInput"
                  id="cant499"
                  required
                  min={0}
                  onChange={e => { setOtrosVidrios_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={otrosVidrios_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val499"
                  required
                  min={0}
                  onChange={e => { setOtrosVidrios_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={otrosVidrios_cant * otrosVidrios_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* otros textiles */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(599) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>599 Otros Textiles</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={otrosTextiles_cant}
                  type="number"
                  className="formatoInput"
                  id="cant599"
                  required
                  min={0}
                  onChange={e => { setOtrosTextiles_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={otrosTextiles_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val599"
                  required
                  min={0}
                  onChange={e => { setOtrosTextiles_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={otrosTextiles_cant * otrosTextiles_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>
            {/* otros maderables */}
            <div className="row tablaMateriales" hidden={listaMateriales.includes(699) ? false : true}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>699 Otros Maderables</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={otrosMaderables_cant}
                  type="number"
                  className="formatoInput"
                  id="cant699"
                  required
                  min={0}
                  onChange={e => { setOtrosMaderables_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={otrosMaderables_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val599"
                  required
                  min={0}
                  onChange={e => { setOtrosMaderables_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={otrosMaderables_cant * otrosMaderables_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>

            <div className="row tablaMateriales">
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>Otros</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  value={otros_cant}
                  type="number"
                  className="formatoInput"
                  id="cantOtros"
                  required
                  min={0}
                  onChange={e => { setOtros_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  value={otros_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="valOtros"
                  required
                  min={0}
                  onChange={e => { setOtros_valorUnitario(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales container_valorunitario">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  className="formatoInput"
                  id="val101"
                  readOnly
                  min={0}
                  value={otros_cant * otros_valorUnitario}
                  step=".01"
                />
                {/* <MdAttachMoney className="money"/> */}
              </div>
            </div>


            <hr />
            <div className="row tablaMateriales" style={{ paddingBottom: "2vh" }}>
              <div className="col-md-3 col-12 divTablaMateriales">
                <h3>Total</h3>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <span >
                  kg
                </span>
                <input
                  type="number"
                  readOnly
                  className="formatoInput total"
                  id="cantidadTotal"
                  style={{ backgroundColor: "lightgreen" }}
                  value={aluminio_cant + chatarra_cant + cobre_cant + bronce_cant + antimonio_cant + acero_cant + otrosMetales_cant + archivo_cant + carton_cant + chuevos_cant + periodico_cant + plegadiza_cant + tetrapack_cant + plastificado_cant + kraf_cant + otrosPapeles_cant + acrilico_cant + pasta_cant + pet_cant + pvc_cant + plasticoBlanco_cant + polietileno_cant + soplado_cant + polipropileno_cant + otrosPlasticos_cant + otrosVidrios_cant + otrosTextiles_cant + otrosMaderables_cant + otros_cant}
                ></input>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <span >
                  $&nbsp;&nbsp;
                </span>
                <input
                  type="number"
                  readOnly
                  className="formatoInput totalValor total"
                  id="valorTotal"
                  style={{ backgroundColor: "lightgreen" }}
                  value={aluminio_cant * aluminio_valorUnitario + chatarra_cant * chatarra_valorUnitario + cobre_cant * cobre_valorUnitario + bronce_cant * bronce_valorUnitario + antimonio_cant * antimonio_valorUnitario + acero_cant * acero_valorUnitario + otrosMetales_cant * otrosMetales_valorUnitario + archivo_cant * archivo_valorUnitario + carton_cant * carton_valorUnitario + chuevos_cant * chuevos_valorUnitario + periodico_cant * periodico_valorUnitario + plegadiza_cant * plegadiza_valorUnitario + tetrapack_cant * tetrapack_valorUnitario + plastificado_cant * plastificado_valorUnitario + kraf_cant * kraf_valorUnitario + otrosPapeles_cant * otrosPapeles_valorUnitario + acrilico_cant * acrilico_valorUnitario + pasta_cant * pasta_valorUnitario + pet_cant * pet_valorUnitario + pvc_cant * pvc_valorUnitario + plasticoBlanco_cant * plasticoBlanco_valorUnitario + polietileno_cant * polietileno_valorUnitario + soplado_cant * soplado_valorUnitario + polipropileno_cant * polipropileno_valorUnitario + otrosPlasticos_cant * otrosPlasticos_valorUnitario + otrosVidrios_cant * otrosVidrios_valorUnitario + otrosTextiles_cant * otrosTextiles_valorUnitario + otrosMaderables_cant * otrosMaderables_valorUnitario + otros_cant * otros_valorUnitario}
                ></input>
              </div>
            </div>
            <hr></hr>
            <div className="row tablaMateriales justify-content-center" >
              <div className="col-12 " style={{ textAlign: "center" }}>
                <button type="button" className="btn-ingresar-usuario" onClick={elegirVehiculo}>Elegir vehículo</button>
                <label>{"Seleccionado: " + selectedVehiculo}</label>
              </div>

              <div className="col-md-5 col-12" style={{ textAlign: "center" }}>
                <h4>Cargar reporte original</h4>
                <input type="file" className="form-control"
                  onChange={e => (setSelectedFileReporte(e.target.files[0]))}></input>
              </div>

            </div>

            <div className="row justify-content-center">
              <button className="btn-ingresar-usuario enviar text-center w-40" type="button" onClick={verificar} disabled={btnIngresoDisable}>Subir</button>
            </div>
          </form>
        </div>}
    </div>
  );
}
