import { BaseModel }  from "./base";

export interface User extends BaseModel {
    username: string;
    password: string;
}