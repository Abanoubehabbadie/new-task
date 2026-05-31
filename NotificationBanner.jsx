export function NotificationBanner({ isSupported, permission, onRequestPermission }) {
  if (!isSupported) {
    return (
      <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
        <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-yellow-800">Browser notifications not supported</p>
              <p className="text-xs text-yellow-700 mt-1">Your browser doesn't support notifications. Some features may not work as expected.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (permission === 'granted') {
    return (
      <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
        <div className="border-l-4 border-green-500 bg-green-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-green-800">Notifications enabled</p>
              <p className="text-xs text-green-700 mt-1">You'll receive browser notifications when tasks are created and completed.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (permission === 'denied') {
    return (
      <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
        <div className="border-l-4 border-red-500 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <div>
              <p className="text-sm font-medium text-red-800">Notifications blocked</p>
              <p className="text-xs text-red-700 mt-1">Please enable notifications in your browser settings to receive task updates.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
      <div className="border-l-4 border-[#673ab7] bg-purple-50 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-[#673ab7] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <div>
              <p className="text-sm font-medium text-purple-900">Enable notifications</p>
              <p className="text-xs text-purple-700 mt-1">Get notified when your tasks are finished. Click enable to allow browser notifications.</p>
            </div>
          </div>
          <button
            onClick={onRequestPermission}
            className="flex-shrink-0 px-4 py-1.5 bg-[#673ab7] text-white text-sm font-medium rounded hover:bg-[#5e35b1] transition-colors"
          >
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}
