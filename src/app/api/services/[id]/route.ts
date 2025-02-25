/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/schemas/services.schema";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: any, { params }: Params) {
  try {
    const { id } = await params;

    const service = await prisma.service.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { title, description, imageUrl, icon, order, isActive } =
      serviceSchema.parse(body);

    const service = await prisma.service.update({
      data: {
        title,
        description,
        imageUrl,
        icon,
        order,
        isActive,
      },
      where: {
        id,
      },
    });

    return NextResponse.json({ service });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.service.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Serviço excluido com sucesso!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
