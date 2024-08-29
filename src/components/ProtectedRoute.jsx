import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import MyContext from './context';
import Swal from 'sweetalert2';
import { auth } from '../firebaseConfig';

function ProtectedRoute({ element: element}) {
  const { UsuarioGlobal } = useContext(MyContext);
  const user=(auth.currentUser)
  //CUANDO UNO REFRESCA LA PAGINA SE ACABA EL AUTH DE FIREBASE

    if (UsuarioGlobal!== null/*  && user */){
      return element
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Inicia sesión',
        text: 'Ingresa tu usuario y contraseña para acceder',
        confirmButtonText: 'OK',
        confirmButtonColor:'#34c374'
      });
      return <Navigate to="/" />;
    }
}

export default ProtectedRoute;