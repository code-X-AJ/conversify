import Chat from '../pages/Chat'
import Login from '../pages/Login'
import Register from '../pages/Register'
import SetAvatar from '../pages/SetAvatar'

const authRoutes = [
    {
        name:<Chat />,
        path:''
    },
    {
        name:<Login />,
        path:'login'
    },
    {
        name:<Register />,
        path:'register'
    },
    {
        name:<SetAvatar />,
        path:'setAvatar'
    }
]

export default authRoutes;
