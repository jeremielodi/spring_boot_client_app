import PrototypeApiService from '../../service/httpService';

function AccountService() {

  const baseUrl = '/api/accounts';
  const service = new PrototypeApiService(baseUrl);

  service.userAccounts = (userId) => {
    return service.get(`/list/${userId}`);
  };
  service.detail = (accountNumber) => {
    return service.get(`/detail/${accountNumber}`);
  };
  

  return service;
}

const a = AccountService();
export default a; 