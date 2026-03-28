import { Github, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#d0d7de] bg-[#f6f8fa] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-[#59636e]">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-[#cf222e] fill-current" />
            <span>por</span>
            <a
              href="https://osuc.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066cc] hover:underline font-medium"
            >
              Open Source UC
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/open-source-uc/awesome-uc-web-index"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#59636e] hover:text-[#1f2328] transition-colors"
            >
              <Github className="w-4 h-4" />
              Índice de proyectos
            </a>
            <span className="text-[#d0d7de]">·</span>
            <a
              href="https://github.com/open-source-uc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-[#59636e] hover:text-[#1f2328] transition-colors"
            >
              <Github className="w-4 h-4" />
              OSUC GitHub
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#d0d7de] text-center">
          <p className="text-xs text-[#59636e]">
            Datos obtenidos en tiempo real desde{" "}
            <a
              href="https://github.com/open-source-uc/awesome-uc-web-index"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0066cc] hover:underline"
            >
              open-source-uc/awesome-uc-web-index
            </a>
            . Los proyectos son de sus respectivos autores.
          </p>
        </div>
      </div>
    </footer>
  );
}
