import React, {HTMLProps} from 'react';

interface injectedProps{
    label: string;
    rest: HTMLProps<HTMLInputElement>;
}

const InputWithLabel:React.FC<injectedProps> = ({label, rest}) => {
    return(
        <div className="Auth_Wrapper">
            <div className="Auth_Label">{label}</div>
            <input className="Auth_Input" {...rest}/>
        </div>
    );
}

export default InputWithLabel;