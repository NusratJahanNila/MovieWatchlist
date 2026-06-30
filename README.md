1. npm init -y
2. npm i express
3. npm i nodemon --save-dev
4. package.json:
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon src/server.js",
        "dev": "nodemon src/server.js"
    },
    "type": "module",
# ------------------------------------------
5. PostgreSQL: PostgreSQL (often pronounced "post-gress-Q-L") is a powerful, open-source relational database system. It uses a structured, table-based format and a strict schema, adhering to the principles of SQL (Structured Query Language)
    npx neonctl@latest init
# ----------------------------------------------
6. Prisma: Prisma হলো Node.js এবং TypeScript-এর জন্য তৈরি একটি আধুনিক ORM (Object-Relational Mapper) । সহজ ভাষায়, এটি আপনার অ্যাপ্লিকেশন এবং ডেটাবেসের মধ্যে একটি 'সেতু' বা 'অনুবাদক' হিসেবে কাজ করে, যা ডেটাবেস নিয়ে কাজ করাকে অনেক সহজ এবং নিরাপদ করে তোলে
    npx prisma init
    npm i prisma --save-dev
    npm i @prisma/client

//jwt: npm i jsonwebtoken

// to generate token: gitbash--> openssl rand -base64 32 -->enter









//common for server.js to handle errors:
----------------------------------------
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:',err );
    server.close(async() => {
    // Disconnect from the database
    await disconnectDB();
    process.exit(1); // Exit the process with an error code
  });
});

//handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    disconnectDB();
    process.exit(1);
});

//Graceful shutdown
process.on('SIGINT', async () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});

//Movie Watchlist Route: 
Auth-login, register
Movie- get all movies
User - Profile
Watchlist