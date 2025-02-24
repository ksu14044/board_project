/**@jsxImportSource @emotion/react */
import * as s from './style';
import React, { useState } from 'react';

function ValidInput({
    type,
    name, 
    placeholder, 
    value, 
    onChange,
    onFocus = null,
    regexp, 
    errorMessage,
    inputValidError,
    setInputValidError,
}) {

    const handleOnBlur = () => {
        setInputValidError(prev => ({
            ...prev,
            [name]: !regexp.test(value),
        }));

    }

    return (
        <div>
             <div css={s.groupBox}>
                <input css={s.textInput}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value = {value}
                    onBlur={handleOnBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                />
                {
                    !!inputValidError[name] &&
                    <p css={s.messageText}>{errorMessage}</p>
                }
            </div>
        </div>
    );
}

export default ValidInput;