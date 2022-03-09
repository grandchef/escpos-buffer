export { default as InMemory } from './InMemory';
export { default as WebUSB } from './WebUSB';

export interface Connection {
  open(): Promise<void>;
  write(data: Buffer): Promise<void>;
  close(): Promise<void>;
}
