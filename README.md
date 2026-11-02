# COMP229 Assignment 2 - MyPortfolio

Author: Jihyun Kim

React portfolio frontend and an Express/Mongoose backend using the `Portfolio` MongoDB database.

## Requirements

Node.js 22.12.0 or later, npm, and an accessible MongoDB database. Keep credentials in the local `.env` file, not in Git.

## Setup

From the project root:

```bash
npm install
npm run setup
```

`setup` creates `.env` from `.env.example` and generates a JWT secret. An existing `.env` is not overwritten. Edit `MONGODB_URI` in `.env` to use your database credentials and the database name `Portfolio`.

Install and start both development servers:

```bash
cd client
npm install
npm run dev
```

Frontend: `http://localhost:5173/`  
Backend: `http://localhost:3000/`

The backend root returns `Welcome to My Portfolio application.`

## API routes

Each resource (`contacts`, `projects`, `qualifications`, `users`) supports:

- `POST /api/{resource}`
- `GET /api/{resource}`
- `GET /api/{resource}/:id`
- `PUT /api/{resource}/:id`
- `DELETE /api/{resource}/:id`
- `DELETE /api/{resource}`

Authentication: `POST /auth/signin`, `GET /auth/signout`.

Create a test user through `POST /api/users`, then sign in and send its JWT as an Authorization Bearer token on protected routes. User update/delete requires that user's own token. Sign-out clears the cookie; the client must also remove its saved token. This implementation does not revoke every previously issued JWT on sign-out.

## Collection-wide delete tests

Use only disposable local-lab data. All collection-wide DELETE requests require a valid token, `NODE_ENV=development`, `ALLOW_BULK_DELETE=true`, and the request header `X-Confirm-Delete-All: DELETE ALL`. Restore `ALLOW_BULK_DELETE=false` after testing and restart the running server or stop it. These guards are additional lab safeguards, not an administrator role system.

## Submission

Submit the source ZIP, repository link and Word evidence document separately. Keep both generated `package-lock.json` files in version control. Exclude `.env`, `node_modules`, generated output and unredacted screenshots.

The Word report records the student's observed results. Three collection-wide delete requests returned `deletedCount: 0` against empty collections; the users bulk-delete request removed two users. The frontend retains Assignment 1's interface; API endpoints are tested separately rather than implying every page is connected to CRUD forms.
