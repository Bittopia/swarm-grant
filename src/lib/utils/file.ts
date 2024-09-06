import { env } from "$env/dynamic/public";
import { uuid } from "uuidv4";

const FILE_UPLOAD_SERVICE_URL = env.PUBLIC_FILE_UPLOAD_SERVICE_URL;

export async function getPresignedUrl(
	filename: string | undefined,
	authToken: string | undefined,
): Promise<{ url: string }> {
	if (!filename) {
		throw new Error("File extension is required");
	}

	const response = await fetch(
		`${FILE_UPLOAD_SERVICE_URL}/upload-url?filename=${filename}`,
		{
			headers: { Authorization: `Bearer ${authToken}` },
		},
	);

	if (!response.ok) {
		throw new Error("Failed to get presigned url");
	}

	const { presignedUrl } = await response.json();

	return { url: presignedUrl };
}

export async function uploadFile(
	file: File,
	authToken: string,
): Promise<{ url: string }> {
	const fileExtension = file.name.split(".").pop();
	const randomFilename = `${uuid()}.${fileExtension}`;

	const { url } = await getPresignedUrl(randomFilename, authToken);

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"x-amz-acl": "public-read",
			"Content-Type": file.type,
		},
		body: file,
	});

	if (!response.ok) {
		throw new Error("Failed to upload file");
	}

	const cdn_url = `${env.PUBLIC_FILE_CDN_URL}/${randomFilename}`;

	return { url: cdn_url };
}
