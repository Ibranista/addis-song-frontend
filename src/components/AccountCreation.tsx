import CreateUser from "../auth/CreateUser";
import CreateWithGoogle from "../auth/CreateWithGoogle";
function AccountCreation() {
  const { SignInButton } = CreateWithGoogle();
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
    </>
  );
}

export default AccountCreation;
