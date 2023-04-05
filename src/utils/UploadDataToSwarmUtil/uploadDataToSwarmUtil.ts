import {
  type BatchId,
  type Bee,
  type Reference,
  type UploadResult
} from '@ethersphere/bee-js'

export async function uploadDataToSwarmUtil<T extends string> (
  data: T,
  bee: Bee,
  batchId: BatchId
): Promise<Reference> {
  try {
    const result: UploadResult = await bee.uploadData(batchId, data)
    return result.reference
  } catch (error: any) {
    throw new Error(error.message)
  }
}
