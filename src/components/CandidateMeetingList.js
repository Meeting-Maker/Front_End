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
            label: 'Date',
            value: 'dateAscending',
            order: 'ascending'
         },
         {
            label: 'Date',
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


      useEffect(
         () => {

         }, [candidateMeetings, dropdownSelection]
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

      const onEditClick = () => {
         redirect('/edit', [{key: 'edit', value: 1}, {key: 'meetingID', value: meetingID}]);
      };

      const isEditPage = () => {
         return window.location.href.includes('edit?edit=1');
      };

//todo: render with nice date formats
      if (votingPage) sort(candidateMeetings, dropdownSelection.value);

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
            style={{overflow: "hidden", width: "30rem", maxHeight: votingPage ? "100%" : "60%"}}
         >
            <div className={"ui medium header"}
                 style={{margin: "0.5em 0 0 0",
                    padding: "0.5rem 1.313rem 0 1.313rem",
                    textAlign: "center"}}>
               <span style={{display: "inline-block", width: "100%", padding: "0 0 0 8rem" }}> {title}
                  {votingPage
                     ?
                     <span style={{float: 'right', fontSize: ".8em"}}>
                     <Dropdown
                        dropdownOptions={dropdownOptions}
                        dropdownSelection={dropdownSelection}
                        setDropdownSelection={setDropdownSelection}
                        width={"10%"}
                     />
                  </span>
                     : null}
               </span>
               <hr/>
            </div>

            <div style={{textAlign: "center"}}>{formMessage}</div>
            <div className={"ui list"} style={{overflowY: "auto", margin: '0 0 0 0'}}>
               {renderedList}
            </div>
            {(!votingPage && candidateMeetings.length >= 2)
               ? <Button className={"custom-button dark thin span"}
                         form={'createCandidateMeetingsForm'}>
                  {isEditPage()
                     ? <span>Update Options</span>
                     : <span>Create Meeting</span>
                  }
               </Button>
               : null
            }
            {
               votingPage && currentGuest.role === 1
                  ? <Button
                     className="custom-button dark"
                     onClick={onEditClick}>
                     {candidateMeetings.length === 0 ? "Add Options" : "Edit Options"}
                  </Button>
                  : null
            }
         </div>
      );
   };

const sort = (candidateMeetings, option) => {
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
};

export default CandidateMeetingList;
