import React from 'react'
import { useState, useEffect } from 'react';
import { getActions } from '../api/Action';
import _ from "lodash";
import Swal from 'sweetalert2';

export default function LogHistorial() {
    const curr = new Date();
    const [acciones, setAcciones] = useState([]);
    const [query, setquery] = useState("");
    const [selectValue, setSelectValue] = useState('fecha');
    const [selectType, setSelectType] = useState('operativo');

    const [queryTime, setqueryTime] = useState("1970-01-01");
    const [queryTime2, setqueryTime2] = useState(curr.toISOString().slice(0, 10));

      // Pagination
      const [paginated, setPaginated] = useState(1);
      const [currentPage, setCurrentPage] = useState(1)
      
      const numberArt = 10;
      const pageCount = Math.ceil(acciones.length / numberArt);
      const pages = _.range(1, pageCount + 1);

      const [show, setShow] = useState(false);
      const [show2, setShow2] = useState(true);

      useEffect(() => {
        const getActionsF = async () => {
            const getActionsApi = await getActions();
            setAcciones(getActionsApi);
        }
        getActionsF();
    }, [])

    const filterAcciones = acciones.slice(0, acciones.length).filter((accion) => {
        if (selectValue === 'fecha') {
            return (queryTime <= accion.fecha && queryTime2 >= accion.fecha);
        }
        else if (selectValue === 'nom') {
            return accion.correoUsuarioCambio.match(query);
        } else if (selectValue === 'tabla') {
            return accion.coleccion.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'tipousu') {
            return accion.tipoUsuario.toLowerCase().match(query.toLowerCase());
        }
        return '';
    });

    function visualizarAccion(datos) {
        console.log(JSON.stringify(datos.descripcion))
        Swal.fire({
            title: 'Consultar los datos',
            showCloseButton: true,
            width: window.innerWidth < 1200 ? '100%' : '60%',
            padding: '0.1em',
            html:
            '<p>' + JSON.stringify(datos.descripcion).replace(/[{}"]/g, '').replace(/,/g, ',\t') + '</p>'            
            ,
        })
    }

  

  return (
    <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Historial de Acciones / Log </h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>
                        <div className='campo-documento'>
                            <div className='row justify-content-center tipo-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Buscar por</label>
                                <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectValue(e.target.value); setquery(""); (e.target.value === 'tipousu' ? setShow(true) : setShow(false)); (e.target.value === 'fecha' ? setShow2(true) : setShow2(false)) }} value={selectValue}>
                                    <option value='fecha'>Fecha</option>
                                    <option value='nom'>Nombre Usuario</option>
                                    <option value='tipousu'>Tipo Usuario</option>
                                    <option value='tabla'>Tipo Tabla</option>
                                </select>
                            </div>

                            <div className='row justify-content-center num-id'>
                                <label className='col-xl-12 col-md-5 lbl-registro-usuario' htmlFor='numero-id'>Ingrese el dato a buscar:</label>
                                <div className='my-md-1'>
                                    {!show && !show2 &&
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
                                       
                                        {show2 &&
                                    <div>
                                        <input
                                            type="date"
                                            className="col-md-2 col-8 mx-md-4 my-md-0 my-2"
                                            onChange={e => {setqueryTime(e.target.value) }}
                                        ></input>
                                        <input
                                            type="date"
                                            className="col-md-2 col-8 mx-3"
                                            onChange={e => { setqueryTime2(e.target.value) }}
                                        ></input>
                                    </div>
                                }
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                    </form>

                    <div className='row table-responsive' style={{ overflowX: 'auto' }}>
                        <table className='col-12 table table-hover' >
                            <thead>
                                <tr>
                                    <th>Correo Usuario</th>
                                    <th>Tipo usuario</th>
                                    <th>Colección</th>
                                    <th>Cambio</th>
                                    <th>Fecha</th>
                                    <th>Ver detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterAcciones?.slice((paginated - 1) * numberArt, (paginated) * numberArt).map((datos, index) => (
                                    <tr key={index}>
                                        <td>{datos.correoUsuarioCambio}</td>
                                        <td>{datos.tipoUsuario}</td>
                                        <td>{datos.coleccion}</td>
                                        <td>{datos.cambio}</td>
                                        <td>{datos.fecha}</td>
                                        <td>
                                        <div style={{ display: 'inline' }} className="deleteBtn " onClick={() => { visualizarAccion(datos) }}><i className="fa-regular fa-eye fa-xl"></i></div>
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
