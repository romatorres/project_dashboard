import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = await params.id;
    const data = await request.json();

    const service = await prisma.service.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        imageUrl: data.imageUrl,
        order: data.order,
        isActive: data.isActive,
      },
    });
    return NextResponse.json(service);
  } catch {
    return NextResponse.json(
      { message: "Erro ao atualizar o serviço" },
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

    const service = await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json(service);
  } catch {
    return NextResponse.json(
      { message: "Erro ao deletar o serviço" },
      { status: 500 }
    );
  }
}
