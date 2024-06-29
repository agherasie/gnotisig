import { VStack, ChakraProvider, theme } from "@chakra-ui/react";
import { FC } from "react";
import { Outlet, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";

const Layout: FC = () => (
  <VStack h="100vh" w="100vw">
    <VStack
      bg="#1e1e1e"
      overflowY="scroll"
      w="100%"
      h="100%"
      px="84px"
      py="32px"
      spacing="48px"
    >
      <Outlet />
    </VStack>
  </VStack>
);

const App: FC = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);

export default App;
