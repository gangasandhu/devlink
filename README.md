# devlink
The project is centred in the technology and content creation space, aiming to provide a platform where users can engage in coding, blogging, and social interactions. It primarily caters to developers, content creators, and tech enthusiasts interested in programming and blogging.

# How to run:

clone the repository

create a .env file in client folder with:

```bash
VITE_COMPILE_API_KEY="your judge0 api key"
VITE_COMPILE_API_URL="your rapid judge0 api url"
VITE_BACKEND_API_URL="http://localhost:3000"
```

create a .env file in backend folder with:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD='your-password'
DB_NAME=devlink
PORT=3000
JWT_SECRET='your-secret'
CLIENT_URL=http://localhost
```

## For Production

```bash
docker compose up -d
```

## For Development

Start mysql db:
```console
mysql -u root -p
```
cd backend:

```bash
npm install
```

```bash
node ./config/db-init.js
```
```bash
npm run dev
```

cd client:
```bash
npm install
```
```bash
npm run dev
```

## For Production

```bash
docker compose up -d
```

