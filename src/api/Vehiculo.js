import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const VehiculoCollectionRef = collection(db, "vehiculos");

const getVehiculos = async () => {
    try {
        const data = await getDocs(VehiculoCollectionRef);
        const vehiculos = data.docs.map((doc)=> {
            return (
                { ...doc.data(), id: doc.id }
            )
        })
        return vehiculos;
    } catch (error) {
        console.log(error);
    }
};



const getVehiculosCapacidad = async (peso) => {
    try {
        const data = await getDocs(VehiculoCollectionRef);
        const vehiculos = data.docs.filter((doc) =>(parseInt(doc.data().capacidadT)>=peso/1000)).map((doc)=> {
            console.log(doc.data().capacidadT)
            return (
                { ...doc.data(), id: doc.id }
            )
        })
        return vehiculos;
    } catch (error) {
        console.log(error);
    }
};

const getVehiculo = async (id) => {
    const vehiculoRef = doc(db, "vehiculos", id);
    try {
        const vehiculoDoc = await getDoc(vehiculoRef);
        if (vehiculoDoc.exists()) {
            const vehiculo = (vehiculoDoc.data());
            return vehiculo;
        } else {
            console.log("problemmmas :c");
        }
    } catch (error) {
        console.log(error);
    }
}

const createVehiculo = async (nombre_eca, tipo_vehiculo, placa, capacidadY, capacidadT, turnos, ejes, marca, fecha_matricula, fecha_entrada) => {
    try {
      await addDoc(VehiculoCollectionRef, {
        nombre_eca: nombre_eca,
        tipo_vehiculo: tipo_vehiculo,
        placa: placa,
        capacidadY: capacidadY,
        capacidadT: capacidadT,
        turnos: turnos,
        ejes:ejes,
        marca: marca,
        fecha_matricula:fecha_matricula,
        fecha_entrada: fecha_entrada

      });
      //alerta y limpiar campos
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: '¡El vehiculo ha sido registrado!'
      }).then((result)=>{
        window.location.reload(false);
      });

    } catch (error) {
      console.log(error);
    }
  };

const deleteVehiculo = async(id) => {
    const vehiculoDoc = doc(db, "vehiculos", id);
    try {
        await deleteDoc(vehiculoDoc);
    } catch (error) {
        console.log(error);
    }
}

//datos.nombre_eca, datos.tipo_vehiculo, datos.placa, datos.capacidadY, datos.capacidadT, datos.turnos, datos.ejes, datos.IdVehiculomarca, datos.fecha_matricula, datos.fecha_entrada
const updateVehiculo = async (id , vehiculo ,newnombre_eca, newtipo_vehiculo, newplaca, newcapacidadY, newcapacidadT, newturnos, newejes, newmarca, newfecha_matricula, newfecha_entrada) => {
    const usuarioDoc = doc(db, "vehiculos", id);
    try {
        console.log('hola')
        const newInfo = {
            nombre_eca: (newnombre_eca === undefined ? vehiculo.nombre_eca :newnombre_eca),
            tipo_vehiculo: (newtipo_vehiculo === undefined ? vehiculo.nombre : newtipo_vehiculo),
            placa: (newplaca === undefined ? vehiculo.placa : newplaca),
            capacidadY: (newcapacidadY === undefined ? vehiculo.capacidadY : newcapacidadY),
            capacidadT: (newcapacidadT === undefined ? vehiculo.capacidadT : newcapacidadT),
            turnos: (newturnos === undefined ? vehiculo.turnos : newturnos),
            ejes: (newejes === undefined ? vehiculo.ejes : newejes),
            marca: (newmarca === undefined ? vehiculo.marca : newmarca),
            fecha_matricula: (newfecha_matricula === undefined ? vehiculo.fecha_matricula : newfecha_matricula),
            fecha_entrada: (newfecha_entrada === undefined ? vehiculo.fecha_entrada : newfecha_entrada)
        };
        await updateDoc(usuarioDoc, newInfo);
    } catch (error) {
        console.log(error);
    }
    

}



export {getVehiculos, createVehiculo, getVehiculo, deleteVehiculo, updateVehiculo,getVehiculosCapacidad}
