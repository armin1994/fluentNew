import axios from "axios";


const callAction = async (
    body
) => {
    try {
        const response = await axios.post('/api', body);
        return response;
    }
    catch (e) {
        return {
            error: {
                status: 500,
                message: e
            }
        }
    }
};

export default {
    state: {
        error: null,
        user: null,
        loading: false
    },
    reducers: {
        stateUpdate: (state, payload) => {
            return {...state, ...payload}
        }
    },
    effects: dispatch => ({
        async serverUpdate(payload, rootState) {
            dispatch.signIn.stateUpdate({loading: true});
            const response = await callAction(payload);
            const nextState = {loading: false, ...response.data};
            dispatch.signIn.stateUpdate(nextState);
        }
    })

};
