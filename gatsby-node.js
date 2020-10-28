const fetch = require("node-fetch")

exports.sourceNodes = async ({
    actions,
    createContentDigest,
    createNodeId,
}, configOptions) => {
    const { createNode } = actions
    console.log("Testing my plugin", configOptions);


    //const tokenApiEndpoint = `${configOptions.host}/store-api/v3/context`
    const headers = {
        headers: {
            "sw-access-key": configOptions.accessKey
        }
    }
    /*
    const processToken = (token) => {
        const nodeId = createNodeId(`TOKEN-${token.token}`)
        const nodeContent = JSON.stringify(token)
        const nodeData = Object.assign({}, token, {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `Token`,
                content: nodeContent,
                contentDigest: createContentDigest(token),
            },
        })
        return nodeData
    }
    */
    const processProduct = (product) => {
        const nodeId = createNodeId(`PRODUCT-${product.id}`)
        const nodeContent = JSON.stringify(product)
        const nodeData = Object.assign({}, product, {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `Product`,
                content: nodeContent,
                contentDigest: createContentDigest(product),
            },
        })
        return nodeData
    }

    const processCategory = (category) => {
        const nodeId = createNodeId(`CATEGORY-${category.id}`)
        const nodeContent = JSON.stringify(category)
        const nodeData = Object.assign({}, category, {
            id: nodeId,
            parent: null,
            children: [],
            internal: {
                type: `Category`,
                content: nodeContent,
                contentDigest: createContentDigest(category),
            },
        })
        return nodeData
    }

    /*
    const tokenRequest = await fetch(tokenApiEndpoint, headers);
    const tokenData = await tokenRequest.json();
    Object.assign(headers,{'sw-context-token' : tokenData.token})
    createNode(processToken(tokenData))
    */
    const productApiEndpoint = `${configOptions.host}/store-api/v3/product`
    const categoryApiEndpoint = `${configOptions.host}/store-api/v3/category`



    const fetchProduct = await fetch(productApiEndpoint, headers)
    const fetchCategory = await fetch(categoryApiEndpoint, headers)


    const products = await fetchProduct.json()
    const categories = await fetchCategory.json()

    categories.elements.forEach(element => {
        createNode(processCategory(element))
    })

    products.elements.forEach(element => {
        createNode(processProduct(element))
    })



}
