import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

export async function POST(req: Request, res: Response) {
	const { email, password } = await req.json();

	if (!email || !password) {
		return new NextResponse('Please all fields are required', { status: 400 });
	}

	try {
		const client = await MongoClient.connect(process.env.MONGODB_URI as string);

		const db = client.db();

		const registeredUser = await db.collection('users').findOne({ email });

		if (registeredUser) {
			return new NextResponse('User already exists', { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const result = await db
			.collection('users')
			.insertOne({ email, hashedPassword });

		await client.close();

		return NextResponse.json(result, {
			status: 200,
			statusText: 'Sign up success',
		});
	} catch (error) {
		console.log('REGISTRATION FALIED', error);
		return new NextResponse('Registration Error', { status: 500 });
	}
}
