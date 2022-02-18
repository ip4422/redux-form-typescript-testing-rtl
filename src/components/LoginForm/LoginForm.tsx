import React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { validate, asyncValidate } from '../../utils'
import { InputField } from '../InputField'

export interface IFormData {
  username: string
  password: string
}

export interface IOwnProps {
  isLoading?: boolean
}

export type LoginFormProps = IOwnProps & InjectedFormProps<IFormData, IOwnProps>

export const UnconnectedLoginForm: React.FC<LoginFormProps> = (
  props: LoginFormProps
) => {
  const { handleSubmit, pristine, reset, submitting, isLoading } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='username'
        type='text'
        component={InputField}
        label='Username'
      />
      <Field
        name='password'
        type='password'
        component={InputField}
        label='Password'
      />
      <div>
        <button type='submit' disabled={submitting || isLoading}>
          Sign Up
        </button>
        <button
          type='button'
          disabled={pristine || submitting || isLoading}
          onClick={reset}
        >
          Clear Values
        </button>
      </div>
    </form>
  )
}

export const LoginForm = reduxForm<IFormData, IOwnProps>({
  form: 'asyncValidation',
  validate,
  asyncValidate,
  asyncBlurFields: ['username']
})(UnconnectedLoginForm)
