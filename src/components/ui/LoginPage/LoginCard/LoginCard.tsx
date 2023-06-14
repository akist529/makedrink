import styles from './LoginCard.module.scss';

export default function LoginCard () {
    return (
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
                <input 
                    type="submit" 
                    value="Submit"
                    className={styles.submit}/>
            </form>
        </div>
    );
}