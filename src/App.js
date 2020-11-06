import React  from 'react';
import List from './Components/List/List';
import ToDo from './Components/ToDo/ToDo';
import "./App.css";
import uuid from 'uuid/v4'




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ToDoList : [] , 
      Count : 0,
      ToAdd: {
        title: '' , 
        id: {} , 
        checked: false , 
      },
     };
     this.getItems = this.getItems.bind(this);
     this.removeItem = this.removeItem.bind(this);
     this.handleChange= this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.onEditSubmit =  this.onEditSubmit.bind(this);
     this.handleSearch = this.onEditSubmit.bind(this);
  }

  async componentDidMount() {
    this.getItems();
  }
    
  // deleteItem(id){


  //   const response = await fetch('https://goldencorp-todo-api.herokuapp.com/api/v1/todo/5fa5036d21fe0b0004b58ad8' ,{  
  //     method: 'DELETE' ,
  
  //   });    
  // }
  async getItems(){
        fetch('https://goldencorp-todo-api.herokuapp.com/api/v1/todo').then(response => {
      return response.json();
    }).then(jsonResponse => {

     const data = jsonResponse.records.map(todo => ({
        title: todo.title ,
        id: todo._id,
        done: todo.done , 


      }))
      console.log(data);
      this.setState({
        ToDoList: data , 
        item: data[0],
      })
     } );
 
  }


 async   removeItem(id){
      console.log(id);
      let items = this.state.ToDoList;
      items = items.filter(item => item.id !== id);
  
      this.setState({ToDoList: items});
      const response = await fetch(`https://goldencorp-todo-api.herokuapp.com/api/v1/todo/${id}` ,{  
           method: 'DELETE' ,
        
           });    
           console.log(response);


    }



     handleChange = e => {

     

      this.setState({
        ToAdd: { title: e.target.value}
      })
     
     
    };


   handleSubmit(e){
       e.preventDefault();
  
      this.setState({
        ToAdd: {id: uuid() }
      })
      const newItem = this.state.ToAdd;
      this.state.ToDoList.push(newItem);
       fetch(`https://goldencorp-todo-api.herokuapp.com/api/v1/todo/` ,{  
           method: 'POST' ,
           body: JSON.stringify(newItem),  
           headers:{
             'Content-Type': 'application/json'
           }
        
           });    
    }


    onEditSubmit(NewName , id){

          
          const  ToDoList =  this.state.ToDoList.map(item =>{
          if(item.id === id){
            fetch(`https://goldencorp-todo-api.herokuapp.com/api/v1/todo/${id}` ,{  
              method: 'PUT' ,
              body: JSON.stringify({title: NewName}),  
              headers:{
                'Content-Type': 'application/json'
              }
           
              }).then(response => {
                console.log(response)
;              });   
            return item = {title : NewName  , id : id}; 
          }
          else{
            return item
          }
        
        })
        console.log(ToDoList);
        console.log(this.state.ToDoList)
        this.setState({
          ToDoList : ToDoList
        })
       
        
              
    }

    handleSearch(e){

      e.preventDefault();
      const query = this.state.ToAdd.title
      fetch(`https://goldencorp-todo-api.herokuapp.com/api/v1/todo?title=${query}`).then(response => {
        return response.json();
      }).then(jsonResponse => {
  
        this.setState({
          ToDoList: jsonResponse.records , 
        })
       } );
     
      
    }


 
  render() {
    return (
        <div className="main">
          <h1>
            To DO APP
          </h1>
          <form  >
          <input
            placeholder='Add a todo'
            name='text'
            value={this.state.ToAdd.title}
            className='todo-input'
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit} className='todo-button'>
            Add todo
          </button>
          <button onClick={this.handleSearch} className='todo-button1'>
            Search
          </button>
        </form>
          <div className="flex-container">
          </div>
           <List onEditSubmit={this.onEditSubmit} removeItem={this.removeItem} ToDoList={this.state.ToDoList}> </List>

          

        </div>
    
    )
   }
}


export default App;