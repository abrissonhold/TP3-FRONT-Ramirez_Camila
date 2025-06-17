const getCampaignTypes = async () => {
    let result = [];
    let response = await fetch('https://localhost:7108/api/v1/CampaignType');
    if (response.ok) {
        result = await response.json();
    }
    return result;

}
const ApiCampaignTypes = {
    Get: getCampaignTypes
};

export default ApiCampaignTypes;