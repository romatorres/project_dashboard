"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ServiceForm from "./ServiceForm";
import toast from "react-hot-toast";
import Image from "next/image";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Service } from "../types";

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    serviceId: string | null;
  }>({
    isOpen: false,
    serviceId: null,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data.services || []);
    } catch {
      toast.error("Falha ao buscar os serviços");
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Serviço excluido com sucesso!");
        fetchServices();
        setDeleteDialog({ isOpen: false, serviceId: null });
      } else {
        const data = await response.json();
        toast.error(data.message || "Falha ao excluir o serviço.");
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Ocorreu um erro ao excluir o serviço.");
    }
  }

  if (editingService) {
    return (
      <ServiceForm
        service={editingService}
        onSubmit={() => {
          setEditingService(null);
          fetchServices();
        }}
        onCancel={() => setEditingService(null)}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48 w-full">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  {service.icon || "No image"}
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <span className="text-sm text-gray-500">
                  Ordem: {service.order}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">
                {service.description}
              </p>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setEditingService(service)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    setDeleteDialog({ isOpen: true, serviceId: service.id })
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
        onClose={() => setDeleteDialog({ isOpen: false, serviceId: null })}
        onConfirm={() => {
          if (deleteDialog.serviceId) {
            handleDelete(deleteDialog.serviceId);
          }
        }}
        title="Deletar o Serviço?"
        message="Tem certeza de que deseja excluir este serviço? Esta ação não pode ser desfeita!."
      />
    </>
  );
}
