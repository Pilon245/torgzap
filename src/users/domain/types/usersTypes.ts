import {SortDirection} from "../../../middlewares/queryValidation";

export class UserAccountDBType {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public age: number,
        public password: string) {
    }
}

export type FindUsersPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm?: string
}
