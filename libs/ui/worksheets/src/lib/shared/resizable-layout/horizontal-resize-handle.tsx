import { PanelResizeHandle } from 'react-resizable-panels';
import styles from './resizer.module.scss';
export function HorizontalResizeHandler({
  className = '',
  id,
}: {
  className?: string;
  id?: string;
  horizontal?: boolean;
  vertical?: boolean;
}) {
  return (
    <PanelResizeHandle
      className={[styles.ResizeHandleOuter, className].join(' ')}
      id={id}
    >
      <div className={styles.HorizontalIconBox}>
        <svg
          className={styles.HorizontalIcon}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 10 100"
        >
          <g>
            <line
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeMiterlimit="10"
              x1="5"
              y1="10"
              x2="5"
              y2="90"
            />
          </g>
        </svg>
      </div>
    </PanelResizeHandle>
  );
}
