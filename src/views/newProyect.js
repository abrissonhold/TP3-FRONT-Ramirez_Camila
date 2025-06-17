import { createProject } from '../services/projectsAPI.js';
import ApiCampaignTypes from '../services/campaignTypesAPI.js';
import ApiClients from '../services/clientsAPI.js';

const loadCampaignsAndClients = async () => {
    const campaignSelect = document.getElementById('campaignType');
    const campaigns = await ApiCampaignTypes.Get();
    campaigns.forEach(campaign => {
        const option = document.createElement('option');
        option.value = campaign.id;
        option.text = campaign.name;
        campaignSelect.appendChild(option);
    });
    const clientSelect = document.getElementById('clientId');
    const clients = await ApiClients.Get();
    clients.forEach(client => {
        const option = document.createElement('option');
        option.value = client.clientID;
        option.text = client.name;
        clientSelect.appendChild(option);
    });
};

const formSubmit = async () => {
    const projectName = document.getElementById('projectName').value;
    const clientId = document.getElementById('clientId').value;
    const campaignType = document.getElementById('campaignType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    const newProject = {
        ProjectName: projectName,
        ClientId: clientId,
        CampaignTypeId: campaignType,
        StartDate: startDate,
        EndDate: endDate,
    };

    await createProject(newProject);
    window.location.href = 'layout.html';  
};

window.onload = async () => {
    await loadCampaignsAndClients();
};

document.getElementById("sumbit").addEventListener("click", formSubmit);