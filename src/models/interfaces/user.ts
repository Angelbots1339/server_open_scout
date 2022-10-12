export interface IUser {
    googleId?: string,
    firstName: string,
    lastName: string,
    email: string
}
export interface IMongoDBUser {
    _id: string,
    __v: number,
    googleId?: string,
    firstName: string,
    lastName: string,
    email: string
}