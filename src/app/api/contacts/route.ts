/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas/contacts.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const contacts = await prisma.contact.findMany();

    return NextResponse.json({ contacts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, message } = contactSchema.parse(body);

    await prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({
      message: "Contato criado com sucesso!",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
