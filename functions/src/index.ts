/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript


type Handler = Parameters<Parameters<typeof onRequest>[number]>
export type Request = Handler[0];
export type Response = Handler[1];


export const users = onRequest((req, res) => {
  switch (req.method) {
    case "GET":
      break;
    case "POST":
      break;
    case "PUT":
      break;
    case "DELETE":
      break;  
    default:
      res.status(405).json({error:"Method Not Allowed"});
      break;
  }
  logger.info("Hello logs!", {structuredData: true});

  res.json({message : "Hello from Firebase"});
});

export const test = onRequest((_req, res) => {
  logger.info("Hello logs!", {structuredData: true});
  res.json({ "message" : "Hello Firebase Function" });
});
