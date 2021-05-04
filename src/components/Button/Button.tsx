import React from "react";
import classes from "./Button.module.scss";


enum btnType {Main="main", Second="second"}

interface Iprops{
    title: string;
    type: string;
    action?: ()=>void;
}

const Button = (props:Iprops):JSX.Element => {
    let buttonElement = <button className={classes.mainButton}>{props.title}</button>;

    switch(props.type){
        case btnType.Main:
            buttonElement = <button onClick={props.action} className={classes.mainButton}>{props.title}</button>;
        break;
        case btnType.Second:
            buttonElement = <button onClick={props.action} className={classes.secondButton}>{props.title}</button>;
        break;
    }

    return (
        <>
            {buttonElement}
        </>
    );
};

export default Button;