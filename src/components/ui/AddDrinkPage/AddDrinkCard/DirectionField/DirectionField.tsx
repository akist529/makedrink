// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function DirectionField (props: { i: number, removeDirection: Function }) {
    const { i, removeDirection } = props;

    return (
        <div className={`dir-${i}-container`}>
            <div>
                <input type="text" id={`dir-${i}`} name={`dir-${i}`} />
                <button onClick={e => removeDirection(e, i)}>
                    <Image 
                        alt="Remove Direction"
                        src={require('/public/images/ui/cancel.svg')} 
                        width="0" 
                        height="16" 
                        onLoadingComplete={e => updateWidth(e)} />
                </button>
            </div>
        </div>
    );
}