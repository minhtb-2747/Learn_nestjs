import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';

@Injectable()

export class AuthMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const roleId = req.header("roleId")
        if (!roleId) {
            console.log('roleId', roleId);
            // res.send("Từ khi gặp em")
            res.status(400).json({
                success: false,
                messages: ['ROLEID_IS_REQUIRED'], // client có thể đọc message để translate bắn thông báo cho người dùng
                content: roleId // có thể return giá trị gì đó về client
            })
            res.end(); // end
            // throw new NotFoundException('roleId is Required')
        } else {
            next();
        }
    }
}
