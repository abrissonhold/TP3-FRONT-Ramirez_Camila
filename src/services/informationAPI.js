export const loadInformation = async () => {
    const [users, statuses, areas, projectTypes] = await Promise.all([
      fetch('https://localhost:7099/api/User').then(r => r.json()),
      fetch('https://localhost:7099/api/ApprovalStatus').then(r => r.json()),
      fetch("https://localhost:7099/api/Area").then(r => r.json()),
      fetch("https://localhost:7099/api/ProjectType").then(r => r.json())
    ]);

    return { users, statuses, areas, projectTypes};
  };