import React, { useState } from 'react';

const UserPage = () => {
    const [users, setUsers] = useState([
        { id: 1, firstName: 'Abhilash', lastName: 'Gudise', email: 'abhilash@stelliteworks.com', lastSignIn: '1 month ago', contactNumber: '', location: '', status: 'Active' },
        { id: 2, firstName: 'Anusha', lastName: 'Muttukundu', email: 'anusha.muttukundu@stelliteworks.com', lastSignIn: 'Never signed in', contactNumber: '', location: '', status: 'Active' },
        { id: 3, firstName: 'Deepak', lastName: 'Ambati', email: 'deepak@stelliteworks.com', lastSignIn: '1 month ago', contactNumber: '', location: '', status: 'Active' },
        { id: 4, firstName: 'Gowtham', lastName: 'Parasa', email: 'gowtham@stelliteworks.com', lastSignIn: 'Yesterday', contactNumber: '', location: '', status: 'Active' },
        { id: 5, firstName: 'Jahnavi', lastName: 'Yalamanchi', email: 'jahnavi@stelliteworks.com', lastSignIn: '1 month ago', contactNumber: '', location: '', status: 'Active' },
    ]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', lastSignIn: '', contactNumber: '', location: '', status: '' });
    const [editUser, setEditUser] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [menuOpen, setMenuOpen] = useState(null);
    const [isPermissionsTrayOpen, setIsPermissionsTrayOpen] = useState(false);
    const [selectedUserForPermissions, setSelectedUserForPermissions] = useState(null);
    const [userGroup, setUserGroup] = useState('Consultant');
    const [permissions, setPermissions] = useState({
        auditing: true,
        allocateJobAuthority: true,
        candidateActivation: true,
        candidateDocuments: false,
        financialInformation: false,
        jobPosting: false,
    });

    const handleAddUser = () => {
        if (
            newUser.firstName.trim() &&
            newUser.lastName.trim() &&
            newUser.email.trim()
        ) {
            const newUsr = {
                id: users.length + 1,
                firstName: newUser.firstName.trim(),
                lastName: newUser.lastName.trim(),
                email: newUser.email.trim(),
                lastSignIn: 'Never signed in',
                contactNumber: newUser.contactNumber.trim(),
                location: newUser.location.trim(),
                status: 'Active',
            };
            setUsers([...users, newUsr]);
            setNewUser({ firstName: '', lastName: '', email: '', lastSignIn: '', contactNumber: '', location: '', status: '' });
            setIsAddModalOpen(false);
            alert('User added successfully (simulated).');
        }
    };

    const handleEditUser = () => {
        if (
            newUser.firstName.trim() &&
            newUser.lastName.trim() &&
            newUser.email.trim() &&
            editUser
        ) {
            const updatedUsers = users.map((user) =>
                user.id === editUser.id
                    ? {
                          ...user,
                          firstName: newUser.firstName.trim(),
                          lastName: newUser.lastName.trim(),
                          email: newUser.email.trim(),
                          contactNumber: newUser.contactNumber.trim(),
                          location: newUser.location.trim(),
                      }
                    : user
            );
            setUsers(updatedUsers);
            setNewUser({ firstName: '', lastName: '', email: '', lastSignIn: '', contactNumber: '', location: '', status: '' });
            setEditUser(null);
            setIsEditModalOpen(false);
            alert('User updated successfully (simulated).');
        }
    };

    const openEditModal = (user) => {
        setEditUser(user);
        setNewUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            lastSignIn: user.lastSignIn,
            contactNumber: user.contactNumber,
            location: user.location,
            status: user.status,
        });
        setIsEditModalOpen(true);
    };

    const handleSelectUser = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleSelectAll = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map((user) => user.id));
        }
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    const getInitialsColor = (firstName) => {
        const colors = ['#A78BFA', '#FBBF24', '#F87171', '#34D399', '#60A5FA'];
        return colors[firstName.charCodeAt(0) % colors.length];
    };

    const handleMenuToggle = (userId) => {
        setMenuOpen(menuOpen === userId ? null : userId);
    };

    const handleMenuAction = (action, userId) => {
        const user = users.find((u) => u.id === userId);
        switch (action) {
            case 'setup':
                setSelectedUserForPermissions(user);
                setIsPermissionsTrayOpen(true);
                break;
            case 'move':
                alert(`Moving ${user.firstName} ${user.lastName} to another group (simulated).`);
                break;
            case 'disable':
                alert(`Disabling ${user.firstName} ${user.lastName} (simulated).`);
                break;
            case 'remove':
                if (window.confirm(`Are you sure you want to remove ${user.firstName} ${user.lastName}?`)) {
                    setUsers(users.filter((u) => u.id !== userId));
                    setSelectedUsers(selectedUsers.filter((id) => id !== userId));
                    setMenuOpen(null);
                    alert('User removed successfully (simulated).');
                }
                break;
            default:
                break;
        }
        setMenuOpen(null);
    };

    const handlePermissionChange = (permission) => {
        setPermissions((prev) => ({ ...prev, [permission]: !prev[permission] }));
    };

    const handleSavePermissions = () => {
        alert(`Permissions saved for ${selectedUserForPermissions.firstName} ${selectedUserForPermissions.lastName} (simulated).`);
        setIsPermissionsTrayOpen(false);
    };

    return (
        <div style={{ padding: '24px', position: 'relative' }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #E5E7EB',
            }}>
                <p style={{ color: '#6B7280', marginBottom: '16px' }}>
                    This section lists the users that have been added to your organization account. Click on a user’s name to view detailed information about the particular user or to change any user-specific settings. <a href="#" style={{ color: '#3B82F6', textDecoration: 'underline' }}>Learn more</a>
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            style={{
                                backgroundColor: '#4A90E2',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                border: 'none',
                                transition: 'background-color 0.3s',
                                cursor: 'pointer',
                            }}
                        >
                            + Add
                        </button>
                        <button style={{
                            border: '1px solid #D1D5DB',
                            color: '#333333',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                            Invites
                        </button>
                        <button style={{
                            border: '1px solid #D1D5DB',
                            color: '#333333',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            Import
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                        <button style={{
                            border: '1px solid #D1D5DB',
                            color: '#333333',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            Export
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                        <button style={{
                            border: '1px solid #D1D5DB',
                            color: '#333333',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                            </svg>
                            Roles
                        </button>
                        <button style={{
                            border: '1px solid #D1D5DB',
                            color: '#333333',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                            Bulk Delete
                        </button>
                        <button style={{
                            border: '1px solid #D1D5DB',
                            color: '#333333',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            backgroundColor: 'transparent',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}>
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                            </svg>
                            Filter
                            <svg style={{ width: '16px', height: '16px', fill: '#333333' }} viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5z"/>
                            </svg>
                        </button>
                    </div>
                    <p style={{ color: '#333333', fontWeight: '600' }}>Total users: {users.length}</p>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F3F4F6' }}>
                                <th style={{ padding: '12px', color: '#333333', fontWeight: '600' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.length === users.length}
                                        onChange={handleSelectAll}
                                        style={{ marginRight: '8px' }}
                                    />
                                </th>
                                <th style={{ padding: '12px', color: '#333333', fontWeight: '600' }}>Name & Email</th>
                                <th style={{ padding: '12px', color: '#333333', fontWeight: '600' }}>Last Sign In</th>
                                <th style={{ padding: '12px', color: '#333333', fontWeight: '600' }}>Contact Number</th>
                                <th style={{ padding: '12px', color: '#333333', fontWeight: '600' }}>Location</th>
                                <th style={{ padding: '12px', color: '#333333', fontWeight: '600' }}>Status</th>
                                <th style={{ padding: '12px', color: '#333333', fontWeight: '600' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                    <td style={{ padding: '12px' }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => handleSelectUser(user.id)}
                                        />
                                    </td>
                                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{
                                            width: '32px',
                                            height: '32px',
                                            backgroundColor: getInitialsColor(user.firstName),
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontWeight: '600',
                                            fontSize: '14px',
                                        }}>
                                            {getInitials(user.firstName, user.lastName)}
                                        </div>
                                        <div>
                                            <button
                                                onClick={() => openEditModal(user)}
                                                style={{
                                                    color: '#3B82F6',
                                                    background: 'none',
                                                    border: 'none',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {user.firstName} {user.lastName}
                                            </button>
                                            <p style={{ color: '#6B7280', fontSize: '14px' }}>{user.email}</p>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px', color: '#333333' }}>{user.lastSignIn}</td>
                                    <td style={{ padding: '12px', color: '#333333' }}>{user.contactNumber || '-'}</td>
                                    <td style={{ padding: '12px', color: '#333333' }}>{user.location || '-'}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <svg style={{ width: '16px', height: '16px', fill: '#10B981' }} viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                            </svg>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', position: 'relative' }}>
                                        <button
                                            onClick={() => handleMenuToggle(user.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            <svg style={{ width: '16px', height: '16px', fill: '#6B7280' }} viewBox="0 0 24 24">
                                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                            </svg>
                                        </button>
                                        {menuOpen === user.id && (
                                            <div style={{
                                                position: 'absolute',
                                                right: '0',
                                                top: '100%',
                                                backgroundColor: '#FFFFFF',
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                                borderRadius: '4px',
                                                border: '1px solid #E5E7EB',
                                                padding: '4px 0',
                                                zIndex: 10,
                                                minWidth: '160px',
                                                marginTop: '4px',
                                            }}>
                                                <button
                                                    onClick={() => handleMenuAction('setup', user.id)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 16px',
                                                        textAlign: 'left',
                                                        backgroundColor: '#E6F0FA',
                                                        color: '#1D4ED8',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#C3DDFD'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#E6F0FA'}
                                                >
                                                    Setup permissions
                                                </button>
                                                <button
                                                    onClick={() => handleMenuAction('move', user.id)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 16px',
                                                        textAlign: 'left',
                                                        color: '#333333',
                                                        border: 'none',
                                                        background: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                >
                                                    Move to other group
                                                </button>
                                                <button
                                                    onClick={() => handleMenuAction('disable', user.id)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 16px',
                                                        textAlign: 'left',
                                                        color: '#333333',
                                                        border: 'none',
                                                        background: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F3F4F6'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                >
                                                    Disable user
                                                </button>
                                                <button
                                                    onClick={() => handleMenuAction('remove', user.id)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 16px',
                                                        textAlign: 'left',
                                                        color: '#DC2626',
                                                        border: 'none',
                                                        background: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#FEE2E2'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                                >
                                                    Remove user
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            {isAddModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        maxWidth: '448px',
                        width: '100%',
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333', marginBottom: '16px' }}>
                            Add New User
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="newUserFirstName">
                                    First Name
                                </label>
                                <input
                                    id="newUserFirstName"
                                    type="text"
                                    value={newUser.firstName}
                                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter first name"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="newUserLastName">
                                    Last Name
                                </label>
                                <input
                                    id="newUserLastName"
                                    type="text"
                                    value={newUser.lastName}
                                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter last name"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="newUserEmail">
                                    Email
                                </label>
                                <input
                                    id="newUserEmail"
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter email"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="newUserContactNumber">
                                    Contact Number
                                </label>
                                <input
                                    id="newUserContactNumber"
                                    type="text"
                                    value={newUser.contactNumber}
                                    onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter contact number"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="newUserLocation">
                                    Location
                                </label>
                                <input
                                    id="newUserLocation"
                                    type="text"
                                    value={newUser.location}
                                    onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter location"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                style={{
                                    border: '1px solid #D1D5DB',
                                    color: '#333333',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    backgroundColor: 'transparent',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddUser}
                                style={{
                                    backgroundColor: '#4A90E2',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {isEditModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: '0',
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        padding: '24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        maxWidth: '448px',
                        width: '100%',
                    }}>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#333333', marginBottom: '16px' }}>
                            Edit User
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="editUserFirstName">
                                    First Name
                                </label>
                                <input
                                    id="editUserFirstName"
                                    type="text"
                                    value={newUser.firstName}
                                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter first name"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="editUserLastName">
                                    Last Name
                                </label>
                                <input
                                    id="editUserLastName"
                                    type="text"
                                    value={newUser.lastName}
                                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter last name"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="editUserEmail">
                                    Email
                                </label>
                                <input
                                    id="editUserEmail"
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter email"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="editUserContactNumber">
                                    Contact Number
                                </label>
                                <input
                                    id="editUserContactNumber"
                                    type="text"
                                    value={newUser.contactNumber}
                                    onChange={(e) => setNewUser({ ...newUser, contactNumber: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter contact number"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }} htmlFor="editUserLocation">
                                    Location
                                </label>
                                <input
                                    id="editUserLocation"
                                    type="text"
                                    value={newUser.location}
                                    onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
                                    style={{
                                        width: '100%',
                                        border: '1px solid #D1D5DB',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        color: '#333333',
                                        outline: 'none',
                                        boxShadow: '0 0 0 2px transparent',
                                        transition: 'box-shadow 0.2s',
                                    }}
                                    placeholder="Enter location"
                                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #A3BFFA'}
                                    onBlur={(e) => e.target.style.boxShadow = '0 0 0 2px transparent'}
                                />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                style={{
                                    border: '1px solid #D1D5DB',
                                    color: '#333333',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    backgroundColor: 'transparent',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditUser}
                                style={{
                                    backgroundColor: '#4A90E2',
                                    color: 'white',
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    transition: 'background-color 0.3s',
                                    cursor: 'pointer',
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Permissions Tray */}
            {isPermissionsTrayOpen && selectedUserForPermissions && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '400px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                    transform: isPermissionsTrayOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease-in-out',
                    padding: '24px',
                    zIndex: 1000,
                    overflowY: 'auto',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: getInitialsColor(selectedUserForPermissions.firstName),
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '600',
                            fontSize: '16px',
                        }}>
                            {getInitials(selectedUserForPermissions.firstName, selectedUserForPermissions.lastName)}
                        </div>
                        <div>
                            <p style={{ fontSize: '16px', fontWeight: '600', color: '#333333' }}>
                                {selectedUserForPermissions.firstName} {selectedUserForPermissions.lastName}
                            </p>
                            <p style={{ color: '#6B7280', fontSize: '14px' }}>{selectedUserForPermissions.email}</p>
                        </div>
                        <a href="#" style={{ marginLeft: 'auto', color: '#3B82F6', textDecoration: 'underline' }}>View profile</a>
                    </div>
                    <p style={{ color: '#6B7280', fontSize: '12px', marginBottom: '16px' }}>
                        Permission list will change when select the user group
                    </p>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#333333', fontWeight: '500', marginBottom: '4px' }}>User Group</label>
                        <select
                            value={userGroup}
                            onChange={(e) => setUserGroup(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #D1D5DB',
                                borderRadius: '4px',
                                color: '#333333',
                                backgroundColor: '#FFFFFF',
                                appearance: 'none',
                                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23333\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z\'/%3E%3C/svg%3E")',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 8px center',
                            }}
                        >
                            <option value="Consultant">Consultant</option>
                            <option value="Admin">Admin</option>
                            <option value="Manager">Manager</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg style={{ width: '16px', height: '16px', fill: '#3B82F6' }} viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                                    </svg>
                                    <span style={{ color: '#3B82F6', fontWeight: '500' }}>Auditing</span>
                                </div>
                                <span style={{ color: '#6B7280', marginLeft: '24px' }}>Allows full access to review and activate candidates</span>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={permissions.auditing}
                                    onChange={() => handlePermissionChange('auditing')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{
                                    width: '32px',
                                    height: '16px',
                                    backgroundColor: permissions.auditing ? '#10B981' : '#D1D5DB',
                                    borderRadius: '8px',
                                    display: 'inline-block',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: permissions.auditing ? '18px' : '2px',
                                        transition: 'left 0.2s',
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg style={{ width: '16px', height: '16px', fill: '#3B82F6' }} viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0-12c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                                    </svg>
                                    <span style={{ color: '#3B82F6', fontWeight: '500' }}>Allocate as job authority</span>
                                </div>
                                <span style={{ color: '#6B7280', marginLeft: '24px' }}>Allows the user to gain full access to review</span>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={permissions.allocateJobAuthority}
                                    onChange={() => handlePermissionChange('allocateJobAuthority')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{
                                    width: '32px',
                                    height: '16px',
                                    backgroundColor: permissions.allocateJobAuthority ? '#10B981' : '#D1D5DB',
                                    borderRadius: '8px',
                                    display: 'inline-block',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: permissions.allocateJobAuthority ? '18px' : '2px',
                                        transition: 'left 0.2s',
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg style={{ width: '16px', height: '16px', fill: '#3B82F6' }} viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                                    </svg>
                                    <span style={{ color: '#3B82F6', fontWeight: '500' }}>Candidate activation</span>
                                </div>
                                <span style={{ color: '#6B7280', marginLeft: '24px' }}>Allows to activate candidates enabling them to work</span>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={permissions.candidateActivation}
                                    onChange={() => handlePermissionChange('candidateActivation')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{
                                    width: '32px',
                                    height: '16px',
                                    backgroundColor: permissions.candidateActivation ? '#10B981' : '#D1D5DB',
                                    borderRadius: '8px',
                                    display: 'inline-block',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: permissions.candidateActivation ? '18px' : '2px',
                                        transition: 'left 0.2s',
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg style={{ width: '16px', height: '16px', fill: '#3B82F6' }} viewBox="0 0 24 24">
                                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-2 16H8v-2h4v2zm0-4H8v-4h4v4zm-1-5V3.5L18.5 9H13z"/>
                                    </svg>
                                    <span style={{ color: '#3B82F6', fontWeight: '500' }}>Candidate documents</span>
                                </div>
                                <span style={{ color: '#6B7280', marginLeft: '24px' }}>Allows the user to view all candidate documents</span>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={permissions.candidateDocuments}
                                    onChange={() => handlePermissionChange('candidateDocuments')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{
                                    width: '32px',
                                    height: '16px',
                                    backgroundColor: permissions.candidateDocuments ? '#10B981' : '#D1D5DB',
                                    borderRadius: '8px',
                                    display: 'inline-block',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: permissions.candidateDocuments ? '18px' : '2px',
                                        transition: 'left 0.2s',
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg style={{ width: '16px', height: '16px', fill: '#3B82F6' }} viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H7v-2h8v2zm3-4H6V9h12v5z"/>
                                    </svg>
                                    <span style={{ color: '#3B82F6', fontWeight: '500' }}>Financial information</span>
                                </div>
                                <span style={{ color: '#6B7280', marginLeft: '24px' }}>Allows to view the financial information of candidates</span>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={permissions.financialInformation}
                                    onChange={() => handlePermissionChange('financialInformation')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{
                                    width: '32px',
                                    height: '16px',
                                    backgroundColor: permissions.financialInformation ? '#10B981' : '#D1D5DB',
                                    borderRadius: '8px',
                                    display: 'inline-block',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: permissions.financialInformation ? '18px' : '2px',
                                        transition: 'left 0.2s',
                                    }}></span>
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <svg style={{ width: '16px', height: '16px', fill: '#3B82F6' }} viewBox="0 0 24 24">
                                        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                                    </svg>
                                    <span style={{ color: '#3B82F6', fontWeight: '500' }}>Job posting</span>
                                </div>
                                <span style={{ color: '#6B7280', marginLeft: '24px' }}>Allows bulk texts, posting jobs to paid job boards</span>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <input
                                    type="checkbox"
                                    checked={permissions.jobPosting}
                                    onChange={() => handlePermissionChange('jobPosting')}
                                    style={{ display: 'none' }}
                                />
                                <span style={{
                                    width: '32px',
                                    height: '16px',
                                    backgroundColor: permissions.jobPosting ? '#10B981' : '#D1D5DB',
                                    borderRadius: '8px',
                                    display: 'inline-block',
                                    position: 'relative',
                                    transition: 'background-color 0.2s',
                                }}>
                                    <span style={{
                                        width: '12px',
                                        height: '12px',
                                        backgroundColor: 'white',
                                        borderRadius: '50%',
                                        position: 'absolute',
                                        top: '2px',
                                        left: permissions.jobPosting ? '18px' : '2px',
                                        transition: 'left 0.2s',
                                    }}></span>
                                </span>
                            </label>
                        </div>
                    </div>
                    <button
                        onClick={handleSavePermissions}
                        style={{
                            backgroundColor: '#4A90E2',
                            color: 'white',
                            padding: '8px 16px',
                            borderRadius: '4px',
                            border: 'none',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            marginTop: '24px',
                            width: '100%',
                        }}
                    >
                        Save changes
                    </button>
                    <button
                        onClick={() => setIsPermissionsTrayOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            left: '24px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: '#6B7280',
                        }}
                    >
                        ×
                    </button>
                </div>
            )}
            {isPermissionsTrayOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        zIndex: 999,
                    }}
                    onClick={() => setIsPermissionsTrayOpen(false)}
                />
            )}
        </div>
    );
};

export default UserPage;