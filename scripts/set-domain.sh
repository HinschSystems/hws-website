#!/usr/bin/env bash
# Usage: ./scripts/set-domain.sh https://yourdomain.com
# Rewrites the canonical / Open Graph / sitemap / robots / JSON-LD domain in one pass.
set -euo pipefail
NEW="${1:?Usage: $0 https://yourdomain.com}"
NEW="${NEW%/}"
OLD="https://hinschsystems.com"
cd "$(dirname "$0")/.."
for f in index.html robots.txt sitemap.xml; do
  # portable in-place edit (GNU + BSD sed)
  sed "s#${OLD}#${NEW}#g" "$f" > "$f.tmp" && mv "$f.tmp" "$f"
done
echo "Domain set to ${NEW} in index.html, robots.txt, sitemap.xml"
echo "Note: the mailto address in index.html is NOT changed by this script."
