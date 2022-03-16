const getRecipientEmail = (users, userLoggedIn) =>
  users?.filter(e => e !== userLoggedIn)[0];

export default getRecipientEmail;
