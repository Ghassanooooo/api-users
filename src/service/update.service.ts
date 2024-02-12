import jwt from "../lib/jwt";
import model from "../models";

export async function updateModel({ name }: { name: string }) {
  const payload = model(name);
  return payload;
}

/************* PUT Route (/update/one)******************/

export async function updateOne({ body, query, cookies, authorization }: any) {
  const { userEmail } = authorization;
  const { workspace } = body;
  if (!workspace) return null;

  const userModel: any = await updateModel({ name: userEmail });
  const findUser = await userModel.findOne(query);
  if (query?.prop === "workspace.refreshToken") {
    console.log(
      "updateOne workspace.refreshToken=======> ",
      body,
      query,
      authorization
    );

    const user = await userModel.updateOne(
      { email: userEmail, "workspaces.value": workspace },
      {
        $set: {
          "workspaces.$.refreshToken": body.refreshToken,
          "workspaces.$.isLogin": true,
        },
      }
    );
    return user;
  } else {
    for (let i = 0; i < findUser.workspaces.length; i++) {
      findUser.workspaces[i].isActive = false;
    }
    await findUser.save();
    console.log("findUser =======> ", findUser);
    const user = await userModel.updateOne(query, {
      $addToSet: { workspaces: { value: workspace } },
    });

    return user;
  }
}

/************* PUT Route (/update/many)******************/

export async function updateMany({
  body,
  query,
  cookies,
  authorization,
}: any) {}
