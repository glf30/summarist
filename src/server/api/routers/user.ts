import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({

  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    const user = ctx.db.user.findFirst({
      where: {
        userId: input,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User not found",
      });
    }

    return user;

  }),

  userCreate: publicProcedure
    .input(z.object({ userId: z.string(), username: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          ...input,
        },
      });
    }),
});