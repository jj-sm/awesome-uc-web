import { useState } from "react";
import { X, Github, ExternalLink, Download } from "lucide-react";
import { AnyItem, getItemLink } from "../lib/github";

const INDEX_RAW_BASE = "https://raw.githubusercontent.com/open-source-uc/awesome-uc-web-index/main";

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

interface ItemDetailModalProps {
  item: AnyItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  const [imageHidden, setImageHidden] = useState(false);
  const [imageFallback, setImageFallback] = useState(false);

  if (!isOpen) return null;

  const primaryLink = getItemLink(item);
  const hasRepo = !!(item.repo);
  const hasUrl = !!(item.url);
  const isTemplate = item._category === "docs" && item._subcategory === "plantillas";
  
  const explicitImage = "resource_image" in item ? resolveDocResourceImage(item.resource_image, item._metadataDir) || normalizeImageUrl(item.image) : normalizeImageUrl("image" in item ? item.image : undefined);
  const repoInfo = parseGitHubRepo(item.repo || item.url);
  const repoPreviewImage = repoInfo
    ? `https://opengraph.githubassets.com/1/${repoInfo.owner}/${repoInfo.repo}`
    : null;
  const imageSrc = imageFallback ? repoPreviewImage : explicitImage || repoPreviewImage;
  const canShowImage = !imageHidden && !!imageSrc;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-0 right-0 p-3 ml-auto flex items-center justify-center text-[#59636e] hover:text-[#1f2328] hover:bg-[#f6f8fa] rounded-md transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 pb-6">
          {/* Image - Full width, vertical for templates */}
          {canShowImage && (
            <div
              className={`mb-6 rounded-md border border-[#d0d7de] overflow-hidden ${
                isTemplate ? "aspect-3/4 bg-white" : "aspect-1200/630 bg-[#f6f8fa]"
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

          {/* Title and metadata */}
          <h2 className="text-2xl font-bold text-[#1f2328] mb-2">{item.name}</h2>

          {/* Description */}
          <p className="text-sm text-[#59636e] leading-relaxed mb-6">
            {item.description || "Sin descripción disponible."}
          </p>

          {/* Metadata */}
          <div className="space-y-3 mb-6 text-xs text-[#59636e]">
            {item.authors.length > 0 && (
              <p>
                <span className="font-semibold text-[#1f2328]">Autores:</span> {item.authors.join(", ")}
              </p>
            )}
            {item._updatedAt && (
              <p>
                <span className="font-semibold text-[#1f2328]">Actualizado:</span>{" "}
                {new Date(item._updatedAt).toLocaleDateString("es-CL", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {hasRepo && (
              <a
                href={item.repo!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#e9ecef] transition-colors"
              >
                <Github className="w-4 h-4" />
                Repositorio
              </a>
            )}
            {hasUrl && item.url !== item.repo && (
              <a
                href={item.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#0066cc] border border-[#0058b0] rounded-md hover:bg-[#0058b0] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visitar
              </a>
            )}
            {!hasRepo && !hasUrl && primaryLink !== "#" && (
              <a
                href={primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-[#0066cc] border border-[#0058b0] rounded-md hover:bg-[#0058b0] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir
              </a>
            )}
            {item.download && (
              <a
                href={item.download}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#e9ecef] transition-colors"
              >
                <Download className="w-4 h-4" />
                Descargar
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
