import React, {Component} from 'react';
import './TaskApp.css';

var verifyDateFormat = (date)=>/^\d{4}-\d{2}-\d{2}/.test(date);

class TaskApp extends Component
{
  constructor(props){
    super(props);    
    this.state = {
      'task_text':'',
      'task_date':'',
      'edit_id':'',
      'error_message':'',
      'form_status':'Add',
      'tasks': [
        {'id':1,'name':'Go to Market','date':'2019-02-01',completed:false},
        {'id':2,'name':'Meet to Mr. James','date':'2019-02-01',completed:true}
      ]
    };
    this.saveTask.bind(this);
    this.updateTask.bind(this);
    this.editTask.bind(this);
    this.updateTaskDate.bind(this);
    this.removeTask.bind(this);
  }

  saveTask = (e) => {
    e.preventDefault();
    let name = this.state.task_text.trim();
    let date = this.state.task_date.trim();
    if(name.length>0 && date.length>0){
      
      if(!verifyDateFormat(date)) {
        this.setState({error_message:"* Date should be in YYYY-DD-MM format. (ex. 2019-01-05)"});
        return;
      }

      if(this.state.edit_id) {
        let edit_index = this.state.tasks.findIndex(task =>task.id===this.state.edit_id);
        
        this.setState(state=>{
          state.tasks[edit_index].name = name;
          state.tasks[edit_index].date = date;
        });
        
      } else {
        this.setState({tasks: this.state.tasks.concat({
          id: Date.now(), 
          name: name,
          date: date,
          completed: false
        })});
      }
      
      this.setState({task_text: ''});
      this.setState({task_date: ''});
      this.setState({edit_id: ''});
      this.setState({form_status: 'Add'});
      this.setState({error_message: ''});
    } else {
      this.setState({error_message:"* Task Title and Date both are required."});
    }
  }

  updateTask = (e)=>{
    let task_name = e.target.value;    
    this.setState({'task_text':task_name});
  }
  updateTaskDate = (e)=>{
    let task_date = e.target.value;    
    this.setState({'task_date':task_date});
  }
  editTask = (e,task_id)=>{
    // let task_date = e.target.value;    
    // this.setState({'task_date':task_date});
    let task_to_edit = this.state.tasks.find(task =>task.id===task_id);
    
    if(task_to_edit) {
      // this.setState({'task_text': task_to_edit.name});      
      this.setState(state=>{
        state.task_text = task_to_edit.name;
        state.task_date = task_to_edit.date;
        state.edit_id = task_to_edit.id;        
        state.form_status = 'Update';        
        return state;
      });
    }
  }

  completeToggle = (e,task_id) =>{
    
    this.setState(state=>{      
      state.tasks.map(task=>{        
        if(task.id === task_id){
          task.completed = !task.completed;
        }
        return task;
      });
      return state;
    });    
  }

  removeTask = (e,task_id) =>{
    
    this.setState(state=>{      
      let new_tasks = state.tasks.filter(task=>{        
        return (task.id === task_id) ? false : true;
      });
      state.tasks = new_tasks;
      return state;
    });    
  }

  render() {
    return <div className="container">
            <h1>Todo List</h1>
            <hr/>
            <div className="task-wrapper">
              <div className="tasks">
              <ul>
                {
                  this.state.tasks.map((task, k)=>{
                    let sr = k+1;
                  return <li key={task.id} className={task.completed ? 'completed' : ''}>{sr}. <span onClick={(e)=> {this.completeToggle(e,task.id)}}>{task.name} <span className="task_date">({task.date})</span></span>
                  <span className='remove_task' onClick={(e)=>{this.removeTask(e,task.id)}} title='Remove Task'>x</span>
                  <span className='edit_task' onClick={(e)=>{this.editTask(e,task.id)}} title='Edit Task'>Edit</span>
                  </li>
                  })
                }
              </ul>
              </div>
              <div className="add-task">
                <form onSubmit={this.saveTask} autoComplete="off">
                  <input type="text" id="task-name" placeholder="Go to market.." onChange={this.updateTask} value={this.state.task_text}/>
                  <input type="text" id="task-date" placeholder="YYYY-MM-DD" onChange={this.updateTaskDate} value={this.state.task_date}/>
                  <input type="submit" value={this.state.form_status}/>
                  <p className="error_message">{this.state.error_message}</p>
                </form>
              </div>
            </div>
          </div>
  }
}

export default TaskApp;
