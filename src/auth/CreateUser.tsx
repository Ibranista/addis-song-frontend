import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";
import FormStyles from "../styles/FormStyles";
function CreateUser() {
  const FormContainer = FormStyles();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // createUserWithEmailAndPassword
  const createAccount = async (e: any) => {
    e.preventDefault();
    try {
      let users = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(users.user, {
        displayName: formData.displayName,
      });
      toast.success("user successfully created!");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      {/* <FormContainer> */}
        <form action="">
          <section>
            <label htmlFor="displayName">User Name:</label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              required
              placeholder="display name"
            />
          </section>
          <section>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
              placeholder="email"
            />
          </section>
          <section>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
              placeholder="password"
            />
          </section>
          <button type="submit" onClick={createAccount}>
            Create Account
          </button>
        </form>
      {/* </FormContainer> */}
    </>
  );
}

export default CreateUser;
