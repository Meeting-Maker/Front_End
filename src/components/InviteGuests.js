import React from 'react';
import Icon from '@mdi/react';
import { mdiLinkVariant } from '@mdi/js';
import {fetchCurrentMeeting} from "../services/Storage";
import Card from './Card';

const InviteGuests = () => {
   const onIconClick = () => {
      const joinURL = 'https://www.meetingmaker.ca/join?meetingID=' + fetchCurrentMeeting();
      navigator.clipboard.writeText(joinURL);
   };

   return (
     <div>
           <Icon
              path={mdiLinkVariant}
              size={2}
              onClick={() => onIconClick()}
           />
           Invite guests to vote!
     </div>
   );
};

export default InviteGuests;