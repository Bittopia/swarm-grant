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

		console.log(
			"[LS] -> src/lib/repository/PinataRepository/PinataRepository.ts:20 -> upload: ",
			upload,
		);

		const hash = upload.IpfsHash;

		const data = await pinata.gateways.get(hash).optimizeImage({
			format: "webp",
			width: 200,
			height: 200,
			quality: 50,
		});

		console.log(
			"[LS] -> src/lib/repository/PinataRepository/PinataRepository.ts:16 -> data: ",
			data,
		);

		return `https://${env.PINATA_GATEWAY}/ipfs/${hash}?img-format=webp&w=200&h=200&quality=50&img-fit=cover`;
	}
}
