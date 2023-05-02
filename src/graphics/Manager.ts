import { ImageData } from './Image';

export default abstract class Manager {
  abstract loadImage(filename: string): Promise<ImageData>;
  abstract loadImageFromBuffer(data: Buffer): Promise<ImageData>;
  abstract buildQrcodeImage(data: string, size: number): Promise<ImageData>;
}
