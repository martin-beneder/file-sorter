import { NextAuthOptions } from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import { PrismaClient } from "@prisma/client"
import internal from "stream"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                // Hier überprüfen wir die Anmeldeinformationen
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                });

                if (!user) {
                    throw new Error('Kein Benutzer mit diesem Benutzernamen gefunden');
                }

                const isValid = await bcrypt.compare(credentials?.password as string, user?.password);

                if (!isValid) {
                    throw new Error('Falsches Passwort');
                }

                // Rückgabe des Benutzerobjekts, wenn erfolgreich
                return { id: user.id, name: user.name, email: user.email };
            }
        }),
    ],
    
}