import { type BatchId, type BeeDebug } from '@ethersphere/bee-js'
export async function createPostageBatchUtil (
  account: string,
  beeDebug: BeeDebug
): Promise<BatchId> {
  try {
    return await beeDebug.createPostageBatch('100', 17, {
      gasPrice: '20000',
      label: account
    })
  } catch (error: any) {
    const errorMessage = error.message
    if (errorMessage !== undefined) {
      throw new Error(`Failed to create postage batch: ${errorMessage}`)
    }
    throw new Error('Failed to create postage batch')
  }
}
