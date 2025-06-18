export const getProjects = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.title) params.append("title", filters.title);
    if (filters.status) params.append("status", filters.status);
    if (filters.applicant) params.append("applicant", filters.applicant);
    if (filters.approvalUser) params.append('approvalUser', filters.approvalUser);

    const queryString = params.toString();
    const response = await fetch(`https://localhost:7099/api/Project?${queryString}`);
    if (response.status === 404) return [];
    
    if (!response.ok) {
        console.error('Error al obtener proyectos');
        return [];
    }

    return await response.json();
};

export const getProjectById = async (id) => {
    const response = await fetch(`https://localhost:7099/api/Project/${id}`);
    if (!response.ok) {
      console.error("Error al obtener detalle");
      return null;
    }
    return await response.json();
  };

export const createProject = async (projectData) => {
    try {
        const response = await fetch('https://localhost:7099/api/Project', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectData)
        });

        if (response.ok) {
            return await response.json(); 
        } else {
            console.error('Error al crear el proyecto');
            return null;
        }
    } catch (error) {
        console.error('Error de red:', error);
        return null;
    }
};

export const sendDecision = async (projectId, decisionData) => {
    try {
        const response = await fetch(`https://localhost:7099/api/Project/${projectId}/decision`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(decisionData)
        });

        const text = await response.text();

        if (!response.ok) {
            try {
                const json = JSON.parse(text);
                throw new Error(json.message || "Error desconocido");
            } catch {
                console.error("Respuesta no JSON del backend:", text);
                throw new Error("Error interno del servidor: " + text.slice(0, 100));
            }
        }

        return JSON.parse(text);
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
};

export const updateProject = async (id, data) => {
  const res = await fetch(`https://localhost:7099/api/Project/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error.slice(0, 100));
  }

  return await res.json();
};