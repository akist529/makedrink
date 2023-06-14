// Page styles
import styles from '@/styles/Login.module.scss';
// Next components
import type { NextPage } from 'next';

const LoginPage: NextPage = () => {
    return (
        <div className={styles.LoginPage}>
            <div className={styles.LoginCard}>
                <header>
                    <strong>Sign In</strong>
                    <span>To Access Admin Features</span>
                </header>
                <form action="" method="get">
                    <label htmlFor="email">E-Mail:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="E-Mail"/><br/>
                    <label htmlFor="pass">Password:</label>
                    <input 
                        type="password" 
                        id="pass" 
                        name="pass"
                        placeholder="Password"/><br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;