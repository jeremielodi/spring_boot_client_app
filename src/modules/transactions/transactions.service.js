import PrototypeApiService from '../../service/httpService';

function TransactionService() {

  const baseUrl = '/api/transactions';
  const service = new PrototypeApiService(baseUrl);

  service.listForUser = (accountId) => {
    return service.get(`/listForUser/${accountId}`);
  };

  service.fees = (amount) => {
    return service.get(`/fees/${amount}`);
  }

  service.transfert = (data) => {
    return service.post(`/transfert`, data);
  }
  
  service.withdrawal = (data) => {
    return service.post(`/withdrawal`, data);
  }
  
  return service;
}

const a = TransactionService();
export default a; 