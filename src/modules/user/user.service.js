import PrototypeApiService from '../../service/httpService';

function UserService() {

  const baseUrl = '/api/auth';
  const service = new PrototypeApiService(baseUrl);

  service.auth = (user) => {
    return service.post(`/signin`, user);
  };

  service.logout = () => {
    return service.get(`/logout`);
  };

  service.sessionStatus = () => {
    return service.get(`/sesssion/status`);
  };

  service.changeSelfPassword = (params) => {
    const url = '/changeSelfPassword';
    return service.post(url, params);
  };

  return service;
}

const a = UserService();
export default a; 