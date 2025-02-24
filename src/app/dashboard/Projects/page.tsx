"use client";

import { Plus } from "lucide-react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import { useState } from "react";

export default function Projects() {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-4">Projetos</h2>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Projetos
          </button>
        )}
      </div>
      {isCreating ? (
        <ProjectForm
          onSubmit={() => setIsCreating(false)}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <ProjectList />
      )}
    </div>
  );
}
