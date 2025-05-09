import * as Yup from 'yup';

const validate_signup_form = Yup.object({
    username: Yup.string().required('Username is required'),
    name: Yup.string().required('Name is required'),
    age: Yup.number()
        .required('Age is required')
        .min(18, 'Must be at least 18 years old')
        .max(120, 'Must be less than 120 years old'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Valid email is required'),
    password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Password is required')
})

export default validate_signup_form