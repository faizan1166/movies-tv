# Movies & TV Shows Backend (TypeScript - ESM) - Plain CRUD

## Overview
This is an ESM-based TypeScript Node.js + Express backend using MongoDB (Mongoose).
It provides simple CRUD APIs for movie/TV show entries (no validation).

## Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI`.
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development:
   ```bash
   npm run dev
   ```

The dev script uses `ts-node` with the ESM loader, so you can run TS files directly.

## Scripts
- `npm run dev` - run with ts-node ESM loader
- `npm run build` - compile to `dist/`
- `npm start` - run compiled JS

## API
- `GET /api/movies?limit=20&cursor=<lastId>` - cursor pagination (desc by _id)
- `POST /api/movies` - create
- `PUT /api/movies/:id` - update
- `DELETE /api/movies/:id` - delete
