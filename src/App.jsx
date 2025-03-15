import AssistantSearch from './components/AssistantSearch';
import Lists from './components/Lists';

const App = () => {
    return (
      <div className="bg-gray-900 flex flex-row">
        <Lists />
        <AssistantSearch />
      </div>
    );
}

export default App;