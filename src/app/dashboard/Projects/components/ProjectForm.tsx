"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  order: number;
  isActive: boolean;
};

type ProjectFormProps = {
  project?: Project;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export default function ProjectForm({
  project,
  onSubmit,
  onCancel,
}: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || "");
  const [link, setLink] = useState(project?.link || "");
  const [order, setOrder] = useState(project?.order || 0);

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setDescription(project.description);
      setImageUrl(project.imageUrl);
      setLink(project.link);
      setOrder(project.order);
    }
  }, [project]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const url = project ? `api/projects/${project.id}` : "/api/project";
      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          link,
          order,
        }),
      });

      if (response.ok) {
        toast.success(
          project
            ? "Projeto atualizodo com sucesso!"
            : "Projeto criado com sucesso!"
        );
        setTitle("");
        setDescription("");
        setImageUrl("");
        setLink("");
        setOrder(0);
        onSubmit?.();
      } else {
        const data = await response.json();
        toast.error(
          data.message || "Algo deu errado. Por favor, tente novamente."
        );
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>Teste</p>
      <div>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
