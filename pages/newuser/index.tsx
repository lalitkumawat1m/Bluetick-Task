import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';


const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [isEmployed, setIsEmployed] = useState(false);
  const [isFounder, setIsFounder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // Send movie data to the backend
      await axios.post("/api/users", {
        firstName,
        lastName,
        userName,
        age,
        maritalStatus,
        isEmployed,
        isFounder
      });

      // Reset form after submission
      setFirstName("");
      setLastName("");
      setUserName("");
      setAge(0);
      setMaritalStatus("");
      setIsEmployed(false);
      setIsFounder(false);
      alert("User added successfully!");
      router.push('/');
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user. Please try again.");
    }  finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-xl font-bold mb-4">Add new user</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="First name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Last name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor=""
          >
            User Name
          </label>
          <input
            id="user_name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="User name"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor=""
          >
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.valueAsNumber)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Age"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor=""
          >
            Marital Status
          </label>
          <input
            id="marital_status"
            type="text"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Married or Unmarried"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor=""
          >
           Is Employed
          </label>
          <input
            id="is_employed"
            type="text"
            value={isEmployed.toString()}
            onChange={(e) => setIsEmployed(e.target.value === "true")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="true or false"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor=""
          >
           Is Founder
          </label>
          <input
            id="is_founder"
            type="text"
            value={isFounder.toString()}
            onChange={(e) => setIsFounder(e.target.value==="true")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="true or false"
            required
          />
        </div>

        <div className="text-right">
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#6558f5] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Create User"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
