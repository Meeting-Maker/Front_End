import Icon from '@mdi/react';
import {mdiAccount} from '@mdi/js';
import React from "react";
import {formatDate} from "../services/Comment"
// eslint-disable-next-line import/no-anonymous-default-export
export default ({name, content, date}) => {
    return (
        <div className={"ui container comments"} >
            <div className={"ui card centered"} style={{width: "90%"}}>
                <div className={"content"} >
                    <div className={"comment"} >
                        <div className={"avatar"}>
                            <Icon path={mdiAccount}
                                  size={2}
                                  color={"black"}/>
                        </div>
                        <div className={"content"}>
                            <a href={"/"} className={"author"} style={{float: "left"}}>
                                {name}
                                <div className={"metadata"}>
                                    <span className={"date"}> {formatDate(date)} </span>
                                </div>
                            </a>
                            <br />
                            <div className={"text"} style={{float: "left"}}>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}