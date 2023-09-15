import { ProgrammingLanguageBlockProps } from './programming-language-block';
import { ConvertableHttpClients } from './types';

const golang: ConvertableHttpClients = {
  title: 'Golang',
  logo: '/art/languages/go.svg',
  clients: [
    {
      title: 'gentleman',
      href: 'https://github.com/h2non/gentleman',
    },
    {
      title: 'go-cleanhttp',
      href: 'https://github.com/hashicorp/go-cleanhttp',
    },
    {
      title: 'go-http-client',
      href: 'https://github.com/bozd4g/go-http-client',
    },
    {
      title: 'heimdall',
      href: 'https://github.com/gojektech/heimdall',
    },
    {
      title: 'request',
      href: 'https://github.com/monaco-io/request',
    },
  ],
};

const python: ConvertableHttpClients = {
  title: 'Python',
  logo: '/art/languages/python.svg',
  clients: [
    {
      title: 'requests',
      href: 'https://docs.python-requests.org/en/latest/',
    },
    {
      title: 'http.client',
      href: 'https://docs.python.org/3/library/http.client.html',
    },
    {
      title: 'httpx',
      href: 'https://www.python-httpx.org/',
    },
    {
      title: 'aiohttp',
      href: 'https://docs.aiohttp.org/en/stable/',
    },
    {
      title: 'urllib',
      href: 'https://docs.python.org/3/library/urllib.html',
    },
  ],
};

const typescript: ConvertableHttpClients = {
  title: 'Typescript',
  logo: '/art/languages/typescript.svg',
  clients: [
    {
      title: 'Axios',
      href: 'https://github.com/axios/axios',
    },
    {
      title: 'Fetch API',
      href: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API',
    },
    {
      title: 'Superagent',
      href: 'https://github.com/visionmedia/superagent',
    },
  ],
};

const javascript: ConvertableHttpClients = {
  title: 'Javascript',
  logo: '/art/languages/js.svg',
  clients: typescript.clients,
};

const c: ConvertableHttpClients = {
  title: 'C',
  logo: '/art/languages/c.svg',
  clients: [
    {
      title: 'libcurl',
      href: 'https://curl.se/libcurl/',
    },
    {
      title: 'mongoose',
      href: 'https://github.com/cesanta/mongoose',
    },
    {
      title: 'libmicrohttpd',
      href: 'https://www.gnu.org/software/libmicrohttpd/',
    },
    {
      title: 'Civetweb',
      href: 'https://github.com/civetweb/civetweb',
    },
    {
      title: 'Wt (Web Toolkit)',
      href: 'https://www.webtoolkit.eu/wt',
    },
  ],
};

const csharp: ConvertableHttpClients = {
  title: 'C#',
  logo: '/art/languages/csharp.svg',
  clients: [
    {
      title: 'HttpClient',
      href: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.http.httpclient',
    },
    {
      title: 'RestSharp',
      href: 'https://restsharp.dev/',
    },
    {
      title: 'Flurl.Http',
      href: 'https://flurl.dev/',
    },
    {
      title: 'WebClient',
      href: 'https://docs.microsoft.com/en-us/dotnet/api/system.net.webclient',
    },
    {
      title: 'Nancy.HttpClient',
      href: 'https://github.com/NancyFx/Nancy/wiki/HTTP-Client',
    },
  ],
};

const cpp: ConvertableHttpClients = {
  title: 'C++',
  logo: '/art/languages/cpp.svg',
  clients: [
    {
      title: 'cURL',
      href: 'https://curl.se/libcurl/',
    },
    {
      title: 'Poco',
      href: 'https://pocoproject.org/',
    },
    {
      title: 'Boost.Asio',
      href: 'https://www.boost.org/doc/libs/1_77_0/doc/html/boost_asio.html',
    },
    {
      title: 'Crow C++ ',
      href: 'https://github.com/ipkn/crow',
    },
    {
      title: 'cpp-httplib',
      href: 'https://github.com/yhirose/cpp-httplib',
    },
  ],
};

const java: ConvertableHttpClients = {
  title: 'Java',
  logo: '/art/languages/java.svg',
  clients: [
    {
      title: 'Apache',
      href: 'https://hc.apache.org/httpcomponents-client-4.5.x/',
    },
    {
      title: 'OkHttp',
      href: 'https://square.github.io/okhttp/',
    },
    {
      title: 'Standard Lib',
      href: 'https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/net/HttpURLConnection.html',
    },
    {
      title: 'Spring WebClient',
      href: 'https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#web-reactive',
    },
    {
      title: 'Unirest',
      href: 'http://kong.github.io/unirest-java/',
    },
  ],
};

const kotlin: ConvertableHttpClients = {
  title: 'Kotlin',
  logo: '/art/languages/kotlin.svg',
  clients: [
    {
      title: 'OkHttp',
      href: 'https://square.github.io/okhttp/',
    },
    {
      title: 'Fuel',
      href: 'https://github.com/kittinunf/Fuel',
    },
    {
      title: 'ktor-client',
      href: 'https://ktor.io/docs/client.html',
    },
    {
      title: 'Apache HttpClient',
      href: 'https://hc.apache.org/httpcomponents-client-4.5.x/',
    },
    {
      title: 'Retrofit',
      href: 'https://square.github.io/retrofit/',
    },
  ],
};

const matlab: ConvertableHttpClients = {
  title: 'MATLAB',
  logo: '/art/languages/matlab.svg',
  clients: [
    {
      title: 'webfiles',
      href: 'https://www.mathworks.com/help/matlab/webfiles.html',
    },
    {
      title: 'HTTP Toolbox',
      href: 'https://www.mathworks.com/help/matlab/http/http-client.html',
    },
    {
      title: 'mrest',
      href: 'https://github.com/mattes/mrest',
    },
    {
      title: 'MATLAB HTTP',
      href: 'https://www.mathworks.com/help/matlab/matlab-engine-for-python.html',
    },
    {
      title: 'MATLAB RESTful',
      href: 'https://undocumentedmatlab.com/blog/matlab-restful-http-client',
    },
  ],
};

const php: ConvertableHttpClients = {
  title: 'PHP',
  logo: '/art/languages/php.svg',
  clients: [
    {
      title: 'Guzzle',
      href: 'https://docs.guzzlephp.org/en/stable/',
    },
    {
      title: 'cURL',
      href: 'https://www.php.net/manual/en/book.curl.php',
    },
    {
      title: 'Requests',
      href: 'https://requests.ryanmccue.info/',
    },
    {
      title: 'HTTP Client',
      href: 'https://symfony.com/doc/current/http_client.html',
    },
    {
      title: 'Buzz',
      href: 'https://github.com/kriswallsmith/Buzz',
    },
  ],
};

const ruby: ConvertableHttpClients = {
  title: 'Ruby',
  logo: '/art/languages/ruby.svg',
  clients: [
    {
      title: 'Faraday',
      href: 'https://github.com/lostisland/faraday',
    },
    {
      title: 'HTTParty',
      href: 'https://github.com/jnunemaker/httparty',
    },
    {
      title: 'Net::HTTP',
      href: 'https://ruby-doc.org/stdlib/libdoc/net/http/rdoc/Net/HTTP.html',
    },
    {
      title: 'RestClient',
      href: 'https://github.com/rest-client/rest-client',
    },
    {
      title: 'Typhoeus',
      href: 'https://github.com/typhoeus/typhoeus',
    },
  ],
};

const rust: ConvertableHttpClients = {
  title: 'Rust',
  logo: '/art/languages/rust.svg',
  clients: [
    {
      title: 'reqwest',
      href: 'https://docs.rs/reqwest/',
    },
    {
      title: 'surf',
      href: 'https://docs.rs/surf/',
    },
    {
      title: 'isahc',
      href: 'https://docs.rs/isahc/',
    },
    {
      title: 'hyper',
      href: 'https://hyper.rs/',
    },
    {
      title: 'ureq',
      href: 'https://docs.rs/ureq/',
    },
  ],
};

const swift: ConvertableHttpClients = {
  title: 'Swift',
  logo: '/art/languages/swift.svg',
  clients: [
    {
      title: 'URLSession',
      href: 'https://developer.apple.com/documentation/foundation/urlsession',
    },
    {
      title: 'Alamofire',
      href: 'https://github.com/Alamofire/Alamofire',
    },
    {
      title: 'AFNetworking',
      href: 'https://github.com/AFNetworking/AFNetworking',
    },
    {
      title: 'Moya',
      href: 'https://github.com/Moya/Moya',
    },
    {
      title: 'SwiftHTTP',
      href: 'https://github.com/daltoniam/SwiftHTTP',
    },
  ],
};

const bash: ConvertableHttpClients = {
  title: 'Bash',
  logo: '/art/languages/bash.svg',
  clients: [
    {
      title: 'cURL',
      href: 'https://curl.se/',
    },
    {
      title: 'wget',
      href: 'https://www.gnu.org/software/wget/',
    },
  ],
};

const languages: ConvertableHttpClients[] = [
  bash,
  c,
  csharp,
  cpp,
  golang,
  java,
  javascript,
  kotlin,
  matlab,
  php,
  python,
  ruby,
  rust,
  swift,
  typescript,
];

const flattened: ProgrammingLanguageBlockProps[] = languages.flatMap(
  (language) =>
    language.clients.map((c) => ({
      title: language.title,
      logo: language.logo,
      client: c,
    }))
);

export const randomized = flattened.sort(() => Math.random() - 0.5);
