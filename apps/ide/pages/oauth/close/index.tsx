import dynamic from 'next/dynamic';

const Close = dynamic(
  () => {
    return import('./close');
  },
  { ssr: false }
);

// Closer concept: https://github.com/modestduck/gwenyth/commit/cf96ea3b56a3def3720adce9b0c77ba78b10dcc4
export default function Closer() {
  return <Close />;
}
