import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';

type VersionResponse = {
  version: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<VersionResponse>
) {
  // Set cache headers (cache for 5 minutes)
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/therealtimex/realtimex/releases/latest',
    method: 'GET',
    headers: {
      'User-Agent': 'RealTimeX-Docs',
      'Accept': 'application/vnd.github.v3+json',
    },
    timeout: 5000,
  };

  const request = https.request(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        if (!data || typeof data !== 'string') {
          throw new Error('Empty response from GitHub API');
        }

        const parsed = JSON.parse(data);
        const version = parsed.tag_name || 'latest';

        console.log('Latest version from GitHub:', version);

        res.status(200).json({ version });
      } catch (error) {
        console.error('Failed to parse GitHub response:', error);
        res.status(500).json({
          version: 'latest',
          error: 'Failed to parse version info'
        });
      }
    });
  });

  request.on('error', (error) => {
    console.error('GitHub API request failed:', error);
    res.status(500).json({
      version: 'latest',
      error: error.message
    });
  });

  request.on('timeout', () => {
    request.destroy();
    console.warn('GitHub API request timed out');
    res.status(408).json({
      version: 'latest',
      error: 'Request timeout'
    });
  });

  request.end();
}
