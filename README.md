# Turkey Prokladka

Turkish mini landing page for a football YouTube channel.

## Structure

- `index.html` — page markup and Turkish copy
- `styles.css` — responsive YouTube-inspired red/black design
- `script.js` — YouTube CTA URL + click event for `dataLayer`
- `favicon.svg` — simple 90+ favicon

## YouTube channel URL

Set the final destination in `script.js`:

```js
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/your-channel";
```

The CTA emits the event `youtube_channel_click` into `window.dataLayer` when clicked, so GTM/GA4 can listen to it if needed.

## Deploy

This is a static site and can be deployed directly to Cloudflare Pages, Vercel, Netlify, GitHub Pages, or any regular hosting.
