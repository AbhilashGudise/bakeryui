import React, { useState, useEffect } from 'react';

const VolunteerInterestForm = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Skeleton component for input fields
  const InputSkeleton = ({ height = '42px' }) => (
    <div 
      style={{
        width: '100%',
        height: height,
        backgroundColor: '#E5E7EB',
        borderRadius: '4px',
        animation: 'pulse 1.5s infinite ease-in-out',
      }}
    />
  );

  // Skeleton component for labels
  const LabelSkeleton = () => (
    <div 
      style={{
        width: '50%',
        height: '20px',
        backgroundColor: '#E5E7EB',
        borderRadius: '4px',
        marginBottom: '10px',
        animation: 'pulse 1.5s infinite ease-in-out',
      }}
    />
  );

  // Define the pulse animation style
  const skeletonStyle = `
    @keyframes pulse {
      0% {
        opacity: 0.6;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.6;
      }
    }
  `;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', fontFamily: 'Arial, sans-serif' }}>
      <style>{skeletonStyle}</style>
      
      {loading ? (
        // Skeleton UI
        <>
          {/* Title Skeleton */}
          <div 
            style={{
              width: '70%',
              height: '30px',
              backgroundColor: '#E5E7EB',
              borderRadius: '4px',
              margin: '0 auto 15px auto',
              animation: 'pulse 1.5s infinite ease-in-out',
            }}
          />
          
          {/* Subtitle Skeleton */}
          <div 
            style={{
              width: '90%',
              height: '40px',
              backgroundColor: '#E5E7EB',
              borderRadius: '4px',
              margin: '0 auto 20px auto',
              animation: 'pulse 1.5s infinite ease-in-out',
            }}
          />
          
          {/* Full Name Section */}
          <div style={{ marginBottom: '20px' }}>
            <LabelSkeleton />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <InputSkeleton />
              <InputSkeleton />
            </div>
          </div>
          
          {/* Email Section */}
          <div style={{ marginBottom: '20px' }}>
            <LabelSkeleton />
            <InputSkeleton />
          </div>
          
          {/* Phone Section */}
          <div style={{ marginBottom: '20px' }}>
            <LabelSkeleton />
            <InputSkeleton />
          </div>
          
          {/* Address Section */}
          <div style={{ marginBottom: '20px' }}>
            <LabelSkeleton />
            <div style={{ marginBottom: '5px' }}><InputSkeleton /></div>
            <div style={{ marginBottom: '5px' }}><InputSkeleton /></div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <InputSkeleton />
              <InputSkeleton />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <InputSkeleton />
              <InputSkeleton />
            </div>
          </div>
          
          {/* Volunteer Reason Section */}
          <div style={{ marginBottom: '20px' }}>
            <LabelSkeleton />
            <InputSkeleton height="100px" />
          </div>
          
          {/* Emergency Contact Section */}
          <div style={{ marginBottom: '20px' }}>
            <div 
              style={{
                width: '60%',
                height: '25px',
                backgroundColor: '#E5E7EB',
                borderRadius: '4px',
                marginBottom: '10px',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            />
            <div 
              style={{
                width: '90%',
                height: '40px',
                backgroundColor: '#E5E7EB',
                borderRadius: '4px',
                marginBottom: '15px',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            />
            
            <LabelSkeleton />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <InputSkeleton />
              <InputSkeleton />
            </div>
            
            <LabelSkeleton />
            <div style={{ marginBottom: '15px' }}>
              <InputSkeleton />
            </div>
            
            <LabelSkeleton />
            <InputSkeleton />
          </div>
          
          {/* Button Skeleton */}
          <div style={{ textAlign: 'center' }}>
            <div 
              style={{
                width: '120px',
                height: '40px',
                backgroundColor: '#E5E7EB',
                borderRadius: '4px',
                margin: '0 auto',
                animation: 'pulse 1.5s infinite ease-in-out',
              }}
            />
          </div>
        </>
      ) : (
        // Actual Form
        <>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1E40AF', textAlign: 'center', marginBottom: '10px' }}>Individual Information Form</h1>
          <p style={{ fontSize: '14px', color: '#4B5563', textAlign: 'center', marginBottom: '20px' }}>
            Thank you for your interest in Individual Information with us! Please fill out the form below to help us understand how you'd like to contribute.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Full Name</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <input
                type="text"
                placeholder="First Name"
                style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
              />
              <input
                type="text"
                placeholder="Last Name"
                style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Email Address</label>
            <input
              type="email"
              placeholder="abhi@gmail.com"
              style={{ width: '96%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Phone Number</label>
            <input
              type="tel"
              placeholder="(000) 000-0000"
              style={{ width: '96%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
            />
            <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '5px' }}>Please enter a valid phone number.</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Address</label>
            <input
              type="text"
              placeholder="Street Address"
              style={{ width: '96%', padding: '10px', border: '2px solid #93C5FD', borderRadius: '4px', outline: 'none', marginBottom: '5px' }}
            />
            <input
              type="text"
              placeholder="Street Address Line 2"
              style={{ width: '96%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none', marginBottom: '5px' }}
            />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <input
                type="text"
                placeholder="City"
                style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
              />
              <select
                style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none', appearance: 'none' }}
              >
                <option value="">State / Province</option>
                <option value="CA">California</option>
                <option value="NY">New York</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
              <input
                type="text"
                placeholder="Postal / Zip Code"
                style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
              />
              <select
                style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none', appearance: 'none' }}
              >
                <option value="">Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Why do you want to volunteer with us?</label>
            <textarea
              placeholder=""
              style={{ width: '96%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none', minHeight: '100px', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#1E40AF', marginBottom: '10px' }}>Emergency Contact Information</h2>
            <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '10px' }}>
              In case of an emergency, please provide the name and contact information of someone we can reach out to on your behalf.
            </p>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Emergency Contact Name</label>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
                <input
                  type="text"
                  placeholder="First Name"
                  style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  style={{ flex: '1', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Relationship</label>
              <input
                type="text"
                placeholder=""
                style={{ width: '96%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '16px', color: '#1E40AF', marginBottom: '10px', display: 'block' }}>Emergency Contact Phone Number</label>
              <input
                type="tel"
                placeholder="(000) 000-0000"
                style={{ width: '96%', padding: '10px', border: '1px solid #D1D5DB', borderRadius: '4px', outline: 'none' }}
              />
              <p style={{ color: '#DC2626', fontSize: '12px', marginTop: '5px' }}>Please enter a valid phone number.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              style={{ backgroundColor: '#10B981', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '4px', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default VolunteerInterestForm;