import React, { useState } from 'react';

// OrganizationPage component for managing organization details
const OrganizationPage = () => {
    const [orgName, setOrgName] = useState(''); // State for organization name
    const [address, setAddress] = useState(''); // State for organization address
    const [logo, setLogo] = useState(null);     // State for uploaded logo file

    // Handle logo file selection
    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogo(file);
            console.log('Selected logo:', file.name);
        }
    };

    // Handle form submission (simulated)
    const handleSubmit = () => {
        console.log('Organization Details:', { orgName, address, logo });
        alert('Organization details saved (simulated). Check console for details.');
    };

    return (
        <div style={{
            padding: '40px',
            backgroundColor: '#F9FAFB',
            minHeight: '600px',
            fontFamily: 'Arial, sans-serif',
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                padding: '24px',
                borderRadius: '16px',
                boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                border: '1px solid #E0E0E0',
                maxWidth: '512px',
                margin: '0 auto',
            }}>
                <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: '24px',
                }}>
                    Organization Details
                </h3>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            color: '#1F2937',
                            fontWeight: '500',
                            marginBottom: '8px',
                        }} htmlFor="orgName">
                            Organization Name
                        </label>
                        <input
                            id="orgName"
                            type="text"
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            style={{
                                width: '100%',
                                border: '1px solid #D1D5DB',
                                borderRadius: '8px',
                                padding: '12px',
                                color: '#1F2937',
                                outline: 'none',
                                boxShadow: '0 0 0 2px transparent',
                                transition: 'box-shadow 0.2s, border-color 0.2s',
                                fontSize: '16px',
                            }}
                            placeholder="Enter organization name"
                            onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px #A5D6A7';
                                e.target.style.borderColor = '#66BB6A';
                            }}
                            onBlur={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px transparent';
                                e.target.style.borderColor = '#D1D5DB';
                            }}
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            color: '#1F2937',
                            fontWeight: '500',
                            marginBottom: '8px',
                        }} htmlFor="address">
                            Address
                        </label>
                        <textarea
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                                width: '100%',
                                border: '1px solid #D1D5DB',
                                borderRadius: '8px',
                                padding: '12px',
                                color: '#1F2937',
                                outline: 'none',
                                boxShadow: '0 0 0 2px transparent',
                                transition: 'box-shadow 0.2s, border-color 0.2s',
                                resize: 'vertical',
                                minHeight: '120px',
                                fontSize: '16px',
                            }}
                            placeholder="Enter organization address"
                            onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px #A5D6A7';
                                e.target.style.borderColor = '#66BB6A';
                            }}
                            onBlur={(e) => {
                                e.target.style.boxShadow = '0 0 0 2px transparent';
                                e.target.style.borderColor = '#D1D5DB';
                            }}
                        />
                    </div>
                    <div>
                        <label style={{
                            display: 'block',
                            color: '#1F2937',
                            fontWeight: '500',
                            marginBottom: '8px',
                        }} htmlFor="logo">
                            Upload Organization Logo
                        </label>
                        <input
                            id="logo"
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            style={{
                                width: '100%',
                                border: '1px solid #D1D5DB',
                                borderRadius: '8px',
                                padding: '12px',
                                color: '#1F2937',
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        />
                        {logo && (
                            <p style={{
                                marginTop: '12px',
                                color: '#1F2937',
                                fontSize: '14px',
                                backgroundColor: '#F1F8E9',
                                padding: '8px',
                                borderRadius: '4px',
                            }}>
                                Selected: {logo.name}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={handleSubmit}
                        style={{
                            width: '100%',
                            backgroundColor: '#66BB6A',
                            color: '#FFFFFF',
                            padding: '12px',
                            borderRadius: '8px',
                            border: 'none',
                            transition: 'background-color 0.3s',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#43A047')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#66BB6A')}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrganizationPage;