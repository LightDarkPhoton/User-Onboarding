import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './formSchema'


const initialFormValues = { 

  name: '',
  email: '',
  password: '',
  terms: false
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: ''
}

const initialUsers = []
const initialDisabled = true


function App() {

  const [users, setUsers] = useState(initialUsers)

  const [formValues, setFormValues] = useState(initialFormValues)

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const [disabled, setDisabled] = useState(initialDisabled)

  // Network Helpers //

  // Form Actions //
  const validation = (evt) => {
    yup
    .reach(formSchema, evt.target.name)
    //we can then run validate using the value
    .validate(evt.target.type === "checkbox" ? evt.target.checked : evt.target.value) // Checking to see if checkbox is equal to checkbox
    // if the validation is successful, we can clear the error message
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [evt.target.name]: "",
      })
    })
    /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [evt.target.name]: err.errors[0],
      })
    })
  }


  const inputChange = (name, value) => {

    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }
  

  

  const submit = () => {

    axios.post('https://reqres.in/api/users', formValues)
    .then(res => {
      console.log(res)

      setUsers([...users, res.data])
      setFormValues(initialFormValues)
    })
    .catch(err => {
      debugger
    })
    
  }

  // Side Effects //
  

  useEffect(() => {
    // 🔥 STEP 10- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues])

  return (
    <div className="App">

      <Form
        values={formValues} 
        inputChange={inputChange}
        submit={submit}
        validation={validation}
        errors={formErrors}
      />

  <pre>{JSON.stringify(users, null, 2)}</pre>
      
    </div>
  );
}

export default App;
