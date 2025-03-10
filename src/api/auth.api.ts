export const signUp = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const verifyOTP = async (data: {
  email: string;
  otp: string;
  firstname: string;
  lastname: string;
  password: string;
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const signIn = async (data: { email: string; password: string }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const logoutApi = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  });
  if (res.status === 401) {
    return null;
  }
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const forgotPassword = async (data: { email: string }) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const resetPassword = async (data: {
  resetToken: string;
  newPassword: string;
}) => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/reset-password`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
