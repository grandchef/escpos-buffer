import * as fs from 'fs';
import * as path from 'path';

export function load(name: string, buffer: Buffer = null): Buffer {
  const ext = name.indexOf('.') < 0 ? '.bin' : '';
  const filename = path.join(__dirname, 'resources', name + ext);
  // tslint:disable: non-literal-fs-path
  if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, buffer);
  }
  return fs.readFileSync(filename);
}
