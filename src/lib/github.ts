export interface ProjectItem {
  name: string;
  authors: string[];
  description: string;
  repo?: string | null;
  url?: string | null;
  download?: string | null;
  image?: string | null;
  _category: "projects";
  _subcategory: "web" | "tools";
  _slug: string;
  _updatedAt?: string;
  _stars?: number;
}

export interface SocialItem {
  name: string;
  authors: string[];
  description: string;
  url?: string | null;
  repo?: string | null;
  download?: string | null;
  image?: string | null;
  _category: "social";
  _subcategory: "comunidades" | "organizaciones" | "recreacion";
  _slug: string;
  _updatedAt?: string;
}

export interface DocsItem {
  name: string;
  authors: string[];
  description: string;
  repo?: string | null;
  url?: string | null;
  resource_image?: string | null;
  image?: string | null;
  download?: string | null;
  _category: "docs";
  _subcategory: "apuntes" | "plantillas";
  _slug: string;
  _updatedAt?: string;
  _metadataDir?: string;
}

export type AnyItem = ProjectItem | SocialItem | DocsItem;

export interface AllData {
  projects: {
    web: ProjectItem[];
    tools: ProjectItem[];
  };
  social: {
    comunidades: SocialItem[];
    organizaciones: SocialItem[];
    recreacion: SocialItem[];
  };
  docs: {
    apuntes: DocsItem[];
    plantillas: DocsItem[];
  };
  _fetchedAt: string;
}

const GITHUB_API_BASE = "https://api.github.com";
const REPO_OWNER = "open-source-uc";
const REPO_NAME = "awesome-uc-web-index";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main`;

async function fetchJson(url: string): Promise<unknown> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.json();
}

async function fetchGithubTree(): Promise<{ path: string; sha: string; type: string }[]> {
  const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/main?recursive=1`;
  const data = await fetchJson(url) as { tree: { path: string; sha: string; type: string }[] };
  return data.tree || [];
}

async function fetchLastCommitDate(filePath: string): Promise<string | undefined> {
  try {
    const url = `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/commits?path=${filePath}&per_page=1`;
    const data = await fetchJson(url) as { commit?: { committer?: { date?: string } } }[];
    return data?.[0]?.commit?.committer?.date;
  } catch {
    return undefined;
  }
}

function getSubcategoryFromPath(path: string, category: string): string {
  const parts = path.replace(`${category}/`, "").split("/");
  return parts[0] || "";
}

function slugFromPath(path: string): string {
  return path
    .replace(/\.json$/, "")
    .replace(/\/metadata$/, "")
    .split("/")
    .pop() || path;
}

function mapDocsSubcategory(rawSub: string): "apuntes" | "plantillas" {
  const sub = rawSub.toLowerCase();
  if (["plantillas", "templates", "latex", "typst", "beamer"].includes(sub)) {
    return "plantillas";
  }
  return "apuntes";
}

export async function fetchAllData(): Promise<AllData> {
  const tree = await fetchGithubTree();

  const jsonFiles = tree.filter(
    (f) => f.type === "blob" && f.path.endsWith(".json") && !f.path.startsWith("templates/")
  );

  const data: AllData = {
    projects: { web: [], tools: [] },
    social: { comunidades: [], organizaciones: [], recreacion: [] },
    docs: { apuntes: [], plantillas: [] },
    _fetchedAt: new Date().toISOString(),
  };

  await Promise.allSettled(
    jsonFiles.map(async (file) => {
      const { path } = file;

      try {
        const rawUrl = `${RAW_BASE}/${path}`;
        const json = await fetchJson(rawUrl) as Record<string, unknown>;
        const slug = slugFromPath(path);

        if (path.startsWith("projects/")) {
          const sub = getSubcategoryFromPath(path, "projects");
          const item: ProjectItem = {
            name: (json.name as string) || slug,
            authors: (json.authors as string[]) || [],
            description: (json.description as string) || "",
            repo: (json.repo as string) || null,
            url: (json.url as string) || null,
            download: (json.download as string) || null,
            image: (json.image as string) || null,
            _category: "projects",
            _subcategory: sub === "web" ? "web" : "tools",
            _slug: slug,
          };

          if (sub === "web") {
            data.projects.web.push(item);
          } else {
            data.projects.tools.push(item);
          }
        } else if (path.startsWith("social/")) {
          const sub = getSubcategoryFromPath(path, "social");
          const item: SocialItem = {
            name: (json.name as string) || slug,
            authors: (json.authors as string[]) || [],
            description: (json.description as string) || "",
            url: (json.url as string) || null,
            repo: (json.repo as string) || null,
            download: (json.download as string) || null,
            image: (json.image as string) || null,
            _category: "social",
            _subcategory: sub === "organizaciones" ? "organizaciones" : sub === "recreacion" ? "recreacion" : "comunidades",
            _slug: slug,
          };

          if (sub === "organizaciones") {
            data.social.organizaciones.push(item);
          } else if (sub === "recreacion") {
            data.social.recreacion.push(item);
          } else {
            data.social.comunidades.push(item);
          }
        } else if (path.startsWith("docs/")) {
          const sub = getSubcategoryFromPath(path, "docs");
          const mappedSub = mapDocsSubcategory(sub);
          const metadataDir = path.replace(/\/metadata\.json$/, "");
          const item: DocsItem = {
            name: (json.name as string) || slug,
            authors: (json.authors as string[]) || [],
            description: (json.description as string) || "",
            repo: (json.repo as string) || null,
            url: (json.url as string) || null,
            resource_image: (json.resource_image as string) || null,
            image: (json.image as string) || null,
            download: (json.download as string) || null,
            _category: "docs",
            _subcategory: mappedSub,
            _slug: slug,
            _metadataDir: metadataDir,
          };

          if (mappedSub === "plantillas") {
            data.docs.plantillas.push(item);
          } else {
            data.docs.apuntes.push(item);
          }
        }
      } catch {
      }
    })
  );

  return data;
}

export function getAllItems(data: AllData): AnyItem[] {
  return [
    ...data.projects.web,
    ...data.projects.tools,
    ...data.social.comunidades,
    ...data.social.organizaciones,
    ...data.social.recreacion,
    ...data.docs.apuntes,
    ...data.docs.plantillas,
  ];
}

export function searchItems(items: AnyItem[], query: string): AnyItem[] {
  if (!query.trim()) return items;
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.authors.some((a) => a.toLowerCase().includes(q))
  );
}

export function sortByUpdated(items: AnyItem[]): AnyItem[] {
  return [...items].sort((a, b) => {
    const da = a._updatedAt ? new Date(a._updatedAt).getTime() : 0;
    const db = b._updatedAt ? new Date(b._updatedAt).getTime() : 0;
    return db - da;
  });
}

export function getItemLink(item: AnyItem): string {
  return item.url || item.repo || "#";
}

export function getItemRepoInfo(item: AnyItem): { owner: string; repo: string } | null {
  const url = item.repo || item.url || "";
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (match) return { owner: match[1], repo: match[2] };
  return null;
}
