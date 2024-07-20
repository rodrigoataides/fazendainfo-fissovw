import { domainNameProd, domainNameDesv } from './sistemaConfigAppBase';
export const urlsServices = {
  SSO: 'https://sso.fazendainfo.com.br/',
  BACKENDWS: 'https://fazendainfobasews.fazendainfo.com.br/api/',
};
export let ambiente = '';

if (window.location.hostname.indexOf(domainNameProd) > -1) {
  urlsServices.SSO = 'https://sso.fazendainfo.com.br/';
  urlsServices.BACKENDWS = 'https://fazendainfobasews.fazendainfo.com.br/api/';
  ambiente = 'PROD';
} else {  
  urlsServices.SSO = 'https://fazendainfosso.rdca.com.br/';
  urlsServices.BACKENDWS = 'https://fazendainfossows.rdca.com.br/api/';
  ambiente = 'HOMO';
  if (window.location.hostname.indexOf(domainNameDesv) > -1) {
    //PARA DESENVOLVIMENTO
    urlsServices.SSO = 'http://localhost:3031/';
    urlsServices.BACKENDWS = 'http://localhost:8000/api/';
    ambiente = 'DESV';
  }
}

