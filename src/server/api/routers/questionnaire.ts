import { number, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
export const questionnaireRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      questionnaireType: z.string(),
      identification: z.object({
        name: z.string().min(1),
        businessAddress: z.string().min(1),
        businessLicenseHolderName: z.string().min(1),
        brn: z.string().min(1),
        vatRegistrationNumber: z.string().optional(),
        telNo: z.array(z.string()).min(1),
        faxNo: z.number().optional(),
        email: z.string().min(1),
      }),
      receipt: z.object({
        receiptData: z.array(z.object({
          receiptOptionId: z.string(),
          amount: z.array(z.number())
        }))
      }).optional(),
      employment: z.object({
        employed: z.array(z.object({
          description: z.string(),
          nationality: z.string(),
          gender: z.string(),
          number: z.number(),
        }))
      }),
      characteristics: z.object({
        mainActivity: z.string(),
        secondaryActivities: z.array(z.string()),
        typeOfLegalOrganisation: z.string(),
        equityParticipation: z.string(),
        foreignPercentage: z.number().optional(),
        nationalityOfForeignOwnerShip: z.number().optional()
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user?.isVerified) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaire.create({
        data: {
          createdBy: {
            connect: {
              id: ctx.session.user.id
            }
          },
          questionnaireType: { connect: { id: input.questionnaireType } },
          enterpriseIdentification: { create: input.identification },
          enterpriseCharacteristics: { create: input.characteristics },
          employment: {
            create: {
              employed: {
                createMany: {
                  data: input.employment.employed
                }
              }
            }
          },
          // receipt: {
          //   create: {
          //     receiptData: {
          //       createMany: { data: input.receipt.receiptData }
          //     }
          //   }
          // },
        },
        select: {
          questionnaireType: {
            select: {
              title: true
            }
          }
        }
      });
    }),

  get: protectedProcedure
    .input(z.number().optional())
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      const isNextNull = await ctx.db.questionnaire.findFirst({
        skip: (input ?? 0) + 50,
        orderBy: { createdAt: "desc" },
        select: {
          id: true
        }
      })
      return {
        data: await ctx.db.questionnaire.findMany({
          orderBy: { createdAt: "desc" },
          take: 50,
          skip: input ?? 0,
          select: { questionnaireType: { select: { title: true } }, id: true, createdAt: true, createdBy: { select: { name: true } } },
        }),
        isNextNull: isNextNull
      }
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
      id: z.string(),
      title: z.string().min(1),
      showEnterpriseIdentification: z.boolean(),
      showEnterpriseCharacteristics: z.boolean(),
      showEmployment: z.boolean().optional(),
      showReceipts: z.boolean().optional(),
      showExpenditures: z.boolean().optional(),
      showInventories: z.boolean().optional(),
      showCapitalAssets: z.boolean().optional(),
      showOwnAccountResearchAndDevelopment: z.boolean().optional(),
      showContactDetails: z.boolean().optional(),
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

  getById: protectedProcedure.input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      if (!input) {
        return null;
      }
      return await ctx.db.questionnaire.findFirst({
        where: { id: input },
        include: {
          enterpriseCharacteristics: true,
          enterpriseIdentification: true,
          employment: true,
          questionnaireType: true,
        }
      });
    }),
  getQuestionnaireTypeOptions: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.session.user?.isVerified) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaireType.findMany({ orderBy: { id: "asc" } });
    }),
  getEmploymentCountPerStates: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.employmentParameter.groupBy({
        by: ["nationality", "gender"],
        _sum: { number: true },
      })
    }),
  getquestionnaireCountPerMonth: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.session.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      return await ctx.db.questionnaire.groupBy({
        by: ["questionnaireTypeId"],
        _count: {
          id: true,
        },
      })
    }),
});
