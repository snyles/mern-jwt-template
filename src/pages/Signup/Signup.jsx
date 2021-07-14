import SignupForm from '../../components/SignupForm/SignupForm';

export default function Signup({handleSignupOrLogin}) {
  return (
    <main>
      <SignupForm handleSignupOrLogin={handleSignupOrLogin} />
    </main>
  );
}