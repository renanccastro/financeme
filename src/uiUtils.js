import React from 'react';
import { Tunnel } from 'react-tunnels';
import { IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

export const updateAppTitle = title => {
  if (document) {
    document.title = title ? `${title} | WF-V` : 'WF-V';
  }
  return <Tunnel id="app-title">{title || 'WF-V'}</Tunnel>;
};

export const showBackButton = ({ action, history = {} } = {}) => (
  <Tunnel id="toolbar-left-icon">
    <IconButton
      style={{
        marginLeft: '-12px',
        marginRight: '20px',
      }}
      onClick={action || history.goBack}
      color="inherit"
    >
      <ArrowBack />
    </IconButton>
  </Tunnel>
);

export const updateAppBarBottom = component => (
  <Tunnel id="app-bar-bottom">{component}</Tunnel>
);

export const resetAppTitle = () => updateAppTitle('WF-V');
