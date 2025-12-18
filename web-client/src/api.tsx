

//Post request to login endpoint
export const login= async (userEmail: string, userPassword: string) => {
   const res= await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email:userEmail, password:userPassword })
  });

  console.log('Response status:', res.status);
  const data = await res.json();
  if (!res.ok) {
    return { error: data.message || 'Login failed'};
  } 
   if (data.token) {
     localStorage.setItem('token', data.token);
   }
   return { success: data.message, user: data.user, token: data.token };
};