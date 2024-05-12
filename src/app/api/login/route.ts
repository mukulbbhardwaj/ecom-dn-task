import { SignJWT } from "jose";
import { db } from "~/server/db";
import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { getJwtSecretKey } from "~/lib/utils";
import { loginFormSchema } from "~/lib/validation";
import { NextResponse, type NextRequest } from "next/server";

const jwtExpires = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = loginFormSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await compare(data.password, user.password))) {
      return new NextResponse("Invalid email or password", { status: 401 });
    }

    // generate jwt token
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${jwtExpires}s`)
      .sign(getJwtSecretKey());

    // Set encoded token as cookie
    cookies().set({
      name: "token",
      value: token,
      path: "/",
    });

    // Create public user data
    const userDataPublic = {
      id: user.id,
      email: user.email,
      name: user.name,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // Set public user data as cookie
    cookies().set({
      name: "userData",
      value: JSON.stringify(userDataPublic),
      path: "/",
    });

    return NextResponse.json("User login successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
