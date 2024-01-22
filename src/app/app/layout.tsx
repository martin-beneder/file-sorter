import { EdgeStoreProvider } from '../lib/edgestore';

export default function layout(
    { children }:
        { children: React.ReactNode }
) {
    return (
        <>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </>
    )
}
