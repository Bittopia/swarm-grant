import { PinataSDK } from "pinata-web3";
import { env } from "$env/dynamic/private";
import type { FileRepository } from "$lib/domain/FileRepository";

const pinata = new PinataSDK({
	pinataJwt: env.PINATA_JWT,
	pinataGateway: env.PINATA_GATEWAY,
});

export class PinataRepository implements FileRepository {
	async uploadImage(file: File) {
		return await this.uploadFile(file);
	}

	async uploadVideo(file: File) {
		return await this.uploadFile(file);
	}

	async uploadFile(file: File) {
		const upload = await pinata.upload.file(file);

		const hash = upload.IpfsHash;

		return `https://${env.PINATA_GATEWAY}/ipfs/${hash}`;
	}
}
