# 01 - Boceto de vistas del proyecto

Tema: marketplace local llamado **Mercado Vecino**.

## Pantalla 1: Pagina principal publica

Distribucion:

```text
+---------------------------------------------------------------+
| Logo Mercado Vecino | Inicio | Publicaciones | Ingresar       |
+---------------------------------------------------------------+
| Hero: titulo, bajada, CTA "Ver publicaciones", "Crear cuenta" |
|                                       | Card producto destacado|
+---------------------------------------------------------------+
| Categorias: Tecnologia | Hogar | Deportes | Servicios         |
+---------------------------------------------------------------+
```

Componentes:
- Header con navegacion principal.
- Hero con propuesta de valor.
- Botones de accion.
- Card de publicacion destacada.
- Grilla de categorias.

## Pantalla 2: Registro de usuarios publica

Distribucion:

```text
+---------------------------------------------------------------+
| Texto de apoyo del registro       | Formulario                 |
|                                   | Nombre completo            |
|                                   | Email                      |
|                                   | Telefono                   |
|                                   | Contrasena                 |
|                                   | Boton Registrarme          |
+---------------------------------------------------------------+
```

Componentes:
- Formulario de registro.
- Campos obligatorios para nombre, email y contrasena.
- Campo opcional de telefono.
- Enlace a inicio de sesion.

## Pantalla 3: Inicio de sesion publica

Distribucion:

```text
+---------------------------------------------------------------+
| Texto de apoyo login             | Formulario                  |
|                                  | Email                       |
|                                  | Contrasena                  |
|                                  | Boton Ingresar demo         |
+---------------------------------------------------------------+
```

Componentes:
- Formulario de login.
- Guardado de usuario en `localStorage`.
- Enlace hacia registro.

## Pantalla 4: Mi perfil privada

Distribucion:

```text
+--------------------------+------------------------------------+
| Avatar usuario           | Mis publicaciones                  |
| Email                    | Lista de publicaciones             |
| Estadisticas             | Boton Nueva publicacion            |
+--------------------------+------------------------------------+
```

Componentes:
- Resumen del usuario.
- Indicadores de publicaciones, ventas y valoracion.
- Listado de publicaciones propias.
- Acceso a crear publicacion.

## Pantalla 5: Formulario para crear publicacion privada

Distribucion:

```text
+---------------------------------------------------------------+
| Texto explicativo        | Formulario                         |
|                          | Titulo                             |
|                          | Descripcion                        |
|                          | Precio | Categoria                 |
|                          | Estado | Comuna                    |
|                          | URL imagen                         |
|                          | Boton Publicar                     |
+---------------------------------------------------------------+
```

Componentes:
- Titulo.
- Descripcion.
- Precio.
- Categoria.
- Estado del producto.
- Comuna.
- Imagen.
- Boton de envio.

## Pantalla 6: Galeria de publicaciones publica

Distribucion:

```text
+---------------------------------------------------------------+
| Titulo de seccion                    | Buscador | Categoria   |
+---------------------------------------------------------------+
| Card producto | Card producto | Card producto | Card producto |
| Foto          | Foto          | Foto          | Foto          |
| Titulo/precio | Titulo/precio | Titulo/precio | Titulo/precio |
+---------------------------------------------------------------+
```

Componentes:
- Buscador.
- Filtro por categoria.
- Grilla de cards.
- Boton para ver detalle.

## Pantalla 7: Detalle de publicacion publica

Distribucion:

```text
+--------------------------------+------------------------------+
| Imagen grande del producto     | Categoria                    |
|                                | Titulo                       |
|                                | Precio                       |
|                                | Descripcion                  |
|                                | Estado / Ubicacion / Vendedor|
|                                | Boton Contactar              |
+--------------------------------+------------------------------+
```

Componentes:
- Imagen principal.
- Datos completos de publicacion.
- Datos de vendedor.
- Accion de contacto.
- Boton para volver a galeria.
