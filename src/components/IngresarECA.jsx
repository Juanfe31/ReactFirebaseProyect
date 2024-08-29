import { useState,useEffect } from 'react';
import { getNombresEcas ,createEca,uploadFileECA} from "../api/Eca";
import Swal from "sweetalert2";
import '../assets/css/ingresarUsuario.css';
import '../assets/css/ingresarECA.css';
import Select from 'react-select'
import MyContext from './context';
import { useContext } from 'react';
import {  createBodega, uploadFileBodega } from "../api/Bodega";


export default function IngresarECA() {
  const { setUsuarioGlobal } = useContext(MyContext);

  const [documento, setDocumento] = useState({ valor: "", rojo: "" });
  const [nombre_representante, setNombreRepresentante] = useState({ valor: "", rojo: "" });
  const [nombre_eca, setNombreEca] = useState({ valor: "", rojo: "" });
  const [municipio, setMunicipio] = useState({ valor: "", rojo: "" });
  const [direccion, setDireccion] = useState({ valor: "", rojo: "" });
  const [activa, setActiva] = useState(true);
  //ECA
  const [nuEca, setNuEca] = useState({ valor: "", rojo: "" });
  const [macroRutas, setMacroRutas] = useState([]);
  
  //Bodegas
  const [nombreEcas, setNombreEcas] = useState([]);
  const [selectedEca, setSelectedEca] = useState("");

  //Class
  const [classNumeroEca, setClassNumeroEca] = useState("form-control");
  const [classMacroRutas] = useState("form-control");
  const [classNombreRepresentate, setClassNombreRepresentate] = useState("form-control");
  const [classCedula, setClassCedula] = useState("form-control");
  const [classNombreEca, setClassNombreEca] = useState("form-control");
  const [classMunicipio, setClassMunicipio] = useState("form-control");
  const [classDireccion, setClassDireccion] = useState("form-control");
  const [classEcaLigada] = useState("form-control");
  
  const [toggleView, setToggleView] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);
  
  useEffect(() => {

    const fetchEcas = async () => {
      const TodasLasEcas = await getNombresEcas();
      setNombreEcas(TodasLasEcas);
    }
    fetchEcas();
  }, [])

  const opcionesEca = nombreEcas.map((eca) => (
    { ...{ value: eca[0], label: eca[0] } }

  ))


  const crear = async () => {
    setUsuarioGlobal(prevUsuario => ({
      ...prevUsuario,
      activo: true
    }));
    createEca(documento.valor, nombre_representante.valor, nombre_eca.valor, municipio.valor, direccion.valor,nuEca.valor,macroRutas,activa);
  }

  const crearBodega = async () => {
    setUsuarioGlobal(prevUsuario => ({
      ...prevUsuario,
      activo: true
    }));
    createBodega(documento.valor,nombre_representante.valor,nombre_eca.valor,municipio.valor,direccion.valor,selectedEca,activa)
  }

  const isValidNumber = (e) => {
    const numberRegex = /^\d+$/;
    return numberRegex.test(e);
  }

  const handleCedula = (e) => {
    if (!isValidNumber(e.target.value) || e.target.value.length<5) {
        setClassCedula("form-control is-invalid");
    } else {
        setClassCedula("form-control is-valid");
    }
    setDocumento({ valor: e.target.value, rojo: '' })
  }

  const handleNumEca = (e) => {
    if (!isValidNumber(e.target.value) || e.target.value.length<2) {
        setClassNumeroEca("form-control is-invalid");
    } else {
        setClassNumeroEca("form-control is-valid");
    }
    setNuEca({ valor: e.target.value, rojo: '' })
  }

  const handleNombreRepre = (e) => {
    if (e.target.value.length < 3) {
        setClassNombreRepresentate("form-control is-invalid");
    } else {
        setClassNombreRepresentate("form-control is-valid");
    }
    setNombreRepresentante({ valor: e.target.value, rojo: '' })
  
  }

  const handleNombreEcaBodega = (e) => {
    if (e.target.value.length < 3) {
        setClassNombreEca("form-control is-invalid");
    } else {
        setClassNombreEca("form-control is-valid");
    }
    setNombreEca({ valor: e.target.value, rojo: '' })
  }

  
  const handleDireccion = (e) => {
    if (e.target.value.length < 3) {
        setClassDireccion("form-control is-invalid");
    } else {
        setClassDireccion("form-control is-valid");
    }
    setDireccion({ valor: e.target.value, rojo: '' })
  }

  const handleMunicipio = (e) => {
    if (e.target.value.length < 3) {
        setClassMunicipio("form-control is-invalid");
    } else {
        setClassMunicipio("form-control is-valid");
    }
    setMunicipio({ valor: e.target.value, rojo: '' })
  }

  const opcionesMacro=[
    { value: '1434305001', label: 'Comuna 1 Popular'},
    { value: '1434405001', label: 'Comuna 2 Santa Cruz'},
    { value: '1434505001', label: 'Comuna 3 Manrique'},
    { value: '1434605001', label: 'Comuna 4 Aranjuez'},
    { value: '1434705001', label: 'Comuna 5 Castilla'},
    { value: '1434805001', label: 'Comuna 6 Doce de Octubre'},
    { value: '1434905001', label: 'Comuna 7 Robledo'},
    { value: '1435005001', label: 'Comuna 8 Villa Hermosa'},
    { value: '1435105001', label: 'Comuna 9 Buenos aires'},
    { value: '1435205001', label: 'Comuna 10 la Candelaria'},
    { value: '1435305001', label: 'Comuna 11 Laureles'},
    { value: '1435405001', label: 'Comuna 12 La América'},
    { value: '1435505001', label: 'Comuna 13 San Javier '},
    { value: '1435605001', label: 'Comuna 14 El poblado'},
    { value: '1435705001', label: 'Comuna 15 El Guayabal'},
    { value: '1435805001', label: 'Comuna 16 Belen'},
    { value: '1435905088', label: 'Comuna 1 Paris y 2 La Madera'},
    { value: '1436005088', label: 'Comuna 3 Santa Ana  y 4 Suarez'},
    { value: '1436105088', label: 'Comuna 5 La cumbre y 6 Bellavista'},
    { value: '1436205088', label: 'Comuna 7 Altos de Niquia y 8 Niquia'},
    { value: '1436305088', label: 'Comuna 9 Fontidueño y 10 Acevedo'},
  ]

  const municipios = ["Abejorral", "Abriaquí", "Alejandría", "Amagá", "Amalfi",
    "Andes", "Angelópolis", "Angostura", "Anorí", "Antioquia", "Anzá", "Apartadó", "Arboletes",
    "Argelia", "Armenia", "Barbosa", "Bello", "Belmira", "Betania", "Betulia", "Briceño", "Buriticá",
    "Cáceres", "Caicedo", "Caldas", "Campamento", "Cañasgordas", "Caracolí", "Caramanta", "Carepa",
    "Carolina del Príncipe", "Caucasia", "Chigorodó", "Cisneros", "Ciudad Bolívar", "Cocorná",
    "Concepción", "Concordia", "Copacabana", "Dabeiba", "Donmatías", "Ebéjico", "El Bagre",
    "El Carmen de Viboral", "El Peñol", "El Retiro", "El Santuario", "Entrerríos", "Envigado",
    "Fredonia", "Frontino", "Giraldo", "Girardota", "Gómez Plata", "Granada", "Guadalupe", "Guarne",
    "Guatapé", "Heliconia", "Hispania", "Itagüí", "Ituango", "Jardín", "Jericó", "La Ceja", "La Estrella",
    "La Pintada", "La Unión", "Liborina", "Maceo", "Marinilla", "Medellín", "Montebello", "Murindó",
    "Mutatá", "Nariño", "Nechí", "Necoclí", "Olaya", "Peque", "Pueblorrico", "Puerto Berrío", "Puerto Nare",
    "Puerto Triunfo", "Remedios", "Rionegro", "Sabanalarga", "Sabaneta", "Salgar", "San Andrés de Cuerquia",
    "San Carlos", "San Francisco", "San Jerónimo", "San José de la Montaña", "San Juan de Urabá",
    "San Luis", "San Pedro de los Milagros", "San Pedro de Urabá", "San Rafael", "San Roque", "San Vicente",
    "Santa Bárbara", "Santa Rosa de Osos", "Santo Domingo", "Segovia", "Sonsón", "Sopetrán", "Támesis",
    "Tarazá", "Tarso", "Titiribí", "Toledo", "Turbo", "Uramita", "Urrao", "Valdivia", "Valparaíso", "Vegachí",
    "Venecia", "Vigía del Fuerte", "Yalí", "Yarumal", "Yolombó", "Yondó", "Zaragoza"];

  const verificar = async () => {

    const inputs = [
      { value: documento.valor, set: setDocumento },
      { value: nombre_representante.valor, set: setNombreRepresentante },
      { value: nombre_eca.valor, set: setNombreEca },
      { value: municipio.valor, set: setMunicipio },
      { value: direccion.valor, set: setDireccion },
      { value: nuEca.valor, set: setNuEca }
    ];

    let hasEmptyInputs = false;
    for (const input of inputs) {
      if (input.value === '') {
        input.set({ valor: input.value, rojo: '2px ridge red' });
        hasEmptyInputs = true;
      }
    }

    if (hasEmptyInputs) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete los campos'
      })
    } else if(macroRutas.length===0){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione por lo menos una Macroruta'
      })
    }else {
      if (selectedFile === "") {
        Swal.fire({
          title: 'Falta constancia',
          text: "No se ha subido el archivo PDF o de imagen",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ingresar sin constancia',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            crear();
            setBtnIngresoDisable(true);
          }
        })
      } else {
        setBtnIngresoDisable(true);
        crear();
        uploadFileECA(selectedFile, "Constancia_" + nombre_eca.valor)
      }

    }
  }

  const verificarBodega = async () => {

    const inputs = [
      { value: documento.valor, set: setDocumento },
      { value: nombre_representante.valor, set: setNombreRepresentante },
      { value: nombre_eca.valor, set: setNombreEca },
      { value: municipio.valor, set: setMunicipio },
      { value: direccion.valor, set: setDireccion },
    ];

    let hasEmptyInputs = false;
    for (const input of inputs) {
      if (input.value === '') {
        input.set({ valor: input.value, rojo: '2px ridge red' });
        hasEmptyInputs = true;
      }
    }

    if (hasEmptyInputs) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete los campos'
      })
    } else if(selectedEca===""){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Seleccione la eca asociada a la bodega'
      })
    }else {
      if (selectedFile === "") {
        Swal.fire({
          title: 'Falta constancia',
          text: "No se ha subido el archivo PDF o de imagen",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ingresar sin constancia',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            crearBodega();
            setBtnIngresoDisable(true);
          }
        })
      } else {
        setBtnIngresoDisable(true);
        crearBodega();
        uploadFileBodega(selectedFile, "Constancia_" + nombre_eca.valor)
      }

    }
  }

  return (
    <div className="container-fluid divIngresarECA contenido-ingresar-usuario">
      <div className="row header">

        <h1>Ingresar ECA/Bodega</h1>
      </div>
      <div className='row formulario-ingresar-usuario'>
        <div className="col-md-6 col-sm-12 col-12   divInputECA">
          
          <button className="enviar btn-ingresar-usuario" type="button" onClick={()=>(setToggleView("Eca"))} >Ingresar ECA</button>      
        </div>
        <div className="col-md-6 col-sm-12 col-12   divInputECA">
          <button className="enviar btn-ingresar-usuario" type="button" onClick={()=>(setToggleView("Bodega"))}>Ingresar Bodega</button>      
        </div>
      </div>

    <hr></hr>

  

<div className="row formulario-ingresar-usuario" hidden={toggleView==="Eca"?false:true}>
  
      <div className="col-md-6 col-sm-12 col-12   divInputECA">
        <label className="lbl-general col-12">Número ECA</label>
        <input className={classNumeroEca +" col-md-7 col-10"} required id="numEca" onChange={e => { handleNumEca(e) }} style={{ border: nuEca.rojo }}></input>
        <div id="numEca" className="invalid-feedback">
            Ingrese un número valido
        </div>
      </div>

      <div className=" col-12 col-sm-12 col-md-6  divInputECA">
        <label className="lbl-general col-12">Elija las macrorutas en las que la ECA presta servicio</label>
        <Select type="text" isMulti  isClearable options={opcionesMacro}
        
        onChange={(e)=> setMacroRutas(Array.isArray(e) ? e.map(x => x) : [])}

          className={classMacroRutas + "p-0 col-12"}
          >
        </Select>
        <div id="numEca" className="invalid-feedback">
            Ingrese las macro-rutas
        </div>
      </div>
    </div>

    <div className="row formulario-ingresar-usuario" hidden={toggleView==="Bodega"?false:true}>
    <div className="col-12 col-sm-12 col-md-6  divInputECA">
        <label className="lbl-general col-12" >Elija la ECA ligada a la bodega</label>
        <Select type="text" 
          options={opcionesEca}
          className={classEcaLigada+ "form-control p-0 col-12"}
          onChange={(e)=>(setSelectedEca(e.value))}
          >
        </Select>
            <div id="EcaLigada" className="invalid-feedback">
            Ingrese una ECA
        </div>
      </div>
    </div>

      <div className='formulario-ingresar-usuario' hidden={toggleView===""?true:false}>
        <form action="">
          <div className="row divContenedorECA">

            <div className="row formulario-ingresar-usuario">
              
              <div className="col-md-6 col-sm-12 col-12   divInputECA">
                <label className="lbl-general col-12" htmlFor="nombreRepresentante">Nombre representante legal</label>
                <input className={classNombreRepresentate+"  col-md-7 col-10"}  required id="nombreRepresentante" onChange={e => { handleNombreRepre(e)}} style={{ border: nombre_representante.rojo }}></input>
                <div id="nombreRepresentante" className="invalid-feedback">
                 Ingrese un nombre valido
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-6 divInputECA">
                <label className="lbl-general col-12" htmlFor="cedulaRepresentante">Cedula representante legal</label>
                <input className={classCedula+"  col-md-7 col-10"} required id="cedulaRepresentante" onChange={e => { handleCedula(e) }} style={{ border: documento.rojo }}></input>
                <div id="cedulaRepresentante" className="invalid-feedback">
                 Ingrese una cedula valida
                </div>
              </div>
            </div>

          </div>

          <div className="row divContenedorECA">

            <div className="row formulario-ingresar-eca">
              <div className="col-12 col-sm-12 col-md-4  divInputECA">
                <label className="lbl-general" htmlFor="nombreECA">{"Nombre "+toggleView}</label>
                <input className={classNombreEca +" "} required id="nombreECA" onChange={e => { handleNombreEcaBodega(e) }} style={{ border: nombre_eca.rojo }}></input>
                <div id="nombreEca" className="invalid-feedback">
                 Ingrese un nombre valido
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-4  divInputECA">
                <label className="lbl-general" htmlFor="municipioECA">Municipio</label>

                <select className={classMunicipio+' col-12 form-control'} name='municipio' id='municipio' onChange={(e) => { handleMunicipio(e) }} style={{ border: municipio.rojo }}>
                  <option value=''>Selecciona...</option>
                  {municipios.map((muni, index) => (
                    <option key={index} value={muni} >{muni}</option>
                  ))}

                </select>
                <div id="municipio" className="invalid-feedback">
                 Ingrese un municipio
                </div>

              </div>

              <div className="col-12 col-sm-12 col-md-4   divInputECA">
                <label className="lbl-general" htmlFor="direccionECA">Dirección</label>
                <input className={classDireccion+ " "} id="direccionECA" required onChange={e => { handleDireccion(e) }} style={{ border: direccion.rojo }}></input>
                <div id="Direccion" className="invalid-feedback">
                 Ingrese una dirección valida
                </div>
              </div>
              
              <div className="col-12 col-sm-12 col-md-12 mt-4  divInputECA">
                <label className="lbl-general" htmlFor="direccionECA">{"Por favor, seleccione esta opcion si la "+toggleView+" continúa prestando servicio en la actualidad"}</label>
                <input type='checkbox' className=""
                style={{transform:'scale(1.5)'}}
                id="direccionECA" defaultChecked="true" onChange={(e)=>(setActiva(e.target.checked))}></input>
              </div>
          </div>
              
            </div>
           
          <div>
          </div>
          
          
          <div className='row justify-content-center'>
          <label className="lbl-general" htmlFor="direccionECA">Suba la constancia</label>
          <div className='col-12 d-flex justify-content-center'>
            <input className='form-control text-align-center w-auto' type="file" onChange={(e) => setSelectedFile(e.target.files[0])} style={{ textAlign: 'center' }} />
          </div>
          <div className='col-12 d-flex justify-content-center mt-4'>
            <button className="enviar btn-ingresar-usuario" type="button" onClick={toggleView==="Eca"? verificar:verificarBodega} disabled={btnIngresoDisable}>Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>


  );
}
