// states
import { useState, useEffect, useTransition, useCallback } from 'react';

// styles
import '../../css/crud.css'

// json
import crudElements from './crudElements.json'

export const Crud = () => {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isPending, startTransition] = useTransition();

  // Load from localStorage
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('records')) || [];

    // Patch any users that are missing IDs
    const patchedUsers = savedUsers.map(user =>
      user.id ? user : { ...user, id: Date.now() + Math.random() }
    );

    setUsers(patchedUsers);
    setFilterUsers(patchedUsers);
    localStorage.setItem('records', JSON.stringify(patchedUsers));
  }, []);

  // Debounce setup
  function debounce(func, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const runSearch = (searchItem) => {
    startTransition(() => {
      const filtered = users.filter((user) =>
        crudElements.some((col) => {
          const value = user[col.key];
          return (value?.toString().toLowerCase() || '').includes(searchItem);
        })
      );
      setFilterUsers(filtered);
    });
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      runSearch(value.toLowerCase());
    }, 300),
    [users]
  );

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure to Delete?");
    if (isConfirmed) {
      const updated = users.filter(user => user.id !== id);
      setUsers(updated);
      setFilterUsers(updated);
      localStorage.setItem('records', JSON.stringify(updated));
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditForm({ ...user });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updated = users.map(user =>
      user.id === editingId ? { ...editForm } : user
    );
    setUsers(updated);
    setFilterUsers(updated);
    localStorage.setItem('records', JSON.stringify(updated));
    setEditingId(null);
    setEditForm({});
  };

  return (
    <>
      <div className="input-search">
        <input
          type="text"
          className="search"
          placeholder="Search Name, Age, City..."
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>S.NO</th>
            {crudElements.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterUsers.map((user, index) => {
            const isEditing = editingId === user.id;
            return (
              <tr key={user.id || index}>
                <td>{index + 1}</td>
                {crudElements.map((col) => (
                  <td key={col.key + (user.id || index)}>
                    {isEditing ? (
                      col.type === 'select' ? (
                        <select
                          name={col.key}
                          value={editForm[col.key] || ''}
                          onChange={handleEditChange}
                        >
                          <option value="">Select {col.label}</option>
                          {col.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={col.key}
                          value={editForm[col.key] || ''}
                          onChange={handleEditChange}
                        />
                      )
                    ) : (
                      user[col.key] || 'N/A'
                    )}
                  </td>
                ))}
                <td>
                  {isEditing ? (
                    <button className="btn green" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="btn green" onClick={() => handleEdit(user)}>Edit</button>
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <button className="btn red" onClick={() => setEditingId(null)}>Cancel</button>
                  ) : (
                    <button className="btn red" onClick={() => handleDelete(user.id)}>Delete</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
