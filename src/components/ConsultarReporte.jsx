import { useState, useEffect, useRef } from 'react';
import { deleteReporte, getReportes } from '../api/Reporte';
import { getNombresEcas } from "../api/Eca";
import { getBodegas } from '../api/Bodega';
import Swal from 'sweetalert2';
import _ from "lodash";
import { useNavigate } from "react-router-dom";
// select
import Select from 'react-select'
// icon
import { FaPrint} from "react-icons/fa";
// imprimir
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ConsultarReporte() {
    const curr = new Date();
    const [reportes, setReportes] = useState([]);
    const [queryValue, setquery] = useState("");
    const [selectValue, setSelectValue] = useState('cc');
    const [queryTime, setqueryTime] = useState("1970-01-01");
    const [queryTime2, setqueryTime2] = useState(curr.toISOString().slice(0, 10));
    const [show, setShow] = useState(true);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(true);
    const [show5, setShow5] = useState(false);

    // Pagination
    const [paginated, setPaginated] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const pageCount = Math.ceil(reportes.length / 10);
    const pages = _.range(1, pageCount + 1);

    //imprimir
    const componentPDF = useRef();
    const navigate = useNavigate();

    // select
    const [nombreEcas, setNombreEcas] = useState([]);

    // labels for mobile
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [bodegas, setBodegas] = useState([]);

    useEffect(() => {

        const fetchBodegas = async () => {
            const TodasLasBodegas = await getBodegas();
            setBodegas(TodasLasBodegas);
        }
        fetchBodegas();
    }, [])

    // saber el size de la pantalla
    useEffect(() => {
        // Update windowWidth when the window is resized
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const shouldShowButton = windowWidth > 768; // Adjust the breakpoint as needed

    const opcionesBodega = bodegas.map((bodega) => (
        { ...{ value: bodega.nombre_bodega, label: bodega.nombre_bodega } }

    ))

    const generatePDF = async () => {
        const element = componentPDF.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('print.pdf');
    };

    // trigger imprimir
    const triggerImprimir = async () => {
        await setShow4(false);
        await generatePDF();
        setShow4(true);
    }

    useEffect(() => {
        const getReportesAll = async () => {
            const getReportesApi = await getReportes();
            setReportes(getReportesApi);
        }

        const fetchEcas = async () => {
            const TodasLasEcas = await getNombresEcas();
            setNombreEcas(TodasLasEcas);
        }
        fetchEcas();
        getReportesAll();
    }, []);



    const opcionesEca = nombreEcas.map((eca) => (
        { ...{ value: eca[0], label: eca[0] } }

    ))

    function eliminarReporte(idreporte, nroReporte) {
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
                deleteReporte(idreporte)
                Swal.fire(
                    'Borrado!',
                    'El reporte # "' + nroReporte + '" se ha borrado del sistema',
                    'success'
                ).then((r) => {
                    if (r.isConfirmed) {
                        window.location.reload(false);
                    }
                });
            }
        })
    }



    const filterReportes = reportes?.slice(0, reportes.length).filter((reporte) => {
        if (selectValue === 'cc') {
            return reporte.documento.toLowerCase().match(queryValue.toLowerCase());
        } else if (selectValue === 'fe') {
            return (queryTime <= reporte.fecha && queryTime2 >= reporte.fecha);
        } else if (selectValue === 'eca') {
            return reporte.eca.toLowerCase().match(queryValue.toLowerCase());
        } else if (selectValue === 'bod') {
            return reporte.bodega.toLowerCase().match(queryValue.toLowerCase());
        } else if (selectValue === 'num') {
            return String(reporte.nro_reporte).toLowerCase().match(queryValue.toLowerCase());
        }
        return '';
    });

    return (
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Consultar reportes</h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>
                        <div className='campo-documento'>
                            <div className='row justify-content-center tipo-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Buscar por</label>
                                <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => {
                                    setSelectValue(e.target.value);
                                    setquery("");
                                    if (e.target.value === 'fe') {
                                        setShow(false);
                                        setShow2(true);
                                        setShow3(false);
                                        setShow5(false);
                                    } else if (e.target.value === 'cc' || e.target.value === 'num') {
                                        setShow(true);
                                        setShow2(false);
                                        setShow3(false);
                                        setShow5(false);
                                    } else if (e.target.value === 'eca') {
                                        setShow(false);
                                        setShow2(false);
                                        setShow3(true);
                                        setShow5(false);
                                    } else if (e.target.value === 'bod') {
                                        setShow(false);
                                        setShow2(false);
                                        setShow3(false);
                                        setShow5(true);
                                    }
                                }}
                                    value={selectValue}>
                                    <option value='cc'>Cedula de ciudadanía</option>
                                    <option value='fe'>Fecha</option>
                                    <option value='eca'>ECA</option>
                                    <option value='bod'>Bodega</option>
                                    <option value='num'># reporte</option>
                                </select>
                            </div>

                            <div className='row justify-content-center num-id'>
                                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='numero-id'>Dato a consultar</label>
                                {show &&
                                    <input className='col-xl-3 col-md-6 ml-xl-3' type='text' id='numero-id' onChange={(e) => setquery(e.target.value)} value={queryValue} />
                                }
                                {show2 &&
                                    <div>
                                        <label htmlFor="initial-date">Desde</label>
                                        <input
                                            type="date"
                                            id='initial-date'
                                            className="col-md-2 col-8 mx-md-4 my-md-0 my-2"
                                            onChange={e => { setqueryTime(e.target.value) }}
                                        ></input>
                                        <label htmlFor="final-date">Hasta</label>
                                        <input
                                            type="date"
                                            id='final-date'
                                            className="col-md-2 col-8 mx-3"
                                            onChange={e => { setqueryTime2(e.target.value) }}
                                        ></input>
                                    </div>
                                }
                                {show3 &&
                                    <Select type="text" className="col-12 " options={opcionesEca} onChange={(e) => (setquery(e.value))}></Select>
                                }
                                {show5 &&
                                    <Select type="text" className="col-12 " options={opcionesBodega} onChange={(e) => (setquery(e.value))}></Select>
                                }

                                <div className='col-1 mx-5' hidden={!shouldShowButton } onClick={() => { triggerImprimir(); }}>
                                    <FaPrint size="1.4rem" />
                                </div>
                            </div>

                        </div>

                        <hr></hr>
                    </form>
                    <div className='row table-responsive' style={{ overflowX: 'auto' }}>
                        <div ref={componentPDF}>
                            <table className='col-12 table table-hover' >
                                <thead>
                                    <tr>
                                        <th># reporte</th>
                                        <th># Documento</th>
                                        <th>Nombre recuperador</th>
                                        <th>ECA</th>
                                        <th>Bodega</th>
                                        <th>Fecha</th>
                                        {show4 &&
                                            <th >Acciones</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {filterReportes?.slice((paginated - 1) * 10, (paginated) * 10).map((datos, index) => (
                                        <tr key={index}>
                                            <td>{datos.nro_reporte}</td>
                                            <td>{datos.documento || datos.codigoId}</td>
                                            <td>{datos.nombre}</td>
                                            <td>{datos.eca}</td>
                                            <td>{datos.bodega}</td>
                                            <td>{datos.fecha}</td>
                                            {show4 &&
                                                <td >
                                                    <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { eliminarReporte(datos.id, datos.nro_reporte) }}><i className="fa-solid fa-trash-can fa-xl"></i></div>
                                                    <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => {
                                                        navigate('../app/modificarreporte', {
                                                            state: {
                                                                id: datos.id,
                                                                bodega: datos.bodega,
                                                                documento: datos.documento,
                                                                read: false
                                                            }
                                                        });
                                                    }}><i className="fa-regular fa-pen-to-square fa-xl"></i></div>
                                                    <div style={{ display: 'inline' }} className="deleteBtn " onClick={() => {
                                                        navigate('../app/modificarreporte', {
                                                            state: {
                                                                id: datos.id,
                                                                bodega: datos.bodega,
                                                                documento: datos.documento,
                                                                read: true
                                                            }
                                                        })
                                                    }}><i className="fa-regular fa-eye fa-xl"></i></div>
                                                </td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <nav className='d-flex justify-content-center col-12'>
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
