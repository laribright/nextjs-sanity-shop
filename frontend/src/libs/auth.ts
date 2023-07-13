import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';

import clientPromise from './mongodb';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: 'email and password',
			credentials: {
				email: {
					label: 'Email',
					placeholder: 'email@email.com',
					type: 'email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Please provide valid credentials');
				}

				const client = await MongoClient.connect(
					process.env.MONGODB_URI as string
				);

				const db = client.db();

				const user = await await db
					.collection('users')
					.findOne({ email: credentials.email });

				if (user) {
					return user as any;
				} else {
					return null;
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	adapter: MongoDBAdapter(clientPromise),
	debug: process.env.NODE_ENV === 'development',
	secret: process.env.NEXTAUTH_SECRET,
};
