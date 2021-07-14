import { loadYml } from "./util.ts";
import { existsSync, resolve } from "../deps.ts";
import { ProjectFiles, ProjectConfig } from "./common.ts";

export function loadProjectFiles(projectUrl: string): ProjectFiles {
  return {
    config: loadYml(projectUrl, "estilo.yml").content as ProjectConfig,
    airlineFiles: loadYmlsInFolder(projectUrl, "airline"),
    lightlineFiles: loadYmlsInFolder(projectUrl, "lightline"),
    syntaxFiles: loadYmlsInFolder(projectUrl, "syntax"),
    paletteFiles: loadYmlsInFolder(projectUrl, "palettes"),
  };
}

function loadYmlsInFolder(projectUrl: string, folder: string) {
  const folderUrl = resolve(projectUrl, "estilos", folder);
  const filepaths = ymlsInFolder(folderUrl);
  return Object.fromEntries(
    filepaths.map((filepath) => [
      filepath,
      loadYml(filepath) as Record<string, string>,
    ])
  );
}

// returns a list of all the `.yml` filepaths contained inside folderpath
function ymlsInFolder(folderPath: string, folder2?: string): string[] {
  const finalPath = resolve(folderPath, folder2 || "");
  if (!existsSync(finalPath)) return [];
  return Array.from(Deno.readDirSync(finalPath))
    .filter((file) => file.name.endsWith(".yml"))
    .map((file) => resolve(finalPath, file.name));
}
