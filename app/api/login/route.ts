import { getUserByLogin } from "@/lib/mongo/students";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, id } = await req.json();

    if (!email || !id) {
      return NextResponse.json(
        { error: 'Email and ID are required' },
        { status: 400 }
      );
    }

    const { user, error } = await getUserByLogin(email, id);

    if (error) {
      return NextResponse.json({ error }, { status: 404 });
    }
    console.log(user);
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
