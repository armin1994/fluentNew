import {signIn, signUp} from "./containers"

const routes = [
    {
        component: signIn,
        path: '/signin'
    },
    {
        component: signUp,
        path: '/signup'
    },
    // {
    //     component: loadComponent("noMatch"),
    //     path: "*"
    // }
];

export default routes;
