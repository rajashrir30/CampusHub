# CampusHub

CampusHub is a full-stack notes, previous-year questions, and doubt-solving platform for college communities.

## Run locally

1. Install Node 18+, MongoDB locally (or use MongoDB Atlas), and run `npm run install:all`.
2. Copy `server/.env.example` to `server/.env` and `client/.env.example` to `client/.env`.
3. Set `MONGO_URI`, `JWT_SECRET`, and `JWT_REFRESH_SECRET`. Cloudinary is required for note uploads: set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
4. Run `npm run dev`, then open `http://localhost:5173`.
5. Create your first account from the Signup page. This project does not include seeded users or fake content.

## Design decisions

- Trending uses `0.55 * netVoteScore + 0.25 * normalizedDownloads + 0.20 * recencyScore`, with a logarithmic download normalization and exponential time decay. The isolated formula is in `server/src/utils/ranking.js`.
- Note-upload notifications are debounced by subject and semester for 15 minutes and emitted as one digest. The in-memory map is appropriate for a small deployment; Redis plus a queue is the natural multi-instance upgrade.
- Read-heavy lists use a 60-second `node-cache` cache. Cache invalidation happens on writes; Redis is the next step at scale.

Note uploads are limited to 10 MB and are streamed to Cloudinary. The database stores only the secure URL and Cloudinary public ID.

## API

The Express API lives under `/api`: `/auth`, `/notes`, `/doubts`, `/users`, `/notifications`, `/search`, and `/admin`.
