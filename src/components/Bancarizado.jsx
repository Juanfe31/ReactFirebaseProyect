import { useState } from 'react';
import '../assets/css/ingresarUsuario.css';
//import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';
import { createBancarizado, uploadFileBancarizado } from '../api/Bancarizacion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig';
import { updateBancarizado } from '../api/Recuperador';
import { set } from 'firebase/database';
import MyContext from './context';
import { useContext } from 'react';



export default function Bancarizado() {

    const { setUsuarioGlobal } = useContext(MyContext);
    const [tipo_doc, setTipo_doc] = useState({ valor: "", rojo: "" });
    const [documento, setDocumento] = useState({ valor: "", rojo: "" });
    const [cuenta, setCuenta] = useState({ valor: "", rojo: "" });
    const [cuentaVerify, setCuentaVerify] = useState({ valor: "", rojo: "" });
    const [selectedFile, setSelectedFile] = useState({ valor: "", rojo: "" });
    const [show, setShow] = useState(false);

    const [id, setId] = useState("");
    const [recuperador, setRecuperador] = useState([]);


    const [btnIngresoDisable, setBtnIngresoDisable] = useState(false);

    // class de campos
    const [classCuenta, setClassCuenta] = useState("form-control")
    const [classDocumento, setClassDocumento] = useState("form-control");
    const [classConfCuenta, setClassConfCuenta] = useState("form-control")

    const crearBancarizado = async () => {
        setUsuarioGlobal(prevUsuario => ({
            ...prevUsuario,
            activo: true
        }));
        createBancarizado(id, documento, cuenta);
    }

    const uploadCuentaBancaria = async () => {
        setUsuarioGlobal(prevUsuario => ({
            ...prevUsuario,
            activo: true
        }));
        await updateBancarizado(id, recuperador, cuenta.valor);
    }

    const handleDocumento = (e) => {
        const regex = /^[a-zA-Z0-9]+$/;
        const value = e.target.value;
        if (!regex.test(value) || value.toString().length < 4) {
            setClassDocumento('form-control is-invalid')
        } else {
            setClassDocumento('form-control is-valid')
        }
        setDocumento({ valor: value, rojo: '' })
    }

    const handleCuenta = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length < 10) {
            setClassCuenta('form-control is-invalid')
        } else {
            setClassCuenta('form-control is-valid')
        }
        setCuenta({ valor: value, rojo: '' })
        setCuentaVerify({ valor: cuentaVerify.valor, rojo: '' })
    }

    const handleConfCuenta = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length < 10) {
            setClassConfCuenta('form-control is-invalid')
        } else {
            setClassConfCuenta('form-control is-valid')
        }
        setCuentaVerify({ valor: value, rojo: '' })
        setCuenta({ valor: cuenta.valor, rojo: '' })
    }

    const verificar = () => {

        const inputs = [
            { value: documento.valor, set: setDocumento },
            { value: tipo_doc.valor, set: setTipo_doc },
            { value: cuenta.valor, set: setCuenta },
            { value: cuentaVerify.valor, set: setCuentaVerify },
            { value: selectedFile, set: setSelectedFile }
        ];

        let hasEmptyInputs = false;
        for (const input of inputs) {

            if (input.value === '') {
                input.set({ valor: input.value, rojo: '2px ridge red' });
                hasEmptyInputs = true;
            }
        }
        //console.log(hasEmptyInputs);
        if (cuenta.valor === '') {
            hasEmptyInputs = true;
            setCuenta({ valor: cuenta.valor, rojo: '1px ridge red' });
        }

        if (cuentaVerify.valor === '') {
            hasEmptyInputs = true;
            setCuentaVerify({ valor: cuentaVerify.valor, rojo: '1px ridge red' });
        }

        if (selectedFile.valor === '') {
            hasEmptyInputs = true;
            setSelectedFile({ valor: selectedFile.valor, rojo: '1px ridge red' });
        }

        if (hasEmptyInputs) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Complete los campos',
            });
        } else if (cuenta.valor !== cuentaVerify.valor) {
            setCuenta({ valor: cuenta.valor, rojo: '1px solid red' });
            setCuentaVerify({ valor: cuentaVerify.valor, rojo: '1px solid red' });

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las cuentas no son iguales'
            })
        } else {
            setBtnIngresoDisable(true);
            uploadCuentaBancaria();
            uploadFileBancarizado(selectedFile.valor, documento.valor + "/CertificadoBancario_" + documento.valor);
        }
    }

    const verficarRecuperador = async (id) => {
        const recuperadorCollectionRef = collection(db, "recuperadores");
        const q = query(recuperadorCollectionRef, where("documento", "==", id), where("tipo_doc", "==", tipo_doc.valor));
        const querySnapshot = await getDocs(q);
        const temporal = querySnapshot.docs.map((doc) => {
            return (doc.id)
        });
        return temporal;
    }



    const callback = async (id) => {
        if (id === "") {
            setShow(false);
            Swal.fire({
                icon: 'error',
                title: 'Ingrese documento',
                text: '¡No ha ingresado un documento!'
            });
        } else if (tipo_doc === '') {
            Swal.fire({
                icon: 'error',
                title: 'Complete los campos'
            });
        } else {
            const valor = verficarRecuperador(id);
            // const dota = verficarDotacion(id);
            valor.then((data) => {
                // getRecuperador(data[0]).then((dat) => { setRecuperador({ ...dat, id: data[0] }); })
                if (data.length >= 1) {
                    setShow(true);
                    setId(data[0]);

                } else {
                    setShow(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'No encontrado',
                        text: '¡El documento no se encuentra registrado!'
                    });
                }
            });
        }

    }


    return (
        //<Container fluid className='contenido-ingresar-usuario'>
        <div className="container-fluid contenido-ingresar-usuario">
            <div className='row'>
                <div className='header'>
                    <h1>Bancarizado</h1>
                </div>
            </div>

            {/* Esto es por una pregunta que le hice a Guille de que las pqrs deberian clasificarse */}

            <div className='row'>
                <div className='formulario-ingresar-usuario'>
                    <form action=''>

                        <div className='row mb-md-2 mb-sm-1 mt-md-4 mt-sm-4 justify-content-center'>
                            <div className='col-md-4 col-12 px-0'>
                                <label style={{ textAlign: 'left' }} className='col-xl-10 col-md-10 col-sm-12 col-12 my-md-1 my-sm-1 px-0 lbl-general' htmlFor='tipo'>Tipo Documento</label>
                                <div className='col-xl-10 col-md-6  col-12 my-md-1 my-sm-1 px-0'>
                                    <select className='form-select' name='tipo-documento' id='tipo' style={{ border: tipo_doc.rojo }} onChange={e => { setTipo_doc({ valor: e.target.value, rojo: '' }) }}>
                                        <option value=''>Selecciona...</option>
                                        <option value='cc'>Cedula de ciudadanía</option>
                                        <option value='ce'>Cedula de extranjería</option>
                                        <option value='pas'>Pasaporte</option>
                                        <option value='ti'>Tarjeta de identidad</option>
                                        <option value='rc'>Registro civil</option>
                                    </select>
                                </div>

                            </div>

                            <div className='col-md-4 col-12 px-0'>
                                <label style={{ textAlign: 'left' }} className='col-xl-10 col-md-10 col-sm-12 col-12 my-md-1 my-sm-1 px-0 lbl-general ' htmlFor='numero-id'>Número documento</label>
                                <div className='col-xl-10 col-md-6 col-12 my-md-1 my-sm-1 px-0'>
                                    <input className={classDocumento} type='text' id='numero-id' style={{ border: documento.rojo }} onChange={e => { handleDocumento(e) }} />
                                    <div id="lugar-expedicion" className="invalid-feedback">
                                        No caracteres especiales: .,@?()-
                                    </div>
                                    <div id="lugar-expedicion" className="invalid-feedback">
                                        Min. 4 Caracteres
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-2 col-12 py-3 divCedula my-auto">
                                <button type="button" className="botonReporte" onClick={() => { callback(documento.valor) }}>
                                    Verificar
                                </button>
                            </div>
                        </div>
                        {show &&
                            <div>
                                <div className='row justify-content-center my-4'>
                                    <label className='col-xl-3 col-md-3 col-sm-6 col-12 my-md-2 my-sm-1 px-0 lbl-general' htmlFor='cuenta'>Número cuenta</label>
                                    <div className='col-xl-3 col-md-3 col-sm-6 col-12 my-md-2 my-sm-1 px-0'>
                                        <input className={classCuenta} type='text' id='cuenta' style={{ border: cuenta.rojo }} onChange={e => { handleCuenta(e); }} value={cuenta.valor} />
                                        <div id="cuenta" className="invalid-feedback">
                                            Min. 10 numeros
                                        </div>
                                    </div>
                                </div>

                                <div className='row justify-content-center my-4'>
                                    <label className='col-xl-3 col-md-3 col-sm-6 col-12 my-md-2 my-sm-1 px-0 lbl-general' htmlFor='cuenta-con'>Confirmar Número cuenta</label>
                                    <div className='col-xl-3 col-md-3 col-sm-6 col-12 my-md-2 my-sm-1 px-0'>
                                        <input className={classConfCuenta} type='text' id='cuenta-con' style={{ border: cuentaVerify.rojo }} onChange={e => { handleConfCuenta(e) }} onPaste={e => { e.preventDefault() }} value={cuentaVerify.valor} />
                                        <div id="cuenta-con" className="invalid-feedback">
                                            Min. 10 numeros
                                        </div>
                                    </div>
                                </div>

                                <div className='row justify-content-center my-4'>
                                    <label className='lbl-general col-12' htmlFor="certfificado">Copia del Certificado</label>
                                    <div className='col-md-6 col-12'>
                                        <input className='form-control' type="file" name="" id="cerficado" style={{ border: selectedFile.rojo }} onChange={(e) => { setSelectedFile({ valor: e.target.files[0], rojo: '' }) }} />
                                    </div>
                                </div>

                                <div className='botones'>
                                    {/* <input type="button" value="descargar" onClick={()=>{hola()}} /> */}
                                    <input className='enviar btn-ingresar-usuario' type='button' value='Guardar' onClick={() => { verificar() }} />
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>

        </div>
    )
}
