import axios from 'axios';
import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Link from 'next/link';


interface User {
  "first_name": string,
  "last_name": string,
  "username": string,
  "age": number,
  "marital_status": string,
  "is_employed": boolean,
  "is_founder": boolean
}

const Shimmer = () => {
  return (
    <div className="bg-[#e0defd] p-4 rounded-md shadow-lg animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="flex justify-end">
        <div className="h-4 bg-gray-300 rounded w-10 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-10 ml-2 mb-2"></div>
      </div>
    </div>
  );
};

export default function Home() {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://mocki.io/v1/a6a0fb6b-a84a-4934-b3f2-5c92cc77c44e');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false); // Stop loading when data is fetched
    }
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteUser = async (first_name: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${first_name}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.first_name !== first_name));
        alert('User and its reviews deleted successfully.');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gray-200">
        <header className="container mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl text-black font-medium">Bluetick Consultants</h1>
          <div>
            <Link href={`/newuser`}>
              <button className="bg-[#6558f5] text-white px-4 py-2 rounded-md">
                Add new user
              </button>
            </Link>
          </div>
        </header>
      </div>

      {/* Main Section */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-medium text-black mb-8">
           List of all users!
        </h2>

        {/* Search Bar */}
        <div className="mb-8 flex">
          <input
            type="text"
            placeholder="Search user"
            className="border border-[#6558f5] text-black focus:border-[#6558f5] rounded-md px-4 py-2 w-1/2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Show shimmer effect if data is still loading
            <>
              <Shimmer />
              <Shimmer />
              <Shimmer />
            </>
          ) : filteredUsers.length > 0 ? (
            // Show filtered users once loaded
            filteredUsers.map((user) => (
              <div
                key={user.first_name}
                className="bg-[#e0defd] p-4 rounded-md shadow-lg"
              >
                <Link href={`/user/${user.first_name}`}>
                  <h3 className="text-xl text-black font-normal mb-2">
                    {user.first_name +" "+ user.last_name}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    Username: {user.username}
                  </p>
                  <p className="text-gray-800 mb-1">
                    Age: {user.age}
                  </p>
                  <p className="text-gray-600 mb-1">
                    Maritan Status: {user.marital_status}
                  </p>
                  <p className="text-gray-800">
                    Employment Status: {user.is_employed ? "Employed" : "Unemployed"}
                  </p>
                  <p className="text-gray-600 mb-1">
                    Founder Status: {user.is_founder ? "Founder" : "Not a founder"}
                  </p>
                  </Link>
                  <div className="text-right">
                    <div className="flex justify-end space-x-4">
                    <Link href={`/user/${user.first_name}/edit`}>
                      <button className="text-gray-600 hover:text-gray-800">
                        <i className="fas fa-edit"></i>
                      </button>
                      </Link>
                      <button className="text-gray-600 hover:text-gray-800" onClick={() => handleDeleteUser(user.first_name)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
               
              </div>
            ))
          ) : (
            <p>No user found</p>
          )}
        </div>
      </main>
    </div>
  );
}
