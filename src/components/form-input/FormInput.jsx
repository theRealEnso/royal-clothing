import './form-input-styles.scss';

export const FormInput = ({label, ...otherProps}) => {
    return (
        <div className='form-input-group'>
            <input className='form-input' {...otherProps}></input> {/* spread out other properties like type/name/value/onChange/required, etc  */}
            {
                //only render label element if there is an actual label property
                label && <label className={`${otherProps.value.length ? 'shrink' : null} form-input-label`}>{label}</label>
                // if there is any value in otherProps then apply the shrink class, otherwise do nothing
            }
            
        </div>
    );
};

export default FormInput