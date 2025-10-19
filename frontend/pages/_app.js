import "@/styles/globals.css";
// import Navbar from "../components/Navbar/Navbar"
import Layout from "@/components/layout";
import { LoginProvider } from "@/context/logincontex";
import { AppContextProvider } from "@/context/AppContext";
import { useState, useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { productsDummyData, userDummyData } from "@/assets/assets";
import { setProducts } from "@/redux/productslice";
import { setUser} from "@/redux/userslice";

export default function App({ Component, pageProps }) {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState('Login');

  const setLogintrue = () => {
    setLogin(true);
  }

  const setLoginfalse = () => {
    setLogin(false);
  }

  const setNewName = (na) => {
    setName(na);
  }

  return (
    <div>
      {/* <ClerkProvider> */}
      <AppContextProvider>
        <Provider store={store}>
          <ClerkProvider>
            <InitData>
              <LoginProvider value={{ login, setLogintrue, setLoginfalse, name, setNewName }}>
                {login}
                <Component {...pageProps} login={login} setLogin={setLogintrue} name={name} setName={setNewName} />
              </LoginProvider>
            </InitData>
          </ClerkProvider>
        </Provider>
      </AppContextProvider>
      {/* </ClerkProvider> */}
      {/* </Layout> */}
    </div>
  )
}

const InitData = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProducts(productsDummyData));
    dispatch(setUser(userDummyData));
  }, [dispatch]);

  return children;
};
