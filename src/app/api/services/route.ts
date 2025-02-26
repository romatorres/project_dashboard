/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/schemas/services.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET() {
  try {
    const services = await prisma.service.findMany();

    return NextResponse.json({ services });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, imageUrl, icon, order, isActive } =
      serviceSchema.parse(body);

    await prisma.service.create({
      data: {
        title,
        description,
        imageUrl,
        icon,
        order,
        isActive,
      },
    });

    return NextResponse.json({
      message: "Serviço criado com sucesso!",
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      // Format validation errors into a more readable format
      const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return NextResponse.json({ error: errors }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
