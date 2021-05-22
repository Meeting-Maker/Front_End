import React, {useState, useEffect, useRef} from 'react';
import Icon from "@mdi/react";
import {mdiChevronDown, mdiChevronUp} from "@mdi/js";

const Dropdown = ({dropdownOptions, dropdownSelection, setDropdownSelection, width}) => {

   const [dropdownOpen, setDropdownOpen] = useState(false);
   const ref = useRef();

   useEffect(() => {

      const onBodyClick = (event) => {
         if (ref.current.contains(event.target)) {
            return;
         }
         setDropdownOpen(false);
      }
      document.body.addEventListener('click', onBodyClick, {capture: true});

      return () => {
         document.body.removeEventListener('click', onBodyClick, {capture: true});
      };

   }, []);


   const renderedOptions = dropdownOptions.map((option) => {

      if (option.value === dropdownSelection.value) {
         return null;
      }

      return (
         <div key={option.value} className="item" onClick={() => setDropdownSelection(option)}>
            {option.label} {option.order === 'ascending' ? <Icon path={mdiChevronUp} size={0.6}/> :
            <Icon path={mdiChevronDown} size={0.6}/>}
         </div>
      );
   });

   return (
      <div ref={ref} onClick={() => setDropdownOpen(!dropdownOpen)}
           className={`ui selection dropdown ${dropdownOpen ? 'visible active' : ''}`}
           style={{textAlign: "left", minWidth: "8rem"}}>
         <i className="dropdown icon" style={{}}/>
         <div className="text">
            {dropdownSelection.label} {dropdownSelection.order === 'ascending' ? <Icon path={mdiChevronUp} size={0.6}/> :
            <Icon path={mdiChevronDown} size={0.6}/>}
         </div>
         <div className={`menu ${dropdownOpen ? 'visible transition' : ''}`}>
            {renderedOptions}
         </div>
      </div>
   );


}

export default Dropdown;