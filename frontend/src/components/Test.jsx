import React, { useState } from 'react';

const Test = () => {
  const [result, setResult] = useState('No test run yet');

  const testConnection = async () => {
    console.log('🔍 Test button clicked!'); // Debug log
    setResult('Testing...'); // Show we're trying
    
    try {
      console.log('🚀 Making request to backend...'); // Debug log
      const response = await fetch('http://localhost:8000/health');
      console.log('📡 Response received:', response); // Debug log
      
      const data = await response.json();
      console.log('📋 Data:', data); // Debug log
      
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('❌ Error:', error); // Debug log
      setResult('Error: ' + error.message);
    }
  };

  console.log('🎯 Current result state:', result); // Debug log

  return (
    <div className="p-4">
      <button 
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Backend Connection
      </button>
      <pre className="mt-4 p-4 bg-gray-100 rounded min-h-[100px] border">
        {result}
      </pre>
    </div>
  );
};

export default Test;