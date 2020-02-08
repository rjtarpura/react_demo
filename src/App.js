import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const url = "https://jsonplaceholder.typicode.com/users";

class App extends Component{
  
  constructor(props){

    super(props);

    this.state = {
      monsters: []
    };
  }

  componentDidMount(){
    fetch(url).then(response=>response.json()).then(users=>{
      console.log(users);
      this.setState({monsters:users});
    });
  }
  render(){
    return (
      <div className="App">
        {
          this.state.monsters.map((monster,id)=>{
            return <h5 key={id}>{monster.name}</h5>
          })
        }
      </div>
    );
  }
}

export default App;
