import { useMemo, useState } from "react";

type AboutLink = {
  label: string;
  href: string;
};

function resolvePublicUrl(p: string): string {
  // Respeta BASE_URL (por ejemplo si se deploya en subcarpeta).
  // Soporta entradas como "/imagenes/foto.jpg" o "imagenes/foto.jpg".
  if (/^https?:\/\//i.test(p)) return p;
  const base = (import.meta as any).env?.BASE_URL || "/";
  const b = String(base).endsWith("/") ? String(base) : `${base}/`;
  const pp = String(p).replace(/^\/+/, "");
  return `${b}${pp}`;
}

export default function AboutMeSection({
  name,
  headline,
  bioTitle,
  bio,
  photoSrc,
  location,
  linkedinUrl,
  email,
  links,
}: {
  name: string;
  headline: string;
  bioTitle?: string;
  bio: string[];
  photoSrc?: string;
  location?: string;
  linkedinUrl?: string;
  email?: string;
  links?: AboutLink[];
}) {
  const [imgError, setImgError] = useState(false);

  const resolvedPhotoSrc = photoSrc ? resolvePublicUrl(photoSrc) : undefined;

  const initials = useMemo(() => {
    const parts = String(name || "")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const a = parts[0]?.[0] || "A";
    const b = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
    return `${a}${b}`.toUpperCase();
  }, [name]);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-sky-200/70 via-blue-200/40 to-indigo-200/40 blur-2xl" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-200/40 via-sky-200/30 to-blue-200/40 blur-2xl" />

      <div className="relative p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              {resolvedPhotoSrc && !imgError ? (
                <img
                  src={resolvedPhotoSrc}
                  alt={name}
                  className="h-24 w-24 md:h-28 md:w-28 rounded-3xl object-cover ring-4 ring-white shadow"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="h-24 w-24 md:h-28 md:w-28 rounded-3xl grid place-items-center bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 text-white shadow ring-4 ring-white">
                  <div className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {initials}
                  </div>
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="text-xs font-semibold text-blue-700/90">
                Sobre mí
              </div>
              <h2 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
                {name}
              </h2>
              <div className="mt-1 text-sm md:text-base text-slate-600">
                {headline}
              </div>
              {location ? (
                <div className="mt-2 text-xs text-slate-500">{location}</div>
              ) : null}
            </div>
          </div>

          {linkedinUrl || email || (links && links.length) ? (
            <div className="flex flex-wrap gap-2 md:justify-end">
              {linkedinUrl ? (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                    className="text-[#0A66C2]"
                  >
                    <path
                      fill="currentColor"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.368-1.85 3.6 0 4.268 2.368 4.268 5.452v6.289zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.814 20.452H3.861V9h2.953v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                  <span className="font-medium">LinkedIn</span>
                </a>
              ) : null}

              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition"
                  aria-label="Email"
                  title={email}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-hidden="true"
                    className="text-slate-600"
                  >
                    <path
                      fill="currentColor"
                      d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 4.236-8 4.8-8-4.8V6l8 4.8L20 6v2.236z"
                    />
                  </svg>
                  <span className="font-medium">{email}</span>
                </a>
              ) : null}

              {links && links.length
                ? links.map((l) => (
                    <a
                      key={`${l.label}-${l.href}`}
                      href={l.href}
                      target={/^https?:\/\//i.test(l.href) ? "_blank" : undefined}
                      rel={/^https?:\/\//i.test(l.href) ? "noreferrer" : undefined}
                      className="rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm text-slate-700 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition"
                    >
                      {l.label}
                    </a>
                  ))
                : null}
            </div>
          ) : null}
        </div>

        {bio && bio.length ? (
          <div className="mt-5 space-y-3 text-sm md:text-[15px] leading-relaxed text-slate-700">
            {bioTitle ? (
              <div className="text-sm font-semibold text-slate-900">
                {bioTitle}
              </div>
            ) : null}
            {bio.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

