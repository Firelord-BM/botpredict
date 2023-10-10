import React from 'react'
import styles from "@/app/component/Loading/styles.module.css"

const Loading = () => {
  return (
    <div className={styles.loader}>
    <li className={styles.ball}></li>
    <li className={styles.ball}></li>
    <li className={styles.ball}></li>
  </div>
  )
}

export default Loading