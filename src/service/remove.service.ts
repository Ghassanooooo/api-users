import model from "../models";
import jwt from "../lib/jwt";

export async function removeModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

/************* DELETE Route (/remove/one)******************/

export async function removeOne({ body, query, cookies, authorization }: any) {}

/************* DELETE Route (/remove/many)******************/

export async function removeMany({
  body,
  query,
  cookies,
  authorization,
}: any) {}
