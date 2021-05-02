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
import CommentList from './CommentList'


const App = () => {
    const [currentUser, setCurrentUser] = useState({userID: null});
    const [meetingDetails, setMeetingDetails] = useState({userName: '', meetingName: '', pollType: 0});
    const [candidateMeetings, setCandidateMeetings] = useState([]);

    const item = [{
        id: 1,
        name: 'mingasdsaasdsadaaasdassdsasd',
        content: 'comment contenasdassasddddddddddddddddddddddddddddddddddddsssssssssssssssssssssssssssssssssssssssssssssssssst',
        date: "3:15PM - 8/28/20"
    }, {
        id: 2,
        name: "stephen",
        content: 'comment contenasdassasddddddddddddddddddddddddddddddddddddsssssssssssssssssssssssssssssssssssssssssssssssssst',
        date: "3:15PM - 8/28/20"
    }];


    return (
        <div>
            <div className={"ui container"}>
                <CommentList comments={item}/>
            </div>
            {/*<Header />*/}
            {/*<Route path='/'> <LandingPage/> </Route>*/}
            {/*<Route path='/login'> <Login/> </Route>*/}
            {/*<Route path='/register'> <Register/> </Route>*/}
            {/*<Route path='/create'>*/}
            {/*   <CreateMeeting*/}
            {/*      currentUser={currentUser}*/}
            {/*      setCurrentUser={setCurrentUser}*/}
            {/*      meetingDetails={meetingDetails}*/}
            {/*      setMeetingDetails={setMeetingDetails}*/}
            {/*      candidateMeetings={candidateMeetings}*/}
            {/*      setCandidateMeetings={setCandidateMeetings}*/}
            {/*   />*/}
            {/*</Route>*/}
            {/*<Route path='/join'> <JoinMeeting/> </Route>*/}
            {/*<Route path='/meeting'>*/}
            {/*   <Meeting*/}
            {/*      currentUser={currentUser}*/}
            {/*      setCurrentUser={setCurrentUser}*/}
            {/*      meetingDetails={meetingDetails}*/}
            {/*      setMeetingDetails={setMeetingDetails}*/}
            {/*      candidateMeetings={candidateMeetings}*/}
            {/*      setCandidateMeetings={setCandidateMeetings}*/}
            {/*   />*/}
            {/*</Route>*/}
            {/*<Footer/>*/}
        </div>
    );

};

export default App;