import { useMutation } from '@apollo/react-hooks';
import React from 'react'
import queries from '../queries'

const SignUp = () => {
  const [createUser, { loading, error, data }] = useMutation( queries.CREATE_USER
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    const dob = form.dob.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const country = form.country.value;
    const profilePic = form.profilePic.value || undefined;
    const bio = form.bio.value || undefined;
    const isPremium = false;

    try {
      const result = await createUser({
        variables: {
          username,
          password,
          dob,
          phone,
          email,
          country,
          profilePic,
          bio,
          isPremium,
        },
      });

      console.log('User created:', result.data.createUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
};

export default SignUp