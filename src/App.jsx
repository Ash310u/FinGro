import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AssistantSearch from './components/AssistantSearch';
import Lists from './components/Lists';

/**
 * Copyright 2025 Ashutosh Saha
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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
