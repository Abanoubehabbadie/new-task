import { useState } from 'react';
import { cn } from '../utils/cn';

export function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [priority, setPriority] = useState('medium');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = 'This is a required question';
    } else if (title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!description.trim()) {
      newErrors.description = 'This is a required question';
    }

    if (!senderEmail.trim()) {
      newErrors.senderEmail = 'This is a required question';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) {
      newErrors.senderEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      senderEmail: senderEmail.trim(),
      priority,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setSenderEmail('');
    setPriority('medium');
    setErrors({});
    setIsSubmitting(false);
  };

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Task Title Question */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <label htmlFor="title" className="block text-base font-normal text-gray-800 mb-1">
          Task Title <span className="text-[#d93025]">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a short title for your task"
          className={cn(
            'w-full px-0 py-2 text-base text-gray-800 placeholder-gray-400 border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-colors',
            errors.title
              ? 'border-[#d93025] focus:border-[#d93025]'
              : 'border-gray-200 focus:border-[#673ab7]'
          )}
        />
        {errors.title && (
          <p className="mt-2 text-xs text-[#d93025] flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.title}
          </p>
        )}
      </div>

      {/* Description Question */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <label htmlFor="description" className="block text-base font-normal text-gray-800 mb-1">
          Task Description <span className="text-[#d93025]">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">Provide detailed information about the task</p>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what needs to be done..."
          rows={3}
          className={cn(
            'w-full px-0 py-2 text-base text-gray-800 placeholder-gray-400 border-0 border-b-2 bg-transparent resize-none focus:outline-none focus:ring-0 transition-colors',
            errors.description
              ? 'border-[#d93025] focus:border-[#d93025]'
              : 'border-gray-200 focus:border-[#673ab7]'
          )}
        />
        {errors.description && (
          <p className="mt-2 text-xs text-[#d93025] flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.description}
          </p>
        )}
      </div>

      {/* Email Question */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <label htmlFor="senderEmail" className="block text-base font-normal text-gray-800 mb-1">
          Your Email <span className="text-[#d93025]">*</span>
        </label>
        <p className="text-sm text-gray-500 mb-2">We'll notify you when your task is finished</p>
        <input
          type="email"
          id="senderEmail"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          placeholder="your.email@example.com"
          className={cn(
            'w-full px-0 py-2 text-base text-gray-800 placeholder-gray-400 border-0 border-b-2 bg-transparent focus:outline-none focus:ring-0 transition-colors',
            errors.senderEmail
              ? 'border-[#d93025] focus:border-[#d93025]'
              : 'border-gray-200 focus:border-[#673ab7]'
          )}
        />
        {errors.senderEmail && (
          <p className="mt-2 text-xs text-[#d93025] flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.senderEmail}
          </p>
        )}
      </div>

      {/* Priority Question */}
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
        <label className="block text-base font-normal text-gray-800 mb-3">
          Priority Level
        </label>
        <div className="space-y-2">
          {priorityOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="radio"
                name="priority"
                value={option.value}
                checked={priority === option.value}
                onChange={() => setPriority(option.value)}
                className="w-5 h-5 text-[#673ab7] border-gray-300 focus:ring-[#673ab7] focus:ring-2"
              />
              <span className="text-base text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between py-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-[#673ab7] text-white text-sm font-medium rounded hover:bg-[#5e35b1] focus:outline-none focus:ring-2 focus:ring-[#673ab7] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setDescription('');
            setSenderEmail('');
            setPriority('medium');
            setErrors({});
          }}
          className="px-4 py-2.5 text-[#673ab7] text-sm font-medium rounded hover:bg-purple-50 transition-colors"
        >
          Clear form
        </button>
      </div>
    </form>
  );
}
