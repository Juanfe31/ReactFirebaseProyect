import React from 'react'
import { useState} from 'react'
import { getReportesPeriodo} from "../api/Reporte";
import { getRecuperador } from '../api/Recuperador';
import { getNUECAbyNombreEca } from '../api/Eca';
import "../assets/css/ingresarReporte.css";
import '../assets/css/ingresarUsuario.css';
import Swal from "sweetalert2";
export default function GenerarBalance() {

    //Hora actual
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth()).toString().padStart(2, '0');
  
  const formattedDate = `${year}-${month}`;

  /*1=CC
  2=CE
  3=pasaporte
  4=NIT*/
  const tiposDoc=[
    { value: '1', label: 'cc'},
    { value: '2', label: 'ce'},
    { value: '3', label: 'pas'},
    { value: '4', label: 'nit'}
  ]

  const materiales=[
    { value: '101', label: 'aluminio_cant'},
    { value: '102', label: 'chatarra_cant'},
    { value: '103', label: 'cobre_cant'   },
    { value: '104', label: 'bronce_cant'},
    { value: '105', label: 'antimonio_cant'},
    { value: '106', label: 'acero_cant'},
    { value: '199', label: 'otrosMetales_cant'},
    { value: '201', label: 'archivo_cant'},
    { value: '202', label: 'carton_cant'},
    { value: '203', label: 'chuevos_cant'},
    { value: '204', label: 'periodico_cant'},
    { value: '205', label: 'plegadiza_cant'},
    { value: '206', label: 'tetrapack_cant'},
    { value: '207', label: 'plastificado_cant'},
    { value: '208', label: 'kraf_cant'},
    { value: '299', label: 'otrosPapeles_cant'},
    { value: '301', label: 'acrilico_cant'},
    { value: '302', label: 'pasta_cant'},
    { value: '303', label: 'pet_cant'},
    { value: '304', label: 'pvc_cant'},
    { value: '305', label: 'plasticoBlanco_cant'},
    { value: '306', label: 'polietileno_cant'},
    { value: '307', label: 'soplado_cant'},
    { value: '308', label: 'polipropileno_cant'},
    { value: '399', label: 'otrosPlasticos_cant'},
    { value: '499', label: 'otrosVidrios_cant'},
    { value: '599', label: 'otrosTextiles_cant'},
    { value: '699', label: 'otrosMaderables_cant'},
  ]

  const macroRutas=[
    { value: '1434305001', label: 'Comuna 1 Popular'},
    { value: '1434405001', label: 'Comuna 2 Santa Cruz'},
    { value: '1434505001', label: 'Comuna 3 Manrique'   },
    { value: '1434605001', label: 'Comuna 4 Aranjuez'},
    { value: '1434705001', label: 'Comuna 5 Castilla'},
    { value: '1434805001', label: 'Comuna 6 Doce de Octubre'},
    { value: '1434905001', label: 'Comuna 7 Robledo'},
    { value: '1435005001', label: 'Comuna 8 Villa Hermosa'},
    { value: '1435105001', label: 'Comuna 9 Buenos Aires'},
    { value: '1435205001', label: 'Comuna 10 La Candelaria'},
    { value: '1435305001', label: 'Comuna 11 Laureles'},
    { value: '1435405001', label: 'Comuna 12 La América'},
    { value: '1435505001', label: 'Comuna 13 San Javier'},
    { value: '1435605001', label: 'Comuna 14 El poblado'},
    { value: '1435705001', label: 'Comuna 15 El Guayabal'},
    { value: '1435805001', label: 'Comuna 16 Belen'},
    { value: '1435905088', label: 'Comuna 1 Paris y 2 La Madera'},
    { value: '1436005088', label: 'Comuna 3 Santa Ana  y 4 Suarez'},
    { value: '1436105088', label: 'Comuna 5 La cumbre y 6 Bellavista'},
    { value: '1436205088', label: 'Comuna 7 Altos de Niquia y 8 Niquia'},
    { value: '1436305088', label: 'Comuna 9 Fontidueño y 10 Acevedo'},
  ]

  const [periodo, setPeriodo] = useState("");
  const [balance, setBalance] = useState("");

  //Funciones para convertir los datos

  //OPTIMIZAR!!!
  function getValuebyNombreMacro(nombreMacro){
    let valueMacro="error";
   macroRutas.forEach((macroRuta)=>{
    
    if(macroRuta.label===nombreMacro){
      valueMacro=macroRuta.value;
    }
   })
    return valueMacro;
  }

  //OPTIMIZAR!!!
  function getValuebyTipoDoc(tipoDocB){
    let valueTipoDoc="error";
   tiposDoc.forEach((tipoDoc)=>{
    if(tipoDoc.label===tipoDocB){
      valueTipoDoc=tipoDoc.value;
    }
   })
    return valueTipoDoc;
  }

  //OPTIMIZAR!!!
  function getValuebyNombreMaterial(nombreMaterial){
    let valueMaterial=nombreMaterial;
   materiales.forEach((material)=>{
    if(material.label===nombreMaterial){
      valueMaterial=material.value;
    }
   })
    return valueMaterial;
  }

  function getSemanaPorFecha(fechaAux) {
    const fecha=new Date(fechaAux)
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
  
    // Encontrar el primer día del mes
    const primerDiaDelMes = new Date(año, mes, 1);
  
    // Calcular el día de la semana para el primer día del mes (0-6, donde 0 es domingo)
    let primerDiaDeLaSemana = primerDiaDelMes.getDay();
  
    // Ajustar el día de la semana para comenzar desde el lunes (0 se convierte en 6, 1 se convierte en 0, 2 se convierte en 1, ..., 6 se convierte en 5)
    if (primerDiaDeLaSemana === 0) {
      primerDiaDeLaSemana = 6;
    } else {
      primerDiaDeLaSemana--;
    }
  
    // Calcular el día del mes para la fecha dada
    const diaDelMes = fecha.getDate();
  
    // Calcular el número de la semana
    const numeroSemana = Math.ceil((diaDelMes + primerDiaDeLaSemana) / 7);
  
    return numeroSemana;
  }


  const exportarBalance = async () => {
    let info = "NUECA,NUMACRO,NÚMERO DE SEMANA,TIPO DE IDENTIFICACIÓN DEL RECICLADOR,NÚMERO DE IDENTIFICACIÓN DEL RECICLADOR,PLACA DEL VEHÍCULO,CANTIDAD DE MATERIAL,TIPO DE MATERIAL \n"
    const element = document.createElement('a');
    info = "\ufeff" + info + balance;
    const file = new Blob([info], { type: 'text/plain; charset=utf-8', encoding: "UTF-8" });
    element.charset = 'UTF-8';
    element.href = URL.createObjectURL(file);
    element.download = 'BALANCE DE MASAS_'+periodo+'.csv';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

  const  createBalance = async () => {
    if(periodo===''){
        Swal.fire({
            icon: 'error',
            title: 'Seleccione un periodo',
            text: '¡No ha ingresado un periodo!'
          });     
    }else{
     const TodosLosReportes = await getReportesPeriodo(periodo);
     console.log(TodosLosReportes)
     if(!TodosLosReportes.length>0){
        Swal.fire({
            icon: 'error',
            title: 'Revisa el periodo',
            text: 'Para el periodo seleccionado no existen reportes'
          });
     }else{
       let recuperador;
       setBalance("")
       let balanceAux="";
       for (const reporte of TodosLosReportes) {
        recuperador = await getRecuperador(reporte.recuperador.id);
        for (const key of Object.keys(reporte)) {
          if (key.includes('cant') && reporte[key] > 0 && key !== "otros_cant") {
            balanceAux += await getNUECAbyNombreEca(reporte.eca) + "," + getValuebyNombreMacro(recuperador.macroRuta) + "," + getSemanaPorFecha(reporte.fecha) + "," + getValuebyTipoDoc(recuperador.tipo_doc) + "," + recuperador.documento + "," + reporte.placaVehiculo + "," + reporte[key] / 1000 + "," + getValuebyNombreMaterial(key) + "\n";
          }
          
        }
      }
      setBalance(balanceAux);
        
        
     }
    }
    exportarBalance()
  }
  
    console.log(balance)
  return (
    <div  className="container-fluid contenido-ingresar-usuario">
      <div className="row">
        <div className="col-12 header">
          <h1>Generar balance de masas</h1>
        </div>
      </div>
      <form className="formReporte">
        <div className="row">
          
          <div className="col-6 justify-content-center divCedula">
            <label>Periodo</label>
            <input type="month" min={"2005-01"} placeholder="Ej:2023-06" max={formattedDate} className="formatoInput" onChange={(e) => (setPeriodo(e.target.value))}></input>
          </div>

          <div className="col-12 divCedula">
            <button type="button" className="botonReporte" onClick={createBalance}>
              Generar Balance 
            </button>
          </div>
        </div>
        
      </form>
      
      </div>
  )
}
