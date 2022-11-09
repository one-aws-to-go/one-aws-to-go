# One AWS To Go: Backend

## REST(-like) API

**Authorization:**
| **Header** | **Content** | 
| ----- | ----- |
| `Authorization` | GitHub Bearer Token |

If the authorization header is missing, the response will automatically be **401**.

| **Route** | **Description** |
| ----- | ----- |
| [`GET /user`](#get-user) | Return the user's information
| [`GET /templates`](#get-template) | Return all fork templates
| [`GET /templates/<template_id>`](#get-templatestemplate_id) | Get a single fork template
| [`GET /forks`](#get-forks) | Get all forks associated with the user and the application
| [`POST /forks`](#post-forks) | Create new fork |
| [`GET /forks/<fork_id>`](#get-forksfork_id) | Get fork information
| [`PUT /forks/<fork_id>/secrets`](#put-forksfork_idsecrets) | Set fork secrets for IaC |
| [`POST /forks/<fork_id>/actions/<action_name>`](#post-forksfork_idactionaction_name) | Trigger GitHub IaC Action |
| [`GET /forks/<fork_id>/history`](#get-forksfork_idhistory) | Get fork's GitHub IaC Action history |
| [`GET /forks/<fork_id>/history/logs/<logs_id>`](#get-forksfork_idhistorylogslogs_id-todo) (TODO) | Get fork's GitHub IaC Action logs |

### **`GET /user`**

**Request body:** -

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **200** | GitHub user was found | [`GitHubUser`](./src/model.ts) |
| **404** | GitHub user not found | [`ErrorMessage`](./src/model.ts) |

### **`GET /templates`**

**Request body:** -

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **200** | Found templates | [`ForkTemplate[]`](./src/model.ts) |

### **`GET /templates/<template_id>`**

**Request route params:**
- `template_id`: Unique identifier of the template.

**Request body:** -

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **200** | Found template | [`ForkTemplate`](./src/model.ts) |

### **`GET /forks`**

**Request body:** -

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **200** | Found forks | [`Fork[]`](./src/model.ts) |

### **`POST /forks`**

**Request body:** [CreateForkArgs](./src/model.ts)

**NOTE:** Fork name must be must be lower-case, alphanumeric and between 3-10 characters!

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **201** | Created fork | [`ExtendedFork`](./src/model.ts) |
| **400** | Validation failed | [`ErrorMessage`](./src/model.ts) |

### **`GET /forks/<fork_id>`**

**Request route params:**
- `fork_id`: Unique identifier of the fork.

**Request body:** -

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **200** | Found fork | [`ExtendedFork`](./src/model.ts) |
| **404** | Fork not found | [`ErrorMessage`](./src/model.ts) |

### **`PUT /forks/<fork_id>/secrets`**

**Request route params:**
- `fork_id`: Unique identifier of the fork.

**Request body:** [ForkAwsSecretArgs](./src/model.ts)

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **204** | Secrets set | - |
| **400** | Validation failed | [`ErrorMessage`](./src/model.ts) |

### **`POST /forks/<fork_id>/actions/<action_name>`**

**Request route params:**
- `fork_id`: Unique identifier of the fork.
- `action_name`*: Name of the action to be triggered.

**\* Action names can differ between the templates!**

The default template contains the following actions:
- `up`: Create cloud resources defined in the fork IaC.
- `down`: Destroy cloud resources created by the fork IaC.
- `init`: Initialize IaC backend for the fork. **This must be done before any other actions can be triggered!**

**Request body:** -

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **202** | Action triggered | - |
| **503** | Action could not be triggered | [`ErrorMessage`](./src/model.ts) |

### `GET /forks/<fork_id>/history`

**Request route params:**
- `fork_id`: Unique identifier of the fork.

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **200** | Found action history | [`ForkActionRun`](./src/model.ts) |

### `GET /forks/<fork_id>/history/logs/<logs_id>` (TODO)

**Request route params:**
- `fork_id`: Unique identifier of the fork.
- `logs_id`: Logs ID (see [`ForkActionRun.logsId`](./src/model.ts)).

**Responses:**
| **Status** | **Description** | **Body** |
| ----- | ----- | ----- |
| **200** | Action logs | TODO |


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
    DATABASE_URL=postgres://root:root@localhost:5432
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

### Database Deed

Seed values can be inserted into the database with the following command:
```
npm run db:seed
```
