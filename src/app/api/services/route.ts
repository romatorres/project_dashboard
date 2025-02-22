import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(request: NextResponse) {
  const data = await request.json();
  const service = await prisma.service.create({
    data: {
      title: data.title,
      description: data.description,
      icon: data.icon,
      imageUrl: data.imageUrl,
      order: data.order,
      isActive: true,
    },
  });
  return NextResponse.json(service);
}
