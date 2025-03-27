import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";

dotenv.config();

console.log("Autentico...");

export const checkAuth = auth({
    audience: "api://"+process.env.AZURE_CLIENT_ID, // L'ID della tua applicazione registrata su Azure
    issuerBaseURL: `https://sts.windows.net/${process.env.AZURE_TENANT_ID}/`,
    tokenSigningAlg: "RS256"
});