![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-elastic-advance-retrieve

This is a community node for n8n. It allows you to use Elasticsearch directly in your n8n workflows, executing advanced queries to retrieve documents.

Elasticsearch is a distributed search and analytics engine designed to execute complex queries on large volumes of data quickly and scalably.

[n8n](https://n8n.io/) is a workflow automation platform with a [fair-code license](https://docs.n8n.io/reference/license/).

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Semantic Search](#semantic-search)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

This node is implemented as a subnode and supports the following operations:

- **Document Search**: Allows you to perform advanced queries in Elasticsearch using the Elasticsearch DSL (Domain Specific Language) query format in JSON.

This node is specifically designed to be used as a tool by the AI Agent in n8n, allowing it to retrieve contextual information from Elasticsearch to enrich the generated responses.

## Credentials

To authenticate with Elasticsearch, this node offers three authentication methods:

### Basic Authentication (username/password)
- **Host**: URL of your Elasticsearch instance (e.g., http://localhost:9200)
- **Username**: Your Elasticsearch username
- **Password**: Your Elasticsearch password

### API Key Authentication
- **Host**: URL of your Elasticsearch instance
- **API Key**: The API key generated from Elasticsearch

### No Authentication
- **Host**: URL of your Elasticsearch instance (for instances that don't require authentication)

> Note: You may need to configure your Elasticsearch instance to allow access via the credentials you choose.

## Compatibility

- Requires n8n version 1.0.0 or higher
- Compatible with Elasticsearch 7.x and 8.x

## Usage

This node allows you to perform advanced queries in Elasticsearch. Here are examples of how to use it:

### Basic query to find all documents
```json
{
  "query": {
    "match_all": {}
  }
}
```

### Full-text query
```json
{
  "query": {
    "match": {
      "field": "value to search"
    }
  }
}
```

### More complex query with filters
```json
{
  "query": {
    "bool": {
      "must": [
        { "match": { "title": "search" } }
      ],
      "filter": [
        { "term": { "status": "active" } },
        { "range": { "date": { "gte": "2023-01-01" } } }
      ]
    }
  },
  "sort": [
    { "date": { "order": "desc" } }
  ],
  "size": 20
}
```

The node will return the documents found as a result of the query, each with its metadata (_id, _score) and fields.

## Semantic Search

This node is designed to make use of the `semantic_text` functionality, which allows Elasticsearch to retrieve information both semantically and lexically. In this version, the node only retrieves information but implements hybrid search capabilities.

### Hybrid Search (semantic and lexical)

Hybrid search combines:
- **Semantic search**: Finds documents based on meaning and context, not just on exact word matches.
- **Lexical search**: Finds documents based on exact or partial text matches.

Example of a hybrid query in Elasticsearch:
```json
{
  "size": 3,
  "_source": ["answer","ask"],
  "retriever": {
    "rrf": {
      "retrievers": [
        {
          "standard": {
            "query": {
              "semantic": {
                "field": "answer_semantic",
                "query": "How to obtain and activate the electronic signature?"
              }
            }
          }
        },
        {
          "standard": {
            "query": {
              "match": {
                "ask": {
                  "query": "eleectronic signature"
                }
              }
            }
          }
        }
      ]
    }
  }
}
```

This approach allows the AI Agent to obtain more relevant and contextual results based on the user's intent, rather than being limited to exact keyword matches.

## Resources

* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Elasticsearch Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html)
* [Elasticsearch DSL Query Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
* [Semantic Search with Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/semantic-search.html)

---

This node was made possible thanks to the incredible work of the [Elasticsearch](https://www.elastic.co/) team and their continued efforts to make powerful search and analytics accessible to everyone.

Developed with care and shared with the [n8n](https://n8n.io) community by [Alejandro Sánchez](https://www.alejandrosl.com), in the spirit of open collaboration and curiosity-driven automation.