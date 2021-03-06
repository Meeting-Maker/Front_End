import React from 'react';
import {mdiHelpCircleOutline} from "@mdi/js";
import Icon from "@mdi/react";
import "../css/Tooltip.css";

const Tooltip = ({top, right, bottom, left, children, width}) => {

   return (

      <div style={{display: "inline"}}>

         <Icon className={"icontooltip"} path={mdiHelpCircleOutline} size={1}/>

         <span className={"tooltiptext"}
         style={{
            top: `${top ? top : null }`,
            right: `${right ? right : null }`,
            bottom: `${bottom ? bottom : null }`,
            left: `${left ? left : null }`,
            width: `${width ? width : '13rem'}`}}
         >
            {children}
         </span>


      </div>

   );

};

export default Tooltip;