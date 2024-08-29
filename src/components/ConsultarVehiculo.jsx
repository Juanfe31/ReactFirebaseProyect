import React from 'react';
import { useState, useEffect } from 'react'
import {getVehiculos, updateVehiculo, deleteVehiculo} from '../api/Vehiculo';
import '../assets/css/ingresarUsuario.css';
import Swal from 'sweetalert2';
import _ from "lodash";
import MyContext from './context';
import { useContext } from 'react';


//import Container from 'react-bootstrap/Container';


export default function ConsultarVehiculo() {

    const { setUsuarioGlobal } = useContext(MyContext);

    const [query, setquery] = useState("");
    const [vehiculos, setUsuarios] = useState([]);

    const [show, setShow] = useState(false);

    // Pagination
    const [paginated, setPaginated] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectValue, setSelectValue] = useState('plac');
    const [selectType, setSelectType] = useState('1');
    const numberArt = 20;
    const pageCount = Math.ceil(vehiculos.length / numberArt);
    const pages = _.range(1, pageCount + 1);


    useEffect(() => {
        const getVehiculosF = async () => {
            const getVehiculosAPI = await getVehiculos();
            setUsuarios(getVehiculosAPI);
        }
        getVehiculosF();
    }, [])

    function eliminarVehiculo(IdVehiculo, PlacaVehiculo) {
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
                deleteVehiculo(IdVehiculo);
                Swal.fire(
                    'Borrado!',
                    'El vehiculo con placa"' + PlacaVehiculo + '" se ha borrado del sistema',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                })

            }
        })
    }

    //datos.nombre_eca, datos.tipo_vehiculo, datos.placa, datos.capacidadY, datos.capacidadT, datos.turnos, datos.ejes, datos.IdVehiculomarca, datos.fecha_matricula, datos.fecha_entrada
    async function editarVehiculo(id, vehiculo, nombre_eca, tipo_vehiculo, placa, capacidadY, capacidadT, turnos, ejes, marca, fecha_matricula, fecha_entrada) {
        Swal.fire({
            title: 'Actualice los datos',
            width: window.innerWidth < 1200 ? '100%' : '60%',
            showCloseButton: true,
            html:
                '<div><label class="swal2-label">Nombre ECA </label>' +
                '<input id="swal-inputECA" class="swal2-input swal2-select" value="' + nombre_eca + '"/> </div>' +
                '<div><label class="swal2-label">Tipo vehiculo </label>' +
                '<select class="swal2-input swal2-select" id="swal-inputTipo_vehiculo" value="' + tipo_vehiculo + '"> <option value="Seleccionar">Seleccionar...</option><option value="1">vehiculo1</option><option value="2">vehiculo2</option><option value="3">vehiculo3</option><option value="4">vehiculo4</option><option value="5">vehiculo5</option> <option value="6">vehiculo6</option></select > </div > ' +
                '<div> <label class="swal2-label col-md-2"> Placa </label>' +
                '<input id="swal-inputPlaca" class="swal2-input swal2-select" value="' + placa + '"> </div>' +
                '<div> <label class="swal2-label col-md-2"> CapacidadY </label>' +
                '<input id="swal-inputCapacidadY" class="swal2-input swal2-select" value="' + capacidadY + '"> </div>' +
                '<div> <label class="swal2-label col-md-2"> CapacidadT </label>' +
                '<input class="swal2-select swal2-input" id="swal-inputCapacidadT"+ value='+ capacidadT +'> </input> </div > ' +
                '<div><label class="swal2-label col-md-2"> Turnos </label>' +
                '<input id="swal-inputTurnos" class="swal2-input swal2-select" value="' + turnos + ' "> </div>' +
                '<div><label class="swal2-label col-md-2"> Ejes </label>' +
                '<input id="swal-inputEjes" class="swal2-input swal2-select" value="' + ejes + '"> </div>' +
                '<div><label class="swal2-label col-md-2"> Marca </label>' +
                '<input id="swal-inputMarca" class="swal2-input swal2-select" value="' + marca+ '"></div>'+
                '<div><label class="swal2-label col-md-2"> Fecha Matricula </label>' +
                '<input id="swal-inputFechamatricula" class="swal2-input swal2-select" type="date" value="' + fecha_matricula + '"></div>' +
                '<div><label class="swal2-label col-md-2"> Fecha Entrada </label>' +
                '<input id="swal-inputFechaentrada" class="swal2-input swal2-select" type="date" value="' + fecha_entrada + '"></div>'
                
            ,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-inputECA').value,
                    document.getElementById('swal-inputTipo_vehiculo').value,
                    document.getElementById('swal-inputPlaca').value,
                    document.getElementById('swal-inputCapacidadY').value,
                    document.getElementById('swal-inputCapacidadT').value,
                    document.getElementById('swal-inputTurnos').value,
                    document.getElementById('swal-inputEjes').value,
                    document.getElementById('swal-inputMarca').value,
                    document.getElementById('swal-inputFechamatricula').value,
                    document.getElementById('swal-inputFechaentrada').value
                ]
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                /* const newTipoDoc = (result.value[0]==="Seleccionar" ? tipo_doc : result.value[0]);
                const newTipoUsuario = (result.value[2]==="Seleccionar" ? tipo_usuario : result.value[2]); */
                /* nombre_eca, tipo_vehiculo, placa, capacidadY, capacidadT, turnos, ejes, marca, fecha_matricula, fecha_entrada */
                setUsuarioGlobal(prevUsuario => ({
                    ...prevUsuario,
                    activo: true
                  }));
                await updateVehiculo(id,vehiculo, result.value[0], result.value[1], result.value[2], result.value[3], result.value[4], result.value[5],result.value[6], result.value[7], result.value[8], result.value[9] );
                Swal.fire(
                    'Actualizado!',
                    'La información se ha actualizado correctamente!',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            }
        })
    }

    function visualizarVehiculo(id, vehiculo, nombre_eca, tipo_vehiculo, placa, capacidadY, capacidadT, turnos, ejes, marca, fecha_matricula, fecha_entrada) {
        Swal.fire({
            title: 'Consultar los datos',
            showCloseButton: true,
            width: window.innerWidth < 1200 ? '100%' : '60%',
            padding: '0.1em',
            html:
                 '<div><label class="swal2-label">Nombre ECA </label>' +
                '<input id="swal-inputECA" class="swal2-input swal2-select" readonly value="' + nombre_eca + '"/> </div>' +
                '<div><label class="swal2-label">Tipo vehiculo </label>' +
                '<input class="swal2-input swal2-select" id="swal-inputTipo_vehiculo" readonly value="' + tipo_vehiculo + '"> </input > </div > ' +
                '<div> <label class="swal2-label col-md-2"> Placa </label>' +
                '<input id="swal-inputPlaca" class="swal2-input swal2-select" readonly value="' + placa + '"> </div>' +
                '<div> <label class="swal2-label col-md-2"> CapacidadY </label>' +
                '<input id="swal-inputCapacidadY" class="swal2-input swal2-select" readonly value="' + capacidadY + '"> </div>' +
                '<div> <label class="swal2-label col-md-2"> CapacidadT </label>' +
                '<input class="swal2-select swal2-input" id="swal-inputCapacidadT"+ readonly value='+ capacidadT +'> </input> </div > ' +
                '<div><label class="swal2-label col-md-2"> Turnos </label>' +
                '<input id="swal-inputTurnos" class="swal2-input swal2-select" readonly value="' + turnos + ' "> </div>' +
                '<div><label class="swal2-label col-md-2"> Ejes </label>' +
                '<input id="swal-inputEjes" class="swal2-input swal2-select" readonly value="' + ejes + '"> </div>' +
                '<div><label class="swal2-label col-md-2"> Marca </label>' +
                '<input id="swal-inputMarca" class="swal2-input swal2-select" readonly value="' + marca+ '"></div>'+
                '<div><label class="swal2-label col-md-2"> Fecha Matricula </label>' +
                '<input id="swal-inputFechamatricula" type="date" class="swal2-input swal2-select" readonly value="' + fecha_matricula + '"></div>' +
                '<div><label class="swal2-label col-md-2"> Fecha Entrada </label>' +
                '<input id="swal-inputFechaentrada"  type="date" class="swal2-input swal2-select" readonly value="' + fecha_entrada + '"></div>'
            ,
            focusConfirm: false,
            preConfirm: () => {
               
            }
        }).then((result) => {
            if (result.isConfirmed) {

            }
        })
    }


    const filterVehiculos = vehiculos?.slice(0, vehiculos.length).filter((usuario) => {
        if (selectValue === 'plac') {
            return usuario.placa.toLowerCase().match(query.toLowerCase());
        }
        else if (selectValue === 'eca') {
            return usuario.nombre_eca.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'tipo') {
            return usuario.tipo_vehiculo.toLowerCase().match(query.toLowerCase());
        }
        else if (selectValue === 'marca') {
            return usuario.marca.toLowerCase().match(query.toLowerCase());
        }
        return '';
    });

    

    return (
        //<Container fluid className='contenido-ingresar-usuario'>
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Consultar Vehículo</h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>
                        <div className='campo-documento'>
                            <div className='row justify-content-center tipo-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Buscar por</label>
                                <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectValue(e.target.value); setquery(""); (e.target.value === 'tipo' ? setShow(true) : setShow(false)) }} value={selectValue}>
                                    <option value='plac'>Placa</option>
                                    <option value='eca'>ECA</option>
                                    <option value='tipo'>Tipo</option>
                                    <option value='marca'>Marca</option>
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
                                            <option value='1'>Moto?</option>
                                            <option value='2'>Triciclo?</option>
                                            <option value='3'>Bicicleta?</option>
                                            <option value='4'>Bote?</option>
                                            <option value='5'>Carreta</option>
                                            <option value='6'>Camion</option>
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
                                    <th>ECA</th>
                                    <th>Placa</th>
                                    <th>Capacidad (ton)</th>
                                    <th>Tipo Vehiculo</th>
                                    <th>Marca</th>
                                    <th>Ejes</th>
                                    <th>Fecha Entrada</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterVehiculos?.slice((paginated - 1) * numberArt, (paginated) * numberArt).map((datos, index) => (
                                    <tr key={index}>
                                        <td>{datos.nombre_eca}</td>
                                        <td>{datos.placa}</td>
                                        <td>{datos.capacidadT}</td>
                                        <td>
                                        {datos.tipo_vehiculo === '1'? 'car': datos.tipo_vehiculo === '2'?'moto': datos.tipo_vehiculo === '3'? 'vehiculo3': datos.tipo_vehiculo === '4'?'avion':datos.tipo_vehiculo === '5'?'carreta':datos.tipo_vehiculo === '6'?'camion':'otro'}  
                                        
                                        </td>
                                        <td>{datos.marca}</td>
                                        <td>{datos.ejes}</td>
                                        <td>{datos.fecha_entrada}</td>
                                        <td >
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { eliminarVehiculo(datos.id, datos.placa) }}><i className="fa-solid fa-trash-can fa-xl"></i></div>
                                        <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { editarVehiculo(datos.id, datos, datos.nombre_eca, datos.tipo_vehiculo, datos.placa, datos.capacidadY, datos.capacidadT, datos.turnos, datos.ejes,datos.marca, datos.fecha_matricula, datos.fecha_entrada) }}><i className="fa-regular fa-pen-to-square fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn " onClick={() => { visualizarVehiculo(datos.id, datos, datos.nombre_eca, datos.tipo_vehiculo, datos.placa, datos.capacidadY, datos.capacidadT, datos.turnos, datos.ejes,datos.marca, datos.fecha_matricula, datos.fecha_entrada) }}><i className="fa-regular fa-eye fa-xl"></i></div>
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