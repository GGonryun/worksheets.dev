import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

interface Error {
  statusCode?: number | null | undefined;
}

const Error: NextPage<Error> = ({ statusCode }) => {
  return (
    <section
      className="flex flex-row items-center justify-center px-4 py-12 text-center"
      style={{ minHeight: 'calc(100vh - 150px)' }}
    >
      <div>
        <p className="mb-6 text-xl">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        <Link href="/">
          <a
            className="inline-block px-8 py-4 leading-none text-white rounded shadow bg-primary-500 hover:bg-green-400"
            href="/"
          >
            Return to the homepage
          </a>
        </Link>
      </div>
    </section>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
