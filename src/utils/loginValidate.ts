import { IValidateValues, IValidatedErrors } from '../components/LoginForm/types'

export const validate = (values: IValidateValues) => {
  const errors: IValidatedErrors = {} as IValidatedErrors
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}
