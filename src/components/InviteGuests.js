import React from 'react';
import Icon from '@mdi/react';
import { mdiLinkVariant } from '@mdi/js';
import {fetchCurrentMeeting} from "../services/Storage";
import {Toast} from "../ultis/toast";
import Card from "./Card";

const InviteGuests = () => {
   const onIconClick = () => {
      const joinURL = 'https://www.meetingmaker.ca/join?meetingID=' + fetchCurrentMeeting();
      navigator.clipboard.writeText(joinURL);
      Toast('Meeting Link Copied!', 'success');
   };

   return (
     <div onClick={() => onIconClick()}>
        <div
           className="ui container"
           style={{width: "18rem"}}>
           <div className={`ui link fluid card user-card`}>
              <div className="content">
                 <div className={"ui header"}>
                    <Icon
                       style={{marginRight: "5px"}}
                       path={mdiLinkVariant}
                       size={1}/>
                    Invite Guests
                 </div>
              </div>
           </div>
        </div>
     </div>
   );
};

export default InviteGuests;