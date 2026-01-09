import React, { useEffect, useState } from 'react';
import _meta from '../pages/changelog/_meta.json';

// Fallback version from changelog meta
const fallbackVersion = Object.keys(_meta)
  .filter((version) => !version.endsWith('.pre') && !version.includes('rc'))
  .reduce((a, b) =>
    0 < a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      ? a
      : b
  );

export default function BannerContent() {
  const [version, setVersion] = useState<string>(fallbackVersion);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLatestVersion() {
      try {
        // Fetch directly from GitHub API since static export doesn't support API routes
        const response = await fetch(
          'https://api.github.com/repos/therealtimex/realtimex/releases/latest',
          {
            method: 'GET',
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const version = data.tag_name || 'latest';

        if (isMounted && version && version !== 'latest') {
          setVersion(version);
        }
      } catch (error) {
        console.warn('Failed to fetch latest version from GitHub, using fallback:', error);
        // Keep fallback version
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    // Fetch version from GitHub API
    fetchLatestVersion();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <a href="https://realtimex.ai/" target="_blank" rel="noopener noreferrer">
      🚀 RealTimeX {version} is live! Update now →
    </a>
  );
}
