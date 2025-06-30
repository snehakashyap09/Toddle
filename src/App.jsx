import './App.css';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import CourseBuilder from './components/modules/CourseBuilder';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="app">
      <CourseBuilder />
    </div>
    </DndProvider>
  );
}

export default App;
