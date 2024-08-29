import React from 'react';
import { useState, useEffect } from 'react'
import { getPQRSs, createPQRS, getPQRS, deletePQRS, updatePQRS, uploadFilePQRS, uploadPQRS, deleteUploadPQRS} from '../api/Pqrs';
import '../assets/css/ingresarUsuario.css';
import Swal from 'sweetalert2';
import _ from "lodash";
import { FaUpload } from "react-icons/fa";
import { MdFolderDelete } from 'react-icons/md';
import MyContext from './context';
import { useContext } from 'react';

import { getStorage, ref, getDownloadURL, deleteObject } from "firebase/storage";


export default function ConsultarPQRS() {

/*     const storage = getStorage();
    const starsRef = ref(storage, 'DocPqrs/43RrKDeHmQlrfbqHCdQD'); */
    const [image, setImage] = useState("");
    const { setUsuarioGlobal } = useContext(MyContext);

    const [query, setquery] = useState("");
    const [pqrs, setPQRS] = useState([]);
    const [show, setShow] = useState(true);

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const fecha_actual = `${year}-${month}-${day}`;

    // Pagination
    const [paginated, setPaginated] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectValue, setSelectValue] = useState('fecha');
    const numberArt = 20;
    const pageCount = Math.ceil(pqrs.length / numberArt);
    const pages = _.range(1, pageCount + 1);

    const colors = [
        { id: "Urgente", color: '#e95237d9' }, // Replace with your desired colors
        { id: "> 3 dias ", color: '#ff9b9bc4' },
        { id: "> 10 dias ", color: '#fbd6c7c4' },
        { id: "Ingresado", color: '#ffffff' },
        { id: "Resuelto", color: '#85dc85c3' },
    ];


    useEffect(() => {
        const getPQRSF = async () => {
            const getPQRSAPI = await getPQRSs();
            setPQRS(getPQRSAPI);
        }
        getPQRSF();
    }, [])

    function getDifferenceInDays(fechaFinal, fechaInicial) {
        const dateFinal = new Date(fechaFinal);
        const dateInicial = new Date(fechaInicial);
        const differenceInDays = Math.ceil((dateFinal - dateInicial) / (1000 * 60 * 60 * 24));
      
        return differenceInDays;
      }

      function getDifferenceInDaysColor(fechaFinal, fechaInicial) {
        const dateFinal = new Date(fechaFinal);
        const dateInicial = new Date(fechaInicial);
        const differenceInDays = Math.ceil((dateFinal - dateInicial) / (1000 * 60 * 60 * 24));
        let color = 'white';
      
        if (differenceInDays >= 15) {
            color = 'none';
          } else if (differenceInDays >= 10 && differenceInDays < 15) {
            color = 'none';
          } else if (differenceInDays < 10 && differenceInDays > 3) {
            color = '#fbd6c7c4';
          } else if (differenceInDays <= 3 && differenceInDays >= 0) {
            color = '#ff9b9bc4';
          }else{
            color =  '#e95237c9';
          }
      
        return color;
      }
      


    function eliminarPQRS(idPQRS, documentoPQRS) {
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
                deletePQRS(idPQRS);
                Swal.fire(
                    'Borrado!',
                    'La PQRS "' + documentoPQRS + '" se ha borrado del sistema',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                })

            }
        })
    }

     const eliminarUploadPQRS= async (datos) => {
        Swal.fire({
            title: '¿Borrar respuesta de la PQRS? (imagen)',
            text: "No podrás recuperar esta informacíón",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, bórralo'
        }).then( async (result) => {
            if (result.isConfirmed) {
                setUsuarioGlobal(prevUsuario => ({
                    ...prevUsuario,
                    activo: true
                  }));
                await deleteUploadPQRS(datos.id);
                Swal.fire(
                    'Borrado!',
                    'La imagen de la respuesta de la PQRS a nombre de: "' + datos.nombre + '" se ha borrado del sistema',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                })

            }
        })
    }



    function uploadPqrs(datos){
        (async () =>{
        let { value: file } = await Swal.fire({
            title: 'Seleccione una imagen',
            html: 'Sube la captura de pantalla de la respuesta',
            input: 'file',
            showCancelButton: true,
            inputAttributes: {
                'accept': '.png, .jgp',
                'aria-label': 'Sube la captura de pantalla de la respuesta'
            }
        })
            if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    uploadFilePQRS(file, datos.id)
                }
                reader.readAsDataURL(file);
                setUsuarioGlobal(prevUsuario => ({
                    ...prevUsuario,
                    activo: true
                  }));
                await uploadPQRS(datos.id);
                Swal.fire(
                    'Se subio con exito!',
                    'La imagen de la respuesta de la PQRS a nombre de: ' + datos.nombre + ' fue realizada con exito',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            }
    })();
}

  /*   getDownloadURL(starsRef)
    .then((url) => {
      setImage(url);
      console.log("holaaaaaaaaa2")
    })
    .catch((error) => {
        console.log(error)
    });
 */



    async function editarPQRS(datos) {
        Swal.fire({
            title: 'Actualice los datos',
            width: window.innerWidth < 1200 ? '100%' : '60%',
            showCloseButton: true,
            html:
            '<div><label class="swal2-label col-12"> Descripción:</label>' +
            '<textarea id="swal-descripcion" class="col-10" style="border-color: lightgray;">' + datos.descripcion + '</textarea> </div>' +
            '<div> <label class="swal2-label col-md-2"> Origen </label>' +
            '<input id="swal-origenpqrs" class="swal2-input" value="' + datos.origen_pqrs + '"></div>'+
            '<div><label class="swal2-label col-md-2"> Correo </label>' +
            '<input id="swal-correo" class="swal2-input" value="' + datos.correo + '"></div>'+
            '<div><label class="swal2-label col-md-2"> # Documento </label>'+
            '<input id="swal-documento" class="swal2-input" value="' + datos.documento + '"> </div>' +
            '<div> <label class="swal2-label col-md-2"> Tipo Documento </label>' +
            '<input id="swal-tipodoc" class="swal2-input" value="' + datos.tipo_doc + '"> </div>' +
            '<div><label class="swal2-label col-md-2"> Nombre </label>' +
            '<input id="swal-ciudad" class="swal2-input" value="' + datos.cuidad + ' "> </div>' +
            '<div><label class="swal2-label col-md-2"> Dirección </label>' +
            '<input id="swal-direccion" class="swal2-input" value="' + datos.direccion + '"> </div>' +
            '<div><label class="swal2-label col-md-2"> Telefono </label>' +
            '<input id="swal-telefono" class="swal2-input" value="' + datos.telefono + '"></div>'+
            '<div><label class="swal2-label col-md-2"> Nombre </label>' +
            '<input id="swal-nombre" class="swal2-input"value="' + datos.nombre + '"></div>'+
            '<div><label class="swal2-label col-md-2"> Tipo</label>' +
            '<input id="swal-tipopqrs" class="swal2-input" value="' + datos.tipo_pqrs + '"></div>'+
            '<div><label class="swal2-label col-md-2"> Resuelta </label>'+
            '<input id="swal-resuelta" class="swal2-input" readonly value="' + datos.resuelta + '"></div>'+
            '<div><label class="swal2-label col-md-2"> Fecha Inicial </label>'+
            '<input id="swal-fechainicial"  class="swal2-input swal2-select" type="date" value="' + datos.fecha_inicial + '"></div>'+
            '<div><label class="swal2-label col-md-2"> Fecha Final </label>'+
            '<input id="swal-fechafinal"  class="swal2-input swal2-select" type="date" value="' + datos.fecha_final + '"></div>'
        ,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-descripcion').value,
                    document.getElementById('swal-origenpqrs').value,
                    document.getElementById('swal-correo').value,
                    document.getElementById('swal-documento').value,
                    document.getElementById('swal-tipodoc').value,
                    document.getElementById('swal-ciudad').value,
                    document.getElementById('swal-direccion').value,
                    document.getElementById('swal-telefono').value,
                    document.getElementById('swal-nombre').value,
                    document.getElementById('swal-tipopqrs').value,
                    document.getElementById('swal-resuelta').value,
                    document.getElementById('swal-fechainicial').value,
                    document.getElementById('swal-fechafinal').value,                

                ]
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                setUsuarioGlobal(prevUsuario => ({
                    ...prevUsuario,
                    activo: true
                  }));
                await updatePQRS(datos.id, datos, result.value[3], result.value[8], result.value[1], result.value[9], result.value[6], result.value[4], result.value[7],result.value[5], result.value[2], result.value[0], result.value[11], result.value[12] )
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

    function visualizarPQRS(datos) {
        Swal.fire({
            title: 'Consultar los datos',
            showCloseButton: true,
            width: window.innerWidth < 1200 ? '100%' : '60%',
            padding: '0.1em',
            html:
                '<div><label class="swal2-label col-12"> Descripción:</label>' +
                '<textarea id="swal-descripcion" class="col-10" style="border-color: lightgray" readonly>' + datos.descripcion + '</textarea> </div>' +
                '<div> <label class="swal2-label col-md-2"> Origen </label>' +
                '<input id="swal-origenpqrs" class="swal2-input" readonly value="' + datos.origen_pqrs + '"></div>'+
                '<div><label class="swal2-label col-md-2"> Correo </label>' +
                '<input id="swal-correo" class="swal2-input" readonly value="' + datos.correo + '"></div>'+
                '<div><label class="swal2-label col-md-2"> # Documento </label>'+
                '<input id="swal-documento" class="swal2-input" readonly value="' + datos.documento + '"> </div>' +
                '<div> <label class="swal2-label col-md-2"> Tipo Documento </label>' +
                '<input id="swal-tipodoc" class="swal2-input" readonly value="' + datos.tipo_doc + '"> </div>' +
                '<div><label class="swal2-label col-md-2"> Nombre </label>' +
                '<input id="swal-ciudad" class="swal2-input" readonly value="' + datos.cuidad + ' "> </div>' +
                '<div><label class="swal2-label col-md-2"> Dirección </label>' +
                '<input id="swal-direccion" class="swal2-input" readonly value="' + datos.direccion + '"> </div>' +
                '<div><label class="swal2-label col-md-2"> Telefono </label>' +
                '<input id="swal-telefono" class="swal2-input" readonly value="' + datos.telefono + '"></div>'+
                '<div><label class="swal2-label col-md-2"> Nombre </label>' +
                '<input id="swal-nombre" class="swal2-input" readonly value="' + datos.nombre + '"></div>'+
                '<div><label class="swal2-label col-md-2"> Tipo</label>' +
                '<input id="swal-tipopqrs" class="swal2-input" readonly value="' + datos.tipo_pqrs + '"></div>'+
                '<div><label class="swal2-label col-md-2"> Resuelta </label>'+
                '<input id="swal-resuelta" class="swal2-input" readonly value="' + datos.resuelta + '"></div>'+
                '<div><label class="swal2-label col-md-2"> Fecha Inicial </label>'+
                '<input id="swal-fechainicial" class="swal2-input" readonly value="' + datos.fecha_inicial + '"></div>'+
                '<div><label class="swal2-label col-md-2"> Fecha Final </label>'+
                '<input id="swal-fechafinal" class="swal2-input" readonly value="' + datos.fecha_final + '"></div>'
            ,
            focusConfirm: false,
            preConfirm: () => {
            
            }
        }).then((result) => {
            if (result.isConfirmed) {

            }
        })
    }

    function sortUsuariosByTimeDifference(usuarios) {
        const currentDate = new Date();
      
        const compareByTimeDifference = (a, b) => {
          const fechaInicialA = new Date(a.fecha_inicial);
          const fechaFinalA = new Date(a.fecha_final);
          const fechaInicialB = new Date(b.fecha_inicial);
          const fechaFinalB = new Date(b.fecha_final);
          const timeDifferenceA = fechaFinalA - fechaInicialA - (currentDate - fechaInicialA);
          const timeDifferenceB = fechaFinalB - fechaInicialB - (currentDate - fechaInicialB);
      
       
          if (a.resuelta && !b.resuelta) {
            return 1;
          } else if (!a.resuelta && b.resuelta) {
            return -1; 
          } else {
            return timeDifferenceA - timeDifferenceB; 
          }
        };
 
        usuarios.sort(compareByTimeDifference);
        return usuarios;
      }
      


    const filterPQRS = pqrs?.filter((usuario) => {
        if (selectValue === 'cc') {
          return usuario.documento.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'corr') {
          return usuario.correo.match(query);
        } else if (selectValue === 'nom') {
          return usuario.nombre.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'fecha') {
          return sortUsuariosByTimeDifference(pqrs);
        }
        return '';
      })
      
    

    return (
        //<Container fluid className='contenido-ingresar-usuario'>
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                   {/*  <img src={image} alt="Girl in a jacket" width="500" height="600"/>  */}
                    <h1>Consultar PQRS</h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>
                        <div className='campo-documento'>
                            <div className='row justify-content-center tipo-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Buscar por</label>
                                <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectValue(e.target.value); setquery(""); (e.target.value === 'fecha' ? setShow(true) : setShow(false)) }} value={selectValue}>
                                    <option value='fecha'>Fecha</option>
                                    <option value='cc'>Documento</option>
                                    <option value='nom'>Nombre</option>
                                    <option value='corr'>Correo</option>
                                    
                                </select>
                            </div>

                            <div className='row justify-content-center num-id'>
                                    {!show &&
                                        <div>
                                            <label className='col-xl-12 col-md-5 lbl-registro-usuario' htmlFor='numero-id'>Ingrese el dato a buscar:</label>
                                            <div>
                                                <input className='col-xl-4 col-md-6' type='text' id='numero-id' onChange={(e) => setquery(e.target.value)} value={query} />
                                            </div>
                                        </div>
                                    }   
                            </div>
                        </div>
                        <div className='row justify-content-xl-'>
                            Pendientes:
                            {colors.map(({ id, color }) => (
                                <div className='col-md-2 col-12 ' key={id}  >
                                    <div style={{ display: 'inline-block', backgroundColor: color, width: '20px', height: '20px', marginRight: '10px', border: '1px solid black' }} />
                                    <span >{id}</span>
                                </div>

                            ))}
                        </div>
                        <hr></hr>
                    </form>

                    <div className='row table-responsive' style={{ overflowX: 'auto' }}>
                        <table className='col-12 table table-hover' >
                            <thead>
                                <tr>
                                    <th>Dias restantes</th>
                                    <th>FechaInicial</th>
                                    <th>FechaFinal</th>
                                    <th>Tipo</th>
                                    <th>Nombre</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                   {/*  <th>Resuelta</th> */}
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterPQRS?.slice((paginated - 1) * numberArt, (paginated) * numberArt).map((datos, index) => (
                                    
                                    <tr style={{ backgroundColor: !datos.resuelta ? getDifferenceInDaysColor(datos.fecha_final, fecha_actual) : '#85dc85c3' }} key={index}>
                                        <td >{!datos.resuelta?getDifferenceInDays(datos.fecha_final, fecha_actual):'✓'}</td>
                                        <td>{datos.fecha_inicial}</td>
                                        <td>{datos.fecha_final}</td>
                                        <td>{datos.tipo_pqrs}</td>
                                        <td>{datos.nombre}</td>
                                        <td>{datos.telefono}</td>
                                        <td>{datos.correo}</td>
                                       {/*  <td>{datos.resuelta?'Si':'No'}</td> */}
                                        <td >
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { eliminarPQRS(datos.id, datos.documento) }}><i className="fa-solid fa-trash-can fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { editarPQRS(datos) }}><i className="fa-regular fa-pen-to-square fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn " onClick={() => { visualizarPQRS(datos) }}><i className="fa-regular fa-eye fa-xl"></i></div>

                                            
                                                     {!datos.resuelta ? (
                                                    <>
                                                    <div style={{ display: 'inline' }} className="deleteBtn" onClick={() => { uploadPqrs(datos) }}>
                                                    <FaUpload size={"1.6rem"} />
                                                    </div>
                                                    </>
                                                    ) : null}
                                            
                                            
                                            {datos.resuelta ? (
                                                    <>
                                                    <div style={{ display: 'inline' }} className="deleteBtn" onClick={() => { eliminarUploadPQRS(datos) }}>
                                                    <MdFolderDelete size={"1.8rem"} />
                                                    </div>
                                                    </>
                                                    ) : null}

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