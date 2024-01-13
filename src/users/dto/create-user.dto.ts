import { IsEmail, Matches, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3)
    name: string;

    @IsEmail()
    email: string;

    @MinLength(8)
    // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
}
