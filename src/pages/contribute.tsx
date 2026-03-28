import { Github, GitFork, FileJson, FolderOpen, CheckCircle, ArrowRight, MessageSquare, Star } from "lucide-react";

const STEPS = [
  {
    step: "1",
    title: "Fork del repositorio",
    description: "Haz un fork del repositorio de índice de datos en GitHub para tener tu propia copia donde trabajar.",
    action: { label: "Ir al repositorio", href: "https://github.com/open-source-uc/awesome-uc-web-index" },
    icon: <GitFork className="w-5 h-5 text-[#0066cc]" />,
  },
  {
    step: "2",
    title: "Elige la categoría correcta",
    description: "Dependiendo de lo que quieres agregar, elige entre Proyectos, Social o Documentos. Cada uno tiene su propia estructura.",
    icon: <FolderOpen className="w-5 h-5 text-[#0369a1]" />,
  },
  {
    step: "3",
    title: "Crea tu metadata.json",
    description: "Crea una carpeta con el slug de tu proyecto y un archivo metadata.json con la información requerida. Puedes usar las plantillas del repositorio.",
    action: { label: "Ver plantillas", href: "https://github.com/open-source-uc/awesome-uc-web-index/tree/main/templates" },
    icon: <FileJson className="w-5 h-5 text-[#9a6700]" />,
  },
  {
    step: "4",
    title: "Abre un Pull Request",
    description: "Una vez que hayas creado tu archivo de metadata, abre un Pull Request al repositorio principal con una descripción de tu proyecto.",
    icon: <Github className="w-5 h-5 text-[#8250df]" />,
  },
];

const CATEGORY_FORMATS = [
  {
    title: "Proyectos",
    path: "projects/web/ o projects/tools/",
    accent: "border-[#93c5fd] bg-[#dbeafe]",
    headerBg: "bg-[#0066cc]",
    fields: [
      { name: "name", required: true, desc: "Nombre del proyecto" },
      { name: "authors", required: true, desc: "Lista de creadores (@usuario o nombre)" },
      { name: "description", required: true, desc: "Descripción breve" },
      { name: "repo", required: false, desc: "URL del repositorio (obligatorio si no hay url)" },
      { name: "url", required: false, desc: "URL del sitio/demo (obligatorio si no hay repo)" },
      { name: "download", required: false, desc: "Link de descarga directa" },
      { name: "image", required: false, desc: "Nombre del archivo en media/" },
    ],
  },
  {
    title: "Social",
    path: "social/comunidades/, social/organizaciones/ o social/recreacion/",
    accent: "border-[#d2a8ff] bg-[#fbefff]",
    headerBg: "bg-[#8250df]",
    fields: [
      { name: "name", required: true, desc: "Nombre de la comunidad" },
      { name: "authors", required: true, desc: "Administradores o responsables" },
      { name: "description", required: true, desc: "Propósito del grupo" },
      { name: "url", required: false, desc: "Link de invitación (obligatorio si no hay repo)" },
      { name: "repo", required: false, desc: "Repositorio si es abierto (obligatorio si no hay url)" },
      { name: "download", required: false, desc: "Recursos adicionales" },
      { name: "image", required: false, desc: "Logo o banner" },
    ],
  },
  {
    title: "Documentos",
    path: "docs/apuntes/ o docs/plantillas/",
    accent: "border-[#7dd3fc] bg-[#e0f2fe]",
    headerBg: "bg-[#0369a1]",
    fields: [
      { name: "name", required: true, desc: "Título del documento" },
      { name: "authors", required: true, desc: "Creadores del contenido" },
      { name: "description", required: true, desc: "Resumen del contenido" },
      { name: "repo", required: false, desc: "URL del repositorio (obligatorio si no hay url)" },
      { name: "url", required: false, desc: "URL de visualización (obligatorio si no hay repo)" },
      { name: "resource_image", required: true, desc: "Nombre del .webp en /resources/" },
      { name: "download", required: false, desc: "Link directo de descarga" },
    ],
  },
];

export default function ContributePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-[#dbeafe] rounded-lg">
            <Star className="w-5 h-5 text-[#0066cc]" />
          </div>
          <h1 className="text-2xl font-bold text-[#1f2328]">Cómo contribuir</h1>
        </div>
        <p className="text-[#59636e] leading-relaxed">
          ¿Tienes un proyecto, comunidad o material académico relacionado con la UC? ¡Agrégalo al directorio Awesome UC! El proceso es simple: solo necesitas abrir un Pull Request en GitHub con la información de tu proyecto.
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-lg font-bold text-[#1f2328] mb-5 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-[#0066cc]" />
          Pasos para contribuir
        </h2>

        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white border border-[#d0d7de] rounded-xl hover:border-[#0066cc] transition-colors">
              <div className="shrink-0 w-8 h-8 bg-[#dbeafe] text-[#0066cc] rounded-full flex items-center justify-center text-sm font-bold border border-[#93c5fd]">
                {step.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {step.icon}
                  <h3 className="font-semibold text-[#1f2328]">{step.title}</h3>
                </div>
                <p className="text-sm text-[#59636e] leading-relaxed">{step.description}</p>
                {step.action && (
                  <a
                    href={step.action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#0066cc] hover:underline font-medium"
                  >
                    {step.action.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-bold text-[#1f2328] mb-2 flex items-center gap-2">
          <FileJson className="w-5 h-5 text-[#9a6700]" />
          Estructura del directorio
        </h2>
        <p className="text-sm text-[#59636e] mb-5">
          El repositorio sigue esta estructura. Cada proyecto vive en su propia carpeta con un <code className="px-1 py-0.5 bg-[#f6f8fa] border border-[#d0d7de] rounded text-xs text-[#cf222e] font-mono">metadata.json</code>.
        </p>

        <div className="bg-[#1f2328] rounded-xl p-5 font-mono text-sm text-[#e6edf3] overflow-x-auto mb-8">
          <pre>{`awesome-uc-data/
├── projects/
│   ├── web/
│   │   └── mi-proyecto/
│   │       ├── metadata.json
│   │       └── media/
│   └── tools/
│       └── mi-tool/
│           └── metadata.json
├── social/
│   ├── comunidades/
│   ├── organizaciones/
│   └── recreacion/
└── docs/
    ├── apuntes/
    │   └── IIC1103/
    │       ├── metadata.json
    │       └── resources/
    │           └── preview.webp
    └── plantillas/`}</pre>
        </div>

        <div className="space-y-6">
          {CATEGORY_FORMATS.map((cat) => (
            <div key={cat.title} className={`border-2 rounded-xl overflow-hidden ${cat.accent}`}>
              <div className={`${cat.headerBg} px-5 py-3`}>
                <h3 className="font-semibold text-white text-sm">{cat.title}</h3>
                <p className="text-white/70 text-xs mt-0.5 font-mono">{cat.path}</p>
              </div>
              <div className="p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-2 font-semibold text-[#1f2328] text-xs w-36">Campo</th>
                      <th className="pb-2 font-semibold text-[#1f2328] text-xs w-24">Estado</th>
                      <th className="pb-2 font-semibold text-[#1f2328] text-xs">Descripción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#d0d7de]/50">
                    {cat.fields.map((field) => (
                      <tr key={field.name}>
                        <td className="py-1.5 pr-4">
                          <code className="text-xs font-mono text-[#0066cc] bg-white px-1.5 py-0.5 rounded border border-[#d0d7de]">
                            {field.name}
                          </code>
                        </td>
                        <td className="py-1.5 pr-4">
                          {field.required ? (
                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-[#dbeafe] text-[#1d4ed8] rounded-full border border-[#93c5fd]">
                              Obligatorio
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-[#f6f8fa] text-[#59636e] rounded-full border border-[#d0d7de]">
                              Opcional
                            </span>
                          )}
                        </td>
                        <td className="py-1.5 text-xs text-[#59636e]">{field.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-[#f6f8fa] to-[#eff6ff] border border-[#d0d7de] rounded-2xl p-8 text-center">
        <MessageSquare className="w-10 h-10 mx-auto mb-4 text-[#0066cc]" />
        <h2 className="text-xl font-bold text-[#1f2328] mb-2">¿Necesitas ayuda?</h2>
        <p className="text-sm text-[#59636e] mb-5 max-w-md mx-auto">
          Si tienes dudas sobre cómo contribuir, puedes abrir un issue en el repositorio o contactar a Open Source UC.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://github.com/open-source-uc/awesome-uc-web-index/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0066cc] text-white text-sm font-semibold rounded-lg hover:bg-[#0058b0] transition-colors"
          >
            <Github className="w-4 h-4" />
            Abrir un issue
          </a>
          <a
            href="https://osuc.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#1f2328] text-sm font-semibold rounded-lg border border-[#d0d7de] hover:bg-[#f6f8fa] transition-colors"
          >
            Visitar OSUC
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
