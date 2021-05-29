import React, {useState, useEffect} from "react";
import {editMeetingDetails, getMeetingDetails, meetingExists} from "../services/Meeting";
import CreateMeetingDetails from "./CreateMeetingDetails";
import CreateCandidateMeetings from "./CreateCandidateMeetings";
import CandidateMeetingList from "./CandidateMeetingList";
import {getCandidateMeetings} from "../services/CandidateMeeting";
import {redirect} from "../services/Redirect";

// edit types are:
// 0 - details
// 1 - candidate
const EditMeeting = (currentGuest) => {
   const [edit, setEdit] = useState(null);
   const [meetingID, setMeetingID] = useState();
   const [candidateMeetings, setCandidateMeetings] = useState([]);
   const [meetingDetails, setMeetingDetails] = useState(null);

   useEffect(
      () => {

      }, [candidateMeetings]
   );

   useEffect(
      () => {
         processParams()
      }, []
   );

   useEffect(
      () => {
         if(!meetingID) return;
         if(edit === 0){
            getMeetingDetails(meetingID).then(response => {
               setMeetingDetails(response.data.meetingDetails);
            });
         }else if (edit === 1){
            refresh();
         }
      }, [edit, meetingID]
   );

   function updateCandidateMeetings(){
      getCandidateMeetings(meetingID)
         .then(response => {
               setCandidateMeetings(response.data.candidateMeetings);
            }
         );
   }

   const refresh = () => {
      if(meetingID !== '') {
         updateCandidateMeetings();
         setTimeout(refresh, 5000);
      }
   };

   const processParams = async () => {
      //todo: increase browser support by changing searchParams function
      const editFromParams = (parseInt(new URLSearchParams(window.location.search).get('edit')));
      const meetingIDFromParams = new URLSearchParams(window.location.search).get('meetingID');

      setEdit(editFromParams);

      console.log('init', meetingIDFromParams);

      if (!meetingIDFromParams) {
         redirect('/');

         const navEvent = new PopStateEvent('popstate');
         window.dispatchEvent(navEvent);
         return;
      } else if (meetingIDFromParams.length !== 6 || !(editFromParams === 0 || editFromParams === 1)) {
         redirect('/join', [{key: 'meetingID', value: meetingIDFromParams}]);
         return;
      }

      await meetingExists(meetingIDFromParams).then(
         response => {
            if (response.data.meetingExists) {
               setMeetingID(meetingIDFromParams);
            } else {
               redirect('/join', [{key: 'meetingID', value: meetingIDFromParams}]);
            }
         }
      );
   };

   //todo: convert CreateMeeting button in CreateCandidateMeetings component to Link,
   //remove window.history.pushState here
   const onSubmitEdit = async (change) => {
      console.error('md: ', meetingID);
      console.error('change: ', change);
      if(edit === 0){
         await editMeetingDetails({
            meetingID: meetingID,
            title: change.title,
            description: change.description,
            dueDate: change.dueDate
         }).then(
            () => {
               redirect('/join', [{key: 'meetingID', value: meetingID}]);
            }
         );
      }else if(edit === 1){

      }
   };

   if(edit === 0 && meetingID){
      return (
         <CreateMeetingDetails
            meetingDetails={meetingDetails}
            currentGuest={currentGuest}
            onUpdateGuest={() => {}}
            meetingID={meetingID}
            onCreateMeeting={onSubmitEdit}
         />
      );
   }else if(edit === 1 && meetingID) {
      return (
         <div>
            <CreateCandidateMeetings
               meetingID={meetingID}
               candidateMeetings={candidateMeetings}
               setCandidateMeetings={setCandidateMeetings}
               onCreateMeeting={onSubmitEdit}
            />
            <CandidateMeetingList
               currentGuest={currentGuest}
               title={"Your Options"}
               formMessage={"At least 2 are needed!"}
               candidateMeetings={candidateMeetings}
               updateCandidateMeetings={updateCandidateMeetings}
               onCandidateMeetingClick={() => {}}
            />
         </div>
      );
   }else return null;
}

export default EditMeeting;