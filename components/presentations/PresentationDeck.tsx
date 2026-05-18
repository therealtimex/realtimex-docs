import Head from "next/head";
import { type ReactNode, useEffect, useRef } from "react";

export type DeckSlide = {
  id: string;
  eyebrow: string;
  title: string;
  accent?: string;
};

type PresentationDeckProps = {
  pageTitle: string;
  pageDescription: string;
  pagePath: string;
  slides: DeckSlide[];
  renderSlide: (slide: DeckSlide) => ReactNode;
};

const accentGradients: Record<string, string> = {
  coral:
    "radial-gradient(circle at 18% 14%, rgba(255, 142, 114, 0.22), transparent 28%), radial-gradient(circle at 86% 22%, rgba(93, 185, 255, 0.15), transparent 32%), linear-gradient(180deg, #07101b 0%, #09111f 55%, #0d182c 100%)",
  blue:
    "radial-gradient(circle at 20% 14%, rgba(93, 185, 255, 0.2), transparent 28%), radial-gradient(circle at 82% 78%, rgba(112, 239, 194, 0.1), transparent 30%), linear-gradient(180deg, #06101e 0%, #081220 52%, #0c1628 100%)",
  mint:
    "radial-gradient(circle at 18% 14%, rgba(112, 239, 194, 0.18), transparent 28%), radial-gradient(circle at 82% 18%, rgba(93, 185, 255, 0.14), transparent 32%), linear-gradient(180deg, #06111b 0%, #09141f 54%, #0c1823 100%)",
  gold:
    "radial-gradient(circle at 16% 16%, rgba(255, 207, 102, 0.2), transparent 28%), radial-gradient(circle at 84% 18%, rgba(176, 141, 255, 0.12), transparent 30%), linear-gradient(180deg, #0a1018 0%, #0d1420 54%, #121a28 100%)",
  violet:
    "radial-gradient(circle at 18% 12%, rgba(176, 141, 255, 0.2), transparent 30%), radial-gradient(circle at 84% 82%, rgba(112, 239, 194, 0.1), transparent 28%), linear-gradient(180deg, #07101b 0%, #0b1322 54%, #10192b 100%)",
};

export default function PresentationDeck({
  pageTitle,
  pageDescription,
  pagePath,
  slides,
  renderSlide,
}: PresentationDeckProps) {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const canonicalUrl = `https://docs.realtimex.ai${pagePath}`;

  useEffect(() => {
    let isMounted = true;
    let deckInstance:
      | { destroy?: () => void; initialize?: () => Promise<unknown> }
      | undefined;

    const mountDeck = async () => {
      const root = deckRef.current;
      if (!root || !isMounted) return;

      const RevealModule = await import("reveal.js");
      const NotesModule = await import("reveal.js/plugin/notes");
      if (!isMounted || !root) return;

      const Reveal = RevealModule.default;
      const RevealNotes = NotesModule.default;

      deckInstance = new Reveal(root, {
        hash: true,
        controls: true,
        controlsLayout: "edges",
        controlsBackArrows: "faded",
        progress: true,
        slideNumber: false,
        navigationMode: "linear",
        transition: "slide",
        backgroundTransition: "fade",
        touch: true,
        center: false,
        width: 1440,
        height: 900,
        margin: 0.06,
        minScale: 0.2,
        maxScale: 2,
        pdfSeparateFragments: false,
        fragmentInURL: true,
        plugins: [RevealNotes],
      });

      await deckInstance.initialize?.();
    };

    mountDeck();

    return () => {
      isMounted = false;
      deckInstance?.destroy?.();
    };
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="noindex,follow" />
        <meta name="theme-color" content="#07101b" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="RealTimeX Docs" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Head>

      <div className="rtx-presentation-page">
        <div className="reveal-viewport rtx-reveal-viewport has-dark-background">
          <div className="reveal realtimex-presentation" ref={deckRef}>
            <div className="slides">
              {slides.map((slide) => (
                <section
                  key={slide.id}
                  id={slide.id}
                  data-background-gradient={
                    accentGradients[slide.accent || "blue"] ||
                    accentGradients.blue
                  }
                >
                  <div className={`rtx-slide-surface accent-${slide.accent || "blue"}`}>
                    <div className="slide-accent" />
                    {renderSlide(slide)}
                  </div>
                  <aside className="notes">
                    {slide.eyebrow}. {slide.title}
                  </aside>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
