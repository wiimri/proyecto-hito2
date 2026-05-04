# 05 - Contrato de datos API REST

Base URL: `/api`

Formato de error general:

```json
{
  "message": "Descripcion del error",
  "errors": []
}
```

## Autenticacion

### POST /auth/register

Registra un usuario.

Request:

```json
{
  "fullName": "Camila Rojas",
  "email": "camila@mail.com",
  "phone": "+56 9 1234 5678",
  "password": "12345678"
}
```

Response 201:

```json
{
  "user": {
    "id": 1,
    "fullName": "Camila Rojas",
    "email": "camila@mail.com",
    "phone": "+56 9 1234 5678"
  },
  "token": "jwt.token"
}
```

### POST /auth/login

Inicia sesion.

Request:

```json
{
  "email": "camila@mail.com",
  "password": "12345678"
}
```

Response 200:

```json
{
  "user": {
    "id": 1,
    "fullName": "Camila Rojas",
    "email": "camila@mail.com"
  },
  "token": "jwt.token"
}
```

## Usuarios

### GET /users/me

Obtiene perfil del usuario autenticado.

Headers:

```text
Authorization: Bearer jwt.token
```

Response 200:

```json
{
  "id": 1,
  "fullName": "Camila Rojas",
  "email": "camila@mail.com",
  "phone": "+56 9 1234 5678",
  "avatarUrl": null,
  "stats": {
    "activePosts": 3,
    "favorites": 5
  }
}
```

### PUT /users/me

Actualiza perfil.

Request:

```json
{
  "fullName": "Camila Rojas",
  "phone": "+56 9 9876 5432",
  "avatarUrl": "https://cdn.example.com/avatar.jpg"
}
```

Response 200:

```json
{
  "id": 1,
  "fullName": "Camila Rojas",
  "email": "camila@mail.com",
  "phone": "+56 9 9876 5432",
  "avatarUrl": "https://cdn.example.com/avatar.jpg"
}
```

## Categorias

### GET /categories

Lista categorias.

Response 200:

```json
[
  {
    "id": 1,
    "name": "Tecnologia",
    "description": "Notebooks, celulares y accesorios"
  }
]
```

## Publicaciones

### GET /posts

Lista publicaciones con filtros.

Query params:

```text
search=notebook&categoryId=1&commune=Santiago&page=1&limit=12
```

Response 200:

```json
{
  "data": [
    {
      "id": 2,
      "title": "Notebook Lenovo 14 pulgadas",
      "price": 320000,
      "condition": "Usado - bueno",
      "commune": "Santiago",
      "status": "active",
      "category": {
        "id": 1,
        "name": "Tecnologia"
      },
      "seller": {
        "id": 1,
        "fullName": "Camila Rojas"
      },
      "coverImage": "https://cdn.example.com/notebook.jpg"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 28
  }
}
```

### GET /posts/:id

Obtiene detalle de una publicacion.

Response 200:

```json
{
  "id": 2,
  "title": "Notebook Lenovo 14 pulgadas",
  "description": "Equipo ideal para estudio y trabajo remoto.",
  "price": 320000,
  "condition": "Usado - bueno",
  "commune": "Santiago",
  "status": "active",
  "category": {
    "id": 1,
    "name": "Tecnologia"
  },
  "seller": {
    "id": 1,
    "fullName": "Camila Rojas",
    "phone": "+56 9 1234 5678"
  },
  "images": [
    {
      "id": 10,
      "imageUrl": "https://cdn.example.com/notebook.jpg",
      "altText": "Notebook Lenovo sobre escritorio",
      "isCover": true
    }
  ],
  "createdAt": "2026-04-26T12:00:00.000Z"
}
```

### POST /posts

Crea publicacion. Requiere autenticacion.

Headers:

```text
Authorization: Bearer jwt.token
```

Request:

```json
{
  "categoryId": 1,
  "title": "Notebook Lenovo 14 pulgadas",
  "description": "Equipo ideal para estudio y trabajo remoto.",
  "price": 320000,
  "condition": "Usado - bueno",
  "commune": "Santiago",
  "images": [
    {
      "imageUrl": "https://cdn.example.com/notebook.jpg",
      "altText": "Notebook Lenovo sobre escritorio",
      "isCover": true
    }
  ]
}
```

Response 201:

```json
{
  "id": 2,
  "categoryId": 1,
  "userId": 1,
  "title": "Notebook Lenovo 14 pulgadas",
  "description": "Equipo ideal para estudio y trabajo remoto.",
  "price": 320000,
  "condition": "Usado - bueno",
  "commune": "Santiago",
  "status": "active",
  "images": [
    {
      "id": 10,
      "imageUrl": "https://cdn.example.com/notebook.jpg",
      "isCover": true
    }
  ]
}
```

### PUT /posts/:id

Actualiza una publicacion propia.

Request:

```json
{
  "categoryId": 2,
  "title": "Notebook Lenovo 14 pulgadas actualizado",
  "description": "Incluye cargador original.",
  "price": 300000,
  "condition": "Usado - bueno",
  "commune": "Providencia",
  "status": "active"
}
```

Response 200:

```json
{
  "id": 2,
  "title": "Notebook Lenovo 14 pulgadas actualizado",
  "price": 300000,
  "status": "active"
}
```

### DELETE /posts/:id

Elimina o desactiva una publicacion propia.

Response 200:

```json
{
  "message": "Publicacion eliminada correctamente"
}
```

## Favoritos

### POST /favorites

Guarda publicacion como favorita.

Request:

```json
{
  "postId": 2
}
```

Response 201:

```json
{
  "id": 1,
  "userId": 1,
  "postId": 2
}
```

### GET /favorites

Lista favoritos del usuario autenticado.

Response 200:

```json
[
  {
    "id": 1,
    "post": {
      "id": 2,
      "title": "Notebook Lenovo 14 pulgadas",
      "price": 320000
    }
  }
]
```

### DELETE /favorites/:postId

Quita favorito.

Response 200:

```json
{
  "message": "Favorito eliminado correctamente"
}
```

## Mensajes

### POST /messages

Envia mensaje al vendedor.

Request:

```json
{
  "postId": 2,
  "receiverId": 1,
  "body": "Hola, sigue disponible?"
}
```

Response 201:

```json
{
  "id": 1,
  "postId": 2,
  "senderId": 3,
  "receiverId": 1,
  "body": "Hola, sigue disponible?",
  "createdAt": "2026-04-26T12:15:00.000Z"
}
```

### GET /messages

Lista mensajes del usuario autenticado.

Response 200:

```json
[
  {
    "id": 1,
    "post": {
      "id": 2,
      "title": "Notebook Lenovo 14 pulgadas"
    },
    "sender": {
      "id": 3,
      "fullName": "Daniel Soto"
    },
    "receiver": {
      "id": 1,
      "fullName": "Camila Rojas"
    },
    "body": "Hola, sigue disponible?",
    "createdAt": "2026-04-26T12:15:00.000Z"
  }
]
```
