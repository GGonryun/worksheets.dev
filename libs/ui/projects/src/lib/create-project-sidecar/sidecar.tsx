import { Divider } from '@mui/material';
import { TinySidecar, TinySidecarProps } from '@worksheets/ui-basic-style';
import { Flex } from '@worksheets/ui-core';
import { useLayout } from '@worksheets/ui/common';
import { FC, useState } from 'react';
import { SidecarHeader } from './header';
import { FirstStep } from './first-step';
import { SecondStep } from './second-step';
import { ThirdStep } from './third-step';
import { FourthStep } from './fourth-step';
import { SidecarFooter } from './sidecar-footer';
import { replaceSpaces } from '@worksheets/util/strings';
import { useProjects } from '../../hooks';
import {
  CreateProjectRequest,
  defaultCreateProjectRequest,
} from '@worksheets/schemas-projects';

export const CreateProjectSidecar: FC<
  Pick<TinySidecarProps, 'open' | 'onClose'>
> = ({ open, onClose }) => {
  const data = useProjects();
  const { isMobile, isTablet } = useLayout();

  const [active, setActive] = useState(0);
  const [form, setForm] = useState<CreateProjectRequest>(
    defaultCreateProjectRequest
  );

  const handleSaveForm = async () => {
    await data.createProjectAndSelect(form);
    onClose();
  };

  const handleClose = () => {
    onClose();
    setActive(0);
    setForm(defaultCreateProjectRequest);
  };

  return (
    <TinySidecar
      open={open}
      onClose={handleClose}
      width={isMobile ? '90%' : isTablet ? '70%' : '50%'}
      maxWidth={isTablet ? '100%' : 600}
      slow
    >
      <Flex column p={3} gap={3}>
        <SidecarHeader onClose={handleClose} activeStep={active} />
        <Divider sx={{ mb: 2 }} />
        {active === 0 && (
          <FirstStep
            initialValue={form.title}
            onContinue={(title) => {
              setActive(1);
              setForm({
                ...form,
                title,
              });
            }}
          />
        )}
        {active === 1 && (
          <SecondStep
            initialValue={form.id || replaceSpaces(form.title, '-')}
            onPrevious={() => {
              setActive(0);
            }}
            onContinue={(id) => {
              setActive(2);
              setForm({
                ...form,
                id,
              });
            }}
          />
        )}
        {active === 2 && (
          <ThirdStep
            initialValue={form.features}
            onPrevious={() => {
              setActive(1);
            }}
            onContinue={(features) => {
              setActive(3);
              setForm({
                ...form,
                features,
              });
            }}
          />
        )}
        {active === 3 && (
          <FourthStep
            form={form}
            onSave={handleSaveForm}
            onPrevious={() => setActive(2)}
            onJumpTo={(step) => setActive(step)}
          />
        )}
        <Divider sx={{ mb: 4 }} />

        <SidecarFooter />
      </Flex>
    </TinySidecar>
  );
};
