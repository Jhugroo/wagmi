import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
export const questionnaireTypeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(1), id: z.string(),
      showEnterpriseIdentification: z.boolean(),
      showEnterpriseCharacteristics: z.boolean(),
      showEmployment: z.boolean().optional(),
      showReceipts: z.boolean().optional(),
      showExpenditures: z.boolean().optional(),
      showInventories: z.boolean().optional(),
      showCapitalAssets: z.boolean().optional(),
      showOwnAccountResearchAndDevelopment: z.boolean().optional(),
      showContactDetails: z.boolean().optional(),
      explanatoryNotes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaireType.create({
        data: {
          title: input.title,
          id: (input.id === '' ? input.title.replace(/[^a-z0-9]+/gi, " ").toLowerCase().replaceAll(" ", "_") : input.id.replace(/[^a-z0-9]+/gi, " ").toLowerCase().replaceAll(" ", "_"))
        },
      });
    }),

  get: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaireType.findMany({ orderBy: { id: "asc" } });
    }),

  delete: protectedProcedure.input(z.string())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaireType.delete({ where: { id: input } })
    }),

  updateById: protectedProcedure
    .input(z.object({
      id: z.string(), title: z.string().min(1),
      showEnterpriseIdentification: z.boolean(),
      showEnterpriseCharacteristics: z.boolean(),
      showEmployment: z.boolean().optional(),
      showReceipts: z.boolean().optional(),
      showExpenditures: z.boolean().optional(),
      showInventories: z.boolean().optional(),
      showCapitalAssets: z.boolean().optional(),
      showOwnAccountResearchAndDevelopment: z.boolean().optional(),
      showContactDetails: z.boolean().optional(),
      explanatoryNotes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaireType.update({
        where: { id: input.id },
        data: {
          ...input
        },
      });
    }),

  getById: protectedProcedure.input(z.object({ id: z.string().optional() }))
    .query(async ({ ctx, input: { id } }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      if (!id) {
        return null;
      }
      return await ctx.db.questionnaireType.findFirst({
        where: { id: id },
      });
    }),
  getQuestionnaireTypeOptions: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.session.user?.isVerified) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaireType.findMany({ orderBy: { id: "asc" } });
    }),
  getExplanatoryNotes: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.questionnaireType.findFirst({
        where: {
          id: input
        },
        select: {
          explanatoryNotes: true, title: true
        }
      })
    }),
});
