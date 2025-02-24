"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ProjectForm from "./ProjectForm";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  link: string;
  order: number;
  isActive: boolean;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    projectId: string | null;
  }>({
    isOpen: false,
    projectId: null,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const response = await fetch("/api/projects");
    const data = await response.json();
    setProjects(data);
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Projeto excluido com sucesso!");
        fetchProjects();
        setDeleteDialog({ isOpen: false, projectId: null });
      } else {
        const data = await response.json();
        toast.error(data.message || "Falha ao excluir o projeto.");
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Ocorreu um erro ao excluir o projeto.");
    }
  }

  if (editingProject) {
    return (
      <ProjectForm
        project={editingProject}
        onSubmit={() => {
          setEditingProject(null);
          fetchProjects();
        }}
        onCancel={() => setEditingProject(null)}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48 w-full">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  Sem imagem
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <span className="text-sm text-gray-500">
                  Ordem: {project.order}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {project.description}
              </p>

              <span className="text-gray-600 mb-4 line-clamp-2">
                <a href={project.link} target="_blank">
                  {project.link}
                </a>
              </span>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingProject(project)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setDeleteDialog({ isOpen: true, projectId: project.id })
                  }
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, projectId: null })}
        onConfirm={() => {
          if (deleteDialog.projectId) {
            handleDelete(deleteDialog.projectId);
          }
        }}
        title="Deletar o Projeto?"
        message="Tem certeza de que deseja excluir este projeto? Esta ação não pode ser desfeita!."
      />
    </>
  );
}
