import { useState } from 'react';
import '../assets/css/ingresarUsuario.css';
import { getRecuperador } from '../api/Recuperador';
import { createDotacion, getDotacion, updateDotacion } from '../api/Dotacion';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import MyContext from './context';
import { useContext } from 'react';



export default function Dotacion() {
    const { setUsuarioGlobal } = useContext(MyContext);

    const [tipoDocumento, setTipoDocumento] = useState("");
    const [documento, setDocumento] = useState("");
    // atributos 
    const [chaleco, setChaleco] = useState("");
    const [carnet, setCarnet] = useState("");
    const [cantidadChaleco, setCantidadChaleco] = useState(0);
    const [cantidadCarnet, setCantidadCarnet] = useState(0);
    const [fechaChaleco, setFechaChaleco] = useState([]);
    const [fechaCarnet, setFechaCarnet] = useState([]);


    // Contador para solo subir una vez la cant del carnet
    const [contUpChaleco, setContUpChaleco] = useState(0);
    const [contUpCarnet, setContUpCarnet] = useState(0);

    const [show, toggleShow] = useState(false);
    // variable para saber si ya se ha encontrado, o debe ser creada
    const [find, setFind] = useState(false);
    const [recuperador, setRecuperador] = useState({});
    const [informacion, setInformacion] = useState({ carnet: 'no', chaleco: 'no', cantidad: 0, fecha: "" });

    const verficarRecuperador = async (id) => {
        const recuperadorCollectionRef = collection(db, "recuperadores");
        const q = query(recuperadorCollectionRef, where("documento", "==", id), where("tipo_doc", "==", tipoDocumento));
        const querySnapshot = await getDocs(q);
        const temporal = querySnapshot.docs.map((doc) => {
            return (doc.id)
        });
        return temporal;
    }

    const verficarDotacion = async (id) => {
        const dotacionCollectionRef = collection(db, "dotaciones");
        const q = query(dotacionCollectionRef, where("documento", "==", id), where("tipo_doc", "==", tipoDocumento));
        const querySnapshot = await getDocs(q);
        const temporal = querySnapshot.docs.map((doc) => {
            return (doc.id)
        });
        return temporal;
    }



    const callback = async (id) => {
        if (id === "") {
            toggleShow(false);
            Swal.fire({
                icon: 'error',
                title: 'Ingrese documento',
                text: '¡No ha ingresado un documento!'
            });
        } else if (tipoDocumento === '') {
            Swal.fire({
                icon: 'error',
                title: 'Complete los campos'
            });
        } else {
            const valor = verficarRecuperador(id);
            const dota = verficarDotacion(id);
            valor.then((data) => {
                getRecuperador(data[0]).then((dat) => { setRecuperador({ ...dat, id: data[0] }); })
                if (data.length >= 1) {
                    dota.then((info) => {
                        if (info.length >= 1) {
                            getDotacion(info[0]).then((inf) => {
                                setInformacion({ ...inf, id: info[0] });
                                setFind(true);
                                if (inf.carnet === 'si') {
                                    setCarnet('si')
                                } else {
                                    setCarnet('no');
                                }
                                if (inf.chaleco === 'si') {
                                    setChaleco('si');
                                } else {
                                    setChaleco('no');
                                }
                                if (inf.cantidadChaleco > 0) {
                                    setCantidadChaleco(inf.cantidadChaleco);
                                } else {
                                    setCantidadChaleco(0);
                                }

                                if (inf.cantidadCarnet > 0) {
                                    setCantidadCarnet(inf.cantidadCarnet);
                                } else {
                                    setCantidadCarnet(0);
                                }


                                if (inf.fechaChaleco !== "") {
                                    setFechaChaleco(inf.fechaChaleco);
                                } else {
                                    setFechaChaleco([]);
                                }
                                if (inf.fechaCarnet !== "") {
                                    setFechaCarnet(inf.fechaCarnet);
                                } else {
                                    setFechaCarnet([]);
                                }

                            });
                        } else {
                            setCantidadCarnet(0);
                            setCantidadChaleco(0);
                            setFechaCarnet([]);
                            setFechaChaleco([]);
                            setCarnet('no');
                            setChaleco('no');
                        }
                    });
                    toggleShow(true);
                } else {
                    toggleShow(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'No encontrado',
                        text: '¡El documento no se encuentra registrado!'
                    });
                }
            });
        }

    }


    const crear = async (finde) => {
        setUsuarioGlobal(prevUsuario => ({
            ...prevUsuario,
            activo: true
          }));

        if (finde) {
            updateDotacion(informacion.id, informacion, chaleco, carnet, cantidadChaleco, cantidadCarnet, fechaChaleco, fechaCarnet);
        } else {
            createDotacion(tipoDocumento, documento, chaleco, carnet, cantidadChaleco, cantidadCarnet, fechaChaleco, fechaCarnet);
        }
    }
    // si no se mueve y es un si inicial, hay que hacer algo
    const handleAdd = (valor) => {
        if (valor === 'carnet') {
            setCarnet("si");
            if (contUpCarnet === 0) {
                setCantidadCarnet(cantidadCarnet + 1);
                setContUpCarnet(1);
                const today = new Date().toLocaleDateString('en-GB');
                const array = [...fechaCarnet];
                array.push(today);
                setFechaCarnet(array);
            }

        } else {
            setChaleco("si");
            if (contUpChaleco === 0) {
                setCantidadChaleco(cantidadChaleco + 1);
                setContUpChaleco(1);
                const today = new Date().toLocaleDateString('en-GB');
                const array = [...fechaChaleco];
                array.push(today);
                setFechaChaleco(array);
            }
        }
    }

    const handledelete = (valor) => {
        if (valor === 'carnet') {
            setCarnet("no");
            if (contUpCarnet > 0) {
                setCantidadCarnet(cantidadCarnet - 1);
                setContUpCarnet(0);
                const newArray = [...fechaCarnet];
                newArray.pop();
                setFechaCarnet(newArray);
            }
        } else {
            setChaleco("no");
            if (contUpChaleco > 0) {
                setCantidadChaleco(cantidadChaleco - 1);
                setContUpChaleco(0);
                const newArray = [...fechaChaleco];
                newArray.pop();
                setFechaChaleco(newArray);
            }

        }
    }

    return (

        //<Container fluid className='contenido-ingresar-usuario'>
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Dotación</h1>
                </div>
            </div>

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>

                        <div className='row mb-md-2 mb-sm-1 mt-md-4 mt-sm-4 justify-content-center'>
                            <div className='col-md-4 col-12'>
                                <label style={{ textAlign: 'left' }} className='col-xl-10 col-md-10 col-sm-12 col-12 my-md-1 my-sm-1 px-0 lbl-general' htmlFor='tipo'>Tipo Documento</label>
                                <div className='col-xl-10 col-md-3 col-sm-6 col-12 my-md-1 my-sm-1 '>
                                    <select className='form-select'  name='tipo-documento' id='tipo' onChange={e => { setTipoDocumento(e.target.value) }}>
                                        <option value='select'>Selecciona...</option>
                                        <option value='cc'>Cedula de ciudadanía</option>
                                        <option value='ce'>Cedula de extranjería</option>
                                        <option value='pas'>Pasaporte</option>
                                        <option value='ti'>Tarjeta de identidad</option>
                                        <option value='rc'>Registro civil</option>
                                    </select>
                                </div>
                            </div>

                            <div className='col-md-4 col-12 '>
                                <label style={{ textAlign: 'left' }} className='col-xl-10 col-md-3 col-sm-12 col-12 my-md-1 my-sm-1 px-0 lbl-general ' htmlFor='numero-id'>Número documento</label>
                                <div className='col-xl-10 col-md-3 col-sm-6 col-12 my-md-1 my-sm-1 '>
                                    <input className='form-control' type='text' id='numero-id' onChange={e => { setDocumento(e.target.value) }} />
                                </div>
                            </div>

                            {/* verificar que el recuperador exista, antes de darle dotacion */}
                            <div className="col-md-2 col-12 py-3 divCedula my-auto">
                                <button type="button" className="botonReporte" onClick={() => { callback(documento) }}>
                                    Verificar
                                </button>
                            </div>
                        </div>

                        {show &&



                            <div>
                                <hr />
                                <div className='row justify-content-center'>

                                    <div className="col-md-4 col-12">
                                        <div className='row'>
                                            <label className=''>N° Documento</label>
                                        </div>
                                        <input type="text" className="formatoInput col-8" defaultValue={recuperador.documento} readOnly></input>
                                    </div>

                                    <div className="col-md-4 col-12 my-md-0 my-3">
                                        <div className='row'>
                                            <label>Nombre</label>
                                        </div>
                                        <input type="text " className="formatoInput col-8" defaultValue={recuperador.nombre_beneficiario} readOnly></input>
                                    </div>

                                </div>

                                <div className='row justify-content-center my-3' style={{ overflowX: 'auto' }}>
                                    <div className='col-4'>
                                        <table className='table table-hover' >
                                            <thead>
                                                <tr>
                                                    <th scope="col"> </th>
                                                    <th scope="col">Entregado</th>
                                                    <th scope="col">Cantidad</th>
                                                    <th scope="col">Fecha</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td >Carnet</td>
                                                    <td style={{ textTransform: 'Capitalize' }}>{carnet}</td>
                                                    <td style={{ textTransform: 'Capitalize' }}>{cantidadCarnet}</td>
                                                    <td style={{ textTransform: 'Capitalize' }}>{fechaCarnet.map((str) => str).join(" ")}</td>
                                                </tr>
                                                <tr>
                                                    <td>Chaleco</td>
                                                    <td style={{ textTransform: 'Capitalize' }}>{chaleco}</td>
                                                    <td style={{ textTransform: 'Capitalize' }}>{cantidadChaleco}</td>
                                                    <td style={{ textTransform: 'Capitalize' }}>{fechaChaleco.map((str) => str).join(" ")}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='row justify-content-center'>
                                    <table className='col-md-2 col-6' >
                                        <tbody>
                                            <tr>
                                                <td >Carnet</td>
                                                <div className='' style={{ display: 'flex' }}>
                                                    {/* Carnet
                                                    aumenta y disminuye en 1 el valor de la cantidad */}
                                                    <div onClick={() => { handleAdd('carnet') }}><i className="fa-solid fa-plus mx-2 "></i></div>
                                                    <div onClick={() => { handledelete('carnet') }}><i class="fa-solid fa-xmark"></i></div>
                                                </div>
                                            </tr>
                                            <tr>
                                                <td>Chaleco</td>
                                                <td>
                                                    {/* Chaleco
                                                    aumenta y disminuye en 1 el valor de la cantidad */}
                                                    <div className='' style={{ display: 'flex' }}>
                                                        <div onClick={() => { handleAdd('chaleco') }}><i className="fa-solid fa-plus mx-2 "></i></div>
                                                        <div onClick={() => { handledelete('chaleco') }}><i class="fa-solid fa-xmark"></i></div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>


                                <div className='botones'>
                                    <input className='enviar btn-ingresar-usuario' type='button' value='Aceptar' onClick={() => { crear(find); }} />
                                </div>
                            </div>
                        }

                    </form>
                </div>
            </div>



        </div>
    )
}
