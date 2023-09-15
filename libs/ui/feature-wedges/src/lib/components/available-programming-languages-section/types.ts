export type HttpClient = {
  title: string;
  href: string;
};

export type ConvertableHttpClients = {
  title: string;
  logo: string;
  clients: HttpClient[];
};
