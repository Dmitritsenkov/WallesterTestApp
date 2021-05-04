import React, {useState, useEffect} from "react";
import classes from "./Table.module.scss";
import Button from "../Button/Button";

type tableData = {
  title: string;
  data?: string[] | JSX.Element;
  type: "text" | "action";
  action?: (indexOfUser:number)=>void;
}[];

interface Iprops{
  tableData: tableData;
  rows: number;
  tableName: string;
}

export default function Table(props:Iprops){

  const [columnTitles, setColumnTitles] = useState();
  const [tableRow, setTableRow] = useState();

  useEffect(()=>{
    setTableData(props.tableData);
  }, [props.tableData]);


  const setTableData = (tableData) => {
    if(tableData){

      const columnTitles = tableData.map((obj,index)=>{
        if(obj.title){
          return(
            <tr key={index} className={classes.table_title}>
              {obj.title}
            </tr>
          );
        }
        else{
          return( <tr key={index}></tr> );
        }
      });
    
      const tableRow:any = [];
      for(let i = 0; i < props.rows; i++){
        const td = [];
        for(let j = 0; j<tableData.length; j++){
          if(tableData[j].type=="action"){
            td.push(
              <td className={classes.table_tableData}>
                <Button action={()=>tableData[j].action(i)} type="second" title="View"/>
              </td>
            );
          } else if(tableData[j].type=="text"){
            td.push(      
              <td className={classes.table_tableData}>
                {tableData[j].data[i]}
              </td>  
              );    
          }
        } 
        tableRow.push(
              <tr key={i} className={classes.table_tableRow}>
                  {td}
              </tr>
            );  
      }     

      setColumnTitles(columnTitles);
      setTableRow(tableRow);
    }
  };

  return( 
    <div className={classes.container}>
      <table className={classes.table}>  
        <thead>
            {columnTitles}   
        </thead>  
        <tbody> 
          {tableRow}
        </tbody>
      </table>
    </div>
  );
}
