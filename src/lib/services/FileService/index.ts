import { FileService } from "./FileService";

// import { FileRepository } from "$lib/repository/FileRepository/FileRepository";
import { PinataRepository } from "$lib/repository/PinataRepository/PinataRepository";

// const fileRepository = new FileRepository();
const pinataRepository = new PinataRepository();

export default new FileService(pinataRepository);
