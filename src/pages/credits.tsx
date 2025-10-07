// Page styles
import styles from '@/styles/Credits.module.scss';
// Next components
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const CreditsPage: NextPage = () => {
    return (
        <main className={ ['page', styles.CreditsPage].join(' ') }>
            <Head><title>Credits - MakeDrink</title></Head>
            <header>
                <Link href="https://www.flaticon.com/" target="_blank" title="Flaticon">All icons from Flaticon</Link>
            </header>
            <ul>
                <li>Bartender icon created by Iconduck</li>
                <li>Spirit icons created by Freepik</li>
                <li>Beer can icons created by Flat Icons</li>
                <li>Soda icons created by AmethystDesign</li>
                <li>Liqueur icons created by surang</li>
                <li>Liquor icons created by BZZRINCANTATION</li>
                <li>Liquor icons created by Triangle Squad</li>
                <li>Liquor icons created by Pause08</li>
                <li>Rice wine icons created by imaginationlol</li>
                <li>Cranberry icons created by shmai</li>
                <li>Grapefruit icons created by amonrat rungreangfangsai</li>
                <li>Jug icons created by DinosoftLabs</li>
                <li>Food and restaurant icons created by rizky maulidhani</li>
                <li>Sauce icons created by Talha Dogar</li>
                <li>Almond icons created by shmai</li>
                <li>Whiskey icons created by Smashicons</li>
                <li>Alcohol icons created by Flat Icons Design</li>
                <li>Alcohol icons created by photo3idea_studio</li>
                <li>Drink icons created by monkik</li>
                <li>Bottle icons created by Ina Mella</li>
                <li>White wine icons created by Kanyanee Watanajitkasem</li>
                <li>CSS liquid effect by Dave Quah</li>
                <li>Drunk icons created by Prosymbols Premium</li>
                <li>Bartender icons created by photo3idea_studio</li>
                <li>Bottle icons created by Aranagraphics</li>
                <li>Rum icons created by small.smiles</li>
            </ul>
        </main>
    );
}

export default CreditsPage;
