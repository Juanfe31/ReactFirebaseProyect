import React from 'react';
import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getUsuarios, deleteUsuario} from '../api/Usuario';
import '../assets/css/ingresarUsuario.css';
import Swal from 'sweetalert2';
import _ from "lodash";
import MyContext from './context';
import { useContext } from 'react';

//import Container from 'react-bootstrap/Container';


export default function ConsultarUsuario() {

    const { setUsuarioGlobal } = useContext(MyContext);

    const [query, setquery] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    const [show, setShow] = useState(false);

    // Pagination
    const [paginated, setPaginated] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectValue, setSelectValue] = useState('cc');
    const [selectType, setSelectType] = useState('operativo');
    const numberArt = 20;
    const pageCount = Math.ceil(usuarios.length / numberArt);
    const pages = _.range(1, pageCount + 1);

    const navigate = useNavigate();


    useEffect(() => {
        const getUsuariosF = async () => {
            const getUsuariosAPI = await getUsuarios();
            setUsuarios(getUsuariosAPI);
        }
        getUsuariosF();
    }, [])

    function eliminarUsuario(idUsuario, documentoUsuario) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar esta informacíón",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo'
        }).then((result) => {
            if (result.isConfirmed) {
                setUsuarioGlobal(prevUsuario => ({
                    ...prevUsuario,
                    activo: true
                  }));
                deleteUsuario(idUsuario);
                Swal.fire(
                    'Borrado!',
                    'El usuario con documento "' + documentoUsuario + '" se ha borrado del sistema',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                })

            }
        })
    }

    const filterUsuarios = usuarios?.slice(0, usuarios.length).filter((usuario) => {
        if (selectValue === 'cc') {
            return usuario.documento.toLowerCase().match(query.toLowerCase());
        }
        else if (selectValue === 'tu') {
            return usuario.tipo_usuario.match(query);
        } else if (selectValue === 'nom') {
            return usuario.nombre.toLowerCase().match(query.toLowerCase());
        }
        return '';
    });

    

    return (
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Consultar usuario</h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>
                        <div className='campo-documento'>
                            <div className='row justify-content-center tipo-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Buscar por</label>
                                <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectValue(e.target.value); setquery(""); (e.target.value === 'tu' ? setShow(true) : setShow(false)) }} value={selectValue}>
                                    <option value='cc'>Cedula de ciudadanía</option>
                                    <option value='nom'>Nombre</option>
                                    <option value='tu'>Tipo de usuario</option>
                                </select>
                            </div>

                            <div className='row justify-content-center num-id'>
                                <label className='col-xl-12 col-md-5 lbl-registro-usuario' htmlFor='numero-id'>Ingrese el dato a buscar:</label>
                                <div className='my-md-1'>
                                    {!show &&
                                        <div>
                                            <input className='col-xl-4 col-md-6' type='text' id='numero-id' onChange={(e) => setquery(e.target.value)} value={query} />
                                        </div>
                                    }
                                    {show &&
                                        <div>
                                            <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectType(e.target.value); setquery(e.target.value); }} value={selectType}>
                                                <option value='operativo'>Operativo</option>
                                                <option value='oficina central'>Oficina Central</option>
                                                <option value='admin'>Administrativo</option>
                                            </select>
                                        </div>}
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </form>

                    <div className='row table-responsive' style={{ overflowX: 'auto' }}>
                        <table className='col-12 table table-hover' >
                            <thead>
                                <tr>
                                    <th>Tipo doc</th>
                                    <th># documento</th>
                                    <th>Tipo usuario</th>
                                    <th>Nombre</th>
                                    <th>Nombre usuario</th>
                                    <th>Correo</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterUsuarios?.slice((paginated - 1) * numberArt, (paginated) * numberArt).map((datos, index) => (
                                    <tr key={index}>
                                        <td>{datos.tipo_doc}</td>
                                        <td>{datos.documento}</td>
                                        <td>{datos.tipo_usuario}</td>
                                        <td>{datos.nombre}</td>
                                        <td>{datos.nombre_usuario}</td>
                                        <td>{datos.correo}</td>
                                        <td >
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { eliminarUsuario(datos.id, datos.documento) }}><i className="fa-solid fa-trash-can fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => {navigate('../app/modificarusuario', {
                                                    state: {
                                                        id: datos.id,
                                                        read: false,
                                                        mode: "Editar"
                                                    }
                                                }); }}><i className="fa-regular fa-pen-to-square fa-xl"></i></div>

                                            <div style={{ display: 'inline' }} className="deleteBtn " onClick={() => { navigate('../app/modificarusuario', {
                                                    state: {
                                                        id: datos.id,
                                                        read: true,
                                                        mode: "Visualizar"
                                                    }
                                                });}}><i className="fa-regular fa-eye fa-xl"></i></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <nav className='d-flex justify-content-center'>
                            <ul className='pagination'>
                                {
                                    pages.map((page, index) => (
                                        <li key={index} className={page === currentPage ? "page-item active" : "page-item"}>
                                            <p className='page-link' onClick={() => { setPaginated(page); setCurrentPage(page) }}>{page}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>

        </div>
    )
}