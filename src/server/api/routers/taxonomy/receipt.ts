import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
export const receiptOptionRouter = createTRPCRouter({
    get: protectedProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.receiptOption.findMany({
                include: {
                    showFor: {
                        select: {
                            id: true, title: true
                        }
                    }
                }
            })
        }),
    getById: protectedProcedure.input(z.object({ id: z.string().optional() }))
        .query(async ({ ctx, input: { id } }) => {
            if (!ctx.session.user?.isAdmin) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            if (!id) {
                return null;
            }
            return await ctx.db.receiptOption.findFirst({
                where: { id: id },
                include: {
                    showFor: true
                }
            });
        }),
    create: protectedProcedure
        .input(z.object({
            showFor: z.array(z.string()),
            title: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.session.user?.isAdmin) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            return await ctx.db.receiptOption.create({
                data: {
                    ...input,
                    showFor: { connect: input.showFor.map((receiptOption) => { return { id: receiptOption } }) }
                }
            })
        }),
    updateById: protectedProcedure
        .input(z.object({
            id: z.string(),
            showFor: z.array(z.string()),
            title: z.string().min(1),
        }))
        .mutation(async ({ ctx, input }) => {
            if (!ctx.session.user?.isAdmin) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            const removedOptionsQuery = await ctx.db.receiptOption.findFirst({
                where: { id: input.id },
                select: {
                    showFor: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            const removeOptions = removedOptionsQuery?.showFor.filter(({ id }) => !input.showFor.includes(id))
            let showForQuery: { connect: { id: string; }[]; } | { disconnect: { id: string; }[]; connect: { id: string; }[]; }
                = { connect: input.showFor.map((receiptOption) => { return { id: receiptOption } }) }
            if (removeOptions !== undefined) {
                showForQuery = { disconnect: removeOptions, connect: input.showFor.map((receiptOption) => { return { id: receiptOption } }) }
            }
            return await ctx.db.receiptOption.update({
                where: { id: input.id },
                data: {
                    ...input,
                    showFor: showForQuery
                }
            })
        }),
    deleteById: protectedProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            if (!ctx.session.user?.isAdmin) {
                throw new TRPCError({ code: 'UNAUTHORIZED' });
            }
            return await ctx.db.receiptOption.delete({
                where: { id: input },
            })
        }),
    getOptionByQuestionnaireType: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            return await ctx.db.receiptOption.findMany({
                where: {
                    showFor: {
                        every: {
                            id: input
                        }
                    }
                }
            })
        }),
});