import React from 'react'

import styles from "./GridBlogLinks.module.scss"
import { Button } from '../Button'

function GridBlogLinks() {
  return (
    <div className={`${styles.parent}`}>
        <div className={`${styles.cat}`}>
            <h3 className={`${styles.left}`}>Gatos</h3>
            <div className={`${styles.btnRight}`}>
                <Button theme="light">ver mas</Button>     
            </div>
        </div>
        <div className={`${styles.bird}`}> 
            <h3 className={`${styles.right}`}>Aves</h3>
            <div className={`${styles.btnLeft}`}>
                <Button theme="light">ver mas</Button> 
            </div>
        </div>
        <div className={`${styles.dog}`}>
            <h3 className={`${styles.left}`}>Perros</h3>
            <div className={`${styles.btnRight}`}>
                <Button theme="light">ver mas</Button>     
            </div>
        </div>
        <div className={`${styles.sankes}`}> 
            <h3 className={`${styles.left}`}>Reptiles</h3>
            <div className={`${styles.btnLeft}`}>
                <Button theme="light">ver mas</Button>
            </div>
        </div>
        <div className={`${styles.fish}`}>
            <h3 className={`${styles.right}`}>Peces</h3>
            <div className={`${styles.btnLeft}`}>
                <Button theme="light">ver mas</Button>
            </div>
        </div>
    </div>
  )
}

export default GridBlogLinks
