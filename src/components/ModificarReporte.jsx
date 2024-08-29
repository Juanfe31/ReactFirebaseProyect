import { useState, useEffect, useRef } from "react";
import "../assets/css/ingresarReporte.css";
import '../assets/css/ingresarUsuario.css';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { getReporte, updateReporte } from "../api/Reporte";
import { getBodegas, getEcaByNombreBodega } from "../api/Bodega";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Select from 'react-select';

// icon
import { FaPrint } from "react-icons/fa";

export default function ModificarReporte() {
  const [reporte, setReporte] = useState([]);
  const location = useLocation();
  const [id] = useState(location.state.id);
  const [bodega, setBodega] = useState();
  const [bodegas, setBodegas] = useState([]);

  const [aluminio_cant, setAluminio_cant] = useState(reporte.aluminio_cant);
  const [aluminio_valorUnitario, setAluminio_valorUnitario] = useState(reporte.aluminio_valorUnitario);
  const [chatarra_cant, setChatarra_cant] = useState(reporte.chatarra_cant);
  const [chatarra_valorUnitario, setChatarra_valorUnitario] = useState(reporte.chatarra_valorUnitario);
  const [cobre_cant, setCobre_cant] = useState(reporte.cobre_cant);
  const [cobre_valorUnitario, setCobre_valorUnitario] = useState(reporte.cobre_valorUnitario);
  const [bronce_cant, setBronce_cant] = useState(reporte.bronce_cant);
  const [bronce_valorUnitario, setBronce_valorUnitario] = useState(reporte.bronce_valorUnitario);
  const [antimonio_cant, setAntimonio_cant] = useState(reporte.antimonio_cant);
  const [antimonio_valorUnitario, setAntimonio_valorUnitario] = useState(reporte.antimonio_valorUnitario);
  const [acero_cant, setAcero_cant] = useState(reporte.acero_cant);
  const [acero_valorUnitario, setAcero_valorUnitario] = useState(reporte.acero_valorUnitario);
  const [otrosMetales_cant, setOtrosMetales_cant] = useState(reporte.otrosMetales_cant);
  const [otrosMetales_valorUnitario, setOtrosMetales_valorUnitario] = useState(reporte.otrosMetales_valorUnitario);
  const [archivo_cant, setArchivo_cant] = useState(reporte.archivo_cant);
  const [archivo_valorUnitario, setArchivo_valorUnitario] = useState(reporte.archivo_valorUnitario);
  const [carton_cant, setCarton_cant] = useState(reporte.carton_cant);
  const [carton_valorUnitario, setCarton_valorUnitario] = useState(reporte.carton_valorUnitario);
  const [chuevos_cant, setChuevos_cant] = useState(reporte.chuevos_cant);
  const [chuevos_valorUnitario, setChuevos_valorUnitario] = useState(reporte.chuevos_valorUnitario);
  const [periodico_cant, setPeriodico_cant] = useState(reporte.periodico_cant);
  const [periodico_valorUnitario, setPeriodico_valorUnitario] = useState(reporte.periodico_valorUnitario);
  const [plegadiza_cant, setPlegadiza_cant] = useState(reporte.plegadiza_cant);
  const [plegadiza_valorUnitario, setPlegadiza_valorUnitario] = useState(reporte.plegadiza_valorUnitario);
  const [tetrapack_cant, setTetrapack_cant] = useState(reporte.tetrapack_cant);
  const [tetrapack_valorUnitario, setTetrapack_valorUnitario] = useState(reporte.tetrapack_valorUnitario);
  const [plastificado_cant, setPlastificado_cant] = useState(reporte.plastificado_cant);
  const [plastificado_valorUnitario, setPlastificado_valorUnitario] = useState(reporte.plastificado_valorUnitario);
  const [kraf_cant, setKraf_cant] = useState(reporte.kraf_cant);
  const [kraf_valorUnitario, setKraf_valorUnitario] = useState(reporte.kraf_valorUnitario);
  const [otrosPapeles_cant, setOtrosPapeles_cant] = useState(reporte.otrosPapeles_cant);
  const [otrosPapeles_valorUnitario, setOtrosPapeles_valorUnitario] = useState(reporte.otrosPapeles_valorUnitario);
  const [acrilico_cant, setAcrilico_cant] = useState(reporte.acrilico_cant);
  const [acrilico_valorUnitario, setAcrilico_valorUnitario] = useState(reporte.acrilico_valorUnitario);
  const [pasta_cant, setPasta_cant] = useState(reporte.pasta_cant);
  const [pasta_valorUnitario, setPasta_valorUnitario] = useState(reporte.pasta_valorUnitario);
  const [pet_cant, setPet_cant] = useState(reporte.pet_cant);
  const [pet_valorUnitario, setPet_valorUnitario] = useState(reporte.pet_valorUnitario);
  const [pvc_cant, setPvc_cant] = useState(reporte.pvc_cant);
  const [pvc_valorUnitario, setPvc_valorUnitario] = useState(reporte.pvc_valorUnitario);
  const [plasticoBlanco_cant, setPlasticoBlanco_cant] = useState(reporte.plasticoBlanco_cant);
  const [plasticoBlanco_valorUnitario, setPlasticoBlanco_valorUnitario] = useState(reporte.plasticoBlanco_valorUnitario);
  const [polietileno_cant, setPolietileno_cant] = useState(reporte.polietileno_cant);
  const [polietileno_valorUnitario, setPolietileno_valorUnitario] = useState(reporte.polietileno_valorUnitario);
  const [soplado_cant, setSoplado_cant] = useState(reporte.soplado_cant);
  const [soplado_valorUnitario, setSoplado_valorUnitario] = useState(reporte.soplado_valorUnitario);
  const [polipropileno_cant, setPolipropileno_cant] = useState(reporte.polipropileno_cant);
  const [polipropileno_valorUnitario, setPolipropileno_valorUnitario] = useState(reporte.polipropileno_valorUnitario);
  const [otrosPlasticos_cant, setOtrosPlasticos_cant] = useState(reporte.otrosPlasticos_cant);
  const [otrosPlasticos_valorUnitario, setOtrosPlasticos_valorUnitario] = useState(reporte.otrosPlasticos_valorUnitario);
  const [otrosVidrios_cant, setOtrosVidrios_cant] = useState(reporte.otrosVidrios_cant);
  const [otrosVidrios_valorUnitario, setOtrosVidrios_valorUnitario] = useState(reporte.otrosVidrios_valorUnitario);
  const [otrosTextiles_cant, setOtrosTextiles_cant] = useState(reporte.otrosTextiles_cant);
  const [otrosTextiles_valorUnitario, setOtrosTextiles_valorUnitario] = useState(reporte.otrosTextiles_valorUnitario);
  const [otrosMaderables_cant, setOtrosMaderables_cant] = useState(reporte.otrosMaderables_cant);
  const [otrosMaderables_valorUnitario, setOtrosMaderables_valorUnitario] = useState(reporte.otrosMaderables_valorUnitario);
  const [otros_cant, setOtros_cant] = useState(reporte.otros_cant);
  const [otros_valorUnitario, setOtros_valorUnitario] = useState(reporte.otros_valorUnitario);
  const [todayDate] = useState(null);
  const [busy, setBusy] = useState(false);

  const [fecha, setFecha] = useState("");

  // labels for mobile
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const getReporteF = async () => {
      const getReporteAPI = await getReporte(id);
      setReporte(getReporteAPI);
    }
    getReporteF();

  }, [id])

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

  const shouldShowButton = windowWidth > 768; // Adjust the breakpoint as needed

  useEffect(() => {
    const getReporteF = async () => {
      setAluminio_cant(reporte.aluminio_cant);
      setAluminio_valorUnitario(reporte.aluminio_valorUnitario);
      setChatarra_cant(reporte.chatarra_cant);
      setChatarra_valorUnitario(reporte.chatarra_valorUnitario);
      setCobre_cant(reporte.cobre_cant);
      setCobre_valorUnitario(reporte.cobre_valorUnitario);
      setBronce_cant(reporte.bronce_cant);
      setBronce_valorUnitario(reporte.bronce_valorUnitario);
      setAntimonio_cant(reporte.antimonio_cant);
      setAntimonio_valorUnitario(reporte.antimonio_valorUnitario);
      setAcero_cant(reporte.acero_cant);
      setAcero_valorUnitario(reporte.acero_valorUnitario);
      setOtrosMetales_cant(reporte.otrosMetales_cant);
      setOtrosMetales_valorUnitario(reporte.otrosMetales_valorUnitario);
      setArchivo_cant(reporte.archivo_cant);
      setArchivo_valorUnitario(reporte.archivo_valorUnitario);
      setCarton_cant(reporte.carton_cant);
      setCarton_valorUnitario(reporte.carton_valorUnitario);
      setChuevos_cant(reporte.chuevos_cant);
      setChuevos_valorUnitario(reporte.chuevos_valorUnitario);
      setPeriodico_cant(reporte.periodico_cant);
      setPeriodico_valorUnitario(reporte.periodico_valorUnitario);
      setPlegadiza_cant(reporte.plegadiza_cant);
      setPlegadiza_valorUnitario(reporte.plegadiza_valorUnitario);
      setTetrapack_cant(reporte.tetrapack_cant);
      setTetrapack_valorUnitario(reporte.tetrapack_valorUnitario);
      setPlastificado_cant(reporte.plastificado_cant);
      setPlastificado_valorUnitario(reporte.plastificado_valorUnitario);
      setKraf_cant(reporte.kraf_cant);
      setKraf_valorUnitario(reporte.kraf_valorUnitario);
      setOtrosPapeles_cant(reporte.otrosPapeles_cant);
      setOtrosPapeles_valorUnitario(reporte.otrosPapeles_valorUnitario);
      setAcrilico_cant(reporte.acrilico_cant);
      setAcrilico_valorUnitario(reporte.acrilico_valorUnitario);
      setPasta_cant(reporte.pasta_cant);
      setPasta_valorUnitario(reporte.pasta_valorUnitario);
      setPet_cant(reporte.pet_cant);
      setPet_valorUnitario(reporte.pet_valorUnitario);
      setPvc_cant(reporte.pvc_cant);
      setPvc_valorUnitario(reporte.pvc_valorUnitario);
      setPlasticoBlanco_cant(reporte.plasticoBlanco_cant);
      setPlasticoBlanco_valorUnitario(reporte.plasticoBlanco_valorUnitario);
      setPolietileno_cant(reporte.polietileno_cant);
      setPolietileno_valorUnitario(reporte.polietileno_valorUnitario);
      setSoplado_cant(reporte.soplado_cant);
      setSoplado_valorUnitario(reporte.soplado_valorUnitario);
      setPolipropileno_cant(reporte.polipropileno_cant);
      setPolipropileno_valorUnitario(reporte.polipropileno_valorUnitario);
      setOtrosPlasticos_cant(reporte.otrosPlasticos_cant);
      setOtrosPlasticos_valorUnitario(reporte.otrosPlasticos_valorUnitario);
      setOtrosVidrios_cant(reporte.otrosVidrios_cant);
      setOtrosVidrios_valorUnitario(reporte.otrosVidrios_valorUnitario);
      setOtrosTextiles_cant(reporte.otrosTextiles_cant);
      setOtrosTextiles_valorUnitario(reporte.otrosTextiles_valorUnitario);
      setOtrosMaderables_cant(reporte.otrosMaderables_cant);
      setOtrosMaderables_valorUnitario(reporte.otrosMaderables_valorUnitario);
      setOtros_cant(reporte.otros_cant);
      setOtros_valorUnitario(reporte.otros_valorUnitario);
      setBodega(reporte.bodega);
      setFecha(reporte.fecha);

      setBusy(false);
    }
    getReporteF();

  }, [reporte.aluminio_cant, reporte.aluminio_valorUnitario, reporte.chatarra_cant, reporte.chatarra_valorUnitario, reporte.cobre_cant, reporte.cobre_valorUnitario, reporte.bronce_cant, reporte.bronce_valorUnitario, reporte.acero_cant, reporte.acero_valorUnitario, reporte.otrosMetales_cant, reporte.otrosMetales_valorUnitario, reporte.archivo_cant, reporte.archivo_valorUnitario, reporte.carton_cant, reporte.carton_valorUnitario, reporte.chuevos_cant, reporte.chuevos_valorUnitario, reporte.periodico_cant, reporte.periodico_valorUnitario, reporte.plegadiza_cant, reporte.plegadiza_valorUnitario, reporte.tetrapack_cant, reporte.tetrapack_valorUnitario, reporte.otrosPapeles_cant, reporte.otrosPapeles_valorUnitario, reporte.pasta_cant, reporte.pasta_valorUnitario, reporte.pet_cant, reporte.pet_valorUnitario, reporte.pvc_cant, reporte.pvc_valorUnitario, reporte.otrosPlasticos_cant, reporte.otrosPlasticos_valorUnitario, reporte.otrosVidrios_cant, reporte.otrosVidrios_valorUnitario, reporte.otros_cant, reporte.otros_valorUnitario, todayDate, reporte.antimonio_cant, reporte.antimonio_valorUnitario, reporte.plastificado_cant, reporte.plastificado_valorUnitario, reporte.kraf_cant, reporte.kraf_valorUnitario, reporte.acrilico_cant, reporte.acrilico_valorUnitario, reporte.plasticoBlanco_cant, reporte.plasticoBlanco_valorUnitario, reporte.polietileno_cant, reporte.polietileno_valorUnitario, reporte.soplado_cant, reporte.soplado_valorUnitario, reporte.polipropileno_cant, reporte.polipropileno_valorUnitario, reporte.otrosTextiles_cant, reporte.otrosTextiles_valorUnitario, reporte.otrosMaderables_cant, reporte.otrosMaderables_valorUnitario, reporte.fecha, reporte.bodega])







  const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);
  const [read] = useState(location.state.read);

  //imprimir
  const componentPDF = useRef();
  const navigate = useNavigate();



  const generatePDF = async () => {
    const element = componentPDF.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    // logo
    var image = "data:image/png;base64,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";
    pdf.addImage(image, 'PNG', 1, 1, 15, 15);

    pdf.addImage(data, 'PNG', 0, 20, pdfWidth, pdfHeight);
    pdf.save('Reporte ' + reporte.nro_reporte + '.pdf');
  };



  const opcionesBodega = bodegas.map((bodega) => (
    { ...{ value: bodega.nombre_bodega, label: bodega.nombre_bodega } }

  ))

  const navegarConsultarIndocumentado = async () => {
    await navigate("../app/consultarreporte");
  }

  const actualizarReporte = async () => {

    await updateReporte(
      reporte,
      location.state.id,
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
      await getEcaByNombreBodega(bodega)
    );
    await navegarConsultarIndocumentado();
  }

  const actualizar = async () => {
    if (fecha === null || fecha === '' || isNaN(aluminio_cant) || isNaN(aluminio_valorUnitario)
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
    } else {
      Swal.fire({
        title: 'Verifique con el reporte físico',
        text: "Total : " + document.getElementById('cantidadTotal').value + " Kg, con un valor total de $" + document.getElementById('valorTotal').value,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Regresar',
        showCancelButton: true,
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          setBtnIngresoDisable(true);
          actualizarReporte();
          // navigate('../app/consultarreporte');
        }

      })

    }
  }

  return (
    <div className="container-fluid contenido-ingresar-usuario"  >
      <div className="row header" >
        <h1>Editar Reportes</h1>
      </div>

      <div className="row hide justify-content-center"  >
        {/* <img src={logito} alt="" srcset="" /> */}
        {!busy &&
          <form className="formReporte" ref={componentPDF}>
            <div className="row justify-content-center">
              
            <div className="col-md-3 col-12 text-center">
                <div className='row justify-content-center my-2'>
                  <label className="col-10">Documento</label>
                  <div className="col-10">
                    <input type="text" className="form-control " value={reporte.documento || reporte.codigoId} readOnly  style={{ textAlign: 'center' }} />
                    {/* <input type="text" className="form-control " value={} readOnly style={{ textAlign: 'center' }} /> */}
                  </div>
                </div>
              </div>

              <div className="col-md-3 col-12 text-center">
                <div className='row justify-content-center my-2'>
                  <label className="col-10">Nombre</label>
                  <div className="col-10">
                    <input type="text" className="form-control " value={reporte.nombre} readOnly style={{ textAlign: 'center' }} />
                  </div>
                </div>
              </div>


              <div className="col-md-3 col-12 text-center " >
                <div className='row justify-content-center my-2'>
                  <label className="col-10">N°reporte</label>
                  <div className="col-10">
                    <input type="text" className="form-control " value={reporte.nro_reporte} readOnly style={{ textAlign: 'center' }} />
                  </div>
                </div>
              </div>

              {/* imprimir */}
              <div className="col-md-1 col-12 my-3" hidden={!shouldShowButton }>
                <div type="button" value="Imprimir" onClick={generatePDF} >
                  <FaPrint size="1.6rem" />
                </div>
              </div>
              {/* fin imprimir */}
            </div>
            

            <div className="row tablaMateriales justify-content-center ">

              <div className="col-md-6 col-12 divTablaMateriales">
                <div className="row justify-content-center">
                  <h5>Bodega</h5>
                  <Select type="text" defaultValue={{ value: location.state.bodega, label: location.state.bodega }} className="col-md-8 col-10 " options={opcionesBodega} onChange={(e) => (setBodega(e.value))}>
                  </Select>
                </div>
              </div>

              <div className="col-md-6 col-12 divTablaMateriales">
                <div className="row justify-content-center">
                  <h5>Fecha</h5>
                  <div className="col-10 ">
                    <input
                      type="date"
                      className="form-control"
                      defaultValue={reporte.fecha}
                      onChange={e => { setFecha(e.target.value) }}
                      readOnly={read}
                    ></input>
                  </div>
                </div>
              </div>
            </div>


            <div className="row tablaMateriales justify-content-center">
              <h2
                style={{ textAlign: "center", fontWeight: "750", paddingTop: "2%" }}
              >
                Informacion del reporte de venta
              </h2>


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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>101 Aluminio</h4>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={aluminio_cant}
                  type="number"
                  className="formatoInput"
                  id="cant101"
                  required
                  min={0}
                  onChange={e => { setAluminio_cant(e.target.valueAsNumber); }}
                  onKeyDown={e => { setAluminio_cant(e.target.valueAsNumber); }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 col-6 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={aluminio_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val101"
                  required
                  min={0}
                  onChange={e => { setAluminio_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setAluminio_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
                  step=".01"
                ></input>
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>102 Chatarra</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={chatarra_cant}
                  type="number"
                  className="formatoInput"
                  id="cant102"
                  required
                  min={0}
                  onChange={e => { setChatarra_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setChatarra_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={chatarra_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val102"
                  required
                  min={0}
                  onChange={e => { setChatarra_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setChatarra_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}

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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>103 Cobre</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={cobre_cant}
                  type="number"
                  className="formatoInput"
                  id="cant103"
                  required
                  min={0}
                  onChange={e => { setCobre_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setCobre_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={cobre_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val103"
                  required
                  min={0}
                  onChange={e => { setCobre_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setCobre_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>104 Bronce</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={bronce_cant}
                  type="number"
                  className="formatoInput"
                  id="cant104"
                  required
                  min={0}
                  onChange={e => { setBronce_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setBronce_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={bronce_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val104"
                  required
                  min={0}
                  onChange={e => { setBronce_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setBronce_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales">
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>105 Antimonio</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={antimonio_cant}
                  type="number"
                  className="formatoInput"
                  id="cant105"
                  required
                  min={0}
                  onChange={e => { setAntimonio_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setAntimonio_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={antimonio_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val105"
                  required
                  min={0}
                  onChange={e => { setAntimonio_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setAntimonio_valorUnitario(e.target.valueAsNumber) }}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>106 Acero</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={acero_cant}
                  type="number"
                  className="formatoInput"
                  id="cant106"
                  required
                  min={0}
                  onChange={e => { setAcero_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setAcero_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={acero_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val106"
                  required
                  min={0}
                  onChange={e => { setAcero_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setAcero_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>199 Otros metales</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={otrosMetales_cant}
                  type="number"
                  className="formatoInput"
                  id="cant199"
                  required
                  min={0}
                  onChange={e => { setOtrosMetales_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosMetales_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={otrosMetales_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val199"
                  required
                  min={0}
                  onChange={e => { setOtrosMetales_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosMetales_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>201 Archivo</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={archivo_cant}
                  type="number"
                  className="formatoInput"
                  id="cant201"
                  required
                  min={0}
                  onChange={e => { setArchivo_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setArchivo_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={archivo_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val201"
                  required
                  min={0}
                  onChange={e => { setArchivo_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setArchivo_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>202 Cartón</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={carton_cant}
                  type="number"
                  className="formatoInput"
                  id="cant202"
                  required
                  min={0}
                  onChange={e => { setCarton_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setCarton_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={carton_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val202"
                  required
                  min={0}
                  onChange={e => { setCarton_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setCarton_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}

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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>203 Cubeta huevos</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={chuevos_cant}
                  type="number"
                  className="formatoInput"
                  id="cant203"
                  required
                  min={0}
                  onChange={e => { setChuevos_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setChuevos_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={chuevos_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val203"
                  required
                  min={0}
                  onChange={e => { setChuevos_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setChuevos_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>204 Periódico</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={periodico_cant}
                  type="number"
                  className="formatoInput"
                  id="cant204"
                  required
                  min={0}
                  onChange={e => { setPeriodico_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPeriodico_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={periodico_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val204"
                  required
                  min={0}
                  onChange={e => { setPeriodico_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPeriodico_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>205 Plegadiza</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={plegadiza_cant}
                  type="number"
                  className="formatoInput"
                  id="cant205"
                  required
                  min={0}
                  onChange={e => { setPlegadiza_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPlegadiza_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={plegadiza_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val205"
                  required
                  min={0}
                  onChange={e => { setPlegadiza_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPlegadiza_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>206 Tetrapack</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={tetrapack_cant}
                  type="number"
                  className="formatoInput"
                  id="cant206"
                  required
                  min={0}
                  onChange={e => { setTetrapack_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setTetrapack_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={tetrapack_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val206"
                  required
                  min={0}
                  onChange={e => { setTetrapack_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setTetrapack_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>207 Plastificado</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={plastificado_cant}
                  type="number"
                  className="formatoInput"
                  id="cant207"
                  required
                  min={0}
                  onChange={e => { setPlastificado_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPlastificado_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={plastificado_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val207"
                  required
                  min={0}
                  onChange={e => { setPlastificado_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPlastificado_valorUnitario(e.target.valueAsNumber) }}
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
            <div className="row tablaMateriales">
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>208 KRAF</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={kraf_cant}
                  type="number"
                  className="formatoInput"
                  id="cant208"
                  required
                  min={0}
                  onChange={e => { setKraf_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setKraf_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={kraf_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val208"
                  required
                  min={0}
                  onChange={e => { setKraf_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setKraf_valorUnitario(e.target.valueAsNumber) }}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>299 Otros papeles</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={otrosPapeles_cant}
                  type="number"
                  className="formatoInput"
                  id="cant299"
                  required
                  min={0}
                  onChange={e => { setOtrosPapeles_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosPapeles_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={otrosPapeles_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val299"
                  required
                  min={0}
                  onChange={e => { setOtrosPapeles_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosPapeles_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}

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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>301 Acrílico</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={acrilico_cant}
                  type="number"
                  className="formatoInput"
                  id="cant301"
                  required
                  min={0}
                  onChange={e => { setAcrilico_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setAcrilico_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={acrilico_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val301"
                  required
                  min={0}
                  onChange={e => { setAcrilico_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setAcrilico_valorUnitario(e.target.valueAsNumber) }}
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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>302 Pasta</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={pasta_cant}
                  type="number"
                  className="formatoInput"
                  id="cant302"
                  required
                  min={0}
                  onChange={e => { setPasta_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPasta_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={pasta_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val302"
                  required
                  min={0}
                  onChange={e => { setPasta_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPasta_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}

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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>303 PET</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={pet_cant}
                  type="number"
                  className="formatoInput"
                  id="cant303"
                  required
                  min={0}
                  onChange={e => { setPet_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPet_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 col-12 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={pet_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val303"
                  required
                  min={0}
                  onChange={e => { setPet_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPet_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>304 PVC</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={pvc_cant}
                  type="number"
                  className="formatoInput"
                  id="cant304"
                  required
                  min={0}
                  onChange={e => { setPvc_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPvc_cant(e.target.valueAsNumber) }}
                  readOnly={read}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={pvc_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val304"
                  required
                  min={0}
                  onChange={e => { setPvc_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPvc_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>305 Plástico Blanco</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={plasticoBlanco_cant}
                  type="number"
                  className="formatoInput"
                  id="cant305"
                  required
                  min={0}
                  onChange={e => { setPlasticoBlanco_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPlasticoBlanco_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={plasticoBlanco_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val305"
                  required
                  min={0}
                  onChange={e => { setPlasticoBlanco_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPlasticoBlanco_valorUnitario(e.target.valueAsNumber) }}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>306 Polietileno</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={polietileno_cant}
                  type="number"
                  className="formatoInput"
                  id="cant306"
                  required
                  min={0}
                  onChange={e => { setPolietileno_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPolietileno_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={polietileno_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val306"
                  required
                  min={0}
                  onChange={e => { setPolietileno_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPolietileno_valorUnitario(e.target.valueAsNumber) }}
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
            <div className="row tablaMateriales">
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>307 Soplado</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={soplado_cant}
                  type="number"
                  className="formatoInput"
                  id="cant307"
                  required
                  min={0}
                  onChange={e => { setSoplado_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setSoplado_cant(e.target.valueAsNumber) }}

                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={soplado_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val307"
                  required
                  min={0}
                  onChange={e => { setSoplado_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setSoplado_valorUnitario(e.target.valueAsNumber) }}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>308 Polipropileno</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={polipropileno_cant}
                  type="number"
                  className="formatoInput"
                  id="cant308"
                  required
                  min={0}
                  onChange={e => { setPolipropileno_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPolipropileno_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={polipropileno_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val308"
                  required
                  min={0}
                  onChange={e => { setPolipropileno_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setPolipropileno_valorUnitario(e.target.valueAsNumber) }}
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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>399 Otros plásticos</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={otrosPlasticos_cant}
                  type="number"
                  className="formatoInput"
                  id="cant399"
                  required
                  min={0}
                  onChange={e => { setOtrosPlasticos_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosPlasticos_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={otrosPlasticos_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val399"
                  required
                  min={0}
                  onChange={e => { setOtrosPlasticos_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosPlasticos_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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

            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>499 Otros Vidrios</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={otrosVidrios_cant}
                  type="number"
                  className="formatoInput"
                  id="cant499"
                  required
                  min={0}
                  onChange={e => { setOtrosVidrios_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosVidrios_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={otrosVidrios_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val499"
                  required
                  min={0}
                  onChange={e => { setOtrosVidrios_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosVidrios_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>599 Otros Textiles</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={otrosTextiles_cant}
                  type="number"
                  className="formatoInput"
                  id="cant599"
                  required
                  min={0}
                  onChange={e => { setOtrosTextiles_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosTextiles_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={otrosTextiles_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val599"
                  required
                  min={0}
                  onChange={e => { setOtrosTextiles_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosTextiles_valorUnitario(e.target.valueAsNumber) }}
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
            <div className="row tablaMateriales" >
              <div className="col-md-3 col-12 divTablaMateriales">
                <h4>699 Otros Maderables</h4>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  kg
                </span>
                <input
                  defaultValue={otrosMaderables_cant}
                  type="number"
                  className="formatoInput"
                  id="cant699"
                  required
                  min={0}
                  onChange={e => { setOtrosMaderables_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosMaderables_cant(e.target.valueAsNumber) }}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={otrosMaderables_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="val599"
                  required
                  min={0}
                  onChange={e => { setOtrosMaderables_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtrosMaderables_valorUnitario(e.target.valueAsNumber) }}
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
                  defaultValue={otros_cant}
                  type="number"
                  className="formatoInput"
                  id="cantOtros"
                  required
                  min={0}
                  onChange={e => { setOtros_cant(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtros_cant(e.target.valueAsNumber) }}
                  readOnly={read}
                ></input>
              </div>
              <div className="col-md-3 divTablaMateriales">
                <span hidden={shouldShowButton}>
                  $&nbsp;&nbsp;
                </span>
                <input
                  defaultValue={otros_valorUnitario}
                  type="number"
                  className="formatoInput"
                  id="valOtros"
                  required
                  min={0}
                  onChange={e => { setOtros_valorUnitario(e.target.valueAsNumber) }}
                  onKeyDown={e => { setOtros_valorUnitario(e.target.valueAsNumber) }}
                  readOnly={read}
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

          </form>
        }


        <div
          className="row tablaMateriales justify-content-center"
          style={{ textAlign: "center", paddingBottom: "5vh" }}
        >
          <div className="col-md-5 col-12" style={{ textAlign: "center" }}>
            <h4>Cargar reporte original</h4>
            <input type="file" className="form-control" hidden={read}></input>
          </div>
        </div>
        {!busy &&
          <div className="row tablaMateriales justify-content-center">
            <button className="botonReporte col-md-3 col-10" type="button" onClick={actualizar} disabled={btnIngresoDisable} hidden={read}>Actualizar</button>
            <button className="botonReporte col-md-3 col-10" type="button" onClick={() => { navigate('../app/consultarreporte'); }} disabled={btnIngresoDisable}>Volver</button>
          </div>

        }
      </div>
    </div>
  );
}
