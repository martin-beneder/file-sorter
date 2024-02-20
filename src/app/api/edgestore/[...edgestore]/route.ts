import { initEdgeStore } from '@edgestore/server';
import { type CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { getAuth } from "@clerk/nextjs/server";

type Context = {
    userId: string;
};
 
async function createContext({ req }: CreateContextOptions): Promise<Context> {
    const { userId } = await getAuth(req)!; // replace with your own session logic
 
    return {
        userId: userId!,
    };
}
 
const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket(),

});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    logLevel: 'debug',
    createContext
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;