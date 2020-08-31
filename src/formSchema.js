import * as yup from 'yup'

const schema = yup.object().shape({

    name: yup
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .required('Name is Required'),

    email: yup
        .string()
        // Email is a very special function that checks for the complete email address (including the .com so take care)
        .email('Must be a valid email address')
        .required('Email is Required'),

    password: yup
        .string()
        .required('Password is required'),

    terms: yup
        .boolean()
        .oneOf([true], 'Term is required')
        .required("Term is required"),
})

export default schema