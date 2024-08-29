import { useEffect, useRef } from 'react';
import { onSnapshot, collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import MyContext from './context';
import { useContext } from 'react';

const FirestoreListener = ({ collectionName }) => {
  const actionCollectionRef = collection(db, "actions");
  const { UsuarioGlobal, setUsuarioGlobal } = useContext(MyContext);
  const isFirstExecution = useRef(true);

  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;


  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      if (isFirstExecution.current) {
        isFirstExecution.current = false;
        return;
      }
      
      console.log("detecte cambios");
      if(UsuarioGlobal.activo){
        querySnapshot.docChanges().forEach((change) => {
          console.log(`Document ${change.type} in ${collectionName}:`, change.doc.id, change.doc.data());
          addDoc(actionCollectionRef, {
            coleccion: collectionName,
            documento: change.doc.id,
            cambio: change.type,
            correoUsuarioCambio: UsuarioGlobal[0].name,
            tipoUsuario: UsuarioGlobal[0].tipo,
            descripcion: change.doc.data(),
            fecha: formattedDate

          });
        });
        setUsuarioGlobal(prevState => ({...prevState,activo: false}));
      }
    });

    return () => {
      unsubscribe();
    };
  }, [collectionName]);

  return null;
};

export default FirestoreListener;
