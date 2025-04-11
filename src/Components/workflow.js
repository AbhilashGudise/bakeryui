import React, { useRef, useState, useEffect } from 'react';

const WorkflowPage = () => {
  const stages = [
    { 
      id: 1, 
      title: 'Request credentialing', 
      status: 'Active', 
      date: '19th March 2025', 
      comments: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry\'s standard dummy text ever since the 1500s', 
      additionalComments: 'Comments:\nLorem ipsum is simply dummy text of the printing and typesetting industry.\n04:30 PM | 19 Mar', 
      attachments: [] 
    },
    { 
      id: 2, 
      title: 'Request Committee', 
      status: 'Active', 
      date: '19th March 2025', 
      comments: 'To initiate a credentialing request, you\'ll need to understand the specific process and requirements of the organization (hospital, insurance company, etc.) you\'re applying to. This typically involves completing an application, submitting supporting documents, and potentially undergoing a background check', 
      additionalComments: 'Comments:\nLorem ipsum is simply dummy text of the printing and typesetting industry.\n04:30 PM | 19 Mar', 
      attachments: ['thefilename.jpg', 'thefilenamefilename.jpg', 'thefilenamefilenamefilename.jpg'] 
    },
    { 
      id: 3, 
      title: 'Request credentialing', 
      status: 'Rejected', 
      date: '19th March 2025', 
      comments: 'Reasons for rejection:\n1. reason a\n2. reason b', 
      additionalComments: '', 
      attachments: [] 
    },
    { 
      id: 4, 
      title: 'Final Review', 
      status: 'Active', 
      date: '20th March 2025', 
      comments: 'Final review of the credentialing process to ensure all requirements are met.', 
      additionalComments: 'Comments:\nFinal review completed.\n10:00 AM | 20 Mar', 
      attachments: ['finalreview.pdf'] 
    },
  ];

  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading with a 2-second delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files.map(file => file.name)]);
    event.target.value = null; // Reset input to allow re-uploading the same file
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setCommentsList(prev => [...prev, { text: newComment, timestamp: new Date().toLocaleString() }]);
      setNewComment('');
    }
  };

  const [expandedStages, setExpandedStages] = useState({});

  const toggleStage = (id) => {
    setExpandedStages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const Skeleton = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20, background: 'rgba(255, 255, 255, 0.9)' }}>
      {/* Skeleton for User Information */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '15px', 
        backgroundColor: '#F3F4F6', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          width: '60%', 
          height: '20px', 
          background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
          backgroundSize: '200% 100%', 
          animation: 'pulse 1.5s infinite',
          borderRadius: '4px'
        }}></div>
        <div style={{ 
          width: '40%', 
          height: '16px', 
          background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
          backgroundSize: '200% 100%', 
          animation: 'pulse 1.5s infinite',
          marginTop: '8px',
          borderRadius: '4px'
        }}></div>
        <div style={{ 
          width: '30%', 
          height: '16px', 
          background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
          backgroundSize: '200% 100%', 
          animation: 'pulse 1.5s infinite',
          marginTop: '5px',
          borderRadius: '4px'
        }}></div>
      </div>

      {/* Skeleton for Vertical Timeline */}
      <div style={{ padding: '20px', paddingTop: '50px' }}>
        {[...Array(4)].map((_, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '40px' }}>
            <div style={{ width: '158px', display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '100px', 
                height: '24px', 
                background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
                backgroundSize: '200% 100%', 
                animation: 'pulse 1.5s infinite',
                borderRadius: '12px',
                marginRight: '10px'
              }}></div>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
                backgroundSize: '200% 100%', 
                animation: 'pulse 1.5s infinite'
              }}></div>
            </div>
            <div style={{ 
              width: '500px', 
              padding: '15px', 
              backgroundColor: '#F9FAFB', 
              borderRadius: '8px', 
              border: '1px solid #E5E7EB'
            }}>
              <div style={{ 
                width: '40%', 
                height: '20px', 
                background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
                backgroundSize: '200% 100%', 
                animation: 'pulse 1.5s infinite',
                marginBottom: '10px',
                borderRadius: '4px'
              }}></div>
              <div style={{ 
                width: '30%', 
                height: '16px', 
                background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
                backgroundSize: '200% 100%', 
                animation: 'pulse 1.5s infinite',
                marginBottom: '10px',
                borderRadius: '4px'
              }}></div>
              <div style={{ 
                width: '80%', 
                height: '60px', 
                background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
                backgroundSize: '200% 100%', 
                animation: 'pulse 1.5s infinite',
                borderRadius: '4px'
              }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Skeleton for Action Buttons */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        {[...Array(4)].map((_, index) => (
          <div key={index} style={{ 
            width: '100px', 
            height: '40px', 
            background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
            backgroundSize: '200% 100%', 
            animation: 'pulse 1.5s infinite',
            display: 'inline-block',
            marginRight: '10px',
            borderRadius: '4px'
          }}></div>
        ))}
      </div>

      {/* Skeleton for Progress Indicator */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div style={{ 
          width: '150px', 
          height: '20px', 
          background: 'linear-gradient(90deg, #E5E7EB 25%, #D1D5DB 50%, #E5E7EB 75%)', 
          backgroundSize: '200% 100%', 
          animation: 'pulse 1.5s infinite',
          margin: '0 auto',
          borderRadius: '4px'
        }}></div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}
      </style>
    </div>
  );

  return (
    <div style={{ 
      maxWidth: '750px', 
      margin: '0 auto', 
      padding: '20px', 
      backgroundColor: '#F3F4F6', 
      fontFamily: 'Arial, sans-serif', 
      minHeight: '80vh',
      position: 'relative',
      opacity: loading ? 0.3 : 1,
      transition: 'opacity 0.5s'
    }}>
      {loading && <Skeleton />}
      {/* User Information */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <p style={{ fontSize: '16px', color: '#1E40AF', margin: '0', fontWeight: '600' }}>Abhilash Gudise</p>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: '8px 0 0' }}>abhi@gmail.com</p>
        <p style={{ fontSize: '14px', color: '#6B7280', margin: '0' }}>Credential ID: Gk123</p>
      </div>

      {/* Vertical Timeline */}
      <div style={{ position: 'relative', padding: '20px', paddingTop: '50px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        {/* Revaluate Button in Top Right Corner */}
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            backgroundColor: '#1E40AF',
            color: '#FFFFFF',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            zIndex: 10,
          }}
        >
          Revaluate
        </button>

        {/* Vertical line passes through the centers of the stage IDs - positioned relatively */}
        <div style={{ position: 'absolute', left: '156px', top: '20px', bottom: '20px', width: '2px', backgroundColor: '#E5E7EB', zIndex: 0 }}></div>
        
        {stages.map((stage, index) => (
          <div key={stage.id} style={{ display: 'flex', marginBottom: '40px', position: 'relative' }}>
            {/* Date and Stage ID container */}
            <div style={{ width: '158px', display: 'flex', alignItems: 'center', position: 'relative' }}>
              {/* Date chip with fixed width */}
              <div style={{
                backgroundColor: '#E0E7FF',
                color: '#1E40AF',
                padding: '6px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500',
                width: '100px',
                textAlign: 'center',
                marginRight: '10px'
              }}>
                {stage.date}
              </div>
              
              {/* Circle with stage ID - positioned for line to pass through exact center */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: stage.status === 'Rejected' ? '#DC2626' : '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '12px',
                zIndex: 1,
                transition: 'transform 0.2s',
                ...(expandedStages[stage.id] && { transform: 'scale(1.1)' }),
                position: 'relative'
              }}>
                {stage.id}
              </div>
            </div>
            
            {/* Content card with decreased width */}
            <div style={{ 
              width: '500px', 
              padding: '15px', 
              backgroundColor: '#F9FAFB', 
              borderRadius: '8px', 
              border: '1px solid #E5E7EB', 
              transition: 'all 0.2s', 
              ...(expandedStages[stage.id] ? { boxShadow: '0 4px 6px rgba(0,0,0,0.1)' } : {}), 
              marginLeft: '20px'
            }}>
              <div style={{ marginBottom: '10px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1E40AF', margin: '0' }}>
                  {stage.title} {stage.status === 'Rejected' && <span style={{ color: '#DC2626', fontWeight: '500' }}>Rejected</span>}
                </h3>
              </div>
              <button
                onClick={() => toggleStage(stage.id)}
                style={{ background: 'none', border: 'none', color: '#1E40AF', fontSize: '14px', cursor: 'pointer', marginBottom: '10px', padding: '0' }}
              >
                {expandedStages[stage.id] ? 'Hide Details' : 'Show Details'}
              </button>
              {expandedStages[stage.id] && (
                <div>
                  <p style={{ fontSize: '14px', color: '#4B5563', whiteSpace: 'pre-wrap', margin: '0 0 10px' }}>{stage.comments}</p>
                  {stage.additionalComments && (
                    <p style={{ fontSize: '14px', color: '#4B5563', whiteSpace: 'pre-wrap', margin: '0 0 10px' }}>{stage.additionalComments}</p>
                  )}
                  {stage.attachments.length > 0 && (
                    <div>
                      <p style={{ fontSize: '14px', color: '#1E40AF', margin: '0 0 5px' }}>Attachments:</p>
                      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                        {stage.attachments.map((attachment, index) => (
                          <li key={index} style={{ fontSize: '14px', color: '#3B82F6', marginBottom: '5px' }}>{attachment}</li>
                        ))}
                      </ul>
                      {stage.attachments.length > 3 && <p style={{ fontSize: '12px', color: '#6B7280', cursor: 'pointer', margin: '5px 0 0' }}>Load more attachments</p>}
                    </div>
                  )}
                  {stage.id === 4 && (
                    <div>
                      <div style={{ marginTop: '10px' }}>
                        <label style={{ fontSize: '14px', color: '#1E40AF', fontWeight: '600', marginRight: '10px' }}>Add Comments:</label>
                        <input
                          type="text"
                          value={newComment}
                          onChange={handleCommentChange}
                          style={{ padding: '5px', width: '300px', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                          placeholder="Enter your comment..."
                        />
                        <button
                          onClick={handleAddComment}
                          style={{ backgroundColor: '#10B981', color: '#FFFFFF', padding: '5px 10px', border: 'none', borderRadius: '4px', fontSize: '12px', marginLeft: '10px', cursor: 'pointer' }}
                        >
                          Add
                        </button>
                        {commentsList.length > 0 && (
                          <div style={{ marginTop: '10px' }}>
                            <p style={{ fontSize: '14px', color: '#1E40AF', fontWeight: '600' }}>Comments:</p>
                            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                              {commentsList.map((comment, index) => (
                                <li key={index} style={{ fontSize: '14px', color: '#4B5563', marginBottom: '5px' }}>
                                  {comment.text} <span style={{ color: '#6B7280', fontSize: '12px' }}>({comment.timestamp})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <label style={{ fontSize: '14px', color: '#1E40AF', fontWeight: '600', marginRight: '10px' }}>Upload File:</label>
                        <button
                          onClick={handleUploadClick}
                          style={{ backgroundColor: '#10B981', color: '#FFFFFF', padding: '5px 10px', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                        >
                          Upload
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                          multiple
                        />
                        {uploadedFiles.length > 0 && (
                          <div style={{ marginTop: '10px', color: '#4B5563' }}>
                            Uploaded Files: {uploadedFiles.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {stage.additionalComments && <p style={{ fontSize: '12px', color: '#6B7280', cursor: 'pointer', margin: '5px 0 0' }}>Load more</p>}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Action Buttons */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            style={{ backgroundColor: '#10B981', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginRight: '10px' }}
          >
            Approve
          </button>
          <button
            style={{ backgroundColor: '#DC2626', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginRight: '10px' }}
          >
            Reject
          </button>
          <button
            style={{ backgroundColor: '#F59E0B', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginRight: '10px' }}
          >
            Pullback
          </button>
          <button
            style={{ backgroundColor: '#6B7280', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
          >
            Revert
          </button>
        </div>
        
        {/* Progress Indicator */}
        <div style={{ textAlign: 'center', marginTop: '20px', color: '#6B7280', fontSize: '14px' }}>
          Progress: Stage {stages.findIndex(s => s.status === 'Active') + 1} of {stages.length}
        </div>
      </div>
    </div>
  );
};

export default WorkflowPage;