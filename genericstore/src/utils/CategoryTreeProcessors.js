export const getAsListOfIdsAndPaths = (categories) => {
    const categoriesTree = buildTree(categories)
    const listOfCategoryIdsAndPaths = getNodeCategoryIdsAndPaths(categoriesTree)
    return listOfCategoryIdsAndPaths
}

export const getIdsAndNamesOnPathToId = (categories, idToFind) => {
    const categoriesTree = buildTree(categories)
    const idsAndNamesOnPath = getIdsAndNamesOnPath(categoriesTree, idToFind)
    return idsAndNamesOnPath
}


// Helpers:

const buildTree = (categories) => {
    const categoriesMap = new Map()

    // Group the categories to the map by parent category ID (aka: category_id):
    for(let category of categories) {
        if(!categoriesMap.has(category.category_id)) categoriesMap.set(category.category_id, [category])
        else {
            const categoryList = categoriesMap.get(category.category_id)
            categoryList.push(category)
            categoriesMap.set(category.category_id, categoryList)
        }
    }

    // The Tree will be built to this object:
    const root = {
        nodeCategory: null
    }

    // Building The Tree:
    recursiveChildrenAdder(root, categoriesMap)

    return root
}

const recursiveChildrenAdder = (node, categoriesMap) => {
    // Find out the children of the node from the Map.
    let childNodes
    if(node.nodeCategory === null) childNodes = categoriesMap.get(null)  // root node 
    else childNodes = categoriesMap.get(node.nodeCategory.id)            // all the other nodes

    if(childNodes === undefined) return  // end the recursion.

    // Add the child nodes for the node.
    for(let childNode of childNodes) {
        const childToAdd = {
            nodeCategory: childNode
        }
        node['child' + childNode.id] = childToAdd  // adds the child
        recursiveChildrenAdder(childToAdd, categoriesMap)  // adds children for the newly added child
    }
}


const getNodeCategoryIdsAndPaths = (root) => {
    const nodesAndPaths = []
    const path = ''

    recursiveNodePathPrinter(root, path, nodesAndPaths)

    return nodesAndPaths
}

const recursiveNodePathPrinter = (node, path, nodesAndPaths) => {
    let pathContinued = path
    if(node.nodeCategory !== null) {
        if(path !== '') pathContinued += ' - '
        pathContinued += node.nodeCategory.name
        nodesAndPaths.push({id: node.nodeCategory.id, path: pathContinued})
    }

    for(let child in node){
        if(child !== 'nodeCategory') recursiveNodePathPrinter(node[child], pathContinued, nodesAndPaths)
    }
}


const getIdsAndNamesOnPath = (root, idToFind) => {
    return recursivePathFinder(root, idToFind, [])
}

const recursivePathFinder = (node, idToFind, idsAndNodesOnAPath) => {
    let newIdsAndNodesOnAPath

    if(node.nodeCategory !== null) {
        newIdsAndNodesOnAPath = [...idsAndNodesOnAPath, {id: node.nodeCategory.id, name: node.nodeCategory.name}]
        if(node.nodeCategory.id === idToFind) return newIdsAndNodesOnAPath
    } else {
        newIdsAndNodesOnAPath = idsAndNodesOnAPath
    }

    for(let child in node){
        if(child !== 'nodeCategory') {
            const possibleAnswer = recursivePathFinder(node[child], idToFind, newIdsAndNodesOnAPath)
            if(possibleAnswer !== undefined) return possibleAnswer
        }
    }
}
