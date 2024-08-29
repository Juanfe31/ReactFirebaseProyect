import React, { useState, useEffect } from 'react';
import '../assets/css/login.css';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import MyContext from './context';
import {auth} from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { getTipoByEmail, getPermisoByEmail } from '../api/Usuario';
import imgLogo from '../assets/imgs/Logo COCJANT.png'





export default function Login() {
  const { UsuarioGlobal, setUsuarioGlobal, clearLocalStorage} = useContext(MyContext);
  
  useEffect(() => {
    setUsuarioGlobal(null);
  }, []);

 
  
  const navigate = useNavigate();
  const [Usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState("fa-solid fa-eye-slash");
  const [type, setType] = useState("password");


  const consultarTipo = async () => {
    const result = await getTipoByEmail(Usuario);
    return result;
  };

  const consultarPermiso = async () => {
    const result = await getPermisoByEmail(Usuario);
    return result;
  };
  
  /*
  consultarTipo().then(result => {
    console.log(result); // logs the value returned by getTipoByEmail
  }).catch(error => {
    console.error(error); // logs any errors that occur during the Promise chain
  }); */


  const cambiarIconPassword = () => {
    if (icon === "fa-solid fa-eye-slash") {
      setIcon("fa-solid fa-eye");
      setType("text");
    } else {
      setIcon("fa-solid fa-eye-slash");
      setType("password");
    }
  }

  // REVISAR LOS POSIBLES ERRORES DEL METODO
  const login = async() => {
    try {
      await signInWithEmailAndPassword(auth, Usuario, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUsuarioGlobal([{ "name": Usuario, "tipo": await consultarTipo(),"permisos": await consultarPermiso() }])
        setUsuarioGlobal(prevState => ({...prevState, activo: false }))
        navigate('/app'); 
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        if (errorCode === 'auth/user-not-found') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no encontrado'
          });
        }else if(errorCode === 'auth/network-request-failed'){
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error de conexión, conectese a internet'
          });
        }
        
        else {
          console.log(errorCode)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Las credenciales no son correctas'
          });
        }
      });
    } catch (error) {

    }
  }

  return (
    <div className="cuerpo container-fluid ">
      <div>
        
      </div>
      <div className=" row  justify-content-center  ">
        <form className=" col-md-4 col-11  formulario mt-xl-4 mt-2 py-4 px-md-4 px-3">
          <div className='row justify-content-center'>
            <img className='img-fluid col-5' style={{minHeight:'70%'}} src={imgLogo} alt=""  />
          </div>
          {/* <h3>Inicia sesión</h3> */}
          <div className='row my-3'>
            <label className="labl pb-1" htmlFor="username">Correo electrónico</label>
            <div className='username-container'>
              <input className="col-12 form-control" id='username' type="text" placeholder='Ingrese su correo electrónico' onChange={e => { setUsuario(e.target.value) }}></input>
              <i className="fa-solid fa-user" id="user-icon"></i>
            </div>
          </div>

          <div className='row  my-3'>
            <label className="labl pb-1" htmlFor="password">Contraseña</label>
            <div className='password-container'>
              <input className=" form-control  " id='password' type={type} placeholder='Ingrese su clave'  onChange={e => { setPassword(e.target.value) }} />
              <div onClick={() => { cambiarIconPassword() }}>
                <i className={icon} id="eye-icon" ></i>
              </div>
            </div>
          </div>
          <MyContext.Consumer>
            {({ UsuarioGlobal, setUsuarioGlobal }) => (
              <div>
                <button className="btn btncio my-1" type="button" onClick={async () => {login()}}>Ingresar</button>
              </div>
            )}
          </MyContext.Consumer>
        </form>

        
      </div>
      <div className=' mt-5 row fixed-bottom'>
        <Footer/>
      </div>
    </div>

  )

}
