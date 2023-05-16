import './authentication.styles.scss';
import SignUpForm from '../../components/sign-up-form/Sign-Up-Form';
import SignInForm from '../../components/sign-in-form/Sign-In-Form';

const Authentication = () => {
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;