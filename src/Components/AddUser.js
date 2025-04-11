import React, { useRef, useState } from 'react';

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

  return (
    <div style={{ 
      maxWidth: '750px', 
      margin: '0 auto', 
      padding: '20px', 
      background: 'linear-gradient(135deg, #F3F4F6 0%, #E0E7FF 100%)', 
      fontFamily: 'Arial, sans-serif', 
      minHeight: '80vh', 
      borderRadius: '15px', 
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* User Information */}
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)', 
        border: '1px solid #E5E7EB', 
        borderRadius: '12px', 
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)'
      }}>
        <p style={{ fontSize: '20px', color: '#1E40AF', margin: '0', fontWeight: '700', textTransform: 'uppercase' }}>Abhilash Gudise</p>
        <p style={{ fontSize: '16px', color: '#6B7280', margin: '10px 0 0' }}>abhi@gmail.com</p>
        <p style={{ fontSize: '16px', color: '#6B7280', margin: '0' }}>Credential ID: Gk123</p>
      </div>

      {/* Vertical Timeline */}
      <div style={{ 
        position: 'relative', 
        padding: '25px', 
        paddingTop: '60px', 
        background: 'linear-gradient(135deg, #FFFFFF 0%, #E6EFFF 100%)', 
        border: '1px solid #D1D5DB', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Revaluate Button in Top Right Corner */}
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            background: 'linear-gradient(90deg, #1E40AF 0%, #3B82F6 100%)',
            color: '#FFFFFF',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'transform 0.3s, box-shadow 0.3s',
            boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
          }}
          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 15px rgba(30, 64, 175, 0.5)'; }}
          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(30, 64, 175, 0.3)'; }}
        >
          Revaluate
        </button>

        {/* Vertical line passes through the centers of the stage IDs */}
        <div style={{ 
          position: 'absolute', 
          left: '156px', 
          top: '20px', 
          bottom: '20px', 
          width: '3px', 
          background: 'linear-gradient(to bottom, #E5E7EB, #D1D5DB)', 
          zIndex: 0 
        }}></div>
        
        {stages.map((stage, index) => (
          <div key={stage.id} style={{ display: 'flex', marginBottom: '50px', position: 'relative' }}>
            {/* Date and Stage ID container */}
            <div style={{ width: '158px', display: 'flex', alignItems: 'center', position: 'relative' }}>
              {/* Date chip with fixed width */}
              <div style={{
                background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)',
                color: '#1E40AF',
                padding: '8px 12px',
                borderRadius: '15px',
                fontSize: '14px',
                fontWeight: '600',
                width: '120px',
                textAlign: 'center',
                marginRight: '15px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
              }}>
                {stage.date}
              </div>
              
              {/* Circle with stage ID */}
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: stage.status === 'Rejected' ? 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)' : 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '700',
                zIndex: 1,
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
                ...(expandedStages[stage.id] && { transform: 'scale(1.2)', boxShadow: '0 0 15px rgba(16, 185, 129, 0.5)' }),
                position: 'relative'
              }}
              onMouseEnter={(e) => { e.target.style.transform = 'scale(1.2)'; e.target.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)'; }}
              onMouseLeave={(e) => { if (!expandedStages[stage.id]) { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.3)'; } }}
              >
                {stage.id}
              </div>
            </div>
            
            {/* Content card with decreased width */}
            <div style={{ 
              width: '500px', 
              padding: '20px', 
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)', 
              borderRadius: '12px', 
              border: '1px solid #E5E7EB', 
              transition: 'all 0.3s', 
              ...(expandedStages[stage.id] ? { boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' } : {}), 
              marginLeft: '25px'
            }}>
              <div style={{ marginBottom: '15px', borderBottom: '1px dashed #E5E7EB', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1E40AF', margin: '0' }}>
                  {stage.title} {stage.status === 'Rejected' && <span style={{ color: '#DC2626', fontWeight: '600' }}>Rejected</span>}
                </h3>
              </div>
              <button
                onClick={() => toggleStage(stage.id)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#1E40AF', 
                  fontSize: '16px', 
                  cursor: 'pointer', 
                  marginBottom: '15px', 
                  padding: '0', 
                  fontWeight: '500',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => { e.target.style.color = '#3B82F6'; }}
                onMouseLeave={(e) => { e.target.style.color = '#1E40AF'; }}
              >
                {expandedStages[stage.id] ? 'Hide Details' : 'Show Details'}
              </button>
              {expandedStages[stage.id] && (
                <div>
                  <p style={{ fontSize: '16px', color: '#4B5563', whiteSpace: 'pre-wrap', margin: '0 0 15px' }}>{stage.comments}</p>
                  {stage.additionalComments && (
                    <p style={{ fontSize: '16px', color: '#4B5563', whiteSpace: 'pre-wrap', margin: '0 0 15px' }}>{stage.additionalComments}</p>
                  )}
                  {stage.attachments.length > 0 && (
                    <div>
                      <p style={{ fontSize: '16px', color: '#1E40AF', margin: '0 0 10px', fontWeight: '600' }}>Attachments:</p>
                      <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                        {stage.attachments.map((attachment, index) => (
                          <li key={index} style={{ fontSize: '15px', color: '#3B82F6', marginBottom: '8px', cursor: 'pointer', transition: 'color 0.3s' }}
                          onMouseEnter={(e) => { e.target.style.color = '#2563EB'; }}
                          onMouseLeave={(e) => { e.target.style.color = '#3B82F6'; }}>
                            {attachment}
                          </li>
                        ))}
                      </ul>
                      {stage.attachments.length > 3 && <p style={{ fontSize: '14px', color: '#6B7280', cursor: 'pointer', margin: '10px 0 0' }}>Load more attachments</p>}
                    </div>
                  )}
                  {stage.id === 4 && (
                    <div>
                      <div style={{ marginTop: '15px' }}>
                        <label style={{ fontSize: '16px', color: '#1E40AF', fontWeight: '600', marginRight: '15px' }}>Add Comments:</label>
                        <input
                          type="text"
                          value={newComment}
                          onChange={handleCommentChange}
                          style={{ padding: '10px', width: '320px', border: '2px solid #E5E7EB', borderRadius: '8px', fontSize: '14px' }}
                          placeholder="Enter your comment..."
                        />
                        <button
                          onClick={handleAddComment}
                          style={{
                            background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
                            color: '#FFFFFF',
                            padding: '8px 15px',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            marginLeft: '15px',
                            cursor: 'pointer',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                          }}
                          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 15px rgba(16, 185, 129, 0.5)'; }}
                          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'; }}
                        >
                          Add
                        </button>
                        {commentsList.length > 0 && (
                          <div style={{ marginTop: '15px' }}>
                            <p style={{ fontSize: '16px', color: '#1E40AF', fontWeight: '600' }}>Comments:</p>
                            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                              {commentsList.map((comment, index) => (
                                <li key={index} style={{ fontSize: '15px', color: '#4B5563', marginBottom: '10px', padding: '8px', background: '#F3F4F6', borderRadius: '6px' }}>
                                  {comment.text} <span style={{ color: '#6B7280', fontSize: '13px' }}>({comment.timestamp})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div style={{ marginTop: '15px' }}>
                        <label style={{ fontSize: '16px', color: '#1E40AF', fontWeight: '600', marginRight: '15px' }}>Upload File:</label>
                        <button
                          onClick={handleUploadClick}
                          style={{
                            background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
                            color: '#FFFFFF',
                            padding: '8px 15px',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                          }}
                          onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 15px rgba(16, 185, 129, 0.5)'; }}
                          onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'; }}
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
                          <div style={{ marginTop: '10px', color: '#4B5563', fontSize: '15px', background: '#F3F4F6', padding: '8px', borderRadius: '6px' }}>
                            Uploaded Files: {uploadedFiles.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {stage.additionalComments && <p style={{ fontSize: '14px', color: '#6B7280', cursor: 'pointer', margin: '10px 0 0', textDecoration: 'underline' }}>Load more</p>}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Action Buttons */}
        <div style={{ marginTop: '25px', textAlign: 'center', padding: '15px', background: '#FFFFFF', borderRadius: '12px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' }}>
          <button
            style={{
              background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
              color: '#FFFFFF',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '15px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 15px rgba(16, 185, 129, 0.5)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)'; }}
          >
            Approve
          </button>
          <button
            style={{
              background: 'linear-gradient(90deg, #DC2626 0%, #EF4444 100%)',
              color: '#FFFFFF',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '15px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 15px rgba(220, 38, 38, 0.5)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)'; }}
          >
            Reject
          </button>
          <button
            style={{
              background: 'linear-gradient(90deg, #F59E0B 0%, #FBBF24 100%)',
              color: '#FFFFFF',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginRight: '15px',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 15px rgba(245, 158, 11, 0.5)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)'; }}
          >
            Pullback
          </button>
          <button
            style={{
              background: 'linear-gradient(90deg, #6B7280 0%, #9CA3AF 100%)',
              color: '#FFFFFF',
              padding: '12px 25px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
              boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)'
            }}
            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 6px 15px rgba(107, 114, 128, 0.5)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.3)'; }}
          >
            Revert
          </button>
        </div>
        
        {/* Progress Indicator */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '25px', 
          color: '#6B7280', 
          fontSize: '16px', 
          fontWeight: '500', 
          background: '#FFFFFF', 
          padding: '10px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}>
          Progress: Stage {stages.findIndex(s => s.status === 'Active') + 1} of {stages.length}
        </div>
      </div>
    </div>
  );
};

export default WorkflowPage;