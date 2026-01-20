import React, { useState } from 'react';
import { X, Plus, Save, AlertCircle } from 'lucide-react';
import axios from 'axios';

const AddClaimForm = ({ isOpen, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    serviceDate: new Date().toISOString().split('T')[0], // Default to today
    description: '',
    amount: '',
    status: 'Pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST to your Spring Boot endpoint
      await axios.post('http://localhost:8080/api/claims', formData);
      onRefresh(); // Refresh the table
      onClose();   // Close the form
      setFormData({ serviceDate: '', description: '', amount: '', status: 'Pending'});
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to save claim to Oracle.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
        <div className="w-screen max-w-md">
          <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 h-0 overflow-y-auto p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Claim</h2>
                <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-500">
                  <X size={24} />
                </button>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Date</label>
                  <input required type="date" className="form-input"
                    value={formData.serviceDate} onChange={(e) => setFormData({...formData, serviceDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <div className="relative mt-1">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                    <input required type="number" step="0.01" className="form-input pl-7"
                      value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea required rows="3" className="form-input"
                    value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-200 bg-gray-50 gap-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500">Cancel</button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                <Save size={18} /> Save Claim
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddClaimForm;