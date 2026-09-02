# Maze Master

A browser maze game built with React, React Router, and Vite. Each run generates a
fresh perfect maze (recursive backtracker algorithm — every cell reachable by exactly
one path), so no two chambers are the same.

## Play

- **Novice**, **Adept**, and **Master** difficulties, each a larger maze.
- Move with the arrow keys or WASD.
- Time and move count are tracked live; your best result per difficulty is saved
  locally in the browser and viewable on the Vault (records) page.

## Development

```bash
npm install
npm run dev
```

`npm run build` produces the production bundle in `dist/`, which Netlify serves via
`netlify.toml`.
