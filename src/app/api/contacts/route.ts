import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const contacts = await prisma.contact.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json({ contacts });
}

export async function POST(request: NextResponse) {
  const data = await request.json();
  const contacts = await prisma.contact.create({
    data: {
      name: data.title,
      message: data.message,
      email: data.email,
    },
  });
  return NextResponse.json({ contacts });
}
