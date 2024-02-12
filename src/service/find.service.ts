import environment from "../lib/environment";
import jwt from "../lib/jwt";
import kafka from "../lib/kafka";
import redis from "../lib/redis";
import model from "../models";
import { randomUUID } from "crypto";
import { Request } from "express";

export async function findModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

export async function login(req: any) {
  const input = req?.body || req;
  const { email, password } = input;

  console.log("loginJwt input => ", input);
  console.log(email, password);
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }
  const model = await findModel({ name: email });
  const user: any = await model.findOne({ email: email }).select("+password");

  console.log("find user by email model => ", user);
  if (!user) {
    throw new Error("The account does not exist. Please register");
  } else {
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }
    if (!user.isVerified) {
      throw new Error("Please verify your email, or contact support");
    }
    const inputs = {
      id: user.id,
      email: user.email,
      modelsKey: user.modelsKey,
      isVerified: user.isVerified,
    };
    const payload: any = await kafka.producerMessages("auth", "createOne", {
      body: inputs,
    });
    console.log("loginJwt: payload,user => ", payload, user);
    return { token: payload, user };
  }
}

export async function logout(req: Request) {
  const { refresh_token: refreshToken }: any = req.cookies;

  const token = await kafka.producerMessages("auth", "removeOne", {
    query: refreshToken,
  });

  return token;
}

/************* GET Route (/find/one)******************/

export async function findOne({ body, query, cookies, authorization }: any) {
  console.log("findOne UUUUUUUUUUUUU input => ", authorization);
  const { userEmail } = authorization;

  const model = await findModel({ name: userEmail });

  const user: any = await model.findOne(query);

  //if (!user) throw new Error("User not found");

  return user;
}

/************* GET Route (/find/many)******************/

export async function findMany({ body, query, cookies, authorization }: any) {}
