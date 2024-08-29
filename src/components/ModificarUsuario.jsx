import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/css/ingresarUsuario.css';
import { getUsuario, updateUsuario } from "../api/Usuario";
import Swal from 'sweetalert2';
import MyContext from './context';
import { useContext } from 'react';


export default function ModificarUsuario() {

    const { setUsuarioGlobal } = useContext(MyContext);

    const [usuario, setUsuario] = useState([]);
    const location = useLocation();
    const [read] = useState(location.state.read);
    const [id] = useState(location.state.id);

    const navigate = useNavigate();



    const [permiso_venta_ver, setPermisoVentaVer] = useState(null);
    const [permiso_venta_ingresar, setPermisoVentaIngresar] = useState(null);
    const [permiso_venta_editar, setPermisoVentaEditar] = useState( null);
    const [permiso_venta_eliminar, setPermisoVentaEliminar] = useState(null);

    const [permiso_recuperador_ver, setPermisoRecuperadorVer] = useState(null);
    const [permiso_recuperador_ingresar, setPermisoRecuperadorIngresar] = useState(null);
    const [permiso_recuperador_editar, setPermisoRecuperadorEditar] = useState(null);
    const [permiso_recuperador_eliminar, setPermisoRecuperadorEliminar] = useState(null);
    
    const [permiso_eca_ver, setPermisoEcaVer] = useState(null);
    const [permiso_eca_ingresar, setPermisoEcaIngresar] = useState(null);
    const [permiso_eca_editar, setPermisoEcaEditar] = useState(null);
    const [permiso_eca_eliminar, setPermisoEcaEliminar] = useState(null);
    
    const [permiso_vehiculo_ver, setPermisoVehiculoVer] = useState(null);
    const [permiso_vehiculo_ingresar, setPermisoVehiculoIngresar] = useState(null);
    const [permiso_vehiculo_editar, setPermisoVehiculoEditar] = useState(null);
    const [permiso_vehiculo_eliminar, setPermisoVehiculoEliminar] = useState(null);
    
    const [permiso_prefactura_ver, setPermisoPrefacturaVer] = useState(null);
    const [permiso_prefactura_ingresar, setPermisoPrefacturaIngresar] = useState(null);
    const [permiso_prefactura_editar, setPermisoPrefacturaEditar] = useState(null);
    const [permiso_prefactura_eliminar, setPermisoPrefacturaEliminar] = useState(null);
    
    const [permiso_pqrs_ver, setPermisoPqrsVer] = useState(null);
    const [permiso_pqrs_ingresar, setPermisoPqrsIngresar] = useState(null);
    const [permiso_pqrs_editar, setPermisoPqrsEditar] = useState(null);
    const [permiso_pqrs_eliminar, setPermisoPqrsEliminar] = useState(null);
    
    const [permiso_usuario_ver, setPermisoUsuarioVer] = useState(null);
    const [permiso_usuario_ingresar, setPermisoUsuarioIngresar] = useState(null);
    const [permiso_usuario_editar, setPermisoUsuarioEditar] = useState(null);
    const [permiso_usuario_eliminar, setPermisoUsuarioEliminar] = useState(null);
    
    const [permiso_dotacion_ver, setPermisoDotacionVer] = useState(null);
    const [permiso_dotacion_ingresar, setPermisoDotacionIngresar] = useState(null);
    
    const [permiso_bancarizado_ingresar, setPermisoBancarizadoIngresar] = useState(null);
    
    const [permiso_historial_ver, setPermisoHistorialVer] = useState(null);
    
    const [permiso_balancemasas_ver, setPermisoBalanceMasasVer] = useState(null);
    



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


    useEffect(() => {
        const getUsuarioF = async () => {
          const getUsuarioAPI = await getUsuario(id);
          setUsuario(getUsuarioAPI);
        }
        getUsuarioF();
      }, [id])

      useEffect(() => {
        if (usuario.permisos !== undefined) {
          setPermisoVentaVer(usuario.permisos.venta.ver);
          setPermisoVentaIngresar(usuario.permisos.venta.ingresar);
          setPermisoVentaEditar(usuario.permisos.venta.editar);
          setPermisoVentaEliminar(usuario.permisos.venta.eliminar);
      
          setPermisoRecuperadorVer(usuario.permisos.recuperador.ver);
          setPermisoRecuperadorIngresar(usuario.permisos.recuperador.ingresar);
          setPermisoRecuperadorEditar(usuario.permisos.recuperador.editar);
          setPermisoRecuperadorEliminar(usuario.permisos.recuperador.eliminar);
      
          setPermisoEcaVer(usuario.permisos.eca.ver);
          setPermisoEcaIngresar(usuario.permisos.eca.ingresar);
          setPermisoEcaEditar(usuario.permisos.eca.editar);
          setPermisoEcaEliminar(usuario.permisos.eca.eliminar);
      
          setPermisoVehiculoVer(usuario.permisos.vehiculo.ver);
          setPermisoVehiculoIngresar(usuario.permisos.vehiculo.ingresar);
          setPermisoVehiculoEditar(usuario.permisos.vehiculo.editar);
          setPermisoVehiculoEliminar(usuario.permisos.vehiculo.eliminar);
      
          setPermisoPrefacturaVer(usuario.permisos.prefactura.ver);
          setPermisoPrefacturaIngresar(usuario.permisos.prefactura.ingresar);
          setPermisoPrefacturaEditar(usuario.permisos.prefactura.editar);
          setPermisoPrefacturaEliminar(usuario.permisos.prefactura.eliminar);
      
          setPermisoPqrsVer(usuario.permisos.pqrs.ver);
          setPermisoPqrsIngresar(usuario.permisos.pqrs.ingresar);
          setPermisoPqrsEditar(usuario.permisos.pqrs.editar);
          setPermisoPqrsEliminar(usuario.permisos.pqrs.eliminar);
      
          setPermisoUsuarioVer(usuario.permisos.usuario.ver);
          setPermisoUsuarioIngresar(usuario.permisos.usuario.ingresar);
          setPermisoUsuarioEditar(usuario.permisos.usuario.editar);
          setPermisoUsuarioEliminar(usuario.permisos.usuario.eliminar);
      
          setPermisoDotacionVer(usuario.permisos.dotacion.ver);
          setPermisoDotacionIngresar(usuario.permisos.dotacion.ingresar);
      
          setPermisoBancarizadoIngresar(usuario.permisos.bancarizado.ingresar);
      
          setPermisoHistorialVer(usuario.permisos.historial.ver);
      
          setPermisoBalanceMasasVer(/* usuario.permisos.balancemasas.ver */ true ) ;


          setTipoDoc({valor: usuario.tipo_doc, rojo: ''})
          setDoc({valor: usuario.documento, rojo: ''})
          setNombre({valor: usuario.nombre, rojo: ''})

        }
      }, [usuario]);


    const actualizarUsuario = async () => {
        
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

            await updateUsuario(id, usuario, documento.valor, nombre.valor, usuario.correo, tipo_doc.valor, Permisos);
        
            Swal.fire(
                'Actualizado!',
                'La información se ha actualizado correctamente!',
                'success'
            ).then((r) => {
                if (r.isConfirmed) {
                    navigate('../app/consultarusuario');
                }
            });
        } catch (error) {
            Swal.fire(
                'Error',
                'Ocurrio un error inesperado',
                'error'
            )
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



    const verificar = () => {

        const inputs = [
            { value: documento.valor, set: setDoc },
            { value: nombre.valor, set: setNombre },
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
            if (valid) {
                setBtnIngresoDisable(true);
                actualizarUsuario();
            }

        }
    }

    return (
        //<Container fluid className='contenido-ingresar-usuario'>
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>{location.state.mode} Usuario</h1>
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
                        <td><input type="checkbox" onClick={() => setPermisoVentaVer(!permiso_venta_ver)} disabled={read} checked={permiso_venta_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoVentaIngresar(!permiso_venta_ingresar)} disabled={read} checked={permiso_venta_ingresar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoVentaEditar(!permiso_venta_editar)} disabled={read} checked={permiso_venta_editar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoVentaEliminar(!permiso_venta_eliminar)} disabled={read} checked={permiso_venta_eliminar} /></td>
                        </tr>
                        <tr>
                        <th scope="row">Recuperador</th>
                        <td><input type="checkbox" onClick={() => setPermisoRecuperadorVer(!permiso_recuperador_ver)} disabled={read} checked={permiso_recuperador_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoRecuperadorIngresar(!permiso_recuperador_ingresar)} disabled={read} checked={permiso_recuperador_ingresar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoRecuperadorEditar(!permiso_recuperador_editar)} disabled={read} checked={permiso_recuperador_editar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoRecuperadorEliminar(!permiso_recuperador_eliminar)} disabled={read} checked={permiso_recuperador_eliminar} /></td>
                        </tr>
                        <tr>
                        <th scope="row">ECA/Bodega</th>
                        <td><input type="checkbox" onClick={() => setPermisoEcaVer(!permiso_eca_ver)} disabled={read} checked={permiso_eca_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoEcaIngresar(!permiso_eca_ingresar)} disabled={read} checked={permiso_eca_ingresar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoEcaEditar(!permiso_eca_editar)} disabled={read} checked={permiso_eca_editar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoEcaEliminar(!permiso_eca_eliminar)} disabled={read} checked={permiso_eca_eliminar} /></td>
                        </tr>
                        <tr>
                        <th scope="row">Vehiculo</th>
                        <td><input type="checkbox" onClick={() => setPermisoVehiculoVer(!permiso_vehiculo_ver)} disabled={read} checked={permiso_vehiculo_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoVehiculoIngresar(!permiso_vehiculo_ingresar)} disabled={read} checked={permiso_vehiculo_ingresar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoVehiculoEditar(!permiso_vehiculo_editar)} disabled={read} checked={permiso_vehiculo_editar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoVehiculoEliminar(!permiso_vehiculo_eliminar)} disabled={read} checked={permiso_vehiculo_eliminar} /></td>
                        </tr>

                        <tr>
                        <th scope="row">Reporte de prefactura</th>
                        <td><input type="checkbox" onClick={() => setPermisoPrefacturaVer(!permiso_prefactura_ver)} disabled={read} checked={permiso_prefactura_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoPrefacturaIngresar(!permiso_prefactura_ingresar)} disabled={read} checked={permiso_prefactura_ingresar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoPrefacturaEditar(!permiso_prefactura_editar)} disabled={read} checked={permiso_prefactura_editar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoPrefacturaEliminar(!permiso_prefactura_eliminar)} disabled={read} checked={permiso_prefactura_eliminar} /></td>
                        </tr>

                        <tr>
                        <th scope="row">PQRS</th>
                        <td><input type="checkbox" onClick={() => setPermisoPqrsVer(!permiso_pqrs_ver)} disabled={read} checked={permiso_pqrs_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoPqrsIngresar(!permiso_pqrs_ingresar)} disabled={read} checked={permiso_pqrs_ingresar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoPqrsEditar(!permiso_pqrs_editar)} disabled={read} checked={permiso_pqrs_editar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoPqrsEliminar(!permiso_pqrs_eliminar)} disabled={read} checked={permiso_pqrs_eliminar} /></td>
                        </tr>
                        <tr>
                        <th scope="row">Usuario</th>
                        <td><input type="checkbox" onClick={() => setPermisoUsuarioVer(!permiso_usuario_ver)} disabled={read} checked={permiso_usuario_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoUsuarioIngresar(!permiso_usuario_ingresar)} disabled={read} checked={permiso_usuario_ingresar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoUsuarioEditar(!permiso_usuario_editar)} disabled={read} checked={permiso_usuario_editar} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoUsuarioEliminar(!permiso_usuario_eliminar)} disabled={read} checked={permiso_usuario_eliminar} /></td>
                        </tr>

                        <tr>
                        <th scope="row">Dotación</th>
                        <td><input type="checkbox" onClick={() => setPermisoDotacionVer(!permiso_dotacion_ver)} disabled={read} checked={permiso_dotacion_ver} /></td>
                        <td><input type="checkbox" onClick={() => setPermisoDotacionIngresar(!permiso_dotacion_ingresar)} disabled={read} checked={permiso_dotacion_ingresar} /></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="row">Bancarizado</th>
                        <td></td>
                        <td><input type="checkbox" onClick={() => setPermisoBancarizadoIngresar(!permiso_bancarizado_ingresar)} disabled={read} checked={permiso_bancarizado_ingresar} /></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="row">Historial</th>
                        <td><input type="checkbox" onClick={() => setPermisoHistorialVer(!permiso_historial_ver)} disabled={read} checked={permiso_historial_ver} /></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        </tr>

                        <tr>
                        <th scope="row">Balance Masas</th>
                        <td><input type="checkbox" onClick={() => setPermisoBalanceMasasVer(!permiso_balancemasas_ver)} disabled={read} checked={permiso_balancemasas_ver} /></td>
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
                                    <select className='form-select' name='tipo-documento' id='tipo' onChange={e => { setTipoDoc({ valor: e.target.value, rojo: '' }) }} style={{ border: tipo_doc.rojo }} disabled={read} value={tipo_doc.valor}>
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
                                    <input className={classDocumento} type='text' id='numero-id' onChange={e => { handleDocumento(e) }} style={{ border: documento.rojo }} readOnly={read} value={documento.valor}/>
                                    <div id="numero-id" className="invalid-feedback">
                                        Min. 4 letras o num
                                    </div>
                                </div>
                            </div>

                        </div>
                    
                    <div className='campo-documento'>
                        <div className='row justify-content-center'>
                            <div className='row justify-content-center'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario form-label' htmlFor='nombre'>Nombre</label>
                                <div className='col-xl-3 col-md-6 '>
                                    <input className={classNombre} type='text' id='nombre' onChange={e => { handleNombre(e) }} style={{ border: nombre.rojo }} readOnly={read} value={nombre.valor} />
                                    <div id="nombre" className="invalid-feedback">
                                        Min. 4 letras
                                    </div>
                                </div>

                            </div>

                            <div className='row justify-content-center num-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario form-label' htmlFor='numero-id'>Correo</label>
                                <div className='col-xl-3 col-md-6'>
                                    <input className={classEmail} type='text' id='numero-id' onChange={e => { handleEmail(e) }} style={{ border: documento.rojo }} readOnly={true} value={usuario.correo}/>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                        {!read ? (
                        <button className='enviar btn-ingresar-usuario' type='button' value='Enviar' onClick={() => { verificar(); }} disabled={btnIngresoDisable} >Actualizar</button>
                        ):null}
                    </form>
                </div>
            </div>

        </div>
    )
}
