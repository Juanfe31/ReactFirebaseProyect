import * as React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import {Provider} from 'react-router-dom';

import Login from './Login';
import IngresarUsuarioP from './IngresarUsuarioP';
import IngresarReporte from './IngresarReporte';
import IngresarPrefactura from './IngresarPrefactura';
import PQRS from './PQRS';
import ConsultarPQRS from './ConsultarPQRS'
import Plantilla from './Plantilla';
import IngresarECA from './IngresarECA';
import IngresarRecuperador from './IngresarRecuperador';
import Bancarizado from './Bancarizado';
import Dotacion from './Dotacion';
import ConsultarUsuario from './ConsultarUsuario';
import ConsultarReporte from './ConsultarReporte';
import ConsultarECA from './ConsultarECA';
import ConsultarRecuperador from './ConsultarRecuperador';
import ModificarReporte from './ModificarReporte';
import ModificarRecuperador from './ModificarRecuperador';
import ModificarUsuario from './ModificarUsuario';
import Home from './Home';
import LogHistorial from './LogHistorial';
import MyContext from './context';
import useLocalStorage from './useLocalStorage';
import ProtectedRoute from './ProtectedRoute';
import FirestoreListener from './FirestoreListener';
import IngresarVehiculo from './IngresarVehiculo';
import ConsultarVehiculo from './ConsultarVehiculo';
import ConsultarBodega from './ConsultarBodega';
import ConsultarIndocumentado from './ConsultarIndocumentado';
import ModificarIndocumentado from './ModificarIndocumentado';
import GenerarBalance from './GenerarBalance';


export default function App() {

  const [UsuarioGlobal, setUsuarioGlobal, clearLocalStorage] = useLocalStorage( null, null);
  const collectionNames = ["dotaciones", "ecas", "pqrs", "recuperadores", "indocumentados", "reportes", "usuarios", "vehiculos","bodegas"]
  

  return (
    <MyContext.Provider value={{ UsuarioGlobal, setUsuarioGlobal, clearLocalStorage }}>
    
    {collectionNames.map((collectionName) => (
                <FirestoreListener key={collectionName} collectionName={collectionName} />
    ))}
    
    <div className="App">
    <Routes>
    <Route exact path="/" element={<Login/>} />
      <Route path="/app" element={<ProtectedRoute element={<Plantilla elemento={<Home/>}/>}/>}/>
      <Route path="/app/ingresarrecuperador" element={<ProtectedRoute element={<Plantilla elemento={<IngresarRecuperador/>}/>}/>}/>
      <Route path="/app/consultarrecuperador" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarRecuperador/>}/>}/>}/>
      <Route path="/app/ingresarusuarioP" element={<ProtectedRoute element={<Plantilla elemento={<IngresarUsuarioP/>}/>}/>}/>
      <Route path="/app/consultarusuario" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarUsuario/>}/>}/>}/>
      <Route path="/app/pqrs" element={<ProtectedRoute element={<Plantilla elemento={<PQRS/>}/>}/>}/>
      <Route path="/app/consultarpqrs" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarPQRS/>}/>}/>}/>
      <Route path="/app/ingresareca" element={<ProtectedRoute element={<Plantilla elemento={<IngresarECA/>}/>}/>}/>
      <Route path="/app/consultareca" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarECA/>}/>}/>}/>
      <Route path="/app/consultarbodega" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarBodega/>}/>}/>}/>
      <Route path="/app/ingresarvehiculo" element={<ProtectedRoute element={<Plantilla elemento={<IngresarVehiculo/>}/>}/>}/>
      <Route path="/app/consultarvehiculo" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarVehiculo/>}/>}/>}/>
      <Route path="/app/reporteventa" element={<ProtectedRoute element={<Plantilla elemento={<IngresarReporte/>}/>}/>}/>
      <Route path="/app/consultarreporte" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarReporte/>}/>}/>}/>
      <Route path="/app/bancarizado" element={<ProtectedRoute element={<Plantilla elemento={<Bancarizado/>}/>}/>}/>
      <Route path="/app/dotacion" element={<ProtectedRoute element={<Plantilla elemento={<Dotacion/>}/>}/>}/>
      <Route path="/app/reporteprefactura" element={<ProtectedRoute element={<Plantilla elemento={<IngresarPrefactura />}/>}/>}/>
      <Route path="/app/generarbalance" element={<ProtectedRoute element={<Plantilla elemento={<GenerarBalance />}/>}/>}/>
      <Route path="/app/historialcambios" element={<ProtectedRoute element={<Plantilla elemento={<LogHistorial />}/>}/>}/>
      <Route path="/app/modificarreporte" element={<ProtectedRoute element={<Plantilla elemento={<ModificarReporte />}/>}/>}/>
      <Route path="/app/modificarrecuperador" element={<ProtectedRoute element={<Plantilla elemento={<ModificarRecuperador />}/>}/>}/>
      <Route path="/app/modificarusuario" element={<ProtectedRoute element={<Plantilla elemento={<ModificarUsuario />}/>}/>}/>
      <Route path="/app/consultarindocumentado" element={<ProtectedRoute element={<Plantilla elemento={<ConsultarIndocumentado />}/>}/>}/>
      <Route path="/app/modificarindocumentado" element={<ProtectedRoute element={<Plantilla elemento={<ModificarIndocumentado />}/>}/>}/>
    </Routes>

    </div>
    </MyContext.Provider>
    
  );
    }

