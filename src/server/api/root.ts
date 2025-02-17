import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/user";
import { questionnaireTypeRouter } from "./routers/questionnaireType";
import { questionnaireRouter } from "./routers/questionnaire";
import { receiptOptionRouter } from "./routers/taxonomy/receipt";



/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  questionnaireType: questionnaireTypeRouter,
  questionnaire: questionnaireRouter,
  receiptOption: receiptOptionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
