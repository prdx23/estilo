import { resolve, green, buckets } from "../../deps.ts";

const tick = green("✓");

export function installTemplates(projectPath: string, templates: string[]) {
  templates.forEach((name) => {
    const destination = resolve(projectPath, "estilo/syntax", name);
    // TODO handle this error
    try {
      Deno.writeTextFileSync(destination, buckets.syntax[name]);
    } catch (err) {
      console.error(err);
    }
  });

  console.log(green(`Added ${templates.length} templates:`));
  console.log(
    templates
      .map((name) => name.slice(0, -4))
      .map((name) => `${tick} ${name}\n`)
      .join("")
  );
}
