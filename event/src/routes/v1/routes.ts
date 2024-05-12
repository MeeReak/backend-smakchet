/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  TsoaRoute,
  fetchMiddlewares,
  ExpressTemplateService,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from "../../controllers/user.controller";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EventController } from "../../controllers/event.controller";
import type {
  Request as ExRequest,
  Response as ExResponse,
  RequestHandler,
  Router,
} from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  IUser: {
    dataType: "refObject",
    properties: {
      authId: { dataType: "string" },
      username: { dataType: "string" },
      phoneNumber: { dataType: "string" },
      profile: { dataType: "string" },
      address: { dataType: "string" },
      description: { dataType: "string" },
      email: { dataType: "string" },
      favorites: { dataType: "array", array: { dataType: "string" } },
      createdAt: {
        dataType: "union",
        subSchemas: [{ dataType: "datetime" }, { dataType: "string" }],
      },
      role: { dataType: "string" },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  FormSubmission: {
    dataType: "refObject",
    properties: {
      label: { dataType: "string", required: true },
      fieldType: { dataType: "string", required: true },
      answers: {
        dataType: "array",
        array: { dataType: "string" },
        required: true,
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  EventDetail: {
    dataType: "refObject",
    properties: {
      thumbnail: { dataType: "string" },
      eventname: { dataType: "string" },
      address: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          lng: { dataType: "string", required: true },
          lat: { dataType: "string", required: true },
        },
      },
      category: {
        dataType: "union",
        subSchemas: [
          { dataType: "enum", enums: ["Sport"] },
          { dataType: "enum", enums: ["Education"] },
          { dataType: "enum", enums: ["Workshop"] },
          { dataType: "enum", enums: ["Charity"] },
        ],
      },
      viewer: { dataType: "double" },
      description: { dataType: "string" },
      Date: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          endTime: { dataType: "string" },
          startTime: { dataType: "string" },
          endDate: { dataType: "datetime" },
          startDate: { dataType: "datetime" },
        },
      },
      requirement: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          timeCommitment: { dataType: "string" },
          skill: { dataType: "string" },
          language: { dataType: "string" },
          age: { dataType: "string" },
        },
      },
      createdAt: { dataType: "datetime" },
      formSubmission: {
        dataType: "array",
        array: { dataType: "refObject", ref: "FormSubmission" },
      },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: "throw-on-extras",
  bodyCoercion: true,
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.post(
    "/v1/user",
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.CreateUser),

    async function UserController_CreateUser(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        RequestBody: {
          in: "body",
          name: "RequestBody",
          required: true,
          ref: "IUser",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: "CreateUser",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    "/v1/user/:userId",
    ...fetchMiddlewares<RequestHandler>(UserController),
    ...fetchMiddlewares<RequestHandler>(UserController.prototype.UpdateProfile),

    async function UserController_UpdateProfile(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        userId: {
          in: "path",
          name: "userId",
          required: true,
          dataType: "string",
        },
        userProfileData: {
          in: "body",
          name: "userProfileData",
          required: true,
          ref: "IUser",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new UserController();

        await templateService.apiHandler({
          methodName: "UpdateProfile",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/v1/events",
    ...fetchMiddlewares<RequestHandler>(EventController),
    ...fetchMiddlewares<RequestHandler>(EventController.prototype.CreateEvent),

    async function EventController_CreateEvent(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      const args: Record<string, TsoaRoute.ParameterSchema> = {
        requestBody: {
          in: "body",
          name: "requestBody",
          required: true,
          ref: "EventDetail",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args,
          request,
          response,
        });

        const controller = new EventController();

        await templateService.apiHandler({
          methodName: "CreateEvent",
          controller,
          response,
          next,
          validatedArgs,
          successStatus: undefined,
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa