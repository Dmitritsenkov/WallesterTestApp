import React from "react";
import classes from "./User.module.scss";

type UserProps = {
    data: any;
}
type UserState = {
    userInfo: any;
}
export default class User extends React.Component<UserProps, UserState> {

    constructor(props){
        super(props);
        this.state = {
            userInfo: this.props.data
        };
    }

    render(){
        return (
            <div className={classes.container}>
                <div className={classes.profile}>
                    <img src={this.state.userInfo.avatar}/>  
                    <div>
                        <h2 className={classes.profile_header}>Info</h2>
                        <p>First name: {this.state.userInfo.first_name}</p>
                        <p>Last name: {this.state.userInfo.last_name}</p>
                        <p>Email: {this.state.userInfo.email}</p>
                    </div>
                </div>
            </div>
        );
    }
}