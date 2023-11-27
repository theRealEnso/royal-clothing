import {ConfirmationContainer} from './confirmation-page-styles';
import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/Button';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {

    return (
        <ConfirmationContainer>
            <h1>Thank you for your purchase!</h1>
            <h2>Please check your email for a confirmation receipt containing your order. Reach out to us if you have any questions!</h2>

            <Link to='/'>
                <Button buttonType={BUTTON_TYPE_CLASSES.google}>Continue Shopping</Button>
            </Link>
        </ConfirmationContainer>
    );
};

export default ConfirmationPage;