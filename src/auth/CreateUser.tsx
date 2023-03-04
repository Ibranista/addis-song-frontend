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
      <form action="" className="mx-auto max-w-md">
  <section className="mb-4">
    <label htmlFor="displayName" className="block mb-2">User Name:</label>
    <input
      type="text"
      id="displayName"
      name="displayName"
      value={formData.displayName}
      onChange={handleChange}
      required
      placeholder="display name"
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </section>
  <section className="mb-4">
    <label htmlFor="email" className="block mb-2">Email:</label>
    <input
      type="email"
      id="email"
      name="email"
      onChange={handleChange}
      value={formData.email}
      required
      placeholder="email"
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </section>
  <section className="mb-4">
    <label htmlFor="password" className="block mb-2">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      onChange={handleChange}
      value={formData.password}
      required
      placeholder="password"
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </section>
  <button
    type="submit"
    onClick={createAccount}
    className="mb-3 w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
  >
    Create Account
  </button>
</form>

      {/* </FormContainer> */}
    </>
  );
}

export default CreateUser;
