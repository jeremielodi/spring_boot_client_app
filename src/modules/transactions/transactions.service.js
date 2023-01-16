import PrototypeApiService from '../../service/httpService';

function TransactionService() {

  const baseUrl = '/api/transactions';
  const service = new PrototypeApiService(baseUrl);

  service.listForUser = (accountId) => {
    return service.get(`/listForUser/${accountId}`);
  };

  return service;
}

const a = TransactionService();
export default a; 