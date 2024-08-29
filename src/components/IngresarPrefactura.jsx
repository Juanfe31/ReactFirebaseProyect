import React from "react";
import { useState, useEffect,useRef } from 'react'
import "../assets/css/ingresarReporte.css";
import '../assets/css/ingresarUsuario.css';
import { getBodegas } from "../api/Bodega";
import { getReportesBodegaFecha } from "../api/Reporte";
import Select from 'react-select'
import Swal from "sweetalert2";
// imprimir
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


export default function IngresarReporte() {
  //Hora actual
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  
  const formattedDate = `${year}-${month}`;
  //Variables iniciales
  const [bodegas, setBodegas] = useState([]);
  const [nombreBodega, setNombreBodega] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [reportes, setReportes] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [toggleShow, setToggleShow] = useState(true);

  //imprimir
  const componentPDF = useRef();

  //Listeners para los valores unitarios
    const [aluminio_valorUnitario, setAluminio_valorUnitario] = useState(0);
  const [chatarra_valorUnitario, setChatarra_valorUnitario] = useState(0);
  const [cobre_valorUnitario, setCobre_valorUnitario] = useState(0);
  const [bronce_valorUnitario, setBronce_valorUnitario] = useState(0);
  const [antimonio_valorUnitario, setAntimonio_valorUnitario] = useState(0);  
  const [acero_valorUnitario, setAcero_valorUnitario] = useState(0);
  const [otrosMetales_valorUnitario, setOtrosMetales_valorUnitario] = useState(0);
  const [archivo_valorUnitario, setArchivo_valorUnitario] = useState(0);
  const [carton_valorUnitario, setCarton_valorUnitario] = useState(0);
  const [chuevos_valorUnitario, setChuevos_valorUnitario] = useState(0);
  const [periodico_valorUnitario, setPeriodico_valorUnitario] = useState(0);
  const [plegadiza_valorUnitario, setPlegadiza_valorUnitario] = useState(0);
  const [tetrapack_valorUnitario, setTetrapack_valorUnitario] = useState(0);
  const [plastificado_valorUnitario, setPlastificado_valorUnitario] = useState(0);
  const [kraf_valorUnitario, setKraf_valorUnitario] = useState(0);
  const [otrosPapeles_valorUnitario, setOtrosPapeles_valorUnitario] = useState(0);
  const [acrilico_valorUnitario, setAcrilico_valorUnitario] = useState(0);
  const [pasta_valorUnitario, setPasta_valorUnitario] = useState(0);
  const [pet_valorUnitario, setPet_valorUnitario] = useState(0);
  const [pvc_valorUnitario, setPvc_valorUnitario] = useState(0);
const [plasticoBlanco_valorUnitario, setPlasticoBlanco_valorUnitario] = useState(0);
const [polietileno_valorUnitario, setPolietileno_valorUnitario] = useState(0);
const [soplado_valorUnitario, setSoplado_valorUnitario] = useState(0);
const [polipropileno_valorUnitario, setPolipropileno_valorUnitario] = useState(0);
  const [otrosPlasticos_valorUnitario, setOtrosPlasticos_valorUnitario] = useState(0);
  const [otrosVidrios_valorUnitario, setOtrosVidrios_valorUnitario] = useState(0);
const [otrosTextiles_valorUnitario, setOtrosTextiles_valorUnitario] = useState(0);
const [otrosMaderables_valorUnitario, setOtrosMaderables_valorUnitario] = useState(0);
  const [otros_valorUnitario, setOtros_valorUnitario] = useState(0);


  useEffect(() => {

    const fetchBodegas = async () => {
      const TodasLasBodegas = await getBodegas();
      setBodegas(TodasLasBodegas);
    }
    fetchBodegas();
  }, [])

  const opcionesBodega = bodegas.map((bodega) => (
    { ...{ value: bodega.nombre_bodega, label: bodega.nombre_bodega } }

  ))


  const generatePDF = async () => {
    const element =componentPDF.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
        (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('prueba.pdf');
};

  const callback = async (nBodega,periodo) => {
    if (nBodega === "") {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione una bodega',
        text: '¡No ha seleccionado una bodega!'
      });
    } else if (periodo === "") {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione un periodo',
        text: '¡No ha ingresado un periodo!'
      });
    }else if (periodo>formattedDate) {
      Swal.fire({
        icon: 'error',
        title: 'Periodo incorrecto',
        text: '¡No puede seleccionar un periodo superior al actual!'
      });
    }else{
      
      const TodasLosReportes = await getReportesBodegaFecha(nBodega, periodo);
      if(TodasLosReportes.length>0){
        setReportes(TodasLosReportes);
        setToggleShow(false)
      
      
      for (let i = 0; i < TodasLosReportes.length; i++) {
         
         handleSumaCantidades(TodasLosReportes[i])
      }
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Revisa los datos',
          text: 'Para los datos ingresados no hay reportes o ya fueron usados'
        });
      }

    }
  }


  const handleSumaCantidades = async (data) => {
    
    setCantidades((prevValues) => {
      const newValues = { ...prevValues };
  
      Object.keys(data).forEach((key) => {
        if (newValues[key]) {
          newValues[key] += data[key];
        } else {
          newValues[key] = data[key];
        }
      });
      
      return newValues;
    });
  };

  const verReportesUsados= ()=>{
    Swal.fire({
      title: 'Visualizar reportes',
      html: `
        <table class="table-responsive" style="margin: 0 auto;" border="1">
          <thead>
            <tr>
              <th style="padding: 8px;"># reporte</th>
              <th style="padding: 8px;">Nombre recuperador</th>
              <th style="padding: 8px;">Fecha</th>
            </tr>
          </thead>
          <tbody>
            ${reportes
              .map(
                (reporte, index) =>
                  `<tr key=${index}>
                    <td style="padding: 5px;">${reporte.nro_reporte}</td>
                    <td style="padding: 5px;">${reporte.nombre}</td>
                    <td style="padding: 5px;">${reporte.fecha}</td>
                  </tr>`
              )
              .join('')}
          </tbody>
        </table>
      `,
    });
    
    
    
  }
  console.log(nombreBodega)
  return (
    
    <div  className="container-fluid contenido-ingresar-usuario"ref={componentPDF} >
      <div className="row">
        <div className="col-12 header">
          <h1>Registro Prefactura</h1>
        </div>
      </div>
      <form className="formReporte">
        <div className="row">
          <div className="col-6 justify-content-center divCedula">
            <label>Nombre Bodega</label>
            <Select type="text" className="col-12 " isDisabled={toggleShow ? false : true} options={opcionesBodega} onChange={(e) => (setNombreBodega(e.value))}>

            </Select>

          </div>
          
          <div className="col-6 justify-content-center divCedula">
            <label>Periodo</label>
            <input type="month" min={"2005-01"} placeholder="Ej:2023-06" max={formattedDate} className="formatoInput" disabled={toggleShow ? false : true} onChange={(e) => (setPeriodo(e.target.value))}></input>
          </div>

          <div className="col-12 divCedula">
            <button type="button" className="botonReporte" disabled={toggleShow ? false : true} onClick={async() => {  await callback(nombreBodega,periodo);}}>
              Crear prefactura
            </button>
          </div>
        </div>
      </form>
      <hr />
      <form className="formReporte"  hidden={toggleShow}>
        <div className="row">
          <div className="col-4">
            <label>N° reportes usados</label>
            <input type="text" className="formatoInput" readOnly value={reportes.length} ></input>
          </div>

          <div className="col-4">
            
            <button type="button" className="formatoInput" onClick={(e)=>(verReportesUsados())}> Ver reportes usados</button>
          </div>
          <div className="col-4">
            <label>N° reporte</label>
            <input type="text" className="formatoInput" readOnly></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <h2
            style={{ textAlign: "center", fontWeight: "750", paddingTop: "2%" }}
          >
            Informacion de la prefactura
          </h2>
          <div className="col-3 divTablaMateriales">
            <h3>Código</h3>
          </div>

          <div className="col-3 divTablaMateriales">
            <h3>Cantidad (Ton)</h3>
          </div>
          <div className="col-3 divTablaMateriales">
            <h3> Valor unitario(COP)</h3>
          </div>
          <div className="col-3 divTablaMateriales">
            <h3> Valor parcial (COP)</h3>
          </div>
        </div>
        <hr />

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>101 Aluminio</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant101"
              readOnly
              value={cantidades.aluminio_cant/1000}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              placeholder={(cantidades.aluminio_valorUnitario/reportes.length)*1000}
              onChange={(e)=>(setAluminio_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              readOnly
              value={(cantidades.aluminio_cant/1000)*aluminio_valorUnitario}
              min={0}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>102 Chatarra</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant102"
              required
              readOnly
              value={cantidades.chatarra_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val102"
              required
              value={chatarra_valorUnitario}
              onChange={(e)=>(setChatarra_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.chatarra_cant/1000)*chatarra_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>103 Cobre</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant103"
              required
              readOnly
              value={cantidades.cobre_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val103"
              required
              value={cobre_valorUnitario}
              onChange={(e)=>(setCobre_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.cobre_cant/1000)*cobre_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>104 Bronce</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant104"
              required
              readOnly
              value={cantidades.bronce_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val104"
              value={bronce_valorUnitario}
              onChange={(e)=>(setBronce_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.bronce_cant/1000)*bronce_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>105 Antimonio</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant105"
              required
              readOnly
              value={cantidades.antimonio_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val105"
              value={antimonio_valorUnitario}
              onChange={(e)=>(setAntimonio_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.antimonio_cant/1000)*antimonio_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>106 Acero</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant106"
              required
              readOnly
              value={cantidades.acero_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val106"
              required
              value={acero_valorUnitario}
              onChange={(e)=>(setAcero_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.acero_cant/1000)*acero_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>199 Otros metales</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant199"
              required
              readOnly
              value={cantidades.otrosMetales_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val199"
              required
              value={otrosMetales_valorUnitario}
              onChange={(e)=>(setOtrosMetales_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.otrosMetales_cant/1000)*otrosMetales_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>201 Archivo</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant201"
              required
              readOnly
              value={cantidades.archivo_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val201"
              value={archivo_valorUnitario}
              onChange={(e)=>(setArchivo_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.archivo_cant/1000)*archivo_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>202 Cartón</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant202"
              required
              readOnly
              value={cantidades.carton_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val202"
              required
              value={carton_valorUnitario}
              onChange={(e)=>(setCarton_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.carton_cant/1000)*carton_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>203 Cubeta huevos</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant203"
              required
              readOnly
              value={cantidades.chuevos_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val203"
              required
              value={chuevos_valorUnitario}
              onChange={(e)=>(setChuevos_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.chuevos_cant/1000)*chuevos_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>204 Periódico</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant204"
              required
              readOnly
              value={cantidades.periodico_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val204"
              value={periodico_valorUnitario}
              onChange={(e)=>(setPeriodico_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.periodico_cant/1000)*periodico_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>205 Plegadiza</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant205"
              required
              readOnly
              value={cantidades.plegadiza_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val205"
              required
              value={plegadiza_valorUnitario}
              onChange={(e)=>(setPlegadiza_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.plegadiza_cant/1000)*plegadiza_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>206 Tetrapack</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant206"
              required
              readOnly
              value={cantidades.tetrapack_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val206"
              required
              value={tetrapack_valorUnitario}
              onChange={(e)=>(setTetrapack_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.tetrapack_cant/1000)*tetrapack_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>207 Plastificado</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant207"
              required
              readOnly
              value={cantidades.plastificado_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val207"
              required
              value={plastificado_valorUnitario}
              onChange={(e)=>(setPlastificado_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.plastificado_cant/1000)*plastificado_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>208 KRAF</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant208"
              required
              readOnly
              value={cantidades.kraf_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val207"
              required
              value={kraf_valorUnitario}
              onChange={(e)=>(setKraf_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.kraf_cant/1000)*kraf_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>299 Otros papeles</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant299"
              required
              readOnly
              value={cantidades.otrosPapeles_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val299"
              required
              value={otrosPapeles_valorUnitario}
              onChange={(e)=>(setOtrosPapeles_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.otrosPapeles_cant/1000)*otrosPapeles_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>301 Acrílico </h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant301"
              required
              readOnly
              value={cantidades.acrilico_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val301"
              required
              value={acrilico_valorUnitario}
              onChange={(e)=>(setAcrilico_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.acrilico_cant/1000)*acrilico_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>302 Pasta</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant302"
              required
              readOnly
              value={cantidades.pasta_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val302"
              value={pasta_valorUnitario}
              onChange={(e)=>(setPasta_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.pasta_cant/1000)*pasta_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>303 PET</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant303"
              required
              readOnly
              value={cantidades.pet_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val303"
              required
              value={pet_valorUnitario}
              onChange={(e)=>(setPet_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.pet_cant/1000)*pet_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>304 PVC</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant304"
              required
              readOnly
              value={cantidades.pvc_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val304"
              value={pvc_valorUnitario}
              onChange={(e)=>(setPvc_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.pvc_cant/1000)*pvc_valorUnitario}
            ></input>
          </div>
        </div>


        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>305 Plástico Blanco</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant299"
              required
              readOnly
              value={cantidades.plasticoBlanco_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val299"
              required
              value={plasticoBlanco_valorUnitario}
              onChange={(e)=>(setPlasticoBlanco_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.plasticoBlanco_cant/1000)*plasticoBlanco_valorUnitario}
            ></input>
          </div>
        </div>
        
        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>306 Polietileno</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant299"
              required
              readOnly
              value={cantidades.polietileno_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val299"
              required
              value={polietileno_valorUnitario}
              onChange={(e)=>(setPolietileno_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.polietileno_cant/1000)*polietileno_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>307 Soplado</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant299"
              required
              readOnly
              value={cantidades.soplado_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val299"
              required
              value={soplado_valorUnitario}
              onChange={(e)=>(setSoplado_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.soplado_cant/1000)*soplado_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>308 Polipropileno</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant299"
              required
              readOnly
              value={cantidades.polipropileno_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val299"
              required
              value={polipropileno_valorUnitario}
              onChange={(e)=>(setPolipropileno_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.polipropileno_cant/1000)*polipropileno_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>399 Otros plásticos</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant399"
              required
              readOnly
              value={cantidades.otrosPlasticos_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val399"
              value={otrosPlasticos_valorUnitario}
              onChange={(e)=>(setOtrosPlasticos_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.otrosPlasticos_cant/1000)*otrosPlasticos_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>499 Vidrios</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant499"
              required
              readOnly
              value={cantidades.otrosVidrios_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val499"
              required
              value={otrosVidrios_valorUnitario}
              onChange={(e)=>(setOtrosVidrios_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.otrosVidrios_cant/1000)*otrosVidrios_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>599 Otros textiles</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant299"
              required
              readOnly
              value={cantidades.otrosTextiles_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val299"
              required
              value={otrosTextiles_valorUnitario}
              onChange={(e)=>(setOtrosTextiles_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.otrosTextiles_cant/1000)*otrosTextiles_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>699 Otros Maderables</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cant299"
              required
              readOnly
              value={cantidades.otrosMaderables_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val299"
              required
              value={otrosMaderables_valorUnitario}
              onChange={(e)=>(setOtrosMaderables_valorUnitario(e.target.valueAsNumber))}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.otrosMaderables_cant/1000)*otrosMaderables_valorUnitario}
            ></input>
          </div>
        </div>

        <div className="row tablaMateriales">
          <div className="col-3 divTablaMateriales">
            <h4>Otros</h4>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="cantOtros"
              required
              readOnly
              value={cantidades.otros_cant/1000}
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="valOtros"
              value={otros_valorUnitario}
              onChange={(e)=>(setOtros_valorUnitario(e.target.valueAsNumber))}
              required
              min={0}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              className="formatoInput"
              id="val101"
              required
              min={0}
              readOnly
              value={(cantidades.otros_cant/1000)*otros_valorUnitario}
            ></input>
          </div>
        </div>
        <hr />
        <div className="row tablaMateriales" style={{ paddingBottom: "2vh" }}>
          <div className="col-3 divTablaMateriales">
            <h3>Total</h3>
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              readOnly
              className="formatoInput"
              id="cant106"
              value={(cantidades.aluminio_cant + cantidades.chatarra_cant + cantidades.cobre_cant + cantidades.bronce_cant + cantidades.antimonio_cant +cantidades.acero_cant + cantidades.otrosMetales_cant + cantidades.archivo_cant + cantidades.carton_cant + cantidades.chuevos_cant + cantidades.periodico_cant + cantidades.plegadiza_cant + cantidades.tetrapack_cant + cantidades.plastificado_cant + cantidades.kraf_cant + cantidades.otrosPapeles_cant + cantidades.acrilico_cant +cantidades.pasta_cant + cantidades.pet_cant + cantidades.pvc_cant + cantidades.plasticoBlanco_cant + cantidades.polietileno_cant + cantidades.soplado_cant + cantidades.polipropileno_cant + cantidades.otrosPlasticos_cant + cantidades.otrosVidrios_cant+ cantidades.otrosTextiles_cant + cantidades.otrosMetales_cant + cantidades.otros_cant)/1000}
              style={{ backgroundColor: "lightgreen" }}
            ></input>
          </div>
          <div className="col-3 divTablaMateriales">
            
          </div>
          <div className="col-3 divTablaMateriales">
            <input
              type="number"
              readOnly
              className="formatoInput"
              id="cant106"
              value={((cantidades.aluminio_cant/1000)*aluminio_valorUnitario)+((cantidades.chatarra_cant/1000)*chatarra_valorUnitario)+((cantidades.cobre_cant/1000)*cobre_valorUnitario)+((cantidades.bronce_cant/1000)*bronce_valorUnitario)+((cantidades.antimonio_cant/1000)*antimonio_valorUnitario)+((cantidades.acero_cant/1000)*acero_valorUnitario)+((cantidades.otrosMetales_cant/1000)*otrosMetales_valorUnitario)+((cantidades.archivo_cant/1000)*archivo_valorUnitario)+((cantidades.carton_cant/1000)*carton_valorUnitario)+((cantidades.chuevos_cant/1000)*chuevos_valorUnitario)+((cantidades.periodico_cant/1000)*periodico_valorUnitario)+((cantidades.plegadiza_cant/1000)*plegadiza_valorUnitario)+((cantidades.tetrapack_cant/1000)*tetrapack_valorUnitario)+((cantidades.plastificado_cant/1000)*plastificado_valorUnitario)+((cantidades.kraf_cant/1000)*kraf_valorUnitario)+((cantidades.otrosPapeles_cant/1000)*otrosPapeles_valorUnitario)+((cantidades.acrilico_cant/1000)*acrilico_valorUnitario)+((cantidades.pasta_cant/1000)*pasta_valorUnitario)+((cantidades.pet_cant/1000)*pet_valorUnitario)+((cantidades.pvc_cant/1000)*pvc_valorUnitario)+((cantidades.plasticoBlanco_cant/1000)*plasticoBlanco_valorUnitario)+((cantidades.polietileno_cant/1000)*polietileno_valorUnitario)+((cantidades.soplado_cant/1000)*soplado_valorUnitario)+((cantidades.polipropileno_cant/1000)*polipropileno_valorUnitario)+((cantidades.otrosPlasticos_cant/1000)*otrosPlasticos_valorUnitario)+((cantidades.otrosVidrios_cant/1000)*otrosVidrios_valorUnitario)+((cantidades.otrosTextiles_cant/1000)*otrosTextiles_valorUnitario)+((cantidades.otrosMaderables_cant/1000)*otrosMaderables_valorUnitario)+((cantidades.otros_cant/1000)*otros_valorUnitario)}
              style={{ backgroundColor: "lightgreen" }}
            ></input>
          </div>
          
        </div>

        

       
        
      </form>
      <div className="row tablaMateriales" hidden={toggleShow}>
          <button className="botonReporte" onClick={()=>{generatePDF()}}>Subir</button>
        </div>
    </div>
  );
}
