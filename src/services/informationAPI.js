export const loadInformation = async () => {
    const [users, statuses] = await Promise.all([
      fetch('https://localhost:7099/api/User').then(r => r.json()),
      fetch('https://localhost:7099/api/ApprovalStatus').then(r => r.json()),
    ]);
  
    return { users, statuses };
  };