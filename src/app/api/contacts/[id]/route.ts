/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas/contacts.schema";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: any, { params }: Params) {
  try {
    const { id } = await params;

    const contact = await prisma.contact.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ contact });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { name, email, message } = contactSchema.parse(body);

    const contact = await prisma.contact.update({
      data: {
        name,
        email,
        message,
      },
      where: {
        id,
      },
    });

    return NextResponse.json({ contact });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.contact.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Contato excluido com sucesso!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
