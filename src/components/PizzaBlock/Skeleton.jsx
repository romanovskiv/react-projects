import React from 'react';

import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="256" rx="10" ry="10" width="280" height="30" />
    <rect x="0" y="305" rx="10" ry="10" width="280" height="88" />
    <rect x="127" y="4013" rx="30" ry="30" width="153" height="45" />
    <rect x="0" y="422" rx="0" ry="0" width="90" height="27" />
  </ContentLoader>
);

export default Skeleton;
