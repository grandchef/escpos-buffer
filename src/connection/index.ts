export { default as InMemory } from './InMemory';
export { default as WebUSB } from './WebUSB';

export interface Connection<WriteResult = void> {
  open(): Promise<void>;
  write(data: Buffer): Promise<WriteResult>;
  close(): Promise<void>;
}
