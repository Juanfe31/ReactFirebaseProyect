import { addDoc, collection, deleteDoc, doc, getDocs, getDoc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Swal from 'sweetalert2';

const userCollectionRef = collection(db, "usuarios");

const getUsuarios = async () => {
    try {
        const data = await getDocs(userCollectionRef);
        const usuarios = data.docs.map((doc)=> {
            return (
                { ...doc.data(), id: doc.id }
            )
        })
        return usuarios;
    } catch (error) {
        console.log(error);
    }
};

const getUsuario = async (id) => {
    const usuarioRef = doc(db, "usuarios", id);
    try {
        const usuarioDoc = await getDoc(usuarioRef);
        if (usuarioDoc.exists()) {
            const usuario = (usuarioDoc.data());
            return usuario;
        } else {
            console.log("problemmmas :c");
        }
    } catch (error) {
        console.log(error);
    }
}

const getTipoByEmail = async (email) => {
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("correo", "==", email));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const usuarioDoc = querySnapshot.docs[0];
            const usuario = usuarioDoc.data();
            return usuario.tipo_usuario;
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.log(error);
    }
}

const getPermisoByEmail = async (email) => {
    const usuariosRef = collection(db, "usuarios");
    const q = query(usuariosRef, where("correo", "==", email));
    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const usuarioDoc = querySnapshot.docs[0];
            const usuario = usuarioDoc.data();
            return usuario.permisos;
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.log(error);
    }
}



const createUsuario = async (documento,nombre, correo, tipo_doc, tipo_usuario, permisos) => {
    console.log(permisos)
    try {
      await addDoc(userCollectionRef, {
        documento: documento,
        nombre: nombre,
        correo: correo,
        tipo_doc: tipo_doc,
        tipo_usuario: tipo_usuario,

       
        //Permisos, eliminar 
        permisos:permisos,
      });
      //alerta y limpiar campos
      Swal.fire({
        icon: 'success',
        title: 'Ingreso exitoso',
        text: '¡El usuario ha sido registrado!'
      }).then((result)=>{
        window.location.reload(false);
      });

    } catch (error) {
      console.log(error);
    }
  };

const deleteUsuario = async(id) => {
    const usuarioDoc = doc(db, "usuarios", id);
    try {
        await deleteDoc(usuarioDoc);
    } catch (error) {
        console.log(error);
    }
}

const updateUsuario = async (id , usuario,newdocumento, newnombre,newcorreo, newtipo_doc, newpermiso) => {
    const usuarioDoc = doc(db, "usuarios", id);
    try {
        console.log(usuario)
        console.log(id)
        console.log(newdocumento)


        const newInfo = {
            documento: (newdocumento === undefined ? usuario.documento : newdocumento),
            nombre: (newnombre === undefined ? usuario.nombre : newnombre),
            correo: (newcorreo === undefined ? usuario.correo : newcorreo),
            tipo_doc: (newtipo_doc=== undefined ? usuario.tipo_doc : newtipo_doc),
            permisos: (newpermiso ===undefined? usuario.permisos : newpermiso)
        };
        await updateDoc(usuarioDoc, newInfo);
    } catch (error) {
        console.log(error);
    }
    

}



export {getUsuarios, createUsuario, getUsuario, deleteUsuario, updateUsuario, getTipoByEmail, getPermisoByEmail}
