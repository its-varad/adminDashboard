import {Authenticated, GitHubBanner, Refine, WelcomePage} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {Layout} from './components/layouts'
import { useNotificationProvider } from "@refinedev/antd";
import { EditPage } from "./pages";
import "@refinedev/antd/dist/reset.css";
import {dataProvider,liveProvider} from "./Providers";
import {CompanyList} from "./pages";
import { List } from "./pages/tasks/list";
import routerBindings, {
    CatchAllNavigate,
    DocumentTitleHandler,
    UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";

import {authProvider} from "./Providers";
import {Home,ForgotPassword,Login,Register} from "./pages";
import { resources } from "./config/resources";
import {CompanyCreate } from "./pages/company/create";
import { CreateTask } from "./pages/tasks/create";
import { EditTask } from "./pages/tasks/edit";


function App() {
  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "bOz8Aq-3lK4tG-dtZYCj",
                  liveMode: "auto",
                }}
              >
                <Routes>

                    <Route path="/register" element ={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path="/forgotPassword" element ={<ForgotPassword/>}/>
                    <Route element={

                        <Authenticated
                            key="authenticated-layout"
                            fallback={<CatchAllNavigate to='/login'/>}
                        >
                         <Layout>
                             <Outlet/>
                         </Layout>
                        </Authenticated>
                    }>
                       <Route index element={<Home/>}/>
                        <Route path="/companies" >
                          <Route index element={<CompanyList/>}/>
                          <Route path="/companies/create" element={<CompanyCreate/>}/>
                          <Route path="edit/:id" element={<EditPage/>}/>
                        </Route> 
                        <Route path="/tasks" element={<List>
                          <Outlet />
                        </List>}>
                        <Route path="new" element={<CreateTask/>}/>
                          <Route path="edit/:id" element={<EditTask/>}/>
                    </Route>
                          
                    </Route>
                </Routes>       
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
