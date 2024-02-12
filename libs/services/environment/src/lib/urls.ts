const CHARITY_GAMES_BASE_URL =
  (process.env['NEXT_PUBLIC_CHARITY_GAMES_BASE_URL'] ||
    process.env['CHARITY_GAMES_BASE_URL'] ||
    process.env['BASE_URL']) ??
  '';

export { CHARITY_GAMES_BASE_URL };
