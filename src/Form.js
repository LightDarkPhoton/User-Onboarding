import React from 'react'

export default function Form(props) {

    const {
        values,
        submit,
        inputChange,
        validation,
        disabled,
        errors,
    } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
      }
    
      const onInputChange = evt => {
        const { name, value, checked, type } = evt.target
        evt.persist()
        validation(evt)
        inputChange(name, type==='checkbox' ? checked : value)
      }

      return (
          <form className='form container' onSubmit={onSubmit}>

              <div className='form-group submit'>
                <h2>Add a Friend</h2>
                
                {/*Evidently, disabling the button until all form requirements are met */}

                <button id='submitButton' disabled={disabled}>submit</button>
              </div>


            <div className='form-group inputs'>

                <h4>General Information</h4>

                <label>
          name
          <input
            value={values.name}
            onChange={onInputChange}
            name="name"
            type="text"
          />
          {errors.name.length > 0 ? <p>{errors.name}</p> : null}
        </label>

                <label>email
                    <input

                    value={values.email}
                    onChange={onInputChange}
                    name='email'
                    type='email'
                    />
                    {errors.email.length > 0 ? <p>{errors.email}</p> : null}
                </label>

                <label>password
                    <input

                    value={values.password}
                    onChange={onInputChange}
                    name='password'
                    type='password'
                    />
                    {errors.password.length > 0 ? <p>{errors.password}</p> : null}
                </label>

                <label>terms
                    <input

                    checked={values.terms}
                    onChange={onInputChange}
                    name='terms'
                    type='checkbox'
                    />

                </label>

            </div>
          </form>
      )

}