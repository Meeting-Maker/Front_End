import React, {useEffect, useState} from 'react';
import CandidateMeeting from "./CandidateMeeting";
import {deleteCandidateMeeting} from "../services/CandidateMeeting";
import Button from "./Button";
import {redirect} from "../services/Redirect";
import Dropdown from './Dropdown';
import {createComments} from "../services/Comment";

const CandidateMeetingList = ({
                                 currentGuest,
                                 selectedUser,
                                 candidateMeetings,
                                 updateCandidateMeetings,
                                 selectedCandidate,
                                 onSelectCandidate,
                                 onCandidateMeetingClick,
                                 title,
                                 formMessage,
                                 votingPage,
                                 meetingID,
                                 setComments
                              }) => {
      //todo: convert to unique id from database

      //dropdown variables
      const dropdownOptions = [
         {
            label: 'Dates',
            value: 'dateAscending',
            order: 'ascending'
         },
         {
            label: 'Dates',
            value: 'dateDescending',
            order: 'descending'
         },
         {
            label: 'Votes',
            value: 'votesAscending',
            order: 'ascending'
         },
         {
            label: 'Votes',
            value: 'votesDescending',
            order: 'descending'
         },
      ];
      const [dropdownSelection, setDropdownSelection] = useState(dropdownOptions[0]);

      useEffect(() => {
      }, [dropdownSelection])

      useEffect(
         () => {
            if (votingPage) sort(candidateMeetings, dropdownSelection.value);
         }, [candidateMeetings, dropdownSelection, setDropdownSelection]
      );

      const displayDeleteMessage = () => {
         createComments({
            meetingID: meetingID,
            name: 'System',
            userID: 1,
            content: `A candidateMeeting has been deleted by a user ${currentGuest.name}`
         }).then(response => {
            setComments(old => [...old, response.data]);
         });
      }

      const onDeleteCandidateMeeting = (candidateID) => {
         deleteCandidateMeeting(candidateID)
            .then((response) => {
               updateCandidateMeetings();
               displayDeleteMessage();
            });
      };

      if (candidateMeetings.length === 0) {
         return (
            <div className={"ui card centered grey"} style={{overflow: "hidden", width: "30rem"}}>
               <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
                  No Candidate Meetings Exist
               </div>
               <div style={{textAlign: "center"}}>{formMessage}</div>
            </div>
         );
      }

      const onEditClick = () => {
         redirect('/edit', [{key: 'edit', value: 1}, {key: 'meetingID', value: meetingID}]);
      };

      const isEditPage = () => {
         return window.location.href.includes('edit?edit=1');
      };

//todo: render with nice date formats
      const renderedList = candidateMeetings.map((candidateMeeting) => {

         return (
            //sets unique key by concatenating info from candidateMeeting

            <CandidateMeeting
               currentGuest={currentGuest}
               selectedUser={selectedUser}
               candidateMeeting={candidateMeeting}
               key={candidateMeeting.candidateID}
               selectedCandidate={selectedCandidate}
               onSelectCandidate={onSelectCandidate}
               onDeleteCandidateMeeting={onDeleteCandidateMeeting}
               onCandidateMeetingClick={onCandidateMeetingClick}
               votingPage={votingPage}
            />
         );
      });


      return (
         <div
            className={"ui card centered"}
            style={{overflow: "hidden", width: "30rem"}}
         >
            <div className={"ui medium header"} style={{margin: "0.5em 0 0 0", textAlign: "center"}}>
               {title}

            </div>
            <div style={{padding: "0.5rem 1.313rem 0 0"}}>
               {votingPage
                  ?
                  <span style={{float: 'right'}}>
                     <Dropdown
                        dropdownOptions={dropdownOptions}
                        dropdownSelection={dropdownSelection}
                        setDropdownSelection={setDropdownSelection}
                        width={"10%"}
                     />
                  </span>
                  : null}
            </div>


            <div style={{textAlign: "center"}}>{formMessage}</div>
            <div className={"ui list"} style={{overflow: "", marginBottom: '0'}}>
               {renderedList}
            </div>
            {(!votingPage && candidateMeetings.length >= 2)
               ? <Button className={"custom-button dark thin span"}
                         form={'createCandidateMeetingsForm'}>
                  {isEditPage()
                     ? <span>Update Candidate Meetings</span>
                     : <span>Create Meeting</span>
                  }
               </Button>
               : null
            }
            {
               votingPage
                  ? <Button
                     className="custom-button dark"
                     onClick={onEditClick}>
                     Edit Candidate Meetings
                  </Button>
                  : null
            }

         </div>
      );
   }
;

const sort = (candidateMeetings, option) => {

   console.log("Before Sort: ", candidateMeetings, "OPTION: ", option);

   switch (option) {
      case "dateAscending":
         candidateMeetings.sort(function (a, b) {
            return new Date(b.start) - new Date(a.start);
         })
         break;
      case "dateDescending":
         candidateMeetings.sort(function (a, b) {
            return new Date(a.start) - new Date(b.start);
         })
         break;
      case "votesAscending":
         candidateMeetings.sort(function (a, b) {
            return b.voters.length - a.voters.length;
         })
         break;
      case "votesDescending":
         candidateMeetings.sort(function (a, b) {
            return a.voters.length - b.voters.length;
         })
         break;
   }
   console.log("After Sort: ", candidateMeetings);
};

export default CandidateMeetingList;
