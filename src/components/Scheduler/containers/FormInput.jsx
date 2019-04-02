// @flow
import * as React from 'react';
import styles from "./FormInput.module.scss";

type Props = {
    labelName: string,
    inputType?: string,
    onChange: (e?: SyntheticEvent<HTMLInputElement>) => (void),
    inputValue: ?string | ?number,
    inputProps?: React.Node,
    required?: boolean
}

type State = {}

class FormInput extends React.Component<Props, State> {
    render() {
        const {
            labelName,
            inputType,
            onChange,
            inputValue,
            inputProps,
            required,
        } = this.props;

        return (
            <>
                <label
                    htmlFor={`${labelName}Input`}
                    className={styles.label}
                >{labelName}</label>
                <input
                    type={inputType ? inputType : 'text'}
                    name={labelName}
                    id={`${labelName}Input`}
                    onChange={onChange}
                    value={inputValue}
                    className={styles.input}
                    required={required}
                    {...inputProps}
                />
            </>
        );
    }
}

export default FormInput;
