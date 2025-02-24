/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

function ValidInput({type, name, placeholder, value, onChange, onBlur, onKeyDown, errorMessage}) {
    return (
        <div>
             <div css={s.groupBox}>
                <input css={s.textInput}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value = {value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown}
                />
                {
                    !!errorMessage &&
                    <p css={s.messageText}>{errorMessage}</p>
                }
            </div>
        </div>
    );
}

export default ValidInput;