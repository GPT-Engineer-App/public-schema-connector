# public-schema-connector

can you create crud and connect via this openapi schema:

{
  "swagger": "2.0",
  "info": {
    "description": "",
    "title": "standard public schema",
    "version": "12.1 (8cbcf98)"
  },
  "servers": [
    {
      "url": "https://mhapffvggkbqlfbhfxsy.supabase.co/rest/v1"
    }
  ],
  "consumes": [
    "application/json",
    "application/vnd.pgrst.object+json;nulls=stripped",
    "application/vnd.pgrst.object+json",
    "text/csv"
  ],
  "produces": [
    "application/json",
    "application/vnd.pgrst.object+json;nulls=stripped",
    "application/vnd.pgrst.object+json",
    "text/csv"
  ],
  "paths": {
    "/": {
      "get": {
        "produces": [
          "application/openapi+json",
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "OK"
          }
        },
        "summary": "OpenAPI description (this document)",
        "tags": [
          "Introspection"
        ]
      }
    },
    "/log": {
      "get": {
        "parameters": [
          {
            "$ref": "#/parameters/rowFilter.log.id"
          },
          {
            "$ref": "#/parameters/rowFilter.log.created_at"
          },
          {
            "$ref": "#/parameters/rowFilter.log.mood"
          },
          {
            "$ref": "#/parameters/rowFilter.log.free_text"
          },
          {
            "$ref": "#/parameters/rowFilter.log.tags"
          },
          {
            "$ref": "#/parameters/rowFilter.log.urges"
          },
          {
            "$ref": "#/parameters/select"
          },
          {
            "$ref": "#/parameters/order"
          },
          {
            "$ref": "#/parameters/range"
          },
          {
            "$ref": "#/parameters/rangeUnit"
          },
          {
            "$ref": "#/parameters/offset"
          },
          {
            "$ref": "#/parameters/limit"
          },
          {
            "$ref": "#/parameters/preferCount"
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "items": {
                "$ref": "#/definitions/log"
              },
              "type": "array"
            }
          },
          "206": {
            "description": "Partial Content"
          }
        },
        "summary": "how i feel",
        "tags": [
          "log"
        ]
      },
      "post": {
        "parameters": [
          {
            "$ref": "#/parameters/body.log"
          },
          {
            "$ref": "#/parameters/select"
          },
          {
            "$ref": "#/parameters/preferPost"
          }
        ],
        "responses": {
          "201": {
            "description": "Created"
          }
        },
        "summary": "how i feel",
        "tags": [
          "log"
        ]
      },
      "delete": {
        "parameters": [
          {
            "$ref": "#/parameters/rowFilter.log.id"
          },
          {
            "$ref": "#/parameters/rowFilter.log.created_at"
          },
          {
            "$ref": "#/parameters/rowFilter.log.mood"
          },
          {
            "$ref": "#/parameters/rowFilter.log.free_text"
          },
          {
            "$ref": "#/parameters/rowFilter.log.tags"
          },
          {
            "$ref": "#/parameters/rowFilter.log.urges"
          },
          {
            "$ref": "#/parameters/preferReturn"
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          }
        },
        "summary": "how i feel",
        "tags": [
          "log"
        ]
      },
      "patch": {
        "parameters": [
          {
            "$ref": "#/parameters/rowFilter.log.id"
          },
          {
            "$ref": "#/parameters/rowFilter.log.created_at"
          },
          {
            "$ref": "#/parameters/rowFilter.log.mood"
          },
          {
            "$ref": "#/parameters/rowFilter.log.free_text"
          },
          {
            "$ref": "#/parameters/rowFilter.log.tags"
          },
          {
            "$ref": "#/parameters/rowFilter.log.urges"
          },
          {
            "$ref": "#/parameters/body.log"
          },
          {
            "$ref": "#/parameters/preferReturn"
          }
        ],
        "responses": {
          "204": {
            "description": "No Content"
          }
        },
        "summary": "how i feel",
        "tags": [
          "log"
        ]
      }
    }
  },
  "definitions": {
    "log": {
      "description": "how i feel",
      "required": [
        "id",
        "created_at"
      ],
      "properties": {
        "id": {
          "description": "Note:\nThis is a Primary Key.<pk/>",
          "format": "bigint",
          "type": "integer"
        },
        "created_at": {
          "default": "now()",
          "format": "timestamp with time zone",
          "type": "string"
        },
        "mood": {
          "format": "text",
          "type": "string"
        },
        "free_text": {
          "format": "text",
          "type": "string"
        },
        "tags": {
          "description": "comma separated tags",
          "format": "text",
          "type": "string"
        },
        "urges": {
          "format": "text",
          "type": "string"
        }
      },
      "type": "object"
    }
  },
  "parameters": {
    "preferParams": {
      "name": "Prefer",
      "description": "Preference",
      "required": false,
      "enum": [
        "params=single-object"
      ],
      "in": "header",
      "type": "string"
    },
    "preferReturn": {
      "name": "Prefer",
      "description": "Preference",
      "required": false,
      "enum": [
        "return=representation",
        "return=minimal",
        "return=none"
      ],
      "in": "header",
      "type": "string"
    },
    "preferCount": {
      "name": "Prefer",
      "description": "Preference",
      "required": false,
      "enum": [
        "count=none"
      ],
      "in": "header",
      "type": "string"
    },
    "preferPost": {
      "name": "Prefer",
      "description": "Preference",
      "required": false,
      "enum": [
        "return=representation",
        "return=minimal",
        "return=none",
        "resolution=ignore-duplicates",
        "resolution=merge-duplicates"
      ],
      "in": "header",
      "type": "string"
    },
    "select": {
      "name": "select",
      "description": "Filtering Columns",
      "required": false,
      "in": "query",
      "type": "string"
    },
    "on_conflict": {
      "name": "on_conflict",
      "description": "On Conflict",
      "required": false,
      "in": "query",
      "type": "string"
    },
    "order": {
      "name": "order",
      "description": "Ordering",
      "required": false,
      "in": "query",
      "type": "string"
    },
    "range": {
      "name": "Range",
      "description": "Limiting and Pagination",
      "required": false,
      "in": "header",
      "type": "string"
    },
    "rangeUnit": {
      "name": "Range-Unit",
      "description": "Limiting and Pagination",
      "required": false,
      "default": "items",
      "in": "header",
      "type": "string"
    },
    "offset": {
      "name": "offset",
      "description": "Limiting and Pagination",
      "required": false,
      "in": "query",
      "type": "string"
    },
    "limit": {
      "name": "limit",
      "description": "Limiting and Pagination",
      "required": false,
      "in": "query",
      "type": "string"
    },
    "body.log": {
      "name": "log",
      "description": "log",
      "required": false,
      "in": "body",
      "schema": {
        "$ref": "#/definitions/log"
      }
    },
    "rowFilter.log.id": {
      "name": "id",
      "required": false,
      "format": "bigint",
      "in": "query",
      "type": "string"
    },
    "rowFilter.log.created_at": {
      "name": "created_at",
      "required": false,
      "format": "timestamp with time zone",
      "in": "query",
      "type": "string"
    },
    "rowFilter.log.mood": {
      "name": "mood",
      "required": false,
      "format": "text",
      "in": "query",
      "type": "string"
    },
    "rowFilter.log.free_text": {
      "name": "free_text",
      "required": false,
      "format": "text",
      "in": "query",
      "type": "string"
    },
    "rowFilter.log.tags": {
      "name": "tags",
      "description": "comma separated tags",
      "required": false,
      "format": "text",
      "in": "query",
      "type": "string"
    },
    "rowFilter.log.urges": {
      "name": "urges",
      "required": false,
      "format": "text",
      "in": "query",
      "type": "string"
    }
  },
  "externalDocs": {
    "description": "PostgREST Documentation",
    "url": "https://postgrest.org/en/v12.1/api.html"
  }
}

## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/public-schema-connector.git
cd public-schema-connector
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
