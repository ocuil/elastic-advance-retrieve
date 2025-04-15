![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-elastic-advance-retrieve

Este es un nodo comunitario para n8n. Te permite utilizar Elasticsearch directamente en tus flujos de trabajo de n8n, ejecutando consultas avanzadas para recuperar documentos.

Elasticsearch es un motor de búsqueda y análisis distribuido, diseñado para ejecutar consultas complejas sobre grandes volúmenes de datos de manera rápida y escalable.

[n8n](https://n8n.io/) es una plataforma de automatización de flujos de trabajo con [licencia de código justo](https://docs.n8n.io/reference/license/).

[Instalación](#instalación)  
[Operaciones](#operaciones)  
[Credenciales](#credenciales)  
[Compatibilidad](#compatibilidad)  
[Uso](#uso)  
[Recursos](#recursos)  

## Instalación

Sigue la [guía de instalación](https://docs.n8n.io/integrations/community-nodes/installation/) en la documentación de nodos comunitarios de n8n.

## Operaciones

Este nodo se implementa como un subnodo y soporta las siguientes operaciones:

- **Búsqueda de documentos**: Permite realizar consultas avanzadas en Elasticsearch utilizando el lenguaje de consulta DSL (Domain Specific Language) de Elasticsearch en formato JSON.

## Credenciales

Para autenticarte con Elasticsearch, este nodo ofrece tres métodos de autenticación:

### Autenticación básica (usuario/contraseña)
- **Host**: URL de tu instancia de Elasticsearch (ej: http://localhost:9200)
- **Usuario**: Tu nombre de usuario para Elasticsearch
- **Contraseña**: Tu contraseña para Elasticsearch

### Autenticación con API Key
- **Host**: URL de tu instancia de Elasticsearch
- **API Key**: La clave API generada desde Elasticsearch

### Sin autenticación
- **Host**: URL de tu instancia de Elasticsearch (para instancias que no requieren autenticación)

> Nota: Es posible que necesites configurar tu instancia de Elasticsearch para permitir el acceso mediante las credenciales que elijas.

## Compatibilidad

- Requiere n8n versión 1.0.0 o superior
- Compatible con Elasticsearch 7.x y 8.x

## Uso

Este nodo te permite realizar consultas avanzadas a Elasticsearch. A continuación, se muestran ejemplos de cómo utilizarlo:

### Consulta básica para encontrar todos los documentos
```json
{
  "query": {
    "match_all": {}
  }
}
```

### Consulta de texto completo
```json
{
  "query": {
    "match": {
      "campo": "valor a buscar"
    }
  }
}
```

### Consulta más compleja con filtros
```json
{
  "query": {
    "bool": {
      "must": [
        { "match": { "título": "búsqueda" } }
      ],
      "filter": [
        { "term": { "estado": "activo" } },
        { "range": { "fecha": { "gte": "2023-01-01" } } }
      ]
    }
  },
  "sort": [
    { "fecha": { "order": "desc" } }
  ],
  "size": 20
}
```

El nodo devolverá los documentos encontrados como resultado de la consulta, cada uno con sus metadatos (_id, _score) y sus campos.

## Recursos

* [Documentación de nodos comunitarios de n8n](https://docs.n8n.io/integrations/community-nodes/)
* [Documentación de Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
* [Guía de consultas DSL de Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
