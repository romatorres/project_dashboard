/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/schemas/projects.schema";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: any, { params }: Params) {
  try {
    const { id } = await params;

    const project = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { title, description, imageUrl, link, order, isActive } =
      projectSchema.parse(body);

    const project = await prisma.project.update({
      data: {
        title,
        description,
        imageUrl,
        link,
        order,
        isActive,
      },
      where: {
        id,
      },
    });

    return NextResponse.json({ project });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
