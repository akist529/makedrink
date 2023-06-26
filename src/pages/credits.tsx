// Page styles
import styles from '@/styles/Credits.module.scss';
// Next components
import type { NextPage } from 'next';

const CreditsPage: NextPage = () => {
    return (
        <main className={['page', styles.CreditsPage].join(' ')}>
            <header>
                <a href="https://www.flaticon.com/" target="_blank" title="Flaticon">All icons from Flaticon</a>
            </header>
            <ul>
                <li>
                    <span>Bartender icon created by Iconduck</span>
                </li>
                <li>
                    <span>Spirit icons created by Freepik</span>
                </li>
                <li>
                    <span>Beer can icons created by Flat Icons</span>
                </li>
                <li>
                    <span>Soda icons created by AmethystDesign</span>
                </li>
                <li>
                    <span>Liqueur icons created by surang</span>
                </li>
                <li>
                    <span>Liquor icons created by BZZRINCANTATION</span>
                </li>
                <li>
                    <span>Liquor icons created by Triangle Squad</span>
                </li>
                <li>
                    <span>Liquor icons created by Pause08</span>
                </li>
                <li>
                    <span>Rice wine icons created by imaginationlol</span>
                </li>
                <li>
                    <span>Cranberry icons created by shmai</span>
                </li>
                <li>
                    <span>Grapefruit icons created by amonrat rungreangfangsai</span>
                </li>
                <li>
                    <span>Jug icons created by DinosoftLabs</span>
                </li>
                <li>
                    <span>Food and restaurant icons created by rizky maulidhani</span>
                </li>
                <li>
                    <span>Sauce icons created by Talha Dogar</span>
                </li>
                <li>
                    <span>Almond icons created by shmai</span>
                </li>
                <li>
                    <span>Whiskey icons created by Smashicons</span>
                </li>
                <li>
                    <span>Alcohol icons created by Flat Icons Design</span>
                </li>
                <li>
                    <span>Alcohol icons created by photo3idea_studio</span>
                </li>
                <li>
                    <span>Drink icons created by monkik</span>
                </li>
                <li>
                    <span>Bottle icons created by Ina Mella</span>
                </li>
                <li>
                    <span>White wine icons created by Kanyanee Watanajitkasem</span>
                </li>
                <li>
                    <span>CSS liquid effect by Dave Quah</span>
                </li>
                <li>
                    <span>Drunk icons created by Prosymbols Premium</span>
                </li>
                <li>
                    <span>Bartender icons created by photo3idea_studio</span>
                </li>
                <li>
                    <span>Bottle icons created by Aranagraphics</span>
                </li>
                <li>
                    <span>Rum icons created by small.smiles</span>
                </li>
            </ul>
        </main>
    );
}

export default CreditsPage;