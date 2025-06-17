export const getProjects = async (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.title) params.append("title", filters.title);
    if (filters.status) params.append("status", filters.status);
    if (filters.applicant) params.append("applicant", filters.applicant);
    if (filters.approvalUser) params.append('approvalUser', approvalUser);

    const queryString = params.toString();
    const response = await fetch(`https://localhost:7099/api/Project?${queryString}`);

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
        const response = await fetch('https://localhost:7108/api/v1/Project', {
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