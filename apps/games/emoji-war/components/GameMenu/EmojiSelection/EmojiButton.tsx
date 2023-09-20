import { FC } from 'react';
import styles from './EmojiButton.module.scss';
import { motion } from 'framer-motion';

export const EmojiButton: FC<{
  emoji: string;
  onClick: () => void;
  active: boolean;
}> = ({ emoji, onClick, active }) => (
  <div className={styles['emoji-container']}>
    <button className={styles['emoji-button']} key={emoji} onClick={onClick}>
      {emoji}
    </button>
    {active && (
      <motion.div
        layoutId={`active-emoji`}
        className={styles['active-emoji']}
      />
    )}
  </div>
);
