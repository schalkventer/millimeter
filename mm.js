
let result = {}

const getChildren = (node) => {
    const { children = [] } = node
    const childrenAsArray = Array.from(children)

    return childrenAsArray.reduce((result, childNode) => {
        const key = childNode.getAttribute('data-key')

        if (!key) return result

        if (childNode.children.length > 0 && Object.keys(result).includes(key)) {
            return {
                ...result,
                [key]: [
                    ...(Array.isArray(result[key]) ? result[key] : [result[key]]),
                    getChildren(childNode)
                ],
            }
        }

        if (Object.keys(result).includes(key)) {
            return {
                ...result,
                [key]: [
                    ...(Array.isArray(result[key]) ? result[key] : [result[key]]),
                    childNode.innerText,
                ],
            }
        }

        if (childNode.children.length > 0) {
            return {
                ...result,
                [key]: getChildren(childNode)
            }
        }

        return {
            ...result,
            [key]: childNode.innerText,
        }
    }, {})
}

console.log(getChildren(window.document.body))
getChildren(result)

// const query = Array.from(window.document.body.querySelectorAll('*:not([data-key])'))

// const internals = query.reduce((result, node) => {
//     const { key } = node.dataset

//     return {
//         ...result,
//         [key]: {
//             duplicate: Object.keys(result).includes(key)
//             parents: node.querySelectorAll()
//         }
//     }
// }, {})

// console.log(query)

// const response = ).reduce((result, node) => {
//     
//     console.log(node, key)

//     const existingKeys = 

//     return {
//         ...result,
//         [key]
//     }
// }, {})

// const 

// console.log(response)


// // const QUERY = {
//     '': String,
//     '.item': {
//         'h2': String,
//         '.count': Number,
//         'p': String,
//     }

// }   

// const isPrimitive = (value) => value === String || value === Number || value === Boolean

// const getRootKeys = (object) => {
//     const keys = Object.keys(object)
//     const filteredKeys = keys.filter(singleKey => !isPrimitive(singleKey))
//     return filteredKeys
// }

// const convert = () => {
//     selectors = getRootKeys(QUERY)
//     const result =  selectors.map(selector => Array.from(window.document.querySelectorAll(selector)))
//     console.log(result)
// }


// console.log(convert())