import './App.css';
import {useState} from "react";
import Axios from 'axios';

function App() {

  const [name, setNome] = useState("");
  const [age, setIdade] = useState(0);
  const [country, setEstado] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const[newWage, setNewWage] = useState(0);

  const[employeeList, setEmployeeList] = useState([]);
  
  const addEmployee = () => {
    Axios.post('http://localhost:3001/create', {
      name: name, 
      age: age, 
      country: country, 
      position: position, 
      wage: wage
    }).then(() => {
      setEmployeeList([...employeeList, {   
        name: name, 
        age: age, 
        country: country, 
        position: position, 
        wage: wage
      }])
    });
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  }

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id
    }).then((response) => {
      alert("update");
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  }

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input type="text" 
          onChange={(event) => 
            {setNome(event.target.value);
          }}
        />
        <label>Age:</label>
        <input 
            type="number" 
            onChange={(event) => 
            {setIdade(event.target.value);
          }}
        />
        <label>Country:</label>
        <input 
          type="text" 
            onChange={(event) => 
            {setEstado(event.target.value);
          }}
        />
        <label>Position:</label>
        <input 
          type="text"
            onChange={(event) => 
            {setPosition(event.target.value);
          }}
        />
        <label>Wage:</label>
        <input 
          type="number"
            onChange={(event) => 
              {setWage(event.target.value);
            }}
          />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      _____________________________________________________________________________________
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return <div className="employee">
            <div>
            <h3>Id: {val.id}</h3>
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country:{val.country}</h3>
            <h3>Position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>
            </div>
            <div>
              <input 
              type="text" 
              placeholder="2000..." 
              onChange={(event) => {
                setNewWage(event.target.value);
              }}
            />
              <button onClick={() => {updateEmployeeWage(val.id)}}>Update</button>

              <button onClick={() => {deleteEmployee(val.id)}}>Delete</button>
            </div>
          </div>
        })}
      </div>
      
    </div>
  );
}

export default App;
