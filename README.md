## Abstract

This is a proof of concept. Use at your own risk.

## About

I am student of a higher technical school in Vienna. Currently, I am working on my diploma thesis, where I set up a headless webshop using shopware 6 as a data source which is why I created this plugin. I can't ensure the quality of this plugin, but it is atleast a proof of concept.

## Description

A Gatsby source plugin for sourcing data into your Gatsby application from shopware 6.

## How to install

```
npm install --save gatsby-source-shopware
```

## When do I use this plugin?

If you want to build a headless frontend using shopware 6 as a data source, this plugin will help you.

## How to use

```javascript
// In your gatsby-config.js
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    plugins: [
        {
            resolve: 'gatsby-source-shopware',
            options:{
                host:`${process.env.SHOPWARE_HOST}`,
                accessKey: `${process.env.SHOPWARE_ACCESS_KEY}`
            }
          }
    ]
}

```

```javascript
// In your .dev.development or .dev.production file
SHOPWARE_HOST= //<insert url to your shopware instance>  e.g. http://localhost:8000
SHOPWARE_ACCESS_KEY= //<insert your shopware access key>

```
## Plugin Options

### host (required)
Your API Endpoint where your Shopware 6 installation lives.

### accessKey (required)
Your Sales-Channel access key.

## How to query for data 

```graphql
query MyQuery {
  allShopwareProduct {
    nodes {
      id
      media {
        media {
          thumbnails {
            url
          }
        }
      }
    }
  }
}
```