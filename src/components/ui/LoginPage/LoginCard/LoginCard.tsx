import styles from './LoginCard.module.scss';

export default function LoginCard () {
    return (
        <div className={styles.LoginCard}>
            <header>
                <strong>Sign In</strong>
                <span>To Access Admin Features</span>
            </header>
            <form action="https://api.makedr.ink/login" method="post">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Username"/><br/>
                <label htmlFor="passworld">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    placeholder="Password"/><br/>
                <input 
                    type="submit" 
                    value="Submit"
                    className={styles.submit}/>
            </form>
        </div>
    );
}
