import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useCurrentUser } from '@/hooks/index';

const SignupPage = () => {
  const [user, { mutate }] = useCurrentUser();
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) Router.replace('/home');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.currentTarget.email.value
    const name = e.currentTarget.name.value
    const password = e.currentTarget.password.value
    const confirmPassword = e.currentTarget.confirmPassword.value
    const agree = e.currentTarget.agree.checked
    if (!agree) {
      setErrorMsg('You must agree before proceeding');
    } else if (!name) {
      setErrorMsg('Please enter a name')
    } else if (!password) {
      setErrorMsg('Please enter a password')
    } else if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
    } else {
      const body = { email, name, password};
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (res.status === 201) {
        const userObj = await res.json();
        mutate(userObj);
      } else {
        setErrorMsg(await res.text());
      }
    }
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
      </Head>
      <div>
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit}>
          {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
          <label htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
            />
          </label>
          <label htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
            />
          </label>
          <label htmlFor="password">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
            />
          </label>
          <label htmlFor="confirmPassword">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
          </label>
          <label htmlFor="agree">
            <input
              id="agree"
              name="agree"
              type="checkbox"
            />
          By clicking submit, you are agreeing to having any data entered on this page stored by us
          </label>

          <button type="submit">Sign up</button>
        </form>
        <p style={{ color: '#777', textAlign: 'center' }}>
          By clicking submit, you are agreeing to having any data entered on this page stored by us.
        </p>
      </div>
    </>
  );
};

export default SignupPage;
