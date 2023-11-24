import {FormInputLabel, Input, FormInputGroup} from './form-input-styles.jsx';

export const FormInput = ({label, ...otherProps}) => {
    return (
        <FormInputGroup>
            <Input>{...otherProps}</Input>{/* spread out other properties like type/name/value/onChange/required, etc  */}
            {
                //only render label element if there is an actual label property
                label && <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
                // if there is any value in otherProps then apply the shrink class, otherwise do nothing
            }
            
        </FormInputGroup>
    );
};

export default FormInput;