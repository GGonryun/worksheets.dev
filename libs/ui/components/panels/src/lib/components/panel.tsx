import { Divider } from '@mui/material';

import { usePanelController } from '../hooks/use-panel-controller';
import { PanelBox } from './panel-box';
import { PanelFooter, PanelFooterProps } from './panel-footer';
import { PanelHeader, PanelHeaderProps } from './panel-header';
import { PanelNote, PanelNoteProps } from './panel-note';

export function Panel<T>({
  bookmark,
  header,
  footer,
  note,
  sections,
}: {
  bookmark?: T;
  header: PanelHeaderProps;
  footer: PanelFooterProps;
  note?: PanelNoteProps;
  sections: (
    active: T | undefined,
    toggle: (panel: string | T | undefined) => void
  ) => React.ReactNode | React.ReactNode[];
}) {
  const { active, toggleActive } = usePanelController(bookmark);

  return (
    <PanelBox>
      <PanelHeader {...header} />
      <Divider />
      {sections(active, toggleActive)}
      <Divider />
      {note && <PanelNote {...note} />}
      <PanelFooter {...footer} />
    </PanelBox>
  );
}
