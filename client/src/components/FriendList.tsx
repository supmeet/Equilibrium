import { useEffect, useState } from "react";
import axios from "axios";

interface Friend {
  id: string;
  name: string;
  balance: number;
}

const apiUrl = import.meta.env.VITE_API_URL;

const FriendList = () => {
  const [friends, setFriends] = useState<Friend[]>([]); // Initialize with an empty array
  const [friendEmail, setFriendEmail] = useState("");

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const res = await axios.get<Friend[]>(`${apiUrl}/user/friends`, {
        withCredentials: true,
      });

      // Ensure the response is an array
      if (Array.isArray(res.data)) {
        setFriends(res.data);
      } else {
        console.error("Expected an array, but received:", res.data);
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const addFriend = async () => {
    if (!friendEmail.trim()) return;
    try {
      await axios.post(
        `${apiUrl}/user/friends/add`,
        { friendEmail },
        { withCredentials: true }
      );
      setFriendEmail("");
      fetchFriends();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const removeFriend = async (friendId: string) => {
    try {
      await axios.delete(`${apiUrl}/user/friends/remove/${friendId}`, {
        withCredentials: true,
      });
      fetchFriends();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Friends List</h2>

      {/* Friend Addition */}
      <div className="flex mb-4">
        <input
          type="email"
          placeholder="Enter friend's email"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          className="p-2 border rounded-l-md w-full"
        />
        <button
          onClick={addFriend}
          className="p-2 bg-blue-500 text-white rounded-r-md"
        >
          Add Friend
        </button>
      </div>

      {/* Friend List */}
      {friends.length > 0 ? (
        <ul className="space-y-2">
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="p-3 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <span>
                {friend.name} -{" "}
                <strong>
                  {friend.balance >= 0
                    ? `Lent: ₹${friend.balance}`
                    : `Owes: ₹${Math.abs(friend.balance)}`}
                </strong>
              </span>
              <button
                onClick={() => removeFriend(friend.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No friends added yet.</p>
      )}
    </div>
  );
};

export default FriendList;
