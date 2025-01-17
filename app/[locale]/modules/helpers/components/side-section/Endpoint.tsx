import React from 'react';

import { AdminEndpointComponent } from './endpoint/AdminEndpoint';
import { HelperEndpointComponent } from './endpoint/HelperEndpoint';

const EndpointComponent = () => {
  return (
    <div className="flex flex-grow flex-col gap-1 pt-4">
      <HelperEndpointComponent />
      <AdminEndpointComponent />
    </div>
  );
};

export default EndpointComponent;
