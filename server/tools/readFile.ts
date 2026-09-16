import fs from 'node:fs/promises';
import path from 'node:path';

export default async function readFile(file: string): Promise<string>{
    const target = file?.trim();

    if (!target) {
        return 'Please tell me which file to read.';
    }

    const fullPath = path.resolve(process.cwd(), target);

    try {
        const contents = await fs.readFile(fullPath, 'utf8');
        return contents;
    } catch {
        return `I couldn't read the file "${file}".`;
    }
}