import React from "react";
import classes from "./Input.module.scss";

export const TextInput = (props:any) => {
    return (
        <>
        <input 
            type={props.type} 
            onChange={props.onChange} 
            value={props.value} 
            className={`${props.errorMsg ? `${classes.errortextInput} ${classes.textInput}`  : classes.textInput}`} />
            <span className={classes.errorMsg}>{props.errorMsg}</span>
        </>
    );
};