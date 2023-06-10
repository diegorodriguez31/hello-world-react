import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import {firebaseConfig} from "./firebaseConfig";
import {initializeApp} from "firebase/app";
import {collection, getFirestore, getDocs} from "firebase/firestore/lite";
import styles from './styles';
import SimpleText from './components/SimpleText';

const App = () => {

  const classes = styles();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // We use the useState if we want dynamic data and we load only the new value and not the whole component
  const [ok, setOk] = useState<boolean | undefined>(undefined);

  const [text, setText] = useState<string | undefined | null>(undefined);

  // It's the good way to do a call API with then and catch
  const loadDataFromDb = () => {
    getDocs(collection(db, "test-data"))
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const tm = setTimeout(() => {
              setOk(doc.data().ok);
            }, 1000)
            return () => { clearTimeout(tm) }
          });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
        const tm = setTimeout(() => {
          setOk(false);
        }, 1000)
        return () => { clearTimeout(tm) }
      });
  }

    useEffect(() => {
        loadDataFromDb()
    }, []);
    
    useEffect(() => {
      if (ok !== undefined) {
        if (ok) {
          setText("OK");
        } else {
          setText(null);
        }
      }
  }, [ok]);
  
  return (
    <div>
      {/* {loading ? <p style={{backgroundColor:"red"}}>Loading...</p> 
               : (ok ? <p>OK</p> : <p>NOT OK</p>)
      } */}
      <SimpleText text={text} data-testid={"SimpleText"} />
    </div>
  );
}

export default App;

/*
// ADD ELEMENTS of update
    async function handleAddExercise() {
        try {
            setDoc(doc(db, "users", "1"), {
                first: "Ada2",
                last: "Lovelace",
                born: 1815
            })
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // DELETE FROM DB
    async function handleDeleteExercise() {
        try {
            await deleteDoc(doc(db, "users", "1"))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
*/