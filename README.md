
# Louvre Backend

This is a mini online version of the Louvre museum in which guests
 can login and view ancient art pieces and know about their 
 history and artists. Also, museum staff can manage art pieces 
 and view system guests. We will do this by building a 
 simple backend microservice in NodeJS, 
 and a frontend service based on ReactJS to consume this API. 
 The project will have these functionalities:

● JWT Authentication

● RBAC (role based authentication)

● Performing CRUD on the api

## Useful Links

Deployment: https://louvre-backend.omarafifi.com/

Swagger API Docs: https://louvre-backend.omarafifi.com/api-docs/

Frontend Github: https://github.com/omarafifii/Louvre-frontend

## API Reference

### Public

#### Add User

```http
  POST /user
```



| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**.  |
| `role` | `string` | **Required** (ADMIN/GUEST).  |
| `phone_number` | `string` | |

#### Get login token

```http
  POST /login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. |
| `password` | `string` | **Required**.  |

### Protected

#### Get art pieces

```http
  GET /art
```

Accessible by ADMIN and Guest.

#### Add art pieces

```http
  POST /art
```

Accessible by ADMIN.

#### Edit art pieces

```http
  PUT /art
```

Accessible by ADMIN.

#### Delete art pieces

```http
  DELETE /art
```

Accessible by ADMIN.

#### Get list of users

```http
  GET /users
```

Accessible by ADMIN.

 
