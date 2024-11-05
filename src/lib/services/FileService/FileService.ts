import type { FileRepository } from "$lib/domain/FileRepository";

export class FileService {
	fileRepo: FileRepository;

	constructor(fileRepo: FileRepository) {
		this.fileRepo = fileRepo;
	}

	async uploadVideo(file: File) {
		return this.fileRepo.uploadVideo(file);
	}

	async uploadImage(file: File) {
		return this.fileRepo.uploadImage(file);
	}

	async uploadFile(file: File) {
		return this.fileRepo.uploadFile(file);
	}
}
