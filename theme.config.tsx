import React from 'react';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import _meta from './pages/changelog/_meta.json';

const newRelease = Object.keys(_meta)
  .filter((version) => !version.endsWith('.pre') && !version.includes('rc'))
  .reduce((a, b) =>
    0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      ? a
      : b
  );

import CustomImage from './components/CustomImage';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const config: DocsThemeConfig = {
  components: { img: CustomImage, Image: CustomImage },
  project: {
    link: 'https://x.com/RealTimeXai',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16">
        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
      </svg>
    )
  },
  chat: {
    link: 'https://discord.gg/cVPdVGqy',
  },
  docsRepositoryBase: 'https://github.com/therealtimex/RealTimeX-docs/tree/main',
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://github.com/therealtimex/RealTimeX" target="_blank">
          RealTimeX, Inc
        </a>
        .
      </span>
    )
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s ~ RealTimeX'
    }
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  feedback: {
    content: null,
  },
  head: function useHead() {
    const { title } = useConfig();
    const { route } = useRouter();
    const socialCard =
      route === '/' || !title
        ? 'https://docs.realtimex.ai/images/og.png'
        : `https://docs.realtimex.ai/api/og?title=${title}`;

    return (
      <>
        <meta name="msapplication-TileColor" content="#2f3136" />
        <meta name="theme-color" content="#2f3136" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content="All-in-one AI application that can do RAG, AI Agents, and much more with no code or infrastructure headaches." />
        <meta name="og:description" content="All-in-one AI application that can do RAG, AI Agents, and much more with no code or infrastructure headaches." />
        <meta property="og:url" content="http://docs.realtimex.ai"></meta>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="docs.realtimex.ai" />
        <meta property="twitter:title" content="RealTimeX | The all-in-one AI desktop app." />
        <meta property="twitter:description" content="All-in-one AI application that can do RAG, AI Agents, and much more with no code or infrastructure headaches." />
        <meta name="twitter:url" content="https://docs.realtimex.ai" />
        <meta name="og:title" content={title ? title + ' – RealTimeX Docs' : 'RealTimeX Docs'} />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="RealTimeX Docs" />
        <link rel="icon" href={`${basePath}/favicon.png`} type="image/png" />
      </>
    );
  },
  logo: (
    <>
      <img
        src={`${basePath}/images/logo.png`}
        alt="RealTimeX Docs Logo"
        style={{
        display: 'inline-block',
        height: '100%',
        maxHeight: '32px',
        width: 'auto',
        objectFit: 'contain',
        verticalAlign: 'middle'
      }}
      />
      <span style={{ marginLeft: '.7em', fontWeight: 700 }}>
        RealTimeX Docs
      </span>
    </>
  ),
  banner: {
    dismissible: true,
    key: `${newRelease}-release`,
    text: (
      <a href="https://realtimex.ai/" target="_blank">
        🚀 RealTimeX {newRelease} is live! Update now →
      </a>
    )
  }
}

export default config;