import './button-styles.scss';
import ButtonSpinner from '../button-spinner/button-spinner';

export const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    confirmed: 'confirmed'
};

const Button = ({children, buttonType, isLoading, ...otherProps}) => {
    return (
        <button disabled={isLoading} className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}` } {...otherProps}>{isLoading ? <ButtonSpinner></ButtonSpinner> : children}</button>
    );
};

export default Button;