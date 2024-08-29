import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import _ from "lodash";
import { useNavigate } from 'react-router-dom';
import { deleteRecuperador } from '../api/Recuperador';
import {   deleteIndocumentado, getIndocumentados} from '../api/Indocumentado';

export default function ConsultarIndocumentado() {

    const [indocumentados, setIndocumentados] = useState([]);
    const [query, setquery] = useState("");
    const curr = new Date();
    const [queryTime, setqueryTime] = useState("1970-01-01");
    const [queryTime2, setqueryTime2] = useState(curr.toISOString().slice(0, 10));
    const [selectValue, setSelectValue] = useState('nom');
    const [selectType, setSelectType] = useState('operativo');

    const [show, setShow] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    // Pagination
    const [paginated, setPaginated] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    const numberArt = 10;
    const pageCount = Math.ceil(indocumentados.length / numberArt);
    const pages = _.range(1, pageCount + 1);

    // navegar
    const navigate = useNavigate();
    

    useEffect(() => {
        const getIndocumentadosF = async () => {
            const getIndocumentadosApi = await getIndocumentados();
            setIndocumentados(getIndocumentadosApi);
        }
        getIndocumentadosF();
    }, [])

    function eliminarIndocumentado(idIndocumentado, nombreIndocumentado) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás recuperar esta informacíón",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteIndocumentado(idIndocumentado);
                Swal.fire(
                    'Borrado!',
                    'El Indocumentado "' + nombreIndocumentado + '" con cedula por agregar se ha borrado del sistema',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                });
            }
        })
    }

    

    const filterEcas = indocumentados?.slice(0, indocumentados.length).filter((indocumentado) => {
        if (selectValue === 'id') {
            return indocumentado.codigoId.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'nom') {
            return indocumentado.nombre_beneficiario.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'fe') {
            return (queryTime <= indocumentado.fecha_registro && queryTime2 >= indocumentado.fecha_registro);
        } else if (selectValue === 'eca') {
            return indocumentado.nombre_beneficiario.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'comun') {
            return indocumentado.nombre_beneficiario.toLowerCase().match(query.toLowerCase());
        }
        return '';
    });

    return (
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Consultar indocumentados</h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>



                        <div className='campo-documento'>
                            <div className='row justify-content-center tipo-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Buscar por</label>
                                <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { 
                                    setquery(""); 
                                    setSelectValue(e.target.value);  
                                    if (e.target.value === "eca" || e.target.value === "comun") {
                                        setShow(false);
                                        setShow2(true);
                                        setShow3(false);
                                    } else if(e.target.value === "nom" || e.target.value === "id") {
                                        setShow(true);
                                        setShow3(false);
                                        setShow2(false);
                                    } else if (e.target.value === "fe") {
                                        setShow3(true);
                                        setShow2(false);
                                        setShow(false);
                                    } else if (e.target.value === "bodega") {
                                        setShow3(true);
                                        setShow2(false);
                                        setShow(false);
                                    } 
                                }}>
                                    <option value='id'>Codigo de Identificacion</option>
                                    <option value='fe'>Fecha ingreso</option>
                                    <option value='nom'>Nombre</option>
                                    <option value='eca'>ECA</option>
                                    <option value='bodega'>Bodega</option>
                                    <option value='comun'>Comuna</option>


                                </select>
                            </div>

                            <div className='row justify-content-center num-id'>
                                {show &&
                                    <div>
                                        <input className='col-xl-4 col-md-6' type='text' id='numero-id' onChange={(e) => setquery(e.target.value)} value={query} />
                                    </div>
                                }
                                {show2 &&
                                    <div>
                                        <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectType(e.target.value); setquery(e.target.value); }} value={selectType}>
                                            <option value='operativo'>Operativo</option>
                                            <option value='oficina central'>Campo</option>
                                            <option value='admin'>Administrativo</option>
                                        </select>
                                    </div>
                                }
                                {show3 &&
                                    <div>
                                        <label htmlFor="initial-date">Desde</label>
                                        <input
                                        type="date"
                                        id='initial-date'
                                        className="col-md-2 col-8 mx-md-4 my-md-0 my-2"
                                        onChange={e => { setqueryTime(e.target.value)  }}
                                    ></input>
                                    <label htmlFor="final-date">Hasta</label>
                                    <input
                                        type="date"
                                        id='final-date'
                                        className="col-md-2 col-8 mx-md-4 my-md-0 my-2"
                                        onChange={e => { setqueryTime2(e.target.value)  }}
                                    ></input>
                                    </div>
                                }
                            </div>

                        </div>

                        <hr></hr>
                    </form>
                    <div className='row table-responsive' style={{ overflowX: 'auto' }}>
                        <table className='col-12 table table-hover' >
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Bodega</th>
                                    <th>Fecha Ingreso</th>
                                    <th>Municipio</th>
                                    <th>Telefono</th>
                                    <th>Direccion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterEcas?.slice((paginated - 1) * numberArt, (paginated) * numberArt).map((datos, index) => (
                                    <tr key={index}>
                                        <td>{datos.codigoId}</td>
                                        <td>{datos.nombre_beneficiario}</td>
                                        <td>{datos.bodega}</td>
                                        <td>{datos.fecha_registro}</td>
                                        <td>{datos.municipio}</td>
                                        <td>{datos.telefono}</td>
                                        <td>{datos.direccion}</td> 
                                        <td >
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { eliminarIndocumentado(datos.id, datos.nombre_beneficiario) }}><i className="fa-solid fa-trash-can fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { 
                                                navigate('../app/modificarindocumentado', {
                                                    state: {
                                                        id: datos.id,
                                                        bodega: datos.bodega,
                                                        documento: datos.documento,
                                                        read: false
                                                    }
                                                });
                                                }}><i className="fa-regular fa-pen-to-square fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn " onClick={() => { 
                                                navigate('../app/modificarindocumentado', {
                                                    state: {
                                                        id: datos.id,
                                                        bodega: datos.bodega,
                                                        documento: datos.documento,
                                                        read: true
                                                    }
                                                });
                                             }}><i className="fa-regular fa-eye fa-xl"></i></div>
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
