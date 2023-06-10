import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import {firebaseConfig} from "./firebaseConfig";
import {initializeApp} from "firebase/app";
import {collection, getFirestore, getDocs} from "firebase/firestore/lite";
import styles from './styles';
import SimpleText from './components/SimpleText';

const App2 = () => {

  const classes = styles();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // We use the useState if we want dynamic data and we load only the new value and not the whole component
  const [ok, setOk] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  // It's the good way to do a call API with then and catch
  const loadDataFromDb = () => {
    setLoading(true);
    getDocs(collection(db, "test-data"))
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              setOk(doc.data().ok);
          });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        setOk(false);
      })
      .finally(() => {
        const tm = setTimeout(() => {
          setLoading(false);
        }, 300)
        return () => { clearTimeout(tm) }      
      });
  }

    useEffect(() => {
        loadDataFromDb()
    }, []);
    
  return (
    <div>
      {loading ? <p style={{backgroundColor:"red"}}>Loading...</p> 
               : (ok ? <p>OK</p> : <p>NOT OK</p>)
      }
    </div>
  );
}

export default App2;