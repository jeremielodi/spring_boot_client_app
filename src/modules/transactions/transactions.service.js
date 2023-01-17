import PrototypeApiService from '../../service/httpService';

function TransactionService() {

  const baseUrl = '/api/transactions';
  const service = new PrototypeApiService(baseUrl);

  service.listForUser = (accountId) => {
    return service.get(`/listForUser/${accountId}`);
  };

  service.transfert = (data) => {
    return service.post(`/transfert`, data);
  }
  
  service.withdrawal = (data) => {
    return service.post(`/withdrawal`, data);
  }
  
  service.fees = (amount) => {
    return service.get(`/fees/${amount}`);
  }
  
  return service;
}

const a = TransactionService();
export default a; 