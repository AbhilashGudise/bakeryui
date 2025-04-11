import React, { useState, useEffect } from 'react';

// CommitteesPage component for managing committee details
const CommitteesPage = () => {
    // Sample data for committees (users)
    const [committees, setCommittees] = useState([
        { id: 1, name: 'Shane Nguyen', status: 'Onboarded', committeeType: 'Organization' },
        { id: 2, name: 'Ariene McCoy', status: 'Active', committeeType: 'Location' },
        { id: 3, name: 'Guy Hawkings', status: 'Inactive', committeeType: 'State' },
        { id: 4, name: 'Dianne Russell', status: 'Active', committeeType: 'Organization' },
        { id: 5, name: 'Albert Flores', status: 'Pending', committeeType: 'Location' },
        { id: 6, name: 'Jacob Jones', status: 'Active', committeeType: 'State' },
        { id: 7, name: 'Kathryn Murphy', status: 'Active', committeeType: 'Organization' },
        { id: 8, name: 'Marvin McKinney', status: 'Inactive', committeeType: 'Location' },
        { id: 9, name: 'Dariene Robertson', status: 'Active', committeeType: 'State' },
    ]);

    const [activeTab, setActiveTab] = useState('All committees'); // Default to All committees
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('committeeType');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newCommittee, setNewCommittee] = useState({ name: '', description: '', committeeType: 'Organization', state: '', location: '' });
    const [menuOpen, setMenuOpen] = useState(null);

    // Sample data for dynamic dropdowns
    const states = ['California', 'Texas', 'New York', 'Florida', 'Illinois'];
    const locations = ['Headquarters', 'Branch Office', 'Remote Site', 'Warehouse', 'Support Center'];

    // Filter and sort committees based on active tab and search
    const filteredCommittees = committees.filter(committee =>
        (activeTab === 'All committees' || committee.committeeType === activeTab) &&
        (committee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        committee.email.toLowerCase().includes(searchQuery.toLowerCase()))
    ).sort((a, b) => {
        if (sortBy === 'committeeType') {
            return sortOrder === 'asc' ? a.committeeType.localeCompare(b.committeeType) : b.committeeType.localeCompare(a.committeeType);
        } else if (sortBy === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else if (sortBy === 'status') {
            return sortOrder === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
        }
        return 0;
    });

    // Status color mapping
    const statusColors = {
        Onboarded: '#E6F3FA',
        Active: '#E8F5E9',
        Inactive: '#FFF3F3',
        Pending: '#FFF9E6',
    };

    // Handle adding new committee
    const handleAddCommittee = () => {
        if (newCommittee.name && newCommittee.description) {
            setCommittees([...committees, {
                id: committees.length + 1,
                name: newCommittee.name,
                email: `${newCommittee.name.replace(/\s+/g, '').toLowerCase()}@labourlink.com`,
                status: 'Onboarded',
                committeeType: newCommittee.committeeType,
                ...(newCommittee.committeeType === 'State' && { state: newCommittee.state }),
                ...(newCommittee.committeeType === 'Location' && { location: newCommittee.location }),
            }]);
            setNewCommittee({ name: '', description: '', committeeType: 'Organization', state: '', location: '' });
            setIsPopupOpen(false);
        }
    };

    // Handle menu toggle
    const handleMenuToggle = (id) => {
        setMenuOpen(menuOpen === id ? null : id);
    };

    // Handle menu actions
    const handleMenuAction = (action, id) => {
        const committee = committees.find(c => c.id === id);
        if (action === 'add') {
            // Placeholder for add users logic
            console.log('Add users to committee:', committee);
        } else if (action === 'edit') {
            // Placeholder for edit logic
            console.log('Edit committee:', committee);
        } else if (action === 'disable') {
            setCommittees(committees.map(c => c.id === id ? { ...c, status: 'Inactive' } : c));
        } else if (action === 'remove') {
            setCommittees(committees.filter(c => c.id !== id));
        }
        setMenuOpen(null);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen) {
                const menu = document.querySelector(`[data-menu-id="${menuOpen}"]`);
                const toggleButton = event.target.closest('button[onClick*="' + menuOpen + '"]');
                if (menu && !menu.contains(event.target) && !toggleButton) {
                    setMenuOpen(null);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuOpen]);

    return (
        <div style={{
            padding: '24px',
            backgroundColor: '#F9FAFB',
            fontFamily: 'Arial, sans-serif',
            minHeight: '100vh',
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '8px' }}>
                    Committees
                </h2>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                    You can manage all committees and settings here of internal users of labourlink.
                </p>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    {['All committees', 'Organization', 'Location', 'State'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: activeTab === tab ? '#E5E7EB' : 'transparent',
                                border: '1px solid #E5E7EB',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                color: '#1F2937',
                                transition: 'background-color 0.2s',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Actions and Search */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Search Committees"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                padding: '8px',
                                border: '1px solid #D1D5DB',
                                borderRadius: '4px',
                                fontSize: '14px',
                                color: '#1F2937',
                                outline: 'none',
                                width: '200px',
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setIsPopupOpen(true)}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#4A90E2',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Add Committees
                        </button>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{
                                padding: '8px',
                                border: '1px solid #D1D5DB',
                                borderRadius: '4px',
                                fontSize: '14px',
                                color: '#1F2937',
                                cursor: 'pointer',
                            }}
                        >
                            <option value="committeeType">Committee Type</option>
                            <option value="name">Name</option>
                            <option value="status">Status</option>
                        </select>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            style={{
                                padding: '8px',
                                border: '1px solid #D1D5DB',
                                borderRadius: '4px',
                                fontSize: '14px',
                                color: '#1F2937',
                                cursor: 'pointer',
                            }}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6B7280' }}>Name</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6B7280' }}>Status</th>
                                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '500', color: '#6B7280' }}>Committee Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCommittees.map((committee) => (
                                <tr key={committee.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                    <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input type="checkbox" />
                                        <img src="https://via.placeholder.com/30" style={{ borderRadius: '50%' }} />
                                        <div>
                                            <div style={{ fontWeight: '500', color: '#1F2937' }}>{committee.name}</div>
                                            <div style={{ fontSize: '12px', color: '#6B7280' }}>{committee.email}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            backgroundColor: statusColors[committee.status],
                                            borderRadius: '12px',
                                            color: '#1F2937',
                                            fontSize: '12px',
                                        }}>
                                            {committee.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', position: 'relative', color: '#1F2937', display: 'flex', alignItems: 'center', position: 'relative' }}>
                                        {committee.committeeType}
                                        <button
                                            onClick={() => handleMenuToggle(committee.id)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '8px', position: 'absolute', right: '0' }}
                                        >
                                            <svg style={{ width: '16px', height: '16px', fill: '#6B7280' }} viewBox="0 0 24 24">
                                                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                                            </svg>
                                        </button>
                                        {menuOpen === committee.id && (
                                            <div data-menu-id={committee.id} style={{
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
                                                    onClick={() => handleMenuAction('add', committee.id)}
                                                    style={{
                                                        width: '100%',
                                                        padding: '8px 16px',
                                                        textAlign: 'left',
                                                        background: 'none',
                                                        color: '#1D4ED8',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#D4EDDA'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#E6F0FA'}
                                                >
                                                    Add Users
                                                </button>
                                                <button
                                                    onClick={() => handleMenuAction('edit', committee.id)}
                                                    style={{
                                                       
                                                        width: '100%',
                                                        padding: '8px 16px',
                                                        textAlign: 'left',
                                                        color: '#1D4ED8',
                                                        border: 'none',
                                                        background: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.2s',
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#C3DDFD'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#E6F0FA'}
                                                >
                                                    Edit Committee
                                                </button>
                                                <button
                                                    onClick={() => handleMenuAction('disable', committee.id)}
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
                                                    Disable Committee
                                                </button>
                                                <button
                                                    onClick={() => handleMenuAction('remove', committee.id)}
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
                                                    Remove Committee
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Popup for adding new committee */}
                {isPopupOpen && (
                    <div style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                    }}>
                        <div style={{
                            backgroundColor: '#FFFFFF',
                            padding: '24px',
                            borderRadius: '12px',
                            width: '450px',
                            boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
                            position: 'relative',
                        }}>
                            <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937' }}>
                                    Add New Committee
                                </h3>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', color: '#1F2937', fontWeight: '500', marginBottom: '6px' }}>
                                        Committee Name
                                    </label>
                                    <input
                                        type="text"
                                        value={newCommittee.name}
                                        onChange={(e) => setNewCommittee({ ...newCommittee, name: e.target.value })}
                                        style={{
                                            maxWidth:"100%",
                                            width: '95%',
                                            border: '1px solid #D1D5DB',
                                            borderRadius: '6px',
                                            padding: '10px',
                                            color: '#1F2937',
                                            fontSize: '14px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                        }}
                                        placeholder="Enter committee name"
                                        onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
                                        onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#1F2937', fontWeight: '500', marginBottom: '6px' }}>
                                        Committee Description
                                    </label>
                                    <textarea
                                        value={newCommittee.description}
                                        onChange={(e) => setNewCommittee({ ...newCommittee, description: e.target.value })}
                                        style={{
                                            width: '95%',
                                            border: '1px solid #D1D5DB',
                                            borderRadius: '6px',
                                            padding: '10px',
                                            color: '#1F2937',
                                            fontSize: '14px',
                                            resize: 'vertical',
                                            minHeight: '100px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                        }}
                                        placeholder="Enter committee description"
                                        onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
                                        onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: '#1F2937', fontWeight: '500', marginBottom: '6px' }}>
                                        Committee Type
                                    </label>
                                    <select
                                        value={newCommittee.committeeType}
                                        onChange={(e) => setNewCommittee({ ...newCommittee, committeeType: e.target.value, state: '', location: '' })}
                                        style={{
                                            width: '100%',
                                            border: '1px solid #D1D5DB',
                                            borderRadius: '6px',
                                            padding: '10px',
                                            color: '#1F2937',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
                                        onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                    >
                                        <option value="Organization">Organization</option>
                                        <option value="Location">Location</option>
                                        <option value="State">State</option>
                                    </select>
                                </div>
                                {newCommittee.committeeType === 'State' && (
                                    <div>
                                        <label style={{ display: 'block', color: '#1F2937', fontWeight: '500', marginBottom: '6px' }}>
                                            Select State
                                        </label>
                                        <select
                                            value={newCommittee.state}
                                            onChange={(e) => setNewCommittee({ ...newCommittee, state: e.target.value })}
                                            style={{
                                                width: '100%',
                                                border: '1px solid #D1D5DB',
                                                borderRadius: '6px',
                                                padding: '10px',
                                                color: '#1F2937',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
                                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                        >
                                            <option value="">Select a state</option>
                                            {states.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {newCommittee.committeeType === 'Location' && (
                                    <div>
                                        <label style={{ display: 'block', color: '#1F2937', fontWeight: '500', marginBottom: '6px' }}>
                                            Select Location
                                        </label>
                                        <select
                                            value={newCommittee.location}
                                            onChange={(e) => setNewCommittee({ ...newCommittee, location: e.target.value })}
                                            style={{
                                                width: '100%',
                                                border: '1px solid #D1D5DB',
                                                borderRadius: '6px',
                                                padding: '10px',
                                                color: '#1F2937',
                                                fontSize: '14px',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                transition: 'border-color 0.2s',
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#4A90E2'}
                                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                        >
                                            <option value="">Select a location</option>
                                            {locations.map(location => (
                                                <option key={location} value={location}>{location}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                                    <button
                                        onClick={() => setIsPopupOpen(false)}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#E5E7EB',
                                            color: '#1F2937',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#D1D5DB'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#E5E7EB'}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddCommittee}
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#4A90E2',
                                            color: '#FFFFFF',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            transition: 'background-color 0.2s',
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#357ABD'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4A90E2'}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommitteesPage;