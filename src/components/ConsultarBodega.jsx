import React from 'react';
import { useState, useEffect } from 'react';
import '../assets/css/ingresarUsuario.css';
import { getBodegas, deleteBodega, updateBodega } from '../api/Bodega';
import Swal from 'sweetalert2';
import _ from "lodash";
import MyContext from './context';
import { useContext } from 'react';

export default function ConsultarBodega() {


  const { setUsuarioGlobal } = useContext(MyContext);
  const [bodegas, setBodegas] = useState([]);
  const [query, setquery] = useState("");
  const [selectValue, setSelectValue] = useState('cc');

  const [show, setShow] = useState(false);

  // Pagination
  const [paginated, setPaginated] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const numberArt = 10;
  const pageCount = Math.ceil(bodegas.length / numberArt);
  const pages = _.range(1, pageCount + 1);


  const municipios = ["Abejorral", "Abriaquí", "Alejandría", "Amagá", "Amalfi",
    "Andes", "Angelópolis", "Angostura", "Anorí", "Antioquia", "Anzá", "Apartadó", "Arboletes",
    "Argelia", "Armenia", "Barbosa", "Bello", "Belmira", "Betania", "Betulia", "Briceño", "Buriticá",
    "Cáceres", "Caicedo", "Caldas", "Campamento", "Cañasgordas", "Caracolí", "Caramanta", "Carepa",
    "Carolina del Príncipe", "Caucasia", "Chigorodó", "Cisneros", "Ciudad Bolívar", "Cocorná",
    "Concepción", "Concordia", "Copacabana", "Dabeiba", "Donmatías", "Ebéjico", "El Bagre",
    "El Carmen de Viboral", "El Peñol", "El Retiro", "El Santuario", "Entrerríos", "Envigado",
    "Fredonia", "Frontino", "Giraldo", "Girardota", "Gómez Plata", "Granada", "Guadalupe", "Guarne",
    "Guatapé", "Heliconia", "Hispania", "Itagüí", "Ituango", "Jardín", "Jericó", "La Ceja", "La Estrella",
    "La Pintada", "La Unión", "Liborina", "Maceo", "Marinilla", "Medellín", "Montebello", "Murindó",
    "Mutatá", "Nariño", "Nechí", "Necoclí", "Olaya", "Peque", "Pueblorrico", "Puerto Berrío", "Puerto Nare",
    "Puerto Triunfo", "Remedios", "Rionegro", "Sabanalarga", "Sabaneta", "Salgar", "San Andrés de Cuerquia",
    "San Carlos", "San Francisco", "San Jerónimo", "San José de la Montaña", "San Juan de Urabá",
    "San Luis", "San Pedro de los Milagros", "San Pedro de Urabá", "San Rafael", "San Roque", "San Vicente",
    "Santa Bárbara", "Santa Rosa de Osos", "Santo Domingo", "Segovia", "Sonsón", "Sopetrán", "Támesis",
    "Tarazá", "Tarso", "Titiribí", "Toledo", "Turbo", "Uramita", "Urrao", "Valdivia", "Valparaíso", "Vegachí",
    "Venecia", "Vigía del Fuerte", "Yalí", "Yarumal", "Yolombó", "Yondó", "Zaragoza"];

  useEffect(() => {
    const getBodegasF = async () => {
      const getBodegasApi = await getBodegas();
      setBodegas(getBodegasApi);
    }
    getBodegasF();
  }, [])

  function eliminarBodega(idBodega, nombreBodega) {
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
        deleteBodega(idBodega)
        Swal.fire(
          'Borrado!',
          'La Bodega "' + nombreBodega + '" se ha borrado del sistema',
          'success'
        ).then((r) => {
          if (r.isConfirmed) {
            window.location.reload(false);
          }
        });
      }
    })
  }


  function editarEca(idEca, eca, documento, nombre_representante, nombre_eca, municipio, direccion) {
    Swal.fire({
      title: 'Actualizar los datos',
      width: window.innerWidth < 1200 ? '100%' : '70%',
      showCloseButton: true,
      showCancelButton: true,
      reverseButtons: true,
      html:
        '<div><label class="swal2-label col-md-2">Documento Representante </label>' +
        '<input id="swal-inputDocumento" class="swal2-input" value="' + documento + '"> </div>' +
        '<div><label class="swal2-label col-md-2">Representante </label>' +
        '<input id="swal-inputNombre_representante" class="swal2-input" value="' + nombre_representante + '"> </div>' +
        '<div><label class="swal2-label col-md-2">Nombre Eca </label>' +
        '<input id="swal-inputNombre_eca" class="swal2-input" value="' + nombre_eca + '"> </div>' +
        '<div><label class="swal2-label col-md-2">Municipio </label>' +
        '<input id="swal-inputMuni" class="swal2-input" readonly value="' + municipio + '"> </div>' +
        '<div><label class="swal2-label col-md-2">Nuevo Municipio </label>' +
        '<select class="swal2-select swal2-input" name="tipo-user" id="swal-inputMunicipio"><option value="Seleccionar">Seleccionar...</option><option value="Abejorral">Abejorral</option>  <option value="Abriaquí">Abriaquí</option><option value="Alejandría">Alejandría</option><option value="Amagá">Amagá</option><option value="Amalfi">Amalfi</option><option value="Andes">Andes</option><option value="Angelópolis">Angelópolis</option><option value="Angostura">Angostura</option><option value="Anorí">Anorí</option><option value="Antioquia">Antioquia</option><option value="Anzá">Anzá</option><option value="Apartadó">Apartadó</option><option value="Arboletes">Arboletes</option><option value="Argelia">Argelia</option><option value="Armenia">Armenia</option><option value="Barbosa">Barbosa</option><option value="Bello">Bello</option><option value="Belmira">Belmira</option><option value="Betania">Betania</option><option value="Betulia">Betulia</option><option value="Briceño">Briceño</option><option value="Buriticá">Buriticá</option><option value="Cáceres">Cáceres</option><option value="Caicedo">Caicedo</option><option value="Caldas">Caldas</option><option value="Campamento">Campamento</option><option value="Cañasgordas">Cañasgordas</option><option value="Caracolí">Caracolí</option><option value="Caramanta">Caramanta</option><option value="Carepa">Carepa</option><option value="Carolina del Príncipe">Carolina del Príncipe</option><option value="Caucasia">Caucasia</option><option value="Chigorodó">Chigorodó</option><option value="Cisneros">Cisneros</option><option value="Ciudad Bolívar">Ciudad Bolívar</option><option value="Cocorná">Cocorná</option><option value="Concepción">Concepción</option><option value="Concordia">Concordia</option><option value="Copacabana">Copacabana</option><option value="Dabeiba">Dabeiba</option><option value="Donmatías">Donmatías</option><option value="Ebéjico">Ebéjico</option><option value="El Bagre">El Bagre</option><option value="El Carmen de Viboral">El Carmen de Viboral</option><option value="El Peñol">El Peñol</option><option value="El Retiro">El Retiro</option><option value="El Santuario">El Santuario</option>  <option value="Entrerríos">Entrerríos</option><option value="Envigado">Envigado</option><option value="Fredonia">Fredonia</option><option value="Frontino">Frontino</option><option value="Giraldo">Giraldo</option><option value="Girardota">Girardota</option><option value="Gómez Plata">Gómez Plata</option><option value="Granada">Granada</option><option value="Guadalupe">Guadalupe</option><option value="Guarne">Guarne</option><option value="Guatapé">Guatapé</option><option value="Heliconia">Heliconia</option><option value="Hispania">Hispania</option><option value="Itagüí">Itagüí</option><option value="Ituango">Ituango</option><option value="Jardín">Jardín</option><option value="Jericó">Jericó</option><option value="La Ceja">La Ceja</option><option value="La Estrella">La Estrella</option><option value="La Pintada">La Pintada</option><option value="La Unión">La Unión</option><option value="Liborina">Liborina</option><option value="Maceo">Maceo</option><option value="Marinilla">Marinilla</option><option value="Medellín">Medellín</option><option value="Montebello">Montebello</option><option value="Murindó">Murindó</option><option value="Mutatá">Mutatá</option><option value="Nariño">Nariño</option><option value="Nechí">Nechí</option><option value="Necoclí">Necoclí</option><option value="Olaya">Olaya</option><option value="Peque">Peque</option><option value="Pueblorrico">Pueblorrico</option><option value="Puerto Berrío">Puerto Berrío</option><option value="Puerto Nare">Puerto Nare</option><option value="Puerto Triunfo">Puerto Triunfo</option><option value="Remedios">Remedios</option><option value="Rionegro">Rionegro</option><option value="Sabanalarga">Sabanalarga</option><option value="Sabaneta">Sabaneta</option><option value="Salgar">Salgar</option><option value="San Andrés de Cuerquia">San Andrés de Cuerquia</option> <option value="San Carlos">San Carlos</option><option value="San Francisco">San Francisco</option><option value="San Jerónimo">San Jerónimo</option><option value="San José de la Montaña">San José de la Montaña</option><option value="San Juan de Urabá">San Juan de Urabá</option><option value="San Luis">San Luis</option><option value="San Pedro de los Milagros">San Pedro de los Milagros</option><option value="San Pedro de Urabá">San Pedro de Urabá</option><option value="San Rafael">San Rafael</option><option value="San Roque">San Roque</option><option value="San Vicente">San Vicente</option><option value="Santa Bárbara">Santa Bárbara</option><option value="Santa Rosa de Osos">Santa Rosa de Osos</option><option value="Santo Domingo">Santo Domingo</option><option value="Segovia">Segovia</option><option value="Sonsón">Sonsón</option><option value="Sopetrán">Sopetrán</option><option value="Támesis">Támesis</option><option value="Tarazá">Tarazá</option><option value="Tarso">Tarso</option><option value="Titiribí">Titiribí</option><option value="Toledo">Toledo</option><option value="Turbo">Turbo</option><option value="Uramita">Uramita</option><option value="Urrao">Urrao</option><option value="Valdivia">Valdivia</option><option value="Valparaíso">Valparaíso</option><option value="Vegachí">Vegachí</option><option value="Venecia">Venecia</option><option value="Vigía del Fuerte">Vigía del Fuerte</option><option value="Yalí">Yalí</option><option value="Yarumal">Yarumal</option><option value="Yolombó">Yolombó</option><option value="Yondó">Yondó</option><option value="Zaragoza">Zaragoza</option></select > </div > ' +
        '<div><label class="swal2-label col-md-2">Direccion </label>' +
        '<input id="swal-inputDireccion" class="swal2-input" value="' + direccion + '"  > </div>'
      ,
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-inputDocumento').value,
          document.getElementById('swal-inputNombre_representante').value,
          document.getElementById('swal-inputNombre_eca').value,
          document.getElementById('swal-inputMunicipio').value,
          document.getElementById('swal-inputDireccion').value,
        ]


      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newMunicipio = (result.value[3]==="Seleccionar" ? municipio : result.value[3]);
        setUsuarioGlobal(prevUsuario => ({
          ...prevUsuario,
          activo: true
        }));
        updateBodega(idEca, eca, result.value[0], result.value[1], result.value[2], newMunicipio, result.value[4])
        Swal.fire(
          'Actualizado!',
          'La información se ha actualizado correctamente!',
          'success'
        ).then((r) => {
          if (r.isConfirmed) {
            window.location.reload(false);
          }
        });
      }
    })
  }


  const filterBodegas = bodegas?.slice(0, bodegas.length).filter((eca) => {
    if (selectValue === 'cc') {
      return eca.documento.toLowerCase().match(query.toLowerCase());
    }
    else if (selectValue === 'mun') {
      return eca.municipio.toLowerCase().match(query.toLowerCase());
    } else if (selectValue === 'nom') {
      return eca.nombre_bodega.toLowerCase().match(query.toLowerCase());
    }else if (selectValue === 'eca') {
        return eca.nombre_eca.toLowerCase().match(query.toLowerCase());
      }
    return '';
  });



  return (
    <div className="container-fluid contenido-ingresar-usuario">
      <div className='row'>
        <div className='header'>
          <h1>Consultar Bodega</h1>
        </div>
      </div>
      <div className='row'>
        <div className='formulario-ingresar-usuario'>
          <form action=''>
            <div className='campo-documento'>
              <div className='row justify-content-center tipo-id'>
                <label className='col-xl-3 col-md-5 lbl-registro-usuario' htmlFor='tipo'>Buscar por</label>
                <select className='col-xl-3 col-md-6' name='tipo-documento' id='tipo' onChange={(e) => { setquery(""); setSelectValue(e.target.value); (e.target.value === "mun" ? setShow(true) : setShow(false)) }} value={selectValue}>
                  <option value='cc'>Cedula representante</option>
                  <option value='mun'>Municipio</option>
                  <option value='nom'>Nombre Bodega</option>
                  <option value='eca'>Nombre Eca</option>
                </select>
              </div>

              <div className='row justify-content-center num-id'>
                <label className='col-xl-12 col-md-5 col-10 lbl-registro-usuario' htmlFor='numero-id'>Ingrese el dato a buscar</label>
                <div className='my-md-1'>
                  {!show &&
                    <div>
                      <input className='col-xl-4 col-md-6 col-10' id='numero-id' onChange={(e) => setquery(e.target.value)} />
                    </div>}
                  {show &&
                    <div>
                      <select className='col-xl-3 col-md-6' name='municipio' id='numero-id' onChange={(e) => { setquery(e.target.value); }} >
                        {municipios.map((muni, index) => (
                          <option key={index} value={muni} >{muni}</option>
                        ))}
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
                   <th>Eca asociada</th>
                  <th>Cédula</th>
                  <th>Representante legal</th>
                  <th>Nombre Bodega</th>
                  <th>Municipio</th>
                  <th>Dirección</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filterBodegas?.slice((paginated - 1) * numberArt, (paginated) * numberArt).map((datos, index) => (
                  <tr key={index}>
                    <td>{datos.nombre_eca}</td>
                    <td>{datos.documento}</td>
                    <td>{datos.nombre_representante}</td>
                    <td>{datos.nombre_bodega}</td>
                    <td>{datos.municipio}</td>
                    <td>{datos.direccion}</td>
                    <td >
                      <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { eliminarBodega(datos.id, datos.nombre_eca) }}><i className="fa-solid fa-trash-can fa-xl"></i></div>
                      <div style={{ display: 'inline' }} className="deleteBtn mx-1" onClick={() => { editarEca(datos.id, datos, datos.documento, datos.nombre_representante, datos.nombre_eca, datos.municipio, datos.direccion) }}><i className="fa-regular fa-pen-to-square fa-xl"></i></div>
                      
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
