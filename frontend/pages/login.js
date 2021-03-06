import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'
import aniAuth from '../components/aniAuth'

const  Login  = ({ token })=> {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [rememberme, setRememberme] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password,rememberme },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div className={styles.gridContainer}>
            <div>
                Username:
            </div>
            <div>
                <input type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                Password:
            </div>
            <div>
                <input type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
        </div>
    )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className={styles.container}>
                <Navbar />
                <h1>Login</h1>
                <div><b>Token:</b> {token.substring(0, 15)}...
                <button onClick={copyText}> Copy token </button>
                </div>
                <br/>
                <div>
                    Status:  {status}  
                    {/* RememberMe: {rememberme} */}
                </div>
                <br />
                {loginForm()}
                <div>
                    <button onClick={login}>Login</button>
                    <br /><br />
                </div>
                <div>
                    <input type="checkbox"
                        name="RememberMe"
                        onChange={ (e) => setRememberme(e.target.value)}
                    />Remember me!
                </div>
            </div>
        </Layout>
    )
}
export default aniAuth(Login)
export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
