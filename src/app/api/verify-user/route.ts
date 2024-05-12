import Cryptr from "cryptr";
import { db } from "~/server/db";
import { NextResponse } from "next/server";

const cryptr = new Cryptr(process.env.CRYPTR_KEY!);

interface ItemsProps {
  pin: string;
  email: string;
  encryptedToken: string;
}

export async function POST(req: Request) {
  const { pin, email, encryptedToken }: ItemsProps = await req.json();
  try {
    const decryptedToken = cryptr.decrypt(encryptedToken);

    if (pin !== decryptedToken) {
      return new NextResponse("Invalid OTP", { status: 400 });
    }

    await db.user.update({
      where: {
        email: email,
      },
      data: {
        isVerified: true,
      },
    });
    return new NextResponse("OTP Successfully Verified", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
