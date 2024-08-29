import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/css/navbar.css"
import MyContext from './context';
import { useContext } from 'react';
import logOut from '../assets/imgs/logout.png';
import Swal from 'sweetalert2';
import {auth} from '../firebaseConfig';
import { signOut } from 'firebase/auth';


//recordatorios: responsive, aclarar dudas de lo del navigation

export default function Navbar(props) {
  // console.log(props.element)
  
  const { UsuarioGlobal, setUsuarioGlobal, clearLocalStorage} = useContext(MyContext);


  //console.log(props.heightpx);
  const navigate = useNavigate();

  /*  let parentDisplay1=props.display;
   const [parentDisplay, setParentDisplay] = useState('0%'); */

  const [componentWidth, setComponentWidth] = useState('0%');
  const [buttomDisplay, setButtomDisplay] = useState('');
  const [buttomNavbarDisplay, setButtomNavbarDisplay] = useState('none');

  //const [scrollPosition, setScrollPosition] = useState(0);

  /* useEffect(() => {
     if(window.innerWidth<600){
       setComponentWidth('100%');
     }else{
       setComponentWidth('30%');
     }
   }, []); */

  /* useEffect(() => {
    console.log("detecte dipslay");
    parentDisplay1=props.display;
 }, [props.display]);  */

  //window.innerWidth < 600;

  useEffect(() => {
    function handleResize() {
      setButtomDisplay('');
      setComponentWidth('0%');
      setButtomNavbarDisplay('none');

    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /* useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); */
  


  const openNav = () => {
    props.onClick();
    if (componentWidth === '0%') {

      if (window.innerWidth < 800) {
        setComponentWidth('100%')
      } else {
        setComponentWidth('30%')
      }

      setButtomDisplay('none');

      //OPCIONAL, PREGUNTAR!!!
      setTimeout(() => {
        setButtomNavbarDisplay('');
      }, 350);

    }

  };

  const closeNav = () => {
    props.onClick();
    setComponentWidth('0%');
    setButtomDisplay('');
    setButtomNavbarDisplay('none');

  }

  const logout = async () => {
    setUsuarioGlobal(null);
    clearLocalStorage();
    await signOut(auth);
  }

  const ScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const verificar = () => {
    Swal.fire({
      icon: 'warning',
      title: '¿Desea cerrar la sesión?',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor:'#34c374'
    }).then((result)=>{
      if(result.isConfirmed) {
        logout();
        navigate('../');
      } 
    });
  }

  return (
    <>
      <div className="sidebar" style={{ width: componentWidth, height: '100vh',  overflowY: 'auto' }}>
        
        <div className="container-fluid">
          
          <div className="row">
          <div className="col-6"><button style={{ textAlign: 'left', display: buttomNavbarDisplay }} className="LogOutbtn" onClick={() =>{ closeNav(); verificar();}}><img src={logOut} alt='logOut' /></button></div>
            <div className="col-6"><button style={{ textAlign: 'right', display: buttomNavbarDisplay }} className="closebtn" onClick={() => closeNav()}>×</button></div>
          </div>

          <div className="row">
          <div className="col-12 mb-4"><h3 style={{ display: buttomNavbarDisplay }}>{UsuarioGlobal[0].name+" "+ (UsuarioGlobal[0].tipo)}</h3></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/reporteventa'); closeNav(); }}>Reporte de venta</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultarreporte'); closeNav(); }}>Consultar reporte</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/ingresarrecuperador'); closeNav(); }}>Ingresar Recuperador</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultarrecuperador'); closeNav(); }}>Consultar recuperador</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultarindocumentado'); closeNav(); }}>Consultar indocumentados</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/ingresarUsuarioP'); closeNav(); }}>Crear Usuario</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultarUsuario'); closeNav(); }}>Consultar Usuario</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/bancarizado'); closeNav(); }}>Bancarizado</button></div>
          </div>
          <div className="row">
          {UsuarioGlobal[0].tipo==="operativo"? <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/ingresareca'); closeNav(); }}>Ingresar ECA/Bodega</button></div>: null}
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultareca'); closeNav(); }}>Consultar ECA</button></div>
          </div>

          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultarbodega'); closeNav(); }}>Consultar Bodega</button></div>
          </div>

          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/ingresarvehiculo'); closeNav(); }}>Ingresar Vehiculo</button></div>
          </div>

          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultarvehiculo'); closeNav(); }}>Consultar Vehiculo</button></div>
          </div>

          

          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/pqrs'); closeNav(); }}>PQRS</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/consultarpqrs'); closeNav(); }}>Consultar PQRS</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/dotacion'); closeNav(); }}>Dotación</button></div>
          </div>

          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/reporteprefactura'); closeNav(); }}>Reporte de Prefactura</button></div>
          </div>

          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/generarbalance'); closeNav(); }}>Generar balance de masas</button></div>
          </div>

          <div className="row">
            <div className="col-12"><button style={{ display: buttomNavbarDisplay }} onClick={() => { navigate('../app/historialcambios'); closeNav(); }}>Historial de cambios</button></div>
          </div>

          


          {/* <div className="row">
            <div className="col-12"><button onClick={() => navigate('../app/rojo')}>Rojo</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button onClick={() => navigate('../app/azul')}>Azul</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button onClick={() => navigate('../app/verde')}>Verde</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button onClick={() => navigate('../app/naranja')}>Naranja</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button onClick={() => navigate('../app/morado')}>Morado</button></div>
          </div>
          <div className="row">
            <div className="col-12"><button onClick={() => navigate('../app/amarillo')}>Amarillo</button></div>
          </div> */}
        </div>


      </div>

      <button className="openbtn" style={{ display: buttomDisplay }} onClick={() => {openNav(); ScrollTop()}}>☰</button>
    </>
  );



};