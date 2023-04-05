import Image from 'next/image'
import styles from './CloseButton.module.scss'
import { useDispatch } from 'react-redux'

export default function CloseButton() {
    const dispatch = useDispatch()

    return (
        <button className={styles.closebtn} onClick={() => dispatch({type: 'toggleSearch'})}>
            <Image alt='Close' src={require(`/public/images/ui/close.svg`)} width="48" height="48" />
        </button>
    )
}