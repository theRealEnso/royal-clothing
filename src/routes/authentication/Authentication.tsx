import {AuthenticationContainer} from './authentication.styles';
import SignUpForm from '../../components/sign-up-form/Sign-Up-Form';
import SignInForm from '../../components/sign-in-form/Sign-In-Form';

const Authentication = () => {
    return (
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    );
};

export default Authentication;