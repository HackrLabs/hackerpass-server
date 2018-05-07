import * as path from 'path';
import * as fs from 'fs';

export function getDirectories(pathname: string): string[] {
  return fs.readdirSync(pathname).filter( file => {
    return fs.statSync(path.join(pathname, file)).isDirectory();
  });
}
