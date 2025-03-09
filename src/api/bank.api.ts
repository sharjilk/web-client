export type ConnectionPayload = {
  [key: string]: unknown;
};

export const fetchBanks = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/banks`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const connectBankAccount = async (data: {
  bankName: string;
  connectionPayload: ConnectionPayload;
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/connect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const disconnectBankAccount = async (data: { accountId: string }) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/disconnect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const fetchBalances = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/balances`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const fetchTransactions = async (params: {
  category?: string;
  startDate?: string;
  endDate?: string;
}) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/bank/transactions`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    credentials: 'include',
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};
