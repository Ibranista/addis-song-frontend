import CreateUser from "../auth/CreateUser";
import CreateWithGoogle from "../auth/CreateWithGoogle";
function AccountCreation() {
  const { SignInButton, SignInWithEmail } = CreateWithGoogle();
  return (
    <>
      <CreateUser />
      <section
        style={{
          background: "grey ",
          padding: "5px",
          color: "white",
          textAlign: "center",
        }}
      >
        OR
      </section>
      <SignInButton />
      {/* already have account option */}
      <section
        style={{
          background: "grey ",
          padding: "5px",
          color: "white",
          textAlign: "center",
        }}
      >
        Already have an account?
      </section>
      <SignInWithEmail />
    </>
  );
}

export default AccountCreation;
