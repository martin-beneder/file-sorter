import { initEdgeStore } from '@edgestore/server';
import { type CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { getAuth } from '@clerk/nextjs/server';
import { z } from 'zod';
type Context = {
    userId: string;
};

async function createContext({ req }: CreateContextOptions): Promise<Context> {
    const { userId } = await getAuth(req);
    if (!userId) {
        throw new Error('User not authenticated');
    }
    return { userId };
}

const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es
        .fileBucket()

        // e.g. /publicFiles/{category}/{author}
        .path(({ ctx, input }) => [
            { author: ctx.userId },

        ])

});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    createContext
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;