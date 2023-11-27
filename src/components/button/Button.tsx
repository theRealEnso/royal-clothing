import {FC, ButtonHTMLAttributes} from 'react'; // FC stands for functional component

import {BaseButton, GoogleSignInButton, InvertedButton, LoadingSpinner} from './button-styles';

export enum BUTTON_TYPE_CLASSES {
    base = 'base',
    google = 'google-sign-in',
    inverted = 'inverted',
};

//function that returns one of three styled button components depending on which BUTTON_TYPE_CLASSES is used (base / google / inverted)
export const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType]);

// our custom buttons extend onto existing buttons inside the react ecosystem => need to figure out which attribite from original react components to extend on
export type ButtonProps = {
    buttonType?: BUTTON_TYPE_CLASSES;
    isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({children, buttonType, isLoading, ...otherProps}) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton disabled={isLoading} {...otherProps}>{isLoading ? <LoadingSpinner></LoadingSpinner> : children}</CustomButton>
    );
};

export default Button;