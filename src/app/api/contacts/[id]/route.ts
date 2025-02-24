import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const data = await request.json();

    const contact = await prisma.contact.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });
    return NextResponse.json(contact);
  } catch {
    return NextResponse.json(
      { message: "Erro ao atualizar o contato" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;

    const contact = await prisma.contact.delete({
      where: { id },
    });
    return NextResponse.json(contact);
  } catch {
    return NextResponse.json(
      { message: "Erro ao deletar o contato" },
      { status: 500 }
    );
  }
}
