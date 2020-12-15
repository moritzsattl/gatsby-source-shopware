const fetch = require("node-fetch")

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}, configOptions) => {
    const { createNode } = actions
    console.log("Testing my plugin", configOptions);


    
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
    


    
    const fetchProducts = await fetch(productApiEndpoint, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "omit", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                "sw-access-key": `${process.env.SHOPWARE_ACCESS_KEY}`,
            },
            redirect: "follow", // manual, *folslow, error
            referrer: "client", // no-referrer, *client
        })
        .then(response => response.json())
        .then(data=>{return data})
        .catch(err=> {return err})

    const tokenRequest = await fetch(tokenApiEndpoint, headers);
    const tokenData = await tokenRequest.json();
    
    createNode(processToken(tokenData))

    fetchProducts.data.forEach(element => {
        createNode(processProduct(element))
    })
    
    
        
}
