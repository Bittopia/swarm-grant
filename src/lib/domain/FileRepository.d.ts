export interface FileRepository {
	uploadVideo(file: File): Promise<string | undefined>;
	uploadImage(file: File): Promise<string | undefined>;
	uploadFile(file: File): Promise<string | undefined>;
}
