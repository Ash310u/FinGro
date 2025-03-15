import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssistantSearch from './components/AssistantSearch';
import Lists from './components/Lists';

const App = () => {
    return (
      <Router>
        <div className="bg-gray-900 flex flex-row h-screen">
          <Lists />
          <Routes>
            <Route path="/" element={<AssistantSearch />} />
            <Route path="/chat/:chatId" element={<AssistantSearch />} />
          </Routes>
        </div>
      </Router>
    );
}

export default App;