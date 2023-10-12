import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({

  getById: publicProcedure.input(z.object({ userId: z.string(), bookId: z.string()})).query(({ ctx, input }) => {
    const book = ctx.db.book.findFirst({
      where: {
        ...input
      },
    });

    if (!book) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "book not found",
      });
    }

    return book;

  }),

  bookAdd: publicProcedure
    .input(z.object({ userId: z.string(), bookId: z.string(), favorite: z.boolean(), finished: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.book.create({
        data: {
          ...input,
        },
      });
    }),

    updateBook: publicProcedure
    .input(
      z.object({ userId: z.string(), bookId: z.string(), favorite: z.boolean(), finished: z.boolean()}),
    )
    .mutation(async ({ ctx, input }) => {
      const updatePokemon = await ctx.db.book.update({
        where: {
          userId: input.userId,
          bookId: input.bookId,
        },
        data: {
          ...input
        },
      });
      return updatePokemon;
    }),
});