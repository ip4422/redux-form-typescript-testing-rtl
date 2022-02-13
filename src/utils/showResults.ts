const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function showResults(values: any) {
  await sleep(500) // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
}
