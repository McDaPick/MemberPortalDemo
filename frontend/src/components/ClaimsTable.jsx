import React, { useState } from 'react';
import { FileText, ChevronRight, Clock, Trash2, Edit, RefreshCw, Plus } from 'lucide-react';
import axios from 'axios';
import AddClaimForm from './AddClaimForm.jsx'


const ClaimsTable = ({ claims, onRefresh }) => {
  const [isDeleting, setIsDeleting] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'badge-approved';
      case 'pending': return 'badge-pending';
      case 'denied': return 'badge-denied';
      default: return 'badge-default';
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete Claim #${id}?`)) return;

    setIsDeleting(id);
    try {
      await axios.delete(`http://localhost:8080/api/claims/${id}`);
      await onRefresh();
    } catch (err) {
          console.error("Delete failed:", err);
          alert("System error: Could not remove claim from Oracle.");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <h2 className="text-lg font-bold text-gray-900">Recent Claims</h2>
        <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={18} /> New Claim
        </button>

        <AddClaimForm
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onRefresh={onRefresh}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="table-head-row">
              <th className="px-6 py-4">Claim ID</th>
              <th className="px-6 py-4">Service Date</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">AI Review</th>
              <th className="px-6 py-4">Risk Level</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {claims.map((claim) => (
              <tr key={claim.id} className={`table-row-hover ${isDeleting === claim.id ? 'opacity-30' : ''}`}>
                <td className="table-cell font-medium text-gray-900">#{claim.id}</td>
                <td className="table-cell text-gray-500">{claim.serviceDate}</td>
                <td className="table-cell">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{claim.description}</span>
                  </div>
                </td>
                <td className="table-cell font-semibold text-gray-900">
                  {formatCurrency(claim.amount)}
                </td>
                <td className="table-cell">
                  <span className={`badge-base ${getStatusClass(claim.status)}`}>
                    {claim.status}
                  </span>
                </td>
                {/* AI SUMMARY COLUMN */}
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-gray-600 italic">
                      "{claim.aiSummary || 'Analysis pending...'}"
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2">
                    <p className="text-sm text-gray-600 italic">
                      "{claim.riskLevel || 'Analysis pending...'}"
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3 items-center">
                    <button
                      onClick={() => handleDelete(claim.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                      disabled={isDeleting === claim.id}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {claims.length === 0 && (
        <div className="p-12 text-center">
          <Clock className="h-12 w-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">No recent claims found in Oracle.</p>
        </div>
      )}
    </div>
  );
};

export default ClaimsTable;