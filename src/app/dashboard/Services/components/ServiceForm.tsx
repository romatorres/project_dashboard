"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { Service } from "../types";

type ServiceFormProps = {
  service?: Service;
  onSubmit?: () => void;
  onCancel?: () => void;
};

export default function ServiceForm({
  service,
  onSubmit,
  onCancel,
}: ServiceFormProps) {
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [icon, setIcon] = useState(service?.icon || "");
  const [imageUrl, setImageUrl] = useState(service?.imageUrl || "");
  const [order, setOrder] = useState(service?.order || 0);

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setIcon(service.icon || "");
      setOrder(service.order);
    }
  }, [service]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const url = service ? `/api/services/${service.id}` : "/api/services";
      const method = service ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          icon,
          imageUrl,
          order,
          isActive: true, // Add this if it's required by your schema
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          service
            ? "Serviço atualizado com sucesso!"
            : "Serviço criado com sucesso!"
        );
        setTitle("");
        setDescription("");
        setIcon("");
        setImageUrl("");
        setOrder(0);
        onSubmit?.();
      } else {
        // Handle the error message properly
        const errorMessage =
          typeof data.error === "string"
            ? data.error
            : "Algo deu errado. Por favor, tente novamente.";
        toast.error(errorMessage);
      }
    } catch (err) {
      const error = err as Error;
      toast.error(
        error.message || "Ocorreu um erro. Por favor, tente novamente."
      );
    }
  }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descrição
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Icone
          </label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Icon name or emoji"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagem URL
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Local path or external URL"
          />
          {imageUrl && (
            <div className="mt-2">
              <div className="relative w-32 h-32 overflow-hidden rounded-lg border border-gray-200">
                <Image
                  src={imageUrl}
                  alt="Service preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 128px) 100vw, 128px"
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ordem
          </label>
          <input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {service ? "Atualizar o Serviço" : "Adicionar Serviço"}
          </button>

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
      </div>
    </form>
  );
}
