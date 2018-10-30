import {signIn, signUp, HomeContainer} from "./containers"

const routes = [
    {
        component: signIn,
        path: '/signin'
    },
    {
        component: signUp,
        path: '/signup'
    },
    {
        component: HomeContainer,
        path: "/home"
    }
];

export default routes;
