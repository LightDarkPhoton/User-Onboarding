import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './formSchema'


const initialFormValues = { 

  name: '',
}

const initialFormErrors = {
  name: '',
}

const initialUsers = []
const initialDisabled = true


function App() {

  const [users, setUsers] = useState(initialUsers)

  const [formValues, setFormValues] = useState(initialFormValues)

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const [disabled, setDisabled] = useState(initialDisabled)

  // Network Helpers //

  const getUsers = () => {

    setUsers(users)
  }

  const postNewUser = newUser => {

    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        console.log(res)

        setUsers([...users, res.data])
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  // Form Actions //
  const inputChange = (name, value) => {
    yup
    .reach(formSchema, name)
    //we can then run validate using the value
    .validate(value)
    // if the validation is successful, we can clear the error message
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    })
    /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      })
    })

  setFormValues({
    ...formValues,
    [name]: value // NOT AN ARRAY
  })
  }

  const submit = () => {

    const newUser = {
      name: formValues.name.trim(),
    }

    postNewUser(newUser)
    
    //setUsers(newUser)
  }

  // Side Effects //
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    // 🔥 STEP 10- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Form
        values={formValues} 
        inputChange={inputChange}
        submit={submit}
      />

      {
        console.log(`User name: ${users.name}`)
      }

      <div>{users.name}</div>
      
    </div>
  );
}

export default App;
