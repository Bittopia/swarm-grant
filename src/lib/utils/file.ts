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

export async function uploadVideo({
	video_file,
	title,
	description,
	thumbnail_file,
	jwt,
	abortController,
}: {
	video_file: File;
	title: string;
	description: string;
	thumbnail_file: File;
	jwt: string;
	abortController?: AbortController;
}) {
	const formData = new FormData();

	console.log({ video_file, title, description, thumbnail_file });

	formData.append("file", video_file);
	formData.append("title", title);
	formData.append("description", description);
	formData.append("thumbnail", thumbnail_file);

	const response = await fetch(`${FILE_UPLOAD_SERVICE_URL}/upload-video`, {
		method: "POST",
		body: formData,
		headers: { Authorization: `Bearer ${jwt}` },
	});

	if (!response.ok) {
		throw new Error("Failed to upload video");
	}

	const { permalink } = await response.json();

	return { url: permalink };
}
