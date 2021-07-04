import { useEffect, useState } from 'react';
import './App.css';
import ChatUi from './components/chat-ui/chat-ui.component';
import SignIn from './components/sign-in-component/sign-in-component';
import { auth, createProfileDocument, firestore } from './firebase/firebase.utils';
function App() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true
    let unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        createProfileDocument(userAuth).then(ref => ref.onSnapshot(userSnap => {
          mounted && setUser({
            uid: userSnap.id,
            ...userSnap.data()
          })
        }));
        
        const messagesDbRef = firestore.collection('messages')

        messagesDbRef.orderBy('createdAt', 'asc').limitToLast(35).onSnapshot(messageList => {
          setData(messageList.docs)
        })


      } else {
        mounted && setUser(userAuth)
      }
    })
    

    return () => {
      mounted = false;
      unsubscribe()
    };
  }, [])

  return (
    <div className="App">
      {user && data ? <ChatUi user={user} docs={data}/> : <SignIn /> }
    </div>
  );
}

export default App;
