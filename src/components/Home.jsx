import React from 'react'
import MyContext from './context';
import { useContext, useState } from 'react';
import '../assets/css/ingresarUsuario.css';
import updateBtn from '../assets/imgs/update.png'
import Loading from "./Loading";

export default function Home() {
    const { UsuarioGlobal } = useContext(MyContext);
    const [isLoading, setIsLoading] = useState(false);
    
  return (
            <div className="container-fluid contenido-ingresar-usuario">
                
            <div className='row'>
                <div className='header'>
                    <h1>Bienvenid@ {" "+UsuarioGlobal[0].name}</h1>
                </div>
            </div>
            <div className='row justify-content-center m-5 p-3 rounded border border-success' style={{backgroundColor: 'lightgrey'}}>
            <div className='col-8 text-center'>
                <h3 className='display-1 display-lg-3 fs-4'>Ingresaste como {UsuarioGlobal[0].tipo}. Presiona sobre el botón '≡' ubicado a la izquierda para abrir el menú lateral</h3>
            </div>
            </div>
            {isLoading ?(
                <Loading/>
            ):(null)
            }
           
            </div>
  )
}

