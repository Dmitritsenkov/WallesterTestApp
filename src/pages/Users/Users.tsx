import React, {Component} from "react";
import classes from "./Users.module.scss";
import axiosUtility from "../../utils/axios";
import Table from "../../components/Table/Table";
import ReactPaginate from "react-paginate";
import Button from "../../components/Button/Button";
import User from "./User/User";
import CreateUser from "./CreateUser/CreateUser";
import { FiArrowLeft } from "react-icons/fi";

type tableData = {
    title: string;
    data?: string[] | JSX.Element;
    type: "text" | "action";
    action?: (indexOfUser:number)=>void;
  }[];

enum displayEnum{ USERS, USER, CREATE_USER }

type UserProps = Record<string, never>;
type UserState = { 
    totalPages: number,
    fetchedData: [], 
    currentPage: number,
    tableData: tableData,
    display: number,
    selectedUserData: any
 };

export default class Users extends React.Component<UserProps, UserState> {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: null,
            fetchedData: [],
            currentPage: 1,
            tableData: null,
            display: displayEnum.USERS,
            selectedUserData: null
        };
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    getData():void {
        axiosUtility.get(`users?page=${this.state.currentPage}`)
            .then(res => {
                const fetchedData = res.data.data;
                const tableData:tableData = [
                    {title: "First Name", data: fetchedData.map(userData=>userData.first_name), type: "text"},
                    {title: "Last Name", data: fetchedData.map(userData=>userData.last_name), type: "text"},
                    {title: "Action", 
                        action: (indexOfUser)=>{this.setState({display: displayEnum.USER, selectedUserData: fetchedData[indexOfUser]});}, 
                        type: "action"}
                ];  
                this.setState({
                    fetchedData,
                    tableData,
                    totalPages: res.data.total_pages
                });
            });
    }

    componentDidMount() {
        this.getData();
    }
    
    handlePageClick = (e) => {
        const selectedPage = e.selected + 1;
        this.setState({
            currentPage: selectedPage,
        }, () => {
            this.getData();
        });

    };
    
    
    render(){
        if(this.state.display===displayEnum.USERS){
            return (
                <div>
                <div className={` ${classes.users_tableHeader} ${classes.tableHeader}`}>
                    <h1 className={classes.tableHeader_tableName}>Users</h1>
                    <Button action={()=>this.setState({display: displayEnum.CREATE_USER})} type="main" title="Add New User"/>
                </div> 
                    <Table 
                        tableName="Users" 
                        tableData={this.state.tableData}
                        rows={6}/> 
                        <ReactPaginate
                            pageCount={this.state.totalPages}
                            previousLabel={classes.prev}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={4}
                            onPageChange={this.handlePageClick}
                            containerClassName={classes.pagination}
                            activeClassName={classes.active}
                            />
                </div>
            );
        } else if(this.state.display===displayEnum.USER){
            return (
                <>
                    <div className={` ${classes.user_tableHeader} ${classes.tableHeader}`}>
                        <FiArrowLeft onClick={()=>this.setState({display: displayEnum.USERS})} style={{cursor: "pointer"}} size="25"/>
                        <h1 className={classes.tableHeader_tableName}>
                            {this.state.selectedUserData.first_name} {this.state.selectedUserData.last_name}
                        </h1>
                    </div> 
                    <User data={this.state.selectedUserData}/>
                </>
            );
        } else if(this.state.display===displayEnum.CREATE_USER){
            return (
                <>
                    <div className={` ${classes.createUser_tableHeader} ${classes.tableHeader}`}>
                    <FiArrowLeft onClick={()=>this.setState({display: displayEnum.USERS})} style={{cursor: "pointer"}} size="25"/>
                    <h1 className={classes.tableHeader_tableName}>Create New User</h1>
                    </div> 
                    <CreateUser/>
                </>
            );
        }
    } 
}
