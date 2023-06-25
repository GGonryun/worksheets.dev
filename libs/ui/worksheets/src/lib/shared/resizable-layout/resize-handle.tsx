import { PanelResizeHandle } from 'react-resizable-panels';
import styles from './resizer.module.scss';
export function ResizeHandle({
  className = '',
  id,
  horizontal,
  vertical,
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
      <div className={styles.ResizeHandleInner}>
        <div
          className={
            horizontal
              ? styles.HorizontalIconBox
              : vertical
              ? styles.VerticalIconBox
              : ''
          }
        >
          <svg
            className={
              horizontal
                ? styles.HorizontalIcon
                : vertical
                ? styles.VerticalIcon
                : ''
            }
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 14H19M5 10H19" stroke="#000000" />
          </svg>
        </div>
      </div>
    </PanelResizeHandle>
  );
}
