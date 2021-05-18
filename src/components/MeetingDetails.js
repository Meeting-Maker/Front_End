import Card from './Card';
import Icon from '@mdi/react';
import {mdiCogOutline} from '@mdi/js';
import {useEffect} from "react";
import {redirect} from "../services/Redirect";

const MeetingDetails = ({meetingDetails}) => {

   useEffect(
      () => {
      }, [meetingDetails]
   );

   if (!meetingDetails || !meetingDetails.meetingID || !meetingDetails.title || !meetingDetails.dueDate) {
      return (
         <Card padding="5rem 0 0 0 " width="35rem">
            <div className="ui segment">
               <div className="ui active inverted dimmer">
                  <div className="ui text loader">Loading</div>
               </div>
               <p/>
            </div>
         </Card>
      );
   }

   const [date, time] = meetingDetails.dueDate.split('T');

   const onEditClick = () => {
      redirect('/edit', [{key: 'edit', value: 0}, {key: 'meetingID', value: meetingDetails.meetingID}])
   };

   return (
      <div >

         <div
            className={"ui card centered grey"}
            style={{overflow: "hidden", width: "33rem", paddingBottom: "0.5rem", marginTop: "1rem"}}
         >
            <div className="content" style={{fontSize: "2em", padding: "0.75rem"}}>
            <span style={{fontWeight: "500"}}>
               {meetingDetails.title}
            </span>
               <span style={{color: "grey", fontWeight: "100"}}>
               {' #'}{meetingDetails.meetingID}
            </span>
               <span className="right floated">
               <div onClick={onEditClick} style={{textAlign: "left"}}>
                  <Icon path={mdiCogOutline} size={1.5}/>
               </div>
            </span>
            </div>
            {
               meetingDetails.description
                  ?
                  <div className="content">
                     <p style={{fontWeight: "400", fontSize: "1.2em"}}>{meetingDetails.description}</p>
                  </div>
                  :
                  null
            }
            <div className="extra content">
               <span style={{color: "black"}}>Response Needed by: {date} at {time}</span>
            </div>
         </div>

      </div>



   );
}

export default MeetingDetails;
