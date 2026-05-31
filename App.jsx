import { useState, useCallback, useEffect } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { NotificationBanner } from './components/NotificationBanner';
import { useNotifications } from './hooks/useNotifications';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const { permission, isSupported, requestPermission, sendNotification } = useNotifications();

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        setTasks(
          parsed.map((task) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            finishedAt: task.finishedAt ? new Date(task.finishedAt) : undefined,
          }))
        );
      } catch {
        console.error('Failed to parse saved tasks');
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = useCallback(
    (newTask) => {
      const task = {
        ...newTask,
        id: crypto.randomUUID(),
        status: 'pending',
        createdAt: new Date(),
      };

      setTasks((prev) => [task, ...prev]);

      // Send notification that task was submitted
      sendNotification('Task Submitted!', {
        body: `"${task.title}" has been added to your task list.`,
        tag: `task-submitted-${task.id}`,
      });
    },
    [sendNotification]
  );

  const handleStatusChange = useCallback(
    (taskId, newStatus) => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.id !== taskId) return task;

          const updatedTask = {
            ...task,
            status: newStatus,
            finishedAt: newStatus === 'finished' ? new Date() : undefined,
          };

          // Send notification when task is finished
          if (newStatus === 'finished' && task.status !== 'finished') {
            sendNotification('Task Completed!', {
              body: `"${task.title}" has been marked as finished.`,
              tag: `task-finished-${task.id}`,
            });
          }

          return updatedTask;
        })
      );
    },
    [sendNotification]
  );

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }, []);

  return (
    <div className="min-h-screen bg-[#f0ebf8]">
      {/* Google Forms style header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#673ab7] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-normal text-gray-800">Task Manager</h1>
              <p className="text-xs text-gray-500">Create and track your tasks</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{tasks.length} tasks</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Title Card - Google Forms style */}
        <div className="bg-white rounded-lg border-t-8 border-t-[#673ab7] shadow-sm mb-6">
          <div className="p-6 pb-4">
            <h1 className="text-3xl font-normal text-gray-800 mb-2">Task Submission Form</h1>
            <p className="text-sm text-gray-600">
              Submit a new task and receive browser notifications when it's created and when it's finished.
            </p>
          </div>
          <div className="px-6 pb-4">
            <div className="text-xs text-gray-500">
              <span className="text-[#d93025]">*</span> Indicates required question
            </div>
          </div>
        </div>

        {/* Notification Banner */}
        <NotificationBanner
          isSupported={isSupported}
          permission={permission}
          onRequestPermission={requestPermission}
        />

        {/* Task Form */}
        <TaskForm onSubmit={handleCreateTask} />

        {/* Task List Section */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-medium text-gray-800">Submitted Tasks</h2>
              <p className="text-sm text-gray-500 mt-1">Manage and track your task progress</p>
            </div>
            <TaskList
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-gray-500">
          This form uses browser notifications to keep you updated on your tasks.
        </p>
      </footer>
    </div>
  );
}
