import React from 'react';
import { FileText, ChevronRight, Clock } from 'lucide-react';

const ClaimsTable = ({ claims }) => {
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

  return (
    <div className="table-card">
      <div className="table-header">
        <h2 className="text-lg font-bold text-gray-900">Recent Claims</h2>
        <button className="text-sm font-semibold text-blue-700 hover:text-blue-800">View All</button>
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
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {claims.map((claim) => (
              <tr key={claim.id} className="table-row-hover">
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
                <td className="px-6 py-4 text-right">
                  <ChevronRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 transition-colors cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {claims.length === 0 && (
        <div className="p-12 text-center">
          <Clock className="h-12 w-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">No recent claims found.</p>
        </div>
      )}
    </div>
  );
};

export default ClaimsTable;