import React from 'react';
import type { NextPage } from 'next';

import NoSSR from '../components/NoSSR';
import Layout from '../components/Layout';
import Calculator from '../components/Calculator';

const Home: NextPage = () => {
  return (
    <NoSSR>
      <Layout>
        <div className="py-24 sm:py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-2 lg:px-4">
            <div className="sm:text-center">
              <h2 className="text-3xl font-semibold leading-8 text-amber-700 sm:center">
                Menstrual Cycle Tracker
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray 700">
              This app is designed to assist women in monitoring and managing their menstrual cycles with ease and convenience.
              Simply input the length of your last period and how long your menstrual cycle typically lasts, and the tracker will 
              provide a good estimate of when you're likely ovulating. 
              By consistently inputting this information, we hope you'll gain valuable insights into your unique menstrual patterns.
              <br />
              
              </p>

            </div>

            <Calculator/>

            <div className="mt-20 py-4 text-center">
            </div>
          </div>
        </div>
      </Layout>
    </NoSSR>
  );
};

export default Home;
