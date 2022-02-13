import { IValidateValues } from '../components/LoginForm/types'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const asyncValidate = (values: IValidateValues /*, dispatch */) => {
  return sleep(1000).then(() => {
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }
  })
}
