# One AWS To Go: Backend

## REST(-like) API

**Authentication:** GitHub Token

| **Method** | **Route** | **Description** |
| ----- | ----- | ----- |
| `GET` | `/user` | Return user's information
| `GET` | `/forks` | Get all forks associated with the user and the application
| `GET` | `/forks/<fork_id>` | Get fork information
| `POST` | `/forks` | Create new fork |
| `PUT` | `/forks/<fork_id>/secrets` | Set fork secrets for IaC |
| `POST` | `/forks/<fork_id>/action/<action_name>`* | Trigger GitHub IaC Action |

**\* `<action_name>` = `up`|`down`|`setup`**

## Local Development

**Prerequisites:**
- Docker
- [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Setup
1. Setup Postgres SQL database with Docker **(this needs to be done only once)**:
    ```
    docker pull postgres
    docker run -e POSTGRES_USER=root -e POSTGRES_PASSWORD=root --name oatg-db -p 5432:5432 postgres
    ```

2. The database can then be started with command:
    ```
    docker start oatg-db
    ```

3. Set database connection string to `.env` (for Prisma migration script):
    ```
    DATABASE_URL=postgres://root:root@host.docker.internal:5432
    ```

4. Run Prisma migrations:
    ```
    npm run db:migrate
    ```

5. Set database connection string to `env.json` (for local dev with SAM):
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
  BackendFunction:
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
