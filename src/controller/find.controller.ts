import { Request, Response } from "express";
import service from "../service";
import { StatusCodes } from "http-status-codes";

export async function login(req: Request, res: Response) {
  console.log("login controller", req.body);
  try {
    const payload: any = await service.find.login(req);

    res.status(StatusCodes.OK).json(payload);
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const payload = await service.find.logout(req);
    res.clearCookie("refresh_token");
    res.status(StatusCodes.OK).json(payload);
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
}

/************* GET Route (/find/one)******************/

export async function findOne(req: any, res: Response) {
  try {
    const payload = await service.find.findOne({
      query: req.query,
      cookies: req.cookies,
      body: req.body,
      authorization: { userEmail: req?.userEmail, userId: req?.userId },
    });

    res.status(StatusCodes.OK).json(payload);
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
}

/************* GET Route (/find/many)******************/

export async function findMany(req: any, res: Response) {
  try {
    const payload = await service.find.findMany({
      query: req.query,
      cookies: req.cookies,
      body: req.body,
      authorization: { userEmail: req?.userEmail, userId: req?.userId },
    });
    res.status(StatusCodes.OK).json(payload);
  } catch (e: any) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: e.message });
  }
}
