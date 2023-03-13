import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Home from './scenes/home';
import PostHome from './scenes/post';
import PostPage from './scenes/post';
import TopicsPage from './scenes/topics';

const customTheme = extendTheme({
  fonts: {
    body: 'Open Sans, sans-serif',
    heading: 'Open Sans, sans-serif',
  },
  colors: {
    main: '#0c1adf',
    darkMain: '#0913a9',
    text: '#989898',
    darkText: '#717171',
    darkTitle: '#505050',
    main30: 'rgba(12, 26, 223, .03)',
    main100: 'rgba(12, 26, 223, .1)',
    main700: 'rgba(12, 26, 223, .7)',
    black100: 'rgba(0,0,0,.1)',
    desliked: '#D62626'
  }
})

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/post/:postId' element={<PostPage />} />
          <Route path='/topics/:profileId' element={<TopicsPage />} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
