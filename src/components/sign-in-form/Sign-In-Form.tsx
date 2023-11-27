import {useNavigate} from 'react-router-dom';

import { FormEvent, ChangeEvent } from 'react';
import { AuthError} from 'firebase/auth';

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { selectCurrentUser } from '../../store/user/user-selector';

// import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utilities/firebase/firebase.utilities"; // remove, extracting async logic away from components and moving into saga
import { googleSignInStart, emailSignInStart } from '../../store/user/user-action';

import FormInput from '../form-input/FormInput';
import Button, {BUTTON_TYPE_CLASSES} from '../button/Button';

import {SignInContainer, ButtonsContainer} from './sign-in-form.styles';

const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const [formInputs, setFormInputs] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formInputs;

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormInputs(formInputs => {
            return {
                ...formInputs,
                [name]: value
            };
        });
    };

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
        // try {
        //     await signInWithGooglePopup();
        // } catch (error) {
        //     console.log(error);
        // };
        ////////////////////////////////////////////////////////////////////////

        // const response = await signInWithGooglePopup(); //note that we can destructure user from the response directly here (const {user}) but keeping as is for clarity
        // console.log(response, `I am the response object!`);
        // console.log(response.user, `I am the nested user response object!`);
        // await createUserDocumentOrSignInUserFromAuth(response.user);
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            // const response = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response.user);
            //////////////////////////////////////////////////////////////////
            //state changes, currentUser updates, and therefore any component that uses this will re-render
            // const response = await signInAuthUserWithEmailAndPassword(email, password);
            // console.log(response);
        } catch (error) {
            switch (error as AuthError['code']) {
                case 'auth/user-not-found':
                    alert(`Error: no user associated with this email`);
                    break;
                case 'auth/wrong-password':
                    alert(`Error: incorrect password for associated email`);
                    break;
                default:
                    console.log('user sign in failed', error);
            };
        };

        setFormInputs({
            email: '',
            password: ''
        });
    };

    useEffect(() => {
        if(currentUser){
            navigate('/');
        }
    },[currentUser, navigate]);

    return (
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            
            <form onSubmit={handleFormSubmit}>
                <FormInput label='Email' type='email' name='email' value={email} required onChange={handleInputChange}></FormInput>
                <FormInput label='Password' type='password' name='password' value={password} required onChange={handleInputChange}></FormInput>

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button  type='button' onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google}>Sign In with Google</Button>
                </ButtonsContainer>

            </form>
        </SignInContainer>
    );
};

export default SignInForm;