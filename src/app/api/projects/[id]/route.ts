import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const data = await request.json();

    const project = await prisma.project.update({
      where: { id },
      data,
    });
    return NextResponse.json(project, {status: 200});
  } catch (error) {
    console.error('Erro ao atualizar o projeto:', error);
    return NextResponse.json(
      { error: 'Falha ao atualizar o projeto' },
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

    const project = await prisma.project.delete({
      where: { id },
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { message: "Erro ao deletar o projeto" },
      { status: 500 }
    );
  }
}
