import model from "../models";
import kafka from "../lib/kafka";
import redis from "../lib/redis";
import shortid from "shortid";
import { randomUUID } from "crypto";

export async function createModel({ name }: { name: string }) {
  redis.set("name", name);
  const payload = model(name);
  return payload;
}

/************* POST Route (/create/one)******************/

export async function createOne({ body, query, cookies, authorization }: any) {
  console.log("body", body);
  const { name, email, password, confirmPassword } = body;
  const model = await createModel({ name: email });
  const isUser = await model.findOne({ email });
  if (isUser) {
    console.log("isUser", isUser);
    throw new Error("The email already exists try to login");
  } else {
    const isPasswordConfirmed = password === confirmPassword;
    if (!isPasswordConfirmed) throw new Error("The passwords do not match");
    else {
      const modelsKey = shortid.generate();
      const user = await model.create({
        name,
        email,
        password,
        modelsKey,
      });

      return user;
    }
  }
}

/************* POST Route (/create/many)******************/

export async function createMany({
  body,
  query,
  cookies,
  authorization,
}: any) {}
