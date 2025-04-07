import React, { useState } from 'react';

const CredentialProgressBarSvg = () => {
    const [activeStep, setActiveStep] = useState(3); // Set to 3 for "Medical Licenses" as active step

    const steps = [
        { id: 1, title: 'Personal Information' },
        { id: 2, title: 'Education History' },
        { id: 3, title: 'Medical Licenses', content: 'Upload license documents' },
        { id: 4, title: 'Board Certifications' },
        { id: 5, title: 'Document Review' },
    ];

    const handleStepClick = (stepId) => {
        if (stepId <= activeStep) {
            setActiveStep(stepId);
        }
    };

    return (
        <div style={{
            padding: '40px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#F9FAFB',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '600px',
            maxWidth: '1100px',
            margin: '0 auto',
            borderRadius: '20px',
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
        }}>
            <svg
                width="300"
                height="550"
                viewBox="0 0 300 550"
                style={{ overflow: 'visible' }}
            >
                {/* Vertical progress line */}
                <line x1="150" y1="50" x2="150" y2="500" stroke="#E0E0E0" stroke-width="4" />

                {/* Completed progress line */}
                <line
                    x1="150"
                    y1="50"
                    x2="150"
                    y2={50 + (activeStep - 1) * 100}
                    stroke="#4CAF50"
                    stroke-width="4"
                />

                {/* Steps */}
                {steps.map((step, index) => {
                    const yPos = 50 + index * 100;
                    const isCompleted = index < activeStep - 1;
                    const isActive = index === activeStep - 1;
                    const isPending = index > activeStep - 1;

                    return (
                        <g
                            key={step.id}
                            onClick={() => handleStepClick(step.id)}
                            style={{ cursor: isCompleted || isActive ? 'pointer' : 'not-allowed' }}
                        >
                            {/* Outer circle */}
                            <circle
                                cx="150"
                                cy={yPos}
                                r="25"
                                fill={isCompleted || isActive ? '#E8F5E9' : '#FFFFFF'}
                                stroke={isCompleted || isActive ? '#4CAF50' : '#E0E0E0'}
                                stroke-width="2"
                            />
                            {/* Inner circle */}
                            <circle
                                cx="150"
                                cy={yPos}
                                r="15"
                                fill={isCompleted || isActive ? '#4CAF50' : '#E0E0E0'}
                            />
                            {/* Step indicator */}
                            <text
                                x="150"
                                y={yPos + 5}
                                font-family="Arial"
                                font-size="16"
                                text-anchor="middle"
                                dominant-baseline="middle"
                                fill={isCompleted ? '#FFFFFF' : isActive ? '#FFFFFF' : 'none'}
                            >
                                {isCompleted ? '✓' : isActive ? 'MD' : ''}
                            </text>
                            {/* Step title */}
                            <text
                                x="230"
                                y={yPos + 5}
                                font-family="Arial"
                                font-size="16"
                                text-anchor="start"
                                font-weight="bold"
                                fill="#333333"
                                opacity={isPending ? 0.5 : 1}
                            >
                                {step.title}
                            </text>
                        </g>
                    );
                })}

                {/* Content Box for Active Step */}
                {activeStep === 3 && (
                    <g>
                        <rect
                            x="30"
                            y="290"
                            width="240"
                            height="40"
                            rx="8"
                            fill="#F1F8E9"
                            stroke="#4CAF50"
                            stroke-width="1"
                        />
                        <text
                            x="150"
                            y="315"
                            font-family="Arial"
                            font-size="14"
                            text-anchor="middle"
                            fill="#333333"
                        >
                            {steps[activeStep - 1].content}
                        </text>
                    </g>
                )}
            </svg>
        </div>
    );
};

export default CredentialProgressBarSvg;