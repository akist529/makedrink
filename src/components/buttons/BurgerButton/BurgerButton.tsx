import { useState } from 'react'
import BurgerImg from 'public/images/ui/menu.webp'
import BurgerImgOpen from 'public/images/ui/menu_open.webp'
import Image from 'next/image'

export default function BurgerButton() {
    function testFunc() {
        setIsOpen(prevState => !prevState)
    }

    const [isOpen, setIsOpen] = useState(false)

    return (
        <button onClick={testFunc}>
            <Image alt='Open Menu' src={isOpen ? BurgerImgOpen : BurgerImg} />
        </button>
    )
}