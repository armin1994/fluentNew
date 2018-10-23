import {signIn} from "./containers"

const routes = [
    {
        component: signIn,
        path: '/signin'
    },
    // {
    //     component: loadComponent("signUp"),
    //     path: '/signup'
    // },
    // {
    //     component: loadComponent("noMatch"),
    //     path: "*"
    // }
];

export default routes;
