import './confirmation-page-styles.scss';
import Button from '../../components/button/Button';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {

    return (
        <div className='confirmation-container'>
            <h1>Thank you for your purchase!</h1>
            <h2>Please check your email for a confirmation receipt containing your order. Reach out to us if you have any questions!</h2>

            <Link to='/'>
                <Button buttonType='confirmed'>Continue Shopping</Button>
            </Link>
        </div>
    );
};

export default ConfirmationPage;