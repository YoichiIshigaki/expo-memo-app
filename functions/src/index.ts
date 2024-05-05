/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import { handler as geminiHandler } from './httpHandlers/gemini';
import { handler as testHandler } from './httpHandlers/test';
import { handler as authHandler } from './httpHandlers/auth';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const auth = onRequest(authHandler);
export const test = onRequest(testHandler);
export const gemini = onRequest(geminiHandler);
