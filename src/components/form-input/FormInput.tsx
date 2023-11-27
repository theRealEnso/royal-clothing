import {InputHTMLAttributes, FC} from 'react';

import {FormInputLabel, Input, FormInputGroup} from './form-input-styles';

type FormInputProps = {
    label: string
} & InputHTMLAttributes<HTMLInputElement>

export const FormInput: FC<FormInputProps> = ({label, ...otherProps}) => {
    return (
        <FormInputGroup>
            <Input {...otherProps} />{/* spread out other properties like type/name/value/onChange/required, etc  */}
            {
                //only render label element if there is an actual label property
                label && <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}>{label}</FormInputLabel>
                // if there is any value in otherProps then apply the shrink class, otherwise do nothing
            }
            
        </FormInputGroup>
    );
};

export default FormInput;