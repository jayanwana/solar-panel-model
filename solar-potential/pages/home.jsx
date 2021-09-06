import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '@/hooks/index';
import ModelInputs from '@/components/model/inputs';
import Results from '@/components/model/results';
import Router from 'next/router';

const IndexPage = () => {
  const [user] = useCurrentUser();
  const [data, setData] = useState(null);
  useEffect(() => {
    // redirect to login if user is not authenticated
    if (!user) Router.replace('/');
  }, [user]);
  return (
    <>
      <style jsx>
        {`
          p {
            text-align: center;
            color: #888;
          }
          h3 {
            color: #555;
          }
        `}
      </style>
      <div style={{ marginBottom: '2rem' }}>
        <h2>
          { data ? 'Model Results Page' : 'Model Input Page' }
        </h2>
      </div>
      <div>
        {
          data ? (<Results data={data.powerGenerated} />) : (<ModelInputs setData={setData} />)
        }
      </div>
    </>
  );
};

export default IndexPage;
