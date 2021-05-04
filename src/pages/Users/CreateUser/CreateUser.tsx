import React from "react";
import classes from "./CreateUser.module.scss";
import { TextInput } from "../../../components/Input/Input";
import Button  from "../../../components/Button/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosUtility from "../../../utils/axios";
import Swal from "sweetalert2";


interface formData {
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    job: string;
} 

interface validationErrors {
    firstNameErr: string;
    lastNameErr: string;
    emailErr: string;
    dateOfBirthErr: string;
}

const initialValidationErrors = {
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    dateOfBirthErr: "",
};

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    job: "",
    dateOfBirth: new Date()
};

enum allJobsEnum { 
    NoJob="No job",
    SoftwareEngineer="Software Engineer", 
    Painter="Painter", 
    BusDriver="Bus Driver" 
}
const allJobs:string[] = [
    allJobsEnum.NoJob,
    allJobsEnum.SoftwareEngineer, 
    allJobsEnum.Painter, 
    allJobsEnum.BusDriver
];

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 5000,
  });

type UserProps = Record<string, unknown>
type UserState = {
    formData: formData;
    validationErrors: validationErrors;
    createdUserInfo: Record<string, unknown>;
}
export default class CreateUser extends React.Component<UserProps, UserState> {

    constructor(props){
        super(props);

        this.state = {
            formData: initialFormData,
            validationErrors: initialValidationErrors,
            createdUserInfo: null
        };
    }

    validateForm(){
        let errorCounter = 0;
        const onlyLetters = /^[a-zA-Z\s]+$/;
        const emailregExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const setErrorUtil = (name:string, msg:string) => {
            errorCounter++;
            this.setState((prev:any) => ({
                validationErrors: {
                    ...prev.validationErrors, 
                    [name]: msg,
                }
            }));
        };
        this.setState({ validationErrors: initialValidationErrors });

        const calculateAge = (dateOfBirth:Date) => {
            const month_diff = Date.now() - dateOfBirth.getTime(); 
            const age_dt = new Date(month_diff);   
            const year = age_dt.getUTCFullYear();  
            const age = Math.abs(year - 1970);  
            return age;

        };


        // FirstName validate:
        if(this.state.formData.firstName==""){
            setErrorUtil("firstNameErr", "First Name is required");
        } else if(!onlyLetters.test(this.state.formData.firstName)){
            setErrorUtil("firstNameErr", "First Name must contain only letters (A-Z) without any numbers");
        }

        // LastName validate:
        if(this.state.formData.lastName==""){
            setErrorUtil("lastNameErr", "Last Name is required");
        } else if(!onlyLetters.test(this.state.formData.lastName)){
            setErrorUtil("lastNameErr", "Last Name must contain only letters (A-Z) without any numbers");
        }

        // Email validate:
        if(this.state.formData.email==""){
            setErrorUtil("emailErr", "Email is required");
        } else if(!emailregExp.test(this.state.formData.email)){
            setErrorUtil("emailErr", "Invalid email");
        }

        // DateOfBirth validate:
        if(calculateAge(this.state.formData.dateOfBirth)<18){
            setErrorUtil("dateOfBirthErr", "User must be over 18 years old");
        } 

        if(errorCounter>0){
            return false;
        } else {
            return true;
        }
    }

    onFormSubmit(){
        if(this.validateForm()){
            axiosUtility({
                method: "POST",
                url: "api/users",
                data: this.state.formData,
              }).then(res => {
                Toast.fire({
                    title: "User has been added",
                    icon: "success",
                  });
                this.setState({formData :initialFormData, createdUserInfo: res.data});
            }).catch(()=>{
                Toast.fire({
                    title: "Something went wrong",
                    icon: "success",
                  });
            });
        }
    }

    render(){
        return (
            <div className={classes.container}>
                <form onSubmit={(e)=>e.preventDefault()}>
                    <InputWithLabel 
                    errorMsg={this.state.validationErrors.firstNameErr}
                    onChange={(e)=>this.setState((prev:any)=>({
                        formData: { 
                            ...prev.formData, 
                            firstName: e.target.value
                            }
                        }))
                    } 
                    value={this.state.formData.firstName} 
                    label={"First Name"}/>
                    
                    <InputWithLabel 
                    errorMsg={this.state.validationErrors.lastNameErr}
                    onChange={(e)=>this.setState((prev:any)=>({
                        formData: { 
                            ...prev.formData, 
                            lastName: e.target.value
                            }
                        }))
                    } 
                    value={this.state.formData.lastName} 
                    label={"Last Name"}/>

                    <InputWithLabel 
                    errorMsg={this.state.validationErrors.emailErr}
                    onChange={(e)=>this.setState((prev:any)=>({
                        formData: { 
                            ...prev.formData, 
                            email: e.target.value
                            }
                        }))
                    } 
                    value={this.state.formData.email} 
                    label={"Email"}
                    type="email"/>
                    
                    <label>
                        <span className={classes.label}>Job</span>
                        <select  
                            onChange={(e)=>this.setState((prev)=>({
                                formData: { 
                                    ...prev.formData, 
                                    job: e.target.value
                                    }
                                }))
                            } 
                            defaultValue={allJobs[0]} 
                            className={classes.selectJob}>
                            {allJobs.map((option, index)=>{
                                return(
                                    <option key={index }value={option}>{option}</option>
                                );
                            })}
                        </select>
                    </label>

                    <label>
                        <span className={classes.label}>Date of Birth</span>
                        <DatePicker 
                            className={`${this.state.validationErrors.dateOfBirthErr ? `${classes.datePicker} ${classes.datePickerError}` : classes.datePicker}`}
                            selected={this.state.formData.dateOfBirth} 
                            onChange={
                            (value)=>this.setState((prev:any)=>({
                                formData: {
                                    ...prev.formData, 
                                    dateOfBirth: value
                                }
                            }))
                            }/>
                            <span className={classes.errorMsg}>{this.state.validationErrors.dateOfBirthErr}</span>
                    </label>
                    <div>
                        <Button action={this.onFormSubmit.bind(this)} type="main" title="Add"/>
                    </div>
                </form>
                {this.state.createdUserInfo ? 
                    <div>
                        <h2>Created User Info:</h2>
                        <p>First Name: {this.state.createdUserInfo.firstName}</p>
                        <p>Last Name: {this.state.createdUserInfo.lastName}</p>
                        <p>Email: {this.state.createdUserInfo.email}</p>
                        <p>Date of Birth: {this.state.createdUserInfo.dateOfBirth.toString().slice(0,10)}</p>
                        <p>Job: {this.state.createdUserInfo.job ? this.state.createdUserInfo.job : "No job"}</p>
                        <p>Id: {this.state.createdUserInfo.id}</p>
                        <p>Created at: {this.state.createdUserInfo.createdAt.toString().slice(0,10)}</p>
                    </div>
                    : null
                }
            </div>
        );
    }
}

const InputWithLabel = (props) => {
    if(props){
        return(
            <label>
                <span className={classes.label}>{props.label}</span>
                <TextInput errorMsg={props.errorMsg} type={props.type} onChange={props.onChange} value={props.value}/>
            </label>
        );
    }
};