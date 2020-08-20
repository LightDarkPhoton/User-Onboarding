import React from 'react'

export default function Form(props) {

    const {
        values,
        submit,
        inputChange,
        checkboxChange,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }
    
      const onCheckboxChange = evt => {
        const { name, checked } = evt.target
        checkboxChange(name, checked)
      }
    
      const onInputChange = evt => {
        const { name, value } = evt.target
        inputChange(name, value)
      }

      return (
          <form className='form container' onSubmit={onSubmit}>

              <div className='form-group submit'>
                <h2>Add a Friend</h2>
                
                {/*Evidently, disabling the button until all form requirements are met */}

                <button disabled={disabled}>submit</button>
              </div>


            <div className='form-group inputs'>

                <h4>General Information</h4>

                <label>name
                    <input

                    value={values.name}
                    onChange={onInputChange}
                    name='name'
                    type='text'
                    />
                </label>
            </div>
          </form>
      )

}