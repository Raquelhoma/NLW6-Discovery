import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    //receber o token
    const authToken = request.headers.authorization;
    //validar se o token está preenchido
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        //validar se o token é valido
        const {sub} = verify( token, "4f93ac9d10cb751b8c9c646bc9dbccb9") as IPayload;
        request.user_id = sub;
        return next();        
    }catch(err) {
        return response.status(401).end();
    }
    //recuperar informações do usuário

}