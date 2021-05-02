import Icon from '@mdi/react';
import {mdiAccount} from '@mdi/js';
import React from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({name, content, date}) => {
    return (
        <div className={"ui container comments"}  >
            <div className={"ui card centered"} style={{width: '50%'}}>
                <div className={"content"} >
                    <div className={"comment"}>
                        <div className={"avatar"}>
                            <Icon path={mdiAccount}
                                  size={2}
                                  color={"black"}/>
                        </div>
                        <div className={"content"}>
                            <a href={"/"} className={"author"}>
                                {name}
                            </a>
                            <div className={"metadata"}>
                                <span className={"date"}> {date} </span>
                            </div>
                            <div className={"text"}>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}