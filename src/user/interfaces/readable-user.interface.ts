import { RoleEnum } from '../enums/role.enum';

export interface IReadableUser {
    readonly email: string;
    readonly username: string;
    readonly name: string;
    readonly surname: string;
    status: string;
    readonly role: RoleEnum.admin | RoleEnum.user;
    readonly password: string;
    accessToken?: string;
}
