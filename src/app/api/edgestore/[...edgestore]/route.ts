import { initEdgeStore } from '@edgestore/server';
import { type CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { auth } from '@clerk/nextjs';


type Context = {
    userId: string;
};
 
async function createContext({ req }: CreateContextOptions): Promise<Context> {
    const {user} = auth();
    
    // const userId = session?.userId || null; // Sicherstellen, dass wir null zurückgeben, wenn keine Benutzer-ID vorhanden ist

    console.log('userId', user, user?.username, user?.id);
    return { "userId": "" };
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