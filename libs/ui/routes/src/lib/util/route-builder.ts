import { CreatePathFunction, Route } from '../types';

export const routeBuilder = (baseUrl: string) =>
  function createRoute<
    TPath extends string,
    TBookmarks,
    TQuery,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TRoutes extends Route<any, any, any, any>
  >(route: {
    path: TPath;
    bookmarks?: TBookmarks;
    query?: TQuery;
    routes?: TRoutes;
  }): Route<TPath, TBookmarks, TQuery, TRoutes> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const path: CreatePathFunction<TPath, TBookmarks, TQuery> = (opts: any) => {
      if (!route.path) {
        throw new Error('Route path is required');
      }

      let path: string = route.path;
      if (!opts) {
        return path;
      }

      // if the route.path has a param, replace it with the value from the opts
      if (opts.params) {
        // replace the path with the params
        path = path.replace(/\[.*?\]/g, (match) => {
          const key = match.replace(/\[|\]/g, '');
          return (
            opts.params?.[key as keyof typeof opts.params]?.toString() ?? ''
          );
        });
      }
      // if the route.path has a query, add it to the url
      if (opts.query) {
        const query = new URLSearchParams();
        for (const key in opts.query) {
          query.append(key, opts.query[key].toString());
        }
        path += `?${query.toString()}`;
      }
      // if the route.path has a bookmark, add it to the url
      if (opts.bookmark) {
        path += `#${opts.bookmark}`;
      }

      return path;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const url: CreatePathFunction<TPath, TBookmarks, TQuery> = (opts: any) => {
      return `${baseUrl}${path(opts)}`;
    };

    return {
      raw: {
        path: route.path,
        url: `${baseUrl}${route.path}`,
      },
      url,
      path,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(route.routes as any),
    };
  };
