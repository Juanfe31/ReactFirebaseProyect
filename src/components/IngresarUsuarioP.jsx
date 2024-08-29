import { useState } from 'react';
import '../assets/css/ingresarUsuario.css';
import { createUsuario } from '../api/Usuario';
import Swal from 'sweetalert2';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import MyContext from './context';
import { useContext } from 'react';


export default function IngresarUsuario() {

    const { setUsuarioGlobal } = useContext(MyContext);


    const [permiso_venta_ver, setPermisoVentaVer] = useState( false);
    const [permiso_venta_ingresar, setPermisoVentaIngresar] = useState( false);
    const [permiso_venta_editar, setPermisoVentaEditar] = useState( false);
    const [permiso_venta_eliminar, setPermisoVentaEliminar] = useState( false);

    const [permiso_recuperador_ver, setPermisoRecuperadorVer] = useState(false);
    const [permiso_recuperador_ingresar, setPermisoRecuperadorIngresar] = useState(false);
    const [permiso_recuperador_editar, setPermisoRecuperadorEditar] = useState(false);
    const [permiso_recuperador_eliminar, setPermisoRecuperadorEliminar] = useState(false);

    
    const [permiso_eca_ver, setPermisoEcaVer] = useState(false);
    const [permiso_eca_ingresar, setPermisoEcaIngresar] = useState(false);
    const [permiso_eca_editar, setPermisoEcaEditar] = useState(false);
    const [permiso_eca_eliminar, setPermisoEcaEliminar] = useState(false);

    
    const [permiso_vehiculo_ver, setPermisoVehiculoVer] = useState(false);
    const [permiso_vehiculo_ingresar, setPermisoVehiculoIngresar] = useState(false);
    const [permiso_vehiculo_editar, setPermisoVehiculoEditar] = useState(false);
    const [permiso_vehiculo_eliminar, setPermisoVehiculoEliminar] = useState(false);

    
    const [permiso_prefactura_ver, setPermisoPrefacturaVer] = useState(false);
    const [permiso_prefactura_ingresar, setPermisoPrefacturaIngresar] = useState(false);
    const [permiso_prefactura_editar, setPermisoPrefacturaEditar] = useState(false);
    const [permiso_prefactura_eliminar, setPermisoPrefacturaEliminar] = useState(false);

    
    const [permiso_pqrs_ver, setPermisoPqrsVer] = useState(false);
    const [permiso_pqrs_ingresar, setPermisoPqrsIngresar] = useState(false);
    const [permiso_pqrs_editar, setPermisoPqrsEditar] = useState(false);
    const [permiso_pqrs_eliminar, setPermisoPqrsEliminar] = useState(false);

    
    const [permiso_usuario_ver, setPermisoUsuarioVer] = useState(false);
    const [permiso_usuario_ingresar, setPermisoUsuarioIngresar] = useState(false);
    const [permiso_usuario_editar, setPermisoUsuarioEditar] = useState(false);
    const [permiso_usuario_eliminar, setPermisoUsuarioEliminar] = useState(false);

    const [permiso_dotacion_ver, setPermisoDotacionVer] = useState(false);
    const [permiso_dotacion_ingresar, setPermisoDotacionIngresar] = useState(false);

    const [permiso_bancarizado_ingresar, setPermisoBancarizadoIngresar] = useState(false);

    const [permiso_historial_ver, setPermisoHistorialVer] = useState(false);

    const [permiso_balancemasas_ver, setPermisoBalanceMasasVer] = useState(false);



    const [tipo_doc, setTipoDoc] = useState({ valor: "cc", rojo: "" });
    const [documento, setDoc] = useState({ valor: "", rojo: "" });
    const [nombre, setNombre] = useState({ valor: "", rojo: "" });
    const [correo, setCorreo] = useState({ valor: "", rojo: "" });
    const [password, setPassword] = useState({ valor: "", rojo: "" });
    const [confCorreo, setConfCorreo] = useState({ valor: "", rojo: "" });
    const [confPassword, setConfPassword] = useState({ valor: "", rojo: "" });





    const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);

    const [classDocumento, setClassDocumento] = useState("form-control")
    const [classNombre, setClassNombre] = useState("form-control")
    const [classEmail, setClassEmail] = useState("form-control")
    const [classConfEmail, setClassConfEmail] = useState("form-control")
    const [classPassword, setClassPassword] = useState("form-control")
    const [classConfPassword, setClassConfPassword] = useState("form-control")


    const crearUsuario = async () => {
       
        const Permisos = {
            venta: {
              ver: permiso_venta_ver,
              ingresar: permiso_venta_ingresar,
              editar: permiso_venta_editar,
              eliminar: permiso_venta_eliminar
            },
            recuperador: {
              ver: permiso_recuperador_ver,
              ingresar: permiso_recuperador_ingresar,
              editar: permiso_recuperador_editar,
              eliminar: permiso_recuperador_eliminar
            },
            eca: {
              ver: permiso_eca_ver,
              ingresar: permiso_eca_ingresar,
              editar: permiso_eca_editar,
              eliminar: permiso_eca_eliminar
            },
            vehiculo: {
              ver: permiso_vehiculo_ver,
              ingresar: permiso_vehiculo_ingresar,
              editar: permiso_vehiculo_editar,
              eliminar: permiso_vehiculo_eliminar
            },
            prefactura: {
              ver: permiso_prefactura_ver,
              ingresar: permiso_prefactura_ingresar,
              editar: permiso_prefactura_editar,
              eliminar: permiso_prefactura_eliminar
            },
            pqrs: {
              ver: permiso_pqrs_ver,
              ingresar: permiso_pqrs_ingresar,
              editar: permiso_pqrs_editar,
              eliminar: permiso_pqrs_eliminar
            },
            usuario: {
              ver: permiso_usuario_ver,
              ingresar: permiso_usuario_ingresar,
              editar: permiso_usuario_editar,
              eliminar: permiso_usuario_eliminar
            },
            dotacion: {
              ver: permiso_dotacion_ver,
              ingresar: permiso_dotacion_ingresar
            },
            bancarizado: {
              ingresar: permiso_bancarizado_ingresar,
            },
            historial: {
              ver: permiso_historial_ver,
            }
            ,
            balancemasa: {
              ver: permiso_balancemasas_ver,
            }
          };
          
        try {
            await createUserWithEmailAndPassword(auth, correo.valor, password.valor)
                .then((userCredential) => {
                    // Signed in
                    // const user = userCredential.user;
                    setUsuarioGlobal(prevUsuario => ({
                        ...prevUsuario,
                        activo: true
                    }));
                    createUsuario(documento.valor, nombre.valor, correo.valor, tipo_doc.valor, 'tipo_usuario',Permisos);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Este correo ya fue registrado'
                        })
                    }
                    if (errorMessage === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'La contraseña debe tener como minimo 6 caracteres'
                        })
                    }
                    console.log(errorMessage)
                    setBtnIngresoDisable(false);
                });
        } catch (error) {

        }
    }

    const handleNombre = (e) => {
        if (e.target.value.length < 4) {
            setClassNombre("form-control is-invalid")
        } else {
            setClassNombre("form-control is-valid")
        }
        setNombre({ valor: e.target.value, rojo: '' })
    }

    const handleDocumento = (e) => {
        if (e.target.value.length < 4) {
            setClassDocumento("form-control is-invalid");
        } else {
            setClassDocumento("form-control is-valid");
        }
        setDoc({ valor: e.target.value, rojo: '' })

    }

    const isValidEmail = (e) => {
        const emailRegex = /^\S+@\S+\.\S/;
        return emailRegex.test(e);
    }

    const handleEmail = (e) => {
        if (!isValidEmail(e.target.value)) {
            setClassEmail("form-control is-invalid")
        } else {
            setClassEmail("form-control is-valid")
        }
        setCorreo({ valor: e.target.value, rojo: '' })
    }

    const handleConfEmail = (e) => {
        if (!isValidEmail(e.target.value)) {
            setClassConfEmail("form-control is-invalid")
        } else {
            setClassConfEmail("form-control is-valid")
        }
        setConfCorreo({ valor: e.target.value, rojo: '' })
    }

    const handlePassword = (e) => {
        if (e.target.value.length < 6) {
            setClassPassword("form-control is-invalid");
        } else {
            setClassPassword("form-control is-valid");
        }
        setPassword({ valor: e.target.value, rojo: '' });
    }

    const handleConfirmarPassword = (e) => {
        if (e.target.value.length < 6) {
            setClassConfPassword("form-control is-invalid");
        } else {
            setClassConfPassword("form-control is-valid");
        }
        setConfPassword({ valor: e.target.value, rojo: '' });
    }


    const verificar = () => {

        const inputs = [
            { value: documento.valor, set: setDoc },
            { value: nombre.valor, set: setNombre },
            { value: correo.valor, set: setCorreo },
            { value: confCorreo.valor, set: setConfCorreo },
            { value: password.valor, set: setPassword },
            { value: confPassword.valor, set: setConfPassword },
            { value: tipo_doc.valor, set: setTipoDoc },
        ];

        let hasEmptyInputs = false;
        let valid = true;

        for (const input of inputs) {
            if (input.value === '') {
                input.set({ valor: input.value, rojo: '2px ridge red' });
                hasEmptyInputs = true;
                valid = false;
            }
        }


        if (hasEmptyInputs) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Complete los campos',
            });
        } else if (correo.valor !== confCorreo.valor) {
            setCorreo({ valor: correo.valor, rojo: '1px solid red' });
            setConfCorreo({ valor: confCorreo.valor, rojo: '1px solid red' });

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Los correos no concuerdan'
            })
        } else if (password.valor !== confPassword.valor) {
            setPassword({ valor: "", rojo: '1px solid red' });
            setConfPassword({ valor: "", rojo: '1px solid red' });

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Los contraseñas no concuerdan'
            })
        } else {
            if (documento.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un documento valido, minima longitud: 4',
                });
            }
            if (nombre.valor.length < 4) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un nombre valido, minima longitud: 4',
                });
            }
            if (!isValidEmail(correo.valor)) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese un correo valido',
                });
            }
            if (password.valor.length < 6) {
                valid = false;
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ingrese una contraseña valida, minima longitud: 6',
                });
            }
            if (valid) {
                setBtnIngresoDisable(true);
                crearUsuario();
            }

        }
    }

    return (
        //<Container fluid className='contenido-ingresar-usuario'>
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Crear nuevo usuario</h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form autoComplete="off">
                
                <div className='row justify-content-center'>
                <div className='col-9'>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Permisos</th>
                            <th scope="col">Ver</th>
                            <th scope="col">Ingresar</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <th scope="row">Reporte de venta</th>
                        <td><input type='checkbox' onClick={e => { setPermisoVentaVer(!permiso_venta_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoVentaIngresar(!permiso_venta_ingresar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoVentaEditar(!permiso_venta_editar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoVentaEliminar(!permiso_venta_eliminar) }}/></td>
                        </tr>
                        <tr>
                        <th scope="row">Recuperador</th>
                        <td><input type='checkbox' onClick={e => { setPermisoRecuperadorVer(!permiso_recuperador_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoRecuperadorIngresar(!permiso_recuperador_ingresar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoRecuperadorEditar(!permiso_recuperador_editar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoRecuperadorEliminar(!permiso_recuperador_eliminar) }}/></td>
                        </tr>
                        <tr>
                        <th scope="row">ECA/Bodega</th>
                        <td><input type='checkbox' onClick={e => { setPermisoEcaVer(!permiso_eca_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoEcaIngresar(!permiso_eca_ingresar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoEcaEditar(!permiso_eca_editar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoEcaEliminar(!permiso_eca_eliminar) }}/></td>
                        </tr>
                        <tr>
                        <th scope="row">Vehiculo</th>
                        <td><input type='checkbox' onClick={e => { setPermisoVehiculoVer(!permiso_vehiculo_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoVehiculoIngresar(!permiso_vehiculo_ingresar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoVehiculoEditar(!permiso_vehiculo_editar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoVehiculoEliminar(!permiso_vehiculo_eliminar) }}/></td>
                        </tr>
                        <tr>
                        <th scope="row">Reporte de prefactura</th>
                        <td><input type='checkbox' onClick={e => { setPermisoPrefacturaVer(!permiso_prefactura_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoPrefacturaIngresar(!permiso_prefactura_ingresar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoPrefacturaEditar(!permiso_prefactura_editar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoPrefacturaEliminar(!permiso_prefactura_eliminar) }}/></td>
                        </tr>
                        <tr>
                        <th scope="row">PQRS</th>
                        <td><input type='checkbox' onClick={e => { setPermisoPqrsVer(!permiso_pqrs_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoPqrsIngresar(!permiso_pqrs_ingresar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoPqrsEditar(!permiso_pqrs_editar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoPqrsEliminar(!permiso_pqrs_eliminar) }}/></td>
                        </tr>
                        <tr>
                        <th scope="row">Usuario</th>
                        <td><input type='checkbox' onClick={e => { setPermisoUsuarioVer(!permiso_usuario_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoUsuarioIngresar(!permiso_usuario_ingresar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoUsuarioEditar(!permiso_usuario_editar) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoUsuarioEliminar(!permiso_usuario_eliminar) }}/></td>
                        </tr>
                        <tr>
                        <th scope="row">Dotación</th>
                        <td><input type='checkbox' onClick={e => { setPermisoDotacionVer(!permiso_dotacion_ver) }}/></td>
                        <td><input type='checkbox' onClick={e => { setPermisoDotacionIngresar(!permiso_dotacion_ingresar) }}/></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr>
                        <th scope="row">Bancarizado</th>
                        <td></td>
                        <td><input type='checkbox' onClick={e => { setPermisoBancarizadoIngresar(!permiso_bancarizado_ingresar) }}/></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr>
                        <th scope="row">Historial</th>
                        <td><input type='checkbox' onClick={e => { setPermisoHistorialVer(!permiso_historial_ver) }}/></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                        <tr>
                        <th scope="row">Balance Masas</th>
                        <td><input type='checkbox' onClick={e => { setPermisoBalanceMasasVer(!permiso_balancemasas_ver) }}/></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>
                            
                        </tbody>
                    </table>
                </div>
                </div>

                        <div className='campo-documento'>
                            <div className='row justify-content-center tipo-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Tipo Documento</label>
                                <div className='col-xl-3 col-md-6'>
                                    <select className='form-select' name='tipo-documento' id='tipo' onChange={e => { setTipoDoc({ valor: e.target.value, rojo: '' }) }} style={{ border: tipo_doc.rojo }}>
                                        <option value=''>Selecciona...</option>
                                        <option value='cc'>Cedula de ciudadanía</option>
                                        <option value='ce'>Cedula de extranjería</option>
                                        <option value='pas'>Pasaporte</option>
                                        <option value='ti'>Tarjeta de identidad</option>
                                        <option value='rc'>Registro civil</option>
                                    </select>
                                </div>

                            </div>

                            <div className='row justify-content-center num-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario form-label' htmlFor='numero-id'>Número documento</label>
                                <div className='col-xl-3 col-md-6'>
                                    <input className={classDocumento} type='text' id='numero-id' onChange={e => { handleDocumento(e) }} style={{ border: documento.rojo }} />
                                    <div id="numero-id" className="invalid-feedback">
                                        Min. 4 letras o num
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='row justify-content-center campo-nombre'>
                            <label className='col-xl-3 col-md-5 lbl-registro-usuario form-label' htmlFor='nombre'>Nombre</label>
                            <div className='col-xl-3 col-md-6 '>
                                <input className={classNombre} type='text' id='nombre' onChange={e => { handleNombre(e) }} style={{ border: nombre.rojo }} />
                                <div id="nombre" className="invalid-feedback">
                                    Min. 4 letras
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
                                    <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='confirmar-email'>Confirmar correo</label>
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                        <input className={classConfEmail} type='email' id='confirmar-email' onChange={e => { handleConfEmail(e) }} style={{ border: confCorreo.rojo }} />
                                        <div id="confirmar-email" className="invalid-feedback">
                                            Ingrese email valido
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row justify-content-center campo-password'>
                            <div className='col-xl-6 col-md-12 col-12 pad-registro-usuario'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='password'>Contraseña</label>
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                        <input className={classPassword} type='password' id='password' onChange={e => { handlePassword(e) }} style={{ border: password.rojo }} value={password.valor} autoComplete='off' />
                                        <div id="password" className="invalid-feedback">
                                            Min. longitud: 6
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* espacio entre contraseñas pa cuando sea responsive 
                            col-xl-3 col-md-5*/}
                            <div className='col-xl-6 col-md-12 col-12 pad-registro-usuario'>
                                <div className='row justify-content-center my-2'>
                                    <label className='col-xl-6 col-md-5 col-12 lbl-registro-usuario' htmlFor='confirm-password'>Confirmar contraseña</label>
                                    <div className='col-xl-6 col-md-6 col-12 '>
                                        <input className={classConfPassword} type='password' id='confirm-password' onChange={e => { handleConfirmarPassword(e) }} style={{ border: confPassword.rojo }} value={confPassword.valor} />
                                        <div id="confirm-password" className="invalid-feedback">
                                            Min. longitud: 6
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <button className='enviar btn-ingresar-usuario' type='button' value='Enviar' onClick={() => { verificar(); }} disabled={btnIngresoDisable} >Enviar</button>

                    </form>
                </div>
            </div>

        </div>
    )
}
