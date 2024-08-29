import React from 'react';
import '../assets/css/ingresarUsuario.css';
import { useState, useEffect } from 'react';
import { createVehiculo } from '../api/Vehiculo';
import Swal from 'sweetalert2';
import MyContext from './context';
import { useContext } from 'react';
import { getBodegas } from "../api/Bodega";
import Select from 'react-select'


export default function IngresarVehiculo() {  
  const { setUsuarioGlobal } = useContext(MyContext);

  const [tipo_vehiculo, setTipoVehiculo] = useState({ valor: "", rojo: "" });
  const [placa, setPlaca] = useState({ valor: "", rojo: "" });
  const [capacidadY, setCapacidadY] = useState({ valor: "", rojo: "" });
  const [capacidadT, setCapacidadT] = useState({ valor: "", rojo: "" });
  const [ejes, setEjes] = useState({ valor: "", rojo: "" });
  const [marca, setMarca] = useState({ valor: "", rojo: "" });
  const [turnos, setTurnos] = useState({ valor: "", rojo: "" });
  const [fechaMatricula, setFechaMatricula] = useState({ valor: "", rojo: "" });
  const [fechaEntrada, setFechaEntrada] = useState({ valor: "", rojo: "" });
  const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);
  const [nombreEca, setNombreEca] = useState({ valor: "", rojo: "lightgrey" });



  const [classNumeroPlaca, setClassNumeroPlaca] = useState("form-control");
  const [classCapacidadY3, setClassCapacidadY3] = useState("form-control");
  const [classCapacidadTON, setClassCapacidadTON] = useState("form-control");
  const [classNumEjes, setClassNumEjes] = useState("form-control");
  const [classMarca, setClassMarca] = useState("form-control");
  const [classNumTurnos, setClassNumTurnos] = useState("form-control");
  
  const [bodegas, setBodegas] = useState([]);

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

 

  const crear = async () => {
    setBtnIngresoDisable(true);
    setUsuarioGlobal(prevUsuario => ({
      ...prevUsuario,
      activo: true
    }));
    createVehiculo(nombreEca.valor, tipo_vehiculo.valor, placa.valor, capacidadY.valor, capacidadT.valor, turnos.valor , ejes.valor, marca.valor, fechaMatricula.valor, fechaEntrada.valor);
  }

  const isValidNumber = (e) => {
    const numberRegex = /^\d+$/;
    return numberRegex.test(e);
  }

  
const handleNumEjes = (e) => {
  if (!isValidNumber(e.target.value) || e.target.value.length>1) {
      setClassNumEjes("form-control is-invalid");
  } else {
      setClassNumEjes("form-control is-valid");
  }
  setEjes({ valor: e.target.value, rojo: '' })
}

const handleNumTurnos = (e) => {
  if (!isValidNumber(e.target.value) || e.target.value.length>2) {
      setClassNumTurnos("form-control is-invalid");
  } else {
      setClassNumTurnos("form-control is-valid");
  }
  setTurnos({ valor: e.target.value, rojo: '' })
}


  const handleNumeroPlaca = (e) => {
    if (e.target.value.length < 3) {
        setClassNumeroPlaca("form-control is-invalid");
    } else {
        setClassNumeroPlaca("form-control is-valid");
    }
    setPlaca({ valor: e.target.value, rojo: '' })
  
  }

  const handleCapacidadY3 = (e) => {
    if (isNaN(e.target.value)) {
        setClassCapacidadY3("form-control is-invalid");
    } else {
        setClassCapacidadY3("form-control is-valid");
    }
    setCapacidadY({ valor: e.target.value, rojo: '' })
    }

  const handleCapacidadTON = (e) => {
    if (isNaN(e.target.value)) {
        setClassCapacidadTON("form-control is-invalid");
    } else {
        setClassCapacidadTON("form-control is-valid");
    }
    setCapacidadT({ valor: e.target.value, rojo: '' })
    }


    const handleMarca = (e) => {
      if (e.target.value.length < 3) {
          setClassMarca("form-control is-invalid");
      } else {
          setClassMarca("form-control is-valid");
      }
      setMarca({ valor: e.target.value, rojo: '' })
    
    }

    


  const verificar = () => {

    const inputs = [
      { value: tipo_vehiculo.valor, set: setTipoVehiculo },
      { value: placa.valor, set: setPlaca },
      { value: capacidadY.valor, set: setCapacidadY },
      { value: capacidadT.valor, set: setCapacidadT },
      { value: turnos.valor, set: setTurnos },
      { value: ejes.valor, set: setEjes },
      { value: marca.valor, set: setMarca },
      { value: fechaMatricula.valor, set: setFechaMatricula },
      { value: fechaEntrada.valor, set: setFechaEntrada },
      { value: nombreEca.valor, set: setNombreEca }
    ];

    let hasEmptyInputs = false;
    let valid=true;

    for (const input of inputs) {
      if (input.value === '') {
        input.set({ valor: input.value, rojo: '2px ridge red' });
        hasEmptyInputs = true;
      }
    }

   if (nombreEca.valor===''){
      setNombreEca(({ valor: '', rojo: 'red' }));
    }

    if (hasEmptyInputs) {
      valid=false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete los campos',
      });
    }

     if(!hasEmptyInputs){
      if(isNaN(capacidadY.valor)){
        setCapacidadY({valor:capacidadY, rojo:'2px ridge red'})
        valid=false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un numero valido, usar punto(.) para decimales',
        });
      }
      if(isNaN(capacidadT.valor)){
        setCapacidadT({valor:capacidadT, rojo:'2px ridge red'})
        valid=false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un numero valido, usar punto(.) para decimales',
        });
      }
      if(isNaN(ejes.valor)){
        setEjes({valor:ejes, rojo:'2px ridge red'})
        valid=false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un numero valido, usar punto(.) para decimales',
        });
      }
      if(isNaN(turnos.valor)){
        setTurnos({valor:turnos, rojo:'2px ridge red'})
        valid=false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ingrese un numero valido, usar punto(.) para decimales',
        });
      }
    } 
 
    if(valid) {
      setBtnIngresoDisable(true);
      crear();
    }
  }

  return (
    //<Container fluid className='contenido-ingresar-usuario'>
    <div className="container-fluid contenido-ingresar-usuario" >
      <div className='row'>
        <div className='header'>
          <h1>Ingresar Vehículo</h1>
        </div>
      </div>


      {/* Esto es por una pregunta que le hice a Guille de que las pqrs deberian clasificarse */}

      <div className='row'>
        <div className='formulario-ingresar-usuario'>
          <form action=''>
            <div className='row justify-content-center'>
                <div className='col-xl-6 col-md-12 col-12'>
                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='tipo-vehiculo'>Tipo Vehículo</label>
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                    <select className='form-select' name='tipo-vehiculo' id='tipo' placeholder='Selecciones tipo de documento' onChange={e => { setTipoVehiculo({valor:e.target.value, rojo:''}) }} style={{ border: tipo_vehiculo.rojo }}>
                                    <option value=''>Selecciona...</option>
                                    <option value='5'>Carreta?</option>
                                    <option value='6'>Camion?</option>
                                    <option value='4'>Carro?</option>
                                    <option value='1'>?</option>
                                    <option value='2'>?</option>
                                    <option value='3'>?</option>
                                    </select>   
                                    </div>
                                </div>
                  </div>
                  <div className='col-xl-6 col-md-12 col-12 '>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='numero-placa'>Número Placa</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classNumeroPlaca} type='text' id='numero-placa' onChange={e => { handleNumeroPlaca(e) }} style={{ border: placa.rojo }} />
                        <div id="numero-placa" className="invalid-feedback">
                        Min. 3 letras o num
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

            <div className='row justify-content-center'>
                <div className='col-xl-6 col-md-12 col-12'>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='nombre'>Capacidad (Y3)</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classCapacidadY3} type='text' id='nombre' onChange={e => { handleCapacidadY3(e) }} style={{ border: capacidadY.rojo }}/>
                        <div id="nombre" className="invalid-feedback">
                        Ingrese numero valido, usar punto
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-md-12 col-12 '>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='direccion'>Capacidad (TON)</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classCapacidadTON} type='text' id='direccion' onChange={e => { handleCapacidadTON(e) }} style={{ border: capacidadT.rojo }} />
                        <div id="cdireccion" className="invalid-feedback">
                        Ingrese numero valido, usar punto
                        </div>
                      </div>
                    </div>
                  </div>
              </div>


            <div className='row justify-content-center'>
                <div className='col-xl-6 col-md-12 col-12'>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='nombre'>Num Ejes</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classNumEjes} type='text' id='nombre' onChange={e => { handleNumEjes(e) }} style={{ border: ejes.rojo }}/>
                        <div id="nombre" className="invalid-feedback">
                        Ingrese numero valido
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-md-12 col-12 '>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='direccion'>Marca</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classMarca} type='text' id='direccion' onChange={e => { handleMarca(e) }} style={{ border: marca.rojo }} />
                        <div id="cdireccion" className="invalid-feedback">
                        Min. 3 letras o num
                        </div>
                      </div>
                    </div>
                  </div>
              </div>



            <div className='row justify-content-center'>
                <div className='col-xl-6 col-md-12 col-12'>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='nombre'>Num Turnos</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classNumTurnos} type='text' id='nombre' onChange={e => { handleNumTurnos(e) }} style={{ border: ejes.rojo }}/>
                        <div id="nombre" className="invalid-feedback">
                        Ingrese numero valido
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-md-12 col-12 '>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='direccion'>ECA</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                      <Select type="text" options={opcionesBodega} onChange={(e) => (setNombreEca({valor:e.value, rojo:'lightgray'}))} styles={{
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: nombreEca.rojo,
    }),
  }}>
              </Select>
                        
                      </div>
                    </div>
                  </div>
              </div>

            <div className='row justify-content-center'>
            <label className='col-xl-5 col-md-5 col-sm-6 col-12 my-md-2 my-sm-1 px-0 lbl-general px-0' htmlFor='fecha'>Fecha matricula</label>
            <div className='col-xl-5 col-md-5 col-sm-6 col-12 my-md-2 my-sm-1 px-0'>
            <input
            type="date"
            className="form-control"
            onChange={e => { setFechaMatricula({valor:e.target.value, rojo:''}) }} style={{ border: fechaMatricula.rojo  }}
            ></input>
            </div>
            </div>
            <div className='row justify-content-center'>
            <label className='col-xl-5 col-md-5 col-sm-6 col-12 my-md-2 my-sm-1 px-0 lbl-general px-0' htmlFor='fecha'>Fecha entrada en operación</label>
            <div className='col-xl-5 col-md-5 col-sm-6 col-12 my-md-2 my-sm-1 px-0'>
            <input
            type="date"
            className="form-control"
            onChange={e => { setFechaEntrada({valor:e.target.value, rojo:''}) }} style={{ border: fechaEntrada.rojo  }}
            ></input>
            </div>
            </div>
            
           
            <div className=''>
              <input className='enviar btn-ingresar-usuario' id='fecha' type='button' value='Enviar' onClick={verificar} disabled={btnIngresoDisable} />
            </div>


          </form>
        </div>
      </div>

    </div>
  )
}
