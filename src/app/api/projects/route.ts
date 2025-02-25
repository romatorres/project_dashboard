/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/schemas/projects.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();

    return NextResponse.json({ projects });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, imageUrl, link, order, isActive } =
      projectSchema.parse(body);

    await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        link,
        order,
        isActive,
      },
    });

    return NextResponse.json({
      message: "Projeto criado com sucesso!",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
