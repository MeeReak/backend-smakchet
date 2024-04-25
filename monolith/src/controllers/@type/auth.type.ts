export interface AuthModel{
    username    : string,
    email       : string,
    password    : string,
    googleId    ?: string,
    isVerify    ?: boolean,
    role        : string,
    created_at  : Date,
}