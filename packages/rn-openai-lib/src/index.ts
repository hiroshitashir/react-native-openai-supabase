import App from './app/App';
import getAppConfig, { APP_TYPE, AppTypeString } from './app/config';
import Forgot from './components/Forgot';
import Password from './components/Password';

const configureApp = (type: AppTypeString) => {
  return () => {
    return App({ appConfig: getAppConfig(type) });
  };
};

export { APP_TYPE, configureApp, Forgot, Password };
