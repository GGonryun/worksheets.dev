import { PanelResizeHandle } from 'react-resizable-panels';
import styles from './resizer.module.scss';
export function VerticalResizeHandle({
  className = '',
  id,
}: {
  className?: string;
  id?: string;
}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(' ')}
      id={id}
    >
      <div style={{ width: '100%', position: 'relative' }}>
        <svg
          style={{
            height: '8px',
            paddingTop: '2px',
            paddingBottom: '2px',
            position: 'relative',
            width: '100%',
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 100 10"
        >
          <g>
            <line
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="10"
              y1="5"
              x2="90"
              y2="5"
            />
          </g>
        </svg>
      </div>
    </PanelResizeHandle>
  );
}
