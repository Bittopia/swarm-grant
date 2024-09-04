import { FileService } from "./FileService";

import { FileRepository } from "$lib/repository/FileRepository/FileRepository";

const fileRepository = new FileRepository();

export default new FileService(fileRepository);
