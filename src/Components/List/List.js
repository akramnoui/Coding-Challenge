import React from "react"
import ToDo from "../ToDo/ToDo";
import "./List.css";





class List extends React.Component{

        render(){
            

            return(
                <div className="ListContainer">
                {
                        this.props.ToDoList.map( item =>{
        
                            return ( <ToDo onEditSubmit={this.props.onEditSubmit} removeItem={this.props.removeItem} Name={item.title} Id={item.id} Done={item.done} />);
        
                        })
                    
                    } 
             </div>
            );


        }

}
export default List ;