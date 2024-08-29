import React from 'react';
import '../assets/css/ingresarUsuario.css';
import { useState } from 'react';
import { createPQRS } from '../api/Pqrs';
import Swal from 'sweetalert2';
import MyContext from './context';
import { useContext } from 'react';


//import Container from 'react-bootstrap/Container';


export default function PQRS() {

  const [origen_pqrs, setOrigenPQRS] = useState({ valor: "", rojo: "" });
  const [tipo_pqrs, setTipoPQRS] = useState({ valor: "", rojo: "" });
  const [tipo_doc, setTipoDoc] = useState({ valor: "", rojo: "" });
  const [documento, setDoc] = useState({ valor: "", rojo: "" });
  const [nombre, setNombre] = useState({ valor: "", rojo: "" });
  const [direccion, setDireccion] = useState({ valor: "", rojo: "" });
  const [telefono, setTelefono] = useState({ valor: "", rojo: "" });
  const [ciudad, setCiudad] = useState({ valor: "", rojo: "" });
  const [correo, setCorreo] = useState({ valor: "", rojo: "" });
  const [descripcion, setDescripcion] = useState({ valor: "", rojo: "" });
  const [fecha, setFecha] = useState({ valor: "", rojo: "" });
  const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);

  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const { setUsuarioGlobal } = useContext(MyContext);

  const [classEmail, setClassEmail] = useState("form-control")
  const [classTelefono, setClassTelefono] = useState("form-control")
  const [classCuidad, setClassCuidad] = useState("form-control")
  const [classNombre, setClassNombre] = useState("form-control")
  const [classDireccion, setClassDireccion] = useState("form-control")
  const [classDocumento, setClassDocumento] = useState("form-control")
  const [classDescripcion, setClassDescripcion] = useState("form-control")
  

 

  const crear = async () => {
    setBtnIngresoDisable(true);
    setUsuarioGlobal(prevUsuario => ({
      ...prevUsuario,
      activo: true
    }));
    createPQRS(origen_pqrs.valor, tipo_pqrs.valor, tipo_doc.valor, documento.valor, nombre.valor, direccion.valor, telefono.valor , ciudad.valor, correo.valor, descripcion.valor, fecha.valor, formattedDate);
  }

  const verificar = () => {

    const inputs = [
      { value: origen_pqrs.valor, set: setOrigenPQRS },
      { value: tipo_pqrs.valor, set: setTipoPQRS },
      { value: tipo_doc.valor, set: setTipoDoc },
      { value: documento.valor, set: setDoc },
      { value: nombre.valor, set: setNombre },
      { value: direccion.valor, set: setDireccion },
      { value: correo.valor, set: setCorreo },
      { value: telefono.valor, set: setTelefono },
      { value: ciudad.valor, set: setCiudad },
      { value: descripcion.valor, set: setDescripcion },
      { value: fecha.valor, set: setFecha }
    ];

    let hasEmptyInputs = false;
    for (const input of inputs) {
      if (input.value === '') {
        console.log(input);
        input.set({ valor: input.value, rojo: '2px ridge red' });
        hasEmptyInputs = true;
      }
    }

    if (origen_pqrs.valor === '') {
      hasEmptyInputs = true;
      setOrigenPQRS({ valor: origen_pqrs.valor, rojo: 'red' });
    }

    if (hasEmptyInputs) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete los campos',
      });
    }
   else {
      setBtnIngresoDisable(true);
      crear();
    }
  }

  const isValidEmail = (e) => {
    const emailRegex = /^\S+@\S+\.\S/;
    return emailRegex.test(e);
}

const isValidNumber = (e) => {
  const numberRegex = /^\d+$/;
  return numberRegex.test(e);
}

  const handleEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
        setClassEmail("form-control is-invalid")
    } else {
        setClassEmail("form-control is-valid")
    }
    setCorreo({ valor: e.target.value, rojo: '' })
}

const handleDocumento = (e) => {
  if (e.target.value.length < 4) {
      setClassDocumento("form-control is-invalid");
  } else {
      setClassDocumento("form-control is-valid");
  }
  setDoc({ valor: e.target.value, rojo: '' })

}

const handleTelefono = (e) => {
  if (!isValidNumber(e.target.value) || e.target.value.length<7) {
      setClassTelefono("form-control is-invalid");
  } else {
      setClassTelefono("form-control is-valid");
  }
  setTelefono({ valor: e.target.value, rojo: '' })
}

const handleCuidad = (e) => {
  if (e.target.value.length < 4) {
      setClassCuidad("form-control is-invalid");
  } else {
      setClassCuidad("form-control is-valid");
  }
  setCiudad({ valor: e.target.value, rojo: '' })
}

const handleNombre = (e) => {
  if (e.target.value.length < 4) {
      setClassNombre("form-control is-invalid");
  } else {
      setClassNombre("form-control is-valid");
  }
  setNombre({ valor: e.target.value, rojo: '' })
}

const handleDireccion = (e) => {
  if (e.target.value.length < 4) {
      setClassDireccion("form-control is-invalid");
  } else {
      setClassDireccion("form-control is-valid");
  }
  setDireccion({ valor: e.target.value, rojo: '' })
}

const handleDescripcion = (e) => {
  if (e.target.value.length < 4) {
      setClassDescripcion("form-control is-invalid");
  } else {
      setClassDescripcion("form-control is-valid");
  }
  setDescripcion({ valor: e.target.value, rojo: '' })
}




  

  return (
    //<Container fluid className='contenido-ingresar-usuario'>
    <div className="container-fluid contenido-ingresar-usuario">
      <div className='row'>
        <div className='header'>
          <h1>Crear PQRS</h1>
        </div>
      </div>


      {/* Esto es por una pregunta que le hice a Guille de que las pqrs deberian clasificarse */}

      <div className='row'>
        <div className='formulario-ingresar-usuario'>
          <form action=''>

            <div className='row'>
              <label className='lbl-general' htmlFor="">Origen:</label>
              <div className='row justify-content-center'>
                <div className='col-12'>
                  <input
                    className='col-xl-1 col-md-1 col-sm-1 col-2 my-md-2 my-sm-1 mx-0'
                    type='radio'
                    name='tipo-pqrs'
                    value='Interna'
                    id='interna'
                    onChange={e => setOrigenPQRS({valor:e.target.value, rojo:''})}
                  />
                  <label
                    className='col-xl-2 col-md-3 col-sm-4 col-9 my-md-2 my-sm-1 mx-0'
                    htmlFor='interna' style={{ color: origen_pqrs.rojo }}
                  >
                    Interna
                  </label>
                </div>
              </div>

              <div className='row justify-content-center mb-3'>
                <div className='col-12'>
                  <input
                    className='col-xl-1 col-md-1 col-sm-1 col-2 my-md-2 my-sm-1 mx-0'
                    type='radio'
                    name='tipo-pqrs'
                    value='Externa'
                    id='externa'
                    onChange={e => setOrigenPQRS({valor:e.target.value, rojo:''})}
                  />
                  <label
                    className='col-xl-2 col-md-3 col-sm-4 col-9 my-md-2 my-sm-1 mx-0'
                    htmlFor='externa' style={{ color: origen_pqrs.rojo }}
                  >
                    Externa
                  </label>
                </div>
              </div>
            </div>


            <div className='row justify-content-center campo-email'>
                <div className='col-xl-6 col-md-12 col-12'>
                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='tipo-doc'>Tipo Documento</label>
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                    <select className='form-select' name='tipo-doc' id='tipo' placeholder='Selecciones tipo de documento' onChange={e => { setTipoDoc({valor:e.target.value, rojo:''}) }} style={{ border: tipo_doc.rojo }}>
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
                  <div className='col-xl-6 col-md-12 col-12 '>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='numero-id'>Número documento</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classDocumento} type='text' id='numero-id' onChange={e => { handleDocumento(e) }} style={{ border: documento.rojo }} />
                        <div id="numero-id" className="invalid-feedback">
                        Min. 4 letras o num
                        </div>
                      </div>
                    </div>
                  </div>
              </div>


            <div className='row justify-content-center'>
                <div className='col-xl-6 col-md-12 col-12'>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='nombre'>Nombre</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classNombre} type='text' id='nombre' onChange={e => { handleNombre(e) }} style={{ border: nombre.rojo }}/>
                        <div id="nombre" className="invalid-feedback">
                        Min. 4 letras o num
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-md-12 col-12 '>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='direccion'>Direccion</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classDireccion} type='text' id='direccion' onChange={e => { handleDireccion(e) }} style={{ border: direccion.rojo }} />
                        <div id="cdireccion" className="invalid-feedback">
                        Min. 4 letras o num
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

            <div className='row justify-content-center '>
                <div className='col-xl-6 col-md-12 col-12'>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='telefono'>Telefono</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classTelefono} type='text' id='telefono' onChange={e => { handleTelefono(e) }} style={{ border: correo.rojo }}/>
                        <div id="telefono" className="invalid-feedback">
                        Ingrese un número valido
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-6 col-md-12 col-12 '>
                    <div className='row justify-content-center my-2'>
                      <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='cuidad'>Cuidad</label>
                      <div className='col-xl-6 col-md-6 col-12 '>
                        <input className={classCuidad} type='text' id='cuidad' onChange={e => { handleCuidad(e) }} style={{ border: ciudad.rojo }} />
                        <div id="cuidad" className="invalid-feedback">
                        Min. 4 letras o num
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

            


            <div className='row justify-content-center campo-email'>
                            <div className='col-xl-6 col-md-12 col-12 pad-registro-usuario'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='email'>Correo</label>
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                        <input className={classEmail} type='email' id='email' onChange={e => { handleEmail(e) }} style={{ border: correo.rojo }} autoComplete='off' />
                                        <div id="email" className="invalid-feedback">
                                            Ingrese email valido
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-6 col-md-12 col-12 pad-registro-usuario'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='tipo-pqrs'>Tipo PQRS</label>
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                    <select className='form-select' name='tipo-pqrs' id='tipo' placeholder='Selecciones tipo de documento' onChange={e => { setTipoPQRS({valor:e.target.value, rojo:''}) }} style={{ border: tipo_pqrs.rojo }}>
                                      <option value=''>Selecciona...</option>
                                      <option value='Petición'>Peticion</option>
                                      <option value='Queja'>Queja</option>
                                      <option value='Reclamo'>Reclamo</option>
                                      <option value='Felicitación'>Felicitación</option>
                                    </select>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>




            <div className='row mt-3' style={{ display: 'flex', justifyContent: 'right'}}>
            <div className='col-11 my-md-2 my-sm-1 px-0'> 
              <textarea className={classDescripcion} id='descripcion' spellcheck="false"  placeholder="descripción..." style={{ border: descripcion.rojo }} onChange={e => { handleDescripcion(e) }} />
              <div id="descripcion" className="invalid-feedback">
                  Min. 8 letras
              </div>
              </div>
            </div>

            <div className='row justify-content-center'>
            <label className='col-xl-5 col-md-5 col-sm-6 col-12 my-md-2 my-sm-1 px-0 lbl-general px-0' htmlFor='fecha'>Fecha plazo final (15 dias habiles)</label>
            <div className='col-xl-5 col-md-5 col-sm-6 col-12 my-md-2 my-sm-1 px-0'>
            <input
            type="date"
            className="form-control"
            onChange={e => { setFecha({valor:e.target.value, rojo:''}) }} style={{ border: fecha.rojo  }}
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
