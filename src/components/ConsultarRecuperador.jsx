import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import _ from "lodash";
import Select from 'react-select'
import { getBodegas } from '../api/Bodega';
import { getNombresEcas } from '../api/Eca';
import { useNavigate } from 'react-router-dom';
import { deleteRecuperador, getRecuperadores } from '../api/Recuperador';
import { TbLetterB, TbLetterD } from 'react-icons/tb';
import Loading from "./Loading";
import MyContext from './context';
import { useContext } from 'react';

export default function ConsultarRecuperador() {

    const [isLoading, setIsLoading] = useState(false);
    
    const { setUsuarioGlobal } = useContext(MyContext);

    const [recuperadores, setRecuperadores] = useState([]);
    const [query, setquery] = useState("");
    const curr = new Date();
    const [queryTime, setqueryTime] = useState("1970-01-01");
    const [queryTime2, setqueryTime2] = useState(curr.toISOString().slice(0, 10));
    const [selectValue, setSelectValue] = useState('cc');
    const [selectType, setSelectType] = useState('operativo');

    const [show, setShow] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);


     const [bodegas, setBodegas] = useState([]);
     const [nombreEcas, setNombreEcas] = useState([]);

  useEffect(() => {

    const fetchBodegas = async () => {
      const TodasLasBodegas = await getBodegas();
      setBodegas(TodasLasBodegas);
    }
    const fetchEcas = async () => {
        const TodasLasEcas = await getNombresEcas();
        setNombreEcas(TodasLasEcas);
    }
    fetchEcas();
    fetchBodegas();
  }, [])

    const opcionesBodega = bodegas.map((bodega) => (
        { ...{ value: bodega.nombre_bodega, label: bodega.nombre_bodega } }

    ))

    const opcionesEca = nombreEcas.map((eca) => (
        { ...{ value: eca[0], label: eca[0] } }

    ))

    // Pagination
    const [paginated, setPaginated] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    const numberArt = 10;
    const pageCount = Math.ceil(recuperadores.length / numberArt);
    const pages = _.range(1, pageCount + 1);

    // navegar
    const navigate = useNavigate();

    const colors = [
        { id: "B D-Ambos", color: '#e95237d9' }, // Replace with your desired colors
        { id: "B-Bancarizado" , color: '#ff9b9bc4' },
        { id: "D-Documentos", color: '#fbd6c7c4' },
        { id: "✓-Completo", color: '#ffffff' },
    ];


    useEffect(() => {
        const getRecuperadoresF = async () => {
            const getRecuperadoresApi = await getRecuperadores();
            setRecuperadores(getRecuperadoresApi);
        }
        getRecuperadoresF();
    }, [])

    function eliminarRecuperador(idRecuperador, nombreRecuperador, documentoRecuperador) {
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
                setUsuarioGlobal(prevUsuario => ({
                    ...prevUsuario,
                    activo: true
                  }));
                deleteRecuperador(idRecuperador);
                Swal.fire(
                    'Borrado!',
                    'El recuperador "' + nombreRecuperador + '" con cedula"' + documentoRecuperador + '"se ha borrado del sistema',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                });
            }
        })
    }

    const determinarColor = (dato) => {
        let color = "none";
        if (dato.bancarizadoPendiente && dato.docsPendientes) {
            return "#e95237c9"
        } else if (dato.bancarizadoPendiente) {
            return "#ff9b9bc4"
        } else if (dato.docsPendientes) {
            return "#fbd6c7b4"
        } else {
            color = "none";
        }
        return color;
    }

    const determinarLetra = (dato) => {
        let color = "none";
        if (dato.bancarizadoPendiente && dato.docsPendientes) {
            return <div><TbLetterB /><TbLetterD /></div>;
        } else if (dato.bancarizadoPendiente) {
            return <TbLetterB />;
        } else if (dato.docsPendientes) {
            return <TbLetterD />;
        } else {
            color = "none";
        }
        return color;
    }

    const filterEcas = recuperadores?.slice(0, recuperadores.length).filter((recuperador) => {
        if (selectValue === 'cc') {
            return recuperador.documento.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'nom') {
            return recuperador.nombre_beneficiario.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'fe') {
            return (queryTime <= recuperador.fecha_registro && queryTime2 >= recuperador.fecha_registro);;
        } else if (selectValue === 'eca') {
            return recuperador.eca.toLowerCase().match(query.toLowerCase());
        }else if (selectValue === 'bodeg') {
            return recuperador.bodega.toLowerCase().match(query.toLowerCase());
        }  else if (selectValue === 'comun') {
            return recuperador.nombre_beneficiario.toLowerCase().match(query.toLowerCase());
        } else if (selectValue === 'banca') {
            if (query === "true") {
                return recuperador.bancarizadoPendiente === true;
            } else {
                return recuperador.bancarizadoPendiente === false;
            }
        }
        return '';
    });


    //Prueba exportar en formato CSV la info de los recuperadores(no funciona el encoding)
    const exportarRecuperadores = async () => {
        setIsLoading(true);
    
        try {
          let info = "DEPARTAMENTO,MUNICIPIO,TIPO DE IDENTIFICACIÓN,# DE IDENTIFICACIÓN,NOMBRE\n"
          recuperadores.forEach(recuperador => {
            info += recuperador.departamento + "," + recuperador.municipio + "," + recuperador.tipo_doc + "," + recuperador.documento + "," + recuperador.nombre_beneficiario + "\n";
          });
          const element = document.createElement('a');
          info = "\ufeff" + info;
          const file = new Blob([info], { type: 'text/plain; charset=utf-8', encoding: "UTF-8" });
          element.charset = 'UTF-8';
          element.href = URL.createObjectURL(file);
          element.download = 'infoRecuperadores.csv';
          document.body.appendChild(element);
          element.click();
          document.body.removeChild(element);
    
        } catch (error) {

        } finally {
          setIsLoading(false);
        }
      };

    return (
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Consultar recuperador</h1>
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
                                    if (e.target.value === "eca") {
                                        setShow(false);
                                        setShow2(true);
                                        setShow3(false);
                                        setShow4(false);
                                        setShow5(false);
                                        setShow6(false);
                                    } else if (e.target.value === "nom" || e.target.value === "cc") {
                                        setShow(true);
                                        setShow2(false);
                                        setShow3(false);
                                        setShow4(false);
                                        setShow5(false);
                                        setShow6(false);
                                    } else if (e.target.value === "fe") {
                                        setShow(false);
                                        setShow2(false);
                                        setShow3(true);
                                        setShow4(false);
                                        setShow5(false);
                                        setShow6(false);
                                    } else if (e.target.value === "banca") {
                                        setShow(false);
                                        setShow2(false);
                                        setShow3(false);
                                        setShow4(true);
                                        setShow5(false);
                                        setShow6(false);
                                        setSelectType("false")
                                    } else if (e.target.value === "bodeg") {
                                        setShow(false);
                                        setShow3(false);
                                        setShow2(false);
                                        setShow4(false);
                                        setShow5(true);
                                        setShow6(false);
                                    } else if (e.target.value === "comun") {
                                        setShow(false);
                                        setShow3(false);
                                        setShow2(false);
                                        setShow4(false);
                                        setShow5(false);
                                        setShow6(true);
                                    }
                                }}>
                                    <option value='cc'>Cedula de ciudadanía</option>
                                    <option value='fe'>Fecha ingreso</option>
                                    <option value='nom'>Nombre</option>
                                    <option value='eca'>ECA</option>
                                    <option value='bodeg'>Bodega</option>
                                    <option value='comun'>Comuna</option>
                                    <option value='banca'>Bancarización</option>
                                </select>
                            </div>

                            <div className='row justify-content-center num-id'>
                                {/* nombre y cc */}
                                {show &&
                                    <div>
                                        <input className='col-xl-4 col-md-6' type='text' id='numero-id' onChange={(e) => setquery(e.target.value)} value={query} />
                                    </div>
                                }
                                {/* eca */}
                                {show2 &&
                                    <div>
                                        <Select type="text" className="col-12 " options={opcionesEca} onChange={(e) => (setquery(e.value))}></Select>
                                    </div>
                                }
                                {/* fecha de ingreso */}
                                {show3 &&
                                    <div>
                                        <label htmlFor="initial-date">Desde</label>
                                        <input
                                            type="date"
                                            className="col-md-2 col-8 mx-md-4 my-md-0 my-2"
                                            id='initial-date'
                                            onChange={e => { setqueryTime(e.target.value) }}
                                        ></input>
                                        <label htmlFor="final-date">Hasta</label>
                                        <input
                                            type="date"
                                            id='final-date'
                                            className="col-md-2 col-8 mx-md-4 my-md-0 my-2"
                                            onChange={e => { setqueryTime2(e.target.value) }}
                                        ></input>
                                    </div>
                                }
                                {/* bancarizado */}
                                {show4 &&
                                    <div>
                                        <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectType(e.target.value); setquery(e.target.value); }} value={selectType}>
                                            <option value="false">Completo</option>
                                            <option value="true">Pendiente</option>
                                        </select>
                                    </div>
                                }
                                {/* bodega */}
                                {show5 &&
                                    <div>
                                        <Select type="text" className="col-12 " options={opcionesBodega} onChange={(e) => (setquery(e.value))}></Select>
                                    </div>
                                }
                                {/* comuna */}
                                {show6 &&
                                    <div>
                                        <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setSelectType(e.target.value); setquery(e.target.value); }} value={selectType}>
                                            <option value="false">Comuna1</option>
                                            <option value="true">Comuna2</option>
                                        </select>
                                    </div>
                                }
                            </div>

                        </div>
                        <div className='row justify-content-xl-center'>
                            Pendientes:
                            {colors.map(({ id, color }) => (
                                <div className='col-md-2 col-12 ' key={id}  >
                                    <div style={{ display: 'inline-block', backgroundColor: color, width: '20px', height: '20px', marginRight: '5px', border: '1px solid black' }} />
                                    <span >{id}</span>
                                </div>

                            ))}
                        </div>
                        <hr></hr>
                    </form>

                    <div className='row table-responsive' style={{ overflowX: 'auto' }}>
                        <table className='col-12 table table-hover' >
                            <thead>
                                <tr >
                                    <th>Pendiente</th>
                                    <th>Cédula</th>
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
                                    <tr style={{ background: determinarColor(datos) }} key={index}>
                                        <td>{(datos.bancarizadoPendiente === true || datos.docsPendientes === true) ? determinarLetra(datos) : '✓'}</td>
                                        <td>{datos.documento}</td>
                                        <td>{datos.nombre_beneficiario}</td>
                                        <td>{datos.bodega}</td>
                                        <td>{datos.fecha_registro}</td>
                                        <td>{datos.municipio}</td>
                                        <td>{datos.telefono}</td>
                                        <td>{datos.direccion}</td>
                                        <td>
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { eliminarRecuperador(datos.id, datos.nombre_beneficiario, datos.documento) }}><i className="fa-solid fa-trash-can fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => {
                                                navigate('../app/modificarrecuperador', {
                                                    state: {
                                                        id: datos.id,
                                                        bodega: datos.bodega,
                                                        documento: datos.documento,
                                                        read: false
                                                    }
                                                });
                                            }}><i className="fa-regular fa-pen-to-square fa-xl"></i></div>
                                            <div style={{ display: 'inline' }} className="deleteBtn " onClick={() => {
                                                navigate('../app/modificarrecuperador', {
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
                <div className='row formulario-ingresar-usuario d-flex justify-content-center'>
                    <div className="col-md-6 col-sm-12 col-12">

                        <button className="enviar btn-ingresar-usuario" type="button" onClick={exportarRecuperadores}>Exportar recuperadores</button>
                        {isLoading ?(
                        <Loading/>
                        ):(null)
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}
