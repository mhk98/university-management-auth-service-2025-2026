import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            // This is the key part!
            user: JwtPayload
        }
    }
}