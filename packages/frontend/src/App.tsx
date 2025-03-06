import { Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Layout from './components/layout/Layout';
import Home from './routes/Home';
import TaskList from './routes/TaskList';
import TaskDetail from './routes/TaskDetail';
import TaskCreate from './routes/TaskCreate';

function App() {
  return (
    <TaskProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskCreate />} />
          <Route path="/tasks/:id" element={<TaskDetail />} />
        </Routes>
      </Layout>
    </TaskProvider>
  );
}

export default App;