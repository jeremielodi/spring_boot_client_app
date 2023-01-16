import PrototypeApiService from '../../service/httpService';

function AgentService() {

  const baseUrl = '/api/agents';
  const service = new PrototypeApiService(baseUrl);

  service.detail = (agentNumber) => {
    return service.get(`/detail/${agentNumber}`);
  };
  
  return service;
}

const a = AgentService();
export default a; 