import React, {useState} from 'react';

import Route from '../router/Route';

import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import Login from './Login';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';
import Register from './Register';
import Meeting from './Meeting';
import ProfilePage from './ProfilePage';


const App = () => {
   const [currentUser, setCurrentUser] = useState({userID: null});

   return (
      <div>
         <Header />
         <Route path='/'> <LandingPage currentUser={currentUser}/> </Route>
         <Route path='/login' > <Login currentUser={currentUser}/> </Route>
         <Route path='/register'> <Register currentUser={currentUser}/> </Route>
         <Route path='/create'>
            <CreateMeeting
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
            />
         </Route>
         <Route path='/join'> <JoinMeeting currentUser={currentUser}/> </Route>
         <Route path='/meeting'>
            <Meeting
               currentUser={currentUser}
            />
         </Route>
         <Route path='/profile'><ProfilePage name="stephen" email="email"/></Route>
         <Footer/>
      </div>
   );
};

export default App;
