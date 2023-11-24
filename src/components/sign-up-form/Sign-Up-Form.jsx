import {useState} from 'react';
// import { createAuthUserWithEmailAndPassword, createUserDocumentOrSignInUserFromAuth } from '../../utilities/firebase/firebase.utilities';

import {useDispatch} from 'react-redux';
import { signUpStart } from '../../store/user/user-action';

import FormInput from '../form-input/FormInput';
import Button from '../button/Button'
import {SignUpContainer} from './sign-up-form.styles';

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [formInputs, setFormInputs] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const {displayName, email, password, confirmPassword} = formInputs;

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormInputs((formInputs) => {
            return {
                ...formInputs,
                [name]: value
            };
        });
        // console.log(formInputs);
    };

    const handleFormSubmit =  async (event) => {

        event.preventDefault();
        if(password !== confirmPassword){
            alert(`Error! Passwords do not match!`);
            return;
        };

        try {
            dispatch(signUpStart(email, password, displayName));
            // //  const response = await createAuthUserWithEmailAndPassword(email, password);
            // //  console.log(response);
            // const {user} = await createAuthUserWithEmailAndPassword(email, password); //destructure user directly from response i.e. response.user
            // await createUserDocumentOrSignInUserFromAuth(user, {displayName});
            setFormInputs({
                displayName: '',
                email: '',
                password:'',
                confirmPassword: ''
            });

        } catch (error) {
            error.code === 'auth/email-already-in-use' ? alert(`Cannot create user, email already in use!`) : console.log(`Error with creating user`, error);
        };
    };

    return (
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            
            <form onSubmit={handleFormSubmit}>
                <FormInput label='Display Name' type='text' name='displayName' value={displayName} onChange={handleInputChange} required></FormInput>

                <FormInput label='Email' type='email' name='email' value={email} onChange={handleInputChange} required></FormInput>

                <FormInput label='Password' type='password' name='password' value={password} onChange={handleInputChange} required></FormInput>

                <FormInput  label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} onChange={handleInputChange} required></FormInput>

                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    );
};

export default SignUpForm;