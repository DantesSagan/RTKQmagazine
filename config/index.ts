const nextPublic = process.env.NEXT_PUBLIC_GIT_DEV;
const nextLocal = process.env.NEXT_PUBLIC_URL_DEV;
const createServer: string = 'https://';
const createLocalServer: string = 'http://';

const publicHost = nextPublic !== 'production';
const localHost = nextLocal !== 'production';

const devPublic = createServer + publicHost;
const devLocal = createLocalServer + localHost;

export const serverDev =
  window.location.pathname === devLocal
    ? devLocal
    : window.location.pathname === devPublic
    ? devPublic
    : devLocal;
