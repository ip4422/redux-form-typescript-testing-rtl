import React from 'react'
import { WrappedFieldProps } from 'redux-form'

export interface IInputFieldProps extends WrappedFieldProps {
  label: string
  type: string
}

export const InputField = ({
  input,
  label,
  type,
  meta: { asyncValidating, touched, error }
}: IInputFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <div className={asyncValidating ? 'async-validating' : ''}>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
}

export default InputField
