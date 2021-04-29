import React, {useEffect} from 'react';
import Route from './Route';
import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import Login from './Login';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';
import Register from './Register';
import api from '../services/api';

const App = () => {

   const test = async () => {
      try {
         const result = await api.post('createGuestMeeting',{
               name: 'from front_end',
               meetingID: "abc987",
               title: 'title from front_end',
               description: 'description from front_end',
               pollType: 1
            });
         console.log(result.data);
      } catch (err) {
         console.log('error', err);
      }
   }

   useEffect(() => {
      test();
   }, []);

   return (
      <div>
         <Header />
         <Route path='/'>
            <LandingPage/>
         < /Route>
         <Route path='/login'>
            < Login/>
         < /Route>
         <Route path='/register'>
            < Register/>
         < /Route>
         <Route path='/create-meeting'>
            < CreateMeeting/>
         < /Route>
         <Route path='/join-meeting'>
            < JoinMeeting/>
         < /Route>
         <Footer/>
      </div>
   );

};

export default App;