import React, { Component } from 'react';

import QuecRNDeviceModule from './device/module';
import QuecRNLanguageModule from './language/module';
import QuecRNRouterModule from './router/module';
import QuecRNUserModule from './user/module';

export default {
  ...QuecRNDeviceModule,
  ...QuecRNLanguageModule,
  ...QuecRNRouterModule,
  ...QuecRNUserModule
};
