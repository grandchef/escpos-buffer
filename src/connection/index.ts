export { default as InMemory } from './InMemory'

export interface Connection
{
  open(): void;
  write(data: Buffer): void;
  close(): void;
}
