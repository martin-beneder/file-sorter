import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { PrismaClient } from "@prisma/client";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

const db = new PrismaClient();

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await db.emailVerificationToken.findMany({
		where: {
			userId: userId
		}
	});
	if (storedUserTokens.length > 0) {
		const reusableStoredToken = storedUserTokens.find((token) => {
			// check if expiration is within 1 hour
			// and reuse the token if true
			return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2);
		});
		if (reusableStoredToken) return reusableStoredToken.id;
	}
	const token = generateRandomString(63);
	await db.emailVerificationToken.create({
		data: {
			id: token,
			expires: new Date().getTime() + EXPIRES_IN,
			userId: userId
		}
	});

	return token;
};


export const validateEmailVerificationToken = async (token: string) => {

	const storedToken = await db.emailVerificationToken.findFirst({
		where: {
			id: token
		}
	});
	if (!storedToken) throw new Error("Invalid token");

	await db.emailVerificationToken.deleteMany({
		where: {
			userId: storedToken.userId
		}
	});


	const tokenExpires = Number(storedToken.expires); // bigint => number conversion
	if (!isWithinExpiration(tokenExpires)) {
		throw new Error("Expired token");
	}
	return storedToken.userId;
};