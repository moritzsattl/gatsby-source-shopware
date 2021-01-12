const fetch = require("node-fetch")

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}, configOptions) => {
    const { createNode } = actions


    
    const headers = {
        headers: {
            "sw-access-key": configOptions.accessKey
        }
    }
    
    
    const processProduct = (product) => {
        const nodeId = createNodeId(`SHOPWAREPRODUCT-${product.id}`)
        const nodeContent = JSON.stringify(product)
        const nodeData = Object.assign({}, product, {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `ShopwareProduct`,
                content: nodeContent,
                contentDigest: createContentDigest(product),
            },
        })
        return nodeData
    }
    
   const processToken = (token) => {
        const nodeId = createNodeId(`SHOPWARETOKEN-${token.token}`)
        const nodeContent = JSON.stringify(token)
        const nodeData = Object.assign({}, token, {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `ShopwareToken`,
                content: nodeContent,
                contentDigest: createContentDigest(token),
            },
        })
        return nodeData
    }

    
    const productApiEndpoint = `${configOptions.host}/sales-channel-api/v3/product?associations[media][]`
    const tokenApiEndpoint = `${configOptions.host}/store-api/v3/context`
    
    const fetchProducts = await fetch(productApiEndpoint,headers)
        .then(response => response.json())
        .then(data=>{return data})
        .catch(err=> {return err})

    const fetchToken = await fetch(tokenApiEndpoint, headers)
        .then(response => response.json())
        .then(data=>{return data})
        .catch(err=> {return err})
    
    fetchProducts.data.forEach(element => {
        createNode(processProduct(element))
    })

    createNode(processToken(fetchToken)) 
        
}

exports.printMsg = function() {
    console.log("This is a message from the gatsby-source-shopware plugin");
}
