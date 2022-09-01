import { useState } from 'react';
import Dashboard from './dashboard';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
import { NavigationProgress } from '@mantine/nprogress';
function App() {
  const [colorScheme, setColorScheme] = useState('dark');
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
    <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
    <NavigationProgress color='red' />
  <Dashboard />

  </MantineProvider>
  </ColorSchemeProvider>
  );
}

export default App;
