export enum SortDirection {
    asc = 'asc',
    desc = 'desc'
}

type QueryValidationResult = {
    pageNumber: number,
    pageSize: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: string,
}

const defaultPageSize = 10
const defaultPageNumber = 1

export const queryValidation  = (query: any): QueryValidationResult => {
    let pageNumber = query.pageNumber
    const parsedPageNumber = parseInt(pageNumber, 10)
    if(!pageNumber || !parsedPageNumber || parsedPageNumber <= 0) pageNumber = defaultPageNumber
    pageNumber = parseInt(pageNumber, 10)

    let pageSize = query.pageSize
    const parsedPageSize = parseInt(pageSize, 10 )
    if (!pageSize || !parsedPageSize|| parsedPageSize <= 0) pageSize = defaultPageSize
    pageSize = parseInt(pageSize, 10 )

    const sortBy = typeof query.sortBy === "string" ? query.sortBy : "createdAt"
    const sortDirection = typeof query.sortDirection === "string" ? query.sortDirection : "desc"
    const searchNameTerm  = typeof query.searchNameTerm === "string" ? query.searchNameTerm?.toString() : ""
    return {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm, }
}
