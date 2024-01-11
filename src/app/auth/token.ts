import { generateRandomString, isWithinExpiration } from "lucia/utils";
import { PrismaClient } from "@prisma/client";

const EXPIRES_IN = 1000 * 60 * 60 * 2; // 2 hours

const db = new PrismaClient();

export const generateEmailVerificationToken = async (userId: string) => {
	const storedUserTokens = await db.email_verification_token.findMany({
		where: {
			user_id: userId
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
	await db.email_verification_token.create({
		data: {
			id: userId,
			token: token,
			expires: new Date().getTime() + EXPIRES_IN,
			user_id: userId
		}
	});

	return token;
};