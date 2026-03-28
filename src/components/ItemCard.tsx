import { useState } from "react";
import { ExternalLink, Github, Download, Users, BookOpen, MessageSquare, FolderOpen, Code2, CalendarDays, Globe } from "lucide-react";
import { AnyItem, getItemLink } from "@/lib/github";
import ItemDetailModal from "./ItemDetailModal";

const INDEX_RAW_BASE = "https://raw.githubusercontent.com/open-source-uc/awesome-uc-web-index/main";

const CATEGORY_LABELS: Record<string, string> = {
  web: "Aplicación",
  tools: "Herramienta",
  comunidades: "Comunidad",
  organizaciones: "Organización",
  recreacion: "Recreación",
  apuntes: "Apuntes",
  plantillas: "Plantilla",
};

const CATEGORY_COLORS: Record<string, string> = {
  web: "bg-[#dbeafe] text-[#1d4ed8] border-[#93c5fd]",
  tools: "bg-[#fff8c5] text-[#9a6700] border-[#e3b341]",
  comunidades: "bg-[#ffd8d3] text-[#cf222e] border-[#ff8182]",
  organizaciones: "bg-[#fbefff] text-[#8250df] border-[#d2a8ff]",
  recreacion: "bg-[#ffeed8] text-[#bc4c00] border-[#ffc069]",
  apuntes: "bg-[#e0f2fe] text-[#0369a1] border-[#7dd3fc]",
  plantillas: "bg-[#f6f8fa] text-[#59636e] border-[#d0d7de]",
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  web: <Globe className="w-3.5 h-3.5" />,
  tools: <Code2 className="w-3.5 h-3.5" />,
  comunidades: <MessageSquare className="w-3.5 h-3.5" />,
  organizaciones: <Users className="w-3.5 h-3.5" />,
  recreacion: <CalendarDays className="w-3.5 h-3.5" />,
  apuntes: <BookOpen className="w-3.5 h-3.5" />,
  plantillas: <FolderOpen className="w-3.5 h-3.5" />,
};

function GitHubAvatar({ repo }: { repo?: string | null }) {
  const match = repo?.match(/github\.com\/([^/]+)/);
  const username = match?.[1];

  if (!username) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#f6f8fa] border border-[#d0d7de] flex items-center justify-center text-[#59636e]">
        <FolderOpen className="w-4 h-4" />
      </div>
    );
  }

  return (
    <img
      src={`https://github.com/${username}.png?size=80`}
      alt={username}
      className="w-10 h-10 rounded-full border border-[#d0d7de] object-cover bg-[#f6f8fa]"
      onError={(e) => {
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=dbeafe&color=0066cc&size=80`;
      }}
    />
  );
}

function parseGitHubRepo(url?: string | null): { owner: string; repo: string } | null {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+)\/([^/?#]+)/i);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/i, ""),
  };
}

function normalizeImageUrl(raw?: string | null): string | null {
  if (!raw) return null;
  const value = raw.trim();
  if (!value) return null;

  const githubBlobMatch = value.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/i);
  if (githubBlobMatch) {
    const [, owner, repo, branch, filePath] = githubBlobMatch;
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${INDEX_RAW_BASE}${value}`;
  }

  return `${INDEX_RAW_BASE}/${value}`;
}

function resolveDocResourceImage(resourceImage?: string | null, metadataDir?: string): string | null {
  if (!resourceImage) return null;
  if (!metadataDir) return normalizeImageUrl(resourceImage);
  const resourcePath = `${metadataDir}/resources/${resourceImage.trim()}`;
  return `${INDEX_RAW_BASE}/${resourcePath}`;
}

export default function ItemCard({ item }: { item: AnyItem }) {
  const [showModal, setShowModal] = useState(false);
  const [imageHidden, setImageHidden] = useState(false);
  const [imageFallback, setImageFallback] = useState(false);

  const primaryLink = getItemLink(item);
  const hasRepo = !!(item.repo);
  const hasUrl = !!(item.url);
  const sub = item._subcategory;
  const isTemplate = item._category === "docs" && item._subcategory === "plantillas";
  const tagClass = CATEGORY_COLORS[sub] || "bg-[#f6f8fa] text-[#59636e] border-[#d0d7de]";
  const tagLabel = CATEGORY_LABELS[sub] || sub;
  const tagIcon = CATEGORY_ICONS[sub] || null;
  const rawImage = "resource_image" in item ? (item.resource_image || item.image) : item.image;
  const explicitImage = "resource_image" in item ? resolveDocResourceImage(item.resource_image, item._metadataDir) || normalizeImageUrl(item.image) : normalizeImageUrl(rawImage);
  const repoInfo = parseGitHubRepo(item.repo || item.url);
  const repoPreviewImage = repoInfo
    ? `https://opengraph.githubassets.com/1/${repoInfo.owner}/${repoInfo.repo}`
    : null;
  const imageSrc = imageFallback ? repoPreviewImage : explicitImage || repoPreviewImage;
  const canShowImage = !imageHidden && !!imageSrc;

  return (
    <>
      <div className="group relative flex flex-col bg-white border border-[#d0d7de] rounded-lg p-4 hover:border-[#0066cc] hover:shadow-sm transition-all duration-150">
        {/* Image - Vertical for templates */}
        {canShowImage && (
          <div
            className={`mb-3 rounded-md border border-[#d0d7de] overflow-hidden ${
              isTemplate
                ? "aspect-3/4 bg-white"
                : "aspect-1200/630 bg-[#f6f8fa]"
            }`}
          >
            <img
              src={imageSrc}
              alt={`Vista previa de ${item.name}`}
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => {
                if (!imageFallback && repoPreviewImage && imageSrc !== repoPreviewImage) {
                  setImageFallback(true);
                  return;
                }
                setImageHidden(true);
              }}
            />
          </div>
        )}

        {/* Card header */}
        <div className="flex items-start gap-3 mb-3">
          <GitHubAvatar repo={item.repo} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <a
                href={primaryLink !== "#" ? primaryLink : undefined}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-semibold text-[#1f2328] hover:text-[#0066cc] hover:underline transition-colors leading-tight line-clamp-2 cursor-pointer"
              >
                {item.name}
              </a>
              <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${tagClass}`}>
                {tagIcon}
                {tagLabel}
              </span>
            </div>
            {item.authors.length > 0 && (
              <p className="text-xs text-[#59636e] mt-0.5 truncate">
                {item.authors.slice(0, 3).join(", ")}
                {item.authors.length > 3 && ` +${item.authors.length - 3}`}
              </p>
            )}
          </div>
        </div>

        {/* Description preview (clamped) */}
        <p className="text-xs text-[#59636e] leading-relaxed flex-1 mb-3 line-clamp-3">
          {item.description || "Sin descripción disponible."}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#d0d7de] flex-wrap">
          {hasRepo && (
            <a
              href={item.repo!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#e9ecef] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              Repo
            </a>
          )}
          {hasUrl && item.url !== item.repo && (
            <a
              href={item.url!}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-[#0066cc] border border-[#0058b0] rounded-md hover:bg-[#0058b0] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Ver
            </a>
          )}
          {!hasRepo && !hasUrl && primaryLink !== "#" && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-white bg-[#0066cc] border border-[#0058b0] rounded-md hover:bg-[#0058b0] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Abrir
            </a>
          )}
          {item.download && (
            <a
              href={item.download}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#e9ecef] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar
            </a>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#0066cc] hover:text-white bg-transparent border border-[#0066cc] rounded-md hover:bg-[#0066cc] transition-colors ml-auto"
          >
            Ver detalles
          </button>
        </div>
      </div>

      {/* Modal */}
      <ItemDetailModal item={item} isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
