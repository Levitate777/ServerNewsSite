import { extname, join, resolve } from 'path';
import { promises as fs } from 'fs';

export const saveImage = async (
	image: Express.Multer.File | undefined,
	staticPath: string,
	imageFolderPath: string,
): Promise<string> => {
	if (!image) return undefined;

	const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
	const fileExtName = extname(image.originalname);
	const imageName = `${uniqueSuffix}${fileExtName}`;

	const imagePath = join(
		staticPath,
		imageFolderPath,
		imageName,
	);
	const directoryPath = join(
		__dirname,
		'..',
		'..',
		staticPath,
		imageFolderPath,
	);
	console.log('imagePath ', imagePath);

	await fs.mkdir(directoryPath, { recursive: true });
	console.log('directoryPath ', directoryPath);

	await fs.writeFile(join(directoryPath, imageName), image.buffer);

	return imagePath.replace(/\\/g, '/');
}
