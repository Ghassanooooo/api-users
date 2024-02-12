import { Express, Request, Response } from "express";
import controller from "./controller";
import middleware from "./middleware";

function routes(app: Express) {
  /************* GET Routes (READ)******************/
  app.get("/find/one", middleware.authentication, controller.find.findOne);
  app.get("/find/many", middleware.authentication, controller.find.findMany);
  /************* POST Routes (CREATE)******************/
  // app.post("/create/one", middleware.limiter, controller.create.createOne);
  app.post("/create/one", controller.create.createOne);

  app.post(
    "/create/many",
    middleware.authentication,
    controller.create.createMany
  );
  /************* PUT Routes (UPDATE)******************/
  app.put(
    "/update/one",
    middleware.authentication,
    controller.update.updateOne
  );
  app.put(
    "/update/many",
    middleware.authentication,
    controller.update.updateMany
  );
  /************* DELETE Routes (REMOVE)******************/

  app.delete(
    "/remove/one",
    middleware.authentication,
    controller.remove.removeOne
  );
  app.delete(
    "/remove/many",
    middleware.authentication,
    controller.remove.removeMany
  );

  /********************** Special Routes *************************/
  //app.post("/login", middleware.limiter, controller.find.login);
  app.post("/login", controller.find.login);

  app.post("/logout", controller.find.logout);
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  /***********************************************/
}
export default routes;
