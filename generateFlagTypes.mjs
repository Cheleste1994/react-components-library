import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.resolve(__dirname, './src/assets/images/flags');
const outputFile = path.resolve(__dirname, './src/components/base/flag/flagCodes.ts');

function generateFlagTypes() {
  const files = fs.readdirSync(iconsDir);

  const flagCodes = files
    .filter((file) => file.endsWith('.svg'))
    .map((file) => path.basename(file, '.svg'));

  const typeDef = `
  export type FlagCodes = ${flagCodes.map((code) => `'${code}'`).join(' | ')};\n
  export const FlagCodesArray = ${JSON.stringify(flagCodes)}
  `;

  fs.writeFileSync(outputFile, typeDef, 'utf8');
}

generateFlagTypes();
