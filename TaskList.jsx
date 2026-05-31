import { cn } from '../utils/cn';

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  finished: {
    label: 'Finished',
    className: 'bg-green-50 text-green-700 border-green-200',
  },
};

const priorityConfig = {
  low: { label: 'Low', className: 'bg-green-500' },
  medium: { label: 'Medium', className: 'bg-yellow-500' },
  high: { label: 'High', className: 'bg-red-500' },
};

export function TaskList({ tasks, onStatusChange, onDelete }) {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (tasks.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="text-base font-medium text-gray-700">No tasks submitted yet</h3>
        <p className="mt-1 text-sm text-gray-500">Fill out the form above to create your first task</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="p-6 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#673ab7] bg-opacity-10 flex items-center justify-center text-[#673ab7] text-sm font-medium">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={cn(
                      'text-base font-medium text-gray-900',
                      task.status === 'finished' && 'line-through text-gray-400'
                    )}
                  >
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border',
                      statusConfig[task.status].className
                    )}>
                      {statusConfig[task.status].label}
                    </span>
                    <span className={cn(
                      'w-2 h-2 rounded-full',
                      priorityConfig[task.priority].className
                    )} title={`Priority: ${priorityConfig[task.priority].label}`} />
                    <span className="text-xs text-gray-400">
                      {priorityConfig[task.priority].label} priority
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#673ab7] focus:ring-1 focus:ring-[#673ab7]"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="finished">Finished</option>
                  </select>

                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                    title="Delete task"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <p
                className={cn(
                  'mt-2 text-sm text-gray-600',
                  task.status === 'finished' && 'line-through text-gray-400'
                )}
              >
                {task.description}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{task.senderEmail}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{formatDate(task.createdAt)}</span>
                </div>
                {task.finishedAt && (
                  <div className="flex items-center gap-1.5 text-green-600">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Completed {formatDate(task.finishedAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
