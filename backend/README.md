# One AWS To Go: Backend

## Local Development

1. Setup Postgres SQL database with Docker:
    ```
    docker pull postgres
    docker run -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root --name oatg-db -p 5432:5432 postgres
    ```

2. The database can then be started with command:
    ```
    docker start oatg-db
    ```

3. Run Prisma migrations:
    ```
    npm run db:migrate
    ```

4. Set database connection string env variable to `.env`:
    ```
    DATABASE_URL=postgres://root:root@localhost:5432
    ```

5. Build and start backend:
    ```
    npm run build && npm start
    ```
