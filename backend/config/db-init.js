import pool from './db.js'; // Import the pool from db.js

// SQL to create the tables
const createTablesSQL = [
    `
    CREATE TABLE IF NOT EXISTS \`users\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`username\` varchar(255) NOT NULL,
      \`email\` varchar(255) NOT NULL,
      \`password\` varchar(255) NOT NULL,
      \`created_at\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE KEY \`email\` (\`email\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `,
    `
    CREATE TABLE IF NOT EXISTS \`posts\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`title\` varchar(255) NOT NULL,
      \`content\` text NOT NULL,
      \`userId\` int NOT NULL,
      \`datePublished\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      KEY \`userId\` (\`userId\`),
      CONSTRAINT \`posts_ibfk_1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `,
    `
    CREATE TABLE IF NOT EXISTS \`likes\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`userId\` int NOT NULL,
      \`postId\` int NOT NULL,
      \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      KEY \`userId\` (\`userId\`),
      KEY \`postId\` (\`postId\`),
      CONSTRAINT \`likes_ibfk_1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`likes_ibfk_2\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `,
    `
    CREATE TABLE IF NOT EXISTS \`comments\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`postId\` int NOT NULL,
      \`userId\` int NOT NULL,
      \`datePublished\` datetime DEFAULT CURRENT_TIMESTAMP,
      \`content\` text NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`postId\` (\`postId\`),
      KEY \`userId\` (\`userId\`),
      CONSTRAINT \`comments_ibfk_1\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`comments_ibfk_2\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `,
    `
    CREATE TABLE IF NOT EXISTS \`followers\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`followerId\` int NOT NULL,
      \`followedId\` int NOT NULL,
      \`createdAt\` datetime DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      KEY \`followerId\` (\`followerId\`),
      KEY \`followedId\` (\`followedId\`),
      CONSTRAINT \`followers_ibfk_1\` FOREIGN KEY (\`followerId\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE,
      CONSTRAINT \`followers_ibfk_2\` FOREIGN KEY (\`followedId\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `,
    `
    CREATE TABLE IF NOT EXISTS \`codes\` (
      \`id\` int NOT NULL AUTO_INCREMENT,
      \`userId\` int NOT NULL,
      \`content\` text NOT NULL,
      \`language\` varchar(255) NOT NULL,
      \`datePublished\` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      \`title\` varchar(255) NOT NULL,
      PRIMARY KEY (\`id\`),
      KEY \`userId\` (\`userId\`),
      CONSTRAINT \`codes_ibfk_1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\` (\`id\`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `
];

async function initDatabase() {

    const connection = await pool.getConnection();

    try {
        // Loop through each SQL command and execute it
        for (const sql of createTablesSQL) {
            await connection.query(sql);
        }
        console.log('Database initialized successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    } finally {
        connection.release();
    }
}

// Call the function to initialize the database
initDatabase().catch((err) => {
    console.error('Initialization failed', err);
});
