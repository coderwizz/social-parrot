import React, { FC } from 'react';

const DisclaimerNotice: FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="text-sm leading-5 text-gray-800">
        <span className="font-semibold text-primary">Note:</span>
        <br />
        For optimal performance, please use this app in areas with a stable internet connection. Occasionally, there may be brief delays while the model processes your request. No data is stored; i.e. all photos captured are deleted after a short period.
      </p>
    </div>
  );
};

export default DisclaimerNotice;