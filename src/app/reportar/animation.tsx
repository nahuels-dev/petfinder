"use clien"
import styles from '@/styles/pages/Reportar.module.scss'
import { useEffect,useRef, useState } from 'react'
const AnimationSteps = ({step}:{step:number})=>{
    const goat = useRef<HTMLDivElement>(null)
    const prevStep = useRef<number>(step)
    const [animClasses, setAnimClasses] = useState('')
    useEffect(() => {
        console.log("Previous state:", prevStep.current)
        console.log("Current state:", step)        
        if(prevStep.current < step ){
            console.log("next class")
            setAnimClasses(styles['animation__goat__step' + step.toString()])
        }else if(prevStep.current > 0){
            console.log(prevStep.current)
            setAnimClasses(styles['animation__goat__back__step' + step.toString()])
            console.log("prev class")
        }else{
            console.log("start class")
            setAnimClasses(styles['animation__goat__step0'])
        }
        prevStep.current = step
    }, [step])
    return(
        <div className={styles.animation}>
            <div className={`${styles.animation__goat} 
            ${animClasses}`} ref={goat} key={step}></div>
            <div className={styles.animation__grass}>
                <div className={styles.animation__grass__tree}></div>
                <div className={styles.animation__grass__tree}></div>
                <div className={styles.animation__grass__tree}></div>
                <div className={styles.animation__grass__tree}></div>
            </div>
        </div>
        
    )
}

export default AnimationSteps