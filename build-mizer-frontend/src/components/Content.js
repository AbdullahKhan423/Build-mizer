// Content.js
import React from 'react';

function Content({ activeTab }) {
  return (
    <div className="content-container">
      {activeTab === 'Dashboard' && (
        <div>
          {/* Content for the Dashboard tab */}
          <h2>Dashboard Content</h2>
        </div>
      )}
      {activeTab === 'Account' && (
        <div>
          {/* Content for the Account tab */}
          <h2>Account Content</h2>
        </div>
      )}
      {activeTab === 'Generate Report' && (
        <div>
          {/* Content for the Generate Report tab */}
          <h2>Generate Report Content</h2>
        </div>
      )}
    </div>
  );
}

export default Content;
