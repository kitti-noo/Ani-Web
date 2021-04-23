import { useRouter } from 'next/router'
import { useEffect } from 'react'

const aniAuth= WrappedComponent => {
    const Wrapper = props => {
        const { token } = props
        const router = useRouter()
        useEffect(() => {
            if (!token)
                router.push('/showAnimes')
            if (token)
                router.push('/editAnimes')
        }, [token])
        return (<WrappedComponent {...props} />)
    }
    return Wrapper
}

export default aniAuth