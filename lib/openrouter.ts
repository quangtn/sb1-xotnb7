export async function refineText(text: string, context: string): Promise<string> {
  // Simulate AI refinement for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(text + " (Refined)")
    }, 1000)
  })
}