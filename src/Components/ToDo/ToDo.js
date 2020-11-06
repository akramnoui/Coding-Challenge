import React from 'react';
import ReactDOM from 'react-dom'
import "./ToDo.css";





class ToDo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
         isEditing: false , 
         ToEdit: this.props.Name , 
       };
        this.removeItem = this.removeItem.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);

        
      }  


    removeItem(){
        this.props.removeItem(this.props.Id)
    }
    onEdit(){
        
        this.setState({
            isEditing : true
        })
    }

   onEditSubmit(e){
    e.preventDefault();
    this.props.onEditSubmit(this.state.ToEdit , this.props.Id)
    this.setState({
        isEditing: false ,
    })

   }

   handleChangeEdit(e){
    this.setState({
        ToEdit: e.target.value
      })
      console.log(this.state.ToEdit)
   }

    render() {
      
            if(! this.state.isEditing){
                return(
                <div className="ToDo">
                        

                    <div className="ToDo-information">
                    <input type="checkbox" isChecked={this.props.Done}></input>
                    <h3 className="name">{this.props.Name}</h3>    
                  

                    </div>
                    <button className="ToDo-Edit"  onClick={this.onEdit}> Edit </button>
                    <button className="ToDo-action"  onClick={this.removeItem}> Delete </button>

                </div>
                )
                }else{
                    return(
                        <div className="ToDo">
                        

                        <div className="ToDo-information">
                        <input type="checkbox" isChecked={this.props.Done}></input>
                        <form onSubmit={this.onEditSubmit}>
                        <input
                            placeholder='Edit'
                            name='text'
                            className='todo-input'
                            value={this.state.ToEdit}
                            onChange={this.handleChangeEdit}
                        />  
                        </form>
                    
                        </div>
                        <button className="ToDo-action"  onClick={this.removeItem}> Delete </button>
                        <button className="ToDo-Edit"  onClick={this.onEdit}> Edit </button>
    
                    </div>
                    )
                }
       
    }
}

export default ToDo;