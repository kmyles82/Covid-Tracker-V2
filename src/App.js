import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core'

function App() {
  return (
    <div className="App">
      <FormControl>
        <Select>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">Worldwide</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default App;
