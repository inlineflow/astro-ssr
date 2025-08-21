import * as path from "path";
import * as fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadData = async <T>(filePath: string): Promise<T> => {
  const dataFolderPath = path.join(__dirname, "data");
  const dataPath = path.join(dataFolderPath, filePath);
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const result: T = JSON.parse(data);
    return result;
  } catch (err: any) {
    throw new Error(`Failed to read data from ${filePath}: ${err.message}`);
  }
};

export const delay = async (timeoutInMS: number) =>
  new Promise((resolve) => setTimeout(resolve, timeoutInMS));
