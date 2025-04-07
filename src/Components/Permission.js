import React, { useState } from 'react';

const PermissionsScreen = () => {
    const [roles, setRoles] = useState([
        { id: 1, name: 'Subscription Admin', visibility: 'Public', assignedCount: 1, permissions: { settings: true, billing: true, integration: true } },
        { id: 2, name: 'Admin', visibility: 'Public', assignedCount: 2, permissions: { settings: false, billing: true, integration: true } },
        { id: 3, name: 'Editor', visibility: 'Public', assignedCount: 2, permissions: { settings: false, billing: true, integration: false } },
        { id: 4, name: 'Observer', visibility: 'Admin Only', assignedCount: 12, permissions: { settings: false, billing: true, integration: false } },
        { id: 5, name: 'Manager', visibility: 'Public', assignedCount: 11, permissions: { settings: true, billing: false, integration: false } },
        { id: 6, name: 'Developer', visibility: 'Public', assignedCount: 6, permissions: { settings: true, billing: true, integration: false } },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagData, setTagData] = useState({
        name: '',
        parentTag: '',
        description: '',
        color: '#F472B6',
        assignedTo: '',
        permissions: {
            workspaceSettings: true,
            workspaceBilling: true,
            workspaceIntegration: true,
            workspacePermissions: false,
            createMaps: false,
            manageMapSettings: false,
            manageMapUsers: false,
            manageMapContent: false,
        },
        visibility: 'Public',
    });

    const getInitials = (index) => {
        const initials = ['SA', 'AD', 'ED', 'OB', 'MG', 'DV'];
        return initials[index % initials.length];
    };

    const getRandomColor = (index) => {
        const colors = ['#A78BFA', '#FBBF24', '#F87171', '#34D399', '#60A5FA', '#F472B6'];
        return colors[index % colors.length];
    };

    const handlePermissionChange = (roleId, permission) => {
        setRoles(roles.map(role =>
            role.id === roleId ? { ...role, permissions: { ...role.permissions, [permission]: !role.permissions[permission] } } : role
        ));
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setTagData({
            name: '',
            parentTag: '',
            description: '',
            color: '#F472B6',
            assignedTo: '',
            permissions: {
                workspaceSettings: true,
                workspaceBilling: true,
                workspaceIntegration: true,
                workspacePermissions: false,
                createMaps: false,
                manageMapSettings: false,
                manageMapUsers: false,
                manageMapContent: false,
            },
            visibility: 'Public',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTagData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionToggle = (permission) => {
        setTagData(prev => ({
            ...prev,
            permissions: { ...prev.permissions, [permission]: !prev.permissions[permission] }
        }));
    };

    const handleVisibilityChange = (e) => {
        setTagData(prev => ({ ...prev, visibility: e.target.value }));
    };

    const handleColorChange = (color) => {
        setTagData(prev => ({ ...prev, color }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Tag created:', tagData);
        handleModalClose();
    };

    const colors = ['#F472B6', '#A78BFA', '#FBBF24', '#F87171', '#34D399', '#60A5FA', '#10B981', '#F59E0B'];

    return (
        <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif', backgroundColor: '#F9FAFB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <button
                    onClick={handleModalOpen}
                    style={{
                        backgroundColor: '#E5E7EB',
                        color: '#374151',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    + Create new
                </button>
                <button style={{
                    backgroundColor: '#E5E7EB',
                    color: '#374151',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '14px',
                }}>
                    Choose action
                </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#FFFFFF', borderRadius: '8px', overflow: 'hidden' }}>
                <thead>
                    <tr style={{ backgroundColor: '#F3F4F6', borderBottom: '1px solid #E5E7EB' }}>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}></th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}>Name</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}>Visibility</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}>Assigned</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}>Manage workspace settings</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}>Manage workspace billing</th>
                        <th style={{ padding: '12px', textAlign: 'left', color: '#6B7280', fontWeight: '500' }}>Manage workspace integration settings</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, index) => (
                        <tr key={role.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                            <td style={{ padding: '12px' }}>
                                <input type="checkbox" style={{ marginRight: '8px' }} />
                            </td>
                            <td style={{ padding: '12px', color: '#374151' }}>{role.name}</td>
                            <td style={{ padding: '12px', color: '#6B7280' }}>{role.visibility}</td>
                            <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: getRandomColor(index),
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                }}>
                                    {getInitials(index)}
                                </div>
                                <span style={{ color: '#374151' }}>{role.assignedCount}</span>
                            </td>
                            <td style={{ padding: '12px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={role.permissions.settings}
                                        onChange={() => handlePermissionChange(role.id, 'settings')}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{
                                        width: '32px',
                                        height: '16px',
                                        backgroundColor: role.permissions.settings ? '#10B981' : '#D1D5DB',
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
                                            left: role.permissions.settings ? '18px' : '2px',
                                            transition: 'left 0.2s',
                                        }}></span>
                                    </span>
                                </label>
                            </td>
                            <td style={{ padding: '12px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={role.permissions.billing}
                                        onChange={() => handlePermissionChange(role.id, 'billing')}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{
                                        width: '32px',
                                        height: '16px',
                                        backgroundColor: role.permissions.billing ? '#10B981' : '#D1D5DB',
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
                                            left: role.permissions.billing ? '18px' : '2px',
                                            transition: 'left 0.2s',
                                        }}></span>
                                    </span>
                                </label>
                            </td>
                            <td style={{ padding: '12px' }}>
                                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={role.permissions.integration}
                                        onChange={() => handlePermissionChange(role.id, 'integration')}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{
                                        width: '32px',
                                        height: '16px',
                                        backgroundColor: role.permissions.integration ? '#10B981' : '#D1D5DB',
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
                                            left: role.permissions.integration ? '18px' : '2px',
                                            transition: 'left 0.2s',
                                        }}></span>
                                    </span>
                                </label>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                }}>
                    <div style={{
                        backgroundColor: '#FFFFFF',
                        padding: '24px',
                        borderRadius: '8px',
                        width: '600px',
                        height: '500px', // Increased height for better fit
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        fontFamily: 'Arial, sans-serif',
                    }}>
                        <h2 style={{ margin: 0, marginBottom: '20px', fontSize: '20px', color: '#1F2937', fontWeight: 600 }}>Create New Tag</h2>
                        <button
                            onClick={handleModalClose}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '24px',
                                color: '#6B7280',
                                lineHeight: '1',
                            }}
                        >
                            ×
                        </button>
                        <div style={{ flex: 1, display: 'flex', gap: '32px', padding: '0 16px', overflowY: 'auto' }}>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>Tag name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={tagData.name}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#1F2937', fontSize: '14px', boxSizing: 'border-box' }}
                                        placeholder="Project Manager"
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>Parent tag</label>
                                    <input
                                        type="text"
                                        name="parentTag"
                                        value={tagData.parentTag}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#1F2937', fontSize: '14px', boxSizing: 'border-box' }}
                                        placeholder="Marketing"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>Tag description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={tagData.description}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#1F2937', fontSize: '14px', boxSizing: 'border-box' }}
                                        placeholder="Enter description..."
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>Color *</label>
                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        {colors.map((c) => (
                                            <div
                                                key={c}
                                                onClick={() => handleColorChange(c)}
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    backgroundColor: c,
                                                    borderRadius: '50%',
                                                    cursor: 'pointer',
                                                    border: tagData.color === c ? '2px solid #3B82F6' : '1px solid #E5E7EB',
                                                    boxSizing: 'border-box',
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '6px', color: '#6B7280', fontSize: '14px', fontWeight: 500 }}>Assign to *</label>
                                    <input
                                        type="text"
                                        name="assignedTo"
                                        value={tagData.assignedTo}
                                        onChange={handleInputChange}
                                        style={{ width: '100%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '6px', color: '#1F2937', fontSize: '14px', boxSizing: 'border-box' }}
                                        placeholder="Search members"
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', paddingLeft: '32px', borderLeft: '1px solid #E5E7EB' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '10px', color: '#1F2937', fontSize: '14px', fontWeight: 600 }}>Tag Permissions *</label>
                                    {Object.keys(tagData.permissions).map((permission) => (
                                        <div key={permission} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={tagData.permissions[permission]}
                                                    onChange={() => handlePermissionToggle(permission)}
                                                    style={{ display: 'none' }}
                                                />
                                                <span style={{
                                                    width: '36px',
                                                    height: '20px',
                                                    backgroundColor: tagData.permissions[permission] ? '#10B981' : '#D1D5DB',
                                                    borderRadius: '10px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    padding: '2px',
                                                    boxSizing: 'border-box',
                                                    transition: 'background-color 0.3s',
                                                }}>
                                                    <span style={{
                                                        width: '16px',
                                                        height: '16px',
                                                        backgroundColor: 'white',
                                                        borderRadius: '50%',
                                                        transition: 'transform 0.3s',
                                                        transform: tagData.permissions[permission] ? 'translateX(16px)' : 'translateX(0)',
                                                    }}></span>
                                                </span>
                                            </label>
                                            <span style={{ color: '#1F2937', fontSize: '14px', textTransform: 'capitalize' }}>
                                                {permission.replace(/([A-Z])/g, ' $1').trim()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '10px', color: '#1F2937', fontSize: '14px', fontWeight: 600 }}>Who can see this tag? *</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {['Public', 'Private', 'Admin Only'].map((option) => (
                                            <label key={option} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                                <input
                                                    type="radio"
                                                    name="visibility"
                                                    value={option}
                                                    checked={tagData.visibility === option}
                                                    onChange={handleVisibilityChange}
                                                    style={{ marginTop: '2px', marginRight: '8px' }}
                                                />
                                                <div>
                                                    <span style={{ color: '#1F2937', fontSize: '14px' }}>{option}</span>
                                                    {option === 'Public' && <span style={{ display: 'block', color: '#6B7280', fontSize: '12px', marginTop: '4px' }}>This tag can be seen by all workspace users</span>}
                                                    {option === 'Private' && <span style={{ display: 'block', color: '#6B7280', fontSize: '12px', marginTop: '4px' }}>This tag is only visible to assigned users and by workspace administrators</span>}
                                                    {option === 'Admin Only' && <span style={{ display: 'block', color: '#6B7280', fontSize: '12px', marginTop: '4px' }}>This tag is only visible to workspace administrators</span>}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px', position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
                            <button
                                type="button"
                                onClick={handleModalClose}
                                style={{
                                    backgroundColor: '#E5E7EB',
                                    color: '#374151',
                                    padding: '10px 20px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form="tagForm"
                                style={{
                                    backgroundColor: '#60A5FA',
                                    color: '#FFFFFF',
                                    padding: '10px 20px',
                                    borderRadius: '6px',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    transition: 'background-color 0.2s',
                                }}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PermissionsScreen;