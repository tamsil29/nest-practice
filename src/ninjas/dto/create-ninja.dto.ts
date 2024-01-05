import { IsEnum, MinLength } from "class-validator";

export class CreateNinjaDto {
    @MinLength(3)
    name: string;

    @IsEnum(['stars', 'rod'], {message: 'Use Correct weapon'})
    weapon: 'stars'| 'rod'
}
