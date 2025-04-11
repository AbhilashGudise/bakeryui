import React, { useState } from 'react';

const CredentialReport = () => {
  // Sample data for demonstration
  const initialApplications = [
    {
      id: 'APP-2025-0412',
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      licenseNumber: 'MD-45678-CA',
      submissionDate: '2025-03-15',
      status: 'Approved',
      completeness: 100
    },
    {
      id: 'APP-2025-0411',
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      licenseNumber: 'MD-32145-CA',
      submissionDate: '2025-03-12',
      status: 'Pending Review',
      completeness: 85
    },
    {
      id: 'APP-2025-0410',
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      licenseNumber: 'MD-78932-CA',
      submissionDate: '2025-03-10',
      status: 'Additional Info Required',
      completeness: 65
    },
    {
      id: 'APP-2025-0409',
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      licenseNumber: 'MD-12378-CA',
      submissionDate: '2025-03-08',
      status: 'Approved',
      completeness: 100
    },
    {
      id: 'APP-2025-0408',
      name: 'Dr. Priya Patel',
      specialty: 'Emergency Medicine',
      licenseNumber: 'MD-65412-CA',
      submissionDate: '2025-03-05',
      status: 'Rejected',
      completeness: 90
    },
    {
      id: 'APP-2025-0407',
      name: 'Dr. Robert Thompson',
      specialty: 'Family Medicine',
      licenseNumber: 'MD-98745-CA',
      submissionDate: '2025-03-02',
      status: 'In Progress',
      completeness: 40
    }
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Status color mapping
  const statusColors = {
    'Approved': '#10b981', // Green
    'Pending Review': '#f59e0b', // Amber
    'Additional Info Required': '#3b82f6', // Blue
    'Rejected': '#ef4444', // Red
    'In Progress': '#6366f1' // Indigo
  };

  // Filter options
  const filterOptions = ['All', 'Approved', 'Pending Review', 'Additional Info Required', 'Rejected', 'In Progress'];

  // Filter applications based on selected filter and search query
  const filteredApplications = applications.filter(app => {
    const matchesFilter = selectedFilter === 'All' || app.status === selectedFilter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Handle application selection
  const handleSelectApplication = (application) => {
    setSelectedApplication(application);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    return (
      <span style={{
        backgroundColor: `${statusColors[status]}20`,
        color: statusColors[status],
        padding: '4px 10px',
        borderRadius: '16px',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        {status}
      </span>
    );
  };

  // Progress bar component
  const ProgressBar = ({ percentage }) => {
    return (
      <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px' }}>
        <div 
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: percentage < 60 ? '#ef4444' : percentage < 85 ? '#f59e0b' : '#10b981', 
            borderRadius: '4px', 
            height: '8px' 
          }} 
        />
      </div>
    );
  };

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#f9fafb' 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: '0' }}>
          Medical Department Credential Applications
        </h1>
        <button style={{ 
          backgroundColor: '#4f46e5', 
          color: 'white', 
          border: 'none', 
          padding: '10px 16px', 
          borderRadius: '6px', 
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          Generate Report
        </button>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>Total Applications</div>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#111827' }}>{applications.length}</div>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>Approved</div>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#10b981' }}>
            {applications.filter(app => app.status === 'Approved').length}
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>Pending Review</div>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#f59e0b' }}>
            {applications.filter(app => app.status === 'Pending Review').length}
          </div>
        </div>
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>Rejected</div>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#ef4444' }}>
            {applications.filter(app => app.status === 'Rejected').length}
          </div>
        </div>
      </div>

      {/* Filters and search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          {filterOptions.map(option => (
            <button 
              key={option}
              onClick={() => setSelectedFilter(option)}
              style={{ 
                padding: '8px 16px', 
                borderRadius: '6px', 
                border: 'none',
                backgroundColor: selectedFilter === option ? '#4f46e5' : '#ffffff',
                color: selectedFilter === option ? '#ffffff' : '#4b5563',
                fontWeight: '500',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
              }}
            >
              {option}
            </button>
          ))}
        </div>
        <div style={{ position: 'relative', width: '250px' }}>
          <input 
            type="text"
            placeholder="Search by name, specialty or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '10px 16px 10px 40px', 
              borderRadius: '6px', 
              border: '1px solid #e5e7eb',
              fontSize: '14px'
            }}
          />
          <span style={{ position: 'absolute', left: '14px', top: '10px', color: '#9ca3af' }}>
            🔍
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Applications table */}
        <div style={{ flex: '2', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>Application ID</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>Name</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>Specialty</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>Submission Date</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#4b5563' }}>Completeness</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <tr 
                    key={application.id} 
                    style={{ 
                      borderBottom: '1px solid #e5e7eb', 
                      backgroundColor: selectedApplication?.id === application.id ? '#eff6ff' : 'white',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleSelectApplication(application)}
                  >
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{application.id}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>{application.name}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{application.specialty}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#374151' }}>{formatDate(application.submissionDate)}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <StatusBadge status={application.status} />
                    </td>
                    <td style={{ padding: '12px 16px', width: '140px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ProgressBar percentage={application.completeness} />
                        <span style={{ fontSize: '14px', color: '#374151' }}>{application.completeness}%</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '48px 0', textAlign: 'center', color: '#6b7280' }}>
                    No applications found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Application details panel */}
        <div style={{ flex: '1', backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.12)', height: 'fit-content' }}>
          {selectedApplication ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: '0' }}>Application Details</h2>
                <button style={{ 
                  backgroundColor: '#e5e7eb', 
                  color: '#4b5563', 
                  border: 'none', 
                  padding: '6px 12px', 
                  borderRadius: '4px', 
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Edit
                </button>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <StatusBadge status={selectedApplication.status} />
                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', color: '#4b5563', fontSize: '24px' }}>
                    {selectedApplication.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>{selectedApplication.name}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280' }}>{selectedApplication.specialty}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Application ID</div>
                <div style={{ fontSize: '16px', color: '#111827' }}>{selectedApplication.id}</div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>License Number</div>
                <div style={{ fontSize: '16px', color: '#111827' }}>{selectedApplication.licenseNumber}</div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Submission Date</div>
                <div style={{ fontSize: '16px', color: '#111827' }}>{formatDate(selectedApplication.submissionDate)}</div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '4px' }}>Application Completeness</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <ProgressBar percentage={selectedApplication.completeness} />
                  <span style={{ fontSize: '16px', fontWeight: '500', color: '#111827' }}>{selectedApplication.completeness}%</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button style={{ 
                  flex: '1',
                  backgroundColor: '#4f46e5', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Review Documents
                </button>
                <button style={{ 
                  flex: '1',
                  backgroundColor: '#ffffff', 
                  color: '#4b5563', 
                  border: '1px solid #d1d5db', 
                  padding: '10px', 
                  borderRadius: '6px', 
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Contact Applicant
                </button>
              </div>

              <div style={{ 
                backgroundColor: '#f3f4f6', 
                padding: '16px', 
                borderRadius: '6px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563', marginBottom: '8px' }}>Status Update</div>
                <select style={{ 
                  width: '100%', 
                  padding: '8px 12px', 
                  border: '1px solid #d1d5db', 
                  borderRadius: '4px', 
                  fontSize: '14px',
                  backgroundColor: '#ffffff'
                }}>
                  <option value="">Select new status</option>
                  {filterOptions.filter(option => option !== 'All' && option !== selectedApplication.status).map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <textarea 
                  placeholder="Add a note about this update..."
                  style={{ 
                    width: '100%', 
                    padding: '8px 12px', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '4px', 
                    fontSize: '14px',
                    marginTop: '8px',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
                <button style={{ 
                  width: '100%',
                  backgroundColor: '#10b981', 
                  color: 'white', 
                  border: 'none', 
                  padding: '8px', 
                  borderRadius: '4px', 
                  fontWeight: '500',
                  marginTop: '8px',
                  cursor: 'pointer'
                }}>
                  Update Status
                </button>
              </div>

              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', marginBottom: '8px' }}>Application Timeline</div>
                <div style={{ borderLeft: '2px solid #e5e7eb', paddingLeft: '16px' }}>
                  <div style={{ marginBottom: '16px', position: 'relative' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', position: 'absolute', left: '-23px', top: '4px' }} />
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Application Submitted</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(selectedApplication.submissionDate)}</div>
                  </div>
                  <div style={{ marginBottom: '16px', position: 'relative' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: '#3b82f6', borderRadius: '50%', position: 'absolute', left: '-23px', top: '4px' }} />
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Documentation Review</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(new Date(new Date(selectedApplication.submissionDate).getTime() + 2*24*60*60*1000))}</div>
                  </div>
                  {selectedApplication.status === 'Approved' && (
                    <div style={{ position: 'relative' }}>
                      <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%', position: 'absolute', left: '-23px', top: '4px' }} />
                      <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>Application Approved</div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>{formatDate(new Date(new Date(selectedApplication.submissionDate).getTime() + 5*24*60*60*1000))}</div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
              Select an application to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CredentialReport;