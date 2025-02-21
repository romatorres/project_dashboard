import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const data = await request.json();
  const projects = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      order: data.order,
      link: data.link,
      isActive: true,
    },
  });
  return NextResponse.json(projects);
}
