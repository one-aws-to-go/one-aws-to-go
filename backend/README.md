# One AWS To Go: Backend

## REST API

| **Method** | **Route** | **Description** |
| ----- | ----- | ----- |
| `GET` | TODO | TODO

## Local Development

**Prerequisites:**
- Docker
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Setup
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

4. Set database connection string to `env.json` (create if it doesn't exist):
    ```json
    {
      "BackendFunction": {
        "DATABASE_URL": "postgres://root:root@host.docker.internal:5432"
      }
    }
    ```

### Run

(The [setup](#setup) must be completed and the database container must be running!)

The backend can be started in local development environment with SAM:
```
npm run dev
```

### Local API Gateway

In local development environment, API Gateway is defined in [`template.yaml`](./template.yaml):
```yaml
...
Resources:
  BackedndFunction:
    ...
    Events:
      ApiExample:
        Type: Api # This defines the event as an API Gateway event!
        Properties:
          Path: /example
          Method: get
      AnotherApiExample:
        ...
```

**NOTE!** This only affects the local API Gateway created with SAM, which is why the events should also be added to the [API Gateway created with IaC](../iac/solution/modules/api-gateway/api-gateway.tf).
