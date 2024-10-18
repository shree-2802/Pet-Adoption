import React from 'react'
import styles from './index.module.scss';

export type petlype = {
  petSet: {
    page: string,
    setPage: React.Dispatch<React.SetStateAction<string>>
  }
}
const PetlistingHeader = ({ petSet }: petlype) => {
  const filter=['Available','Sold']
  return (
    <div className={styles.petlistfilter}>
      {
        filter.map(item=><div className={item===petSet.page?styles.selected:''} onClick={()=>petSet.setPage(item)}>{item}</div>)
      }
    </div>
  )
}

export default PetlistingHeader
